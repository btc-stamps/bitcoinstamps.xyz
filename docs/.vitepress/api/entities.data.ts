import { readFile, readdir } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import type { 
  ProtocolEntity, 
  ConceptEntity, 
  ToolEntity, 
  EntitiesData,
  SafeParseResult,
  ComponentPropExtractionResult,
  CulturalSignificance,
  EntityRelationshipType,
  SupportedLanguage
} from './types.d.ts'

// Import multilingual data and utilities
import { getAllMultilingualEntities, getAllMultilingualProtocols } from './multilingual-data.js'
import {
  localizeProtocolEntity,
  getAvailableLanguages
} from './language-utils.js'

// Get current directory for relative imports
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const docsDir = join(__dirname, '../../')

/**
 * Safe JSON parsing utilities with comprehensive error handling
 */

/**
 * Safely parse a JSON string with detailed error reporting
 */
function safeParseJSON<T>(jsonString: string, fallback: T): SafeParseResult<T> {
  try {
    const parsed = JSON.parse(jsonString) as T
    return { data: parsed, success: true }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error'
    return { 
      data: fallback, 
      success: false, 
      error: errorMessage 
    }
  }
}

/**
 * Parse Vue.js-style array attributes with single quotes
 * Converts ['item1', 'item2'] to valid JSON
 * Handles nested quotes correctly
 */
function parseVueArrayAttribute(attributeValue: string): SafeParseResult<string[]> {
  if (!attributeValue) {
    return { data: [], success: true }
  }
  
  try {
    // Handle Vue-style arrays with single quotes
    let cleanValue = attributeValue.trim()
    
    // Remove outer quotes if present (attribute wrapping)
    if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
        (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
      cleanValue = cleanValue.slice(1, -1)
    }
    
    // Smart quote replacement: only replace quotes that delimit array items
    // Pattern: finds single quotes that are array element delimiters, not content quotes
    const jsonString = cleanValue.replace(
      /(\[|\,\s*)'([^']*)'(\s*\,|\s*\])/g, 
      '$1"$2"$3'
    )
    
    const result = safeParseJSON<string[]>(jsonString, [])
    
    // If still failing, try a more aggressive approach
    if (!result.success) {
      // Split by array pattern and manually construct
      const arrayMatch = cleanValue.match(/^\[(.*)\]$/)
      if (arrayMatch) {
        const content = arrayMatch[1]
        // Split by comma but respect quotes
        const items: string[] = []
        let current = ''
        let inQuotes = false
        let quoteChar = ''
        
        for (let i = 0; i < content.length; i++) {
          const char = content[i]
          
          if ((char === '"' || char === "'") && !inQuotes) {
            inQuotes = true
            quoteChar = char
          } else if (char === quoteChar && inQuotes) {
            inQuotes = false
            quoteChar = ''
          } else if (char === ',' && !inQuotes) {
            if (current.trim()) {
              // Remove surrounding quotes and add to array
              const trimmed = current.trim()
              const item = trimmed.startsWith("'") && trimmed.endsWith("'") 
                ? trimmed.slice(1, -1) 
                : trimmed.startsWith('"') && trimmed.endsWith('"')
                ? trimmed.slice(1, -1)
                : trimmed
              items.push(item)
            }
            current = ''
            continue
          }
          
          if (char !== quoteChar || inQuotes) {
            current += char
          }
        }
        
        // Add last item
        if (current.trim()) {
          const trimmed = current.trim()
          const item = trimmed.startsWith("'") && trimmed.endsWith("'") 
            ? trimmed.slice(1, -1) 
            : trimmed.startsWith('"') && trimmed.endsWith('"')
            ? trimmed.slice(1, -1)
            : trimmed
          items.push(item)
        }
        
        return { data: items, success: true }
      }
    }
    
    return result
  } catch (error) {
    return { 
      data: [], 
      success: false, 
      error: `Failed to parse array attribute: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }
  }
}

/**
 * Parse Vue.js-style object attributes with single quotes
 * Handles complex nested objects and arrays correctly
 */
function parseVueObjectAttribute<T>(attributeValue: string, fallback: T): SafeParseResult<T> {
  if (!attributeValue) {
    return { data: fallback, success: true }
  }
  
  try {
    // Handle Vue-style objects with single quotes  
    let cleanValue = attributeValue.trim()
    
    // Remove outer quotes if present (attribute wrapping)
    if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
        (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
      cleanValue = cleanValue.slice(1, -1)
    }
    
    // Smart quote replacement for JavaScript object literals to JSON
    // This handles unquoted keys and single-quoted values
    let jsonString = cleanValue
    
    // First, convert JavaScript object literal keys to quoted JSON keys
    // Match unquoted keys like "id:" and convert to "id":  
    jsonString = jsonString.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
    
    // Then convert single quotes to double quotes for values
    // But be careful not to mess up already-quoted keys
    let quotedResult = ''
    let inQuotes = false
    let quoteChar = ''
    
    for (let i = 0; i < jsonString.length; i++) {
      const char = jsonString[i]
      
      if (char === "'" && !inQuotes) {
        // Start of single-quoted string - convert to double quote
        quotedResult += '"'
        inQuotes = true
        quoteChar = "'"
      } else if (char === "'" && inQuotes && quoteChar === "'") {
        // End of single-quoted string - convert to double quote
        quotedResult += '"'
        inQuotes = false
        quoteChar = ''
      } else if (char === '"' && !inQuotes) {
        // Already double quote - keep as is
        quotedResult += char
        inQuotes = true
        quoteChar = '"'
      } else if (char === '"' && inQuotes && quoteChar === '"') {
        // End of double quoted string
        quotedResult += char
        inQuotes = false  
        quoteChar = ''
      } else {
        // Regular character or character inside quotes
        quotedResult += char
      }
    }
    
    jsonString = quotedResult
    
    const result = safeParseJSON<T>(jsonString, fallback)
    
    // If parsing still fails, try to extract as array manually
    if (!result.success && Array.isArray(fallback)) {
      try {
        // Handle array of objects like [{ id: 'x', name: 'y' }, ...]
        const arrayMatch = cleanValue.match(/^\[(.*)\]$/s)
        if (arrayMatch) {
          const content = arrayMatch[1].trim()
          const objects: any[] = []
          
          // Simple object splitting by },
          const objectStrings = content.split(/},\s*{/)
          
          for (let i = 0; i < objectStrings.length; i++) {
            let objStr = objectStrings[i].trim()
            
            // Add back braces if needed
            if (i === 0 && !objStr.startsWith('{')) objStr = '{' + objStr
            if (i === objectStrings.length - 1 && !objStr.endsWith('}')) objStr = objStr + '}'
            if (i > 0 && i < objectStrings.length - 1) objStr = '{' + objStr + '}'
            
            // Parse individual object with improved quote handling
            const cleanObj = objStr.replace(/'([^']+)':/g, '"$1":').replace(/:\s*'([^']*)'/g, ':"$1"')
            
            try {
              const parsed = JSON.parse(cleanObj)
              objects.push(parsed)
            } catch (e) {
              console.warn(`Failed to parse object: ${objStr}`, e)
            }
          }
          
          return { data: objects as T, success: true }
        }
      } catch (arrayError) {
        // Continue to error handling below
      }
    }
    
    return result
  } catch (error) {
    return { 
      data: fallback, 
      success: false, 
      error: `Failed to parse object attribute: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }
  }
}

