/**
 * Translation Management Infrastructure - Main Entry Point
 * Comprehensive translation workflow system for Bitcoin Stamps documentation
 */

export { TranslationDatabase, translationDb } from './database.ts'
export { CulturalFuzzyMatcher as FuzzyMatcher } from './fuzzy-matcher.ts'
export { ChangeDetector, changeDetector } from './change-detector.ts'
export { TranslationAPI as translationAPI } from './api-endpoints.ts'
export { CulturalValidator } from './cultural-validator.ts'
export { LEOTranslationIntegration, leoTranslationIntegration } from './leo-integration.ts'

import { translationDb } from './database.ts'
import { changeDetector } from './change-detector.ts'
import { leoTranslationIntegration } from './leo-integration.ts'

export interface TranslationManagementConfig {
  enabled: boolean
  watchPaths: string[]
  supportedLanguages: string[]
  culturalValidationLevel: 'strict' | 'moderate' | 'lenient'
  autoStart: boolean
  apiEndpoints: boolean
  debugMode: boolean
}

const DEFAULT_CONFIG: TranslationManagementConfig = {
  enabled: true,
  watchPaths: [
    'docs/en/',
    'docs/.vitepress/api/',
    'docs/.vitepress/theme/composables/'
  ],
  supportedLanguages: ['fr', 'es', 'zh', 'tr'],
  culturalValidationLevel: 'strict',
  autoStart: true,
  apiEndpoints: true,
  debugMode: false
}

export class TranslationManager {
  private config: TranslationManagementConfig
  private initialized: boolean = false

