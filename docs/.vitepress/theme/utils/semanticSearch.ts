/**
 * Semantic Search Enhancement for Bitcoin Stamps Documentation
 * Integrates with LEO API entities and provides cultural context awareness
 */

export interface EntityData {
  id: string
  name: string
  type: string
  description: string
  culturalSignificance: 'high' | 'medium' | 'low'
  relationships?: Array<{
    id: string
    type: string
  }>
  url?: string
  blockIntroduced?: number
  creator?: string
  stampNumber?: number
}

export interface SearchResult {
  title: string
  content: string
  url: string
  culturalScore: number
  entityMatches: string[]
  resultGroup: 'cultural' | 'protocol' | 'technical' | 'historical'
  blockContext?: {
    milestone: number
    significance: string
  }
}

export class BitcoinStampsSearch {
  private entities: Map<string, EntityData> = new Map()
  private culturalKeywords: Set<string> = new Set()
  private blockMilestones: Map<string, { block: number; significance: string }> = new Map()

  constructor() {
    this.initializeEntities()
    this.initializeCulturalKeywords()
    this.initializeBlockMilestones()
  }

  private initializeEntities() {
    // Key cultural entities from LEO API
    const coreEntities = [
      {
        id: 'kevin',
        name: 'Kevin',
        type: 'cultural-icon',
        description: 'Beloved mascot of Bitcoin Stamps, first SRC-20 token',
        culturalSignificance: 'high' as const,
        stampNumber: 6878,
        creator: 'Reinamora',
        blockIntroduced: 788041
      },
      {
        id: 'src-20',
        name: 'SRC-20 Tokens',
        type: 'protocol',
        description: 'Fungible token standard with enhanced features',
        culturalSignificance: 'high' as const,
        blockIntroduced: 796000
      },
      {
        id: 'arwyn',
        name: 'Arwyn',
        type: 'cultural-figure',
        description: 'Artist and creator in Bitcoin Stamps ecosystem',
        culturalSignificance: 'high' as const
      },
      {
        id: 'mikeinspace',
        name: 'Mikeinspace',
        type: 'cultural-figure',
        description: 'Prominent artist in Bitcoin Stamps community',
        culturalSignificance: 'high' as const
      },
      {
        id: 'reinamora',
        name: 'Reinamora',
        type: 'cultural-figure',
        description: 'Creator of Kevin token and cultural icon',
        culturalSignificance: 'high' as const
      }
    ]

    coreEntities.forEach(entity => {
      this.entities.set(entity.id, entity)
      this.entities.set(entity.name.toLowerCase(), entity)
    })
  }

  private initializeCulturalKeywords() {
    const keywords = [
      'kevin', 'arwyn', 'mikeinspace', 'reinamora',
      'src-20', 'src-101', 'src-721', 'olga',
      'bitcoin stamps', 'counterparty', 'permanent',
      'immutable', 'genesis', 'mascot', 'community'
    ]
    
    keywords.forEach(keyword => this.culturalKeywords.add(keyword.toLowerCase()))
  }

  private initializeBlockMilestones() {
    const milestones = [
      { block: 788041, significance: 'KEVIN genesis - First SRC-20 token creation' },
      { block: 796000, significance: 'SRC-20 protocol enhancements and optimizations' },
      { block: 865000, significance: 'Major protocol expansion and community growth' }
    ]

    milestones.forEach(milestone => {
      this.blockMilestones.set(milestone.block.toString(), milestone)
    })
  }

  /**
   * Enhance search terms with cultural entity awareness
   */
  enhanceSearchTerm(term: string): string[] {
    const enhanced = [term.toLowerCase()]
    
    // Add entity relationships
    const entity = this.entities.get(term.toLowerCase())
    if (entity && entity.relationships) {
      entity.relationships.forEach(rel => {
        const relatedEntity = this.entities.get(rel.id)
        if (relatedEntity) {
          enhanced.push(relatedEntity.name.toLowerCase())
        }
      })
    }

    // Add synonyms and variations
    const synonyms: Record<string, string[]> = {
      'kevin': ['kev', 'mascot', 'token mascot', 'first src-20'],
      'src-20': ['src20', 'tokens', 'fungible tokens'],
      'src-721': ['src721', 'nft', 'non-fungible tokens'],
      'src-101': ['src101', 'naming', 'names'],
      'olga': ['encoding', 'p2wsh', 'optimization'],
      'bitcoin stamps': ['stamps', 'btc stamps', 'bitcoinstamps'],
      'arwyn': ['artist', 'creator'],
      'block 788041': ['788041', 'genesis block', 'kevin genesis'],
      'block 796000': ['796000', 'enhancement block']
    }

    const termSynonyms = synonyms[term.toLowerCase()]
    if (termSynonyms) {
      enhanced.push(...termSynonyms)
    }

    return enhanced
  }

