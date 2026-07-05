import { defineConfig } from 'vitepress'
import { generateStaticAPIFiles, validateAPIConsistency } from './api/endpoints.ts'
// GEO rec #4: canonical entity data (single source) for server-side DefinedTerm
// glossary + entity `mentions` — never duplicate/hardcode entity text here.
import { getAllMultilingualProtocols, getAllMultilingualEntities } from './api/multilingual-data.ts'
import path from 'path'
import fs from 'fs/promises'
import { readFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'
// js-yaml is a CommonJS module — must use default import then destructure
import yamlPkg from 'js-yaml'
const { load: yamlLoad } = yamlPkg as { load: (input: string) => unknown }

// Load authors.yaml synchronously at module initialization time so it is
// available during the synchronous transformHead call
interface AuthorData {
  id: string
  name: string
  role?: string
  social?: { twitter?: string; github?: string }
  [key: string]: unknown
}

let _authorsMap: Record<string, AuthorData> = {}
try {
  const authorsYamlPath = path.resolve(__dirname, 'data/authors.yaml')
  const rawYaml = readFileSync(authorsYamlPath, 'utf-8')
  const parsed = yamlLoad(rawYaml) as { authors?: AuthorData[] }
  if (parsed?.authors) {
    for (const author of parsed.authors) {
      _authorsMap[author.id] = author
    }
  }
} catch {
  // authors.yaml not found or unparseable — gracefully degrade, no author schemas injected
}

// Load external-links.yaml synchronously at module initialization time for
// build-time access to social profile URLs used in Organization sameAs
interface ExternalLinksData {
  community?: {
    social?: {
      twitter?: { url?: string }
      discord?: { url?: string }
      telegram?: { url?: string }
      reddit?: { url?: string }
      github?: { url?: string }
    }
  }
  [key: string]: unknown
}

const _organizationSchema: Record<string, unknown> = {
  '@type': 'Organization',
  'name': 'Bitcoin Stamps',
  'url': 'https://bitcoinstamps.xyz',
  'logo': {
    '@type': 'ImageObject',
    'url': 'https://bitcoinstamps.xyz/bitcoin-stamps-logo.svg'
  },
  'sameAs': [] as string[]
}

try {
  const externalLinksPath = path.resolve(__dirname, 'data/external-links.yaml')
  const rawExternalLinks = readFileSync(externalLinksPath, 'utf-8')
  const externalLinks = yamlLoad(rawExternalLinks) as ExternalLinksData
  const social = externalLinks?.community?.social
  const sameAs: string[] = []
  if (social?.twitter?.url) sameAs.push(social.twitter.url)
  if (social?.discord?.url) sameAs.push(social.discord.url)
  if (social?.telegram?.url) sameAs.push(social.telegram.url)
  if (social?.github?.url) sameAs.push(social.github.url)
  if (social?.reddit?.url) sameAs.push(social.reddit.url)
  if (sameAs.length > 0) _organizationSchema['sameAs'] = sameAs
} catch {
  // external-links.yaml not found or unparseable — gracefully degrade, sameAs stays empty
}

/** Build a Schema.org Person object from an AuthorData entry */
function buildPersonSchema(author: AuthorData): Record<string, unknown> {
  const sameAs: string[] = []
  if (author.social?.twitter) {
    sameAs.push(`https://twitter.com/${author.social.twitter}`)
  }
  if (author.social?.github) {
    sameAs.push(`https://github.com/${author.social.github}`)
  }
  const person: Record<string, unknown> = {
    '@type': 'Person',
    'name': author.name,
  }
  if (author.role) person['jobTitle'] = author.role
  if (sameAs.length > 0) person['sameAs'] = sameAs
  return person
}

// ---------------------------------------------------------------------------
// GEO rec #4 helpers (server-side schema enhancement)
// ---------------------------------------------------------------------------

/** Locale directory (en/es/fr/zh/tr/pt/cs) → BCP-47 tag for schema.org `inLanguage`. */
const LOCALE_TO_BCP47: Record<string, string> = { en: 'en', es: 'es', fr: 'fr', zh: 'zh-CN', tr: 'tr', pt: 'pt', cs: 'cs' }

/**
 * Breadcrumb slug → culturally-correct display casing. Breadcrumb names are
 * derived by title-casing URL slugs, which would otherwise render the founder
 * slug as "Mikeinspace" (violates the always-lowercase rule) and "Kevin" instead
 * of the required "KEVIN". These entity slugs keep their canonical casing.
 */
const BREADCRUMB_SEGMENT_CASING: Record<string, string> = {
  mikeinspace: 'mikeinspace',
  kevin: 'KEVIN',
}

/** Pick localized text from a MultiLangText-like value, falling back to English. */
function pickLang(value: unknown, locale: string): string {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object') {
    const m = value as Record<string, string>
    return m[locale] || m.en || ''
  }
  return ''
}

/**
 * Build DefinedTerm entries for the protocol/entity glossary, sourced from the
 * canonical multilingual entity data (never hardcoded), localized to `locale`.
 * Includes the four protocols (SRC-20/721/101/OLGA) plus core ecosystem concepts
 * (Bitcoin Stamps/STAMP, KEVIN, Counterparty, Stampchain) and tools; person and
 * block-milestone entities are surfaced elsewhere (mentions), not as glossary terms.
 */
function buildGlossaryTerms(locale: string, termSetUrl: string): Record<string, unknown>[] {
  const terms: Record<string, unknown>[] = []
  const seen = new Set<string>()
  const push = (id: string, name: unknown, description: unknown) => {
    const nm = pickLang(name, locale)
    if (!nm || seen.has(id)) return
    seen.add(id)
    const term: Record<string, unknown> = {
      '@type': 'DefinedTerm',
      'name': nm,
      'inDefinedTermSet': termSetUrl,
    }
    const desc = pickLang(description, locale)
    if (desc) term['description'] = desc
    terms.push(term)
  }
  try {
    for (const p of getAllMultilingualProtocols()) push(p.id, p.name, p.description)
    const ents = getAllMultilingualEntities()
    const conceptTerms = (ents.concepts || []).filter(
      (e: any) => e && e.type !== 'person' && !String(e.id).startsWith('block-'),
    )
    for (const e of [...conceptTerms, ...(ents.tools || [])]) push((e as any).id, (e as any).name, (e as any).description)
  } catch {
    // entity data unavailable — emit an empty glossary rather than failing the build
  }
  return terms
}

/**
 * Build schema.org entity `mentions` from a page's frontmatter (`relatedEntities`
 * or `mentions` — a list of entity ids). Ids that resolve to canonical entity data
 * carry the correct localized name + type + URL; unresolved ids degrade to a plain
 * Thing. This is fully server-side (frontmatter is available in transformHead — no
 * page-content regex needed) and reuses the canonical store (no duplication).
 */
function buildMentions(ids: unknown, locale: string, baseUrl: string): Record<string, unknown>[] {
  if (!Array.isArray(ids) || ids.length === 0) return []
  const lookup: Record<string, { name: string; url?: string; type: string }> = {}
  try {
    for (const p of getAllMultilingualProtocols()) {
      lookup[p.id] = { name: pickLang(p.name, locale), url: `${baseUrl}/${locale}/protocols/${p.id}`, type: 'DefinedTerm' }
    }
    const ents = getAllMultilingualEntities()
    for (const e of [...(ents.concepts || []), ...(ents.tools || [])]) {
      const ent = e as any
      const isPerson = ent.type === 'person'
      const url = typeof ent.url === 'string' ? `${baseUrl}/${locale}${ent.url}` : undefined
      lookup[ent.id] = { name: pickLang(ent.name, locale), url, type: isPerson ? 'Person' : 'Thing' }
    }
  } catch {
    // fall through — unresolved ids become plain Things below
  }
  const out: Record<string, unknown>[] = []
  const seen = new Set<string>()
  for (const raw of ids) {
    const id = String(raw)
    if (seen.has(id)) continue
    seen.add(id)
    const hit = lookup[id]
    const mention: Record<string, unknown> = {
      '@type': hit?.type || 'Thing',
      'name': hit?.name || id,
    }
    if (hit?.url) mention['url'] = hit.url
    out.push(mention)
  }
  return out
}

