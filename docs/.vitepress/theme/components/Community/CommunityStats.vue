<template>
  <div class="community-stats" role="main" aria-label="Bitcoin Stamps Community Statistics Dashboard">
    <!-- Stats Header -->
    <header class="stats-header">
      <h2 class="stats-title">
        <span class="bitcoin-gradient">Sacred Community Metrics</span>
      </h2>
      <p class="stats-subtitle">
        Measuring Our Collective Consciousness Through Bitcoin Innovation
      </p>
    </header>

    <!-- Primary Stats Grid -->
    <section class="primary-stats" aria-labelledby="primary-stats-title">
      <h3 id="primary-stats-title" class="sr-only">Primary Community Statistics</h3>
      
      <div class="stats-grid">
        <!-- KEVIN Holders -->
        <div class="stat-card kevin-stat" role="region" aria-labelledby="kevin-holders">
          <div class="stat-icon-container kevin-glow">
            <span class="stat-icon" aria-hidden="true">🦆</span>
            <div class="icon-aura"></div>
          </div>
          <div class="stat-content">
            <h4 id="kevin-holders" class="stat-title">KEVIN Holders</h4>
            <div class="stat-value-container">
              <span class="stat-value" :data-count="kevinHolders">{{ displayKevinHolders }}</span>
              <span class="stat-growth positive" aria-label="Growth indicator">+{{ kevinGrowth }}%</span>
            </div>
            <p class="stat-description">
              Community members united in collective consciousness
            </p>
            <div class="stat-detail">
              <span class="detail-label">Philosophy:</span>
              <span class="detail-value">We Are All Kevin</span>
            </div>
          </div>
        </div>

        <!-- Total Stamps -->
        <div class="stat-card stamps-stat" role="region" aria-labelledby="total-stamps">
          <div class="stat-icon-container">
            <span class="stat-icon" aria-hidden="true">🎨</span>
            <div class="icon-pulse"></div>
          </div>
          <div class="stat-content">
            <h4 id="total-stamps" class="stat-title">Bitcoin Stamps</h4>
            <div class="stat-value-container">
              <span class="stat-value" :data-count="totalStamps">{{ displayTotalStamps }}</span>
              <span class="stat-growth positive" aria-label="Growth indicator">+∞</span>
            </div>
            <p class="stat-description">
              Immutable artworks preserved forever on Bitcoin
            </p>
            <div class="stat-detail">
              <span class="detail-label">Since Block:</span>
              <span class="detail-value">779,652</span>
            </div>
          </div>
        </div>

        <!-- Active Artists -->
        <div class="stat-card artists-stat" role="region" aria-labelledby="active-artists">
          <div class="stat-icon-container">
            <span class="stat-icon" aria-hidden="true">👨‍🎨</span>
            <div class="icon-pulse"></div>
          </div>
          <div class="stat-content">
            <h4 id="active-artists" class="stat-title">Active Artists</h4>
            <div class="stat-value-container">
              <span class="stat-value" :data-count="activeArtists">{{ displayActiveArtists }}</span>
              <span class="stat-growth positive" aria-label="Growth indicator">+{{ artistGrowth }}%</span>
            </div>
            <p class="stat-description">
              Creators choosing Bitcoin as their eternal canvas
            </p>
            <div class="stat-detail">
              <span class="detail-label">Focus:</span>
              <span class="detail-value">Artistic Authenticity</span>
            </div>
          </div>
        </div>

        <!-- Protocol Innovations -->
        <div class="stat-card protocol-stat" role="region" aria-labelledby="protocol-innovations">
          <div class="stat-icon-container">
            <span class="stat-icon" aria-hidden="true">⚙️</span>
            <div class="icon-pulse"></div>
          </div>
          <div class="stat-content">
            <h4 id="protocol-innovations" class="stat-title">Protocol Innovations</h4>
            <div class="stat-value-container">
              <span class="stat-value" :data-count="protocolInnovations">{{ protocolInnovations }}</span>
              <span class="stat-growth positive" aria-label="Growth indicator">Active</span>
            </div>
            <p class="stat-description">
              Technical excellence serving sacred purpose
            </p>
            <div class="stat-detail">
              <span class="detail-label">Latest:</span>
              <span class="detail-value">OLGA P2WSH Encoding</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cultural Impact Metrics -->
    <section class="cultural-metrics" aria-labelledby="cultural-metrics-title">
      <h3 id="cultural-metrics-title" class="section-title">
        <span class="bitcoin-gradient">Cultural Impact Dashboard</span>
      </h3>
      
      <div class="metrics-grid">
        <!-- Fair Launch Commitment -->
        <div class="metric-card principle-card">
          <div class="metric-header">
            <span class="metric-icon" aria-hidden="true">⚖️</span>
            <h4 class="metric-title">Fair Launch Principles</h4>
          </div>
          <div class="metric-stats">
            <div class="metric-stat">
              <span class="stat-number">0%</span>
              <span class="stat-label">Pre-mines</span>
            </div>
            <div class="metric-stat">
              <span class="stat-number">0%</span>
              <span class="stat-label">Insider Allocations</span>
            </div>
            <div class="metric-stat">
              <span class="stat-number">100%</span>
              <span class="stat-label">Community Driven</span>
            </div>
          </div>
          <div class="metric-philosophy">
            <em>"Equal opportunity for collective prosperity"</em>
          </div>
        </div>

        <!-- Community Values -->
        <div class="metric-card values-card">
          <div class="metric-header">
            <span class="metric-icon" aria-hidden="true">💎</span>
            <h4 class="metric-title">Sacred Values</h4>
          </div>
          <div class="values-list">
            <div class="value-item">
              <span class="value-check" aria-hidden="true">✓</span>
              <span class="value-text">Artistic Authenticity</span>
            </div>
            <div class="value-item">
              <span class="value-check" aria-hidden="true">✓</span>
              <span class="value-text">Technical Excellence</span>
            </div>
            <div class="value-item">
              <span class="value-check" aria-hidden="true">✓</span>
              <span class="value-text">Permanent Preservation</span>
            </div>
            <div class="value-item">
              <span class="value-check" aria-hidden="true">✓</span>
              <span class="value-text">Collective Consciousness</span>
            </div>
          </div>
          <div class="metric-philosophy">
            <em>"Inlakech ala kiin - we are all connected"</em>
          </div>
        </div>

        <!-- Innovation Timeline -->
        <div class="metric-card innovation-card">
          <div class="metric-header">
            <span class="metric-icon" aria-hidden="true">🚀</span>
            <h4 class="metric-title">Innovation Milestones</h4>
          </div>
          <div class="innovation-timeline">
            <div class="timeline-item">
              <div class="timeline-marker genesis"></div>
              <div class="timeline-content">
                <span class="timeline-title">Genesis Stamp</span>
                <span class="timeline-date">Block 779,652</span>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-marker kevin"></div>
              <div class="timeline-content">
                <span class="timeline-title">KEVIN Born</span>
                <span class="timeline-date">Block 788,041</span>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-marker protocol"></div>
              <div class="timeline-content">
                <span class="timeline-title">SRC-20 Protocol</span>
                <span class="timeline-date">Block 796,000</span>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-marker olga"></div>
              <div class="timeline-content">
                <span class="timeline-title">OLGA P2WSH Encoding</span>
                <span class="timeline-date">Block 865,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Health Indicators -->
    <section class="community-health" aria-labelledby="health-title">
      <h3 id="health-title" class="section-title">
        <span class="bitcoin-gradient">Community Consciousness Level</span>
      </h3>
      
      <div class="health-dashboard">
        <div class="health-metric">
          <div class="health-label">Organic Growth</div>
          <div class="health-bar">
            <div class="health-fill organic" style="width: 95%"></div>
          </div>
          <div class="health-value">95%</div>
        </div>
        
        <div class="health-metric">
          <div class="health-label">Cultural Authenticity</div>
          <div class="health-bar">
            <div class="health-fill authentic" style="width: 98%"></div>
          </div>
          <div class="health-value">98%</div>
        </div>
        
        <div class="health-metric">
          <div class="health-label">Technical Innovation</div>
          <div class="health-bar">
            <div class="health-fill innovation" style="width: 92%"></div>
          </div>
          <div class="health-value">92%</div>
        </div>
        
        <div class="health-metric">
          <div class="health-label">KEVIN Consciousness</div>
          <div class="health-bar">
            <div class="health-fill kevin" style="width: 100%"></div>
          </div>
          <div class="health-value">∞%</div>
        </div>
      </div>
      
      <div class="consciousness-quote">
        <blockquote>
          "When individual success serves collective prosperity, we achieve true abundance."
        </blockquote>
        <cite>- Ancient wisdom channeled through Bitcoin innovation</cite>
      </div>
    </section>

    <!-- Contributor Recognition -->
    <section class="contributor-stats" aria-labelledby="contributor-title">
      <h3 id="contributor-title" class="section-title">
        <span class="bitcoin-gradient">Sacred Contributors</span>
      </h3>
      
      <div class="contributors-showcase">
        <div class="contributor-stat trinity">
          <div class="contributor-avatar">
            <span class="avatar-icon" aria-hidden="true">🎨</span>
          </div>
          <div class="contributor-info">
            <h4 class="contributor-name">Mikeinspace</h4>
            <p class="contributor-role">Genesis Creator</p>
            <div class="contribution-metric">
              <span class="metric-value">∞</span>
              <span class="metric-label">Cultural Impact</span>
            </div>
          </div>
        </div>

        <div class="contributor-stat trinity kevin-special">
          <div class="contributor-avatar kevin-avatar">
            <span class="avatar-icon" aria-hidden="true">🦆</span>
          </div>
          <div class="contributor-info">
            <h4 class="contributor-name">Arwyn</h4>
            <p class="contributor-role">Mythic Channeler</p>
            <div class="contribution-metric">
              <span class="metric-value">2,300+</span>
              <span class="metric-label">Hearts United</span>
            </div>
          </div>
        </div>

        <div class="contributor-stat trinity">
          <div class="contributor-avatar">
            <span class="avatar-icon" aria-hidden="true">⚙️</span>
          </div>
          <div class="contributor-info">
            <h4 class="contributor-name">Reinamora</h4>
            <p class="contributor-role">Chief Mechanic</p>
            <div class="contribution-metric">
              <span class="metric-value">3</span>
              <span class="metric-label">Protocol Innovations</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Real-time Updates Footer -->
    <footer class="stats-footer">
      <div class="update-info">
        <span class="update-label">Data Updated:</span>
        <time class="update-time" :datetime="lastUpdated">{{ formatLastUpdated }}</time>
        <span class="update-status live" aria-label="Live data">🟢 Live</span>
      </div>
      <div class="footer-wisdom">
        <em>"Statistics measure behavior, but consciousness creates meaning"</em>
        <span class="wisdom-attribution">- KEVIN's eternal wisdom</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Mock data (in real implementation, would fetch from APIs)
