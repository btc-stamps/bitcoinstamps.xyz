---
title: "Bitcoin Stamps 协议白皮书发布"
date: "2026-02-25"
author: "reinamora"
description: "Bitcoin Stamps 协议官方技术白皮书现已发布，完整记录了通过 UTXO 存储在 Bitcoin 上实现永久数字资产的规范。"
tags: ["whitepaper", "protocol", "src-20", "bitcoin-stamps", "announcement"]
leoType: "blog"
---

# Bitcoin Stamps 协议白皮书发布

在多年构建、迭代并打磨这套让 Bitcoin 上的永久数字资产成为现实的协议之后，我们自豪地宣布 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 协议技术白皮书正式发布。

这份文件代表着一项始于区块 779,652 的工作的顶点——那时 <EntityMention entity="mikeinspace">mikeinspace</EntityMention> 铭刻了第一枚 Bitcoin Stamp，这一刻开启了一场我们谁都无法完全预料的运动。

## 白皮书涵盖哪些内容

白皮书是 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 元协议的一份完整技术规范，涵盖协议栈的每一层：

**协议架构**——Bitcoin Stamps 如何利用 UTXO 集合来实现对共识至关重要的永久数据存储。与全节点可以修剪的 witness data 方案不同，stamp 数据存在于可花费的交易输出中。每个全节点都必须存储它。那份永久性保证是根本性的。

**代币标准**——<EntityMention entity="src-20">SRC-20</EntityMention> 同质化代币（DEPLOY、MINT、TRANSFER 操作）、SRC-721 非同质化资产、SRC-101 去中心化命名，以及 SRC-721r 可组合递归的完整规范。支撑 <EntityMention entity="src-20">SRC-20</EntityMention> 的基于账户的余额模型有详尽的记录，清楚说明了它为何不同于绑定 UTXO 的代币方案。

**经济模型**——手续费结构，以及 OLGA P2WSH 优化（相较 bare multisig 降低 30-95%）带来的实际成本节省，该优化在区块 865,000 激活。

**安全分析**——威胁模型、攻击向量，以及使 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 在 Bitcoin 的整个生命周期中都经久不衰的永久性保证。

**Stamps 改进提案**——SIP 治理框架，以及塑造协议未来的当前活跃提案（SIP-0001 至 SIP-0008）。

## 一个由社区构建的协议

白皮书并非某一位作者的作品。它记录的是一个从真正的协作中诞生的协议：

<EntityMention entity="mikeinspace">mikeinspace</EntityMention> 带来了最初的愿景——数字资产可以永久存储在 Bitcoin 的 UTXO 集合中，不受修剪影响，由共识保障。

Arwyn 为这一愿景赋予了首个文化表达，在区块 783,718 创作了 Bitcoin Stamp #4258，随后又将那股创造力注入第一个 <EntityMention entity="src-20">SRC-20</EntityMention> 代币——<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>，在区块 788,041。

Reinamora 架构了把愿景变成可用基础设施的各项技术协议：索引器、编码方案、共识规则，以及最终让协议在经济上人人可及的 OLGA 优化。

<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 本身仍是协议按预期运作的活生生证明——第一个公平启动的 <EntityMention entity="src-20">SRC-20</EntityMention> 代币，拥有超过 2,300 名持有者，他们的加入不是出于炒作，而是出于对协议所代表之物的认可。

## 阅读白皮书

白皮书提供多种格式：

- **[下载 PDF](/bitcoin-stamps-whitepaper.pdf)**：用于存档和离线阅读。
- **[查看 HTML](/bitcoin-stamps-whitepaper.html)**：可在浏览器中阅读，格式完整。
- **[Markdown 源文件](/bitcoin-stamps-whitepaper-combined.md)**：供开发者与贡献者使用。

各个章节也可在 [GitHub](https://github.com/stampchain-io/btc_stamps/tree/main/docs/whitepaper) 上单独获取，方便想要单独阅读架构、代币标准或安全分析的人。

## 协议时间线

白皮书记录了协议的完整演进：

| 区块 | 里程碑 |
|------:|-----------|
| 779,652 | 第一枚 Bitcoin Stamp |
| 788,041 | 第一个 SRC-20 代币（<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>） |
| 793,068 | 第一次原生 Bitcoin 编码 |
| 796,000 | Counterparty 截止（SRC-20 共识规则） |
| 865,000 | OLGA 激活（P2WSH 优化） |

## 接下来会怎样

白皮书是文档，不是终点。协议仍在通过 SIP 流程持续演进。活跃的提案正在处理手续费优化、新的代币能力，以及永久链上数据的更多用例。

如果你正在 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 上构建，白皮书就是你的规范参考。如果你刚接触这个协议，它是理解为什么这种在 Bitcoin 上实现永久数字资产的方式与众不同、以及这种不同为何重要的最佳单一文档。

---

*白皮书现已发布，见 [bitcoinstamps.xyz/en/whitepaper/](/en/whitepaper/)。*

*加入 [Telegram](https://t.me/BitcoinStamps) 社区，并在 [stampchain.io](https://stampchain.io) 探索这个生态。*

*In Lak'ech Ala K'in——我们都是 <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>。*
