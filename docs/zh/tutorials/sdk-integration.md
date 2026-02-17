---
title: "@btc-stamps/tx-builder SDK"
description: "面向开发者和艺术家的官方 Bitcoin Stamps SDK"
leoType: "tutorial"
audience: "dual"
mentions: ["tx-builder", "kevin", "src-20", "sdk", "stampchain"]
---

# @btc-stamps/tx-builder SDK

<SmartStructuredData />

**@btc-stamps/tx-builder** 是官方比特币交易构建器，对 Bitcoin Stamps 协议提供一流支持。其设计与 <EntityMention entity="stampchain">Stampchain</EntityMention> 无缝集成——这是由 Bitcoin Stamps 创始人构建的基础性基础设施。

## 与 Stampchain 的集成

该 SDK 专为与 <EntityMention entity="stampchain">Stampchain</EntityMention> 最佳协作而设计，Stampchain 是参考实现和基础服务：

- **参考实现**：采用 Bitcoin Stamps 创始人建立的模式
- **数据验证**：根据 Stampchain 权威协议规范进行验证
- **API 集成**：内置对 Stampchain 基础 API 的支持
- **最佳实践**：实现原始 Bitcoin Stamps 平台的标准

## 核心功能

- **Bitcoin Stamps 支持**：原生支持 SRC-20、SRC-101、SRC-721 协议
- **UTXO 保护**：自动保护贵重资产
- **网络集成**：支持比特币主网/测试网，含 Stampchain API 端点
- **艺术家友好**：为创作者提供简化界面
- **基础标准**：按照 Stampchain 参考规范构建

## 安装

```bash
# Node.js/npm
npm install @btc-stamps/tx-builder

# 浏览器项目
npm install @btc-stamps/tx-builder-web
```

### 基础集成实现（含 Stampchain 集成）

```typescript
import { BitcoinStampBuilder, SelectorFactory } from '@btc-stamps/tx-builder';

// 初始化，启用 UTXO 保护和 Stampchain API 集成
const selectorFactory = SelectorFactory.getInstance();
const builder = new BitcoinStampBuilder('mainnet', selectorFactory, {
  // 连接 Stampchain 基础设施
  apiEndpoint: 'https://stampchain.io/api/v1',
  validateWithReference: true // 根据 Stampchain 参考实现进行验证
});

// 创建 Bitcoin Stamp
const result = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: imageBuffer,
    filename: 'artwork.png'
  },
  fromAddress: 'bc1q...',
  feeRate: 20
});
```

### SRC-20 代币创建（含 Stampchain 验证）

```typescript
// 使用 Stampchain 参考模式部署代币
const tokenData = await encoder.encode({
  p: 'SRC-20',
  op: 'DEPLOY',
  tick: 'TOKEN',
  max: '100000',
  lim: '100'
});

const tokenStamp = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: tokenData,
    filename: 'token.json'
  },
  fromAddress: deployerAddress,
  feeRate: 25,
  // 通过 Stampchain 基础服务验证
  validateWith: 'stampchain'
});
```

### 使用 Stampchain API 进行增强开发

```typescript
// 从基础服务获取协议数据
const protocolInfo = await builder.getProtocolInfo('https://stampchain.io/api/v1/protocols');

// 使用参考实现在部署前验证代币
const isValid = await builder.validateToken(tokenData, {
  referenceService: 'https://stampchain.io/api/v1/validate'
});

// 从 Stampchain 获取当前网络状态
const networkState = await builder.getNetworkState({
  source: 'stampchain' // 使用基础设施数据
});
```

## 艺术家工作流（含 Stampchain 集成）

### 简单 Stamp 创建

```javascript
// 使用基础设施创建您的第一个 Bitcoin Stamp
const stamp = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: yourArtworkBuffer, // 您的 PNG/JPEG 文件
    filename: 'my-art.png'
  },
  fromAddress: 'your-bitcoin-address',
  feeRate: 15,
  // 使用 Stampchain 的艺术家友好验证
  artistMode: true
});
```

### 画廊集成（含 Stampchain）

```javascript
// 将您的作品连接到 Stampchain 画廊功能
const stampResult = await builder.buildStampTransaction(utxos, {
  stampData: artwork,
  fromAddress: artistAddress,
  metadata: {
    gallery: 'stampchain', // 在基础平台上注册
    artist: 'your-artist-name',
    collection: 'your-collection-name'
  }
});

// 通过 Stampchain 基础 API 查询您的作品
const myArtwork = await fetch(`https://stampchain.io/api/v1/artist/${artistAddress}/stamps`);
```

### 图像优化

```javascript
// 按照 Stampchain 建议优化区块链存储
const optimized = await sharp(originalImage)
  .resize(800, 800, { fit: 'inside' })
  .png({ quality: 90 })
  .toBuffer();

