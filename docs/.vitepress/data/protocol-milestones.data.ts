/**
 * VitePress data loader for Protocol Milestones
 * Loads centralized protocol milestone data at build time
 */

import { defineLoader } from 'vitepress'
import { readFileSync } from 'fs'
import { join } from 'path'
import { load } from 'js-yaml'
import type { ProtocolMilestonesData } from '../types/technical-data'

declare const data: ProtocolMilestonesData
export { data }

export default defineLoader({
  async load(): Promise<ProtocolMilestonesData> {
    try {
      // Load the YAML file
      const yamlPath = join(__dirname, 'protocol-milestones.yaml')
      const yamlContent = readFileSync(yamlPath, 'utf8')
      const rawData = load(yamlContent) as any

      // Validate and transform data
      const data: ProtocolMilestonesData = {
        milestones: rawData.milestones || {},
        timeline: rawData.timeline || {},
        blockMetadata: rawData.blockMetadata || {},
        culturalRanking: rawData.culturalRanking || {},
        apiMetadata: rawData.apiMetadata || {},
        lastUpdated: new Date().toISOString(),
        dataVersion: rawData.apiMetadata?.dataVersion || '1.0.0',
        validationStatus: 'verified'
      }

      // Type validation - ensure all milestones have required fields
      for (const [key, milestone] of Object.entries(data.milestones)) {
        if (!milestone.blockHeight || !milestone.blockDate || !milestone.title) {
          console.warn(`⚠️ Milestone '${key}' missing required fields`)
          data.validationStatus = 'error'
        }
      }

      // Sort milestones by block height for easier access
      const sortedMilestones = Object.entries(data.milestones)
        .sort(([, a], [, b]) => a.blockHeight - b.blockHeight)
        .reduce((acc, [key, value]) => {
          acc[key] = value
          return acc
        }, {} as typeof data.milestones)

      data.milestones = sortedMilestones

      console.log(`✅ Loaded ${Object.keys(data.milestones).length} protocol milestones`)
      return data

    } catch (error) {
      console.error('❌ Failed to load protocol milestones:', error)
      throw new Error(`Protocol milestones data loading failed: ${error.message}`)
    }
  }
})

// Export individual milestone accessors for easy component use
export const getMilestone = (key: string) => {
  return data?.milestones?.[key] || null
}

export const getMilestoneByBlock = (blockHeight: number) => {
  if (!data?.milestones) return null
  
  return Object.entries(data.milestones)
    .find(([, milestone]) => milestone.blockHeight === blockHeight)?.[1] || null
}

export const getTimelineEra = (blockHeight: number) => {
  if (!data?.timeline) return null
  
  return Object.entries(data.timeline)
    .find(([, era]) => 
      blockHeight >= era.startBlock && 
      (era.endBlock === null || blockHeight <= era.endBlock)
    )?.[1] || null
}

export const getAllMilestones = () => {
  return data?.milestones || {}
}

export const getMilestonesBySignificance = (significance: string) => {
  if (!data?.milestones) return {}
  
  return Object.entries(data.milestones)
    .filter(([, milestone]) => milestone.significance === significance)
    .reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {} as typeof data.milestones)
}

export const getCulturalMilestones = (level: 'highest' | 'high' | 'medium' | 'low') => {
  const culturalKeys = data?.culturalRanking?.[level] || []
  return culturalKeys.reduce((acc, key) => {
    if (data.milestones[key]) {
      acc[key] = data.milestones[key]
    }
    return acc
  }, {} as typeof data.milestones)
}

// Helper function to get block metadata
export const getBlockMetadata = (blockHeight: number) => {
  return data?.blockMetadata?.[blockHeight] || null
}

// Validation helpers
export const validateMilestoneData = () => {
  if (!data) return false
  
  const requiredFields = ['milestones', 'timeline', 'blockMetadata']
  return requiredFields.every(field => field in data)
}

export const getDataStats = () => {
  if (!data) return null
  
  return {
    totalMilestones: Object.keys(data.milestones).length,
    timelineEras: Object.keys(data.timeline).length,
    trackedBlocks: Object.keys(data.blockMetadata).length,
    validationStatus: data.validationStatus,
    lastUpdated: data.lastUpdated
  }
}