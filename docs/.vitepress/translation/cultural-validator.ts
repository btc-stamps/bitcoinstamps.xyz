/**
 * Cultural Validation System for Translation Management
 * Ensures preservation of KEVIN, Trinity, and Rare Pepe cultural references
 */

import { translationDb, type CulturalEntity, type ValidationRule } from './database.ts'

export interface CulturalValidationContext {
  sourceText: string
  targetText: string
  sourceLanguage: string
  targetLanguage: string
  filePath: string
  contentType: 'title' | 'heading' | 'paragraph' | 'list_item' | 'metadata'
}

export interface CulturalViolation {
  entityId: string
  entityName: string
  violationType: 'name_changed' | 'context_lost' | 'significance_reduced' | 'reference_removed'
  severity: 'critical' | 'major' | 'minor'
  description: string
  originalText: string
  problematicText: string
  suggestion: string
  culturalReason: string
}

export interface CulturalValidationResult {
  isValid: boolean
  preservationScore: number // 0-100, higher is better
  violations: CulturalViolation[]
  enhancements: Array<{
    suggestion: string
    reason: string
    priority: 'high' | 'medium' | 'low'
  }>
  culturalNotes: string[]
  trinityValidation: {
    allMembersPreserved: boolean
    connectionsPreserved: boolean
    foundingStoryIntact: boolean
  }
  kevinValidation: {
    namePreserved: boolean
    culturalSignificancePreserved: boolean
    rarePepeConnectionMaintained: boolean
    src20HistoryIntact: boolean
  }
}

export class CulturalValidator {
  private static readonly TRINITY_MEMBERS = {
    mikeinspace: {
      name: 'mikeinspace',
      role: 'Original Dreamer and Visionary Founder',
      preserveCase: true,
      keyPhrases: ['original dreamer', 'visionary', 'first stamp', 'founding documents']
    },
    arwyn: {
      name: 'Arwyn',
      role: 'Orchestrator and Magician, Cultural Creator',  
      preserveCase: true,
      keyPhrases: ['orchestrator', 'magician', 'KEVIN creator', 'rare pepe', 'meme magic']
    },
    reinamora: {
      name: 'Reinamora',
      role: 'Technical Architect and Protocol Developer',
      preserveCase: true,
      keyPhrases: ['technical architect', 'protocol developer', 'src-20', 'src-101', 'src-721', 'olga']
    }
  }

  private static readonly KEVIN_PATTERNS = {
    nameVariations: [/\bkevin\b/gi, /\bKEVIN\b/g, /\bKevin\b/g],
    culturalContext: [
      /first\s+src-?20/gi,
      /beloved\s+mascot/gi,
      /community\s+mascot/gi,
      /rare\s+pepe.*homage/gi,
      /ghost.*machine/gi,
      /self-replicat/gi,
      /organic.*meme/gi
    ],
    historicalRefs: [
      /stamp\s+#?4258/gi,
      /block\s+783718/gi,
      /stamp\s+#?18516/gi,
      /block\s+788041/gi,
      /arwyn.*created/gi
    ]
  }

  private static readonly CULTURAL_CONNECTIONS = {
    flooneybin: {
      requiredContext: ['counterparty', 'joe looney', 'trinity', 'connection', 'founding'],
      description: 'Flooneybin meme project where Bitcoin Stamps founders first connected'
    },
    rarePepe: {
      requiredContext: ['culture', 'heritage', 'meme magic', 'esoteric', 'community'],
      description: 'Rare Pepe cultural heritage foundational to Bitcoin Stamps'
    },
    counterparty: {
      requiredContext: ['protocol', 'metaprotocol', 'bitcoin', 'foundation', 'enables'],
      description: 'Counterparty protocol as the foundation enabling Bitcoin Stamps'
    }
  }

  /**
   * Validate cultural preservation in translation
   */
  static async validateTranslation(context: CulturalValidationContext): Promise<CulturalValidationResult> {
    const violations: CulturalViolation[] = []
    const enhancements: CulturalValidationResult['enhancements'] = []
    const culturalNotes: string[] = []

    // Validate KEVIN preservation
    const kevinValidation = this.validateKevinPreservation(context, violations, enhancements)
    
    // Validate Trinity preservation
    const trinityValidation = this.validateTrinityPreservation(context, violations, enhancements)
    
    // Validate cultural connections
    this.validateCulturalConnections(context, violations, enhancements)
    
    // Validate protocol references
    this.validateProtocolReferences(context, violations, enhancements)
    
    // Generate cultural notes
    this.generateCulturalNotes(context, culturalNotes)
    
    // Calculate preservation score
    const preservationScore = this.calculatePreservationScore(violations, context)

    return {
      isValid: violations.filter(v => v.severity === 'critical').length === 0,
      preservationScore,
      violations,
      enhancements,
      culturalNotes,
      trinityValidation,
      kevinValidation
    }
  }