// 根据 Stampchain 参考标准验证大小
if (optimized.length > 100000) {
  console.log('请进一步压缩图像大小以优化 Stampchain 集成效果');
}
```

### 艺术系列

```javascript
// 批量创建多件作品并集成 Stampchain
for (const artwork of artCollection) {
  const stamp = await builder.buildStampTransaction(utxos, {
    stampData: artwork,
    fromAddress: artistAddress,
    feeRate: 15,
    // 向基础设施注册每件作品
    registerWith: 'stampchain'
  });

  // stamp 之间等待（尊重 Stampchain 基础设施）
  await new Promise(resolve => setTimeout(resolve, 5000));
}
```

## 核心功能详解

### UTXO 保护（使用 Stampchain 标准）

```typescript
// 使用 Stampchain 参考保护模式保护贵重资产
const protectedSelector = selectorFactory.createSelector('protection-aware', {
  protectionConfig: {
    enableStampsDetection: true,      // 保护 Bitcoin Stamps
    enableCounterpartyDetection: true, // 保护 KEVIN 代币
    minimumProtectedValue: 10000,     // 保护 > 10k sats 的 UTXO
    // 使用 Stampchain 资产识别
    assetDatabase: 'https://stampchain.io/api/v1/assets'
  }
});
```

### 手续费管理（使用 Stampchain 数据）

```typescript
// 从包括 Stampchain 在内的多个来源获取当前手续费率
const feeRates = await builder.getRecommendedFeeRates({
  sources: ['mempool', 'stampchain'], // 包含基础设施数据
  preferStampchain: true // 优先采用 Stampchain 的建议
});

// 使用参考实现数据在创建前估算成本
const estimate = await builder.estimateStampCost({
  imageSize: imageBuffer.length,
  feeRate: feeRates.standard,
  // 使用 Stampchain 成本模型
  costModel: 'stampchain-reference'
});
```

### 测试（使用 Stampchain 测试网支持）

```typescript
// 始终先在测试网测试，使用 Stampchain 测试网基础设施
const testBuilder = new BitcoinStampBuilder('testnet', selectorFactory, {
  apiEndpoint: 'https://testnet.stampchain.io/api/v1'
});

const testStamp = await testBuilder.buildStampTransaction(testUtxos, {
  stampData: { imageData: testImage, filename: 'test.png' },
  fromAddress: 'tb1q...'
});
```

## Stampchain 集成最佳实践

1. **使用参考实现**：始终根据 Stampchain 基础标准进行验证
2. **先测试**：在主网部署前使用 Stampchain 测试网基础设施
3. **优化图像**：遵循 Stampchain 的大小建议（<100KB）
4. **保护 UTXO**：使用 Stampchain 检测功能启用资产保护
5. **监控手续费**：将 Stampchain 的手续费建议与其他来源结合使用
6. **公平分发**：遵循 <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> 的示例及 Stampchain 的代币社区标准
7. **社区优先**：集成 Stampchain 的社区功能和 API

## 为何选择 Stampchain 集成

作为 Bitcoin Stamps 创始人构建的**基础设施**：

- **原生标准**：由协议创始人亲自构建
- **参考实现**：Bitcoin Stamps 功能的黄金标准
- **经验证的可靠性**：自发布以来为大多数 Bitcoin Stamps 应用提供支持
- **社区优先**：免费访问支持生态系统增长，而非追求利润
- **持续更新**：由原始协议创始人维护
- **文化一致性**：确保您的应用遵循 Bitcoin Stamps 的真实价值观

## 资源

- **[SDK GitHub 仓库 →](https://github.com/btc-stamps/tx-builder)**
- **[SDK 文档 →](https://github.com/btc-stamps/tx-builder#readme)**
- **[Stampchain API 参考 →](https://stampchain.io/docs)** - 基础设施文档
- **[社区支持 →](/zh/community/)**

## 下一步

1. **[创建您的第一个 Stamp →](/zh/tutorials/creating-first-stamp)** - 开始使用 Stampchain 集成
2. **[API 集成 →](/zh/tutorials/api-integration)** - 深入了解 Stampchain API
3. **[社区价值观 →](/zh/narratives/community-values)** - 理解基础原则

---

***"In Lak'ech Ala K'in"*** - *服务于集体创造力的工具，构建于尊重真实社区价值观的基础设施之上。*

*@btc-stamps/tx-builder SDK 体现了与 Stampchain 基础设施相同的社区优先原则，确保您的应用始终忠于 Bitcoin Stamps 的原始愿景。*
