/**
 * Cultural Integration Layer
 * Bridges cultural translation system with existing LEO API and technical data systems
 */

import type { 
  SupportedLanguage,
  BaseEntity,
  ProtocolEntity,
  ConceptEntity,
  ToolEntity,
  EntitiesData,
  ProtocolsData
} from './types.d.ts'

import { 
  generateEntitiesResponse,
  generateProtocolsResponse,
  generateEntityResponse,
  generateProtocolResponse
} from './localized-endpoints.js'

import { 
  entityTranslationDB,
  getEntityTranslation,
  getLocalizedEntity,
  getCulturalContext,
  getEntityPhilosophies
} from './entity-translations.js'

import { 
  culturalValidator,
  type ValidationIssue,
  type CulturalReview
} from './cultural-validation.js'

import { 
  getCulturalTranslation,
  getPhilosophyTranslation,
  getRegionalCryptoContext
} from './cultural-translations.js'

import { 
  getLocalizedText,
  localizeProtocolEntity,
  localizeConceptEntity,
  localizeToolEntity
} from './language-utils.js'

/**
 * Enhanced Entity Response Interface
 */
export interface EnhancedEntityResponse {
  entity: BaseEntity
  cultural?: {
    context: string
    philosophies: Array<{
      id: string
      phrase: string
      meaning: string
      application: string
    }>
    regionalContext?: string
    culturalTitles?: string
  }
  validation?: {
    issues: ValidationIssue[]
    reviews: CulturalReview[]
    culturallyValidated: boolean
  }
  metadata: {
    language: SupportedLanguage
    availableLanguages: SupportedLanguage[]
    lastUpdated: string
    culturalSignificance: 'low' | 'medium' | 'high'
  }
}

/**
 * Cultural LEO API Integration Class
 */
export class CulturalLEOIntegration {
  
