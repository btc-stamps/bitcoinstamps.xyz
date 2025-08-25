<template>
  <!-- Schema.org JSON-LD structured data injected via head -->
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'

interface RelatedEntity {
  id: string
  name: string
  relationship: string
  type?: 'protocol' | 'person' | 'token' | 'event'
}

interface Props {
  type?: 'protocol' | 'article' | 'tutorial' | 'entity' | 'narrative' | 'token' | 'historical-event'
  entityId?: string
  title?: string
  description?: string
  protocols?: string[]
  culturalSignificance?: 'high' | 'medium' | 'low'
  author?: string
  datePublished?: string
  audience?: 'developer' | 'artist' | 'both'
  blockHeight?: number
  relatedEntities?: RelatedEntity[]
  tokenSymbol?: string
  historicalContext?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'article',
  culturalSignificance: 'medium',
  audience: 'both',
  relatedEntities: () => []
})

// Get page data from VitePress
const page = inject('page') as any
const frontmatter = computed(() => page?.value?.frontmatter || {})

const structuredData = computed(() => {
  const baseUrl = 'https://bitcoinstamps.xyz'
  const currentUrl = `${baseUrl}${page?.value?.relativePath?.replace(/\.md$/, '')}`

  // Base schema structure
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': getSchemaType(),
    name: props.title || frontmatter.value.title || page?.value?.title,
    description: props.description || frontmatter.value.description,
    url: currentUrl,
    datePublished: props.datePublished || new Date().toISOString(),
    dateModified: new Date().toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'Bitcoin Stamps Community',
      url: 'https://github.com/btc-stamps',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/bitcoin-stamp-logo.svg`
      }
    },
    // Enhanced accessibility and semantic properties
    accessibilityFeature: [
      'alternativeText',
      'structuredNavigation',
      'readingOrder',
      'tableOfContents'
    ],
    isAccessibleForFree: true,
    educationalLevel: 'Beginner to Advanced'
  }

  // Add author information
  if (props.author) {
    schema.author = {
      '@type': 'Person',
      name: props.author
    }
  }

  // Enhanced protocol-specific properties
  if (props.type === 'protocol') {
    schema['@type'] = 'TechArticle'
    schema.about = {
      '@type': 'SoftwareApplication',
      name: props.title,
      applicationCategory: 'Bitcoin Metaprotocol',
      operatingSystem: 'Bitcoin Network',
      softwareVersion: props.blockHeight ? `Block ${props.blockHeight}` : 'Latest',
      releaseNotes: props.historicalContext || 'Bitcoin Stamps protocol implementation'
    }
    
    if (props.protocols) {
      schema.mentions = props.protocols.map(protocol => ({
        '@type': 'SoftwareApplication',
        name: protocol.toUpperCase(),
        applicationCategory: 'Bitcoin Metaprotocol',
        url: `${baseUrl}/protocols/${protocol}`
      }))
    }

    // Add block height as historical context
    if (props.blockHeight) {
      schema.temporal = {
        '@type': 'Event',
        name: `Block ${props.blockHeight} Protocol Update`,
        startDate: getBlockDate(props.blockHeight),
        about: {
          '@type': 'TechnicalUpdate',
          name: `${props.title} Implementation`
        }
      }
    }
  }

  // Token-specific structured data (for KEVIN and other SRC-20 tokens)
  if (props.type === 'token') {
    schema['@type'] = ['Article', 'FinancialProduct']
    schema.about = {
      '@type': 'CryptoCurrency',
      name: props.tokenSymbol || props.title,
      currency: props.tokenSymbol || props.title,
      description: props.description,
      issuingOrganization: {
        '@type': 'Organization',
        name: 'Bitcoin Stamps Community'
      }
    }

    // KEVIN-specific cultural significance
    if (props.tokenSymbol === 'KEVIN') {
      schema.about.additionalType = 'https://schema.org/Mascot'
      schema.about.culturalSignificance = 'Community Mascot and Pioneer Token'
      schema.about.creator = {
        '@type': 'Person',
        name: 'Reinamora',
        description: 'Bitcoin Stamps Artist and KEVIN Token Creator'
      }
    }
  }

  // Historical event markup (for Block 796,000)
  if (props.type === 'historical-event') {
    schema['@type'] = ['Article', 'Event']
    schema.about = {
      '@type': 'Event',
      name: props.title,
      startDate: props.blockHeight ? getBlockDate(props.blockHeight) : undefined,
      location: {
        '@type': 'VirtualLocation',
        name: 'Bitcoin Blockchain',
        url: 'https://bitcoin.org'
      },
      organizer: {
        '@type': 'Organization',
        name: 'Bitcoin Stamps Community'
      },
      eventStatus: 'https://schema.org/EventScheduled'
    }

    if (props.blockHeight === 796000) {
      schema.about.significance = 'Major Protocol Migration'
      schema.about.description = 'Transition from Counterparty to native Bitcoin encoding for SRC-20 tokens'
    }
  }

  // Entity-specific properties
  if (props.type === 'entity' && props.entityId) {
    schema.identifier = props.entityId
    schema.additionalType = 'https://schema.org/Thing'
    
    if (props.culturalSignificance) {
      schema.significance = props.culturalSignificance
    }

    // KEVIN entity specific properties
    if (props.entityId === 'kevin-token' || props.entityId === 'kevin') {
      schema.additionalType = ['https://schema.org/Mascot', 'https://schema.org/CryptoCurrency']
      schema.culturalRole = 'Community Mascot'
      schema.significance = 'high'
      schema.creativeWork = {
        '@type': 'CreativeWork',
        creator: {
          '@type': 'Person',
          name: 'Reinamora'
        }
      }
    }
  }

  // Enhanced related entities with proper relationships
  if (props.relatedEntities && props.relatedEntities.length > 0) {
    schema.relatedLink = props.relatedEntities.map(entity => ({
      '@type': 'WebPage',
      name: entity.name,
      url: generateEntityUrl(entity),
      relationship: entity.relationship,
      about: {
        '@type': getEntitySchemaType(entity.type || 'entity'),
        name: entity.name,
        identifier: entity.id
      }
    }))
  }

  // Narrative-specific properties
  if (props.type === 'narrative') {
    schema['@type'] = 'Article'
    schema.genre = 'Community Story'
    
    if (props.culturalSignificance === 'high') {
      schema.about = {
        '@type': 'CulturalEvent',
        name: props.title
      }
    }
  }

  // Enhanced audience targeting
  if (props.audience !== 'both') {
    schema.audience = {
      '@type': 'Audience',
      audienceType: props.audience === 'developer' ? 'Software Developer' : 'Digital Artist',
      geographicArea: 'Global',
      requiredGender: 'Any',
      requiredMinAge: 18
    }
  } else {
    schema.audience = [
      {
        '@type': 'Audience',
        audienceType: 'Software Developer',
        name: 'Blockchain Developers'
      },
      {
        '@type': 'Audience',
        audienceType: 'Digital Artist',
        name: 'Creative Artists and NFT Creators'
      }
    ]
  }

  // Bitcoin Stamps ecosystem context
  schema.isPartOf = {
    '@type': 'WebSite',
    name: 'Bitcoin Stamps Documentation',
    url: baseUrl,
    about: {
      '@type': 'SoftwareApplication',
      name: 'Bitcoin Stamps Metaprotocol',
      applicationCategory: 'Bitcoin Metaprotocol',
      description: 'Immutable digital assets stored directly on the Bitcoin blockchain',
      operatingSystem: 'Bitcoin Network'
    }
  }

  // Add mainEntity for better AI understanding
  if (props.type === 'protocol' && props.entityId === 'src-20') {
    schema.mainEntity = {
      '@type': 'SoftwareApplication',
      name: 'SRC-20 Token Standard',
      applicationCategory: 'Token Protocol',
      operatingSystem: 'Bitcoin Network',
      softwareVersion: props.blockHeight ? `Block ${props.blockHeight}` : 'Current',
      description: 'Fungible token standard for Bitcoin Stamps enabling permanent token creation',
      creator: {
        '@type': 'Organization',
        name: 'Bitcoin Stamps Community'
      },
      potentialAction: [
        {
          '@type': 'CreateAction',
          object: {
            '@type': 'DigitalDocument',
            name: 'SRC-20 Token'
          }
        },
        {
          '@type': 'TransferAction',
          object: {
            '@type': 'DigitalDocument',
            name: 'SRC-20 Token'
          }
        }
      ]
    }
  }

  return schema
})

// Inject structured data into head with performance optimization
onMounted(() => {
  if (typeof document !== 'undefined' && structuredData.value) {
    // Use requestIdleCallback for performance optimization
    const injectSchema = () => {
      const existingScript = document.querySelector('script[type="application/ld+json"][data-vue-structured-data]')
      if (existingScript) {
        existingScript.remove()
      }

      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-vue-structured-data', 'true')
      script.textContent = JSON.stringify(structuredData.value, null, 0) // Minified for performance
      document.head.appendChild(script)
    }

    if (window.requestIdleCallback) {
      window.requestIdleCallback(injectSchema, { timeout: 100 })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(injectSchema, 0)
    }
  }
})

function getSchemaType(): string {
  switch (props.type) {
    case 'protocol':
      return 'TechArticle'
    case 'tutorial':
      return 'HowTo'
    case 'entity':
      return 'DefinedTerm'
    case 'narrative':
      return 'Article'
    case 'token':
      return 'Article'
    case 'historical-event':
      return 'Event'
    default:
      return 'Article'
  }
}

function getEntitySchemaType(type: string): string {
  const types = {
    protocol: 'SoftwareApplication',
    person: 'Person',
    token: 'CryptoCurrency',
    event: 'Event'
  }
  return types[type] || 'Thing'
}

function generateEntityUrl(entity: RelatedEntity): string {
  const baseUrl = 'https://bitcoinstamps.xyz'
  const routes = {
    protocol: '/protocols',
    person: '/community/people',
    token: '/protocols/src-20',
    event: '/history'
  }
  
  const route = routes[entity.type || 'protocol'] || '/concepts'
  return `${baseUrl}${route}/${entity.id}`
}

function getBlockDate(blockHeight: number): string {
  // Approximate block dates for major milestones
  const knownBlocks = {
    788041: '2023-04-20', // KEVIN deployment
    796000: '2023-06-15'  // SRC-20 migration (approximate)
  }
  
  return knownBlocks[blockHeight] || new Date().toISOString().split('T')[0]
}
</script>