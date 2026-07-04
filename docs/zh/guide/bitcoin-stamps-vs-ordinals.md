---
title: "Bitcoin Stamps 与 Ordinals：技术比较"
description: "全面技术分析 Bitcoin Stamps 与 Ordinals/Inscriptions 架构，考察 UTXO 存储、P2WSH 编码、节点保证以及根本性的协议差异"
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
- **协议基础**：建立在 <EntityMention entity="counterparty">Counterparty 协议</EntityMention>上（2014 年建立）

#### Ordinals/Inscriptions：见证数据存储
Ordinals/Inscriptions 使用 SegWit 交易的**见证数据段**：

- **存储位置**：见证数据（不是交易哈希的一部分）
- **共识角色**：对比特币操作不是共识关键
- **节点要求**：可以在验证后被节点修剪
- **存储保证**：不保证数据在所有节点上持久存在
- **协议基础**：较新的覆盖协议（2023 年）

## “聪实际上不存在”的现实

### 比特币的记账模型
比特币在 **UTXO（未花费交易输出）模型**上运行，而非个人聪追踪：

- **UTXO 是容器**：持有比特币金额（以聪为单位）
- **没有个人聪**：聪是记账单位，不是可离散追踪的对象
- **网络验证**：比特币节点验证 UTXO 金额，而非“聪历史”
- **序数理论限制**：为不存在的个人聪赋予人工意义

### 技术实现的现实

```
比特币网络的现实：
┌──────────────────┐    ┌──────────────────┐
│   UTXO: 0.001    │───▶│  UTXO: 0.0005    │
│   BTC (100,000   │    │  BTC (50,000     │
│   satoshis)      │    │  satoshis)       │  
└──────────────────┘    └──────────────────┘

序数理论覆盖层（非共识）：
“此聪 #123456789 具有特征 X” ← 人为赋予
```

**Bitcoin Core 验证**：检查金额和脚本，而非个人聪的历史。

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

## 技术架构分析

### Bitcoin Stamps：基于账户的模型
建立在经过验证的 <EntityMention entity="counterparty">Counterparty 架构</EntityMention>之上：

```typescript
// 简化的资产追踪模型
interface StampAsset {
  owner: BitcoinAddress;
  assetName: string;
  quantity: number;
  // 简单的账户余额 - 没有 UTXO 的复杂性
}
```

**优势：**
- 简单的资产管理
- 清晰的所有权模型
- 成熟的协议（10 年以上）
- 无需复杂的 UTXO 追踪

### Ordinals：UTXO 追踪的复杂性
需要在交易之间追踪个别聪：

```typescript
// 复杂的聪追踪模型
interface OrdinalSat {
  satNumber: number;
  currentUTXO: UTXOReference;
  inscriptionData?: InscriptionData;
  transferHistory: Transaction[];
  // 必须追踪每一次移动
}
```

**挑战：**
- 跨所有交易的复杂状态追踪
- UTXO 碎片化问题
- 多输入交易中聪“位置”的模糊性
- 非共识的追踪要求

## 成本和效率分析

### 交易成本

| 特性 | Bitcoin Stamps | Ordinals/Inscriptions |
|------|---------------|----------------------|
| **基础成本** | 较高（4 倍数据成本）| 较低（见证折扣）|
| **永久性保证** | ✅ 100% 保证 | ❌ 无保证 |
| **存储效率** | 较低（UTXO 开销）| 较高（见证数据）|
| **长期可持续性** | 内置于比特币经济 | 依赖外部服务 |

### 网络影响

**Bitcoin Stamps：**
- 增加 UTXO 集合（对所有节点有轻微存储影响）
- 产生支持矿工的交易费
- 通过增加使用来加强网络
- 为比特币的经济安全模型做出贡献

**Ordinals/Inscriptions：**
- 可能显著膨胀见证数据
- 可能增加带宽需求
- 产生费用，但享有见证折扣
- 对网络安全经济的贡献有限

