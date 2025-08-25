<!--
  Technical Specification Component
  Displays protocol specifications and technical constants
  Supports different protocols and display formats
-->

<template>
  <div class="technical-spec" :class="specClasses">
    <div v-if="specData" class="spec-content">
      <!-- Header -->
      <div class="spec-header">
        <div class="spec-icon" v-if="showIcon">
          <component :is="iconComponent" class="icon" />
        </div>
        <div class="spec-title-section">
          <h3 v-if="showTitle" class="spec-title">
            {{ getSpecTitle() }}
          </h3>
          <div class="spec-meta">
            <span class="spec-version">v{{ specData.version }}</span>
            <span class="spec-status" :class="`status-${specData.status}`">
              {{ specData.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Launch Information -->
      <div v-if="showLaunchInfo" class="launch-info">
        <div class="launch-item">
          <span class="launch-label">{{ t('launchBlock') }}:</span>
          <span class="launch-value">{{ formatNumber(specData.launchBlock) }}</span>
        </div>
        <div v-if="specData.enhancementBlock" class="launch-item">
          <span class="launch-label">{{ t('enhancementBlock') }}:</span>
          <span class="launch-value">{{ formatNumber(specData.enhancementBlock) }}</span>
        </div>
      </div>

      <!-- Features List -->
      <div v-if="showFeatures && specData.features?.length > 0" class="features-section">
        <h4 class="features-title">{{ t('features') }}</h4>
        <div class="features-list">
          <span v-for="feature in specData.features" :key="feature" class="feature-tag">
            {{ formatFeature(feature) }}
          </span>
        </div>
      </div>

      <!-- Technical Details -->
      <div v-if="showTechnicalDetails" class="technical-details">
        <h4 class="details-title">{{ t('technicalDetails') }}</h4>
        <div class="details-grid">
          <div v-for="detail in getTechnicalDetails()" :key="detail.key" class="detail-item">
            <span class="detail-label">{{ detail.label }}:</span>
            <span class="detail-value">{{ detail.value }}</span>
          </div>
        </div>
      </div>

      <!-- Compatibility Information -->
      <div v-if="showCompatibility" class="compatibility-section">
        <h4 class="compatibility-title">{{ t('compatibility') }}</h4>
        <div class="compatibility-info">
          <span class="compatibility-item">
            <span class="compatibility-label">{{ t('bitcoinCore') }}:</span>
            <span class="compatibility-value">{{ specData.compatibilityLevel }}</span>
          </span>
        </div>
      </div>

      <!-- Network Constants (if applicable) -->
      <div v-if="showNetworkConstants && isNetworkSpec" class="network-constants">
        <h4 class="constants-title">{{ t('networkConstants') }}</h4>
        <div class="constants-grid">
          <div v-for="constant in getNetworkConstants()" :key="constant.key" class="constant-item">
            <span class="constant-label">{{ constant.label }}:</span>
            <span class="constant-value">{{ constant.value }}</span>
          </div>
        </div>
      </div>

      <!-- Performance Metrics (if available) -->
      <div v-if="showPerformance && hasPerformanceData()" class="performance-section">
        <h4 class="performance-title">{{ t('performance') }}</h4>
        <div class="performance-metrics">
          <div v-for="metric in getPerformanceMetrics()" :key="metric.key" class="performance-item">
            <span class="metric-label">{{ metric.label }}:</span>
            <span class="metric-value">{{ metric.value }}</span>
          </div>
        </div>
      </div>

      <!-- Code Example -->
      <div v-if="showCodeExample" class="code-example">
        <h4 class="code-title">{{ t('example') }}</h4>
        <pre class="code-block"><code>{{ getCodeExample() }}</code></pre>
      </div>
    </div>

    <!-- Loading/Error States -->
    <div v-else-if="loading" class="spec-loading">
      <div class="loading-spinner"></div>
      <span>{{ t('loading') }}</span>
    </div>

    <div v-else class="spec-error">
      <span>{{ t('specNotFound', { spec: spec }) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, h } from 'vue'
import { 
  data as specsData,
  getProtocolSpec,
  getSRC20Spec,
  getSRC721Spec,
  getSRC101Spec,
  getOLGASpec,
  getBitcoinConstants,
  getStampsConstants,
  getPerformanceBenchmarks,
  formatGasPrice,
  formatByteSize
} from '../../data/technical-specs.data'
import { formatNumber } from '../../data/community-metrics.data'
import type { ProtocolSpec, SRC20Spec, SRC721Spec, SRC101Spec, OLGASpec } from '../../types/technical-data'

// Props
interface Props {
  spec: 'src20' | 'src721' | 'src101' | 'olga' | 'bitcoin' | 'stamps'
  showTitle?: boolean
  showIcon?: boolean
  showLaunchInfo?: boolean
  showFeatures?: boolean
  showTechnicalDetails?: boolean
  showCompatibility?: boolean
  showNetworkConstants?: boolean
  showPerformance?: boolean
  showCodeExample?: boolean
  format?: 'compact' | 'card' | 'detailed'
  locale?: 'en' | 'fr' | 'es' | 'zh'
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  showIcon: true,
  showLaunchInfo: true,
  showFeatures: true,
  showTechnicalDetails: true,
  showCompatibility: false,
  showNetworkConstants: false,
  showPerformance: false,
  showCodeExample: false,
  format: 'card',
  locale: 'en'
})

// State
const loading = ref(true)
const specData = ref<any>(null)

// Computed
const specClasses = computed(() => [
  `spec-${props.format}`,
  `spec-${props.spec}`,
  loading.value ? 'spec-loading' : ''
])

const isNetworkSpec = computed(() => 
  ['bitcoin', 'stamps'].includes(props.spec)
)

// Internationalization
const translations = {
  en: {
    loading: 'Loading specification...',
    specNotFound: 'Specification "{spec}" not found',
    launchBlock: 'Launch Block',
    enhancementBlock: 'Enhancement Block',
    features: 'Features',
    technicalDetails: 'Technical Details',
    compatibility: 'Compatibility',
    bitcoinCore: 'Bitcoin Core',
    networkConstants: 'Network Constants',
    performance: 'Performance',
    example: 'Usage Example',
    protocols: {
      src20: 'SRC-20 Fungible Tokens',
      src721: 'SRC-721 NFTs',
      src101: 'SRC-101 Names',
      olga: 'OLGA P2WSH Encoding',
      bitcoin: 'Bitcoin Network',
      stamps: 'Stamps Network'
    }
  },
  fr: {
    loading: 'Chargement de la spécification...',
    specNotFound: 'Spécification "{spec}" introuvable',
    launchBlock: 'Bloc de Lancement',
    enhancementBlock: 'Bloc d\'Amélioration',
    features: 'Fonctionnalités',
    technicalDetails: 'Détails Techniques',
    compatibility: 'Compatibilité',
    protocols: {
      src20: 'Jetons Fongibles SRC-20',
      src721: 'NFTs SRC-721',
      src101: 'Noms SRC-101',
      olga: 'Codage OLGA P2WSH'
    }
  },
  es: {
    loading: 'Cargando especificación...',
    specNotFound: 'Especificación "{spec}" no encontrada',
    protocols: {
      src20: 'Tokens Fungibles SRC-20',
      src721: 'NFTs SRC-721',
      src101: 'Nombres SRC-101',
      olga: 'Compresión OLGA'
    }
  },
  zh: {
    loading: '正在加载规范...',
    specNotFound: '未找到规范 "{spec}"',
    protocols: {
      src20: 'SRC-20 同质化代币',
      src721: 'SRC-721 NFT',
      src101: 'SRC-101 名称',
      olga: 'OLGA 压缩'
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
const getSpecTitle = (): string => {
  return t(`protocols.${props.spec}`)
}

const formatFeature = (feature: string): string => {
  return feature.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const getTechnicalDetails = () => {
  if (!specData.value) return []
  
  const details = []
  
  switch (props.spec) {
    case 'src20':
      const src20 = specData.value as SRC20Spec
      if (src20.maxSupply) details.push({ key: 'maxSupply', label: 'Max Supply', value: src20.maxSupply })
      if (src20.decimalsSupported) details.push({ key: 'decimals', label: 'Decimals', value: src20.decimalsSupported })
      if (src20.minTransferAmount) details.push({ key: 'minTransfer', label: 'Min Transfer', value: src20.minTransferAmount })
      break
      
    case 'src721':
      const src721 = specData.value as SRC721Spec
      if (src721.maxTokenId) details.push({ key: 'maxTokenId', label: 'Max Token ID', value: src721.maxTokenId })
      if (src721.maxMetadataSize) details.push({ key: 'maxMetadata', label: 'Max Metadata', value: src721.maxMetadataSize })
      if (src721.imageSupport) details.push({ key: 'imageFormats', label: 'Image Formats', value: src721.imageSupport.join(', ') })
      break
      
    case 'src101':
      const src101 = specData.value as SRC101Spec
      if (src101.maxNameLength) details.push({ key: 'maxLength', label: 'Max Name Length', value: `${src101.maxNameLength} chars` })
      if (src101.allowedCharacters) details.push({ key: 'allowedChars', label: 'Allowed Characters', value: src101.allowedCharacters })
      if (src101.registrationPeriod) details.push({ key: 'registrationPeriod', label: 'Registration Period', value: src101.registrationPeriod })
      break
      
    case 'olga':
      const olga = specData.value as OLGASpec
      if (olga.encodingEfficiency) details.push({ key: 'encodingEfficiency', label: 'Encoding Efficiency', value: olga.encodingEfficiency })
      if (olga.maxInputSize) details.push({ key: 'maxInput', label: 'Max Input Size', value: olga.maxInputSize })
      if (olga.algorithmType) details.push({ key: 'algorithm', label: 'Algorithm', value: olga.algorithmType })
      break
  }
  
  return details
}

const getNetworkConstants = () => {
  if (!isNetworkSpec.value) return []
  
  const constants = []
  
  if (props.spec === 'bitcoin') {
    const bitcoin = getBitcoinConstants()
    if (bitcoin) {
      constants.push(
        { key: 'minTxFee', label: 'Min TX Fee', value: formatGasPrice(bitcoin.minTxFee) },
        { key: 'maxBlockSize', label: 'Max Block Size', value: formatByteSize(bitcoin.maxBlockSize) },
        { key: 'targetBlockTime', label: 'Block Time', value: `${bitcoin.targetBlockTime}s` }
      )
    }
  } else if (props.spec === 'stamps') {
    const stamps = getStampsConstants()
    if (stamps) {
      constants.push(
        { key: 'minStampSize', label: 'Min Stamp Size', value: formatGasPrice(stamps.minStampSize) },
        { key: 'maxImageSize', label: 'Max Image Size', value: formatByteSize(stamps.maxImageSize) },
        { key: 'recommendedGasPrice', label: 'Recommended Gas', value: formatGasPrice(stamps.recommendedGasPrice) }
      )
    }
  }
  
  return constants
}

const hasPerformanceData = (): boolean => {
  return !!getPerformanceBenchmarks()
}

const getPerformanceMetrics = () => {
  const benchmarks = getPerformanceBenchmarks()
  if (!benchmarks) return []
  
  return [
    { key: 'apiResponse', label: 'API Response', value: benchmarks.api_response_time || 'N/A' },
    { key: 'indexingSpeed', label: 'Indexing Speed', value: benchmarks.indexing_speed || 'N/A' },
    { key: 'dbQuery', label: 'DB Query Time', value: benchmarks.database_query_time || 'N/A' }
  ]
}

const getCodeExample = (): string => {
  switch (props.spec) {
    case 'src20':
      return `// Deploy SRC-20 token
{
  "protocol": "SRC-20",
  "operation": "deploy",
  "tick": "TEST",
  "max": "21000000",
  "limit": "1000"
}`
    case 'src721':
      return `// Mint SRC-721 NFT
{
  "protocol": "SRC-721",
  "operation": "mint",
  "collection": "TEST",
  "metadata": {
    "name": "Test NFT #1",
    "image": "data:image/png;base64,..."
  }
}`
    default:
      return `// ${props.spec.toUpperCase()} example
// Documentation coming soon...`
  }
}

// Icons
const iconComponent = computed(() => {
  const icons = {
    src20: () => h('div', { class: 'w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold' }, '₿'),
    src721: () => h('div', { class: 'w-6 h-6 bg-purple-500 rounded flex items-center justify-center text-white text-xs' }, '🖼'),
    src101: () => h('div', { class: 'w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs' }, '📛'),
    olga: () => h('div', { class: 'w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs' }, '🗜'),
    bitcoin: () => h('div', { class: 'w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold' }, '₿'),
    stamps: () => h('div', { class: 'w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-white text-xs' }, '🎨')
  }
  return icons[props.spec] || icons.bitcoin
})

// Lifecycle
onMounted(async () => {
  try {
    switch (props.spec) {
      case 'src20':
        specData.value = getSRC20Spec()
        break
      case 'src721':
        specData.value = getSRC721Spec()
        break
      case 'src101':
        specData.value = getSRC101Spec()
        break
      case 'olga':
        specData.value = getOLGASpec()
        break
      case 'bitcoin':
        specData.value = getBitcoinConstants()
        break
      case 'stamps':
        specData.value = getStampsConstants()
        break
      default:
        specData.value = getProtocolSpec(props.spec)
    }
  } catch (error) {
    console.error('Failed to load specification:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.technical-spec {
  @apply border rounded-lg bg-white dark:bg-gray-800 shadow-sm;
}

.spec-compact {
  @apply p-3;
}

.spec-card {
  @apply p-4;
}

.spec-detailed {
  @apply p-6;
}

.spec-header {
  @apply flex items-start gap-3 mb-4;
}

.spec-icon .icon {
  @apply w-6 h-6;
}

.spec-title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.spec-meta {
  @apply flex gap-2 mt-1;
}

.spec-version {
  @apply px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded;
}

.spec-status {
  @apply px-2 py-1 text-xs rounded font-medium;
}

.status-active {
  @apply bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200;
}

.status-deprecated {
  @apply bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200;
}

.status-development {
  @apply bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200;
}

.launch-info {
  @apply flex flex-wrap gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded;
}

.launch-item {
  @apply flex gap-2 text-sm;
}

.launch-label {
  @apply font-medium text-gray-600 dark:text-gray-400;
}

.launch-value {
  @apply font-mono text-gray-900 dark:text-white;
}

.features-section {
  @apply mb-4;
}

.features-title {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}

.features-list {
  @apply flex flex-wrap gap-2;
}

.feature-tag {
  @apply px-2 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs rounded;
}

.technical-details,
.network-constants,
.performance-section {
  @apply mb-4;
}

.details-title,
.constants-title,
.performance-title {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}

.details-grid,
.constants-grid,
.performance-metrics {
  @apply grid grid-cols-1 md:grid-cols-2 gap-2;
}

.detail-item,
.constant-item,
.performance-item {
  @apply flex justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm;
}

.detail-label,
.constant-label,
.metric-label {
  @apply font-medium text-gray-600 dark:text-gray-400;
}

.detail-value,
.constant-value,
.metric-value {
  @apply font-mono text-gray-900 dark:text-white;
}

.compatibility-section {
  @apply mb-4;
}

.compatibility-title {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}

.compatibility-info {
  @apply p-2 bg-green-50 dark:bg-green-900 rounded;
}

.compatibility-item {
  @apply flex gap-2 text-sm;
}

.compatibility-label {
  @apply font-medium text-green-700 dark:text-green-300;
}

.compatibility-value {
  @apply font-mono text-green-800 dark:text-green-200;
}

.code-example {
  @apply mb-4;
}

.code-title {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}

.code-block {
  @apply p-3 bg-gray-900 text-green-400 rounded font-mono text-sm overflow-x-auto;
}

.spec-loading,
.spec-error {
  @apply flex items-center justify-center gap-2 p-8 text-gray-500 dark:text-gray-400;
}

.loading-spinner {
  @apply w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin;
}
</style>