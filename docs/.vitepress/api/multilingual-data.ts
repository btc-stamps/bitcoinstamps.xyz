/**
 * Multilingual data definitions for Bitcoin Stamps entities
 * Contains translations for all entity names, descriptions, and cultural content
 */

import type { 
  MultiLangText, 
  ConceptEntity, 
  ProtocolEntity, 
  ToolEntity, 
  ProtocolMetadata,
  MultiLangRelationship,
  SupportedLanguage
} from './types.d.ts'

/**
 * KEVIN entity with full multilingual support
 */
export const KEVIN_MULTILINGUAL: ConceptEntity = {
  id: 'kevin',
  name: {
    en: 'KEVIN',
    es: 'KEVIN',
    fr: 'KEVIN',
    zh: 'KEVIN'
  },
  type: 'cultural-icon',
  description: {
    en: 'The beloved mascot of Bitcoin Stamps, originating from the first SRC-20 token and evolving into a cultural symbol of community values',
    es: 'La querida mascota de Bitcoin Stamps, originaria del primer token SRC-20 y evolucionando hacia un símbolo cultural de los valores comunitarios',
    fr: 'La mascotte bien-aimée de Bitcoin Stamps, originaire du premier jeton SRC-20 et évoluant en symbole culturel des valeurs communautaires',
    zh: '比特币邮票的受人喜爱的吉祥物，起源于第一个SRC-20代币，演变为社区价值的文化象征'
  },
  culturalSignificance: 'high',
  stampNumber: 6878,
  firstStampNumber: 4258,
  src20StampNumber: 18516,
  creator: 'Arwyn',
  creationDate: '2023-04-05',
  relationships: [
    { 
      id: 'src-20', 
      type: 'originated-from',
      name: {
        en: 'SRC-20 Tokens',
        es: 'Tokens SRC-20',
        fr: 'Jetons SRC-20',
        zh: 'SRC-20代币'
      },
      description: {
        en: 'KEVIN pioneered the SRC-20 token standard',
        es: 'KEVIN fue pionero del estándar de token SRC-20',
        fr: 'KEVIN a été pionnier du standard de jeton SRC-20',
        zh: 'KEVIN开创了SRC-20代币标准'
      }
    },
    { 
      id: 'bitcoin-stamps', 
      type: 'mascot-of',
      name: {
        en: 'Bitcoin Stamps',
        es: 'Sellos Bitcoin',
        fr: 'Tampons Bitcoin',
        zh: '比特币邮票'
      },
      description: {
        en: 'Community mascot representing authenticity and artistic vision',
        es: 'Mascota comunitaria que representa autenticidad y visión artística',
        fr: 'Mascotte communautaire représentant l\'authenticité et la vision artistique',
        zh: '代表真实性和艺术愿景的社区吉祥物'
      }
    }
  ] as MultiLangRelationship[],
  url: '/narratives/kevin-origin',
  culturalMetadata: {
    impact: {
      en: 'Transformed from experimental art to beloved community mascot',
      es: 'Transformado de arte experimental a querida mascota comunitaria',
      fr: 'Transformé d\'art expérimental en mascotte communautaire bien-aimée',
      zh: '从实验艺术转变为受人喜爱的社区吉祥物'
    },
    significance: {
      en: 'Symbol of authentic community building and artistic vision on Bitcoin',
      es: 'Símbolo de construcción comunitaria auténtica y visión artística en Bitcoin',
      fr: 'Symbole de construction communautaire authentique et de vision artistique sur Bitcoin',
      zh: '比特币上真实社区建设和艺术愿景的象征'
    },
    communitySize: 2300
  }
}

/**
 * Bitcoin Stamps ecosystem entity with multilingual support
 */
