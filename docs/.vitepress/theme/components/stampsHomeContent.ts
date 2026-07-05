// ============================================================================
// StampsHome per-locale content module.
//
// PURPOSE
//   Holds every piece of user-facing copy rendered by StampsHome.vue so the
//   dark-tech homepage can be localized without touching the template. The
//   component reads the active VitePress locale and selects the matching entry,
//   falling back to `en` for any locale that has not been translated yet.
//
// TRANSLATION STATUS
//   Only `en` is authored (verbatim copy of the original hardcoded template).
//   `getHomeContent()` returns the `en` object for every other locale for now,
//   so es/fr/zh/tr/pt/cs render English until real translations are added.
//   To translate: copy the `en` object, replace the strings (keep the shape,
//   keep entity ids + variant + href values, keep KEVIN in ALL CAPS and
//   mikeinspace lowercase), and register it in the LOCALES map below.
//
// CULTURAL / VOICE RULES (must survive any translation)
//   - KEVIN is always ALL CAPS.
//   - mikeinspace is always lowercase.
//   - No em-dashes anywhere. Preserve "In Lak'ech Ala K'in" / "I am another you".
//   - Entity fragments carry an `entity` id (kevin, src-20, mikeinspace, arwyn,
//     reinamora, counterparty). Keep them; they drive the LEO entity links.
// ============================================================================

/**
 * A rich-text node. Prose that mixes plain text with entity links, <em> or
 * <code> is expressed as an ordered array of these nodes so translators can
 * reorder / retranslate the plain fragments while the entity markup is kept.
 *   - string / { text }            -> plain text
 *   - { text, tag: 'em' | 'code' } -> wrapped in <em> or <code>
 *   - { text, entity, variant? }   -> <EntityMention entity=... variant=...>
 */
export type RichNode =
  | string
  | { text: string; tag?: 'em' | 'code' }
  | { text: string; entity: string; variant?: 'cultural' | 'subtle' | 'prominent' }

/** One part of a stat number; `accent` renders the orange <span class="sh-accent">. */
export interface StatNumPart {
  text: string
  accent?: boolean
}

export interface Stat {
  num: StatNumPart[]
  label: string
}

export interface CompareRow {
  key: string
  value: string
  hot?: boolean
}

export interface WhyCell {
  id: string
  h3: string
  /** plain string, or rich nodes when the paragraph contains <code>/entities */
  p: string | RichNode[]
}

export interface BuildLink {
  ref: string
  text: string
  href: string
}

export interface BuildPanel {
  tag: string
  h3: string
  p: string | RichNode[]
  links: BuildLink[]
}

export interface TimelineItem {
  block: string
  h4: string
  p: string
}

