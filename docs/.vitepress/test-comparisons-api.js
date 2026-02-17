#!/usr/bin/env node
/**
 * Comparisons API Endpoint Test
 * Tests /api/comparisons.json schema, required fields, and data accuracy
 * Following the test-first protocol for task 20.4
 */

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFile, access } from 'fs/promises'
import { constants } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function testComparisonsAPI() {
  console.log('Testing Comparisons API Endpoint (/api/comparisons.json)\n')

  let passed = 0
  let failed = 0

  async function test(name, fn) {
    try {
      await fn()
      console.log(`   PASS: ${name}`)
      passed++
    } catch (error) {
      console.log(`   FAIL: ${name}: ${error.message}`)
      failed++
    }
  }

  // Test 1: Static source file exists in docs/public/api/
  await test('comparisons.json static source file exists in docs/public/api/', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    await access(sourcePath, constants.F_OK)
  })

  // Test 2: Source file parses as valid JSON
  await test('comparisons.json is valid JSON', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    JSON.parse(content)
  })

  // Test 3: Top-level schema fields present
  await test('Top-level schema fields are present (name, version, description, generated_at, protocols)', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    const requiredTopLevel = ['name', 'version', 'description', 'generated_at', 'protocols']
    for (const field of requiredTopLevel) {
      if (!(field in data)) {
        throw new Error(`Missing top-level field: ${field}`)
      }
    }
  })

  // Test 4: protocols object contains bitcoin_stamps entry
  await test('protocols.bitcoin_stamps entry exists', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    if (!data.protocols || !data.protocols.bitcoin_stamps) {
      throw new Error('Missing protocols.bitcoin_stamps entry')
    }
  })

  // Test 5: protocols object contains ordinals entry
  await test('protocols.ordinals entry exists', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    if (!data.protocols || !data.protocols.ordinals) {
      throw new Error('Missing protocols.ordinals entry')
    }
  })

  // Test 6: Required comparison fields present on bitcoin_stamps
  await test('bitcoin_stamps has all required comparison fields', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    const required = [
      'storage_model',
      'prunable',
      'node_support',
      'permanence_guarantee',
      'consensus_critical'
    ]

    const bs = data.protocols.bitcoin_stamps
    for (const field of required) {
      if (!(field in bs)) {
        throw new Error(`bitcoin_stamps missing field: ${field}`)
      }
    }
  })

  // Test 7: Required comparison fields present on ordinals
  await test('ordinals has all required comparison fields', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    const required = [
      'storage_model',
      'prunable',
      'node_support',
      'permanence_guarantee',
      'consensus_critical'
    ]

    const ord = data.protocols.ordinals
    for (const field of required) {
      if (!(field in ord)) {
        throw new Error(`ordinals missing field: ${field}`)
      }
    }
  })

  // Test 8: Verify bitcoin_stamps permanence_guarantee is true (factual accuracy)
  await test('bitcoin_stamps permanence_guarantee is true', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    const val = data.protocols.bitcoin_stamps.permanence_guarantee
    if (val !== true && val !== 'true' && val !== 'guaranteed') {
      throw new Error(`Expected bitcoin_stamps.permanence_guarantee to be truthy, got: ${JSON.stringify(val)}`)
    }
  })

  // Test 9: Verify ordinals prunable is true (factual accuracy - witness data can be pruned)
  await test('ordinals prunable is true (witness data can be pruned)', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    const val = data.protocols.ordinals.prunable
    if (val !== true && val !== 'true' && val !== 'yes') {
      throw new Error(`Expected ordinals.prunable to be truthy, got: ${JSON.stringify(val)}`)
    }
  })

  // Test 10: Verify bitcoin_stamps prunable is false (UTXO data cannot be pruned)
  await test('bitcoin_stamps prunable is false (UTXO data cannot be pruned)', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    const val = data.protocols.bitcoin_stamps.prunable
    if (val !== false && val !== 'false' && val !== 'no') {
      throw new Error(`Expected bitcoin_stamps.prunable to be falsy, got: ${JSON.stringify(val)}`)
    }
  })

  // Test 11: Verify bitcoin_stamps consensus_critical is true
  await test('bitcoin_stamps consensus_critical is true', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    const val = data.protocols.bitcoin_stamps.consensus_critical
    if (val !== true && val !== 'true' && val !== 'yes') {
      throw new Error(`Expected bitcoin_stamps.consensus_critical to be truthy, got: ${JSON.stringify(val)}`)
    }
  })

  // Test 12: Verify ordinals consensus_critical is false (witness data is not consensus-critical)
  await test('ordinals consensus_critical is false (witness data is not consensus-critical)', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    const val = data.protocols.ordinals.consensus_critical
    if (val !== false && val !== 'false' && val !== 'no') {
      throw new Error(`Expected ordinals.consensus_critical to be falsy, got: ${JSON.stringify(val)}`)
    }
  })

  // Test 13: storage_model fields are non-empty strings
  await test('storage_model fields are non-empty strings on both protocols', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    const bsModel = data.protocols.bitcoin_stamps.storage_model
    const ordModel = data.protocols.ordinals.storage_model

    if (typeof bsModel !== 'string' || bsModel.trim() === '') {
      throw new Error(`bitcoin_stamps.storage_model must be a non-empty string, got: ${JSON.stringify(bsModel)}`)
    }
    if (typeof ordModel !== 'string' || ordModel.trim() === '') {
      throw new Error(`ordinals.storage_model must be a non-empty string, got: ${JSON.stringify(ordModel)}`)
    }
  })

  // Test 14: node_support fields are non-empty strings
  await test('node_support fields are non-empty strings on both protocols', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    const bsNode = data.protocols.bitcoin_stamps.node_support
    const ordNode = data.protocols.ordinals.node_support

    if (typeof bsNode !== 'string' || bsNode.trim() === '') {
      throw new Error(`bitcoin_stamps.node_support must be a non-empty string, got: ${JSON.stringify(bsNode)}`)
    }
    if (typeof ordNode !== 'string' || ordNode.trim() === '') {
      throw new Error(`ordinals.node_support must be a non-empty string, got: ${JSON.stringify(ordNode)}`)
    }
  })

  // Test 15: ai_guidance section present (AI agent discoverability)
  await test('ai_guidance section present for AI agent discoverability', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    if (!data.ai_guidance) {
      throw new Error('Missing ai_guidance section for AI agent discoverability')
    }
    if (typeof data.ai_guidance !== 'object') {
      throw new Error('ai_guidance must be an object')
    }
  })

  // Test 16: comparison_matrix present for structured consumption
  await test('comparison_matrix present for structured AI consumption', async () => {
    const sourcePath = join(__dirname, '../../docs/public/api/comparisons.json')
    const content = await readFile(sourcePath, 'utf-8')
    const data = JSON.parse(content)

    if (!data.comparison_matrix) {
      throw new Error('Missing comparison_matrix section')
    }
    if (!Array.isArray(data.comparison_matrix)) {
      throw new Error('comparison_matrix must be an array')
    }
    if (data.comparison_matrix.length === 0) {
      throw new Error('comparison_matrix must not be empty')
    }
  })

  // Summary
  console.log(`\nResults: ${passed} passed, ${failed} failed out of ${passed + failed} tests`)

  if (failed > 0) {
    console.log('\nSome tests failed. Implement docs/public/api/comparisons.json to make them pass.')
    process.exit(1)
  } else {
    console.log('\nAll comparisons API tests passed.')
    process.exit(0)
  }
}

testComparisonsAPI().catch((error) => {
  console.error('Test runner error:', error)
  process.exit(1)
})
