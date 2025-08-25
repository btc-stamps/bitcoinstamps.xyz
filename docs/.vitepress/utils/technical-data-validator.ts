/**
 * Technical Data Validation System
 * Ensures consistency and accuracy of centralized technical data
 */

import type { 
  ProtocolMilestonesData, 
  CommunityMetricsData, 
  TechnicalSpecsData,
  NetworkConstantsData,
  ExternalLinksData,
  ValidationStatus 
} from '../types/technical-data'

// Validation result interface
export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  summary: ValidationSummary
}

export interface ValidationError {
  type: 'missing_required_field' | 'invalid_format' | 'inconsistent_data' | 'out_of_range'
  category: string
  field: string
  message: string
  expected?: any
  actual?: any
}

export interface ValidationWarning {
  type: 'deprecated_field' | 'inconsistent_format' | 'missing_optional_field'
  category: string
  field: string
  message: string
}

export interface ValidationSummary {
  totalChecks: number
  passedChecks: number
  failedChecks: number
  warningCount: number
  overallStatus: ValidationStatus
  lastValidated: string
}

// Main validation class
export class TechnicalDataValidator {
  private errors: ValidationError[] = []
  private warnings: ValidationWarning[] = []
  private checksPerformed = 0

  /**
   * Validate all technical data categories
   */
  async validateAll(data: {
    protocolMilestones?: ProtocolMilestonesData
    communityMetrics?: CommunityMetricsData
    technicalSpecs?: TechnicalSpecsData
    networkConstants?: NetworkConstantsData
    externalLinks?: ExternalLinksData
  }): Promise<ValidationResult> {
    this.reset()

    // Validate each category if provided
    if (data.protocolMilestones) {
      await this.validateProtocolMilestones(data.protocolMilestones)
    }
    if (data.communityMetrics) {
      await this.validateCommunityMetrics(data.communityMetrics)
    }
    if (data.technicalSpecs) {
      await this.validateTechnicalSpecs(data.technicalSpecs)
    }
    if (data.networkConstants) {
      await this.validateNetworkConstants(data.networkConstants)
    }
    if (data.externalLinks) {
      await this.validateExternalLinks(data.externalLinks)
    }

    // Cross-category validation
    await this.validateCrossReferences(data)

    return this.generateResult()
  }

  /**
   * Validate protocol milestones data
   */
  async validateProtocolMilestones(data: ProtocolMilestonesData): Promise<void> {
    const category = 'protocol_milestones'

    // Validate required fields
    this.validateRequired(category, 'milestones', data.milestones)
    this.validateRequired(category, 'timeline', data.timeline)

    // Validate milestones structure
    if (data.milestones) {
      for (const [key, milestone] of Object.entries(data.milestones)) {
        this.validateRequired(`${category}.${key}`, 'blockHeight', milestone.blockHeight)
        this.validateRequired(`${category}.${key}`, 'blockDate', milestone.blockDate)
        this.validateRequired(`${category}.${key}`, 'title', milestone.title)

        // Block height validation
        if (milestone.blockHeight) {
          this.validateRange(`${category}.${key}`, 'blockHeight', milestone.blockHeight, 779652, null)
        }

        // Date format validation
        if (milestone.blockDate) {
          this.validateDateFormat(`${category}.${key}`, 'blockDate', milestone.blockDate)
        }

        // Cultural significance validation
        if (milestone.culturalSignificance) {
          this.validateEnum(
            `${category}.${key}`, 
            'culturalSignificance', 
            milestone.culturalSignificance,
            ['highest', 'high', 'medium', 'low']
          )
        }

        // Token supply validation (if present)
        if (milestone.tokenSupply) {
          this.validateRange(`${category}.${key}`, 'tokenSupply', milestone.tokenSupply, 1, Number.MAX_SAFE_INTEGER)
        }
      }
    }

    // Validate timeline consistency
    if (data.timeline) {
      for (const [key, era] of Object.entries(data.timeline)) {
        this.validateRequired(`${category}.timeline.${key}`, 'startBlock', era.startBlock)
        this.validateRequired(`${category}.timeline.${key}`, 'keyEvents', era.keyEvents)

        // Validate era block ranges
        if (era.startBlock && era.endBlock) {
          if (era.startBlock >= era.endBlock) {
            this.addError('invalid_format', `${category}.timeline.${key}`, 'endBlock', 
              'End block must be greater than start block', era.endBlock, `> ${era.startBlock}`)
          }
        }
      }
    }

    // Validate block metadata consistency
    if (data.blockMetadata && data.milestones) {
      const milestoneBlocks = Object.values(data.milestones).map(m => m.blockHeight)
      const metadataBlocks = Object.keys(data.blockMetadata).map(Number)
      
      for (const block of milestoneBlocks) {
        if (!metadataBlocks.includes(block)) {
          this.addWarning('missing_optional_field', category, 'blockMetadata', 
            `Missing block metadata for milestone block ${block}`)
        }
      }
    }

    this.checksPerformed += 10
  }

