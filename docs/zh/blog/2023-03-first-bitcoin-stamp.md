---
title: "第一枚 Bitcoin Stamp"
date: "2023-03-07"
author: "reinamora"
description: "2023年3月7日，在区块 779,652，mikeinspace 创建了 Stamp 0，并由此开启了 Bitcoin Stamps 协议：永久艺术品被直接存储在比特币的 UTXO 集之中。"
tags: ["history", "bitcoin-stamps", "milestone", "genesis"]
leoType: "blog"
---

# 第一枚 Bitcoin Stamp

2023年3月7日，在区块 779,652，<EntityMention entity="mikeinspace">mikeinspace</EntityMention> 创建了 Stamp 0。它是一小幅激光眼像素艺术，也是 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 协议的创世之作。

Stamp 0 不只是链上的一张图片。它是对“数字艺术应该存放在哪里”这一不同理念的证明。

## 为什么 UTXO 集很重要

大多数链上艺术的做法，会把数据存储在全节点日后可以丢弃的地方。witness data 可以被裁剪掉。链下引用会在主机消失时朽坏。<EntityMention entity="mikeinspace">mikeinspace</EntityMention> 想要更牢固的东西：一种每个全节点都必须永久保留的艺术，因为它本身就是比特币可花费状态的一部分。

Bitcoin Stamps 把图像数据放进了 UTXO 集本身。那是每个节点为了知道有哪些币存在而追踪的未花费交易输出的集合。存储在那里的数据无法在不破坏节点对链的认知的前提下被裁剪掉。因此一枚 stamp 与比特币自身的账目一样永久。

区块 779,652 正是这一保证开始的地方。Stamp 0 自那以来一直被每一个全节点承载，并且只要比特币还在运行，它就会持续被承载下去。

## 从一个区块起步的运动

区块 779,652 所做出的选择，为此后的一切定下了基调。永久性优先。没有需要信任的主机，没有需要担心的裁剪，没有可能悄然消失的外部依赖。

这一个决定，为 <EntityMention entity="src-20">SRC-20</EntityMention> 代币、<EntityMention entity="src-101">SRC-101</EntityMention> 名称，以及一整个希望作品能比任何单一平台都长久的艺术家与建设者社区打开了大门。<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>——第一个 SRC-20 代币——在 2023 年晚些时候才出现，但它正是站在这里奠定的根基之上。

如果你想理解 Bitcoin Stamps 为何如此运作，就从区块 779,652 开始。协议中的一切都可以追溯到 <EntityMention entity="mikeinspace">mikeinspace</EntityMention> 决定让“永久”真正意味着永久的那一刻。

---

*在 [Bitcoin Stamps 白皮书](/en/whitepaper/) 中阅读完整的技术规范，并在 [stampchain.io](https://stampchain.io) 探索这个生态系统。*
