/**
 * Cultural Validation and Quality Control Framework
 * Ensures cultural authenticity and translation quality across all languages
 */

import type { 
  SupportedLanguage, 
  MultiLangText 
} from './types.d.ts'

import { 
  getCulturalTranslation, 
  getPhilosophyTranslation,
  getRegionalCryptoContext,
  type CulturalEntityTranslation,
  type PhilosophyTranslation 
} from './cultural-translations.js'

import { entityTranslationDB, type EntityTranslation } from './entity-translations.js'

/**
 * Validation Rule Interface
 */
export interface ValidationRule {
  id: string
  name: string
  description: string
  severity: 'error' | 'warning' | 'info'
  category: 'cultural' | 'linguistic' | 'technical' | 'philosophical'
  validator: (data: any, language: SupportedLanguage) => ValidationResult
}

/**
 * Validation Result Interface
 */
export interface ValidationResult {
  passed: boolean
  message: string
  suggestions?: string[]
  context?: Record<string, any>
}

/**
 * Cultural Review Interface
 */
export interface CulturalReview {
  entityId: string
  language: SupportedLanguage
  reviewerId: string
  reviewDate: string
  status: 'pending' | 'approved' | 'needs-revision' | 'rejected'
  culturalAccuracy: 1 | 2 | 3 | 4 | 5  // 5 is highest
  linguisticQuality: 1 | 2 | 3 | 4 | 5
  sensitivityCheck: 'low' | 'medium' | 'high'
  comments: string
  suggestedChanges?: string[]
  approvedBy?: string[]
  issues?: ValidationIssue[]
}

/**
 * Validation Issue Interface
 */
export interface ValidationIssue {
  ruleId: string
  severity: 'error' | 'warning' | 'info'
  message: string
  field: string
  suggestions: string[]
  context?: Record<string, any>
}

/**
 * Cultural Validation Rules
 */
