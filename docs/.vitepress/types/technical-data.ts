/**
 * TypeScript definitions for Bitcoin Stamps technical data system
 * Provides type safety for centralized technical constants
 */

// Base types for common data structures
export interface TimestampedData {
  lastUpdated: string;
  dataVersion?: string;
  validationStatus?: 'verified' | 'pending' | 'error';
}

export interface BlockReference {
  blockHeight: number;
  blockDate: string;
  transactionId?: string;
}

export interface CulturalSignificance {
  culturalSignificance: 'highest' | 'high' | 'medium' | 'low';
  networkImpact: string;
}

// Protocol Milestones Types
export interface ProtocolMilestone extends BlockReference, CulturalSignificance {
  significance: string;
  creator?: string;
  deployerAddress?: string;
  tokenTicker?: string;
  tokenSupply?: number;
  title: string;
  description: string;
  protocolVersion?: string;
  stampNumber?: number;
  enhancements?: string[];
  encodingEfficiency?: string;
}

export interface TimelineEra {
  startBlock: number;
  endBlock: number | null;
  duration?: string;
  keyEvents: string[];
  significance: string;
}

export interface BlockMetadata {
  networkDifficulty: string;
  bitcoinPrice: string;
  transactionFees: string;
  stampGasPrice: string;
}

export interface ProtocolMilestonesData extends TimestampedData {
  milestones: Record<string, ProtocolMilestone>;
  timeline: Record<string, TimelineEra>;
  blockMetadata: Record<number, BlockMetadata>;
  culturalRanking: Record<string, string[]>;
  apiMetadata: {
    lastUpdated: string;
    dataVersion: string;
    validationStatus: string;
    sources: string[];
  };
}

// Community Metrics Types
export interface TokenMetrics {
  totalHolders: number;
  activeHolders: number;
  uniqueAddresses: number;
  top10Holdings: string;
  averageHolding: string;
  medianHolding: string;
  largestSingleHolding: string;
  distributionMetric: string;
  lastUpdated: string;
  growthRate30Day: string;
  growthRate90Day: string;
}

export interface StampMetrics {
  totalStamps: number;
  uniqueCreators: number;
  totalHolders: number;
  averageStampsPerHolder: number;
  mostActiveCreator: string;
  mostActiveCreatorStamps: number;
  totalValueLocked: string;
  floorPrice: string;
  averagePrice: string;
  totalVolume30Day: string;
  lastUpdated: string;
}

export interface TopToken {
  name: string;
  holders: number;
  marketCap: string;
  volume24h: string;
}

export interface TokenEcosystemMetrics {
  totalTokens: number;
  activeTokens: number;
  totalHolders: number;
  topTokens: TopToken[];
  totalMarketCap: string;
  totalVolume24h: string;
  lastUpdated: string;
}

export interface NFTMetrics {
  totalCollections: number;
  totalNFTs: number;
  totalHolders: number;
  averageNFTsPerHolder: number;
  floorPriceAverage: string;
  totalVolume30Day: string;
  mostPopularCollection: string;
  lastUpdated: string;
}

export interface NamingMetrics {
  totalNames: number;
  activeNames: number;
  totalHolders: number;
  averageNamesPerHolder: number;
  mostExpensiveName: string;
  namePrice: string;
  registrationFee: string;
  lastUpdated: string;
}

export interface GrowthMetrics {
  daily_active_users: MetricWithGrowth;
  weekly_transactions: MetricWithGrowth;
  monthly_new_users: MetricWithHistory;
}

export interface MetricWithGrowth {
  current: number;
  peak: number;
  average30day: number;
  growthRate: string;
}

export interface MetricWithHistory {
  current: number;
  last3months: number[];
  growthRate: string;
}

export interface GeographicData {
  regions: Record<string, string>;
  top_countries: Array<{
    country: string;
    percentage: string;
  }>;
}

export interface PlatformStats {
  websites: Record<string, number>;
  social: Record<string, number>;
}

export interface DeveloperEcosystem {
  active_contributors: number;
  github_repositories: number;
  npm_downloads_monthly: number;
  api_integrations: number;
  sdk_downloads: number;
}

export interface EconomicMetrics {
  total_value_locked: string;
  total_fees_paid: string;
  average_transaction_fee: string;
  daily_transaction_volume: string;
  market_cap_all_tokens: string;
}

export interface CommunityMetricsData extends TimestampedData {
  holders: {
    kevin: TokenMetrics;
    stamps: StampMetrics;
    src20_tokens: TokenEcosystemMetrics;
    src721_nfts: NFTMetrics;
    src101_names: NamingMetrics;
  };
  growth: GrowthMetrics;
  geography: GeographicData;
  platform: PlatformStats;
  developers: DeveloperEcosystem;
  economics: EconomicMetrics;
  metadata: {
    lastFullUpdate: string;
    updateFrequency: string;
    dataAccuracy: string;
    sources: string[];
    validationStatus: string;
    confidenceLevel: string;
  };
}