/**
 * Validate cultural significance value with type guard
 */
function isValidCulturalSignificance(value: string): value is CulturalSignificance {
  return ['low', 'medium', 'high'].includes(value)
}

/**
 * Type guard for entity relationship type
 * Normalizes space-separated to dash-separated format
 */
function isValidRelationshipType(value: string): value is EntityRelationshipType {
  const validTypes: EntityRelationshipType[] = [
    'extends', 'optimizes', 'complements', 'requires', 'pioneered-by',
    'inspired-by', 'created-by', 'benefits', 'exemplified-by', 'strengthened-by',
    'originated-from', 'mascot-of', 'includes', 'implements', 'supports', 'identifies',
    'mythical-guide', 'optimized-by', 'architected-by', 'guided-by',
    'enables', 'builds-on', 'indexes', 'enhances', 'compatible-with',
    'derives-from', 'measures', 'governs'
  ]
  
  // Normalize spaces to dashes for comparison
  const normalizedValue = value.replace(/\s+/g, '-').toLowerCase()
  return validTypes.includes(normalizedValue as EntityRelationshipType)
}

/**
 * Normalize relationship type from space-separated to dash-separated
 */
function normalizeRelationshipType(value: string): EntityRelationshipType | string {
  const normalized = value.replace(/\s+/g, '-').toLowerCase()
  
  const validTypes: EntityRelationshipType[] = [
    'extends', 'optimizes', 'complements', 'requires', 'pioneered-by',
    'inspired-by', 'created-by', 'benefits', 'exemplified-by', 'strengthened-by',
    'originated-from', 'mascot-of', 'includes', 'implements', 'supports', 'identifies',
    'mythical-guide', 'optimized-by', 'architected-by', 'guided-by',
    'enables', 'builds-on', 'indexes', 'enhances', 'compatible-with',
    'derives-from', 'measures', 'governs'
  ]
  
  return validTypes.includes(normalized as EntityRelationshipType) ? normalized as EntityRelationshipType : value
}

