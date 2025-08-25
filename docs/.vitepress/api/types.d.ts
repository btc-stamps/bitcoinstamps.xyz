/**
 * Type definitions for LEO API system
 * Auto-generated API endpoints for Bitcoin Stamps documentation
 * 
 * Enhanced with comprehensive type guards and validation utilities
 * for robust component prop extraction and Schema.org compliance.
 */

/**
 * Cultural significance levels for Bitcoin Stamps entities
 */
export type CulturalSignificance = 'low' | 'medium' | 'high'

/**
 * Entity relationship types in the Bitcoin Stamps ecosystem
 */
export type EntityRelationshipType = 
  | 'extends' 
  | 'optimizes' 
  | 'complements' 
  | 'requires' 
  | 'pioneered-by'
  | 'inspired-by'
  | 'created-by'
  | 'benefits'
  | 'exemplified-by'
  | 'strengthened-by'
  | 'originated-from'
  | 'mascot-of'
  | 'includes'
  | 'implements'
  | 'supports'
  | 'identifies'
  | 'mythical-guide'
  | 'optimized-by'
  | 'architected-by'
  | 'guided-by'
  | 'enables'
  | 'builds-on'
  | 'indexes'
  | 'enhances'
  | 'compatible-with'
  | 'derives-from'
  | 'measures'
  | 'governs'
  | 'pioneered'
  | 'founded-by'
  | 'genesis-of'
  | 'evolution-of'
  | 'refines'

/**
 * Supported languages for multi-language API responses
 */
export type SupportedLanguage = 'en' | 'es' | 'fr' | 'zh' | 'tr'

/**
 * Multi-language text content interface
 */
export interface MultiLangText {
  en: string
  es: string
  fr: string
  zh: string
  tr: string
}

/**
 * Multi-language optional text content
 */
export interface MultiLangOptionalText {
  en?: string
  es?: string
  fr?: string
  zh?: string
  tr?: string
}

/**
 * Multi-language relationship description
 */
export interface MultiLangRelationship {
  id: string
  type: EntityRelationshipType | string
  name?: MultiLangOptionalText
  description?: MultiLangOptionalText
}

/**
 * Base entity interface with enhanced type safety and multi-language support
 */
export interface BaseEntity {
  /** Unique identifier for the entity */
  id: string
  /** Human-readable display name in multiple languages */
  name: string | MultiLangText
  /** Detailed description of the entity in multiple languages */
  description: string | MultiLangText
  /** Cultural significance level in the Bitcoin Stamps ecosystem */
  culturalSignificance: CulturalSignificance
  /** Array of related entities with typed relationships */
  relationships: Array<{
    id: string
    type: EntityRelationshipType | string
    name?: string
    description?: string
  }> | MultiLangRelationship[]
  /** URL path for the entity's documentation */
  url: string
}

/**
 * Protocol entity with Bitcoin-specific metadata and multi-language support
 */
export interface ProtocolEntity extends BaseEntity {
  type: 'protocol'
  /** Block height when the protocol was introduced */
  blockIntroduced?: number
  /** Array of protocol features and capabilities */
  features: string[] | MultiLangText[]
  /** Protocol status */
  status?: 'active' | 'experimental' | 'deprecated'
  /** Version information */
  version?: string
  /** KEVIN legacy information for protocols pioneered by KEVIN */
  kevinLegacy?: {
    pioneeredBy: boolean
    culturalImpact: string | MultiLangText
    successPattern: string | MultiLangText
  }
}

/**
 * Concept entity representing cultural icons and ecosystem concepts with multi-language support
 */
export interface ConceptEntity extends BaseEntity {
  type: 'cultural-icon' | 'protocol-ecosystem' | 'protocol-foundation' | 'foundational-infrastructure' | 'indexer-service' | 'consensus-milestone'
  /** Stamp number for cultural icons like KEVIN */
  stampNumber?: number
  /** Creator of the concept or cultural icon */
  creator?: string
  /** Creation date in ISO format */
  creationDate?: string
  /** Optional features for concepts */
  features?: string[] | MultiLangText[]
  /** Additional cultural metadata */
  culturalMetadata?: {
    impact: string | MultiLangText
    significance: string | MultiLangText
    communitySize?: number
  }
  economicMetadata?: EconomicMetadata
}

/**
 * Economic metadata interface for tracking economic and market metrics
 */
export interface EconomicMetadata {
  marketMetrics?: Record<string, any>
  tradingMetrics?: Record<string, any>
  culturalMetrics?: Record<string, any>
  growthMetrics?: Record<string, any>
  networkMetrics?: Record<string, any>
  tokenMetrics?: Record<string, any>
  ecosystemMetrics?: Record<string, any>
  adoptionMetrics?: Record<string, any>
}

/**
 * Tool entity representing SDKs, libraries, and development tools with multi-language support
 */
