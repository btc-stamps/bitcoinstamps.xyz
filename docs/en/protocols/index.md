---
title: "Bitcoin Stamps Protocols"
description: "Complete suite of metaprotocols enabling permanent digital assets, tokens, and decentralized services directly on the Bitcoin blockchain"
leoType: "protocol-overview"
audience: "both"
mentions: ["src-20", "src-101", "src-721", "olga", "kevin", "mikeinspace", "arwyn", "reinamora"]
culturalSignificance: "high"
protocols: ["src-20", "src-101", "src-721", "olga"]
---

# Bitcoin Stamps Protocols

Complete suite of metaprotocols enabling permanent digital assets, tokens, and services directly on Bitcoin. Started with <EntityMention entity="mikeinspace">Mikeinspace's</EntityMention> first stamp at block 779,652 and <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> as the first SRC-20 token at block 788,041.

## Protocol Architecture

```
┌─────────────────────────────────────┐
│           Applications              │
├────────────┬────────────┬───────────┤
│   SRC-20   │   SRC-721  │  SRC-101  │ ← Token Standards
├────────────┴────────────┴───────────┤
│    OLGA / P2WSH   │    MULTISIG     │ ← Encoding Layer
├───────────────────┴─────────────────┤
│          Bitcoin Blockchain         │ ← Permanent Storage
└─────────────────────────────────────┘
```

## Protocol Standards

### SRC-20 Tokens
Fungible tokens on Bitcoin. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> was the first <EntityMention entity="src-20" variant="technical">SRC-20 token</EntityMention>, demonstrating fair launch principles and community-driven growth.

**Features**: Direct Bitcoin storage, <EntityMention entity="olga">OLGA</EntityMention> encoding, community distribution

**[Complete SRC-20 Specification →](/en/protocols/src-20)**

### SRC-101 Names
Human-readable names for Bitcoin addresses and resources using the <EntityMention entity="src-101" variant="technical">SRC-101 protocol</EntityMention>.

**Features**: Decentralized resolution, address mapping, readable identity system

**[Learn About SRC-101 →](/en/protocols/src-101)**

### SRC-721 Recursion Standard
Advanced recursion capabilities allowing multiple Bitcoin Stamps to be combined into composite artwork via <EntityMention entity="src-721" variant="technical">SRC-721</EntityMention>.

**Features**: Recursive stamp references, composable art layers, multi-stamp combinations

**[Explore SRC-721 →](/en/protocols/src-721)**

### OLGA P2WSH Encoding
Encoding optimization protocol that reduces transaction costs by using P2WSH instead of bare multisig through <EntityMention entity="olga" variant="technical">OLGA</EntityMention>.

**Features**: P2WSH encoding, cost reduction, multi-protocol support

**[OLGA Technical Details →](/en/protocols/olga)**

## Getting Started

Ready to build with Bitcoin Stamps protocols?

- **[Create Your First Stamp →](/en/tutorials/creating-first-stamp)** - Start with basic stamp creation
- **[SRC-20 Token Tutorial →](/en/tutorials/src20-token-creation)** - Learn token development  
- **[SDK Integration →](/en/tutorials/sdk-integration)** - Technical implementation guide
- **[Community Resources →](/en/community/)** - Get help and support

---

*All Bitcoin Stamps protocols store data permanently on Bitcoin, ensuring your digital assets last as long as the network itself.*
