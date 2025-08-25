/**
 * Technical Framework for Content Categorization Implementation
 * VitePress integration for hybrid content management and build-time validation
 */

import type { ContentMetadata, CategoryFrontmatter } from './taxonomy.js';
import { determineOptimalCategory, FILE_PATTERN_CATEGORIES } from './taxonomy.js';
import { COMPLETE_FILE_AUDIT } from './file-audit.js';

/**
 * Enhanced Frontmatter Schema with Category Validation
 */
export interface CategoryEnhancedFrontmatter extends CategoryFrontmatter {
  // Core categorization
  translationCategory: 'duplicate' | 'reference' | 'hybrid';
  contentType: string;
  
  // Translation strategy metadata
  translationGuidelines?: {
    duplicate?: string[];
    reference?: string[];
    'shared-data'?: string[];
  };
  
  // Shared data references for HYBRID/REFERENCE categories
  sharedDataSources?: {
    technical?: string[];
    api?: string[];
    constants?: string[];
  };
  
  // Component usage for hybrid content
  hybridComponents?: {
    SharedTechnicalData?: boolean;
    ReferenceAPI?: boolean;
    LocalizedExplanation?: boolean;
  };
  
  // Build validation metadata
  validationRules?: {
    requiresTranslation: boolean;
    requiresSharedData: boolean;
    requiresConsistencyCheck: boolean;
  };
}

/**
 * Component Library for Category Integration
 */
export const CATEGORY_COMPONENTS = {
  // Shared technical data component
  SharedTechnicalData: `
    <template>
      <div class="shared-technical-data">
        <div v-if="isLoading" class="loading">Loading technical data...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else>
          <slot :data="technicalData" />
        </div>
      </div>
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue'
    import { useLEO } from '../theme/composables/useLEO'
    
    const props = defineProps({
      source: String,
      type: String
    })
    
    const { getSharedData } = useLEO()
    const technicalData = ref(null)
    const isLoading = ref(true)
    const error = ref(null)
    
    onMounted(async () => {
      try {
        technicalData.value = await getSharedData(props.source, props.type)
      } catch (err) {
        error.value = err.message
      } finally {
        isLoading.value = false
      }
    })
    </script>
  `,
  
  // Reference API component
  ReferenceAPI: `
    <template>
      <div class="reference-api">
        <div class="api-endpoint">
          <h4>{{ endpoint.method }} {{ endpoint.path }}</h4>
          <p>{{ endpoint.description }}</p>
          <SharedTechnicalData :source="endpoint.source" />
        </div>
      </div>
    </template>
    
    <script setup>
    import SharedTechnicalData from './SharedTechnicalData.vue'
    
    const props = defineProps({
      endpoint: Object
    })
    </script>
  `,
  
  // Localized explanation wrapper
  LocalizedExplanation: `
    <template>
      <div class="localized-explanation">
        <div class="explanation-content">
          <slot />
        </div>
        <div class="technical-reference" v-if="sharedData">
          <SharedTechnicalData :source="sharedData" />
        </div>
      </div>
    </template>
    
    <script setup>
    const props = defineProps({
      sharedData: String
    })
    </script>
  `
};

/**
 * Build-time Category Validator
 * Validates content categorization during build process
 */
export class CategoryValidator {
  private errors: string[] = [];
  private warnings: string[] = [];
  
  validateFile(filePath: string, frontmatter: CategoryEnhancedFrontmatter): boolean {
    const audit = COMPLETE_FILE_AUDIT[filePath];
    
    if (!audit) {
      this.warnings.push(`File ${filePath} not found in audit registry`);
      return true; // Non-critical for new files
    }
    
    // Validate category assignment
    if (frontmatter.translationCategory !== audit.category) {
      this.errors.push(
        `Category mismatch for ${filePath}: ` +
        `expected ${audit.category}, got ${frontmatter.translationCategory}`
      );
      return false;
    }
    
    // Validate category-specific requirements
    switch (frontmatter.translationCategory) {
      case 'duplicate':
        return this.validateDuplicateCategory(filePath, frontmatter);
      case 'reference':
        return this.validateReferenceCategory(filePath, frontmatter);
      case 'hybrid':
        return this.validateHybridCategory(filePath, frontmatter);
      default:
        this.errors.push(`Invalid category for ${filePath}: ${frontmatter.translationCategory}`);
        return false;
    }
  }
  
  private validateDuplicateCategory(filePath: string, frontmatter: CategoryEnhancedFrontmatter): boolean {
    // DUPLICATE files should not reference shared data
    if (frontmatter.sharedDataSources?.technical?.length) {
      this.warnings.push(
        `DUPLICATE category file ${filePath} references shared technical data. ` +
        `Consider HYBRID category instead.`
      );
    }
    
    // Should have translation guidelines
    if (!frontmatter.translationGuidelines?.duplicate?.length) {
      this.warnings.push(
        `DUPLICATE category file ${filePath} missing translation guidelines`
      );
    }
    
    return true;
  }
  
