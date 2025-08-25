# Sample Implementation Examples

This document demonstrates how the content categorization framework would be applied to existing Bitcoin Stamps documentation files.

## DUPLICATE Category Example: KEVIN Origin Story

### Original File: `docs/en/narratives/kevin-origin.md`

**Enhanced Frontmatter:**
```yaml
---
title: "KEVIN Origin Story: From Artistic Experiment to Cultural Icon"
description: "The complete story of how Arwyn's artistic experiment became mythical community guide"
leoType: "narrative"
culturalSignificance: "high"
audience: "both"
mentions: ["kevin", "arwyn", "mikeinspace", "reinamora"]
philosophy: "In Lak'ech Ala K'in - we are all Kevin"
blockHeight: 788041

# Content Categorization Framework
translationCategory: "duplicate"
contentType: "cultural-narratives"
technicalComplexity: "low"
maintenanceBurden: "low"

translationGuidelines:
  duplicate:
    - "Preserve KEVIN cultural significance across all languages"
    - "Adapt 'In Lak'ech Ala K'in' philosophy with cultural sensitivity"
    - "Maintain mythological storytelling tone"
    - "Localize artistic appreciation while preserving creator recognition"
    - "Adapt community philosophy for regional cultural context"
    - "Preserve the sacred narrative of community genesis"

qualityChecks:
  - "KEVIN cultural significance maintained"
  - "Community philosophy authentically translated"
  - "Mythological narrative preserved"
  - "Artist recognition maintained"
  - "Regional cultural relevance achieved"

validationRules:
  requiresTranslation: true
  requiresSharedData: false
  requiresConsistencyCheck: false

lastReviewed: "2025-01-15"
reviewDue: "2025-04-15"
---
```

**Translation Context Generated:**
```json
{
  "file": "docs/en/narratives/kevin-origin.md",
  "category": "duplicate",
  "priority": "high",
  "estimatedEffort": "large",
  "guidelines": {
    "cultural": [
      "Preserve KEVIN cultural significance across all languages",
      "Adapt 'In Lak'ech Ala K'in' philosophy with cultural sensitivity",
      "Maintain mythological storytelling tone"
    ]
  },
  "specialConsiderations": [
    "KEVIN cultural significance preservation",
    "Mythological storytelling adaptation",
    "Philosophy 'In Lak'ech Ala K'in' cultural translation",
    "Artist recognition and appreciation"
  ],
  "translatorNotes": [
    "This content requires full cultural adaptation",
    "Preserve community philosophy while making locally relevant",
    "KEVIN represents community values - maintain significance",
    "High cultural significance - extra care required for cultural nuance"
  ]
}
```

---

## HYBRID Category Example: SRC-20 Protocol Documentation

### Original File: `docs/en/protocols/src-20.md`

**Enhanced Frontmatter:**
```yaml
---
title: "SRC-20 Token Standard"
description: "Bitcoin Stamps fungible token standard enabling permanent token creation"
leoType: "protocol"
audience: "both"
mentions: ["src-20", "kevin", "arwyn"]
culturalSignificance: "high"
technicalComplexity: "high"

# Content Categorization Framework
translationCategory: "hybrid"
contentType: "protocol-explanations"
maintenanceBurden: "medium"

translationGuidelines:
  duplicate:
    - "Translate protocol explanations and benefits for cultural context"
    - "Adapt KEVIN cultural references for regional understanding"
    - "Localize use case examples while preserving technical accuracy"
    - "Translate community values and fair launch principles"
  reference:
    - "Reference shared API endpoints from technical specifications"
    - "Use consistent protocol constants and parameters"
    - "Maintain block height accuracy (788041, 796000)"
  shared-data:
    - "Protocol version numbers and technical metrics"
    - "Block heights and milestone dates"
    - "API response formats and schemas"

sharedDataSources:
  technical: ["src-20-protocol-spec", "api-endpoints"]
  api: ["protocol-constants", "transaction-formats"]
  constants: ["block-heights", "protocol-versions"]

hybridComponents:
  SharedTechnicalData: true
  LocalizedExplanation: true
  ReferenceAPI: true

validationRules:
  requiresTranslation: true
  requiresSharedData: true
  requiresConsistencyCheck: true
---
```

