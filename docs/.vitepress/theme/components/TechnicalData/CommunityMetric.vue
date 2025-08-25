<!--
  Community Metric Component
  Displays community metrics with consistent formatting
  Supports multiple metric types and display formats
-->

<template>
  <div class="community-metric" :class="metricClasses">
    <div v-if="metricData" class="metric-content">
      <!-- Header -->
      <div class="metric-header">
        <div class="metric-icon" v-if="showIcon">
          <component :is="iconComponent" class="icon" />
        </div>
        <div class="metric-title-section">
          <h3 v-if="showTitle" class="metric-title">
            {{ getMetricTitle() }}
          </h3>
          <p v-if="showDescription" class="metric-description">
            {{ getMetricDescription() }}
          </p>
        </div>
      </div>

      <!-- Main Metric Display -->
      <div class="metric-body">
        <div class="primary-metric">
          <span class="metric-value">{{ formatPrimaryValue() }}</span>
          <span v-if="showLabel" class="metric-label">{{ getPrimaryLabel() }}</span>
        </div>
        
        <!-- Secondary Metrics -->
        <div v-if="showSecondaryMetrics" class="secondary-metrics">
          <div v-for="secondary in getSecondaryMetrics()" :key="secondary.key" class="secondary-metric">
            <span class="secondary-label">{{ secondary.label }}:</span>
            <span class="secondary-value">{{ secondary.value }}</span>
          </div>
        </div>
        
        <!-- Growth Indicators -->
        <div v-if="showGrowth && hasGrowthData()" class="growth-section">
          <div class="growth-indicator" :class="getGrowthClass()">
            <component :is="growthIcon" class="growth-icon" />
            <span class="growth-text">{{ getGrowthText() }}</span>
          </div>
        </div>
        
        <!-- Top Items (for token/collection metrics) -->
        <div v-if="showTopItems && hasTopItems()" class="top-items">
          <h4 class="top-items-title">{{ t('topItems') }}</h4>
          <div class="top-items-list">
            <div v-for="item in getTopItems()" :key="item.name" class="top-item">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-value">{{ formatTopItemValue(item) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div v-if="showLastUpdated" class="metric-footer">
        <span class="last-updated">
          {{ t('lastUpdated') }}: {{ formatDate(getLastUpdated()) }}
        </span>
      </div>
    </div>
    
    <!-- Loading/Error States -->
    <div v-else-if="loading" class="metric-loading">
      <div class="loading-spinner"></div>
      <span>{{ t('loading') }}</span>
    </div>
    
    <div v-else class="metric-error">
      <span>{{ t('metricNotFound', { metric: metric }) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, h } from 'vue'
import { 
  data as metricsData, 
  getTokenMetrics,
  getKevinMetrics,
  getStampMetrics,
  getSRC20Metrics,
  getNFTMetrics,
  getNamingMetrics,
  getGrowthMetrics,
  formatNumber,
  formatCurrency,
  formatPercentage
} from '../../data/community-metrics.data'
import type { TokenMetrics, TopToken } from '../../types/technical-data'

// Props
interface Props {
  metric: 'kevin' | 'stamps' | 'src20_tokens' | 'src721_nfts' | 'src101_names' | 'growth' | 'economics'
  primaryValue?: string  // Override which value to display as primary
  showTitle?: boolean
  showDescription?: boolean
  showIcon?: boolean
  showLabel?: boolean
  showSecondaryMetrics?: boolean
  showGrowth?: boolean
  showTopItems?: boolean
  showLastUpdated?: boolean
  format?: 'compact' | 'card' | 'detailed'
  locale?: 'en' | 'fr' | 'es' | 'zh'
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  showDescription: false,
  showIcon: true,
  showLabel: true,
  showSecondaryMetrics: true,
  showGrowth: true,
  showTopItems: false,
  showLastUpdated: false,
  format: 'card',
  locale: 'en'
})

// State
const loading = ref(true)
const metricData = ref<any>(null)

// Computed
const metricClasses = computed(() => [
  `metric-${props.format}`,
  `metric-${props.metric}`,
  loading.value ? 'metric-loading' : ''
])