export const BITCOIN_STAMPS_MULTILINGUAL: ConceptEntity = {
  id: 'bitcoin-stamps',
  name: {
    en: 'Bitcoin Stamps',
    es: 'Sellos Bitcoin',
    fr: 'Tampons Bitcoin',
    zh: '比特币邮票'
  },
  type: 'protocol-ecosystem',
  description: {
    en: 'Consensus-critical digital assets stored in Bitcoin\'s UTXO set using P2WSH encoding, guaranteed to be preserved on all full nodes unlike prunable witness data',
    es: 'Activos digitales críticos para el consenso almacenados en el conjunto UTXO de Bitcoin usando codificación P2WSH, garantizados para ser preservados en todos los nodos completos a diferencia de los datos de testigo podables',
    fr: 'Actifs numériques critiques pour le consensus stockés dans l\'ensemble UTXO de Bitcoin en utilisant l\'encodage P2WSH, garantis d\'être préservés sur tous les nœuds complets contrairement aux données de témoin élagables',
    zh: '存储在比特币UTXO集中的共识关键数字资产，使用P2WSH编码，保证在所有完整节点上保存，不像可修剪的见证数据'
  },
  culturalSignificance: 'high',
  features: [
    {
      en: 'UTXO set storage (consensus-critical)',
      es: 'Almacenamiento en conjunto UTXO (crítico para consenso)',
      fr: 'Stockage dans l\'ensemble UTXO (critique pour le consensus)',
      zh: 'UTXO集存储（共识关键）'
    },
    {
      en: 'P2WSH encoding (not witness data)',
      es: 'Codificación P2WSH (no datos de testigo)',
      fr: 'Encodage P2WSH (pas de données de témoin)',
      zh: 'P2WSH编码（非见证数据）'
    },
    {
      en: 'All nodes store permanently',
      es: 'Todos los nodos almacenan permanentemente',
      fr: 'Tous les nœuds stockent en permanence',
      zh: '所有节点永久存储'
    },
    {
      en: 'No external indexer dependency',
      es: 'Sin dependencia de indexador externo',
      fr: 'Aucune dépendance d\'indexeur externe',
      zh: '无外部索引器依赖'
    },
    {
      en: 'Account-based asset model',
      es: 'Modelo de activos basado en cuenta',
      fr: 'Modèle d\'actifs basé sur compte',
      zh: '基于账户的资产模型'
    },
    {
      en: 'Counterparty protocol foundation',
      es: 'Fundamento del protocolo Counterparty',
      fr: 'Fondation du protocole Counterparty',
      zh: 'Counterparty协议基础'
    }
  ],
  relationships: [
    { id: 'counterparty', type: 'builds-on' },
    { id: 'src-20', type: 'includes' },
    { id: 'src-101', type: 'includes' },
    { id: 'src-721', type: 'includes' },
    { id: 'olga', type: 'includes' }
  ],
  url: '/'
}

/**
 * TX Builder SDK with multilingual support
 */
export const TX_BUILDER_MULTILINGUAL: ToolEntity = {
  id: 'tx-builder',
  name: {
    en: '@btc-stamps/tx-builder',
    es: '@btc-stamps/tx-builder',
    fr: '@btc-stamps/tx-builder',
    zh: '@btc-stamps/tx-builder'
  },
  type: 'sdk',
  description: {
    en: 'TypeScript SDK for building Bitcoin Stamps transactions with support for all protocols',
    es: 'SDK de TypeScript para construir transacciones de Bitcoin Stamps con soporte para todos los protocolos',
    fr: 'SDK TypeScript pour construire des transactions Bitcoin Stamps avec support pour tous les protocoles',
    zh: '用于构建比特币邮票交易的TypeScript SDK，支持所有协议'
  },
  culturalSignificance: 'medium',
  features: [
    {
      en: 'Multi-protocol support',
      es: 'Soporte multi-protocolo',
      fr: 'Support multi-protocole',
      zh: '多协议支持'
    },
    {
      en: 'TypeScript definitions',
      es: 'Definiciones TypeScript',
      fr: 'Définitions TypeScript',
      zh: 'TypeScript定义'
    },
    {
      en: 'OLGA optimization',
      es: 'Optimización OLGA',
      fr: 'Optimisation OLGA',
      zh: 'OLGA优化'
    },
    {
      en: 'Production-ready',
      es: 'Listo para producción',
      fr: 'Prêt pour la production',
      zh: '生产就绪'
    }
  ],
  relationships: [
    { id: 'src-20', type: 'implements' },
    { id: 'src-721', type: 'implements' },
    { id: 'olga', type: 'supports' }
  ],
  url: '/tutorials/sdk-integration',
  version: '1.0.0',
  languages: ['TypeScript', 'JavaScript'],
  installation: {
    npm: '@btc-stamps/tx-builder',
    github: 'https://github.com/btc-stamps/tx-builder',
    documentation: '/tutorials/sdk-integration'
  }
}

/**
 * SRC-20 Protocol with multilingual support and KEVIN legacy
 */
