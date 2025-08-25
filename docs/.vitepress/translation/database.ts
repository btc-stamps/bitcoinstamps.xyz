/**
 * Translation Management Database Layer
 * SQLite database interface with cultural preservation focus
 */

import Database from 'better-sqlite3'
import { readFileSync } from 'fs'
import { join } from 'path'
import { createHash } from 'crypto'

export interface TranslationMemoryEntry {
  id?: number
  sourceText: string
  sourceLanguage: string
  targetText: string
  targetLanguage: string
  contextHash: string
  sourceFilePath: string
  culturalSignificance: 'high' | 'medium' | 'low'
  qualityScore: number
  fuzzyMatchThreshold: number
  entityReferences?: string[]
  culturalContext?: Record<string, any>
  trinityValidation: boolean
  kevinSignificance: 'none' | 'mention' | 'central'
  rarePepeConnection: boolean
  createdAt?: string
  updatedAt?: string
  validatedAt?: string
  validatorNotes?: string
}

export interface ContentChange {
  id?: number
  filePath: string
  changeType: 'created' | 'modified' | 'deleted' | 'moved'
  gitCommitHash?: string
  gitBranch: string
  changeSummary?: string
  contentBefore?: string
  contentAfter?: string
  diffText?: string
  affectsKevin: boolean
  affectsTrinity: boolean
  affectsRarePepe: boolean
  culturalPriority: 'low' | 'medium' | 'high' | 'critical'
  requiresRetranslation: boolean
  affectedLanguages?: string[]
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed'
  detectedAt?: string
  processedAt?: string
}

export interface TranslationWorkflow {
  id?: number
  changeId: number
  sourceLanguage: string
  targetLanguage: string
  workflowStatus: 'pending' | 'in_progress' | 'review' | 'approved' | 'rejected'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  totalSegments: number
  translatedSegments: number
  validatedSegments: number
  progressPercentage: number
  culturalReviewRequired: boolean
  culturalReviewer?: string
  culturalReviewStatus: 'pending' | 'approved' | 'needs_revision'
  culturalReviewNotes?: string
  autoTranslationUsed: boolean
  humanReviewRequired: boolean
  estimatedCompletion?: string
  createdAt?: string
  updatedAt?: string
  completedAt?: string
}

export interface CulturalEntity {
  id?: number
  entityId: string
  entityName: string
  entityType: 'founder' | 'mascot' | 'protocol' | 'cultural_icon' | 'narrative'
  culturalSignificance: 'high' | 'medium' | 'low'
  preserveName: boolean
  requireContext: boolean
  translationGuidelines?: string
  mentionCount: number
  lastMentioned?: string
  trinityMember: boolean
  rarePepeConnected: boolean
  foundingStoryElement: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ValidationRule {
  id?: number
  ruleName: string
  ruleType: 'cultural_preservation' | 'consistency' | 'terminology' | 'format'
  sourcePattern: string
  targetPattern?: string
  validationFunction?: string
  appliesToLanguages?: string[]
  severity: 'error' | 'warning' | 'info'
  errorMessageTemplate?: string
  protectsEntity?: string
  culturalReason?: string
  active: boolean
  createdAt?: string
}

export interface FuzzyMatchResult {
  sourceText: string
  targetText: string
  matchScore: number
  culturalContext?: Record<string, any>
  usageCount: number
  confidenceScore: number
}

export class TranslationDatabase {
  private db: Database.Database
  private schemaPath: string

  constructor(dbPath?: string) {
    const defaultPath = join(process.cwd(), 'docs/.vitepress/translation/translations.db')
    this.db = new Database(dbPath || defaultPath)
    this.schemaPath = join(process.cwd(), 'docs/.vitepress/translation/schema.sql')
    
    // Enable foreign keys and optimizations
    this.db.pragma('foreign_keys = ON')
    this.db.pragma('journal_mode = WAL')
    this.db.pragma('synchronous = NORMAL')
    
    this.initializeDatabase()
  }

