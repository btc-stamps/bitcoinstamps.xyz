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

<SipRegistry />

## Getting Involved

The SIP process is open to all community members:

1. **Discuss** — Join conversations in GitHub issues for active SIPs
2. **Propose** — Create new protocol proposals following the [SIP-0000 format](https://github.com/stampchain-io/btc_stamps/issues/686)
3. **Review** — Provide technical feedback on specifications
4. **Implement** — Build indexer support for accepted proposals

**GitHub Repository**: [stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps)

---

*The SIP process is intentionally lightweight — enough structure to coordinate across indexers without slowing down innovation.*
