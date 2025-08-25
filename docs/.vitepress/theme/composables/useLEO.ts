/**
 * Smart LEO System - Intelligent Schema.org Generation with i18n Support
 * Enhanced with multi-language support and locale-aware content generation
 */
import { computed, inject } from 'vue'
import type { PageData } from 'vitepress'

// Locale detection utility
function getCurrentLocale(relativePath: string): string {
  if (relativePath.startsWith('fr/')) return 'fr'
  if (relativePath.startsWith('es/')) return 'es'
  if (relativePath.startsWith('zh/')) return 'zh'
  return 'en'
}

// Localized cultural entities
const CULTURAL_ENTITIES = {
  kevin: {
    type: 'Person',
    additionalType: ['https://schema.org/Mascot', 'https://schema.org/CryptoCurrency'],
    names: {
      en: 'KEVIN',
      fr: 'KEVIN',
      es: 'KEVIN',
      zh: 'KEVIN'
    },
    descriptions: {
      en: 'Mythical memetic guide and first SRC-20 token embodying Bitcoin Stamps community consciousness',
      fr: 'Guide mémétique mythique et premier jeton SRC-20 incarnant la conscience communautaire Bitcoin Stamps',
      es: 'Guía memético mítico y primer token SRC-20 que encarna la conciencia comunitaria de Bitcoin Stamps',
      zh: '神话模因向导和第一个 SRC-20 代币，体现了 Bitcoin Stamps 社区意识'
    },
    culturalSignificance: 'high',
    creator: { '@type': 'Person', name: 'Arwyn' },
    blockHeight: 788041,
    url: 'https://kevinstamp.com'
  },
  counterparty: {
    type: 'SoftwareApplication',
    names: {
      en: 'Counterparty Protocol',
      fr: 'Protocole Counterparty', 
      es: 'Protocolo Counterparty',
      zh: 'Counterparty 协议'
    },
    descriptions: {
      en: 'Bitcoin metaprotocol enabling advanced financial functionality and digital asset creation',
      fr: 'Métaprotocole Bitcoin permettant des fonctionnalités financières avancées et la création d\'actifs numériques',
      es: 'Metaprotocolo de Bitcoin que permite funcionalidades financieras avancadas y la creación de activos digitales',
      zh: '支持高级金融功能和数字资产创建的比特币元协议'
    },
    culturalSignificance: 'high',
    creator: { '@type': 'Organization', name: 'Counterparty Foundation' },
    url: 'https://counterparty.io'
  },
  arwyn: {
    type: 'Person',
    names: {
      en: 'Arwyn',
      fr: 'Arwyn',
      es: 'Arwyn',
      zh: 'Arwyn'
    },
    descriptions: {
      en: 'Artist and creator of KEVIN, the first SRC-20 token',
      fr: 'Artiste et créateur de KEVIN, le premier jeton SRC-20',
      es: 'Artista y creador de KEVIN, el primer token SRC-20',
      zh: 'KEVIN 的艺术家和创造者，第一个 SRC-20 代币'
    },
    culturalRole: 'Pioneer Artist',
    significance: 'high'
  },
  mikeinspace: {
    type: 'Person',
    names: {
      en: 'mikeinspace',
      fr: 'mikeinspace',
      es: 'mikeinspace',
      zh: 'mikeinspace'
    },
    descriptions: {
      en: 'Original dreamer and visionary founder of Bitcoin Stamps who brought together Reinamora and Arwyn to build the ecosystem. Creator of the first official Bitcoin Stamp and foundational working documents.',
      fr: 'Rêveur original et fondateur visionnaire de Bitcoin Stamps qui a rassemblé Reinamora et Arwyn pour construire l\'écosystème. Créateur du premier Bitcoin Stamp officiel et des documents de travail fondamentaux.',
      es: 'Soñador original y fundador visionario de Bitcoin Stamps que unió a Reinamora y Arwyn para construir el ecosistema. Creador del primer Bitcoin Stamp oficial y documentos de trabajo fundamentales.',
      zh: 'Bitcoin Stamps 的原始梦想家和有远见的创始人，他将 Reinamora 和 Arwyn 聚集在一起构建生态系统。第一个官方 Bitcoin Stamp 和基础工作文档的创建者。'
    },
    culturalRole: 'Original Dreamer and Visionary Founder',
    blockHeight: 779652,
    significance: 'high',
    url: 'https://x.com/mikeinspace',
    githubRepo: 'https://github.com/mikeinspace/stamps'
  },
  reinamora: {
    type: 'Person',
    names: {
      en: 'Reinamora',
      fr: 'Reinamora',
      es: 'Reinamora',
      zh: 'Reinamora'
    },
    descriptions: {
      en: 'Technical architect of Bitcoin Stamps and SRC-20 protocol. Contributor to SRC-721 and SRC-101 development',
      fr: 'Architecte technique de Bitcoin Stamps et du protocole SRC-20. Contributeur au développement SRC-721 et SRC-101',
      es: 'Arquitecto técnico de Bitcoin Stamps y protocolo SRC-20. Contribuidor al desarrollo SRC-721 y SRC-101',
      zh: 'Bitcoin Stamps 和 SRC-20 协议的技术架构师。SRC-721 和 SRC-101 开发的贡献者'
    },
    culturalRole: 'Technical Architect',
    significance: 'high'
  },
  derpherpstein: {
    type: 'Person',
    names: {
      en: 'DerpHerpstein',
      fr: 'DerpHerpstein',
      es: 'DerpHerpstein',
      zh: 'DerpHerpstein'
    },
    descriptions: {
      en: 'Creator of the SRC-721 Non-Fungible Token specification for Bitcoin Stamps',
      fr: 'Créateur de la spécification SRC-721 pour les jetons non-fongibles Bitcoin Stamps',
      es: 'Creador de la especificación SRC-721 para tokens no fungibles de Bitcoin Stamps',
      zh: 'SRC-721 非同质化代币规范的创建者'
    },
    culturalSignificance: 'high',
    creator: { '@type': 'Person', name: 'DerpHerpstein' },
    url: '/protocols/src-721'
  }
}