// Internationalization
const translations = {
  en: {
    loading: 'Loading metrics...',
    lastUpdated: 'Last updated',
    metricNotFound: 'Metric "{metric}" not found',
    topItems: 'Top Items',
    kevin: {
      title: 'KEVIN Token Holders',
      description: 'First SRC-20 token on Bitcoin Stamps'
    },
    stamps: {
      title: 'Bitcoin Stamps',
      description: 'Digital art permanently stored on Bitcoin'
    },
    src20_tokens: {
      title: 'SRC-20 Tokens',
      description: 'Fungible tokens on Bitcoin Stamps'
    },
    src721_nfts: {
      title: 'SRC-721 NFTs',
      description: 'Non-fungible tokens and collections'
    },
    src101_names: {
      title: 'SRC-101 Names',
      description: 'Decentralized naming system'
    },
    growth: {
      title: 'Community Growth',
      description: 'User activity and engagement metrics'
    },
    economics: {
      title: 'Economic Metrics',
      description: 'Value locked and transaction volumes'
    },
    labels: {
      holders: 'Holders',
      stamps: 'Stamps',
      tokens: 'Tokens',
      collections: 'Collections',
      names: 'Names',
      volume: 'Volume',
      marketCap: 'Market Cap'
    }
  },
  fr: {
    loading: 'Chargement des métriques...',
    lastUpdated: 'Dernière mise à jour',
    metricNotFound: 'Métrique "{metric}" introuvable',
    topItems: 'Éléments Principaux',
    kevin: {
      title: 'Détenteurs de Jetons KEVIN',
      description: 'Premier jeton SRC-20 sur Bitcoin Stamps'
    },
    stamps: {
      title: 'Bitcoin Stamps',
      description: 'Art numérique stocké en permanence sur Bitcoin'
    },
    src20_tokens: {
      title: 'Jetons SRC-20',
      description: 'Jetons fongibles sur Bitcoin Stamps'
    },
    src721_nfts: {
      title: 'NFTs SRC-721',
      description: 'Jetons non fongibles et collections'
    },
    src101_names: {
      title: 'Noms SRC-101',
      description: 'Système de nommage décentralisé'
    }
  },
  es: {
    loading: 'Cargando métricas...',
    lastUpdated: 'Última actualización',
    metricNotFound: 'Métrica "{metric}" no encontrada',
    topItems: 'Elementos Principales',
    kevin: {
      title: 'Poseedores de Token KEVIN',
      description: 'Primer token SRC-20 en Bitcoin Stamps'
    }
  },
  zh: {
    loading: '正在加载指标...',
    lastUpdated: '最后更新',
    metricNotFound: '未找到指标 "{metric}"',
    topItems: '热门项目',
    kevin: {
      title: 'KEVIN 代币持有者',
      description: 'Bitcoin Stamps 上的第一个 SRC-20 代币'
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
const getMetricTitle = (): string => {
  return t(`${props.metric}.title`)
}

const getMetricDescription = (): string => {
  return t(`${props.metric}.description`)
}

const formatPrimaryValue = (): string => {
  if (!metricData.value) return '0'
  
  switch (props.metric) {
    case 'kevin':
      return formatNumber(metricData.value.totalHolders || 0)
    case 'stamps':
      return formatNumber(metricData.value.totalStamps || 0)
    case 'src20_tokens':
      return formatNumber(metricData.value.totalTokens || 0)
    case 'src721_nfts':
      return formatNumber(metricData.value.totalNFTs || 0)
    case 'src101_names':
      return formatNumber(metricData.value.totalNames || 0)
    default:
      return '0'
  }
}

const getPrimaryLabel = (): string => {
  switch (props.metric) {
    case 'kevin':
      return t('labels.holders')
    case 'stamps':
      return t('labels.stamps')
    case 'src20_tokens':
      return t('labels.tokens')
    case 'src721_nfts':
      return 'NFTs'
    case 'src101_names':
      return t('labels.names')
    default:
      return ''
  }
}

const getSecondaryMetrics = () => {
  if (!metricData.value) return []
  
  switch (props.metric) {
    case 'kevin':
      return [
        { key: 'active', label: 'Active', value: formatNumber(metricData.value.activeHolders || 0) },
        { key: 'average', label: 'Average Holding', value: formatNumber(metricData.value.averageHolding || 0) }
      ]
    case 'stamps':
      return [
        { key: 'creators', label: 'Creators', value: formatNumber(metricData.value.uniqueCreators || 0) },
        { key: 'holders', label: 'Holders', value: formatNumber(metricData.value.totalHolders || 0) }
      ]
    case 'src20_tokens':
      return [
        { key: 'active', label: 'Active', value: formatNumber(metricData.value.activeTokens || 0) },
        { key: 'marketCap', label: 'Market Cap', value: metricData.value.totalMarketCap || '0 BTC' }
      ]
    default:
      return []
  }
}

const hasGrowthData = (): boolean => {
  return !!(metricData.value?.growthRate30Day || metricData.value?.growthRate90Day)
}

const getGrowthText = (): string => {
  const growth30 = metricData.value?.growthRate30Day
  if (growth30) {
    return `${growth30} (30d)`
  }
  return '+0%'
}

const getGrowthClass = (): string => {
  const growth = getGrowthText()
  if (growth.startsWith('+')) return 'growth-positive'
  if (growth.startsWith('-')) return 'growth-negative'
  return 'growth-neutral'
}

const hasTopItems = (): boolean => {
  return !!(metricData.value?.topTokens && metricData.value.topTokens.length > 0)
}

const getTopItems = () => {
  return metricData.value?.topTokens?.slice(0, 3) || []
}

const formatTopItemValue = (item: TopToken): string => {
  return `${formatNumber(item.holders)} holders`
}

const getLastUpdated = (): string => {
  return metricData.value?.lastUpdated || new Date().toISOString()
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(props.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

// Icons
const iconComponent = computed(() => {
  const icons = {
    kevin: () => h('div', { class: 'w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold' }, 'K'),
    stamps: () => h('div', { class: 'w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs' }, '🎨'),
    src20_tokens: () => h('div', { class: 'w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs' }, '₿'),
    src721_nfts: () => h('div', { class: 'w-6 h-6 bg-purple-500 rounded flex items-center justify-center text-white text-xs' }, '🖼'),
    src101_names: () => h('div', { class: 'w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs' }, '📛'),
    growth: () => h('div', { class: 'w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-white text-xs' }, '📈'),
    economics: () => h('div', { class: 'w-6 h-6 bg-yellow-500 rounded flex items-center justify-center text-white text-xs' }, '💰')
  }
  return icons[props.metric] || icons.stamps
})

const growthIcon = computed(() => {
  const growth = getGrowthText()
  if (growth.startsWith('+')) {
    return () => h('svg', { class: 'w-4 h-4', fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', { d: 'M3 17v-5h2v5H3zm4-8v8h2V9H7zM11 4v13h2V4h-2zm4 4v9h2V8h-2z' })
    ])
  }
  return () => h('div', { class: 'w-4 h-4 rounded-full bg-gray-400' })
})

// Lifecycle
onMounted(async () => {
  try {
    switch (props.metric) {
      case 'kevin':
        metricData.value = getKevinMetrics()
        break
      case 'stamps':
        metricData.value = getStampMetrics()
        break
      case 'src20_tokens':
        metricData.value = getSRC20Metrics()
        break
      case 'src721_nfts':
        metricData.value = getNFTMetrics()
        break
      case 'src101_names':
        metricData.value = getNamingMetrics()
        break
      case 'growth':
        metricData.value = getGrowthMetrics()
        break
      default:
        metricData.value = null
    }
  } catch (error) {
    console.error('Failed to load metric:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.community-metric {
  @apply border rounded-lg bg-white dark:bg-gray-800 shadow-sm;
}

.metric-compact {
  @apply p-3;
}

.metric-card {
  @apply p-4;
}

.metric-detailed {
  @apply p-6;
}

.metric-header {
  @apply flex items-start gap-3 mb-4;
}

.metric-icon .icon {
  @apply w-6 h-6;
}

.metric-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.metric-description {
  @apply text-sm text-gray-600 dark:text-gray-400 mt-1;
}

.metric-body {
  @apply space-y-4;
}

.primary-metric {
  @apply text-center;
}

.metric-value {
  @apply text-3xl font-bold text-gray-900 dark:text-white block;
}

.metric-label {
  @apply text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wider;
}

.secondary-metrics {
  @apply grid grid-cols-2 gap-4;
}

.secondary-metric {
  @apply text-center p-2 bg-gray-50 dark:bg-gray-700 rounded;
}

.secondary-label {
  @apply text-xs text-gray-600 dark:text-gray-400 block;
}

.secondary-value {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.growth-section {
  @apply flex justify-center;
}

.growth-indicator {
  @apply flex items-center gap-2 px-3 py-1 rounded-full text-sm;
}

.growth-positive {
  @apply bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200;
}

.growth-negative {
  @apply bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200;
}

.growth-neutral {
  @apply bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200;
}

.growth-icon {
  @apply w-4 h-4;
}

.top-items {
  @apply space-y-2;
}

.top-items-title {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300;
}

.top-items-list {
  @apply space-y-1;
}

.top-item {
  @apply flex justify-between items-center text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded;
}

.item-name {
  @apply font-medium;
}

.item-value {
  @apply text-gray-600 dark:text-gray-400;
}

.metric-footer {
  @apply mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 text-center;
}

.last-updated {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.metric-loading,
.metric-error {
  @apply flex items-center justify-center gap-2 p-8 text-gray-500 dark:text-gray-400;
}

.loading-spinner {
  @apply w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin;
}

/* Compact format overrides */
.metric-compact .metric-title {
  @apply text-base;
}

.metric-compact .metric-value {
  @apply text-2xl;
}

.metric-compact .secondary-metrics {
  @apply grid-cols-1 gap-2;
}
</style>