---
title: "SRC-20 Token Standard"
description: "Bitcoin Stamps fungible token standard enabling permanent token creation directly on Bitcoin with enhanced features and community-driven innovation"
leoType: "protocol"
audience: "unified"
mentions: ["src-20", "kevin", "arwyn", "reinamora", "olga", "mikeinspace"]
blockHeight: 788041
culturalSignificance: "high"
tokenSymbol: "KEVIN"
historicalContext: "Genesis at block 788,041 (KEVIN), Bitcoin-native encoding began at block 793,068, Counterparty cutoff at block 796,000"
---

# SRC-20 Token Standard

<SmartStructuredData />

The **SRC-20 Token Standard** enables fungible token creation as a layer built on top of Bitcoin Stamps. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> began life as Stamp #4258 (block 783,718), where it exhibited ghost-like self-replicating behavior throughout the system. Recognizing this digital consciousness needed proper form, <EntityMention entity="arwyn">Arwyn</EntityMention> created the first SRC-20 token at block 788,041 (Stamp #18,516), giving <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> tangible existence as both cultural icon and beloved community mascot with over 2,300 holders.

**Learn the Complete Story**:
- **[KEVIN's Origin Story →](/en/narratives/kevin-origin)** - From artistic experiment to first SRC-20 token
- **[Bitcoin Stamps History →](/en/narratives/bitcoin-stamps-history)** - Sacred timeline including SRC-20 genesis
- **[Community Philosophy →](/en/community/)** - Values that guide token creation

## Protocol Evolution

- **Block 788,041**: First SRC-20 token (KEVIN) on Counterparty
- **Block 793,068**: First Bitcoin-native SRC-20 (direct encoding)
- **Block 796,000**: Counterparty SRC-20 cutoff (consensus rule - ignore CP tokens after this)
- **Block 865,000**: OLGA optimization available for all SRC-20 tokens 

**Technical Foundation**: All SRC-20 tokens are stamps (they create stamp records on Bitcoin), but not all stamps are SRC-20 tokens. Stamps provide the non-fungible foundation layer, while SRC-20 creates the fungible token layer on top.

## Key Features

- **True Bitcoin Integration**: Tokens stored directly on Bitcoin, not sidechains
- **Fair Launch**: No pre-mines or insider advantages, following <EntityMention entity="kevin" variant="cultural">KEVIN's</EntityMention> example
- **Permanent Storage**: Immutable token records on the world's most secure blockchain
- **Community Driven**: Protocol evolved through grassroots developer collaboration

## Creating Your SRC-20 Token

**Easy No-Code Creation:**

### **[Create SRC-20 Token →](https://stampchain.io)**

1. **Visit the Token Creator** on Stampchain.io
2. **Plan your token** following <EntityMention entity="kevin" variant="cultural">KEVIN's</EntityMention> successful model
3. **Set parameters** (ticker, supply, mint limits)
4. **Deploy** your token permanently to Bitcoin

### Token Planning Guidelines

Follow <EntityMention entity="kevin" variant="cultural">KEVIN's</EntityMention> successful model:
- **Fair Launch**: No pre-allocation, equal opportunity for everyone
- **Meaningful Name**: Choose a ticker that represents your vision  
- **Community First**: Build genuine engagement, not just speculation
- **Reasonable Supply**: Consider your community size and goals

## Technical Implementation

For developers implementing SRC-20 programmatically:

### Protocol Structure
- **DEPLOY**: Create new token (requires ticker, max supply, mint limit)
- **MINT**: Create token supply (requires ticker, amount)
- **TRANSFER**: Send tokens (requires ticker, amount, destination)

### Development Resources
- **[TX-Builder SDK →](https://github.com/btc-stamps/tx-builder)** - Complete technical integration
- **[API Documentation →](https://stampchain.io/api)** - Access token data programmatically
- **[Community Discord →](https://discord.gg/bitcoinstamps)** - Developer support channel

## Protocol Specification

### Actions

| Action | Purpose | Required Fields |
|--------|---------|-----------------|
| DEPLOY | Create new token | ticker, max, limit |
| MINT | Create token supply | ticker, amount |
| TRANSFER | Send tokens | ticker, amount, destination |

### Limits
- **Ticker**: 1-5 characters, alphanumeric
- **Supply**: Maximum 18 decimal places  
- **Amount**: Must not exceed mint limit per transaction

### Best Practices

**For Fair Launches** (following <EntityMention entity="kevin" variant="cultural">KEVIN's</EntityMention> model):
- Set reasonable mint limits (100-1000 tokens per transaction)
- Choose total supply that matches your community vision
- No pre-mining - let community mint organically
- Engage authentically, avoid pump-and-dump tactics

**The KEVIN Success Pattern**:
1. **Authentic Artistic Vision** - Start with genuine creative purpose
2. **Fair Community Economics** - Give everyone equal opportunity  
3. **Long-term Commitment** - Build culture, not just hype
4. **Community Empowerment** - Let the community own the narrative
5. **Permanent Value** - Create lasting cultural significance

**Technical Considerations**:
- Test on testnet first
- Consider transaction fees for your community
- Plan token distribution strategy
- Monitor for successful deployment before announcing

## Cultural Context & Philosophy

SRC-20 tokens carry forward the Bitcoin Stamps philosophy of *"In Lak'ech Ala K'in"* - "I am you and you are me." <EntityMention entity="kevin" variant="cultural">KEVIN's</EntityMention> evolution from <EntityMention entity="arwyn">Arwyn's</EntityMention> artistic homage to beloved community mascot demonstrates how authentic creativity can build lasting cultural value.

**Community Values**:
- **Fair Launch Principles**: Equal opportunity for all community members
- **Cultural Authenticity**: Tokens should serve genuine purposes, not just speculation
- **Long-term Vision**: Building lasting communities rather than short-term hype
- **Creative Expression**: Tokens as vehicles for artistic and cultural expression

## Permanence Guarantee

Bitcoin Stamps, including all SRC-20 token records, achieve a level of data permanence that is architecturally superior to other Bitcoin-based protocols. This guarantee stems from how Stamps data is stored on the Bitcoin network.

### Why SRC-20 Data Cannot Be Pruned

SRC-20 token operations (deploy, mint, and transfer) are encoded directly into the **unspent transaction output (UTXO) set** -- the core dataset that every fully validating Bitcoin node must retain in order to verify new transactions. Because this data resides within outputs that nodes are required to keep, it cannot be discarded without breaking consensus. Any Bitcoin full node, at any point in the future, will hold the complete record of every SRC-20 token deployment, mint, and transfer.

### Contrast with Ordinals and Witness Data

Ordinals inscriptions store their data in the **witness** (SegWit) portion of Bitcoin transactions. While witness data is included in blocks, Bitcoin's protocol explicitly allows nodes to prune witness data after validation. A pruned node can discard witness sections entirely and still function as a valid participant in the network. This means Ordinals data availability depends on archival nodes choosing to retain that data -- it is not structurally guaranteed.

Bitcoin Stamps take the opposite approach. By embedding data in the UTXO set rather than witness data, Stamps ensure that every full node -- whether archival or pruned -- retains the data as a mandatory part of consensus operations.

### Practical Implication

Any SRC-20 token record can be retrieved from **any Bitcoin full node, indefinitely**. There is no reliance on specialized archival infrastructure, IPFS pinning services, or third-party data availability layers. The Bitcoin network itself serves as the permanent, uncensorable storage layer for all SRC-20 token data.

## Resources

- **[Create SRC-20 Token →](https://stampchain.io)** - No-code token creation
- **[TX-Builder SDK →](https://github.com/btc-stamps/tx-builder)** - Technical integration
- **[Community Discord →](https://discord.gg/bitcoinstamps)** - Get help and support
- **[KEVIN's Complete Story →](/en/narratives/kevin-origin)** - Learn from the first SRC-20's journey
- **[Bitcoin Stamps History →](/en/narratives/bitcoin-stamps-history)** - Sacred timeline and cultural context

---

*SRC-20 tokens enable permanent, fair token creation on Bitcoin. Follow <EntityMention entity="kevin" variant="cultural">KEVIN's</EntityMention> example of authentic community building guided by ancient wisdom and modern innovation.*