  /**
   * Generate enhanced entities response with cultural data
   */
  async generateEnhancedEntitiesResponse(
    language: SupportedLanguage = 'en',
    includeCultural: boolean = true,
    includeValidation: boolean = false
  ): Promise<EntitiesData & { culturalEnhancements?: any }> {
    // Get base entities response
    const baseResponse = await generateEntitiesResponse(`?lang=${language}`)
    
    if (!includeCultural) {
      return baseResponse
    }
    
    const culturalEnhancements: Record<string, any> = {}
    
    // Enhance each entity with cultural data
    for (const category of ['protocols', 'concepts', 'tools'] as const) {
      const entities = baseResponse.entities[category]
      
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i]
        const translation = getEntityTranslation(entity.id)
        
        if (translation) {
          // Add cultural context
          const culturalContext = getCulturalContext(entity.id, language)
          const philosophies = getEntityPhilosophies(entity.id, language)
          const regionalContext = getRegionalCryptoContext(language)
          
          // Store cultural enhancements
          culturalEnhancements[entity.id] = {
            culturalContext,
            philosophies,
            regionalContext: regionalContext ? {
              terminology: regionalContext.cryptoCulture.terminology,
              localContext: regionalContext.bitcoinArtMovement.localContext
            } : undefined
          }
          
          // Add validation data if requested
          if (includeValidation) {
            const issues = culturalValidator.validateEntity(entity.id, language)
            const reviews = culturalValidator.getReviews(entity.id, language)
            
            culturalEnhancements[entity.id].validation = {
              issues,
              reviews,
              culturallyValidated: reviews.some(r => r.status === 'approved')
            }
          }
          
          // Enhance the entity object itself with cultural metadata
          if (culturalContext) {
            (entities[i] as any).culturalContext = culturalContext
          }
          
          if (philosophies.length > 0) {
            (entities[i] as any).philosophies = philosophies
          }
        }
      }
    }
    
    return {
      ...baseResponse,
      culturalEnhancements
    }
  }
  
  /**
   * Generate enhanced entity response with full cultural data
   */
  async generateEnhancedEntityResponse(
    entityId: string,
    language: SupportedLanguage = 'en',
    includeValidation: boolean = false
  ): Promise<EnhancedEntityResponse | null> {
    // Get base entity response
    const baseResponse = await generateEntityResponse(entityId, `?lang=${language}`)
    
    if (!baseResponse.entity) {
      return null
    }
    
    const entity = baseResponse.entity
    const translation = getEntityTranslation(entityId)
    
    // Cultural enhancements
    const cultural = translation ? {
      context: getCulturalContext(entityId, language) || '',
      philosophies: getEntityPhilosophies(entityId, language),
      regionalContext: translation.regionalAdaptations?.[language]?.culturalContext,
      culturalTitles: translation.cultural?.culturalTitles?.[language]
    } : undefined
    
    // Validation data
    const validation = includeValidation ? {
      issues: culturalValidator.validateEntity(entityId, language),
      reviews: culturalValidator.getReviews(entityId, language),
      culturallyValidated: culturalValidator.getReviews(entityId, language)
        .some(r => r.status === 'approved')
    } : undefined
    
    return {
      entity,
      cultural,
      validation,
      metadata: {
        language,
        availableLanguages: ['en', 'es', 'fr', 'zh'],
        lastUpdated: new Date().toISOString(),
        culturalSignificance: entity.culturalSignificance || 'medium'
      }
    }
  }
  
  /**
   * Generate philosophy-aware protocol response
   */
  async generatePhilosophyProtocolResponse(
    protocolId: string,
    language: SupportedLanguage = 'en'
  ): Promise<any> {
    const baseResponse = await generateProtocolResponse(protocolId, `?lang=${language}`)
    
    if (!baseResponse) return null
    
    // Add philosophy connections
    const translation = getEntityTranslation(protocolId)
    const philosophies = getEntityPhilosophies(protocolId, language)
    
    if (philosophies.length > 0) {
      baseResponse.philosophicalFoundations = philosophies.map(p => ({
        id: p.id,
        phrase: p.phrase,
        meaning: p.meaning,
        applicationToProtocol: p.application
      }))
    }
    
    // Add cultural impact data for protocols like SRC-20
    if (protocolId === 'src-20') {
      const kevinTranslation = getEntityTranslation('kevin')
      const kevinPhilosophies = getEntityPhilosophies('kevin', language)
      
      baseResponse.culturalImpact = {
        pioneeredBy: 'KEVIN',
        communityValues: kevinPhilosophies,
        culturalSignificance: 'high',
        ecosystemImpact: getCulturalContext('src-20', language)
      }
    }
    
    return baseResponse
  }
  
  /**
   * Validate cultural consistency across all languages
   */
  validateCulturalConsistency(): {
    consistent: boolean
    issues: Array<{
      entityId: string
      language: SupportedLanguage
      issue: string
      severity: 'error' | 'warning'
    }>
    recommendations: string[]
  } {
    const languages: SupportedLanguage[] = ['en', 'es', 'fr', 'zh']
    const issues: Array<{
      entityId: string
      language: SupportedLanguage
      issue: string
      severity: 'error' | 'warning'
    }> = []
    
    const allTranslations = entityTranslationDB.exportTranslations()
    
    for (const [entityId, translation] of Object.entries(allTranslations)) {
      // Check cultural significance consistency
      const baseCulturalSig = translation.baseEntity.culturalSignificance
      
      if (baseCulturalSig === 'high') {
        // High-significance entities must have cultural data for all languages
        for (const lang of languages) {
          const cultural = translation.cultural
          
          if (!cultural?.descriptions[lang]) {
            issues.push({
              entityId,
              language: lang,
              issue: `High-significance entity missing ${lang} description`,
              severity: 'error'
            })
          }
          
          if (!cultural?.culturalContext[lang]) {
            issues.push({
              entityId,
              language: lang,
              issue: `High-significance entity missing ${lang} cultural context`,
              severity: 'warning'
            })
          }
          
          if (entityId === 'kevin' && !translation.regionalAdaptations?.[lang]?.culturalAdaptation) {
            issues.push({
              entityId,
              language: lang,
              issue: `KEVIN missing cultural adaptation for ${lang}`,
              severity: 'error'
            })
          }
        }
      }
      
      // Check philosophy translation completeness
      if (translation.philosophies?.length) {
        for (const philosophy of translation.philosophies) {
          for (const lang of languages) {
            if (!philosophy.translations[lang]) {
              issues.push({
                entityId,
                language: lang,
                issue: `Philosophy ${philosophy.id} missing ${lang} translation`,
                severity: 'error'
              })
            }
          }
        }
      }
    }
    
    const recommendations: string[] = []
    
    if (issues.length > 0) {
      recommendations.push(`Address ${issues.length} cultural consistency issues`)
    }
    
    const errorCount = issues.filter(i => i.severity === 'error').length
    if (errorCount > 0) {
      recommendations.push(`${errorCount} critical errors must be resolved before deployment`)
    }
    
    const kevinIssues = issues.filter(i => i.entityId === 'kevin').length
    if (kevinIssues > 0) {
      recommendations.push('KEVIN cultural translations require immediate attention')
    }
    
    return {
      consistent: issues.length === 0,
      issues,
      recommendations
    }
  }
  
  /**
   * Generate cultural translation report
   */
  generateCulturalReport(): {
    summary: {
      totalEntities: number
      fullyTranslated: number
      culturallyEnhanced: number
      validationPending: number
    }
    languageCoverage: Record<SupportedLanguage, {
      entities: number
      cultural: number
      philosophies: number
      validated: number
    }>
    topPriorityItems: Array<{
      entityId: string
      priority: 'critical' | 'high' | 'medium'
      reason: string
      actions: string[]
    }>
    culturalHealthScore: number
  } {
    const stats = entityTranslationDB.getTranslationStats()
    const validationReport = culturalValidator.generateValidationReport()
    const consistencyCheck = this.validateCulturalConsistency()
    
    const languages: SupportedLanguage[] = ['en', 'es', 'fr', 'zh']
    const languageCoverage: Record<SupportedLanguage, any> = {} as any
    
    // Calculate language coverage
    for (const lang of languages) {
      let entities = 0
      let cultural = 0
      let philosophies = 0
      let validated = 0
      
      const allTranslations = entityTranslationDB.exportTranslations()
      
      for (const [entityId, translation] of Object.entries(allTranslations)) {
        entities++
        
        if (translation.cultural?.descriptions[lang]) cultural++
        if (translation.philosophies?.some(p => p.translations[lang])) philosophies++
        
        const reviews = culturalValidator.getReviews(entityId, lang)
        if (reviews.some(r => r.status === 'approved')) validated++
      }
      
      languageCoverage[lang] = { entities, cultural, philosophies, validated }
    }
    
    // Identify top priority items
    const topPriorityItems: Array<{
      entityId: string
      priority: 'critical' | 'high' | 'medium'
      reason: string
      actions: string[]
    }> = []
    
    // KEVIN is always critical priority
    const kevinIssues = consistencyCheck.issues.filter(i => i.entityId === 'kevin')
    if (kevinIssues.length > 0) {
      topPriorityItems.push({
        entityId: 'kevin',
        priority: 'critical',
        reason: 'Community mascot with cultural issues',
        actions: ['Complete all language translations', 'Cultural validation required', 'Regional adaptation needed']
      })
    }
    
    // High-significance entities with missing translations
    for (const [entityId, issues] of Object.entries(validationReport.entityResults)) {
      const errorCount = issues.issues.filter(i => i.severity === 'error').length
      const hasHighSig = entityTranslationDB.getTranslation(entityId)?.baseEntity.culturalSignificance === 'high'
      
      if (errorCount > 0 && hasHighSig && entityId !== 'kevin') {
        topPriorityItems.push({
          entityId,
          priority: 'high',
          reason: `High-significance entity with ${errorCount} validation errors`,
          actions: ['Complete translations', 'Address validation errors', 'Cultural review needed']
        })
      }
    }
    
    // Calculate cultural health score (0-100)
    const totalPossibleScore = 100
    let score = totalPossibleScore
    
    // Deduct for consistency issues
    score -= Math.min(consistencyCheck.issues.length * 2, 30)
    
    // Deduct for validation errors
    score -= Math.min(validationReport.summary.validationErrors * 3, 40)
    
    // Deduct for incomplete translations
    const incompleteRatio = (stats.totalEntities - stats.translatedEntities) / stats.totalEntities
    score -= incompleteRatio * 20
    
    // Deduct for pending reviews
    score -= Math.min(validationReport.summary.pendingReviews * 1, 10)
    
    const culturalHealthScore = Math.max(score, 0)
    
    return {
      summary: {
        totalEntities: stats.totalEntities,
        fullyTranslated: stats.translatedEntities,
        culturallyEnhanced: stats.culturallyValidated,
        validationPending: validationReport.summary.pendingReviews
      },
      languageCoverage,
      topPriorityItems: topPriorityItems.slice(0, 5), // Top 5 priorities
      culturalHealthScore
    }
  }
  
  /**
   * Export integration data for external tools
   */
  exportIntegrationData(): {
    entities: Record<string, EnhancedEntityResponse>
    validation: any
    cultural: any
    consistency: any
  } {
    const allTranslations = entityTranslationDB.exportTranslations()
    const entities: Record<string, EnhancedEntityResponse> = {}
    
    // Generate enhanced entity responses for all entities
    for (const entityId of Object.keys(allTranslations)) {
      // Use synchronous approach for export
      const translation = getEntityTranslation(entityId)
      if (translation) {
        const entity = translation.baseEntity
        const cultural = {
          context: getCulturalContext(entityId, 'en') || '',
          philosophies: getEntityPhilosophies(entityId, 'en'),
          regionalContext: translation.regionalAdaptations?.['en']?.culturalContext,
          culturalTitles: translation.cultural?.culturalTitles?.['en']
        }
        
        entities[entityId] = {
          entity,
          cultural,
          metadata: {
            language: 'en',
            availableLanguages: ['en', 'es', 'fr', 'zh'],
            lastUpdated: new Date().toISOString(),
            culturalSignificance: entity.culturalSignificance || 'medium'
          }
        }
      }
    }
    
    return {
      entities,
      validation: culturalValidator.exportValidationData(),
      cultural: {
        translations: entityTranslationDB.exportTranslations(),
        stats: entityTranslationDB.getTranslationStats()
      },
      consistency: this.validateCulturalConsistency()
    }
  }
}

