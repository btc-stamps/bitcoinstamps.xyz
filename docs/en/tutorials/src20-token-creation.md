---
title: "SRC-20 Token Creation Guide"
description: "Complete technical guide for creating SRC-20 tokens using the @btc-stamps/tx-builder SDK"
leoType: "tutorial"
audience: "dual"
mentions: ["src-20", "tx-builder", "token-creation", "bitcoin-stamps"]
economicImpact: "tokenization-empowerment"
---

# SRC-20 Token Creation Guide

<SmartStructuredData />

Create SRC-20 fungible tokens on Bitcoin using three simple operations: DEPLOY, MINT, and TRANSFER.

## Web Interface (No Code)

1. Visit [stampchain.io/create-token](https://stampchain.io/create-token)
2. Enter token details (ticker, supply, mint limit)
3. Connect wallet and pay Bitcoin fees
4. Token is deployed automatically

**Example Token:**
- Ticker: `MYART` (4 letters max)
- Supply: `100,000` 
- Mint Limit: `100` (prevents whale dominance)

## SDK Implementation

```bash
npm install @btc-stamps/tx-builder
```

```typescript
import { TxBuilder } from '@btc-stamps/tx-builder';

const txBuilder = new TxBuilder({ network: 'mainnet' });

// Deploy token
const deployTx = await txBuilder.src20.deploy({
  ticker: 'MYART',
  max: '100000',
  limit: '100'
});

// Mint tokens
const mintTx = await txBuilder.src20.mint({
  ticker: 'MYART', 
  amount: '100'
});

// Transfer tokens
const transferTx = await txBuilder.src20.transfer({
  ticker: 'MYART',
  amount: '50',
  destination: 'bc1q...'
});
```

### Protocol Operations

SRC-20 uses JSON data stored on Bitcoin:

```typescript
interface SRC20Operation {
  p: 'SRC-20';
  op: 'DEPLOY' | 'MINT' | 'TRANSFER';
  tick: string;        // 4-letter ticker
  max?: string;        // Total supply (DEPLOY)
  lim?: string;        // Mint limit (DEPLOY)
  amt?: string;        // Amount (MINT/TRANSFER)
}
```

## Fair Launch Principles

Follow <EntityMention entity="kevin" variant="cultural">KEVIN's</EntityMention> successful model:

- **No Pre-mining**: Creator gets tokens same way as everyone else
- **Reasonable Supply**: Not too high (devaluation) or too low (limits access)
- **Fair Mint Limits**: Allow broad participation, prevent whale accumulation
- **Authentic Purpose**: Build genuine community value

## Common Token Patterns

**Community Tokens** (like <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>):
- Supply: 21,000,000 (Bitcoin-inspired)
- Mint Limit: 1,000 (accessible participation)

**Art Tokens**:
- Supply: 1,000-10,000 (limited editions)
- Mint Limit: 1-10 (exclusive access)

**Utility Tokens**:
- Supply: Matches intended usage
- Mint Limit: Based on user needs

## Infrastructure & APIs

Bitcoin Stamps tokens require:
- **Counterparty node** for protocol processing
- **Open-source stamps indexer** for data extraction
- **API access** via [stampchain.io/api](https://stampchain.io/api) for token data and balances

Developers can run their own indexer or use existing API endpoints for token information and transaction history.

## Economics & Costs

**Transaction Costs:**
- Deploy: ~$4-8 (20-40k sats)
- Mint: ~$2-4 (10-20k sats) 
- Transfer: ~$1-3 (5-15k sats)

*Costs vary with Bitcoin network congestion*

## Launch Strategy

1. **Test on testnet** first
2. **Share concept** with community
3. **Deploy token** on mainnet
4. **Enable community minting**
5. **Build real utility and value**

## Resources

- **[SRC-20 Protocol →](/en/protocols/src-20)** - Technical specification
- **[API Integration →](/en/tutorials/api-integration)** - Token data access
- **[Community Values →](/en/narratives/community-values)** - Fair launch principles
- **[Create Token →](https://stampchain.io/create-token)** - Web interface

---

*Create tokens responsibly following fair launch principles established by <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> and the Bitcoin Stamps community.*