  /**
   * Validate community metrics data
   */
  async validateCommunityMetrics(data: CommunityMetricsData): Promise<void> {
    const category = 'community_metrics'

    // Validate required holders categories
    const requiredCategories = ['kevin', 'stamps', 'src20_tokens', 'src721_nfts', 'src101_names']
    for (const cat of requiredCategories) {
      this.validateRequired(`${category}.holders`, cat, data.holders?.[cat])
    }

    // Validate KEVIN metrics specifically
    if (data.holders?.kevin) {
      const kevin = data.holders.kevin
      this.validateRequired(`${category}.kevin`, 'totalHolders', kevin.totalHolders)
      this.validateRequired(`${category}.kevin`, 'lastUpdated', kevin.lastUpdated)

      // Validate numeric ranges
      if (kevin.totalHolders) {
        this.validateRange(`${category}.kevin`, 'totalHolders', kevin.totalHolders, 1, null)
      }
      if (kevin.activeHolders && kevin.totalHolders) {
        if (kevin.activeHolders > kevin.totalHolders) {
          this.addError('out_of_range', `${category}.kevin`, 'activeHolders',
            'Active holders cannot exceed total holders', kevin.activeHolders, `<= ${kevin.totalHolders}`)
        }
      }

      // Validate growth rate format
      if (kevin.growthRate30Day) {
        this.validatePercentageFormat(`${category}.kevin`, 'growthRate30Day', kevin.growthRate30Day)
      }
    }

    // Validate SRC-20 tokens data
    if (data.holders?.src20_tokens) {
      const src20 = data.holders.src20_tokens
      if (src20.topTokens) {
        for (let i = 0; i < src20.topTokens.length; i++) {
          const token = src20.topTokens[i]
          this.validateRequired(`${category}.src20_tokens.topTokens[${i}]`, 'name', token.name)
          this.validateRequired(`${category}.src20_tokens.topTokens[${i}]`, 'holders', token.holders)
          
          // Validate holder counts
          if (token.holders) {
            this.validateRange(`${category}.src20_tokens.topTokens[${i}]`, 'holders', token.holders, 1, null)
          }
        }
      }
    }

    // Validate geographic data
    if (data.geography) {
      if (data.geography.regions) {
        let totalPercentage = 0
        for (const [region, percentage] of Object.entries(data.geography.regions)) {
          const numericPercentage = parseFloat(percentage.replace('%', ''))
          totalPercentage += numericPercentage
        }
        
        // Check if percentages roughly add up to 100%
        if (Math.abs(totalPercentage - 100) > 5) {
          this.addWarning('inconsistent_data', `${category}.geography`, 'regions',
            `Geographic percentages sum to ${totalPercentage}%, expected ~100%`)
        }
      }
    }

    this.checksPerformed += 8
  }

