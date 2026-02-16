---
title: "Stamps Improvement Proposals (SIPs)"
description: "Official registry and implementation roadmap for Bitcoin Stamps protocol improvements including conditional transfers, bridges, privacy features, and native AMM"
leoType: "protocol-overview"
audience: "both"
mentions: ["src-20", "kevin", "reinamora", "olga"]
culturalSignificance: "high"
protocols: ["src-20"]
---

# Stamps Improvement Proposals (SIPs)

The Stamps Improvement Proposal process provides a structured framework for proposing, reviewing, and activating protocol-level changes to the Bitcoin Stamps ecosystem. Each SIP coordinates implementation across indexers to maintain consensus.

## What is a SIP?

A SIP (Stamps Improvement Proposal) is required for changes that affect **protocol consensus** — meaning all indexers must implement the change identically for consistent behavior across the ecosystem.

SIPs are needed for:
- New <EntityMention entity="src-20" variant="technical">SRC-20</EntityMention> operations (conditional transfers, bridges, refunds)
- New fields on existing operations (hashlock, timelock)
- New encoding methods (binary formats, P2WSH structures)
- Cross-chain bridge protocols

SIPs are NOT needed for indexer-only optimizations, API features, or bug fixes that don't change consensus behavior.

**Process Document**: [SIP-0000](https://github.com/stampchain-io/btc_stamps/issues/686) defines the complete proposal lifecycle and review process.

## SIP Registry

Current protocol proposals and their implementation status:

| SIP | Title | Status | GitHub Issue |
|-----|-------|--------|--------------|
| [SIP-0000](https://github.com/stampchain-io/btc_stamps/issues/686) | Stamps Improvement Proposal Process | Active | [#686](https://github.com/stampchain-io/btc_stamps/issues/686) |
| [SIP-0001](https://github.com/stampchain-io/btc_stamps/issues/685) | SRC-20 Conditional Transfers (Hashlock/Timelock) | Draft | [#685](https://github.com/stampchain-io/btc_stamps/issues/685) |
| [SIP-0002](https://github.com/stampchain-io/btc_stamps/issues/484) | SRC-20 UTXO Binding & Transfer Format v2.0 | Superseded | [#484](https://github.com/stampchain-io/btc_stamps/issues/484) |
| [SIP-0003](https://github.com/stampchain-io/btc_stamps/issues/485) | SRC-20 Cross-Chain Bridge Specification | Draft | [#485](https://github.com/stampchain-io/btc_stamps/issues/485) |
| [SIP-0004](https://github.com/stampchain-io/btc_stamps/issues/687) | Shielded SRC-20 — Privacy Extension (Phased) | Draft | [#687](https://github.com/stampchain-io/btc_stamps/issues/687) |
| [SIP-0005](https://github.com/stampchain-io/btc_stamps/issues/688) | Binary Transfer Format for SRC-20 | Draft | [#688](https://github.com/stampchain-io/btc_stamps/issues/688) |
| [SIP-0006](https://github.com/stampchain-io/btc_stamps/issues/689) | Native SRC-20 AMM (Automated Market Maker) | Draft | [#689](https://github.com/stampchain-io/btc_stamps/issues/689) |
| [SIP-0008](https://github.com/stampchain-io/btc_stamps/issues/692) | Dual Transaction Parsing — Combined SRC-20 Transfer + Stamp Issuance | Draft | [#692](https://github.com/stampchain-io/btc_stamps/issues/692) |

### Status Definitions

- **Active**: Process document in effect
- **Draft**: Proposal written, open for initial feedback
- **Review**: Specification complete, formal review in progress
- **Accepted**: Specification agreed, activation block pending
- **Activated**: Activation block set, countdown in progress
- **Final**: Live on mainnet, all indexers processing
- **Superseded**: Replaced by a newer SIP
- **Withdrawn**: Author abandoned
- **Rejected**: Community consensus against implementation

## Implementation Roadmap

Strategic phasing ensures each foundation is battle-tested before dependent features build upon it.

### Phase 1: Foundation (Weeks 1-10)

```
SIP-0001 (HTLC)        SIP-0005 (Binary Format)   SIP-0008 (Dual Parsing)
3-4 weeks               2 weeks                     2-3 weeks
No dependencies         No dependencies             Soft dep: SIP-0005
║                       │                           │
║  Unlocks: atomic      │  Unlocks: ~60% fee        │  Unlocks: combined
║  swaps, escrow,       │  reduction for all         │  SRC-20 + stamp ops
║  oracle integration,  │  transfer operations       │  in a single tx
║  trustless deposits   │                           │
```

**SIP-0001** provides hashlock/timelock capabilities for conditional transfers, enabling atomic swaps and escrow without trusted intermediaries.

**SIP-0005** introduces binary encoding to reduce transaction costs by approximately 60% across all <EntityMention entity="src-20" variant="technical">SRC-20</EntityMention> operations.

**SIP-0008** enables a single Bitcoin transaction to carry both an SRC-20 transfer and a stamp issuance, reducing fees and enabling atomic combined operations. Originally proposed by DerpHerpenstein in [#554](https://github.com/stampchain-io/btc_stamps/issues/554).

### Phase 2: Core Trading (Weeks 6-14)

```
SIP-0006 Phase 1 (AMM)
4-6 weeks
No hard dependencies (SIP-0005 recommended)
║
║  Unlocks: SRC-20/SRC-20 token swaps,
║  liquidity pools, LP tokens, price oracle
```

**SIP-0006 Phase 1** creates native on-chain liquidity for <EntityMention entity="src-20" variant="technical">SRC-20</EntityMention> tokens with automated market maker functionality. Includes liquidity provider tokens and integrated price oracle.

### Phase 3: Cross-Chain (Weeks 10-22)

```
SIP-0003 (Bridge)
6-8 weeks
Benefits from SIP-0001 (HTLC for trustless deposits)
║
║  Unlocks: SRC-20 ↔ EVM connectivity,
║  wrapped assets on Base/Ethereum
```

**SIP-0003** enables cross-chain bridges connecting <EntityMention entity="src-20" variant="technical">SRC-20</EntityMention> tokens with EVM chains like Base and Ethereum. Enhanced security when combined with SIP-0001 hashlock capabilities.

### Phase 4: Wrapped Assets & BTC Pools (Weeks 18-28)

```
SIP-0007 (Wrapped Asset Standard) [future — not yet drafted]
3-4 weeks
Requires: SIP-0003 (bridge), SIP-0001 (HTLC)
║
╠══► SIP-0006 Phase 2 (wBTC AMM Pools)  — 2-3 weeks
║    Requires: SIP-0007, SIP-0001
║    Gating: SIP-0006 Phase 1 stable for 1000+ blocks
║
╚══► SIP-0006 Phase 3 (Stablecoin Pools) — 2-3 weeks
     Requires: SIP-0007, SIP-0003 bridge operational
     Gating: SIP-0006 Phase 2 live, bridge security audit
```

**SIP-0007** (future) will define the wrapped asset standard for wBTC, wUSDT, and other external assets, enabling Bitcoin-native liquidity pools.

**SIP-0006 Phases 2-3** extend the AMM with wrapped BTC pools and stablecoin liquidity after security validation.

### Phase 5: Privacy (Independent Track)

```
SIP-0004 Phase 1 (Stealth Addresses) — 2-3 months
SIP-0004 Phase 2 (Bulletproofs) — 6-8 months, gated on adoption
SIP-0004 Phase 3 (ZK Shielded Pool) — 12-18 months, conditional
No hard dependencies on other SIPs (independent track)
```

**SIP-0004** introduces privacy features in three phases, from basic stealth addresses to full zero-knowledge shielded pools. Progresses independently of trading infrastructure.

## Recommended Implementation Order

| Priority | SIP | Effort | Hard Dependencies | Soft Dependencies |
|----------|-----|--------|-------------------|-------------------|
| **1** | SIP-0001 (HTLC) | 3-4 weeks | None | — |
| **2** | SIP-0005 (Binary Format) | 2 weeks | None | — |
| **3** | SIP-0008 (Dual Parsing) | 2-3 weeks | None | SIP-0005 (binary encoding) |
| **4** | SIP-0006 Phase 1 (AMM) | 4-6 weeks | None | SIP-0005 (fee savings) |
| **5** | SIP-0003 (Bridge) | 6-8 weeks | None | SIP-0001 (trustless deposits) |
| **6** | SIP-0007 (Wrapped Assets) | 3-4 weeks | SIP-0001, SIP-0003 | — |
| **7** | SIP-0006 Phase 2 (wBTC) | 2-3 weeks | SIP-0007, SIP-0006 Ph1 | SIP-0001 (wrapping) |
| **8** | SIP-0006 Phase 3 (Stables) | 2-3 weeks | SIP-0007, SIP-0003 | SIP-0006 Ph2 stable |
| **—** | SIP-0004 (Privacy) | 2-18 months | None | Independent, phased |

**Parallel Development**: SIP-0001, SIP-0005, and SIP-0008 can be developed concurrently as they have no hard dependencies on each other (SIP-0008 has a soft dependency on SIP-0005 for binary encoding benefits).

## Gating Criteria Between Phases

Strategic checkpoints ensure stability before adding complexity:

| Gate | Condition | Rationale |
|------|-----------|-----------|
| Phase 1 → Phase 2 | SIP-0001 live for 2000+ blocks (~2 weeks) | HTLC must be battle-tested before AMM dependencies |
| Phase 2 → Phase 3 | SIP-0006 Phase 1 stable for 1000+ blocks | AMM core proven before cross-chain integration |
| Phase 3 → Phase 4 | SIP-0003 bridge operational, security audited | Bridge custody is high-risk — requires validation |
| Phase 4 → wBTC pools | Multi-sig custody operational, 2+ indexers | wBTC wrapping requires trust infrastructure |
| Phase 4 → Stable pools | Bridge TVL > 0, wBTC pools stable | Stablecoins depend on proven bridge + wrapped pattern |
| Privacy Phase 1 → 2 | ≥1000 active addresses using stealth | Privacy features need anonymity set for effectiveness |

## Future Protocol Extensions

These extensions are planned but not yet formally drafted:

| Future SIP | Purpose | Prerequisite |
|------------|---------|--------------|
| **SIP-0007** (Wrapped Assets) | wBTC/wUSDT mint/burn protocol, custody model | SIP-0003 bridge architecture |
| **Concentrated Liquidity** | Uniswap V3-style capital efficiency | SIP-0006 Phase 1 proven stable |
| **Multi-hop Router** | A→B→C swaps in single operation | Multiple active AMM pools |
| **Governance** | Protocol fee distribution, parameter changes | Ecosystem maturity |

## Indexer Coordination

SIPs that change consensus behavior require coordination across multiple indexers:

- **stampchain** (primary indexer): Must implement for activation
- **OpenStamp**: Should implement for ecosystem consistency
- **Future indexers**: Implementation encouraged but not blocking

For a SIP to reach **Accepted** status:
- stampchain team approves the specification
- At least one other indexer acknowledges the specification
- No unresolved security concerns remain

Activation blocks are coordinated with minimum 4 weeks lead time to allow all indexers to prepare.

## Getting Involved

The SIP process is open to all community members:

1. **Discuss** — Join conversations in GitHub issues for active SIPs
2. **Propose** — Create new protocol proposals following the [SIP-0000 format](https://github.com/stampchain-io/btc_stamps/issues/686)
3. **Review** — Provide technical feedback on specifications
4. **Implement** — Build indexer support for accepted proposals

**GitHub Repository**: [stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps)

---

*The SIP process is intentionally lightweight — enough structure to coordinate across indexers without slowing down innovation.*
