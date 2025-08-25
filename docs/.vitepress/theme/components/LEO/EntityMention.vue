<template>
  <component 
    :is="inline ? 'span' : 'div'"
    :class="entityClasses"
    :itemscope="!inline"
    :itemtype="schemaType"
    :title="entity?.description"
    :role="inline ? 'button' : undefined"
    :tabindex="inline ? '0' : undefined"
    :aria-label="`Learn more about ${displayName}`"
    :aria-describedby="entity?.description ? `${entityId}-desc` : undefined"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <slot>{{ displayName }}</slot>
    
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
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
const slots = useSlots()

const entityId = computed(() => props.entity.toLowerCase())
const entity = computed(() => getEntity(entityId.value))

const displayName = computed(() => {
  return entity.value?.name || props.entity.toUpperCase()
})

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
  // Navigate to entity page or external URL
  if (entity.value?.url) {
    window.open(entity.value.url, '_blank')
  } else {
    // Generate entity page URL
    const routes = {
      'kevin': '/narratives/kevin-origin',
      'arwyn': '/community/people/arwyn',
      'mikeinspace': '/community/people/mikeinspace', 
      'reinamora': '/community/people/reinamora',
      'derpherpstein': '/protocols/src-721',
      'src-20': '/protocols/src-20',
      'src-721': '/protocols/src-721',
      'src-101': '/protocols/src-101',
      'olga': '/protocols/olga',
      'bitcoin-stamps': '/',
      'counterparty': 'https://counterparty.io',
      'stampchain': '/tutorials/api-integration'
    }
    
    const route = routes[entityId.value]
    if (route) {
      if (route.startsWith('http')) {
        window.open(route, '_blank')
      } else {
        window.location.href = route
      }
    }
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