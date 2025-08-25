/**
 * Dynamic API endpoint configuration for LEO system
 * This file generates API routes from VitePress data files with comprehensive type safety
 */

import type { App } from 'vitepress'
import type { 
  EntitiesData, 
  ProtocolsData, 
  StructuredDataExport,
  BaseEntity,
  ProtocolEntity,
  ConceptEntity,
  ToolEntity,
  SupportedLanguage
} from './types.d.ts'

// Import data loaders
import entitiesData from './entities.data.js'
import protocolsData from './protocols.data.js'
import schemaData from './schema.data.js'

// Import language utilities and localized endpoints
import { 
  extractLanguageFromQuery, 
  isValidLanguage, 
  SUPPORTED_LANGUAGES,
  getAvailableLanguages
} from './language-utils.js'

// Import localized endpoint generators
import {
  generateEntitiesResponse,
  generateProtocolsResponse,
  generateSchemaResponse,
  generateEntityResponse,
  generateProtocolResponse,
  generateAllLanguageVariants
} from './localized-endpoints.js'

/**
 * Type guard for BaseEntity
 */
function isBaseEntity(obj: unknown): obj is BaseEntity {
  return typeof obj === 'object' && obj !== null &&
    typeof (obj as any).id === 'string' &&
    typeof (obj as any).name === 'string' &&
    typeof (obj as any).description === 'string' &&
    typeof (obj as any).url === 'string'
}

/**
 * Type-safe entity lookup with validation
 */
function findEntitySafely(entityId: string, data: EntitiesData): BaseEntity | null {
  const { protocols, concepts, tools } = data.entities
  
  // Search through all entity types
  const allEntities: BaseEntity[] = [...protocols, ...concepts, ...tools]
  const entity = allEntities.find(e => e.id === entityId)
  
  if (entity && isBaseEntity(entity)) {
    return entity
  }
  
  return null
}

/**
 * Validate API response data structure
 */
function validateAPIResponse<T>(data: T, entityId?: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data || typeof data !== 'object') {
    errors.push('Response data is null or not an object')
    return { valid: false, errors }
  }
  
  if (entityId && isBaseEntity(data)) {
    if ((data as BaseEntity).id !== entityId) {
      errors.push(`Entity ID mismatch: expected ${entityId}, got ${(data as BaseEntity).id}`)
    }
  }
  
  return { valid: errors.length === 0, errors }
}

/**
 * Configure API endpoints for VitePress build with multi-language support
 * This runs at build time to generate static API responses
 */
export function configureAPIEndpoints(app: App) {
  // Configure entities endpoint with language support
  app.router.addRoute({
    path: '/api/entities.json',
    component: async (route: any) => {
      const data = await generateEntitiesResponse(route.fullPath || '')
      
      return {
        render: () => null,
        __asyncResolved: true,
        __vueStaticData: JSON.stringify(data, null, 2)
      }
    }
  })

  // Configure protocols endpoint with language support
  app.router.addRoute({
    path: '/api/protocols.json',
    component: async (route: any) => {
      const data = await generateProtocolsResponse(route.fullPath || '')
      
      return {
        render: () => null,
        __asyncResolved: true,
        __vueStaticData: JSON.stringify(data, null, 2)
      }
    }
  })

  // Configure schema endpoint with language support
  app.router.addRoute({
    path: '/api/schema.json', 
    component: async (route: any) => {
      const data = await generateSchemaResponse(route.fullPath || '')
      
      return {
        render: () => null,
        __asyncResolved: true,
        __vueStaticData: JSON.stringify(data, null, 2)
      }
    }
  })

  // Configure individual entity endpoints with type safety and language support
  app.router.addRoute({
    path: '/api/entities/:id.json',
    component: async (route: any) => {
      const entityId = route.params.id as string
      const data = await generateEntityResponse(entityId, route.fullPath || '')
      
      return {
        render: () => null,
        __asyncResolved: true,
        __vueStaticData: JSON.stringify(data, null, 2)
      }
    }
  })

  // Configure protocol-specific endpoints with enhanced validation and language support
  app.router.addRoute({
    path: '/api/protocols/:id.json',
    component: async (route: any) => {
      const protocolId = route.params.id as string
      const data = await generateProtocolResponse(protocolId, route.fullPath || '')
      
      return {
        render: () => null,
        __asyncResolved: true,
        __vueStaticData: JSON.stringify(data, null, 2)
      }
    }
  })

  console.log('✓ Dynamic LEO API endpoints configured')
}

