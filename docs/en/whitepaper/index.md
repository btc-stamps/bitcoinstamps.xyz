---
title: "Bitcoin Stamps Protocol: Technical Whitepaper"
description: "Complete technical specification for Bitcoin Stamps metaprotocol - permanent digital assets on Bitcoin through UTXO storage"
leoType: "whitepaper"
audience: "unified"
culturalSignificance: "high"
mentions: ["bitcoin-stamps", "src-20", "src-721", "src-101", "olga", "counterparty", "utxo", "p2wsh", "whitepaper"]
category: "technical-specification"
---

<SmartStructuredData />

# Bitcoin Stamps Protocol: Technical Whitepaper

<div style="margin: 1.5rem 0 2.5rem; padding: 1.5rem 1.75rem; background: var(--vp-c-bg-soft); border-left: 4px solid var(--vp-c-brand-1); border-radius: 0 8px 8px 0;">

**Core Innovation** &mdash; Leveraging Bitcoin's UTXO set for permanent data storage, making asset data consensus-critical and unprunable. All full nodes must store stamp data to validate transactions, guaranteeing permanence as long as Bitcoin exists.

</div>

## Abstract

Bitcoin Stamps is a metaprotocol for creating permanent, immutable digital assets on Bitcoin through direct UTXO storage. Unlike witness-data approaches, Bitcoin Stamps embed asset data in transaction outputs using bare multisig and P2WSH encoding, ensuring universal node storage and consensus-critical permanence.

The protocol evolved from Counterparty foundations (block 779,652) through native Bitcoin encoding (block 793,068) to P2WSH optimization via OLGA (block 865,000). Built on account-based asset tracking, Bitcoin Stamps support fungible tokens (SRC-20), non-fungible assets (base stamps), decentralized naming (SRC-101), and composable recursion (SRC-721).

| Property | Description |
|----------|-------------|
| **UTXO-based permanence** | Data stored in spendable outputs, not witness segments |
| **Consensus-critical storage** | Required for transaction validation across all nodes |
| **Account-based assets** | Counterparty-style balance tracking, not UTXO-bound tokens |
| **Multi-protocol support** | Extensible architecture for tokens, names, and recursion |
| **Cost-optimized encoding** | OLGA P2WSH reduces fees 30-95% vs bare multisig |

---

## Download

<div style="margin: 1.5rem 0; padding: 1.75rem; background: var(--vp-c-bg-soft); border-radius: 8px; text-align: center;">
  <p style="font-size: 1.1rem; margin-bottom: 1rem; font-weight: 600;">Bitcoin Stamps Technical Whitepaper</p>
  <p style="margin-bottom: 1.25rem; color: var(--vp-c-text-2);">Complete specification including architecture, token standards, economics, and implementation details</p>
  <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
    <a href="/bitcoin-stamps-whitepaper.pdf" download style="display: inline-block; padding: 10px 22px; background: var(--vp-c-brand-1); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">Download PDF</a>
    <a href="/bitcoin-stamps-whitepaper.html" target="_blank" style="display: inline-block; padding: 10px 22px; background: var(--vp-c-neutral); color: var(--vp-c-neutral-inverse); text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">View HTML</a>
    <a href="/bitcoin-stamps-whitepaper-combined.md" download style="display: inline-block; padding: 10px 22px; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">Markdown Source</a>
  </div>
</div>

---

## Table of Contents

Read individual sections on GitHub (canonical source):

| Section | Title | Topics |
|:-------:|-------|--------|
| 1 | [Introduction](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/introduction.md) | Protocol motivation, Counterparty origins, genesis block 779,652, OLGA activation |
| 2 | [Protocol Architecture](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/architecture.md) | UTXO storage model, bare multisig vs P2WSH encoding, account-based tracking |
| 3 | [Token Standards](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/token-standards.md) | SRC-20, SRC-721, SRC-721r, SRC-101 &mdash; DEPLOY, MINT, TRANSFER operations |
| 4 | [Economic Model](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/economics.md) | Fee structures, UTXO permanence economics, multisig vs P2WSH cost analysis |
| 5 | [Stamps Improvement Proposals](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/improvement-proposals.md) | SIP governance, active proposals (SIP-0001 through SIP-0008) |
| 6 | [Implementation](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/implementation.md) | Indexer architecture, consensus mechanisms, validation logic |
| 7 | [Security Analysis](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/security.md) | Threat model, attack vectors, permanence guarantees |
| 8 | [Future Work](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/future.md) | Research directions, SIP roadmap summary |

---

## Protocol Timeline

| Block | Date | Milestone |
|------:|------|-----------|
| 779,652 | March 29, 2023 | First Bitcoin Stamp by <EntityMention entity="mikeinspace">mikeinspace</EntityMention> |
| 788,041 | April 20, 2023 | First SRC-20 token (KEVIN) deployed by <EntityMention entity="arwyn">Arwyn</EntityMention> |
| 793,068 | April 20, 2023 | First native Bitcoin encoding (no Counterparty) |
| 796,000 | August 15, 2023 | Counterparty cutoff &mdash; SRC-20 consensus rule |
| 833,000 | &mdash; | P2WSH transactions enabled on stamps |
| 865,000 | October 15, 2023 | OLGA activation &mdash; P2WSH optimization for SRC-20 |

---

## Citation

```
Bitcoin Stamps Community (2026). Bitcoin Stamps Protocol: A Technical Whitepaper.
Version 1.0. Retrieved from https://bitcoinstamps.xyz/en/whitepaper/
```

---

## Community

| | |
|-|-|
| **GitHub** | [stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps) |
| **Telegram** | [t.me/BitcoinStamps](https://t.me/BitcoinStamps) |
| **Community** | [Bitcoin Stamps Community](/en/community/) |
| **Protocols** | [Protocol Documentation](/en/protocols/) |
| **Tutorials** | [Developer Guides](/en/tutorials/) |

---

<div style="text-align: center; color: var(--vp-c-text-2); font-style: italic; padding: 1rem 0;">

This whitepaper serves as the canonical technical specification for Bitcoin Stamps protocol.<br>
All implementations should reference this document for protocol compliance and consensus rules.

</div>
