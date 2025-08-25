/**
 * Technical Data Integration with LEO API System
 * Bridges centralized technical data with existing LEO components
 * Provides smart data integration with multilingual support
 */

import { computed, inject, ref } from 'vue'
import type { PageData } from 'vitepress'
import { 
  data as protocolMilestonesData,
  getMilestone,
  getMilestoneByBlock,
  getAllMilestones,
  getCulturalMilestones,
  getBlockMetadata
} from '../data/protocol-milestones.data'
import {
  data as communityMetricsData,
  getKevinMetrics,
  getStampMetrics,
  getSRC20Metrics,
  formatNumber
} from '../data/community-metrics.data'
import {
  data as technicalSpecsData,
  getProtocolSpec,
  getSRC20Spec,
  getSRC721Spec,
  getCurrentAPIVersion
} from '../data/technical-specs.data'
import {
  data as networkConstantsData,
  getBitcoinConstants,
  getStampsConstants
} from '../data/network-constants.data'
import {
  data as externalLinksData,
  getStampchainAPI,
  getBitcoinStampsCore
} from '../data/external-links.data'

// Enhanced entity definitions with technical data integration
export interface EnhancedCulturalEntity {
  id: string
  type: string
  names: Record<string, string>
  descriptions: Record<string, string>
  culturalSignificance: 'highest' | 'high' | 'medium' | 'low'
  
  // Technical data integration
  blockHeight?: number
  blockDate?: string
  tokenMetrics?: any
  protocolSpecs?: any
  networkPosition?: string
  technicalDetails?: Record<string, any>
}

export interface TechnicalDataContext {
  protocolMilestones: typeof protocolMilestonesData
  communityMetrics: typeof communityMetricsData
  technicalSpecs: typeof technicalSpecsData
  networkConstants: typeof networkConstantsData
  externalLinks: typeof externalLinksData
}