  /**
   * Validate technical specifications data
   */
  async validateTechnicalSpecs(data: TechnicalSpecsData): Promise<void> {
    const category = 'technical_specs'

    // Validate protocol specifications
    const requiredProtocols = ['src20', 'src721', 'src101', 'olga']
    for (const protocol of requiredProtocols) {
      const spec = data.protocols?.[protocol as keyof typeof data.protocols]
      if (spec) {
        this.validateRequired(`${category}.${protocol}`, 'version', spec.version)
        this.validateRequired(`${category}.${protocol}`, 'status', spec.status)
        this.validateRequired(`${category}.${protocol}`, 'launchBlock', spec.launchBlock)
        
        // Validate status enum
        this.validateEnum(`${category}.${protocol}`, 'status', spec.status, ['active', 'deprecated', 'development'])
        
        // Validate launch block
        if (spec.launchBlock) {
          this.validateRange(`${category}.${protocol}`, 'launchBlock', spec.launchBlock, 779652, null)
        }

        // Protocol-specific validations
        if (protocol === 'src20' && 'maxSupply' in spec) {
          const src20Spec = spec as any
          if (src20Spec.maxSupply) {
            // Should be a string representing a large number
            if (!src20Spec.maxSupply.match(/^\d+$/)) {
              this.addError('invalid_format', `${category}.${protocol}`, 'maxSupply',
                'maxSupply should be a numeric string', src20Spec.maxSupply, 'numeric string')
            }
          }
        }
      } else {
        this.validateRequired(`${category}.protocols`, protocol, spec)
      }
    }

    // Validate network constants
    if (data.network) {
      if (data.network.bitcoin) {
        const bitcoin = data.network.bitcoin
        this.validateRequired(`${category}.network.bitcoin`, 'minTxFee', bitcoin.minTxFee)
        this.validateRequired(`${category}.network.bitcoin`, 'maxBlockSize', bitcoin.maxBlockSize)
        
        // Validate numeric ranges
        if (bitcoin.minTxFee) {
          this.validateRange(`${category}.network.bitcoin`, 'minTxFee', bitcoin.minTxFee, 1, 100000)
        }
      }

      if (data.network.stamps) {
        const stamps = data.network.stamps
        this.validateRequired(`${category}.network.stamps`, 'minStampSize', stamps.minStampSize)
        this.validateRequired(`${category}.network.stamps`, 'maxImageSize', stamps.maxImageSize)
      }
    }

    // Validate API specification
    if (data.api) {
      this.validateRequired(`${category}.api`, 'current_version', data.api.current_version)
      this.validateRequired(`${category}.api`, 'base_url', data.api.base_url)
      
      // Validate URL format
      if (data.api.base_url) {
        this.validateURLFormat(`${category}.api`, 'base_url', data.api.base_url)
      }

      // Validate version format
      if (data.api.current_version) {
        this.validateVersionFormat(`${category}.api`, 'current_version', data.api.current_version)
      }
    }

    this.checksPerformed += 12
  }

  /**
   * Validate network constants data
   */
  async validateNetworkConstants(data: NetworkConstantsData): Promise<void> {
    const category = 'network_constants'

    // Validate network configurations
    const requiredNetworks = ['mainnet', 'testnet', 'regtest']
    for (const network of requiredNetworks) {
      const config = data.bitcoin_network?.[network as keyof typeof data.bitcoin_network]
      if (config) {
        this.validateRequired(`${category}.${network}`, 'networkId', config.networkId)
        this.validateRequired(`${category}.${network}`, 'port', config.port)
        this.validateRequired(`${category}.${network}`, 'magicBytes', config.magicBytes)
        
        // Validate port ranges
        if (config.port) {
          this.validateRange(`${category}.${network}`, 'port', config.port, 1024, 65535)
        }
      } else {
        this.validateRequired(`${category}.bitcoin_network`, network, config)
      }
    }

    // Validate protocol constants
    if (data.protocol?.consensus) {
      const consensus = data.protocol.consensus
      this.validateRequired(`${category}.protocol.consensus`, 'maxBlockSize', consensus.maxBlockSize)
      this.validateRequired(`${category}.protocol.consensus`, 'maxTxSize', consensus.maxTxSize)

      // Validate size constraints
      if (consensus.maxTxSize && consensus.maxBlockSize) {
        if (consensus.maxTxSize > consensus.maxBlockSize) {
          this.addError('out_of_range', `${category}.protocol.consensus`, 'maxTxSize',
            'Max transaction size cannot exceed max block size', consensus.maxTxSize, `<= ${consensus.maxBlockSize}`)
        }
      }
    }

    this.checksPerformed += 8
  }

