/**
 * Advanced Fuzzy Matching Engine for Translation Memory
 * Optimized for cultural preservation and context-aware matching
 */

import { translationDb, type TranslationMemoryEntry, type FuzzyMatchResult } from './database.ts'

export interface MatchContext {
  precedingText?: string
  followingText?: string
  filePath: string
  contentType: 'title' | 'heading' | 'paragraph' | 'list_item' | 'code' | 'metadata'
  culturalEntities?: string[]
}

export interface EnhancedMatchResult extends FuzzyMatchResult {
  contextSimilarity: number
  culturalRelevance: number
  overallScore: number
  recommendedAction: 'use' | 'review' | 'reject'
  culturalNotes?: string[]
}

export class CulturalFuzzyMatcher {
  private static readonly CULTURAL_ENTITIES = [
    'kevin', 'mikeinspace', 'arwyn', 'reinamora', 'counterparty',
    'flooneybin', 'rare pepe', 'src-20', 'src-101', 'src-721', 'olga',
    'bitcoin stamps', 'trinity'
  ]

  private static readonly CULTURAL_KEYWORDS = [
    'founder', 'mascot', 'protocol', 'meme', 'culture', 'heritage',
    'permanent', 'blockchain', 'stamp', 'token', 'nft', 'genesis',
    'pioneered', 'established', 'created', 'dreamer', 'visionary',
    'orchestrator', 'magician', 'architect', 'technical'
  ]

  /**
   * Advanced fuzzy matching with cultural context awareness
   */
  static async findBestMatches(
    sourceText: string,
    sourceLanguage: string,
    targetLanguage: string,
    context: MatchContext,
    minThreshold: number = 0.70
  ): Promise<EnhancedMatchResult[]> {
    // Get basic fuzzy matches from database
    const basicMatches = translationDb.findFuzzyMatches(
      sourceText,
      sourceLanguage,
      targetLanguage,
      minThreshold
    )

    // Enhance matches with cultural and context analysis
    const enhancedMatches: EnhancedMatchResult[] = []

    for (const match of basicMatches) {
      const enhancement = await this.enhanceMatch(match, sourceText, context)
      enhancedMatches.push(enhancement)
    }

    // Sort by overall score (combination of fuzzy + context + cultural)
    enhancedMatches.sort((a, b) => b.overallScore - a.overallScore)

    return enhancedMatches
  }

  /**
   * Enhance a basic match with context and cultural analysis
   */
  private static async enhanceMatch(
    match: FuzzyMatchResult,
    originalSource: string,
    context: MatchContext
  ): Promise<EnhancedMatchResult> {
    const contextSimilarity = this.calculateContextSimilarity(match, context)
    const culturalRelevance = this.calculateCulturalRelevance(match, originalSource, context)
    
    // Calculate weighted overall score
    const weights = {
      fuzzy: 0.4,
      context: 0.3,
      cultural: 0.3
    }

    const overallScore = (
      match.matchScore * weights.fuzzy +
      contextSimilarity * weights.context +
      culturalRelevance * weights.cultural
    )

    const recommendedAction = this.getRecommendedAction(overallScore, culturalRelevance)
    const culturalNotes = this.generateCulturalNotes(match, originalSource, context)

    return {
      ...match,
      contextSimilarity,
      culturalRelevance,
      overallScore,
      recommendedAction,
      culturalNotes
    }
  }

  /**
   * Calculate context similarity between stored match and current context
   */
  private static calculateContextSimilarity(match: FuzzyMatchResult, context: MatchContext): number {
    let similarity = 0.5 // Base similarity

    // File path similarity (same directory, file type, etc.)
    if (match.culturalContext?.filePath && context.filePath) {
      const matchDir = match.culturalContext.filePath.split('/').slice(0, -1).join('/')
      const contextDir = context.filePath.split('/').slice(0, -1).join('/')
      
      if (matchDir === contextDir) {
        similarity += 0.2 // Same directory
      }

      const matchExt = match.culturalContext.filePath.split('.').pop()
      const contextExt = context.filePath.split('.').pop()
      
      if (matchExt === contextExt) {
        similarity += 0.1 // Same file type
      }
    }

    // Content type similarity
    if (match.culturalContext?.contentType === context.contentType) {
      similarity += 0.2
    }

    return Math.min(similarity, 1.0)
  }

  /**
   * Calculate cultural relevance score based on entity references and context
   */
  private static calculateCulturalRelevance(
    match: FuzzyMatchResult, 
    originalSource: string, 
    context: MatchContext
  ): number {
    let relevance = 0.5 // Base relevance

    // Check for cultural entity matches
    const sourceEntities = this.extractCulturalEntities(originalSource)
    const matchEntities = match.culturalContext?.entityReferences || []
    const contextEntities = context.culturalEntities || []

    // Score entity overlap
    const allContextEntities = [...sourceEntities, ...contextEntities]
    const entityOverlap = matchEntities.filter(entity => 
      allContextEntities.some(contextEntity => 
        contextEntity.toLowerCase().includes(entity.toLowerCase()) ||
        entity.toLowerCase().includes(contextEntity.toLowerCase())
      )
    )

    if (entityOverlap.length > 0) {
      relevance += Math.min(entityOverlap.length * 0.15, 0.45)
    }

    // Bonus for high-significance cultural references
    const highSigEntities = ['kevin', 'mikeinspace', 'arwyn', 'reinamora', 'trinity']
    const hasHighSig = allContextEntities.some(entity =>
      highSigEntities.some(sig => entity.toLowerCase().includes(sig.toLowerCase()))
    )

    if (hasHighSig) {
      relevance += 0.1
    }

    return Math.min(relevance, 1.0)
  }