export const SRC20_MULTILINGUAL: ProtocolMetadata = {
  id: 'src-20',
  name: {
    en: 'SRC-20 Fungible Tokens',
    es: 'Tokens Fungibles SRC-20',
    fr: 'Jetons Fongibles SRC-20',
    zh: 'SRC-20同质化代币'
  },
  description: {
    en: 'Fungible token standard pioneered by KEVIN, enhanced with features introduced at block 796,000',
    es: 'Estándar de tokens fungibles pionero de KEVIN, mejorado con características introducidas en el bloque 796,000',
    fr: 'Standard de jetons fongibles pionnier de KEVIN, amélioré avec des fonctionnalités introduites au bloc 796,000',
    zh: '由KEVIN开创的同质化代币标准，在区块796,000引入的功能增强'
  },
  status: 'active',
  version: '2.0.0',
  blockIntroduced: 796000,
  culturalSignificance: 'high',
  features: [
    {
      en: 'KEVIN token heritage',
      es: 'Herencia del token KEVIN',
      fr: 'Héritage du jeton KEVIN',
      zh: 'KEVIN代币传承'
    },
    {
      en: 'Block 796,000 evolution',
      es: 'Evolución del bloque 796,000',
      fr: 'Évolution du bloc 796,000',
      zh: '区块796,000演进'
    },
    {
      en: 'Direct Bitcoin encoding',
      es: 'Codificación directa en Bitcoin',
      fr: 'Encodage Bitcoin direct',
      zh: '直接比特币编码'
    },
    {
      en: 'Community-driven success',
      es: 'Éxito impulsado por la comunidad',
      fr: 'Succès communautaire',
      zh: '社区驱动的成功'
    },
    {
      en: 'OLGA P2WSH encoding support',
      es: 'Soporte de codificación OLGA P2WSH',
      fr: 'Support encodage OLGA P2WSH',
      zh: 'OLGA压缩支持'
    },
    {
      en: 'Deflationary mechanics',
      es: 'Mecánicas deflacionarias',
      fr: 'Mécaniques déflationnistes',
      zh: '通胀机制'
    }
  ],
  specifications: {
    dataFormat: 'JSON',
    encoding: 'UTF-8',
    storage: 'Bitcoin UTXO',
    gasOptimized: true
  },
  relationships: [
    {
      id: 'olga',
      type: 'optimizes',
      description: {
        en: 'OLGA P2WSH encoding reduces transaction costs for SRC-20 tokens',
        es: 'La codificación OLGA P2WSH reduce los costos de transacción para tokens SRC-20',
        fr: 'L\'encodage OLGA P2WSH réduit les coûts de transaction pour les jetons SRC-20',
        zh: 'OLGA压缩降低SRC-20代币的交易成本'
      }
    },
    {
      id: 'src-721',
      type: 'complements',
      description: {
        en: 'SRC-721 Recursion Standard extends SRC-20 with advanced composability',
        es: 'Los NFT SRC-721 extienden los conceptos de tokens fungibles SRC-20',
        fr: 'Les NFT SRC-721 étendent les concepts de jetons fongibles SRC-20',
        zh: 'SRC-721 NFT扩展了SRC-20同质化代币概念'
      }
    }
  ],
  resources: {
    documentation: '/protocols/src-20',
    examples: ['/tutorials/src20-token-creation', '/tutorials/creating-first-stamp'],
    sdk: ['@btc-stamps/tx-builder']
  },
  community: {
    holders: 2129,
    transactions: 400000,
    marketCap: 'Significant portion of $10B+ SRC-20 volume'
  },
  kevinLegacy: {
    pioneeredBy: true,
    culturalImpact: {
      en: 'KEVIN transformed from experimental art to beloved community mascot, proving authentic projects can achieve massive success',
      es: 'KEVIN se transformó de arte experimental a querida mascota comunitaria, demostrando que proyectos auténticos pueden lograr un éxito masivo',
      fr: 'KEVIN s\'est transformé d\'art expérimental en mascotte communautaire bien-aimée, prouvant que des projets authentiques peuvent atteindre un succès massif',
      zh: 'KEVIN从实验艺术转变为受人喜爱的社区吉祥物，证明了真实的项目可以获得巨大成功'
    },
    successPattern: {
      en: 'Authentic artistic vision + grassroots community building + long-term commitment',
      es: 'Visión artística auténtica + construcción comunitaria de base + compromiso a largo plazo',
      fr: 'Vision artistique authentique + construction communautaire de base + engagement à long terme',
      zh: '真实的艺术愿景 + 草根社区建设 + 长期承诺'
    }
  }
}

