---
title: "邮票改进提案（SIP）"
description: "Bitcoin Stamps 协议改进的官方注册表和实现路线图，包括条件转账、桥接、隐私功能和原生 AMM"
leoType: "protocol-overview"
audience: "both"
mentions: ["src-20", "kevin", "reinamora", "olga"]
culturalSignificance: "high"
protocols: ["src-20"]
---

# 邮票改进提案（SIP）

邮票改进提案流程为提议、审查和激活 Bitcoin Stamps 生态系统协议级别变更提供了结构化框架。每个 SIP 协调跨索引器的实现，以在整个生态系统中保持一致的行为。

## 什么是 SIP？

SIP（邮票改进提案）是影响**协议共识**的变更所必需的——这意味着所有索引器必须以相同方式实现变更，才能在整个生态系统中保持一致的行为。

SIP 需要用于：
- 新的 SRC-20 操作（条件转账、桥接、退款）
- 现有操作上的新字段（哈希锁、时间锁）
- 新的编码方法（二进制格式、P2WSH 结构）
- 跨链桥接协议

SIP **不**需要用于不更改共识行为的仅索引器优化、API 功能或错误修复。

**流程文档**：[SIP-0000](https://github.com/stampchain-io/btc_stamps/issues/686) 定义了完整的提案生命周期和审查流程。

<SipRegistry />

## 参与其中

SIP 流程对所有社区成员开放：

1. **讨论** — 加入活跃 SIP 的 GitHub 问题对话
2. **提议** — 遵循 [SIP-0000 格式](https://github.com/stampchain-io/btc_stamps/issues/686)创建新的协议提案
3. **审查** — 对规范提供技术反馈
4. **实现** — 为接受的提案构建索引器支持

**GitHub 仓库**：[stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps)

---

*SIP 流程有意保持轻量——足够的结构来协调索引器，而不会减慢创新速度。*