export const CULTURAL_VALIDATION_RULES: ValidationRule[] = [
  {
    id: 'kevin-proper-noun',
    name: 'KEVIN Name Preservation',
    description: 'Ensure KEVIN is never translated as it is a proper noun',
    severity: 'error',
    category: 'cultural',
    validator: (data: CulturalEntityTranslation, language: SupportedLanguage) => {
      if (data.id === 'kevin' && data.coreIdentity.name !== 'KEVIN') {
        return {
          passed: false,
          message: `KEVIN must remain "KEVIN" in all languages, found: ${data.coreIdentity.name}`,
          suggestions: ['Change name back to "KEVIN"']
        }
      }
      return { passed: true, message: 'KEVIN name correctly preserved' }
    }
  },
  
  {
    id: 'cultural-significance-consistency',
    name: 'Cultural Significance Consistency',
    description: 'Verify cultural significance is appropriately adapted for each region',
    severity: 'warning',
    category: 'cultural',
    validator: (data: CulturalEntityTranslation, language: SupportedLanguage) => {
      const regionalNotes = data.regionalNotes?.[language]
      
      if (!regionalNotes?.culturalAdaptation && data.id === 'kevin') {
        return {
          passed: false,
          message: `High-significance entity ${data.id} missing cultural adaptation for ${language}`,
          suggestions: [
            'Add cultural adaptation notes explaining local relevance',
            'Include region-specific cultural context',
            'Consider local cultural references or parallels'
          ]
        }
      }
      return { passed: true, message: 'Cultural adaptation appropriately provided' }
    }
  },
  
  {
    id: 'philosophy-authenticity',
    name: 'Philosophy Translation Authenticity',
    description: 'Ensure philosophical concepts maintain their meaning across cultures',
    severity: 'error',
    category: 'philosophical',
    validator: (data: PhilosophyTranslation, language: SupportedLanguage) => {
      const translation = data.translations[language]
      const interpretation = data.culturalInterpretation[language]
      
      if (!translation || !interpretation) {
        return {
          passed: false,
          message: `Philosophy ${data.id} missing translation or interpretation for ${language}`,
          suggestions: [
            'Provide accurate translation maintaining original meaning',
            'Add cultural interpretation explaining significance in local context',
            'Consult with native speakers familiar with the philosophy'
          ]
        }
      }
      
      // Check for common philosophy translation issues
      if (data.id === 'in-lakech' && !translation.includes('another')) {
        return {
          passed: false,
          message: 'In Lak\'ech translation should maintain core concept of "another self"',
          suggestions: ['Ensure translation includes the reciprocal "another self" concept']
        }
      }
      
      return { passed: true, message: 'Philosophy translation maintains authenticity' }
    }
  },
  
  {
    id: 'crypto-terminology-accuracy',
    name: 'Crypto Terminology Accuracy',
    description: 'Verify crypto terms are appropriately localized for regional contexts',
    severity: 'warning',
    category: 'technical',
    validator: (data: any, language: SupportedLanguage) => {
      const cryptoContext = getRegionalCryptoContext(language)
      
      if (!cryptoContext) {
        return {
          passed: false,
          message: `Missing regional crypto context for ${language}`,
          suggestions: ['Define regional crypto terminology and context']
        }
      }
      
      // Check for common crypto term inconsistencies
      const issues: string[] = []
      
      if (language === 'zh') {
        if (data.description?.includes('blockchain') && !data.description.includes('区块链')) {
          issues.push('Consider using localized term "区块链" for blockchain in Chinese')
        }
      }
      
      if (language === 'es') {
        if (data.description?.includes('token') && data.description.includes('ficha')) {
          issues.push('Prefer "token" over "ficha" in Latin American crypto context')
        }
      }
      
      if (issues.length > 0) {
        return {
          passed: false,
          message: 'Crypto terminology could be improved',
          suggestions: issues
        }
      }
      
      return { passed: true, message: 'Crypto terminology appropriately localized' }
    }
  },
  
  {
    id: 'sensitivity-check',
    name: 'Cultural Sensitivity Check',
    description: 'Ensure content is culturally appropriate and sensitive',
    severity: 'error',
    category: 'cultural',
    validator: (data: CulturalEntityTranslation, language: SupportedLanguage) => {
      const regionalNotes = data.regionalNotes?.[language]
      
      // Check for sensitivity notes on high-significance entities
      if (data.coreIdentity.name === 'KEVIN' || data.id === 'bitcoin-stamps') {
        if (!regionalNotes?.sensitivityNotes) {
          return {
            passed: false,
            message: `High-significance entity ${data.id} missing sensitivity notes for ${language}`,
            suggestions: [
              'Add cultural sensitivity guidelines',
              'Note any topics to avoid or handle carefully',
              'Consider regulatory or cultural sensitivities'
            ]
          }
        }
      }
      
      // Language-specific sensitivity checks
      if (language === 'zh' && data.description) {
        const description = Object.values(data.descriptions).join(' ')
        if (description.toLowerCase().includes('政治') || description.toLowerCase().includes('政府')) {
          return {
            passed: false,
            message: 'Avoid political references in Chinese translations',
            suggestions: ['Remove or rephrase political content', 'Focus on technical and artistic aspects']
          }
        }
      }
      
      return { passed: true, message: 'Content passes cultural sensitivity check' }
    }
  },
  
  {
    id: 'community-values-alignment',
    name: 'Community Values Alignment',
    description: 'Ensure translations align with Bitcoin Stamps community values',
    severity: 'warning',
    category: 'cultural',
    validator: (data: CulturalEntityTranslation, language: SupportedLanguage) => {
      const description = data.descriptions[language]
      const context = data.culturalContext[language]
      
      if (!description || !context) {
        return { passed: true, message: 'Validation skipped - missing translation data' }
      }
      
      // Check for key community values
      const coreValues = [
        'authenticity', 'community', 'artistic', 'permanent', 'decentralized'
      ]
      
      const valueTranslations = {
        en: coreValues,
        es: ['autenticidad', 'comunidad', 'artístico', 'permanente', 'descentralizado'],
        fr: ['authenticité', 'communauté', 'artistique', 'permanent', 'décentralisé'],
        zh: ['真实性', '社区', '艺术', '永久', '去中心化']
      }
      
      const expectedValues = valueTranslations[language] || valueTranslations.en
      const combinedText = `${description} ${context}`.toLowerCase()
      
      const missingValues = expectedValues.filter(value => 
        !combinedText.includes(value.toLowerCase())
      )
      
      if (missingValues.length > 2) {
        return {
          passed: false,
          message: `Translation may not adequately convey community values`,
          suggestions: [
            `Consider incorporating concepts: ${missingValues.join(', ')}`,
            'Ensure community values are reflected in the description',
            'Review original content for key value propositions'
          ],
          context: { missingValues }
        }
      }
      
      return { passed: true, message: 'Translation aligns with community values' }
    }
  }
]

