/**
 * VitePress data loader for Technical Specifications
 * Loads centralized protocol specifications at build time
 */

import { defineLoader } from 'vitepress'
import { readFileSync } from 'fs'
import { join } from 'path'
import { load } from 'js-yaml'
import type { TechnicalSpecsData, ProtocolSpec, APISpec } from '../types/technical-data'

declare const data: TechnicalSpecsData
export { data }

export default defineLoader({
  async load(): Promise<TechnicalSpecsData> {
    try {
      // Load the YAML file
      const yamlPath = join(__dirname, 'technical-specs.yaml')
      const yamlContent = readFileSync(yamlPath, 'utf8')
      const rawData = load(yamlContent) as any

      // Transform and validate data
      const data: TechnicalSpecsData = {
        protocols: rawData.protocols || {},
        network: rawData.network || {},
        transactions: rawData.transactions || {},
        api: rawData.api || {},
        tools: rawData.tools || {},
        validation: rawData.validation || {},
        performance: rawData.performance || {},
        standards: rawData.standards || {},
        errors: rawData.errors || {},
        metadata: rawData.metadata || {},
        lastUpdated: rawData.metadata?.last_updated || new Date().toISOString(),
        dataVersion: rawData.metadata?.schema_version || '1.0.0',
        validationStatus: 'verified'
      }

      // Validate protocol specifications
      const requiredProtocols = ['src20', 'src721', 'src101', 'olga']
      for (const protocol of requiredProtocols) {
        if (!data.protocols[protocol]) {
          console.warn(`⚠️ Missing protocol specification: ${protocol}`)
          data.validationStatus = 'error'
        } else {
          const spec = data.protocols[protocol]
          if (!spec.version || !spec.status || !spec.launchBlock) {
            console.warn(`⚠️ Incomplete protocol spec for: ${protocol}`)
          }
        }
      }

      // Validate network constants
      if (!data.network?.bitcoin || !data.network?.stamps) {
        console.warn('⚠️ Missing network constants')
        data.validationStatus = 'error'
      }

      // Validate API specification
      if (!data.api?.current_version || !data.api?.base_url) {
        console.warn('⚠️ Incomplete API specification')
      }

      console.log(`✅ Loaded technical specifications for ${Object.keys(data.protocols).length} protocols`)
      return data

    } catch (error) {
      console.error('❌ Failed to load technical specifications:', error)
      throw new Error(`Technical specs data loading failed: ${error.message}`)
    }
  }
})

// Protocol spec accessors
export const getProtocolSpec = (protocol: string): ProtocolSpec | null => {
  return data?.protocols?.[protocol as keyof typeof data.protocols] || null
}

export const getSRC20Spec = () => {
  return data?.protocols?.src20 || null
}

export const getSRC721Spec = () => {
  return data?.protocols?.src721 || null
}

export const getSRC101Spec = () => {
  return data?.protocols?.src101 || null
}

export const getOLGASpec = () => {
  return data?.protocols?.olga || null
}

export const getActiveProtocols = () => {
  if (!data?.protocols) return {}
  
  return Object.entries(data.protocols)
    .filter(([, spec]) => spec.status === 'active')
    .reduce((acc, [key, spec]) => {
      acc[key] = spec
      return acc
    }, {} as typeof data.protocols)
}

export const getProtocolsByBlock = (blockHeight: number) => {
  if (!data?.protocols) return {}
  
  return Object.entries(data.protocols)
    .filter(([, spec]) => spec.launchBlock <= blockHeight)
    .reduce((acc, [key, spec]) => {
      acc[key] = spec
      return acc
    }, {} as typeof data.protocols)
}

// Network constants accessors
export const getBitcoinConstants = () => {
  return data?.network?.bitcoin || null
}

export const getStampsConstants = () => {
  return data?.network?.stamps || null
}

export const getNetworkConstants = () => {
  return data?.network || null
}

// Transaction specs accessors
export const getTransactionSpec = (txType: string) => {
  return data?.transactions?.[txType as keyof typeof data.transactions] || null
}

export const getStampCreationSpec = () => {
  return data?.transactions?.stamp_creation || null
}

export const getTokenTransferSpec = () => {
  return data?.transactions?.token_transfer || null
}