**Sample Hybrid Content Implementation:**
```vue
<!-- Localized explanation section -->
<LocalizedExplanation shared-data="src-20-constants">
  <h2>{{ $t('src-20.what-is') }}</h2>
  <p>{{ $t('src-20.explanation', { kevin: 'KEVIN' }) }}</p>
  
  <h3>{{ $t('src-20.key-features') }}</h3>
  <ul>
    <li>{{ $t('src-20.feature.bitcoin-integration') }}</li>
    <li>{{ $t('src-20.feature.fair-launch') }}</li>
    <li>{{ $t('src-20.feature.permanent-storage') }}</li>
    <li>{{ $t('src-20.feature.community-driven') }}</li>
  </ul>
</LocalizedExplanation>

<!-- Shared technical specification -->
<SharedTechnicalData source="src-20-protocol" type="specification">
  <template #default="{ data }">
    <h3>Protocol Specification</h3>
    <table>
      <thead>
        <tr>
          <th>Action</th>
          <th>Purpose</th>
          <th>Required Fields</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="action in data.actions" :key="action.name">
          <td>{{ action.name }}</td>
          <td>{{ action.purpose }}</td>
          <td>{{ action.requiredFields.join(', ') }}</td>
        </tr>
      </tbody>
    </table>
  </template>
</SharedTechnicalData>

<!-- API Reference -->
<ReferenceAPI :endpoint="{
  method: 'GET',
  path: '/api/src20/tokens',
  description: 'List all SRC-20 tokens',
  source: 'api-endpoints-src20'
}" />
```

---

## REFERENCE Category Example: API Entities

### File: `docs/api/entities.json`

**Enhanced Metadata:**
```json
{
  "translationCategory": "reference",
  "contentType": "api-specifications",
  "technicalComplexity": "high",
  "maintenanceBurden": "high",
  "generatedFrom": "multilingual-data.ts",
  "lastGenerated": "2025-01-15T10:30:00Z",
  "validationRules": {
    "requiresTranslation": false,
    "requiresSharedData": true,
    "requiresConsistencyCheck": true
  },
  "qualityChecks": [
    "Technical accuracy validated",
    "Consistent across all languages", 
    "No technical drift introduced",
    "Auto-generated content up to date"
  ]
}
```

**Single Source Implementation:**
```typescript
// This file is auto-generated from multilingual-data.ts
// DO NOT EDIT MANUALLY - Use the source data files instead

import { generateAPIEntities } from './multilingual-data.js';

export default {
  async load() {
    const currentLanguage = getCurrentLanguage();
    return generateAPIEntities(currentLanguage);
  }
}
```

---

## VitePress Configuration Integration

### Enhanced `config.ts` with Category Framework

```typescript
import { categoryFrameworkPlugin } from './content-categorization/technical-framework.js';

export default defineConfig({
  // Add category validation plugin
  vite: {
    plugins: [
      categoryFrameworkPlugin(),
      {
        name: 'leo-api-validator',
        buildStart: async () => {
          console.log('🔧 LEO API system: Validating data consistency...')
          const isValid = await validateAPIConsistency()
          if (!isValid) throw new Error('LEO API data validation failed')
        }
      }
    ]
  },

  // Transform page data with category information
  transformPageData(pageData) {
    // Existing cultural significance enhancement
    const culturalEntities = ['kevin', 'arwyn', 'reinamora', 'src-20', 'mikeinspace']
    const blockMilestones = ['788041', '796000', '865000']
    
    const content = (pageData.content || '').toLowerCase()
    const hasHighCulturalValue = culturalEntities.some(entity => content.includes(entity))
    const hasBlockMilestone = blockMilestones.some(block => content.includes(block))
    
    if (hasHighCulturalValue || hasBlockMilestone) {
      pageData.searchMeta = {
        culturalSignificance: hasHighCulturalValue ? 'high' : 'medium',
        containsBlockMilestone: hasBlockMilestone
      }
    }

    // Add category information for build-time analysis
    const frontmatter = pageData.frontmatter || {}
    if (frontmatter.translationCategory) {
      pageData.categoryMeta = {
        category: frontmatter.translationCategory,
        contentType: frontmatter.contentType,
        culturalSignificance: frontmatter.culturalSignificance,
        technicalComplexity: frontmatter.technicalComplexity
      }
    }
    
    return pageData
  }
})
```

