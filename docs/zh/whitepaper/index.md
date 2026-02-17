---
title: "Bitcoin Stamps 协议：技术白皮书"
description: "Bitcoin Stamps 元协议完整技术规范 - 通过 UTXO 存储在比特币上的永久数字资产"
leoType: "whitepaper"
audience: "unified"
culturalSignificance: "high"
mentions: ["bitcoin-stamps", "src-20", "src-721", "src-101", "olga", "counterparty", "utxo", "p2wsh", "whitepaper"]
category: "technical-specification"
---

# Bitcoin Stamps 协议：技术白皮书

<div style="margin: 1.5rem 0 2.5rem; padding: 1.5rem 1.75rem; background: var(--vp-c-bg-soft); border-left: 4px solid var(--vp-c-brand-1); border-radius: 0 8px 8px 0;">

**核心创新** &mdash; 利用比特币的 UTXO 集合进行永久数据存储，使资产数据成为共识关键且不可修剪。所有完整节点必须存储邮票数据以验证交易，只要比特币存在就保证永久性。

</div>

## 摘要

Bitcoin Stamps 是一个通过直接 UTXO 存储在比特币上创建永久、不可变数字资产的元协议。与见证数据方法不同，Bitcoin Stamps 使用裸多签和 P2WSH 编码将资产数据嵌入交易输出，确保通用节点存储和共识关键永久性。

该协议从 Counterparty 基础（区块 779,652）演进到原生比特币编码（区块 793,068），再到通过 OLGA 的 P2WSH 优化（区块 865,000）。建立在账户型资产跟踪之上，Bitcoin Stamps 支持同质化代币（SRC-20）、非同质化资产（基础邮票）、去中心化命名（SRC-101）和可组合递归（SRC-721）。

| 属性 | 描述 |
|------|------|
| **基于 UTXO 的永久性** | 数据存储在可支出输出中，而非见证段 |
| **共识关键存储** | 所有节点的交易验证所必需 |
| **账户型资产** | Counterparty 风格余额跟踪，非 UTXO 绑定代币 |
| **多协议支持** | 用于代币、名称和递归的可扩展架构 |
| **成本优化编码** | OLGA P2WSH 将费用比裸多签降低 30-95% |

---

## 下载

<div style="margin: 1.5rem 0; padding: 1.75rem; background: var(--vp-c-bg-soft); border-radius: 8px; text-align: center;">
  <p style="font-size: 1.1rem; margin-bottom: 1rem; font-weight: 600;">Bitcoin Stamps 技术白皮书</p>
  <p style="margin-bottom: 1.25rem; color: var(--vp-c-text-2);">包含架构、代币标准、经济学和实现细节的完整规范</p>
  <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
    <a href="/bitcoin-stamps-whitepaper.pdf" download style="display: inline-block; padding: 10px 22px; background: var(--vp-c-brand-1); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">下载 PDF</a>
    <a href="/bitcoin-stamps-whitepaper.html" target="_blank" style="display: inline-block; padding: 10px 22px; background: var(--vp-c-neutral); color: var(--vp-c-neutral-inverse); text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">查看 HTML</a>
    <a href="/bitcoin-stamps-whitepaper-combined.md" download style="display: inline-block; padding: 10px 22px; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">Markdown 源码</a>
  </div>
</div>

---

## 目录

在 GitHub 上阅读各个章节（规范来源）：

| 章节 | 标题 | 主题 |
|:----:|------|------|
| 1 | [介绍](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/introduction.md) | 协议动机、Counterparty 起源、创世区块 779,652、OLGA 激活 |
| 2 | [协议架构](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/architecture.md) | UTXO 存储模型、裸多签与 P2WSH 编码、账户型跟踪 |
| 3 | [代币标准](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/token-standards.md) | SRC-20、SRC-721、SRC-721r、SRC-101 &mdash; DEPLOY、MINT、TRANSFER 操作 |
| 4 | [经济模型](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/economics.md) | 费用结构、UTXO 永久性经济学、多签与 P2WSH 成本分析 |
| 5 | [邮票改进提案](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/improvement-proposals.md) | SIP 治理、活跃提案（SIP-0001 至 SIP-0008）|
| 6 | [实现](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/implementation.md) | 索引器架构、共识机制、验证逻辑 |
| 7 | [安全分析](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/security.md) | 威胁模型、攻击向量、永久性保证 |
| 8 | [未来工作](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/future.md) | 研究方向、SIP 路线图摘要 |

---

## 协议时间线

| 区块 | 日期 | 里程碑 |
|-----:|------|--------|
| 779,652 | 2023年3月29日 | mikeinspace 创建第一个 Bitcoin Stamp |
| 788,041 | 2023年4月20日 | Arwyn 部署第一个 SRC-20 代币（KEVIN）|
| 793,068 | 2023年4月20日 | 第一个原生比特币编码（无 Counterparty）|
| 796,000 | 2023年8月15日 | Counterparty 截止 &mdash; SRC-20 共识规则 |
| 833,000 | &mdash; | 邮票上启用 P2WSH 交易 |
| 865,000 | 2023年10月15日 | OLGA 激活 &mdash; SRC-20 的 P2WSH 优化 |

---

## 引用

```
Bitcoin Stamps 社区（2026）。Bitcoin Stamps 协议：技术白皮书。
版本 1.0。检索自 https://bitcoinstamps.xyz/zh/whitepaper/
```

---

## 社区

| | |
|-|-|
| **GitHub** | [stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps) |
| **Telegram** | [t.me/BitcoinStamps](https://t.me/BitcoinStamps) |
| **社区** | [Bitcoin Stamps 社区](/zh/community/) |
| **协议** | [协议文档](/zh/protocols/) |
| **教程** | [开发者指南](/zh/tutorials/) |