/**
 * Cultural Validation Framework
 */
export class CulturalValidationFramework {
  private reviews: Map<string, CulturalReview[]> = new Map()
  private rules: ValidationRule[] = CULTURAL_VALIDATION_RULES
  
  /**
   * Validate an entity translation
   */
  validateEntity(entityId: string, language: SupportedLanguage): ValidationIssue[] {
    const translation = entityTranslationDB.getTranslation(entityId)
    const issues: ValidationIssue[] = []
    
    if (!translation) {
      issues.push({
        ruleId: 'entity-exists',
        severity: 'error',
        message: `Entity ${entityId} not found in translation database`,
        field: 'entity',
        suggestions: ['Create entity translation entry']
      })
      return issues
    }
    
    // Get cultural and philosophy data for validation
    const cultural = translation.cultural
    const philosophies = translation.philosophies
    
    // Run cultural validation rules
    for (const rule of this.rules) {
      if (rule.category === 'cultural' || rule.category === 'philosophical') {
        const data = rule.category === 'cultural' ? cultural : philosophies?.[0]
        
        if (data) {
          const result = rule.validator(data, language)
          
          if (!result.passed) {
            issues.push({
              ruleId: rule.id,
              severity: rule.severity,
              message: result.message,
              field: rule.category,
              suggestions: result.suggestions || [],
              context: result.context
            })
          }
        }
      }
    }
    
    return issues
  }
  
  /**
   * Validate all entity translations
   */
  validateAllEntities(): Record<string, Record<SupportedLanguage, ValidationIssue[]>> {
    const results: Record<string, Record<SupportedLanguage, ValidationIssue[]>> = {}
    const languages: SupportedLanguage[] = ['en', 'es', 'fr', 'zh']
    
    // Get all entity IDs from the translation database
    const entityStats = entityTranslationDB.getTranslationStats()
    const allTranslations = entityTranslationDB.exportTranslations()
    
    for (const entityId of Object.keys(allTranslations)) {
      results[entityId] = {}
      
      for (const language of languages) {
        results[entityId][language] = this.validateEntity(entityId, language)
      }
    }
    
    return results
  }
  
  /**
   * Create a cultural review
   */
  createReview(review: Omit<CulturalReview, 'reviewDate'>): CulturalReview {
    const fullReview: CulturalReview = {
      ...review,
      reviewDate: new Date().toISOString()
    }
    
    const entityReviews = this.reviews.get(review.entityId) || []
    entityReviews.push(fullReview)
    this.reviews.set(review.entityId, entityReviews)
    
    return fullReview
  }
  
  /**
   * Get reviews for an entity
   */
  getReviews(entityId: string, language?: SupportedLanguage): CulturalReview[] {
    const reviews = this.reviews.get(entityId) || []
    
    if (language) {
      return reviews.filter(review => review.language === language)
    }
    
    return reviews
  }
  
  /**
   * Get review statistics
   */
  getReviewStats(): {
    totalReviews: number
    byLanguage: Record<SupportedLanguage, number>
    byStatus: Record<CulturalReview['status'], number>
    averageRatings: {
      culturalAccuracy: number
      linguisticQuality: number
    }
    pendingReviews: CulturalReview[]
  } {
    const allReviews = Array.from(this.reviews.values()).flat()
    
    const byLanguage: Record<SupportedLanguage, number> = { en: 0, es: 0, fr: 0, zh: 0 }
    const byStatus: Record<CulturalReview['status'], number> = {
      pending: 0,
      approved: 0,
      'needs-revision': 0,
      rejected: 0
    }
    
    let totalCulturalAccuracy = 0
    let totalLinguisticQuality = 0
    
    for (const review of allReviews) {
      byLanguage[review.language]++
      byStatus[review.status]++
      totalCulturalAccuracy += review.culturalAccuracy
      totalLinguisticQuality += review.linguisticQuality
    }
    
    const pendingReviews = allReviews.filter(review => review.status === 'pending')
    
    return {
      totalReviews: allReviews.length,
      byLanguage,
      byStatus,
      averageRatings: {
        culturalAccuracy: allReviews.length > 0 ? totalCulturalAccuracy / allReviews.length : 0,
        linguisticQuality: allReviews.length > 0 ? totalLinguisticQuality / allReviews.length : 0
      },
      pendingReviews
    }
  }
  
