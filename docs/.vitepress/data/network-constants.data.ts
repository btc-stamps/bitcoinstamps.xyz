/**
 * VitePress data loader for Network Constants
 * Loads centralized Bitcoin network parameters at build time
 */

import { defineLoader } from 'vitepress'
import { readFileSync } from 'fs'
import { join } from 'path'
import { load } from 'js-yaml'
import type { NetworkConstantsData, NetworkConfig } from '../types/technical-data'

declare const data: NetworkConstantsData
export { data }

export default defineLoader({
  async load(): Promise<NetworkConstantsData> {
    try {
      // Load the YAML file
      const yamlPath = join(__dirname, 'network-constants.yaml')
      const yamlContent = readFileSync(yamlPath, 'utf8')
      const rawData = load(yamlContent) as any

      // Transform and validate data
      const data: NetworkConstantsData = {
        bitcoin_network: rawData.bitcoin_network || {},
        protocol: rawData.protocol || {},
        economics: rawData.economics || {},
        stamps_network: rawData.stamps_network || {},
        rpc_nodes: rawData.rpc_nodes || {},
        time: rawData.time || {},
        cryptography: rawData.cryptography || {},
        network: rawData.network || {},
        validation: rawData.validation || {},
        addresses: rawData.addresses || {},
        integration: rawData.integration || {},
        storage: rawData.storage || {},
        metadata: rawData.metadata || {},
        lastUpdated: rawData.metadata?.last_updated || new Date().toISOString(),
        dataVersion: rawData.metadata?.constants_version || '1.0.0',
        validationStatus: 'verified'
      }

      // Validate network configurations
      const requiredNetworks = ['mainnet', 'testnet', 'regtest']
      for (const network of requiredNetworks) {
        if (!data.bitcoin_network[network as keyof typeof data.bitcoin_network]) {
          console.warn(`⚠️ Missing network configuration: ${network}`)
          data.validationStatus = 'error'
        }
      }

      // Validate protocol consensus rules
      if (!data.protocol?.consensus || !data.protocol?.mining || !data.protocol?.supply) {
        console.warn('⚠️ Missing critical protocol parameters')
        data.validationStatus = 'error'
      }

      // Validate Stamps-specific constants
      if (!data.stamps_network?.minimum_stamp_fee || !data.stamps_network?.maximum_image_size) {
        console.warn('⚠️ Missing Stamps network constants')
      }

      console.log(`✅ Loaded network constants for ${requiredNetworks.length} Bitcoin networks`)
      return data

    } catch (error) {
      console.error('❌ Failed to load network constants:', error)
      throw new Error(`Network constants data loading failed: ${error.message}`)
    }
  }
})

// Bitcoin network accessors
export const getNetworkConfig = (network: 'mainnet' | 'testnet' | 'regtest'): NetworkConfig | null => {
  return data?.bitcoin_network?.[network] || null
}

export const getMainnetConfig = (): NetworkConfig | null => {
  return getNetworkConfig('mainnet')
}

export const getTestnetConfig = (): NetworkConfig | null => {
  return getNetworkConfig('testnet')
}

export const getRegtestConfig = (): NetworkConfig | null => {
  return getNetworkConfig('regtest')
}

// Protocol constants accessors
export const getConsensusRules = () => {
  return data?.protocol?.consensus || null
}

export const getMiningParameters = () => {
  return data?.protocol?.mining || null
}

export const getSupplySchedule = () => {
  return data?.protocol?.supply || null
}

export const getTransactionParameters = () => {
  return data?.protocol?.transaction || null
}

export const getScriptParameters = () => {
  return data?.protocol?.script || null
}

// Economic constants
export const getEconomicParameters = () => {
  return data?.economics || null
}

export const getDustLimit = (): number => {
  return data?.economics?.dust_limit || 546
}

export const getDefaultRelayFee = (): number => {
  return data?.economics?.default_relay_fee || 1000
}

export const getMaxMoney = (): number => {
  return data?.economics?.max_money || 2100000000000000
}

export const getSatoshisPerBTC = (): number => {
  return data?.economics?.coin || 100000000
}

// Stamps network constants
export const getStampsNetworkConfig = () => {
  return data?.stamps_network || null
}

export const getMinimumStampFee = (): number => {
  return data?.stamps_network?.minimum_stamp_fee || 546
}

export const getRecommendedStampFee = (): number => {
  return data?.stamps_network?.recommended_stamp_fee || 1000
}

export const getMaximumImageSize = (): number => {
  return data?.stamps_network?.maximum_image_size || 80000
}

export const getSupportedImageFormats = (): string[] => {
  return data?.stamps_network?.supported_image_formats || []
}

export const getStampsGasPrices = () => {
  return data?.stamps_network?.gas_prices || null
}

export const getConfirmationRequirements = () => {
  return data?.stamps_network?.confirmations || null
}

export const getIndexingParameters = () => {
  return data?.stamps_network?.indexing || null
}

// RPC configuration
export const getRPCConfig = () => {
  return data?.rpc_nodes || null
}

export const getPrimaryRPCNode = () => {
  return data?.rpc_nodes?.primary || null
}

export const getFallbackRPCNode = () => {
  return data?.rpc_nodes?.fallback || null
}

export const getTestnetRPCNode = () => {
  return data?.rpc_nodes?.testnet || null
}

