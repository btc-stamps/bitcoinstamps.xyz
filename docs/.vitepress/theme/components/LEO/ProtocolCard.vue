<template>
  <div
    class="protocol-card"
    :class="[`protocol-card--${protocol}`, { 'protocol-card--featured': featured }]"
    itemscope
    :itemtype="schemaType"
  >
    <!-- Protocol Icon/Visual -->
    <div class="protocol-icon">
      <component v-if="iconComponent" :is="iconComponent" />
      <span v-else class="protocol-initial">{{ protocolInitial }}</span>
    </div>

    <!-- Protocol Header -->
    <div class="protocol-header">
      <h3 class="protocol-name" itemprop="name">
        <EntityLink
          :entity-id="protocol"
          entity-type="protocol"
          :display-name="displayName"
          :href="protocolUrl"
        />
      </h3>
      <span class="protocol-type" itemprop="applicationCategory">{{ typeDisplay }}</span>
    </div>

    <!-- Protocol Description -->
    <div class="protocol-description">
      <p itemprop="description">{{ description }}</p>
      
      <!-- Key Features -->
      <ul v-if="features.length" class="protocol-features">
        <li
          v-for="feature in features"
          :key="feature"
          class="protocol-feature"
          itemprop="featureList"
        >
          {{ feature }}
        </li>
      </ul>
    </div>

    <!-- Protocol Metadata -->
    <div class="protocol-metadata">
      <div v-if="blockHeight" class="metadata-item">
        <span class="metadata-label">Introduced:</span>
        <span class="metadata-value" itemprop="version">Block {{ blockHeight.toLocaleString() }}</span>
      </div>
      
      <div v-if="culturalSignificance" class="metadata-item">
        <span class="metadata-label">Cultural Impact:</span>
        <span class="metadata-value significance" :class="`significance--${culturalSignificance}`">
          {{ significanceDisplay }}
        </span>
      </div>
    </div>

    <!-- Protocol Actions -->
    <div class="protocol-actions">
      <a
        :href="`${protocolUrl}#technical-specification`"
        class="action-link action-link--technical"
        itemprop="url"
      >
        <span class="action-icon">📋</span>
        Technical Spec
      </a>
      <a
        :href="`${protocolUrl}#api-reference`"
        class="action-link action-link--api"
      >
        <span class="action-icon">🔌</span>
        API Reference
      </a>
      <a
        :href="`/tutorials/${protocol}-creation`"
        class="action-link action-link--tutorial"
      >
        <span class="action-icon">🎨</span>
        Create Tutorial
      </a>
      <a
        :href="`/gallery/${protocol}`"
        class="action-link action-link--gallery"
      >
        <span class="action-icon">🖼️</span>
        View Gallery
      </a>
    </div>

    <!-- Related Protocols -->
    <div v-if="relatedProtocols.length" class="protocol-relationships">
      <span class="relationships-label">Related:</span>
      <div class="relationships-list">
        <EntityLink
          v-for="related in relatedProtocols"
          :key="related.id"
          :entity-id="related.id"
          entity-type="protocol"
          :display-name="related.name"
          :relationship="related.relationship"
          variant="protocol"
          class="relationship-link"
        />
      </div>
    </div>

    <!-- Structured Data -->
    <StructuredData
      type="protocol"
      :entity-id="protocol"
      :title="displayName"
      :description="description"
      :protocols="[protocol, ...relatedProtocols.map(r => r.id)]"
      :cultural-significance="culturalSignificance"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EntityLink from './EntityLink.vue'
import StructuredData from './StructuredData.vue'

interface RelatedProtocol {
  id: string
  name: string
  relationship: string
}

interface Props {
  /** Protocol identifier */
  protocol: 'src-20' | 'src-101' | 'src-721' | 'olga'
  /** Custom display name */
  displayName?: string
  /** Protocol description */
  description: string
  /** Key features list */
  features?: string[]
  /** Block height when introduced */
  blockHeight?: number
  /** Cultural significance level */
  culturalSignificance?: 'high' | 'medium' | 'low'
  /** Related protocols */
  relatedProtocols?: RelatedProtocol[]
  /** Featured card styling */
  featured?: boolean
  /** Custom icon component */
  iconComponent?: any
}

const props = withDefaults(defineProps<Props>(), {
  features: () => [],
  relatedProtocols: () => [],
  featured: false
})

