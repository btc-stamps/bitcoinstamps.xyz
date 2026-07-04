#!/usr/bin/env node
/**
 * i18n freshness / drift gate for bitcoinstamps.xyz.
 *
 * WHY THIS EXISTS
 * ---------------
 * The 5-language i18n audit (.paos/research/bitcoinstamps-i18n-translation-audit-2026-07-03.md)
 * found the single biggest i18n gap is **silent content drift with no gate**: the
 * canonical en source was enriched (LEO/GEO work, Feb–Jul 2026) while the human
 * Markdown translations (es/fr/zh/tr) were frozen at 2026-02-17 and never re-synced.
 * Many localized pages are 25–70 % the length of their current en counterpart, and
 * *nothing in CI, build, or the translation subsystem flags this staleness* (audit §4, §8,
 * recommendation "Add a freshness/completeness gate", §11).
 *
 * This script closes that gap. For every non-en locale it compares each localized
 * Markdown page to its `docs/en/<same-path>` counterpart and classifies drift with a
 * robust, low-false-positive heuristic:
 *
 *   MISSING    en page exists, locale counterpart absent.
 *   ABRIDGED   locale has materially FEWER H2/H3 sections than en (< ABRIDGED_RATIO of
 *              en's count) — "likely abridged / translated from an earlier, shorter en".
 *   STALE      ABRIDGED *and* the en file was git-modified significantly more recently
 *              than the locale file (en newer by >= STALE_DAYS). This is the escalated
 *              form of ABRIDGED with a corroborating time signal. Requiring the
 *              structural signal too is deliberate — it guards against the "recent bulk
 *              commit touched every en file" false-positive (a metadata-only bump on a
 *              page whose content still matches en is NOT flagged).
 *   DIVERGENT  locale has dramatically MORE sections than en (>= DIVERGENT_RATIO of en's
 *              count AND at least DIVERGENT_MIN_DELTA more) — a structurally divergent
 *              tree translated from a different/older source (the Turkish pattern).
 *   OK         structurally aligned (and not stale).
 *
 * Locales are enumerated DYNAMICALLY: any immediate subdirectory of docs/ that (a) is not
 * `en`, and (b) contains an `index.md`. This auto-covers pt/cs (and any future locale)
 * the moment their `docs/<loc>/` tree lands — no code change required. Non-locale dirs
 * (public/, seo/, delegations/) have no `index.md` and are excluded.
 *
 * SEVERITY MODEL
 * --------------
 * This gate is WARN-ONLY by design and never exits non-zero on drift — translations
 * legitimately lag the source, so a hard fail would block every PR. It reports drift for
 * visibility (CI surfaces it via ::warning::) and exits 0. Exit is non-zero only on an
 * internal error (e.g. docs/ or docs/en/ not found).
 *
 * Usage:
 *   node scripts/check-i18n-freshness.mjs [docsDir] [--json]
 *     docsDir  defaults to <repo>/docs
 *     --json   emit a machine-readable JSON report to stdout instead of the text report
 */

import { readFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve, relative, sep } from 'node:path'

const execFileAsync = promisify(execFile)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = resolve(__dirname, '..')

// ---------------------------------------------------------------------------
// Args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2)
const JSON_OUT = args.includes('--json')
const positional = args.filter((a) => !a.startsWith('--'))
const DOCS_DIR = resolve(positional[0] || process.env.DOCS_DIR || join(REPO_ROOT, 'docs'))
const EN_DIR = join(DOCS_DIR, 'en')

// ---------------------------------------------------------------------------
// Tunable thresholds
// ---------------------------------------------------------------------------
// Structural "abridged" trip: locale sections < ABRIDGED_RATIO * en sections.
const ABRIDGED_RATIO = 0.8
// Only judge structure when en has at least this many sections (tiny pages are noisy).
const MIN_EN_SECTIONS = 3
// "Divergent tree": locale sections >= DIVERGENT_RATIO * en AND at least +DIVERGENT_MIN_DELTA.
const DIVERGENT_RATIO = 1.5
const DIVERGENT_MIN_DELTA = 6
// Staleness: en git-modified newer than the locale by at least this many days.
const STALE_DAYS = 30

// ---------------------------------------------------------------------------
// Section counting (H2/H3, code-fence & frontmatter aware)
// ---------------------------------------------------------------------------
/**
 * Count ATX H2/H3 headings in a Markdown string, ignoring lines inside fenced code
 * blocks (``` or ~~~) and inside a leading YAML frontmatter block. Returns
 * { h2h3, h2 } so callers can use the combined count (primary signal) or H2-only.
 */