  /**
   * Validate external links data
   */
  async validateExternalLinks(data: ExternalLinksData): Promise<void> {
    const category = 'external_links'

    // Validate API endpoints
    if (data.apis) {
      for (const [apiName, apiConfig] of Object.entries(data.apis)) {
        if ('base_url' in apiConfig && apiConfig.base_url) {
          this.validateURLFormat(`${category}.apis.${apiName}`, 'base_url', apiConfig.base_url)
        }
        if ('documentation' in apiConfig && apiConfig.documentation) {
          this.validateURLFormat(`${category}.apis.${apiName}`, 'documentation', apiConfig.documentation)
        }
      }
    }

    // Validate repository URLs
    if (data.development?.repositories) {
      for (const [repoName, repo] of Object.entries(data.development.repositories)) {
        this.validateRequired(`${category}.repositories.${repoName}`, 'url', repo.url)
        if (repo.url) {
          this.validateURLFormat(`${category}.repositories.${repoName}`, 'url', repo.url)
          
          // Validate GitHub URL format
          if (!repo.url.includes('github.com')) {
            this.addWarning('inconsistent_format', `${category}.repositories.${repoName}`, 'url',
              'Repository URL is not on GitHub')
          }
        }
      }
    }

    this.checksPerformed += 5
  }

  /**
   * Validate cross-references between data categories
   */
  async validateCrossReferences(data: any): Promise<void> {
    const category = 'cross_references'

    // Validate block heights consistency
    if (data.protocolMilestones && data.technicalSpecs) {
      const milestones = data.protocolMilestones.milestones
      const protocols = data.technicalSpecs.protocols

      // Check if protocol launch blocks match milestone blocks
      for (const [protocolName, protocol] of Object.entries(protocols)) {
        if ('launchBlock' in protocol && protocol.launchBlock) {
          const matchingMilestone = Object.entries(milestones).find(
            ([, milestone]) => milestone.blockHeight === protocol.launchBlock
          )
          
          if (!matchingMilestone) {
            this.addWarning('inconsistent_data', category, 'block_heights',
              `Protocol ${protocolName} launch block ${protocol.launchBlock} has no corresponding milestone`)
          }
        }
      }
    }

    // Validate API URLs consistency
    if (data.technicalSpecs?.api && data.externalLinks?.apis) {
      const specsBaseUrl = data.technicalSpecs.api.base_url
      const linksBaseUrl = data.externalLinks.apis.stampchain?.base_url
      
      if (specsBaseUrl && linksBaseUrl && specsBaseUrl !== linksBaseUrl) {
        this.addError('inconsistent_data', category, 'api_urls',
          'API base URLs are inconsistent between technical specs and external links',
          { specs: specsBaseUrl, links: linksBaseUrl }, 'should match')
      }
    }

    this.checksPerformed += 3
  }

  // Helper validation methods
  private validateRequired(category: string, field: string, value: any): void {
    if (value === undefined || value === null || value === '') {
      this.addError('missing_required_field', category, field, 
        `Required field ${field} is missing or empty`, value, 'non-empty value')
    }
  }

  private validateRange(category: string, field: string, value: number, min: number | null, max: number | null): void {
    if (min !== null && value < min) {
      this.addError('out_of_range', category, field, 
        `Value ${value} is below minimum ${min}`, value, `>= ${min}`)
    }
    if (max !== null && value > max) {
      this.addError('out_of_range', category, field, 
        `Value ${value} is above maximum ${max}`, value, `<= ${max}`)
    }
  }