const PROTOCOL_ENTITIES = {
  'bitcoin-stamps': {
    type: 'SoftwareApplication',
    names: {
      en: 'Bitcoin Stamps',
      fr: 'Bitcoin Stamps',
      es: 'Bitcoin Stamps',
      zh: 'Bitcoin Stamps'
    },
    applicationCategory: 'Bitcoin Metaprotocol',
    descriptions: {
      en: 'Immutable digital assets stored directly on the Bitcoin blockchain using various standards and protocols',
      fr: 'Actifs numériques immuables stockés directement sur la blockchain Bitcoin en utilisant diverses normes et protocoles',
      es: 'Activos digitales inmutables almacenados directamente en la blockchain de Bitcoin utilizando varios estándares y protocolos',
      zh: '使用各种标准和协议直接存储在比特币区块链上的不可变数字资产'
    },
    culturalSignificance: 'high',
    features: {
      en: ['Permanent storage', 'Bitcoin UTXO', 'Decentralized', 'Counterparty integration'],
      fr: ['Stockage permanent', 'UTXO Bitcoin', 'Décentralisé', 'Intégration Counterparty'],
      es: ['Almacenamiento permanente', 'UTXO Bitcoin', 'Descentralizado', 'Integración Counterparty'],
      zh: ['永久存储', 'Bitcoin UTXO', '去中心化', 'Counterparty 集成']
    },
    relationships: [
      { id: 'counterparty', type: 'builds-on' },
      { id: 'src-20', type: 'includes' },
      { id: 'src-101', type: 'includes' },
      { id: 'src-721', type: 'includes' },
      { id: 'olga', type: 'includes' },
      { id: 'kevin', type: 'mascot-of' },
      { id: 'derpherpstein', type: 'protocol-pioneer' }
    ],
    url: '/',
    culturalMetadata: {
      impact: {
        en: 'Revolutionary approach to permanent digital art on Bitcoin',
        fr: 'Approche révolutionnaire de l\'art numérique permanent sur Bitcoin',
        es: 'Enfoque revolucionario del arte digital permanente en Bitcoin',
        zh: '比特币上永久数字艺术的革命性方法'
      },
      significance: {
        en: 'Established new paradigm for blockchain-based digital assets with true permanence',
        fr: 'Établi un nouveau paradigme pour les actifs numériques basés sur blockchain avec une véritable permanence',
        es: 'Estableció un nuevo paradigma para los activos digitales basados en blockchain con verdadera permanencia',
        zh: '为基于区块链的数字资产建立了真正永久性的新范式'
      },
      communitySize: 50000
    }
  },
  'src-20': {
    type: 'SoftwareApplication',
    names: {
      en: 'SRC-20 Token Standard',
      fr: 'Standard de Jeton SRC-20',
      es: 'Estándar de Token SRC-20',
      zh: 'SRC-20 代币标准'
    },
    applicationCategory: 'Bitcoin Metaprotocol',
    descriptions: {
      en: 'Fungible token standard for Bitcoin Stamps enabling permanent token creation',
      fr: 'Standard de jeton fongible pour Bitcoin Stamps permettant la création permanente de jetons',
      es: 'Estándar de token fungible para Bitcoin Stamps que permite la creación permanente de tokens',
      zh: 'Bitcoin Stamps 的可替代代币标准，支持永久代币创建'
    },
    blockHeight: 788041
  },
  'src-721': {
    type: 'SoftwareApplication',
    names: {
      en: 'SRC-721 Non-Fungible Token Standard',
      fr: 'Standard de Jeton Non-Fongible SRC-721',
      es: 'Estándar de Token No Fungible SRC-721',
      zh: 'SRC-721 非同质化代币标准'
    },
    applicationCategory: 'Bitcoin Metaprotocol',
    descriptions: {
      en: 'Non-fungible token standard for unique Bitcoin Stamps',
      fr: 'Standard de jeton non-fongible pour les Bitcoin Stamps uniques',
      es: 'Estándar de token no fungible para Bitcoin Stamps únicos',
      zh: '独特 Bitcoin Stamps 的非同质化代币标准'
    },
    culturalSignificance: 'high',
    relationships: [
      { id: 'derpherpstein', type: 'created-by' },
      { id: 'bitcoin-stamps', type: 'part-of' }
    ]
  },
  'src-101': {
    type: 'SoftwareApplication',
    names: {
      en: 'SRC-101 Naming Standard',
      fr: 'Standard de Nommage SRC-101',
      es: 'Estándar de Nomenclatura SRC-101',
      zh: 'SRC-101 命名标准'
    },
    applicationCategory: 'Bitcoin Metaprotocol',
    descriptions: {
      en: 'Human-readable naming standard for Bitcoin Stamps addresses and resources. Created by Bitname team with Reinamora contribution',
      fr: 'Standard de nommage lisible par l\'homme pour les adresses et ressources Bitcoin Stamps. Créé par l\'équipe Bitname avec contribution de Reinamora',
      es: 'Estándar de nomenclatura legible por humanos para direcciones y recursos de Bitcoin Stamps. Creado por el equipo Bitname con contribución de Reinamora',
      zh: '比特币印记地址和资源的人类可读命名标准。由 Bitname 团队创建，Reinamora 贡献'
    },
    creator: { '@type': 'Organization', name: 'Bitname Team' },
    contributor: { '@type': 'Person', name: 'Reinamora' }
  },
  olga: {
    type: 'SoftwareApplication',
    names: {
      en: 'OLGA P2WSH Encoding',
      fr: 'Encodage OLGA P2WSH',
      es: 'Codificación OLGA P2WSH',
      zh: 'OLGA P2WSH 编码'
    },
    applicationCategory: 'Bitcoin Metaprotocol',
    descriptions: {
      en: 'P2WSH encoding method for Bitcoin Stamps, providing cost optimization over bare multisig',
      fr: 'Méthode d\'encodage P2WSH pour Bitcoin Stamps, offrant une optimisation des coûts par rapport au multisig nu',
      es: 'Método de codificación P2WSH para Bitcoin Stamps, proporcionando optimización de costos sobre multisig desnudo',
      zh: '用于 Bitcoin Stamps 的 P2WSH 编码方法，相比裸多重签名提供成本优化'
    }
  },
  'tx-builder': {
    type: 'SoftwareApplication',
    names: {
      en: '@btc-stamps/tx-builder',
      fr: '@btc-stamps/tx-builder',
      es: '@btc-stamps/tx-builder',
      zh: '@btc-stamps/tx-builder'
    },
    applicationCategory: 'SDK',
    descriptions: {
      en: 'TypeScript SDK for building Bitcoin Stamps transactions with support for all protocols',
      fr: 'SDK TypeScript pour construire des transactions Bitcoin Stamps avec support pour tous les protocoles',
      es: 'SDK TypeScript para construir transacciones de Bitcoin Stamps con soporte para todos los protocolos',
      zh: '用于构建 Bitcoin Stamps 交易的 TypeScript SDK，支持所有协议'
    },
    culturalSignificance: 'medium',
    features: {
      en: ['Multi-protocol support', 'TypeScript definitions', 'OLGA optimization', 'Production-ready'],
      fr: ['Support multi-protocole', 'Définitions TypeScript', 'Optimisation OLGA', 'Prêt pour la production'],
      es: ['Soporte multi-protocolo', 'Definiciones TypeScript', 'Optimización OLGA', 'Listo para producción'],
      zh: ['多协议支持', 'TypeScript 定义', 'OLGA 优化', '生产就绪']
    },
    url: '/tutorials/sdk-integration'
  },
  stampchain: {
    type: 'SoftwareApplication',
    names: {
      en: 'Stampchain Indexer',
      fr: 'Indexeur Stampchain',
      es: 'Indexador Stampchain',
      zh: 'Stampchain 索引器'
    },
    applicationCategory: 'Indexer Service',
    descriptions: {
      en: 'Official indexing service and API provider for Bitcoin Stamps ecosystem with real-time data feeds',
      fr: 'Service d\'indexation officiel et fournisseur d\'API pour l\'écosystème Bitcoin Stamps avec des flux de données en temps réel',
      es: 'Servicio de indexación oficial y proveedor de API para el ecosistema Bitcoin Stamps con fuentes de datos en tiempo real',
      zh: 'Bitcoin Stamps 生态系统的官方索引服务和 API 提供商，具有实时数据源'
    },
    culturalSignificance: 'high',
    features: {
      en: ['Real-time indexing', 'REST API', 'WebSocket feeds', 'Historical data'],
      fr: ['Indexation en temps réel', 'API REST', 'Flux WebSocket', 'Données historiques'],
      es: ['Indexación en tiempo real', 'API REST', 'Feeds WebSocket', 'Datos históricos'],
      zh: ['实时索引', 'REST API', 'WebSocket 源', '历史数据']
    },
    url: '/tutorials/api-integration'
  }
}