// Technical Specifications Types
export interface ProtocolSpec {
  version: string;
  status: 'active' | 'deprecated' | 'development';
  launchBlock: number;
  enhancementBlock?: number;
  features: string[];
  compatibilityLevel: string;
  protocolVersion?: string;
}

export interface SRC20Spec extends ProtocolSpec {
  maxSupply: string;
  minTransferAmount: number;
  decimalsSupported: number;
  gasEfficiency: string;
}

export interface SRC721Spec extends ProtocolSpec {
  maxTokenId: string;
  metadataStandard: string;
  imageSupport: string[];
  maxMetadataSize: string;
}

export interface SRC101Spec extends ProtocolSpec {
  maxNameLength: number;
  minNameLength: number;
  allowedCharacters: string;
  registrationPeriod: string;
  renewalPeriod: string;
  maxSubdomainLevels: number;
}

export interface OLGASpec extends ProtocolSpec {
  encodingEfficiency: string;
  supportedFormats: string[];
  maxInputSize: string;
  maxOutputSize: string;
  algorithmType: string;
}

export interface NetworkConstants {
  bitcoin: {
    minTxFee: number;
    maxTxSize: number;
    maxBlockSize: number;
    targetBlockTime: number;
    difficultyAdjustment: number;
    halvingInterval: number;
    maxSupply: number;
    currentSupply: number;
  };
  stamps: {
    minStampSize: number;
    maxImageSize: number;
    defaultGasPrice: number;
    recommendedGasPrice: number;
    maxGasPrice: number;
    confirmationThreshold: number;
    reorgSafeDepth: number;
  };
}

export interface TransactionSpecs {
  stamp_creation: TransactionSpec;
  token_transfer: TransactionSpec;
  nft_transfer: TransactionSpec;
}

export interface TransactionSpec {
  minFee: number;
  recommendedFee: number;
  maxAmount?: string;
  maxDataSize?: number;
  requiredConfirmations: number;
  encoding: string;
  mimeTypes?: string[];
  metadataEncoding?: string;
}

export interface APISpec {
  current_version: string;
  supported_versions: string[];
  deprecated_versions: string[];
  base_url: string;
  rate_limits: Record<string, string>;
  response_format: string;
  max_response_size: string;
  timeout: string;
  endpoints: Record<string, EndpointSpec>;
}

export interface EndpointSpec {
  path: string;
  methods: string[];
  pagination?: boolean;
  max_per_page?: number;
  default_per_page?: number;
  authentication?: string;
  rate_limit?: string;
}

export interface TechnicalSpecsData extends TimestampedData {
  protocols: {
    src20: SRC20Spec;
    src721: SRC721Spec;
    src101: SRC101Spec;
    olga: OLGASpec;
  };
  network: NetworkConstants;
  transactions: TransactionSpecs;
  api: APISpec;
  tools: {
    sdk: Record<string, SDKSpec>;
    cli: CLISpec;
  };
  validation: ValidationRules;
  performance: PerformanceBenchmarks;
  standards: ComplianceStandards;
  errors: ErrorCodes;
  metadata: {
    schema_version: string;
    last_updated: string;
    maintainers: string[];
    data_sources: string[];
    validation_status: string;
    breaking_changes_policy: string;
  };
}

export interface SDKSpec {
  version: string;
  npm_package?: string;
  pip_package?: string;
  min_node_version?: string;
  min_python_version?: string;
  typescript_support?: boolean;
  type_hints?: boolean;
}

export interface CLISpec {
  version: string;
  npm_package: string;
  binary_name: string;
  supported_platforms: string[];
}

export interface ValidationRules {
  block_heights: {
    min: number;
    max: number | null;
    format: string;
  };
  addresses: {
    format: string;
    types: string[];
    validation: string;
  };
  token_amounts: {
    min: number;
    max: string;
    format: string;
    decimals: number;
  };
  image_data: {
    max_size: number;
    formats: string[];
    encoding: string;
    validation: string;
  };
}

export interface PerformanceBenchmarks {
  indexing_speed: string;
  api_response_time: string;
  database_query_time: string;
  image_processing_time: string;
  compression_speed: string;
}

export interface ComplianceStandards {
  json_schema: string;
  uri_format: string;
  datetime_format: string;
  encoding_standards: string[];
  hash_algorithms: string[];
}

export interface ErrorCodes {
  validation: Record<string, string>;
  protocol: Record<string, string>;
  network: Record<string, string>;
}

