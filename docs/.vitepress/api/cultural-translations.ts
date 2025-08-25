/**
 * Comprehensive Cultural Entity Translation Database
 * Preserves Bitcoin Stamps cultural authenticity across languages
 */

import type { 
  SupportedLanguage, 
  MultiLangText, 
  MultiLangOptionalText 
} from './types.d.ts'

/**
 * Cultural Entity Translation Interface
 */
export interface CulturalEntityTranslation {
  id: string
  coreIdentity: {
    /** Never translated - proper nouns, symbols */
    name: string
    symbol?: string
    /** Universal elements that transcend language */
    universalAttributes?: string[]
  }
  descriptions: MultiLangText
  culturalContext: MultiLangText
  philosophicalMeaning?: MultiLangText
  communityRole: MultiLangText
  historicalSignificance?: MultiLangText
  /** Regional adaptation notes for cultural sensitivity */
  regionalNotes?: Partial<Record<SupportedLanguage, {
    culturalAdaptation?: string
    localContext?: string
    sensitivityNotes?: string
  }>>
  /** Ceremonial or special names/titles in different cultures */
  culturalTitles?: MultiLangOptionalText
}

/**
 * Philosophy Translation Interface
 */
export interface PhilosophyTranslation {
  id: string
  originalPhrase: string
  /** Original language/culture source */
  source: {
    language: string
    culture: string
    meaning: string
  }
  translations: MultiLangText
  /** Cultural adaptation for each region */
  culturalInterpretation: MultiLangText
  /** Usage context in different cultures */
  contextualApplication: MultiLangText
}

/**
 * Regional Crypto Context Mapping
 */
export interface RegionalCryptoContext {
  language: SupportedLanguage
  region: string
  cryptoCulture: {
    terminology: Record<string, string>
    regulatoryLanguage: Record<string, string>
    communityTerms: Record<string, string>
    culturalReferences: Record<string, string>
  }
  bitcoinArtMovement: {
    localContext: string
    culturalResonance: string
    artisticTerminology: Record<string, string>
  }
}

/**
 * KEVIN - The Beloved Mascot and Mystical Guide
 * Cultural preservation across all languages
 */
