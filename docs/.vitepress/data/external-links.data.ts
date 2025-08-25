/**
 * VitePress data loader for External Links
 * Loads centralized external URLs and API endpoints at build time
 */

import { defineLoader } from 'vitepress'
import { readFileSync } from 'fs'
import { join } from 'path'
import { load } from 'js-yaml'
import type { ExternalLinksData, APIEndpoint, BlockExplorer, Repository } from '../types/technical-data'

declare const data: ExternalLinksData
export { data }

export default defineLoader({
  async load(): Promise<ExternalLinksData> {
    try {
      // Load the YAML file
      const yamlPath = join(__dirname, 'external-links.yaml')
      const yamlContent = readFileSync(yamlPath, 'utf8')
      const rawData = load(yamlContent) as any

      // Transform and validate data
      const data: ExternalLinksData = {
        apis: rawData.apis || {},
        explorers: rawData.explorers || {},
        markets: rawData.markets || {},
        development: rawData.development || {},
        community: rawData.community || {},
        education: rawData.education || {},
        tools: rawData.tools || {},
        monitoring: rawData.monitoring || {},
        compliance: rawData.compliance || {},
        documentation: rawData.documentation || {},
        testing: rawData.testing || {},
        health: rawData.health || {},
        mirrors: rawData.mirrors || {},
        validation: rawData.validation || {},
        metadata: rawData.metadata || {},
        lastUpdated: rawData.validation?.last_checked || new Date().toISOString(),
        dataVersion: rawData.metadata?.schema_version || '1.0.0',
        validationStatus: 'verified'
      }

      // Validate critical APIs
      const requiredAPIs = ['stampchain', 'bitcoin_core', 'counterparty']
      for (const api of requiredAPIs) {
        if (!data.apis[api as keyof typeof data.apis]) {
          console.warn(`⚠️ Missing API configuration: ${api}`)
          data.validationStatus = 'error'
        } else {
          const apiConfig = data.apis[api as keyof typeof data.apis]
          if ('base_url' in apiConfig && !apiConfig.base_url) {
            console.warn(`⚠️ Missing base URL for API: ${api}`)
          }
        }
      }

      // Validate explorer configurations
      if (!data.explorers?.primary || !data.explorers?.bitcoin) {
        console.warn('⚠️ Missing block explorer configurations')
      }

      // Validate development resources
      if (!data.development?.repositories) {
        console.warn('⚠️ Missing development repositories')
      }

      console.log(`✅ Loaded external links with ${Object.keys(data.apis).length} API configurations`)
      return data

    } catch (error) {
      console.error('❌ Failed to load external links:', error)
      throw new Error(`External links data loading failed: ${error.message}`)
    }
  }
})

// API endpoints accessors
export const getAPIEndpoint = (api: string): APIEndpoint | any => {
  return data?.apis?.[api as keyof typeof data.apis] || null
}

export const getStampchainAPI = () => {
  return data?.apis?.stampchain || null
}

export const getBitcoinCoreAPI = () => {
  return data?.apis?.bitcoin_core || null
}

export const getCounterpartyAPI = () => {
  return data?.apis?.counterparty || null
}

export const getAllAPIs = () => {
  return data?.apis || {}
}

// Block explorers
export const getPrimaryExplorer = (): BlockExplorer | null => {
  return data?.explorers?.primary || null
}

export const getBitcoinExplorers = (): BlockExplorer[] => {
  return data?.explorers?.bitcoin || []
}

export const getExplorerByName = (name: string): BlockExplorer | null => {
  const explorers = getBitcoinExplorers()
  return explorers.find(explorer => explorer.name.toLowerCase() === name.toLowerCase()) || null
}

export const getAllExplorers = () => {
  return data?.explorers || null
}

// Market data sources
export const getPrimaryMarket = () => {
  return data?.markets?.primary || null
}

export const getMarketAggregators = () => {
  return data?.markets?.aggregators || []
}

export const getAllMarkets = () => {
  return data?.markets || null
}

// Development resources
export const getRepository = (repo: string): Repository | null => {
  return data?.development?.repositories?.[repo] || null
}

export const getBitcoinStampsCore = (): Repository | null => {
  return getRepository('bitcoin_stamps_core')
}

export const getBitcoinStampsJS = (): Repository | null => {
  return getRepository('bitcoin_stamps_js')
}

export const getBitcoinStampsDocs = (): Repository | null => {
  return getRepository('bitcoin_stamps_docs')
}

export const getBitcoinStampsIndexer = (): Repository | null => {
  return getRepository('bitcoin_stamps_indexer')
}

export const getAllRepositories = () => {
  return data?.development?.repositories || {}
}

export const getPackageManagers = () => {
  return data?.development?.package_managers || {}
}

export const getNPMPackages = () => {
  return data?.development?.package_managers?.npm || {}
}

export const getPipPackages = () => {
  return data?.development?.package_managers?.pip || {}
}

export const getDockerImages = () => {
  return data?.development?.package_managers?.docker || {}
}

// Community resources
export const getCommunityLinks = () => {
  return data?.community || {}
}

export const getSocialLinks = () => {
  return data?.community?.social || {}
}

export const getTwitterLink = () => {
  return data?.community?.social?.twitter || null
}

