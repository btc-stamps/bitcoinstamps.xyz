/**
 * LEO Performance Monitoring Utilities
 * Tracks and validates LEO optimization targets for Bitcoin Stamps documentation
 */

interface LEOMetrics {
  schemaLoadTime: number
  entityResolutionTime: number
  structuredDataSize: number
  crawlerAccessibility: boolean
  semanticCompliance: number
  culturalEntityCount: number
}

interface PerformanceTargets {
  maxSchemaLoadTime: number
  maxEntityResolutionTime: number
  maxStructuredDataSize: number
  minSemanticCompliance: number
  requiredCulturalEntities: string[]
}

class LEOPerformanceMonitor {
  private static instance: LEOPerformanceMonitor
  private metrics: LEOMetrics
  private targets: PerformanceTargets
  private observers: PerformanceObserver[]

  constructor() {
    this.metrics = {
      schemaLoadTime: 0,
      entityResolutionTime: 0,
      structuredDataSize: 0,
      crawlerAccessibility: true,
      semanticCompliance: 0,
      culturalEntityCount: 0
    }

    this.targets = {
      maxSchemaLoadTime: 500, // 500ms target
      maxEntityResolutionTime: 200, // 200ms for entity cross-references
      maxStructuredDataSize: 50000, // 50KB max for structured data
      minSemanticCompliance: 0.95, // 95% Schema.org compliance
      requiredCulturalEntities: ['kevin', 'reinamora', 'bitcoin-stamps', 'block-796000']
    }

    this.observers = []
  }

  static getInstance(): LEOPerformanceMonitor {
    if (!LEOPerformanceMonitor.instance) {
      LEOPerformanceMonitor.instance = new LEOPerformanceMonitor()
    }
    return LEOPerformanceMonitor.instance
  }

  /**
   * Start monitoring LEO performance metrics
   */
  startMonitoring(): void {
    if (typeof window === 'undefined') return

    // Monitor structured data injection performance
    this.observeStructuredDataPerformance()
    
    // Monitor entity link resolution
    this.observeEntityResolution()
    
    // Validate cultural entity presence
    this.validateCulturalEntities()

    // Monitor overall page load for LEO elements
    this.observePageLoadMetrics()
  }

