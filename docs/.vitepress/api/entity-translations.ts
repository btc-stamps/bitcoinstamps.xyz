/**
 * Entity Translation Database
 * Integrates cultural translations with existing multilingual LEO API
 */

import type { 
  SupportedLanguage, 
  MultiLangText, 
  BaseEntity,
  ProtocolEntity,
  ConceptEntity,
  ToolEntity
} from './types.d.ts'

import { 
  getCulturalTranslation, 
  getPhilosophyTranslation, 
  getRegionalCryptoContext,
  getLocalizedCryptoTerm,
  type CulturalEntityTranslation,
  type PhilosophyTranslation 
} from './cultural-translations.js'

import { 
  getLocalizedText, 
  getCryptoTerm,
  CRYPTO_TERMINOLOGY 
} from './language-utils.js'

/**
 * Enhanced Entity Translation Interface
 */
export interface EntityTranslation {
  id: string
  /** Core entity data from existing system */
  baseEntity: BaseEntity
  /** Cultural translation data */
  cultural?: CulturalEntityTranslation
  /** Associated philosophy translations */
  philosophies?: PhilosophyTranslation[]
  /** Regional adaptations */
  regionalAdaptations?: Record<SupportedLanguage, {
    terminology?: Record<string, string>
    culturalContext?: string
    localReferences?: string[]
  }>
  /** Validation metadata */
  validation?: {
    culturallyValidated: boolean
    lastReviewDate?: string
    reviewers?: string[]
    sensitivityLevel: 'low' | 'medium' | 'high'
  }
}

/**
 * Entity Translation Database
 * Maps entity IDs to their comprehensive translation data
 */
export class EntityTranslationDatabase {
  private translations = new Map<string, EntityTranslation>()
  private philosophyIndex = new Map<string, string[]>() // philosophy -> entity IDs
  
  constructor() {
    this.initializeDatabase()
  }
  
