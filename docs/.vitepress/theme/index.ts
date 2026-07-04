import DefaultTheme from 'vitepress/theme'
import './style.css'

// Import core LEO Components for i18n support
import EntityMention from './components/LEO/EntityMention.vue'
import AuthorBio from './components/LEO/AuthorBio.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import SipRegistry from './components/SipRegistry.vue'
// Custom dark-tech homepage layout. VitePress resolves `layout: StampsHome`
// frontmatter to this globally-registered component (VPContent renders any
// unknown layout string via <component :is>), keeping the navbar/search intact.
import StampsHome from './components/StampsHome.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Register LEO components with i18n support
    app.component('EntityMention', EntityMention)
    app.component('AuthorBio', AuthorBio)
    app.component('LanguageSwitcher', LanguageSwitcher)
    app.component('SipRegistry', SipRegistry)
    app.component('StampsHome', StampsHome)
  }
}