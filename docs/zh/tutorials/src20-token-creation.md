---
title: "SRC-20 代币创建指南"
description: "使用 @btc-stamps/tx-builder SDK 创建 SRC-20 代币的完整技术指南"
leoType: "tutorial"
audience: "dual"
mentions: ["src-20", "tx-builder", "token-creation", "bitcoin-stamps"]
economicImpact: "tokenization-empowerment"
---

# SRC-20 代币创建指南

使用三个简单操作在比特币上创建 SRC-20 同质化代币：DEPLOY、MINT 和 TRANSFER。

## Web 界面（无需代码）

1. 访问 [stampchain.io/create-token](https://stampchain.io/create-token)
2. 输入代币详情（代号、供应量、铸造限制）
3. 连接钱包并支付比特币费用
4. 代币自动部署

**示例代币：**
- 代号：`MYART`（最多 4 个字母）
- 供应量：`100,000`
- 铸造限制：`100`（防止巨鲸主导）

## SDK 实现

```bash
npm install @btc-stamps/tx-builder
```

```typescript
import { TxBuilder } from '@btc-stamps/tx-builder';

const txBuilder = new TxBuilder({ network: 'mainnet' });

// 部署代币
const deployTx = await txBuilder.src20.deploy({
  ticker: 'MYART',
  max: '100000',
  limit: '100'
});

// 铸造代币
const mintTx = await txBuilder.src20.mint({
  ticker: 'MYART',
  amount: '100'
});

// 转账代币
const transferTx = await txBuilder.src20.transfer({
  ticker: 'MYART',
  amount: '50',
  destination: 'bc1q...'
});
```

### 协议操作

SRC-20 使用存储在比特币上的 JSON 数据：

```typescript
interface SRC20Operation {
  p: 'SRC-20';
  op: 'DEPLOY' | 'MINT' | 'TRANSFER';
  tick: string;        // 4 字母代号
  max?: string;        // 总供应量（DEPLOY）
  lim?: string;        // 铸造限制（DEPLOY）
  amt?: string;        // 金额（MINT/TRANSFER）
}
```

## 公平发行原则

遵循 KEVIN 的成功模型：

- **无预挖**：创建者与其他所有人以相同方式获得代币
- **合理供应**：不要太高（贬值）或太低（限制访问）
- **公平铸造限制**：允许广泛参与，防止巨鲸积累
- **真实目的**：构建真正的社区价值

## 常见代币模式

**社区代币**（如 KEVIN）：
- 供应量：21,000,000（受比特币启发）
- 铸造限制：1,000（可访问的参与）

**艺术代币**：
- 供应量：1,000-10,000（限量版）
- 铸造限制：1-10（独家访问）

**实用代币**：
- 供应量：与预期使用匹配
- 铸造限制：基于用户需求

## 经济学和成本

**交易成本：**
- 部署：约 $4-8（20-40k 聪）
- 铸造：约 $2-4（10-20k 聪）
- 转账：约 $1-3（5-15k 聪）

*成本随比特币网络拥堵变化*

## 发行策略

1. 首先在**测试网测试**
2. 与社区**分享概念**
3. 在主网**部署代币**
4. **启用社区铸造**
5. **建立真正的实用性和价值**

## 资源

- **[SRC-20 协议 →](/zh/protocols/src-20)** - 技术规范
- **[API 集成 →](/zh/tutorials/api-integration)** - 代币数据访问
- **[社区价值观 →](/zh/narratives/community-values)** - 公平发行原则
- **[创建代币 →](https://stampchain.io/create-token)** - Web 界面

---

*遵循 KEVIN 和 Bitcoin Stamps 社区建立的公平发行原则负责任地创建代币。*
