/**
 * Translation Management API Endpoints
 * RESTful API for translation workflow management with cultural preservation focus
 */

import { translationDb, type TranslationWorkflow, type ContentChange } from './database.ts'
import { FuzzyMatcher, type MatchContext, type EnhancedMatchResult } from './fuzzy-matcher.ts'
import { changeDetector } from './change-detector.ts'

export interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  metadata?: {
    timestamp: string
    version: string
    language?: string
  }
}

export interface TranslationRequest {
  sourceText: string
  sourceLanguage: string
  targetLanguage: string
  context?: MatchContext
  culturalSignificance?: 'high' | 'medium' | 'low'
}

export interface ValidationRequest {
  text: string
  language: string
  context?: string
}

export interface ValidationResult {
  isValid: boolean
  violations: Array<{
    rule: string
    severity: 'error' | 'warning' | 'info'
    message: string
    entity?: string
    suggestion?: string
  }>
  culturalNotes: string[]
}

export class TranslationAPI {
  private static readonly API_VERSION = '1.0.0'

  /**
   * GET /api/translation/workflows
   * Get active translation workflows with optional filtering
   */
  static async getWorkflows(params: {
    language?: string
    status?: string
    priority?: string
    culturalPriority?: string
    limit?: number
    offset?: number
  }): Promise<APIResponse<{
    workflows: TranslationWorkflow[]
    total: number
    hasMore: boolean
  }>> {
    try {
      const workflows = translationDb.getActiveWorkflows()
      
      // Apply filters
      let filteredWorkflows = workflows
      
      if (params.language) {
        filteredWorkflows = filteredWorkflows.filter(w => w.targetLanguage === params.language)
      }
      
      if (params.status) {
        filteredWorkflows = filteredWorkflows.filter(w => w.workflowStatus === params.status)
      }
      
      if (params.priority) {
        filteredWorkflows = filteredWorkflows.filter(w => w.priority === params.priority)
      }

      // Pagination
      const offset = params.offset || 0
      const limit = params.limit || 50
      const total = filteredWorkflows.length
      const paginatedWorkflows = filteredWorkflows.slice(offset, offset + limit)

      return {
        success: true,
        data: {
          workflows: paginatedWorkflows,
          total,
          hasMore: offset + limit < total
        },
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to fetch workflows')
    }
  }

  /**
   * GET /api/translation/workflows/:id
   * Get specific workflow details
   */
  static async getWorkflow(id: number): Promise<APIResponse<TranslationWorkflow>> {
    try {
      // Implementation would get specific workflow from database
      // For now, return from active workflows
      const workflows = translationDb.getActiveWorkflows()
      const workflow = workflows.find(w => w.id === id)

      if (!workflow) {
        return {
          success: false,
          error: 'Workflow not found',
          metadata: { timestamp: new Date().toISOString(), version: this.API_VERSION }
        }
      }

      return {
        success: true,
        data: workflow,
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to fetch workflow')
    }
  }

  /**
   * POST /api/translation/fuzzy-match
   * Find fuzzy matches for translation memory
   */
  static async findFuzzyMatches(request: TranslationRequest): Promise<APIResponse<EnhancedMatchResult[]>> {
    try {
      const context: MatchContext = request.context || {
        filePath: 'unknown',
        contentType: 'paragraph'
      }

      const matches = await FuzzyMatcher.findBestMatches(
        request.sourceText,
        request.sourceLanguage,
        request.targetLanguage,
        context
      )

      return {
        success: true,
        data: matches,
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION,
          language: request.targetLanguage
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to find fuzzy matches')
    }
  }

  /**
   * POST /api/translation/memory
   * Add translation to memory
   */
  static async addTranslation(translation: {
    sourceText: string
    sourceLanguage: string
    targetText: string
    targetLanguage: string
    sourceFilePath: string
    culturalSignificance?: 'high' | 'medium' | 'low'
    qualityScore?: number
    context?: MatchContext
  }): Promise<APIResponse<{ id: number }>> {
    try {
      const contextHash = translationDb.constructor.generateContextHash(
        translation.sourceText,
        translation.context ? JSON.stringify(translation.context) : undefined
      )

      // Extract cultural entities from source text
      const culturalEntities = this.extractCulturalEntities(translation.sourceText)
      const kevinSignificance = this.assessKevinSignificance(translation.sourceText)
      const trinityValidation = this.validateTrinityReferences(translation.sourceText, translation.targetText)

      const translationId = translationDb.addTranslation({
        sourceText: translation.sourceText,
        sourceLanguage: translation.sourceLanguage,
        targetText: translation.targetText,
        targetLanguage: translation.targetLanguage,
        contextHash,
        sourceFilePath: translation.sourceFilePath,
        culturalSignificance: translation.culturalSignificance || 'medium',
        qualityScore: translation.qualityScore || 0.8,
        fuzzyMatchThreshold: 0.85,
        entityReferences: culturalEntities,
        culturalContext: translation.context,
        trinityValidation,
        kevinSignificance,
        rarePepeConnection: this.hasRarePepeConnection(translation.sourceText)
      })

      return {
        success: true,
        data: { id: translationId },
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION,
          language: translation.targetLanguage
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to add translation')
    }
  }

  /**
   * POST /api/translation/validate
   * Validate translation against cultural preservation rules
   */
  static async validateTranslation(request: ValidationRequest): Promise<APIResponse<ValidationResult>> {
    try {
      const validationRules = translationDb.getValidationRules(request.language)
      const violations: ValidationResult['violations'] = []
      const culturalNotes: string[] = []

      for (const rule of validationRules) {
        const pattern = new RegExp(rule.sourcePattern, 'gi')
        const matches = request.text.match(pattern)

        if (matches) {
          // Apply validation function if exists
          const isValid = await this.applyValidationFunction(
            rule.validationFunction,
            request.text,
            matches,
            request.context
          )

          if (!isValid) {
            violations.push({
              rule: rule.ruleName,
              severity: rule.severity,
              message: rule.errorMessageTemplate || `Validation failed for rule: ${rule.ruleName}`,
              entity: rule.protectsEntity,
              suggestion: this.getValidationSuggestion(rule, matches)
            })
          }

          // Add cultural notes for protected entities
          if (rule.protectsEntity && rule.culturalReason) {
            culturalNotes.push(`${rule.protectsEntity}: ${rule.culturalReason}`)
          }
        }
      }

      return {
        success: true,
        data: {
          isValid: violations.filter(v => v.severity === 'error').length === 0,
          violations,
          culturalNotes
        },
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION,
          language: request.language
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to validate translation')
    }
  }

  /**
   * GET /api/translation/changes
   * Get pending content changes
   */
  static async getPendingChanges(): Promise<APIResponse<ContentChange[]>> {
    try {
      const changes = translationDb.getPendingChanges()
      
      return {
        success: true,
        data: changes,
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to fetch pending changes')
    }
  }

  /**
   * GET /api/translation/cultural-queue
   * Get cultural validation queue
   */
  static async getCulturalValidationQueue(): Promise<APIResponse<Array<{
    workflowId: number
    targetLanguage: string
    filePath: string
    culturalPriority: string
    entityName: string
    translationGuidelines: string
  }>>> {
    try {
      const queue = translationDb.getCulturalValidationQueue()
      
      return {
        success: true,
        data: queue,
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to fetch cultural validation queue')
    }
  }

  /**
   * PUT /api/translation/workflows/:id/status
   * Update workflow status
   */
  static async updateWorkflowStatus(
    id: number, 
    status: TranslationWorkflow['workflowStatus'],
    notes?: string
  ): Promise<APIResponse<{ updated: boolean }>> {
    try {
      // Implementation would update workflow status in database
      // For now, return success
      
      return {
        success: true,
        data: { updated: true },
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to update workflow status')
    }
  }

  /**
   * PUT /api/translation/workflows/:id/cultural-review
   * Update cultural review status
   */
  static async updateCulturalReview(
    id: number,
    reviewStatus: 'approved' | 'needs_revision',
    reviewer: string,
    notes?: string
  ): Promise<APIResponse<{ updated: boolean }>> {
    try {
      // Implementation would update cultural review in database
      
      return {
        success: true,
        data: { updated: true },
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to update cultural review')
    }
  }

  /**
   * GET /api/translation/stats
   * Get translation statistics
   */
  static async getStats(language?: string): Promise<APIResponse<Record<string, any>>> {
    try {
      const stats = translationDb.getTranslationStats(language)
      
      return {
        success: true,
        data: language ? stats[0] || {} : stats,
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION,
          language
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to fetch statistics')
    }
  }

  /**
   * GET /api/translation/entities/:id
   * Get cultural entity information
   */
  static async getCulturalEntity(id: string): Promise<APIResponse<any>> {
    try {
      const entity = translationDb.getCulturalEntity(id)
      
      if (!entity) {
        return {
          success: false,
          error: 'Entity not found',
          metadata: { timestamp: new Date().toISOString(), version: this.API_VERSION }
        }
      }

      return {
        success: true,
        data: entity,
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to fetch entity')
    }
  }

  /**
   * POST /api/translation/segment
   * Segment text for translation memory
   */
  static async segmentText(text: string, context: MatchContext): Promise<APIResponse<Array<{
    segment: string
    contextHash: string
    culturalEntities: string[]
  }>>> {
    try {
      const segments = FuzzyMatcher.segmentText(text, context)
      
      return {
        success: true,
        data: segments,
        metadata: {
          timestamp: new Date().toISOString(),
          version: this.API_VERSION
        }
      }
    } catch (error) {
      return this.errorResponse(error, 'Failed to segment text')
    }
  }

  // Helper methods

  private static extractCulturalEntities(text: string): string[] {
    const entities = []
    const lowerText = text.toLowerCase()

    const patterns = {
      kevin: /\bkevin\b/gi,
      mikeinspace: /\bmikeinspace\b/gi,
      arwyn: /\barwyn\b/gi,
      reinamora: /\breinamora\b/gi,
      counterparty: /\bcounterparty\b/gi,
      flooneybin: /\bflooneybin\b/gi,
      'rare-pepe': /\brare\s+pepe\b/gi,
      'src-20': /\bsrc-?20\b/gi,
      'bitcoin-stamps': /\bbitcoin\s+stamps\b/gi
    }

    for (const [entity, pattern] of Object.entries(patterns)) {
      if (pattern.test(text)) {
        entities.push(entity)
      }
    }

    return entities
  }

  private static assessKevinSignificance(text: string): 'none' | 'mention' | 'central' {
    const kevinMentions = (text.match(/\bkevin\b/gi) || []).length
    
    if (kevinMentions === 0) return 'none'
    if (kevinMentions >= 3 || text.toLowerCase().includes('kevin') && text.length < 200) return 'central'
    return 'mention'
  }

  private static validateTrinityReferences(sourceText: string, targetText: string): boolean {
    const trinityNames = ['mikeinspace', 'arwyn', 'reinamora']
    
    for (const name of trinityNames) {
      const sourceHas = sourceText.toLowerCase().includes(name.toLowerCase())
      const targetHas = targetText.toLowerCase().includes(name.toLowerCase())
      
      if (sourceHas && !targetHas) {
        return false // Trinity name was removed in translation
      }
    }
    
    return true
  }

  private static hasRarePepeConnection(text: string): boolean {
    const patterns = [
      /rare\s+pepe/gi,
      /pepe\s+culture/gi,
      /meme\s+magic/gi,
      /esoteric\s+roots/gi
    ]
    
    return patterns.some(pattern => pattern.test(text))
  }

  private static async applyValidationFunction(
    functionName?: string,
    text?: string,
    matches?: RegExpMatchArray,
    context?: string
  ): Promise<boolean> {
    if (!functionName) return true

    // Implement validation functions
    switch (functionName) {
      case 'validateKevinCapitalization':
        return this.validateKevinCapitalization(text, matches)
      
      case 'validateTrinityNames':
        return this.validateTrinityNames(text, matches)
      
      case 'validateRarePepeContext':
        return this.validateRarePepeContext(text, context)
      
      case 'validateFlooneybinContext':
        return this.validateFlooneybinContext(text, context)
      
      case 'validateProtocolConsistency':
        return this.validateProtocolConsistency(text, matches)
      
      default:
        return true
    }
  }

  private static validateKevinCapitalization(text?: string, matches?: RegExpMatchArray): boolean {
    if (!text || !matches) return true
    
    // Check if all KEVIN instances are properly capitalized
    const kevinMatches = text.match(/\bkevin\b/gi) || []
    return kevinMatches.every(match => match === 'KEVIN')
  }

  private static validateTrinityNames(text?: string, matches?: RegExpMatchArray): boolean {
    if (!text) return true
    
    // Check if Trinity names are preserved exactly
    const trinityPatterns = [
      { name: 'mikeinspace', pattern: /\bmikeinspace\b/g },
      { name: 'Arwyn', pattern: /\bArwyn\b/g },
      { name: 'Reinamora', pattern: /\bReinamora\b/g }
    ]

    for (const { name, pattern } of trinityPatterns) {
      const matches = text.match(pattern) || []
      const allMatches = text.match(new RegExp(`\\b${name}\\b`, 'gi')) || []
      
      // If found in different cases, it's invalid
      if (allMatches.length > matches.length) {
        return false
      }
    }

    return true
  }

  private static validateRarePepeContext(text?: string, context?: string): boolean {
    if (!text || !text.toLowerCase().includes('rare pepe')) return true
    
    // Check if cultural context is provided
    const hasContext = [
      'culture', 'heritage', 'tradition', 'background', 
      'origin', 'history', 'community', 'meme'
    ].some(term => text.toLowerCase().includes(term) || (context && context.toLowerCase().includes(term)))

    return hasContext
  }

  private static validateFlooneybinContext(text?: string, context?: string): boolean {
    if (!text || !text.toLowerCase().includes('flooneybin')) return true
    
    // Check if founding connection story context is provided
    const hasFoundingContext = [
      'trinity', 'founder', 'connect', 'brought together', 
      'counterparty', 'joe looney', 'founding'
    ].some(term => text.toLowerCase().includes(term) || (context && context.toLowerCase().includes(term)))

    return hasFoundingContext
  }

  private static validateProtocolConsistency(text?: string, matches?: RegExpMatchArray): boolean {
    if (!text || !matches) return true
    
    // Check consistent formatting of protocol names
    const protocols = ['SRC-20', 'SRC-101', 'SRC-721', 'OLGA']
    
    for (const protocol of protocols) {
      const standardMatches = text.match(new RegExp(`\\b${protocol}\\b`, 'g')) || []
      const allMatches = text.match(new RegExp(`\\b${protocol.replace('-', '-?')}\\b`, 'gi')) || []
      
      // If found in different formats, suggest consistency
      if (allMatches.length > standardMatches.length) {
        return false
      }
    }

    return true
  }

  private static getValidationSuggestion(rule: any, matches?: RegExpMatchArray): string {
    switch (rule.validationFunction) {
      case 'validateKevinCapitalization':
        return 'Use "KEVIN" (all caps) to preserve cultural significance'
      
      case 'validateTrinityNames':
        return 'Preserve exact capitalization: "mikeinspace", "Arwyn", "Reinamora"'
      
      case 'validateRarePepeContext':
        return 'Add cultural context explaining Rare Pepe heritage'
      
      case 'validateFlooneybinContext':
        return 'Include explanation of founding connection story'
      
      case 'validateProtocolConsistency':
        return 'Use consistent formatting: SRC-20, SRC-101, SRC-721, OLGA'
      
      default:
        return 'Follow cultural preservation guidelines'
    }
  }

  private static errorResponse(error: any, defaultMessage: string): APIResponse {
    const message = error instanceof Error ? error.message : defaultMessage
    
    return {
      success: false,
      error: message,
      metadata: {
        timestamp: new Date().toISOString(),
        version: this.API_VERSION
      }
    }
  }
}

// Export convenience functions for VitePress integration
export const translationAPI = TranslationAPI