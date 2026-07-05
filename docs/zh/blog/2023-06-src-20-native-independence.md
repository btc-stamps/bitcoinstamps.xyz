---
title: "SRC-20 走向原生：脱离 Counterparty 的独立"
date: "2023-06-06"
author: "reinamora"
description: "2023年6月6日，在区块 793,068，SRC-20 首次直接编码在比特币上。区块 796,000 的 Counterparty 截止线，让原生编码成为共识规则。"
tags: ["history", "src-20", "counterparty", "milestone", "consensus"]
leoType: "blog"
---

# SRC-20 走向原生：脱离 Counterparty 的独立

2023年6月6日，在区块 793,068，<EntityMention entity="src-20">SRC-20</EntityMention> 首次直接编码在比特币上。这是一个主权里程碑：代币标准不再依赖另一个协议，而是开始把自己直接写在基础链之上。

## Counterparty 这个起点

早期的 <EntityMention entity="src-20">SRC-20</EntityMention> 交易搭载于 <EntityMention entity="counterparty">Counterparty</EntityMention>——一个自 2014 年起就存活在比特币上的元协议。在最初的日子里，Counterparty 为这个标准提供了一条可用的编码路径，让社区得以快速推进。

但依赖另一个协议，就意味着继承它的假设和约束。对于一个围绕永久性和自足性构建的标准来说，这种依赖是一个没有收好的线头。

## 区块 793,068 上的原生编码

区块 793,068 正是 <EntityMention entity="src-20">SRC-20</EntityMention> 拥有自己原生比特币编码的地方。从那时起，一次部署、铸造或转移都可以直接写在比特币上，完全无需经由 Counterparty。代币数据落入的正是那套基于 UTXO 的存储——它赋予了每一枚 stamp 以永久性。

## 区块 796,000 的截止线

仅有原生编码还不是故事的全部。协议还划下了一条硬线。在区块 796,000，也就是 2023年6月26日，基于 <EntityMention entity="counterparty">Counterparty</EntityMention> 的 <EntityMention entity="src-20">SRC-20</EntityMention> 变为无效。在那个高度之后，共识规则十分清晰：SRC-20 就是原生比特币编码，别无其他。

正是这条截止线，把一项新能力变成了真正的标准。哪些交易算数，不再存在任何含糊。索引器、钱包，以及任何对链进行验证的人，都遵循同一条规则，并锚定在一个具体的区块上。

## 主权在这里为何重要

脱离 <EntityMention entity="counterparty">Counterparty</EntityMention> 的独立，意味着 <EntityMention entity="src-20">SRC-20</EntityMention> 独立地站立在比特币之上。没有需要信任的第二个协议，没有需要追踪的外部规则集。始于第一枚 stamp 的永久性保证，如今端到端地覆盖了同质化代币，完全由比特币共识来决定。

---

*在 [Bitcoin Stamps 白皮书](/en/whitepaper/) 中阅读编码规范，并在 [stampchain.io](https://stampchain.io) 探索这个生态系统。*
