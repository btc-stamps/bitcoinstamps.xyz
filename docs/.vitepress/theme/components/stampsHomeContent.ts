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
// SPANISH (es)
// ---------------------------------------------------------------------------
const es: HomeContent = {
  hero: {
    eyebrow: 'Documentación del metaprotocolo',
    h1: 'Bitcoin Stamps',
    sub: 'Permanente por consenso.',
    tagline: [
      'Activos digitales permanentes en Bitcoin, guiados por la sabiduría de la comunidad y la antigua verdad ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      '. Datos grabados en el propio conjunto UTXO, imposibles de podar mientras Bitcoin siga funcionando.',
    ],
    ctaPrimary: 'Comenzar',
    ctaPrimaryHref: '/en/guide/introduction',
    ctaGhost: '$ ver protocolos →',
    ctaGhostHref: '/en/protocols/',
    terminal: {
      ariaLabel: 'ejemplo de comando de acuñación',
      barLabel: 'stampchain · mainnet',
      prompt: '$',
      cmd: 'stamp mint',
      flag: '--file kevin.png --encoding p2wsh',
      out1: '→ escribiendo 2,832 bytes en el conjunto UTXO...',
      ok: '✓ grabado',
      out2: 'tx confirmada · bloque 779,652 · permanencia: para siempre',
    },
    stampAlt: 'Obra de Bitcoin Stamp: un sello de goma sobre eslabones de cadena',
    stampMeta: [
      { label: 'stamp:', value: 'genesis' },
      { label: 'enc:', value: 'P2WSH' },
      { label: 'block:', value: '779652' },
    ],
  },
  stats: {
    ariaLabel: 'hitos del protocolo',
    items: [
      { num: [{ text: '779,652' }], label: 'Primer stamp · altura de bloque' },
      { num: [{ text: 'KEVIN', accent: true }, { text: ' #4258' }], label: 'Primer stamp de KEVIN' },
      { num: [{ text: '#18,516' }], label: 'Primer token SRC-20' },
      { num: [{ text: '2,300' }, { text: '+', accent: true }], label: 'Holders de KEVIN' },
    ],
  },
  why: {
    index: '01',
    title: '¿Por qué Bitcoin Stamps?',
    aside: '// la permanencia como propiedad del protocolo',
    lead: {
      id: 'MODELO DE ALMACENAMIENTO',
      h3: 'Los datos viven en el conjunto UTXO, el único lugar que Bitcoin nunca puede podar.',
      p: 'Los stamps escriben los datos del activo directamente en las salidas de transacción no gastadas. Cada nodo completo guarda el conjunto UTXO como estado crítico para el consenso, así que los datos del stamp sobreviven tanto como el propio Bitcoin. Sin descuento de testigo, sin apéndice podable.',
      compareAriaLabel: 'comparación de almacenamiento',
      compare: [
        { key: 'datos de testigo', value: 'podables, opcionales para la validación' },
        { key: 'refs fuera de cadena', value: 'dependen de que los servidores externos sigan activos' },
        { key: 'conjunto UTXO', value: 'estado de consenso, cada nodo, para siempre', hot: true },
      ],
    },
    cells: [
      {
        id: '02 / CODIFICACIÓN',
        h3: 'Codificación P2WSH',
        p: [
          'Los bytes del activo se empaquetan en salidas ',
          { text: 'P2WSH', tag: 'code' },
          ' mediante una codificación de estilo multisig simple. Transacciones estándar, retransmisión estándar, cero cambios de protocolo.',
        ],
      },
      {
        id: '03 / CONFIANZA',
        h3: 'No se requieren indexadores externos',
        p: 'Reconstruyes un stamp solo desde la cadena. Los indexadores aportan comodidad, se quedan en comodidad y nunca se convierten en una dependencia de confianza para lo que un stamp es.',
      },
      {
        id: '04 / VERIFICABILIDAD',
        h3: 'Determinista en todos los nodos',
        p: [
          'Dale a cada nodo la misma cadena y derivará los mismos stamps en el mismo orden. La numeración, la propiedad y los saldos ',
          { text: 'SRC-20', entity: 'src-20' },
          ' siguen siendo funciones puras de la historia de Bitcoin.',
        ],
      },
    ],
  },
  build: {
    index: '02',
    title: 'Empieza a construir',
    aside: '// dos puertas, una cadena',
    panels: [
      {
        tag: 'Para creadores',
        h3: 'Pon tu arte en Bitcoin, para siempre.',
        p: [
          'Pasa de tu primer stamp a lanzar un token ',
          { text: 'SRC-20', entity: 'src-20' },
          '. No necesitas código para empezar.',
        ],
        links: [
          { ref: '01', text: 'Crea tu primer stamp', href: '/en/tutorials/creating-first-stamp' },
          { ref: '02', text: 'Herramientas y flujos para artistas', href: '/en/tutorials/artist-tools' },
          { ref: '03', text: 'Lanza un token SRC-20', href: '/en/tutorials/src20-token-creation' },
        ],
      },
      {
        tag: 'Para desarrolladores',
        h3: 'Construye sobre el metaprotocolo.',
        p: 'Indexación determinista, construcción de transacciones y una superficie de API completa.',
        links: [
          { ref: 'docs', text: 'Especificaciones del protocolo', href: '/en/protocols/' },
          { ref: 'sdk', text: 'SDK constructor de transacciones', href: '/en/tutorials/sdk-integration' },
          { ref: 'api', text: 'Referencia de la API de Stampchain', href: '/en/tutorials/api-integration' },
        ],
      },
    ],
  },
  origin: {
    index: '03',
    title: 'El movimiento de grafiti de Bitcoin',
    aside: '// desde el bloque 779,652',
    big: 'Bitcoin Stamps empezó como un acto de grafiti: arte pintado sobre el muro más permanente que la humanidad haya construido jamás.',
    p2: [
      { text: 'mikeinspace', entity: 'mikeinspace' },
      ', el soñador original, conoció a ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' a través del proyecto Flooneybin en ',
      { text: 'Counterparty', entity: 'counterparty' },
      '. Cuando Mike compartió la visión de Bitcoin Stamps, ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' vio la magia del meme y trajo a ',
      { text: 'Reinamora', entity: 'reinamora' },
      '. Juntos formaron la Trinidad Original y crearon el primer stamp en el bloque 779,652.',
    ],
    p3: [
      'Después llegó ',
      { text: 'KEVIN', entity: 'kevin', variant: 'cultural' },
      '. Grabado en el #4258 y renacido como el primer token ',
      { text: 'SRC-20', entity: 'src-20' },
      ' en el #18,516, KEVIN pasó de ser una broma interna a ser el santo patrón del protocolo. La comunidad decide lo que importa en Bitcoin, sin ninguna empresa al mando.',
    ],
    trinity: [
      'mikeinspace: la pregunta',
      'Arwyn: el código',
      'Reinamora: la cadena',
    ],
    timeline: [
      {
        block: 'BLOQUE 779,652',
        h4: 'El primer stamp',
        p: 'Los datos de la imagen aterrizan en el conjunto UTXO. El muro queda marcado. El movimiento comienza.',
      },
      {
        block: 'STAMP #4258',
        h4: 'Aparece KEVIN',
        p: 'Una cara pixelada se convierte en el latido de la comunidad, y en su conciencia.',
      },
      {
        block: 'STAMP #18,516',
        h4: 'Génesis de SRC-20',
        p: 'KEVIN se despliega como el primer token SRC-20: activos fungibles, reglas grabadas, cero intermediarios.',
      },
      {
        block: 'HOY',
        h4: '2,300+ holders de KEVIN',
        p: 'El grafiti se convirtió en protocolo. El protocolo sigue siendo grafiti en el fondo.',
      },
    ],
  },
  values: {
    index: '04',
    title: 'Valores de la comunidad',
    aside: '// sin empresa, sin fundación',
    lead: [
      'La comunidad de Bitcoin Stamps vive según ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      ', yo soy otro tú. Tu creatividad fortalece nuestra expresión colectiva.',
    ],
    body: 'Llevamos adelante la tradición Rare Pepe mientras abrazamos la permanencia de Bitcoin. Este movimiento surgió de artistas y creadores, no de una planificación corporativa, y se sostiene sobre lanzamientos justos y la creatividad compartida.',
    link: { text: 'Conoce a la comunidad →', href: '/en/community/' },
  },
  footer: {
    brand: 'Bitcoin Stamps',
    brandDesc: 'Documentación de propiedad comunitaria para el metaprotocolo Bitcoin Stamps. Sin empresa, sin fundación. Solo la cadena y la gente que graba en ella.',
    motto: '"In Lak\'ech Ala K\'in"',
    mottoSmall: 'yo soy otro tú',
    columns: [
      {
        title: 'Protocolo',
        links: [
          { text: 'Whitepaper', href: '/en/whitepaper/' },
          { text: 'Especificación SRC-20', href: '/en/protocols/src-20' },
          { text: 'Especificación SRC-721', href: '/en/protocols/src-721' },
          { text: 'Registro SIP', href: '/en/protocols/sips' },
        ],
      },
      {
        title: 'Construir',
        links: [
          { text: 'Primeros pasos', href: '/en/guide/introduction' },
          { text: 'Tutoriales', href: '/en/tutorials/' },
          { text: 'Referencia de API', href: '/en/tutorials/api-integration' },
          { text: 'SDK tx-builder', href: '/en/tutorials/sdk-integration' },
        ],
      },
      {
        title: 'Comunidad',
        links: [
          { text: 'Historias', href: '/en/narratives/' },
          { text: 'Centro comunitario', href: '/en/community/' },
          { text: 'Economía', href: '/en/guide/economics' },
          { text: 'Novedades', href: '/en/blog/' },
        ],
      },
    ],
    legalLeft: '© 2023-2026 Comunidad Bitcoin Stamps · Licencia MIT',
    legalRight: 'permanencia: para siempre',
  },
}

