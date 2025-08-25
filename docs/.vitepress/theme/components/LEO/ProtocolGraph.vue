<template>
  <div 
    class="protocol-graph"
    itemscope
    itemtype="https://schema.org/Organization"
  >
    <div class="graph-header">
      <h3 itemprop="name">{{ title }}</h3>
      <p class="graph-description" itemprop="description">{{ description }}</p>
    </div>

    <!-- Interactive Protocol Network -->
    <div 
      ref="graphContainer"
      class="graph-container"
      :class="{ 'graph-loading': isLoading }"
      @click="handleGraphClick"
    >
      <!-- Central Protocol Node -->
      <div 
        class="protocol-node protocol-node--central"
        :class="`protocol-node--${centralProtocol.id}`"
        itemscope
        itemtype="https://schema.org/SoftwareApplication"
      >
        <div class="node-icon">
          <component v-if="centralProtocol.icon" :is="centralProtocol.icon" />
          <span v-else class="protocol-initial">{{ getProtocolInitial(centralProtocol.id) }}</span>
        </div>
        <div class="node-content">
          <div class="node-name" itemprop="name">{{ centralProtocol.name }}</div>
          <div class="node-type" itemprop="applicationCategory">{{ centralProtocol.type }}</div>
        </div>
        <div v-if="centralProtocol.blockHeight" class="node-metadata">
          <span class="metadata-label">Block</span>
          <span class="metadata-value" itemprop="softwareVersion">{{ centralProtocol.blockHeight.toLocaleString() }}</span>
        </div>
      </div>

      <!-- Connected Protocols -->
      <div 
        v-for="(protocol, index) in relatedProtocols"
        :key="protocol.id"
        class="protocol-node protocol-node--related"
        :class="[
          `protocol-node--${protocol.id}`,
          `protocol-position--${getNodePosition(index)}`
        ]"
        :style="getNodePosition(index, true)"
        itemscope
        itemtype="https://schema.org/SoftwareApplication"
      >
        <!-- Relationship Connection Line -->
        <div 
          class="connection-line"
          :class="`connection-${protocol.relationship}`"
          :style="getConnectionStyle(index)"
        >
          <div class="relationship-label">{{ formatRelationship(protocol.relationship) }}</div>
        </div>

        <!-- Protocol Node -->
        <EntityLink
          :entity-id="protocol.id"
          entity-type="protocol"
          :display-name="protocol.name"
          class="node-link"
        >
          <div class="node-icon">
            <component v-if="protocol.icon" :is="protocol.icon" />
            <span v-else class="protocol-initial">{{ getProtocolInitial(protocol.id) }}</span>
          </div>
          <div class="node-content">
            <div class="node-name" itemprop="name">{{ protocol.name }}</div>
            <div class="node-type" itemprop="applicationCategory">{{ protocol.type }}</div>
          </div>
        </EntityLink>
        
        <!-- Cultural Significance Indicator -->
        <div 
          v-if="protocol.culturalSignificance"
          class="significance-indicator"
          :class="`significance--${protocol.culturalSignificance}`"
          :title="`Cultural Significance: ${protocol.culturalSignificance}`"
        >
          <span v-if="protocol.culturalSignificance === 'high'">⭐</span>
          <span v-else-if="protocol.culturalSignificance === 'medium'">✨</span>
          <span v-else>💫</span>
        </div>
      </div>

      <!-- KEVIN Mascot Integration (when relevant) -->
      <div 
        v-if="showKevin"
        class="kevin-indicator"
        :class="{ 'kevin-indicator--active': highlightKevin }"
      >
        <div class="kevin-avatar">👑</div>
        <div class="kevin-message">
          <p>{{ kevinMessage }}</p>
        </div>
      </div>
    </div>

    <!-- Graph Legend -->
    <div class="graph-legend">
      <div class="legend-title">Protocol Relationships</div>
      <div class="legend-items">
        <div class="legend-item">
          <div class="legend-line connection-enhances"></div>
          <span>Enhances</span>
        </div>
        <div class="legend-item">
          <div class="legend-line connection-depends"></div>
          <span>Depends On</span>
        </div>
        <div class="legend-item">
          <div class="legend-line connection-integrates"></div>
          <span>Integrates With</span>
        </div>
      </div>
    </div>

    <!-- Structured Data is injected into document head via useHead -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { useData, useHead } from 'vitepress'
import EntityLink from './EntityLink.vue'

interface Protocol {
  id: string
  name: string
  type: string
  relationship: 'enhances' | 'depends' | 'integrates' | 'enables'
  culturalSignificance?: 'high' | 'medium' | 'low'
  blockHeight?: number
  icon?: any
}

interface CentralProtocol extends Omit<Protocol, 'relationship'> {
  description?: string
}

