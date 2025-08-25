<template>
  <div class="community-gallery" role="main" aria-label="Bitcoin Stamps Community Gallery">
    <!-- Hero Section with KEVIN-inspired design -->
    <section class="gallery-hero" aria-labelledby="gallery-title">
      <div class="hero-content">
        <h1 id="gallery-title" class="hero-title">
          <span class="kevin-glow">WE ARE ALL KEVIN</span>
          <span class="community-subtitle">Sacred Community Showcase</span>
        </h1>
        <p class="hero-description">
          Celebrating the artists, builders, and visionaries who embody the spirit of 
          <em>inlakech ala kiin</em> - "I am you and you are me"
        </p>
        <div class="kevin-stats" role="contentinfo" aria-label="Community Statistics">
          <div class="stat-card">
            <span class="stat-number">2,300+</span>
            <span class="stat-label">KEVIN Holders</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">∞</span>
            <span class="stat-label">Stamps on Bitcoin</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">Sacred</span>
            <span class="stat-label">Purpose</span>
          </div>
        </div>
      </div>
      <div class="kevin-mascot" aria-hidden="true">
        <div class="kevin-aura"></div>
        <div class="kevin-symbol">🦆</div>
      </div>
    </section>

    <!-- Featured Contributors Section -->
    <section class="featured-contributors" aria-labelledby="contributors-title">
      <h2 id="contributors-title" class="section-title">
        <span class="bitcoin-gradient">The Original Trinity & Beyond</span>
      </h2>
      
      <div class="contributors-grid" role="list">
        <!-- Original Trinity -->
        <div class="contributor-card trinity-card" role="listitem" tabindex="0" 
             @keydown="handleCardNavigation" @click="focusContributor('mikeinspace')">
          <div class="card-header">
            <div class="contributor-avatar">
              <span class="avatar-icon">🎨</span>
            </div>
            <div class="contributor-info">
              <h3 class="contributor-name">Mikeinspace</h3>
              <p class="contributor-role">The Innovator</p>
              <p class="contributor-significance">First Bitcoin Stamp • Block 779,652</p>
            </div>
          </div>
          <div class="card-content">
            <p class="contributor-bio">
              The visionary who birthed Bitcoin Stamps into existence, proving that Bitcoin 
              could be more than digital gold - it could be an eternal canvas.
            </p>
            <div class="achievement-badges">
              <span class="badge genesis">Genesis Creator</span>
              <span class="badge innovation">Protocol Pioneer</span>
            </div>
          </div>
        </div>

        <div class="contributor-card trinity-card kevin-special" role="listitem" tabindex="0"
             @keydown="handleCardNavigation" @click="focusContributor('arwyn')">
          <div class="card-header">
            <div class="contributor-avatar kevin-avatar">
              <span class="avatar-icon">🦆</span>
            </div>
            <div class="contributor-info">
              <h3 class="contributor-name">Arwyn</h3>
              <p class="contributor-role">The Mythic Channeler</p>
              <p class="contributor-significance">KEVIN Creator • Block 788,041</p>
            </div>
          </div>
          <div class="card-content">
            <p class="contributor-bio">
              Channeled the sacred essence of KEVIN into being, unknowingly creating 
              the spiritual mascot that would unite our community in collective consciousness.
            </p>
            <div class="achievement-badges">
              <span class="badge mythic">Mythic Creator</span>
              <span class="badge sacred">Sacred Channeler</span>
              <span class="badge community">Community Catalyst</span>
            </div>
          </div>
        </div>

        <div class="contributor-card trinity-card" role="listitem" tabindex="0"
             @keydown="handleCardNavigation" @click="focusContributor('reinamora')">
          <div class="card-header">
            <div class="contributor-avatar">
              <span class="avatar-icon">⚙️</span>
            </div>
            <div class="contributor-info">
              <h3 class="contributor-name">Reinamora</h3>
              <p class="contributor-role">The Chief Mechanic</p>
              <p class="contributor-significance">SRC-20 & OLGA Architect</p>
            </div>
          </div>
          <div class="card-content">
            <p class="contributor-bio">
              Technical excellence serving sacred purpose. Architect of SRC-20 protocol 
              and OLGA P2WSH encoding, democratizing access for all community members.
            </p>
            <div class="achievement-badges">
              <span class="badge technical">Technical Architect</span>
              <span class="badge democratic">Access Democratizer</span>
            </div>
          </div>
        </div>

        <!-- Community Builders -->
        <div class="contributor-card community-card" role="listitem" tabindex="0"
             @keydown="handleCardNavigation">
          <div class="card-header">
            <div class="contributor-avatar">
              <span class="avatar-icon">🌟</span>
            </div>
            <div class="contributor-info">
              <h3 class="contributor-name">Community Builders</h3>
              <p class="contributor-role">The Cultural Keepers</p>
              <p class="contributor-significance">Preserving Sacred Values</p>
            </div>
          </div>
          <div class="card-content">
            <p class="contributor-bio">
              Every community member who embodies "we are all Kevin" in their daily 
              interactions, preserving our values and welcoming new creators.
            </p>
            <div class="achievement-badges">
              <span class="badge cultural">Cultural Keeper</span>
              <span class="badge welcoming">Community Guide</span>
            </div>
          </div>
        </div>

        <div class="contributor-card community-card" role="listitem" tabindex="0"
             @keydown="handleCardNavigation">
          <div class="card-header">
            <div class="contributor-avatar">
              <span class="avatar-icon">🎭</span>
            </div>
            <div class="contributor-info">
              <h3 class="contributor-name">Stamp Artists</h3>
              <p class="contributor-role">The Creative Souls</p>
              <p class="contributor-significance">Eternal Expression</p>
            </div>
          </div>
          <div class="card-content">
            <p class="contributor-bio">
              Artists who chose Bitcoin as their eternal canvas, creating immutable 
              beauty that will inspire future generations long after we're gone.
            </p>
            <div class="achievement-badges">
              <span class="badge artistic">Creative Pioneer</span>
              <span class="badge eternal">Forever Preserved</span>
            </div>
          </div>
        </div>

        <div class="contributor-card community-card" role="listitem" tabindex="0"
             @keydown="handleCardNavigation">
          <div class="card-header">
            <div class="contributor-avatar">
              <span class="avatar-icon">🛠️</span>
            </div>
            <div class="contributor-info">
              <h3 class="contributor-name">Tool Builders</h3>
              <p class="contributor-role">The Empowerment Engineers</p>
              <p class="contributor-significance">Democratizing Creation</p>
            </div>
          </div>
          <div class="card-content">
            <p class="contributor-bio">
              Developers who build tools that make Bitcoin Stamps accessible to 
              everyone, regardless of technical background or resources.
            </p>
            <div class="achievement-badges">
              <span class="badge builder">Tool Creator</span>
              <span class="badge accessible">Access Enabler</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Values in Action -->
    <section class="values-showcase" aria-labelledby="values-title">
      <h2 id="values-title" class="section-title">
        <span class="bitcoin-gradient">Sacred Values in Living Practice</span>
      </h2>
      
      <div class="values-grid" role="list">
        <div class="value-card" role="listitem">
          <div class="value-icon" aria-hidden="true">🎨</div>
          <h3 class="value-title">Artistic Authenticity</h3>
          <p class="value-description">
            Over speculation. We celebrate creators for their vision, 
            not their market performance.
          </p>
          <div class="value-example">
            "Every stamp tells a story worth preserving forever"
          </div>
        </div>

        <div class="value-card" role="listitem">
          <div class="value-icon" aria-hidden="true">⚖️</div>
          <h3 class="value-title">Fair Launch Principles</h3>
          <p class="value-description">
            No pre-mines, no insider allocations. Everyone starts from 
            the same sacred ground.
          </p>
          <div class="value-example">
            "KEVIN: 0% pre-mine, 100% community spirit"
          </div>
        </div>

        <div class="value-card" role="listitem">
          <div class="value-icon" aria-hidden="true">🌱</div>
          <h3 class="value-title">Organic Growth</h3>
          <p class="value-description">
            Community-first growth over hype cycles. 2,300+ holders 
            through authentic engagement.
          </p>
          <div class="value-example">
            "Growing through values, not marketing gimmicks"
          </div>
        </div>

        <div class="value-card" role="listitem">
          <div class="value-icon" aria-hidden="true">🔧</div>
          <h3 class="value-title">Sacred Technical Excellence</h3>
          <p class="value-description">
            Technical innovation serving higher purpose, making 
            complex technology accessible to all.
          </p>
          <div class="value-example">
            "Code that empowers, tools that democratize"
          </div>
        </div>

        <div class="value-card" role="listitem">
          <div class="value-icon" aria-hidden="true">♾️</div>
          <h3 class="value-title">Permanence & Preservation</h3>
          <p class="value-description">
            Cultural heritage deserves eternal preservation on 
            Bitcoin's immutable foundation.
          </p>
          <div class="value-example">
            "Today's creativity inspiring future generations"
          </div>
        </div>

        <div class="value-card kevin-wisdom" role="listitem">
          <div class="value-icon" aria-hidden="true">🦆</div>
          <h3 class="value-title">Inlakech Ala Kiin</h3>
          <p class="value-description">
            "I am you and you are me" - Ancient Mayan wisdom 
            guiding modern innovation.
          </p>
          <div class="value-example">
            "We are all Kevin - collective consciousness in action"
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="community-cta" aria-labelledby="cta-title">
      <div class="cta-content">
        <h2 id="cta-title" class="cta-title">
          <span class="kevin-glow">Join Our Sacred Community</span>
        </h2>
        <p class="cta-description">
          Every creator, builder, and dreamer has a place in our collective consciousness. 
          Bring your authentic self and help us build something eternal.
        </p>
        <div class="cta-actions">
          <button class="cta-button primary" @click="navigateToGettingStarted" 
                  aria-label="Get started with Bitcoin Stamps">
            Start Your Journey
          </button>
          <button class="cta-button secondary" @click="navigateToProtocols"
                  aria-label="Learn about Bitcoin Stamps protocols">
            Explore Protocols
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Component state
const focusedContributor = ref<string>('')