interface LEOFrontmatter {
  // Core identification
  leoType?: 'protocol' | 'narrative' | 'tutorial' | 'entity' | 'historical-event'
  entityId?: string
  culturalSignificance?: 'high' | 'medium' | 'low'
  
  // Protocol-specific
  protocols?: string[]
  blockHeight?: number
  
  // Content metadata
  audience?: 'developer' | 'artist' | 'both'
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  
  // Relationships
  relatedEntities?: string[]
  mentions?: string[]
}

export function useLEO() {
  const page = inject<{ value: PageData }>('page')
  
  const frontmatter = computed(() => page?.value?.frontmatter as LEOFrontmatter || {})
  const currentLocale = computed(() => getCurrentLocale(page?.value?.relativePath || ''))
  
  // Smart entity detection from content with locale awareness
  const detectedEntities = computed(() => {
    const content = page?.value?.content || ''
    const locale = currentLocale.value
    const detected = []
    
    // Auto-detect cultural entities
    for (const [key, entity] of Object.entries(CULTURAL_ENTITIES)) {
      const entityName = entity.names?.[locale] || entity.names?.en || entity.name || key
      const patterns = [
        new RegExp(`\\b${entityName}\\b`, 'i'),
        new RegExp(`\\b${key}\\b`, 'i')
      ]
      
      if (patterns.some(pattern => pattern.test(content))) {
        detected.push({ 
          id: key, 
          ...entity,
          localizedName: entityName,
          localizedDescription: entity.descriptions?.[locale] || entity.descriptions?.en || entity.description
        })
      }
    }
    
    // Auto-detect protocol entities
    for (const [key, entity] of Object.entries(PROTOCOL_ENTITIES)) {
      const entityName = entity.names?.[locale] || entity.names?.en || entity.name || key
      const patterns = [
        new RegExp(`\\b${entityName}\\b`, 'i'),
        new RegExp(`\\b${key.replace('-', '[-\\s]?')}\\b`, 'i')
      ]
      
      if (patterns.some(pattern => pattern.test(content))) {
        detected.push({ 
          id: key, 
          ...entity,
          localizedName: entityName,
          localizedDescription: entity.descriptions?.[locale] || entity.descriptions?.en || entity.description
        })
      }
    }
    
    return detected
  })
  
  // Generate Schema.org structured data intelligently with i18n
  const structuredData = computed(() => {
    const baseUrl = 'https://bitcoinstamps.xyz'
    const locale = currentLocale.value
    const currentUrl = `${baseUrl}${page?.value?.relativePath?.replace(/\.md$/, '') || ''}`
    
    const organizationNames = {
      en: 'Bitcoin Stamps Community',
      fr: 'Communauté Bitcoin Stamps',
      es: 'Comunidad Bitcoin Stamps',
      zh: 'Bitcoin Stamps 社区'
    }
    
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': getSchemaType(),
      name: frontmatter.value.title || page?.value?.title || 'Bitcoin Stamps Documentation',
      description: frontmatter.value.description || page?.value?.description,
      url: currentUrl,
      inLanguage: locale,
      dateModified: new Date().toISOString(),
      publisher: {
        '@type': 'Organization',
        name: organizationNames[locale] || organizationNames.en,
        url: 'https://github.com/btc-stamps'
      }
    }
    
    // Add cultural significance if detected
    if (detectedEntities.value.some(e => e.id === 'kevin')) {
      schema.about = {
        '@type': ['Person', 'Mascot'],
        name: 'KEVIN',
        description: 'Community mascot and first SRC-20 token',
        culturalSignificance: 'high',
        url: 'https://kevinstamp.com'
      }
    }
    
    // Add protocol context
    if (frontmatter.value.protocols?.length) {
      schema.mentions = frontmatter.value.protocols.map(id => ({
        '@type': 'SoftwareApplication',
        name: PROTOCOL_ENTITIES[id]?.name || id.toUpperCase(),
        applicationCategory: 'Bitcoin Metaprotocol'
      }))
    }
    
    // Add detected entities as mentions
    if (detectedEntities.value.length > 0) {
      schema.mentions = [
        ...(schema.mentions || []),
        ...detectedEntities.value.map(entity => ({
          '@type': entity.type,
          name: entity.name,
          description: entity.description
        }))
      ]
    }
    
    // Historical events
    if (frontmatter.value.blockHeight) {
      schema.temporal = {
        '@type': 'Event',
        name: `Block ${frontmatter.value.blockHeight} Event`,
        startDate: getBlockDate(frontmatter.value.blockHeight)
      }
    }
    
    // Audience targeting
    schema.audience = getAudienceSchema(frontmatter.value.audience || 'both')
    
    return schema
  })
  
  function getSchemaType(): string {
    switch (frontmatter.value.leoType) {
      case 'protocol': return 'TechArticle'
      case 'tutorial': return 'HowTo'
      case 'entity': return 'DefinedTerm'
      case 'narrative': return 'Article'
      case 'historical-event': return 'Event'
      default: return 'Article'
    }
  }
  
  function getAudienceSchema(audience: string) {
    if (audience === 'both') {
      return [
        { '@type': 'Audience', audienceType: 'Software Developer' },
        { '@type': 'Audience', audienceType: 'Digital Artist' }
      ]
    }
    
    return {
      '@type': 'Audience',
      audienceType: audience === 'developer' ? 'Software Developer' : 'Digital Artist'
    }
  }
  
  function getBlockDate(blockHeight: number): string {
    const knownBlocks = {
      779652: '2023-04-01', // First Bitcoin Stamp by Mikeinspace
      788041: '2023-04-20', // KEVIN deployment by Arwyn
      796000: '2023-06-15'  // SRC-20 migration
    }
    
    return knownBlocks[blockHeight] || new Date().toISOString().split('T')[0]
  }
  
  // Entity helper functions
  function getEntity(id: string) {
    return CULTURAL_ENTITIES[id] || PROTOCOL_ENTITIES[id] || null
  }
  
  function isKevinMentioned() {
    return detectedEntities.value.some(e => e.id === 'kevin')
  }
  
  function getCulturalContext() {
    const culturalEntities = detectedEntities.value.filter(e => 
      CULTURAL_ENTITIES[e.id] && CULTURAL_ENTITIES[e.id].significance === 'high'
    )
    
    return culturalEntities.length > 0 ? 'high' : 'medium'
  }
  
  return {
    frontmatter,
    structuredData,
    detectedEntities,
    currentLocale,
    getEntity,
    isKevinMentioned,
    getCulturalContext
  }
}