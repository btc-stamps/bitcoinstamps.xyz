---
title: "Bitname 与 SRC-101：比特币的名称服务"
date: "2024-06-10"
author: "reinamora"
description: "2024年6月10日，Bitname 与 Stampchain 团队推出了 SRC-101，一套面向 .btc 名称、以 UTXO 锚定的比特币名称服务。SRC-101 名称在区块 870,652 迎来了它们的链上创世。"
tags: ["history", "src-101", "bitname", "naming", "milestone"]
leoType: "blog"
---

# Bitname 与 SRC-101：比特币的名称服务

2024年6月10日，Bitname 与 Stampchain 团队合作，推出了 <EntityMention entity="src-101">SRC-101</EntityMention>：一套构建在 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 标准之上的比特币名称服务。它为协议带来了人类可读的 .btc 名称，并把它们锚定在每一枚 stamp 所存活的地方——UTXO 集。

## 裸地址的问题

比特币地址是一串串没人能记住、也没人能安全地念出来的长字符。命名系统通过把一个友好的名称映射到一个地址来解决这个问题。难点在于，如何在不依赖一个可能撒谎、审查或消失的可信服务器的前提下做到这一点。

<EntityMention entity="src-101">SRC-101</EntityMention> 以 Bitcoin Stamps 的方式解决了它。一个 .btc 名称在链上注册，由 UTXO 锚定，并由让 stamp 永久的同一套规则来验证。没有需要信任的中心化注册表。链本身就是注册表。

## 为每一种地址类型而设计

SRC-101 从设计上就是为了给所有比特币地址类型命名，而不仅仅是某一种格式。这一点很重要，因为比特币有好几种地址类型正在被活跃使用，而一个只覆盖其中一种的名称服务，会把生态系统的大片区域排除在外。SRC-101 覆盖了这一整个范围，因此一个名称可以指向人们实际使用的地址。

## 区块 870,652 上的链上创世

这个标准在 2024 年 6 月宣布，而 SRC-101 名称的链上创世发生在 2024年11月17日、区块 870,652。那正是命名数据开始在新标准下落入比特币的高度，并具备与协议其余部分相同的永久性保证。

## 第四根支柱

<EntityMention entity="src-101">SRC-101</EntityMention> 与 <EntityMention entity="src-20">SRC-20</EntityMention> 代币、SRC-721 艺术一道，成为 Bitcoin Stamps 家族的核心组成部分。每一个标准都回应着不同的需求。SRC-101 回应的是身份：一个永久的、自我拥有的名称，它存活在比特币上，指向你所指定的任何地方，中间没有主机。

---

*在 [Bitcoin Stamps 白皮书](/en/whitepaper/) 中阅读命名规范，并在 [stampchain.io](https://stampchain.io) 探索这个生态系统。*
