/**
 * Comprehensive Content Audit for Bitcoin Stamps Documentation
 * Complete categorization of all 40+ files for translation strategy
 */

import type { ContentMetadata } from './taxonomy.js';

export interface FileAudit {
  path: string;
  currentExists: boolean;
  category: 'duplicate' | 'reference' | 'hybrid';
  rationale: string;
  translationPriority: 'high' | 'medium' | 'low';
  estimatedEffort: 'small' | 'medium' | 'large';
  dependencies: string[];
  specialConsiderations: string[];
}

/**
 * Complete File Audit Results
 * Based on analysis of existing documentation structure
 */
export const COMPLETE_FILE_AUDIT: Record<string, FileAudit> = {
  // ========================================
  // DUPLICATE CATEGORY - Full Translation
  // ========================================
  
  // Homepage and Core Introduction (High Priority)
  'docs/en/index.md': {
    path: 'docs/en/index.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'Homepage with high cultural content, KEVIN philosophy, community values',
    translationPriority: 'high',
    estimatedEffort: 'large',
    dependencies: [],
    specialConsiderations: [
      'Preserve KEVIN cultural significance',
      'Adapt "In Lak\'ech Ala K\'in" philosophy appropriately',
      'Maintain community welcome tone',
      'Localize call-to-action buttons',
      'Cultural adaptation of hero messaging'
    ]
  },

  // Getting Started Guides (High Priority)
  'docs/en/guide/introduction.md': {
    path: 'docs/en/guide/introduction.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'First impression content requiring cultural adaptation and welcome messaging',
    translationPriority: 'high',
    estimatedEffort: 'medium',
    dependencies: ['docs/en/index.md'],
    specialConsiderations: [
      'Onboarding experience adaptation',
      'Cultural context for blockchain concepts',
      'Regional community building approach'
    ]
  },

  'docs/en/guide/getting-started.md': {
    path: 'docs/en/guide/getting-started.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'Practical onboarding requiring cultural context and community guidance',
    translationPriority: 'high',
    estimatedEffort: 'medium',
    dependencies: ['docs/en/guide/introduction.md'],
    specialConsiderations: [
      'Regional wallet recommendations',
      'Localized community resources',
      'Cultural adaptation of examples'
    ]
  },

  'docs/en/guide/economics.md': {
    path: 'docs/en/guide/economics.md', 
    currentExists: true,
    category: 'duplicate',
    rationale: 'Economic concepts require cultural context and regional market understanding',
    translationPriority: 'medium',
    estimatedEffort: 'large',
    dependencies: [],
    specialConsiderations: [
      'Regional economic context',
      'Currency and value examples adaptation',
      'Legal compliance considerations by region'
    ]
  },

  // Cultural Narratives (High Priority)
  'docs/en/narratives/index.md': {
    path: 'docs/en/narratives/index.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'Cultural content hub requiring full translation',
    translationPriority: 'high',
    estimatedEffort: 'medium',
    dependencies: [],
    specialConsiderations: ['Cultural storytelling adaptation', 'Philosophy translation']
  },

  'docs/en/narratives/kevin-origin.md': {
    path: 'docs/en/narratives/kevin-origin.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'Core cultural narrative defining community identity',
    translationPriority: 'high',
    estimatedEffort: 'large',
    dependencies: ['docs/en/narratives/index.md'],
    specialConsiderations: [
      'KEVIN cultural significance preservation',
      'Mythological storytelling adaptation',
      'Philosophy "In Lak\'ech Ala K\'in" cultural translation',
      'Artist recognition and appreciation'
    ]
  },

  'docs/en/narratives/bitcoin-stamps-history.md': {
    path: 'docs/en/narratives/bitcoin-stamps-history.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'Historical narrative with cultural significance',
    translationPriority: 'high',
    estimatedEffort: 'large',
    dependencies: [],
    specialConsiderations: [
      'Historical context adaptation',
      'Community evolution storytelling',
      'Technical milestone narrative'
    ]
  },

  'docs/en/narratives/community-values.md': {
    path: 'docs/en/narratives/community-values.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'Core community values and philosophy requiring cultural adaptation',
    translationPriority: 'high',
    estimatedEffort: 'medium',
    dependencies: ['docs/en/narratives/kevin-origin.md'],
    specialConsiderations: [
      'Value system cultural translation',
      'Community principles adaptation',
      'Ethical framework localization'
    ]
  },


  // Community Content (Medium Priority)
  'docs/en/community/index.md': {
    path: 'docs/en/community/index.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'Community hub requiring localization for regional community building',
    translationPriority: 'medium',
    estimatedEffort: 'medium',
    dependencies: [],
    specialConsiderations: [
      'Regional community channels',
      'Localized community resources',
      'Cultural community building approach'
    ]
  },

  'docs/en/community/contributing.md': {
    path: 'docs/en/community/contributing.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'Contribution guidelines requiring cultural context for community participation',
    translationPriority: 'medium',
    estimatedEffort: 'medium',
    dependencies: ['docs/en/community/index.md'],
    specialConsiderations: [
      'Open source culture adaptation',
      'Community participation guidelines',
      'Regional collaboration tools'
    ]
  },

  'docs/en/community/resources.md': {
    path: 'docs/en/community/resources.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'Community resources requiring regional adaptation',
    translationPriority: 'medium',
    estimatedEffort: 'medium',
    dependencies: ['docs/en/community/index.md'],
    specialConsiderations: [
      'Regional resource availability',
      'Localized tool recommendations',
      'Cultural resource curation'
    ]
  },

  'docs/en/community/showcase.md': {
    path: 'docs/en/community/showcase.md',
    currentExists: true,
    category: 'duplicate',
    rationale: 'Community showcase requiring cultural celebration of achievements',
    translationPriority: 'low',
    estimatedEffort: 'medium',
    dependencies: ['docs/en/community/index.md'],
    specialConsiderations: [
      'Community celebration adaptation',
      'Artist recognition localization',
      'Cultural showcase presentation'
    ]
  },

  // ========================================
  // HYBRID CATEGORY - Mixed Translation
  // ========================================

  // Protocol Documentation (High Priority)
  'docs/en/protocols/index.md': {
    path: 'docs/en/protocols/index.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'Protocol overview with explanatory content + technical specifications',
    translationPriority: 'high',
    estimatedEffort: 'medium',
    dependencies: [],
    specialConsiderations: [
      'Translate explanations, reference technical specs',
      'Cultural context for protocol benefits',
      'Technical accuracy maintenance'
    ]
  },

  'docs/en/protocols/src-20.md': {
    path: 'docs/en/protocols/src-20.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'SRC-20 explanations need translation, technical specs need consistency',
    translationPriority: 'high',
    estimatedEffort: 'large',
    dependencies: ['docs/en/protocols/index.md'],
    specialConsiderations: [
      'KEVIN cultural context translation',
      'Technical specification referencing',
      'Code example consistency',
      'API endpoint shared data'
    ]
  },

  'docs/en/protocols/src-101.md': {
    path: 'docs/en/protocols/src-101.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'Naming protocol with cultural usage + technical precision needed',
    translationPriority: 'medium',
    estimatedEffort: 'medium',
    dependencies: ['docs/en/protocols/index.md'],
    specialConsiderations: [
      'Naming concept cultural adaptation',
      'Technical specification consistency',
      'Usage example localization'
    ]
  },

  'docs/en/protocols/src-721.md': {
    path: 'docs/en/protocols/src-721.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'NFT concepts require cultural context + technical precision',
    translationPriority: 'medium',
    estimatedEffort: 'large',
    dependencies: ['docs/en/protocols/index.md'],
    specialConsiderations: [
      'NFT concept cultural explanation',
      'Technical specification referencing',
      'Advanced feature consistency'
    ]
  },

  'docs/en/protocols/olga.md': {
    path: 'docs/en/protocols/olga.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'Compression protocol with explanatory benefits + technical details',
    translationPriority: 'low',
    estimatedEffort: 'medium',
    dependencies: ['docs/en/protocols/index.md'],
    specialConsiderations: [
      'Compression benefit explanation',
      'Technical implementation reference',
      'Performance metrics consistency'
    ]
  },

  // Tutorial Content (High Priority)
  'docs/en/tutorials/index.md': {
    path: 'docs/en/tutorials/index.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'Tutorial hub with guidance + technical pathway references',
    translationPriority: 'high',
    estimatedEffort: 'medium',
    dependencies: [],
    specialConsiderations: [
      'Learning path cultural adaptation',
      'Technical complexity guidance',
      'Skill level assessments'
    ]
  },

  'docs/en/tutorials/creating-first-stamp.md': {
    path: 'docs/en/tutorials/creating-first-stamp.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'First experience tutorial requiring cultural onboarding + technical accuracy',
    translationPriority: 'high',
    estimatedEffort: 'large',
    dependencies: ['docs/en/tutorials/index.md'],
    specialConsiderations: [
      'Onboarding experience localization',
      'Code example consistency',
      'Tool recommendation adaptation',
      'Cultural motivation preservation'
    ]
  },

  'docs/en/tutorials/visual-workflow.md': {
    path: 'docs/en/tutorials/visual-workflow.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'Visual guide with explanations + consistent technical workflow',
    translationPriority: 'high',
    estimatedEffort: 'medium',
    dependencies: ['docs/en/tutorials/creating-first-stamp.md'],
    specialConsiderations: [
      'Visual explanation translation',
      'Workflow step consistency',
      'UI element localization'
    ]
  },

  'docs/en/tutorials/src20-token-creation.md': {
    path: 'docs/en/tutorials/src20-token-creation.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'Token creation tutorial with cultural context + technical procedures',
    translationPriority: 'high',
    estimatedEffort: 'large',
    dependencies: ['docs/en/protocols/src-20.md'],
    specialConsiderations: [
      'Token creation cultural context',
      'Technical procedure consistency',
      'Code example accuracy',
      'KEVIN fair launch principles'
    ]
  },

  'docs/en/tutorials/artist-tools.md': {
    path: 'docs/en/tutorials/artist-tools.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'Artist workflow with creative guidance + technical tool consistency',
    translationPriority: 'medium',
    estimatedEffort: 'medium',
    dependencies: ['docs/en/tutorials/creating-first-stamp.md'],
    specialConsiderations: [
      'Creative workflow cultural adaptation',
      'Tool consistency across languages',
      'Artistic inspiration localization'
    ]
  },

  'docs/en/tutorials/sdk-integration.md': {
    path: 'docs/en/tutorials/sdk-integration.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'SDK tutorial with explanations + consistent technical implementation',
    translationPriority: 'high',
    estimatedEffort: 'large',
    dependencies: ['docs/en/tutorials/index.md'],
    specialConsiderations: [
      'Development explanation translation',
      'Code example consistency',
      'API reference accuracy',
      'Installation procedure uniformity'
    ]
  },

  'docs/en/tutorials/api-integration.md': {
    path: 'docs/en/tutorials/api-integration.md',
    currentExists: true,
    category: 'hybrid',
    rationale: 'API tutorial with usage guidance + consistent technical specifications',
    translationPriority: 'medium',
    estimatedEffort: 'large',
    dependencies: ['docs/en/tutorials/sdk-integration.md'],
    specialConsiderations: [
      'API usage explanation translation',
      'Endpoint consistency',
      'Response format accuracy',
      'Integration pattern consistency'
    ]
  },

  // ========================================
  // REFERENCE CATEGORY - Shared Data Only
  // ========================================

  // API and Technical Reference (Auto-generated preferred)
  'docs/api/entities.json': {
    path: 'docs/api/entities.json',
    currentExists: true,
    category: 'reference',
    rationale: 'Pure technical data requiring consistency across all languages',
    translationPriority: 'high',
    estimatedEffort: 'small',
    dependencies: [],
    specialConsiderations: [
      'Single source of truth',
      'Auto-generated from central data',
      'Consistent across all language versions',
      'Version control centrally'
    ]
  },

  'docs/api/protocols.json': {
    path: 'docs/api/protocols.json',
    currentExists: true,
    category: 'reference',
    rationale: 'Protocol technical specifications must remain consistent',
    translationPriority: 'high',
    estimatedEffort: 'small',
    dependencies: [],
    specialConsiderations: [
      'Technical accuracy critical',
      'Protocol constant consistency',
      'Block height accuracy',
      'Schema version consistency'
    ]
  },

  'docs/api/schema.json': {
    path: 'docs/api/schema.json',
    currentExists: true,
    category: 'reference',
    rationale: 'Schema.org structured data must be technically consistent',
    translationPriority: 'medium',
    estimatedEffort: 'small',
    dependencies: [],
    specialConsiderations: [
      'Schema.org compliance',
      'SEO metadata consistency',
      'Structured data accuracy'
    ]
  }
};

