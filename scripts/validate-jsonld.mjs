#!/usr/bin/env node
/**
 * JSON-LD / Structured-Data validation gate for bitcoinstamps.xyz.
 *
 * WHY THIS EXISTS
 * ---------------
 * The existing CI (`test:leo-api`, the ci.yml jq/grep steps) only counts LEO
 * coverage and validates the *source* entity store. Nothing validated the
 * **rendered** structured-data output — which is exactly how the KEVIN-creator
 * misattribution and the missing Organization logo shipped undetected
 * (see .paos/research/bitcoinstamps-leo-geo-audit-2026-07-03.md §3.8, finding #21,
 * recommendation #11).
 *
 * This script closes that gap. Given a built `dist/`, it:
 *   1. Parses every <script type="application/ld+json"> block in a representative
 *      sample of built HTML pages (protocol / tutorial / blog / homepage, plus one
 *      per locale en/es/fr/zh/tr) AND the generated dist/api/schema.json +
 *      dist/api/entities.json.
 *   2. Validates each JSON-LD object: valid JSON, root has @context + @type,
 *      and type-specific required fields (Organization.logo, TechArticle.headline
 *      /author, BreadcrumbList.itemListElement, ...).
 *   3. Asserts every site-local logo/image URL resolves to a real file in dist/
 *      (catches the missing bitcoin-stamps-logo.svg / logo.png).
 *   4. Asserts the cultural invariants across ALL emitted structured data:
 *        - KEVIN is rendered ALL-CAPS (in entity/title/prose fields),
 *        - a KEVIN creator/author is always "Arwyn" (never "Reinamora"),
 *        - "mikeinspace" is always lowercase.
 *   5. Exits non-zero when any BLOCKING (error) check fails.
 *
 * SEVERITY MODEL
 * --------------
 *   ERROR   (blocking, exit 1): invalid JSON, unresolvable site-local logo/image
 *                               URL, and any cultural-invariant violation.
 *   WARNING (non-blocking):     schema-completeness gaps (missing @context/@type
 *                               or type-specific required fields).
 *
 * This deliberately does NOT re-implement the source-store checks in
 * docs/.vitepress/test-leo-system.js / endpoints.ts:validateAPIConsistency —
 * it validates the rendered artifacts those produce.
 *
 * Usage: node scripts/validate-jsonld.mjs [distDir]
 *        (distDir defaults to <repo>/dist)
 */

import { readFile, access, readdir } from 'node:fs/promises'
import { constants } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = resolve(__dirname, '..')
const DIST_DIR = resolve(process.argv[2] || process.env.DIST_DIR || join(REPO_ROOT, 'dist'))

const SITE_ORIGIN = 'https://bitcoinstamps.xyz'
const LOCALES = ['en', 'es', 'fr', 'zh', 'tr']

// ---------------------------------------------------------------------------
// Diagnostics accumulators
// ---------------------------------------------------------------------------
const errors = []
const warnings = []
let objectsChecked = 0
let sourcesValidated = 0

const err = (source, msg) => errors.push(`${source}: ${msg}`)
const warn = (source, msg) => warnings.push(`${source}: ${msg}`)

async function exists(p) {
  try {
    await access(p, constants.F_OK)
    return true
  } catch {
    return false
  }
}

// ---------------------------------------------------------------------------
// JSON-LD extraction
// ---------------------------------------------------------------------------
const LD_BLOCK_RE =
  /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi

/**
 * Extract & JSON.parse every ld+json block from an HTML string.
 * Returns { objects: [...roots], parseErrors: [msg...] }.
 */
function extractJsonLdFromHtml(html) {
  const objects = []
  const parseErrors = []
  let m
  let idx = 0
  while ((m = LD_BLOCK_RE.exec(html)) !== null) {
    idx += 1
    const raw = m[1].trim()
    if (!raw) {
      parseErrors.push(`block #${idx} is empty`)
      continue
    }
    try {
      objects.push(JSON.parse(raw))
    } catch (e) {
      parseErrors.push(`block #${idx} is not valid JSON (${e.message})`)
    }
  }
  return { objects, parseErrors }
}

// ---------------------------------------------------------------------------
// Recursive walkers
// ---------------------------------------------------------------------------
/** Yield every plain object found within `node` (depth-first, incl. root). */
function* walkObjects(node) {
  if (Array.isArray(node)) {
    for (const item of node) yield* walkObjects(item)
  } else if (node && typeof node === 'object') {
    yield node
    for (const key of Object.keys(node)) yield* walkObjects(node[key])
  }
}