export default defineConfig({
  title: 'BITCOIN STAMPS',
  description: 'Official documentation for Bitcoin Stamps metaprotocols and art platform',

  // Enable last updated timestamps (reads from git commit dates)
  lastUpdated: true,

  // Internationalization configuration
  locales: {
    en: {
      label: 'English',
      lang: 'en',
      title: 'BITCOIN STAMPS',
      description: 'Official documentation for Bitcoin Stamps metaprotocols and art platform',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/en/guide/introduction' },
          { text: 'Protocols', link: '/en/protocols/' },
          { text: 'Whitepaper', link: '/en/whitepaper/' },
          { text: 'Tutorials', link: '/en/tutorials/' },
          { text: 'Stories', link: '/en/narratives/' },
          { text: 'Community', link: '/en/community/' },
          { text: 'Updates', link: '/en/blog/' }
        ],
        footer: {
          message: 'Community-owned open source project preserving digital culture on Bitcoin',
          copyright: '© 2023-2026 Bitcoin Stamps Community. Documentation licensed under MIT.'
        }
      }
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      title: 'BITCOIN STAMPS',
      description: 'Documentation officielle pour les métaprotocoles Bitcoin Stamps et la plateforme d\'art',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/fr/guide/introduction' },
          { text: 'Protocoles', link: '/fr/protocols/' },
          { text: 'Livre blanc', link: '/en/whitepaper/' },
          { text: 'Tutoriels', link: '/fr/tutorials/' },
          { text: 'Histoires', link: '/fr/narratives/' },
          { text: 'Communauté', link: '/fr/community/' },
          { text: 'Actualités', link: '/fr/blog/' }
        ],
        footer: {
          message: 'Projet open source communautaire préservant la culture numérique sur Bitcoin',
          copyright: '© 2023-2026 Communauté Bitcoin Stamps. Documentation sous licence MIT.'
        }
      }
    },
    es: {
      label: 'Español',
      lang: 'es',
      title: 'BITCOIN STAMPS',
      description: 'Documentación oficial para metaprotocolos Bitcoin Stamps y plataforma de arte',
      themeConfig: {
        nav: [
          { text: 'Guía', link: '/es/guide/introduction' },
          { text: 'Protocolos', link: '/es/protocols/' },
          { text: 'Libro blanco', link: '/en/whitepaper/' },
          { text: 'Tutoriales', link: '/es/tutorials/' },
          { text: 'Historias', link: '/es/narratives/' },
          { text: 'Comunidad', link: '/es/community/' },
          { text: 'Novedades', link: '/es/blog/' }
        ],
        footer: {
          message: 'Proyecto comunitario de código abierto que preserva la cultura digital en Bitcoin',
          copyright: '© 2023-2026 Comunidad Bitcoin Stamps. Documentación bajo licencia MIT.'
        }
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      title: 'BITCOIN STAMPS',
      description: 'Bitcoin Stamps 元协议和艺术平台官方文档',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/guide/introduction' },
          { text: '协议', link: '/zh/protocols/' },
          { text: '白皮书', link: '/en/whitepaper/' },
          { text: '教程', link: '/zh/tutorials/' },
          { text: '故事', link: '/zh/narratives/' },
          { text: '社区', link: '/zh/community/' },
          { text: '更新', link: '/zh/blog/' }
        ],
        footer: {
          message: '社区拥有的开源项目，在比特币上保存数字文化',
          copyright: '© 2023-2026 比特币邮票社区。文档采用 MIT 许可证。'
        }
      }
    },
    tr: {
      label: 'Türkçe',
      lang: 'tr',
      title: 'BITCOIN STAMPS',
      description: 'Bitcoin Stamps metaprotokolleri ve sanat platformu için resmi dokümantasyon',
      themeConfig: {
        nav: [
          { text: 'Rehber', link: '/tr/guide/introduction' },
          { text: 'Protokoller', link: '/tr/protocols/' },
          { text: 'Beyaz kitap', link: '/en/whitepaper/' },
          { text: 'Eğitimler', link: '/tr/tutorials/' },
          { text: 'Hikayeler', link: '/tr/narratives/' },
          { text: 'Topluluk', link: '/tr/community/' }
        ],
        footer: {
          message: 'Bitcoin üzerinde dijital kültürü koruyan topluluk sahipli açık kaynak projesi',
          copyright: '© 2023-2026 Bitcoin Stamps Topluluğu. Dokümantasyon MIT lisansı altında.'
        }
      }
    },
    pt: {
      label: 'Português',
      lang: 'pt',
      title: 'BITCOIN STAMPS',
      description: 'Documentação oficial dos metaprotocolos Bitcoin Stamps e da plataforma de arte',
      themeConfig: {
        nav: [
          { text: 'Guia', link: '/pt/guide/introduction' },
          { text: 'Protocolos', link: '/pt/protocols/' },
          { text: 'Whitepaper', link: '/en/whitepaper/' },
          { text: 'Tutoriais', link: '/en/tutorials/' },
          { text: 'Histórias', link: '/pt/narratives/' },
          { text: 'Comunidade', link: '/en/community/' }
        ],
        footer: {
          message: 'Projeto de código aberto pertencente à comunidade que preserva a cultura digital no Bitcoin',
          copyright: '© 2023-2026 Comunidade Bitcoin Stamps. Documentação sob licença MIT.'
        }
      }
    },
    cs: {
      label: 'Čeština',
      lang: 'cs',
      title: 'BITCOIN STAMPS',
      description: 'Oficiální dokumentace metaprotokolů Bitcoin Stamps a umělecké platformy',
      themeConfig: {
        nav: [
          { text: 'Průvodce', link: '/cs/guide/introduction' },
          { text: 'Protokoly', link: '/cs/protocols/' },
          { text: 'Whitepaper', link: '/en/whitepaper/' },
          { text: 'Návody', link: '/en/tutorials/' },
          { text: 'Příběhy', link: '/cs/narratives/' },
          { text: 'Komunita', link: '/en/community/' }
        ],
        footer: {
          message: 'Komunitní open-source projekt zachovávající digitální kulturu na Bitcoinu',
          copyright: '© 2023-2026 Komunita Bitcoin Stamps. Dokumentace pod licencí MIT.'
        }
      }
    }
  },
  
  // Enable data loaders (LEO API re-enabled)
  vite: {
    server: {
      headers: {
        // Content Security Policy
        'Content-Security-Policy': [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "img-src 'self' data: blob: https:",
          "media-src 'self' data: blob:",
          "connect-src 'self' https:",
          "frame-src 'none'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "manifest-src 'self'"
        ].join('; '),
        
        // Security headers
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), interest-cohort=()',
        
        // HSTS (only in production)
        'Strict-Transport-Security': process.env.NODE_ENV === 'production' 
          ? 'max-age=63072000; includeSubDomains; preload' 
          : undefined,
        
        // Additional security
        'Cross-Origin-Embedder-Policy': 'unsafe-none',
        'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
        'Cross-Origin-Resource-Policy': 'cross-origin'
      }
    },
    plugins: [
      // Custom plugin to validate API consistency during build
      {
        name: 'leo-api-validator',
        buildStart: async () => {
          console.log('🔧 LEO API system: Validating data consistency...')
          const isValid = await validateAPIConsistency()
          if (!isValid) {
            throw new Error('LEO API data validation failed')
          }
        }
      },
      // Translation Management Integration Plugin
      {
        name: 'translation-management',
        buildStart: async () => {
          try {
            // Import translation system conditionally - enable in dev or when explicitly requested
            if (process.env.TRANSLATION_ENABLED === 'true' || (process.env.NODE_ENV !== 'production' && process.env.TRANSLATION_ENABLED !== 'false')) {
              const { translationManager } = await import('./translation/index.ts')
              
              console.log('🌍 Translation Management: Initializing...')
              await translationManager.initialize()
              
              // Process pending workflows
              const result = await translationManager.processPendingWorkflows()
              if (result.processed > 0) {
                console.log(`✅ Processed ${result.processed} translation workflows`)
              }
              
              // Display status
              const status = await translationManager.getStatus()
              console.log(`📊 Translation Memory: ${status.statistics.translationMemoryEntries} entries`)
              console.log(`🎭 Cultural Health Score: ${status.statistics.culturalHealthScore.toFixed(1)}%`)
            } else {
              console.log('📦 Translation Management: Disabled for production build')
            }
            
          } catch (error) {
            console.warn('⚠️ Translation Management initialization failed (non-critical):', error.message)
          }
        },
        buildEnd: async () => {
          try {
            // Import translation system conditionally - enable in dev or when explicitly requested
            if (process.env.TRANSLATION_ENABLED === 'true' || (process.env.NODE_ENV !== 'production' && process.env.TRANSLATION_ENABLED !== 'false')) {
              const { translationManager } = await import('./translation/index.ts')
              
              // Run final cultural validation
              const validation = await translationManager.runCulturalValidation()
              console.log(`🎭 Cultural validation: ${validation.passedValidation}/${validation.totalValidated} passed`)
              
              if (validation.criticalViolations > 0) {
                console.warn(`⚠️ ${validation.criticalViolations} critical cultural preservation violations`)
              }
              
              console.log('✅ Translation Management: Build completed successfully')
            } else {
              console.log('📦 Translation Management: Disabled for production build')
            }
          } catch (error) {
            console.warn('⚠️ Translation Management build end failed (non-critical):', error.message)
          }
        }
      },
      // Well-known files copy plugin
      {
        name: 'copy-well-known',
        generateBundle: async () => {
          try {
            const fs = await import('fs/promises')
            const path = await import('path')
            
            // Copy .well-known directory to dist
            const sourceWellKnown = path.resolve(__dirname, '../public/.well-known')
            const distWellKnown = path.resolve(__dirname, '../../dist/.well-known')
            
            // Check if source exists
            try {
              await fs.access(sourceWellKnown)
              
              // Create destination directory
              await fs.mkdir(distWellKnown, { recursive: true })
              
              // Copy files
              const files = await fs.readdir(sourceWellKnown)
              for (const file of files) {
                const sourceFile = path.join(sourceWellKnown, file)
                const destFile = path.join(distWellKnown, file)
                await fs.copyFile(sourceFile, destFile)
              }
              
              console.log('✅ Copied .well-known files to dist/')
            } catch (error) {
              console.log('ℹ️ No .well-known directory found in public/')
            }
          } catch (error) {
            console.warn('⚠️ Failed to copy .well-known files:', error.message)
          }
        }
      }
    ]
  },
  
  themeConfig: {
    // Enhanced search with Bitcoin Stamps cultural awareness and i18n support
    search: {
      provider: 'local',
      options: {
        locales: {
          en: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search docs'
              },
              modal: {
                noResultsText: 'No results for',
                resetButtonTitle: 'Clear search',
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                }
              }
            }
          },
          fr: {
            translations: {
              button: {
                buttonText: 'Rechercher',
                buttonAriaLabel: 'Rechercher dans les docs'
              },
              modal: {
                noResultsText: 'Aucun résultat pour',
                resetButtonTitle: 'Effacer la recherche',
                footer: {
                  selectText: 'pour sélectionner',
                  navigateText: 'pour naviguer',
                  closeText: 'pour fermer'
                }
              }
            }
          },
          es: {
            translations: {
              button: {
                buttonText: 'Buscar',
                buttonAriaLabel: 'Buscar en los docs'
              },
              modal: {
                noResultsText: 'Sin resultados para',
                resetButtonTitle: 'Limpiar búsqueda',
                footer: {
                  selectText: 'para seleccionar',
                  navigateText: 'para navegar',
                  closeText: 'para cerrar'
                }
              }
            }
          },
          zh: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无搜索结果',
                resetButtonTitle: '清除搜索条件',
                footer: {
                  selectText: '选择',
                  navigateText: '导航',
                  closeText: '关闭'
                }
              }
            }
          },
          tr: {
            translations: {
              button: {
                buttonText: 'Ara',
                buttonAriaLabel: 'Dokümanlarda ara'
              },
              modal: {
                noResultsText: 'Sonuç bulunamadı',
                resetButtonTitle: 'Aramayı temizle',
                footer: {
                  selectText: 'seçmek için',
                  navigateText: 'gezinmek için',
                  closeText: 'kapatmak için'
                }
              }
            }
          },
          pt: {
            translations: {
              button: {
                buttonText: 'Pesquisar',
                buttonAriaLabel: 'Pesquisar na documentação'
              },
              modal: {
                noResultsText: 'Sem resultados para',
                resetButtonTitle: 'Limpar pesquisa',
                footer: {
                  selectText: 'para selecionar',
                  navigateText: 'para navegar',
                  closeText: 'para fechar'
                }
              }
            }
          },
          cs: {
            translations: {
              button: {
                buttonText: 'Hledat',
                buttonAriaLabel: 'Hledat v dokumentaci'
              },
              modal: {
                noResultsText: 'Žádné výsledky pro',
                resetButtonTitle: 'Vymazat hledání',
                footer: {
                  selectText: 'pro výběr',
                  navigateText: 'pro navigaci',
                  closeText: 'pro zavření'
                }
              }
            }
          }
        },
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: {
              title: 4,
              text: 2,
              heading: 3,
              // Cultural entity boosting
              kevin: 5,
              arwyn: 4,
              reinamora: 4,
              'src-20': 4,
              'src-101': 3,
              'src-721': 4,
              olga: 3,
              protocol: 3,
              stamp: 3,
              bitcoin: 2,
              // Block milestones
              '788041': 5,
              '796000': 4,
              '865000': 3,
              // Artists and creators
              mikeinspace: 4,
              counterparty: 3,
              stamps: 3
            }
          },
          // Custom term processing for Bitcoin Stamps terminology
          processTerm: (term, fieldName) => {
            const processed = term.toLowerCase()
            
            // Entity synonyms and related terms
            const entityMappings = {
              'kev': 'kevin',
              'src20': 'src-20',
              'src101': 'src-101', 
              'src721': 'src-721',
              'nft': 'src-721',
              'tokens': 'src-20',
              'naming': 'src-101',
              'encoding': 'olga',
              'block788041': '788041 genesis',
              'block796000': '796000 enhancement',
              'bitcoinstamps': 'bitcoin stamps',
              'btcstamps': 'bitcoin stamps'
            }
            
            return entityMappings[processed] || processed
          },
          
          // Enhanced fields configuration
          fields: {
            title: { boost: 4 },
            text: { boost: 2 },
            heading: { boost: 3 }
          }
        }
      }
    },

    // Navigation is now configured per locale in the locales section above

    // Localized Sidebar Structure
    sidebar: {
      // English sidebar
      '/en/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/en/guide/introduction' },
            { text: 'Getting Started', link: '/en/guide/getting-started' },
            { text: 'Economics', link: '/en/guide/economics' }
          ]
        }
      ],
      '/en/protocols/': [
        {
          text: 'Protocol Overview',
          items: [
            { text: 'All Protocols', link: '/en/protocols/' }
          ]
        },
        {
          text: 'Core Protocols',
          items: [
            { text: 'SRC-20 Tokens', link: '/en/protocols/src-20' },
            { text: 'SRC-101 Names', link: '/en/protocols/src-101' },
            { text: 'SRC-721 Recursion', link: '/en/protocols/src-721' },
            { text: 'OLGA P2WSH Encoding', link: '/en/protocols/olga' },
            { text: 'Stamps Improvement Proposals', link: '/en/protocols/sips' }
          ]
        }
      ],
      '/en/tutorials/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Tutorial Overview', link: '/en/tutorials/' },
            { text: 'Creating Your First Stamp', link: '/en/tutorials/creating-first-stamp' },
            { text: 'Visual Workflow Guide', link: '/en/tutorials/visual-workflow' }
          ]
        },
        {
          text: 'Token & Art Creation',
          items: [
            { text: 'SRC-20 Token Creation', link: '/en/tutorials/src20-token-creation' },
            { text: 'Artist Tools', link: '/en/tutorials/artist-tools' }
          ]
        },
        {
          text: 'Technical Integration',
          items: [
            { text: 'SDK Integration', link: '/en/tutorials/sdk-integration' },
            { text: 'API Integration', link: '/en/tutorials/api-integration' }
          ]
        }
      ],
      '/en/community/': [
        {
          text: 'Community',
          items: [
            { text: 'Community Home', link: '/en/community/' },
            { text: 'Developers', link: '/en/community/developers' },
            { text: 'Contributing', link: '/en/community/contributing' },
            { text: 'Resources', link: '/en/community/resources' },
            { text: 'Showcase', link: '/en/community/showcase' }
          ]
        }
      ],
      '/en/narratives/': [
        {
          text: 'Stories & Culture',
          items: [
            { text: 'Narratives Overview', link: '/en/narratives/' },
            { text: 'Bitcoin Stamps History', link: '/en/narratives/bitcoin-stamps-history' },
            { text: 'KEVIN\'s Origin', link: '/en/narratives/kevin-origin' },
            { text: 'Community Values', link: '/en/narratives/community-values' }
          ]
        }
      ],
      '/en/blog/': [
        {
          text: 'Updates',
          items: [
            { text: 'All Posts', link: '/en/blog/' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Entities API', link: '/api/entities.json' },
            { text: 'Protocols API', link: '/api/protocols.json' },
            { text: 'Schema.org Data', link: '/api/schema.json' }
          ]
        }
      ],

      // French sidebar
      '/fr/guide/': [
        {
          text: 'Pour commencer',
          items: [
            { text: 'Introduction', link: '/fr/guide/introduction' },
            { text: 'Démarrage rapide (en anglais)', link: '/en/guide/getting-started' },
            { text: 'Économie (en anglais)', link: '/en/guide/economics' }
          ]
        }
      ],
      '/fr/protocols/': [
        {
          text: 'Vue d\'ensemble des protocoles',
          items: [
            { text: 'Tous les protocoles', link: '/fr/protocols/' }
          ]
        },
        {
          text: 'Protocoles principaux',
          items: [
            { text: 'Jetons SRC-20', link: '/fr/protocols/src-20' },
            { text: 'Noms SRC-101', link: '/fr/protocols/src-101' },
            { text: 'NFT SRC-721', link: '/fr/protocols/src-721' },
            { text: 'Encodage OLGA', link: '/fr/protocols/olga' },
            { text: 'Propositions d\'amélioration (anglais)', link: '/en/protocols/sips' }
          ]
        }
      ],
      '/fr/tutorials/': [
        {
          text: 'Prise en main',
          items: [
            { text: 'Aperçu des tutoriels', link: '/fr/tutorials/' },
            { text: 'Créer votre premier Stamp (anglais)', link: '/en/tutorials/creating-first-stamp' },
            { text: 'Guide du flux de travail visuel (anglais)', link: '/en/tutorials/visual-workflow' },
            { text: 'Intégration SDK (anglais)', link: '/en/tutorials/sdk-integration' },
            { text: 'Intégration API (anglais)', link: '/en/tutorials/api-integration' },
            { text: 'Création de jetons SRC-20 (anglais)', link: '/en/tutorials/src20-token-creation' },
            { text: 'Outils d\'artiste (anglais)', link: '/en/tutorials/artist-tools' }
          ]
        }
      ],
      '/fr/community/': [
        {
          text: 'Communauté',
          items: [
            { text: 'Accueil Communauté', link: '/fr/community/' },
            { text: 'Développeurs (anglais)', link: '/en/community/developers' },
            { text: 'Contribuer (anglais)', link: '/en/community/contributing' },
            { text: 'Ressources (anglais)', link: '/en/community/resources' },
            { text: 'Vitrine (anglais)', link: '/en/community/showcase' }
          ]
        }
      ],
      '/fr/narratives/': [
        {
          text: 'Histoires et Culture',
          items: [
            { text: 'Aperçu des Histoires', link: '/fr/narratives/' },
            { text: 'Histoire de Bitcoin Stamps', link: '/fr/narratives/bitcoin-stamps-history' },
            { text: 'Origine de KEVIN', link: '/fr/narratives/kevin-origin' },
            { text: 'Valeurs Communautaires', link: '/fr/narratives/community-values' }
          ]
        }
      ],

      // Spanish sidebar
      '/es/guide/': [
        {
          text: 'Primeros pasos',
          items: [
            { text: 'Introducción', link: '/es/guide/introduction' },
            { text: 'Comenzar (en inglés)', link: '/en/guide/getting-started' },
            { text: 'Economía (en inglés)', link: '/en/guide/economics' }
          ]
        }
      ],
      '/es/protocols/': [
        {
          text: 'Resumen de protocolos',
          items: [
            { text: 'Todos los protocolos', link: '/es/protocols/' }
          ]
        },
        {
          text: 'Protocolos principales',
          items: [
            { text: 'Tokens SRC-20', link: '/es/protocols/src-20' },
            { text: 'Nombres SRC-101', link: '/es/protocols/src-101' },
            { text: 'NFTs SRC-721', link: '/es/protocols/src-721' },
            { text: 'Codificación OLGA', link: '/es/protocols/olga' },
            { text: 'Propuestas de mejora (inglés)', link: '/en/protocols/sips' }
          ]
        }
      ],
      '/es/tutorials/': [
        {
          text: 'Primeros pasos',
          items: [
            { text: 'Resumen de tutoriales', link: '/es/tutorials/' },
            { text: 'Crear tu primer Stamp (inglés)', link: '/en/tutorials/creating-first-stamp' },
            { text: 'Guía de flujo visual (inglés)', link: '/en/tutorials/visual-workflow' },
            { text: 'Integración SDK (inglés)', link: '/en/tutorials/sdk-integration' },
            { text: 'Integración API (inglés)', link: '/en/tutorials/api-integration' },
            { text: 'Creación tokens SRC-20 (inglés)', link: '/en/tutorials/src20-token-creation' },
            { text: 'Herramientas artista (inglés)', link: '/en/tutorials/artist-tools' }
          ]
        }
      ],
      '/es/community/': [
        {
          text: 'Comunidad',
          items: [
            { text: 'Inicio de Comunidad', link: '/es/community/' },
            { text: 'Desarrolladores (inglés)', link: '/en/community/developers' },
            { text: 'Contribuir (inglés)', link: '/en/community/contributing' },
            { text: 'Recursos (inglés)', link: '/en/community/resources' },
            { text: 'Escaparate (inglés)', link: '/en/community/showcase' }
          ]
        }
      ],
      '/es/narratives/': [
        {
          text: 'Historias y Cultura',
          items: [
            { text: 'Resumen de Historias', link: '/es/narratives/' },
            { text: 'Historia de Bitcoin Stamps', link: '/es/narratives/bitcoin-stamps-history' },
            { text: 'Origen de KEVIN', link: '/es/narratives/kevin-origin' },
            { text: 'Valores Comunitarios', link: '/es/narratives/community-values' }
          ]
        }
      ],

      // Chinese sidebar
      '/zh/guide/': [
        {
          text: '开始使用',
          items: [
            { text: '介绍', link: '/zh/guide/introduction' },
            { text: '快速开始（英文版）', link: '/en/guide/getting-started' },
            { text: '经济学（英文版）', link: '/en/guide/economics' }
          ]
        }
      ],
      '/zh/protocols/': [
        {
          text: '协议概览',
          items: [
            { text: '所有协议', link: '/zh/protocols/' }
          ]
        },
        {
          text: '核心协议',
          items: [
            { text: 'SRC-20 代币（英文版）', link: '/en/protocols/src-20' },
            { text: 'SRC-101 名称（英文版）', link: '/en/protocols/src-101' },
            { text: 'SRC-721 NFT（英文版）', link: '/en/protocols/src-721' },
            { text: 'OLGA P2WSH（英文版）', link: '/en/protocols/olga' },
            { text: '改进提案（英文版）', link: '/en/protocols/sips' }
          ]
        }
      ],
      '/zh/tutorials/': [
        {
          text: '入门指南',
          items: [
            { text: '教程概览（英文版）', link: '/en/tutorials/' },
            { text: '创建您的第一个 Stamp（英文版）', link: '/en/tutorials/creating-first-stamp' },
            { text: '可视化工作流指南（英文版）', link: '/en/tutorials/visual-workflow' }
          ]
        }
      ],
      '/zh/community/': [
        {
          text: '社区',
          items: [
            { text: '社区首页（英文版）', link: '/en/community/' },
            { text: '贡献（英文版）', link: '/en/community/contributing' },
            { text: '资源（英文版）', link: '/en/community/resources' },
            { text: '展示（英文版）', link: '/en/community/showcase' }
          ]
        }
      ],
      '/zh/narratives/': [
        {
          text: '故事与文化',
          items: [
            { text: '故事概览（英文版）', link: '/en/narratives/' },
            { text: 'Bitcoin Stamps 历史（英文版）', link: '/en/narratives/bitcoin-stamps-history' },
            { text: 'KEVIN 的起源（英文版）', link: '/en/narratives/kevin-origin' },
            { text: '社区价值观（英文版）', link: '/en/narratives/community-values' }
          ]
        }
      ],

      // Turkish sidebar
      '/tr/guide/': [
        {
          text: 'Başlangıç',
          items: [
            { text: 'Giriş', link: '/tr/guide/introduction' },
            { text: 'Hızlı Başlangıç', link: '/tr/guide/getting-started' },
            { text: 'Ekonomi', link: '/tr/guide/economics' }
          ]
        }
      ],
      '/tr/protocols/': [
        {
          text: 'Protokol Genel Bakış',
          items: [
            { text: 'Tüm Protokoller', link: '/tr/protocols/' }
          ]
        },
        {
          text: 'Temel Protokoller',
          items: [
            { text: 'SRC-20 Tokenları', link: '/tr/protocols/src-20' },
            { text: 'SRC-101 İsimler', link: '/tr/protocols/src-101' },
            { text: 'SRC-721 NFTler (İngilizce)', link: '/en/protocols/src-721' },
            { text: 'OLGA Sıkıştırma (İngilizce)', link: '/en/protocols/olga' },
            { text: 'İyileştirme Önerileri (İngilizce)', link: '/en/protocols/sips' }
          ]
        }
      ],
      '/tr/tutorials/': [
        {
          text: 'Başlangıç Rehberi',
          items: [
            { text: 'Eğitim Genel Bakış', link: '/tr/tutorials/' },
            { text: 'İlk Stamp\'ınızı Yaratın', link: '/tr/tutorials/creating-first-stamp' },
            { text: 'Görsel İş Akışı Rehberi (İngilizce)', link: '/en/tutorials/visual-workflow' }
          ]
        }
      ],
      '/tr/community/': [
        {
          text: 'Topluluk',
          items: [
            { text: 'Topluluk Ana Sayfa', link: '/tr/community/' },
            { text: 'Katkıda Bulunma (İngilizce)', link: '/en/community/contributing' },
            { text: 'Kaynaklar (İngilizce)', link: '/en/community/resources' },
            { text: 'Vitrin (İngilizce)', link: '/en/community/showcase' }
          ]
        }
      ],
      '/tr/narratives/': [
        {
          text: 'Hikayeler ve Kültür',
          items: [
            { text: 'Anlatılar Genel Bakış', link: '/tr/narratives/' },
            { text: 'Bitcoin Stamps Tarihi (İngilizce)', link: '/en/narratives/bitcoin-stamps-history' },
            { text: 'KEVIN\'in Kökeni', link: '/tr/narratives/kevin-origin' },
            { text: 'Topluluk Değerleri (İngilizce)', link: '/en/narratives/community-values' }
          ]
        }
      ],

      // Portuguese sidebar (pilot: core pages localized, others link to English)
      '/pt/guide/': [
        {
          text: 'Primeiros passos',
          items: [
            { text: 'Introdução', link: '/pt/guide/introduction' },
            { text: 'Começar', link: '/pt/guide/getting-started' },
            { text: 'Economia (em inglês)', link: '/en/guide/economics' }
          ]
        }
      ],
      '/pt/protocols/': [
        {
          text: 'Visão geral dos protocolos',
          items: [
            { text: 'Todos os protocolos', link: '/pt/protocols/' }
          ]
        },
        {
          text: 'Protocolos principais',
          items: [
            { text: 'Tokens SRC-20 (em inglês)', link: '/en/protocols/src-20' },
            { text: 'Nomes SRC-101 (em inglês)', link: '/en/protocols/src-101' },
            { text: 'NFTs SRC-721 (em inglês)', link: '/en/protocols/src-721' },
            { text: 'Codificação OLGA (em inglês)', link: '/en/protocols/olga' },
            { text: 'Propostas de melhoria (em inglês)', link: '/en/protocols/sips' }
          ]
        }
      ],
      '/pt/narratives/': [
        {
          text: 'Histórias e Cultura',
          items: [
            { text: 'Visão geral das Histórias (em inglês)', link: '/en/narratives/' },
            { text: 'História do Bitcoin Stamps (em inglês)', link: '/en/narratives/bitcoin-stamps-history' },
            { text: 'A Origem de KEVIN', link: '/pt/narratives/kevin-origin' },
            { text: 'Valores da Comunidade (em inglês)', link: '/en/narratives/community-values' }
          ]
        }
      ],

      // Czech sidebar (pilot: core pages localized, others link to English)
      '/cs/guide/': [
        {
          text: 'Začínáme',
          items: [
            { text: 'Úvod', link: '/cs/guide/introduction' },
            { text: 'Začínáme', link: '/cs/guide/getting-started' },
            { text: 'Ekonomika (anglicky)', link: '/en/guide/economics' }
          ]
        }
      ],
      '/cs/protocols/': [
        {
          text: 'Přehled protokolů',
          items: [
            { text: 'Všechny protokoly', link: '/cs/protocols/' }
          ]
        },
        {
          text: 'Hlavní protokoly',
          items: [
            { text: 'Tokeny SRC-20 (anglicky)', link: '/en/protocols/src-20' },
            { text: 'Názvy SRC-101 (anglicky)', link: '/en/protocols/src-101' },
            { text: 'NFT SRC-721 (anglicky)', link: '/en/protocols/src-721' },
            { text: 'Kódování OLGA (anglicky)', link: '/en/protocols/olga' },
            { text: 'Návrhy na vylepšení (anglicky)', link: '/en/protocols/sips' }
          ]
        }
      ],
      '/cs/narratives/': [
        {
          text: 'Příběhy a Kultura',
          items: [
            { text: 'Přehled příběhů (anglicky)', link: '/en/narratives/' },
            { text: 'Historie Bitcoin Stamps (anglicky)', link: '/en/narratives/bitcoin-stamps-history' },
            { text: 'Původ KEVINa', link: '/cs/narratives/kevin-origin' },
            { text: 'Hodnoty komunity (anglicky)', link: '/en/narratives/community-values' }
          ]
        }
      ],

    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/btc-stamps' }
    ],

    // Last updated display config (pairs with root-level lastUpdated: true)
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium'
      }
    }
  },

  // Static site generation with LEO API integration
  buildEnd: async (siteConfig) => {
    console.log('🚀 LEO API system: Generating static API files...')
    const outDir = siteConfig.outDir || path.join(process.cwd(), '../dist')

    try {
      await generateStaticAPIFiles(outDir)
      console.log('✅ LEO API system: Static API files generated successfully')
    } catch (error) {
      console.error('❌ LEO API system: Failed to generate static API files:', error)
      throw error
    }

    // Shared helpers for sitemap and RSS generation
    const buildDate = new Date().toISOString().split('T')[0]

    // Map an output HTML path back to its source .md file and get its git last-commit date
    function getGitLastmod(htmlPath: string): string {
      let relativePath = path.relative(outDir, htmlPath).replace(/\\/g, '/')
      // Convert index.html → directory/index.md; page.html → page.md
      if (relativePath.endsWith('/index.html') || relativePath === 'index.html') {
        relativePath = relativePath.replace(/\/?index\.html$/, '/index.md')
      } else {
        relativePath = relativePath.replace(/\.html$/, '.md')
      }
      const sourcePath = path.join('docs', relativePath)
      try {
        const result = execSync(`git log -1 --format=%cI -- "${sourcePath}"`, {
          encoding: 'utf-8',
          timeout: 5000,
          stdio: ['pipe', 'pipe', 'pipe']
        }).trim()
        if (result) return result.split('T')[0]
      } catch {
        // Fall back to build date if git lookup fails
      }
      return buildDate
    }

    // Determine change frequency based on URL content type
    function getChangeFreq(urlPath: string): string {
      if (urlPath.includes('/blog/')) return 'weekly'
      if (urlPath.includes('/protocols/')) return 'weekly'
      if (urlPath.includes('/guide/') || urlPath.includes('/tutorials/')) return 'monthly'
      if (urlPath.includes('/narratives/') || urlPath.includes('/community/')) return 'monthly'
      if (urlPath === '/' || urlPath.match(/^\/(en|es|fr|zh|tr|pt|cs)\/$/)) return 'weekly'
      return 'monthly'
    }

    // Generate sitemap.xml
    try {
      console.log('🗺️ Generating sitemap.xml...')
      const baseUrl = 'https://bitcoinstamps.xyz'
      const urls: Array<{ loc: string; priority: string; lastmod: string; changefreq: string }> = []

      // GEO #6 (sitemap hygiene): internal/build-only trees that must never
      // enter the sitemap. `delegations` = PAOS internal docs, `seo` =
      // JSON-LD validation artifacts, `public` = combined-html spillover.
      const EXCLUDED_DIRS = new Set(['assets', 'node_modules', 'delegations', 'seo', 'public'])
      // GEO #6: root-level legacy pages excluded from the sitemap.
      const EXCLUDED_ROOT_FILES = new Set(['artists.html', 'developers.html'])

      async function scanDir(dir: string) {
        const entries = await fs.readdir(dir, { withFileTypes: true })
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name)
          if (entry.isDirectory()) {
            // Skip hidden dirs, assets, node_modules, and internal/junk trees (GEO #6)
            if (!entry.name.startsWith('.') && !EXCLUDED_DIRS.has(entry.name)) {
              await scanDir(fullPath)
            }
          } else if (entry.name.endsWith('.html') && entry.name !== '404.html') {
            const relFromOut = path.relative(outDir, fullPath).replace(/\\/g, '/')
            // GEO #6: drop root-level legacy pages
            if (EXCLUDED_ROOT_FILES.has(relFromOut)) continue
            let urlPath = '/' + relFromOut
            // Convert index.html to extensionless directory path (trailing slash)
            if (urlPath.endsWith('/index.html')) {
              urlPath = urlPath.replace(/index\.html$/, '')
            } else {
              // GEO #5: strip `.html` so sitemap URLs match the extensionless
              // rel=canonical form emitted in transformHead (avoids split
              // indexing signals from two names per page).
              urlPath = urlPath.replace(/\.html$/, '')
            }
            // Determine priority
            let priority = '0.5'
            if (urlPath === '/') priority = '1.0'
            else if (urlPath.match(/^\/(en|es|fr|zh|tr|pt|cs)\/$/)) priority = '0.9'
            else if (urlPath.includes('/protocols/')) priority = '0.8'
            else if (urlPath.includes('/whitepaper/')) priority = '0.8'
            else if (urlPath.includes('/guide/')) priority = '0.7'
            else if (urlPath.includes('/tutorials/')) priority = '0.7'

            urls.push({
              loc: `${baseUrl}${urlPath}`,
              priority,
              lastmod: getGitLastmod(fullPath),
              changefreq: getChangeFreq(urlPath)
            })
          }
        }
      }

      await scanDir(outDir)
      urls.sort((a, b) => a.loc.localeCompare(b.loc))

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`
      await fs.writeFile(path.join(outDir, 'sitemap.xml'), sitemap, 'utf-8')
      console.log(`✅ Sitemap generated with ${urls.length} URLs`)
    } catch (error) {
      console.warn('⚠️ Sitemap generation failed (non-critical):', error)
    }

    // Generate RSS 2.0 feed.xml for blog posts
    try {
      console.log('📡 Generating RSS feed.xml...')
      const baseUrl = 'https://bitcoinstamps.xyz'
      const blogDir = path.join(process.cwd(), 'docs/en/blog')
      const blogEntries = await fs.readdir(blogDir, { withFileTypes: true })
      const blogFiles = blogEntries
        .filter(e => e.isFile() && e.name.endsWith('.md') && e.name !== 'index.md')
        .map(e => e.name)

      interface BlogPost {
        title: string
        link: string
        description: string
        pubDate: string
        guid: string
        author: string
      }
      const posts: BlogPost[] = []

      for (const fileName of blogFiles) {
        const filePath = path.join(blogDir, fileName)
        const raw = readFileSync(filePath, 'utf-8')
        // Extract YAML frontmatter between opening and closing ---
        const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
        if (!fmMatch) continue
        const fm = yamlLoad(fmMatch[1]) as Record<string, unknown>
        const title = typeof fm.title === 'string' ? fm.title : ''
        const description = typeof fm.description === 'string' ? fm.description : ''
        const author = typeof fm.author === 'string' ? fm.author : ''
        const dateRaw = typeof fm.date === 'string' ? fm.date : ''
        if (!title || !dateRaw) continue

        // Build URL slug from file name (strip .md extension)
        const slug = fileName.replace(/\.md$/, '')
        const link = `${baseUrl}/en/blog/${slug}`
        const guid = link
        // Format date as RFC 822 for RSS pubDate
        const pubDate = new Date(dateRaw + 'T00:00:00Z').toUTCString()

        posts.push({ title, link, description, pubDate, guid, author })
      }

      // Sort posts newest first
      posts.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

      const lastBuildDate = getGitLastmod(path.join(outDir, 'en/blog/index.html'))
      const lastBuildDateRFC = new Date(lastBuildDate + 'T00:00:00Z').toUTCString()

      function escapeXml(str: string): string {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;')
      }

      const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bitcoin Stamps Blog</title>
    <link>${baseUrl}/en/blog/</link>
    <description>Latest news, protocol updates, and stories from the Bitcoin Stamps ecosystem</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDateRFC}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${posts.map(p => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${p.link}</link>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${p.pubDate}</pubDate>
      <guid isPermaLink="true">${p.guid}</guid>
      <author>${escapeXml(p.author)}</author>
    </item>`).join('\n')}
  </channel>