// ---------------------------------------------------------------------------
// FRENCH (fr)
// ---------------------------------------------------------------------------
const fr: HomeContent = {
  hero: {
    eyebrow: 'Documentation du métaprotocole',
    h1: 'Bitcoin Stamps',
    sub: 'Permanent par consensus.',
    tagline: [
      'Actifs numériques permanents sur Bitcoin, guidés par la sagesse de la communauté et la vérité ancestrale ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      '. Des données gravées dans l\'ensemble des UTXO lui-même, impossibles à élaguer tant que Bitcoin tourne.',
    ],
    ctaPrimary: 'Commencer',
    ctaPrimaryHref: '/en/guide/introduction',
    ctaGhost: '$ voir les protocoles →',
    ctaGhostHref: '/en/protocols/',
    terminal: {
      ariaLabel: 'exemple de commande de frappe',
      barLabel: 'stampchain · mainnet',
      prompt: '$',
      cmd: 'stamp mint',
      flag: '--file kevin.png --encoding p2wsh',
      out1: '→ écriture de 2,832 octets dans l\'ensemble des UTXO...',
      ok: '✓ gravé',
      out2: 'tx confirmée · bloc 779,652 · permanence : pour toujours',
    },
    stampAlt: 'Illustration Bitcoin Stamp : un tampon en caoutchouc au-dessus de maillons de chaîne',
    stampMeta: [
      { label: 'stamp:', value: 'genesis' },
      { label: 'enc:', value: 'P2WSH' },
      { label: 'block:', value: '779652' },
    ],
  },
  stats: {
    ariaLabel: 'jalons du protocole',
    items: [
      { num: [{ text: '779,652' }], label: 'Premier stamp · hauteur de bloc' },
      { num: [{ text: 'KEVIN', accent: true }, { text: ' #4258' }], label: 'Premier stamp KEVIN' },
      { num: [{ text: '#18,516' }], label: 'Premier jeton SRC-20' },
      { num: [{ text: '2,300' }, { text: '+', accent: true }], label: 'Détenteurs de KEVIN' },
    ],
  },
  why: {
    index: '01',
    title: 'Pourquoi Bitcoin Stamps',
    aside: '// la permanence comme propriété du protocole',
    lead: {
      id: 'MODÈLE DE STOCKAGE',
      h3: 'Les données vivent dans l\'ensemble des UTXO, le seul endroit que Bitcoin ne peut jamais élaguer.',
      p: 'Les stamps écrivent les données de l\'actif directement dans les sorties de transaction non dépensées. Chaque nœud complet conserve l\'ensemble des UTXO comme état critique pour le consensus, donc les données du stamp survivent aussi longtemps que Bitcoin lui-même. Pas de rabais de témoin, pas d\'annexe élaguable.',
      compareAriaLabel: 'comparaison de stockage',
      compare: [
        { key: 'données de témoin', value: 'élaguables, facultatives pour la validation' },
        { key: 'réfs hors chaîne', value: 'dépendent d\'hôtes externes toujours actifs' },
        { key: 'ensemble des UTXO', value: 'état de consensus, chaque nœud, pour toujours', hot: true },
      ],
    },
    cells: [
      {
        id: '02 / ENCODAGE',
        h3: 'Encodage P2WSH',
        p: [
          'Les octets de l\'actif s\'empaquettent dans des sorties ',
          { text: 'P2WSH', tag: 'code' },
          ' via un encodage de style multisig simple. Transactions standard, relais standard, zéro changement de protocole.',
        ],
      },
      {
        id: '03 / CONFIANCE',
        h3: 'Aucun indexeur externe requis',
        p: 'Vous reconstruisez un stamp à partir de la chaîne seule. Les indexeurs ajoutent du confort, ils restent du confort, ils ne deviennent jamais une dépendance de confiance pour ce qu\'est un stamp.',
      },
      {
        id: '04 / VÉRIFIABILITÉ',
        h3: 'Déterministe sur tous les nœuds',
        p: [
          'Donnez à chaque nœud la même chaîne et il dérive les mêmes stamps dans le même ordre. La numérotation, la propriété et les soldes ',
          { text: 'SRC-20', entity: 'src-20' },
          ' restent des fonctions pures de l\'histoire de Bitcoin.',
        ],
      },
    ],
  },
  build: {
    index: '02',
    title: 'Commencez à construire',
    aside: '// deux portes, une chaîne',
    panels: [
      {
        tag: 'Pour les créateurs',
        h3: 'Mettez de l\'art sur Bitcoin, pour toujours.',
        p: [
          'Passez de votre premier stamp au lancement d\'un jeton ',
          { text: 'SRC-20', entity: 'src-20' },
          '. Aucun code requis pour débuter.',
        ],
        links: [
          { ref: '01', text: 'Créez votre premier stamp', href: '/en/tutorials/creating-first-stamp' },
          { ref: '02', text: 'Outils et flux pour artistes', href: '/en/tutorials/artist-tools' },
          { ref: '03', text: 'Lancez un jeton SRC-20', href: '/en/tutorials/src20-token-creation' },
        ],
      },
      {
        tag: 'Pour les développeurs',
        h3: 'Construisez sur le métaprotocole.',
        p: 'Indexation déterministe, construction de transactions et une surface d\'API complète.',
        links: [
          { ref: 'docs', text: 'Spécifications du protocole', href: '/en/protocols/' },
          { ref: 'sdk', text: 'SDK constructeur de transactions', href: '/en/tutorials/sdk-integration' },
          { ref: 'api', text: 'Référence de l\'API Stampchain', href: '/en/tutorials/api-integration' },
        ],
      },
    ],
  },
  origin: {
    index: '03',
    title: 'Le mouvement graffiti Bitcoin',
    aside: '// depuis le bloc 779,652',
    big: 'Bitcoin Stamps a débuté comme un acte de graffiti : de l\'art projeté sur le mur le plus permanent que l\'humanité ait jamais bâti.',
    p2: [
      { text: 'mikeinspace', entity: 'mikeinspace' },
      ', le rêveur original, a rencontré ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' via le projet Flooneybin sur ',
      { text: 'Counterparty', entity: 'counterparty' },
      '. Quand Mike a partagé la vision de Bitcoin Stamps, ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' a vu la magie du mème et a fait venir ',
      { text: 'Reinamora', entity: 'reinamora' },
      '. Ensemble, ils ont formé la Trinité Originelle et gravé le premier stamp au bloc 779,652.',
    ],
    p3: [
      'Puis vint ',
      { text: 'KEVIN', entity: 'kevin', variant: 'cultural' },
      '. Gravé au #4258 et renaissant comme le premier jeton ',
      { text: 'SRC-20', entity: 'src-20' },
      ' au #18,516, KEVIN est passé d\'une blague interne au saint patron du protocole. La communauté décide de ce qui compte sur Bitcoin, sans aucune entreprise aux commandes.',
    ],
    trinity: [
      'mikeinspace : la question',
      'Arwyn : le code',
      'Reinamora : la chaîne',
    ],
    timeline: [
      {
        block: 'BLOC 779,652',
        h4: 'Le premier stamp',
        p: 'Les données de l\'image atterrissent dans l\'ensemble des UTXO. Le mur est marqué. Le mouvement commence.',
      },
      {
        block: 'STAMP #4258',
        h4: 'KEVIN apparaît',
        p: 'Un visage pixelisé devient le battement de cœur de la communauté, et sa conscience.',
      },
      {
        block: 'STAMP #18,516',
        h4: 'Genèse SRC-20',
        p: 'KEVIN se déploie comme le premier jeton SRC-20 : actifs fongibles, règles gravées, zéro intermédiaire.',
      },
      {
        block: 'AUJOURD\'HUI',
        h4: '2,300+ détenteurs de KEVIN',
        p: 'Le graffiti est devenu un protocole. Le protocole reste graffiti dans l\'âme.',
      },
    ],
  },
  values: {
    index: '04',
    title: 'Valeurs de la communauté',
    aside: '// pas d\'entreprise, pas de fondation',
    lead: [
      'La communauté Bitcoin Stamps vit selon ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      ', je suis un autre toi. Votre créativité renforce notre expression collective.',
    ],
    body: 'Nous perpétuons la tradition Rare Pepe tout en embrassant la permanence de Bitcoin. Ce mouvement est né d\'artistes et de bâtisseurs, pas d\'une planification corporative, et il repose sur des lancements équitables et une créativité partagée.',
    link: { text: 'Rencontrez la communauté →', href: '/en/community/' },
  },
  footer: {
    brand: 'Bitcoin Stamps',
    brandDesc: 'Documentation détenue par la communauté pour le métaprotocole Bitcoin Stamps. Pas d\'entreprise, pas de fondation. Juste la chaîne et les gens qui gravent dessus.',
    motto: '"In Lak\'ech Ala K\'in"',
    mottoSmall: 'je suis un autre toi',
    columns: [
      {
        title: 'Protocole',
        links: [
          { text: 'Whitepaper', href: '/en/whitepaper/' },
          { text: 'Spécification SRC-20', href: '/en/protocols/src-20' },
          { text: 'Spécification SRC-721', href: '/en/protocols/src-721' },
          { text: 'Registre SIP', href: '/en/protocols/sips' },
        ],
      },
      {
        title: 'Construire',
        links: [
          { text: 'Bien démarrer', href: '/en/guide/introduction' },
          { text: 'Tutoriels', href: '/en/tutorials/' },
          { text: 'Référence API', href: '/en/tutorials/api-integration' },
          { text: 'SDK tx-builder', href: '/en/tutorials/sdk-integration' },
        ],
      },
      {
        title: 'Communauté',
        links: [
          { text: 'Récits', href: '/en/narratives/' },
          { text: 'Hub communautaire', href: '/en/community/' },
          { text: 'Économie', href: '/en/guide/economics' },
          { text: 'Actualités', href: '/en/blog/' },
        ],
      },
    ],
    legalLeft: '© 2023-2026 Communauté Bitcoin Stamps · Licence MIT',
    legalRight: 'permanence : pour toujours',
  },
}