/**
 * SRC-721 Protocol with multilingual support
 */
export const SRC721_MULTILINGUAL: ProtocolMetadata = {
  id: 'src-721',
  name: {
    en: 'SRC-721 Recursion Standard',
    es: 'Estándar de Recursión SRC-721',
    fr: 'Standard de Récursion SRC-721',
    zh: 'SRC-721递归标准'
  },
  description: {
    en: 'Non-fungible token standard for unique Bitcoin Stamps. Created by DerpHerpstein',
    es: 'Estándar de token no fungible para Bitcoin Stamps únicos. Creado por DerpHerpstein',
    fr: 'Standard de jeton non-fongible pour les Bitcoin Stamps uniques. Créé par DerpHerpstein',
    zh: '独特 Bitcoin Stamps 的非同质化代币标准。由 DerpHerpstein 创建'
  },
  status: 'active',
  version: '1.0.0',
  culturalSignificance: 'high',
  features: [
    {
      en: 'Recursive references',
      es: 'Referencias recursivas',
      fr: 'Références récursives',
      zh: '递归引用'
    },
    {
      en: 'Artistic permanence',
      es: 'Permanencia artística',
      fr: 'Permanence artistique',
      zh: '艺术永恒性'
    },
    {
      en: 'On-chain metadata',
      es: 'Metadatos en cadena',
      fr: 'Métadonnées en chaîne',
      zh: '链上元数据'
    },
    {
      en: 'Advanced NFT features',
      es: 'Características NFT avanzadas',
      fr: 'Fonctionnalités NFT avancées',
      zh: '高级NFT功能'
    },
    {
      en: 'Cultural expression',
      es: 'Expresión cultural',
      fr: 'Expression culturelle',
      zh: '文化表达'
    }
  ],
  specifications: {
    dataFormat: 'JSON',
    encoding: 'UTF-8',
    storage: 'Bitcoin UTXO',
    gasOptimized: true
  },
  relationships: [
    {
      id: 'src-20',
      type: 'extends',
      description: {
        en: 'Extends SRC-20 concepts for non-fungible use cases',
        es: 'Extiende conceptos SRC-20 para casos de uso no fungibles',
        fr: 'Étend les concepts SRC-20 pour les cas d\'usage non-fongibles',
        zh: '为非同质化用例扩展SRC-20概念'
      }
    },
    {
      id: 'olga',
      type: 'optimizes',
      description: {
        en: 'OLGA P2WSH encoding reduces costs for complex NFT data',
        es: 'La codificación OLGA P2WSH reduce costos para datos NFT complejos',
        fr: 'L\'encodage OLGA P2WSH réduit les coûts pour les données NFT complexes',
        zh: 'OLGA压缩降低复杂NFT数据的成本'
      }
    }
  ],
  resources: {
    documentation: '/protocols/src-721',
    examples: ['/tutorials/creating-first-stamp', '/tutorials/visual-workflow'],
    sdk: ['@btc-stamps/tx-builder']
  },
  community: {
    holders: 500,
    transactions: 2500
  }
}

/**
 * OLGA Protocol with multilingual support
 */