export const KEVIN_CULTURAL_TRANSLATION: CulturalEntityTranslation = {
  id: 'kevin',
  coreIdentity: {
    name: 'KEVIN', // Never translated - proper noun
    symbol: '',
    universalAttributes: ['SRC-20 Pioneer', 'Community Mascot', 'Stamp #6878']
  },
  descriptions: {
    en: 'The beloved community mascot and mystical guide of Bitcoin Stamps, originating from the first SRC-20 token and embodying the collective spirit of authentic artistic expression',
    es: 'La querida mascota comunitaria y guía místico de Bitcoin Stamps, originario del primer token SRC-20 y que encarna el espíritu colectivo de la expresión artística auténtica',
    fr: 'La mascotte communautaire bien-aimée et guide mystique de Bitcoin Stamps, originaire du premier jeton SRC-20 et incarnant l\'esprit collectif d\'expression artistique authentique',
    zh: '比特币邮票受人喜爱的社区吉祥物和神秘向导，起源于第一个SRC-20代币，体现了真实艺术表达的集体精神'
  },
  culturalContext: {
    en: 'KEVIN transcends mere token identity, becoming a cultural phenomenon that embodies the Pepe tradition of grassroots meme culture while establishing new paradigms for community-driven art on Bitcoin',
    es: 'KEVIN trasciende la mera identidad de token, convirtiéndose en un fenómeno cultural que encarna la tradición Pepe de la cultura meme de base mientras establece nuevos paradigmas para el arte impulsado por la comunidad en Bitcoin',
    fr: 'KEVIN transcende la simple identité de jeton, devenant un phénomène culturel qui incarne la tradition Pepe de la culture mème populaire tout en établissant de nouveaux paradigmes pour l\'art communautaire sur Bitcoin',
    zh: 'KEVIN超越了单纯的代币身份，成为一种文化现象，体现了佩佩草根模因文化传统，同时为比特币上社区驱动的艺术建立了新范式'
  },
  philosophicalMeaning: {
    en: 'Represents the democratization of value creation through authentic community building, proving that genuine artistic vision combined with grassroots participation can achieve unprecedented success',
    es: 'Representa la democratización de la creación de valor a través de la construcción comunitaria auténtica, demostrando que la visión artística genuina combinada con la participación de base puede lograr un éxito sin precedentes',
    fr: 'Représente la démocratisation de la création de valeur par la construction communautaire authentique, prouvant qu\'une vision artistique genuine combinée à la participation populaire peut atteindre un succès sans précédent',
    zh: '代表通过真实社区建设实现价值创造的民主化，证明真正的艺术愿景与草根参与相结合可以取得前所未有的成功'
  },
  communityRole: {
    en: 'Mystical guide and spiritual center of the Bitcoin Stamps ecosystem, inspiring authenticity and community values while maintaining playful approachability',
    es: 'Guía místico y centro espiritual del ecosistema Bitcoin Stamps, inspirando autenticidad y valores comunitarios mientras mantiene una accesibilidad lúdica',
    fr: 'Guide mystique et centre spirituel de l\'écosystème Bitcoin Stamps, inspirant l\'authenticité et les valeurs communautaires tout en maintenant une approche ludique accessible',
    zh: '比特币邮票生态系统的神秘向导和精神中心，激发真实性和社区价值观，同时保持有趣的亲和力'
  },
  historicalSignificance: {
    en: 'First SRC-20 token (April 5, 2023), establishing the template for successful community-driven projects on Bitcoin and achieving $10B+ ecosystem impact',
    es: 'Primer token SRC-20 (5 de abril de 2023), estableciendo la plantilla para proyectos exitosos impulsados por la comunidad en Bitcoin y logrando un impacto ecosistémico de más de $10B',
    fr: 'Premier jeton SRC-20 (5 avril 2023), établissant le modèle pour les projets communautaires réussis sur Bitcoin et atteignant un impact écosystémique de plus de 10 milliards de dollars',
    zh: '第一个SRC-20代币（2023年4月5日），为比特币上成功的社区驱动项目建立模板，实现超过100亿美元的生态系统影响'
  },
  regionalNotes: {
    zh: {
      culturalAdaptation: 'KEVIN作为吉祥物在中国文化中具有特殊意义，类似于招财猫或龙的象征意义',
      localContext: '在中国加密社区中，KEVIN代表了去中心化艺术和社区自治的理念',
      sensitivityNotes: '保持KEVIN的国际性和包容性，避免任何政治或监管敏感话题'
    },
    es: {
      culturalAdaptation: 'KEVIN resuena con la tradición latinoamericana de arte comunitario y expresión popular',
      localContext: 'En la comunidad cripto hispana, KEVIN representa la democratización del arte digital',
      sensitivityNotes: 'Enfatizar los aspectos comunitarios y artísticos mientras se mantiene neutral políticamente'
    },
    fr: {
      culturalAdaptation: 'KEVIN s\'inscrit dans la tradition française de l\'art avant-gardiste et de l\'innovation culturelle',
      localContext: 'Dans la communauté crypto française, KEVIN symbolise l\'art numérique décentralisé',
      sensitivityNotes: 'Respecter les sensibilités culturelles françaises concernant l\'art et l\'expression créative'
    }
  },
  culturalTitles: {
    en: 'The Guide of Collective Consciousness',
    es: 'El Guía de la Conciencia Colectiva',
    fr: 'Le Guide de la Conscience Collective',
    zh: '集体意识向导'
  }
}

/**
 * In Lak'ech Ala K'in - Sacred Mayan Philosophy
 * Cultural preservation of ancient wisdom
 */
