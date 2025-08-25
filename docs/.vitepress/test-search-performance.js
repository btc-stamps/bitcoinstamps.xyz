/**
 * Performance validation script for Bitcoin Stamps enhanced search functionality
 * Tests search response times, cultural entity recognition, and result quality
 */

import { bitcoinStampsSearch } from './theme/utils/semanticSearch.ts'

// Test data sets
const searchTestCases = [
  {
    term: 'kevin',
    expectedResults: ['cultural', 'historical'],
    expectedEntities: ['Kevin', 'SRC-20'],
    maxResponseTime: 100
  },
  {
    term: 'block 788041',
    expectedResults: ['historical', 'cultural'],
    expectedEntities: ['Kevin'],
    maxResponseTime: 100
  },
  {
    term: 'arwyn',
    expectedResults: ['cultural'],
    expectedEntities: ['Arwyn'],
    maxResponseTime: 100
  },
  {
    term: 'src-20',
    expectedResults: ['protocol', 'cultural'],
    expectedEntities: ['SRC-20', 'Kevin'],
    maxResponseTime: 100
  },
  {
    term: 'protocol',
    expectedResults: ['protocol', 'technical'],
    expectedEntities: ['SRC-20', 'SRC-721', 'OLGA'],
    maxResponseTime: 100
  }
]

// Mock search results for testing
const mockSearchResults = [
  {
    title: 'Kevin: Origin Story and Cultural Impact',
    content: 'Kevin emerged at block 788041 as the first SRC-20 token, marking a pivotal moment in Bitcoin Stamps history. Created by Reinamora.',
    url: '/narratives/kevin-origin'
  },
  {
    title: 'SRC-20 Protocol Overview',
    content: 'SRC-20 tokens are fungible tokens on Bitcoin with enhanced features introduced at block 796,000.',
    url: '/protocols/src-20'
  },
  {
    title: 'Arwyn: Artist and Creator',
    content: 'Arwyn is a prominent artist in the Bitcoin Stamps ecosystem, creating memorable digital art.',
    url: '/narratives/kevin-origin'
  },
  {
    title: 'Bitcoin Stamps Technical Documentation',
    content: 'Technical implementation details for Bitcoin Stamps protocols and standards.',
    url: '/tutorials/'
  },
  {
    title: 'OLGA P2WSH Encoding Protocol',
    content: 'OLGA P2WSH encoding protocol reduces transaction costs across all Bitcoin Stamps standards.',
    url: '/protocols/olga'
  }
]

// Performance test runner
class SearchPerformanceTester {
  constructor() {
    this.results = []
    this.totalTests = 0
    this.passedTests = 0
  }

  async runAllTests() {
    console.log('🔍 Starting Bitcoin Stamps Search Performance Tests\n')
    
    for (const testCase of searchTestCases) {
      await this.runSingleTest(testCase)
    }
    
    this.generateReport()
  }

  async runSingleTest(testCase) {
    console.log(`Testing search term: "${testCase.term}"`)
    this.totalTests++
    
    const startTime = performance.now()
    
    try {
      // Test term enhancement
      const enhancedTerms = bitcoinStampsSearch.enhanceSearchTerm(testCase.term)
      console.log(`  ✓ Enhanced terms: ${enhancedTerms.join(', ')}`)
      
      // Test result enhancement
      const enhancedResults = mockSearchResults.map(result => 
        bitcoinStampsSearch.enhanceSearchResult(result)
      ).filter(result => 
        result.title.toLowerCase().includes(testCase.term.toLowerCase()) ||
        result.content.toLowerCase().includes(testCase.term.toLowerCase()) ||
        result.entityMatches.some(entity => 
          entity.toLowerCase().includes(testCase.term.toLowerCase())
        )
      )
      
      // Test result grouping
      const groupedResults = bitcoinStampsSearch.sortResultsByCulturalRelevance(enhancedResults)
      
      const endTime = performance.now()
      const responseTime = endTime - startTime
      
      // Validate results
      const validation = this.validateResults(testCase, enhancedResults, groupedResults, responseTime)
      
      if (validation.passed) {
        this.passedTests++
        console.log(`  ✅ Test PASSED (${responseTime.toFixed(2)}ms)`)
      } else {
        console.log(`  ❌ Test FAILED: ${validation.reason}`)
      }
      
      console.log(`  📊 Results: ${enhancedResults.length} found, grouped into ${Object.keys(groupedResults).filter(key => groupedResults[key].length > 0).length} categories\n`)
      
      this.results.push({
        term: testCase.term,
        responseTime,
        resultCount: enhancedResults.length,
        passed: validation.passed,
        reason: validation.reason
      })
      
    } catch (error) {
      console.log(`  ❌ Test ERROR: ${error.message}\n`)
      this.results.push({
        term: testCase.term,
        responseTime: null,
        resultCount: 0,
        passed: false,
        reason: `Error: ${error.message}`
      })
    }
  }