const displayName = computed(() => {
  if (props.displayName) return props.displayName
  
  const names = {
    'src-20': 'SRC-20 Tokens',
    'src-101': 'SRC-101 Names',
    'src-721': 'SRC-721 NFTs',
    'olga': 'OLGA P2WSH Encoding'
  }
  
  return names[props.protocol] || props.protocol.toUpperCase()
})

const protocolInitial = computed(() => {
  return props.protocol.split('-')[0].toUpperCase().charAt(0)
})

const typeDisplay = computed(() => {
  const types = {
    'src-20': 'Fungible Token Standard',
    'src-101': 'Name Service Protocol',
    'src-721': 'Recursion Standard',
    'olga': 'P2WSH Encoding Algorithm'
  }
  
  return types[props.protocol] || 'Protocol'
})

const significanceDisplay = computed(() => {
  const displays = {
    high: 'High Impact',
    medium: 'Moderate Impact',
    low: 'Emerging'
  }
  
  return displays[props.culturalSignificance || 'medium']
})

const protocolUrl = computed(() => `/protocols/${props.protocol}`)

const schemaType = computed(() => 'https://schema.org/SoftwareApplication')
</script>

<style scoped>
.protocol-card {
  @apply bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700;
  @apply p-6 transition-all duration-300 hover:shadow-xl hover:scale-105;
}

.protocol-card--featured {
  @apply ring-2 ring-orange-500 ring-opacity-50;
}

.protocol-icon {
  @apply w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl mb-4;
}

.protocol-card--src-20 .protocol-icon {
  @apply bg-gradient-to-br from-orange-500 to-orange-600;
}

.protocol-card--src-101 .protocol-icon {
  @apply bg-gradient-to-br from-yellow-500 to-yellow-600;
}

.protocol-card--src-721 .protocol-icon {
  @apply bg-gradient-to-br from-blue-500 to-blue-600;
}

.protocol-card--olga .protocol-icon {
  @apply bg-gradient-to-br from-green-500 to-green-600;
}

.protocol-header {
  @apply mb-4;
}

.protocol-name {
  @apply text-xl font-bold text-gray-900 dark:text-gray-100 mb-1;
}

.protocol-type {
  @apply text-sm text-gray-600 dark:text-gray-400 font-medium;
}

.protocol-description {
  @apply mb-4;
}

.protocol-description p {
  @apply text-gray-700 dark:text-gray-300 mb-3;
}

.protocol-features {
  @apply list-none space-y-1;
}

.protocol-feature {
  @apply text-sm text-gray-600 dark:text-gray-400 flex items-center;
}

.protocol-feature::before {
  content: '✓';
  @apply text-green-500 mr-2 font-bold;
}

.protocol-metadata {
  @apply space-y-2 mb-4 text-sm;
}

.metadata-item {
  @apply flex justify-between items-center;
}

.metadata-label {
  @apply text-gray-600 dark:text-gray-400;
}

.metadata-value {
  @apply font-medium text-gray-900 dark:text-gray-100;
}

.significance--high {
  @apply text-orange-600 dark:text-orange-400;
}

.significance--medium {
  @apply text-blue-600 dark:text-blue-400;
}

.significance--low {
  @apply text-gray-600 dark:text-gray-400;
}

.protocol-actions {
  @apply mb-4;
}

.action-link {
  @apply inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md;
  @apply bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300;
  @apply hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors;
  @apply mr-2 mb-2;
  text-decoration: none;
}

.action-link--technical {
  @apply bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300;
  @apply hover:bg-blue-100 dark:hover:bg-blue-900/30;
}

.action-link--api {
  @apply bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300;
  @apply hover:bg-purple-100 dark:hover:bg-purple-900/30;
}

.action-link--tutorial {
  @apply bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300;
  @apply hover:bg-orange-100 dark:hover:bg-orange-900/30;
}

.action-link--gallery {
  @apply bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300;
  @apply hover:bg-yellow-100 dark:hover:bg-yellow-900/30;
}

.protocol-relationships {
  @apply pt-4 border-t border-gray-200 dark:border-gray-700;
}

.relationships-label {
  @apply text-sm font-medium text-gray-600 dark:text-gray-400 block mb-2;
}

.relationships-list {
  @apply flex flex-wrap gap-2;
}

.relationship-link {
  @apply text-xs;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .protocol-card {
    @apply p-4;
  }
  
  .action-link {
    @apply w-full justify-center mb-2 mr-0;
  }
}
</style>