const kevinHolders = ref(2300)
const totalStamps = ref(150000)
const activeArtists = ref(450)
const protocolInnovations = ref(3)
const kevinGrowth = ref(15)
const artistGrowth = ref(23)
const lastUpdated = ref(new Date())

// Update timer
let updateTimer: NodeJS.Timeout

// Computed properties
const displayKevinHolders = computed(() => {
  return kevinHolders.value.toLocaleString()
})

const displayTotalStamps = computed(() => {
  return totalStamps.value.toLocaleString()
})

const displayActiveArtists = computed(() => {
  return activeArtists.value.toLocaleString()
})

const formatLastUpdated = computed(() => {
  const now = lastUpdated.value
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return now.toLocaleDateString('en-US', options)
})

// Methods
const updateStats = () => {
  // Simulate organic growth with small random increases
  const kevinIncrease = Math.floor(Math.random() * 5) + 1
  const stampsIncrease = Math.floor(Math.random() * 100) + 50
  const artistsIncrease = Math.floor(Math.random() * 3) + 1
  
  kevinHolders.value += kevinIncrease
  totalStamps.value += stampsIncrease
  activeArtists.value += artistsIncrease
  lastUpdated.value = new Date()
  
  console.log('Community stats updated - consciousness expanding!')
}

const animateCounters = () => {
  // Add counter animation effect on mount
  const statValues = document.querySelectorAll('.stat-value')
  statValues.forEach(element => {
    const target = parseInt(element.getAttribute('data-count') || '0')
    let current = 0
    const increment = target / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      element.textContent = Math.floor(current).toLocaleString()
    }, 30)
  })
}