  /**
   * Initialize the database with core entities
   */
  private initializeDatabase() {
    // KEVIN entity translation
    this.addTranslation({
      id: 'kevin',
      baseEntity: {
        id: 'kevin',
        name: 'KEVIN',
        description: 'The beloved community mascot and mystical guide',
        type: 'cultural-icon',
        culturalSignificance: 'high',
        url: '/narratives/kevin-origin',
        relationships: []
      } as ConceptEntity,
      cultural: getCulturalTranslation('kevin'),
      philosophies: [
        getPhilosophyTranslation('we-are-all-kevin')!
      ],
      regionalAdaptations: {
        zh: {
          terminology: {
            'mascot': '吉祥物',
            'guide': '向导',
            'community': '社区',
            'beloved': '受人喜爱的'
          },
          culturalContext: 'KEVIN在中国文化中象征好运和社区团结',
          localReferences: ['招财猫', '社区精神', '集体智慧']
        },
        es: {
          terminology: {
            'mascot': 'mascota',
            'guide': 'guía',
            'community': 'comunidad',
            'beloved': 'querido'
          },
          culturalContext: 'KEVIN representa el arte comunitario latinoamericano',
          localReferences: ['arte popular', 'expresión colectiva', 'tradición comunitaria']
        },
        fr: {
          terminology: {
            'mascot': 'mascotte',
            'guide': 'guide',
            'community': 'communauté',
            'beloved': 'bien-aimé'
          },
          culturalContext: 'KEVIN s\'inscrit dans l\'avant-garde artistique française',
          localReferences: ['art d\'avant-garde', 'innovation culturelle', 'esprit communautaire']
        }
      },
      validation: {
        culturallyValidated: true,
        lastReviewDate: '2024-01-15',
        reviewers: ['Bitcoin Stamps Community', 'Cultural Review Board'],
        sensitivityLevel: 'high'
      }
    })
    
    // Bitcoin Stamps ecosystem translation
    this.addTranslation({
      id: 'bitcoin-stamps',
      baseEntity: {
        id: 'bitcoin-stamps',
        name: 'Bitcoin Stamps',
        description: 'Immutable digital assets on Bitcoin blockchain',
        type: 'protocol-ecosystem',
        culturalSignificance: 'high',
        url: '/',
        relationships: []
      } as ConceptEntity,
      philosophies: [
        getPhilosophyTranslation('in-lakech')!
      ],
      regionalAdaptations: {
        zh: {
          terminology: {
            'stamps': '邮票',
            'immutable': '不可变的',
            'digital-assets': '数字资产',
            'blockchain': '区块链'
          },
          culturalContext: '比特币邮票代表了数字艺术的永久性和价值',
          localReferences: ['数字收藏', '区块链艺术', '永久存储']
        },
        es: {
          terminology: {
            'stamps': 'sellos',
            'immutable': 'inmutable',
            'digital-assets': 'activos digitales',
            'blockchain': 'blockchain'
          },
          culturalContext: 'Bitcoin Stamps representa la democratización del arte digital',
          localReferences: ['arte digital', 'coleccionismo', 'expresión permanente']
        },
        fr: {
          terminology: {
            'stamps': 'tampons',
            'immutable': 'immuable',
            'digital-assets': 'actifs numériques',
            'blockchain': 'blockchain'
          },
          culturalContext: 'Bitcoin Stamps incarne l\'art numérique permanent sur Bitcoin',
          localReferences: ['art numérique', 'collection permanente', 'innovation artistique']
        }
      },
      validation: {
        culturallyValidated: true,
        lastReviewDate: '2024-01-15',
        reviewers: ['Bitcoin Stamps Community'],
        sensitivityLevel: 'medium'
      }
    })
    
    // SRC-20 protocol translation
    this.addTranslation({
      id: 'src-20',
      baseEntity: {
        id: 'src-20',
        name: 'SRC-20 Tokens',
        description: 'Fungible token standard pioneered by KEVIN',
        type: 'protocol',
        culturalSignificance: 'high',
        url: '/protocols/src-20',
        relationships: []
      } as ProtocolEntity,
      cultural: getCulturalTranslation('src-20'),
      philosophies: [
        getPhilosophyTranslation('we-are-all-kevin')!
      ],
      regionalAdaptations: {
        zh: {
          terminology: {
            'fungible': '同质化',
            'token': '代币',
            'standard': '标准',
            'pioneered': '开创'
          },
          culturalContext: 'SRC-20是比特币上第一个成功的代币标准',
          localReferences: ['代币标准', '技术创新', 'KEVIN传承']
        },
        es: {
          terminology: {
            'fungible': 'fungible',
            'token': 'token',
            'standard': 'estándar',
            'pioneered': 'pionero'
          },
          culturalContext: 'SRC-20 estableció el modelo para tokens exitosos',
          localReferences: ['estándar de tokens', 'innovación', 'legado KEVIN']
        },
        fr: {
          terminology: {
            'fungible': 'fongible',
            'token': 'jeton',
            'standard': 'standard',
            'pioneered': 'pionnier'
          },
          culturalContext: 'SRC-20 a établi le standard des jetons sur Bitcoin',
          localReferences: ['standard de jetons', 'innovation', 'héritage KEVIN']
        }
      },
      validation: {
        culturallyValidated: true,
        lastReviewDate: '2024-01-15',
        reviewers: ['Protocol Review Board', 'KEVIN Community'],
        sensitivityLevel: 'high'
      }
    })
    
    // Index philosophies
    this.indexPhilosophies()
  }
  
  /**
   * Add a new entity translation
   */
  addTranslation(translation: EntityTranslation): void {
    this.translations.set(translation.id, translation)
    
    // Update philosophy index
    if (translation.philosophies) {
      for (const philosophy of translation.philosophies) {
        const entityIds = this.philosophyIndex.get(philosophy.id) || []
        entityIds.push(translation.id)
        this.philosophyIndex.set(philosophy.id, entityIds)
      }
    }
  }
  
  /**
   * Get entity translation by ID
   */
  getTranslation(entityId: string): EntityTranslation | undefined {
    return this.translations.get(entityId)
  }
  