  private validateEnum(category: string, field: string, value: string, allowedValues: string[]): void {
    if (!allowedValues.includes(value)) {
      this.addError('invalid_format', category, field, 
        `Invalid enum value "${value}"`, value, allowedValues.join(' | '))
    }
  }

  private validateDateFormat(category: string, field: string, value: string): void {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(value)) {
      this.addError('invalid_format', category, field, 
        'Date must be in YYYY-MM-DD format', value, 'YYYY-MM-DD')
    } else {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        this.addError('invalid_format', category, field, 
          'Invalid date value', value, 'valid date')
      }
    }
  }

  private validateURLFormat(category: string, field: string, value: string): void {
    try {
      new URL(value)
    } catch {
      this.addError('invalid_format', category, field, 
        'Invalid URL format', value, 'valid URL')
    }
  }

  private validateVersionFormat(category: string, field: string, value: string): void {
    const versionRegex = /^v?\d+\.\d+(\.\d+)?$/
    if (!versionRegex.test(value)) {
      this.addError('invalid_format', category, field, 
        'Version must be in x.y or x.y.z format', value, 'x.y.z')
    }
  }

  private validatePercentageFormat(category: string, field: string, value: string): void {
    const percentRegex = /^[+-]?\d+(\.\d+)?%$/
    if (!percentRegex.test(value)) {
      this.addError('invalid_format', category, field, 
        'Percentage must be in format like "+5.2%" or "-1.3%"', value, '±x.x%')
    }
  }

  private addError(type: ValidationError['type'], category: string, field: string, 
                  message: string, actual?: any, expected?: any): void {
    this.errors.push({ type, category, field, message, actual, expected })
  }

  private addWarning(type: ValidationWarning['type'], category: string, field: string, message: string): void {
    this.warnings.push({ type, category, field, message })
  }

  private reset(): void {
    this.errors = []
    this.warnings = []
    this.checksPerformed = 0
  }

  private generateResult(): ValidationResult {
    const failedChecks = this.errors.length
    const passedChecks = this.checksPerformed - failedChecks
    const isValid = failedChecks === 0
    
    let overallStatus: ValidationStatus = 'verified'
    if (failedChecks > 0) {
      overallStatus = 'error'
    } else if (this.warnings.length > 0) {
      overallStatus = 'pending'
    }

    return {
      isValid,
      errors: this.errors,
      warnings: this.warnings,
      summary: {
        totalChecks: this.checksPerformed,
        passedChecks,
        failedChecks,
        warningCount: this.warnings.length,
        overallStatus,
        lastValidated: new Date().toISOString()
      }
    }
  }
}

// Convenience functions
export const validator = new TechnicalDataValidator()

export async function validateTechnicalData(data: any): Promise<ValidationResult> {
  return validator.validateAll(data)
}

export function createValidationReport(result: ValidationResult): string {
  const lines = [
    '# Technical Data Validation Report',
    `Generated: ${result.summary.lastValidated}`,
    '',
    '## Summary',
    `- Total Checks: ${result.summary.totalChecks}`,
    `- Passed: ${result.summary.passedChecks}`,
    `- Failed: ${result.summary.failedChecks}`,
    `- Warnings: ${result.summary.warningCount}`,
    `- Overall Status: ${result.summary.overallStatus.toUpperCase()}`,
    ''
  ]

  if (result.errors.length > 0) {
    lines.push('## Errors')
    for (const error of result.errors) {
      lines.push(`- **${error.category}.${error.field}**: ${error.message}`)
      if (error.expected && error.actual) {
        lines.push(`  - Expected: ${error.expected}`)
        lines.push(`  - Actual: ${error.actual}`)
      }
    }
    lines.push('')
  }

  if (result.warnings.length > 0) {
    lines.push('## Warnings')
    for (const warning of result.warnings) {
      lines.push(`- **${warning.category}.${warning.field}**: ${warning.message}`)
    }
    lines.push('')
  }

  if (result.isValid) {
    lines.push('✅ All validations passed successfully!')
  } else {
    lines.push('❌ Validation failed. Please fix the errors above.')
  }

  return lines.join('\n')
}