// Methods
const handleCardNavigation = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    const target = event.currentTarget as HTMLElement
    target.click()
  }
}

const focusContributor = (contributorId: string) => {
  focusedContributor.value = contributorId
  // Could emit event or navigate to detailed view
  console.log(`Focusing on contributor: ${contributorId}`)
}

const navigateToGettingStarted = () => {
  window.location.href = '/getting-started'
}

const navigateToProtocols = () => {
  window.location.href = '/protocols'
}

// Lifecycle
onMounted(() => {
  // Add any initialization needed
  console.log('Community Gallery mounted - We are all Kevin!')
})
</script>

<style scoped>
/* Bitcoin Stamps Community Gallery Styling */
.community-gallery {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
  color: var(--vp-c-text-1);
  padding: 0;
  overflow-x: hidden;
}

/* Hero Section */
.gallery-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60vh;
  padding: 4rem 2rem;
  background: radial-gradient(circle at center, rgba(247, 147, 26, 0.1) 0%, transparent 70%);
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.kevin-glow {
  background: var(--bitcoin-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(247, 147, 26, 0.5);
  animation: kevinPulse 3s ease-in-out infinite;
}

@keyframes kevinPulse {
  0%, 100% { filter: brightness(1) saturate(1); }
  50% { filter: brightness(1.2) saturate(1.3); }
}

.community-subtitle {
  font-size: 0.6em;
  color: var(--vp-c-text-2);
  font-weight: 400;
  font-style: italic;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-description em {
  color: var(--vp-c-brand-2);
  font-style: italic;
  font-weight: 600;
}

/* KEVIN Stats */
.kevin-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: rgba(247, 147, 26, 0.1);
  border: 2px solid rgba(247, 147, 26, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--vp-c-brand-2);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-align: center;
}

/* KEVIN Mascot */
.kevin-mascot {
  position: relative;
  width: 200px;
  height: 200px;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kevin-aura {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(247, 147, 26, 0.3) 0%, transparent 70%);
  animation: kevinAura 4s ease-in-out infinite;
}

@keyframes kevinAura {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.7; }
  50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
}

