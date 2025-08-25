/**
 * Localized API endpoint handlers for multi-language LEO system
 * Handles dynamic language parameter processing and data localization
 */

import type { 
  EntitiesData, 
  ProtocolsData, 
  StructuredDataExport,
  SupportedLanguage
} from './types.d.ts'

// Import data loaders
import entitiesData from './entities.data.js'
import protocolsData from './protocols.data.js'
import schemaData from './schema.data.js'

// Import language utilities
import { 
  extractLanguageFromQuery, 
  isValidLanguage, 
  getAvailableLanguages,
  localizeBaseEntity,
  localizeProtocolEntity,
  localizeConceptEntity, 
  localizeToolEntity,
  localizeProtocolMetadata
} from './language-utils.js'

/**
 * Generate localized entities endpoint response
 */
export async function generateEntitiesResponse(requestUrl?: string): Promise<EntitiesData> {
  const language = requestUrl ? extractLanguageFromQuery(requestUrl) : 'en'
  
  try {
    // Load raw data first
    const data = await entitiesData.load()
    
    // Localize all entities
    const localizedProtocols = data.entities.protocols.map(protocol => 
      localizeProtocolEntity(protocol, language)
    )
    
    const localizedConcepts = data.entities.concepts.map(concept => 
      localizeConceptEntity(concept, language)
    )
    
    const localizedTools = data.entities.tools.map(tool => 
      localizeToolEntity(tool, language)
    )
    
    return {
      entities: {
        protocols: localizedProtocols,
        concepts: localizedConcepts,
        tools: localizedTools
      },
      metadata: {
        ...data.metadata,
        language,
        availableLanguages: getAvailableLanguages()
      }
    }
  } catch (error) {
    console.error(`Error generating entities response for ${language}:`, error)
    throw error
  }
}

/**
 * Generate localized protocols endpoint response
 */
export async function generateProtocolsResponse(requestUrl?: string): Promise<ProtocolsData> {
  const language = requestUrl ? extractLanguageFromQuery(requestUrl) : 'en'
  
  try {
    // Load raw data first  
    const data = await protocolsData.load()
    
    // Localize all protocols
    const localizedProtocols = data.protocols.map(protocol => 
      localizeProtocolMetadata(protocol, language)
    )
    
    return {
      protocols: localizedProtocols,
      metadata: {
        ...data.metadata,
        language,
        availableLanguages: getAvailableLanguages()
      }
    }
  } catch (error) {
    console.error(`Error generating protocols response for ${language}:`, error)
    throw error
  }
}

/**
 * Generate localized schema endpoint response
 */
export async function generateSchemaResponse(requestUrl?: string): Promise<StructuredDataExport> {
  const language = requestUrl ? extractLanguageFromQuery(requestUrl) : 'en'
  
  try {
    const data = await schemaData.load(language)
    
    return {
      ...data,
      metadata: {
        ...data.metadata,
        language,
        availableLanguages: getAvailableLanguages()
      }
    }
  } catch (error) {
    console.error(`Error generating schema response for ${language}:`, error)
    throw error
  }
}

/**
 * Generate localized individual entity response
 */
export async function generateEntityResponse(entityId: string, requestUrl?: string) {
  const language = requestUrl ? extractLanguageFromQuery(requestUrl) : 'en'
  
  try {
    const entitiesResponse = await generateEntitiesResponse(requestUrl)
    
    // Find entity across all types
    const allEntities = [
      ...entitiesResponse.entities.protocols,
      ...entitiesResponse.entities.concepts,
      ...entitiesResponse.entities.tools
    ]
    
    const entity = allEntities.find(e => e.id === entityId)
    
    if (!entity) {
      return {
        error: 'Entity not found',
        id: entityId,
        language,
        availableLanguages: getAvailableLanguages(),
        availableEntities: allEntities.map(e => e.id)
      }
    }
    
    // Determine entity type
    let entityType = 'unknown'
    if (entitiesResponse.entities.protocols.some(p => p.id === entityId)) {
      entityType = 'protocol'
    } else if (entitiesResponse.entities.concepts.some(c => c.id === entityId)) {
      entityType = 'concept'
    } else if (entitiesResponse.entities.tools.some(t => t.id === entityId)) {
      entityType = 'tool'
    }
    
    return {
      entity,
      type: entityType,
      language,
      availableLanguages: getAvailableLanguages(),
      metadata: entitiesResponse.metadata
    }
  } catch (error) {
    console.error(`Error generating entity response for ${entityId} in ${language}:`, error)
    return {
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      id: entityId,
      language,
      availableLanguages: getAvailableLanguages()
    }
  }
}

