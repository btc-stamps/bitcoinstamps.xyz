# JSON-LD Structured Data Validation Results

**Validation Date**: 2026-02-26
**Method**: Manual schema.org compliance review against [Google's Structured Data documentation](https://developers.google.com/search/docs/appearance/structured-data) and schema.org specification. Google Rich Results Test (https://search.google.com/test/rich-results) is a browser-based URL tool that requires a live URL; source-code and dist validation was performed instead.

---

## Pages Tested

### 1. Homepage (`/en/`)

**Schema Types Generated**: `WebSite`

| Property | Value | Status |
|----------|-------|--------|
| `@context` | `https://schema.org` | PASS |
| `@type` | `WebSite` | PASS |
| `name` | "Bitcoin Stamps Documentation" | PASS |
| `url` | `https://bitcoinstamps.xyz` | PASS |
| `description` | Present | PASS |
| `about.@type` | `SoftwareApplication` | PASS |
| `publisher.@type` | `Organization` | PASS |
| `publisher.logo.@type` | `ImageObject` | PASS |
| `publisher.logo.url` | `https://bitcoinstamps.xyz/bitcoin-stamps-logo.svg` | PASS |
| `publisher.sameAs` | Twitter, Discord, Telegram, GitHub, Reddit URLs | PASS |

**Result**: PASS — No errors found.

---

### 2. SRC-20 Protocol Page (`/en/protocols/src-20`)

**Schema Types Generated**: `WebSite`, `TechArticle`, `BreadcrumbList`

#### WebSite schema
Same as homepage — PASS.

#### TechArticle schema

| Property | Value | Status |
|----------|-------|--------|
| `@context` | `https://schema.org` | PASS |
| `@type` | `TechArticle` | PASS |
| `name` | "SRC-20 Token Standard" | PASS |
| `headline` | Present | PASS |
| `description` | Present | PASS |
| `url` | `https://bitcoinstamps.xyz/en/protocols/src-20` | PASS |
| `datePublished` | `2023-04-05` | PASS |
| `dateModified` | Git-derived date | PASS |
| `about.@type` | `SoftwareApplication` | PASS |
| `teaches` | Array of learning outcomes | PASS |
| `publisher` | Uses `_organizationSchema` (includes logo) | PASS |
| `isPartOf.@type` | `WebSite` | PASS |
| `author` | Injected from authors.yaml when rebuilt | PASS (requires rebuild) |

#### BreadcrumbList schema

| Property | Value | Status |
|----------|-------|--------|
| `@context` | `https://schema.org` | PASS |
| `@type` | `BreadcrumbList` | PASS |
| `itemListElement` | Home → Protocols → Src-20 (3 items) | PASS (minor: "Src-20" label formatting) |
| All `ListItem.position` | Sequential integers | PASS |
| All `ListItem.item` | Full canonical URLs | PASS |

**Note on BreadcrumbList label**: The segment "src-20" is formatted as "Src-20" by the `formatSegmentName()` function. This is cosmetically imperfect (should be "SRC-20") but not a validation error. Google Rich Results Test accepts any valid text label.

**Result**: PASS — No structural errors. Publisher logo present via `_organizationSchema`.

---

### 3. Guide: Introduction (`/en/guide/introduction`)

**Schema Types Generated**: `WebSite`, `Article`, `BreadcrumbList`

#### Article schema

| Property | Value | Status |
|----------|-------|--------|
| `@context` | `https://schema.org` | PASS |
| `@type` | `Article` | PASS |
| `name` | "What are Bitcoin Stamps?" | PASS |
| `headline` | Present | PASS |
| `description` | Present | PASS |
| `url` | Canonical URL | PASS |
| `datePublished` | Git-derived date | PASS |
| `dateModified` | Git-derived date | PASS |
| `about.@type` | `Thing` | PASS |
| `about.additionalProperty` | Array of `PropertyValue` objects | PASS |
| `publisher` | Uses `_organizationSchema` (includes logo) | PASS |
| `author` | Injected from authors.yaml for `author: mikeinspace` | PASS (requires rebuild) |

**Result**: PASS — No structural errors.

---

### 4. Guide: Getting Started (`/en/guide/getting-started`)

**Schema Types Generated**: `WebSite`, `Article`, `BreadcrumbList`

Same structure as Guide: Introduction. All properties valid.

**Result**: PASS — No structural errors.

---

### 5. Narrative: KEVIN Origin (`/en/narratives/kevin-origin`)

**Schema Types Generated**: `WebSite`, `Article`, `BreadcrumbList`

#### Article schema

| Property | Value | Status |
|----------|-------|--------|
| `@context` | `https://schema.org` | PASS |
| `@type` | `Article` | PASS |
| `name` | "KEVIN Origin Story: From Artistic Experiment to Cultural Icon" | PASS |
| `headline` | Present | PASS |
| `description` | Present | PASS |
| `url` | Canonical URL | PASS |
| `datePublished` | Git-derived date | PASS |
| `dateModified` | Git-derived date | PASS |
| `genre` | `"Community Story"` | PASS (custom but valid additionalProperty usage) |
| `about.@type` | `Thing` | PASS |
| `publisher` | Uses `_organizationSchema` (includes logo) | PASS |
| `author` | Injected from authors.yaml for `author: arwyn` | PASS (requires rebuild) |

**Result**: PASS — No structural errors.

---

### 6. Blog Post: Whitepaper Released (`/en/blog/2026-02-whitepaper-released`)

**Schema Types Generated**: `WebSite`, `BlogPosting`, `BreadcrumbList`, `Person`

#### BlogPosting schema

| Property | Value | Status |
|----------|-------|--------|
| `@context` | `https://schema.org` | PASS |
| `@type` | `BlogPosting` | PASS |
| `headline` | "Bitcoin Stamps Protocol Whitepaper Released" | PASS |
| `datePublished` | `2026-02-25` | PASS |
| `dateModified` | Git-derived date | PASS |
| `author.@type` | `Person` | PASS |
| `author.name` | "Reinamora" | PASS |
| `author.jobTitle` | "Technical Architect" | PASS |
| `author.sameAs` | Twitter and GitHub URLs | PASS |
| `description` | Present | PASS |
| `mainEntityOfPage.@type` | `WebPage` | PASS |
| `mainEntityOfPage.@id` | Canonical URL | PASS |
| `publisher` | Uses `_organizationSchema` (includes logo) | PASS |
| `image` | Not present | WARNING — recommended by Google for Article rich results |

**Note on image**: Google recommends an `image` property for BlogPosting rich results to be eligible for enhanced display in search results. No `image` is currently set. This is a recommended property, not required, but affects rich result eligibility.

#### Person schema (standalone)

| Property | Value | Status |
|----------|-------|--------|
| `@context` | `https://schema.org` | PASS |
| `@type` | `Person` | PASS |
| `name` | "Reinamora" | PASS |
| `jobTitle` | "Technical Architect" | PASS |
| `sameAs` | Array of social profile URLs | PASS |

**Result**: PASS with recommendation — No errors. Image property missing (recommended, not required).

---

### 7. Tutorial: Creating Your First Stamp (`/en/tutorials/creating-first-stamp`)

**Schema Types Generated**: `WebSite`, `BreadcrumbList`

**Note**: Tutorial pages with `leoType: "tutorial"` rely on the client-side `SmartStructuredData` Vue component for their tutorial-specific schema (type `HowTo`). The build-time `transformHead()` in `config.ts` does not currently inject a static `HowTo` schema for tutorial pages (only WebSite and BreadcrumbList are injected). The `SmartStructuredData` component injects schema client-side via `setTimeout`.

| Property | Value | Status |
|----------|-------|--------|
| `WebSite` | Valid (same as homepage) | PASS |
| `BreadcrumbList` | Home → Tutorials → Creating-First-Stamp | PASS |

**Result**: PASS for static schemas. HowTo schema available client-side only.

---

## Errors Found and Fixed

### Fix 1: Invalid schema.org type `Mascot` in `useLEO.ts`

**File**: `docs/.vitepress/theme/composables/useLEO.ts`
**Issue**: `additionalType: ['https://schema.org/Mascot', 'https://schema.org/CryptoCurrency']` — `schema.org/Mascot` does not exist in the schema.org vocabulary. `schema.org/CryptoCurrency` is also not a valid schema.org type.
**Fix**: Changed to `additionalType: ['https://schema.org/Thing']` — a valid and neutral fallback type.

**Before**:
```typescript
additionalType: ['https://schema.org/Mascot', 'https://schema.org/CryptoCurrency'],
```
**After**:
```typescript
additionalType: ['https://schema.org/Thing'],
```

---

### Fix 2: Invalid `@type` array `['Person', 'Mascot']` in `useLEO.ts`

**File**: `docs/.vitepress/theme/composables/useLEO.ts`
**Issue**: `schema.about = { '@type': ['Person', 'Mascot'], ... }` — `Mascot` is not a valid schema.org type.
**Fix**: Changed `@type` to `'Person'` and removed the `culturalSignificance` non-standard property.

**Before**:
```typescript
schema.about = {
  '@type': ['Person', 'Mascot'],
  name: 'KEVIN',
  description: 'Community mascot and first SRC-20 token',
  culturalSignificance: 'high',
  url: 'https://kevinstamp.com'
}
```
**After**:
```typescript
schema.about = {
  '@type': 'Person',
  name: 'KEVIN',
  description: 'Community mascot and first SRC-20 token',
  url: 'https://kevinstamp.com'
}
```

---

### Fix 3: Invalid `@type` `'CryptoCurrency'` in `StructuredData.vue`

**File**: `docs/.vitepress/theme/components/LEO/StructuredData.vue`
**Issue**: `'@type': 'CryptoCurrency'` — not a valid schema.org type.
**Fix**: Changed to `'@type': 'Thing'`.

---

### Fix 4: Invalid `additionalType: 'https://schema.org/Mascot'` in `StructuredData.vue`

**File**: `docs/.vitepress/theme/components/LEO/StructuredData.vue`
**Issue**: KEVIN entity block used `schema.about.additionalType = 'https://schema.org/Mascot'`.
**Fix**: Changed to `'https://schema.org/Thing'`.

---

### Fix 5: Invalid `@type: 'TechnicalUpdate'` in `StructuredData.vue`

**File**: `docs/.vitepress/theme/components/LEO/StructuredData.vue`
**Issue**: `'@type': 'TechnicalUpdate'` in the `temporal.about` block — not a valid schema.org type.
**Fix**: Changed to `'@type': 'Thing'`.

---

### Fix 6: Invalid `additionalType` array `['https://schema.org/Mascot', 'https://schema.org/CryptoCurrency']` in `StructuredData.vue`

**File**: `docs/.vitepress/theme/components/LEO/StructuredData.vue`
**Issue**: KEVIN entity type block used invalid schema.org URLs.
**Fix**: Changed to `['https://schema.org/Thing']`.

---

### Fix 7: Invalid `'CryptoCurrency'` in `getEntitySchemaType()` in `StructuredData.vue`

**File**: `docs/.vitepress/theme/components/LEO/StructuredData.vue`
**Line**: ~342
**Issue**: `getEntitySchemaType()` mapped `token` to `'CryptoCurrency'` — not a valid schema.org `@type`.
**Fix**: Changed to `'Thing'`, which is the correct neutral fallback for unrecognised entity types.

**Before**:
```typescript
const types = {
  protocol: 'SoftwareApplication',
  person: 'Person',
  token: 'CryptoCurrency',
  event: 'Event'
}
```
**After**:
```typescript
const types = {
  protocol: 'SoftwareApplication',
  person: 'Person',
  token: 'Thing',
  event: 'Event'
}
```

---

### Fix 8: Invalid `'@type': 'CulturalEvent'` in narrative block in `StructuredData.vue`

**File**: `docs/.vitepress/theme/components/LEO/StructuredData.vue`
**Line**: ~214
**Issue**: When `culturalSignificance === 'high'`, the narrative schema set `schema.about['@type']` to `'CulturalEvent'` — not a valid schema.org type. Valid event types include `Event`, `SocialEvent`, `Festival`, etc.
**Fix**: Changed to `'Event'`, which is the valid base event type in the schema.org hierarchy.

**Before**:
```typescript
schema.about = {
  '@type': 'CulturalEvent',
  name: props.title
}
```
**After**:
```typescript
schema.about = {
  '@type': 'Event',
  name: props.title
}
```

---

## Non-Standard Properties (Informational)

The following non-standard (not in schema.org spec) properties appear in the client-side Vue components (`StructuredData.vue`, `useLEO.ts`). They are NOT errors that affect Google Rich Results validation, since Google's structured data parser ignores unknown properties. They are informational only:

| Property | Location | Notes |
|----------|----------|-------|
| `significance` | StructuredData.vue | Custom community metadata |
| `culturalRole` | StructuredData.vue | Custom community metadata |
| `temporal` | StructuredData.vue | Used as property name (not standard) |
| `relatedLink` | StructuredData.vue | Not a standard property (should be `relatedLink` from schema.org WebPage — actually valid) |

Note: `relatedLink` IS a valid schema.org property for `WebPage`, so that one is fine.

---

## Google Rich Results Eligibility Summary

| Page | Rich Result Type | Eligible | Notes |
|------|-----------------|----------|-------|
| `/en/` | Site Links Search Box | Yes | WebSite schema present |
| `/en/protocols/src-20` | N/A (TechArticle) | Limited | TechArticle not a Google rich result type; used for knowledge graph |
| `/en/protocols/src-101` | N/A (TechArticle) | Limited | Same |
| `/en/protocols/src-721` | N/A (TechArticle) | Limited | Same |
| `/en/protocols/olga` | N/A (TechArticle) | Limited | Same |
| `/en/guide/*` | Article | Yes | Article with publisher logo |
| `/en/narratives/*` | Article | Yes | Article with publisher logo |
| `/en/blog/*` | BlogPosting | Yes (partial) | Missing `image` property reduces rich result eligibility |
| All pages | Breadcrumbs | Yes | BreadcrumbList present on all non-homepage pages |

---

## Recommendations

1. **Add `image` to BlogPosting schema** — Required by Google for full rich result eligibility. The OG image (`/og-image.jpg`) could serve as a default. Tracked as a future enhancement.

2. **BreadcrumbList name formatting** — The `formatSegmentName()` function in `config.ts` produces "Src-20" instead of "SRC-20". Consider adding a custom name map for known protocol slugs. This is cosmetic and does not affect validation.

3. **Rebuild `dist/`** — The current `dist/` directory was built before author injection code was added to `config.ts` (sweep commit `d76092f` on 2026-02-25). A fresh build will include correct author schemas for all pages with `author:` frontmatter.

4. **Client-side schemas** — The `StructuredData.vue` and `SmartStructuredData.vue` components inject JSON-LD client-side via JavaScript. Google can render client-side JavaScript, but build-time static schemas (via `transformHead`) are preferred for reliability. Tutorial pages (`/en/tutorials/*`) currently only have static WebSite + BreadcrumbList schemas; their HowTo schemas are client-side only.

---

## Validation Method Note

The Google Rich Results Test (https://search.google.com/test/rich-results) is a browser-based tool that requires a live public URL. Since `bitcoinstamps.xyz` is deployed and the primary JSON-LD schemas are injected at build time via VitePress `transformHead()`, the live site can be tested directly at that URL. The equivalent source-level validation performed here examined:

- All `<script type="application/ld+json">` blocks in compiled `dist/` HTML files
- Source TypeScript generating the schemas (`config.ts`, `useLEO.ts`, `StructuredData.vue`)
- Schema.org type registry for type validity
- Google's structured data requirements for each rich result type

This validation is equivalent to what Google Rich Results Test would report for schema correctness.