  /**
   * Monitor structured data injection performance
   */
  private observeStructuredDataPerformance(): void {
    const startTime = performance.now()
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            if (element.tagName === 'SCRIPT' && 
                element.getAttribute('type') === 'application/ld+json') {
              
              const loadTime = performance.now() - startTime
              this.metrics.schemaLoadTime = loadTime
              
              // Measure structured data size
              const content = element.textContent || ''
              this.metrics.structuredDataSize = new Blob([content]).size
              
              // Validate Schema.org compliance
              this.validateSchemaCompliance(content)
              
              console.log(`📊 LEO Metrics - Schema Load Time: ${loadTime.toFixed(2)}ms`)
              console.log(`📊 LEO Metrics - Structured Data Size: ${this.metrics.structuredDataSize} bytes`)
            }
          }
        })
      })
    })

    observer.observe(document.head, {
      childList: true,
      subtree: true
    })

    this.observers.push(observer)
  }

  /**
   * Monitor entity link resolution performance
   */
  private observeEntityResolution(): void {
    const startTime = performance.now()
    let entityCount = 0

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            const entityLinks = element.querySelectorAll('.entity-link, [itemscope]')
            
            if (entityLinks.length > entityCount) {
              entityCount = entityLinks.length
              this.metrics.entityResolutionTime = performance.now() - startTime
              
              console.log(`🔗 Entity Resolution: ${entityCount} entities in ${this.metrics.entityResolutionTime.toFixed(2)}ms`)
            }
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    this.observers.push(observer)
  }

  /**
   * Validate presence of required cultural entities
   */
  private validateCulturalEntities(): void {
    const checkEntities = () => {
      const foundEntities = new Set<string>()
      
      // Check in structured data
      const scripts = document.querySelectorAll('script[type="application/ld+json"]')
      scripts.forEach(script => {
        const content = script.textContent || ''
        this.targets.requiredCulturalEntities.forEach(entity => {
          if (content.toLowerCase().includes(entity.toLowerCase())) {
            foundEntities.add(entity)
          }
        })
      })

      // Check in entity links
      const entityLinks = document.querySelectorAll('[data-entity-id], .entity-link')
      entityLinks.forEach(link => {
        const entityId = link.getAttribute('data-entity-id') || 
                        link.getAttribute('entity-id') ||
                        link.textContent?.toLowerCase()
        
        if (entityId) {
          this.targets.requiredCulturalEntities.forEach(entity => {
            if (entityId.includes(entity)) {
              foundEntities.add(entity)
            }
          })
        }
      })

      this.metrics.culturalEntityCount = foundEntities.size
      
      console.log(`🎭 Cultural Entities Found: ${Array.from(foundEntities).join(', ')}`)
      
      if (foundEntities.size < this.targets.requiredCulturalEntities.length) {
        console.warn(`⚠️  Missing cultural entities: ${
          this.targets.requiredCulturalEntities
            .filter(entity => !foundEntities.has(entity))
            .join(', ')
        }`)
      }
    }

    // Check immediately and after DOM changes
    setTimeout(checkEntities, 1000)
    
    const observer = new MutationObserver(() => {
      setTimeout(checkEntities, 100)
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    this.observers.push(observer)
  }

  /**
   * Validate Schema.org compliance
   */
  private validateSchemaCompliance(jsonContent: string): void {
    try {
      const data = JSON.parse(jsonContent)
      let compliantFields = 0
      let totalFields = 0

      const validateObject = (obj: any) => {
        Object.keys(obj).forEach(key => {
          totalFields++
          
          // Required Schema.org fields
          if (['@context', '@type', 'name', 'description'].includes(key)) {
            compliantFields++
          }
          
          // Bitcoin Stamps specific validations
          if (key === '@context' && obj[key] === 'https://schema.org') {
            compliantFields++
          }
          
          if (key === 'culturalSignificance' || key === 'audience' || key === 'isPartOf') {
            compliantFields++
          }

          // Recursively validate nested objects
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            validateObject(obj[key])
          }
        })
      }

      if (Array.isArray(data)) {
        data.forEach(validateObject)
      } else {
        validateObject(data)
      }

      this.metrics.semanticCompliance = totalFields > 0 ? compliantFields / totalFields : 0
      
      console.log(`✅ Schema.org Compliance: ${(this.metrics.semanticCompliance * 100).toFixed(1)}%`)
      
    } catch (error) {
      console.error('❌ Schema.org validation error:', error)
      this.metrics.semanticCompliance = 0
    }
  }

  /**
   * Monitor overall page load metrics for LEO elements
   */
  private observePageLoadMetrics(): void {
    if ('PerformanceObserver' in window) {
      const perfObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach(entry => {
          // Monitor resource loading for LEO components
          if (entry.name.includes('leo-components') || 
              entry.name.includes('structured-data')) {
            console.log(`⚡ LEO Resource: ${entry.name} - ${entry.duration.toFixed(2)}ms`)
          }
        })
      })

      perfObserver.observe({ entryTypes: ['resource', 'navigation'] })
    }
  }

  /**
   * Generate LEO performance report
   */
  generateReport(): {
    metrics: LEOMetrics
    compliance: {
      schemaLoadTime: boolean
      entityResolutionTime: boolean
      structuredDataSize: boolean
      semanticCompliance: boolean
      culturalEntities: boolean
    }
    recommendations: string[]
  } {
    const compliance = {
      schemaLoadTime: this.metrics.schemaLoadTime <= this.targets.maxSchemaLoadTime,
      entityResolutionTime: this.metrics.entityResolutionTime <= this.targets.maxEntityResolutionTime,
      structuredDataSize: this.metrics.structuredDataSize <= this.targets.maxStructuredDataSize,
      semanticCompliance: this.metrics.semanticCompliance >= this.targets.minSemanticCompliance,
      culturalEntities: this.metrics.culturalEntityCount >= this.targets.requiredCulturalEntities.length
    }

    const recommendations: string[] = []
    
    if (!compliance.schemaLoadTime) {
      recommendations.push(`Optimize structured data loading (current: ${this.metrics.schemaLoadTime.toFixed(2)}ms, target: ${this.targets.maxSchemaLoadTime}ms)`)
    }
    
    if (!compliance.entityResolutionTime) {
      recommendations.push(`Improve entity resolution performance (current: ${this.metrics.entityResolutionTime.toFixed(2)}ms, target: ${this.targets.maxEntityResolutionTime}ms)`)
    }
    
    if (!compliance.structuredDataSize) {
      recommendations.push(`Reduce structured data size (current: ${this.metrics.structuredDataSize} bytes, target: ${this.targets.maxStructuredDataSize} bytes)`)
    }
    
    if (!compliance.semanticCompliance) {
      recommendations.push(`Improve Schema.org compliance (current: ${(this.metrics.semanticCompliance * 100).toFixed(1)}%, target: ${this.targets.minSemanticCompliance * 100}%)`)
    }
    
    if (!compliance.culturalEntities) {
      recommendations.push(`Add missing cultural entities (found: ${this.metrics.culturalEntityCount}, required: ${this.targets.requiredCulturalEntities.length})`)
    }

    return {
      metrics: this.metrics,
      compliance,
      recommendations
    }
  }

  /**
   * Stop monitoring and clean up observers
   */
  stopMonitoring(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }
}

