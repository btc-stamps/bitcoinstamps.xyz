/**
 * VitePress data loader for Blog posts
 * Uses createContentLoader to gather all blog post metadata sorted by date descending
 */

import { createContentLoader } from 'vitepress'

declare const data: {
  url: string
  frontmatter: {
    title: string
    date: string
    author?: string
    description?: string
    tags?: string[]
    leoType?: string
  }
}[]
export { data }

export default createContentLoader('en/blog/*.md', {
  includeSrc: false,
  transform(rawData) {
    return rawData
      .filter(page => {
        // Exclude the index page itself
        return !page.url.endsWith('/blog/')
      })
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter.date || '').getTime()
        const dateB = new Date(b.frontmatter.date || '').getTime()
        return dateB - dateA
      })
  }
})