  validateResults(testCase, enhancedResults, groupedResults, responseTime) {
    // Check response time
    if (responseTime > testCase.maxResponseTime) {
      return { 
        passed: false, 
        reason: `Response time ${responseTime.toFixed(2)}ms exceeds limit ${testCase.maxResponseTime}ms` 
      }
    }
    
    // Check if expected result groups are present
    const presentGroups = Object.keys(groupedResults).filter(key => groupedResults[key].length > 0)
    const hasExpectedGroups = testCase.expectedResults.some(expectedGroup => 
      presentGroups.includes(expectedGroup)
    )
    
    if (!hasExpectedGroups) {
      return { 
        passed: false, 
        reason: `Expected groups ${testCase.expectedResults.join(', ')} not found. Found: ${presentGroups.join(', ')}` 
      }
    }
    
    // Check if expected entities are recognized
    const allEntityMatches = enhancedResults.flatMap(result => result.entityMatches)
    const hasExpectedEntities = testCase.expectedEntities.some(expectedEntity =>
      allEntityMatches.includes(expectedEntity)
    )
    
    if (!hasExpectedEntities) {
      return { 
        passed: false, 
        reason: `Expected entities ${testCase.expectedEntities.join(', ')} not found. Found: ${allEntityMatches.join(', ')}` 
      }
    }
    
    return { passed: true, reason: 'All validations passed' }
  }

  generateReport() {
    console.log('📋 Search Performance Test Report')
    console.log('================================')
    console.log(`Total Tests: ${this.totalTests}`)
    console.log(`Passed: ${this.passedTests}`)
    console.log(`Failed: ${this.totalTests - this.passedTests}`)
    console.log(`Success Rate: ${((this.passedTests / this.totalTests) * 100).toFixed(1)}%`)
    
    const avgResponseTime = this.results
      .filter(r => r.responseTime !== null)
      .reduce((sum, r) => sum + r.responseTime, 0) / this.results.length
    
    console.log(`Average Response Time: ${avgResponseTime.toFixed(2)}ms`)
    
    console.log('\nDetailed Results:')
    this.results.forEach(result => {
      const status = result.passed ? '✅' : '❌'
      console.log(`${status} "${result.term}": ${result.responseTime?.toFixed(2) || 'N/A'}ms, ${result.resultCount} results`)
      if (!result.passed) {
        console.log(`   Reason: ${result.reason}`)
      }
    })
    
    if (this.passedTests === this.totalTests) {
      console.log('\n🎉 All search performance tests passed!')
      console.log('✅ Cultural entity recognition working correctly')
      console.log('✅ Semantic result grouping functional')
      console.log('✅ Response times within acceptable limits')
    } else {
      console.log('\n⚠️  Some tests failed - review implementation')
    }
  }
}

// Run tests if called directly
if (typeof window === 'undefined' && process.argv[1] === new URL(import.meta.url).pathname) {
  const tester = new SearchPerformanceTester()
  tester.runAllTests()
}

export { SearchPerformanceTester }