  private validateReferenceCategory(filePath: string, frontmatter: CategoryEnhancedFrontmatter): boolean {
    // REFERENCE files should not require translation
    if (frontmatter.validationRules?.requiresTranslation) {
      this.errors.push(
        `REFERENCE category file ${filePath} should not require translation`
      );
      return false;
    }
    
    // Should specify shared data sources
    if (!frontmatter.sharedDataSources) {
      this.warnings.push(
        `REFERENCE category file ${filePath} should specify shared data sources`
      );
    }
    
    return true;
  }
  
  private validateHybridCategory(filePath: string, frontmatter: CategoryEnhancedFrontmatter): boolean {
    // HYBRID files should have both translation guidelines and shared data
    const hasTranslationGuidelines = 
      frontmatter.translationGuidelines?.duplicate?.length ||
      frontmatter.translationGuidelines?.['shared-data']?.length;
    
    if (!hasTranslationGuidelines) {
      this.warnings.push(
        `HYBRID category file ${filePath} missing translation guidelines`
      );
    }
    
    if (!frontmatter.sharedDataSources) {
      this.warnings.push(
        `HYBRID category file ${filePath} should specify shared data sources`
      );
    }
    
    // Should use hybrid components
    if (!frontmatter.hybridComponents) {
      this.warnings.push(
        `HYBRID category file ${filePath} should specify hybrid components usage`
      );
    }
    
    return true;
  }
  
  getErrors(): string[] {
    return this.errors;
  }
  
  getWarnings(): string[] {
    return this.warnings;
  }
  
  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}

/**
 * Automatic Category Assignment
 * Analyzes file content to suggest optimal categorization
 */
export function analyzeFileCategory(
  filePath: string, 
  content: string, 
  frontmatter: Partial<CategoryEnhancedFrontmatter>
): 'duplicate' | 'reference' | 'hybrid' {
  
  // Check file pattern matching first
  for (const [category, patterns] of Object.entries(FILE_PATTERN_CATEGORIES)) {
    if (patterns.some(pattern => pattern.test(filePath))) {
      return category as 'duplicate' | 'reference' | 'hybrid';
    }
  }
  
  // Content-based analysis
  const contentLower = content.toLowerCase();
  
  // High cultural indicators -> DUPLICATE
  const culturalIndicators = [
    'kevin', 'arwyn', 'community values', 'philosophy', 'in lak\'ech ala k\'in',
    'cultural', 'community', 'story', 'narrative', 'values', 'beliefs'
  ];
  const culturalScore = culturalIndicators.reduce((score, indicator) => {
    return score + (contentLower.includes(indicator) ? 1 : 0);
  }, 0);
  
  // Technical precision indicators -> REFERENCE
  const technicalIndicators = [
    'api', 'endpoint', 'schema', 'json', 'specification', 'protocol constant',
    'block height', 'address', 'hash', 'technical reference'
  ];
  const technicalScore = technicalIndicators.reduce((score, indicator) => {
    return score + (contentLower.includes(indicator) ? 1 : 0);
  }, 0);
  
  // Mixed content indicators -> HYBRID
  const hybridIndicators = [
    'tutorial', 'guide', 'implementation', 'how to', 'protocol explanation',
    'code example', 'best practices'
  ];
  const hybridScore = hybridIndicators.reduce((score, indicator) => {
    return score + (contentLower.includes(indicator) ? 1 : 0);
  }, 0);
  
  // Use metadata-based determination as fallback
  const metadata: Partial<ContentMetadata> = {
    culturalSignificance: frontmatter.culturalSignificance || 'medium',
    technicalComplexity: frontmatter.technicalComplexity || 'medium',
    audienceType: frontmatter.leoType === 'narrative' ? 'community' : 'both'
  };
  
  // Decision logic
  if (culturalScore >= 3 && technicalScore < 2) {
    return 'duplicate';
  }
  if (technicalScore >= 3 && culturalScore < 2) {
    return 'reference';  
  }
  if (hybridScore >= 2 || (culturalScore >= 2 && technicalScore >= 2)) {
    return 'hybrid';
  }
  
  // Use taxonomy-based determination
  return determineOptimalCategory(metadata).category;
}

/**
 * Translation Context Generator
 * Generates context information for translators based on category
 */
export function generateTranslationContext(
  filePath: string,
  category: 'duplicate' | 'reference' | 'hybrid',
  frontmatter: CategoryEnhancedFrontmatter
): TranslationContext {
  
  const audit = COMPLETE_FILE_AUDIT[filePath];
  
  return {
    file: filePath,
    category,
    priority: audit?.translationPriority || 'medium',
    estimatedEffort: audit?.estimatedEffort || 'medium',
    guidelines: {
      cultural: frontmatter.translationGuidelines?.duplicate || [],
      technical: frontmatter.translationGuidelines?.reference || [],
      hybrid: frontmatter.translationGuidelines?.['shared-data'] || []
    },
    sharedDataSources: frontmatter.sharedDataSources || {},
    dependencies: audit?.dependencies || [],
    specialConsiderations: audit?.specialConsiderations || [],
    qualityChecks: generateQualityChecks(category),
    translatorNotes: generateTranslatorNotes(category, frontmatter)
  };
}

