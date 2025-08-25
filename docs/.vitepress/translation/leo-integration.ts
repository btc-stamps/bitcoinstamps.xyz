/**
 * LEO System Integration for Translation Management
 * Seamless integration with existing useLEO.ts and multilingual-data.js
 */

import { translationDb, type TranslationMemoryEntry } from './database.ts'
import { CulturalValidator, type CulturalValidationResult } from './cultural-validator.ts'
import { FuzzyMatcher, type MatchContext } from './fuzzy-matcher.ts'
import { changeDetector } from './change-detector.ts'

// Import existing LEO types and utilities
interface LEOEntity {
  id: string
  name: string | Record<string, string>
  type: string
  description: string | Record<string, string>
  culturalSignificance?: 'high' | 'medium' | 'low'
  relationships?: Array<{
    id: string
    type: string
    name?: string
    description?: string
  }>
  culturalMetadata?: Record<string, any>
}

interface MultilinguEntity {
  id: string
  name: string
  type: string
  description: string
  culturalSignificance: 'high' | 'medium' | 'low'
  [key: string]: any
}

export interface TranslationMemoryIntegration {
  entityId: string
  translationMemory: TranslationMemoryEntry[]
  culturalGuidelines: string[]
  validationRules: string[]
  preservationScore: number
}

export class LEOTranslationIntegration {
  /**
   * Enhanced multilingual entity processing with translation memory
   */
  static async enhanceMultilingualEntities(
    entities: MultilinguEntity[],
    targetLanguage: string
  ): Promise<Array<MultilinguEntity & {
    translationMemory?: TranslationMemoryEntry[]
    culturalValidation?: CulturalValidationResult
    translationGuidelines?: string[]
  }>> {
    const enhancedEntities = []

    for (const entity of entities) {
      // Get translation memory for this entity
      const translationMemory = await this.getEntityTranslationMemory(entity.id, targetLanguage)
      
      // Get cultural validation for entity description
      let culturalValidation: CulturalValidationResult | undefined
      if (entity.culturalSignificance === 'high') {
        culturalValidation = await CulturalValidator.validateTranslation({
          sourceText: entity.description,
          targetText: entity.description, // Same for now, would be different in actual translation
          sourceLanguage: 'en',
          targetLanguage,
          filePath: `entities/${entity.id}.json`,
          contentType: 'metadata'
        })
      }

      // Get cultural guidelines
      const translationGuidelines = this.getEntityTranslationGuidelines(entity)

      enhancedEntities.push({
        ...entity,
        translationMemory,
        culturalValidation,
        translationGuidelines
      })
    }

    return enhancedEntities
  }

  /**
   * Get translation memory for specific entity
   */
  private static async getEntityTranslationMemory(
    entityId: string,
    targetLanguage: string
  ): Promise<TranslationMemoryEntry[]> {
    // Query translation memory for entity-specific content
    const fuzzyMatches = translationDb.findFuzzyMatches(
      entityId,
      'en',
      targetLanguage,
      0.80
    )

    return fuzzyMatches.map(match => ({
      sourceText: match.sourceText,
      targetText: match.targetText,
      sourceLanguage: 'en',
      targetLanguage,
      contextHash: '',
      sourceFilePath: `entities/${entityId}`,
      culturalSignificance: this.assessEntityCulturalSignificance(entityId),
      qualityScore: match.confidenceScore,
      fuzzyMatchThreshold: 0.80,
      trinityValidation: this.isTrinityEntity(entityId),
      kevinSignificance: this.assessKevinSignificance(entityId),
      rarePepeConnection: this.hasRarePepeConnection(entityId)
    }))
  }