  /**
   * Calculate cultural significance score for search results
   */
  calculateCulturalScore(content: string, title: string): number {
    let score = 0
    const combinedText = `${title} ${content}`.toLowerCase()

    // High-value cultural entities
    if (combinedText.includes('kevin')) score += 5
    if (combinedText.includes('arwyn')) score += 4
    if (combinedText.includes('reinamora')) score += 4
    if (combinedText.includes('mikeinspace')) score += 4

    // Protocol significance
    if (combinedText.includes('src-20')) score += 3
    if (combinedText.includes('src-721')) score += 3
    if (combinedText.includes('olga')) score += 2

    // Block milestones
    if (combinedText.includes('788041')) score += 4
    if (combinedText.includes('796000')) score += 3
    if (combinedText.includes('865000')) score += 2

    // General cultural keywords
    this.culturalKeywords.forEach(keyword => {
      if (combinedText.includes(keyword)) {
        score += 1
      }
    })

    return score
  }

  /**
   * Determine result grouping based on content analysis
   */
  categorizeResult(content: string, title: string): SearchResult['resultGroup'] {
    const combinedText = `${title} ${content}`.toLowerCase()

    // Cultural content (highest priority)
    if (combinedText.includes('kevin') || 
        combinedText.includes('arwyn') ||
        combinedText.includes('community') ||
        combinedText.includes('mascot') ||
        combinedText.includes('cultural')) {
      return 'cultural'
    }

    // Historical content (block milestones, origins)
    if (combinedText.includes('788041') ||
        combinedText.includes('796000') ||
        combinedText.includes('genesis') ||
        combinedText.includes('history') ||
        combinedText.includes('origin')) {
      return 'historical'
    }

    // Protocol content
    if (combinedText.includes('src-20') ||
        combinedText.includes('src-721') ||
        combinedText.includes('src-101') ||
        combinedText.includes('olga') ||
        combinedText.includes('protocol')) {
      return 'protocol'
    }

    // Default to technical
    return 'technical'
  }

  /**
   * Extract entity matches from content
   */
  extractEntityMatches(content: string, title: string): string[] {
    const combinedText = `${title} ${content}`.toLowerCase()
    const matches: string[] = []

    this.entities.forEach((entity, key) => {
      if (combinedText.includes(key)) {
        matches.push(entity.name)
      }
    })

    return [...new Set(matches)] // Remove duplicates
  }

  /**
   * Detect block context in content
   */
  detectBlockContext(content: string, title: string): SearchResult['blockContext'] {
    const combinedText = `${title} ${content}`.toLowerCase()

    for (const [blockStr, milestone] of this.blockMilestones) {
      if (combinedText.includes(blockStr)) {
        return {
          milestone: milestone.block,
          significance: milestone.significance
        }
      }
    }

    return undefined
  }

  /**
   * Main enhancement function for search results
   */
  enhanceSearchResult(result: {
    title: string
    content: string
    url: string
  }): SearchResult {
    const culturalScore = this.calculateCulturalScore(result.content, result.title)
    const entityMatches = this.extractEntityMatches(result.content, result.title)
    const resultGroup = this.categorizeResult(result.content, result.title)
    const blockContext = this.detectBlockContext(result.content, result.title)

    return {
      ...result,
      culturalScore,
      entityMatches,
      resultGroup,
      blockContext
    }
  }

  /**
   * Sort and group search results by cultural significance
   */
  sortResultsByCulturalRelevance(results: SearchResult[]): {
    cultural: SearchResult[]
    historical: SearchResult[]
    protocol: SearchResult[]
    technical: SearchResult[]
  } {
    const grouped = {
      cultural: [] as SearchResult[],
      historical: [] as SearchResult[],
      protocol: [] as SearchResult[],
      technical: [] as SearchResult[]
    }

    results.forEach(result => {
      grouped[result.resultGroup].push(result)
    })

    // Sort each group by cultural score (descending)
    Object.keys(grouped).forEach(key => {
      grouped[key as keyof typeof grouped].sort((a, b) => b.culturalScore - a.culturalScore)
    })

    return grouped
  }
}

// Export singleton instance
export const bitcoinStampsSearch = new BitcoinStampsSearch()

// Export utility functions for VitePress integration
export function enhanceVitePressSearch() {
  return {
    processTerm: (term: string) => {
      return bitcoinStampsSearch.enhanceSearchTerm(term)
    },
    
    processResults: (results: any[]) => {
      const enhancedResults = results.map(result => 
        bitcoinStampsSearch.enhanceSearchResult(result)
      )
      
      return bitcoinStampsSearch.sortResultsByCulturalRelevance(enhancedResults)
    }
  }
}