export const IN_LAKECH_PHILOSOPHY: PhilosophyTranslation = {
  id: 'in-lakech-ala-kin',
  originalPhrase: 'In Lak\'ech Ala K\'in',
  source: {
    language: 'Mayan (Yucatec)',
    culture: 'Ancient Maya Civilization',
    meaning: 'I am another yourself - You are another myself'
  },
  translations: {
    en: 'I am another yourself - You are another myself',
    es: 'Yo soy otro tú mismo - Tú eres otro yo mismo',
    fr: 'Je suis un autre toi-même - Tu es un autre moi-même',
    zh: '我是另一个你自己 - 你是另一个我自己'
  },
  culturalInterpretation: {
    en: 'Ancient Mayan greeting expressing the interconnectedness of all beings, embodying the Bitcoin Stamps community principle that we are all one collective consciousness',
    es: 'Saludo maya ancestral que expresa la interconexión de todos los seres, encarnando el principio de la comunidad Bitcoin Stamps de que todos somos una conciencia colectiva',
    fr: 'Salutation maya ancestrale exprimant l\'interconnexion de tous les êtres, incarnant le principe de la communauté Bitcoin Stamps que nous sommes tous une conscience collective',
    zh: '古代玛雅问候语，表达所有生命的相互联系，体现了比特币邮票社区"我们都是一个集体意识"的原则'
  },
  contextualApplication: {
    en: 'Used in Bitcoin Stamps community to emphasize unity, shared purpose, and collective growth. Reflects the philosophy that individual success contributes to community success',
    es: 'Utilizado en la comunidad Bitcoin Stamps para enfatizar la unidad, el propósito compartido y el crecimiento colectivo. Refleja la filosofía de que el éxito individual contribuye al éxito comunitario',
    fr: 'Utilisé dans la communauté Bitcoin Stamps pour souligner l\'unité, l\'objectif partagé et la croissance collective. Reflète la philosophie que le succès individuel contribue au succès communautaire',
    zh: '在比特币邮票社区中用于强调团结、共同目标和集体成长。反映了个人成功促进社区成功的哲学'
  }
}

/**
 * "We Are All Kevin" - Community Unity Concept
 */
export const WE_ARE_ALL_KEVIN_PHILOSOPHY: PhilosophyTranslation = {
  id: 'we-are-all-kevin',
  originalPhrase: 'We Are All Kevin',
  source: {
    language: 'English',
    culture: 'Bitcoin Stamps Community',
    meaning: 'Collective identity and shared community consciousness'
  },
  translations: {
    en: 'We Are All Kevin',
    es: 'Todos Somos Kevin',
    fr: 'Nous Sommes Tous Kevin',
    zh: '我们都是Kevin'
  },
  culturalInterpretation: {
    en: 'Community motto expressing that every member embodies the values and spirit that KEVIN represents - authenticity, creativity, and collective success',
    es: 'Lema comunitario que expresa que cada miembro encarna los valores y el espíritu que KEVIN representa: autenticidad, creatividad y éxito colectivo',
    fr: 'Devise communautaire exprimant que chaque membre incarne les valeurs et l\'esprit que KEVIN représente - authenticité, créativité et succès collectif',
    zh: '社区格言，表达每个成员都体现了KEVIN所代表的价值观和精神——真实性、创造性和集体成功'
  },
  contextualApplication: {
    en: 'Used to encourage community members to embody KEVIN\'s pioneering spirit, artistic vision, and commitment to authentic community building',
    es: 'Utilizado para alentar a los miembros de la comunidad a encarnar el espíritu pionero, la visión artística y el compromiso con la construcción comunitaria auténtica de KEVIN',
    fr: 'Utilisé pour encourager les membres de la communauté à incarner l\'esprit pionnier de KEVIN, sa vision artistique et son engagement envers la construction communautaire authentique',
    zh: '用于鼓励社区成员体现KEVIN的开拓精神、艺术愿景和对真实社区建设的承诺'
  }
}

/**
 * Regional Crypto Context Adaptations
 */