export const OLGA_MULTILINGUAL: ProtocolMetadata = {
  id: 'olga',
  name: {
    en: 'OLGA P2WSH Encoding',
    es: 'Codificación OLGA P2WSH',
    fr: 'Encodage OLGA P2WSH',
    zh: 'OLGA P2WSH 编码'
  },
  description: {
    en: 'P2WSH encoding method for Bitcoin Stamps, providing cost optimization over bare multisig',
    es: 'Método de codificación P2WSH para Bitcoin Stamps, proporcionando optimización de costos sobre multisig desnudo',
    fr: 'Méthode d\'encodage P2WSH pour Bitcoin Stamps, offrant une optimisation des coûts par rapport au multisig nu',
    zh: '用于 Bitcoin Stamps 的 P2WSH 编码方法，相比裸多重签名提供成本优化'
  },
  status: 'active',
  version: '1.0.0',
  culturalSignificance: 'medium',
  features: [
    {
      en: 'Cost reduction for artists',
      es: 'Reducción de costos para artistas',
      fr: 'Réduction des coûts pour les artistes',
      zh: '为艺术家降低成本'
    },
    {
      en: 'Democratized access',
      es: 'Acceso democratizado',
      fr: 'Accès démocratisé',
      zh: '民主化访问'
    },
    {
      en: 'Multi-protocol support',
      es: 'Soporte multi-protocolo',
      fr: 'Support multi-protocole',
      zh: '多协议支持'
    },
    {
      en: 'Community empowerment',
      es: 'Empoderamiento comunitario',
      fr: 'Autonomisation communautaire',
      zh: '社区赋权'
    },
    {
      en: 'Performance enhancement',
      es: 'Mejora de rendimiento',
      fr: 'Amélioration des performances',
      zh: '性能增强'
    }
  ],
  specifications: {
    dataFormat: 'Binary',
    encoding: 'Custom Compression',
    storage: 'Bitcoin UTXO',
    gasOptimized: true
  },
  relationships: [
    {
      id: 'src-20',
      type: 'optimizes',
      description: {
        en: 'Reduces transaction costs for SRC-20 token operations',
        es: 'Reduce costos de transacción para operaciones de tokens SRC-20',
        fr: 'Réduit les coûts de transaction pour les opérations de jetons SRC-20',
        zh: '降低SRC-20代币操作的交易成本'
      }
    },
    {
      id: 'src-721',
      type: 'optimizes',
      description: {
        en: 'Compresses NFT metadata and media for cost efficiency',
        es: 'Comprime metadatos y medios NFT para eficiencia de costos',
        fr: 'Compresse les métadonnées et médias NFT pour l\'efficacité des coûts',
        zh: '压缩NFT元数据和媒体以提高成本效率'
      }
    }
  ],
  resources: {
    documentation: '/protocols/olga',
    examples: ['/tutorials/artist-tools'],
    sdk: ['@btc-stamps/tx-builder']
  },
  community: {
    holders: 0, // Optimization protocol, not a token
    transactions: 5000
  }
}

/**
 * SRC-101 Protocol with multilingual support
 */
export const SRC101_MULTILINGUAL: ProtocolMetadata = {
  id: 'src-101',
  name: {
    en: 'SRC-101 Naming System',
    es: 'Sistema de Nombres SRC-101',
    fr: 'Système de Nommage SRC-101',
    zh: 'SRC-101命名系统'
  },
  description: {
    en: 'Human-readable naming standard for Bitcoin Stamps addresses and resources. Created by Bitname team with Reinamora contribution',
    es: 'Estándar de nomenclatura legible por humanos para direcciones y recursos de Bitcoin Stamps. Creado por el equipo Bitname con contribución de Reinamora',
    fr: 'Standard de nommage lisible par l\'homme pour les adresses et ressources Bitcoin Stamps. Créé par l\'équipe Bitname avec contribution de Reinamora',
    zh: '比特币印记地址和资源的人类可读命名标准。由 Bitname 团队创建，Reinamora 贡献'
  },
  status: 'active',
  version: '1.0.0',
  culturalSignificance: 'medium',
  features: [
    {
      en: 'Human-readable names',
      es: 'Nombres legibles para humanos',
      fr: 'Noms lisibles par l\'homme',
      zh: '人类可读的名称'
    },
    {
      en: 'Community accessibility',
      es: 'Accesibilidad comunitaria',
      fr: 'Accessibilité communautaire',
      zh: '社区可访问性'
    },
    {
      en: 'Decentralized resolution',
      es: 'Resolución descentralizada',
      fr: 'Résolution décentralisée',
      zh: '去中心化解析'
    },
    {
      en: 'Bitcoin address mapping',
      es: 'Mapeo de direcciones Bitcoin',
      fr: 'Mappage d\'adresses Bitcoin',
      zh: '比特币地址映射'
    },
    {
      en: 'Cultural identity support',
      es: 'Soporte de identidad cultural',
      fr: 'Support d\'identité culturelle',
      zh: '文化身份支持'
    }
  ],
  specifications: {
    dataFormat: 'Plain Text',
    encoding: 'ASCII',
    storage: 'Bitcoin UTXO',
    gasOptimized: false
  },
  relationships: [
    {
      id: 'src-20',
      type: 'complements',
      description: {
        en: 'Provides naming services for SRC-20 tokens and addresses',
        es: 'Proporciona servicios de nombres para tokens SRC-20 y direcciones',
        fr: 'Fournit des services de nommage pour les jetons SRC-20 et les adresses',
        zh: '为SRC-20代币和地址提供命名服务'
      }
    }
  ],
  resources: {
    documentation: '/protocols/src-101',
    examples: ['/tutorials/creating-first-stamp'],
    sdk: ['@btc-stamps/tx-builder']
  },
  community: {
    holders: 150,
    transactions: 800
  }
}

