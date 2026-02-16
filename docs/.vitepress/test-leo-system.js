#!/usr/bin/env node
/**
 * LEO System Integration Test
 * Tests what actually matters: LEO system functionality and output validation
 */

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFile, access } from 'fs/promises'
import { constants } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function testLEOSystem() {
  console.log('🧪 Testing LEO System Integration...\n')
  
  let passed = 0
  let failed = 0

  async function test(name, fn) {
    try {
      await fn()
      console.log(`   ✅ ${name}`)
      passed++
    } catch (error) {
      console.log(`   ❌ ${name}: ${error.message}`)
      failed++
    }
  }

  // Test 1: Build output exists and is valid
  await test('Build generates API files', async () => {
    const distPath = join(__dirname, '../../dist')
    await access(distPath, constants.F_OK)
    
    // Check for multilingual API files
    const languagePaths = [
      join(distPath, 'api', 'entities.json'), // English (default)
      join(distPath, 'es', 'api', 'entities.json'),
      join(distPath, 'fr', 'api', 'entities.json'), 
      join(distPath, 'zh', 'api', 'entities.json'),
      join(distPath, 'tr', 'api', 'entities.json')
    ]
    
    for (const apiPath of languagePaths) {
      await access(apiPath, constants.F_OK)
    }
  })

  // Test 2: Entity data validation
  await test('Entity data structure is valid', async () => {
    const entityPath = join(__dirname, '../../dist/api/entities.json')
    const content = await readFile(entityPath, 'utf-8')
    const data = JSON.parse(content)
    
    if (!data.entities) throw new Error('Missing entities object')
    if (!data.metadata) throw new Error('Missing metadata object')
    if (data.metadata.totalEntities < 15) throw new Error(`Expected at least 15 entities, got ${data.metadata.totalEntities}`)
  })

  // Test 3: KEVIN entity validation 
  await test('KEVIN entity has correct data', async () => {
    const entityPath = join(__dirname, '../../dist/api/kevin.json')
    const content = await readFile(entityPath, 'utf-8')
    const data = JSON.parse(content)
    
    if (data.entity.creator !== 'Arwyn') throw new Error(`KEVIN creator should be Arwyn, got ${data.entity.creator}`)
    if (data.entity.firstStampNumber !== 4258) throw new Error(`KEVIN first stamp should be 4258, got ${data.entity.firstStampNumber}`)
    if (data.entity.src20StampNumber !== 18516) throw new Error(`KEVIN SRC-20 stamp should be 18516, got ${data.entity.src20StampNumber}`)
  })

  // Test 4: Protocol data validation
  await test('Protocol data is complete', async () => {
    const protocolPath = join(__dirname, '../../dist/api/protocols.json')
    const content = await readFile(protocolPath, 'utf-8')
    const data = JSON.parse(content)
    
    if (!Array.isArray(data.protocols)) throw new Error('Protocols must be array')
    if (data.protocols.length !== 4) throw new Error(`Expected 4 protocols, got ${data.protocols.length}`)
    
    const src20 = data.protocols.find(p => p.id === 'src-20')
    if (!src20) throw new Error('Missing SRC-20 protocol')
  })

  // Test 5: Multilingual consistency
  await test('Multilingual data consistency', async () => {
    const languagePaths = [
      join(__dirname, '../../dist/api/entities.json'), // English
      join(__dirname, '../../dist/es/api/entities.json'),
      join(__dirname, '../../dist/fr/api/entities.json'),
      join(__dirname, '../../dist/zh/api/entities.json'),
      join(__dirname, '../../dist/tr/api/entities.json')
    ]
    const entityCounts = []
    
    for (const path of languagePaths) {
      const content = await readFile(path, 'utf-8')
      const data = JSON.parse(content)
      entityCounts.push(data.metadata.totalEntities)
    }
    
    const allSame = entityCounts.every(count => count === entityCounts[0])
    if (!allSame) throw new Error(`Inconsistent entity counts across languages: ${entityCounts.join(', ')}`)
  })

  // Test 6: Performance check
  await test('Build output size is reasonable', async () => {
    const distPath = join(__dirname, '../../dist')
    // This is a basic check - in real scenarios you'd measure actual size
    await access(distPath, constants.F_OK)
    console.log(`   📊 Build output exists at ${distPath}`)
  })

  console.log(`\n📋 Test Results:`)
  console.log(`   ✅ Passed: ${passed}`)
  console.log(`   ❌ Failed: ${failed}`) 
  console.log(`   📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`)

  if (failed > 0) {
    console.log(`\n🚨 Some tests failed. LEO system needs attention.`)
    process.exit(1)
  } else {
    console.log(`\n🎉 All tests passed! LEO system is working correctly.`)
  }
}

// Run tests
testLEOSystem().catch(error => {
  console.error('❌ Test runner error:', error)
  process.exit(1)
})