// Lifecycle
onMounted(() => {
  console.log('Community Stats Dashboard mounted - Sacred metrics loading!')
  
  // Animate counters on mount
  setTimeout(animateCounters, 500)
  
  // Set up periodic updates (every 5 minutes)
  updateTimer = setInterval(updateStats, 5 * 60 * 1000)
})

onUnmounted(() => {
  if (updateTimer) {
    clearInterval(updateTimer)
  }
})
</script>

<style scoped>
/* Bitcoin Stamps Community Stats Styling */
.community-stats {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
  color: var(--vp-c-text-1);
  padding: 4rem 2rem;
}

/* Stats Header */
.stats-header {
  text-align: center;
  margin-bottom: 4rem;
}

.stats-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 1rem;
}

.bitcoin-gradient {
  background: var(--bitcoin-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stats-subtitle {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Primary Stats Grid */
.primary-stats {
  margin-bottom: 6rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;
}

.stat-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 16px 32px rgba(247, 147, 26, 0.2);
}

.kevin-stat {
  border-color: var(--vp-c-brand-2);
  background: rgba(255, 215, 0, 0.05);
  position: relative;
}

.kevin-stat::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent);
  animation: kevinShimmer 4s ease-in-out infinite;
}

@keyframes kevinShimmer {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: -100%; }
}