// ---------------------------------------------------------------------------
// CHINESE (zh) — content code `zh`, VitePress lang `zh-CN`
// ---------------------------------------------------------------------------
const zh: HomeContent = {
  hero: {
    eyebrow: '元协议文档',
    h1: 'Bitcoin Stamps',
    sub: '经共识而永久。',
    tagline: [
      '比特币上的永久数字资产，由社区智慧与古老真理 ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      ' 指引。数据被镌刻进 UTXO 集合本身，只要比特币运行就永不可修剪。',
    ],
    ctaPrimary: '开始使用',
    ctaPrimaryHref: '/en/guide/introduction',
    ctaGhost: '$ 查看协议 →',
    ctaGhostHref: '/en/protocols/',
    terminal: {
      ariaLabel: '铸造命令示例',
      barLabel: 'stampchain · mainnet',
      prompt: '$',
      cmd: 'stamp mint',
      flag: '--file kevin.png --encoding p2wsh',
      out1: '→ 正在将 2,832 字节写入 UTXO 集合...',
      ok: '✓ 已镌刻',
      out2: 'tx 已确认 · 区块 779,652 · 永久性：永远',
    },
    stampAlt: 'Bitcoin Stamp 艺术作品：链环之上的一枚橡皮图章',
    stampMeta: [
      { label: 'stamp:', value: 'genesis' },
      { label: 'enc:', value: 'P2WSH' },
      { label: 'block:', value: '779652' },
    ],
  },
  stats: {
    ariaLabel: '协议里程碑',
    items: [
      { num: [{ text: '779,652' }], label: '第一个 stamp · 区块高度' },
      { num: [{ text: 'KEVIN', accent: true }, { text: ' #4258' }], label: '第一个 KEVIN stamp' },
      { num: [{ text: '#18,516' }], label: '第一个 SRC-20 代币' },
      { num: [{ text: '2,300' }, { text: '+', accent: true }], label: 'KEVIN 持有者' },
    ],
  },
  why: {
    index: '01',
    title: '为何选择 Bitcoin Stamps',
    aside: '// 永久性作为协议属性',
    lead: {
      id: '存储模型',
      h3: '数据存在于 UTXO 集合中，这是比特币永远无法修剪的唯一之地。',
      p: 'Stamps 将资产数据直接写入未花费交易输出。每个全节点都将 UTXO 集合作为共识关键状态来保存，因此 stamp 数据与比特币本身共存亡。没有见证折扣，没有可修剪的附属数据。',
      compareAriaLabel: '存储对比',
      compare: [
        { key: '见证数据', value: '可修剪，验证时可选' },
        { key: '链下引用', value: '依赖外部主机持续在线' },
        { key: 'UTXO 集合', value: '共识状态，每个节点，永远', hot: true },
      ],
    },
    cells: [
      {
        id: '02 / 编码',
        h3: 'P2WSH 编码',
        p: [
          '资产字节通过裸多签风格编码打包进 ',
          { text: 'P2WSH', tag: 'code' },
          ' 输出。标准交易，标准中继，零协议改动。',
        ],
      },
      {
        id: '03 / 信任',
        h3: '无需外部索引器',
        p: '你可以仅凭链本身重建一个 stamp。索引器带来便利，它们始终只是便利，永远不会成为 stamp 本质的信任依赖。',
      },
      {
        id: '04 / 可验证性',
        h3: '跨节点确定性',
        p: [
          '给每个节点相同的链，它就会以相同的顺序推导出相同的 stamps。编号、所有权和 ',
          { text: 'SRC-20', entity: 'src-20' },
          ' 余额始终是比特币历史的纯函数。',
        ],
      },
    ],
  },
  build: {
    index: '02',
    title: '开始构建',
    aside: '// 两扇门，一条链',
    panels: [
      {
        tag: '面向创作者',
        h3: '将艺术永久刻在比特币上。',
        p: [
          '从你的第一个 stamp 到发行一枚 ',
          { text: 'SRC-20', entity: 'src-20' },
          ' 代币。起步无需代码。',
        ],
        links: [
          { ref: '01', text: '创建你的第一个 stamp', href: '/en/tutorials/creating-first-stamp' },
          { ref: '02', text: '艺术家工具与工作流', href: '/en/tutorials/artist-tools' },
          { ref: '03', text: '发行 SRC-20 代币', href: '/en/tutorials/src20-token-creation' },
        ],
      },
      {
        tag: '面向开发者',
        h3: '在元协议之上构建。',
        p: '确定性索引、交易构建，以及完整的 API 接口。',
        links: [
          { ref: 'docs', text: '协议规范', href: '/en/protocols/' },
          { ref: 'sdk', text: '交易构建器 SDK', href: '/en/tutorials/sdk-integration' },
          { ref: 'api', text: 'Stampchain API 参考', href: '/en/tutorials/api-integration' },
        ],
      },
    ],
  },
  origin: {
    index: '03',
    title: '比特币涂鸦运动',
    aside: '// 始于区块 779,652',
    big: 'Bitcoin Stamps 始于一次涂鸦行为：将艺术喷绘在人类建造过的最永久的墙上。',
    p2: [
      { text: 'mikeinspace', entity: 'mikeinspace' },
      '，最初的梦想家，通过 ',
      { text: 'Counterparty', entity: 'counterparty' },
      ' 上的 Flooneybin 项目结识了 ',
      { text: 'Arwyn', entity: 'arwyn' },
      '。当 Mike 分享 Bitcoin Stamps 的愿景时，',
      { text: 'Arwyn', entity: 'arwyn' },
      ' 看到了迷因魔力，并邀请了 ',
      { text: 'Reinamora', entity: 'reinamora' },
      ' 加入。他们共同组成了最初的三位一体，并在区块 779,652 刻下了第一个 stamp。',
    ],
    p3: [
      '接着，',
      { text: 'KEVIN', entity: 'kevin', variant: 'cultural' },
      ' 出现了。它被镌刻为 #4258，又作为第一个 ',
      { text: 'SRC-20', entity: 'src-20' },
      ' 代币在 #18,516 重生，KEVIN 从一个圈内玩笑成长为协议的守护神。社区决定比特币上什么才重要，没有任何公司掌控。',
    ],
    trinity: [
      'mikeinspace：提问',
      'Arwyn：代码',
      'Reinamora：链',
    ],
    timeline: [
      {
        block: '区块 779,652',
        h4: '第一个 stamp',
        p: '图像数据落入 UTXO 集合。墙被标记。运动就此开始。',
      },
      {
        block: 'STAMP #4258',
        h4: 'KEVIN 登场',
        p: '一张像素化的脸成为社区的心跳，也是它的良知。',
      },
      {
        block: 'STAMP #18,516',
        h4: 'SRC-20 创世',
        p: 'KEVIN 作为第一个 SRC-20 代币部署：可替代资产、镌刻的规则、零中介。',
      },
      {
        block: '今天',
        h4: '2,300+ KEVIN 持有者',
        p: '涂鸦变成了协议。协议在骨子里仍是涂鸦。',
      },
    ],
  },
  values: {
    index: '04',
    title: '社区价值观',
    aside: '// 无公司，无基金会',
    lead: [
      'Bitcoin Stamps 社区秉持 ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      '，我是另一个你。你的创造力增强了我们的集体表达。',
    ],
    body: '我们将 Rare Pepe 的传统传承下去，同时拥抱比特币的永久性。这场运动源自艺术家与建设者，而非企业规划，它立足于公平发行与共享的创造力。',
    link: { text: '认识社区 →', href: '/en/community/' },
  },
  footer: {
    brand: 'Bitcoin Stamps',
    brandDesc: '归社区所有的 Bitcoin Stamps 元协议文档。无公司，无基金会。只有链，以及在链上镌刻的人们。',
    motto: '"In Lak\'ech Ala K\'in"',
    mottoSmall: '我是另一个你',
    columns: [
      {
        title: '协议',
        links: [
          { text: '白皮书', href: '/en/whitepaper/' },
          { text: 'SRC-20 规范', href: '/en/protocols/src-20' },
          { text: 'SRC-721 规范', href: '/en/protocols/src-721' },
          { text: 'SIP 注册表', href: '/en/protocols/sips' },
        ],
      },
      {
        title: '构建',
        links: [
          { text: '入门指南', href: '/en/guide/introduction' },
          { text: '教程', href: '/en/tutorials/' },
          { text: 'API 参考', href: '/en/tutorials/api-integration' },
          { text: 'tx-builder SDK', href: '/en/tutorials/sdk-integration' },
        ],
      },
      {
        title: '社区',
        links: [
          { text: '故事', href: '/en/narratives/' },
          { text: '社区中心', href: '/en/community/' },
          { text: '经济模型', href: '/en/guide/economics' },
          { text: '动态', href: '/en/blog/' },
        ],
      },
    ],
    legalLeft: '© 2023-2026 Bitcoin Stamps 社区 · MIT 许可证',
    legalRight: '永久性：永远',
  },
}