  /**
   * Validate KEVIN cultural preservation
   */
  private static validateKevinPreservation(
    context: CulturalValidationContext, 
    violations: CulturalViolation[],
    enhancements: CulturalValidationResult['enhancements']
  ): CulturalValidationResult['kevinValidation'] {
    const sourceHasKevin = this.KEVIN_PATTERNS.nameVariations.some(pattern => pattern.test(context.sourceText))
    
    if (!sourceHasKevin) {
      return {
        namePreserved: true,
        culturalSignificancePreserved: true,
        rarePepeConnectionMaintained: true,
        src20HistoryIntact: true
      }
    }

    // Check name preservation (must be KEVIN in all caps)
    const sourceKevinMatches = context.sourceText.match(/\bKEVIN\b/g) || []
    const targetKevinMatches = context.targetText.match(/\bKEVIN\b/g) || []
    const targetKevinWrong = context.targetText.match(/\b(kevin|Kevin)\b/gi) || []
    
    const namePreserved = sourceKevinMatches.length <= targetKevinMatches.length && targetKevinWrong.length === 0

    if (!namePreserved) {
      violations.push({
        entityId: 'kevin',
        entityName: 'KEVIN',
        violationType: 'name_changed',
        severity: 'critical',
        description: 'KEVIN name must be preserved in ALL CAPS',
        originalText: 'KEVIN',
        problematicText: targetKevinWrong.join(', ') || 'missing',
        suggestion: 'Use "KEVIN" (all capitals) to preserve cultural significance',
        culturalReason: 'KEVIN is the beloved community mascot and must maintain its distinctive capitalization'
      })
    }

    // Check cultural context preservation
    const culturalContextPreserved = this.KEVIN_PATTERNS.culturalContext.some(pattern =>
      pattern.test(context.sourceText) === pattern.test(context.targetText)
    )

    if (context.sourceText.toLowerCase().includes('kevin') && !culturalContextPreserved) {
      enhancements.push({
        suggestion: 'Add cultural context about KEVIN being the beloved community mascot and first SRC-20 token',
        reason: 'KEVIN references should include cultural context for international audiences',
        priority: 'high'
      })
    }

    // Check Rare Pepe connection
    const sourceRarePepe = /rare\s+pepe/gi.test(context.sourceText)
    const targetRarePepe = /rare\s+pepe/gi.test(context.targetText)
    const rarePepeConnectionMaintained = !sourceRarePepe || targetRarePepe

    if (sourceRarePepe && !rarePepeConnectionMaintained) {
      violations.push({
        entityId: 'kevin',
        entityName: 'KEVIN',
        violationType: 'context_lost',
        severity: 'major',
        description: 'KEVIN\'s connection to Rare Pepe culture lost in translation',
        originalText: 'Rare Pepe connection',
        problematicText: 'connection removed',
        suggestion: 'Preserve and explain the Rare Pepe cultural heritage connection',
        culturalReason: 'KEVIN\'s origin as a Rare Pepe homage is foundational to its cultural significance'
      })
    }

    // Check SRC-20 history
    const sourceSrc20 = /first\s+src-?20/gi.test(context.sourceText)
    const targetSrc20 = /first\s+src-?20/gi.test(context.targetText) || /premier\s+src-?20/gi.test(context.targetText)
    const src20HistoryIntact = !sourceSrc20 || targetSrc20

    return {
      namePreserved,
      culturalSignificancePreserved: culturalContextPreserved,
      rarePepeConnectionMaintained,
      src20HistoryIntact
    }
  }