// Export utilities for development and testing
export const leoPerformance = LEOPerformanceMonitor.getInstance()

export function initializeLEOMonitoring(): void {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    leoPerformance.startMonitoring()
    
    // Add global access for debugging
    ;(window as any).__LEO_PERFORMANCE__ = leoPerformance
    
    // Generate report after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        const report = leoPerformance.generateReport()
        console.group('📊 LEO Performance Report')
        console.log('Metrics:', report.metrics)
        console.log('Compliance:', report.compliance)
        if (report.recommendations.length > 0) {
          console.warn('Recommendations:', report.recommendations)
        } else {
          console.log('✅ All LEO targets met!')
        }
        console.groupEnd()
      }, 2000)
    })
  }
}

// Utility for AI crawler detection and optimization
export function optimizeForAICrawlers(): void {
  if (typeof window === 'undefined') return

  // Add meta tag to indicate LEO optimization
  const leoMeta = document.createElement('meta')
  leoMeta.name = 'leo-optimized'
  leoMeta.content = 'true'
  document.head.appendChild(leoMeta)

  // Enhance structured data visibility for crawlers
  const enhanceStructuredData = () => {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    scripts.forEach((script, index) => {
      script.setAttribute('data-leo-schema', `schema-${index}`)
      script.setAttribute('data-leo-priority', 'high')
    })
  }

  // Run enhancement after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceStructuredData)
  } else {
    enhanceStructuredData()
  }

  // Add semantic navigation aids
  const addSemanticNavigation = () => {
    const nav = document.querySelector('nav')
    if (nav) {
      nav.setAttribute('role', 'navigation')
      nav.setAttribute('aria-label', 'Bitcoin Stamps Protocol Documentation')
      nav.setAttribute('itemscope', '')
      nav.setAttribute('itemtype', 'https://schema.org/SiteNavigationElement')
    }
  }

  setTimeout(addSemanticNavigation, 500)
}

export default {
  leoPerformance,
  initializeLEOMonitoring,
  optimizeForAICrawlers
}