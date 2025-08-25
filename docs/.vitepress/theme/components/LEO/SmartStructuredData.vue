<template>
  <!-- Smart Schema.org injection with minimal overhead -->
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useLEO } from '../../composables/useLEO'

const { structuredData, isKevinMentioned, getCulturalContext } = useLEO()

// Inject structured data efficiently with hydration safety
function injectStructuredData() {
  if (typeof document === 'undefined' || !structuredData.value) return
  
  // Remove existing schema
  const existing = document.querySelector('script[data-leo-smart]')
  if (existing) existing.remove()
  
  // Inject new schema
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-leo-smart', 'true')
  script.textContent = JSON.stringify(structuredData.value, null, 0)
  document.head.appendChild(script)
  
  // Add cultural context class to body for styling
  if (isKevinMentioned()) {
    document.body.classList.add('leo-kevin-context')
  }
  
  const culturalLevel = getCulturalContext()
  document.body.classList.add(`leo-cultural-${culturalLevel}`)
}

// Use a single delayed execution after mount to avoid hydration issues
onMounted(() => {
  // Wait for hydration to complete, then inject once
  setTimeout(() => {
    if (structuredData.value) {
      injectStructuredData()
    }
  }, 500) // Longer delay to ensure complete hydration
})
</script>

<style>
/* Optional: Cultural context styling */
.leo-kevin-context {
  --kevin-accent: #FFD700;
}

.leo-cultural-high {
  --cultural-importance: 1;
}

.leo-cultural-medium {
  --cultural-importance: 0.7;
}
</style>