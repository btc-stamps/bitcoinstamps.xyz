/**
 * Language utilities for multi-language LEO API support
 * Provides functions for handling multi-language content, localization,
 * and cultural context adaptation for Bitcoin Stamps ecosystem
 */

import type { 
  SupportedLanguage, 
  MultiLangText, 
  MultiLangOptionalText,
  MultiLangRelationship,
  BaseEntity,
  ProtocolEntity,
  ConceptEntity,
  ToolEntity,
  ProtocolMetadata
} from './types.d.ts'

/**
 * Default language fallback order
 */
export const LANGUAGE_FALLBACK: Record<SupportedLanguage, SupportedLanguage[]> = {
  en: ['en', 'es', 'fr', 'zh', 'tr'],
  es: ['es', 'en', 'fr', 'zh', 'tr'],
  fr: ['fr', 'en', 'es', 'zh', 'tr'],
  zh: ['zh', 'en', 'es', 'fr', 'tr'],
  tr: ['tr', 'en', 'es', 'fr', 'zh']
}

/**
 * Supported languages for the API
 */
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'es', 'fr', 'zh', 'tr']

/**
 * Language names in their native script
 */
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  zh: '中文',
  tr: 'Türkçe'
}

/**
 * Extract query parameter for language from URL
 */
export function extractLanguageFromQuery(url: string): SupportedLanguage {
  const urlObj = new URL(url, 'http://localhost')
  const lang = urlObj.searchParams.get('lang') as SupportedLanguage
  
  if (lang && SUPPORTED_LANGUAGES.includes(lang)) {
    return lang
  }
  
  return 'en' // Default fallback
}

/**
 * Get localized text from MultiLangText or string
 */
export function getLocalizedText(
  text: string | MultiLangText, 
  language: SupportedLanguage = 'en'
): string {
  if (typeof text === 'string') {
    return text
  }
  
  // Try requested language first
  if (text[language]) {
    return text[language]
  }
  
  // Use fallback order
  const fallbackOrder = LANGUAGE_FALLBACK[language]
  for (const fallbackLang of fallbackOrder) {
    if (text[fallbackLang]) {
      return text[fallbackLang]
    }
  }
  
  // Last resort: return any available text
  const availableText = Object.values(text).find(t => t && t.trim())
  return availableText || ''
}

/**
 * Get localized optional text
 */
export function getLocalizedOptionalText(
  text: MultiLangOptionalText | undefined, 
  language: SupportedLanguage = 'en'
): string | undefined {
  if (!text) return undefined
  
  // Try requested language first
  if (text[language]) {
    return text[language]
  }
  
  // Use fallback order
  const fallbackOrder = LANGUAGE_FALLBACK[language]
  for (const fallbackLang of fallbackOrder) {
    if (text[fallbackLang]) {
      return text[fallbackLang]
    }
  }
  
  return undefined
}

/**
 * Get localized array of text items
 */
export function getLocalizedArray(
  items: string[] | MultiLangText[], 
  language: SupportedLanguage = 'en'
): string[] {
  if (!Array.isArray(items)) return []
  
  return items.map(item => {
    if (typeof item === 'string') {
      return item
    }
    return getLocalizedText(item, language)
  })
}

/**
 * Localize relationships array
 */
export function getLocalizedRelationships(
  relationships: Array<{id: string, type: any, name?: string, description?: string}> | MultiLangRelationship[],
  language: SupportedLanguage = 'en'
): Array<{id: string, type: any, name?: string, description?: string}> {
  if (!Array.isArray(relationships)) return []
  
  return relationships.map(rel => {
    // If it's already a simple relationship, return as-is
    if (typeof rel.name === 'string' || rel.name === undefined) {
      return rel as {id: string, type: any, name?: string, description?: string}
    }
    
    // Otherwise, localize the multilingual relationship
    const multiLangRel = rel as MultiLangRelationship
    return {
      id: multiLangRel.id,
      type: multiLangRel.type,
      name: getLocalizedOptionalText(multiLangRel.name, language),
      description: getLocalizedOptionalText(multiLangRel.description, language)
    }
  })
}

/**
 * Localize a base entity
 */
export function localizeBaseEntity<T extends BaseEntity>(
  entity: T, 
  language: SupportedLanguage = 'en'
): T {
  return {
    ...entity,
    name: getLocalizedText(entity.name, language),
    description: getLocalizedText(entity.description, language),
    relationships: getLocalizedRelationships(entity.relationships, language)
  }
}

/**
 * Localize a protocol entity
 */
export function localizeProtocolEntity(
  protocol: ProtocolEntity, 
  language: SupportedLanguage = 'en'
): ProtocolEntity {
  return {
    ...localizeBaseEntity(protocol, language),
    features: getLocalizedArray(protocol.features, language),
    kevinLegacy: protocol.kevinLegacy ? {
      pioneeredBy: protocol.kevinLegacy.pioneeredBy,
      culturalImpact: getLocalizedText(protocol.kevinLegacy.culturalImpact, language),
      successPattern: getLocalizedText(protocol.kevinLegacy.successPattern, language)
    } : undefined
  }
}

/**
 * Localize a concept entity
 */
export function localizeConceptEntity(
  concept: ConceptEntity, 
  language: SupportedLanguage = 'en'
): ConceptEntity {
  return {
    ...localizeBaseEntity(concept, language),
    features: concept.features ? getLocalizedArray(concept.features, language) : undefined,
    culturalMetadata: concept.culturalMetadata ? {
      impact: getLocalizedText(concept.culturalMetadata.impact, language),
      significance: getLocalizedText(concept.culturalMetadata.significance, language),
      communitySize: concept.culturalMetadata.communitySize
    } : undefined
  }
}

