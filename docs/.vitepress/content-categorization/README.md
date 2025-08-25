# Bitcoin Stamps Content Categorization Framework

## Overview

This framework provides a comprehensive system for categorizing Bitcoin Stamps documentation content to optimize translation efficiency while preserving cultural authenticity and technical accuracy. It addresses the challenge of translating 40+ English files into 3 languages (120 total translations) through strategic categorization.

## Framework Components

### Core Files

```
docs/.vitepress/content-categorization/
├── taxonomy.ts              # Core categorization rules and types
├── file-audit.ts           # Complete audit of all 40+ files  
├── technical-framework.ts  # VitePress integration and components
├── validation-system.ts    # Quality assurance and consistency checking
├── translation-strategy.md # Comprehensive implementation guide
├── sample-implementations.md # Practical examples
└── README.md              # This documentation
```

### Three-Category System

#### 1. **DUPLICATE** (11 files, 27% of content)
- **Purpose**: Content requiring full cultural adaptation
- **Approach**: Complete translation with regional context
- **Examples**: KEVIN origin story, community values, getting started guides
- **Priority**: High cultural impact content

#### 2. **REFERENCE** (3 files, 7% of content)  
- **Purpose**: Pure technical data requiring global consistency
- **Approach**: Single source of truth with automated generation
- **Examples**: API specifications, protocol constants, blockchain data
- **Priority**: Technical accuracy critical

#### 3. **HYBRID** (27 files, 66% of content)
- **Purpose**: Mixed explanations + technical specifications
- **Approach**: Translate explanations, reference technical data
- **Examples**: Protocol documentation, technical tutorials, implementation guides
- **Priority**: Balance efficiency with cultural context

## Quick Start

### 1. Install Framework

```bash
# Framework is integrated into existing VitePress setup
# No additional installation required
```

### 2. Enable Category Validation

```typescript
// docs/.vitepress/config.ts
import { categoryFrameworkPlugin } from './content-categorization/technical-framework.js';

export default defineConfig({
  vite: {
    plugins: [
      categoryFrameworkPlugin(), // Add this line
      // ... existing plugins
    ]
  }
})
```

### 3. Add Category Frontmatter

```yaml
---
title: "Your Content Title"
description: "Content description"

# Content Categorization Framework
translationCategory: "hybrid"  # duplicate | reference | hybrid
contentType: "protocol-explanations"
culturalSignificance: "high"  # high | medium | low
technicalComplexity: "high"   # high | medium | low

translationGuidelines:
  duplicate: ["Cultural adaptation guidelines"]
  reference: ["Technical consistency requirements"]
  shared-data: ["Shared data specifications"]

sharedDataSources:
  technical: ["protocol-specs", "api-endpoints"]
  constants: ["block-heights", "protocol-versions"]

hybridComponents:
  SharedTechnicalData: true
  LocalizedExplanation: true
---
```

### 4. Validate Content

```bash
# Build with validation
npm run docs:build

# Validation runs automatically and reports:
# ✅ Category assignments verified
# ⚠️  Warnings for optimization opportunities  
# ❌ Errors for invalid configurations
```

## Category Decision Matrix

Use this matrix to determine the optimal category for content:

| Content Type | Cultural Significance | Technical Complexity | Recommended Category |
|--------------|---------------------|---------------------|---------------------|
| Community stories | High | Low | **DUPLICATE** |
| KEVIN narratives | High | Low | **DUPLICATE** |  
| Getting started guides | High | Medium | **DUPLICATE** |
| Protocol explanations | Medium | High | **HYBRID** |
| Technical tutorials | Medium | High | **HYBRID** |
| Developer guides | Low | High | **HYBRID** |
| API specifications | Low | High | **REFERENCE** |
| Protocol constants | Low | High | **REFERENCE** |
| Blockchain data | Low | High | **REFERENCE** |

## Implementation Phases

### Phase 1: Critical Foundation (2-3 weeks per language)
**Priority**: Core cultural content and user journeys