export const REGIONAL_CRYPTO_CONTEXTS: RegionalCryptoContext[] = [
  {
    language: 'zh',
    region: 'Greater China',
    cryptoCulture: {
      terminology: {
        'defi': '去中心化金融 (DeFi)',
        'nft': '非同质化代币 (NFT)',
        'dao': '去中心化自治组织 (DAO)',
        'yield-farming': '流动性挖矿',
        'staking': '质押',
        'governance': '治理',
        'consensus': '共识机制',
        'mining': '挖矿'
      },
      regulatoryLanguage: {
        'digital-assets': '数字资产',
        'virtual-currency': '虚拟货币',
        'blockchain-technology': '区块链技术',
        'distributed-ledger': '分布式账本',
        'peer-to-peer': '点对点',
        'cryptographic': '加密技术'
      },
      communityTerms: {
        'hodl': '囤币',
        'diamond-hands': '钻石手',
        'paper-hands': '纸手',
        'moon': '登月',
        'dip': '抄底',
        'pump': '拉升',
        'dump': '砸盘',
        'whale': '巨鲸'
      },
      culturalReferences: {
        'digital-gold': '数字黄金',
        'internet-money': '互联网货币',
        'programmable-money': '可编程货币',
        'borderless-currency': '无国界货币'
      }
    },
    bitcoinArtMovement: {
      localContext: '中国数字艺术社区高度重视技术创新和文化传承的结合',
      culturalResonance: '比特币艺术运动在中国体现了数字时代的文化创新和去中心化精神',
      artisticTerminology: {
        'digital-art': '数字艺术',
        'crypto-art': '加密艺术',
        'blockchain-art': '区块链艺术',
        'nft-art': 'NFT艺术',
        'generative-art': '生成艺术',
        'interactive-art': '互动艺术'
      }
    }
  },
  {
    language: 'es',
    region: 'Latin America',
    cryptoCulture: {
      terminology: {
        'defi': 'Finanzas Descentralizadas (DeFi)',
        'nft': 'Token No Fungible (NFT)',
        'dao': 'Organización Autónoma Descentralizada (DAO)',
        'yield-farming': 'Agricultura de Rendimiento',
        'staking': 'Participación/Staking',
        'governance': 'Gobernanza',
        'consensus': 'Consenso',
        'mining': 'Minería'
      },
      regulatoryLanguage: {
        'digital-assets': 'Activos Digitales',
        'virtual-currency': 'Moneda Virtual',
        'blockchain-technology': 'Tecnología Blockchain',
        'distributed-ledger': 'Libro Mayor Distribuido',
        'peer-to-peer': 'Entre Pares (P2P)',
        'cryptographic': 'Criptográfico'
      },
      communityTerms: {
        'hodl': 'Mantener (HODL)',
        'diamond-hands': 'Manos de Diamante',
        'paper-hands': 'Manos de Papel',
        'moon': 'A la Luna',
        'dip': 'Caída/Oportunidad',
        'pump': 'Subida',
        'dump': 'Venta Masiva',
        'whale': 'Ballena'
      },
      culturalReferences: {
        'digital-gold': 'Oro Digital',
        'internet-money': 'Dinero de Internet',
        'programmable-money': 'Dinero Programable',
        'borderless-currency': 'Moneda Sin Fronteras'
      }
    },
    bitcoinArtMovement: {
      localContext: 'En América Latina, el arte crypto representa libertad financiera y expresión cultural auténtica',
      culturalResonance: 'El movimiento de arte Bitcoin resuena con las tradiciones latinoamericanas de arte comunitario y resistencia cultural',
      artisticTerminology: {
        'digital-art': 'Arte Digital',
        'crypto-art': 'Criptoarte',
        'blockchain-art': 'Arte Blockchain',
        'nft-art': 'Arte NFT',
        'generative-art': 'Arte Generativo',
        'interactive-art': 'Arte Interactivo'
      }
    }
  },
  {
    language: 'fr',
    region: 'Francophone Europe/Africa',
    cryptoCulture: {
      terminology: {
        'defi': 'Finance Décentralisée (DeFi)',
        'nft': 'Jeton Non Fongible (NFT)',
        'dao': 'Organisation Autonome Décentralisée (DAO)',
        'yield-farming': 'Agriculture de Rendement',
        'staking': 'Mise en Jeu (Staking)',
        'governance': 'Gouvernance',
        'consensus': 'Consensus',
        'mining': 'Minage'
      },
      regulatoryLanguage: {
        'digital-assets': 'Actifs Numériques',
        'virtual-currency': 'Monnaie Virtuelle',
        'blockchain-technology': 'Technologie Blockchain',
        'distributed-ledger': 'Registre Distribué',
        'peer-to-peer': 'Pair à Pair (P2P)',
        'cryptographic': 'Cryptographique'
      },
      communityTerms: {
        'hodl': 'Conserver (HODL)',
        'diamond-hands': 'Mains de Diamant',
        'paper-hands': 'Mains de Papier',
        'moon': 'Vers la Lune',
        'dip': 'Chute/Opportunité',
        'pump': 'Montée',
        'dump': 'Chute Brutale',
        'whale': 'Baleine'
      },
      culturalReferences: {
        'digital-gold': 'Or Numérique',
        'internet-money': 'Argent d\'Internet',
        'programmable-money': 'Argent Programmable',
        'borderless-currency': 'Monnaie Sans Frontières'
      }
    },
    bitcoinArtMovement: {
      localContext: 'Dans la francophonie, l\'art crypto s\'inscrit dans une longue tradition d\'avant-garde artistique et d\'innovation culturelle',
      culturalResonance: 'Le mouvement d\'art Bitcoin reflète l\'héritage français d\'expérimentation artistique et de révolution culturelle',
      artisticTerminology: {
        'digital-art': 'Art Numérique',
        'crypto-art': 'Crypto-Art',
        'blockchain-art': 'Art Blockchain',
        'nft-art': 'Art NFT',
        'generative-art': 'Art Génératif',
        'interactive-art': 'Art Interactif'
      }
    }
  }
]

