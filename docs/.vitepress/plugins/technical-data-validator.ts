/**
 * VitePress Plugin for Technical Data Validation
 * Integrates the technical data validation system into the build process
 */

import type { Plugin } from 'vite'
import { validateTechnicalData, createValidationReport } from '../utils/technical-data-validator'

// Import data loaders for validation
import { data as protocolMilestonesData } from '../data/protocol-milestones.data'
import { data as communityMetricsData } from '../data/community-metrics.data'
import { data as technicalSpecsData } from '../data/technical-specs.data'
import { data as networkConstantsData } from '../data/network-constants.data'
import { data as externalLinksData } from '../data/external-links.data'

export interface TechnicalDataValidatorOptions {
  /**
   * Whether to fail the build on validation errors
   * @default true
   */
  failOnError?: boolean
  
  /**
   * Whether to show warnings in console
   * @default true
   */
  showWarnings?: boolean
  
  /**
   * Whether to generate a validation report file
   * @default true
   */
  generateReport?: boolean
  
  /**
   * Path to write validation report
   * @default 'technical-data-validation-report.md'
   */
  reportPath?: string
  
  /**
   * Categories to validate
   * @default ['all']
   */
  validateCategories?: ('protocol-milestones' | 'community-metrics' | 'technical-specs' | 'network-constants' | 'external-links' | 'all')[]
}

export function technicalDataValidator(options: TechnicalDataValidatorOptions = {}): Plugin {
  const {
    failOnError = true,
    showWarnings = true,
    generateReport = true,
    reportPath = 'technical-data-validation-report.md',
    validateCategories = ['all']
  } = options

  return {
    name: 'technical-data-validator',
    
    async buildStart() {
      console.log('🔍 Technical Data Validator: Starting validation...')
      
      try {
        // Prepare data for validation
        const dataToValidate: any = {}
        
        if (validateCategories.includes('all') || validateCategories.includes('protocol-milestones')) {
          dataToValidate.protocolMilestones = await protocolMilestonesData
        }
        
        if (validateCategories.includes('all') || validateCategories.includes('community-metrics')) {
          dataToValidate.communityMetrics = await communityMetricsData
        }
        
        if (validateCategories.includes('all') || validateCategories.includes('technical-specs')) {
          dataToValidate.technicalSpecs = await technicalSpecsData
        }
        
        if (validateCategories.includes('all') || validateCategories.includes('network-constants')) {
          dataToValidate.networkConstants = await networkConstantsData
        }
        
        if (validateCategories.includes('all') || validateCategories.includes('external-links')) {
          dataToValidate.externalLinks = await externalLinksData
        }

        // Run validation
        const result = await validateTechnicalData(dataToValidate)
        
        // Log summary
        console.log(`📊 Validation Summary:`)
        console.log(`   ✓ Checks passed: ${result.summary.passedChecks}`)
        console.log(`   ✗ Checks failed: ${result.summary.failedChecks}`)
        console.log(`   ⚠ Warnings: ${result.summary.warningCount}`)
        console.log(`   📈 Total checks: ${result.summary.totalChecks}`)
        console.log(`   📋 Status: ${result.summary.overallStatus.toUpperCase()}`)
        
        // Show errors
        if (result.errors.length > 0) {
          console.error(`\n❌ Validation Errors (${result.errors.length}):\n`)
          result.errors.forEach((error, i) => {
            console.error(`   ${i + 1}. [${error.category}.${error.field}] ${error.message}`)
            if (error.expected && error.actual !== undefined) {
              console.error(`      Expected: ${error.expected}`)
              console.error(`      Actual: ${error.actual}`)
            }
          })
        }
        
        // Show warnings
        if (showWarnings && result.warnings.length > 0) {
          console.warn(`\n⚠️  Validation Warnings (${result.warnings.length}):\n`)
          result.warnings.forEach((warning, i) => {
            console.warn(`   ${i + 1}. [${warning.category}.${warning.field}] ${warning.message}`)
          })
        }
        
        // Generate report file
        if (generateReport) {
          const fs = await import('fs/promises')
          const path = await import('path')
          
          const reportContent = createValidationReport(result)
          const fullReportPath = path.resolve(process.cwd(), reportPath)
          
          await fs.writeFile(fullReportPath, reportContent, 'utf8')
          console.log(`📄 Validation report written to: ${fullReportPath}`)
        }
        
        // Fail build if errors and failOnError is true
        if (!result.isValid && failOnError) {
          throw new Error(`Technical data validation failed with ${result.errors.length} errors. See details above.`)
        }
        
        if (result.isValid) {
          console.log('✅ Technical Data Validator: All validations passed!')
        } else {
          console.log('⚠️  Technical Data Validator: Completed with errors (build continuing)')
        }
        
      } catch (error) {
        console.error('❌ Technical Data Validator: Validation process failed:', error)
        if (failOnError) {
          throw error
        }
      }
    },
    
    // Watch for changes in data files during development
    configureServer(server) {
      const dataFiles = [
        'docs/.vitepress/data/protocol-milestones.yaml',
        'docs/.vitepress/data/community-metrics.yaml', 
        'docs/.vitepress/data/technical-specs.yaml',
        'docs/.vitepress/data/network-constants.yaml',
        'docs/.vitepress/data/external-links.yaml'
      ]
      
      server.middlewares.use('/validate-technical-data', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method Not Allowed')
          return
        }
        
        try {
          // Re-run validation
          const dataToValidate = {
            protocolMilestones: await protocolMilestonesData,
            communityMetrics: await communityMetricsData,
            technicalSpecs: await technicalSpecsData,
            networkConstants: await networkConstantsData,
            externalLinks: await externalLinksData
          }
          
          const result = await validateTechnicalData(dataToValidate)
          
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            isValid: result.isValid,
            summary: result.summary,
            errors: result.errors,
            warnings: result.warnings
          }))
        } catch (error) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({
            error: error.message
          }))
        }
      })
      
      // Watch data files for changes
      dataFiles.forEach(file => {
        server.watcher.add(file)
      })
      
      server.watcher.on('change', (file) => {
        if (dataFiles.some(dataFile => file.includes(dataFile))) {
          console.log(`🔄 Technical data file changed: ${file}`)
          console.log('💡 Run validation: POST /validate-technical-data')
        }
      })
    }
  }
}

// Default export for easy import
export default technicalDataValidator