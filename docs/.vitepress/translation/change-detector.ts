/**
 * Content Change Detection System with Git Integration
 * Monitors file system changes and prioritizes cultural content
 */

import { watch } from 'fs'
import { readFile, stat } from 'fs/promises'
import { join, relative, extname } from 'path'
import { spawn } from 'child_process'
import { translationDb, type ContentChange } from './database.ts'

export interface ChangeDetectionConfig {
  watchPaths: string[]
  gitRepoPath: string
  excludePatterns: string[]
  culturalEntityPatterns: Record<string, RegExp[]>
  pollInterval: number
}

export interface AnalyzedChange extends ContentChange {
  extractedEntities: string[]
  culturalContexts: Array<{
    entity: string
    context: string
    significance: 'high' | 'medium' | 'low'
  }>
  translationPriority: number
}

export class ChangeDetector {
  private config: ChangeDetectionConfig
  private gitWatcher: any
  private fileWatcher: any
  private processingQueue: Map<string, NodeJS.Timeout> = new Map()

  private static readonly DEFAULT_CONFIG: ChangeDetectionConfig = {
    watchPaths: [
      'docs/en/',
      'docs/.vitepress/api/',
      'docs/.vitepress/theme/composables/'
    ],
    gitRepoPath: process.cwd(),
    excludePatterns: [
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',
      '**/node_modules/**',
      '**/*.log',
      '**/.git/**'
    ],
    culturalEntityPatterns: {
      kevin: [
        /\bKEVIN\b/gi,
        /\bkevin\b/gi,
        /first SRC-?20/gi,
        /mascot/gi
      ],
      trinity: [
        /\bmikeinspace\b/gi,
        /\bArwyn\b/gi,
        /\bReinamora\b/gi,
        /founding\s+trinity/gi,
        /three\s+founders/gi
      ],
      rarePepe: [
        /rare\s+pepe/gi,
        /pepe\s+culture/gi,
        /\bpepe\b/gi,
        /meme\s+magic/gi,
        /esoteric\s+roots/gi
      ],
      flooneybin: [
        /flooneybin/gi,
        /joe\s+looney/gi,
        /counterparty.*icon/gi,
        /trinity.*connect/gi
      ],
      protocols: [
        /SRC-?20/gi,
        /SRC-?101/gi,
        /SRC-?721/gi,
        /\bOLGA\b/gi,
        /bitcoin\s+stamps/gi
      ]
    },
    pollInterval: 1000
  }

  constructor(config?: Partial<ChangeDetectionConfig>) {
    this.config = { ...ChangeDetector.DEFAULT_CONFIG, ...config }
    this.startWatching()
  }

  /**
   * Start monitoring for changes
   */
  private startWatching(): void {
    console.log('🔍 Starting change detection system...')
    
    // Watch file system changes
    for (const watchPath of this.config.watchPaths) {
      const fullPath = join(this.config.gitRepoPath, watchPath)
      
      try {
        this.fileWatcher = watch(fullPath, { recursive: true }, (eventType, filename) => {
          if (filename) {
            this.queueFileChange(join(fullPath, filename), eventType as 'change' | 'rename')
          }
        })
        
        console.log(`📂 Watching ${fullPath} for changes`)
      } catch (error) {
        console.warn(`⚠️  Could not watch ${fullPath}:`, error.message)
      }
    }

    // Set up Git hooks monitoring
    this.setupGitHooks()
  }

  /**
   * Queue file change for processing (debounced)
   */
  private queueFileChange(filePath: string, eventType: 'change' | 'rename'): void {
    // Skip excluded patterns
    if (this.shouldExcludeFile(filePath)) {
      return
    }

    // Clear existing timeout for this file
    const existingTimeout = this.processingQueue.get(filePath)
    if (existingTimeout) {
      clearTimeout(existingTimeout)
    }

    // Queue new processing with debounce
    const timeout = setTimeout(async () => {
      await this.processFileChange(filePath, eventType)
      this.processingQueue.delete(filePath)
    }, this.config.pollInterval)

    this.processingQueue.set(filePath, timeout)
  }