**Files**: Homepage, introduction, KEVIN origin, first stamp tutorial
**Success Criteria**: Cultural authenticity preserved, community philosophy maintained

### Phase 2: Protocol Documentation (3-4 weeks per language)
**Priority**: Technical foundation with hybrid approach  

**Files**: SRC-20, SRC-101, SRC-721 protocols, SDK integration
**Success Criteria**: Technical accuracy maintained, explanations culturally adapted

### Phase 3: Community Content (2 weeks per language)
**Priority**: Community building completion

**Files**: Community hub, history, values, contributing guides
**Success Criteria**: Regional community resources integrated

### Phase 4: Advanced Content (2-3 weeks per language)
**Priority**: Specialized and advanced features

**Files**: API integration, artist tools, advanced protocols
**Success Criteria**: Complete framework implementation

## Translation Workflow

### For DUPLICATE Category

1. **Cultural Preparation**: KEVIN philosophy training for translators
2. **Full Translation**: Complete content translation with cultural adaptation
3. **Cultural Review**: Native speaker cultural authenticity check
4. **Community Validation**: Regional community feedback integration

### For REFERENCE Category

1. **Technical Validation**: Ensure shared data consistency
2. **Automated Generation**: Use LEO API system for data generation
3. **Consistency Check**: Validate across all language versions
4. **Technical Review**: Developer accuracy verification

### For HYBRID Category

1. **Content Separation**: Identify explanatory vs. technical sections
2. **Explanation Translation**: Translate explanatory content with cultural context
3. **Technical Reference**: Link to shared technical data sources
4. **Component Integration**: Use hybrid Vue.js components
5. **Consistency Validation**: Ensure technical accuracy maintained

## Quality Assurance

### Automated Validation

The framework includes comprehensive validation:

```typescript
// Build-time validation
export class CategoryValidator {
  validateFile(filePath: string, frontmatter: CategoryEnhancedFrontmatter): boolean {
    // Validates category assignment
    // Checks category-specific requirements  
    // Reports errors and warnings
    // Calculates quality scores
  }
}
```

### Quality Metrics

- **Overall Score**: 0-100 based on validation results
- **Category Compliance**: Correct category assignment and usage
- **Technical Accuracy**: Technical content consistency
- **Cultural Preservation**: Cultural significance maintenance
- **Maintainability**: Long-term sustainability factors

### Manual Review Process

1. **Cultural Review** (DUPLICATE): Native speaker authenticity validation
2. **Technical Review** (REFERENCE/HYBRID): Developer accuracy verification  
3. **Consistency Review**: Cross-language validation
4. **Community Review**: Bitcoin Stamps community feedback integration

## Vue.js Components for HYBRID Content

### SharedTechnicalData Component

```vue
<SharedTechnicalData source="src-20-spec" type="protocol">
  <template #default="{ data }">
    <div class="protocol-specification">
      <!-- Technical data automatically loaded and consistent -->
    </div>
  </template>
</SharedTechnicalData>
```

### LocalizedExplanation Component

```vue
<LocalizedExplanation shared-data="protocol-constants">
  <!-- Culturally adapted explanatory content -->
  <p>{{ $t('protocol.explanation') }}</p>
</LocalizedExplanation>
```

### ReferenceAPI Component

```vue
<ReferenceAPI :endpoint="{
  method: 'GET',
  path: '/api/src20/tokens', 
  description: 'List all SRC-20 tokens',
  source: 'api-endpoints'
}" />
```

## Resource Requirements

### Translation Team Structure
- **Cultural Specialist**: KEVIN philosophy and community values expert
- **Native Translators**: 3 languages × 1 translator each  
- **Technical Reviewers**: 1 per language for hybrid content
- **QA Coordinator**: Overall quality assurance