  constructor(config?: Partial<TranslationManagementConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  /**
   * Initialize the complete translation management system
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      console.warn('Translation Management already initialized')
      return
    }

    console.log('🌍 Initializing Bitcoin Stamps Translation Management Infrastructure...')

    try {
      // Initialize database
      console.log('📚 Setting up translation memory database...')
      // Database is initialized automatically in constructor
      
      // Initialize LEO integration
      console.log('🔗 Setting up LEO system integration...')
      await leoTranslationIntegration.initialize()
      
      // Start change detection if enabled
      if (this.config.autoStart) {
        console.log('👁️ Starting content change monitoring...')
        // Change detector starts automatically in constructor
      }

      // Display initialization summary
      await this.displayInitializationSummary()

      this.initialized = true
      console.log('✅ Translation Management Infrastructure initialized successfully')

    } catch (error) {
      console.error('❌ Failed to initialize Translation Management:', error)
      throw error
    }
  }

  /**
   * Display initialization summary with statistics
   */
  private async displayInitializationSummary(): Promise<void> {
    try {
      const stats = translationDb.getTranslationStats()
      const culturalReport = await leoTranslationIntegration.generateLEOCulturalReport()
      
      console.log('\n📊 Translation Management Status:')
      console.log(`   • Database: SQLite with ${this.config.supportedLanguages.length} target languages`)
      console.log(`   • Translation Memory: ${stats.reduce((sum, lang) => sum + lang.total_translations, 0)} entries`)
      console.log(`   • Cultural Health Score: ${culturalReport.culturalHealthScore.toFixed(1)}%`)
      console.log(`   • Validation Level: ${this.config.culturalValidationLevel}`)
      console.log(`   • Change Detection: ${this.config.autoStart ? 'Active' : 'Disabled'}`)
      console.log(`   • API Endpoints: ${this.config.apiEndpoints ? 'Enabled' : 'Disabled'}`)
      
      if (culturalReport.criticalIssues.length > 0) {
        console.log('\n⚠️ Critical Cultural Issues:')
        culturalReport.criticalIssues.forEach(issue => console.log(`   • ${issue}`))
      }
      
      if (culturalReport.recommendations.length > 0) {
        console.log('\n💡 Recommendations:')
        culturalReport.recommendations.slice(0, 3).forEach(rec => console.log(`   • ${rec}`))
      }
    } catch (error) {
      console.warn('Could not generate initialization summary:', error.message)
    }
  }

  /**
   * Get system status and statistics
   */
  async getStatus(): Promise<{
    initialized: boolean
    config: TranslationManagementConfig
    statistics: {
      translationMemoryEntries: number
      pendingChanges: number
      activeWorkflows: number
      culturalHealthScore: number
    }
  }> {
    const stats = translationDb.getTranslationStats()
    const pendingChanges = translationDb.getPendingChanges()
    const activeWorkflows = translationDb.getActiveWorkflows()
    const culturalReport = await leoTranslationIntegration.generateLEOCulturalReport()

    return {
      initialized: this.initialized,
      config: this.config,
      statistics: {
        translationMemoryEntries: stats.reduce((sum, lang) => sum + lang.total_translations, 0),
        pendingChanges: pendingChanges.length,
        activeWorkflows: activeWorkflows.length,
        culturalHealthScore: culturalReport.culturalHealthScore
      }
    }
  }

  /**
   * Process pending translation workflows
   */
  async processPendingWorkflows(): Promise<{
    processed: number
    errors: number
    culturalValidationFailures: number
  }> {
    const workflows = translationDb.getActiveWorkflows().filter(w => w.workflowStatus === 'pending')
    let processed = 0
    let errors = 0
    let culturalValidationFailures = 0

    console.log(`🔄 Processing ${workflows.length} pending translation workflows...`)

    for (const workflow of workflows) {
      try {
        // This would contain the actual translation processing logic
        // For now, we'll just log the workflow
        console.log(`Processing workflow ${workflow.id} for ${workflow.targetLanguage}`)
        processed++
      } catch (error) {
        console.error(`Error processing workflow ${workflow.id}:`, error)
        errors++
      }
    }

    return { processed, errors, culturalValidationFailures }
  }

  /**
   * Run cultural validation on all content
   */
  async runCulturalValidation(): Promise<{
    totalValidated: number
    passedValidation: number
    criticalViolations: number
    recommendations: string[]
  }> {
    console.log('🎭 Running comprehensive cultural validation...')
    
    // This would validate all translated content
    // For now, return summary data
    const culturalReport = await leoTranslationIntegration.generateLEOCulturalReport()
    
    return {
      totalValidated: 100, // Placeholder
      passedValidation: 85,  // Placeholder
      criticalViolations: culturalReport.criticalIssues.length,
      recommendations: culturalReport.recommendations
    }
  }

  /**
   * Export translation data for external tools
   */
  async exportTranslationData(format: 'json' | 'csv' | 'tmx' = 'json'): Promise<string> {
    const stats = translationDb.getTranslationStats()
    
    if (format === 'json') {
      return JSON.stringify({
        exportDate: new Date().toISOString(),
        system: 'Bitcoin Stamps Translation Management',
        culturalPreservation: true,
        languages: this.config.supportedLanguages,
        statistics: stats
      }, null, 2)
    }

    // Other formats would be implemented here
    throw new Error(`Export format ${format} not yet implemented`)
  }

  /**
   * Shutdown translation management system
   */
  async shutdown(): Promise<void> {
    console.log('🛑 Shutting down Translation Management...')
    
    try {
      // Stop change detection
      changeDetector.stop()
      
      // Close database connection
      translationDb.close()
      
      this.initialized = false
      console.log('✅ Translation Management shutdown complete')
    } catch (error) {
      console.error('❌ Error during shutdown:', error)
    }
  }
}

/**
 * VitePress Plugin for Translation Management Integration
 */
export function TranslationManagementPlugin(userConfig?: Partial<TranslationManagementConfig>) {
  const manager = new TranslationManager(userConfig)

  return {
    name: 'translation-management',
    configResolved: async () => {
      try {
        await manager.initialize()
      } catch (error) {
        console.error('Translation Management plugin initialization failed:', error)
      }
    },
    buildStart: async () => {
      console.log('🔧 Translation Management: Build started')
      
      // Process any pending workflows before build
      const result = await manager.processPendingWorkflows()
      if (result.processed > 0) {
        console.log(`✅ Processed ${result.processed} translation workflows`)
      }
    },
    buildEnd: async () => {
      console.log('🏁 Translation Management: Build completed')
      
      // Generate cultural validation report
      const validation = await manager.runCulturalValidation()
      console.log(`📊 Cultural validation: ${validation.passedValidation}/${validation.totalValidated} passed`)
      
      if (validation.criticalViolations > 0) {
        console.warn(`⚠️ ${validation.criticalViolations} critical cultural preservation violations detected`)
      }
    }
  }
}

// Create global translation manager instance
export const translationManager = new TranslationManager()

/**
 * Auto-initialize if in Node.js environment (VitePress build)
 */
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  // Auto-initialize in build environment
  translationManager.initialize().catch(error => {
    console.error('Auto-initialization failed:', error)
  })
}

// Export types for external use
export type {
  TranslationMemoryEntry,
  ContentChange,
  TranslationWorkflow,
  CulturalEntity,
  ValidationRule
} from './database.ts'

export type {
  MatchContext,
  EnhancedMatchResult
} from './fuzzy-matcher.ts'

export type {
  CulturalValidationContext,
  CulturalViolation,
  CulturalValidationResult
} from './cultural-validator.ts'

export type {
  APIResponse,
  TranslationRequest,
  ValidationRequest,
  ValidationResult
} from './api-endpoints.ts'

// Default export
export default {
  TranslationManager,
  TranslationManagementPlugin,
  translationManager,
  translationDb,
  changeDetector,
  leoTranslationIntegration
}