/**
 * Generate static API files during build with multi-language support
 * This ensures backward compatibility with existing /api/ directory structure
 * and creates localized API endpoints for each language
 */
export async function generateStaticAPIFiles(outDir: string) {
  const fs = await import('fs/promises')
  const path = await import('path')
  
  const locales: SupportedLanguage[] = ['en', 'fr', 'es', 'zh', 'tr']
  
  try {
    // Generate main API directory (English/default)
    const apiDir = path.join(outDir, 'api')
    await fs.mkdir(apiDir, { recursive: true })
    
    // Generate all language variants at build time
    console.log('Generating multi-language API data...')
    const allLanguageData = await generateAllLanguageVariants()
    
    // Use English as the default for backward compatibility
    const entities = allLanguageData.entities.en
    const protocols = allLanguageData.protocols.en
    const schemas = allLanguageData.schemas.en
    
    // Debug check - ensure all required data exists
    if (!entities) {
      console.error('❌ English entities data is undefined!')
      throw new Error('English entities data is undefined')
    }
    if (!protocols) {
      console.error('❌ English protocols data is undefined!')
      throw new Error('English protocols data is undefined')
    }
    if (!schemas) {
      console.error('❌ English schemas data is undefined!')
      throw new Error('English schemas data is undefined')
    }
    
    // Generate default/English API files (backward compatibility)
    const defaultEntitiesData = {
      ...entities,
      metadata: {
        ...(entities.metadata || {}),
        language: 'en' as SupportedLanguage,
        availableLanguages: getAvailableLanguages()
      }
    }
    
    const defaultProtocolsData = {
      ...protocols,
      metadata: {
        ...(protocols.metadata || {}),
        language: 'en' as SupportedLanguage,
        availableLanguages: getAvailableLanguages()
      }
    }
    
    const defaultSchemasData = {
      ...schemas,
      metadata: {
        ...(schemas.metadata || {}),
        language: 'en' as SupportedLanguage,
        availableLanguages: getAvailableLanguages()
      }
    }
    
    await fs.writeFile(
      path.join(apiDir, 'entities.json'),
      JSON.stringify(defaultEntitiesData, null, 2)
    )
    
    await fs.writeFile(
      path.join(apiDir, 'protocols.json'),
      JSON.stringify(defaultProtocolsData, null, 2)
    )
    
    await fs.writeFile(
      path.join(apiDir, 'schema.json'),
      JSON.stringify(defaultSchemasData, null, 2)
    )

    // Generate individual entity files for default API
    for (const protocol of entities.entities.protocols) {
      await fs.writeFile(
        path.join(apiDir, `${protocol.id}.json`),
        JSON.stringify({ entity: protocol, type: 'protocol' }, null, 2)
      )
    }

    for (const concept of entities.entities.concepts) {
      await fs.writeFile(
        path.join(apiDir, `${concept.id}.json`),
        JSON.stringify({ entity: concept, type: 'concept' }, null, 2)
      )
    }

    for (const tool of entities.entities.tools) {
      await fs.writeFile(
        path.join(apiDir, `${tool.id}.json`),
        JSON.stringify({ entity: tool, type: 'tool' }, null, 2)
      )
    }
    
    // Generate localized API directories using pregenerated data
    for (const locale of locales) {
      const localizedApiDir = path.join(outDir, locale === 'en' ? 'api' : `${locale}/api`)
      
      // Skip English since we already created it above
      if (locale === 'en') continue
      
      await fs.mkdir(localizedApiDir, { recursive: true })
      
      // Get pregenerated localized data
      const localizedEntities = {
        ...allLanguageData.entities[locale],
        metadata: {
          ...allLanguageData.entities[locale].metadata,
          generatedAt: new Date().toISOString(),
          baseUrl: locale === 'en' ? '/api/' : `/${locale}/api/`
        }
      }
      
      const localizedProtocols = {
        ...allLanguageData.protocols[locale],
        metadata: {
          ...allLanguageData.protocols[locale].metadata,
          generatedAt: new Date().toISOString(),
          baseUrl: locale === 'en' ? '/api/' : `/${locale}/api/`
        }
      }
      
      const localizedSchemas = {
        ...allLanguageData.schemas[locale],
        metadata: {
          ...allLanguageData.schemas[locale].metadata,
          generatedAt: new Date().toISOString(),
          baseUrl: locale === 'en' ? '/api/' : `/${locale}/api/`
        }
      }
      
      // Write localized API files
      await fs.writeFile(
        path.join(localizedApiDir, 'entities.json'),
        JSON.stringify(localizedEntities, null, 2)
      )
      
      await fs.writeFile(
        path.join(localizedApiDir, 'protocols.json'),
        JSON.stringify(localizedProtocols, null, 2)
      )
      
      await fs.writeFile(
        path.join(localizedApiDir, 'schema.json'),
        JSON.stringify(localizedSchemas, null, 2)
      )

      // Generate individual entity files for each locale using localized data
      const localeEntities = allLanguageData.entities[locale]
      
      for (const protocol of localeEntities.entities.protocols) {
        await fs.writeFile(
          path.join(localizedApiDir, `${protocol.id}.json`),
          JSON.stringify({ 
            entity: protocol, 
            type: 'protocol',
            language: locale,
            availableLanguages: getAvailableLanguages(),
            baseUrl: locale === 'en' ? '/api/' : `/${locale}/api/`
          }, null, 2)
        )
      }

      for (const concept of localeEntities.entities.concepts) {
        await fs.writeFile(
          path.join(localizedApiDir, `${concept.id}.json`),
          JSON.stringify({ 
            entity: concept, 
            type: 'concept',
            language: locale,
            availableLanguages: getAvailableLanguages(),
            baseUrl: locale === 'en' ? '/api/' : `/${locale}/api/`
          }, null, 2)
        )
      }

      for (const tool of localeEntities.entities.tools) {
        await fs.writeFile(
          path.join(localizedApiDir, `${tool.id}.json`),
          JSON.stringify({ 
            entity: tool, 
            type: 'tool',
            language: locale,
            availableLanguages: getAvailableLanguages(),
            baseUrl: locale === 'en' ? '/api/' : `/${locale}/api/`
          }, null, 2)
        )
      }
    }
    
    console.log('✓ Generated multi-language static API files from LEO components')
    console.log(`  - entities.json (${entities.entities.protocols.length + entities.entities.concepts.length + entities.entities.tools.length} entities)`)
    console.log(`  - protocols.json (${protocols.protocols.length} protocols)`)
    console.log(`  - schema.json (${schemas.schemas.length} schemas)`)
    console.log(`  - Generated for locales: ${locales.join(', ')}`)
    
  } catch (error) {
    console.error('Error generating static API files:', error)
    throw error
  }
}

