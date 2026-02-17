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
    if (data.metadata.totalEntities < 14) throw new Error(`Expected at least 14 entities, got ${data.metadata.totalEntities}`)
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

  // Test 6: No duplicate protocol entities
  await test('No duplicate protocol entities', async () => {
    const entityPath = join(__dirname, '../../dist/api/entities.json')
    const content = await readFile(entityPath, 'utf-8')
    const data = JSON.parse(content)

    const ids = data.entities.protocols.map(p => p.id)
    const uniqueIds = [...new Set(ids)]
    if (ids.length !== uniqueIds.length) {
      const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
      throw new Error(`Duplicate protocol IDs: ${dupes.join(', ')}`)
    }
  })

  // Test 7: All protocols have blockIntroduced
  await test('All protocols have blockIntroduced', async () => {
    const protocolPath = join(__dirname, '../../dist/api/protocols.json')
    const content = await readFile(protocolPath, 'utf-8')
    const data = JSON.parse(content)

    const missing = data.protocols
      .filter(p => !p.blockIntroduced)
      .map(p => p.id)
    if (missing.length > 0) {
      throw new Error(`Protocols missing blockIntroduced: ${missing.join(', ')}`)
    }
  })

  // Test 8: Non-English locales have localized text (not English fallback)
  await test('Non-English locales have localized text', async () => {
    const checks = [
      { locale: 'tr', path: join(__dirname, '../../dist/tr/api/entities.json'), markers: ['sevilen', 'maskot', 'topluluk'] },
      { locale: 'es', path: join(__dirname, '../../dist/es/api/entities.json'), markers: ['querida', 'mascota', 'comunidad'] },
      { locale: 'fr', path: join(__dirname, '../../dist/fr/api/entities.json'), markers: ['mascotte', 'communautaire', 'culturel'] },
      { locale: 'zh', path: join(__dirname, '../../dist/zh/api/entities.json'), markers: ['吉祥物', '社区', '文化'] },
    ]

    for (const { locale, path: filePath, markers } of checks) {
      const content = await readFile(filePath, 'utf-8')
      const data = JSON.parse(content)
      const kevin = data.entities.concepts.find(c => c.id === 'kevin')
      if (!kevin) throw new Error(`${locale}: KEVIN entity missing`)

      const desc = kevin.description.toLowerCase()
      const hasLocalized = markers.some(m => desc.includes(m))
      if (!hasLocalized) {
        throw new Error(`${locale}: KEVIN description appears to be English fallback: "${kevin.description.substring(0, 80)}"`)
      }
    }
  })

  // Test 9: Protocol descriptions are localized per language (not all Turkish)
  await test('Protocol descriptions are localized per language', async () => {
    const checks = [
      { locale: 'es', path: join(__dirname, '../../dist/es/api/entities.json'), markers: ['fungibles', 'Bitcoin'] },
      { locale: 'fr', path: join(__dirname, '../../dist/fr/api/entities.json'), markers: ['fongibles', 'Bitcoin'] },
      { locale: 'zh', path: join(__dirname, '../../dist/zh/api/entities.json'), markers: ['同质化', '代币'] },
    ]
    for (const { locale, path: filePath, markers } of checks) {
      const content = await readFile(filePath, 'utf-8')
      const data = JSON.parse(content)
      const src20 = data.entities.protocols.find(p => p.id === 'src-20')
      if (!src20) throw new Error(`${locale}: SRC-20 protocol missing`)
      const desc = typeof src20.description === 'string'
        ? src20.description.toLowerCase()
        : (src20.description[locale] || src20.description.en || '').toLowerCase()
      const hasLocalized = markers.some(m => desc.includes(m.toLowerCase()))
      if (!hasLocalized) {
        throw new Error(`${locale}: SRC-20 description not in ${locale}: "${typeof src20.description === 'string' ? src20.description.substring(0, 80) : JSON.stringify(src20.description).substring(0, 80)}"`)
      }
    }
  })

  // Test 10: Static deployment files exist (was Test 9)
  await test('Static deployment files exist', async () => {
    const distPath = join(__dirname, '../../dist')
    const requiredFiles = [
      'llms.txt',
      'llms-full.txt',
      'sitemap.xml',
      'robots.txt',
      '.well-known/ai-plugin.json',
    ]

    const missing = []
    for (const file of requiredFiles) {
      try {
        await access(join(distPath, file), constants.F_OK)
      } catch {
        missing.push(file)
      }
    }
    if (missing.length > 0) {
      throw new Error(`Missing deployment files: ${missing.join(', ')}`)
    }
  })

  // Test 11: Sitemap has expected URL count
  await test('Sitemap contains expected pages', async () => {
    const sitemapPath = join(__dirname, '../../dist/sitemap.xml')
    const content = await readFile(sitemapPath, 'utf-8')
    const urlCount = (content.match(/<url>/g) || []).length
    if (urlCount < 100) {
      throw new Error(`Sitemap has only ${urlCount} URLs, expected at least 100`)
    }
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