/**
 * Extract protocol entities from multilingual data definitions.
 *
 * Previously this scanned markdown files for <ProtocolCard> components,
 * but those only existed in Turkish locale files — producing plain Turkish
 * strings instead of proper MultiLangText objects for all other languages.
 * Now uses the authoritative multilingual protocol data directly.
 */
async function extractProtocolCards(_language: SupportedLanguage = 'en'): Promise<ProtocolEntity[]> {
  const multilingualProtocols = getAllMultilingualProtocols()

  const protocolEntities: ProtocolEntity[] = multilingualProtocols.map(pm => ({
    id: pm.id,
    name: pm.name,
    description: pm.description,
    type: 'protocol' as const,
    culturalSignificance: pm.culturalSignificance,
    features: pm.features,
    relationships: pm.relationships,
    url: `/protocols/${pm.id}`,
    blockIntroduced: pm.blockIntroduced,
    status: pm.status,
    version: pm.version,
    ...(pm.kevinLegacy && { kevinLegacy: pm.kevinLegacy }),
  }))

  console.log(`✅ Successfully extracted ${protocolEntities.length} protocol entities from multilingual data`)
  return protocolEntities
}

/**
 * Extract StructuredData entities for concepts with multilingual support
 */
async function extractStructuredDataEntities(_language: SupportedLanguage = 'en'): Promise<ConceptEntity[]> {
  // Return raw multilingual entities - localization is applied later
  // by localizeConceptEntity() in localized-endpoints.ts per language
  const multilingualEntities = getAllMultilingualEntities()
  return multilingualEntities.concepts
}

/**
 * Extract tool entities with multilingual support
 */
async function extractToolEntities(_language: SupportedLanguage = 'en'): Promise<ToolEntity[]> {
  // Return raw multilingual entities - localization is applied later
  // by localizeToolEntity() in localized-endpoints.ts per language
  const multilingualEntities = getAllMultilingualEntities()
  return multilingualEntities.tools
}

/**
 * Parse ProtocolCard component props from markup with enhanced type safety
 */
