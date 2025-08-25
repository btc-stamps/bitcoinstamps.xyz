<template>
  <component 
    :is="external ? 'a' : 'RouterLink'" 
    :href="external ? href : undefined"
    :to="external ? undefined : href"
    :class="linkClass"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :itemscope="true"
    :itemtype="schemaType"
  >
    <span :itemprop="itemProp">
      <slot>{{ displayName }}</slot>
    </span>
    <span v-if="showRelationship && relationship" class="entity-relationship">
      ({{ relationship }})
    </span>
    <span v-if="external" class="external-icon">↗</span>
  </component>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { PageData } from 'vitepress'

interface Props {
  /** Entity ID for semantic linking */
  entityId: string
  /** Type of entity being linked */
  entityType?: 'protocol' | 'concept' | 'tool' | 'narrative' | 'person' | 'collection'
  /** Display name (defaults to entityId) */
  displayName?: string
  /** Relationship to current entity */
  relationship?: string
  /** Show relationship in parentheses */
  showRelationship?: boolean
  /** Custom href (overrides auto-generation) */
  href?: string
  /** Force external link behavior */
  external?: boolean
  /** Visual style variant */
  variant?: 'default' | 'protocol' | 'narrative' | 'concept'
}

const props = withDefaults(defineProps<Props>(), {
  entityType: 'concept',
  showRelationship: false,
  external: false,
  variant: 'default'
})

// Get current locale from VitePress
const page = inject<{ value: PageData }>('page')
const currentLocale = computed(() => {
  const relativePath = page?.value?.relativePath || ''
  if (relativePath.startsWith('fr/')) return 'fr'
  if (relativePath.startsWith('es/')) return 'es'
  if (relativePath.startsWith('zh/')) return 'zh'
  if (relativePath.startsWith('tr/')) return 'tr'
  return 'en'
})

const displayName = computed(() => props.displayName || formatEntityName(props.entityId))

const href = computed(() => {
  if (props.href) return props.href
  
  const locale = currentLocale.value
  // Generate semantic URLs based on entity type with language prefix
  switch (props.entityType) {
    case 'protocol':
      return `/${locale}/protocols/${props.entityId}`
    case 'narrative':
      return `/${locale}/narratives/${props.entityId}`
    case 'tool':
      return `/${locale}/tools/${props.entityId}`
    case 'person':
      return `/${locale}/community/people/${props.entityId}`
    case 'collection':
      return `/${locale}/collections/${props.entityId}`
    default:
      return `/${locale}/concepts/${props.entityId}`
  }
})

const external = computed(() => {
  return props.external || (props.href && (props.href.startsWith('http') || props.href.startsWith('//')))
})

const linkClass = computed(() => [
  'entity-link',
  `entity-link--${props.variant}`,
  `entity-link--${props.entityType}`,
  {
    'entity-link--external': external.value
  }
])

const schemaType = computed(() => {
  switch (props.entityType) {
    case 'protocol':
      return 'https://schema.org/SoftwareApplication'
    case 'person':
      return 'https://schema.org/Person'
    case 'collection':
      return 'https://schema.org/Collection'
    case 'narrative':
      return 'https://schema.org/Article'
    default:
      return 'https://schema.org/Thing'
  }
})

const itemProp = computed(() => {
  switch (props.entityType) {
    case 'protocol':
      return 'name'
    case 'person':
      return 'name'
    case 'narrative':
      return 'headline'
    default:
      return 'name'
  }
})

function formatEntityName(entityId: string): string {
  if (!entityId || typeof entityId !== 'string') {
    return 'Unknown Entity'
  }
  
  return entityId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style scoped>
.entity-link {
  @apply inline-flex items-center gap-1 font-medium transition-colors;
  text-decoration: none;
  border-bottom: 1px solid transparent;
}

.entity-link:hover {
  border-bottom-color: currentColor;
}

.entity-link--protocol {
  @apply text-orange-600 dark:text-orange-400;
}

.entity-link--narrative {
  @apply text-yellow-600 dark:text-yellow-400;
}

.entity-link--concept {
  @apply text-blue-600 dark:text-blue-400;
}

.entity-link--default {
  @apply text-gray-700 dark:text-gray-300;
}

.entity-relationship {
  @apply text-xs text-gray-500 dark:text-gray-400 font-normal;
}

.external-icon {
  @apply text-xs text-gray-400;
}

/* Protocol-specific styling matching the main theme */
.entity-link--protocol.entity-link--default {
  color: var(--vp-c-brand-1);
}

.entity-link--protocol.entity-link--default:hover {
  color: var(--vp-c-brand-2);
}
</style>