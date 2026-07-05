---
title: "更新"
description: "来自 Bitcoin Stamps 社区的更新、公告和技术深度解析"
leoType: "blog"
layout: "page"
---

# 更新

来自 Bitcoin Stamps 社区的更新、公告和技术深度解析：这些协议构建者、艺术家和贡献者正在塑造比特币上的永久数字资产。

<script setup>
import { data as posts } from '/.vitepress/data/blog.zh.data.ts'
</script>

<div class="blog-listing">
  <article v-for="post in posts" :key="post.url" class="blog-post-item">
    <div class="blog-post-meta">
      <time :datetime="post.frontmatter.date">{{ new Date(post.frontmatter.date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }) }}</time>
      <span v-if="post.frontmatter.author" class="blog-post-author"> &mdash; {{ post.frontmatter.author }}</span>
    </div>
    <h2 class="blog-post-title">
      <a :href="post.url">{{ post.frontmatter.title }}</a>
    </h2>
    <p v-if="post.frontmatter.description" class="blog-post-excerpt">{{ post.frontmatter.description }}</p>
    <div v-if="post.frontmatter.tags" class="blog-post-tags">
      <span v-for="tag in post.frontmatter.tags" :key="tag" class="blog-tag">{{ tag }}</span>
    </div>
    <a :href="post.url" class="blog-read-more">阅读更多 &rarr;</a>
  </article>
  <div v-if="!posts || posts.length === 0" class="blog-empty">
    暂无文章，敬请期待。
  </div>
</div>

<style scoped>
.blog-listing {
  margin-top: 2rem;
}

.blog-post-item {
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.blog-post-item:last-child {
  border-bottom: none;
}

.blog-post-meta {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.blog-post-author {
  color: var(--vp-c-text-2);
}

.blog-post-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0.25rem 0 0.75rem;
  border-top: none;
  padding-top: 0;
}

.blog-post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.blog-post-title a:hover {
  color: var(--vp-c-brand-1);
}

.blog-post-excerpt {
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.blog-post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.blog-tag {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
}

.blog-read-more {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.blog-read-more:hover {
  text-decoration: underline;
}

.blog-empty {
  color: var(--vp-c-text-2);
  font-style: italic;
  padding: 2rem 0;
}
</style>
