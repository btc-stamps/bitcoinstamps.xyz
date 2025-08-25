/**
 * Bitcoin Stamps Documentation Content Categorization Framework
 * Strategic taxonomy for translation efficiency and cultural authenticity
 */

export interface ContentCategoryRules {
  category: 'duplicate' | 'reference' | 'hybrid';
  translationScope: string[];
  referenceScope?: string[];
  sharedDataScope?: string[];
  rationale: string;
  guidelines: string[];
  qualityChecks: string[];
}

export interface ContentMetadata {
  translationCategory: 'duplicate' | 'reference' | 'hybrid';
  culturalSignificance: 'high' | 'medium' | 'low';
  technicalComplexity: 'high' | 'medium' | 'low';
  audienceType: 'artist' | 'developer' | 'both' | 'community';
  maintenanceBurden: 'high' | 'medium' | 'low';
  translationGuidelines?: {
    duplicate?: string[];
    reference?: string[];
    'shared-data'?: string[];
  };
}

/**
 * DUPLICATE CATEGORY: Full Translation Required
 * Content that benefits from cultural adaptation and localization
 */
export const DUPLICATE_CATEGORY: ContentCategoryRules = {
  category: 'duplicate',
  translationScope: [
    'community-facing narratives',
    'cultural stories and values',
    'getting started guides',
    'artist onboarding content',
    'philosophy and principles',
    'community guidelines',
    'success stories',
    'artistic tutorials with cultural context'
  ],
  rationale: 'Content requiring cultural nuance, community connection, and regional adaptation',
  guidelines: [
    'Translate all text for cultural authenticity',
    'Adapt examples to regional context where appropriate',
    'Preserve cultural significance while making locally relevant',
    'Maintain the essence of KEVIN philosophy across languages',
    'Use culturally appropriate analogies and references',
    'Adapt community links to language-specific channels when available'
  ],
  qualityChecks: [
    'Cultural authenticity preserved',
    'Community philosophy maintained',
    'Regional relevance achieved',
    'No technical inconsistencies introduced',
    'Links and resources appropriately localized'
  ]
};

/**
 * REFERENCE CATEGORY: Shared Technical Data
 * Pure technical content that should remain consistent globally
 */
export const REFERENCE_CATEGORY: ContentCategoryRules = {
  category: 'reference',
  translationScope: [],
  referenceScope: [
    'technical specifications',
    'api endpoints and schemas',
    'code examples and snippets',
    'protocol constants',
    'blockchain data (block heights, addresses)',
    'mathematical formulas',
    'json schemas',
    'transaction formats',
    'cryptographic parameters'
  ],
  rationale: 'Technical precision requires consistency across all languages',
  guidelines: [
    'Reference shared technical data files instead of duplicating',
    'Use standardized component library for technical content',
    'Maintain single source of truth for all protocol specifications',
    'Auto-generate technical content where possible',
    'Version control technical changes centrally',
    'Validate technical accuracy across all language versions'
  ],
  qualityChecks: [
    'Technical accuracy maintained',
    'Consistent across all languages',
    'No technical drift between versions',
    'Shared data properly referenced',
    'Auto-generated content up to date'
  ]
};

/**
 * HYBRID CATEGORY: Mixed Translation and Reference
 * Content combining cultural explanations with technical precision
 */
export const HYBRID_CATEGORY: ContentCategoryRules = {
  category: 'hybrid',
  translationScope: [
    'protocol explanations and descriptions',
    'tutorial introductions and context',
    'technical concept explanations',
    'use case descriptions',
    'benefits and advantages',
    'getting started sections',
    'troubleshooting guides',
    'best practices explanations'
  ],
  referenceScope: [
    'code examples',
    'api endpoints',
    'technical specifications',
    'data schemas',
    'protocol constants'
  ],
  sharedDataScope: [
    'block heights',
    'protocol versions',
    'technical metrics',
    'blockchain addresses',
    'mathematical values'
  ],
  rationale: 'Balance cultural accessibility with technical precision',
  guidelines: [
    'Translate explanatory content for cultural context',
    'Reference shared technical data for accuracy',
    'Use hybrid components for seamless integration',
    'Maintain consistent technical terminology',
    'Provide culturally relevant examples while preserving technical accuracy',
    'Separate concerns between explanation and specification'
  ],
  qualityChecks: [
    'Explanations culturally appropriate',
    'Technical data accurately referenced',
    'No inconsistencies between explanation and specification',
    'Proper separation of concerns maintained',
    'Hybrid components function correctly'
  ]
};

/**
 * Content Type Classifications
 * Maps content types to their appropriate categorization rules
 */
