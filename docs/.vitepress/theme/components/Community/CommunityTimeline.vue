<template>
  <div class="community-timeline" role="main" aria-label="Bitcoin Stamps Historical Timeline">
    <!-- Timeline Header -->
    <header class="timeline-header">
      <h2 class="timeline-title">
        <span class="bitcoin-gradient">The Sacred Journey</span>
      </h2>
      <p class="timeline-subtitle">
        From Genesis Block to Collective Consciousness - The Evolution of Bitcoin Stamps
      </p>
    </header>

    <!-- Interactive Timeline -->
    <div class="timeline-container" role="region" aria-label="Interactive timeline of Bitcoin Stamps milestones">
      <div class="timeline-track" aria-hidden="true">
        <div class="timeline-progress" :style="{ width: progressWidth }"></div>
      </div>

      <!-- Timeline Events -->
      <div class="timeline-events">
        <!-- Genesis: First Bitcoin Stamp -->
        <div 
          class="timeline-event genesis-event"
          :class="{ active: activeEvent === 'genesis' }"
          @click="setActiveEvent('genesis')"
          @keydown="handleEventKeydown($event, 'genesis')"
          tabindex="0"
          role="button"
          aria-expanded="false"
          :aria-expanded="activeEvent === 'genesis'"
        >
          <div class="event-marker genesis-marker">
            <span class="event-icon" aria-hidden="true">🎨</span>
            <div class="marker-pulse"></div>
          </div>
          <div class="event-content">
            <div class="event-header">
              <h3 class="event-title">Genesis Stamp</h3>
              <p class="event-block">Block 779,652</p>
              <time class="event-date">March 8, 2023</time>
            </div>
            <div class="event-details" v-show="activeEvent === 'genesis'">
              <p class="event-description">
                <strong>Mikeinspace</strong> creates the first Bitcoin Stamp, proving that Bitcoin 
                could serve as an eternal canvas for artistic expression. This moment marks 
                the birth of immutable art storage directly on the Bitcoin blockchain.
              </p>
              <div class="event-stats">
                <div class="stat">
                  <span class="stat-label">Cultural Impact</span>
                  <span class="stat-value">Protocol Pioneer</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Innovation</span>
                  <span class="stat-value">First Immutable Art</span>
                </div>
              </div>
              <div class="cultural-significance">
                <h4>Sacred Foundation</h4>
                <p>
                  This Genesis moment established the principle that Bitcoin could serve 
                  purposes beyond currency - it could preserve human creativity for eternity.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- KEVIN's Birth -->
        <div 
          class="timeline-event kevin-event"
          :class="{ active: activeEvent === 'kevin' }"
          @click="setActiveEvent('kevin')"
          @keydown="handleEventKeydown($event, 'kevin')"
          tabindex="0"
          role="button"
          aria-expanded="false"
          :aria-expanded="activeEvent === 'kevin'"
        >
          <div class="event-marker kevin-marker">
            <span class="event-icon" aria-hidden="true">🦆</span>
            <div class="marker-pulse kevin-pulse"></div>
          </div>
          <div class="event-content">
            <div class="event-header">
              <h3 class="event-title">KEVIN's Sacred Birth</h3>
              <p class="event-block">Block 788,041</p>
              <time class="event-date">May 2023</time>
            </div>
            <div class="event-details" v-show="activeEvent === 'kevin'">
              <p class="event-description">
                <strong>Arwyn</strong> channels the mythical essence of KEVIN into being. 
                What began as creative expression became the spiritual mascot uniting 
                our community in collective consciousness - "we are all Kevin."
              </p>
              <div class="event-stats">
                <div class="stat">
                  <span class="stat-label">Holders</span>
                  <span class="stat-value">2,300+</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Philosophy</span>
                  <span class="stat-value">Inlakech Ala Kiin</span>
                </div>
              </div>
              <div class="cultural-significance kevin-wisdom">
                <h4>Mythical Awakening</h4>
                <p>
                  KEVIN's emergence marked the transformation from individual creativity 
                  to collective consciousness. The community organically adopted 
                  "we are all Kevin" as lived philosophy, not just a meme.
                </p>
                <blockquote class="kevin-quote">
                  "What would KEVIN do?" became our decision-making framework, 
                  always choosing collective benefit over individual gain.
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <!-- SRC-20 Protocol Birth -->
        <div 
          class="timeline-event protocol-event"
          :class="{ active: activeEvent === 'src20' }"
          @click="setActiveEvent('src20')"
          @keydown="handleEventKeydown($event, 'src20')"
          tabindex="0"
          role="button"
          aria-expanded="false"
          :aria-expanded="activeEvent === 'src20'"
        >
          <div class="event-marker protocol-marker">
            <span class="event-icon" aria-hidden="true">⚙️</span>
            <div class="marker-pulse protocol-pulse"></div>
          </div>
          <div class="event-content">
            <div class="event-header">
              <h3 class="event-title">SRC-20 Protocol</h3>
              <p class="event-block">Block 796,000</p>
              <time class="event-date">June 2023</time>
            </div>
            <div class="event-details" v-show="activeEvent === 'src20'">
              <p class="event-description">
                <strong>Reinamora</strong>, our Chief Mechanic, architects the SRC-20 protocol. 
                Technical excellence serving sacred purpose - democratizing access to 
                Bitcoin-based token creation for all community members.
              </p>
              <div class="event-stats">
                <div class="stat">
                  <span class="stat-label">Innovation</span>
                  <span class="stat-value">Fungible Tokens on Bitcoin</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Access</span>
                  <span class="stat-value">Democratized</span>
                </div>
              </div>
              <div class="cultural-significance">
                <h4>Technical Sacred Purpose</h4>
                <p>
                  SRC-20 embodies our value of technical excellence serving higher purpose. 
                  Complex blockchain technology made accessible, empowering creators 
                  regardless of technical background.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- OLGA P2WSH Encoding -->
        <div 
          class="timeline-event olga-event"
          :class="{ active: activeEvent === 'olga' }"
          @click="setActiveEvent('olga')"
          @keydown="handleEventKeydown($event, 'olga')"
          tabindex="0"
          role="button"
          aria-expanded="false"
          :aria-expanded="activeEvent === 'olga'"
        >
          <div class="event-marker olga-marker">
            <span class="event-icon" aria-hidden="true">🗜️</span>
            <div class="marker-pulse olga-pulse"></div>
          </div>
          <div class="event-content">
            <div class="event-header">
              <h3 class="event-title">OLGA P2WSH Encoding</h3>
              <p class="event-block">Block 865,000</p>
              <time class="event-date">November 2024</time>
            </div>
            <div class="event-details" v-show="activeEvent === 'olga'">
              <p class="event-description">
                <strong>Reinamora</strong> continues pushing boundaries with OLGA P2WSH encoding, 
                making Bitcoin Stamps even more accessible by reducing costs while 
                maintaining the sacred principle of permanence.
              </p>
              <div class="event-stats">
                <div class="stat">
                  <span class="stat-label">Efficiency</span>
                  <span class="stat-value">10x Compression</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Accessibility</span>
                  <span class="stat-value">Lower Barriers</span>
                </div>
              </div>
              <div class="cultural-significance">
                <h4>Democratization Continues</h4>
                <p>
                  OLGA represents our commitment to continuous improvement in service 
                  of community values. Better tools, lower barriers, equal access for all.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Future Vision -->
        <div 
          class="timeline-event future-event"
          :class="{ active: activeEvent === 'future' }"
          @click="setActiveEvent('future')"
          @keydown="handleEventKeydown($event, 'future')"
          tabindex="0"
          role="button"
          aria-expanded="false"
          :aria-expanded="activeEvent === 'future'"
        >
          <div class="event-marker future-marker">
            <span class="event-icon" aria-hidden="true">🌟</span>
            <div class="marker-pulse future-pulse"></div>
          </div>
          <div class="event-content">
            <div class="event-header">
              <h3 class="event-title">Infinite Possibilities</h3>
              <p class="event-block">Block ∞</p>
              <time class="event-date">Eternal Future</time>
            </div>
            <div class="event-details" v-show="activeEvent === 'future'">
              <p class="event-description">
                The journey continues. Guided by KEVIN's wisdom and the principle of 
                <em>inlakech ala kiin</em>, our community will keep innovating, creating, 
                and preserving human expression for future generations.
              </p>
              <div class="event-stats">
                <div class="stat">
                  <span class="stat-label">Vision</span>
                  <span class="stat-value">Eternal Canvas</span>
                </div>
                <div class="stat">
                  <span class="stat-label">Community</span>
                  <span class="stat-value">Ever Growing</span>
                </div>
              </div>
              <div class="cultural-significance future-vision">
                <h4>Sacred Continuity</h4>
                <p>
                  Every block brings new opportunities to manifest our values through 
                  technology. We are all Kevin, and the sacred journey continues forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline Navigation -->
    <div class="timeline-nav" role="navigation" aria-label="Timeline navigation">
      <button 
        v-for="event in events" 
        :key="event.id"
        class="nav-button"
        :class="{ active: activeEvent === event.id }"
        @click="setActiveEvent(event.id)"
        :aria-label="`Navigate to ${event.title}`"
      >
        <span class="nav-icon">{{ event.icon }}</span>
        <span class="nav-label">{{ event.shortTitle }}</span>
      </button>
    </div>

    <!-- KEVIN Wisdom Section -->
    <section class="kevin-wisdom-section" aria-labelledby="wisdom-title">
      <h3 id="wisdom-title" class="wisdom-title">
        <span class="kevin-glow">KEVIN's Eternal Wisdom</span>
      </h3>
      <div class="wisdom-content">
        <div class="wisdom-quote">
          <blockquote>
            "The blockchain remembers all things, but only love creates meaning."
          </blockquote>
          <cite>- As channeled through the Bitcoin Stamps community</cite>
        </div>
        <div class="wisdom-principles">
          <div class="principle">
            <strong>Inlakech Ala Kiin:</strong> I am you and you are me
          </div>
          <div class="principle">
            <strong>Permanence:</strong> Today's creativity for tomorrow's inspiration  
          </div>
          <div class="principle">
            <strong>Authenticity:</strong> Art over speculation, always
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Timeline events data
const events = [
  { 
    id: 'genesis', 
    title: 'Genesis Stamp', 
    shortTitle: 'Genesis', 
    icon: '🎨',
    block: 779652,
    date: '2023-03-08'
  },
  { 
    id: 'kevin', 
    title: 'KEVIN\'s Sacred Birth', 
    shortTitle: 'KEVIN', 
    icon: '🦆',
    block: 788041,
    date: '2023-05-01'
  },
  { 
    id: 'src20', 
    title: 'SRC-20 Protocol', 
    shortTitle: 'SRC-20', 
    icon: '⚙️',
    block: 796000,
    date: '2023-06-01'
  },
  { 
    id: 'olga', 
    title: 'OLGA P2WSH Encoding', 
    shortTitle: 'OLGA', 
    icon: '🗜️',
    block: 865000,
    date: '2024-11-01'
  },
  { 
    id: 'future', 
    title: 'Infinite Possibilities', 
    shortTitle: 'Future', 
    icon: '🌟',
    block: Infinity,
    date: 'eternal'
  }
]

