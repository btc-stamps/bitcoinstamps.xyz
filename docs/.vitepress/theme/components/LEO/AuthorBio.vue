<template>
  <div class="author-bio" v-if="authorData">
    <div class="author-bio__header">
      <span class="author-bio__name">{{ authorData.name }}</span>
      <span class="author-bio__role">{{ authorData.role }}</span>
    </div>
    <p class="author-bio__bio">{{ authorData.bio }}</p>
    <div class="author-bio__links" v-if="authorData.social?.twitter || authorData.social?.github">
      <a
        v-if="authorData.social?.twitter"
        :href="`https://twitter.com/${authorData.social.twitter}`"
        target="_blank"
        rel="noopener noreferrer"
        class="author-bio__link"
        :aria-label="`${authorData.name} on Twitter`"
      >Twitter</a>
      <a
        v-if="authorData.social?.github"
        :href="`https://github.com/${authorData.social.github}`"
        target="_blank"
        rel="noopener noreferrer"
        class="author-bio__link"
        :aria-label="`${authorData.name} on GitHub`"
      >GitHub</a>
    </div>
  </div>
  <div class="author-bio author-bio--not-found" v-else>
    <span class="author-bio__name">{{ author }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as authorsData } from '../../../data/authors.data'
import type { Author } from '../../../data/authors.data'

interface Props {
  author: string
}

const props = defineProps<Props>()

const authorData = computed<Author | undefined>(() => {
  return authorsData.authors.find((a) => a.id === props.author.toLowerCase())
})
</script>

<style scoped>
.author-bio {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.5rem;
  background: var(--vp-c-bg-soft);
  max-width: 480px;
  margin: 1rem 0;
}

.author-bio__header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.author-bio__name {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.author-bio__role {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
}

.author-bio__bio {
  margin: 0.25rem 0 0;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.author-bio__links {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.author-bio__link {
  font-size: 0.85em;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.author-bio__link:hover {
  text-decoration: underline;
}

.author-bio--not-found .author-bio__name {
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
