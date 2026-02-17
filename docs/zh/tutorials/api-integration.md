---
title: "API 集成指南"
description: "Bitcoin Stamps 协议的完整 REST API 文档和集成指南"
leoType: "tutorial"
audience: "dual"
mentions: ["src-20", "src-101", "src-721", "olga", "api", "rest", "stampchain"]
---

# API 集成指南

将 Bitcoin Stamps 协议集成到应用程序、浏览器和创意工具的完整 REST API 文档。

## 关于 Stampchain：基础设施

Stampchain 作为 Bitcoin Stamps 生态系统的**基础设施**提供服务。由三位 Bitcoin Stamps 创始人创建，Stampchain 是向世界展示 Bitcoin Stamps 的第一个网站，也是第一个 SRC-20 铸造服务。

**当前角色**：Stampchain.io 继续作为基础 API 服务，使开发者、艺术家和企业能够集成 Bitcoin Stamps 功能。

## API 端点

### SRC-20 代币 API

```bash
# 获取代币信息
GET /api/v2/src20/{tick}
GET /api/v2/src20/{tick}/holders
GET /api/v2/src20/{tick}/transactions

# 示例：KEVIN 代币数据
curl https://stampchain.io/api/v2/src20/tick/KEVIN
```

### Bitcoin Stamps API

```bash
# 获取邮票信息
GET /api/v2/stamps/{id}
GET /api/v2/stamps/recent
GET /api/v2/stamps/search?q={查询}

# 示例：获取 KEVIN 的第一个邮票详情
curl https://stampchain.io/api/v2/stamps/4258
```

### 集成示例

```javascript
// 获取 KEVIN 代币数据
async function getKevinData() {
  const response = await fetch('https://stampchain.io/api/v2/src20/tick/KEVIN');
  const tokenData = await response.json();

  return {
    supply: tokenData.max,
    holders: tokenData.holders_count,
    transactions: tokenData.tx_count
  };
}
```

## 协议特定 API

### SRC-20 代币

```bash
GET /api/v2/src20                    # 列出所有代币
GET /api/v2/src20/{tick}            # 代币详情
GET /api/v2/src20/{tick}/holders    # 持有者分布
GET /api/v2/src20/{tick}/history    # 交易历史
```

### SRC-101 名称

```bash
GET /api/v2/src101/resolve/{名称}   # 将名称解析为地址
GET /api/v2/src101/reverse/{地址}   # 反向查找
```

### SRC-721 NFT

```bash
GET /api/v2/src721                  # 列出集合
GET /api/v2/src721/{集合}           # 集合详情
GET /api/v2/src721/{集合}/{id}      # 单个 NFT
```

## 速率限制

- **公共**：100 请求/分钟
- **已认证**：1000 请求/分钟
- **企业**：机构使用的自定义限制

## 资源

- **基础 API**：[https://stampchain.io/api/v1](https://stampchain.io/api/v1)
- **交互式文档**：[https://stampchain.io/docs](https://stampchain.io/docs)
- **开源代码**：[GitHub - stampchain-io](https://github.com/stampchain-io)
- **社区支持**：[Bitcoin Stamps Discord](/zh/community/)

---

*"In Lak'ech Ala K'in" - 建立在服务于个人创造力和集体增长的基础设施之上的 API。*