// Component state
const activeEvent = ref('kevin') // Start with KEVIN highlighted

// Computed properties
const progressWidth = computed(() => {
  const currentIndex = events.findIndex(event => event.id === activeEvent.value)
  const totalEvents = events.length - 1 // Don't count future event for progress
  const progress = Math.min(currentIndex / totalEvents, 1) * 100
  return `${progress}%`
})

// Methods
const setActiveEvent = (eventId: string) => {
  activeEvent.value = eventId
  
  // Announce the change for screen readers
  const event = events.find(e => e.id === eventId)
  if (event) {
    const announcement = `Now viewing: ${event.title}`
    announceToScreenReader(announcement)
  }
}

const handleEventKeydown = (event: KeyboardEvent, eventId: string) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    setActiveEvent(eventId)
  }
}

const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', 'polite')
  announcement.setAttribute('aria-atomic', 'true')
  announcement.className = 'sr-only'
  announcement.textContent = message
  document.body.appendChild(announcement)
  
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Lifecycle
onMounted(() => {
  console.log('Community Timeline mounted - Sacred journey begins!')
})
</script>

<style scoped>
/* Bitcoin Stamps Community Timeline Styling */
.community-timeline {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
  color: var(--vp-c-text-1);
  padding: 4rem 2rem;
}

