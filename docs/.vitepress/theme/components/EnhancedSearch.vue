<template>
  <div class="enhanced-search">
    <!-- Cultural Entity Quick Access -->
    <div v-if="showQuickAccess" class="cultural-entities">
      <h3>Popular Topics</h3>
      <div class="entity-buttons">
        <button 
          v-for="entity in culturalEntities" 
          :key="entity.id"
          @click="searchFor(entity.name)"
          :class="['entity-btn', `significance-${entity.culturalSignificance}`]"
        >
          {{ entity.name }}
          <span v-if="entity.blockIntroduced" class="block-info">
            Block {{ entity.blockIntroduced.toLocaleString() }}
          </span>
        </button>
      </div>
    </div>

    <!-- Search Results Enhancement -->
    <div v-if="searchResults.length > 0" class="grouped-results">
      <!-- Cultural Results (Highest Priority) -->
      <div v-if="groupedResults.cultural.length > 0" class="result-group cultural-group">
        <h3>
          <span class="group-icon">🎭</span>
          Cultural & Community
        </h3>
        <SearchResultItem 
          v-for="result in groupedResults.cultural" 
          :key="result.url"
          :result="result"
        />
      </div>

      <!-- Historical Results -->
      <div v-if="groupedResults.historical.length > 0" class="result-group historical-group">
        <h3>
          <span class="group-icon">📚</span>
          History & Milestones
        </h3>
        <SearchResultItem 
          v-for="result in groupedResults.historical" 
          :key="result.url"
          :result="result"
        />
      </div>

      <!-- Protocol Results -->
      <div v-if="groupedResults.protocol.length > 0" class="result-group protocol-group">
        <h3>
          <span class="group-icon">⚙️</span>
          Protocols & Standards
        </h3>
        <SearchResultItem 
          v-for="result in groupedResults.protocol" 
          :key="result.url"
          :result="result"
        />
      </div>

      <!-- Technical Results -->
      <div v-if="groupedResults.technical.length > 0" class="result-group technical-group">
        <h3>
          <span class="group-icon">🔧</span>
          Technical Documentation
        </h3>
        <SearchResultItem 
          v-for="result in groupedResults.technical" 
          :key="result.url"
          :result="result"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { bitcoinStampsSearch, type SearchResult } from '../utils/semanticSearch'
import SearchResultItem from './SearchResultItem.vue'

const showQuickAccess = ref(true)
const searchResults = ref<SearchResult[]>([])

// Cultural entities for quick access
const culturalEntities = [
  {
    id: 'kevin',
    name: 'Kevin',
    culturalSignificance: 'high',
    blockIntroduced: 788041
  },
  {
    id: 'arwyn',
    name: 'Arwyn',
    culturalSignificance: 'high',
    blockIntroduced: null
  },
  {
    id: 'src-20',
    name: 'SRC-20',
    culturalSignificance: 'high',
    blockIntroduced: 796000
  },
  {
    id: 'src-721',
    name: 'SRC-721',
    culturalSignificance: 'high',
    blockIntroduced: null
  },
  {
    id: 'olga',
    name: 'OLGA',
    culturalSignificance: 'medium',
    blockIntroduced: null
  },
  {
    id: 'mikeinspace',
    name: 'Mikeinspace',
    culturalSignificance: 'high',
    blockIntroduced: null
  }
]

// Compute grouped results
const groupedResults = computed(() => {
  return bitcoinStampsSearch.sortResultsByCulturalRelevance(searchResults.value)
})

// Search function
const searchFor = (term: string) => {
  // This would integrate with VitePress search
  // For now, simulate search results
  console.log(`Searching for: ${term}`)
  
  // In a real implementation, this would trigger VitePress local search
  // and enhance the results using our semantic search
  const mockResults = generateMockResults(term)
  searchResults.value = mockResults.map(result => 
    bitcoinStampsSearch.enhanceSearchResult(result)
  )
}

// Mock result generation for demonstration
const generateMockResults = (term: string) => {
  const mockData = [
    {
      title: 'Kevin: The Beloved Mascot of Bitcoin Stamps',
      content: 'Kevin originated as the first SRC-20 token at block 788041 and became the cultural icon of Bitcoin Stamps community.',
      url: '/narratives/kevin-origin'
    },
    {
      title: 'SRC-20 Protocol Overview',
      content: 'SRC-20 tokens are fungible tokens on Bitcoin with enhanced features introduced at block 796,000.',
      url: '/protocols/src-20'
    },
    {
      title: 'Arwyn: Artist and Creator',
      content: 'Arwyn is a prominent artist in the Bitcoin Stamps ecosystem, creating memorable digital art.',
      url: '/narratives/kevin-origin'
    }
  ]
  
  return mockData.filter(item => 
    item.title.toLowerCase().includes(term.toLowerCase()) ||
    item.content.toLowerCase().includes(term.toLowerCase())
  )
}

onMounted(() => {
  // Initialize search integration
  console.log('Enhanced Search component mounted')
})
</script>

<style scoped>
.enhanced-search {
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.cultural-entities {
  margin-bottom: 2rem;
}

.cultural-entities h3 {
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  font-size: 1.2rem;
}

.entity-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.entity-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 2px solid;
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.entity-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.significance-high {
  border-color: #f59e0b;
  background: linear-gradient(135deg, #fef3c7, #fed7aa);
}

.significance-high:hover {
  background: linear-gradient(135deg, #fed7aa, #fbbf24);
}

.significance-medium {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
}

.significance-medium:hover {
  background: linear-gradient(135deg, #bfdbfe, #60a5fa);
}

.block-info {
  font-size: 0.75rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}

.grouped-results {
  margin-top: 2rem;
}

.result-group {
  margin-bottom: 2rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.result-group h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
  font-size: 1.1rem;
  font-weight: 600;
}

.cultural-group {
  border-left: 4px solid #f59e0b;
}

.historical-group {
  border-left: 4px solid #8b5cf6;
}

.protocol-group {
  border-left: 4px solid #10b981;
}

.technical-group {
  border-left: 4px solid #6b7280;
}

.group-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .entity-buttons {
    justify-content: center;
  }
  
  .entity-btn {
    min-width: 120px;
  }
}
</style>