/**
 * Counterparty Protocol entity with multilingual support
 */
export const COUNTERPARTY_MULTILINGUAL: ConceptEntity = {
  id: 'counterparty',
  name: {
    en: 'Counterparty Protocol',
    es: 'Protocolo Counterparty',
    fr: 'Protocole Counterparty',
    zh: 'Counterparty 协议'
  },
  type: 'protocol-foundation',
  description: {
    en: 'Bitcoin metaprotocol enabling advanced financial functionality and digital asset creation',
    es: 'Metaprotocolo de Bitcoin que permite funcionalidades financieras avanzadas y la creación de activos digitales',
    fr: 'Métaprotocole Bitcoin permettant des fonctionnalités financières avancées et la création d\'actifs numériques',
    zh: '支持高级金融功能和数字资产创建的比特币元协议'
  },
  culturalSignificance: 'high',
  features: [
    {
      en: 'Bitcoin-native',
      es: 'Nativo de Bitcoin',
      fr: 'Natif Bitcoin',
      zh: 'Bitcoin原生'
    },
    {
      en: 'Decentralized exchange',
      es: 'Intercambio descentralizado',
      fr: 'Échange décentralisé',
      zh: '去中心化交易所'
    },
    {
      en: 'Asset issuance',
      es: 'Emisión de activos',
      fr: 'Émission d\'actifs',
      zh: '资产发行'
    },
    {
      en: 'Smart contracts',
      es: 'Contratos inteligentes',
      fr: 'Contrats intelligents',
      zh: '智能合约'
    }
  ],
  relationships: [
    { id: 'bitcoin-stamps', type: 'enables' },
    { id: 'src-20', type: 'enables' },
    { id: 'src-721', type: 'enables' }
  ],
  url: 'https://counterparty.io',
  creationDate: '2014-01-02',
  culturalMetadata: {
    impact: {
      en: 'Pioneered Bitcoin-based digital assets and established the foundation for modern Bitcoin metaprotocols',
      es: 'Fue pionero en activos digitales basados en Bitcoin y estableció la base para los metaprotocolos modernos de Bitcoin',
      fr: 'A été pionnier des actifs numériques basés sur Bitcoin et établi les fondations des métaprotocoles Bitcoin modernes',
      zh: '开创了基于比特币的数字资产，为现代比特币元协议奠定了基础'
    },
    significance: {
      en: 'Foundation technology enabling all Bitcoin Stamps protocols',
      es: 'Tecnología fundacional que habilita todos los protocolos de Bitcoin Stamps',
      fr: 'Technologie fondamentale permettant tous les protocoles Bitcoin Stamps',
      zh: '支持所有比特币邮票协议的基础技术'
    }
  }
}

/**
 * Stampchain.io foundational infrastructure entity with multilingual support
 */
