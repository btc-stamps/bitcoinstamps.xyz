<template>
  <component 
    :is="inline ? 'span' : 'div'"
    :class="entityClasses"
    :itemscope="!inline"
    :itemtype="schemaType"
    :title="entityTooltip"
    :lang="currentLanguage"
    @click="handleClick"
    @mouseenter="handleHover"
  >
    <!-- Main entity content -->
    <span class="entity-content">
      <slot>{{ displayName }}</slot>
      
      <!-- Cultural icon for high significance entities -->
      <span v-if="showIcon && entityIcon" :class="['entity-icon', `icon-${entityId}`]">
        {{ entityIcon }}
      </span>
      
      <!-- Cultural significance indicator -->
      <span 
        v-if="culturalSignificance === 'high' && !hideSignificance" 
        class="cultural-indicator"
        :title="culturalSignificanceLabel"
      >
        ✨
      </span>
    </span>
    
    <!-- Philosophy/cultural context tooltip content -->
    <div v-if="showTooltip && (culturalContext || philosophies.length > 0)" class="entity-tooltip">
      <div class="tooltip-content">
        <!-- Cultural context -->
        <div v-if="culturalContext" class="cultural-context">
          <strong>{{ $t('entity.cultural-context', 'Cultural Context') }}</strong>
          <p>{{ culturalContext }}</p>
        </div>
        
        <!-- Philosophy translations -->
        <div v-if="philosophies.length > 0" class="philosophies">
          <strong>{{ $t('entity.philosophies', 'Philosophy') }}</strong>
          <div v-for="philosophy in philosophies" :key="philosophy.id" class="philosophy-item">
            <em>"{{ philosophy.phrase }}"</em>
            <p>{{ philosophy.meaning }}</p>
          </div>
        </div>
        
        <!-- Regional context -->
        <div v-if="regionalContext" class="regional-context">
          <small>{{ regionalContext }}</small>
        </div>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useLEO } from '../../composables/useLEO'
import { 
  getLocalizedEntity, 
  getCulturalContext, 
  getEntityPhilosophies,
  entityTranslationDB 
} from '../../../.vitepress/api/entity-translations.js'
import { 
  getCulturalSignificanceLabel,
  getLocalizedCryptoTerm 
} from '../../../.vitepress/api/language-utils.js'
import type { SupportedLanguage } from '../../../.vitepress/api/types.d.ts'

interface Props {
  entity: string  // Entity ID (kevin, arwyn, src-20, etc.)
  inline?: boolean
  hideIcon?: boolean
  hideSignificance?: boolean
  variant?: 'subtle' | 'prominent' | 'cultural' | 'philosophy'
  showTooltip?: boolean
  language?: SupportedLanguage
}

const props = withDefaults(defineProps<Props>(), {
  inline: true,
  hideIcon: false,
  hideSignificance: false,
  variant: 'subtle',
  showTooltip: false
})

const { getEntity, currentLocale } = useLEO()
const showTooltip = ref(false)

// Determine current language
const currentLanguage = computed((): SupportedLanguage => {
  return props.language || currentLocale.value as SupportedLanguage || 'en'
})

const entityId = computed(() => props.entity.toLowerCase())

// Get localized entity data
const localizedEntity = computed(() => {
  return getLocalizedEntity(entityId.value, currentLanguage.value)
})

// Fall back to existing LEO system if translation not found
const legacyEntity = computed(() => getEntity(entityId.value))
const entity = computed(() => localizedEntity.value || legacyEntity.value)

// Cultural translation data
const culturalContext = computed(() => {
  return getCulturalContext(entityId.value, currentLanguage.value)
})

const philosophies = computed(() => {
  return getEntityPhilosophies(entityId.value, currentLanguage.value)
})

const culturalSignificance = computed(() => {
  return entity.value?.culturalSignificance || 'medium'
})

const culturalSignificanceLabel = computed(() => {
  return getCulturalSignificanceLabel(culturalSignificance.value, currentLanguage.value)
})

// Regional context
const regionalContext = computed(() => {
  const translation = entityTranslationDB.getTranslation(entityId.value)
  const regional = translation?.regionalAdaptations?.[currentLanguage.value]
  return regional?.culturalContext
})

