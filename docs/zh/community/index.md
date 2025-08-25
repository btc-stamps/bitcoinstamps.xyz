---
title: 社区首页
description: Bitcoin Stamps 社区资源和贡献
lang: zh-CN
---

<script setup>
import { useRouter } from 'vitepress'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  // Redirect to English community until Chinese translations are available
  router.go('/en/community/')
})
</script>

# 社区首页

正在重定向到 [英文社区页面](/en/community/)...

## 社区资源

- [开发者（英文版）](/en/community/developers)
- [贡献（英文版）](/en/community/contributing)
- [资源（英文版）](/en/community/resources)
- [展示（英文版）](/en/community/showcase)