/**
 * Comprehensive API data consistency validation with detailed reporting
 */
export async function validateAPIConsistency(): Promise<boolean> {
  const validationErrors: string[] = []
  const validationWarnings: string[] = []
  
  try {
    const entities = await entitiesData.load()
    const protocols = await protocolsData.load()
    const schemas = await schemaData.load()

    console.log('🔍 Validating API data consistency with enhanced type safety...')

    // 1. Validate entity data structure
    if (!entities || typeof entities !== 'object') {
      validationErrors.push('Entities data is invalid or missing')
    } else {
      if (!entities.entities || typeof entities.entities !== 'object') {
        validationErrors.push('Entities structure is malformed')
      }
      
      if (!entities.metadata || typeof entities.metadata !== 'object') {
        validationErrors.push('Entities metadata is missing')
      }
    }

    // 2. Validate protocols data structure
    if (!protocols || !Array.isArray(protocols.protocols)) {
      validationErrors.push('Protocols data is invalid or missing')
    }

    // 3. Validate schema data structure  
    if (!schemas || !Array.isArray(schemas.schemas)) {
      validationErrors.push('Schema data is invalid or missing')
    }

    // 4. Cross-reference validation: protocols in entities vs protocols data
    if (entities && protocols) {
      const protocolIds = new Set(protocols.protocols.map(p => p.id))
      const entityProtocolIds = entities.entities.protocols.map(p => p.id)
      
      for (const id of entityProtocolIds) {
        if (!protocolIds.has(id)) {
          validationWarnings.push(`Protocol ${id} exists in entities but not in protocols data`)
        }
      }
    }

    // 5. Validate required KEVIN data with enhanced checks
    if (entities) {
      const kevinEntity = entities.entities.concepts.find(c => c.id === 'kevin')
      if (!kevinEntity) {
        validationErrors.push('KEVIN entity is missing from concepts')
      } else {
        // Validate KEVIN entity structure
        if (!kevinEntity.culturalSignificance || kevinEntity.culturalSignificance !== 'high') {
          validationWarnings.push('KEVIN entity should have high cultural significance')
        }
        
        if (!kevinEntity.creator || kevinEntity.creator !== 'Arwyn') {
          validationWarnings.push('KEVIN entity should credit Arwyn as creator')
        }
        
        if (!kevinEntity.firstStampNumber || kevinEntity.firstStampNumber !== 4258) {
          validationWarnings.push('KEVIN entity should reference stamp number 4258')
        }
        
        if (!kevinEntity.src20StampNumber || kevinEntity.src20StampNumber !== 18516) {
          validationWarnings.push('KEVIN entity should reference SRC-20 stamp number 18516')
        }
      }
    }

    // 6. Validate SRC-20 KEVIN legacy data
    if (protocols) {
      const src20Protocol = protocols.protocols.find(p => p.id === 'src-20')
      if (!src20Protocol) {
        validationErrors.push('SRC-20 protocol is missing from protocols data')
      } else {
        if (!src20Protocol.kevinLegacy) {
          validationWarnings.push('SRC-20 protocol is missing KEVIN legacy data')
        } else {
          if (!src20Protocol.kevinLegacy.pioneeredBy) {
            validationWarnings.push('SRC-20 KEVIN legacy should indicate it was pioneered by KEVIN')
          }
        }
      }
    }

    // 7. Validate Schema.org data
    if (schemas) {
      const bitcoinStampsSchema = schemas.schemas.find(s => s.name === 'Bitcoin Stamps')
      if (!bitcoinStampsSchema) {
        validationErrors.push('Bitcoin Stamps schema is missing')
      } else {
        if (!bitcoinStampsSchema['@type'] || !bitcoinStampsSchema['@context']) {
          validationErrors.push('Bitcoin Stamps schema is missing required Schema.org properties')
        }
      }
      
      const kevinSchema = schemas.schemas.find(s => s.name === 'KEVIN Token')
      if (!kevinSchema) {
        validationWarnings.push('KEVIN Token schema is missing from Schema.org data')
      }
    }

    // 8. Validate entity relationships
    if (entities) {
      for (const protocol of entities.entities.protocols) {
        for (const relationship of protocol.relationships) {
          if (!relationship.id || !relationship.type) {
            validationWarnings.push(`Protocol ${protocol.id} has malformed relationship`)
          }
        }
      }
    }

    // 9. Report validation results
    if (validationErrors.length > 0) {
      console.error('❌ API data validation failed:')
      validationErrors.forEach(error => console.error(`  • ${error}`))
      return false
    }

    if (validationWarnings.length > 0) {
      console.warn('⚠️  API data validation warnings:')
      validationWarnings.forEach(warning => console.warn(`  • ${warning}`))
    }

    console.log('✅ API data consistency validation passed')
    console.log(`📊 Validation summary:`)  
    console.log(`  • Entities: ${entities?.entities?.protocols?.length || 0} protocols, ${entities?.entities?.concepts?.length || 0} concepts, ${entities?.entities?.tools?.length || 0} tools`)
    console.log(`  • Protocols: ${protocols?.protocols?.length || 0} detailed protocol definitions`)
    console.log(`  • Schemas: ${schemas?.schemas?.length || 0} Schema.org structured data entries`)
    console.log(`  • Warnings: ${validationWarnings.length}`)
    
    return true

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown validation error'
    console.error('❌ API data validation exception:', errorMessage)
    return false
  }
}

export { entitiesData, protocolsData, schemaData }