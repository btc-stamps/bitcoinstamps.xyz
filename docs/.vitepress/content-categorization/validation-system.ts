/**
 * Content Categorization Validation System
 * Comprehensive quality assurance and consistency checking for translation framework
 */

import type { CategoryEnhancedFrontmatter, TranslationContext } from './technical-framework.js';
import { COMPLETE_FILE_AUDIT } from './file-audit.js';
import { DUPLICATE_CATEGORY, REFERENCE_CATEGORY, HYBRID_CATEGORY } from './taxonomy.js';

/**
 * Validation Result Types
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: ValidationSuggestion[];
  score: ValidationScore;
}

export interface ValidationError {
  type: 'critical' | 'blocking' | 'major';
  category: string;
  file: string;
  message: string;
  expected?: string;
  actual?: string;
  fixSuggestion?: string;
}

export interface ValidationWarning {
  type: 'minor' | 'optimization' | 'maintenance';
  category: string; 
  file: string;
  message: string;
  recommendation?: string;
}

export interface ValidationSuggestion {
  type: 'improvement' | 'optimization' | 'enhancement';
  category: string;
  file: string;
  suggestion: string;
  impact: 'high' | 'medium' | 'low';
}

export interface ValidationScore {
  overall: number;           // 0-100
  categoryCompliance: number;
  technicalAccuracy: number;
  culturalPreservation: number;
  maintainability: number;
}

/**
 * Content Category Validator
 * Validates files against their assigned categories and framework rules
 */
export class ContentCategoryValidator {
  private results: ValidationResult;
  private currentLanguage: string;
  
  constructor(language: string = 'en') {
    this.currentLanguage = language;
    this.results = {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
      score: {
        overall: 100,
        categoryCompliance: 100,
        technicalAccuracy: 100,
        culturalPreservation: 100,
        maintainability: 100
      }
    };
  }

  /**
   * Validate a single file against its category requirements
   */
  validateFile(
    filePath: string, 
    content: string, 
    frontmatter: CategoryEnhancedFrontmatter
  ): ValidationResult {
    this.results = this.initializeResults();
    
    // Get audit information
    const audit = COMPLETE_FILE_AUDIT[filePath];
    if (!audit) {
      this.addWarning('maintenance', 'file-audit', filePath, 
        'File not found in audit registry - may be newly created');
    }

    // Validate category assignment
    this.validateCategoryAssignment(filePath, frontmatter, audit);
    
    // Category-specific validation
    switch (frontmatter.translationCategory) {
      case 'duplicate':
        this.validateDuplicateCategory(filePath, content, frontmatter);
        break;
      case 'reference':
        this.validateReferenceCategory(filePath, content, frontmatter);
        break;
      case 'hybrid':
        this.validateHybridCategory(filePath, content, frontmatter);
        break;
      default:
        this.addError('critical', 'category-assignment', filePath,
          `Invalid category: ${frontmatter.translationCategory}`,
          'duplicate, reference, or hybrid',
          frontmatter.translationCategory);
    }

    // Cross-cutting validations
    this.validateFrontmatterCompleteness(filePath, frontmatter);
    this.validateContentQuality(filePath, content, frontmatter);
    this.validateTechnicalAccuracy(filePath, content, frontmatter);
    this.validateCulturalElements(filePath, content, frontmatter);
    
    // Calculate final scores
    this.calculateValidationScores();
    
    return this.results;
  }

  /**
   * Validate DUPLICATE category requirements
   */
  private validateDuplicateCategory(
    filePath: string, 
    content: string, 
    frontmatter: CategoryEnhancedFrontmatter
  ): void {
    // Should not reference shared technical data extensively
    if (frontmatter.sharedDataSources?.technical?.length > 2) {
      this.addWarning('optimization', 'duplicate-category', filePath,
        'DUPLICATE category file references multiple technical data sources. Consider HYBRID category.',
        'Review category assignment to optimize translation efficiency');
    }

    // Should have cultural content indicators
    const culturalIndicators = ['kevin', 'community', 'philosophy', 'values', 'culture'];
    const culturalScore = culturalIndicators.reduce((score, indicator) => {
      return score + (content.toLowerCase().includes(indicator) ? 1 : 0);
    }, 0);

    if (culturalScore < 2) {
      this.addSuggestion('improvement', 'duplicate-category', filePath,
        'DUPLICATE category should contain significant cultural content',
        'medium');
    }

    // Must have translation guidelines for cultural adaptation
    if (!frontmatter.translationGuidelines?.duplicate?.length) {
      this.addError('major', 'duplicate-category', filePath,
        'DUPLICATE category files must specify cultural translation guidelines',
        'translationGuidelines.duplicate array with cultural adaptation instructions');
    }

    // Cultural significance should be medium or high
    if (frontmatter.culturalSignificance === 'low') {
      this.addWarning('minor', 'duplicate-category', filePath,
        'DUPLICATE category with low cultural significance may be inefficient',
        'Consider HYBRID category for better translation efficiency');
    }
  }