  /**
   * Get localized entity data
   */
  getLocalizedEntity<T extends BaseEntity>(
    entityId: string, 
    language: SupportedLanguage = 'en'
  ): T | null {
    const translation = this.getTranslation(entityId)
    if (!translation) return null
    
    const baseEntity = translation.baseEntity as T
    const cultural = translation.cultural
    const regional = translation.regionalAdaptations?.[language]
    
    // Create localized entity
    const localized: T = {
      ...baseEntity,
      name: cultural ? getLocalizedText(cultural.descriptions, language) : baseEntity.name,
      description: cultural ? getLocalizedText(cultural.descriptions, language) : 
                   getLocalizedText(baseEntity.description, language)
    }
    
    // Add cultural metadata if available
    if (cultural && 'culturalMetadata' in localized) {
      (localized as any).culturalMetadata = {
        impact: getLocalizedText(cultural.culturalContext, language),
        significance: cultural.philosophicalMeaning ? 
                     getLocalizedText(cultural.philosophicalMeaning, language) : undefined,
        communityRole: getLocalizedText(cultural.communityRole, language),
        regionalContext: regional?.culturalContext,
        localReferences: regional?.localReferences
      }
    }
    
    return localized
  }
  
  /**
   * Get cultural context for entity
   */
  getCulturalContext(
    entityId: string, 
    language: SupportedLanguage = 'en'
  ): string | undefined {
    const translation = this.getTranslation(entityId)
    if (!translation?.cultural) return undefined
    
    return getLocalizedText(translation.cultural.culturalContext, language)
  }
  
  /**
   * Get philosophy translations for entity
   */
  getEntityPhilosophies(
    entityId: string, 
    language: SupportedLanguage = 'en'
  ): Array<{id: string, phrase: string, meaning: string, application: string}> {
    const translation = this.getTranslation(entityId)
    if (!translation?.philosophies) return []
    
    return translation.philosophies.map(philosophy => ({
      id: philosophy.id,
      phrase: philosophy.originalPhrase,
      meaning: getLocalizedText(philosophy.translations, language),
      application: getLocalizedText(philosophy.contextualApplication, language)
    }))
  }
  
  /**
   * Get regional terminology
   */
  getRegionalTerminology(
    entityId: string, 
    language: SupportedLanguage
  ): Record<string, string> {
    const translation = this.getTranslation(entityId)
    const regional = translation?.regionalAdaptations?.[language]
    const contextData = getRegionalCryptoContext(language)
    
    const terminology: Record<string, string> = {}
    
    // Entity-specific terminology
    if (regional?.terminology) {
      Object.assign(terminology, regional.terminology)
    }
    
    // Regional crypto terminology
    if (contextData) {
      Object.assign(terminology, contextData.cryptoCulture.terminology)
      Object.assign(terminology, contextData.cryptoCulture.communityTerms)
    }
    
    return terminology
  }
  
  /**
   * Validate entity translation completeness
   */
  validateTranslation(entityId: string): {
    isComplete: boolean
    missingLanguages: SupportedLanguage[]
    culturallyValidated: boolean
    issues: string[]
  } {
    const translation = this.getTranslation(entityId)
    const issues: string[] = []
    const missingLanguages: SupportedLanguage[] = []
    
    if (!translation) {
      return {
        isComplete: false,
        missingLanguages: ['en', 'es', 'fr', 'zh'],
        culturallyValidated: false,
        issues: ['Entity translation not found']
      }
    }
    
    // Check language completeness
    const supportedLangs: SupportedLanguage[] = ['en', 'es', 'fr', 'zh']
    for (const lang of supportedLangs) {
      if (translation.cultural) {
        if (!translation.cultural.descriptions[lang]) {
          missingLanguages.push(lang)
          issues.push(`Missing ${lang} description`)
        }
        if (!translation.cultural.culturalContext[lang]) {
          issues.push(`Missing ${lang} cultural context`)
        }
      }
    }
    
    // Check cultural validation
    const culturallyValidated = translation.validation?.culturallyValidated || false
    if (!culturallyValidated) {
      issues.push('Requires cultural validation review')
    }
    
    // Check sensitivity level
    if (translation.validation?.sensitivityLevel === 'high' && 
        !translation.validation.reviewers?.length) {
      issues.push('High sensitivity entity requires reviewer validation')
    }
    
    return {
      isComplete: missingLanguages.length === 0 && issues.length === 0,
      missingLanguages,
      culturallyValidated,
      issues
    }
  }
  
