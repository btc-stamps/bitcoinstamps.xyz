---
title: "Bitcoin Stamps 索引器 v1.9.1 发布"
date: "2026-07-04"
author: "reinamora"
description: "索引器 v1.9.1 版本在区块 940,000 激活 SRC-101 P2WSH/OLGA 编码，新增市场数据与 webhook 层，并通过了从创世块到链尖的完整共识重新验证，证明与生产账本的哈希完全一致。"
tags: ["indexer", "release", "src-101", "olga", "consensus", "announcement"]
leoType: "blog"
---

# Bitcoin Stamps 索引器 v1.9.1 发布

Bitcoin Stamps 索引器 **v1.9.1** 现已发布。这是 1.9 功能线：一组经过共识验证的协议激活与加固，包括 <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH/OLGA 编码、全新的市场数据与 webhook 层、基于 Rust 加速的解析路径，以及一次从创世块到链尖的完整共识重新验证。

每一项影响共识的改动都受激活高度或功能开关（默认关闭）的控制，并且该版本通过从创世块开始的重新解析，被证明与生产账本**哈希完全一致**。完整的发布说明和 Docker 镜像见 GitHub：[stampchain-io/btc_stamps release 1.9.1](https://github.com/stampchain-io/btc_stamps/releases/tag/1.9.1)。

## 亮点

- **<EntityMention entity="src-101">SRC-101</EntityMention> P2WSH / <EntityMention entity="olga">OLGA</EntityMention> 编码**在**区块 940,000**激活。激活之前，SRC-101 仅通过裸多签（bare multisig）支持；激活之后，裸多签和 P2WSH 都可使用，并在 JSON 层面加以区分（`"p":"src-101"`）。
- **针对 P2WSH 交易的 SRC-721R 部署检测**、递归式 SRC-721 描述解析，以及针对受诅咒 stamp（cursed stamps）更安全的双重处理。
- **市场数据与销售历史**：一个多来源缓存（KuCoin、StampScan），采用按置信度加权的平均值、持有者缓存，以及涵盖分发器、原子交换、OTC 和拍卖的销售历史管线。
- **实时 webhook**：用于新区块和重组（reorgs），具备 SSRF 防护，并且设计上非阻塞，因此通知永远不会影响索引。
- **性能**：在主区块循环中引入基于 Rust 加速的解析路径，以及一项 CP 跳过优化，在没有 Counterparty 数据的区块上避免调用 Counterparty API（已验证哈希完全一致）。
- **发布了截至区块 956,000 的全新引导快照（bootstrap）**，用于快速同步。

## 共识验证

该版本无愧于它“共识验证”的标签。在 Python 3.12 上进行的从创世块到链尖的重新解析与生产账本逐个哈希吻合：txlist 与账本哈希在全部 176,328 个区块上均一致，并通过逐区块的参考校验加以核实。所有涉及共识的依赖升级都通过了同样的重新解析关卡。

## 解释器支持（重要）

请在 **Python 3.10、3.11 或 3.12** 上运行索引器。共识已被证明在这三个版本上逐字节一致。**请勿在 Python 3.13 上运行**：它收紧了 `base64`/`binascii` 解码，并在区块 783,775 处与共识发生分歧（一次 stamp 误分类）。已发布的 `btcstamps/indexer:1.9.1` 镜像基于 Python 3.12 构建，即经过认证的运行时。

## 升级说明

- **需要 Counterparty `v11.0.1+`**（用于 CP V2 API 端点修复）。
- 应用新的数据库架构（市场数据、持有者缓存和销售历史表，外加一个 `fee_rate_sat_vb` 列和新的索引）。
- 使用 S3 上截至区块 956,000 的引导快照，实现快速的初始同步。

这一版本延续了自区块 779,652 以来定义 <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> 的同一套准则：新功能都置于激活高度之后落地，任何内容上线之前，共识都要对照真实的链得到验证。