  /**
   * Validate REFERENCE category requirements
   */
  private validateReferenceCategory(
    filePath: string, 
    content: string, 
    frontmatter: CategoryEnhancedFrontmatter
  ): void {
    // Should not require translation
    if (frontmatter.validationRules?.requiresTranslation) {
      this.addError('blocking', 'reference-category', filePath,
        'REFERENCE category files should not require translation',
        'validationRules.requiresTranslation: false');
    }

    // Should specify shared data sources
    if (!frontmatter.sharedDataSources || 
        Object.keys(frontmatter.sharedDataSources).length === 0) {
      this.addError('major', 'reference-category', filePath,
        'REFERENCE category files must specify shared data sources');
    }

    // Should not have extensive explanatory content
    const explanatoryWords = content.split(/\s+/).length;
    if (explanatoryWords > 200) {
      this.addWarning('optimization', 'reference-category', filePath,
        `REFERENCE category has ${explanatoryWords} words of content. Consider HYBRID category for explanatory content.`,
        'Move explanatory content to HYBRID files and keep only technical references');
    }

    // Technical complexity should be medium or high
    if (frontmatter.technicalComplexity === 'low') {
      this.addSuggestion('improvement', 'reference-category', filePath,
        'REFERENCE category typically contains high technical complexity content',
        'low');
    }
  }

  /**
   * Validate HYBRID category requirements
   */
  private validateHybridCategory(
    filePath: string, 
    content: string, 
    frontmatter: CategoryEnhancedFrontmatter
  ): void {
    // Should have both translation guidelines and shared data
    const hasTranslationGuidelines = 
      frontmatter.translationGuidelines?.duplicate?.length ||
      frontmatter.translationGuidelines?.['shared-data']?.length;
      
    if (!hasTranslationGuidelines) {
      this.addError('major', 'hybrid-category', filePath,
        'HYBRID category files must specify translation guidelines for explanatory content');
    }

    if (!frontmatter.sharedDataSources) {
      this.addError('major', 'hybrid-category', filePath,
        'HYBRID category files must specify shared data sources for technical content');
    }

    // Should specify hybrid components usage
    if (!frontmatter.hybridComponents) {
      this.addWarning('minor', 'hybrid-category', filePath,
        'HYBRID category should specify which hybrid components to use',
        'Add hybridComponents section to frontmatter');
    }

    // Check for balanced content (both explanatory and technical)
    const technicalIndicators = ['api', 'code', 'specification', 'protocol', 'technical'];
    const explanatoryIndicators = ['tutorial', 'guide', 'how to', 'explanation', 'introduction'];
    
    const technicalScore = technicalIndicators.reduce((score, indicator) => {
      return score + (content.toLowerCase().includes(indicator) ? 1 : 0);
    }, 0);
    
    const explanatoryScore = explanatoryIndicators.reduce((score, indicator) => {
      return score + (content.toLowerCase().includes(indicator) ? 1 : 0);
    }, 0);

    if (technicalScore === 0) {
      this.addSuggestion('improvement', 'hybrid-category', filePath,
        'HYBRID category should contain technical content. Consider DUPLICATE category.',
        'medium');
    }

    if (explanatoryScore === 0) {
      this.addSuggestion('improvement', 'hybrid-category', filePath,
        'HYBRID category should contain explanatory content. Consider REFERENCE category.',
        'medium');
    }
  }

  /**
   * Validate category assignment against audit registry
   */
  private validateCategoryAssignment(
    filePath: string, 
    frontmatter: CategoryEnhancedFrontmatter, 
    audit?: any
  ): void {
    if (audit && frontmatter.translationCategory !== audit.category) {
      this.addError('major', 'category-assignment', filePath,
        `Category mismatch with audit registry`,
        audit.category,
        frontmatter.translationCategory,
        `Update frontmatter translationCategory to "${audit.category}"`);
    }
  }