/** Yield [pathLabel, stringValue] for every string leaf in `node`. */
function* walkStrings(node, path = '') {
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) yield* walkStrings(node[i], `${path}[${i}]`)
  } else if (node && typeof node === 'object') {
    for (const key of Object.keys(node)) {
      yield* walkStrings(node[key], path ? `${path}.${key}` : key)
    }
  } else if (typeof node === 'string') {
    yield [path, node]
  }
}

// ---------------------------------------------------------------------------
// Schema-completeness validation (WARN-only)
// ---------------------------------------------------------------------------
const REQUIRED_FIELDS = {
  Organization: ['name', 'url', 'logo'],
  WebSite: ['name', 'url'],
  TechArticle: ['headline', 'author'],
  Article: ['headline'],
  BlogPosting: ['headline', 'author'],
  BreadcrumbList: ['itemListElement'],
  FAQPage: ['name'],
  Person: ['name'],
  SoftwareApplication: ['name'],
  CreativeWork: ['name'],
}

function hasField(obj, field) {
  const v = obj[field]
  if (v === undefined || v === null) return false
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'string') return v.trim().length > 0
  return true
}

/**
 * Validate a JSON-LD graph root: @context + @type presence and the root type's
 * required fields. Completeness is asserted on the ROOT node (the page's / the
 * export's primary schema) — nested support nodes such as `isPartOf`/`publisher`
 * reference stubs are intentionally not required to be complete. Logo/image
 * resolvability is enforced separately and recursively by validateAssets (which
 * is BLOCKING, so a nested Organization.logo is still guarded). All findings
 * here are WARNINGS.
 */
function validateSchemaCompleteness(source, root) {
  // Count every node (incl. nested) for the run summary.
  for (const _ of walkObjects(root)) objectsChecked += 1

  // @context is required only on the graph root (nested nodes inherit it).
  // schema.json ships an array of schemas that already carry @context per item;
  // isApiSchema roots are the array items, checked the same way as HTML roots.
  if (!root['@context']) {
    warn(source, `root JSON-LD object missing @context (@type=${root['@type'] ?? '?'})`)
  }
  const type = root['@type']
  if (typeof type !== 'string') {
    warn(source, 'root JSON-LD object missing @type')
    return
  }
  const req = REQUIRED_FIELDS[type]
  if (req) {
    const missing = req.filter((f) => !hasField(root, f))
    if (missing.length > 0) {
      warn(source, `${type} missing required field(s): ${missing.join(', ')}`)
    }
  }
}

// ---------------------------------------------------------------------------
// Resolvable-asset validation (BLOCKING)
// ---------------------------------------------------------------------------
function collectAssetUrls(node, keys = ['logo', 'image']) {
  const urls = []
  const pushFrom = (val) => {
    if (!val) return
    if (typeof val === 'string') urls.push(val)
    else if (Array.isArray(val)) val.forEach(pushFrom)
    else if (typeof val === 'object' && typeof val.url === 'string') urls.push(val.url)
  }
  for (const obj of walkObjects(node)) {
    for (const key of keys) {
      if (key in obj) pushFrom(obj[key])
    }
  }
  return urls
}

function isSiteLocal(url) {
  return url.startsWith(SITE_ORIGIN) || url.startsWith('/')
}

