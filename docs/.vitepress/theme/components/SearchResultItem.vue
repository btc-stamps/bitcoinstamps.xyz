<template>
  <div class="search-result-item">
    <a :href="result.url" class="result-link">
      <div class="result-header">
        <h4 class="result-title">{{ result.title }}</h4>
        <div class="result-metadata">
          <!-- Cultural Significance Indicator -->
          <span 
            v-if="result.culturalScore > 0" 
            :class="['cultural-badge', `score-${getCulturalLevel(result.culturalScore)}`]"
            :title="`Cultural Significance Score: ${result.culturalScore}`"
          >
            {{ getCulturalLevel(result.culturalScore) }}
          </span>
          
          <!-- Block Context -->
          <span 
            v-if="result.blockContext" 
            class="block-badge"
            :title="result.blockContext.significance"
          >
            Block {{ result.blockContext.milestone.toLocaleString() }}
          </span>
          
          <!-- Result Group -->
          <span :class="['group-badge', `group-${result.resultGroup}`]">
            {{ formatGroupName(result.resultGroup) }}
          </span>
        </div>
      </div>
      
      <p class="result-content">
        {{ truncateContent(result.content) }}
      </p>
      
      <!-- Entity Matches -->
      <div v-if="result.entityMatches.length > 0" class="entity-matches">
        <span class="entities-label">Related:</span>
        <span 
          v-for="entity in result.entityMatches.slice(0, 3)" 
          :key="entity"
          class="entity-tag"
        >
          {{ entity }}
        </span>
        <span v-if="result.entityMatches.length > 3" class="more-entities">
          +{{ result.entityMatches.length - 3 }} more
        </span>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import type { SearchResult } from '../utils/semanticSearch'

interface Props {
  result: SearchResult
}

const props = defineProps<Props>()

// Get cultural significance level
const getCulturalLevel = (score: number): string => {
  if (score >= 4) return 'high'
  if (score >= 2) return 'medium'
  return 'low'
}

// Format group name for display
const formatGroupName = (group: string): string => {
  const names = {
    'cultural': 'Cultural',
    'historical': 'History',
    'protocol': 'Protocol',
    'technical': 'Technical'
  }
  return names[group as keyof typeof names] || group
}

// Truncate content for preview
const truncateContent = (content: string): string => {
  if (content.length <= 150) return content
  return content.substring(0, 147) + '...'
}
</script>

<style scoped>
.search-result-item {
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  margin-bottom: 1rem;
  overflow: hidden;
  transition: all 0.2s ease;
}

.search-result-item:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-link {
  display: block;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

.result-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.result-metadata {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  flex-shrink: 0;
  margin-left: 1rem;
}

.cultural-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.score-high {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.score-medium {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.score-low {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  color: white;
}

.block-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.group-badge {
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid;
}

.group-cultural {
  background: rgba(245, 158, 11, 0.1);
  border-color: #f59e0b;
  color: #d97706;
}

.group-historical {
  background: rgba(139, 92, 246, 0.1);
  border-color: #8b5cf6;
  color: #7c3aed;
}

.group-protocol {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  color: #059669;
}

.group-technical {
  background: rgba(107, 114, 128, 0.1);
  border-color: #6b7280;
  color: #4b5563;
}

.result-content {
  margin: 0.5rem 0;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  font-size: 0.9rem;
}

.entity-matches {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-border-soft);
}

.entities-label {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.entity-tag {
  padding: 0.15rem 0.4rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border-soft);
}

.more-entities {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}

@media (max-width: 768px) {
  .result-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .result-metadata {
    margin-left: 0;
  }
  
  .entity-matches {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .entity-matches > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
}
</style>