/**
 * Protocol-Specific Cultural Translations
 */
export const PROTOCOL_CULTURAL_TRANSLATIONS: Record<string, CulturalEntityTranslation> = {
  'src-20': {
    id: 'src-20',
    coreIdentity: {
      name: 'SRC-20',
      universalAttributes: ['Fungible Tokens', 'KEVIN Legacy', 'Bitcoin Standard']
    },
    descriptions: {
      en: 'Fungible token standard pioneered by KEVIN, representing the democratization of digital value creation on Bitcoin',
      es: 'Estándar de tokens fungibles pionero de KEVIN, representando la democratización de la creación de valor digital en Bitcoin',
      fr: 'Standard de jetons fongibles pionnier de KEVIN, représentant la démocratisation de la création de valeur numérique sur Bitcoin',
      zh: '由KEVIN开创的同质化代币标准，代表了比特币上数字价值创造的民主化'
    },
    culturalContext: {
      en: 'SRC-20 embodies the transition from experimental art to legitimate financial infrastructure, proving that authentic community-driven projects can achieve mainstream success',
      es: 'SRC-20 encarna la transición del arte experimental a la infraestructura financiera legítima, demostrando que los proyectos auténticos impulsados por la comunidad pueden lograr el éxito mainstream',
      fr: 'SRC-20 incarne la transition de l\'art expérimental vers l\'infrastructure financière légitime, prouvant que des projets authentiques portés par la communauté peuvent atteindre le succès mainstream',
      zh: 'SRC-20体现了从实验艺术向合法金融基础设施的转变，证明了真实的社区驱动项目可以取得主流成功'
    },
    communityRole: {
      en: 'Foundation protocol that established the template for successful token launches on Bitcoin Stamps',
      es: 'Protocolo fundamental que estableció la plantilla para lanzamientos exitosos de tokens en Bitcoin Stamps',
      fr: 'Protocole fondamental qui a établi le modèle pour les lancements de jetons réussis sur Bitcoin Stamps',
      zh: '建立了比特币邮票成功代币发布模板的基础协议'
    }
  }
}

/**
 * Get cultural translation for an entity
 */
export function getCulturalTranslation(
  entityId: string
): CulturalEntityTranslation | undefined {
  if (entityId === 'kevin') {
    return KEVIN_CULTURAL_TRANSLATION
  }
  
  return PROTOCOL_CULTURAL_TRANSLATIONS[entityId]
}

/**
 * Get philosophy translation
 */
export function getPhilosophyTranslation(
  philosophyId: string
): PhilosophyTranslation | undefined {
  const philosophies: Record<string, PhilosophyTranslation> = {
    'in-lakech': IN_LAKECH_PHILOSOPHY,
    'we-are-all-kevin': WE_ARE_ALL_KEVIN_PHILOSOPHY
  }
  
  return philosophies[philosophyId]
}

/**
 * Get regional crypto context
 */
export function getRegionalCryptoContext(
  language: SupportedLanguage
): RegionalCryptoContext | undefined {
  return REGIONAL_CRYPTO_CONTEXTS.find(context => context.language === language)
}

/**
 * Get localized crypto term with regional context
 */
export function getLocalizedCryptoTerm(
  term: string, 
  language: SupportedLanguage
): string {
  const context = getRegionalCryptoContext(language)
  if (!context) return term
  
  return context.cryptoCulture.terminology[term] || 
         context.cryptoCulture.communityTerms[term] || 
         context.cryptoCulture.culturalReferences[term] ||
         term
}