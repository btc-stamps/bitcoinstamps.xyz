import DefaultTheme from 'vitepress/theme'
import './style.css'

// Import core LEO Components for i18n support
import EntityMention from './components/LEO/EntityMention.vue'
import AuthorBio from './components/LEO/AuthorBio.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import SipRegistry from './components/SipRegistry.vue'

/**
 * Editorial scroll-entry motion (design/homepage-spike).
 *
 * Progressive enhancement: markup ships fully visible. Only when JS runs AND
 * the user has not requested reduced motion do we opt elements with the
 * `.home-reveal` class into a subtle translateY + opacity reveal, driven by
 * IntersectionObserver (never a scroll listener). Animates transform/opacity
 * only. If JS fails or motion is reduced, everything stays visible — no FOUC,
 * no hidden content. Runs client-side only.
 */
function initHomeReveal(): void {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const root = document.documentElement
  const targets = Array.from(document.querySelectorAll<HTMLElement>('.home-reveal:not(.is-visible)'))
  if (!targets.length) return

  if (prefersReduced) {
    // Respect the user preference: reveal immediately, no animation.
    targets.forEach((el) => el.classList.add('is-visible'))
    return
  }

  // Signal to CSS that JS-driven reveal is active (arms the hidden start state).
  root.classList.add('reveal-enabled')

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target)
        }
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )

  targets.forEach((el) => observer.observe(el))
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }: any) {
    // Register LEO components with i18n support
    app.component('EntityMention', EntityMention)
    app.component('AuthorBio', AuthorBio)
    app.component('LanguageSwitcher', LanguageSwitcher)
    app.component('SipRegistry', SipRegistry)

    // Wire up editorial scroll-reveal on every route (client only). The DOM
    // needs a tick to render after navigation, hence the rAF deferral.
    if (typeof window !== 'undefined' && router) {
      const schedule = () => window.requestAnimationFrame(() => initHomeReveal())
      const originalAfter = router.onAfterRouteChanged
      router.onAfterRouteChanged = (to: string) => {
        if (typeof originalAfter === 'function') originalAfter(to)
        schedule()
      }
      // Initial load (first paint after hydration).
      schedule()
    }
  }
}