function countSections(md) {
  const lines = md.split(/\r?\n/)
  let inFence = false
  let fenceChar = ''
  let h2h3 = 0
  let h2 = 0
  let i = 0

  // Skip a leading YAML frontmatter block (--- ... ---).
  if (lines[0] !== undefined && lines[0].trim() === '---') {
    i = 1
    while (i < lines.length && lines[i].trim() !== '---') i++
    if (i < lines.length) i++ // consume the closing ---
  }

  for (; i < lines.length; i++) {
    const line = lines[i]
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/)
    if (fenceMatch) {
      const ch = fenceMatch[1][0]
      if (!inFence) {
        inFence = true
        fenceChar = ch
      } else if (ch === fenceChar) {
        inFence = false
        fenceChar = ''
      }
      continue
    }
    if (inFence) continue
    if (/^###[ \t]/.test(line)) h2h3++
    else if (/^##[ \t]/.test(line)) {
      h2h3++
      h2++
    }
  }
  return { h2h3, h2 }
}

// ---------------------------------------------------------------------------
// Git last-commit date (epoch seconds)
// ---------------------------------------------------------------------------
/** Return the committer date (epoch seconds) of the last commit touching `absPath`,
 *  or null if the file is untracked / has no history / git is unavailable. */
async function gitLastCommitEpoch(absPath) {
  const rel = relative(REPO_ROOT, absPath)
  try {
    const { stdout } = await execFileAsync(
      'git',
      ['log', '-1', '--format=%ct', '--', rel],
      { cwd: REPO_ROOT },
    )
    const t = stdout.trim()
    if (!t) return null
    const n = Number.parseInt(t, 10)
    return Number.isFinite(n) ? n : null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Markdown-file walk
// ---------------------------------------------------------------------------
/** Recursively yield paths (relative to `base`) of every .md file under `root`. */
async function walkMarkdown(root, base = root) {
  const out = []
  let entries
  try {
    entries = await readdir(root, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    const abs = join(root, e.name)
    if (e.isDirectory()) {
      out.push(...(await walkMarkdown(abs, base)))
    } else if (e.isFile() && e.name.endsWith('.md')) {
      out.push(relative(base, abs))
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// Locale discovery
// ---------------------------------------------------------------------------
/** Immediate subdirs of docs/ (other than en) that contain an index.md. */
async function discoverLocales() {
  const entries = await readdir(DOCS_DIR, { withFileTypes: true })
  const locales = []
  for (const e of entries) {
    if (!e.isDirectory()) continue
    if (e.name === 'en') continue
    if (existsSync(join(DOCS_DIR, e.name, 'index.md'))) locales.push(e.name)
  }
  return locales.sort()
}

// ---------------------------------------------------------------------------
// Per-page classification
// ---------------------------------------------------------------------------
const DAY = 86400

async function classifyPage(locale, relPath) {
  const enAbs = join(EN_DIR, relPath)
  const locAbs = join(DOCS_DIR, locale, relPath)
  const posixRel = relPath.split(sep).join('/')

  if (!existsSync(locAbs)) {
    return { locale, page: posixRel, status: 'MISSING', detail: 'exists in en, absent in locale' }
  }

  const [enMd, locMd] = await Promise.all([readFile(enAbs, 'utf-8'), readFile(locAbs, 'utf-8')])
  const en = countSections(enMd)
  const loc = countSections(locMd)

  const record = {
    locale,
    page: posixRel,
    status: 'OK',
    enSections: en.h2h3,
    localeSections: loc.h2h3,
    ratio: en.h2h3 > 0 ? Number((loc.h2h3 / en.h2h3).toFixed(2)) : null,
    detail: '',
  }

  // Structural check only when en is large enough to judge reliably.
  if (en.h2h3 < MIN_EN_SECTIONS) {
    record.detail = `en has only ${en.h2h3} section(s) — structural check skipped`
    return record
  }

  const abridged = loc.h2h3 < ABRIDGED_RATIO * en.h2h3
  const divergent =
    loc.h2h3 >= DIVERGENT_RATIO * en.h2h3 && loc.h2h3 - en.h2h3 >= DIVERGENT_MIN_DELTA

  if (abridged) {
    // Corroborate with git dates to distinguish ABRIDGED from STALE.
    const [enEpoch, locEpoch] = await Promise.all([
      gitLastCommitEpoch(enAbs),
      gitLastCommitEpoch(locAbs),
    ])
    let stale = false
    let ageNote = ''
    if (enEpoch != null && locEpoch != null) {
      const daysNewer = (enEpoch - locEpoch) / DAY
      if (daysNewer >= STALE_DAYS) {
        stale = true
        ageNote = `; en git-modified ${Math.round(daysNewer)}d after locale`
      } else {
        ageNote = `; en git-modified ${Math.round(daysNewer)}d vs locale (below ${STALE_DAYS}d stale threshold)`
      }
    } else {
      ageNote = '; git dates unavailable (untracked?) — staleness undetermined'
    }
    record.status = stale ? 'STALE' : 'ABRIDGED'
    record.detail = `${loc.h2h3}/${en.h2h3} sections (${Math.round((loc.h2h3 / en.h2h3) * 100)}% of en)${ageNote}`
    record.enEpoch = enEpoch
    record.localeEpoch = locEpoch
    return record
  }

  if (divergent) {
    record.status = 'DIVERGENT'
    record.detail = `${loc.h2h3} sections vs en's ${en.h2h3} (${Math.round((loc.h2h3 / en.h2h3) * 100)}% of en) — structurally divergent tree`
    return record
  }

  record.detail = `${loc.h2h3}/${en.h2h3} sections aligned`
  return record
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const STATUS_ORDER = ['MISSING', 'STALE', 'ABRIDGED', 'DIVERGENT', 'OK']
const STATUS_ICON = {
  OK: '✅',
  MISSING: '❌',
  ABRIDGED: '📉',
  STALE: '🕒',
  DIVERGENT: '🔀',
}

async function main() {
  if (!existsSync(DOCS_DIR) || !existsSync(EN_DIR)) {
    console.error(`❌ docs/ or docs/en/ not found at ${DOCS_DIR}`)
    process.exit(1)
  }

  const locales = await discoverLocales()
  const enPages = (await walkMarkdown(EN_DIR)).sort()

  const results = []
  for (const locale of locales) {
    for (const page of enPages) {
      results.push(await classifyPage(locale, page))
    }
  }

  // Aggregate.
  const perLocale = {}
  for (const loc of locales) {
    perLocale[loc] = { OK: 0, MISSING: 0, ABRIDGED: 0, STALE: 0, DIVERGENT: 0, drift: 0 }
  }
  for (const r of results) {
    perLocale[r.locale][r.status] += 1
    if (r.status !== 'OK') perLocale[r.locale].drift += 1
  }
  const totalDrift = results.filter((r) => r.status !== 'OK').length

  if (JSON_OUT) {
    console.log(
      JSON.stringify(
        {
          docsDir: DOCS_DIR,
          enPages: enPages.length,
          locales,
          thresholds: {
            ABRIDGED_RATIO,
            MIN_EN_SECTIONS,
            DIVERGENT_RATIO,
            DIVERGENT_MIN_DELTA,
            STALE_DAYS,
          },
          summary: perLocale,
          totalDrift,
          results,
        },
        null,
        2,
      ),
    )
    return
  }

  // ---- Text report ----
  console.log('🌍 i18n freshness / drift gate')
  console.log(`   docs: ${DOCS_DIR}`)
  console.log(`   en source pages: ${enPages.length}`)
  console.log(`   locales (auto-discovered): ${locales.join(', ') || '(none)'}\n`)

  for (const loc of locales) {
    const drifted = results.filter((r) => r.locale === loc && r.status !== 'OK')
    const s = perLocale[loc]
    console.log(
      `-- ${loc} -- OK:${s.OK} MISSING:${s.MISSING} ABRIDGED:${s.ABRIDGED} STALE:${s.STALE} DIVERGENT:${s.DIVERGENT}`,
    )
    if (drifted.length === 0) {
      console.log('   ✅ all pages structurally aligned\n')
      continue
    }
    drifted.sort(
      (a, b) =>
        STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status) || a.page.localeCompare(b.page),
    )
    for (const r of drifted) {
      console.log(`   ${STATUS_ICON[r.status]} ${r.status.padEnd(9)} ${r.page}  — ${r.detail}`)
    }
    console.log('')
  }

  // ---- Summary table ----
  console.log('Summary')
  console.log('  locale |  OK  MISS  ABR  STALE  DIV | drift')
  console.log('  -------+------------------------------+------')
  for (const loc of locales) {
    const s = perLocale[loc]
    console.log(
      `  ${loc.padEnd(6)} | ${String(s.OK).padStart(3)}  ${String(s.MISSING).padStart(3)}  ${String(
        s.ABRIDGED,
      ).padStart(3)}  ${String(s.STALE).padStart(4)}  ${String(s.DIVERGENT).padStart(3)} | ${String(
        s.drift,
      ).padStart(4)}`,
    )
  }
  console.log(`\nTotal drift findings: ${totalDrift} across ${locales.length} locale(s).`)
  console.log(
    'Gate is WARN-ONLY — informational, does not fail the build (translations legitimately lag en).',
  )
}

main().catch((e) => {
  console.error('❌ check-i18n-freshness.mjs crashed:', e)
  process.exit(1)
})