/* Timeline Header */
.timeline-header {
  text-align: center;
  margin-bottom: 4rem;
}

.timeline-title {
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

.timeline-subtitle {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Timeline Container */
.timeline-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto 4rem;
}

.timeline-track {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(247, 147, 26, 0.2);
  border-radius: 2px;
  z-index: 1;
}

.timeline-progress {
  height: 100%;
  background: var(--bitcoin-gold);
  border-radius: 2px;
  transition: width 0.8s ease;
  box-shadow: 0 0 10px rgba(247, 147, 26, 0.5);
}

/* Timeline Events */
.timeline-events {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.timeline-event {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.timeline-event:hover,
.timeline-event:focus {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(247, 147, 26, 0.2);
  outline: none;
}

.timeline-event.active {
  border-color: var(--vp-c-brand-2);
  background: rgba(247, 147, 26, 0.08);
  transform: scale(1.02);
  box-shadow: 0 16px 32px rgba(247, 147, 26, 0.3);
}

/* Special Event Styling */
.genesis-event.active {
  border-color: var(--vp-c-brand-1);
  background: rgba(247, 147, 26, 0.08);
}

.kevin-event {
  border-color: var(--vp-c-brand-2);
  background: rgba(255, 215, 0, 0.05);
}

.kevin-event.active {
  border-color: var(--vp-c-brand-2);
  background: rgba(255, 215, 0, 0.1);
  box-shadow: 0 16px 32px rgba(255, 215, 0, 0.3);
}

.protocol-event.active {
  border-color: #4A90A4;
  background: rgba(74, 144, 164, 0.08);
}

.olga-event.active {
  border-color: #32CD32;
  background: rgba(50, 205, 50, 0.08);
}

.future-event {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.02);
}

.future-event.active {
  border-color: #9370DB;
  background: rgba(147, 112, 219, 0.08);
}

/* Event Markers */
.event-marker {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--bitcoin-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  z-index: 3;
}

.kevin-marker {
  background: var(--bitcoin-gold);
  animation: kevinGlow 2s ease-in-out infinite;
}

@keyframes kevinGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.8); }
}

