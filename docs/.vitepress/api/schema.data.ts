import { readFile, readdir } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import type { 
  SchemaOrgData, 
  StructuredDataExport,
  SchemaOrgType,
  SupportedLanguage
} from './types.d.ts'

// Import language utilities
import { 
  getLocalizedText, 
  getAvailableLanguages 
} from './language-utils.js'

// Import multilingual data
import { 
  KEVIN_MULTILINGUAL, 
  BITCOIN_STAMPS_MULTILINGUAL 
} from './multilingual-data.js'

// Get current directory for relative imports
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const docsDir = join(__dirname, '../../')

// Type interfaces are now imported from types.d.ts

/**
 * Validate Schema.org type
 */
function isValidSchemaType(type: string): type is SchemaOrgType {
  const validTypes: SchemaOrgType[] = [
    'SoftwareApplication', 'CreativeWork', 'TechArticle', 'Concept',
    'Article', 'HowTo', 'Thing', 'Organization', 'Person'
  ]
  return validTypes.includes(type as SchemaOrgType)
}

/**
 * Extract Schema.org data from StructuredData components with language support
 */
async function extractStructuredData(language: SupportedLanguage = 'en'): Promise<SchemaOrgData[]> {
  const schemas: SchemaOrgData[] = []
  
  // Add the main Bitcoin Stamps ecosystem schema with localization
  const bitcoinStampsSchema: SchemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': getLocalizedText(BITCOIN_STAMPS_MULTILINGUAL.name, language),
    'description': getLocalizedText(BITCOIN_STAMPS_MULTILINGUAL.description, language),
    'applicationCategory': 'BlockchainApplication',
    'operatingSystem': 'Bitcoin',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'creator': {
      '@type': 'Organization', 
      'name': 'Bitcoin Stamps Community',
      'url': 'https://github.com/btc-stamps'
    },
    'keywords': [
      'bitcoin',
      'stamps', 
      'metaprotocols',
      'nft',
      'tokens',
      'src-20',
      'kevin',
      'permanent digital assets'
    ],
    'mainEntityOfPage': {
      '@type': 'WebPage',
      'url': 'https://bitcoinstamps.xyz/'
    }
  }

  schemas.push(bitcoinStampsSchema)

  // Add KEVIN token schema with localization - the cultural icon
  const kevinSchema: SchemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': getLocalizedText(KEVIN_MULTILINGUAL.name, language),
    'description': getLocalizedText(KEVIN_MULTILINGUAL.description, language),
    'creator': {
      '@type': 'Person',
      'name': 'Reinamora'
    },
    'dateCreated': '2023-04-05',
    'about': {
      '@type': 'Concept',
      'name': 'Bitcoin Art Movement'
    },
    'culturalSignificance': getLocalizedText(KEVIN_MULTILINGUAL.culturalMetadata!.significance, language),
    'mainEntityOfPage': {
      '@type': 'WebPage', 
      'url': 'https://bitcoinstamps.xyz/narratives/kevin-origin'
    },
    'keywords': [
      'kevin',
      'src-20',
      'bitcoin stamps',
      'cryptocurrency',
      'digital art',
      'community token'
    ]
  }

  schemas.push(kevinSchema)

  // Add SRC-20 protocol schema
  const src20Schema: SchemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'name': 'SRC-20 Token Standard',
    'description': 'Fungible token standard on Bitcoin, pioneered by KEVIN token',
    'about': {
      '@type': 'Concept',
      'name': 'Bitcoin Token Standards'
    },
    'teaches': [
      'Token creation on Bitcoin',
      'Metaprotocol development',
      'Digital asset permanence'
    ],
    'mainEntityOfPage': {
      '@type': 'WebPage',
      'url': 'https://bitcoinstamps.xyz/protocols/src-20'
    },
    'keywords': [
      'src-20',
      'bitcoin tokens',
      'metaprotocol',
      'kevin legacy',
      'fungible tokens'
    ]
  }

  schemas.push(src20Schema)

  // Extract additional schemas from StructuredData components in markdown
  try {
    const additionalSchemas = await extractFromStructuredDataComponents(language)
    schemas.push(...additionalSchemas)
  } catch (error) {
    console.warn('Error extracting additional structured data:', error)
  }

  return schemas
}

/**
 * Extract Schema.org data from StructuredData components in markdown files
 */