export interface ToolEntity extends BaseEntity {
  type: 'sdk' | 'tool' | 'library' | 'application'
  /** Tool features and capabilities */
  features: string[] | MultiLangText[]
  /** Version information */
  version?: string
  /** Programming languages supported */
  languages?: string[]
  /** Installation or usage instructions */
  installation?: {
    npm?: string
    github?: string
    documentation?: string
  }
}

export interface EntitiesData {
  entities: {
    protocols: ProtocolEntity[]
    concepts: ConceptEntity[]
    tools: ToolEntity[]
  }
  metadata: {
    totalEntities: number
    lastUpdated: string
    version: string
    apiVersion: string
    language?: SupportedLanguage
    availableLanguages?: SupportedLanguage[]
  }
}

/**
 * Protocol metadata with comprehensive specification details and multi-language support
 */
export interface ProtocolMetadata {
  /** Unique protocol identifier */
  id: string
  /** Human-readable protocol name */
  name: string | MultiLangText
  /** Detailed protocol description */
  description: string | MultiLangText
  /** Current protocol status */
  status: 'active' | 'experimental' | 'deprecated'
  /** Protocol version */
  version: string
  /** Block height when protocol was introduced */
  blockIntroduced?: number
  /** Cultural significance in the ecosystem */
  culturalSignificance: CulturalSignificance
  /** Protocol features and capabilities */
  features: string[] | MultiLangText[]
  /** Technical specifications */
  specifications: {
    /** Data format (JSON, Binary, etc.) */
    dataFormat: string
    /** Character encoding used */
    encoding: string
    /** Storage mechanism on Bitcoin */
    storage: string
    /** Whether the protocol is optimized for transaction costs */
    gasOptimized: boolean
  }
  /** Relationships with other protocols */
  relationships: Array<{
    id: string
    type: EntityRelationshipType
    description: string
  }> | Array<{
    id: string
    type: EntityRelationshipType
    description: MultiLangText
  }>
  /** Resource links and documentation */
  resources: {
    /** Main documentation URL */
    documentation: string
    /** Array of example URLs */
    examples: string[]
    /** Supported SDKs and libraries */
    sdk: string[]
  }
  /** Community statistics */
  community: {
    /** Number of token holders */
    holders: number
    /** Total transaction count */
    transactions: number
    /** Market capitalization if applicable */
    marketCap?: string
  }
  /** KEVIN legacy information for protocols with historical significance */
  kevinLegacy?: {
    pioneeredBy: boolean
    culturalImpact: string | MultiLangText
    successPattern: string | MultiLangText
  }
}

export interface ProtocolsData {
  protocols: ProtocolMetadata[]
  metadata: {
    totalProtocols: number
    lastUpdated: string
    apiVersion: string
    language?: SupportedLanguage
    availableLanguages?: SupportedLanguage[]
    ecosystem: {
      totalMarketCap: string
      totalTransactions: number
      totalSRC20Volume?: string
      bitcoinVolume?: string
      kevinShareOfEcosystem: string
    }
  }
}

/**
 * Schema.org structured data with type safety
 */
export interface SchemaOrgData {
  '@context': 'https://schema.org'
  '@type': SchemaOrgType
  /** Entity name */
  name?: string
  /** Entity description */
  description?: string
  /** Cultural significance for Bitcoin Stamps entities */
  culturalSignificance?: string
  /** Target audience */
  audience?: string
  /** Creator information */
  creator?: {
    '@type': 'Person' | 'Organization'
    name: string
    url?: string
  }
  /** Main entity URL */
  mainEntityOfPage?: {
    '@type': 'WebPage'
    url: string
  }
  /** Keywords array */
  keywords?: string[]
  /** Date created */
  dateCreated?: string
  /** Additional properties */
  [key: string]: any
}

/**
 * Supported Schema.org types for Bitcoin Stamps entities
 */
export type SchemaOrgType = 
  | 'SoftwareApplication'
  | 'CreativeWork'
  | 'TechArticle'
  | 'Concept'
  | 'Article'
  | 'HowTo'
  | 'Thing'
  | 'Organization'
  | 'Person'

export interface StructuredDataExport {
  schemas: SchemaOrgData[]
  metadata: {
    totalSchemas: number
    lastUpdated: string
    version: string
    extractedFrom: string[]
    language?: SupportedLanguage
    availableLanguages?: SupportedLanguage[]
  }
}

/**
 * VitePress data loader interface with enhanced type safety
 */
export interface VitePressDataLoader<T> {
  /** File patterns to watch for changes */
  watch?: string[]
  /** Data loading function */
  load(): Promise<T>
}

/**
 * Component prop extraction result with validation
 */
export interface ComponentPropExtractionResult<T> {
  /** Successfully parsed props */
  data: T | null
  /** Parsing errors if any */
  errors: string[]
  /** Source markup that was parsed */
  source: string
  /** Whether parsing was successful */
  success: boolean
}

/**
 * Type guard utility interface
 */
export interface TypeGuard<T> {
  /** Check if value matches type */
  isValid: (value: unknown) => value is T
  /** Parse and validate value */
  parse: (value: unknown) => T | null
  /** Get validation errors */
  getErrors: (value: unknown) => string[]
}