  /**
   * Get translation guidelines for entity
   */
  private static getEntityTranslationGuidelines(entity: MultilinguEntity): string[] {
    const guidelines: string[] = []

    // KEVIN-specific guidelines
    if (entity.id === 'kevin') {
      guidelines.push('⭐ KEVIN must always be in ALL CAPS - this is the beloved community mascot')
      guidelines.push('🎭 Preserve connection to Rare Pepe culture and first SRC-20 token story')
      guidelines.push('👻 Maintain the "ghost in the machine" narrative and self-replication story')
      guidelines.push('🏛️ Reference the historical significance of blocks 783718 and 788041')
    }

    // Trinity-specific guidelines  
    const trinityMembers = ['mikeinspace', 'arwyn', 'reinamora']
    if (trinityMembers.includes(entity.id)) {
      guidelines.push('👥 Trinity founder names must be preserved exactly - founding trio identity')
      guidelines.push('📜 Maintain the founding story connections and individual roles')
      
      if (entity.id === 'mikeinspace') {
        guidelines.push('🌟 Original dreamer - preserve lowercase formatting and visionary context')
      } else if (entity.id === 'arwyn') {
        guidelines.push('🎩 Orchestrator and magician - preserve KEVIN creation story')
      } else if (entity.id === 'reinamora') {
        guidelines.push('🏗️ Technical architect - preserve protocol development narrative')
      }
    }

    // Protocol-specific guidelines
    const protocols = ['src-20', 'src-101', 'src-721', 'olga']
    if (protocols.includes(entity.id)) {
      guidelines.push('🔧 Protocol names should maintain consistent formatting across languages')
      guidelines.push('📋 Ensure technical accuracy - these are official protocol standards')
      
      if (entity.id === 'src-20') {
        guidelines.push('🥇 Emphasize KEVIN pioneering this standard - historical significance')
      }
    }

    // Cultural entity guidelines
    if (entity.id === 'counterparty') {
      guidelines.push('🌉 Preserve Flooneybin connection story where Trinity first connected')
    }

    if (entity.id === 'bitcoin-stamps') {
      guidelines.push('🏛️ Emphasize permanence and immutability - core value proposition')
      guidelines.push('🎨 Maintain artistic and cultural significance aspects')
    }

    // High cultural significance catch-all
    if (entity.culturalSignificance === 'high' && guidelines.length === 0) {
      guidelines.push('⭐ High cultural significance - preserve cultural context and meaning')
      guidelines.push('🌍 Provide cultural context for international audiences')
    }

    return guidelines
  }

  /**
   * Assess cultural significance of entity for translation memory
   */
  private static assessEntityCulturalSignificance(entityId: string): 'high' | 'medium' | 'low' {
    const highSigEntities = [
      'kevin', 'mikeinspace', 'arwyn', 'reinamora', 'counterparty', 
      'bitcoin-stamps', 'src-20', 'flooneybin', 'rare-pepe'
    ]
    
    const mediumSigEntities = ['src-101', 'src-721', 'olga', 'stampchain']

    if (highSigEntities.includes(entityId)) return 'high'
    if (mediumSigEntities.includes(entityId)) return 'medium'
    return 'low'
  }

  /**
   * Check if entity is Trinity member
   */
  private static isTrinityEntity(entityId: string): boolean {
    return ['mikeinspace', 'arwyn', 'reinamora'].includes(entityId)
  }

  /**
   * Assess KEVIN significance for entity
   */
  private static assessKevinSignificance(entityId: string): 'none' | 'mention' | 'central' {
    if (entityId === 'kevin') return 'central'
    if (entityId === 'src-20' || entityId === 'arwyn') return 'mention'
    return 'none'
  }

  /**
   * Check if entity has Rare Pepe connection
   */
  private static hasRarePepeConnection(entityId: string): boolean {
    return ['kevin', 'arwyn', 'rare-pepe', 'counterparty', 'flooneybin'].includes(entityId)
  }