  /**
   * Process individual file change
   */
  private async processFileChange(filePath: string, eventType: 'change' | 'rename'): Promise<void> {
    try {
      const relativePath = relative(this.config.gitRepoPath, filePath)
      
      // Get file info
      let fileExists = true
      let currentContent = ''
      
      try {
        await stat(filePath)
        currentContent = await readFile(filePath, 'utf8')
      } catch {
        fileExists = false
      }

      // Get Git information
      const gitInfo = await this.getGitInfo(relativePath)
      
      // Analyze content for cultural significance
      const analysis = await this.analyzeContent(currentContent, relativePath)
      
      // Create change record
      const change: AnalyzedChange = {
        filePath: relativePath,
        changeType: fileExists ? 'modified' : 'deleted',
        gitCommitHash: gitInfo.commitHash,
        gitBranch: gitInfo.branch,
        changeSummary: this.generateChangeSummary(analysis),
        contentAfter: fileExists ? currentContent : undefined,
        diffText: await this.getGitDiff(relativePath),
        affectsKevin: analysis.affectsKevin,
        affectsTrinity: analysis.affectsTrinity,
        affectsRarePepe: analysis.affectsRarePepe,
        culturalPriority: analysis.culturalPriority,
        requiresRetranslation: analysis.requiresRetranslation,
        affectedLanguages: this.determineAffectedLanguages(relativePath),
        processingStatus: 'pending',
        extractedEntities: analysis.extractedEntities,
        culturalContexts: analysis.culturalContexts,
        translationPriority: analysis.translationPriority
      }

      // Store in database
      const changeId = translationDb.addContentChange(change)
      console.log(`📝 Detected ${change.culturalPriority} priority change: ${relativePath} (ID: ${changeId})`)

      // Create translation workflows for affected languages
      if (change.requiresRetranslation && change.affectedLanguages) {
        await this.createTranslationWorkflows(changeId, change)
      }

      // Update entity mention counts
      this.updateEntityMentions(analysis.extractedEntities)

    } catch (error) {
      console.error('❌ Error processing file change:', error)
    }
  }

  /**
   * Analyze content for cultural significance and translation needs
   */
  private async analyzeContent(content: string, filePath: string): Promise<{
    affectsKevin: boolean
    affectsTrinity: boolean
    affectsRarePepe: boolean
    culturalPriority: 'low' | 'medium' | 'high' | 'critical'
    requiresRetranslation: boolean
    extractedEntities: string[]
    culturalContexts: Array<{
      entity: string
      context: string
      significance: 'high' | 'medium' | 'low'
    }>
    translationPriority: number
  }> {
    const result = {
      affectsKevin: false,
      affectsTrinity: false,
      affectsRarePepe: false,
      culturalPriority: 'medium' as const,
      requiresRetranslation: true,
      extractedEntities: [] as string[],
      culturalContexts: [] as Array<{
        entity: string
        context: string
        significance: 'high' | 'medium' | 'low'
      }>,
      translationPriority: 0
    }

    // Check for cultural entity patterns
    for (const [entity, patterns] of Object.entries(this.config.culturalEntityPatterns)) {
      for (const pattern of patterns) {
        const matches = content.match(pattern)
        if (matches && matches.length > 0) {
          result.extractedEntities.push(entity)
          
          // Extract context around matches
          for (const match of matches) {
            const index = content.indexOf(match)
            const contextStart = Math.max(0, index - 100)
            const contextEnd = Math.min(content.length, index + match.length + 100)
            const context = content.slice(contextStart, contextEnd)
            
            result.culturalContexts.push({
              entity,
              context,
              significance: this.assessEntitySignificance(entity, context)
            })
          }

          // Set flags
          if (entity === 'kevin') result.affectsKevin = true
          if (entity === 'trinity') result.affectsTrinity = true  
          if (entity === 'rarePepe' || entity === 'flooneybin') result.affectsRarePepe = true
        }
      }
    }

    // Calculate cultural priority
    result.culturalPriority = this.calculateCulturalPriority(result)
    
    // Calculate translation priority score
    result.translationPriority = this.calculateTranslationPriority(result, filePath)

    // Determine if retranslation is needed
    result.requiresRetranslation = this.shouldRetranslate(result, filePath)

    return result
  }