export const CONTENT_TYPE_MAPPINGS = {
  // DUPLICATE: Community and cultural content
  'community-guidelines': DUPLICATE_CATEGORY,
  'getting-started-guides': DUPLICATE_CATEGORY,
  'cultural-narratives': DUPLICATE_CATEGORY,
  'community-values': DUPLICATE_CATEGORY,
  'artist-onboarding': DUPLICATE_CATEGORY,
  'success-stories': DUPLICATE_CATEGORY,
  'philosophy': DUPLICATE_CATEGORY,
  
  // REFERENCE: Pure technical content
  'api-specifications': REFERENCE_CATEGORY,
  'protocol-constants': REFERENCE_CATEGORY,
  'code-examples': REFERENCE_CATEGORY,
  'data-schemas': REFERENCE_CATEGORY,
  'blockchain-data': REFERENCE_CATEGORY,
  'technical-reference': REFERENCE_CATEGORY,
  
  // HYBRID: Mixed content
  'protocol-explanations': HYBRID_CATEGORY,
  'technical-tutorials': HYBRID_CATEGORY,
  'developer-guides': HYBRID_CATEGORY,
  'implementation-guides': HYBRID_CATEGORY,
  'troubleshooting': HYBRID_CATEGORY,
  'best-practices': HYBRID_CATEGORY
} as const;

/**
 * Frontmatter Schema for Content Categorization
 * Standard metadata structure for all documentation files
 */
export interface CategoryFrontmatter {
  title: string;
  description: string;
  translationCategory: 'duplicate' | 'reference' | 'hybrid';
  contentType: keyof typeof CONTENT_TYPE_MAPPINGS;
  culturalSignificance: 'high' | 'medium' | 'low';
  technicalComplexity: 'high' | 'medium' | 'low';
  maintenanceBurden: 'high' | 'medium' | 'low';
  translationGuidelines?: {
    duplicate?: string[];
    reference?: string[];
    'shared-data'?: string[];
  };
  qualityChecks?: string[];
  lastReviewed?: string;
  reviewDue?: string;
}

/**
 * Validation Rules for Category Assignment
 * Ensures proper categorization based on content characteristics
 */
export const CATEGORIZATION_RULES = {
  // High cultural significance usually requires duplication
  culturalSignificanceRules: {
    high: ['duplicate', 'hybrid'],
    medium: ['duplicate', 'hybrid', 'reference'],
    low: ['reference', 'hybrid']
  },
  
  // Technical complexity affects categorization approach
  technicalComplexityRules: {
    high: ['reference', 'hybrid'],
    medium: ['hybrid', 'duplicate'],
    low: ['duplicate', 'hybrid']
  },
  
  // Maintenance burden considerations
  maintenanceRules: {
    high: ['reference'],      // Prefer centralized reference for high maintenance
    medium: ['hybrid'],       // Balanced approach for medium maintenance
    low: ['duplicate']        // Full duplication acceptable for low maintenance
  }
} as const;

/**
 * Translation Strategy Decision Matrix
 * Automated decision-making for content categorization
 */
export function determineOptimalCategory(metadata: Partial<ContentMetadata>): ContentCategoryRules {
  const {
    culturalSignificance = 'medium',
    technicalComplexity = 'medium',
    maintenanceBurden = 'medium',
    audienceType = 'both'
  } = metadata;

  // High cultural significance with community audience -> DUPLICATE
  if (culturalSignificance === 'high' && ['artist', 'community', 'both'].includes(audienceType)) {
    return DUPLICATE_CATEGORY;
  }

  // High technical complexity with developer audience -> REFERENCE
  if (technicalComplexity === 'high' && ['developer'].includes(audienceType)) {
    return REFERENCE_CATEGORY;
  }

  // High maintenance burden -> prefer REFERENCE
  if (maintenanceBurden === 'high') {
    return REFERENCE_CATEGORY;
  }

  // Balanced approach for mixed characteristics
  return HYBRID_CATEGORY;
}

/**
 * File Pattern Recognition
 * Automatically categorize content based on file paths and naming patterns
 */
export const FILE_PATTERN_CATEGORIES = {
  // DUPLICATE patterns
  duplicate: [
    /\/narratives\//,
    /\/community\//,
    /\/guide\/introduction/,
    /\/guide\/getting-started/,
    /kevin-.*\.md$/,
    /community-values/,
    /philosophy/,
    /culture/
  ],
  
  // REFERENCE patterns
  reference: [
    /\/api\//,
    /schema\.json$/,
    /\.json$/,
    /constants/,
    /specification/,
    /reference/
  ],
  
  // HYBRID patterns (most technical tutorials and protocols)
  hybrid: [
    /\/protocols\//,
    /\/tutorials\//,
    /sdk-integration/,
    /api-integration/,
    /implementation/
  ]
} as const;

export default {
  DUPLICATE_CATEGORY,
  REFERENCE_CATEGORY,
  HYBRID_CATEGORY,
  CONTENT_TYPE_MAPPINGS,
  CATEGORIZATION_RULES,
  determineOptimalCategory,
  FILE_PATTERN_CATEGORIES
};