// Network Constants Types
export interface NetworkConfig {
  networkId: string;
  chainId: number;
  port: number;
  rpcPort: number;
  magicBytes: string;
  addressPrefixes: AddressPrefixes;
  wifPrefix?: number;
  extendedKeyPrefixes?: {
    public: string;
    private: string;
  };
}

export interface AddressPrefixes {
  p2pkh: number;
  p2sh: number;
  bech32: string;
  bech32m: string;
}

export interface ConsensusRules {
  maxBlockSize: number;
  maxBlockBaseSize: number;
  maxTxSize: number;
  maxTxSigOps: number;
  maxScriptSize: number;
  maxPubkeySize: number;
  maxTxInSequence: number;
}

export interface MiningParameters {
  targetBlockTime: number;
  difficultyAdjustmentPeriod: number;
  maxDifficultyAdjustment: number;
  minDifficultyAdjustment: number;
  powLimit: string;
  bip34Height: number;
}

export interface SupplySchedule {
  maxSupply: number;
  initialReward: number;
  halvingInterval: number;
  subsidyHalvingBlocks: number[];
  finalHalvingBlock: number;
}

export interface NetworkConstantsData extends TimestampedData {
  bitcoin_network: {
    mainnet: NetworkConfig;
    testnet: NetworkConfig;
    regtest: NetworkConfig;
  };
  protocol: {
    consensus: ConsensusRules;
    mining: MiningParameters;
    supply: SupplySchedule;
    transaction: TransactionParameters;
    script: ScriptParameters;
  };
  economics: EconomicParameters;
  stamps_network: StampsNetworkConfig;
  rpc_nodes: RPCConfiguration;
  time: TimeConstants;
  cryptography: CryptographicConstants;
  network: NetworkCommunication;
  validation: BlockValidationConstants;
  addresses: AddressConstants;
  integration: IntegrationConstants;
  storage: StorageConstants;
  metadata: {
    constants_version: string;
    bitcoin_core_compatibility: string;
    last_updated: string;
    network_upgrade_tracking: boolean;
    sources: string[];
    validation_status: string;
  };
}

export interface TransactionParameters {
  minTxFee: number;
  maxStandardTxWeight: number;
  standardTxNonSegwitSize: number;
  witnessScaleFactor: number;
  segwitDiscount: number;
}

export interface ScriptParameters {
  maxOpsPerScript: number;
  maxPubkeysPerMultisig: number;
  maxStackSize: number;
  maxScriptElementSize: number;
  maxStandardMultisigKeys: number;
}

export interface EconomicParameters {
  dust_limit: number;
  default_relay_fee: number;
  min_relay_fee: number;
  max_money: number;
  coin: number;
  fee_estimation: Record<string, string>;
}

export interface StampsNetworkConfig {
  minimum_stamp_fee: number;
  recommended_stamp_fee: number;
  maximum_image_size: number;
  supported_image_formats: string[];
  gas_prices: {
    minimum: number;
    recommended: number;
    fast: number;
    maximum: number;
  };
  confirmations: Record<string, number>;
  indexing: {
    reorg_safe_depth: number;
    finality_threshold: number;
    pruning_depth: number;
  };
}

export interface RPCConfiguration {
  primary: RPCNodeConfig;
  fallback: RPCNodeConfig;
  testnet: RPCNodeConfig;
}

export interface RPCNodeConfig {
  host: string;
  port: number;
  ssl: boolean;
  timeout: number;
  max_connections?: number;
}

export interface TimeConstants {
  block_interval_target: number;
  difficulty_adjustment_interval: number;
  timestamp_rules: {
    max_future_time: number;
    median_time_past: number;
  };
  checkpoint_intervals: {
    major: number;
    minor: number;
    validation: number;
  };
}

export interface CryptographicConstants {
  hash_algorithms: Record<string, string>;
  signature_schemes: Record<string, string>;
  key_sizes: {
    private_key: number;
    public_key_compressed: number;
    public_key_uncompressed: number;
    signature_der_max: number;
    signature_compact: number;
  };
}

export interface NetworkCommunication {
  protocol_version: number;
  user_agent: string;
  services: Record<string, number>;
  message_limits: {
    max_message_size: number;
    max_inventory_size: number;
    max_addresses_per_message: number;
    max_blocks_in_transit: number;
  };
  timeouts: Record<string, number>;
}

export interface BlockValidationConstants {
  max_future_block_time: number;
  coinbase_maturity: number;
  bip16_switch_time: number;
  bip65_height: number;
  bip66_height: number;
  csv_height: number;
  segwit_height: number;
  script_verification_flags: string[];
}

