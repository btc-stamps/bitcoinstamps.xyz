/**
 * VitePress data loader for Authors
 * Loads author data from authors.yaml at build time
 */

import { defineLoader } from 'vitepress'
import { readFileSync } from 'fs'
import { join } from 'path'
// js-yaml is a CommonJS module — must use default import then destructure
import yamlPkg from 'js-yaml'
const { load } = yamlPkg as { load: (input: string) => unknown }

export interface AuthorSocial {
  twitter?: string
  github?: string
}

export interface Author {
  id: string
  name: string
  role: string
  bio: string
  expertise?: string[]
  social?: AuthorSocial
  cultural?: {
    significance?: string
    role?: string
    narrative?: string
  }
}

export interface AuthorsData {
  authors: Author[]
}

declare const data: AuthorsData
export { data }

export default defineLoader({
  async load(): Promise<AuthorsData> {
    const yamlPath = join(__dirname, 'authors.yaml')
    const yamlContent = readFileSync(yamlPath, 'utf8')
    const rawData = load(yamlContent) as { authors: Author[] }
    return {
      authors: rawData.authors || []
    }
  }
})
