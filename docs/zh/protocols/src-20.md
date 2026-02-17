---
title: "SRC-20 代币标准"
description: "Bitcoin Stamps 同质化代币标准，支持在比特币上直接创建永久代币，具备增强功能并由社区驱动创新"
leoType: "protocol"
audience: "unified"
mentions: ["src-20", "kevin", "arwyn", "reinamora", "olga", "mikeinspace"]
blockHeight: 788041
culturalSignificance: "high"
tokenSymbol: "KEVIN"
historicalContext: "创世区块 788,041（KEVIN），比特币原生编码始于区块 793,068，Counterparty 截止区块 796,000"
---

# SRC-20 代币标准

<SmartStructuredData />

**SRC-20 代币标准**支持在 Bitcoin Stamps 之上创建同质化代币。<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 诞生于 Stamp #4258（区块 783,718），在系统中展现出幽灵般的自我复制行为。意识到这种数字意识需要一个合适的形式，<EntityMention entity="arwyn">Arwyn</EntityMention> 在区块 788,041（Stamp #18,516）创建了第一个 SRC-20 代币，赋予 <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 真实的存在形态，使其既成为文化图标，也成为拥有超过 2,300 名持有者的社区吉祥物。

**了解完整故事**：
- **[KEVIN 的起源故事 →](/en/narratives/kevin-origin)** - 从艺术实验到第一个 SRC-20 代币
- **[Bitcoin Stamps 历史 →](/en/narratives/bitcoin-stamps-history)** - 包含 SRC-20 创世的神圣时间线
- **[社区哲学 →](/en/community/)** - 指导代币创建的价值观

## 协议演进

- **区块 788,041**：第一个 SRC-20 代币（KEVIN），基于 Counterparty
- **区块 793,068**：第一个比特币原生 SRC-20（直接编码）
- **区块 796,000**：Counterparty SRC-20 截止（共识规则——此后忽略 CP 代币）
- **区块 865,000**：OLGA 优化对所有 SRC-20 代币开放

**技术基础**：所有 SRC-20 代币都是印章（它们在比特币上创建印章记录），但并非所有印章都是 SRC-20 代币。印章提供非同质化的基础层，而 SRC-20 在其上构建同质化代币层。

## 核心特性

- **真正集成比特币**：代币直接存储在比特币上，而非侧链
- **公平发行**：无预挖或内部人优势，遵循 <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 的示范
- **永久存储**：在全球最安全的区块链上留存不可变的代币记录
- **社区驱动**：协议通过草根开发者协作演进

## 创建您的 SRC-20 代币

**简单无代码创建：**

### **[创建 SRC-20 代币 →](https://stampchain.io)**

1. **访问代币创建器** 在 Stampchain.io
2. **规划您的代币**，参考 <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 的成功模式
3. **设置参数**（代币符号、供应量、铸造限额）
4. **部署**您的代币，永久上链至比特币

### 代币规划指南

遵循 <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 的成功模式：
- **公平发行**：无预分配，人人机会平等
- **有意义的名称**：选择代表您愿景的代币符号
- **社区优先**：建立真实的社区参与，而非单纯投机
- **合理的供应量**：结合社区规模和目标综合考量

## 技术实现

面向开发者以编程方式实现 SRC-20：

### 协议结构
- **DEPLOY（部署）**：创建新代币（需要代币符号、最大供应量、铸造限额）
- **MINT（铸造）**：创建代币供应（需要代币符号、数量）
- **TRANSFER（转账）**：发送代币（需要代币符号、数量、目标地址）