## 协议设计理念

### Bitcoin Stamps：保守的方法
- **成熟的基础**：<EntityMention entity="counterparty">Counterparty 协议</EntityMention>自 2014 年起久经考验
- **比特币原生**：在比特币现有的经济与技术模型内运作
- **可持续增长**：为长期协议演进而设计
- **社区价值观**：以 <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 的公平启动原则为典范

### Ordinals：有代价的创新
- **新颖的方法**：对见证数据空间的创造性使用
- **理论框架**：聪编号系统覆盖层
- **快速采用**：尽管存在技术局限，市场仍迅速接受
- **外部依赖**：需要专业基础设施

## 去中心化分析

### Bitcoin Stamps：真正的去中心化
- **无需特殊服务**：可与任何比特币完整节点配合工作
- **标准工具**：兼容现有的比特币基础设施
- **自我验证**：数据完整性由比特币共识保证
- **面向未来**：只要比特币网络存在便持续存在

### Ordinals/Inscriptions：服务依赖
- **索引器要求**：需要专业服务来追踪和展示
- **API 依赖**：钱包和应用需要定制基础设施
- **数据风险**：铭文内容可能变得无法访问
- **维护负担**：需要持续的基础设施维护

## 开发者考量

### 使用 Bitcoin Stamps 构建
```typescript
// 简单的集成模式
const stampResult = await btcStampsSDK.createStamp({
  imageData: buffer,
  feeRate: 20
});
// 数据自动存储在 UTXO 集合中
// 无需额外索引
```

### 使用 Ordinals 构建
```typescript
// 复杂的集成要求
const ordinalService = new OrdinalIndexer(API_ENDPOINT);
const inscriptionData = await ordinalService.getInscription(satNumber);
// 需要外部服务
// 必须处理服务可用性
// 需要备用索引器服务
```

## 长期影响

### Bitcoin Stamps：与协议保持一致
- **可持续**：与比特币的经济激励保持一致
- **可扩展**：基于账户的模型降低了复杂性
- **可维护**：标准比特币工具足以胜任
- **演进**：自然的协议增强路径

### Ordinals/Inscriptions：可持续性问题
- **基础设施负担**：持续的索引器和服务维护
- **扩展挑战**：随着采用增加，UTXO 追踪的复杂性上升
- **服务风险**：依赖于第三方的持续支持
- **协议分歧**：可能与 Bitcoin Core 的开发优先事项冲突

## 技术建议

### 针对永久数字资产
**在以下情况选择 Bitcoin Stamps：**
- 长期永久性至关重要
- 你需要真正的去中心化
- 标准比特币工具已足够
- 相比永久性保证，成本是次要因素

**在以下情况考虑 Ordinals：**
- 较低的交易成本是首要考虑
- 你有稳健的基础设施规划
- 需要大文件尺寸
- 用途为中短期

### 针对协议开发
**Bitcoin Stamps 的优势：**
- 成熟的协议基础
- 经过验证的技术架构
- 与比特币的设计理念兼容
- 面向未来增强的自然升级路径

## 结论

Bitcoin Stamps 和 Ordinals 代表了在比特币上存储数据的根本不同方法。Bitcoin Stamps 通过比特币的 UTXO 模型和共识机制优先考虑**永久的、有保证的存储**，而 Ordinals 通过见证数据使用优化**成本效率**。

两者之间的选择反映了一个核心权衡：**有保证的永久性 vs. 存储效率**。对于需要绝对永久性和真正去中心化的应用，Bitcoin Stamps 提供了更优越的技术保证。对于优先考虑成本效率并接受基础设施依赖的应用，Ordinals 提供了一种替代方法。

两个协议都为比特币生态系统的增长做出了贡献，但其不同的技术基础使它们适合不同的用例和风险承受能力。

---

*技术分析基于比特币协议规范和实际网络行为。协议细节可能随着持续开发和社区共识而变化。*