interface Props {
  /** Central protocol being visualized */
  centralProtocol: CentralProtocol
  /** Related protocols with relationships */
  relatedProtocols: Protocol[]
  /** Graph title */
  title?: string
  /** Graph description */
  description?: string
  /** Show KEVIN mascot integration */
  showKevin?: boolean
  /** Interactive features enabled */
  interactive?: boolean
  /** Highlight KEVIN-related connections */
  highlightKevin?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Protocol Ecosystem',
  description: 'Interactive visualization of Bitcoin Stamps protocol relationships',
  showKevin: false,
  interactive: true,
  highlightKevin: false
})

const graphContainer = ref<HTMLElement>()
const isLoading = ref(false)

// KEVIN mascot messages based on protocol context
const kevinMessage = computed(() => {
  if (props.centralProtocol.id === 'src-20') {
    return "I'm the first SRC-20 token! All these protocols help me live forever on Bitcoin. 🚀"
  } else if (props.centralProtocol.id === 'olga') {
    return "OLGA P2WSH encoding makes my transactions smaller and cheaper! More space for art! 🎨"
  } else {
    return "Every protocol in the Bitcoin Stamps ecosystem helps create permanent digital art! ✨"
  }
})

// Structured data for the protocol graph
// Inject structured data into document head using VitePress useHead
useHead(() => ({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": props.title,
        "description": props.description,
        "url": "https://bitcoinstamps.xyz/protocols",
        "member": [
          {
            "@type": "SoftwareApplication",
            "name": props.centralProtocol.name,
            "applicationCategory": props.centralProtocol.type,
            "identifier": props.centralProtocol.id,
            "operatingSystem": "Bitcoin Network"
          },
          ...props.relatedProtocols.map(protocol => ({
            "@type": "SoftwareApplication",
            "name": protocol.name,
            "applicationCategory": protocol.type,
            "identifier": protocol.id,
            "operatingSystem": "Bitcoin Network",
            "relatedLink": {
              "@type": "WebPage",
              "url": `https://bitcoinstamps.xyz/protocols/${protocol.id}`,
              "relationship": protocol.relationship
            }
          }))
        ],
        "knowsAbout": props.relatedProtocols.map(protocol => ({
          "@type": "Thing",
          "name": protocol.relationship,
          "description": `${props.centralProtocol.name} ${protocol.relationship} ${protocol.name}`
        }))
      }, null, 0)
    }
  ]
}))

function getProtocolInitial(protocolId: string): string {
  return protocolId.split('-')[0].toUpperCase().charAt(0)
}

function getNodePosition(index: number, asStyle = false) {
  const totalNodes = props.relatedProtocols.length
  const angle = (index / totalNodes) * 2 * Math.PI
  const radius = 120 // Distance from center
  
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  
  if (asStyle) {
    return {
      transform: `translate(${x}px, ${y}px)`
    }
  }
  
  // Return position class for CSS fallback
  if (index < totalNodes / 4) return 'top'
  if (index < totalNodes / 2) return 'right'
  if (index < (3 * totalNodes) / 4) return 'bottom'
  return 'left'
}

function getConnectionStyle(index: number) {
  const totalNodes = props.relatedProtocols.length
  const angle = (index / totalNodes) * 2 * Math.PI
  const length = 120
  
  return {
    width: `${length}px`,
    transform: `rotate(${angle}rad) translateX(-50%)`
  }
}

function formatRelationship(relationship: string): string {
  return relationship.charAt(0).toUpperCase() + relationship.slice(1)
}

function handleGraphClick(event: MouseEvent) {
  if (!props.interactive) return
  
  const target = event.target as HTMLElement
  const protocolNode = target.closest('.protocol-node')
  
  if (protocolNode) {
    // Add click interaction animations
    protocolNode.classList.add('node-clicked')
    setTimeout(() => {
      protocolNode.classList.remove('node-clicked')
    }, 300)
  }
}

onMounted(async () => {
  await nextTick()
  
  // Add subtle entrance animations
  if (graphContainer.value) {
    const nodes = graphContainer.value.querySelectorAll('.protocol-node')
    nodes.forEach((node, index) => {
      setTimeout(() => {
        node.classList.add('node-visible')
      }, index * 100)
    })
  }
})
</script>

<style scoped>
.protocol-graph {
  @apply bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800;
  @apply border border-gray-200 dark:border-gray-700 rounded-xl p-6;
  @apply relative overflow-hidden;
}

.graph-header {
  @apply text-center mb-8;
}

.graph-header h3 {
  @apply text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2;
}

.graph-description {
  @apply text-gray-600 dark:text-gray-400;
}

.graph-container {
  @apply relative flex items-center justify-center;
  @apply min-h-80 mx-auto;
  max-width: 600px;
}

.graph-loading {
  @apply opacity-50;
}

.protocol-node {
  @apply absolute bg-white dark:bg-gray-800 rounded-xl shadow-lg border;
  @apply border-gray-200 dark:border-gray-700 p-4 transition-all duration-300;
  @apply opacity-0 transform scale-95;
}

