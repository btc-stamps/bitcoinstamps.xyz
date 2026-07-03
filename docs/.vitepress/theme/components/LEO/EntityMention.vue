<template>
  <component 
    :is="inline ? 'span' : 'div'"
    :class="entityClasses"
    :itemscope="!inline"
    :itemtype="schemaType"
    :title="description || undefined"
    :role="inline ? 'button' : undefined"
    :tabindex="inline ? '0' : undefined"
    :aria-label="description ? `${displayName}: ${description}` : `Learn more about ${displayName}`"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <slot>{{ displayName }}</slot>
    
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useLEO } from '../../composables/useLEO'

interface Props {
  entity: string  // Entity ID (kevin, arwyn, src-20, etc.)
  inline?: boolean
  hideIcon?: boolean
  variant?: 'subtle' | 'prominent' | 'cultural'
}

const props = withDefaults(defineProps<Props>(), {
  inline: true,
  hideIcon: false,
  variant: 'subtle'
})

const { getEntity } = useLEO()
const { localeIndex } = useData()

// Entity IDs whose display name must NEVER be upper-cased (cultural rule).
// mikeinspace is always lowercase.
const LOWERCASE_EXEMPT = new Set(['mikeinspace'])
// Person entities that have dedicated community pages (English-only for now).
const PERSON_ENTITIES = new Set(['arwyn', 'mikeinspace', 'reinamora'])

const entityId = computed(() => props.entity.toLowerCase())
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const entity = computed<any>(() => getEntity(entityId.value))

// Current locale key ('en' | 'fr' | 'es' | 'zh' | 'tr'); 'root'/undefined → 'en'.
const locale = computed(() => {
  const li = localeIndex.value
  return li && li !== 'root' ? li : 'en'
})

// Resolve a localized value from an entity's { en, fr, es, zh, … } map.
function localized(map?: Record<string, string>): string | undefined {
  if (!map) return undefined
  return map[locale.value] || map.en
}

const displayName = computed(() => {
  // Entities carry a localized `names` map (not a flat `name`); resolve it.
  const name = localized(entity.value?.names)
  if (name) return name
  // Unknown entity id (no store entry): fall back to the raw id, but never
  // upper-case a lowercase-exempt id (e.g. mikeinspace → "mikeinspace",
  // NOT "MIKEINSPACE"). KEVIN and other entities keep their canonical casing
  // via the `names` map above.
  if (LOWERCASE_EXEMPT.has(entityId.value)) return entityId.value
  return props.entity.toUpperCase()
})

// Localized description used for the tooltip (title) + accessible label.
const description = computed(() => localized(entity.value?.descriptions))

const schemaType = computed(() => {
  const baseType = entity.value?.type || 'Thing'
  return `https://schema.org/${baseType}`
})

const entityClasses = computed(() => [
  'entity-mention',
  `entity-${entityId.value}`,
  `entity-variant-${props.variant}`,
  {
    'entity-inline': props.inline,
    'entity-block': !props.inline,
    'entity-kevin': entityId.value === 'kevin',
    'entity-cultural': entity.value?.culturalSignificance === 'high'
  }
])

