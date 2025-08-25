import { readFile, readdir } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import type { 
  ProtocolMetadata, 
  ProtocolsData,
  SafeParseResult,
  CulturalSignificance,
  EntityRelationshipType,
  SupportedLanguage
} from './types.d.ts'

// Import multilingual data and utilities
import { getAllMultilingualProtocols } from './multilingual-data.js'
import { 
  localizeProtocolMetadata, 
  getAvailableLanguages 
} from './language-utils.js'

// Import safe parsing utilities from entities.data.ts
// These will be duplicated here for now but could be extracted to a shared utility file

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
 */
function parseVueArrayAttribute(attributeValue: string): SafeParseResult<string[]> {
  if (!attributeValue) {
    return { data: [], success: true }
  }
  
  try {
    let cleanValue = attributeValue.trim()
    
    if ((cleanValue.startsWith('"') && cleanValue.endsWith('"')) ||
        (cleanValue.startsWith("'") && cleanValue.endsWith("'"))) {
      cleanValue = cleanValue.slice(1, -1)
    }
    
    const jsonString = cleanValue.replace(/'/g, '"')
    return safeParseJSON<string[]>(jsonString, [])
  } catch (error) {
    return { 
      data: [], 
      success: false, 
      error: `Failed to parse array attribute: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }
  }
}

/**
 * Validate cultural significance value
 */
function isValidCulturalSignificance(value: string): value is CulturalSignificance {
  return ['low', 'medium', 'high'].includes(value)
}

// Get current directory for relative imports
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const docsDir = join(__dirname, '../../')

// Type interfaces are now imported from types.d.ts

/**
 * Generate protocol metadata with multilingual support
 */
async function generateProtocolMetadata(language: SupportedLanguage = 'en'): Promise<ProtocolMetadata[]> {
  // Get multilingual protocol data and localize it
  const multilingualProtocols = getAllMultilingualProtocols()
  const localizedProtocols = multilingualProtocols.map(protocol => 
    localizeProtocolMetadata(protocol, language)
  )
  
  // Extract additional protocols from ProtocolCard components in markdown
  try {
    const additionalProtocols = await extractProtocolsFromMarkdown(language)
    localizedProtocols.push(...additionalProtocols)
  } catch (error) {
    console.warn('Error extracting protocols from markdown:', error)
  }

  return localizedProtocols
}

/**
 * Extract protocol metadata from ProtocolCard components in markdown files
 */
async function extractProtocolsFromMarkdown(language: SupportedLanguage = 'en'): Promise<ProtocolMetadata[]> {
  const protocols: ProtocolMetadata[] = []
  
  const markdownFiles = await findMarkdownFiles(docsDir)
  
  for (const file of markdownFiles) {
    try {
      const content = await readFile(file, 'utf-8')
      const protocolMatches = content.matchAll(/<ProtocolCard[^>]*>/g)
      
      for (const match of protocolMatches) {
        const protocol = parseProtocolCardToMetadata(match[0], language)
        if (protocol && !protocols.some(p => p.id === protocol.id)) {
          protocols.push(protocol)
        }
      }
    } catch (error) {
      console.warn(`Error reading file ${file}:`, error)
    }
  }

  return protocols
}

/**
 * Parse ProtocolCard component into ProtocolMetadata
 */
/**
 * Parse ProtocolCard component into ProtocolMetadata with enhanced error handling
 */
function parseProtocolCardToMetadata(markup: string, language: SupportedLanguage = 'en'): ProtocolMetadata | null {
  try {
    const protocolMatch = markup.match(/protocol="([^"]+)"/)
    if (!protocolMatch) return null
    
    const id = protocolMatch[1]
    
    // Skip if we already have this protocol defined above
    const knownProtocols = ['src-20', 'src-101', 'src-721', 'olga']
    if (knownProtocols.includes(id)) return null
    
    const descriptionMatch = markup.match(/description="([^"]+)"/)
    const description = descriptionMatch ? descriptionMatch[1] : ''
    
    // Use safe parsing for features
    const featuresMatch = markup.match(/:features="(\[.*?\])"/s)
    let features: string[] = []
    if (featuresMatch) {
      const featuresResult = parseVueArrayAttribute(featuresMatch[1])
      if (featuresResult.success && featuresResult.data) {
        features = featuresResult.data
      } else {
        console.warn(`Error parsing features for ${id}: ${featuresResult.error}`)
      }
    }

    // Validate cultural significance
    const culturalSigMatch = markup.match(/cultural-significance="([^"]+)"/)
    let culturalSignificance: CulturalSignificance = 'medium'
    if (culturalSigMatch && isValidCulturalSignificance(culturalSigMatch[1])) {
      culturalSignificance = culturalSigMatch[1]
    }

    // Create basic metadata for extracted protocols
    const metadata: ProtocolMetadata = {
      id,
      name: getProtocolDisplayName(id),
      description,
      status: 'active',
      version: '1.0.0',
      culturalSignificance,
      features,
      specifications: {
        dataFormat: 'JSON',
        encoding: 'UTF-8', 
        storage: 'Bitcoin UTXO',
        gasOptimized: false
      },
      relationships: [],
      resources: {
        documentation: `/protocols/${id}`,
        examples: [],
        sdk: []
      },
      community: {
        holders: 0,
        transactions: 0
      }
    }
    
    return metadata
  } catch (error) {
    console.warn('Error parsing ProtocolCard to metadata:', error)
    return null
  }
}

/**
 * Get display name for protocol
 */
function getProtocolDisplayName(id: string): string {
  const names: { [key: string]: string } = {
    'network-security': 'Network Security Enhancement'
  }
  return names[id] || id.charAt(0).toUpperCase() + id.slice(1)
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

declare const data: ProtocolsData

export default {
  // Watch for changes in markdown files and theme components
  watch: ['../../**/*.md', '../../theme/components/LEO/*.vue'],
  
  async load(): Promise<ProtocolsData> {
    // Always load English by default for VitePress data loader compatibility
    const language: SupportedLanguage = 'en'
    try {
      console.log(`Generating protocol metadata from LEO components...`)
      
      const protocols = await generateProtocolMetadata(language)
      
      const result: ProtocolsData = {
        protocols,
        metadata: {
          totalProtocols: protocols.length,
          lastUpdated: new Date().toISOString(), 
          apiVersion: 'v1',
          language,
          availableLanguages: getAvailableLanguages(),
          ecosystem: {
            totalMarketCap: 'Over $2 billion (stamps + SRC-20 tokens)',
            totalTransactions: 1000000,
            totalSRC20Volume: 'Over $10 billion all-time',
            bitcoinVolume: '~350 BTC ecosystem-wide',
            kevinShareOfEcosystem: 'Flagship SRC-20 token with 2,129 holders'
          }
        }
      }
      
      console.log(`Generated metadata for ${protocols.length} protocols`)
      return result
      
    } catch (error) {
      console.error('Error generating protocols data:', error)
      throw error
    }
  }
}