---

## Validation Results Example

### Sample Validation Report

```typescript
// Running: ContentCategoryValidator.validateFile('docs/en/protocols/src-20.md', content, frontmatter)

const validationResult = {
  isValid: true,
  errors: [],
  warnings: [
    {
      type: 'optimization',
      category: 'hybrid-category',
      file: 'docs/en/protocols/src-20.md',
      message: 'HYBRID category should specify which hybrid components to use',
      recommendation: 'Add hybridComponents section to frontmatter'
    }
  ],
  suggestions: [
    {
      type: 'improvement',
      category: 'cultural-elements', 
      file: 'docs/en/protocols/src-20.md',
      suggestion: 'Content mentions KEVIN but could emphasize cultural significance more',
      impact: 'medium'
    }
  ],
  score: {
    overall: 95,
    categoryCompliance: 90,
    technicalAccuracy: 100,
    culturalPreservation: 95,
    maintainability: 95
  }
}
```

---

## Translation Workflow Example

### Phase 1 Implementation for French

1. **DUPLICATE Category - KEVIN Origin Story**
   ```bash
   # File: docs/fr/narratives/kevin-origin.md
   # Status: Full translation required with cultural adaptation
   ```

2. **Cultural Adaptation Guidelines Applied:**
   - "In Lak'ech Ala K'in" → "Je suis toi et tu es moi" (maintaining philosophical meaning)
   - KEVIN cultural significance preserved as mythical community guide
   - Bitcoin graffiti movement → "mouvement de graffiti Bitcoin" 
   - Fair launch principles → "principes de lancement équitable"

3. **Quality Checks Passed:**
   - ✅ Cultural authenticity preserved
   - ✅ KEVIN philosophy maintained  
   - ✅ Community values translated with nuance
   - ✅ No technical inconsistencies introduced
   - ✅ Regional relevance achieved

---

## Cross-Language Consistency Example

### Consistency Validation Report

```typescript
// Running: ConsistencyValidator.validateConsistency('docs/protocols/src-20.md', languageVersions)

const consistencyResult = {
  isValid: true,
  errors: [],
  warnings: [
    {
      type: 'minor',
      category: 'consistency',
      file: 'docs/protocols/src-20.md',
      message: 'Heading structure differs in zh (Chinese version)',
      recommendation: 'Maintain consistent heading hierarchy across languages'
    }
  ],
  suggestions: [],
  score: {
    overall: 90,
    categoryCompliance: 100,
    technicalAccuracy: 95,
    culturalPreservation: 100,
    maintainability: 85
  }
}
```

**Technical Data Consistency Verified:**
- ✅ Block height 788041 consistent across all versions
- ✅ API endpoints identical in all languages
- ✅ Code examples match exactly
- ✅ Protocol constants uniform

**Cultural Adaptation Success:**
- ✅ KEVIN significance preserved in all languages
- ✅ Community philosophy appropriately adapted
- ✅ Regional context maintained while preserving core values

---

This framework demonstrates how to balance translation efficiency with cultural authenticity while maintaining technical precision across all language versions of the Bitcoin Stamps documentation.