  /**
   * Validate Trinity (mikeinspace, Arwyn, Reinamora) preservation
   */
  private static validateTrinityPreservation(
    context: CulturalValidationContext,
    violations: CulturalViolation[],
    enhancements: CulturalValidationResult['enhancements']
  ): CulturalValidationResult['trinityValidation'] {
    let allMembersPreserved = true
    let connectionsPreserved = true
    let foundingStoryIntact = true

    for (const [memberId, member] of Object.entries(this.TRINITY_MEMBERS)) {
      const sourcePattern = new RegExp(`\\b${member.name}\\b`, 'g')
      const sourceMatches = context.sourceText.match(sourcePattern) || []
      const targetMatches = context.targetText.match(sourcePattern) || []

      // Check name preservation
      if (sourceMatches.length > 0 && targetMatches.length === 0) {
        allMembersPreserved = false
        violations.push({
          entityId: memberId,
          entityName: member.name,
          violationType: 'reference_removed',
          severity: 'critical',
          description: `Trinity member ${member.name} reference removed in translation`,
          originalText: member.name,
          problematicText: 'removed',
          suggestion: `Preserve "${member.name}" exactly as written`,
          culturalReason: `${member.name} is a founding member of the Trinity - essential to Bitcoin Stamps history`
        })
      }

      // Check role preservation
      for (const phrase of member.keyPhrases) {
        const phrasePattern = new RegExp(phrase, 'gi')
        const sourceHasPhrase = phrasePattern.test(context.sourceText)
        const targetHasPhrase = phrasePattern.test(context.targetText)

        if (sourceHasPhrase && !targetHasPhrase) {
          connectionsPreserved = false
          enhancements.push({
            suggestion: `Preserve ${member.name}'s role context: ${member.role}`,
            reason: `Essential to understanding ${member.name}'s contribution to Bitcoin Stamps`,
            priority: 'high'
          })
        }
      }
    }

    // Check founding story connections
    const foundingPatterns = [
      /trinity/gi,
      /three\s+founders/gi,
      /founding\s+team/gi,
      /brought\s+together/gi,
      /flooneybin.*connect/gi
    ]

    const foundingStoryElements = foundingPatterns.filter(pattern =>
      pattern.test(context.sourceText) && !pattern.test(context.targetText)
    )

    if (foundingStoryElements.length > 0) {
      foundingStoryIntact = false
      enhancements.push({
        suggestion: 'Preserve the founding story connections between Trinity members',
        reason: 'The founding narrative is crucial cultural heritage',
        priority: 'high'
      })
    }

    return {
      allMembersPreserved,
      connectionsPreserved,
      foundingStoryIntact
    }
  }

  /**
   * Validate cultural connections (Flooneybin, Rare Pepe, etc.)
   */
  private static validateCulturalConnections(
    context: CulturalValidationContext,
    violations: CulturalViolation[],
    enhancements: CulturalValidationResult['enhancements']
  ): void {
    for (const [connectionId, connection] of Object.entries(this.CULTURAL_CONNECTIONS)) {
      const connectionPattern = new RegExp(`\\b${connectionId}\\b`, 'gi')
      const sourceHasConnection = connectionPattern.test(context.sourceText)

      if (sourceHasConnection) {
        // Check if required context is preserved
        const contextPreserved = connection.requiredContext.some(contextTerm =>
          context.targetText.toLowerCase().includes(contextTerm)
        )

        if (!contextPreserved) {
          enhancements.push({
            suggestion: `Add cultural context for ${connectionId}: ${connection.description}`,
            reason: `${connectionId} references need cultural context for international audiences`,
            priority: 'medium'
          })
        }
      }
    }
  }

  /**
   * Validate protocol reference consistency
   */
  private static validateProtocolReferences(
    context: CulturalValidationContext,
    violations: CulturalViolation[],
    enhancements: CulturalValidationResult['enhancements']
  ): void {
    const protocols = ['SRC-20', 'SRC-101', 'SRC-721', 'OLGA']
    
    for (const protocol of protocols) {
      const standardPattern = new RegExp(`\\b${protocol}\\b`, 'g')
      const loosePattern = new RegExp(`\\b${protocol.replace('-', '[-\\s]?')}\\b`, 'gi')
      
      const sourceStandard = context.sourceText.match(standardPattern) || []
      const targetStandard = context.targetText.match(standardPattern) || []
      const targetLoose = context.targetText.match(loosePattern) || []

      // Check for inconsistent formatting
      if (sourceStandard.length > 0 && targetLoose.length > targetStandard.length) {
        violations.push({
          entityId: 'protocols',
          entityName: protocol,
          violationType: 'name_changed',
          severity: 'minor',
          description: `Protocol name ${protocol} formatting inconsistent`,
          originalText: protocol,
          problematicText: 'inconsistent formatting',
          suggestion: `Use standard formatting: ${protocol}`,
          culturalReason: 'Consistent protocol naming maintains technical accuracy'
        })
      }
    }
  }