/**
 * Generate localized protocol response
 */
export async function generateProtocolResponse(protocolId: string, requestUrl?: string) {
  const language = requestUrl ? extractLanguageFromQuery(requestUrl) : 'en'
  
  try {
    const protocolsResponse = await generateProtocolsResponse(requestUrl)
    const protocol = protocolsResponse.protocols.find(p => p.id === protocolId)
    
    if (!protocol) {
      return {
        error: 'Protocol not found',
        id: protocolId,
        language,
        availableLanguages: getAvailableLanguages(),
        availableProtocols: protocolsResponse.protocols.map(p => p.id)
      }
    }
    
    return {
      protocol,
      language,
      availableLanguages: getAvailableLanguages(),
      metadata: protocolsResponse.metadata
    }
  } catch (error) {
    console.error(`Error generating protocol response for ${protocolId} in ${language}:`, error)
    return {
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      id: protocolId,
      language,
      availableLanguages: getAvailableLanguages()
    }
  }
}

/**
 * Validate language parameter and provide fallback
 */
export function validateAndNormalizeLanguage(lang: unknown): SupportedLanguage {
  if (isValidLanguage(lang)) {
    return lang
  }
  
  // If it's a string but not supported, check for common variations
  if (typeof lang === 'string') {
    const normalized = lang.toLowerCase()
    switch (normalized) {
      case 'zh-cn':
      case 'zh-hans':
      case 'chinese':
        return 'zh'
      case 'spanish':
      case 'español':
        return 'es'  
      case 'french':
      case 'français':
        return 'fr'
      case 'english':
        return 'en'
      default:
        console.warn(`Unsupported language: ${lang}, falling back to English`)
        return 'en'
    }
  }
  
  return 'en' // Default fallback
}

/**
 * Create language-aware API response wrapper
 */
export function createLocalizedAPIResponse<T>(
  data: T, 
  language: SupportedLanguage, 
  success: boolean = true,
  error?: { code: string; message: string; details?: unknown }
) {
  return {
    data,
    language,
    availableLanguages: getAvailableLanguages(),
    success,
    error,
    timestamp: new Date().toISOString(),
    apiVersion: 'v1'
  }
}

/**
 * Generate all language variants for build-time static generation
 */
export async function generateAllLanguageVariants() {
  const languages = getAvailableLanguages()
  const results = {
    entities: {} as Record<SupportedLanguage, EntitiesData>,
    protocols: {} as Record<SupportedLanguage, ProtocolsData>,
    schemas: {} as Record<SupportedLanguage, StructuredDataExport>
  }
  
  for (const language of languages) {
    console.log(`Generating data for language: ${language}`)
    
    try {
      results.entities[language] = await generateEntitiesResponse(`?lang=${language}`)
      results.protocols[language] = await generateProtocolsResponse(`?lang=${language}`)
      results.schemas[language] = await generateSchemaResponse(`?lang=${language}`)
    } catch (error) {
      console.error(`Error generating data for language ${language}:`, error)
      // Use fallback to English if specific language fails
      if (language !== 'en') {
        console.log(`Using English fallback for ${language}`)
        results.entities[language] = await generateEntitiesResponse(`?lang=en`)
        results.protocols[language] = await generateProtocolsResponse(`?lang=en`)
        results.schemas[language] = await generateSchemaResponse(`?lang=en`)
      } else {
        throw error // Don't fallback if English itself fails
      }
    }
  }
  
  return results
}