export function useTechnicalData() {
  const page = inject<{ value: PageData }>('page')
  const currentLocale = computed(() => {
    const relativePath = page?.value?.relativePath || ''
    if (relativePath.startsWith('fr/')) return 'fr'
    if (relativePath.startsWith('es/')) return 'es'
    if (relativePath.startsWith('zh/')) return 'zh'
    return 'en'
  })

  // Technical data context
  const technicalContext = ref<TechnicalDataContext>({
    protocolMilestones: protocolMilestonesData,
    communityMetrics: communityMetricsData,
    technicalSpecs: technicalSpecsData,
    networkConstants: networkConstantsData,
    externalLinks: externalLinksData
  })

  // Enhanced cultural entities with live technical data
  const enhancedCulturalEntities = computed(() => {
    const locale = currentLocale.value
    
    return {
      kevin: {
        id: 'kevin',
        type: 'Person',
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
        culturalSignificance: 'highest' as const,
        
        // Enhanced technical data
        blockHeight: getMilestone('kevin-creation')?.blockHeight || 788041,
        blockDate: getMilestone('kevin-creation')?.blockDate || '2023-04-20',
        tokenMetrics: getKevinMetrics(),
        protocolSpecs: getSRC20Spec(),
        networkPosition: 'first-src20-token',
        technicalDetails: {
          creator: 'arwyn',
          deployer: 'reinamora',
          totalSupply: getKevinMetrics()?.averageHolding || '100000000000000',
          holders: getKevinMetrics()?.totalHolders || 15420,
          activeHolders: getKevinMetrics()?.activeHolders || 8932,
          growthRate30d: getKevinMetrics()?.growthRate30Day || '+12.3%'
        }
      },
      
      arwyn: {
        id: 'arwyn',
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
        culturalSignificance: 'high' as const,
        
        // Enhanced technical data
        blockHeight: 788041,
        blockDate: '2023-04-20',
        technicalDetails: {
          role: 'kevin-creator',
          protocolContribution: 'src20-pioneer',
          culturalImpact: 'community-icon-creation'
        }
      },
      
      mikeinspace: {
        id: 'mikeinspace', 
        type: 'Person',
        names: {
          en: 'Mikeinspace',
          fr: 'Mikeinspace',
          es: 'Mikeinspace',
          zh: 'Mikeinspace'
        },
        descriptions: {
          en: 'Creator of the first official Bitcoin Stamp in block 779,652',
          fr: 'Créateur du premier Bitcoin Stamp officiel dans le bloc 779,652',
          es: 'Creador del primer Bitcoin Stamp oficial en el bloque 779,652',
          zh: '在区块 779,652 创建了第一个官方 Bitcoin Stamp 的创造者'
        },
        culturalSignificance: 'highest' as const,
        
        // Enhanced technical data
        blockHeight: getMilestone('genesis')?.blockHeight || 779652,
        blockDate: getMilestone('genesis')?.blockDate || '2023-03-29',
        technicalDetails: {
          role: 'genesis-creator',
          stampNumber: getMilestone('genesis')?.stampNumber || 0,
          protocolFounder: true,
          networkPosition: 'first-stamper'
        }
      }
    }
  })

  // Enhanced protocol entities with live technical specs
  const enhancedProtocolEntities = computed(() => {
    const locale = currentLocale.value
    
    return {
      'src-20': {
        id: 'src-20',
        type: 'SoftwareApplication',
        names: {
          en: 'SRC-20 Token Standard',
          fr: 'Standard de Jeton SRC-20', 
          es: 'Estándar de Token SRC-20',
          zh: 'SRC-20 代币标准'
        },
        descriptions: {
          en: 'Fungible token standard for Bitcoin Stamps enabling permanent token creation',
          fr: 'Standard de jeton fongible pour Bitcoin Stamps permettant la création permanente de jetons',
          es: 'Estándar de token fungible para Bitcoin Stamps que permite la creación permanente de tokens',
          zh: 'Bitcoin Stamps 的可替代代币标准，支持永久代币创建'
        },
        culturalSignificance: 'highest' as const,
        
        // Enhanced technical data from specs
        blockHeight: getMilestone('kevin-creation')?.blockHeight || 788041,
        blockDate: getMilestone('kevin-creation')?.blockDate || '2023-04-20',
        protocolSpecs: getSRC20Spec(),
        tokenMetrics: getSRC20Metrics(),
        technicalDetails: {
          version: getSRC20Spec()?.version || '1.1',
          status: getSRC20Spec()?.status || 'active',
          maxSupply: getSRC20Spec()?.maxSupply || '18,446,744,073,709,551,615',
          decimalsSupported: getSRC20Spec()?.decimalsSupported || 18,
          totalTokens: getSRC20Metrics()?.totalTokens || 1247,
          activeTokens: getSRC20Metrics()?.activeTokens || 892,
          totalHolders: getSRC20Metrics()?.totalHolders || 23456,
          marketCap: getSRC20Metrics()?.totalMarketCap || '2,847 BTC'
        }
      },
      
      'src-721': {
        id: 'src-721',
        type: 'SoftwareApplication',
        names: {
          en: 'SRC-721 Non-Fungible Token Standard',
          fr: 'Standard de Jeton Non-Fongible SRC-721',
          es: 'Estándar de Token No Fungible SRC-721',
          zh: 'SRC-721 非同质化代币标准'
        },
        descriptions: {
          en: 'Non-fungible token standard for unique Bitcoin Stamps',
          fr: 'Standard de jeton non-fongible pour les Bitcoin Stamps uniques',
          es: 'Estándar de token no fungible para Bitcoin Stamps únicos',
          zh: '独特 Bitcoin Stamps 的非同质化代币标准'
        },
        culturalSignificance: 'high' as const,
        
        // Enhanced technical data
        blockHeight: getMilestone('src721-launch')?.blockHeight || 796000,
        blockDate: getMilestone('src721-launch')?.blockDate || '2023-06-15',
        protocolSpecs: getSRC721Spec(),
        technicalDetails: {
          version: getSRC721Spec()?.version || '1.0',
          status: getSRC721Spec()?.status || 'active',
          maxTokenId: getSRC721Spec()?.maxTokenId || '18,446,744,073,709,551,615',
          metadataStandard: getSRC721Spec()?.metadataStandard || 'JSON-schema',
          imageSupport: getSRC721Spec()?.imageSupport || ['PNG', 'JPG', 'SVG', 'WebP']
        }
      }
    }
  })

  // Smart entity detection with technical data enhancement
  const detectEntitiesWithTechnicalData = computed(() => {
    const content = page?.value?.content || ''
    const frontmatter = page?.value?.frontmatter || {}
    const detected = []
    
    // Cultural entities detection
    for (const [key, entity] of Object.entries(enhancedCulturalEntities.value)) {
      const entityName = entity.names[currentLocale.value] || entity.names.en
      const patterns = [
        new RegExp(`\\b${entityName}\\b`, 'i'),
        new RegExp(`\\b${key}\\b`, 'i')
      ]
      
      if (patterns.some(pattern => pattern.test(content)) || 
          frontmatter.mentions?.includes(key)) {
        detected.push({
          ...entity,
          localizedName: entityName,
          localizedDescription: entity.descriptions[currentLocale.value] || entity.descriptions.en,
          detectionSource: patterns.some(p => p.test(content)) ? 'content' : 'frontmatter'
        })
      }
    }
    
    // Protocol entities detection  
    for (const [key, entity] of Object.entries(enhancedProtocolEntities.value)) {
      const entityName = entity.names[currentLocale.value] || entity.names.en
      const patterns = [
        new RegExp(`\\b${entityName}\\b`, 'i'),
        new RegExp(`\\b${key.replace('-', '[-\\s]?')}\\b`, 'i')
      ]
      
      if (patterns.some(pattern => pattern.test(content)) || 
          frontmatter.protocols?.includes(key)) {
        detected.push({
          ...entity,
          localizedName: entityName,
          localizedDescription: entity.descriptions[currentLocale.value] || entity.descriptions.en,
          detectionSource: patterns.some(p => p.test(content)) ? 'content' : 'frontmatter'
        })
      }
    }
    
    return detected
  })

  // Technical milestone enrichment
  const getMilestoneWithTechnicalContext = (milestoneKey: string) => {
    const milestone = getMilestone(milestoneKey)
    if (!milestone) return null
    
    return {
      ...milestone,
      blockMetadata: getBlockMetadata(milestone.blockHeight),
      relatedMetrics: milestone.significance === 'first-src20-token' ? getKevinMetrics() : null,
      protocolSpec: milestone.significance === 'first-src20-token' ? getSRC20Spec() : null,
      networkContext: getBitcoinConstants()
    }
  }

  // Block height analysis with technical context
  const getBlockAnalysis = (blockHeight: number) => {
    const milestone = getMilestoneByBlock(blockHeight)
    const blockMetadata = getBlockMetadata(blockHeight)
    const bitcoinConstants = getBitcoinConstants()
    
    return {
      milestone,
      metadata: blockMetadata,
      networkContext: {
        confirmations: bitcoinConstants ? Math.max(0, 865000 - blockHeight) : 'unknown',
        era: getBlockEra(blockHeight),
        significance: milestone?.culturalSignificance || 'low'
      },
      economicContext: blockMetadata ? {
        bitcoinPrice: blockMetadata.bitcoinPrice,
        transactionFees: blockMetadata.transactionFees,
        networkDifficulty: blockMetadata.networkDifficulty
      } : null
    }
  }

  const getBlockEra = (blockHeight: number): string => {
    if (blockHeight >= 865000) return 'efficiency_era'
    if (blockHeight >= 796000) return 'protocol_expansion'
    if (blockHeight >= 788041) return 'kevin_era'
    if (blockHeight >= 779652) return 'genesis_era'
    return 'pre_stamps'
  }

  // API integration status
  const getAPIIntegrationStatus = () => {
    const stampchainAPI = getStampchainAPI()
    const currentVersion = getCurrentAPIVersion()
    
    return {
      primaryAPI: stampchainAPI,
      currentVersion,
      baseURL: stampchainAPI?.base_url,
      status: stampchainAPI ? 'available' : 'unavailable',
      endpoints: stampchainAPI?.endpoints || {},
      rateLimit: stampchainAPI?.rate_limits || {}
    }
  }

  // Community metrics with technical context
  const getCommunitySnapshot = () => {
    const kevinMetrics = getKevinMetrics()
    const stampMetrics = getStampMetrics()
    const src20Metrics = getSRC20Metrics()
    
    return {
      kevin: {
        ...kevinMetrics,
        technicalSpec: getSRC20Spec(),
        blockHeight: 788041,
        culturalSignificance: 'highest'
      },
      ecosystem: {
        totalStamps: stampMetrics?.totalStamps || 0,
        totalSRC20Tokens: src20Metrics?.totalTokens || 0,
        totalValue: src20Metrics?.totalMarketCap || '0 BTC',
        activeUsers: kevinMetrics?.activeHolders || 0
      },
      growth: {
        kevinGrowth30d: kevinMetrics?.growthRate30Day || '0%',
        totalHolders: (kevinMetrics?.totalHolders || 0) + (stampMetrics?.totalHolders || 0),
        marketCapGrowth: src20Metrics?.totalVolume24h || '0 BTC'
      }
    }
  }

  // Generate enhanced Schema.org with technical data
  const generateEnhancedStructuredData = () => {
    const baseUrl = 'https://bitcoinstamps.xyz'
    const currentUrl = `${baseUrl}${page?.value?.relativePath?.replace(/\.md$/, '') || ''}`
    const locale = currentLocale.value
    const frontmatter = page?.value?.frontmatter || {}
    
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': getPageType(),
      name: frontmatter.title || page?.value?.title || 'Bitcoin Stamps Documentation',
      description: frontmatter.description || page?.value?.description,
      url: currentUrl,
      inLanguage: locale,
      dateModified: new Date().toISOString(),
      publisher: {
        '@type': 'Organization',
        name: getLocalizedOrgName(locale),
        url: 'https://github.com/btc-stamps'
      }
    }

    // Add technical specifications for protocol pages
    if (frontmatter.protocols?.length) {
      schema.about = frontmatter.protocols.map((protocolId: string) => {
        const spec = getProtocolSpec(protocolId)
        return {
          '@type': 'SoftwareApplication',
          name: enhancedProtocolEntities.value[protocolId]?.names[locale],
          applicationCategory: 'Bitcoin Metaprotocol',
          softwareVersion: spec?.version,
          operatingSystem: 'Bitcoin',
          releaseNotes: spec?.features?.join(', ')
        }
      })
    }

    // Add block height context for historical pages
    if (frontmatter.blockHeight) {
      const analysis = getBlockAnalysis(frontmatter.blockHeight)
      schema.temporal = {
        '@type': 'Event',
        name: `Bitcoin Block ${frontmatter.blockHeight}`,
        startDate: analysis.milestone?.blockDate,
        location: {
          '@type': 'DigitalPlatform',
          name: 'Bitcoin Blockchain'
        }
      }
    }

    // Add detected entities with technical context
    if (detectEntitiesWithTechnicalData.value.length > 0) {
      schema.mentions = detectEntitiesWithTechnicalData.value.map(entity => ({
        '@type': entity.type,
        name: entity.localizedName,
        description: entity.localizedDescription,
        ...(entity.technicalDetails && { additionalProperty: entity.technicalDetails })
      }))
    }

    return schema
  }

  const getPageType = (): string => {
    const frontmatter = page?.value?.frontmatter || {}
    switch (frontmatter.leoType) {
      case 'protocol': return 'TechArticle'
      case 'tutorial': return 'HowTo'
      case 'entity': return 'DefinedTerm'
      case 'narrative': return 'Article'
      case 'historical-event': return 'Event'
      default: return 'Article'
    }
  }

  const getLocalizedOrgName = (locale: string): string => {
    const names = {
      en: 'Bitcoin Stamps Community',
      fr: 'Communauté Bitcoin Stamps',
      es: 'Comunidad Bitcoin Stamps',
      zh: 'Bitcoin Stamps 社区'
    }
    return names[locale] || names.en
  }

  // Utility functions
  const formatTechnicalValue = (value: any, type: 'number' | 'currency' | 'percentage' = 'number'): string => {
    switch (type) {
      case 'number':
        return typeof value === 'number' ? formatNumber(value) : String(value)
      case 'currency':
        return typeof value === 'string' && value.includes('BTC') ? value : `${value} BTC`
      case 'percentage':
        return typeof value === 'string' && value.includes('%') ? value : `${value}%`
      default:
        return String(value)
    }
  }

  return {
    // Enhanced entities
    enhancedCulturalEntities,
    enhancedProtocolEntities,
    detectEntitiesWithTechnicalData,
    
    // Technical context
    technicalContext,
    getMilestoneWithTechnicalContext,
    getBlockAnalysis,
    getCommunitySnapshot,
    getAPIIntegrationStatus,
    
    // Schema.org generation
    generateEnhancedStructuredData,
    
    // Utilities
    currentLocale,
    formatTechnicalValue,
    
    // Direct data access
    protocolMilestones: protocolMilestonesData,
    communityMetrics: communityMetricsData,
    technicalSpecs: technicalSpecsData,
    networkConstants: networkConstantsData,
    externalLinks: externalLinksData
  }
}