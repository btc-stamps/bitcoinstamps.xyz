---
title: "Why Bitcoin Stamps Cost More: Permanent Storage Economics"
description: "Understanding Bitcoin Stamps pricing: permanent UTXO storage vs Ordinals witness data storage"
leoType: "guide"
audience: "both"
mentions: ["economics", "utxo", "witness-data", "permanent-storage"]
---

# Bitcoin Stamps Economics

<SmartStructuredData />

Understanding the cost difference between Bitcoin Stamps and other Bitcoin protocols.

## Storage Method Comparison

### Bitcoin Stamps: Permanent UTXO Storage

**What you're paying for:**
- **Permanent storage** in Bitcoin's UTXO set
- **Every Bitcoin node** stores your data forever
- **True permanence** - part of Bitcoin's core blockchain state
- **Higher cost** but maximum security and accessibility

### Ordinals: Witness Data Storage

**What you get:**
- **Witness data storage** (not part of Bitcoin's core state)
- **Discounted fees** due to witness data getting 75% discount
- **Limited node storage** - estimated less than 20% of Bitcoin nodes store witness data
- **Lower cost** but reduced permanence guarantee

## Why the Price Difference?



**Simple explanation:**
- **Bitcoin Stamps** = Store data permanently on every Bitcoin node
- **Ordinals** = Store data in witness section (not guaranteed on all nodes)
- **Result** = Bitcoin Stamps cost more but offer true permanence

You're paying for **guaranteed permanent storage** on the world's most secure network.


### Technical Storage Differences

**Bitcoin Stamps (UTXO Set):**
```typescript
// Data stored in actual Bitcoin outputs
{
  value: 546,                    // Minimum UTXO value
  scriptPubKey: "P2WSH output",  // Contains stamp data
  // Stored in UTXO set = permanent
}
```

**Ordinals (Witness Data):**
```typescript
// Data stored in witness section
{
  witness: ["<inscription_data>"], // Gets 75% fee discount
  // Not guaranteed on all nodes
}
```


## Node Storage Reality

**Bitcoin Stamps:**
- Stored on **100% of Bitcoin nodes** (required for UTXO validation)
- Part of Bitcoin's core blockchain state
- Cannot be pruned without breaking consensus

**Ordinals:**
- Stored on estimated **<20% of Bitcoin nodes**
- Witness data can be discarded after validation
- Many nodes run in pruned mode without witness data

*Source needed for exact node storage percentages*

## File Size and Cost Relationship

**Transaction Limits:**
- **Standard relay**: 100KB per transaction (Bitcoin Core default)
- **Non-standard**: Up to 1MB per transaction (node-dependent) 
- **SRC-721 recursive**: Unlimited through layer composition

**Cost Examples (at 20 sats/vB):**
- **Small stamp (10KB)**: 15-30k sats ($3-6 at $20k BTC)
- **Large stamp (50KB)**: 50-100k sats ($10-20 at $20k BTC)
- **Max single tx (100KB)**: 100-200k sats ($20-40 at $20k BTC)
- **SRC-20 token deploy**: 20-40k sats ($4-8 at $20k BTC)

**Cost Impact:**
- Larger files = higher Bitcoin network fees
- Use OLGA P2WSH storage for optimal efficiency
- Consider SRC-721 for large collections (shared layers)

*Costs vary with Bitcoin network conditions*

## Value Proposition

**Why Pay More for Bitcoin Stamps?**
- **True permanence**: Guaranteed storage on all Bitcoin nodes
- **Maximum security**: Protected by Bitcoin's full consensus
- **No ongoing costs**: One-time payment for permanent storage
- **Universal accessibility**: Retrievable from any Bitcoin node

**When Ordinals Might Be Better:**
- **Lower cost tolerance**: When price is the primary concern
- **Temporary storage**: When permanence isn't critical
- **Experimental use**: For testing or temporary applications

## Getting Started



**Creating Your First Bitcoin Stamp:**
1. **[Visit Stampchain.io →](https://stampchain.io)** - User-friendly interface
2. **Upload your image** - Tool will estimate costs
3. **Pay the Bitcoin fee** - For permanent storage on Bitcoin
4. **Own forever** - Your stamp is permanently on Bitcoin


**Integration Options:
- **[TX-Builder SDK →](https://github.com/btc-stamps/tx-builder)** - Build applications
- **[API Documentation →](/en/tutorials/api-integration)** - Query stamp data
- **[Cost Estimation →](/en/tutorials/sdk-integration)** - Calculate fees programmatically


---

*Bitcoin Stamps offer maximum permanence through UTXO storage, while Ordinals provide lower-cost witness data storage. Choose based on your permanence and budget requirements.*