function handleClick() {
  const id = entityId.value

  // Person entities have dedicated community pages. Only English person pages
  // exist today, so route to the /en/ canonical (localized person pages are a
  // tracked i18n follow-up). Checked first so a person's external social `url`
  // does not intercept the click.
  if (PERSON_ENTITIES.has(id)) {
    window.location.href = `/en/community/people/${id}`
    return
  }

  // External links defined on the entity (e.g. kevinstamp.com, counterparty.io).
  if (typeof entity.value?.url === 'string' && entity.value.url.startsWith('http')) {
    window.open(entity.value.url, '_blank')
    return
  }

  // Internal targets that exist under every locale — prefix with the current
  // locale so links resolve instead of 404-ing (they previously lacked /{locale}/).
  const l = locale.value
  const internalRoutes: Record<string, string> = {
    'kevin': `/${l}/narratives/kevin-origin`,
    'derpherpstein': `/${l}/protocols/src-721`,
    'src-20': `/${l}/protocols/src-20`,
    'src-721': `/${l}/protocols/src-721`,
    'src-101': `/${l}/protocols/src-101`,
    'olga': `/${l}/protocols/olga`,
    'bitcoin-stamps': `/${l}/`,
    'stampchain': `/${l}/tutorials/api-integration`,
    'tx-builder': `/${l}/tutorials/sdk-integration`
  }

  const route = internalRoutes[id]
  if (route) {
    window.location.href = route
  } else if (typeof entity.value?.url === 'string' && entity.value.url.startsWith('/')) {
    // Internal url defined on the entity data — prefix with the current locale.
    window.location.href = `/${l}${entity.value.url}`
  }
}
</script>

<style scoped>
.entity-mention {
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-radius: 2px;
}

/* Accessibility enhancements */
.entity-mention:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.dark .entity-mention:focus-visible {
  outline-color: var(--vp-c-brand-1-dark);
}

/* Hover states with better accessibility */
.entity-mention:hover {
  background-color: rgba(247, 147, 26, 0.1);
  padding: 1px 4px;
  margin: -1px -4px;
  border-radius: 4px;
}

.dark .entity-mention:hover {
  background-color: rgba(255, 215, 0, 0.1);
}

/* Variant styles - WCAG AA compliant */
.entity-variant-subtle {
  color: var(--vp-c-text-2);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

.entity-variant-prominent {
  color: var(--vp-c-brand-3); /* Darker orange for better contrast */
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
}

.dark .entity-variant-prominent {
  color: var(--vp-c-brand-1-dark);
}

.entity-variant-cultural {
  color: #D4A017; /* Dark gold with good contrast */
  font-weight: 600; /* Reduced from 700 */
  text-shadow: 0 0 1px rgba(212, 160, 23, 0.2); /* More subtle shadow */
  text-decoration: underline;
  text-decoration-style: solid; /* Changed from wavy to solid */
  text-decoration-thickness: 1px; /* Reduced from 2px */
  text-underline-offset: 2px; /* Reduced from 3px */
}

.dark .entity-variant-cultural {
  color: #FFD700; /* Bright gold for dark mode */
  text-shadow: 0 0 2px rgba(255, 215, 0, 0.4);
}

/* Entity-specific styles - WCAG compliant */
.entity-kevin {
  color: #D4A017; /* Dark gold for better contrast */
  font-weight: 600; /* Reduced from 700 */
  text-shadow: 0 0 1px rgba(212, 160, 23, 0.2); /* More subtle shadow */
}

.dark .entity-kevin {
  color: #FFD700; /* Brighter gold for dark mode */
}

/* Fallback with gradient for special cases */
.entity-kevin.use-gradient {
  background: linear-gradient(45deg, #D4A017, #B8860B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .entity-kevin.use-gradient {
  background: linear-gradient(45deg, #FFD700, #FFA500);
}

/* Fallback for browsers that don't support background-clip */
@supports not (-webkit-background-clip: text) {
  .entity-kevin.use-gradient {
    color: #D4A017 !important;
    background: none !important;
    -webkit-text-fill-color: unset !important;
  }
  
  .dark .entity-kevin.use-gradient {
    color: #FFD700 !important;
  }
}

.entity-kevin:hover {
  transform: scale(1.05);
}


.entity-mention:hover {
  transform: translateY(-1px);
  filter: brightness(1.2);
}

.entity-cultural {
  position: relative;
}

.entity-cultural::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px; /* Reduced from 2px */
  background: linear-gradient(90deg, transparent, var(--kevin-accent, #FFD700), transparent);
  opacity: var(--cultural-importance, 0.3); /* Reduced from 0.5 */
}

/* Block layout for non-inline usage */
.entity-block {
  display: block;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.entity-block:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-elev);
}
</style>