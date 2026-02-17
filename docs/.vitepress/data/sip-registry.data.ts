/**
 * VitePress data loader for SIP Registry
 * Loads Stamps Improvement Proposals data at build time
 */

import { defineLoader } from 'vitepress'
import { readFileSync } from 'fs'
import { join } from 'path'
import yaml from 'js-yaml'

interface SipEntry {
  number: string
  title: string
  status: string
  issue: number
  author: string
  created: string
  phase: number | null
  effort: string | null
  dependencies: string[]
  softDependencies?: string[]
  supersededBy?: string
}

interface RoadmapPhase {
  name: string
  phase: number
  weeks: string
  sips: string[]
  description: string
  futureSips?: boolean
}

interface GatingCriteria {
  from: number
  to: number
  condition: string
  rationale: string
}

interface FutureSip {
  number?: string
  title: string
  purpose: string
  prerequisite: string
}

export interface SipRegistryData {
  sips: SipEntry[]
  roadmap: RoadmapPhase[]
  gating: GatingCriteria[]
  future: FutureSip[]
  statusDefinitions: Record<string, string>
  repository: string
  metadata: {
    lastUpdated: string
    version: string
    maintainer: string
  }
}

declare const data: SipRegistryData
export { data }

export default defineLoader({
  async load(): Promise<SipRegistryData> {
    try {
      const yamlPath = join(__dirname, 'sip-registry.yaml')
      const yamlContent = readFileSync(yamlPath, 'utf8')
      const rawData = yaml.load(yamlContent) as any

      const data: SipRegistryData = {
        sips: rawData.sips || [],
        roadmap: rawData.roadmap || [],
        gating: rawData.gating || [],
        future: rawData.future || [],
        statusDefinitions: rawData.statusDefinitions || {},
        repository: rawData.repository || 'stampchain-io/btc_stamps',
        metadata: rawData.metadata || {
          lastUpdated: new Date().toISOString(),
          version: '1.0.0',
          maintainer: 'Reinamora'
        }
      }

      // Validate SIP entries have required fields
      for (const sip of data.sips) {
        if (!sip.number || !sip.title || !sip.status) {
          console.warn(`Warning: SIP-${sip.number || 'unknown'} missing required fields`)
        }
      }

      return data
    } catch (error) {
      console.error('Failed to load SIP registry data:', error)
      return {
        sips: [],
        roadmap: [],
        gating: [],
        future: [],
        statusDefinitions: {},
        repository: 'stampchain-io/btc_stamps',
        metadata: {
          lastUpdated: new Date().toISOString(),
          version: '1.0.0',
          maintainer: 'Reinamora'
        }
      }
    }
  }
})