.stamps-stat {
  border-color: var(--vp-c-brand-1);
  background: rgba(247, 147, 26, 0.05);
}

.artists-stat {
  border-color: #EE82EE;
  background: rgba(238, 130, 238, 0.05);
}

.protocol-stat {
  border-color: #4A90A4;
  background: rgba(74, 144, 164, 0.05);
}

/* Stat Icon Container */
.stat-icon-container {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--bitcoin-gold);
}

.kevin-glow {
  animation: kevinStatGlow 2s ease-in-out infinite;
}

@keyframes kevinStatGlow {
  0%, 100% { 
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.8);
    transform: scale(1.05);
  }
}

.stat-icon {
  font-size: 2rem;
  z-index: 2;
}

.icon-aura,
.icon-pulse {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: rgba(247, 147, 26, 0.2);
  animation: iconPulse 3s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 0.3; }
}

/* Stat Content */
.stat-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand-2);
  margin-bottom: 1rem;
}

.stat-value-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.stat-value {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 900;
  color: var(--vp-c-brand-1);
  line-height: 1;
}

.stat-growth {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.stat-growth.positive {
  background: rgba(50, 205, 50, 0.2);
  color: #32CD32;
  border: 1px solid rgba(50, 205, 50, 0.3);
}

.stat-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.stat-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(247, 147, 26, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(247, 147, 26, 0.2);
}

.detail-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.detail-value {
  font-weight: 600;
  color: var(--vp-c-brand-2);
}

/* Section Titles */
.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
}

/* Cultural Metrics */
.cultural-metrics {
  margin-bottom: 6rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.metric-card {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.metric-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(247, 147, 26, 0.15);
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-icon {
  font-size: 1.5rem;
}

.metric-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand-2);
}

