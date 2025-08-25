import DefaultTheme from 'vitepress/theme'
import './style.css'

// Import core LEO Components for i18n support
import SmartStructuredData from './components/LEO/SmartStructuredData.vue'
import EntityMention from './components/LEO/EntityMention.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register LEO components with i18n support
    app.component('SmartStructuredData', SmartStructuredData)
    app.component('EntityMention', EntityMention)
    app.component('LanguageSwitcher', LanguageSwitcher)
  }
}