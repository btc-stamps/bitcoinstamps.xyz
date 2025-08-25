<!--
  Protocol Milestone Component
  Displays protocol milestone information with consistent formatting
  Supports multilingual labels while maintaining technical accuracy
-->

<template>
  <div class="protocol-milestone" :class="milestoneClasses">
    <div v-if="milestone" class="milestone-content">
      <!-- Header -->
      <div class="milestone-header">
        <h3 v-if="showTitle" class="milestone-title">
          {{ milestone.title }}
        </h3>
        <div class="milestone-meta">
          <span class="block-height">
            {{ t('block') }} {{ formatNumber(milestone.blockHeight) }}
          </span>
          <span class="block-date">
            {{ formatDate(milestone.blockDate) }}
          </span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="milestone-body">
        <p v-if="showDescription && milestone.description" class="description">
          {{ milestone.description }}
        </p>
        
        <!-- Technical Details -->
        <div v-if="showDetails" class="milestone-details">
          <div v-if="milestone.creator" class="detail-item">
            <span class="detail-label">{{ t('creator') }}:</span>
            <span class="detail-value">{{ milestone.creator }}</span>
          </div>
          
          <div v-if="milestone.deployerAddress" class="detail-item">
            <span class="detail-label">{{ t('deployer') }}:</span>
            <span class="detail-value">{{ milestone.deployerAddress }}</span>
          </div>
          
          <div v-if="milestone.protocolVersion" class="detail-item">
            <span class="detail-label">{{ t('protocolVersion') }}:</span>
            <span class="detail-value">{{ milestone.protocolVersion }}</span>
          </div>
          
          <div v-if="milestone.tokenTicker" class="detail-item">
            <span class="detail-label">{{ t('token') }}:</span>
            <span class="detail-value">{{ milestone.tokenTicker }}</span>
          </div>
          
          <div v-if="milestone.tokenSupply" class="detail-item">
            <span class="detail-label">{{ t('supply') }}:</span>
            <span class="detail-value">{{ formatNumber(milestone.tokenSupply) }}</span>
          </div>
          
          <div v-if="milestone.stampNumber !== undefined" class="detail-item">
            <span class="detail-label">{{ t('stampNumber') }}:</span>
            <span class="detail-value">#{{ milestone.stampNumber }}</span>
          </div>
        </div>
        
        <!-- Enhancements List -->
        <div v-if="milestone.enhancements && milestone.enhancements.length > 0" class="enhancements">
          <h4 class="enhancements-title">{{ t('enhancements') }}</h4>
          <ul class="enhancements-list">
            <li v-for="enhancement in milestone.enhancements" :key="enhancement">
              {{ enhancement }}
            </li>
          </ul>
        </div>
        
        <!-- Cultural Significance Badge -->
        <div v-if="showSignificance" class="significance-badge" :class="`significance-${milestone.culturalSignificance}`">
          {{ t(`significance.${milestone.culturalSignificance}`) }}
        </div>
      </div>
      
      <!-- Transaction Link -->
      <div v-if="milestone.transactionId && showTxLink" class="milestone-footer">
        <a 
          :href="getTxURL(milestone.transactionId)" 
          target="_blank" 
          rel="noopener noreferrer"
          class="tx-link"
        >
          {{ t('viewTransaction') }}
          <ExternalLinkIcon class="external-icon" />
        </a>
      </div>
    </div>
    
    <!-- Loading/Error States -->
    <div v-else-if="loading" class="milestone-loading">
      <div class="loading-spinner"></div>
      <span>{{ t('loading') }}</span>
    </div>
    
    <div v-else class="milestone-error">
      <span>{{ t('milestoneNotFound', { milestone: milestoneProp }) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { data as protocolData, getMilestone } from '../../data/protocol-milestones.data'
import { data as externalData, getPrimaryExplorer } from '../../data/external-links.data'
import type { ProtocolMilestone } from '../../types/technical-data'

// Props
interface Props {
  milestone?: string  // milestone key
  blockHeight?: number  // alternative lookup by block height
  showTitle?: boolean
  showDescription?: boolean
  showDetails?: boolean
  showSignificance?: boolean
  showTxLink?: boolean
  format?: 'compact' | 'detailed' | 'card'
  locale?: 'en' | 'fr' | 'es' | 'zh'
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  showDescription: true,
  showDetails: false,
  showSignificance: false,
  showTxLink: false,
  format: 'detailed',
  locale: 'en'
})

// State
const loading = ref(true)
const milestone = ref<ProtocolMilestone | null>(null)

// Computed
const milestoneProp = computed(() => props.milestone)

const milestoneClasses = computed(() => [
  `milestone-${props.format}`,
  milestone.value ? `significance-${milestone.value.culturalSignificance}` : '',
  loading.value ? 'milestone-loading' : ''
])

// Internationalization
const translations = {
  en: {
    block: 'Block',
    creator: 'Creator',
    deployer: 'Deployer',
    protocolVersion: 'Protocol Version',
    token: 'Token',
    supply: 'Supply',
    stampNumber: 'Stamp Number',
    enhancements: 'Enhancements',
    viewTransaction: 'View Transaction',
    loading: 'Loading milestone data...',
    milestoneNotFound: 'Milestone "{milestone}" not found',
    significance: {
      highest: 'Highest Significance',
      high: 'High Significance', 
      medium: 'Medium Significance',
      low: 'Low Significance'
    }
  },
  fr: {
    block: 'Bloc',
    creator: 'Créateur',
    deployer: 'Déployeur',
    protocolVersion: 'Version du Protocole',
    token: 'Jeton',
    supply: 'Approvisionnement',
    stampNumber: 'Numéro de Stamp',
    enhancements: 'Améliorations',
    viewTransaction: 'Voir la Transaction',
    loading: 'Chargement des données...',
    milestoneNotFound: 'Étape "{milestone}" introuvable',
    significance: {
      highest: 'Importance Maximale',
      high: 'Haute Importance',
      medium: 'Importance Moyenne',
      low: 'Faible Importance'
    }
  },
  es: {
    block: 'Bloque',
    creator: 'Creador',
    deployer: 'Desplegador',
    protocolVersion: 'Versión del Protocolo',
    token: 'Token',
    supply: 'Suministro',
    stampNumber: 'Número de Stamp',
    enhancements: 'Mejoras',
    viewTransaction: 'Ver Transacción',
    loading: 'Cargando datos...',
    milestoneNotFound: 'Hito "{milestone}" no encontrado',
    significance: {
      highest: 'Máxima Importancia',
      high: 'Alta Importancia',
      medium: 'Importancia Media',
      low: 'Baja Importancia'
    }
  },
  zh: {
    block: '区块',
    creator: '创建者',
    deployer: '部署者',
    protocolVersion: '协议版本',
    token: '代币',
    supply: '供应量',
    stampNumber: 'Stamp编号',
    enhancements: '增强功能',
    viewTransaction: '查看交易',
    loading: '正在加载...',
    milestoneNotFound: '未找到里程碑 "{milestone}"',
    significance: {
      highest: '最高重要性',
      high: '高重要性',
      medium: '中等重要性',
      low: '低重要性'
    }
  }
}

const t = (key: string, params?: Record<string, any>) => {
  const keys = key.split('.')
  let value = translations[props.locale]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  if (typeof value === 'string' && params) {
    return Object.entries(params).reduce((str, [param, val]) => 
      str.replace(`{${param}}`, String(val)), value
    )
  }
  
  return value || key
}

// Methods
const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toLocaleString()
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(props.locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const getTxURL = (txId: string): string => {
  const explorer = getPrimaryExplorer()
  return explorer ? `${explorer.url}/tx/${txId}` : `https://blockstream.info/tx/${txId}`
}

// Lifecycle
onMounted(async () => {
  try {
    if (props.milestone) {
      milestone.value = getMilestone(props.milestone)
    } else if (props.blockHeight) {
      // Find milestone by block height
      const milestones = protocolData?.milestones || {}
      milestone.value = Object.values(milestones).find(m => m.blockHeight === props.blockHeight) || null
    }
  } catch (error) {
    console.error('Failed to load milestone:', error)
  } finally {
    loading.value = false
  }
})

// External link icon component
const ExternalLinkIcon = () => h('svg', {
  class: 'w-4 h-4',
  fill: 'none',
  stroke: 'currentColor',
  viewBox: '0 0 24 24'
}, [
  h('path', {
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'stroke-width': 2,
    d: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
  })
])
</script>

<style scoped>
.protocol-milestone {
  @apply border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm;
}

.milestone-compact {
  @apply p-2;
}

.milestone-card {
  @apply p-6 shadow-md;
}

.milestone-header {
  @apply mb-4;
}

.milestone-title {
  @apply text-xl font-bold text-gray-900 dark:text-white mb-2;
}

.milestone-meta {
  @apply flex flex-wrap gap-3 text-sm;
}

.block-height {
  @apply px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded font-mono;
}

.block-date {
  @apply px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded;
}

.milestone-body {
  @apply space-y-4;
}

.description {
  @apply text-gray-700 dark:text-gray-300 leading-relaxed;
}

.milestone-details {
  @apply space-y-2;
}

.detail-item {
  @apply flex flex-wrap gap-2 text-sm;
}

.detail-label {
  @apply font-medium text-gray-600 dark:text-gray-400;
}

.detail-value {
  @apply font-mono text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded;
}

.enhancements {
  @apply mt-4;
}

.enhancements-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-2;
}

.enhancements-list {
  @apply list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300;
}

.significance-badge {
  @apply inline-block px-3 py-1 rounded-full text-xs font-medium;
}

.significance-highest {
  @apply bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200;
}

.significance-high {
  @apply bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200;
}

.significance-medium {
  @apply bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200;
}

.significance-low {
  @apply bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200;
}

.milestone-footer {
  @apply mt-4 pt-4 border-t border-gray-200 dark:border-gray-600;
}

.tx-link {
  @apply inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline;
}

.external-icon {
  @apply w-4 h-4;
}

.milestone-loading,
.milestone-error {
  @apply flex items-center justify-center gap-2 p-8 text-gray-500 dark:text-gray-400;
}

.loading-spinner {
  @apply w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin;
}

/* Compact format overrides */
.milestone-compact .milestone-title {
  @apply text-lg mb-1;
}

.milestone-compact .milestone-meta {
  @apply text-xs;
}

.milestone-compact .description {
  @apply text-sm;
}
</style>