/** Map a site-local URL to its expected file path inside dist/. */
function urlToDistPath(url) {
  let rel = url.startsWith(SITE_ORIGIN) ? url.slice(SITE_ORIGIN.length) : url
  const q = rel.search(/[?#]/)
  if (q !== -1) rel = rel.slice(0, q)
  rel = rel.replace(/^\/+/, '')
  return join(DIST_DIR, rel)
}

async function validateAssets(source, root) {
  const urls = [...new Set(collectAssetUrls(root))]
  for (const url of urls) {
    if (!isSiteLocal(url)) continue // external asset — not our concern
    const distPath = urlToDistPath(url)
    if (!(await exists(distPath))) {
      err(
        source,
        `structured-data asset does not exist in dist/: ${url} (expected ${distPath.replace(DIST_DIR, 'dist')})`,
      )
    }
  }
}

// ---------------------------------------------------------------------------
// Cultural-invariant validation (BLOCKING)
// ---------------------------------------------------------------------------
const KEVIN_WORD_RE = /\bkevin\b/gi
const MIKEINSPACE_RE = /mikeinspace/gi
// Text fields that carry rendered/display references (URLs & ids excluded).
const CAPS_TEXT_FIELDS = new Set([
  'name',
  'headline',
  'alternateName',
  'description',
  'culturalSignificance',
  'teaches',
])
// Breadcrumb labels are derived from URL slugs (e.g. "Kevin-Origin") and are not
// entity references — exclude them from the ALL-CAPS check to avoid false positives.
const CAPS_SKIP_TYPES = new Set(['ListItem'])

function personName(val) {
  if (!val) return undefined
  if (typeof val === 'string') return val
  if (Array.isArray(val)) return val.map(personName).find(Boolean)
  if (typeof val === 'object') return typeof val.name === 'string' ? val.name : undefined
  return undefined
}

function isKevinName(name) {
  if (typeof name !== 'string') return false
  return /^kevin(\s+token)?$/i.test(name.trim())
}

function validateCulturalInvariants(source, root) {
  // (c) mikeinspace always lowercase, wherever it appears — scanned once over
  // every string leaf so nested objects are not re-inspected (avoids dup reports).
  for (const [, s] of walkStrings(root)) {
    const matches = s.match(MIKEINSPACE_RE)
    if (matches) {
      for (const hit of matches) {
        if (hit !== 'mikeinspace') {
          err(source, `"mikeinspace" must be lowercase but found "${hit}": "${s.slice(0, 90)}"`)
        }
      }
    }
  }

  for (const obj of walkObjects(root)) {
    const type = obj['@type']

    // (a) KEVIN ALL-CAPS in display/prose text fields (breadcrumb labels excluded).
    if (!(typeof type === 'string' && CAPS_SKIP_TYPES.has(type))) {
      for (const field of CAPS_TEXT_FIELDS) {
        const v = obj[field]
        const strings =
          typeof v === 'string' ? [v] : Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []
        for (const s of strings) {
          const matches = s.match(KEVIN_WORD_RE)
          if (matches) {
            for (const hit of matches) {
              if (hit !== 'KEVIN') {
                err(
                  source,
                  `KEVIN must be ALL-CAPS but found "${hit}" in ${type ?? '?'}.${field}: "${s.slice(0, 90)}"`,
                )
              }
            }
          }
        }
      }
    }

    // (b) KEVIN creator/author must be Arwyn, never Reinamora.
    if (isKevinName(obj.name)) {
      for (const attr of ['creator', 'author']) {
        if (attr in obj) {
          const who = personName(obj[attr])
          if (who !== undefined && who !== 'Arwyn') {
            err(source, `KEVIN ${attr} must be "Arwyn" but found "${who}" (@type=${type ?? '?'})`)
          }
          if (who === 'Reinamora') {
            err(
              source,
              `KEVIN ${attr} must never be "Reinamora" (Arwyn is the creator; @type=${type ?? '?'})`,
            )
          }
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// entities.json — flat entity store shape (creator is a plain string field)
// ---------------------------------------------------------------------------
function validateEntitiesStore(source, data) {
  const groups = data?.entities
  if (!groups || typeof groups !== 'object') {
    warn(source, 'no .entities object found — skipping entity-store cultural checks')
    return
  }
  const all = [
    ...(groups.protocols || []),
    ...(groups.concepts || []),
    ...(groups.tools || []),
  ]
  const kevin = all.find((e) => e && e.id === 'kevin')
  if (kevin) {
    if (kevin.creator !== 'Arwyn') {
      err(source, `KEVIN entity creator must be "Arwyn" but found "${kevin.creator ?? 'undefined'}"`)
    }
    const nm = typeof kevin.name === 'string' ? kevin.name : ''
    if (/\bkevin\b/i.test(nm) && !/\bKEVIN\b/.test(nm)) {
      err(source, `KEVIN entity name must be ALL-CAPS but found "${nm}"`)
    }
  }
  const mike = all.find((e) => e && e.id === 'mikeinspace')
  if (mike && typeof mike.name === 'string' && mike.name !== 'mikeinspace') {
    err(source, `mikeinspace entity name must be lowercase but found "${mike.name}"`)
  }
}

// ---------------------------------------------------------------------------
// Source drivers
// ---------------------------------------------------------------------------
async function validateHtmlFile(relLabel, absPath) {
  const html = await readFile(absPath, 'utf-8')
  const { objects, parseErrors } = extractJsonLdFromHtml(html)
  for (const pe of parseErrors) err(relLabel, pe)
  if (objects.length === 0 && parseErrors.length === 0) {
    warn(relLabel, 'no <script type="application/ld+json"> blocks found')
    return
  }
  sourcesValidated += 1
  for (const root of objects) {
    validateSchemaCompleteness(relLabel, root)
    await validateAssets(relLabel, root)
    validateCulturalInvariants(relLabel, root)
  }
}

async function validateApiSchemaFile(relLabel, absPath) {
  let data
  try {
    data = JSON.parse(await readFile(absPath, 'utf-8'))
  } catch (e) {
    err(relLabel, `not valid JSON (${e.message})`)
    return
  }
  sourcesValidated += 1
  const schemas = Array.isArray(data?.schemas) ? data.schemas : []
  if (schemas.length === 0) {
    warn(relLabel, 'no .schemas array found (unexpected shape)')
  }
  for (const root of schemas) {
    validateSchemaCompleteness(relLabel, root)
    await validateAssets(relLabel, root)
    validateCulturalInvariants(relLabel, root)
  }
}

async function validateApiEntitiesFile(relLabel, absPath) {
  let data
  try {
    data = JSON.parse(await readFile(absPath, 'utf-8'))
  } catch (e) {
    err(relLabel, `not valid JSON (${e.message})`)
    return
  }
  sourcesValidated += 1
  validateEntitiesStore(relLabel, data)
  validateCulturalInvariants(relLabel, data)
}

/** Return the first existing .html file in `dir` matching `pred`, or null. */
async function firstMatch(dir, pred) {
  if (!(await exists(dir))) return null
  const entries = await readdir(dir)
  const hit = entries.filter((e) => e.endsWith('.html') && pred(e)).sort()[0]
  return hit ? join(dir, hit) : null
}

// ---------------------------------------------------------------------------
// Sample selection
// ---------------------------------------------------------------------------
async function collectSampleHtml() {
  /** @type {Array<[string,string]>} label -> abs path */
  const samples = []
  const add = (label, p) => {
    if (p) samples.push([label, p])
  }

  // One homepage per locale (the locale root index.html carries the WebSite/Org schema).
  for (const loc of LOCALES) {
    const p = join(DIST_DIR, loc, 'index.html')
    if (await exists(p)) add(`${loc}/index.html`, p)
  }

  // One protocol page (prefer src-20; fall back to first protocol page).
  {
    const preferred = join(DIST_DIR, 'en', 'protocols', 'src-20.html')
    add(
      'en/protocols/src-20.html',
      (await exists(preferred)) ? preferred : await firstMatch(join(DIST_DIR, 'en', 'protocols'), () => true),
    )
  }
  // One tutorial page.
  add('en/tutorials/*', await firstMatch(join(DIST_DIR, 'en', 'tutorials'), (e) => e !== 'index.html'))
  // One blog post (a dated post, not the index).
  add('en/blog/*', await firstMatch(join(DIST_DIR, 'en', 'blog'), (e) => e !== 'index.html'))
  // One narrative page (KEVIN-heavy content — strong caps/creator coverage).
  add('en/narratives/*', await firstMatch(join(DIST_DIR, 'en', 'narratives'), (e) => e !== 'index.html'))

  return samples
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('🔎 JSON-LD / structured-data validation gate')
  console.log(`   dist: ${DIST_DIR}\n`)

  if (!(await exists(DIST_DIR))) {
    console.log('⚠️  dist/ not found — nothing to validate.')
    console.log('   Build first with `npm run docs:build`, then re-run.')
    console.log('   (Skipping with success so local no-build runs are not blocked;')
    console.log('    in CI this job runs after the build, so dist/ will exist.)')
    process.exit(0)
  }

  // 1. HTML samples
  const htmlSamples = await collectSampleHtml()
  for (const [label, p] of htmlSamples) {
    await validateHtmlFile(label, p)
  }

  // 2. Generated API structured data (these MUST exist in a real build).
  const schemaPath = join(DIST_DIR, 'api', 'schema.json')
  const entitiesPath = join(DIST_DIR, 'api', 'entities.json')

  if (await exists(schemaPath)) await validateApiSchemaFile('api/schema.json', schemaPath)
  else err('api/schema.json', 'missing from dist/ (expected generated LEO API file)')

  if (await exists(entitiesPath)) await validateApiEntitiesFile('api/entities.json', entitiesPath)
  else err('api/entities.json', 'missing from dist/ (expected generated LEO API file)')

  // Report (dedupe identical findings surfaced via multiple traversal paths)
  const uniqWarnings = [...new Set(warnings)]
  const uniqErrors = [...new Set(errors)]

  console.log(`Sources validated: ${sourcesValidated} (HTML samples: ${htmlSamples.length})`)
  console.log(`JSON-LD objects inspected: ${objectsChecked}\n`)

  if (uniqWarnings.length > 0) {
    console.log(`⚠️  ${uniqWarnings.length} warning(s) (non-blocking, schema-completeness):`)
    for (const w of uniqWarnings) console.log(`   - ${w}`)
    console.log('')
  }

  if (uniqErrors.length > 0) {
    console.log(`❌ ${uniqErrors.length} BLOCKING error(s):`)
    for (const e of uniqErrors) console.log(`   - ${e}`)
    console.log('\n🚨 JSON-LD validation FAILED. Fix the errors above.')
    process.exit(1)
  }

  console.log('✅ JSON-LD validation passed — cultural invariants and asset references are sound.')
}

main().catch((e) => {
  console.error('❌ validate-jsonld.mjs crashed:', e)
  process.exit(1)
})
