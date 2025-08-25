<template>
  <div class="language-switcher">
    <select 
      :value="currentLocale" 
      @change="handleLocaleChange"
      class="locale-selector"
      :aria-label="switcherLabel"
    >
      <option value="en">🇺🇸 English</option>
      <option value="fr">🇫🇷 Français</option>
      <option value="es">🇪🇸 Español</option>
      <option value="zh">🇨🇳 中文</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRouter } from 'vitepress'

const { site, page } = useData()
const router = useRouter()

// Detect current locale from URL
const currentLocale = computed(() => {
  const path = page.value.relativePath
  
  // Check if path starts with a locale
  if (path.startsWith('fr/')) return 'fr'
  if (path.startsWith('es/')) return 'es'
  if (path.startsWith('zh/')) return 'zh'
  
  // Default to English
  return 'en'
})

// Localized labels for accessibility
const switcherLabel = computed(() => {
  const labels = {
    en: 'Switch language',
    fr: 'Changer de langue',
    es: 'Cambiar idioma',
    zh: '切换语言'
  }
  return labels[currentLocale.value] || labels.en
})

const handleLocaleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newLocale = target.value
  
  if (newLocale === currentLocale.value) return
  
  // Get current page path without locale prefix
  let currentPath = page.value.relativePath
  
  // Remove current locale prefix if it exists
  if (currentPath.startsWith('fr/')) {
    currentPath = currentPath.substring(3)
  } else if (currentPath.startsWith('es/')) {
    currentPath = currentPath.substring(3)
  } else if (currentPath.startsWith('zh/')) {
    currentPath = currentPath.substring(3)
  }
  
  // Remove .md extension if present
  if (currentPath.endsWith('.md')) {
    currentPath = currentPath.substring(0, currentPath.length - 3)
  }
  
  // Construct new path
  let newPath: string
  if (newLocale === 'en') {
    // English is the root locale
    newPath = currentPath === 'index' ? '/' : `/${currentPath}`
  } else {
    // Other locales are prefixed
    newPath = currentPath === 'index' ? `/${newLocale}/` : `/${newLocale}/${currentPath}`
  }
  
  // Navigate to new locale
  router.go(newPath)
}
</script>

<style scoped>
.language-switcher {
  display: inline-block;
  margin-left: 1rem;
}

.locale-selector {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
}

.locale-selector:hover {
  border-color: var(--vp-c-brand-1);
}

.locale-selector:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-brand-1);
}

@media (max-width: 768px) {
  .language-switcher {
    margin-left: 0.5rem;
  }
  
  .locale-selector {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
  }
}
</style>