function parseProtocolCard(markup: string): ComponentPropExtractionResult<ProtocolEntity> {
  const errors: string[] = []
  
  try {
    // Extract protocol attribute (required)
    const protocolMatch = markup.match(/protocol="([^"]+)"/)
    if (!protocolMatch) {
      return {
        data: null,
        errors: ['Protocol attribute is required'],
        source: markup,
        success: false
      }
    }
    
    const protocol = protocolMatch[1]
    
    // Extract description (required)
    const descriptionMatch = markup.match(/description="([^"]+)"/)
    const description = descriptionMatch ? descriptionMatch[1] : ''
    if (!description) {
      errors.push('Description is missing or empty')
    }
    
    // Extract features array with safe parsing
    const featuresMatch = markup.match(/:features="(\[.*?\])"/s)
    let features: string[] = []
    if (featuresMatch) {
      const featuresResult = parseVueArrayAttribute(featuresMatch[1])
      if (featuresResult.success && featuresResult.data) {
        features = featuresResult.data
      } else {
        errors.push(`Features parsing failed: ${featuresResult.error || 'Unknown error'}`)
      }
    }
    
    // Extract block height with validation
    const blockHeightMatch = markup.match(/:block-height="(\d+)"/)
    let blockHeight: number | undefined
    if (blockHeightMatch) {
      const height = parseInt(blockHeightMatch[1])
      if (isNaN(height) || height < 0) {
        errors.push('Invalid block height: must be a positive number')
      } else {
        blockHeight = height
      }
    }
    
    // Extract and validate cultural significance
    const culturalSigMatch = markup.match(/cultural-significance="([^"]+)"/)
    let culturalSignificance: CulturalSignificance = 'medium'
    if (culturalSigMatch) {
      if (isValidCulturalSignificance(culturalSigMatch[1])) {
        culturalSignificance = culturalSigMatch[1]
      } else {
        errors.push(`Invalid cultural significance: ${culturalSigMatch[1]}. Must be 'low', 'medium', or 'high'`)
      }
    }
    
    // Extract related protocols with safe parsing
    const relatedMatch = markup.match(/:related-protocols="(\[.*?\])"/s)
    let relationships: Array<{ id: string; type: EntityRelationshipType | string; name?: string }> = []
    if (relatedMatch) {
      const relatedResult = parseVueObjectAttribute(relatedMatch[1], [])
      if (relatedResult.success && relatedResult.data) {
        relationships = (relatedResult.data as any[]).map((r: any) => {
          const relationshipType = r.relationship || 'related-to'
          const normalizedType = normalizeRelationshipType(relationshipType)
          
          if (!isValidRelationshipType(relationshipType)) {
            errors.push(`Unknown relationship type: ${relationshipType}`)
          }
          
          return {
            id: r.id || 'unknown',
            type: normalizedType,
            name: r.name
          }
        }).filter(Boolean)
      } else {
        errors.push(`Related protocols parsing failed: ${relatedResult.error || 'Unknown error'}`)
      }
    }
    
    // Check for KEVIN legacy attribute
    const kevinLegacyMatch = markup.match(/kevin-legacy="([^"]+)"/)
    const hasKevinLegacy = kevinLegacyMatch && kevinLegacyMatch[1] === 'true'
    
    const protocolEntity: ProtocolEntity = {
      id: protocol,
      name: getProtocolName(protocol),
      type: 'protocol',
      description,
      culturalSignificance,
      blockIntroduced: blockHeight,
      features,
      relationships,
      url: `/protocols/${protocol}`,
      ...(hasKevinLegacy && {
        kevinLegacy: {
          pioneeredBy: true,
          culturalImpact: 'High - established foundational patterns for Bitcoin Stamps ecosystem',
          successPattern: 'Authentic artistic vision + community building + long-term commitment'
        }
      })
    }
    
    return {
      data: protocolEntity,
      errors,
      source: markup,
      success: errors.length === 0
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error'
    return {
      data: null,
      errors: [`Parsing exception: ${errorMessage}`],
      source: markup,
      success: false
    }
  }
}

/**
 * Get human-readable protocol name
 */
function getProtocolName(id: string): string {
  const names: { [key: string]: string } = {
    'src-20': 'SRC-20 Tokens',
    'src-101': 'SRC-101 Names', 
    'src-721': 'SRC-721 NFTs',
    'olga': 'OLGA P2WSH Encoding',
    'network-security': 'Network Security'
  }
  return names[id] || id.toUpperCase()
}

/**
 * Recursively find all markdown files
 */
async function findMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        const subFiles = await findMarkdownFiles(fullPath)
        files.push(...subFiles)
      } else if (entry.isFile() && extname(entry.name) === '.md') {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.warn(`Error reading directory ${dir}:`, error)
  }
  
  return files
}

declare const data: EntitiesData

export default {
  // Watch for changes in markdown files and theme components
  watch: ['../../**/*.md', '../../theme/components/LEO/*.vue'],
  
  async load(): Promise<EntitiesData> {
    // Always load English by default for VitePress data loader compatibility
    const language: SupportedLanguage = 'en'
    try {
      console.log(`Generating entities from LEO components...`)
      
      const [protocols, concepts, tools] = await Promise.all([
        extractProtocolCards(language),
        extractStructuredDataEntities(language),
        extractToolEntities(language)
      ])
      
      const totalEntities = protocols.length + concepts.length + tools.length
      
      const result: EntitiesData = {
        entities: {
          protocols,
          concepts,
          tools
        },
        metadata: {
          totalEntities,
          lastUpdated: new Date().toISOString(),
          version: '1.0.0',
          apiVersion: 'v1',
          language,
          availableLanguages: getAvailableLanguages()
        }
      }
      
      console.log(`Generated ${totalEntities} entities from LEO components`)
      return result
      
    } catch (error) {
      console.error('Error generating entities data:', error)
      
      // Fallback to existing static data if available
      try {
        const staticData = await readFile(join(docsDir, 'api/entities.json'), 'utf-8')
        return JSON.parse(staticData)
      } catch (fallbackError) {
        console.error('Error loading fallback data:', fallbackError)
        throw error
      }
    }
  }
}