export interface FooterLink {
  text: string
  href: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface HomeContent {
  hero: {
    eyebrow: string
    h1: string
    sub: string
    tagline: RichNode[]
    ctaPrimary: string
    ctaPrimaryHref: string
    ctaGhost: string
    ctaGhostHref: string
    terminal: {
      ariaLabel: string
      barLabel: string
      prompt: string
      cmd: string
      flag: string
      out1: string
      ok: string
      out2: string
    }
    stampAlt: string
    stampMeta: { label: string; value: string }[]
  }
  stats: {
    ariaLabel: string
    items: Stat[]
  }
  why: {
    index: string
    title: string
    aside: string
    lead: {
      id: string
      h3: string
      p: string
      compareAriaLabel: string
      compare: CompareRow[]
    }
    cells: WhyCell[]
  }
  build: {
    index: string
    title: string
    aside: string
    panels: BuildPanel[]
  }
  origin: {
    index: string
    title: string
    aside: string
    big: string
    p2: RichNode[]
    p3: RichNode[]
    trinity: string[]
    timeline: TimelineItem[]
  }
  values: {
    index: string
    title: string
    aside: string
    lead: RichNode[]
    body: string
    link: FooterLink
  }
  footer: {
    brand: string
    brandDesc: string
    motto: string
    mottoSmall: string
    columns: FooterColumn[]
    legalLeft: string
    legalRight: string
  }
}

// ---------------------------------------------------------------------------
// ENGLISH (source of truth) — verbatim from the original StampsHome template.
// ---------------------------------------------------------------------------
const en: HomeContent = {
  hero: {
    eyebrow: 'Metaprotocol Documentation',
    h1: 'Bitcoin Stamps',
    sub: 'Permanent by consensus.',
    tagline: [
      'Permanent digital assets on Bitcoin, guided by community wisdom and the ancient truth ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      '. Data stamped into the UTXO set itself, unprunable for as long as Bitcoin runs.',
    ],
    ctaPrimary: 'Get Started',
    ctaPrimaryHref: '/en/guide/introduction',
    ctaGhost: '$ view protocols →',
    ctaGhostHref: '/en/protocols/',
    terminal: {
      ariaLabel: 'example mint command',
      barLabel: 'stampchain · mainnet',
      prompt: '$',
      cmd: 'stamp mint',
      flag: '--file kevin.png --encoding p2wsh',
      out1: '→ writing 2,832 bytes into the UTXO set...',
      ok: '✓ stamped',
      out2: 'tx confirmed · block 779,652 · permanence: forever',
    },
    stampAlt: 'Bitcoin Stamp artwork: a rubber stamp above chain links',
    stampMeta: [
      { label: 'stamp:', value: 'genesis' },
      { label: 'enc:', value: 'P2WSH' },
      { label: 'block:', value: '779652' },
    ],
  },
  stats: {
    ariaLabel: 'protocol milestones',
    items: [
      { num: [{ text: '779,652' }], label: 'First stamp · block height' },
      { num: [{ text: 'KEVIN', accent: true }, { text: ' #4258' }], label: 'First KEVIN stamp' },
      { num: [{ text: '#18,516' }], label: 'First SRC-20 token' },
      { num: [{ text: '2,300' }, { text: '+', accent: true }], label: 'KEVIN holders' },
    ],
  },
  why: {
    index: '01',
    title: 'Why Bitcoin Stamps',
    aside: '// permanence as a protocol property',
    lead: {
      id: 'STORAGE MODEL',
      h3: 'Data lives in the UTXO set, the one place Bitcoin can never prune.',
      p: 'Stamps write asset data directly into unspent transaction outputs. Every full node carries the UTXO set as consensus-critical state, so stamp data survives as long as Bitcoin itself. No witness discount, no prunable sidecar.',
      compareAriaLabel: 'storage comparison',
      compare: [
        { key: 'witness data', value: 'prunable, optional for validation' },
        { key: 'off-chain refs', value: 'depends on external hosts staying alive' },
        { key: 'UTXO set', value: 'consensus state, every node, forever', hot: true },
      ],
    },
    cells: [
      {
        id: '02 / ENCODING',
        h3: 'P2WSH encoding',
        p: [
          'Asset bytes pack into ',
          { text: 'P2WSH', tag: 'code' },
          ' outputs using bare multisig-style encoding. Standard transactions, standard relay, zero protocol changes.',
        ],
      },
      {
        id: '03 / TRUST',
        h3: 'No external indexers required',
        p: 'You rebuild a stamp from the chain alone. Indexers add convenience, they stay convenience, they never become a trust dependency for what a stamp is.',
      },
      {
        id: '04 / VERIFIABILITY',
        h3: 'Deterministic across nodes',
        p: [
          'Give every node the same chain and it derives the same stamps in the same order. Numbering, ownership, and ',
          { text: 'SRC-20', entity: 'src-20' },
          ' balances stay pure functions of Bitcoin history.',
        ],
      },
    ],
  },
  build: {
    index: '02',
    title: 'Start building',
    aside: '// two doors, one chain',
    panels: [
      {
        tag: 'For Creators',
        h3: 'Put art on Bitcoin, permanently.',
        p: [
          'Go from your first stamp to launching an ',
          { text: 'SRC-20', entity: 'src-20' },
          ' token. No code required to begin.',
        ],
        links: [
          { ref: '01', text: 'Create your first stamp', href: '/en/tutorials/creating-first-stamp' },
          { ref: '02', text: 'Artist tools and workflows', href: '/en/tutorials/artist-tools' },
          { ref: '03', text: 'Launch an SRC-20 token', href: '/en/tutorials/src20-token-creation' },
        ],
      },
      {
        tag: 'For Developers',
        h3: 'Build on the metaprotocol.',
        p: 'Deterministic indexing, transaction construction, and a full API surface.',
        links: [
          { ref: 'docs', text: 'Protocol specifications', href: '/en/protocols/' },
          { ref: 'sdk', text: 'Transaction-builder SDK', href: '/en/tutorials/sdk-integration' },
          { ref: 'api', text: 'Stampchain API reference', href: '/en/tutorials/api-integration' },
        ],
      },
    ],
  },
  origin: {
    index: '03',
    title: 'The Bitcoin Graffiti Movement',
    aside: '// est. block 779,652',
    big: 'Bitcoin Stamps began as an act of graffiti: art sprayed onto the most permanent wall humanity has ever built.',
    p2: [
      { text: 'mikeinspace', entity: 'mikeinspace' },
      ', the original dreamer, met ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' through the Flooneybin project on ',
      { text: 'Counterparty', entity: 'counterparty' },
      '. When Mike shared the Bitcoin Stamps vision, ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' saw the meme magic and brought in ',
      { text: 'Reinamora', entity: 'reinamora' },
      '. Together they formed The Original Trinity and cut the first stamp at block 779,652.',
    ],
    p3: [
      'Then came ',
      { text: 'KEVIN', entity: 'kevin', variant: 'cultural' },
      '. Stamped at #4258 and reborn as the first ',
      { text: 'SRC-20', entity: 'src-20' },
      " token at #18,516, KEVIN grew from an in-joke into the protocol's patron saint. The community decides what matters on Bitcoin, with no company in charge.",
    ],
    trinity: [
      'mikeinspace: the question',
      'Arwyn: the code',
      'Reinamora: the chain',
    ],
    timeline: [
      {
        block: 'BLOCK 779,652',
        h4: 'The first stamp',
        p: 'Image data lands in the UTXO set. The wall gets marked. The movement begins.',
      },
      {
        block: 'STAMP #4258',
        h4: 'KEVIN appears',
        p: "A pixelated face becomes the community's heartbeat, and its conscience.",
      },
      {
        block: 'STAMP #18,516',
        h4: 'SRC-20 genesis',
        p: 'KEVIN deploys as the first SRC-20 token: fungible assets, stamped rules, zero intermediaries.',
      },
      {
        block: 'TODAY',
        h4: '2,300+ KEVIN holders',
        p: 'The graffiti became a protocol. The protocol stays graffiti at heart.',
      },
    ],
  },
  values: {
    index: '04',
    title: 'Community Values',
    aside: '// no company, no foundation',
    lead: [
      'The Bitcoin Stamps community lives by ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      ', I am another you. Your creativity strengthens our collective expression.',
    ],
    body: "We carry the Rare Pepe tradition forward while embracing Bitcoin's permanence. This movement grew from artists and builders, not corporate planning, and it stands on fair launches and shared creativity.",
    link: { text: 'Meet the community →', href: '/en/community/' },
  },
  footer: {
    brand: 'Bitcoin Stamps',
    brandDesc: 'Community-owned documentation for the Bitcoin Stamps metaprotocol. No company, no foundation. Just the chain and the people stamping on it.',
    motto: '"In Lak\'ech Ala K\'in"',
    mottoSmall: 'I am another you',
    columns: [
      {
        title: 'Protocol',
        links: [
          { text: 'Whitepaper', href: '/en/whitepaper/' },
          { text: 'SRC-20 spec', href: '/en/protocols/src-20' },
          { text: 'SRC-721 spec', href: '/en/protocols/src-721' },
          { text: 'SIP registry', href: '/en/protocols/sips' },
        ],
      },
      {
        title: 'Build',
        links: [
          { text: 'Getting started', href: '/en/guide/introduction' },
          { text: 'Tutorials', href: '/en/tutorials/' },
          { text: 'API reference', href: '/en/tutorials/api-integration' },
          { text: 'tx-builder SDK', href: '/en/tutorials/sdk-integration' },
        ],
      },
      {
        title: 'Community',
        links: [
          { text: 'Stories', href: '/en/narratives/' },
          { text: 'Community hub', href: '/en/community/' },
          { text: 'Economics', href: '/en/guide/economics' },
          { text: 'Updates', href: '/en/blog/' },
        ],
      },
    ],
    legalLeft: '© 2023-2026 Bitcoin Stamps Community · MIT License',
    legalRight: 'permanence: forever',
  },
}

// ---------------------------------------------------------------------------
// Locale registry. Non-en locales fall back to `en` until translated.
// Populate an entry (e.g. `es: { ... }`) to activate a translation.
// ---------------------------------------------------------------------------
const LOCALES: Record<string, HomeContent> = {
  en,
  // es: { ... },  // TODO: translate
  // fr: { ... },  // TODO: translate
  // zh: { ... },  // TODO: translate
  // tr: { ... },  // TODO: translate
  // pt: { ... },  // TODO: translate
  // cs: { ... },  // TODO: translate
}

// VitePress `useData().lang` values -> content locale code.
// (zh uses lang 'zh-CN'; everything else matches the locale key.)
const LANG_TO_CODE: Record<string, string> = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  zh: 'zh',
  'zh-CN': 'zh',
  tr: 'tr',
  pt: 'pt',
  cs: 'cs',
}

/**
 * Select the homepage content for a VitePress `lang` string, falling back to
 * English for unknown langs or untranslated locales.
 */
export function getHomeContent(lang: string | undefined): HomeContent {
  const code = (lang && LANG_TO_CODE[lang]) || 'en'
  return LOCALES[code] || en
}

/** Type guard: is this rich node an entity mention? */
export function isEntityNode(
  n: RichNode,
): n is { text: string; entity: string; variant?: 'cultural' | 'subtle' | 'prominent' } {
  return typeof n !== 'string' && 'entity' in n
}
