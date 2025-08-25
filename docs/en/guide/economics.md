---
title: "Bitcoin Stamps Economics"
description: "Understanding costs and economics of Bitcoin Stamps protocols"
leoType: "guide"
audience: "both"
mentions: ["bitcoin-stamps", "economics", "cost", "fees", "src-20", "olga"]
economicImpact: "cost-analysis"
---

# Bitcoin Stamps Economics

<SmartStructuredData />

Understanding the costs and practical considerations of using Bitcoin Stamps protocols.

## Transaction Costs

Bitcoin Stamps store data directly on Bitcoin, which means transaction costs vary based on network conditions.



### For Artists
- Small stamps typically cost $3-6 in Bitcoin fees
- Larger stamps can cost $10-20+ depending on data size
- Costs vary with Bitcoin network congestion

### Cost Estimation
```typescript
function estimateStampCost(dataSize: number, feeRate: number): number {
  const overhead = 200; // bytes
  return (dataSize + overhead) * feeRate;
}
```

## Resources

- **[SRC-20 Protocol](/en/protocols/src-20)** - Fungible token economics
- **[Community Guide](/en/community/)** - Community cost-sharing approaches