  /**
   * Calculate cultural priority based on detected entities
   */
  private calculateCulturalPriority(analysis: any): 'low' | 'medium' | 'high' | 'critical' {
    let score = 0

    if (analysis.affectsKevin) score += 3
    if (analysis.affectsTrinity) score += 2
    if (analysis.affectsRarePepe) score += 2

    // High significance contexts boost priority
    const highSigContexts = analysis.culturalContexts.filter(c => c.significance === 'high')
    score += highSigContexts.length

    if (score >= 5) return 'critical'
    if (score >= 3) return 'high'  
    if (score >= 1) return 'medium'
    return 'low'
  }

  /**
   * Calculate numeric translation priority for workflow ordering
   */
  private calculateTranslationPriority(analysis: any, filePath: string): number {
    let priority = 50 // Base priority

    // File type bonuses
    if (filePath.includes('/narratives/')) priority += 20
    if (filePath.includes('/protocols/')) priority += 15
    if (filePath.includes('/guide/')) priority += 10
    if (filePath.includes('kevin')) priority += 25

    // Cultural significance bonuses  
    if (analysis.affectsKevin) priority += 30
    if (analysis.affectsTrinity) priority += 20
    if (analysis.affectsRarePepe) priority += 15

    // Entity count bonus
    priority += Math.min(analysis.extractedEntities.length * 5, 25)

    return Math.min(priority, 100)
  }

  /**
   * Assess the significance of an entity in given context
   */
  private assessEntitySignificance(entity: string, context: string): 'high' | 'medium' | 'low' {
    const contextLower = context.toLowerCase()

    // High significance indicators
    const highSigPatterns = [
      'founder', 'created', 'pioneered', 'first', 'genesis', 'established',
      'mascot', 'beloved', 'community', 'cultural', 'heritage', 'significance',
      'trinity', 'connection', 'story', 'narrative', 'origin'
    ]

    // Medium significance indicators
    const medSigPatterns = [
      'protocol', 'token', 'standard', 'system', 'technology', 'development',
      'implementation', 'feature', 'functionality', 'integration'
    ]

    const hasHighSig = highSigPatterns.some(pattern => contextLower.includes(pattern))
    const hasMedSig = medSigPatterns.some(pattern => contextLower.includes(pattern))

    if (hasHighSig) return 'high'
    if (hasMedSig) return 'medium'
    return 'low'
  }

  /**
   * Determine if content change requires retranslation
   */
  private shouldRetranslate(analysis: any, filePath: string): boolean {
    // Always retranslate cultural content
    if (analysis.culturalPriority === 'critical' || analysis.culturalPriority === 'high') {
      return true
    }

    // Skip certain file types
    const skipPatterns = [
      '/.vitepress/cache/',
      '/.vitepress/dist/',
      '/node_modules/',
      '.log',
      '.lock'
    ]

    return !skipPatterns.some(pattern => filePath.includes(pattern))
  }

  /**
   * Determine which languages are affected by a change
   */
  private determineAffectedLanguages(filePath: string): string[] {
    // If it's an English source file, all other languages are affected
    if (filePath.startsWith('docs/en/')) {
      return ['fr', 'es', 'zh', 'tr']
    }

    // If it's a system file or API, all languages are affected
    if (filePath.includes('.vitepress/') || filePath.includes('config.')) {
      return ['en', 'fr', 'es', 'zh', 'tr']
    }

    // Default to common languages
    return ['fr', 'es', 'zh', 'tr']
  }