/**
 * Translation Priority Summary
 * Organized by implementation phases
 */
export const TRANSLATION_PHASES = {
  phase1_critical: {
    description: 'Core cultural content and primary user journeys',
    files: [
      'docs/en/index.md',
      'docs/en/guide/introduction.md',
      'docs/en/guide/getting-started.md',
      'docs/en/narratives/kevin-origin.md',
      'docs/en/tutorials/creating-first-stamp.md'
    ],
    estimatedEffort: '2-3 weeks per language',
    prerequisites: ['Translation team cultural training', 'KEVIN philosophy education']
  },
  
  phase2_protocols: {
    description: 'Protocol documentation with hybrid approach',
    files: [
      'docs/en/protocols/src-20.md',
      'docs/en/protocols/src-101.md', 
      'docs/en/protocols/src-721.md',
      'docs/en/tutorials/sdk-integration.md'
    ],
    estimatedEffort: '3-4 weeks per language',
    prerequisites: ['Technical accuracy validation', 'Shared data system implementation']
  },
  
  phase3_community: {
    description: 'Community and cultural content completion',
    files: [
      'docs/en/narratives/bitcoin-stamps-history.md',
      'docs/en/narratives/community-values.md',
      'docs/en/community/index.md',
      'docs/en/community/contributing.md'
    ],
    estimatedEffort: '2 weeks per language',
    prerequisites: ['Community localization strategy', 'Regional community channels']
  },

  phase4_advanced: {
    description: 'Advanced content and specialized tutorials',
    files: [
      'docs/en/tutorials/api-integration.md',
      'docs/en/tutorials/artist-tools.md',
      'docs/en/protocols/olga.md',
      'docs/en/community/showcase.md'
    ],
    estimatedEffort: '2-3 weeks per language',
    prerequisites: ['Advanced technical validation', 'Community showcase content']
  }
};

/**
 * Effort and Resource Estimation
 */
export const TRANSLATION_ESTIMATES = {
  totalFiles: Object.keys(COMPLETE_FILE_AUDIT).length,
  byCategory: {
    duplicate: Object.values(COMPLETE_FILE_AUDIT).filter(f => f.category === 'duplicate').length,
    hybrid: Object.values(COMPLETE_FILE_AUDIT).filter(f => f.category === 'hybrid').length,
    reference: Object.values(COMPLETE_FILE_AUDIT).filter(f => f.category === 'reference').length
  },
  byEffort: {
    small: Object.values(COMPLETE_FILE_AUDIT).filter(f => f.estimatedEffort === 'small').length,
    medium: Object.values(COMPLETE_FILE_AUDIT).filter(f => f.estimatedEffort === 'medium').length,
    large: Object.values(COMPLETE_FILE_AUDIT).filter(f => f.estimatedEffort === 'large').length
  },
  estimatedTimePerLanguage: '8-12 weeks for complete translation',
  recommendedApproach: 'Phased implementation focusing on high-priority cultural content first'
};

export default {
  COMPLETE_FILE_AUDIT,
  TRANSLATION_PHASES,
  TRANSLATION_ESTIMATES
};