.protocol-marker {
  background: linear-gradient(135deg, #4A90A4 0%, #74B9CC 100%);
}

.olga-marker {
  background: linear-gradient(135deg, #32CD32 0%, #90EE90 100%);
}

.future-marker {
  background: linear-gradient(135deg, #9370DB 0%, #DDA0DD 100%);
}

.event-icon {
  font-size: 1.5rem;
  z-index: 2;
}

.marker-pulse {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: rgba(247, 147, 26, 0.3);
  animation: pulse 2s ease-in-out infinite;
}

.kevin-pulse {
  background: rgba(255, 215, 0, 0.3);
}

.protocol-pulse {
  background: rgba(74, 144, 164, 0.3);
}

.olga-pulse {
  background: rgba(50, 205, 50, 0.3);
}

.future-pulse {
  background: rgba(147, 112, 219, 0.3);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 0.3; }
}

/* Event Content */
.event-header {
  text-align: center;
  margin-bottom: 1rem;
}

.event-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-2);
  margin-bottom: 0.5rem;
}

.event-block {
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.event-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

.event-details {
  border-top: 1px solid rgba(247, 147, 26, 0.2);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.event-description {
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.event-description strong {
  color: var(--vp-c-brand-2);
}

.event-description em {
  color: var(--vp-c-brand-1);
  font-style: italic;
}

/* Event Stats */
.event-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat {
  text-align: center;
  padding: 1rem;
  background: rgba(247, 147, 26, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(247, 147, 26, 0.2);
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.stat-value {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand-2);
}

/* Cultural Significance */
.cultural-significance {
  background: rgba(255, 215, 0, 0.05);
  border-left: 4px solid var(--vp-c-brand-2);
  padding: 1.5rem;
  border-radius: 0 8px 8px 0;
  margin-top: 1rem;
}

.cultural-significance h4 {
  color: var(--vp-c-brand-2);
  font-weight: 600;
  margin-bottom: 0.75rem;
  font-size: 1rem;
}

.cultural-significance p {
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin-bottom: 0;
}

.kevin-wisdom {
  border-left-color: var(--vp-c-brand-2);
  background: rgba(255, 215, 0, 0.08);
}

.kevin-quote {
  font-style: italic;
  color: var(--vp-c-brand-1);
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(247, 147, 26, 0.05);
  border-radius: 8px;
  border-left: 3px solid var(--vp-c-brand-1);
}

.future-vision {
  border-left-color: #9370DB;
  background: rgba(147, 112, 219, 0.05);
}

/* Timeline Navigation */
.timeline-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 4rem;
}

.nav-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  min-width: 80px;
}

.nav-button:hover,
.nav-button:focus {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  outline: none;
}

.nav-button.active {
  border-color: var(--vp-c-brand-2);
  background: rgba(255, 215, 0, 0.1);
  color: var(--vp-c-brand-2);
}

.nav-icon {
  font-size: 1.5rem;
}

.nav-label {
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
}

/* KEVIN Wisdom Section */
.kevin-wisdom-section {
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  padding: 4rem 2rem;
  border-radius: 24px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.wisdom-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 2rem;
}

.kevin-glow {
  background: var(--bitcoin-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
  animation: kevinWisdomPulse 3s ease-in-out infinite;
}

@keyframes kevinWisdomPulse {
  0%, 100% { filter: brightness(1) saturate(1); }
  50% { filter: brightness(1.3) saturate(1.5); }
}

.wisdom-content {
  display: grid;
  gap: 2rem;
}

.wisdom-quote blockquote {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--vp-c-brand-2);
  margin: 0 0 1rem;
  line-height: 1.4;
}

.wisdom-quote cite {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  font-style: normal;
}

.wisdom-principles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.principle {
  padding: 1.5rem;
  background: rgba(26, 26, 26, 0.6);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(5px);
}

.principle strong {
  color: var(--vp-c-brand-2);
  display: block;
  margin-bottom: 0.5rem;
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
  .timeline-events {
    grid-template-columns: 1fr;
  }
  
  .event-stats {
    grid-template-columns: 1fr;
  }
  
  .timeline-nav {
    gap: 0.5rem;
  }
  
  .nav-button {
    min-width: 60px;
    padding: 0.75rem;
  }
  
  .nav-label {
    font-size: 0.75rem;
  }
  
  .wisdom-principles {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .community-timeline {
    padding: 2rem 1rem;
  }
  
  .timeline-event {
    padding: 1.5rem;
  }
  
  .kevin-wisdom-section {
    padding: 2rem 1rem;
  }
  
  .wisdom-quote blockquote {
    font-size: 1.25rem;
  }
}

/* Accessibility and Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .timeline-progress,
  .timeline-event,
  .marker-pulse,
  .kevin-glow {
    animation: none;
    transition: none;
  }
  
  .timeline-event:hover,
  .nav-button:hover {
    transform: none;
  }
}

/* Focus styles for keyboard navigation */
.timeline-event:focus-visible,
.nav-button:focus-visible {
  outline: 2px solid var(--vp-c-brand-2);
  outline-offset: 2px;
}
</style>