.kevin-symbol {
  font-size: 4rem;
  z-index: 2;
  animation: kevinFloat 2s ease-in-out infinite;
}

@keyframes kevinFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Section Styling */
.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin: 4rem 0 2rem;
}

.bitcoin-gradient {
  background: var(--bitcoin-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Contributors Section */
.featured-contributors {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contributors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.contributor-card {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.contributor-card:hover,
.contributor-card:focus {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(247, 147, 26, 0.2);
  outline: none;
}

.trinity-card {
  border-color: var(--vp-c-brand-1);
  background: rgba(247, 147, 26, 0.05);
}

.kevin-special {
  border-color: var(--vp-c-brand-2);
  background: rgba(255, 215, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.kevin-special::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
  animation: kevinShimmer 3s ease-in-out infinite;
}

@keyframes kevinShimmer {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: -100%; }
}

.card-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contributor-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--bitcoin-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kevin-avatar {
  background: var(--bitcoin-gold);
  animation: kevinGlow 2s ease-in-out infinite;
}

@keyframes kevinGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(247, 147, 26, 0.5); }
  50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.8); }
}

.avatar-icon {
  font-size: 1.5rem;
}

.contributor-info h3 {
  margin: 0 0 0.25rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand-2);
}

.contributor-role {
  margin: 0 0 0.5rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.contributor-significance {
  margin: 0;
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
  font-weight: 500;
}

.contributor-bio {
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.achievement-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.genesis { background: rgba(247, 147, 26, 0.2); color: var(--vp-c-brand-1); }
.badge.innovation { background: rgba(255, 215, 0, 0.2); color: var(--vp-c-brand-2); }
.badge.mythic { background: rgba(138, 43, 226, 0.2); color: #BA55D3; }
.badge.sacred { background: rgba(255, 215, 0, 0.3); color: var(--vp-c-brand-2); }
.badge.community { background: rgba(50, 205, 50, 0.2); color: #32CD32; }
.badge.technical { background: rgba(74, 144, 164, 0.2); color: #4A90A4; }
.badge.democratic { background: rgba(0, 191, 255, 0.2); color: #00BFFF; }
.badge.cultural { background: rgba(255, 69, 0, 0.2); color: #FF4500; }
.badge.welcoming { background: rgba(152, 251, 152, 0.2); color: #98FB98; }
.badge.artistic { background: rgba(238, 130, 238, 0.2); color: #EE82EE; }
.badge.eternal { background: rgba(255, 215, 0, 0.2); color: var(--vp-c-brand-2); }
.badge.builder { background: rgba(169, 169, 169, 0.2); color: #A9A9A9; }
.badge.accessible { background: rgba(0, 255, 127, 0.2); color: #00FF7F; }

/* Values Showcase */
.values-showcase {
  padding: 4rem 2rem;
  background: rgba(255, 215, 0, 0.02);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.value-card {
  background: rgba(26, 26, 26, 0.6);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.value-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(247, 147, 26, 0.15);
}

.kevin-wisdom {
  border-color: var(--vp-c-brand-2);
  background: rgba(255, 215, 0, 0.05);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.value-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-2);
}

.value-description {
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.value-example {
  font-style: italic;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  border-left: 3px solid var(--vp-c-brand-1);
  padding-left: 1rem;
  margin-top: 1rem;
}

/* Call to Action */
.community-cta {
  padding: 4rem 2rem;
  text-align: center;
  background: radial-gradient(circle, rgba(247, 147, 26, 0.1) 0%, transparent 70%);
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.cta-description {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.cta-button.primary {
  background: var(--bitcoin-gold);
  color: #1a1a1a;
}

.cta-button.primary:hover {
  background: linear-gradient(135deg, #E67E00 0%, #FFD700 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(247, 147, 26, 0.3);
}

.cta-button.secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-brand-1);
}

.cta-button.secondary:hover {
  background: rgba(247, 147, 26, 0.1);
  border-color: var(--vp-c-brand-2);
  color: var(--vp-c-brand-2);
}

/* Responsive Design */
@media (max-width: 768px) {
  .gallery-hero {
    flex-direction: column;
    text-align: center;
    padding: 2rem 1rem;
  }

  .kevin-mascot {
    margin: 2rem 0 0 0;
    width: 120px;
    height: 120px;
  }

  .contributors-grid {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .cta-button {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .contributor-card,
  .value-card {
    padding: 1.5rem;
  }

  .featured-contributors,
  .values-showcase,
  .community-cta {
    padding: 2rem 1rem;
  }
}

/* Accessibility Enhancements */
@media (prefers-reduced-motion: reduce) {
  .kevin-glow,
  .kevin-aura,
  .kevin-symbol,
  .kevin-special::before {
    animation: none;
  }
  
  .contributor-card:hover,
  .value-card:hover,
  .cta-button:hover {
    transform: none;
  }
}

/* Focus styles for keyboard navigation */
.contributor-card:focus-visible,
.value-card:focus-visible,
.cta-button:focus-visible {
  outline: 2px solid var(--vp-c-brand-2);
  outline-offset: 2px;
}
</style>