// Time constants
export const getTimeConstants = () => {
  return data?.time || null
}

export const getBlockIntervalTarget = (): number => {
  return data?.time?.block_interval_target || 600
}

export const getDifficultyAdjustmentInterval = (): number => {
  return data?.time?.difficulty_adjustment_interval || 1209600
}

export const getTimestampRules = () => {
  return data?.time?.timestamp_rules || null
}

export const getCheckpointIntervals = () => {
  return data?.time?.checkpoint_intervals || null
}

// Cryptographic constants
export const getCryptographicConstants = () => {
  return data?.cryptography || null
}

export const getHashAlgorithms = () => {
  return data?.cryptography?.hash_algorithms || {}
}

export const getSignatureSchemes = () => {
  return data?.cryptography?.signature_schemes || {}
}

export const getKeySizes = () => {
  return data?.cryptography?.key_sizes || null
}

// Network communication
export const getNetworkCommunication = () => {
  return data?.network || null
}

export const getProtocolVersion = (): number => {
  return data?.network?.protocol_version || 70016
}

export const getUserAgent = (): string => {
  return data?.network?.user_agent || '/Satoshi:24.0.0/'
}

export const getServices = () => {
  return data?.network?.services || {}
}

export const getMessageLimits = () => {
  return data?.network?.message_limits || null
}

export const getNetworkTimeouts = () => {
  return data?.network?.timeouts || {}
}

// Block validation
export const getBlockValidationConstants = () => {
  return data?.validation || null
}

export const getMaxFutureBlockTime = (): number => {
  return data?.validation?.max_future_block_time || 7200
}

export const getCoinbaseMaturity = (): number => {
  return data?.validation?.coinbase_maturity || 100
}

export const getBIP16SwitchTime = (): number => {
  return data?.validation?.bip16_switch_time || 1333238400
}

export const getScriptVerificationFlags = (): string[] => {
  return data?.validation?.script_verification_flags || []
}

// Address constants
export const getAddressConstants = () => {
  return data?.addresses || null
}

export const getAddressFormats = () => {
  return data?.addresses?.formats || {}
}

export const getAddressValidation = () => {
  return data?.addresses?.validation || null
}

// Integration constants
export const getIntegrationConstants = () => {
  return data?.integration || null
}

export const getAPIVersion = (): string => {
  return data?.integration?.api_version || '2.1'
}

export const getWebSocketVersion = (): string => {
  return data?.integration?.websocket_version || '1.0'
}

export const getRESTAPILimits = () => {
  return data?.integration?.rest_api_limits || null
}

export const getPaginationSettings = () => {
  return data?.integration?.pagination || null
}

// Storage constants
export const getStorageConstants = () => {
  return data?.storage || null
}

export const getIndexDepths = () => {
  return data?.storage?.index_depths || null
}

export const getPruningSettings = () => {
  return data?.storage?.pruning_settings || null
}

// Utility functions
export const formatSatoshis = (sats: number, showUnit: boolean = true): string => {
  const btc = sats / getSatoshisPerBTC()
  if (btc >= 1) {
    return showUnit ? `${btc.toFixed(8)} BTC` : btc.toFixed(8)
  }
  return showUnit ? `${sats} sats` : sats.toString()
}

export const formatBlockTime = (seconds: number): string => {
  if (seconds >= 3600) {
    return `${(seconds / 3600).toFixed(1)} hours`
  }
  if (seconds >= 60) {
    return `${(seconds / 60).toFixed(1)} minutes`
  }
  return `${seconds} seconds`
}

export const formatBytes = (bytes: number): string => {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }
  if (bytes >= 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }
  return `${bytes} bytes`
}

// Network validation
export const isValidNetwork = (network: string): network is 'mainnet' | 'testnet' | 'regtest' => {
  return ['mainnet', 'testnet', 'regtest'].includes(network)
}

export const getNetworkByPort = (port: number): string | null => {
  if (port === 8333) return 'mainnet'
  if (port === 18333) return 'testnet'
  if (port === 18444) return 'regtest'
  return null
}

export const getNetworkByMagicBytes = (magicBytes: string): string | null => {
  const networks = data?.bitcoin_network
  if (!networks) return null
  
  return Object.entries(networks).find(([, config]) => 
    config.magicBytes === magicBytes
  )?.[0] || null
}

// Compatibility checks
export const isBitcoinCoreCompatible = (version: string): boolean => {
  const requiredVersion = data?.metadata?.bitcoin_core_compatibility || '24.0+'
  return version >= requiredVersion.replace('+', '')
}

// Data statistics
export const getNetworkConstantsStats = () => {
  if (!data) return null
  
  return {
    networksConfigured: Object.keys(data.bitcoin_network).length,
    protocolRules: Object.keys(data.protocol).length,
    rpcNodes: Object.keys(data.rpc_nodes).length,
    addressFormats: Object.keys(data.addresses?.formats || {}).length,
    lastUpdated: data.lastUpdated,
    validationStatus: data.validationStatus,
    bitcoinCompatibility: data.metadata?.bitcoin_core_compatibility
  }
}

// Export validation helpers
export const validateNetworkConstants = (): boolean => {
  if (!data) return false
  
  const requiredSections = ['bitcoin_network', 'protocol', 'economics', 'stamps_network']
  return requiredSections.every(section => section in data)
}