.protocol-node.node-visible {
  @apply opacity-100 scale-100;
}

.protocol-node--central {
  @apply relative z-10 bg-gradient-to-br from-orange-50 to-orange-100;
  @apply dark:from-orange-900/20 dark:to-orange-800/20;
  @apply border-orange-300 dark:border-orange-700;
  @apply hover:shadow-xl hover:scale-105;
  position: static !important;
  transform: none !important;
}

.protocol-node--related {
  @apply z-5 hover:z-20 hover:shadow-lg hover:scale-110;
  width: 140px;
}

.protocol-node--src-20 {
  @apply bg-orange-50 dark:bg-orange-900/10 border-orange-300 dark:border-orange-700;
}

.protocol-node--src-101 {
  @apply bg-yellow-50 dark:bg-yellow-900/10 border-yellow-300 dark:border-yellow-700;
}

.protocol-node--src-721 {
  @apply bg-blue-50 dark:bg-blue-900/10 border-blue-300 dark:border-blue-700;
}

.protocol-node--olga {
  @apply bg-green-50 dark:bg-green-900/10 border-green-300 dark:border-green-700;
}

.node-icon {
  @apply w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold mb-3 mx-auto;
  @apply bg-gradient-to-br from-orange-500 to-orange-600;
}

.protocol-node--src-101 .node-icon {
  @apply from-yellow-500 to-yellow-600;
}

.protocol-node--src-721 .node-icon {
  @apply from-blue-500 to-blue-600;
}

.protocol-node--olga .node-icon {
  @apply from-green-500 to-green-600;
}

.protocol-initial {
  @apply text-lg;
}

.node-content {
  @apply text-center;
}

.node-name {
  @apply font-bold text-gray-900 dark:text-gray-100 mb-1;
}

.node-type {
  @apply text-xs text-gray-600 dark:text-gray-400;
}

.node-metadata {
  @apply text-center mt-2 pt-2 border-t border-gray-200 dark:border-gray-600;
}

.metadata-label {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.metadata-value {
  @apply text-xs font-medium text-gray-700 dark:text-gray-300 ml-1;
}

.connection-line {
  @apply absolute w-px h-px bg-gray-300 dark:bg-gray-600;
  @apply origin-left transform-gpu;
  top: 50%;
  left: 50%;
  z-index: -1;
}

.connection-enhances {
  @apply bg-green-400 dark:bg-green-500;
}

.connection-depends {
  @apply bg-blue-400 dark:bg-blue-500;
}

.connection-integrates {
  @apply bg-purple-400 dark:bg-purple-500;
}

.relationship-label {
  @apply absolute text-xs font-medium px-2 py-1 rounded bg-white dark:bg-gray-800;
  @apply border border-gray-200 dark:border-gray-700;
  @apply text-gray-600 dark:text-gray-400;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
}

.significance-indicator {
  @apply absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center;
  @apply text-sm;
}

.significance--high {
  @apply bg-orange-100 dark:bg-orange-900/30;
}

.significance--medium {
  @apply bg-blue-100 dark:bg-blue-900/30;
}

.significance--low {
  @apply bg-gray-100 dark:bg-gray-700/30;
}

.kevin-indicator {
  @apply absolute bottom-4 right-4 flex items-center gap-2 p-3 rounded-lg;
  @apply bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800;
  @apply transition-all duration-300 opacity-80 hover:opacity-100;
}

.kevin-indicator--active {
  @apply opacity-100 shadow-lg scale-105;
}

.kevin-avatar {
  @apply text-2xl;
}

.kevin-message {
  @apply max-w-48;
}

.kevin-message p {
  @apply text-sm text-gray-700 dark:text-gray-300 m-0;
}

.graph-legend {
  @apply mt-6 pt-4 border-t border-gray-200 dark:border-gray-700;
}

.legend-title {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}

.legend-items {
  @apply flex flex-wrap gap-4;
}

.legend-item {
  @apply flex items-center gap-2;
}

.legend-line {
  @apply w-4 h-px;
}

.node-clicked {
  @apply animate-pulse;
}

.node-link {
  @apply block w-full h-full text-decoration-none;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .graph-container {
    @apply min-h-64;
  }
  
  .protocol-node--related {
    width: 100px;
  }
  
  .kevin-indicator {
    @apply relative bottom-auto right-auto mt-4;
  }
  
  .legend-items {
    @apply justify-center;
  }
}

/* Animation for protocol relationships */
@keyframes pulse-connection {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.protocol-node:hover + .connection-line,
.protocol-node:hover .connection-line {
  animation: pulse-connection 1.5s ease-in-out infinite;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .protocol-node,
  .connection-line,
  .kevin-indicator {
    transition: none;
    animation: none;
  }
}

.protocol-node:focus-within {
  @apply outline-none ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-gray-800;
}
</style>