### Timeline per Language
- **Phase 1 (Critical)**: 2-3 weeks
- **Phase 2 (Protocols)**: 3-4 weeks
- **Phase 3 (Community)**: 2 weeks  
- **Phase 4 (Advanced)**: 2-3 weeks
- **QA and Review**: 1-2 weeks
- **Total**: 10-14 weeks per language

### Parallel Implementation (Recommended)
- **3 languages simultaneously**: 12-16 weeks total
- **Maintenance**: 2-4 hours per week per language post-launch

## Success Metrics

### Quantitative Metrics
- ✅ **100% Translation Coverage** of categorized content
- ✅ **0 Technical Inconsistencies** across languages
- ✅ **100% Build Success** for all language versions
- ✅ **<10% Performance Impact** from framework

### Qualitative Metrics  
- ✅ **Cultural Authenticity**: Native speaker approval
- ✅ **Community Adoption**: Engagement in translated versions
- ✅ **Technical Usability**: Developer success with translated content
- ✅ **KEVIN Philosophy Preservation**: Community value recognition

## Risk Mitigation

### High-Risk Items

**Cultural Translation Risk**:
- **Risk**: Loss of KEVIN cultural significance  
- **Mitigation**: Cultural specialist review, community feedback
- **Contingency**: Community-led cultural adaptation workshops

**Technical Consistency Risk**:
- **Risk**: Technical drift between versions
- **Mitigation**: Shared data system, automated validation
- **Contingency**: Automated consistency repair tools

**Maintenance Burden Risk**:
- **Risk**: Unsustainable maintenance workload
- **Mitigation**: REFERENCE category optimization, automation
- **Contingency**: Scope reduction, increased HYBRID usage

## Troubleshooting

### Common Issues

**Category Validation Errors**:
```bash
❌ Category mismatch for docs/en/protocols/src-20.md: expected hybrid, got duplicate
```
**Solution**: Update frontmatter `translationCategory` to match audit registry

**Missing Translation Guidelines**:
```bash
⚠️ DUPLICATE category file missing translation guidelines  
```
**Solution**: Add `translationGuidelines.duplicate` array to frontmatter

**Technical Consistency Warnings**:
```bash
⚠️ Code block differs in zh (Chinese version)
```
**Solution**: Verify code examples are identical across languages

### Debug Mode

```bash
# Enable category validation debug mode
DEBUG_CATEGORIES=true npm run docs:build
```

## Contributing

### Adding New Content

1. **Determine Category**: Use decision matrix or automated analysis
2. **Add Frontmatter**: Include required categorization metadata  
3. **Validate**: Run build to check category compliance
4. **Update Audit**: Add to `file-audit.ts` if needed

### Improving Framework

1. **Follow Pattern**: Study existing implementations
2. **Test Changes**: Validate with sample content
3. **Update Documentation**: Keep README and strategy docs current
4. **Community Review**: Get Bitcoin Stamps community feedback

## Integration with LEO API

The framework builds on the existing LEO API system for:

- **Shared Technical Data**: Centralized protocol specifications
- **Multi-language Entity Management**: Consistent entity translations
- **Schema.org Integration**: SEO and structured data consistency
- **Build-time Validation**: Quality assurance automation

## Future Enhancements

- **AI-Assisted Categorization**: Automatic category suggestion
- **Translation Memory Integration**: Reuse existing translations  
- **Community Translation Portal**: Crowdsourced translation system
- **Performance Optimization**: Lazy loading for translated content
- **Analytics Integration**: Translation effectiveness tracking

---

## Support

For questions about the content categorization framework:

1. **Documentation Issues**: Check sample implementations and strategy guide
2. **Technical Integration**: Review technical framework and validation system
3. **Translation Questions**: Consult translation strategy documentation  
4. **Community Feedback**: Engage with Bitcoin Stamps community for cultural guidance

**Remember**: The framework's goal is to preserve KEVIN's cultural significance and community values ("In Lak'ech Ala K'in" - we are all connected) while enabling efficient, accurate translation that welcomes global participation in the Bitcoin Stamps movement.