  /**
   * Extract cultural entities from text
   */
  private static extractCulturalEntities(text: string): string[] {
    const entities: string[] = []
    const lowerText = text.toLowerCase()

    for (const entity of this.CULTURAL_ENTITIES) {
      if (lowerText.includes(entity.toLowerCase())) {
        entities.push(entity)
      }
    }

    return entities
  }

  /**
   * Get recommended action based on scores
   */
  private static getRecommendedAction(
    overallScore: number, 
    culturalRelevance: number
  ): 'use' | 'review' | 'reject' {
    if (overallScore >= 0.90 && culturalRelevance >= 0.80) {
      return 'use'
    } else if (overallScore >= 0.70 || culturalRelevance >= 0.70) {
      return 'review'
    } else {
      return 'reject'
    }
  }

  /**
   * Generate cultural preservation notes for translators
   */
  private static generateCulturalNotes(
    match: FuzzyMatchResult,
    originalSource: string,
    context: MatchContext
  ): string[] {
    const notes: string[] = []
    const entities = this.extractCulturalEntities(originalSource)

    // KEVIN-specific notes
    if (entities.some(e => e.toLowerCase().includes('kevin'))) {
      notes.push('⚠️ KEVIN must always be in ALL CAPS - this is the beloved community mascot')
      notes.push('🎭 Preserve the connection to Rare Pepe culture and first SRC-20 token story')
    }

    // Trinity-specific notes
    const trinityMembers = ['mikeinspace', 'arwyn', 'reinamora']
    const mentionedTrinity = entities.filter(e => 
      trinityMembers.some(member => e.toLowerCase().includes(member.toLowerCase()))
    )

    if (mentionedTrinity.length > 0) {
      notes.push('👥 Trinity founder names must be preserved exactly - these are the founding trio')
      notes.push('📜 Consider adding context about their roles in Bitcoin Stamps creation')
    }

    // Protocol-specific notes
    const protocols = ['src-20', 'src-101', 'src-721', 'olga']
    const mentionedProtocols = entities.filter(e =>
      protocols.some(protocol => e.toLowerCase().includes(protocol.toLowerCase()))
    )

    if (mentionedProtocols.length > 0) {
      notes.push('🔧 Protocol names should maintain consistent formatting across languages')
      notes.push('📋 Ensure technical accuracy - these are official protocol standards')
    }

    // Rare Pepe culture notes
    if (entities.some(e => e.toLowerCase().includes('rare pepe'))) {
      notes.push('🐸 Rare Pepe culture is foundational heritage - provide cultural context for international audiences')
      notes.push('🔗 Explain the connection to KEVIN and Bitcoin Stamps origins')
    }

    // Flooneybin connection
    if (originalSource.toLowerCase().includes('flooneybin')) {
      notes.push('🎪 Flooneybin is where the Trinity first connected - crucial founding narrative')
      notes.push('🤝 Preserve the story of how this brought Bitcoin Stamps founders together')
    }

    // High cultural significance warning
    if (match.culturalContext?.culturalSignificance === 'high') {
      notes.push('⭐ High cultural significance - extra care needed for cultural preservation')
    }

    return notes
  }

  /**
   * Segment text for translation memory storage
   */
  static segmentText(text: string, context: MatchContext): Array<{
    segment: string
    contextHash: string
    culturalEntities: string[]
  }> {
    // Split by sentences and paragraphs, preserving cultural entity boundaries
    const segments: Array<{
      segment: string
      contextHash: string
      culturalEntities: string[]
    }> = []

    // Simple sentence splitting (can be enhanced with more sophisticated NLP)
    const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [text]

    for (let i = 0; i < sentences.length; i++) {
      const segment = sentences[i].trim()
      if (segment.length < 10) continue // Skip very short segments

      const precedingContext = sentences.slice(Math.max(0, i - 1), i).join(' ')
      const followingContext = sentences.slice(i + 1, Math.min(sentences.length, i + 2)).join(' ')

      const contextHash = translationDb.constructor.generateContextHash(
        segment,
        `${precedingContext}|||${followingContext}|||${context.filePath}`
      )

      const culturalEntities = this.extractCulturalEntities(segment)

      segments.push({
        segment,
        contextHash,
        culturalEntities
      })
    }

    return segments
  }

  /**
   * Calculate edit distance for fuzzy matching
   */
  static calculateEditDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))

    for (let i = 0; i <= str1.length; i++) {
      matrix[0][i] = i
    }

    for (let j = 0; j <= str2.length; j++) {
      matrix[j][0] = j
    }

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // deletion
          matrix[j - 1][i] + 1, // insertion
          matrix[j - 1][i - 1] + indicator // substitution
        )
      }
    }

    return matrix[str2.length][str1.length]
  }

  /**
   * Calculate similarity score from edit distance
   */
  static calculateSimilarity(str1: string, str2: string): number {
    const maxLength = Math.max(str1.length, str2.length)
    if (maxLength === 0) return 1.0

    const editDistance = this.calculateEditDistance(str1.toLowerCase(), str2.toLowerCase())
    return 1.0 - (editDistance / maxLength)
  }

  /**
   * Update segment usage statistics
   */
  static async updateSegmentUsage(segmentHash: string): Promise<void> {
    // This would update the translation_segments table usage statistics
    // Implementation depends on database operations
  }
}

export { CulturalFuzzyMatcher as FuzzyMatcher }