/**
 * Safe JSON parsing result
 */
export interface SafeParseResult<T> {
  /** Parsed data if successful */
  data: T | null
  /** Whether parsing succeeded */
  success: boolean
  /** Error message if parsing failed */
  error?: string
}

/**
 * Global type declarations for VitePress data access
 */
declare global {
  const data: {
    entities: EntitiesData
    protocols: ProtocolsData
    schemas: StructuredDataExport
  }
}

/**
 * Utility types for component prop parsing
 */
export type ProtocolId = 'src-20' | 'src-101' | 'src-721' | 'olga' | 'network-security'
export type EntityType = 'protocol' | 'cultural-icon' | 'protocol-ecosystem' | 'protocol-foundation' | 'foundational-infrastructure' | 'sdk' | 'tool' | 'library' | 'application' | 'consensus-milestone'

/**
 * Vue component prop types for ProtocolCard with strict validation
 */
export interface ProtocolCardProps {
  protocol: ProtocolId
  displayName?: string
  description: string
  features?: string[]
  blockHeight?: number
  culturalSignificance?: CulturalSignificance
  relatedProtocols?: Array<{
    id: string
    name: string
    relationship: string
  }>
  featured?: boolean
  kevinLegacy?: string
}

/**
 * StructuredData component prop types
 */
export interface StructuredDataProps {
  type: 'entity' | 'protocol' | 'tool' | 'concept' | 'article' | 'guide'
  entityId?: string
  title: string
  description: string
  protocols?: string[]
  culturalSignificance?: CulturalSignificance
  audience?: 'developer' | 'artist' | 'both'
  keywords?: string[]
  creator?: string
  dateCreated?: string
}

/**
 * EntityLink component prop types
 */
export interface EntityLinkProps {
  entityId: string
  entityType: EntityType
  displayName?: string
  href?: string
  relationship?: EntityRelationshipType
  variant?: 'protocol' | 'concept' | 'tool' | 'inline'
  class?: string
}

/**
 * Type-safe component validation utilities
 */
export interface ComponentValidator<T> {
  /** Component name for debugging */
  componentName: string
  /** Validate props object */
  validateProps: (props: unknown) => ComponentValidationResult<T>
  /** Get default props */
  getDefaults: () => Partial<T>
  /** Transform raw props to typed props */
  transformProps: (raw: Record<string, unknown>) => T
}

/**
 * Component validation result
 */
export interface ComponentValidationResult<T> {
  /** Validation passed */
  valid: boolean
  /** Typed props if validation passed */
  props: T | null
  /** Validation errors */
  errors: string[]
  /** Validation warnings */
  warnings: string[]
}

/**
 * Markup parsing context for component extraction
 */
export interface MarkupParsingContext {
  /** File path being parsed */
  filePath: string
  /** Line number in file */
  lineNumber?: number
  /** Raw markup content */
  rawMarkup: string
  /** Component type being parsed */
  componentType: string
}

/**
 * KEVIN-specific type definitions for cultural significance tracking
 */
export interface KEVINLegacyData {
  /** Whether this entity was pioneered by KEVIN */
  pioneeredBy: boolean
  /** Cultural impact description */
  culturalImpact: string
  /** Success pattern established */
  successPattern: string
  /** Community size influenced */
  communityImpact?: {
    holders: number
    culturalReach: string
    successMetrics: string[]
  }
}

/**
 * API endpoint metadata for responses with language support
 */
export interface APIEndpointMetadata {
  /** API version */
  version: string
  /** Response generation timestamp */
  timestamp: string
  /** Language of the response */
  language: SupportedLanguage
  /** Available languages for this endpoint */
  availableLanguages: SupportedLanguage[]
  /** Data source information */
  source: {
    /** Component types extracted */
    components: string[]
    /** Files processed */
    files: number
    /** Extraction errors */
    errors?: number
  }
  /** Cache information */
  cache?: {
    /** Cache hit/miss status */
    status: 'hit' | 'miss' | 'refresh'
    /** Cache expiration */
    expires: string
  }
}

/**
 * Enhanced API response wrapper with metadata
 */
export interface APIResponseWrapper<T> {
  /** Response data */
  data: T
  /** Response metadata */
  meta: APIEndpointMetadata
  /** Success status */
  success: boolean
  /** Error information if applicable */
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

/**
 * Type-safe environment for data extraction
 */
export interface DataExtractionEnvironment {
  /** VitePress context */
  vitepress: {
    /** Build mode */
    mode: 'development' | 'production'
    /** Base URL */
    base: string
    /** Site config */
    siteConfig: unknown
  }
  /** File system context */
  filesystem: {
    /** Documentation root directory */
    docsDir: string
    /** Available markdown files */
    markdownFiles: string[]
    /** Component files */
    componentFiles: string[]
  }
  /** Performance tracking */
  performance: {
    /** Extraction start time */
    startTime: number
    /** Files processed count */
    filesProcessed: number
    /** Components extracted count */
    componentsExtracted: number
  }
}

export {}