export interface AddressConstants {
  formats: Record<string, string>;
  validation: {
    checksum_required: boolean;
    case_sensitive: boolean;
    max_length: number;
    min_length: number;
  };
}

export interface IntegrationConstants {
  api_version: string;
  websocket_version: string;
  rest_api_limits: {
    requests_per_hour: number;
    max_response_size: number;
    timeout: number;
  };
  pagination: {
    default_page_size: number;
    max_page_size: number;
    max_pages: number;
  };
}

export interface StorageConstants {
  index_depths: {
    address_index: number;
    transaction_index: number;
    utxo_set: string;
  };
  pruning_settings: {
    min_disk_space: number;
    target_disk_space: number;
    prune_depth: number;
  };
}

// External Links Types
export interface APIEndpoint {
  name: string;
  base_url: string;
  documentation: string;
  status_page?: string;
  version: string;
  rate_limits: Record<string, number>;
  endpoints: Record<string, string>;
  websocket?: string;
}

export interface SimpleAPIEndpoint {
  name: string;
  default_port?: number;
  testnet_port?: number;
  regtest_port?: number;
  documentation: string;
}

export interface BlockExplorer {
  name: string;
  url: string;
  api?: string;
}

export interface Repository {
  url: string;
  description: string;
  language: string;
  npm?: string;
}

export interface PackageManager {
  sdk?: string;
  cli?: string;
}

export interface SocialLink {
  url: string;
  handle?: string;
  name?: string;
}

export interface Tool {
  url: string;
  type: string;
  platforms?: string[];
  description?: string;
}

export interface ExternalLinksData extends TimestampedData {
  apis: {
    stampchain: APIEndpoint;
    bitcoin_core: SimpleAPIEndpoint;
    counterparty: APIEndpoint;
  };
  explorers: {
    primary: BlockExplorer;
    bitcoin: BlockExplorer[];
  };
  markets: {
    primary: BlockExplorer;
    aggregators: BlockExplorer[];
  };
  development: {
    repositories: Record<string, Repository>;
    package_managers: {
      npm: PackageManager;
      pip: PackageManager;
      docker: PackageManager;
    };
  };
  community: {
    social: Record<string, SocialLink>;
    forums: Record<string, SocialLink>;
  };
  education: Record<string, Record<string, SocialLink>>;
  tools: Record<string, Record<string, Tool> | Tool[]>;
  monitoring: Record<string, Record<string, SocialLink>>;
  compliance: {
    licenses: Record<string, SocialLink>;
  };
  documentation: Record<string, Record<string, SocialLink>>;
  testing: Record<string, Record<string, Tool>>;
  health: Record<string, Record<string, SocialLink>>;
  mirrors: Record<string, Record<string, SocialLink>>;
  validation: {
    last_checked: string;
    check_frequency: string;
    broken_link_policy: string;
    archive_policy: string;
    status_codes: Record<string, number>;
  };
  metadata: {
    schema_version: string;
    maintainer: string;
    update_frequency: string;
    validation_required: boolean;
    sources: string[];
  };
}

// Utility types for component props
export type MilestoneKey = keyof ProtocolMilestonesData['milestones'];
export type MetricKey = keyof CommunityMetricsData['holders'];
export type ProtocolKey = keyof TechnicalSpecsData['protocols'];
export type NetworkKey = keyof NetworkConstantsData['bitcoin_network'];
export type APIKey = keyof ExternalLinksData['apis'];

// Union types for validation
export type ValidationStatus = 'verified' | 'pending' | 'error';
export type CulturalLevel = 'highest' | 'high' | 'medium' | 'low';
export type ProtocolStatus = 'active' | 'deprecated' | 'development';

// Composite types for common use cases
export interface TechnicalDataSources {
  protocolMilestones: ProtocolMilestonesData;
  communityMetrics: CommunityMetricsData;
  technicalSpecs: TechnicalSpecsData;
  networkConstants: NetworkConstantsData;
  externalLinks: ExternalLinksData;
}

// Type guards for runtime validation
export function isValidMilestone(key: string, data: ProtocolMilestonesData): key is MilestoneKey {
  return key in data.milestones;
}

export function isValidMetric(key: string, data: CommunityMetricsData): key is MetricKey {
  return key in data.holders;
}

export function isValidProtocol(key: string, data: TechnicalSpecsData): key is ProtocolKey {
  return key in data.protocols;
}

// Helper types for component development
export interface ComponentDataProps {
  milestone?: MilestoneKey;
  metric?: MetricKey;
  protocol?: ProtocolKey;
  network?: NetworkKey;
  api?: APIKey;
  format?: 'short' | 'long' | 'detailed';
  showLabel?: boolean;
  locale?: 'en' | 'fr' | 'es' | 'zh';
}