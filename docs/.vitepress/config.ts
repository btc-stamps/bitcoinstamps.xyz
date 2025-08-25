import { defineConfig } from 'vitepress'
import { generateStaticAPIFiles, validateAPIConsistency } from './api/endpoints.ts'
import path from 'path'

export default defineConfig({
  title: 'BITCOIN STAMPS',
  description: 'Official documentation for Bitcoin Stamps metaprotocols and art platform',
  
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
          { text: 'Tutorials', link: '/en/tutorials/' },
          { text: 'Stories', link: '/en/narratives/' },
          { text: 'Community', link: '/en/community/' }
        ],
        footer: {
          message: 'Community-owned open source project preserving digital culture on Bitcoin',
          copyright: '© 2023-2025 Bitcoin Stamps Community. Documentation licensed under MIT.'
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
          { text: 'Tutoriels', link: '/fr/tutorials/' },
          { text: 'Histoires', link: '/fr/narratives/' },
          { text: 'Communauté', link: '/fr/community/' }
        ],
        footer: {
          message: 'Projet open source communautaire préservant la culture numérique sur Bitcoin',
          copyright: '© 2023-2025 Communauté Bitcoin Stamps. Documentation sous licence MIT.'
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
          { text: 'Tutoriales', link: '/es/tutorials/' },
          { text: 'Historias', link: '/es/narratives/' },
          { text: 'Comunidad', link: '/es/community/' }
        ],
        footer: {
          message: 'Proyecto comunitario de código abierto que preserva la cultura digital en Bitcoin',
          copyright: '© 2023-2025 Comunidad Bitcoin Stamps. Documentación bajo licencia MIT.'
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
          { text: '教程', link: '/zh/tutorials/' },
          { text: '故事', link: '/zh/narratives/' },
          { text: '社区', link: '/zh/community/' }
        ],
        footer: {
          message: '社区拥有的开源项目，在比特币上保存数字文化',
          copyright: '© 2023-2025 比特币邮票社区。文档采用 MIT 许可证。'
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
          { text: 'Eğitimler', link: '/tr/tutorials/' },
          { text: 'Hikayeler', link: '/tr/narratives/' },
          { text: 'Topluluk', link: '/tr/community/' }
        ],
        footer: {
          message: 'Bitcoin üzerinde dijital kültürü koruyan topluluk sahipli açık kaynak projesi',
          copyright: '© 2023-2025 Bitcoin Stamps Topluluğu. Dokümantasyon MIT lisansı altında.'
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
            { text: 'OLGA P2WSH Encoding', link: '/en/protocols/olga' }
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
            { text: 'Encodage OLGA', link: '/fr/protocols/olga' }
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
            { text: 'Codificación OLGA', link: '/es/protocols/olga' }
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
            { text: 'OLGA P2WSH（英文版）', link: '/en/protocols/olga' }
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
            { text: 'OLGA Sıkıştırma (İngilizce)', link: '/en/protocols/olga' }
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

    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/btc-stamps' }
    ]
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
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Bitcoin Stamps Documentation' }],
    ['meta', { property: 'og:title', content: 'Bitcoin Stamps - Permanent Digital Assets on Bitcoin' }],
    ['meta', { property: 'og:description', content: 'Official documentation for Bitcoin Stamps metaprotocols including SRC-20 tokens pioneered by KEVIN, SRC-101 names, SRC-721 NFTs, and OLGA P2WSH encoding' }],
    ['meta', { property: 'og:url', content: 'https://bitcoinstamps.xyz/' }],
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
    ['meta', { name: 'twitter:title', content: 'Bitcoin Stamps - Permanent Digital Assets on Bitcoin' }],
    ['meta', { name: 'twitter:description', content: 'Official documentation for Bitcoin Stamps metaprotocols including SRC-20 tokens pioneered by KEVIN, SRC-101 names, SRC-721 NFTs, and OLGA P2WSH encoding' }],
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
    ['link', { rel: 'alternate', hreflang: 'en', href: 'https://bitcoinstamps.xyz/en/' }],
    ['link', { rel: 'alternate', hreflang: 'fr', href: 'https://bitcoinstamps.xyz/fr/' }],
    ['link', { rel: 'alternate', hreflang: 'es', href: 'https://bitcoinstamps.xyz/es/' }],
    ['link', { rel: 'alternate', hreflang: 'zh-CN', href: 'https://bitcoinstamps.xyz/zh/' }],
    ['link', { rel: 'alternate', hreflang: 'tr', href: 'https://bitcoinstamps.xyz/tr/' }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: 'https://bitcoinstamps.xyz/en/' }],
    
    // Schema.org JSON-LD will be added dynamically by StructuredData components
  ]
})