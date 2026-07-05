---
title: "SRC-721：可组合的链上艺术"
date: "2023-06-01"
author: "reinamora"
description: "2023年6月1日，在区块 792,370，第一个 SRC-721 实现为 Bitcoin Stamps 带来了分层、可组合的 NFT，通过引用链上已有艺术来削减铸造成本。"
tags: ["history", "src-721", "milestone", "nft"]
leoType: "blog"
---

# SRC-721：可组合的链上艺术

2023年6月1日，在区块 792,370，第一个 <EntityMention entity="src-721">SRC-721</EntityMention> 实现在 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 上线。它为协议带来了可组合、分层的非同质化资产，并解决了一个实实在在的成本问题。

## 它解决的成本问题

把一整幅图像存进比特币的 UTXO 集是永久的，但并非免费。一个大型集合，如果每一个 NFT 都携带自己完整的艺术品，成本会迅速攀升。对于单件作品，这没问题；但对于成千上万件的集合，这就很痛苦了。

SRC-721 走了一条不同的路。它不再一遍遍地重复 stamp 相同的资产，而是让 SRC-721 代币引用已经在链上的艺术，并从这些图层组合出最终的作品。一个特征只在链上存一次，随后许多代币都指向它。铸造成本因此下降，因为你不必反复为存储相同的像素付费。

## 把可组合性当作头等理念

关键词是可组合。一个代币不是一张扁平的图片，而是一份配方：这个背景、那个身体、这双眼睛，由永久存活在 UTXO 集中的图层组装而成。配方小而便宜。图层被共享复用。

这一设计让更大、更丰富的集合在 Bitcoin Stamps 上变得切实可行，同时又不放弃自区块 779,652 起就确立的永久性保证。

## 它带来了什么

SRC-721 并没有止步于分层引用。它后来演进为 SRC-721r，加入了递归：代币能以更深入、更灵活的方式构建在其他链上数据之上。这项递归工作，正是从区块 792,370 奠定的可组合基础上直接生长出来的。

SRC-721 与 <EntityMention entity="src-20">SRC-20</EntityMention> 同质化代币、<EntityMention entity="src-101">SRC-101</EntityMention> 名称并列，共同构成更广泛的 Bitcoin Stamps 标准家族。每一个都回应着不同的需求，而它们全都继承同一条准则：数据之所以永久，是因为它存活在比特币无法裁剪的地方。

---

*在 [Bitcoin Stamps 白皮书](/en/whitepaper/) 中阅读各项代币标准，并在 [stampchain.io](https://stampchain.io) 探索这个生态系统。*