  /**
   * Create translation workflows for affected languages
   */
  private async createTranslationWorkflows(changeId: number, change: AnalyzedChange): Promise<void> {
    if (!change.affectedLanguages) return

    for (const targetLanguage of change.affectedLanguages) {
      const workflowId = translationDb.createWorkflow({
        changeId,
        sourceLanguage: 'en',
        targetLanguage,
        workflowStatus: 'pending',
        priority: this.mapPriorityToWorkflow(change.culturalPriority),
        totalSegments: 0, // Will be calculated during processing
        translatedSegments: 0,
        validatedSegments: 0,
        progressPercentage: 0,
        culturalReviewRequired: change.culturalPriority === 'critical' || change.culturalPriority === 'high',
        culturalReviewStatus: 'pending',
        autoTranslationUsed: false,
        humanReviewRequired: true
      })

      console.log(`🔄 Created translation workflow ${workflowId} for ${targetLanguage}`)
    }
  }

  /**
   * Map cultural priority to workflow priority
   */
  private mapPriorityToWorkflow(culturalPriority: string): 'low' | 'medium' | 'high' | 'urgent' {
    switch (culturalPriority) {
      case 'critical': return 'urgent'
      case 'high': return 'high'
      case 'medium': return 'medium'
      default: return 'low'
    }
  }

  /**
   * Update entity mention counts in database
   */
  private updateEntityMentions(entities: string[]): void {
    for (const entityId of entities) {
      translationDb.updateEntityMentionCount(entityId)
    }
  }

  /**
   * Check if file should be excluded from monitoring
   */
  private shouldExcludeFile(filePath: string): boolean {
    return this.config.excludePatterns.some(pattern => {
      // Simple glob pattern matching
      return filePath.includes(pattern.replace('*', ''))
    })
  }

  /**
   * Get Git information for a file
   */
  private async getGitInfo(filePath: string): Promise<{
    commitHash?: string
    branch: string
  }> {
    try {
      const branch = await this.execGit(['rev-parse', '--abbrev-ref', 'HEAD'])
      const commitHash = await this.execGit(['rev-parse', 'HEAD'])

      return {
        commitHash: commitHash?.trim(),
        branch: branch?.trim() || 'main'
      }
    } catch {
      return { branch: 'main' }
    }
  }

  /**
   * Get Git diff for a file
   */
  private async getGitDiff(filePath: string): Promise<string | undefined> {
    try {
      return await this.execGit(['diff', 'HEAD~1', 'HEAD', '--', filePath])
    } catch {
      return undefined
    }
  }

  /**
   * Execute Git command
   */
  private execGit(args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const git = spawn('git', args, { 
        cwd: this.config.gitRepoPath,
        stdio: 'pipe'
      })

      let output = ''
      let error = ''

      git.stdout.on('data', (data) => output += data.toString())
      git.stderr.on('data', (data) => error += data.toString())

      git.on('close', (code) => {
        if (code === 0) {
          resolve(output)
        } else {
          reject(new Error(error || `Git command failed with code ${code}`))
        }
      })
    })
  }

  /**
   * Setup Git hooks for commit monitoring
   */
  private setupGitHooks(): void {
    // This would set up Git hooks to trigger change detection
    // For now, we rely on file system watching
    console.log('🔗 Git hooks setup (file system watching active)')
  }

  /**
   * Generate human-readable change summary
   */
  private generateChangeSummary(analysis: any): string {
    const parts: string[] = []

    if (analysis.affectsKevin) parts.push('KEVIN content')
    if (analysis.affectsTrinity) parts.push('Trinity narrative')
    if (analysis.affectsRarePepe) parts.push('Rare Pepe culture')

    if (parts.length === 0) {
      return 'Content update'
    }

    return `Updated ${parts.join(', ')} - ${analysis.culturalPriority} priority`
  }

  /**
   * Stop watching for changes
   */
  stop(): void {
    if (this.fileWatcher) {
      this.fileWatcher.close()
    }
    
    // Clear processing queue
    for (const timeout of this.processingQueue.values()) {
      clearTimeout(timeout)
    }
    this.processingQueue.clear()

    console.log('🛑 Change detection stopped')
  }
}

// Export singleton instance
export const changeDetector = new ChangeDetector()