export const getDiscordLink = () => {
  return data?.community?.social?.discord || null
}

export const getTelegramLink = () => {
  return data?.community?.social?.telegram || null
}

export const getRedditLink = () => {
  return data?.community?.social?.reddit || null
}

export const getGitHubLink = () => {
  return data?.community?.social?.github || null
}

export const getForumLinks = () => {
  return data?.community?.forums || {}
}

// Educational resources
export const getEducationalResources = () => {
  return data?.education || {}
}

export const getBitcoinEducation = () => {
  return data?.education?.bitcoin || {}
}

export const getCounterpartyEducation = () => {
  return data?.education?.counterparty || {}
}

// Tools and utilities
export const getTools = () => {
  return data?.tools || {}
}

export const getWallets = () => {
  return data?.tools?.wallets || {}
}

export const getDevelopmentTools = () => {
  return data?.tools?.development || {}
}

export const getBitcoinTestnetFaucet = () => {
  return data?.tools?.development?.bitcoin_testnet_faucet || null
}

// Monitoring and analytics
export const getMonitoringResources = () => {
  return data?.monitoring || {}
}

export const getNetworkMonitoring = () => {
  return data?.monitoring?.network || {}
}

export const getStampsMonitoring = () => {
  return data?.monitoring?.stamps || {}
}

// Compliance resources
export const getComplianceResources = () => {
  return data?.compliance || {}
}

export const getLicenses = () => {
  return data?.compliance?.licenses || {}
}

// Documentation resources
export const getDocumentationResources = () => {
  return data?.documentation || {}
}

export const getStandardsDocumentation = () => {
  return data?.documentation?.standards || {}
}

export const getBitcoinSpecifications = () => {
  return data?.documentation?.bitcoin_specifications || {}
}

// Testing resources
export const getTestingResources = () => {
  return data?.testing || {}
}

export const getTestnetExplorers = () => {
  return data?.testing?.testnet_explorers || {}
}

export const getFaucets = () => {
  return data?.testing?.faucets || {}
}

// Health checks
export const getHealthChecks = () => {
  return data?.health || {}
}

export const getAPIStatus = () => {
  return data?.health?.api_status || {}
}

export const getNetworkStatus = () => {
  return data?.health?.network_status || {}
}

// Mirror resources
export const getMirrorResources = () => {
  return data?.mirrors || {}
}

export const getDocumentationMirrors = () => {
  return data?.mirrors?.documentation || {}
}

export const getAPIMirrors = () => {
  return data?.mirrors?.apis || {}
}

// URL validation utilities
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const formatURL = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

export const extractDomain = (url: string): string => {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

// Link status utilities
export const getValidationInfo = () => {
  return data?.validation || {}
}

export const getLastLinkCheck = (): string => {
  return data?.validation?.last_checked || 'unknown'
}

export const getLinkCheckFrequency = (): string => {
  return data?.validation?.check_frequency || 'unknown'
}

export const getBrokenLinkPolicy = (): string => {
  return data?.validation?.broken_link_policy || 'unknown'
}

export const getArchivePolicy = (): string => {
  return data?.validation?.archive_policy || 'unknown'
}

// Category helpers
export const getLinksByCategory = (category: string) => {
  return data?.[category as keyof typeof data] || null
}

export const getAllCategories = (): string[] => {
  if (!data) return []
  return Object.keys(data).filter(key => 
    !['lastUpdated', 'dataVersion', 'validationStatus', 'metadata', 'validation'].includes(key)
  )
}

// Search functionality
export const searchLinks = (query: string): Array<{category: string, key: string, item: any}> => {
  if (!data) return []
  
  const results: Array<{category: string, key: string, item: any}> = []
  const lowerQuery = query.toLowerCase()
  
  for (const [category, items] of Object.entries(data)) {
    if (typeof items === 'object' && items !== null && !Array.isArray(items)) {
      for (const [key, item] of Object.entries(items)) {
        if (typeof item === 'object' && item !== null) {
          const searchText = JSON.stringify(item).toLowerCase()
          if (searchText.includes(lowerQuery) || key.toLowerCase().includes(lowerQuery)) {
            results.push({ category, key, item })
          }
        }
      }
    }
  }
  
  return results
}

// Data statistics
export const getExternalLinksStats = () => {
  if (!data) return null
  
  const categories = getAllCategories()
  const totalLinks = categories.reduce((count, category) => {
    const items = data[category as keyof typeof data]
    if (typeof items === 'object' && items !== null && !Array.isArray(items)) {
      return count + Object.keys(items).length
    }
    return count
  }, 0)
  
  return {
    totalCategories: categories.length,
    totalLinks: totalLinks,
    apiConfigurations: Object.keys(data.apis).length,
    repositories: Object.keys(data.development?.repositories || {}).length,
    socialLinks: Object.keys(data.community?.social || {}).length,
    lastValidation: data.validation?.last_checked,
    validationStatus: data.validationStatus,
    lastUpdated: data.lastUpdated
  }
}

// Export validation helpers
export const validateExternalLinks = (): boolean => {
  if (!data) return false
  
  const requiredSections = ['apis', 'explorers', 'development', 'community']
  return requiredSections.every(section => section in data)
}