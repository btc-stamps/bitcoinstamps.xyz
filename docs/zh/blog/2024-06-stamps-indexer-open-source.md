---
title: "Stamps 索引器开源"
date: "2024-06-24"
author: "reinamora"
description: "2024年6月24日，核心开发者将完整的 Bitcoin Stamps 索引器开源，涵盖对 Classic Stamps、OLGA、SRC-20、SRC-721 和 SRC-101 的支持。"
tags: ["history", "indexer", "open-source", "milestone"]
leoType: "blog"
---

# Stamps 索引器开源

2024年6月24日，核心开发者将完整的 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 索引器开源。那套读取链并重建 stamp 状态的完整代码变为公开，而这件事比听起来要重大得多。

## 为什么索引器很重要

Bitcoin Stamps 的数据存活在 UTXO 集里，但比特币节点并不知道 stamp 是什么。它们看到的是交易输出，而不是艺术或代币余额。总得有某个东西去读取原始链、找出 stamp 交易、解码它们，并构建出“存在什么、由谁持有”的账本。那个东西就是索引器。

如果索引器是封闭的，社区就不得不相信某一方对协议真实状态的说法。将它开源，去除了这种信任要求。任何人都可以运行同样的代码，从创世块开始索引，并自行核对答案。

## 这次发布涵盖了什么

这个开源索引器处理整个标准家族：

- **Classic Stamps**，最初的裸多签（bare multisig）艺术。
- **<EntityMention entity="olga">OLGA</EntityMention>**，那套削减了体积与手续费的 P2WSH 编码。
- **<EntityMention entity="src-20">SRC-20</EntityMention>** 同质化代币，包括其原生编码规则。
- **SRC-721** 可组合 NFT。
- **<EntityMention entity="src-101">SRC-101</EntityMention>** 去中心化命名。

那是把每一条与共识相关的路径都收进一个代码库，因此一次运行就能对照链验证整个协议。

## 任何人都可验证

开源把断言变成了你可以检验的东西。当一次发布声称自己经过共识验证时，你不必凭信心接受。你拉取代码，从区块 779,652 重新解析，并比对哈希。正是这份纪律，成了后续各次发布所依托的基础，一直延续到这个项目至今仍在使用的从创世块重新解析的关卡。

将索引器开源，把 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 放到了一个永久性优先的协议本应所在的位置：完全可检视，可独立运行，并且归它的社区所有，而非任何单一团队。

---

*索引器位于 [stampchain-io/btc_stamps on GitHub](https://github.com/stampchain-io/btc_stamps)。在 [stampchain.io](https://stampchain.io) 探索这个生态系统。*