  /**
   * Enhanced useLEO integration with translation memory
   */
  static async enhanceUseLEOData(
    pageContent: string,
    currentLocale: string,
    detectedEntities: Array<{ id: string; [key: string]: any }>
  ): Promise<{
    translationSuggestions: Array<{
      entity: string
      suggestion: string
      confidence: number
      culturalNote?: string
    }>
    culturalValidationResults: CulturalValidationResult[]
    translationMemoryHits: number
  }> {
    const translationSuggestions = []
    const culturalValidationResults = []
    let translationMemoryHits = 0

    // Process detected entities for translation suggestions
    for (const entity of detectedEntities) {
      // Get fuzzy matches from translation memory
      const context: MatchContext = {
        filePath: 'current-page',
        contentType: 'paragraph',
        culturalEntities: [entity.id]
      }

      const matches = await FuzzyMatcher.findBestMatches(
        entity.localizedName || entity.name || entity.id,
        'en',
        currentLocale,
        context,
        0.75
      )

      if (matches.length > 0) {
        translationMemoryHits += matches.length
        
        for (const match of matches.slice(0, 3)) { // Top 3 suggestions
          translationSuggestions.push({
            entity: entity.id,
            suggestion: match.targetText,
            confidence: match.overallScore,
            culturalNote: match.culturalNotes?.[0]
          })
        }
      }

      // Cultural validation for high-significance entities
      if (entity.culturalSignificance === 'high') {
        const validation = await CulturalValidator.validateTranslation({
          sourceText: entity.localizedDescription || entity.description,
          targetText: entity.localizedDescription || entity.description,
          sourceLanguage: 'en',
          targetLanguage: currentLocale,
          filePath: 'current-page',
          contentType: 'paragraph'
        })

        culturalValidationResults.push(validation)
      }
    }

    return {
      translationSuggestions,
      culturalValidationResults,
      translationMemoryHits
    }
  }

  /**
   * Generate enhanced structured data with translation context
   */
  static generateTranslationAwareStructuredData(
    baseSchema: Record<string, any>,
    currentLocale: string,
    entityId?: string
  ): Record<string, any> {
    const enhancedSchema = { ...baseSchema }

    // Add translation metadata
    enhancedSchema.translationMetadata = {
      sourceLanguage: 'en',
      targetLanguage: currentLocale,
      translationDate: new Date().toISOString(),
      culturalPreservationLevel: entityId ? this.assessEntityCulturalSignificance(entityId) : 'medium'
    }

    // Add cultural preservation notes for high-significance entities
    if (entityId && this.assessEntityCulturalSignificance(entityId) === 'high') {
      enhancedSchema.culturalPreservationNotes = this.getEntityTranslationGuidelines({
        id: entityId,
        name: '',
        type: '',
        description: '',
        culturalSignificance: 'high'
      })
    }

    // Add KEVIN-specific structured data enhancements
    if (entityId === 'kevin') {
      enhancedSchema.about = [
        ...(enhancedSchema.about || []),
        {
          '@type': 'DefinedTerm',
          name: 'Cultural Mascot',
          description: 'KEVIN serves as the beloved mascot of the Bitcoin Stamps community',
          inDefinedTermSet: 'Bitcoin Stamps Cultural Entities'
        },
        {
          '@type': 'HistoricalEvent',
          name: 'First SRC-20 Token Creation',
          startDate: '2023-04-20',
          location: 'Block 788041',
          description: 'KEVIN became the first SRC-20 token, pioneering the standard'
        }
      ]
    }

    // Add Trinity-specific enhancements
    if (['mikeinspace', 'arwyn', 'reinamora'].includes(entityId || '')) {
      enhancedSchema.partOf = {
        '@type': 'Organization',
        name: 'Bitcoin Stamps Founding Trinity',
        description: 'The three founders who created the Bitcoin Stamps ecosystem',
        foundingDate: '2023-03-01'
      }
    }

    return enhancedSchema
  }

  /**
   * Monitor content changes and trigger translation workflows
   */
  static async monitorContentChanges(): Promise<void> {
    console.log('🔍 Starting LEO-integrated content monitoring...')
    
    // Extend change detector with LEO-aware patterns
    changeDetector.config.culturalEntityPatterns = {
      ...changeDetector.config.culturalEntityPatterns,
      leoEntities: [
        /\bEntityMention\b/gi,
        /\bSmartStructuredData\b/gi,
        /\bProtocolCard\b/gi,
        /\buseLEO\b/gi
      ]
    }

    // Monitor LEO component changes
    changeDetector.config.watchPaths.push(
      'docs/.vitepress/theme/composables/',
      'docs/.vitepress/api/',
      'docs/.vitepress/theme/components/LEO/'
    )

    console.log('✅ LEO-integrated content monitoring active')
  }