export const getNFTTransferSpec = () => {
  return data?.transactions?.nft_transfer || null
}

// API specification accessors
export const getAPISpec = (): APISpec | null => {
  return data?.api || null
}

export const getAPIEndpoint = (endpoint: string) => {
  return data?.api?.endpoints?.[endpoint] || null
}

export const getCurrentAPIVersion = (): string => {
  return data?.api?.current_version || 'unknown'
}

export const getSupportedAPIVersions = (): string[] => {
  return data?.api?.supported_versions || []
}

export const getDeprecatedAPIVersions = (): string[] => {
  return data?.api?.deprecated_versions || []
}

// Tool specifications
export const getSDKSpec = (language: string) => {
  return data?.tools?.sdk?.[language] || null
}

export const getCLISpec = () => {
  return data?.tools?.cli || null
}

// Validation rules
export const getValidationRules = () => {
  return data?.validation || null
}

export const getValidationRule = (rule: string) => {
  return data?.validation?.[rule as keyof typeof data.validation] || null
}

// Performance benchmarks
export const getPerformanceBenchmarks = () => {
  return data?.performance || null
}

export const getPerformanceBenchmark = (metric: string): string => {
  return data?.performance?.[metric as keyof typeof data.performance] || 'unknown'
}

// Standards and compliance
export const getComplianceStandards = () => {
  return data?.standards || null
}

export const getStandard = (standard: string): string => {
  return data?.standards?.[standard as keyof typeof data.standards] || 'unknown'
}

// Error codes
export const getErrorCodes = () => {
  return data?.errors || null
}

export const getErrorCode = (category: string, error: string): string => {
  return data?.errors?.[category as keyof typeof data.errors]?.[error] || 'UNKNOWN'
}

export const getValidationErrors = () => {
  return data?.errors?.validation || {}
}

export const getProtocolErrors = () => {
  return data?.errors?.protocol || {}
}

export const getNetworkErrors = () => {
  return data?.errors?.network || {}
}

// Utility functions for components
export const formatGasPrice = (gasPrice: number): string => {
  if (gasPrice >= 1000) {
    return `${(gasPrice / 1000).toFixed(1)}k sats`
  }
  return `${gasPrice} sats`
}

export const formatByteSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)}KB`
  }
  return `${bytes} bytes`
}

export const formatTimeWindow = (seconds: number): string => {
  if (seconds >= 3600) {
    return `${(seconds / 3600).toFixed(1)}h`
  }
  if (seconds >= 60) {
    return `${(seconds / 60).toFixed(1)}m`
  }
  return `${seconds}s`
}

// Protocol compatibility checks
export const isProtocolActive = (protocol: string): boolean => {
  const spec = getProtocolSpec(protocol)
  return spec?.status === 'active'
}

export const getProtocolVersion = (protocol: string): string => {
  const spec = getProtocolSpec(protocol)
  return spec?.version || 'unknown'
}

export const getProtocolLaunchBlock = (protocol: string): number | null => {
  const spec = getProtocolSpec(protocol)
  return spec?.launchBlock || null
}

export const getProtocolFeatures = (protocol: string): string[] => {
  const spec = getProtocolSpec(protocol)
  return spec?.features || []
}

// Compatibility checking
export const checkBitcoinCoreCompatibility = (version: string): boolean => {
  const requiredVersion = data?.metadata?.bitcoin_core_compatibility || '24.0+'
  // Simple version comparison - in practice this would be more sophisticated
  return version >= requiredVersion.replace('+', '')
}

// Data statistics
export const getTechnicalSpecsStats = () => {
  if (!data) return null
  
  return {
    totalProtocols: Object.keys(data.protocols).length,
    activeProtocols: Object.values(data.protocols).filter(p => p.status === 'active').length,
    apiVersion: data.api?.current_version || 'unknown',
    supportedLanguages: Object.keys(data.tools?.sdk || {}).length,
    validationRules: Object.keys(data.validation || {}).length,
    lastUpdated: data.lastUpdated,
    validationStatus: data.validationStatus
  }
}

// Export validation helpers
export const validateTechnicalSpecs = (): boolean => {
  if (!data) return false
  
  const requiredSections = ['protocols', 'network', 'transactions', 'api']
  return requiredSections.every(section => section in data)
}