/**
 * Localize a tool entity
 */
export function localizeToolEntity(
  tool: ToolEntity, 
  language: SupportedLanguage = 'en'
): ToolEntity {
  return {
    ...localizeBaseEntity(tool, language),
    features: getLocalizedArray(tool.features, language)
  }
}

/**
 * Localize protocol metadata
 */
export function localizeProtocolMetadata(
  protocol: ProtocolMetadata, 
  language: SupportedLanguage = 'en'
): ProtocolMetadata {
  return {
    ...protocol,
    name: getLocalizedText(protocol.name, language),
    description: getLocalizedText(protocol.description, language),
    features: getLocalizedArray(protocol.features, language),
    relationships: protocol.relationships.map(rel => ({
      ...rel,
      description: typeof rel.description === 'string' 
        ? rel.description 
        : getLocalizedText(rel.description, language)
    })),
    kevinLegacy: protocol.kevinLegacy ? {
      pioneeredBy: protocol.kevinLegacy.pioneeredBy,
      culturalImpact: getLocalizedText(protocol.kevinLegacy.culturalImpact, language),
      successPattern: getLocalizedText(protocol.kevinLegacy.successPattern, language)
    } : undefined
  }
}

/**
 * Cultural significance terms in different languages
 */
export const CULTURAL_SIGNIFICANCE_LABELS: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    low: 'Low cultural significance',
    medium: 'Medium cultural significance', 
    high: 'High cultural significance'
  },
  es: {
    low: 'Significado cultural bajo',
    medium: 'Significado cultural medio',
    high: 'Significado cultural alto'
  },
  fr: {
    low: 'Signification culturelle faible',
    medium: 'Signification culturelle moyenne',
    high: 'Signification culturelle élevée'
  },
  zh: {
    low: '文化意义较低',
    medium: '文化意义中等',
    high: '文化意义很高'
  },
  tr: {
    low: 'Düşük kültürel önem',
    medium: 'Orta düzeyde kültürel önem',
    high: 'Yüksek kültürel önem'
  }
}

/**
 * Bitcoin/Crypto terminology by language
 */
export const CRYPTO_TERMINOLOGY: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    bitcoin: 'Bitcoin',
    blockchain: 'Blockchain',
    token: 'Token',
    stamps: 'Stamps',
    protocol: 'Protocol',
    nft: 'NFT',
    holder: 'Holder',
    transaction: 'Transaction',
    utxo: 'UTXO',
    block: 'Block',
    address: 'Address',
    wallet: 'Wallet'
  },
  es: {
    bitcoin: 'Bitcoin',
    blockchain: 'Cadena de bloques',
    token: 'Token',
    stamps: 'Sellos',
    protocol: 'Protocolo',
    nft: 'NFT',
    holder: 'Titular',
    transaction: 'Transacción',
    utxo: 'UTXO',
    block: 'Bloque',
    address: 'Dirección',
    wallet: 'Cartera'
  },
  fr: {
    bitcoin: 'Bitcoin',
    blockchain: 'Chaîne de blocs',
    token: 'Jeton',
    stamps: 'Tampons',
    protocol: 'Protocole',
    nft: 'NFT',
    holder: 'Détenteur',
    transaction: 'Transaction',
    utxo: 'UTXO',
    block: 'Bloc',
    address: 'Adresse',
    wallet: 'Portefeuille'
  },
  zh: {
    bitcoin: '比特币',
    blockchain: '区块链',
    token: '代币',
    stamps: '邮票',
    protocol: '协议',
    nft: 'NFT',
    holder: '持有者',
    transaction: '交易',
    utxo: 'UTXO',
    block: '区块',
    address: '地址',
    wallet: '钱包'
  },
  tr: {
    bitcoin: 'Bitcoin',
    blockchain: 'Blok Zinciri',
    token: 'Token',
    stamps: 'Damgalar',
    protocol: 'Protokol',
    nft: 'NFT',
    holder: 'Sahibi',
    transaction: 'İşlem',
    utxo: 'UTXO',
    block: 'Blok',
    address: 'Adres',
    wallet: 'Cüzdan'
  }
}

/**
 * Get localized crypto terminology
 */
export function getCryptoTerm(
  term: string, 
  language: SupportedLanguage = 'en'
): string {
  return CRYPTO_TERMINOLOGY[language]?.[term.toLowerCase()] || term
}

/**
 * Get localized cultural significance label
 */
export function getCulturalSignificanceLabel(
  level: string, 
  language: SupportedLanguage = 'en'
): string {
  return CULTURAL_SIGNIFICANCE_LABELS[language]?.[level.toLowerCase()] || level
}

/**
 * Validate language parameter
 */
export function isValidLanguage(lang: unknown): lang is SupportedLanguage {
  return typeof lang === 'string' && SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)
}

/**
 * Create URL with language parameter
 */
export function createLocalizedUrl(baseUrl: string, language: SupportedLanguage): string {
  const url = new URL(baseUrl, 'http://localhost')
  url.searchParams.set('lang', language)
  return url.pathname + url.search
}

/**
 * Get available languages for API responses
 */
export function getAvailableLanguages(): SupportedLanguage[] {
  return [...SUPPORTED_LANGUAGES]
}