// Singleton instance
export const culturalLEO = new CulturalLEOIntegration()

/**
 * Enhanced localized endpoints that include cultural data
 */
export async function generateCulturalEntitiesResponse(url: string): Promise<any> {
  const urlObj = new URL(url, 'http://localhost')
  const lang = (urlObj.searchParams.get('lang') || 'en') as SupportedLanguage
  const includeCultural = urlObj.searchParams.get('cultural') !== 'false'
  const includeValidation = urlObj.searchParams.get('validation') === 'true'
  
  return culturalLEO.generateEnhancedEntitiesResponse(lang, includeCultural, includeValidation)
}

export async function generateCulturalEntityResponse(entityId: string, url: string): Promise<any> {
  const urlObj = new URL(url, 'http://localhost')
  const lang = (urlObj.searchParams.get('lang') || 'en') as SupportedLanguage
  const includeValidation = urlObj.searchParams.get('validation') === 'true'
  
  return culturalLEO.generateEnhancedEntityResponse(entityId, lang, includeValidation)
}

export async function generatePhilosophyProtocolResponse(protocolId: string, url: string): Promise<any> {
  const urlObj = new URL(url, 'http://localhost')
  const lang = (urlObj.searchParams.get('lang') || 'en') as SupportedLanguage
  
  return culturalLEO.generatePhilosophyProtocolResponse(protocolId, lang)
}

// Export for use in existing endpoints
export {
  type EnhancedEntityResponse,
  CulturalLEOIntegration
}