  /**
   * Generate cultural preservation notes
   */
  private static generateCulturalNotes(
    context: CulturalValidationContext,
    notes: string[]
  ): void {
    const entities = this.detectCulturalEntities(context.sourceText)

    if (entities.includes('kevin')) {
      notes.push('⭐ KEVIN is the beloved community mascot - preserve ALL CAPS and cultural significance')
      notes.push('🎭 KEVIN originated as a Rare Pepe homage and became the first SRC-20 token')
    }

    const trinityMembers = entities.filter(e => ['mikeinspace', 'arwyn', 'reinamora'].includes(e))
    if (trinityMembers.length > 0) {
      notes.push('👥 Trinity founder names must be preserved exactly - these are the three founding creators')
      notes.push('📜 The Trinity formation story through Flooneybin is foundational cultural heritage')
    }

    if (entities.includes('rare-pepe') || context.sourceText.toLowerCase().includes('rare pepe')) {
      notes.push('🐸 Rare Pepe culture is foundational heritage - provide context for international audiences')
    }

    if (context.sourceText.toLowerCase().includes('flooneybin')) {
      notes.push('🎪 Flooneybin connection story is crucial - explain how it brought the Trinity together')
    }

    if (context.culturalSignificance === 'high' || context.contentType === 'title') {
      notes.push('🌟 High cultural significance content - extra care needed for preservation')
    }
  }

  /**
   * Calculate cultural preservation score
   */
  private static calculatePreservationScore(
    violations: CulturalViolation[],
    context: CulturalValidationContext
  ): number {
    let baseScore = 100
    
    // Deduct for violations
    for (const violation of violations) {
      switch (violation.severity) {
        case 'critical':
          baseScore -= 30
          break
        case 'major':
          baseScore -= 15
          break
        case 'minor':
          baseScore -= 5
          break
      }
    }

    // Bonus for high cultural significance content
    if (context.contentType === 'title' || context.filePath.includes('/narratives/')) {
      baseScore += 10
    }

    return Math.max(0, Math.min(100, baseScore))
  }

  /**
   * Detect cultural entities in text
   */
  private static detectCulturalEntities(text: string): string[] {
    const entities: string[] = []
    const lowerText = text.toLowerCase()

    const patterns = {
      kevin: /\bkevin\b/gi,
      mikeinspace: /\bmikeinspace\b/gi,
      arwyn: /\barwyn\b/gi,
      reinamora: /\breinamora\b/gi,
      'rare-pepe': /\brare\s+pepe\b/gi,
      flooneybin: /\bflooneybin\b/gi,
      counterparty: /\bcounterparty\b/gi,
      'bitcoin-stamps': /\bbitcoin\s+stamps\b/gi
    }

    for (const [entity, pattern] of Object.entries(patterns)) {
      if (pattern.test(text)) {
        entities.push(entity)
      }
    }

    return entities
  }

  /**
   * Get validation guidelines for specific entity
   */
  static getEntityGuidelines(entityId: string): string | null {
    const entity = translationDb.getCulturalEntity(entityId)
    return entity?.translationGuidelines || null
  }

  /**
   * Batch validate multiple translations
   */
  static async validateBatch(contexts: CulturalValidationContext[]): Promise<CulturalValidationResult[]> {
    const results: CulturalValidationResult[] = []
    
    for (const context of contexts) {
      const result = await this.validateTranslation(context)
      results.push(result)
    }

    return results
  }

  /**
   * Generate cultural preservation report
   */
  static generatePreservationReport(results: CulturalValidationResult[]): {
    overallScore: number
    criticalViolations: number
    recommendedActions: string[]
    culturalHealthStatus: 'excellent' | 'good' | 'needs_attention' | 'critical'
  } {
    const overallScore = results.reduce((sum, r) => sum + r.preservationScore, 0) / results.length
    const criticalViolations = results.reduce((sum, r) => 
      sum + r.violations.filter(v => v.severity === 'critical').length, 0
    )

    const recommendedActions: string[] = []
    const allEnhancements = results.flatMap(r => r.enhancements)
    
    // Deduplicate and prioritize recommendations
    const uniqueActions = new Map<string, number>()
    for (const enhancement of allEnhancements) {
      const count = uniqueActions.get(enhancement.suggestion) || 0
      uniqueActions.set(enhancement.suggestion, count + 1)
    }

    // Top 5 recommendations
    Array.from(uniqueActions.entries())
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .forEach(([action]) => recommendedActions.push(action))

    let culturalHealthStatus: 'excellent' | 'good' | 'needs_attention' | 'critical'
    if (overallScore >= 90 && criticalViolations === 0) culturalHealthStatus = 'excellent'
    else if (overallScore >= 75 && criticalViolations <= 2) culturalHealthStatus = 'good'
    else if (overallScore >= 60 && criticalViolations <= 5) culturalHealthStatus = 'needs_attention'
    else culturalHealthStatus = 'critical'

    return {
      overallScore,
      criticalViolations,
      recommendedActions,
      culturalHealthStatus
    }
  }
}

// Export already defined in class declaration above