  /**
   * Validate frontmatter completeness
   */
  private validateFrontmatterCompleteness(
    filePath: string, 
    frontmatter: CategoryEnhancedFrontmatter
  ): void {
    const requiredFields = ['title', 'description', 'translationCategory'];
    const missingFields = requiredFields.filter(field => !frontmatter[field]);
    
    if (missingFields.length > 0) {
      this.addError('major', 'frontmatter', filePath,
        `Missing required frontmatter fields: ${missingFields.join(', ')}`);
    }

    // Category-specific required fields
    if (frontmatter.translationCategory === 'hybrid') {
      if (!frontmatter.translationGuidelines) {
        this.addError('major', 'frontmatter', filePath,
          'HYBRID category requires translationGuidelines');
      }
      if (!frontmatter.sharedDataSources) {
        this.addError('major', 'frontmatter', filePath,
          'HYBRID category requires sharedDataSources');
      }
    }
  }

  /**
   * Validate content quality indicators
   */
  private validateContentQuality(
    filePath: string, 
    content: string, 
    frontmatter: CategoryEnhancedFrontmatter
  ): void {
    // Check for broken internal links
    const internalLinkMatches = content.match(/\[.*?\]\(\/[^)]+\)/g) || [];
    internalLinkMatches.forEach(link => {
      const url = link.match(/\((.*?)\)/)?.[1];
      if (url && !this.isValidInternalLink(url)) {
        this.addWarning('minor', 'content-quality', filePath,
          `Potentially broken internal link: ${link}`,
          'Verify link destination exists');
      }
    });

    // Check for content length appropriateness
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 100 && frontmatter.translationCategory === 'duplicate') {
      this.addSuggestion('improvement', 'content-quality', filePath,
        `DUPLICATE category content is quite short (${wordCount} words). Consider if full translation is necessary.`,
        'low');
    }

    // Check for placeholder content
    const placeholders = ['TODO', 'FIXME', 'TBD', 'coming soon'];
    placeholders.forEach(placeholder => {
      if (content.toLowerCase().includes(placeholder.toLowerCase())) {
        this.addWarning('minor', 'content-quality', filePath,
          `Content contains placeholder: ${placeholder}`,
          'Complete content before translation');
      }
    });
  }

  /**
   * Validate technical accuracy elements
   */
  private validateTechnicalAccuracy(
    filePath: string, 
    content: string, 
    frontmatter: CategoryEnhancedFrontmatter
  ): void {
    // Check for block height accuracy (important for Bitcoin Stamps)
    const blockHeightMatches = content.match(/block\s+(\d{6,})/gi) || [];
    const knownBlockHeights = [788041, 796000, 865000]; // KEVIN, SRC-20 migration, OLGA
    
    blockHeightMatches.forEach(match => {
      const height = parseInt(match.match(/(\d+)/)?.[1] || '0');
      if (height > 900000) { // Future blocks should be flagged
        this.addWarning('minor', 'technical-accuracy', filePath,
          `Block height ${height} seems futuristic. Verify accuracy.`);
      }
    });

    // Check for API URL consistency
    const apiUrlMatches = content.match(/https?:\/\/[^)\s]+api[^)\s]*/gi) || [];
    apiUrlMatches.forEach(url => {
      if (!url.includes('stampchain.io') && !url.includes('api.')) {
        this.addSuggestion('improvement', 'technical-accuracy', filePath,
          `API URL ${url} may need consistency review`,
          'low');
      }
    });
  }

  /**
   * Validate cultural elements preservation
   */
  private validateCulturalElements(
    filePath: string, 
    content: string, 
    frontmatter: CategoryEnhancedFrontmatter
  ): void {
    // Check for KEVIN mentions and cultural significance
    if (content.toLowerCase().includes('kevin')) {
      if (frontmatter.culturalSignificance !== 'high') {
        this.addSuggestion('improvement', 'cultural-elements', filePath,
          'Content mentions KEVIN but cultural significance is not high',
          'medium');
      }
    }

    // Check for "In Lak'ech Ala K'in" philosophy preservation
    if (content.includes("In Lak'ech Ala K'in") || content.includes("we are all kevin")) {
      if (frontmatter.translationCategory !== 'duplicate') {
        this.addWarning('minor', 'cultural-elements', filePath,
          'Cultural philosophy content in non-DUPLICATE category',
          'Ensure cultural nuance is preserved in translation approach');
      }
    }

    // Check for community-specific references
    const communityReferences = ['community', 'fair launch', 'artist', 'creator'];
    const communityScore = communityReferences.reduce((score, ref) => {
      return score + (content.toLowerCase().includes(ref) ? 1 : 0);
    }, 0);

    if (communityScore >= 3 && frontmatter.translationCategory === 'reference') {
      this.addSuggestion('improvement', 'cultural-elements', filePath,
        'High community content in REFERENCE category may need cultural adaptation',
        'high');
    }
  }

  /**
   * Helper Methods
   */
  private isValidInternalLink(url: string): boolean {
    // Simplified validation - in reality, would check against site map
    const validPaths = ['/guide/', '/protocols/', '/tutorials/', '/narratives/', '/community/', '/api/'];
    return validPaths.some(path => url.startsWith(path));
  }

  private addError(
    type: ValidationError['type'], 
    category: string, 
    file: string, 
    message: string, 
    expected?: string, 
    actual?: string,
    fixSuggestion?: string
  ): void {
    this.results.errors.push({ type, category, file, message, expected, actual, fixSuggestion });
    this.results.isValid = false;
  }

  private addWarning(
    type: ValidationWarning['type'], 
    category: string, 
    file: string, 
    message: string,
    recommendation?: string
  ): void {
    this.results.warnings.push({ type, category, file, message, recommendation });
  }

  private addSuggestion(
    type: ValidationSuggestion['type'], 
    category: string, 
    file: string, 
    suggestion: string,
    impact: ValidationSuggestion['impact']
  ): void {
    this.results.suggestions.push({ type, category, file, suggestion, impact });
  }

  private initializeResults(): ValidationResult {
    return {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
      score: {
        overall: 100,
        categoryCompliance: 100,
        technicalAccuracy: 100,
        culturalPreservation: 100,
        maintainability: 100
      }
    };
  }

  private calculateValidationScores(): void {
    const { errors, warnings } = this.results;
    
    // Calculate deductions
    const criticalDeduction = errors.filter(e => e.type === 'critical').length * 25;
    const blockingDeduction = errors.filter(e => e.type === 'blocking').length * 15;
    const majorDeduction = errors.filter(e => e.type === 'major').length * 10;
    const warningDeduction = warnings.length * 2;
    
    const totalDeduction = criticalDeduction + blockingDeduction + majorDeduction + warningDeduction;
    
    // Calculate category-specific scores
    const categoryErrors = errors.filter(e => e.category.includes('category')).length;
    const technicalErrors = errors.filter(e => e.category.includes('technical')).length;
    const culturalWarnings = warnings.filter(w => w.category.includes('cultural')).length;
    const maintenanceIssues = errors.filter(e => e.category === 'maintenance').length + 
                             warnings.filter(w => w.type === 'maintenance').length;
    
    this.results.score = {
      overall: Math.max(0, 100 - totalDeduction),
      categoryCompliance: Math.max(0, 100 - (categoryErrors * 20)),
      technicalAccuracy: Math.max(0, 100 - (technicalErrors * 15)),
      culturalPreservation: Math.max(0, 100 - (culturalWarnings * 10)),
      maintainability: Math.max(0, 100 - (maintenanceIssues * 5))
    };
  }
}

