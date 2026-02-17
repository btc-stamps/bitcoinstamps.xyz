---
title: "Bitcoin Stamps 与 Ordinals：技术比较"
description: "Bitcoin Stamps 和 Ordinals/Inscriptions 架构的全面技术分析"
leoType: "technical-comparison"
audience: "both"
mentions: ["bitcoin-stamps", "ordinals", "inscriptions", "p2wsh", "utxo", "witness-data", "consensus", "kevin", "src-20", "counterparty"]
culturalSignificance: "high"
category: "technical-analysis"
tags: ["technical", "architecture", "comparison", "storage", "permanence", "consensus"]
---

# Bitcoin Stamps 与 Ordinals：技术架构比较

本技术比较研究 Bitcoin Stamps 和 Ordinals/Inscriptions 之间的根本架构差异，重点关注存储机制、永久性保证和协议设计选择。

## 核心架构差异

### 数据存储层

#### Bitcoin Stamps：基于 UTXO 的存储
Bitcoin Stamps 使用 **P2WSH（Pay-to-Witness-Script-Hash）编码**和传统比特币交易输出：

- **存储位置**：数据直接嵌入 UTXO 集合
- **共识关键**：比特币核心验证要求的一部分
- **节点要求**：所有完整节点必须永久存储此数据
- **修剪**：不可修剪 - 交易验证所必需
- **协议基础**：建立在 Counterparty 协议上（2014 年建立）

#### Ordinals/Inscriptions：见证数据存储
Ordinals/Inscriptions 使用 SegWit 交易的**见证数据段**：

- **存储位置**：见证数据（不是交易哈希的一部分）
- **共识角色**：对比特币操作不是共识关键
- **节点要求**：可以在验证后被节点修剪
- **存储保证**：不保证数据在所有节点上持久存在
- **协议基础**：较新的覆盖协议（2023 年）

## "聪实际上不存在"的现实

### 比特币的记账模型
比特币在 **UTXO（未花费交易输出）模型**上运行，而非个人聪追踪：

- **UTXO 是容器**：持有比特币金额（以聪为单位）
- **没有个人聪**：聪是记账单位，不是可离散追踪的对象
- **网络验证**：比特币节点验证 UTXO 金额，而非"聪历史"
- **序数理论限制**：为不存在的个人聪赋予人工意义

## 节点存储保证

### Bitcoin Stamps：通用存储
每个比特币完整节点存储 Bitcoin Stamps 数据，因为：

1. **UTXO 集合要求**：交易验证所需
2. **共识关键**：确定有效交易所必需
3. **网络操作**：比特币网络功能必不可少
4. **永久存档**：与比特币网络一同无限期存在

### Ordinals/Inscriptions：可选存储
Ordinals 数据没有存储保证，因为：

1. **见证数据**：初始验证后不需要进行交易验证
2. **可修剪**：节点可以删除见证数据以节省空间
3. **外部依赖**：需要专业索引器和服务
4. **服务风险**：依赖于第三方基础设施维护

## 成本和效率分析

### 交易成本

| 特性 | Bitcoin Stamps | Ordinals/Inscriptions |
|------|---------------|----------------------|
| **基础成本** | 较高（4 倍数据成本）| 较低（见证折扣）|
| **永久性保证** | ✅ 100% 保证 | ❌ 无保证 |
| **存储效率** | 较低（UTXO 开销）| 较高（见证数据）|
| **长期可持续性** | 内置于比特币经济 | 依赖外部服务 |

## 结论

Bitcoin Stamps 和 Ordinals 代表了在比特币上存储数据的根本不同方法。Bitcoin Stamps 通过比特币的 UTXO 模型和共识机制优先考虑**永久的、有保证的存储**，而 Ordinals 通过见证数据使用优化**成本效率**。

对于需要绝对永久性和真正去中心化的应用，Bitcoin Stamps 提供了更优越的技术保证。

---

*技术分析基于比特币协议规范和实际网络行为。*