export interface TranslationContext {
  file: string;
  category: 'duplicate' | 'reference' | 'hybrid';
  priority: 'high' | 'medium' | 'low';
  estimatedEffort: 'small' | 'medium' | 'large';
  guidelines: {
    cultural: string[];
    technical: string[];
    hybrid: string[];
  };
  sharedDataSources: Record<string, string[]>;
  dependencies: string[];
  specialConsiderations: string[];
  qualityChecks: string[];
  translatorNotes: string[];
}

function generateQualityChecks(category: 'duplicate' | 'reference' | 'hybrid'): string[] {
  const baseChecks = ['Content accuracy maintained', 'No broken links', 'Consistent terminology'];
  
  switch (category) {
    case 'duplicate':
      return [
        ...baseChecks,
        'Cultural authenticity preserved',
        'Community philosophy maintained',
        'Regional relevance achieved',
        'KEVIN significance preserved'
      ];
    
    case 'reference':
      return [
        ...baseChecks,
        'Technical accuracy validated',
        'Shared data properly referenced',
        'No technical drift introduced',
        'API consistency maintained'
      ];
      
    case 'hybrid':
      return [
        ...baseChecks,
        'Explanations culturally appropriate',
        'Technical data accurately referenced', 
        'Hybrid components function correctly',
        'No inconsistencies between explanation and specification'
      ];
      
    default:
      return baseChecks;
  }
}

function generateTranslatorNotes(
  category: 'duplicate' | 'reference' | 'hybrid',
  frontmatter: CategoryEnhancedFrontmatter
): string[] {
  const notes = [];
  
  if (category === 'duplicate') {
    notes.push(
      'This content requires full cultural adaptation',
      'Preserve community philosophy while making locally relevant',
      'KEVIN represents community values - maintain significance'
    );
  }
  
  if (category === 'reference') {
    notes.push(
      'This content should reference shared technical data',
      'Do not translate technical specifications',
      'Ensure consistency with API documentation'
    );
  }
  
  if (category === 'hybrid') {
    notes.push(
      'Translate explanatory content, reference technical data',
      'Use hybrid components for seamless integration',
      'Maintain separation between cultural and technical content'
    );
  }
  
  if (frontmatter.culturalSignificance === 'high') {
    notes.push('High cultural significance - extra care required for cultural nuance');
  }
  
  if (frontmatter.technicalComplexity === 'high') {
    notes.push('High technical complexity - validate technical accuracy');
  }
  
  return notes;
}

/**
 * VitePress Plugin for Category Framework
 */
export function categoryFrameworkPlugin() {
  const validator = new CategoryValidator();
  
  return {
    name: 'category-framework',
    configResolved(config: any) {
      console.log('🏷️  Category Framework: Initializing content categorization...');
    },
    
    buildStart() {
      console.log('🔍 Category Framework: Validating file categories...');
    },
    
    transform(code: string, id: string) {
      if (!id.endsWith('.md')) return;
      
      // Extract frontmatter and validate category
      const frontmatterMatch = code.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        try {
          // Simple YAML-like parsing for validation
          const frontmatter = parseFrontmatter(frontmatterMatch[1]);
          
          if (frontmatter.translationCategory) {
            const valid = validator.validateFile(id, frontmatter as CategoryEnhancedFrontmatter);
            
            if (!valid) {
              console.warn(`⚠️  Category validation failed for ${id}`);
              validator.getErrors().forEach(error => console.error(`❌ ${error}`));
            }
            
            validator.getWarnings().forEach(warning => console.warn(`⚠️  ${warning}`));
          }
        } catch (error) {
          console.warn(`Failed to parse frontmatter for ${id}:`, error);
        }
      }
      
      return null;
    },
    
    buildEnd() {
      if (validator.hasErrors()) {
        console.error('❌ Category Framework: Validation errors found');
        validator.getErrors().forEach(error => console.error(`   ${error}`));
        throw new Error('Content categorization validation failed');
      } else {
        console.log('✅ Category Framework: All files validated successfully');
      }
    }
  };
}

// Simple frontmatter parser for validation
function parseFrontmatter(yamlString: string): Record<string, any> {
  const result: Record<string, any> = {};
  const lines = yamlString.split('\n');
  
  for (const line of lines) {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const [, key, value] = match;
      // Simple value parsing - extend as needed
      if (value.startsWith('"') && value.endsWith('"')) {
        result[key] = value.slice(1, -1);
      } else if (value === 'true' || value === 'false') {
        result[key] = value === 'true';
      } else if (!isNaN(Number(value))) {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    }
  }
  
  return result;
}

export default {
  CategoryValidator,
  analyzeFileCategory,
  generateTranslationContext,
  categoryFrameworkPlugin,
  CATEGORY_COMPONENTS
};