/**
 * Cross-Language Consistency Validator
 * Validates consistency across multiple language versions
 */
export class ConsistencyValidator {
  private languages: string[];
  private results: ValidationResult;

  constructor(languages: string[] = ['en', 'es', 'fr', 'zh']) {
    this.languages = languages;
    this.results = this.initializeResults();
  }

  /**
   * Validate consistency across language versions
   */
  validateConsistency(
    filePath: string,
    languageVersions: Map<string, { content: string, frontmatter: CategoryEnhancedFrontmatter }>
  ): ValidationResult {
    this.results = this.initializeResults();

    // Validate category consistency
    this.validateCategoryConsistency(filePath, languageVersions);
    
    // Validate shared data consistency
    this.validateSharedDataConsistency(filePath, languageVersions);
    
    // Validate technical content consistency
    this.validateTechnicalConsistency(filePath, languageVersions);
    
    // Validate structural consistency
    this.validateStructuralConsistency(filePath, languageVersions);

    this.calculateConsistencyScores();
    return this.results;
  }

  private validateCategoryConsistency(
    filePath: string,
    languageVersions: Map<string, { content: string, frontmatter: CategoryEnhancedFrontmatter }>
  ): void {
    const categories = new Set();
    
    languageVersions.forEach((version, lang) => {
      categories.add(version.frontmatter.translationCategory);
    });

    if (categories.size > 1) {
      this.addError('critical', 'consistency', filePath,
        `Category inconsistency across languages: ${Array.from(categories).join(', ')}`);
    }
  }