  /**
   * Generate validation report
   */
  generateValidationReport(): {
    summary: {
      totalEntities: number
      validationErrors: number
      validationWarnings: number
      culturallyValidated: number
      pendingReviews: number
    }
    entityResults: Record<string, {
      status: 'valid' | 'has-warnings' | 'has-errors'
      issues: ValidationIssue[]
      reviews: CulturalReview[]
    }>
    recommendations: string[]
  } {
    const validationResults = this.validateAllEntities()
    const reviewStats = this.getReviewStats()
    
    let totalErrors = 0
    let totalWarnings = 0
    const entityResults: Record<string, any> = {}
    const recommendations: string[] = []
    
    for (const [entityId, languageResults] of Object.entries(validationResults)) {
      const allIssues = Object.values(languageResults).flat()
      const errors = allIssues.filter(issue => issue.severity === 'error')
      const warnings = allIssues.filter(issue => issue.severity === 'warning')
      
      totalErrors += errors.length
      totalWarnings += warnings.length
      
      let status: 'valid' | 'has-warnings' | 'has-errors' = 'valid'
      if (errors.length > 0) status = 'has-errors'
      else if (warnings.length > 0) status = 'has-warnings'
      
      entityResults[entityId] = {
        status,
        issues: allIssues,
        reviews: this.getReviews(entityId)
      }
    }
    
    // Generate recommendations
    if (totalErrors > 0) {
      recommendations.push(`Address ${totalErrors} validation errors before deployment`)
    }
    
    if (reviewStats.pendingReviews.length > 0) {
      recommendations.push(`Complete ${reviewStats.pendingReviews.length} pending cultural reviews`)
    }
    
    if (reviewStats.averageRatings.culturalAccuracy < 4) {
      recommendations.push('Improve cultural accuracy - consider expert cultural review')
    }
    
    return {
      summary: {
        totalEntities: Object.keys(validationResults).length,
        validationErrors: totalErrors,
        validationWarnings: totalWarnings,
        culturallyValidated: reviewStats.byStatus.approved,
        pendingReviews: reviewStats.pendingReviews.length
      },
      entityResults,
      recommendations
    }
  }
  
  /**
   * Add custom validation rule
   */
  addValidationRule(rule: ValidationRule): void {
    this.rules.push(rule)
  }
  
  /**
   * Export validation data for external tools
   */
  exportValidationData(): {
    rules: ValidationRule[]
    reviews: Record<string, CulturalReview[]>
    validationResults: Record<string, Record<SupportedLanguage, ValidationIssue[]>>
  } {
    return {
      rules: this.rules,
      reviews: Object.fromEntries(this.reviews.entries()),
      validationResults: this.validateAllEntities()
    }
  }
}

// Singleton instance
export const culturalValidator = new CulturalValidationFramework()

// Initialize with sample reviews for demonstration
culturalValidator.createReview({
  entityId: 'kevin',
  language: 'en',
  reviewerId: 'community-lead',
  status: 'approved',
  culturalAccuracy: 5,
  linguisticQuality: 5,
  sensitivityCheck: 'high',
  comments: 'Perfect preservation of KEVIN cultural significance and community values',
  approvedBy: ['Bitcoin Stamps Community', 'Cultural Review Board']
})

culturalValidator.createReview({
  entityId: 'kevin',
  language: 'zh',
  reviewerId: 'chinese-community-lead',
  status: 'approved',
  culturalAccuracy: 4,
  linguisticQuality: 4,
  sensitivityCheck: 'high',
  comments: 'Good cultural adaptation while maintaining core identity. Icon symbolism works well in Chinese context.',
  suggestedChanges: ['Consider adding reference to "招财猫" cultural parallel'],
  approvedBy: ['Chinese Community Representative']
})

export {
  type ValidationRule,
  type ValidationResult,
  type ValidationIssue,
  type CulturalReview,
  CULTURAL_VALIDATION_RULES
}