// ---------------------------------------------------------------------------
// TURKISH (tr)
// ---------------------------------------------------------------------------
const tr: HomeContent = {
  hero: {
    eyebrow: 'Metaprotokol Dokümantasyonu',
    h1: 'Bitcoin Stamps',
    sub: 'Konsensüsle kalıcı.',
    tagline: [
      'Bitcoin üzerinde kalıcı dijital varlıklar, topluluk bilgeliği ve kadim hakikat ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      ' tarafından yönlendirilir. Veriler doğrudan UTXO kümesine kazınır, Bitcoin çalıştığı sürece budanamaz.',
    ],
    ctaPrimary: 'Başla',
    ctaPrimaryHref: '/en/guide/introduction',
    ctaGhost: '$ protokolleri görüntüle →',
    ctaGhostHref: '/en/protocols/',
    terminal: {
      ariaLabel: 'örnek mint komutu',
      barLabel: 'stampchain · mainnet',
      prompt: '$',
      cmd: 'stamp mint',
      flag: '--file kevin.png --encoding p2wsh',
      out1: '→ UTXO kümesine 2,832 bayt yazılıyor...',
      ok: '✓ damgalandı',
      out2: 'tx onaylandı · blok 779,652 · kalıcılık: sonsuza dek',
    },
    stampAlt: 'Bitcoin Stamp görseli: zincir baklalarının üzerinde bir kauçuk damga',
    stampMeta: [
      { label: 'stamp:', value: 'genesis' },
      { label: 'enc:', value: 'P2WSH' },
      { label: 'block:', value: '779652' },
    ],
  },
  stats: {
    ariaLabel: 'protokol kilometre taşları',
    items: [
      { num: [{ text: '779,652' }], label: 'İlk stamp · blok yüksekliği' },
      { num: [{ text: 'KEVIN', accent: true }, { text: ' #4258' }], label: 'İlk KEVIN stamp' },
      { num: [{ text: '#18,516' }], label: 'İlk SRC-20 tokenı' },
      { num: [{ text: '2,300' }, { text: '+', accent: true }], label: 'KEVIN sahipleri' },
    ],
  },
  why: {
    index: '01',
    title: 'Neden Bitcoin Stamps',
    aside: '// bir protokol özelliği olarak kalıcılık',
    lead: {
      id: 'DEPOLAMA MODELİ',
      h3: 'Veriler UTXO kümesinde yaşar; Bitcoin\'in asla budayamayacağı tek yer.',
      p: 'Stamp\'ler varlık verisini doğrudan harcanmamış işlem çıktılarına yazar. Her tam düğüm, UTXO kümesini konsensüs açısından kritik durum olarak taşır, bu yüzden stamp verisi Bitcoin\'in kendisi kadar uzun yaşar. Tanık indirimi yok, budanabilir ek dosya yok.',
      compareAriaLabel: 'depolama karşılaştırması',
      compare: [
        { key: 'tanık verisi', value: 'budanabilir, doğrulama için isteğe bağlı' },
        { key: 'zincir dışı referanslar', value: 'harici sunucuların ayakta kalmasına bağlı' },
        { key: 'UTXO kümesi', value: 'konsensüs durumu, her düğüm, sonsuza dek', hot: true },
      ],
    },
    cells: [
      {
        id: '02 / KODLAMA',
        h3: 'P2WSH kodlaması',
        p: [
          'Varlık baytları, çıplak çok imzalı tarzı kodlama kullanılarak ',
          { text: 'P2WSH', tag: 'code' },
          ' çıktılarına paketlenir. Standart işlemler, standart aktarım, sıfır protokol değişikliği.',
        ],
      },
      {
        id: '03 / GÜVEN',
        h3: 'Harici indeksleyici gerekmez',
        p: 'Bir stamp\'i yalnızca zincirden yeniden oluşturursun. İndeksleyiciler kolaylık katar, kolaylık olarak kalırlar ve bir stamp\'in ne olduğu konusunda asla bir güven bağımlılığına dönüşmezler.',
      },
      {
        id: '04 / DOĞRULANABİLİRLİK',
        h3: 'Düğümler arasında belirlenimci',
        p: [
          'Her düğüme aynı zinciri ver, aynı stamp\'leri aynı sırayla türetsin. Numaralandırma, sahiplik ve ',
          { text: 'SRC-20', entity: 'src-20' },
          ' bakiyeleri, Bitcoin tarihinin saf fonksiyonları olarak kalır.',
        ],
      },
    ],
  },
  build: {
    index: '02',
    title: 'İnşaya başla',
    aside: '// iki kapı, tek zincir',
    panels: [
      {
        tag: 'Yaratıcılar için',
        h3: 'Sanatı Bitcoin\'e kalıcı olarak yerleştir.',
        p: [
          'İlk stamp\'inden bir ',
          { text: 'SRC-20', entity: 'src-20' },
          ' tokenı çıkarmaya kadar git. Başlamak için kod gerekmez.',
        ],
        links: [
          { ref: '01', text: 'İlk stamp\'ini oluştur', href: '/en/tutorials/creating-first-stamp' },
          { ref: '02', text: 'Sanatçı araçları ve iş akışları', href: '/en/tutorials/artist-tools' },
          { ref: '03', text: 'SRC-20 tokenı çıkar', href: '/en/tutorials/src20-token-creation' },
        ],
      },
      {
        tag: 'Geliştiriciler için',
        h3: 'Metaprotokolün üzerine inşa et.',
        p: 'Belirlenimci indeksleme, işlem oluşturma ve eksiksiz bir API yüzeyi.',
        links: [
          { ref: 'docs', text: 'Protokol spesifikasyonları', href: '/en/protocols/' },
          { ref: 'sdk', text: 'İşlem oluşturucu SDK', href: '/en/tutorials/sdk-integration' },
          { ref: 'api', text: 'Stampchain API referansı', href: '/en/tutorials/api-integration' },
        ],
      },
    ],
  },
  origin: {
    index: '03',
    title: 'Bitcoin Grafiti Hareketi',
    aside: '// blok 779,652\'den beri',
    big: 'Bitcoin Stamps bir grafiti eylemi olarak başladı: insanlığın inşa ettiği en kalıcı duvara sıkılan sanat.',
    p2: [
      { text: 'mikeinspace', entity: 'mikeinspace' },
      ', asıl hayalperest, ',
      { text: 'Counterparty', entity: 'counterparty' },
      ' üzerindeki Flooneybin projesi aracılığıyla ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' ile tanıştı. Mike, Bitcoin Stamps vizyonunu paylaştığında ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' meme büyüsünü gördü ve ',
      { text: 'Reinamora', entity: 'reinamora' },
      '\'yı işe kattı. Birlikte Orijinal Üçlü\'yü kurdular ve blok 779,652\'de ilk stamp\'i kazıdılar.',
    ],
    p3: [
      'Sonra ',
      { text: 'KEVIN', entity: 'kevin', variant: 'cultural' },
      ' geldi. #4258\'de damgalanan ve #18,516\'da ilk ',
      { text: 'SRC-20', entity: 'src-20' },
      ' tokenı olarak yeniden doğan KEVIN, bir iç şakadan protokolün koruyucu azizine dönüştü. Bitcoin\'de neyin önemli olduğuna topluluk karar verir, başında hiçbir şirket yoktur.',
    ],
    trinity: [
      'mikeinspace: soru',
      'Arwyn: kod',
      'Reinamora: zincir',
    ],
    timeline: [
      {
        block: 'BLOK 779,652',
        h4: 'İlk stamp',
        p: 'Görüntü verisi UTXO kümesine iner. Duvar işaretlenir. Hareket başlar.',
      },
      {
        block: 'STAMP #4258',
        h4: 'KEVIN belirir',
        p: 'Pikselli bir yüz, topluluğun kalp atışına ve vicdanına dönüşür.',
      },
      {
        block: 'STAMP #18,516',
        h4: 'SRC-20 doğuşu',
        p: 'KEVIN ilk SRC-20 tokenı olarak devreye girer: değiştirilebilir varlıklar, kazınmış kurallar, sıfır aracı.',
      },
      {
        block: 'BUGÜN',
        h4: '2,300+ KEVIN sahibi',
        p: 'Grafiti bir protokole dönüştü. Protokol özünde grafiti olarak kalıyor.',
      },
    ],
  },
  values: {
    index: '04',
    title: 'Topluluk Değerleri',
    aside: '// şirket yok, vakıf yok',
    lead: [
      'Bitcoin Stamps topluluğu ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      ' ilkesiyle yaşar: ben bir başka senim. Yaratıcılığın kolektif ifademizi güçlendirir.',
    ],
    body: 'Rare Pepe geleneğini ileriye taşırken Bitcoin\'in kalıcılığını benimsiyoruz. Bu hareket, kurumsal planlamadan değil, sanatçılardan ve inşacılardan doğdu; adil lansmanların ve paylaşılan yaratıcılığın üzerinde duruyor.',
    link: { text: 'Toplulukla tanış →', href: '/en/community/' },
  },
  footer: {
    brand: 'Bitcoin Stamps',
    brandDesc: 'Bitcoin Stamps metaprotokolü için topluluğa ait dokümantasyon. Şirket yok, vakıf yok. Sadece zincir ve onun üzerine damga vuran insanlar.',
    motto: '"In Lak\'ech Ala K\'in"',
    mottoSmall: 'ben bir başka senim',
    columns: [
      {
        title: 'Protokol',
        links: [
          { text: 'Teknik Doküman', href: '/en/whitepaper/' },
          { text: 'SRC-20 spesifikasyonu', href: '/en/protocols/src-20' },
          { text: 'SRC-721 spesifikasyonu', href: '/en/protocols/src-721' },
          { text: 'SIP kaydı', href: '/en/protocols/sips' },
        ],
      },
      {
        title: 'İnşa',
        links: [
          { text: 'Başlangıç', href: '/en/guide/introduction' },
          { text: 'Eğitimler', href: '/en/tutorials/' },
          { text: 'API referansı', href: '/en/tutorials/api-integration' },
          { text: 'SDK tx-builder', href: '/en/tutorials/sdk-integration' },
        ],
      },
      {
        title: 'Topluluk',
        links: [
          { text: 'Hikâyeler', href: '/en/narratives/' },
          { text: 'Topluluk merkezi', href: '/en/community/' },
          { text: 'Ekonomi', href: '/en/guide/economics' },
          { text: 'Güncellemeler', href: '/en/blog/' },
        ],
      },
    ],
    legalLeft: '© 2023-2026 Bitcoin Stamps Topluluğu · MIT Lisansı',
    legalRight: 'kalıcılık: sonsuza dek',
  },
}