  private validateSharedDataConsistency(
    filePath: string,
    languageVersions: Map<string, { content: string, frontmatter: CategoryEnhancedFrontmatter }>
  ): void {
    // For REFERENCE and HYBRID categories, shared data should be identical
    const enVersion = languageVersions.get('en');
    if (!enVersion) return;

    const category = enVersion.frontmatter.translationCategory;
    if (category === 'reference' || category === 'hybrid') {
      // Check for consistent API endpoints, block heights, etc.
      const technicalDataPattern = /\b\d{6,}\b|api\.[^/\s]+|https?:\/\/[^/\s]+\.json/g;
      
      const enTechnicalData = enVersion.content.match(technicalDataPattern) || [];
      
      languageVersions.forEach((version, lang) => {
        if (lang === 'en') return;
        
        const langTechnicalData = version.content.match(technicalDataPattern) || [];
        
        // Check for missing technical data
        enTechnicalData.forEach(data => {
          if (!langTechnicalData.includes(data)) {
            this.addError('major', 'consistency', filePath,
              `Missing technical data in ${lang}: ${data}`);
          }
        });
      });
    }
  }

  private validateTechnicalConsistency(
    filePath: string,
    languageVersions: Map<string, { content: string, frontmatter: CategoryEnhancedFrontmatter }>
  ): void {
    // Validate that code examples are identical across versions
    const codeBlockPattern = /```[\s\S]*?```/g;
    
    const enVersion = languageVersions.get('en');
    if (!enVersion) return;
    
    const enCodeBlocks = enVersion.content.match(codeBlockPattern) || [];
    
    languageVersions.forEach((version, lang) => {
      if (lang === 'en') return;
      
      const langCodeBlocks = version.content.match(codeBlockPattern) || [];
      
      if (enCodeBlocks.length !== langCodeBlocks.length) {
        this.addError('major', 'consistency', filePath,
          `Code block count mismatch in ${lang}: expected ${enCodeBlocks.length}, got ${langCodeBlocks.length}`);
      }
      
      // Check for exact code block matches
      enCodeBlocks.forEach((codeBlock, index) => {
        if (langCodeBlocks[index] !== codeBlock) {
          this.addWarning('minor', 'consistency', filePath,
            `Code block ${index + 1} differs in ${lang}`,
            'Verify code examples are identical across languages');
        }
      });
    });
  }

  private validateStructuralConsistency(
    filePath: string,
    languageVersions: Map<string, { content: string, frontmatter: CategoryEnhancedFrontmatter }>
  ): void {
    // Validate that heading structure is consistent
    const headingPattern = /^#+\s+.+$/gm;
    
    const enVersion = languageVersions.get('en');
    if (!enVersion) return;
    
    const enHeadings = enVersion.content.match(headingPattern) || [];
    const enHeadingLevels = enHeadings.map(h => h.match(/^#+/)?.[0].length || 0);
    
    languageVersions.forEach((version, lang) => {
      if (lang === 'en') return;
      
      const langHeadings = version.content.match(headingPattern) || [];
      const langHeadingLevels = langHeadings.map(h => h.match(/^#+/)?.[0].length || 0);
      
      if (JSON.stringify(enHeadingLevels) !== JSON.stringify(langHeadingLevels)) {
        this.addWarning('minor', 'consistency', filePath,
          `Heading structure differs in ${lang}`,
          'Maintain consistent heading hierarchy across languages');
      }
    });
  }

  private initializeResults(): ValidationResult {
    return {
      isValid: true,
      errors: [],
      warnings: [],
      suggestions: [],
      score: {
        overall: 100,
        categoryCompliance: 100,
        technicalAccuracy: 100,
        culturalPreservation: 100,
        maintainability: 100
      }
    };
  }

  private addError(type: ValidationError['type'], category: string, file: string, message: string): void {
    this.results.errors.push({ type, category, file, message });
    this.results.isValid = false;
  }

  private addWarning(type: ValidationWarning['type'], category: string, file: string, message: string, recommendation?: string): void {
    this.results.warnings.push({ type, category, file, message, recommendation });
  }

  private calculateConsistencyScores(): void {
    const { errors, warnings } = this.results;
    
    const criticalDeduction = errors.filter(e => e.type === 'critical').length * 30;
    const majorDeduction = errors.filter(e => e.type === 'major').length * 15;
    const warningDeduction = warnings.length * 5;
    
    const totalDeduction = criticalDeduction + majorDeduction + warningDeduction;
    
    this.results.score = {
      overall: Math.max(0, 100 - totalDeduction),
      categoryCompliance: Math.max(0, 100 - (errors.length * 10)),
      technicalAccuracy: Math.max(0, 100 - (errors.filter(e => e.category.includes('technical')).length * 20)),
      culturalPreservation: 100, // Not applicable for consistency validation
      maintainability: Math.max(0, 100 - (warnings.filter(w => w.type === 'maintenance').length * 5))
    };
  }
}

export default {
  ContentCategoryValidator,
  ConsistencyValidator
};