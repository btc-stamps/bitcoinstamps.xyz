---
title: "OLGA：借助 P2WSH 实现更便宜、更大的 stamps"
date: "2024-03-03"
author: "reinamora"
description: "OLGA 将 stamp 编码迁移到 P2WSH，在区块 833,000 为 classic stamps 激活，在区块 865,000 为 SRC-20 激活。它把交易体积削减约一半，把手续费降低 60-70%。"
tags: ["history", "olga", "milestone", "p2wsh", "fees"]
leoType: "blog"
---

# OLGA：借助 P2WSH 实现更便宜、更大的 stamps

<EntityMention entity="olga">OLGA</EntityMention> 是那次让 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 同时变得更便宜又更大的编码升级。它把 stamp 数据迁移到 P2WSH 输出中，去掉了此前每一枚 stamp 都在支付的一大块开销。

## 两个激活高度

OLGA 分两个阶段推出，每个阶段都锚定在一个区块上。Classic stamp 的 P2WSH 编码在 2024年3月3日、区块 833,000 激活。第一枚 <EntityMention entity="src-20">SRC-20</EntityMention> P2WSH OLGA stamp 则更晚一些，出现在 2024年10月10日、区块 865,000。两个高度都是共识检查点，因此索引器确切地知道每条路径何时开启。

## P2WSH 改变了什么

较早的编码依赖裸多签（bare multisig）输出，并用 Base64 把数据包起来。Base64 让二进制数据能安全地被携带，但它额外增加了大约三分之一的字节，而这些字节只用于编码、别无他用。在一条按字节付费的链上，这种开销是实实在在的成本。

OLGA 去掉了 Base64 这一层，改用 Pay-to-Witness-Script-Hash（P2WSH）输出。结果是：

- 交易体积缩小约 50%。
- 手续费下降大约 60% 到 70%。
- 单笔 stamp 交易可以携带最多约 64 kB 的数据。

更小、更便宜意味着更多人能够 stamp，而更大的单笔容量意味着更丰富的艺术能被放到链上。

## 永久性不变，成本更低

重要的一点是：这一切都没有削弱永久性保证。OLGA stamps 依然存活在 UTXO 集中，依然无法被裁剪，依然继承比特币自身的持久性。OLGA 改变的是数据如何被打包，而不是它存放在哪里。

这正是 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 一再重复的模式：把改进置于激活高度之后落地，对照链去验证它们，绝不为了便利而牺牲永久性。OLGA 让协议对更多人变得可及，同时又没有放弃那个让 stamp 成其为 stamp 的东西。

---

*在 [Bitcoin Stamps 白皮书](/en/whitepaper/) 中阅读经济模型，并在 [stampchain.io](https://stampchain.io) 探索这个生态系统。*