// Display properties
const displayName = computed(() => {
  // Prefer localized entity name
  if (localizedEntity.value?.name) {
    return localizedEntity.value.name
  }
  
  // Fall back to legacy system
  if (entity.value?.localizedName || entity.value?.name) {
    return entity.value.localizedName || entity.value.name
  }
  
  // Last resort: format entity ID
  return props.entity.toUpperCase()
})

const entityTooltip = computed(() => {
  const description = localizedEntity.value?.description || 
                     entity.value?.localizedDescription || 
                     entity.value?.description || ''
  
  // Add cultural context to tooltip
  if (culturalContext.value && description) {
    return `${description}\n\n${culturalContext.value}`
  }
  
  return description
})

const entityIcon = computed(() => {
  const icons: Record<string, string> = {
    kevin: '👑',
    arwyn: '🎨',
    mikeinspace: '⭐',
    reinamora: '🔧',
    'src-20': '🪙',
    'src-721': '🖼️',
    'src-101': '🏷️',
    olga: '🗜️',
    'bitcoin-stamps': '📮'
  }
  
  return icons[entityId.value] || ''
})

const showIcon = computed(() => !props.hideIcon && Boolean(entityIcon.value))

const schemaType = computed(() => {
  const baseType = entity.value?.type || 'Thing'
  
  // Enhanced schema types for cultural entities
  const schemaTypes: Record<string, string> = {
    'cultural-icon': 'Person',
    'protocol-ecosystem': 'SoftwareApplication',
    'protocol': 'SoftwareApplication',
    'Person': 'Person',
    'SoftwareApplication': 'SoftwareApplication'
  }
  
  const schemaType = schemaTypes[baseType] || baseType
  return `https://schema.org/${schemaType}`
})

const entityClasses = computed(() => [
  'entity-mention-enhanced',
  `entity-${entityId.value}`,
  `entity-variant-${props.variant}`,
  `entity-lang-${currentLanguage.value}`,
  {
    'entity-inline': props.inline,
    'entity-block': !props.inline,
    'entity-kevin': entityId.value === 'kevin',
    'entity-cultural': culturalSignificance.value === 'high',
    'entity-with-philosophy': philosophies.value.length > 0,
    'entity-regional-context': Boolean(regionalContext.value),
    'entity-tooltip-active': showTooltip.value
  }
])

// Event handlers
function handleClick() {
  // Use localized entity URL if available
  const entityUrl = localizedEntity.value?.url || entity.value?.url
  
  if (entityUrl) {
    // Check if it's an external URL
    if (entityUrl.startsWith('http')) {
      window.open(entityUrl, '_blank')
    } else {
      // Internal route - use current language prefix if not English
      const localizedPath = currentLanguage.value === 'en' 
        ? entityUrl 
        : `/${currentLanguage.value}${entityUrl}`
      window.location.href = localizedPath
    }
    return
  }
  
  // Fall back to legacy routing
  const routes: Record<string, string> = {
    'kevin': '/narratives/kevin-origin',
    'arwyn': '/community/people/arwyn',
    'mikeinspace': '/community/people/mikeinspace', 
    'reinamora': '/community/people/reinamora',
    'src-20': '/protocols/src-20',
    'src-721': '/protocols/src-721',
    'src-101': '/protocols/src-101',
    'olga': '/protocols/olga',
    'bitcoin-stamps': '/'
  }
  
  const route = routes[entityId.value]
  if (route) {
    const localizedRoute = currentLanguage.value === 'en' 
      ? route 
      : `/${currentLanguage.value}${route}`
    window.location.href = localizedRoute
  }
}

function handleHover() {
  if (props.showTooltip) {
    showTooltip.value = true
    setTimeout(() => {
      showTooltip.value = false
    }, 3000) // Hide after 3 seconds
  }
}

// Analytics tracking for cultural entity interactions
onMounted(() => {
  if (culturalSignificance.value === 'high' && typeof gtag !== 'undefined') {
    // Track high-significance entity views
    gtag('event', 'cultural_entity_view', {
      entity_id: entityId.value,
      language: currentLanguage.value,
      cultural_significance: culturalSignificance.value
    })
  }
})
</script>

<style scoped>
.entity-mention-enhanced {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.2em;
}