  /**
   * Sync translation memory with multilingual data updates
   */
  static async syncWithMultilingualData(
    entities: MultilinguEntity[],
    targetLanguage: string
  ): Promise<void> {
    console.log(`🔄 Syncing translation memory with multilingual data for ${targetLanguage}...`)

    for (const entity of entities) {
      // Check if we have existing translation memory for this entity
      const existingMemory = await this.getEntityTranslationMemory(entity.id, targetLanguage)
      
      if (existingMemory.length === 0) {
        // Create new translation memory entry
        const contextHash = translationDb.constructor.generateContextHash(
          entity.description,
          `entity:${entity.id}`
        )

        try {
          translationDb.addTranslation({
            sourceText: entity.description,
            sourceLanguage: 'en',
            targetText: entity.description, // Would be actual translation in real scenario
            targetLanguage,
            contextHash,
            sourceFilePath: `multilingual-data/${entity.id}`,
            culturalSignificance: entity.culturalSignificance || 'medium',
            qualityScore: 0.9, // High quality for manually curated data
            fuzzyMatchThreshold: 0.85,
            entityReferences: [entity.id],
            trinityValidation: this.isTrinityEntity(entity.id),
            kevinSignificance: this.assessKevinSignificance(entity.id),
            rarePepeConnection: this.hasRarePepeConnection(entity.id)
          })
        } catch (error) {
          // Entry might already exist due to unique constraint
          console.log(`Translation memory entry for ${entity.id} already exists`)
        }
      }
    }

    console.log('✅ Translation memory sync completed')
  }

  /**
   * Generate cultural preservation report for LEO system
   */
  static async generateLEOCulturalReport(): Promise<{
    entityCoverage: Record<string, number>
    culturalHealthScore: number
    recommendations: string[]
    criticalIssues: string[]
  }> {
    const stats = translationDb.getTranslationStats()
    const entityCoverage: Record<string, number> = {}
    let totalCulturalScore = 0
    const recommendations: string[] = []
    const criticalIssues: string[] = []

    // Analyze coverage for key cultural entities
    const keyCulturalEntities = ['kevin', 'mikeinspace', 'arwyn', 'reinamora', 'counterparty']
    
    for (const entityId of keyCulturalEntities) {
      const entity = translationDb.getCulturalEntity(entityId)
      if (entity) {
        entityCoverage[entityId] = entity.mentionCount
        
        if (entity.mentionCount === 0) {
          criticalIssues.push(`${entity.entityName} has no recorded mentions - may be missing from content`)
        } else if (entity.mentionCount < 5) {
          recommendations.push(`Increase ${entity.entityName} cultural context in documentation`)
        }
      }
    }

    // Calculate overall cultural health score
    const avgQuality = stats.reduce((sum, lang) => sum + (lang.avg_quality || 0), 0) / stats.length
    const culturalCoverage = Object.values(entityCoverage).reduce((sum, count) => sum + count, 0) / keyCulturalEntities.length
    
    totalCulturalScore = (avgQuality * 0.6 + (culturalCoverage / 100) * 0.4) * 100

    // Generate recommendations
    if (totalCulturalScore < 80) {
      recommendations.push('Increase cultural entity mentions and context preservation')
    }
    
    if (stats.some(lang => (lang.kevin_translations || 0) === 0)) {
      criticalIssues.push('KEVIN translations missing for some languages')
    }

    return {
      entityCoverage,
      culturalHealthScore: totalCulturalScore,
      recommendations,
      criticalIssues
    }
  }

  /**
   * Initialize LEO translation integration
   */
  static async initialize(): Promise<void> {
    console.log('🚀 Initializing LEO Translation Management Integration...')
    
    try {
      // Start content monitoring
      await this.monitorContentChanges()
      
      // Generate initial cultural report
      const report = await this.generateLEOCulturalReport()
      console.log(`📊 LEO Cultural Health Score: ${report.culturalHealthScore.toFixed(1)}%`)
      
      if (report.criticalIssues.length > 0) {
        console.warn('⚠️ Critical cultural preservation issues detected:', report.criticalIssues)
      }
      
      console.log('✅ LEO Translation Management Integration initialized successfully')
    } catch (error) {
      console.error('❌ Failed to initialize LEO Translation Integration:', error)
      throw error
    }
  }
}

// Export integration instance
export const leoTranslationIntegration = LEOTranslationIntegration