</rss>
`
      await fs.writeFile(path.join(outDir, 'feed.xml'), rssFeed, 'utf-8')
      console.log(`✅ RSS feed generated with ${posts.length} posts`)
    } catch (error) {
      console.warn('⚠️ RSS feed generation failed (non-critical):', error)
    }

    // Sync ai-plugin.json to /api/ for Cloudflare Pages compatibility
    // Cloudflare Pages doesn't serve dotfile directories (.well-known/)
    // _redirects proxies /.well-known/ai-plugin.json -> /api/ai-plugin.json
    try {
      const wellKnownSrc = path.join(outDir, '.well-known', 'ai-plugin.json')
      const apiDest = path.join(outDir, 'api', 'ai-plugin.json')
      await fs.copyFile(wellKnownSrc, apiDest)
      console.log('✅ Synced ai-plugin.json to /api/ for Cloudflare Pages')
    } catch {
      console.warn('⚠️ ai-plugin.json sync skipped (non-critical)')
    }
  },

  // Search result transformation for cultural context
  transformPageData(pageData) {
    // Add cultural significance metadata for search enhancement
    const culturalEntities = ['kevin', 'arwyn', 'reinamora', 'src-20', 'mikeinspace']
    const blockMilestones = ['788041', '796000', '865000']
    
    // Check if page contains cultural entities
    const content = (pageData.content || '').toLowerCase()
    const hasHighCulturalValue = culturalEntities.some(entity => content.includes(entity))
    const hasBlockMilestone = blockMilestones.some(block => content.includes(block))
    
    if (hasHighCulturalValue || hasBlockMilestone) {
      pageData.searchMeta = {
        culturalSignificance: hasHighCulturalValue ? 'high' : 'medium',
        containsBlockMilestone: hasBlockMilestone
      }
    }
    
    return pageData
  },

  // Generate canonical URLs for SEO deduplication and inject Schema.org JSON-LD
  transformHead({ pageData }) {
    const baseUrl = 'https://bitcoinstamps.xyz'
    const canonicalPath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')
    const canonicalUrl = `${baseUrl}/${canonicalPath}`
    const headTags: any[] = [['link', { rel: 'canonical', href: canonicalUrl }]]

    const fm = pageData.frontmatter || {}
    const pageTitle = fm.title || pageData.title || 'Bitcoin Stamps Documentation'
    const pageDesc = fm.description || pageData.description || 'Official documentation for Bitcoin Stamps metaprotocols and art platform'
    const leoType = fm.leoType || ''
    const relPath = pageData.relativePath || ''

    // GEO #8: per-page Open Graph / Twitter tags. The site-wide homepage set was
    // removed from the global `head:`; these carry THIS page's own title, desc,
    // and canonical URL so deep-link shares and AI citations are accurate.
    // og:image / twitter:image stay site-wide (no per-page image available).
    headTags.push(['meta', { property: 'og:title', content: pageTitle }])
    headTags.push(['meta', { property: 'og:description', content: pageDesc }])
    headTags.push(['meta', { property: 'og:url', content: canonicalUrl }])
    headTags.push(['meta', { name: 'twitter:title', content: pageTitle }])
    headTags.push(['meta', { name: 'twitter:description', content: pageDesc }])

    // GEO #8: per-page reciprocal hreflang. For a source at /{locale}/{sub},
    // link the SAME {sub} across every locale (+ x-default → en), skipping any
    // locale whose source .md is absent (file parity is ~30/32) so we never
    // advertise a 404 alternate. Replaces the old site-wide links that pointed
    // every page at the locale roots.
    const HREFLANG_LOCALES: Record<string, string> = { en: 'en', es: 'es', fr: 'fr', zh: 'zh-CN', tr: 'tr', pt: 'pt', cs: 'cs' }
    const pageLocale = relPath.split('/')[0]
    // GEO rec #4: BCP-47 language tag for this page, used as `inLanguage` on the
    // per-page schemas below (falls back to English for non-locale-rooted paths).
    const inLanguage = LOCALE_TO_BCP47[pageLocale] || 'en'
    if (pageLocale in HREFLANG_LOCALES) {
      const sub = relPath.slice(pageLocale.length + 1) // e.g. "protocols/src-20.md" | "index.md"
      let enHref: string | null = null
      for (const loc of Object.keys(HREFLANG_LOCALES)) {
        const srcFile = path.resolve(__dirname, '..', loc, sub)
        if (!existsSync(srcFile)) continue
        const locSub = sub.replace(/index\.md$/, '').replace(/\.md$/, '')
        const href = `${baseUrl}/${loc}/${locSub}`
        headTags.push(['link', { rel: 'alternate', hreflang: HREFLANG_LOCALES[loc], href }])
        if (loc === 'en') enHref = href
      }
      // x-default → the English variant when it exists
      if (enHref) headTags.push(['link', { rel: 'alternate', hreflang: 'x-default', href: enHref }])
    }

    // Derive dateModified from git last-commit date for this source file
    let gitDateModified = new Date().toISOString().split('T')[0]
    try {
      const sourcePath = `docs/${relPath}`
      const gitDate = execSync(`git log -1 --format=%cI -- "${sourcePath}"`, {
        encoding: 'utf-8',
        timeout: 5000,
        stdio: ['pipe', 'pipe', 'pipe']
      }).trim()
      if (gitDate) gitDateModified = gitDate.split('T')[0]
    } catch {
      // Fall back to build date if git lookup fails
    }
    const gitDatePublished = (fm.date as string | undefined) || gitDateModified

    // Resolve Person schema from frontmatter.author (slug → authors.yaml lookup)
    const authorSlug: string = fm.author || ''
    const authorData = authorSlug ? _authorsMap[authorSlug] : null
    const personSchema = authorData ? buildPersonSchema(authorData) : null

    // GEO rec #4: entity `mentions` from frontmatter (`relatedEntities` or `mentions`),
    // resolved against the canonical entity store. Fully server-side (no page-content
    // regex). Attached to the primary content schema for each page type below.
    const pageMentions = buildMentions(fm.relatedEntities ?? fm.mentions, pageLocale, baseUrl)

    // Base website schema injected on every page
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Bitcoin Stamps Documentation',
      'url': baseUrl,
      'inLanguage': inLanguage, // GEO rec #4: per-page locale
      'description': 'Official documentation for Bitcoin Stamps metaprotocols: permanent digital assets stored immutably on the Bitcoin UTXO set',
      'about': {
        '@type': 'SoftwareApplication',
        'name': 'Bitcoin Stamps Metaprotocol',
        'applicationCategory': 'BlockchainApplication',
        'operatingSystem': 'Bitcoin Network',
        'description': 'Bitcoin Stamps embed digital asset data directly into Bitcoin UTXO bare multisig outputs, ensuring permanent and immutable storage guaranteed by Bitcoin\'s global consensus',
        'featureList': [
          'Permanent storage in Bitcoin UTXO set',
          'Immutable data that cannot be pruned or deleted',
          'Guaranteed availability through Bitcoin full nodes',
          'No reliance on external servers or IPFS',
          'Data persists as long as Bitcoin exists'
        ]
      },
      'publisher': _organizationSchema
    }
    headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(websiteSchema)])

    // Protocol pages: inject TechArticle schema with permanence claims
    if (leoType === 'protocol' || relPath.includes('/protocols/')) {
      const protocolSchemas: Record<string, any> = {
        'src-20': {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'name': pageTitle,
          'headline': 'SRC-20 Token Standard — Permanent Fungible Tokens on Bitcoin',
          'description': pageDesc,
          'url': canonicalUrl,
          'datePublished': (fm.date as string | undefined) || '2023-04-05',
          'dateModified': gitDateModified,
          'about': {
            '@type': 'SoftwareApplication',
            'name': 'SRC-20 Token Protocol',
            'applicationCategory': 'Bitcoin Metaprotocol',
            'operatingSystem': 'Bitcoin Network',
            'description': 'SRC-20 tokens are stored permanently in the Bitcoin UTXO set using bare multisig outputs. Token records are immutable and guaranteed to persist as long as the Bitcoin network exists.',
            'featureList': [
              'Token data stored in Bitcoin UTXO bare multisig outputs',
              'Permanent and immutable token records',
              'No external server dependency — guaranteed availability',
              'Consensus-enforced token balances via account-based ledger',
              'Cannot be censored, deleted, or modified'
            ],
            'softwareVersion': 'Block 788041 genesis'
          },
          'teaches': [
            'SRC-20 token creation on Bitcoin',
            'Permanent token storage via UTXO encoding',
            'Immutable digital asset creation'
          ],
          'publisher': _organizationSchema,
          'isPartOf': { '@type': 'WebSite', 'url': baseUrl }
        },
        'src-101': {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'name': pageTitle,
          'headline': 'SRC-101 Name Service — Permanent Human-Readable Names on Bitcoin',
          'description': pageDesc,
          'url': canonicalUrl,
          'datePublished': (fm.date as string | undefined) || '2024-01-01',
          'dateModified': gitDateModified,
          'about': {
            '@type': 'SoftwareApplication',
            'name': 'SRC-101 Name Service Protocol',
            'applicationCategory': 'Bitcoin Metaprotocol',
            'operatingSystem': 'Bitcoin Network',
            'description': 'SRC-101 names are stamped permanently onto the Bitcoin blockchain, providing immutable human-readable identifiers guaranteed by Bitcoin consensus.',
            'featureList': [
              'Names stored permanently in Bitcoin UTXO set',
              'Immutable name records on Bitcoin blockchain',
              'Account-based ownership — no UTXO spending risk',
              'Guaranteed availability through full node network',
              'True censorship resistance'
            ]
          },
          'publisher': _organizationSchema,
          'isPartOf': { '@type': 'WebSite', 'url': baseUrl }
        },
        'src-721': {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'name': pageTitle,
          'headline': 'SRC-721 Recursive NFTs — Permanent Digital Art on Bitcoin',
          'description': pageDesc,
          'url': canonicalUrl,
          'datePublished': (fm.date as string | undefined) || '2024-01-01',
          'dateModified': gitDateModified,
          'about': {
            '@type': 'SoftwareApplication',
            'name': 'SRC-721 Recursive NFT Protocol',
            'applicationCategory': 'Bitcoin Metaprotocol',
            'operatingSystem': 'Bitcoin Network',
            'description': 'SRC-721 NFTs store artwork data permanently in the Bitcoin UTXO set. All image data is embedded on-chain with no external dependencies, ensuring perpetual availability.',
            'featureList': [
              'Full NFT data stored in Bitcoin UTXO set',
              'No IPFS, no external servers required',
              'Recursive composition from on-chain data only',
              'Permanently immutable digital art records',
              'Guaranteed availability for as long as Bitcoin exists'
            ]
          },
          'publisher': _organizationSchema,
          'isPartOf': { '@type': 'WebSite', 'url': baseUrl }
        },
        'olga': {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'name': pageTitle,
          'headline': 'OLGA P2WSH Encoding — Efficient Permanent Storage on Bitcoin',
          'description': pageDesc,
          'url': canonicalUrl,
          'datePublished': (fm.date as string | undefined) || '2024-01-01',
          'dateModified': gitDateModified,
          'about': {
            '@type': 'SoftwareApplication',
            'name': 'OLGA P2WSH Encoding Protocol',
            'applicationCategory': 'Bitcoin Metaprotocol',
            'operatingSystem': 'Bitcoin Network',
            'description': 'OLGA encodes stamp data into P2WSH outputs for efficient permanent storage in the Bitcoin UTXO set, providing immutable on-chain data at reduced cost.',
            'featureList': [
              'Data stored in Bitcoin P2WSH UTXO outputs',
              'Permanent immutable storage on Bitcoin',
              'Reduced cost compared to bare multisig encoding',
              'Guaranteed availability via Bitcoin consensus',
              'No external data dependency'
            ]
          },
          'publisher': _organizationSchema,
          'isPartOf': { '@type': 'WebSite', 'url': baseUrl }
        }
      }

      // Detect which protocol page this is
      const protocolKey = Object.keys(protocolSchemas).find(k => relPath.includes(`/${k}`))
      if (protocolKey && protocolSchemas[protocolKey]) {
        const protocolSchema = protocolSchemas[protocolKey]
        protocolSchema['inLanguage'] = inLanguage // GEO rec #4
        if (pageMentions.length > 0) protocolSchema['mentions'] = pageMentions // GEO rec #4
        if (personSchema) protocolSchema['author'] = personSchema
        headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(protocolSchema)])
      } else {
        // Generic protocol page schema
        const genericProtocolSchema: Record<string, unknown> = {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          'name': pageTitle,
          'description': pageDesc,
          'url': canonicalUrl,
          'datePublished': gitDatePublished,
          'dateModified': gitDateModified,
          'about': {
            '@type': 'SoftwareApplication',
            'name': pageTitle,
            'applicationCategory': 'Bitcoin Metaprotocol',
            'operatingSystem': 'Bitcoin Network',
            'description': 'Bitcoin Stamps protocol data is stored permanently in the Bitcoin UTXO set, ensuring immutable and guaranteed availability.',
            'featureList': [
              'Permanent storage in Bitcoin UTXO set',
              'Immutable on-chain data',
              'Guaranteed availability — no external servers'
            ]
          },
          'publisher': _organizationSchema,
          'isPartOf': { '@type': 'WebSite', 'url': baseUrl }
        }
        genericProtocolSchema['inLanguage'] = inLanguage // GEO rec #4
        if (pageMentions.length > 0) genericProtocolSchema['mentions'] = pageMentions // GEO rec #4
        if (personSchema) genericProtocolSchema['author'] = personSchema
        headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(genericProtocolSchema)])
      }
    }

    // GEO rec #4: DefinedTermSet glossary for protocol-overview / glossary pages.
    // Terms (SRC-20/721/101/OLGA + STAMP and core ecosystem concepts) are sourced
    // from the canonical multilingual entity data, localized to the page — never
    // hardcoded. Gives answer engines a machine-readable protocol glossary.
    if (leoType === 'protocol-overview' || leoType === 'glossary') {
      const glossaryTerms = buildGlossaryTerms(pageLocale, canonicalUrl)
      if (glossaryTerms.length > 0) {
        const definedTermSetSchema: Record<string, unknown> = {
          '@context': 'https://schema.org',
          '@type': 'DefinedTermSet',
          'name': pageTitle,
          'description': pageDesc,
          'url': canonicalUrl,
          'inLanguage': inLanguage,
          'hasDefinedTerm': glossaryTerms
        }
        if (pageMentions.length > 0) definedTermSetSchema['mentions'] = pageMentions
        headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(definedTermSetSchema)])
      }
    }

    // Guide / introduction pages: inject Article schema with permanence claims
    if (leoType === 'guide' || relPath.includes('/guide/')) {
      const guideSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'name': pageTitle,
        'headline': pageTitle,
        'description': pageDesc,
        'url': canonicalUrl,
        'datePublished': gitDatePublished,
        'dateModified': gitDateModified,
        'about': {
          '@type': 'Thing',
          'name': 'Bitcoin Stamps',
          'description': 'Digital assets stored permanently and immutably in the Bitcoin UTXO set via bare multisig and P2WSH outputs. Unlike NFTs hosted on IPFS or external servers, Bitcoin Stamps are guaranteed to be available as long as the Bitcoin network operates.',
          'additionalProperty': [
            {
              '@type': 'PropertyValue',
              'name': 'storageMethod',
              'value': 'Bitcoin UTXO bare multisig and P2WSH outputs'
            },
            {
              '@type': 'PropertyValue',
              'name': 'permanence',
              'value': 'Immutable — data cannot be deleted or modified'
            },
            {
              '@type': 'PropertyValue',
              'name': 'availability',
              'value': 'Guaranteed by Bitcoin full node network consensus'
            },
            {
              '@type': 'PropertyValue',
              'name': 'externalDependency',
              'value': 'None — fully self-contained on Bitcoin blockchain'
            }
          ]
        },
        'publisher': _organizationSchema,
        'isPartOf': { '@type': 'WebSite', 'url': baseUrl }
      }
      guideSchema['inLanguage'] = inLanguage // GEO rec #4
      if (pageMentions.length > 0) guideSchema['mentions'] = pageMentions // GEO rec #4
      if (personSchema) guideSchema['author'] = personSchema
      headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(guideSchema)])
    }

    // Blog post pages: inject BlogPosting schema
    if (relPath.includes('/blog/') && !relPath.match(/\/blog\/(index\.md)?$/)) {
      const authorName = fm.author || 'Bitcoin Stamps Community'
      const datePublished = fm.date || ''
      // Derive dateModified from git last-commit date for this source file
      let dateModified = datePublished
      try {
        const sourcePath = `docs/${relPath}`
        const gitDate = execSync(`git log -1 --format=%cI -- "${sourcePath}"`, {
          encoding: 'utf-8',
          timeout: 5000,
          stdio: ['pipe', 'pipe', 'pipe']
        }).trim()
        if (gitDate) dateModified = gitDate.split('T')[0]
      } catch {
        // Fall back to datePublished if git lookup fails
      }
      // Use full Person schema when author data is available, else minimal Person with name only
      const blogAuthorSchema = personSchema ?? { '@type': 'Person', 'name': authorName }
      const blogPostingSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': pageTitle,
        'datePublished': datePublished,
        'dateModified': dateModified,
        'author': blogAuthorSchema,
        'description': pageDesc,
        'inLanguage': inLanguage, // GEO rec #4
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        'publisher': _organizationSchema
      }
      if (pageMentions.length > 0) blogPostingSchema['mentions'] = pageMentions // GEO rec #4
      headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(blogPostingSchema)])
    }

    // Narrative pages
    if (leoType === 'narrative' || relPath.includes('/narratives/')) {
      const narrativeSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'name': pageTitle,
        'headline': pageTitle,
        'description': pageDesc,
        'url': canonicalUrl,
        'datePublished': gitDatePublished,
        'dateModified': gitDateModified,
        'genre': 'Community Story',
        'about': {
          '@type': 'Thing',
          'name': 'Bitcoin Stamps Cultural History',
          'description': 'Bitcoin Stamps are permanent digital cultural artifacts stored immutably in the Bitcoin UTXO set'
        },
        'publisher': _organizationSchema,
        'isPartOf': { '@type': 'WebSite', 'url': baseUrl }
      }
      narrativeSchema['inLanguage'] = inLanguage // GEO rec #4
      if (pageMentions.length > 0) narrativeSchema['mentions'] = pageMentions // GEO rec #4
      if (personSchema) narrativeSchema['author'] = personSchema
      headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(narrativeSchema)])
    }

    // GEO rec #4: HowTo schema for tutorial pages. Steps are derived server-side
    // from the source markdown's level-2 (## ) headings (frontmatter carries no
    // explicit step list); estimated time is emitted from frontmatter
    // (estimatedTime / totalTime / timeRequired) when present. Index/listing pages
    // are skipped. Tutorials previously received only WebSite + BreadcrumbList.
    if ((leoType === 'tutorial' || relPath.includes('/tutorials/')) && !relPath.endsWith('/index.md')) {
      let howToSteps: Record<string, unknown>[] = []
      try {
        const md = readFileSync(path.resolve(__dirname, '..', relPath), 'utf-8')
        const body = md.replace(/^---[\s\S]*?\n---\s*/, '') // strip frontmatter
        const headings = [...body.matchAll(/^##\s+(.+?)\s*$/gm)].map(h => h[1])
        howToSteps = headings
          .map((rawHeading, i) => {
            const name = rawHeading
              .replace(/<[^>]+>/g, '')                // strip HTML / EntityMention tags
              .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // markdown links → text
              .replace(/[*_`#]/g, '')                  // markdown emphasis / code
              .replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu, '') // emoji/symbols
              .replace(/\bkevin\b/gi, 'KEVIN')         // cultural rule: KEVIN ALL-CAPS
              .replace(/\bMikeinspace\b/g, 'mikeinspace') // cultural rule: lowercase founder
              .trim()
            const anchor = name.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '')
            return {
              '@type': 'HowToStep',
              'position': i + 1,
              'name': name,
              'url': anchor ? `${canonicalUrl}#${anchor}` : canonicalUrl
            }
          })
          .filter(s => (s.name as string).length > 0)
      } catch {
        // source markdown unreadable — emit HowTo without steps rather than failing
      }
      const howToSchema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        'name': pageTitle,
        'description': pageDesc,
        'url': canonicalUrl,
        'inLanguage': inLanguage,
        'datePublished': gitDatePublished,
        'dateModified': gitDateModified,
        'publisher': _organizationSchema,
        'isPartOf': { '@type': 'WebSite', 'url': baseUrl }
      }
      const estTime = (fm.estimatedTime || fm.totalTime || fm.timeRequired) as string | undefined
      if (estTime) howToSchema['totalTime'] = estTime // ISO-8601 duration when authored
      if (howToSteps.length > 0) howToSchema['step'] = howToSteps
      if (pageMentions.length > 0) howToSchema['mentions'] = pageMentions
      if (personSchema) howToSchema['author'] = personSchema
      headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(howToSchema)])
    }

    // BreadcrumbList JSON-LD schema for all non-homepage pages
    // canonicalPath examples: 'en/' (home), 'en/protocols/src-20', 'en/guide/getting-started'
    const pathSegments = canonicalPath.split('/').filter(s => s.length > 0)
    // pathSegments[0] is the locale (e.g. 'en'), remaining are content segments
    const locale = pathSegments[0] || 'en'
    const contentSegments = pathSegments.slice(1)

    // Only add breadcrumb when there are content segments (skip homepage and locale roots)
    if (contentSegments.length > 0) {
      const formatSegmentName = (segment: string): string => {
        // Cultural rule: entity slugs keep their canonical casing (mikeinspace stays
        // lowercase, kevin → KEVIN) instead of being title-cased from the URL slug.
        const culturalOverride = BREADCRUMB_SEGMENT_CASING[segment.toLowerCase()]
        if (culturalOverride) return culturalOverride
        // Convert kebab-case to Title Case words (e.g. 'src-20' → 'Src-20', 'protocols' → 'Protocols')
        return segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('-')
      }

      const breadcrumbItems: any[] = []

      // Position 1: Home
      breadcrumbItems.push({
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': `${baseUrl}/${locale}/`
      })

      // Positions 2..N: each content segment as a cumulative path
      contentSegments.forEach((segment, index) => {
        const cumulativePath = `${baseUrl}/${locale}/${contentSegments.slice(0, index + 1).join('/')}`
        // Last segment has no trailing slash; intermediate segments get trailing slash for directory semantics
        const isLast = index === contentSegments.length - 1
        breadcrumbItems.push({
          '@type': 'ListItem',
          'position': index + 2,
          'name': formatSegmentName(segment),
          'item': isLast ? cumulativePath : `${cumulativePath}/`
        })
      })

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbItems
      }
      headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(breadcrumbSchema)])
    }

    // FAQPage JSON-LD schema — injected for pages with Q&A frontmatter or known FAQ paths
    // Trigger conditions:
    //   1. Page has a `faqs` frontmatter key containing an array of { question, answer } objects
    //   2. Page path contains '/faq' or '/faqs' (path-based fallback with no structured data)
    const faqItems: Array<{ question: string; answer: string }> = Array.isArray(fm.faqs) ? fm.faqs : []
    const isFaqPath = relPath.includes('/faq') || relPath.includes('/faqs')

    if (faqItems.length > 0) {
      // Structured FAQPage schema from frontmatter data
      const faqMainEntity = faqItems
        .filter(item => item && typeof item.question === 'string' && typeof item.answer === 'string')
        .map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }))

      if (faqMainEntity.length > 0) {
        const faqPageSchema = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'name': pageTitle,
          'description': pageDesc,
          'url': canonicalUrl,
          'inLanguage': inLanguage, // GEO rec #4
          'mainEntity': faqMainEntity
        }
        headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(faqPageSchema)])
      }
    } else if (isFaqPath) {
      // Path-based FAQPage schema without structured Q&A data — signals the page type to search engines
      const faqPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'name': pageTitle,
        'description': pageDesc,
        'url': canonicalUrl,
        'inLanguage': inLanguage // GEO rec #4
      }
      headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(faqPageSchema)])
    }

    // Standalone Person schema — injected for any page with a known author
    if (personSchema) {
      const standalonePerson = {
        '@context': 'https://schema.org',
        ...personSchema
      }
      headTags.push(['script', { type: 'application/ld+json' }, JSON.stringify(standalonePerson)])
    }

    return headTags
  },

  // Configure for Cloudflare Pages deployment with custom domain
  base: '/', // Always use root path for custom domain (bitcoinstamps.xyz)
  outDir: '../dist',
  
  // Static file configuration
  assetsDir: 'assets',
  cacheDir: './.vitepress/cache',

  // Head configuration for Schema.org integration
  // Ignore dead links for validation builds
  ignoreDeadLinks: true,

  head: [
    // Typography: Geist Sans + Geist Mono (design/dark-tech homepage). Loaded
    // additively via jsDelivr @fontsource CDN so no package.json dep is required;
    // used by the custom StampsHome layout and the global --vp-font-family-* set
    // in theme/style.css.
    ['link', { rel: 'preconnect', href: 'https://cdn.jsdelivr.net', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/index.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/600.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fontsource/geist-sans@5.0.3/700.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fontsource/geist-mono@5.0.3/index.min.css' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fontsource/geist-mono@5.0.3/500.min.css' }],

    // Basic meta tags
    ['meta', { name: 'generator', content: 'LEO API System - Dynamic Bitcoin Stamps Documentation' }],
    ['meta', { name: 'keywords', content: 'bitcoin stamps, src-20, kevin token, metaprotocols, digital art, blockchain, nft, olga, src-101, src-721' }],
    ['meta', { name: 'author', content: 'Bitcoin Stamps Community' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'theme-color', content: '#ff6b35' }],
    
    // Favicon and PWA manifest
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    
    // Enhanced Open Graph meta tags
    // NOTE (GEO #8): og:title / og:description / og:url are emitted PER PAGE in
    // transformHead so deep-link shares & AI citations carry the correct page
    // metadata (not the site-wide homepage set). Only site-wide OG tags remain here.
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Bitcoin Stamps Documentation' }],
    ['meta', { property: 'og:image', content: 'https://bitcoinstamps.xyz/og-image.jpg' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:type', content: 'image/jpeg' }],
    ['meta', { property: 'og:image:alt', content: 'Bitcoin Stamps Logo - Digital Assets on Bitcoin' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:locale:alternate', content: 'fr_FR' }],
    ['meta', { property: 'og:locale:alternate', content: 'es_ES' }],
    ['meta', { property: 'og:locale:alternate', content: 'zh_CN' }],
    ['meta', { property: 'og:locale:alternate', content: 'tr_TR' }],
    
    // Enhanced Twitter Card meta tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@BitcoinStamps' }],
    ['meta', { name: 'twitter:creator', content: '@BitcoinStamps' }],
    // NOTE (GEO #8): twitter:title / twitter:description are emitted PER PAGE in transformHead.
    ['meta', { name: 'twitter:image', content: 'https://bitcoinstamps.xyz/og-image.jpg' }],
    ['meta', { name: 'twitter:image:alt', content: 'Bitcoin Stamps Logo - Digital Assets on Bitcoin' }],
    
    // Additional SEO and social tags
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'format-detection', content: 'telephone=no' }],
    
    // App-specific meta tags
    ['meta', { name: 'application-name', content: 'Bitcoin Stamps Documentation' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Bitcoin Stamps' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['meta', { name: 'msapplication-TileColor', content: '#1a1a1a' }],
    ['meta', { name: 'msapplication-config', content: '/browserconfig.xml' }],
    
    // Multilingual SEO support for custom domain
    // NOTE (GEO #8): hreflang links are emitted PER PAGE in transformHead as
    // reciprocal alternates (same path across locales), replacing the old
    // site-wide links that incorrectly pointed every page at the locale roots.

    // RSS Feed autodiscovery
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'Bitcoin Stamps Updates', href: '/feed.xml' }],

    // Schema.org JSON-LD will be added dynamically by StructuredData components
  ]
})