async function extractFromStructuredDataComponents(language: SupportedLanguage = 'en'): Promise<SchemaOrgData[]> {
  const schemas: SchemaOrgData[] = []
  const markdownFiles = await findMarkdownFiles(docsDir)
  
  for (const file of markdownFiles) {
    try {
      const content = await readFile(file, 'utf-8')
      
      // Look for StructuredData components
      const structuredDataMatches = content.matchAll(/<StructuredData[^>]*>/g)
      
      for (const match of structuredDataMatches) {
        const schema = parseStructuredDataComponent(match[0], language)
        if (schema) {
          schemas.push(schema)
        }
      }
    } catch (error) {
      console.warn(`Error processing file ${file}:`, error)
    }
  }

  return schemas
}

/**
 * Parse StructuredData component into Schema.org format
 */
function parseStructuredDataComponent(markup: string, language: SupportedLanguage = 'en'): SchemaOrgData | null {
  try {
    // Extract type attribute
    const typeMatch = markup.match(/type="([^"]+)"/)
    if (!typeMatch) return null
    
    const type = typeMatch[1]
    
    // Extract entity-id
    const entityIdMatch = markup.match(/entity-id="([^"]+)"/)
    const entityId = entityIdMatch ? entityIdMatch[1] : null
    
    // Extract title
    const titleMatch = markup.match(/title="([^"]+)"/)
    const title = titleMatch ? titleMatch[1] : ''
    
    // Extract description  
    const descriptionMatch = markup.match(/description="([^"]+)"/)
    const description = descriptionMatch ? descriptionMatch[1] : ''
    
    // Extract cultural significance
    const culturalSigMatch = markup.match(/cultural-significance="([^"]+)"/)
    const culturalSignificance = culturalSigMatch ? culturalSigMatch[1] : ''
    
    // Extract audience
    const audienceMatch = markup.match(/audience="([^"]+)"/)
    const audience = audienceMatch ? audienceMatch[1] : ''

    // Map type to Schema.org type
    const schemaType = getSchemaOrgType(type, entityId)
    
    const schema: SchemaOrgData = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      'name': title,
      'description': description
    }

    // Add specific properties based on entity type
    if (entityId === 'bitcoin-stamps') {
      schema.applicationCategory = 'BlockchainApplication'
      schema.operatingSystem = 'Bitcoin'
    }

    if (culturalSignificance) {
      schema.culturalSignificance = culturalSignificance
    }

    if (audience) {
      schema.audience = audience
    }

    return schema
    
  } catch (error) {
    console.warn('Error parsing StructuredData component:', error)
    return null
  }
}

/**
 * Map component type to Schema.org type
 */
/**
 * Map component type to Schema.org type with validation
 */
function getSchemaOrgType(type: string, entityId?: string | null): SchemaOrgType {
  if (type === 'entity') {
    if (entityId === 'bitcoin-stamps') return 'SoftwareApplication'
    if (entityId === 'kevin') return 'CreativeWork'
    return 'Thing'
  }
  
  const typeMap: { [key: string]: SchemaOrgType } = {
    'protocol': 'TechArticle',
    'tool': 'SoftwareApplication',
    'concept': 'Concept',
    'article': 'Article',
    'guide': 'HowTo'
  }
  
  const mappedType = typeMap[type] || 'Thing'
  
  // Validate the mapped type
  if (!isValidSchemaType(mappedType)) {
    console.warn(`Invalid Schema.org type mapped: ${mappedType}. Falling back to 'Thing'.`)
    return 'Thing'
  }
  
  return mappedType
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

declare const data: StructuredDataExport

export default {
  // Watch for changes in markdown files and structured data
  watch: [
    '../../**/*.md', 
    '../../api/structured-data/*.json',
    '../../theme/components/LEO/*.vue'
  ],
  
  async load(): Promise<StructuredDataExport> {
    // Always load English by default for VitePress data loader compatibility
    const language: SupportedLanguage = 'en'
    
    try {
      console.log(`Generating Schema.org structured data from LEO components...`)
      
      const schemas = await extractStructuredData(language)
      
      const result: StructuredDataExport = {
        schemas,
        metadata: {
          totalSchemas: schemas.length,
          lastUpdated: new Date().toISOString(),
          version: '1.0.0',
          language,
          availableLanguages: getAvailableLanguages(),
          extractedFrom: [
            'StructuredData components',
            'ProtocolCard components', 
            'Entity definitions',
            'KEVIN cultural data'
          ]
        }
      }
      
      console.log(`Generated ${schemas.length} Schema.org structured data entries`)
      return result
      
    } catch (error) {
      console.error('Error generating schema data:', error)
      throw error
    }
  }
}