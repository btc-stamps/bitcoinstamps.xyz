<template>
  <div class="contributor-spotlight" role="main" aria-label="Bitcoin Stamps Contributor Spotlight">
    <!-- Spotlight Header -->
    <header class="spotlight-header">
      <h2 class="spotlight-title">
        <span class="bitcoin-gradient">Sacred Contributor Spotlight</span>
      </h2>
      <p class="spotlight-subtitle">
        Celebrating the souls who embody <em>inlakech ala kiin</em> in their creative and technical contributions
      </p>
    </header>

    <!-- Featured Contributor -->
    <section class="featured-contributor" aria-labelledby="featured-title">
      <h3 id="featured-title" class="sr-only">Featured Contributor</h3>
      
      <div class="featured-card" :class="featuredContributor.role">
        <div class="featured-background" :style="{ backgroundImage: featuredContributor.bgPattern }"></div>
        
        <div class="featured-content">
          <div class="featured-avatar-section">
            <div class="featured-avatar" :class="featuredContributor.avatarClass">
              <span class="avatar-icon" aria-hidden="true">{{ featuredContributor.icon }}</span>
              <div class="avatar-aura" v-if="featuredContributor.id === 'arwyn'"></div>
            </div>
            <div class="featured-badges">
              <span 
                v-for="badge in featuredContributor.badges" 
                :key="badge" 
                class="contributor-badge"
                :class="badge.toLowerCase().replace(/\s+/g, '-')"
              >
                {{ badge }}
              </span>
            </div>
          </div>
          
          <div class="featured-info">
            <h3 class="featured-name">{{ featuredContributor.name }}</h3>
            <p class="featured-role">{{ featuredContributor.title }}</p>
            <blockquote class="featured-quote">
              "{{ featuredContributor.quote }}"
            </blockquote>
            
            <div class="featured-story">
              <h4 class="story-title">Sacred Contribution</h4>
              <p class="story-text" v-html="featuredContributor.story"></p>
            </div>
            
            <div class="featured-impact">
              <h4 class="impact-title">Cultural Impact</h4>
              <div class="impact-metrics">
                <div 
                  v-for="metric in featuredContributor.impact" 
                  :key="metric.label"
                  class="impact-metric"
                >
                  <span class="metric-value">{{ metric.value }}</span>
                  <span class="metric-label">{{ metric.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          class="featured-nav prev" 
          @click="previousContributor"
          aria-label="Previous contributor"
          :disabled="currentIndex === 0"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button 
          class="featured-nav next" 
          @click="nextContributor"
          aria-label="Next contributor"
          :disabled="currentIndex === contributors.length - 1"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>

    <!-- Contributors Grid -->
    <section class="contributors-grid-section" aria-labelledby="grid-title">
      <h3 id="grid-title" class="section-title">
        <span class="bitcoin-gradient">Our Sacred Community</span>
      </h3>
      
      <div class="contributor-selector" role="tablist" aria-label="Select contributor to highlight">
        <button
          v-for="(contributor, index) in contributors"
          :key="contributor.id"
          class="selector-button"
          :class="{ active: currentIndex === index }"
          @click="setFeaturedContributor(index)"
          role="tab"
          :aria-selected="currentIndex === index"
          :aria-controls="`contributor-${contributor.id}`"
          :aria-label="`View ${contributor.name} spotlight`"
        >
          <span class="selector-icon" aria-hidden="true">{{ contributor.icon }}</span>
          <span class="selector-name">{{ contributor.name }}</span>
          <span class="selector-role">{{ contributor.title }}</span>
        </button>
      </div>
    </section>

    <!-- Community Values Connection -->
    <section class="values-connection" aria-labelledby="values-title">
      <h3 id="values-title" class="section-title">
        <span class="bitcoin-gradient">How Each Soul Embodies Our Values</span>
      </h3>
      
      <div class="values-grid">
        <div class="value-embodiment" v-for="embodiment in valueEmbodiments" :key="embodiment.value">
          <div class="embodiment-header">
            <span class="embodiment-icon" aria-hidden="true">{{ embodiment.icon }}</span>
            <h4 class="embodiment-value">{{ embodiment.value }}</h4>
          </div>
          <div class="embodiment-examples">
            <div 
              v-for="example in embodiment.examples" 
              :key="example.contributor"
              class="embodiment-example"
            >
              <strong class="example-contributor">{{ example.contributor }}:</strong>
              <span class="example-text">{{ example.manifestation }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Wisdom -->
    <section class="community-wisdom" aria-labelledby="wisdom-title">
      <h3 id="wisdom-title" class="section-title">
        <span class="kevin-glow">Collective Wisdom</span>
      </h3>
      
      <div class="wisdom-carousel">
        <div class="wisdom-item" :class="{ active: activeWisdom === index }" v-for="(wisdom, index) in communityWisdom" :key="index">
          <blockquote class="wisdom-quote">
            "{{ wisdom.quote }}"
          </blockquote>
          <cite class="wisdom-attribution">
            - {{ wisdom.attribution }}
          </cite>
          <div class="wisdom-context">
            <span class="context-label">Context:</span>
            <span class="context-text">{{ wisdom.context }}</span>
          </div>
        </div>
        
        <div class="wisdom-nav">
          <button 
            v-for="(wisdom, index) in communityWisdom"
            :key="index"
            class="wisdom-dot"
            :class="{ active: activeWisdom === index }"
            @click="setActiveWisdom(index)"
            :aria-label="`View wisdom quote ${index + 1}`"
          ></button>
        </div>
      </div>
    </section>

    <!-- Call to Contribute -->
    <section class="contribute-cta" aria-labelledby="contribute-title">
      <div class="cta-content">
        <h3 id="contribute-title" class="cta-title">
          <span class="kevin-glow">Become Part of Our Sacred Story</span>
        </h3>
        <p class="cta-description">
          Every contribution matters. Whether you create art, build tools, share wisdom, 
          or simply embody our values in your daily interactions - you are essential 
          to our collective consciousness.
        </p>
        <div class="contribution-paths">
          <div class="path-card" v-for="path in contributionPaths" :key="path.type">
            <div class="path-icon" aria-hidden="true">{{ path.icon }}</div>
            <h4 class="path-title">{{ path.title }}</h4>
            <p class="path-description">{{ path.description }}</p>
            <a :href="path.link" class="path-action">{{ path.action }}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Contributors data
const contributors = [
  {
    id: 'mikeinspace',
    name: 'Mikeinspace',
    title: 'The Genesis Creator',
    icon: '🎨',
    role: 'genesis',
    avatarClass: 'genesis-avatar',
    bgPattern: 'linear-gradient(135deg, rgba(247, 147, 26, 0.1) 0%, transparent 70%)',
    quote: 'Art should be eternal, not ephemeral. Bitcoin is the perfect canvas.',
    story: 'In block 779,652, <strong>Mikeinspace</strong> proved that Bitcoin could be more than digital gold - it could be an eternal canvas for human creativity. This Genesis moment established the sacred foundation that every Bitcoin Stamp builds upon.',
    badges: ['Genesis Creator', 'Protocol Pioneer', 'Visionary'],
    impact: [
      { label: 'Cultural Shift', value: 'Immense' },
      { label: 'Innovation', value: 'Genesis' },
      { label: 'Community', value: 'Catalyst' }
    ]
  },
  {
    id: 'arwyn',
    name: 'Arwyn',
    title: 'The Mythic Channeler',
    icon: '🦆',
    role: 'kevin',
    avatarClass: 'kevin-avatar',
    bgPattern: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
    quote: 'I created KEVIN as art. The community made KEVIN into something sacred.',
    story: 'Through <strong>Arwyn\'s</strong> creative channeling in block 788,041, the mythical essence of KEVIN was born. What began as artistic expression became the spiritual mascot uniting our community in collective consciousness - <em>we are all Kevin</em>.',
    badges: ['Mythic Creator', 'Sacred Channeler', 'Community Unifier'],
    impact: [
      { label: 'Holders United', value: '2,300+' },
      { label: 'Philosophy', value: 'Inlakech' },
      { label: 'Consciousness', value: 'Collective' }
    ]
  },
  {
    id: 'reinamora',
    name: 'Reinamora',
    title: 'The Chief Mechanic',
    icon: '⚙️',
    role: 'technical',
    avatarClass: 'technical-avatar',
    bgPattern: 'linear-gradient(135deg, rgba(74, 144, 164, 0.1) 0%, transparent 70%)',
    quote: 'Technical excellence should serve sacred purpose, democratizing access for all.',
    story: '<strong>Reinamora</strong> embodies our belief that technology should empower rather than intimidate. As architect of SRC-20 and OLGA P2WSH encoding, every innovation democratizes access and serves the collective good.',
    badges: ['Technical Architect', 'Access Democratizer', 'Innovation Leader'],
    impact: [
      { label: 'Protocols Built', value: '2' },
      { label: 'Barriers Lowered', value: '∞' },
      { label: 'Access Enabled', value: 'Universal' }
    ]
  }
]

// Component state
const currentIndex = ref(1) // Start with Arwyn/KEVIN highlighted
const activeWisdom = ref(0)
let wisdomTimer: NodeJS.Timeout

// Computed properties
const featuredContributor = computed(() => contributors[currentIndex.value])

// Community wisdom quotes
const communityWisdom = [
  {
    quote: "We are all Kevin - not as a meme, but as lived philosophy of collective consciousness",
    attribution: "Community Principle",
    context: "The organic adoption of KEVIN as spiritual guidance"
  },
  {
    quote: "Individual success means nothing without collective prosperity", 
    attribution: "Inlakech Ala Kiin",
    context: "Ancient Mayan wisdom applied to modern innovation"
  },
  {
    quote: "Art over speculation, always. Create for eternity, not for profit",
    attribution: "Bitcoin Stamps Values",
    context: "Prioritizing authentic expression over market performance"
  },
  {
    quote: "The blockchain remembers all things, but only love creates meaning",
    attribution: "KEVIN's Wisdom",
    context: "On the sacred nature of permanent preservation"
  }
]

// Value embodiments
const valueEmbodiments = [
  {
    value: 'Artistic Authenticity',
    icon: '🎨',
    examples: [
      { contributor: 'Mikeinspace', manifestation: 'Proved Bitcoin could be an eternal canvas' },
      { contributor: 'Arwyn', manifestation: 'Created art that became sacred community symbol' },
      { contributor: 'Community Artists', manifestation: 'Choose expression over speculation' }
    ]
  },
  {
    value: 'Technical Excellence',
    icon: '⚙️',
    examples: [
      { contributor: 'Reinamora', manifestation: 'Builds protocols that democratize access' },
      { contributor: 'Tool Builders', manifestation: 'Make complex technology accessible' },
      { contributor: 'Documentation Team', manifestation: 'Share knowledge freely' }
    ]
  },
  {
    value: 'Fair Launch Principles',
    icon: '⚖️',
    examples: [
      { contributor: 'KEVIN', manifestation: '0% pre-mine, 100% community distribution' },
      { contributor: 'All Protocols', manifestation: 'No insider allocations ever' },
      { contributor: 'Community', manifestation: 'Equal opportunity for all' }
    ]
  },
  {
    value: 'Collective Consciousness',
    icon: '🦆',
    examples: [
      { contributor: 'Arwyn', manifestation: 'Channeled KEVIN as community unifier' },
      { contributor: 'Decision Making', manifestation: '"What would KEVIN do?" framework' },
      { contributor: 'Community Culture', manifestation: 'We are all Kevin philosophy' }
    ]
  }
]

// Contribution paths
const contributionPaths = [
  {
    type: 'artist',
    icon: '🎨',
    title: 'Create Art',
    description: 'Use Bitcoin as your eternal canvas. Your creativity matters more than technical knowledge.',
    action: 'Start Creating',
    link: '/getting-started/artists'
  },
  {
    type: 'builder',
    icon: '🛠️',
    title: 'Build Tools',
    description: 'Help democratize access by building tools that empower others to participate.',
    action: 'Contribute Code',
    link: '/getting-started/developers'
  },
  {
    type: 'community',
    icon: '🌟',
    title: 'Share Wisdom',
    description: 'Every interaction shapes our culture. Welcome newcomers, share knowledge, embody values.',
    action: 'Join Community',
    link: '/community/discord'
  }
]

// Methods
const setFeaturedContributor = (index: number) => {
  currentIndex.value = index
  announceChange(`Now featuring: ${contributors[index].name}`)
}

const nextContributor = () => {
  if (currentIndex.value < contributors.length - 1) {
    setFeaturedContributor(currentIndex.value + 1)
  }
}

const previousContributor = () => {
  if (currentIndex.value > 0) {
    setFeaturedContributor(currentIndex.value - 1)
  }
}

const setActiveWisdom = (index: number) => {
  activeWisdom.value = index
}

const cycleWisdom = () => {
  activeWisdom.value = (activeWisdom.value + 1) % communityWisdom.length
}

const announceChange = (message: string) => {
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

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      previousContributor()
      break
    case 'ArrowRight':
      event.preventDefault()
      nextContributor()
      break
  }
}

// Lifecycle
onMounted(() => {
  console.log('Contributor Spotlight mounted - Sacred stories loading!')
  
  // Set up wisdom cycling
  wisdomTimer = setInterval(cycleWisdom, 6000)
  
  // Add keyboard navigation
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  if (wisdomTimer) {
    clearInterval(wisdomTimer)
  }
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Bitcoin Stamps Contributor Spotlight Styling */
.contributor-spotlight {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%);
  color: var(--vp-c-text-1);
  padding: 4rem 2rem;
}

/* Spotlight Header */
.spotlight-header {
  text-align: center;
  margin-bottom: 4rem;
}

.spotlight-title {
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

.spotlight-subtitle {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.spotlight-subtitle em {
  color: var(--vp-c-brand-2);
  font-style: italic;
}

/* Featured Contributor */
.featured-contributor {
  margin-bottom: 6rem;
}

.featured-card {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 24px;
  padding: 3rem;
  overflow: hidden;
  backdrop-filter: blur(15px);
  transition: all 0.5s ease;
}

.featured-card.genesis {
  border-color: var(--vp-c-brand-1);
  background: rgba(247, 147, 26, 0.05);
}

.featured-card.kevin {
  border-color: var(--vp-c-brand-2);
  background: rgba(255, 215, 0, 0.05);
  box-shadow: 0 0 50px rgba(255, 215, 0, 0.1);
}

.featured-card.technical {
  border-color: #4A90A4;
  background: rgba(74, 144, 164, 0.05);
}

.featured-background {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  z-index: 0;
}

.featured-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3rem;
  align-items: start;
}

.featured-avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.featured-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--bitcoin-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 1rem;
}

.kevin-avatar {
  animation: kevinSpotlightGlow 3s ease-in-out infinite;
}

@keyframes kevinSpotlightGlow {
  0%, 100% { 
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.5);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 60px rgba(255, 215, 0, 0.8);
    transform: scale(1.05);
  }
}

.genesis-avatar {
  background: linear-gradient(135deg, var(--vp-c-brand-1) 0%, #E67E00 100%);
}

.technical-avatar {
  background: linear-gradient(135deg, #4A90A4 0%, #74B9CC 100%);
}

.avatar-aura {
  position: absolute;
  inset: -15px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  animation: auraRotate 4s linear infinite;
}

@keyframes auraRotate {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

.featured-badges {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.contributor-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
}

.genesis-creator { background: rgba(247, 147, 26, 0.2); color: var(--vp-c-brand-1); }
.protocol-pioneer { background: rgba(255, 215, 0, 0.2); color: var(--vp-c-brand-2); }
.visionary { background: rgba(138, 43, 226, 0.2); color: #BA55D3; }
.mythic-creator { background: rgba(255, 215, 0, 0.3); color: var(--vp-c-brand-2); }
.sacred-channeler { background: rgba(138, 43, 226, 0.2); color: #BA55D3; }
.community-unifier { background: rgba(50, 205, 50, 0.2); color: #32CD32; }
.technical-architect { background: rgba(74, 144, 164, 0.2); color: #4A90A4; }
.access-democratizer { background: rgba(0, 191, 255, 0.2); color: #00BFFF; }
.innovation-leader { background: rgba(255, 69, 0, 0.2); color: #FF4500; }

.featured-info {
  display: grid;
  gap: 2rem;
}

.featured-name {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--vp-c-brand-2);
  margin: 0;
}

.featured-role {
  font-size: 1.5rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  margin: 0;
}

.featured-quote {
  font-size: 1.25rem;
  font-style: italic;
  color: var(--vp-c-brand-1);
  margin: 0;
  padding: 1.5rem;
  background: rgba(247, 147, 26, 0.05);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 0 8px 8px 0;
}

.story-title,
.impact-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand-2);
  margin-bottom: 1rem;
}

.story-text {
  color: var(--vp-c-text-1);
  line-height: 1.6;
  font-size: 1.125rem;
}

.story-text strong {
  color: var(--vp-c-brand-2);
}

.story-text em {
  color: var(--vp-c-brand-1);
  font-style: italic;
}

.impact-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.impact-metric {
  text-align: center;
  padding: 1.5rem;
  background: rgba(247, 147, 26, 0.05);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.impact-metric:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.metric-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Navigation Buttons */
.featured-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(26, 26, 26, 0.9);
  border: 2px solid rgba(247, 147, 26, 0.3);
  color: var(--vp-c-brand-1);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  z-index: 2;
}

.featured-nav:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  background: rgba(247, 147, 26, 0.1);
  transform: translateY(-50%) scale(1.1);
}

.featured-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.featured-nav.prev {
  left: -30px;
}

.featured-nav.next {
  right: -30px;
}

/* Contributors Grid */
.contributors-grid-section {
  margin-bottom: 6rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
}

.contributor-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.selector-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 16px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.selector-button:hover,
.selector-button:focus {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  outline: none;
}

.selector-button.active {
  border-color: var(--vp-c-brand-2);
  background: rgba(255, 215, 0, 0.08);
  color: var(--vp-c-brand-2);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(255, 215, 0, 0.2);
}

.selector-icon {
  font-size: 2rem;
}

.selector-name {
  font-size: 1.25rem;
  font-weight: 600;
}

.selector-role {
  font-size: 0.875rem;
  font-style: italic;
}

/* Values Connection */
.values-connection {
  margin-bottom: 6rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.value-embodiment {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.value-embodiment:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(247, 147, 26, 0.15);
}

.embodiment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.embodiment-icon {
  font-size: 1.5rem;
}

.embodiment-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand-2);
}

.embodiment-examples {
  display: grid;
  gap: 1rem;
}

.embodiment-example {
  padding: 1rem;
  background: rgba(247, 147, 26, 0.05);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 0 8px 8px 0;
  line-height: 1.5;
}

.example-contributor {
  color: var(--vp-c-brand-2);
  display: block;
  margin-bottom: 0.25rem;
}

.example-text {
  color: var(--vp-c-text-1);
}

/* Community Wisdom */
.community-wisdom {
  margin-bottom: 6rem;
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

.wisdom-carousel {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  min-height: 200px;
}

.wisdom-item {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 215, 0, 0.05);
  border: 2px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
  backdrop-filter: blur(10px);
}

.wisdom-item.active {
  opacity: 1;
  transform: translateY(0);
}

.wisdom-quote {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--vp-c-brand-2);
  line-height: 1.4;
  margin-bottom: 1rem;
}

.wisdom-attribution {
  font-size: 1rem;
  color: var(--vp-c-text-2);
  font-style: normal;
  margin-bottom: 1rem;
}

.wisdom-context {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.context-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.context-text {
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
  font-style: italic;
}

.wisdom-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.wisdom-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 215, 0, 0.3);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.wisdom-dot:hover,
.wisdom-dot.active {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  transform: scale(1.2);
}

/* Call to Contribute */
.contribute-cta {
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  padding: 4rem 2rem;
  border-radius: 24px;
  text-align: center;
}

.cta-content {
  max-width: 1000px;
  margin: 0 auto;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.cta-description {
  font-size: 1.25rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.contribution-paths {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.path-card {
  background: rgba(26, 26, 26, 0.8);
  border: 2px solid rgba(247, 147, 26, 0.2);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.path-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(247, 147, 26, 0.2);
}

.path-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.path-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-brand-2);
  margin-bottom: 1rem;
}

.path-description {
  color: var(--vp-c-text-1);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.path-action {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--bitcoin-gold);
  color: #1a1a1a;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.path-action:hover {
  background: linear-gradient(135deg, #E67E00 0%, #FFD700 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(247, 147, 26, 0.3);
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
  .featured-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .featured-nav {
    display: none;
  }
  
  .contributor-selector {
    grid-template-columns: 1fr;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .impact-metrics {
    grid-template-columns: 1fr;
  }
  
  .contribution-paths {
    grid-template-columns: 1fr;
  }
  
  .wisdom-context {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .contributor-spotlight {
    padding: 2rem 1rem;
  }
  
  .featured-card {
    padding: 2rem;
  }
  
  .featured-avatar {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
  
  .selector-button,
  .value-embodiment,
  .path-card {
    padding: 1.5rem;
  }
}

/* Accessibility and Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .kevin-spotlight-glow,
  .aura-rotate,
  .kevin-wisdom-pulse,
  .wisdom-item {
    animation: none;
    transition: none;
  }
  
  .featured-card:hover,
  .selector-button:hover,
  .path-card:hover {
    transform: none;
  }
}

/* Focus styles for keyboard navigation */
.selector-button:focus-visible,
.wisdom-dot:focus-visible,
.path-action:focus-visible,
.featured-nav:focus-visible {
  outline: 2px solid var(--vp-c-brand-2);
  outline-offset: 2px;
}
</style>