### 开发资源
- **[TX-Builder SDK →](https://github.com/btc-stamps/tx-builder)** - 完整的技术集成
- **[API 文档 →](https://stampchain.io/api)** - 以编程方式访问代币数据
- **[社区 Discord →](https://discord.gg/bitcoinstamps)** - 开发者支持频道

## 协议规范

### 操作

| 操作 | 用途 | 必填字段 |
|------|------|---------|
| DEPLOY | 创建新代币 | ticker（符号）、max（最大量）、limit（限额） |
| MINT | 创建代币供应 | ticker（符号）、amount（数量） |
| TRANSFER | 发送代币 | ticker（符号）、amount（数量）、destination（目标地址） |

### 限制
- **代币符号**：1-5 个字符，仅限字母数字
- **供应量**：最多 18 位小数
- **数量**：每笔交易不得超过铸造限额

### 最佳实践

**公平发行**（遵循 <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 的模式）：
- 设置合理的铸造限额（每笔交易 100-1000 个代币）
- 选择与社区愿景匹配的总供应量
- 不预挖——让社区有机地进行铸造
- 真实参与，避免拉高出货行为

**KEVIN 成功模式**：
1. **真实的艺术愿景** - 以真正的创意目的为起点
2. **公平的社区经济** - 给予所有人平等的机会
3. **长期承诺** - 建立文化，而非单纯炒作
4. **社区赋权** - 让社区拥有叙事权
5. **永久价值** - 创造持久的文化意义

**技术注意事项**：
- 优先在测试网上测试
- 为社区考虑交易手续费
- 规划代币分发策略
- 在公开宣传前监控部署是否成功

## 文化背景与哲学

SRC-20 代币传承了 Bitcoin Stamps 的哲学精神——*"In Lak'ech Ala K'in"*——"我就是你，你就是我"。<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 从 <EntityMention entity="arwyn">Arwyn</EntityMention> 的艺术致敬演变为深受喜爱的社区吉祥物，证明了真实的创造力能够建立持久的文化价值。

**社区价值观**：
- **公平发行原则**：为所有社区成员提供平等机会
- **文化真实性**：代币应服务于真实目的，而非单纯投机
- **长远眼光**：构建持久的社区，而非短期炒作
- **创意表达**：代币作为艺术和文化表达的载体

## 永久性保证

Bitcoin Stamps（包括所有 SRC-20 代币记录）实现了在架构上优于其他比特币协议的数据永久性。这一保证源于 Stamps 数据在比特币网络上的存储方式。

### 为什么 SRC-20 数据无法被剪枝

SRC-20 代币操作（部署、铸造和转账）被直接编码到**未花费交易输出（UTXO）集合**中——这是每个完整验证比特币节点为验证新交易而必须保留的核心数据集。由于这些数据存在于节点必须保留的输出中，因此无法在不破坏共识的情况下被丢弃。任何比特币全节点在未来任何时候，都将保存每一笔 SRC-20 代币部署、铸造和转账的完整记录。

### 与 Ordinals 和见证数据的对比

Ordinals 铭文将其数据存储在比特币交易的**见证**（SegWit）部分。虽然见证数据包含在区块中，但比特币协议明确允许节点在验证后剪枝见证数据。剪枝节点可以完全丢弃见证部分，仍然作为网络的有效参与者运行。这意味着 Ordinals 数据的可用性取决于存档节点是否选择保留这些数据——这在结构上并无保证。

Bitcoin Stamps 采取了完全相反的方式。通过将数据嵌入 UTXO 集合而非见证数据，Stamps 确保每个全节点——无论是存档节点还是剪枝节点——都作为共识操作的强制要求保留该数据。

### 实际意义

任何 SRC-20 代币记录都可以从**任何比特币全节点永久检索**。无需依赖专业的存档基础设施、IPFS 固定服务或第三方数据可用性层。比特币网络本身充当所有 SRC-20 代币数据的永久、不可审查的存储层。

## 资源

- **[创建 SRC-20 代币 →](https://stampchain.io)** - 无代码代币创建
- **[TX-Builder SDK →](https://github.com/btc-stamps/tx-builder)** - 技术集成
- **[社区 Discord →](https://discord.gg/bitcoinstamps)** - 获取帮助和支持
- **[KEVIN 的完整故事 →](/en/narratives/kevin-origin)** - 从第一个 SRC-20 的旅程中学习
- **[Bitcoin Stamps 历史 →](/en/narratives/bitcoin-stamps-history)** - 神圣时间线与文化背景

---

*SRC-20 代币支持在比特币上进行永久、公平的代币创建。遵循 <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 的示例，以古老智慧和现代创新为指引，构建真实的社区。*