export const STAMPCHAIN_MULTILINGUAL: ConceptEntity = {
  id: 'stampchain',
  name: {
    en: 'Stampchain.io',
    es: 'Stampchain.io',
    fr: 'Stampchain.io',
    zh: 'Stampchain.io'
  },
  type: 'foundational-infrastructure',
  description: {
    en: 'Foundational infrastructure created by the 3 founders of Bitcoin Stamps. First site to present Bitcoin Stamps to the world, first minting service, open source reference implementation, and free API provider.',
    es: 'Infraestructura fundamental creada por los 3 fundadores de Bitcoin Stamps. Primer sitio en presentar Bitcoin Stamps al mundo, primer servicio de acuñación, implementación de referencia de código abierto y proveedor gratuito de API.',
    fr: 'Infrastructure fondamentale créée par les 3 fondateurs de Bitcoin Stamps. Premier site à présenter Bitcoin Stamps au monde, premier service de frappe, implémentation de référence open source et fournisseur d\'API gratuit.',
    zh: '由比特币邮票3位创始人创建的基础设施。首个向世界展示比特币邮票的网站，首个铸造服务，开源参考实现和免费API提供商。'
  },
  culturalSignificance: 'high',
  creator: 'Bitcoin Stamps Founders',
  creationDate: '2023-03-01',
  features: [
    {
      en: 'First Bitcoin Stamps presentation site',
      es: 'Primer sitio de presentación de Bitcoin Stamps',
      fr: 'Premier site de présentation Bitcoin Stamps',
      zh: '首个比特币邮票展示网站'
    },
    {
      en: 'First SRC-20 minting service',
      es: 'Primer servicio de acuñación SRC-20',
      fr: 'Premier service de frappe SRC-20',
      zh: '首个SRC-20铸造服务'
    },
    {
      en: 'Open source reference implementation',
      es: 'Implementación de referencia de código abierto',
      fr: 'Implémentation de référence open source',
      zh: '开源参考实现'
    },
    {
      en: 'Free public API access',
      es: 'Acceso gratuito a API pública',
      fr: 'Accès API public gratuit',
      zh: '免费公共API访问'
    },
    {
      en: 'Real-time indexing & data feeds',
      es: 'Indexación en tiempo real y feeds de datos',
      fr: 'Indexation temps réel et flux de données',
      zh: '实时索引和数据源'
    },
    {
      en: 'Founded by ecosystem creators',
      es: 'Fundado por los creadores del ecosistema',
      fr: 'Fondé par les créateurs de l\'écosystème',
      zh: '由生态系统创造者创立'
    }
  ],
  relationships: [
    { id: 'bitcoin-stamps', type: 'pioneered' },
    { id: 'src-20', type: 'pioneered' },
    { id: 'src-721', type: 'enables' },
    { id: 'src-101', type: 'enables' },
    { id: 'counterparty', type: 'builds-on' }
  ],
  url: 'https://stampchain.io',
  culturalMetadata: {
    impact: {
      en: 'Created the foundational infrastructure that enabled the Bitcoin Stamps ecosystem to flourish',
      es: 'Creó la infraestructura fundamental que permitió florecer al ecosistema Bitcoin Stamps',
      fr: 'A créé l\'infrastructure fondamentale qui a permis à l\'écosystème Bitcoin Stamps de prospérer',
      zh: '创建了使比特币邮票生态系统蓬勃发展的基础设施'
    },
    significance: {
      en: 'Foundational platform created by Bitcoin Stamps founders, establishing first minting services and reference implementations',
      es: 'Plataforma fundamental creada por los fundadores de Bitcoin Stamps, estableciendo los primeros servicios de acuñación e implementaciones de referencia',
      fr: 'Plateforme fondamentale créée par les fondateurs de Bitcoin Stamps, établissant les premiers services de frappe et implémentations de référence',
      zh: '由比特币邮票创始人创建的基础平台，建立了首个铸造服务和参考实现'
    }
  }
}

/**
 * Critical consensus block milestone entities
 */

export const BLOCK_792370_MULTILINGUAL: ConceptEntity = {
  id: 'block-792370',
  name: {
    en: 'SRC-721 Genesis Block',
    es: 'Bloque Génesis SRC-721',
    fr: 'Bloc Genèse SRC-721', 
    zh: 'SRC-721创世区块'
  },
  type: 'consensus-milestone',
  description: {
    en: 'Block 792,370: First SRC-721 NFT creation, establishing non-fungible token capabilities on Bitcoin Stamps',
    es: 'Bloque 792,370: Primera creación de NFT SRC-721, estableciendo capacidades de tokens no fungibles en Bitcoin Stamps',
    fr: 'Bloc 792,370: Première création de NFT SRC-721, établissant les capacités de jetons non-fongibles sur Bitcoin Stamps',
    zh: '区块792,370：首个SRC-721 NFT创建，在比特币邮票上建立非同质化代币功能'
  },
  culturalSignificance: 'high',
  relationships: [
    { id: 'src-721', type: 'genesis-of' }
  ] as MultiLangRelationship[],
  url: '/protocols/src-721'
}

export const BLOCK_793068_MULTILINGUAL: ConceptEntity = {
  id: 'block-793068', 
  name: {
    en: 'Bitcoin-native SRC-20 Genesis',
    es: 'Génesis SRC-20 Bitcoin-nativo',
    fr: 'Genèse SRC-20 natif Bitcoin',
    zh: '比特币原生SRC-20创世'
  },
  type: 'consensus-milestone',
  description: {
    en: 'Block 793,068: First SRC-20 token with direct Bitcoin encoding, eliminating Counterparty dependency',
    es: 'Bloque 793,068: Primer token SRC-20 con codificación directa de Bitcoin, eliminando dependencia de Counterparty',
    fr: 'Bloc 793,068: Premier jeton SRC-20 avec encodage Bitcoin direct, éliminant la dépendance Counterparty',
    zh: '区块793,068：首个直接比特币编码的SRC-20代币，消除了Counterparty依赖'
  },
  culturalSignificance: 'high',
  relationships: [
    { id: 'src-20', type: 'evolution-of' }
  ] as MultiLangRelationship[],
  url: '/protocols/src-20'
}