/* Language-specific typography adjustments */
.entity-lang-zh {
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.entity-lang-fr, .entity-lang-es {
  font-feature-settings: 'liga' 1, 'kern' 1;
}

/* Variant styles - enhanced with cultural awareness */
.entity-variant-subtle {
  color: var(--vp-c-text-2);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 0.2em;
}

.entity-variant-prominent {
  color: var(--vp-c-brand-1);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--vp-c-brand-1);
}

.entity-variant-cultural {
  color: var(--kevin-accent, #FFD700);
  font-weight: 700;
  text-shadow: 0 0 3px rgba(255, 215, 0, 0.3);
  position: relative;
}

.entity-variant-philosophy {
  color: var(--vp-c-text-1);
  font-style: italic;
  position: relative;
  background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.1), transparent);
  padding: 0.1em 0.3em;
  border-radius: 0.2em;
}

/* Entity-specific enhanced styles */
.entity-kevin {
  background: linear-gradient(45deg, #FFD700, #FFA500, #FF6347);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  animation: kevin-glow 2s ease-in-out infinite alternate;
}

@keyframes kevin-glow {
  0% { filter: brightness(1) saturate(1); }
  100% { filter: brightness(1.2) saturate(1.3); }
}

.entity-kevin:hover {
  transform: scale(1.08) rotate(1deg);
  animation-duration: 0.5s;
}

/* Cultural significance indicators */
.entity-cultural::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #FFD700, #FFA500, #FF6347, #FFD700);
  background-size: 200% 200%;
  animation: cultural-border 3s linear infinite;
  border-radius: 0.3em;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.entity-cultural:hover::before {
  opacity: 0.3;
}

@keyframes cultural-border {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Philosophy-enhanced entities */
.entity-with-philosophy::after {
  content: '◊';
  font-size: 0.7em;
  opacity: 0.6;
  margin-left: 0.2em;
  color: var(--kevin-accent, #FFD700);
}

/* Regional context styling */
.entity-regional-context {
  border-bottom: 2px dotted var(--vp-c-text-3);
}

/* Icons styling */
.entity-icon {
  font-size: 0.9em;
  opacity: 0.8;
  transition: all 0.2s ease;
}

.icon-kevin {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -5px, 0);
  }
  70% {
    transform: translate3d(0, -3px, 0);
  }
  90% {
    transform: translate3d(0, -1px, 0);
  }
}

/* Cultural indicator */
.cultural-indicator {
  font-size: 0.7em;
  margin-left: 0.2em;
  animation: sparkle 1.5s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Tooltip styling */
.entity-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  pointer-events: none;
}

.entity-tooltip-active .entity-tooltip {
  opacity: 1;
  visibility: visible;
}

.tooltip-content {
  background: var(--vp-c-bg-elev);
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-size: 0.875rem;
  line-height: 1.4;
}

.tooltip-content strong {
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
  display: block;
}

.cultural-context, .philosophies, .regional-context {
  margin-bottom: 0.75rem;
}

.cultural-context:last-child, 
.philosophies:last-child, 
.regional-context:last-child {
  margin-bottom: 0;
}

.philosophy-item {
  margin-bottom: 0.5rem;
}

.philosophy-item em {
  color: var(--kevin-accent, #FFD700);
  font-weight: 600;
}

.philosophy-item p {
  margin: 0.25rem 0 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}

.regional-context small {
  color: var(--vp-c-text-3);
  font-style: italic;
}

/* Block layout for non-inline usage */
.entity-block {
  display: block;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  margin: 0.5rem 0;
}

.entity-block:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-elev);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.entity-block .entity-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Hover effects */
.entity-mention-enhanced:hover {
  transform: translateY(-1px);
  filter: brightness(1.1);
}

.entity-mention-enhanced:hover .entity-icon {
  opacity: 1;
  transform: scale(1.1);
}

/* Focus styles for accessibility */
.entity-mention-enhanced:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
  border-radius: 0.2em;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .entity-variant-cultural {
    text-shadow: none;
    border: 1px solid currentColor;
    padding: 0.1em 0.2em;
  }
  
  .entity-kevin {
    -webkit-text-fill-color: currentColor;
    color: var(--vp-c-text-1);
    font-weight: 900;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .entity-mention-enhanced,
  .entity-icon,
  .cultural-indicator,
  .entity-kevin {
    animation: none !important;
    transition: none !important;
  }
  
  .entity-mention-enhanced:hover {
    transform: none;
  }
}
</style>