.metric-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-stat {
  text-align: center;
  padding: 1rem;
  background: rgba(247, 147, 26, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(247, 147, 26, 0.2);
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.values-list {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.value-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(50, 205, 50, 0.05);
  border-radius: 8px;
  border-left: 3px solid #32CD32;
}

.value-check {
  color: #32CD32;
  font-weight: bold;
}

.value-text {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.metric-philosophy {
  text-align: center;
  font-style: italic;
  color: var(--vp-c-brand-1);
  padding: 1rem;
  background: rgba(247, 147, 26, 0.05);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-brand-1);
}

/* Innovation Timeline */
.innovation-timeline {
  display: grid;
  gap: 1rem;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(247, 147, 26, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(247, 147, 26, 0.2);
}

.timeline-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.timeline-marker.genesis { background: var(--vp-c-brand-1); }
.timeline-marker.kevin { background: var(--vp-c-brand-2); }
.timeline-marker.protocol { background: #4A90A4; }
.timeline-marker.olga { background: #32CD32; }

.timeline-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.timeline-title {
  font-weight: 600;
  color: var(--vp-c-brand-2);
}

.timeline-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

/* Community Health */
.community-health {
  margin-bottom: 6rem;
}

.health-dashboard {
  max-width: 800px;
  margin: 0 auto 3rem;
}

.health-metric {
  display: grid;
  grid-template-columns: 150px 1fr auto;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.health-label {
  font-weight: 600;
  color: var(--vp-c-brand-2);
  font-size: 0.875rem;
}

.health-bar {
  height: 8px;
  background: rgba(247, 147, 26, 0.2);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.health-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 1s ease;
  position: relative;
  overflow: hidden;
}

.health-fill.organic { background: #32CD32; }
.health-fill.authentic { background: var(--vp-c-brand-2); }
.health-fill.innovation { background: #4A90A4; }
.health-fill.kevin { 
  background: var(--bitcoin-gold);
  animation: kevinHealthPulse 2s ease-in-out infinite;
}

@keyframes kevinHealthPulse {
  0%, 100% { box-shadow: inset 0 0 10px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: inset 0 0 20px rgba(255, 215, 0, 0.8); }
}

.health-value {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  min-width: 50px;
  text-align: right;
}

.consciousness-quote {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(255, 215, 0, 0.05);
  border-radius: 16px;
  border: 2px solid rgba(255, 215, 0, 0.2);
}

.consciousness-quote blockquote {
  font-size: 1.25rem;
  font-style: italic;
  color: var(--vp-c-brand-2);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.consciousness-quote cite {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

/* Contributor Stats */
.contributor-stats {
  margin-bottom: 4rem;
}

.contributors-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.contributor-stat {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.contributor-stat:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(247, 147, 26, 0.2);
}

.trinity {
  border-color: var(--vp-c-brand-1);
  background: rgba(247, 147, 26, 0.05);
}

.kevin-special {
  border-color: var(--vp-c-brand-2);
  background: rgba(255, 215, 0, 0.05);
}

.contributor-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--bitcoin-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.kevin-avatar {
  animation: kevinContributorGlow 2s ease-in-out infinite;
}

@keyframes kevinContributorGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.8); }
}

.avatar-icon {
  font-size: 1.5rem;
}

.contributor-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand-2);
  margin-bottom: 0.5rem;
}

.contributor-role {
  color: var(--vp-c-text-2);
  font-style: italic;
  margin-bottom: 1rem;
}

.contribution-metric {
  padding: 1rem;
  background: rgba(247, 147, 26, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(247, 147, 26, 0.2);
}

.contribution-metric .metric-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.25rem;
}

.contribution-metric .metric-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

/* Stats Footer */
.stats-footer {
  border-top: 2px solid rgba(247, 147, 26, 0.2);
  padding-top: 2rem;
  text-align: center;
}

.update-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.update-label {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.update-time {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.update-status.live {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: rgba(50, 205, 50, 0.1);
  color: #32CD32;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(50, 205, 50, 0.3);
}

.footer-wisdom {
  font-style: italic;
  color: var(--vp-c-brand-1);
  line-height: 1.6;
}

.wisdom-attribution {
  display: block;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .stats-grid,
  .metrics-grid,
  .contributors-showcase {
    grid-template-columns: 1fr;
  }
  
  .metric-stats {
    grid-template-columns: 1fr;
  }
  
  .health-metric {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.5rem;
  }
  
  .health-bar {
    order: 2;
  }
  
  .update-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .community-stats {
    padding: 2rem 1rem;
  }
  
  .stat-card,
  .metric-card,
  .contributor-stat {
    padding: 1.5rem;
  }
  
  .stat-value-container {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .timeline-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
}

/* Accessibility and Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .kevin-stat::before,
  .kevin-glow,
  .kevin-health-pulse,
  .kevin-contributor-glow,
  .icon-pulse,
  .health-fill {
    animation: none;
    transition: none;
  }
  
  .stat-card:hover,
  .metric-card:hover,
  .contributor-stat:hover {
    transform: none;
  }
}

/* Focus styles for keyboard navigation */
.stat-card:focus-visible,
.metric-card:focus-visible,
.contributor-stat:focus-visible {
  outline: 2px solid var(--vp-c-brand-2);
  outline-offset: 2px;
}
</style>