export const BLOCK_815130_MULTILINGUAL: ConceptEntity = {
  id: 'block-815130',
  name: {
    en: 'BMN Audio Support Block',
    es: 'Bloque de Soporte de Audio BMN',
    fr: 'Bloc de Support Audio BMN',
    zh: 'BMN音频支持区块'
  },
  type: 'consensus-milestone',
  description: {
    en: 'Block 815,130: BMN audio file support enabled, expanding multimedia capabilities for Bitcoin Stamps',
    es: 'Bloque 815,130: Soporte de archivos de audio BMN habilitado, expandiendo capacidades multimedia para Bitcoin Stamps',
    fr: 'Bloc 815,130: Support des fichiers audio BMN activé, élargissant les capacités multimédias pour Bitcoin Stamps',
    zh: '区块815,130：启用BMN音频文件支持，为比特币邮票扩展多媒体功能'
  },
  culturalSignificance: 'medium',
  relationships: [] as MultiLangRelationship[],
  url: '/protocols/bitcoin-stamps'
}

export const BLOCK_833000_MULTILINGUAL: ConceptEntity = {
  id: 'block-833000',
  name: {
    en: 'P2WSH Transactions Enabled',
    es: 'Transacciones P2WSH Habilitadas', 
    fr: 'Transactions P2WSH Activées',
    zh: 'P2WSH交易启用'
  },
  type: 'consensus-milestone',
  description: {
    en: 'Block 833,000: P2WSH witness script transactions enabled, preparing infrastructure for OLGA optimization',
    es: 'Bloque 833,000: Transacciones de script testigo P2WSH habilitadas, preparando infraestructura para optimización OLGA',
    fr: 'Bloc 833,000: Transactions de script témoin P2WSH activées, préparant l\'infrastructure pour l\'optimisation OLGA',
    zh: '区块833,000：启用P2WSH见证脚本交易，为OLGA优化准备基础设施'
  },
  culturalSignificance: 'medium',
  relationships: [
    { id: 'olga', type: 'enables' }
  ] as MultiLangRelationship[],
  url: '/protocols/olga'
}

export const BLOCK_872200_MULTILINGUAL: ConceptEntity = {
  id: 'block-872200',
  name: {
    en: 'SRC-101 Image Optional Block',
    es: 'Bloque de Imagen Opcional SRC-101',
    fr: 'Bloc Image Optionnelle SRC-101',
    zh: 'SRC-101图像可选区块'
  },
  type: 'consensus-milestone', 
  description: {
    en: 'Block 872,200: SRC-101 image metadata becomes optional, improving protocol flexibility',
    es: 'Bloque 872,200: Los metadatos de imagen SRC-101 se vuelven opcionales, mejorando la flexibilidad del protocolo',
    fr: 'Bloc 872,200: Les métadonnées d\'image SRC-101 deviennent optionnelles, améliorant la flexibilité du protocole',
    zh: '区块872,200：SRC-101图像元数据变为可选，提高协议灵活性'
  },
  culturalSignificance: 'low',
  relationships: [
    { id: 'src-101', type: 'refines' }
  ] as MultiLangRelationship[],
  url: '/protocols/src-101'
}

/**
 * Get all multilingual entities
 */
export function getAllMultilingualEntities() {
  return {
    concepts: [
      KEVIN_MULTILINGUAL, 
      BITCOIN_STAMPS_MULTILINGUAL, 
      COUNTERPARTY_MULTILINGUAL, 
      STAMPCHAIN_MULTILINGUAL,
      BLOCK_792370_MULTILINGUAL,
      BLOCK_793068_MULTILINGUAL,
      BLOCK_815130_MULTILINGUAL,
      BLOCK_833000_MULTILINGUAL,
      BLOCK_872200_MULTILINGUAL
    ],
    tools: [TX_BUILDER_MULTILINGUAL],
    protocols: [] // Protocol entities are generated from protocol metadata
  }
}

/**
 * Get all multilingual protocol metadata
 */
export function getAllMultilingualProtocols(): ProtocolMetadata[] {
  return [
    SRC20_MULTILINGUAL,
    SRC721_MULTILINGUAL,
    OLGA_MULTILINGUAL,
    SRC101_MULTILINGUAL
  ]
}