  /**
   * Get entities by philosophy
   */
  getEntitiesByPhilosophy(philosophyId: string): EntityTranslation[] {
    const entityIds = this.philosophyIndex.get(philosophyId) || []
    return entityIds.map(id => this.getTranslation(id)!).filter(Boolean)
  }
  
  /**
   * Search entities by cultural significance
   */
  getEntitiesByCulturalSignificance(significance: 'low' | 'medium' | 'high'): EntityTranslation[] {
    return Array.from(this.translations.values()).filter(
      translation => translation.baseEntity.culturalSignificance === significance
    )
  }
  
  /**
   * Get translation statistics
   */
  getTranslationStats(): {
    totalEntities: number
    translatedEntities: number
    culturallyValidated: number
    missingTranslations: Record<SupportedLanguage, number>
    highSensitivityEntities: number
  } {
    const total = this.translations.size
    let translated = 0
    let culturallyValidated = 0
    let highSensitivity = 0
    const missing: Record<SupportedLanguage, number> = { en: 0, es: 0, fr: 0, zh: 0 }
    
    for (const translation of this.translations.values()) {
      const validation = this.validateTranslation(translation.id)
      
      if (validation.isComplete) translated++
      if (validation.culturallyValidated) culturallyValidated++
      if (translation.validation?.sensitivityLevel === 'high') highSensitivity++
      
      for (const lang of validation.missingLanguages) {
        missing[lang]++
      }
    }
    
    return {
      totalEntities: total,
      translatedEntities: translated,
      culturallyValidated,
      missingTranslations: missing,
      highSensitivityEntities: highSensitivity
    }
  }
  
  /**
   * Index philosophies for quick lookup
   */
  private indexPhilosophies(): void {
    this.philosophyIndex.clear()
    
    for (const [entityId, translation] of this.translations.entries()) {
      if (translation.philosophies) {
        for (const philosophy of translation.philosophies) {
          const entityIds = this.philosophyIndex.get(philosophy.id) || []
          if (!entityIds.includes(entityId)) {
            entityIds.push(entityId)
            this.philosophyIndex.set(philosophy.id, entityIds)
          }
        }
      }
    }
  }
  
  /**
   * Export translations for external tools
   */
  exportTranslations(): Record<string, EntityTranslation> {
    return Object.fromEntries(this.translations.entries())
  }
  
  /**
   * Import translations from external source
   */
  importTranslations(translations: Record<string, EntityTranslation>): void {
    for (const [id, translation] of Object.entries(translations)) {
      this.addTranslation(translation)
    }
    this.indexPhilosophies()
  }
}

// Singleton instance for the application
export const entityTranslationDB = new EntityTranslationDatabase()

// Export key functions for easy use
export function getEntityTranslation(entityId: string): EntityTranslation | undefined {
  return entityTranslationDB.getTranslation(entityId)
}

export function getLocalizedEntity<T extends BaseEntity>(
  entityId: string, 
  language: SupportedLanguage = 'en'
): T | null {
  return entityTranslationDB.getLocalizedEntity<T>(entityId, language)
}

export function getCulturalContext(
  entityId: string, 
  language: SupportedLanguage = 'en'
): string | undefined {
  return entityTranslationDB.getCulturalContext(entityId, language)
}

export function getEntityPhilosophies(
  entityId: string, 
  language: SupportedLanguage = 'en'
): Array<{id: string, phrase: string, meaning: string, application: string}> {
  return entityTranslationDB.getEntityPhilosophies(entityId, language)
}