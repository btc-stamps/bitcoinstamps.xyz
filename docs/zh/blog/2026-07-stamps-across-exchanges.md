---
title: "Bitcoin Stamps 在各交易所的落脚点"
date: "2026-07-05"
author: "reinamora"
description: "Bitcoin Stamps 与 SRC-20 代币遍及整个市场的各个层面：原生市场、OKX 钱包支持、区块浏览器解码、聚合器追踪，以及 KEVIN 与 STAMP 在 BitMart 的现货交易。"
tags: ["exchanges", "src-20", "kevin", "adoption"]
leoType: "blog"
---

# Bitcoin Stamps 在各交易所的落脚点

<EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 把艺术和代币直接写入 Bitcoin 的 UTXO 集合，永久且不可裁剪，而更广阔的市场也在不断接入它们。<EntityMention entity="src-20">SRC-20</EntityMention> 代币既在其原生市场交易，也在一家中心化交易所交易；它们能存放在一款主流 Web3 钱包中，能在一款主流区块浏览器里原生渲染，也出现在交易者早已查看的聚合器上。每一层各司其职，而每一层都是真实存在的。

## 原生市场是第一位的

最深的一层是协议本身。[OpenStamp](https://docs.openstamp.io/) 和 [Stampscan](https://stampscan.xyz) 原生地交易并索引 SRC-20 代币：它们直接从 Bitcoin 读取代币，所以你在那里看到的是链本身的状态，而不是第三方的账本。要查看任何 SRC-20 代币的规范视图，请从这里开始。

## OKX：自 2024年起提供钱包支持

2024年2月，OKX Web3 Wallet [新增了对 Stamps SRC-20 标准的支持](https://www.globenewswire.com/news-release/2024/02/14/2828748/0/en/Flash-News-OKX-Wallet-Launches-Support-for-Stamps-SRC-20-Bitcoin-Inscriptions-Standard-Enhancing-User-Experience-with-Viewing-and-Transfer-Capabilities.html)，让用户可以持有、查看和转移 SRC-20 代币。这是主流平台开始认真对待该标准的最早的明确信号。

需要说清楚的范围：这是钱包支持，而不是交易上市。OKX 尚未开设 SRC-20 现货市场，其零手续费铭文市场覆盖的是其他标准，而不是 SRC-20。你可以在 OKX 上持有和转移你的 Stamps 代币；交易则发生在这张地图上其余的场所。

## 区块浏览器原生解码 stamps

一些通用型 Bitcoin 浏览器把 stamps 当作 stamps 来读取，而不是当成原始输出。Blockchain.com 的浏览器会解码经典（Counterparty）Bitcoin Stamps 并原生渲染图像：它检测交易中的 `STAMP:base64` 数据，将其标记为 Bitcoin Stamp，并把图像连同其尺寸、媒体类型和 asset ID 一起显示出来。打开一笔[实时的 stamp 交易](https://www.blockchain.com/explorer/transactions/btc/176a5d0329a8b48d5f86bcaf0078ccc3a57d50013744f4af3ea0c827347520ce)，艺术品就在眼前。

这项支持在协议历史的早期就已落地：一款主流浏览器选择去理解这种格式。更新的 <EntityMention entity="olga">OLGA</EntityMention>（P2WSH）编码在所有通用型浏览器上的原生解码仍在追赶之中，所以 [stampchain.io](https://stampchain.io) 依然是查看每一枚 stamp 最完整的视图。

## 聚合器与科普

发现渠道同样奏效。CoinGecko 维护着一个 [Top SRC-20 Coins 分类](https://www.coingecko.com/en/categories/src-20)，CoinMarketCap 为各个代币提供价格页面，Binance Academy 则以关于 [Bitcoin Stamps](https://academy.binance.com/en/articles/what-are-bitcoin-stamps) 和 [SRC-20 代币](https://academy.binance.com/en/glossary/src-20-tokens) 的讲解来记录这个生态。这是追踪与科普，而不是上市或合作，它也以自己的方式发挥作用：任何研究这些代币的人，如今都能在自己早已信任的平台上找到准确的介绍。

## BitMart：KEVIN 与 STAMP 的现货交易

中心化交易所方面最清晰的一步出现在 2025年12月23日，当天 BitMart 为两个代币开放了现货交易：[KEVIN/USDT](https://www.bitmart.com/crypto/KEVIN) 和 [STAMP/USDT](https://www.bitmart.com/crypto/STAMP)，位于其 Meme 与创新专区（[KEVIN](https://bitmart.zendesk.com/hc/en-us/articles/44674823250971--Primary-Listing-BitMart-Will-List-Bitcoin-Stamps-SRC-20-KEVIN-2025-12-23) 和 [STAMP](https://bitmart.zendesk.com/hc/en-us/articles/44675420348827--Primary-Listing-BitMart-Will-List-Bitcoin-Stamps-SRC-20-STAMP-2025-12-23) 的首次上市公告）。

两个 Bitcoin Stamps SRC-20 代币，其中一个是协议的创始代币，如今在一家中心化交易所交易，与从一开始就承载它们的原生市场并肩而立。完整的故事见 [KEVIN 与 STAMP 登陆 BitMart](/zh/blog/2025-12-kevin-stamp-bitmart-listing)。

## 为什么由 KEVIN 来讲这个故事

<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 是第一个 SRC-20 代币，它的历史就是整个生态的缩影。它起初是艺术：2023年4月3日、在区块 783,718 上的 Stamp #4258，一件向 Rare Pepe 文化致敬之作，随后开始在系统中自行复制传播。<EntityMention entity="arwyn">Arwyn</EntityMention> 随后为这股能量赋予了永久的形态，于 2023年5月3日、在区块 788,041 上将 <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 部署为第一个 SRC-20 代币（Stamp #18,516）。如今它拥有超过 2,300 名持有者。

## 长线博弈

比起某些声量更大的铭文标准，SRC-20 在交易所的存在还处于更早的阶段，Binance Academy 也直言不讳地这么说。真正重要的是方向：原生市场在源头交易这些代币、OKX 的钱包支持、主流聚合器的追踪、科普性的介绍，以及 KEVIN 与 STAMP 在 BitMart 的现货交易。写在 Bitcoin UTXO 集合上的永久艺术，正在走上人们早已在用的屏幕。