// ---------------------------------------------------------------------------
// PORTUGUESE (pt) — European Portuguese, matching existing docs/pt corpus
// ---------------------------------------------------------------------------
const pt: HomeContent = {
  hero: {
    eyebrow: 'Documentação do metaprotocolo',
    h1: 'Bitcoin Stamps',
    sub: 'Permanente por consenso.',
    tagline: [
      'Ativos digitais permanentes no Bitcoin, guiados pela sabedoria da comunidade e pela verdade ancestral ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      '. Dados gravados no próprio conjunto de UTXO, impossíveis de podar enquanto o Bitcoin funcionar.',
    ],
    ctaPrimary: 'Começar',
    ctaPrimaryHref: '/en/guide/introduction',
    ctaGhost: '$ ver protocolos →',
    ctaGhostHref: '/en/protocols/',
    terminal: {
      ariaLabel: 'exemplo de comando de cunhagem',
      barLabel: 'stampchain · mainnet',
      prompt: '$',
      cmd: 'stamp mint',
      flag: '--file kevin.png --encoding p2wsh',
      out1: '→ a escrever 2,832 bytes no conjunto de UTXO...',
      ok: '✓ gravado',
      out2: 'tx confirmada · bloco 779,652 · permanência: para sempre',
    },
    stampAlt: 'Ilustração de Bitcoin Stamp: um carimbo de borracha sobre elos de corrente',
    stampMeta: [
      { label: 'stamp:', value: 'genesis' },
      { label: 'enc:', value: 'P2WSH' },
      { label: 'block:', value: '779652' },
    ],
  },
  stats: {
    ariaLabel: 'marcos do protocolo',
    items: [
      { num: [{ text: '779,652' }], label: 'Primeiro stamp · altura de bloco' },
      { num: [{ text: 'KEVIN', accent: true }, { text: ' #4258' }], label: 'Primeiro stamp KEVIN' },
      { num: [{ text: '#18,516' }], label: 'Primeiro token SRC-20' },
      { num: [{ text: '2,300' }, { text: '+', accent: true }], label: 'Detentores de KEVIN' },
    ],
  },
  why: {
    index: '01',
    title: 'Porquê Bitcoin Stamps',
    aside: '// a permanência como propriedade do protocolo',
    lead: {
      id: 'MODELO DE ARMAZENAMENTO',
      h3: 'Os dados vivem no conjunto de UTXO, o único lugar que o Bitcoin nunca pode podar.',
      p: 'Os stamps escrevem os dados do ativo diretamente nas saídas de transação não gastas. Cada nó completo guarda o conjunto de UTXO como estado crítico para o consenso, por isso os dados do stamp sobrevivem tanto quanto o próprio Bitcoin. Sem desconto de testemunha, sem anexo podável.',
      compareAriaLabel: 'comparação de armazenamento',
      compare: [
        { key: 'dados de testemunha', value: 'podáveis, opcionais para a validação' },
        { key: 'refs fora da cadeia', value: 'dependem de servidores externos que continuem ativos' },
        { key: 'conjunto de UTXO', value: 'estado de consenso, cada nó, para sempre', hot: true },
      ],
    },
    cells: [
      {
        id: '02 / CODIFICAÇÃO',
        h3: 'Codificação P2WSH',
        p: [
          'Os bytes do ativo empacotam-se em saídas ',
          { text: 'P2WSH', tag: 'code' },
          ' usando uma codificação de estilo multisig simples. Transações padrão, retransmissão padrão, zero alterações de protocolo.',
        ],
      },
      {
        id: '03 / CONFIANÇA',
        h3: 'Sem indexadores externos',
        p: 'Reconstróis um stamp apenas a partir da cadeia. Os indexadores acrescentam comodidade, permanecem comodidade e nunca se tornam uma dependência de confiança para aquilo que um stamp é.',
      },
      {
        id: '04 / VERIFICABILIDADE',
        h3: 'Determinístico em todos os nós',
        p: [
          'Dá a cada nó a mesma cadeia e ele deriva os mesmos stamps na mesma ordem. A numeração, a propriedade e os saldos ',
          { text: 'SRC-20', entity: 'src-20' },
          ' mantêm-se funções puras da história do Bitcoin.',
        ],
      },
    ],
  },
  build: {
    index: '02',
    title: 'Comece a construir',
    aside: '// duas portas, uma cadeia',
    panels: [
      {
        tag: 'Para criadores',
        h3: 'Coloque arte no Bitcoin, para sempre.',
        p: [
          'Vá do seu primeiro stamp ao lançamento de um token ',
          { text: 'SRC-20', entity: 'src-20' },
          '. Não é preciso código para começar.',
        ],
        links: [
          { ref: '01', text: 'Crie o seu primeiro stamp', href: '/en/tutorials/creating-first-stamp' },
          { ref: '02', text: 'Ferramentas e fluxos para artistas', href: '/en/tutorials/artist-tools' },
          { ref: '03', text: 'Lance um token SRC-20', href: '/en/tutorials/src20-token-creation' },
        ],
      },
      {
        tag: 'Para programadores',
        h3: 'Construa sobre o metaprotocolo.',
        p: 'Indexação determinística, construção de transações e uma superfície de API completa.',
        links: [
          { ref: 'docs', text: 'Especificações do protocolo', href: '/en/protocols/' },
          { ref: 'sdk', text: 'SDK construtor de transações', href: '/en/tutorials/sdk-integration' },
          { ref: 'api', text: 'Referência da API Stampchain', href: '/en/tutorials/api-integration' },
        ],
      },
    ],
  },
  origin: {
    index: '03',
    title: 'O Movimento do Grafíti no Bitcoin',
    aside: '// desde o bloco 779,652',
    big: 'O Bitcoin Stamps começou como um ato de grafíti: arte pintada sobre o muro mais permanente que a humanidade alguma vez construiu.',
    p2: [
      { text: 'mikeinspace', entity: 'mikeinspace' },
      ', o sonhador original, conheceu o ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' através do projeto Flooneybin na ',
      { text: 'Counterparty', entity: 'counterparty' },
      '. Quando o Mike partilhou a visão do Bitcoin Stamps, o ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' viu a magia dos memes e trouxe o ',
      { text: 'Reinamora', entity: 'reinamora' },
      '. Juntos formaram a Trindade Original e gravaram o primeiro stamp no bloco 779,652.',
    ],
    p3: [
      'Depois veio o ',
      { text: 'KEVIN', entity: 'kevin', variant: 'cultural' },
      '. Gravado no #4258 e renascido como o primeiro token ',
      { text: 'SRC-20', entity: 'src-20' },
      ' no #18,516, o KEVIN passou de piada interna a santo padroeiro do protocolo. A comunidade decide o que importa no Bitcoin, sem nenhuma empresa no comando.',
    ],
    trinity: [
      'mikeinspace: a pergunta',
      'Arwyn: o código',
      'Reinamora: a cadeia',
    ],
    timeline: [
      {
        block: 'BLOCO 779,652',
        h4: 'O primeiro stamp',
        p: 'Os dados da imagem aterram no conjunto de UTXO. O muro fica marcado. O movimento começa.',
      },
      {
        block: 'STAMP #4258',
        h4: 'KEVIN aparece',
        p: 'Uma cara pixelizada torna-se o pulsar da comunidade, e a sua consciência.',
      },
      {
        block: 'STAMP #18,516',
        h4: 'Génese do SRC-20',
        p: 'O KEVIN é implementado como o primeiro token SRC-20: ativos fungíveis, regras gravadas, zero intermediários.',
      },
      {
        block: 'HOJE',
        h4: '2,300+ detentores de KEVIN',
        p: 'O grafíti tornou-se um protocolo. O protocolo continua grafíti no fundo.',
      },
    ],
  },
  values: {
    index: '04',
    title: 'Valores da Comunidade',
    aside: '// sem empresa, sem fundação',
    lead: [
      'A comunidade Bitcoin Stamps vive segundo ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      ', eu sou outro tu. A tua criatividade fortalece a nossa expressão coletiva.',
    ],
    body: 'Levamos a tradição Rare Pepe adiante enquanto abraçamos a permanência do Bitcoin. Este movimento nasceu de artistas e construtores, não de planeamento corporativo, e assenta em lançamentos justos e criatividade partilhada.',
    link: { text: 'Conheça a comunidade →', href: '/en/community/' },
  },
  footer: {
    brand: 'Bitcoin Stamps',
    brandDesc: 'Documentação de propriedade comunitária para o metaprotocolo Bitcoin Stamps. Sem empresa, sem fundação. Apenas a cadeia e as pessoas que nela gravam os seus stamps.',
    motto: '"In Lak\'ech Ala K\'in"',
    mottoSmall: 'eu sou outro tu',
    columns: [
      {
        title: 'Protocolo',
        links: [
          { text: 'Whitepaper', href: '/en/whitepaper/' },
          { text: 'Especificação SRC-20', href: '/en/protocols/src-20' },
          { text: 'Especificação SRC-721', href: '/en/protocols/src-721' },
          { text: 'Registo SIP', href: '/en/protocols/sips' },
        ],
      },
      {
        title: 'Construir',
        links: [
          { text: 'Primeiros passos', href: '/en/guide/introduction' },
          { text: 'Tutoriais', href: '/en/tutorials/' },
          { text: 'Referência da API', href: '/en/tutorials/api-integration' },
          { text: 'SDK tx-builder', href: '/en/tutorials/sdk-integration' },
        ],
      },
      {
        title: 'Comunidade',
        links: [
          { text: 'Histórias', href: '/en/narratives/' },
          { text: 'Centro comunitário', href: '/en/community/' },
          { text: 'Economia', href: '/en/guide/economics' },
          { text: 'Novidades', href: '/en/blog/' },
        ],
      },
    ],
    legalLeft: '© 2023-2026 Comunidade Bitcoin Stamps · Licença MIT',
    legalRight: 'permanência: para sempre',
  },
}