  private initializeDatabase() {
    try {
      // Check if database is already initialized
      const tables = this.db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()
      
      if (tables.length === 0) {
        console.log('🗄️  Initializing translation database schema...')
        const schema = readFileSync(this.schemaPath, 'utf8')
        this.db.exec(schema)
        console.log('✅ Translation database initialized successfully')
      }
    } catch (error) {
      console.error('❌ Failed to initialize translation database:', error)
      throw error
    }
  }

  // Translation Memory Operations
  addTranslation(entry: Omit<TranslationMemoryEntry, 'id' | 'createdAt' | 'updatedAt'>): number {
    const stmt = this.db.prepare(`
      INSERT INTO translation_memory (
        source_text, source_language, target_text, target_language, 
        context_hash, source_file_path, cultural_significance, quality_score,
        fuzzy_match_threshold, entity_references, cultural_context,
        trinity_validation, kevin_significance, rare_pepe_connection
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      entry.sourceText,
      entry.sourceLanguage,
      entry.targetText,
      entry.targetLanguage,
      entry.contextHash,
      entry.sourceFilePath,
      entry.culturalSignificance,
      entry.qualityScore,
      entry.fuzzyMatchThreshold,
      entry.entityReferences ? JSON.stringify(entry.entityReferences) : null,
      entry.culturalContext ? JSON.stringify(entry.culturalContext) : null,
      entry.trinityValidation,
      entry.kevinSignificance,
      entry.rarePepeConnection
    )

    return result.lastInsertRowid as number
  }

  findFuzzyMatches(
    sourceText: string, 
    sourceLanguage: string, 
    targetLanguage: string,
    threshold: number = 0.75
  ): FuzzyMatchResult[] {
    // First try exact matches
    const exactStmt = this.db.prepare(`
      SELECT source_text, target_text, 1.0 as match_score,
             cultural_context, entity_references,
             0 as usage_count, quality_score as confidence_score
      FROM translation_memory 
      WHERE source_text = ? AND source_language = ? AND target_language = ?
    `)

    const exactMatches = exactStmt.all(sourceText, sourceLanguage, targetLanguage)

    // Then find fuzzy matches from segments cache
    const fuzzyStmt = this.db.prepare(`
      SELECT source_text, target_text, match_score,
             cultural_entities as entity_references, usage_count, confidence_score
      FROM translation_segments
      WHERE source_language = ? AND target_language = ? 
      AND match_score >= ?
      ORDER BY match_score DESC, usage_count DESC
      LIMIT 10
    `)

    const fuzzyMatches = fuzzyStmt.all(sourceLanguage, targetLanguage, threshold)

    // Combine and return results
    return [...exactMatches, ...fuzzyMatches].map(match => ({
      sourceText: match.source_text,
      targetText: match.target_text,
      matchScore: match.match_score,
      culturalContext: match.cultural_context ? JSON.parse(match.cultural_context) : undefined,
      usageCount: match.usage_count,
      confidenceScore: match.confidence_score
    }))
  }

  // Cultural Entity Operations
  getCulturalEntity(entityId: string): CulturalEntity | null {
    const stmt = this.db.prepare(`
      SELECT * FROM cultural_entities WHERE entity_id = ?
    `)
    const result = stmt.get(entityId) as any

    if (!result) return null

    return {
      id: result.id,
      entityId: result.entity_id,
      entityName: result.entity_name,
      entityType: result.entity_type,
      culturalSignificance: result.cultural_significance,
      preserveName: Boolean(result.preserve_name),
      requireContext: Boolean(result.require_context),
      translationGuidelines: result.translation_guidelines,
      mentionCount: result.mention_count,
      lastMentioned: result.last_mentioned,
      trinityMember: Boolean(result.trinity_member),
      rarePepeConnected: Boolean(result.rare_pepe_connected),
      foundingStoryElement: Boolean(result.founding_story_element),
      createdAt: result.created_at,
      updatedAt: result.updated_at
    }
  }

  updateEntityMentionCount(entityId: string): void {
    const stmt = this.db.prepare(`
      UPDATE cultural_entities 
      SET mention_count = mention_count + 1, 
          last_mentioned = CURRENT_TIMESTAMP,
          updated_at = CURRENT_TIMESTAMP
      WHERE entity_id = ?
    `)
    stmt.run(entityId)
  }

  // Content Change Tracking
  addContentChange(change: Omit<ContentChange, 'id' | 'detectedAt'>): number {
    const stmt = this.db.prepare(`
      INSERT INTO content_changes (
        file_path, change_type, git_commit_hash, git_branch, change_summary,
        content_before, content_after, diff_text, affects_kevin, affects_trinity,
        affects_rare_pepe, cultural_priority, requires_retranslation, 
        affected_languages, processing_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      change.filePath,
      change.changeType,
      change.gitCommitHash,
      change.gitBranch,
      change.changeSummary,
      change.contentBefore,
      change.contentAfter,
      change.diffText,
      change.affectsKevin,
      change.affectsTrinity,
      change.affectsRarePepe,
      change.culturalPriority,
      change.requiresRetranslation,
      change.affectedLanguages ? JSON.stringify(change.affectedLanguages) : null,
      change.processingStatus
    )

    return result.lastInsertRowid as number
  }

  getPendingChanges(): ContentChange[] {
    const stmt = this.db.prepare(`
      SELECT * FROM content_changes 
      WHERE processing_status = 'pending'
      ORDER BY cultural_priority DESC, detected_at ASC
    `)

    return stmt.all().map(this.mapContentChangeRow)
  }

  // Translation Workflow Management  
  createWorkflow(workflow: Omit<TranslationWorkflow, 'id' | 'createdAt' | 'updatedAt'>): number {
    const stmt = this.db.prepare(`
      INSERT INTO translation_workflows (
        change_id, source_language, target_language, workflow_status, priority,
        total_segments, translated_segments, validated_segments, progress_percentage,
        cultural_review_required, cultural_review_status, auto_translation_used,
        human_review_required, estimated_completion
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      workflow.changeId,
      workflow.sourceLanguage,
      workflow.targetLanguage,
      workflow.workflowStatus,
      workflow.priority,
      workflow.totalSegments,
      workflow.translatedSegments,
      workflow.validatedSegments,
      workflow.progressPercentage,
      workflow.culturalReviewRequired,
      workflow.culturalReviewStatus,
      workflow.autoTranslationUsed,
      workflow.humanReviewRequired,
      workflow.estimatedCompletion
    )

    return result.lastInsertRowid as number
  }

  getActiveWorkflows(): TranslationWorkflow[] {
    const stmt = this.db.prepare(`
      SELECT * FROM active_workflows ORDER BY priority DESC, created_at ASC
    `)

    return stmt.all().map(this.mapWorkflowRow)
  }

  getCulturalValidationQueue(): Array<{
    workflowId: number
    targetLanguage: string
    filePath: string
    culturalPriority: string
    entityName: string
    translationGuidelines: string
  }> {
    const stmt = this.db.prepare(`
      SELECT * FROM cultural_validation_queue 
      ORDER BY cultural_priority DESC
    `)

    return stmt.all().map(row => ({
      workflowId: row.workflow_id,
      targetLanguage: row.target_language,
      filePath: row.file_path,
      culturalPriority: row.cultural_priority,
      entityName: row.entity_name,
      translationGuidelines: row.translation_guidelines
    }))
  }

  // Validation Rules
  getValidationRules(language?: string): ValidationRule[] {
    let stmt
    let params: any[] = []

    if (language) {
      stmt = this.db.prepare(`
        SELECT * FROM validation_rules 
        WHERE active = 1 
        AND (applies_to_languages IS NULL OR applies_to_languages LIKE ?)
        ORDER BY severity DESC, rule_type
      `)
      params = [`%"${language}"%`]
    } else {
      stmt = this.db.prepare(`
        SELECT * FROM validation_rules 
        WHERE active = 1
        ORDER BY severity DESC, rule_type
      `)
    }

    return stmt.all(...params).map(row => ({
      id: row.id,
      ruleName: row.rule_name,
      ruleType: row.rule_type,
      sourcePattern: row.source_pattern,
      targetPattern: row.target_pattern,
      validationFunction: row.validation_function,
      appliesToLanguages: row.applies_to_languages ? JSON.parse(row.applies_to_languages) : undefined,
      severity: row.severity,
      errorMessageTemplate: row.error_message_template,
      protectsEntity: row.protects_entity,
      culturalReason: row.cultural_reason,
      active: Boolean(row.active),
      createdAt: row.created_at
    }))
  }

  // Statistics and Analytics
  getTranslationStats(language?: string): Record<string, any> {
    let stmt
    let params: any[] = []

    if (language) {
      stmt = this.db.prepare(`
        SELECT * FROM translation_stats WHERE target_language = ?
      `)
      params = [language]
    } else {
      stmt = this.db.prepare(`
        SELECT * FROM translation_stats ORDER BY target_language
      `)
    }

    const stats = stmt.all(...params)
    
    // Add cultural preservation metrics
    const culturalStmt = this.db.prepare(`
      SELECT 
        target_language,
        COUNT(CASE WHEN kevin_significance != 'none' THEN 1 END) as kevin_translations,
        COUNT(CASE WHEN trinity_validation = 1 THEN 1 END) as trinity_validated,
        COUNT(CASE WHEN rare_pepe_connection = 1 THEN 1 END) as rare_pepe_preserved
      FROM translation_memory
      ${language ? 'WHERE target_language = ?' : ''}
      GROUP BY target_language
    `)

    const culturalStats = culturalStmt.all(...(language ? [language] : []))
    
    // Merge statistics
    return stats.map(stat => {
      const cultural = culturalStats.find(c => c.target_language === stat.target_language) || {}
      return {
        ...stat,
        ...cultural
      }
    })
  }

  // Utility methods
  private mapContentChangeRow(row: any): ContentChange {
    return {
      id: row.id,
      filePath: row.file_path,
      changeType: row.change_type,
      gitCommitHash: row.git_commit_hash,
      gitBranch: row.git_branch,
      changeSummary: row.change_summary,
      contentBefore: row.content_before,
      contentAfter: row.content_after,
      diffText: row.diff_text,
      affectsKevin: Boolean(row.affects_kevin),
      affectsTrinity: Boolean(row.affects_trinity),
      affectsRarePepe: Boolean(row.affects_rare_pepe),
      culturalPriority: row.cultural_priority,
      requiresRetranslation: Boolean(row.requires_retranslation),
      affectedLanguages: row.affected_languages ? JSON.parse(row.affected_languages) : undefined,
      processingStatus: row.processing_status,
      detectedAt: row.detected_at,
      processedAt: row.processed_at
    }
  }

  private mapWorkflowRow(row: any): TranslationWorkflow {
    return {
      id: row.id,
      changeId: row.change_id,
      sourceLanguage: row.source_language,
      targetLanguage: row.target_language,
      workflowStatus: row.workflow_status,
      priority: row.priority,
      totalSegments: row.total_segments,
      translatedSegments: row.translated_segments,
      validatedSegments: row.validated_segments,
      progressPercentage: row.progress_percentage,
      culturalReviewRequired: Boolean(row.cultural_review_required),
      culturalReviewer: row.cultural_reviewer,
      culturalReviewStatus: row.cultural_review_status,
      culturalReviewNotes: row.cultural_review_notes,
      autoTranslationUsed: Boolean(row.auto_translation_used),
      humanReviewRequired: Boolean(row.human_review_required),
      estimatedCompletion: row.estimated_completion,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      completedAt: row.completed_at
    }
  }

  // Utility function for generating context hashes
  static generateContextHash(text: string, context?: string): string {
    const content = context ? `${text}|||${context}` : text
    return createHash('sha256').update(content).digest('hex')
  }

  close(): void {
    this.db.close()
  }
}

// Export singleton instance
export const translationDb = new TranslationDatabase()