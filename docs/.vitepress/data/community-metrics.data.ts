/**
 * VitePress data loader for Community Metrics
 * Loads centralized community statistics at build time
 */

import { defineLoader } from 'vitepress'
import { readFileSync } from 'fs'
import { join } from 'path'
import { load } from 'js-yaml'
import type { CommunityMetricsData, TokenMetrics, TopToken } from '../types/technical-data'

declare const data: CommunityMetricsData
export { data }

export default defineLoader({
  async load(): Promise<CommunityMetricsData> {
    try {
      // Load the YAML file
      const yamlPath = join(__dirname, 'community-metrics.yaml')
      const yamlContent = readFileSync(yamlPath, 'utf8')
      const rawData = load(yamlContent) as any

      // Transform and validate data
      const data: CommunityMetricsData = {
        holders: rawData.holders || {},
        growth: rawData.growth || {},
        geography: rawData.geography || {},
        platform: rawData.platform || {},
        developers: rawData.developers || {},
        economics: rawData.economics || {},
        metadata: rawData.metadata || {},
        lastUpdated: rawData.metadata?.lastFullUpdate || new Date().toISOString(),
        dataVersion: '1.0.0',
        validationStatus: 'verified'
      }

      // Validate critical metrics exist
      const requiredHolderTypes = ['kevin', 'stamps', 'src20_tokens', 'src721_nfts', 'src101_names']
      for (const type of requiredHolderTypes) {
        if (!data.holders[type]) {
          console.warn(`⚠️ Missing holder data for: ${type}`)
          data.validationStatus = 'error'
        }
      }

      // Calculate derived metrics
      if (data.holders.src20_tokens?.topTokens) {
        const totalHolders = data.holders.src20_tokens.topTokens
          .reduce((sum, token) => sum + token.holders, 0)
        console.log(`📊 Top tokens represent ${totalHolders} holders`)
      }

      console.log(`✅ Loaded community metrics with ${Object.keys(data.holders).length} holder categories`)
      return data

    } catch (error) {
      console.error('❌ Failed to load community metrics:', error)
      throw new Error(`Community metrics data loading failed: ${error.message}`)
    }
  }
})

// Export metric accessors for components
export const getTokenMetrics = (tokenKey: string): TokenMetrics | null => {
  const tokenData = data?.holders?.[tokenKey as keyof typeof data.holders]
  return tokenData && 'totalHolders' in tokenData ? tokenData as TokenMetrics : null
}

export const getKevinMetrics = () => {
  return data?.holders?.kevin || null
}

export const getStampMetrics = () => {
  return data?.holders?.stamps || null
}

export const getSRC20Metrics = () => {
  return data?.holders?.src20_tokens || null
}

export const getTopTokens = (): TopToken[] => {
  return data?.holders?.src20_tokens?.topTokens || []
}

export const getNFTMetrics = () => {
  return data?.holders?.src721_nfts || null
}

export const getNamingMetrics = () => {
  return data?.holders?.src101_names || null
}

export const getGrowthMetrics = () => {
  return data?.growth || null
}

export const getGeographicData = () => {
  return data?.geography || null
}

export const getPlatformStats = () => {
  return data?.platform || null
}

export const getDeveloperStats = () => {
  return data?.developers || null
}

export const getEconomicMetrics = () => {
  return data?.economics || null
}

// Utility functions for formatted display
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toString()
}

export const formatCurrency = (value: string, currency: string = 'BTC'): string => {
  return `${value} ${currency}`
}

export const formatPercentage = (value: string): string => {
  return value.includes('%') ? value : `${value}%`
}

// Analytics helpers
export const getTotalValueLocked = (): string => {
  return data?.economics?.total_value_locked || '0 BTC'
}

export const getTotalHolders = (): number => {
  if (!data?.holders) return 0
  
  const kevinHolders = data.holders.kevin?.totalHolders || 0
  const stampHolders = data.holders.stamps?.totalHolders || 0
  
  // Avoid double counting - use unique addresses
  return Math.max(kevinHolders, stampHolders)
}

export const getTotalTokens = (): number => {
  return data?.holders?.src20_tokens?.totalTokens || 0
}

export const getTotalNFTs = (): number => {
  return data?.holders?.src721_nfts?.totalNFTs || 0
}

export const getActiveUsers = (): number => {
  return data?.growth?.daily_active_users?.current || 0
}

// Market data helpers
export const getMarketCap = (tokenName?: string): string => {
  if (!tokenName) {
    return data?.economics?.market_cap_all_tokens || '0 BTC'
  }
  
  const topToken = data?.holders?.src20_tokens?.topTokens?.find(
    token => token.name.toLowerCase() === tokenName.toLowerCase()
  )
  
  return topToken?.marketCap || '0 BTC'
}

export const get24hVolume = (tokenName?: string): string => {
  if (!tokenName) {
    return data?.holders?.src20_tokens?.totalVolume24h || '0 BTC'
  }
  
  const topToken = data?.holders?.src20_tokens?.topTokens?.find(
    token => token.name.toLowerCase() === tokenName.toLowerCase()
  )
  
  return topToken?.volume24h || '0 BTC'
}

// Growth rate calculations
export const getGrowthRate = (metric: string, period: '30day' | '90day' = '30day'): string => {
  if (metric === 'kevin' && period === '30day') {
    return data?.holders?.kevin?.growthRate30Day || '0%'
  }
  if (metric === 'kevin' && period === '90day') {
    return data?.holders?.kevin?.growthRate90Day || '0%'
  }
  return '0%'
}

// Data quality metrics
export const getDataQuality = () => {
  return {
    accuracy: data?.metadata?.dataAccuracy || 'unknown',
    lastUpdate: data?.metadata?.lastFullUpdate || 'unknown',
    sources: data?.metadata?.sources || [],
    confidence: data?.metadata?.confidenceLevel || 'unknown'
  }
}

// Export validation helpers
export const validateMetricsData = (): boolean => {
  if (!data) return false
  
  const requiredSections = ['holders', 'growth', 'economics']
  return requiredSections.every(section => section in data)
}

export const getMetricsStats = () => {
  if (!data) return null
  
  return {
    holderCategories: Object.keys(data.holders).length,
    totalTrackedTokens: getTotalTokens(),
    totalTrackedNFTs: getTotalNFTs(),
    dataAccuracy: data.metadata?.dataAccuracy || 'unknown',
    lastUpdated: data.lastUpdated,
    validationStatus: data.validationStatus
  }
}