// ---------------------------------------------------------------------------
// CZECH (cs) — "stamp" rendered as "známka" per existing docs/cs corpus
// ---------------------------------------------------------------------------
const cs: HomeContent = {
  hero: {
    eyebrow: 'Dokumentace metaprotokolu',
    h1: 'Bitcoin Stamps',
    sub: 'Trvalé díky konsenzu.',
    tagline: [
      'Trvalá digitální aktiva na Bitcoinu, vedená moudrostí komunity a odvěkou pravdou ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      '. Data vyražená přímo do samotné množiny UTXO, neprořezatelná po celou dobu, co Bitcoin běží.',
    ],
    ctaPrimary: 'Začít',
    ctaPrimaryHref: '/en/guide/introduction',
    ctaGhost: '$ zobrazit protokoly →',
    ctaGhostHref: '/en/protocols/',
    terminal: {
      ariaLabel: 'příklad příkazu pro ražbu',
      barLabel: 'stampchain · mainnet',
      prompt: '$',
      cmd: 'stamp mint',
      flag: '--file kevin.png --encoding p2wsh',
      out1: '→ zapisuji 2,832 bajtů do množiny UTXO...',
      ok: '✓ vyraženo',
      out2: 'tx potvrzena · blok 779,652 · trvalost: navždy',
    },
    stampAlt: 'Ilustrace Bitcoin Stamp: gumové razítko nad články řetězu',
    stampMeta: [
      { label: 'stamp:', value: 'genesis' },
      { label: 'enc:', value: 'P2WSH' },
      { label: 'block:', value: '779652' },
    ],
  },
  stats: {
    ariaLabel: 'milníky protokolu',
    items: [
      { num: [{ text: '779,652' }], label: 'První známka · výška bloku' },
      { num: [{ text: 'KEVIN', accent: true }, { text: ' #4258' }], label: 'První známka KEVIN' },
      { num: [{ text: '#18,516' }], label: 'První token SRC-20' },
      { num: [{ text: '2,300' }, { text: '+', accent: true }], label: 'Držitelé KEVIN' },
    ],
  },
  why: {
    index: '01',
    title: 'Proč Bitcoin Stamps',
    aside: '// trvalost jako vlastnost protokolu',
    lead: {
      id: 'MODEL ÚLOŽIŠTĚ',
      h3: 'Data žijí v množině UTXO, na jediném místě, které Bitcoin nikdy nemůže prořezat.',
      p: 'Známky zapisují data aktiva přímo do neutracených transakčních výstupů. Každý plný uzel nese množinu UTXO jako stav kritický pro konsenzus, takže data známky přežívají stejně dlouho jako samotný Bitcoin. Žádná sleva za svědka, žádný prořezatelný přívěsek.',
      compareAriaLabel: 'srovnání úložišť',
      compare: [
        { key: 'data svědka', value: 'prořezatelná, volitelná pro validaci' },
        { key: 'odkazy mimo řetěz', value: 'závisí na tom, zda externí servery zůstanou naživu' },
        { key: 'množina UTXO', value: 'stav konsenzu, každý uzel, navždy', hot: true },
      ],
    },
    cells: [
      {
        id: '02 / KÓDOVÁNÍ',
        h3: 'Kódování P2WSH',
        p: [
          'Bajty aktiva se balí do výstupů ',
          { text: 'P2WSH', tag: 'code' },
          ' pomocí kódování ve stylu holého multisigu. Standardní transakce, standardní přenos, nula změn protokolu.',
        ],
      },
      {
        id: '03 / DŮVĚRA',
        h3: 'Bez externích indexerů',
        p: 'Známku znovu sestavíš pouze z řetězu. Indexery přidávají pohodlí, zůstávají pohodlím a nikdy se nestanou závislostí na důvěře pro to, čím známka je.',
      },
      {
        id: '04 / OVĚŘITELNOST',
        h3: 'Deterministické napříč uzly',
        p: [
          'Dej každému uzlu stejný řetěz a odvodí stejné známky ve stejném pořadí. Číslování, vlastnictví a zůstatky ',
          { text: 'SRC-20', entity: 'src-20' },
          ' zůstávají čistými funkcemi historie Bitcoinu.',
        ],
      },
    ],
  },
  build: {
    index: '02',
    title: 'Začněte stavět',
    aside: '// dvoje dveře, jeden řetěz',
    panels: [
      {
        tag: 'Pro tvůrce',
        h3: 'Umístěte umění na Bitcoin, natrvalo.',
        p: [
          'Přejděte od své první známky k vydání tokenu ',
          { text: 'SRC-20', entity: 'src-20' },
          '. K začátku není potřeba žádný kód.',
        ],
        links: [
          { ref: '01', text: 'Vytvořte svou první známku', href: '/en/tutorials/creating-first-stamp' },
          { ref: '02', text: 'Nástroje a postupy pro umělce', href: '/en/tutorials/artist-tools' },
          { ref: '03', text: 'Vydejte token SRC-20', href: '/en/tutorials/src20-token-creation' },
        ],
      },
      {
        tag: 'Pro vývojáře',
        h3: 'Stavějte na metaprotokolu.',
        p: 'Deterministické indexování, konstrukce transakcí a kompletní rozhraní API.',
        links: [
          { ref: 'docs', text: 'Specifikace protokolu', href: '/en/protocols/' },
          { ref: 'sdk', text: 'SDK pro tvorbu transakcí', href: '/en/tutorials/sdk-integration' },
          { ref: 'api', text: 'Reference API Stampchain', href: '/en/tutorials/api-integration' },
        ],
      },
    ],
  },
  origin: {
    index: '03',
    title: 'Hnutí Bitcoin graffiti',
    aside: '// od bloku 779,652',
    big: 'Bitcoin Stamps začaly jako akt graffiti: umění nastříkané na nejtrvalejší zeď, jakou kdy lidstvo postavilo.',
    p2: [
      { text: 'mikeinspace', entity: 'mikeinspace' },
      ', původní snílek, se seznámil s ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' prostřednictvím projektu Flooneybin na ',
      { text: 'Counterparty', entity: 'counterparty' },
      '. Když Mike sdílel vizi Bitcoin Stamps, ',
      { text: 'Arwyn', entity: 'arwyn' },
      ' uviděl memovou magii a přizval ',
      { text: 'Reinamora', entity: 'reinamora' },
      '. Společně vytvořili Původní Trojici a vyrazili první známku v bloku 779,652.',
    ],
    p3: [
      'Pak přišel ',
      { text: 'KEVIN', entity: 'kevin', variant: 'cultural' },
      '. Vyražený jako #4258 a znovuzrozený jako první token ',
      { text: 'SRC-20', entity: 'src-20' },
      ' u #18,516, KEVIN vyrostl z interního vtipu na patrona protokolu. Komunita rozhoduje, na čem na Bitcoinu záleží, aniž by velela jakákoli firma.',
    ],
    trinity: [
      'mikeinspace: otázka',
      'Arwyn: kód',
      'Reinamora: řetěz',
    ],
    timeline: [
      {
        block: 'BLOK 779,652',
        h4: 'První známka',
        p: 'Obrazová data dopadají do množiny UTXO. Zeď je označena. Hnutí začíná.',
      },
      {
        block: 'ZNÁMKA #4258',
        h4: 'KEVIN se objevuje',
        p: 'Pixelová tvář se stává tepem komunity i jejím svědomím.',
      },
      {
        block: 'ZNÁMKA #18,516',
        h4: 'Zrození SRC-20',
        p: 'KEVIN se nasazuje jako první token SRC-20: zaměnitelná aktiva, vyražená pravidla, nula prostředníků.',
      },
      {
        block: 'DNES',
        h4: '2,300+ držitelů KEVIN',
        p: 'Z graffiti se stal protokol. Protokol zůstává v jádru graffiti.',
      },
    ],
  },
  values: {
    index: '04',
    title: 'Hodnoty komunity',
    aside: '// žádná firma, žádná nadace',
    lead: [
      'Komunita Bitcoin Stamps žije podle ',
      { text: '"In Lak\'ech Ala K\'in"', tag: 'em' },
      ', jsem další ty. Tvá tvořivost posiluje náš společný výraz.',
    ],
    body: 'Neseme dál tradici Rare Pepe a zároveň přijímáme trvalost Bitcoinu. Toto hnutí vzešlo z umělců a stavitelů, ne z korporátního plánování, a stojí na férových spuštěních a sdílené tvořivosti.',
    link: { text: 'Poznejte komunitu →', href: '/en/community/' },
  },
  footer: {
    brand: 'Bitcoin Stamps',
    brandDesc: 'Komunitně vlastněná dokumentace metaprotokolu Bitcoin Stamps. Žádná firma, žádná nadace. Jen řetěz a lidé, kteří na něj razí.',
    motto: '"In Lak\'ech Ala K\'in"',
    mottoSmall: 'jsem další ty',
    columns: [
      {
        title: 'Protokol',
        links: [
          { text: 'Whitepaper', href: '/en/whitepaper/' },
          { text: 'Specifikace SRC-20', href: '/en/protocols/src-20' },
          { text: 'Specifikace SRC-721', href: '/en/protocols/src-721' },
          { text: 'Registr SIP', href: '/en/protocols/sips' },
        ],
      },
      {
        title: 'Stavět',
        links: [
          { text: 'Začínáme', href: '/en/guide/introduction' },
          { text: 'Tutoriály', href: '/en/tutorials/' },
          { text: 'Reference API', href: '/en/tutorials/api-integration' },
          { text: 'SDK tx-builder', href: '/en/tutorials/sdk-integration' },
        ],
      },
      {
        title: 'Komunita',
        links: [
          { text: 'Příběhy', href: '/en/narratives/' },
          { text: 'Komunitní centrum', href: '/en/community/' },
          { text: 'Ekonomika', href: '/en/guide/economics' },
          { text: 'Novinky', href: '/en/blog/' },
        ],
      },
    ],
    legalLeft: '© 2023-2026 Komunita Bitcoin Stamps · Licence MIT',
    legalRight: 'trvalost: navždy',
  },
}

// ---------------------------------------------------------------------------
// Locale registry. Each entry is a full translation of the `en` source.
// ---------------------------------------------------------------------------
const LOCALES: Record<string, HomeContent> = {
  en,
  es,
  fr,
  zh,
  tr,
  pt,
  cs,
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
