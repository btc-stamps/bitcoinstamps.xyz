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

## Abstract

Bitcoin Stamps is a metaprotocol for creating permanent, immutable digital assets on Bitcoin through direct UTXO storage. Unlike witness-data approaches, Bitcoin Stamps embed asset data in transaction outputs using bare multisig and P2WSH encoding, ensuring universal node storage and consensus-critical permanence.

The protocol evolved from Counterparty foundations (block 779,652) through native Bitcoin encoding (block 793,068) to P2WSH optimization via OLGA (block 865,000). Built on account-based asset tracking, Bitcoin Stamps support fungible tokens (SRC-20), non-fungible assets (base stamps), decentralized naming (SRC-101), and composable recursion (SRC-721).

**Core Innovation**: Leveraging Bitcoin's UTXO set for permanent data storage, making asset data consensus-critical and unprunable. All full nodes must store stamp data to validate transactions, guaranteeing permanence as long as Bitcoin exists.

**Key Properties**:
- **UTXO-based permanence**: Data stored in spendable outputs, not witness segments
- **Consensus-critical storage**: Required for transaction validation across all nodes
- **Account-based assets**: Counterparty-style balance tracking, not UTXO-bound tokens
- **Multi-protocol support**: Extensible architecture for tokens, names, and recursion
- **Cost-optimized encoding**: OLGA P2WSH reduces fees 30-95% vs bare multisig

## Download Whitepaper

**Full PDF Document** (recommended for offline reading and citation):

<div style="margin: 30px 0; padding: 20px; background: var(--vp-c-bg-soft); border-radius: 8px; text-align: center;">
  <p style="font-size: 18px; margin-bottom: 15px;">📄 <strong>Bitcoin Stamps Technical Whitepaper</strong></p>
  <p style="margin-bottom: 15px;">Complete specification including architecture, token standards, economics, and implementation details</p>
  <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
    <a href="/bitcoin-stamps-whitepaper.pdf" download style="display: inline-block; padding: 12px 24px; background: var(--vp-c-brand); color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
      Download PDF →
    </a>
    <a href="/bitcoin-stamps-whitepaper.html" target="_blank" style="display: inline-block; padding: 12px 24px; background: var(--vp-c-brand-dark); color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
      View HTML →
    </a>
    <a href="/bitcoin-stamps-whitepaper-combined.md" download style="display: inline-block; padding: 12px 24px; border: 1px solid var(--vp-c-brand); color: var(--vp-c-brand); text-decoration: none; border-radius: 6px; font-weight: 600;">
      Markdown Source →
    </a>
  </div>
</div>

## Individual Sections

Read specific sections directly on GitHub for the most up-to-date content:

### 1. [Introduction](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/introduction.md)
Protocol motivation, historical evolution from Counterparty origins through native encoding to P2WSH optimization. Covers the genesis at block 779,652 through OLGA activation at block 865,000.

### 2. [Protocol Architecture](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/architecture.md)
Technical architecture covering UTXO storage model, bare multisig vs P2WSH encoding mechanisms, and account-based asset tracking. Details the separation between data encoding layer and asset management layer.

### 3. [Token Standards](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/token-standards.md)
Complete specifications for SRC-20 (fungible tokens), SRC-721 (recursive NFTs), SRC-721r (recursion), and SRC-101 (decentralized naming). Includes DEPLOY, MINT, and TRANSFER operations for each standard.

### 4. [Economic Model](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/economics.md)
Fee structures, UTXO permanence economics, storage cost analysis comparing bare multisig vs P2WSH encoding, and long-term sustainability considerations.

### 5. [Stamps Improvement Proposals](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/improvement-proposals.md)
SIP governance framework and active proposals including SIP-0001 (Conditional Transfers/HTLC), SIP-0003 (Cross-Chain Bridge), SIP-0004 (Privacy/Shielded SRC-20), SIP-0005 (Binary Transfer Format), SIP-0006 (Native AMM), and SIP-0008 (Dual Transaction Parsing). SIP-0002 (UTXO Binding) is superseded by SIP-0001.

### 6. [Implementation](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/implementation.md)
Indexer architecture, consensus mechanisms, validation logic, and reference implementation details. Covers block parsing, transaction validation, and state management.

### 7. [Security Analysis](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/security.md)
Threat model, attack vectors, permanence guarantees, and immutability analysis. Examines consensus-level security and protocol-level protections.

### 8. [Future Work](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/future.md)
Research directions and SIP roadmap summary. Points to the Stamps Improvement Proposal (SIP) process for detailed specifications of conditional transfers, privacy, bridges, and other protocol extensions.

## Quick Reference

**Genesis Block**: 779,652 (March 29, 2023) — First Bitcoin Stamp by <EntityMention entity="mikeinspace">mikeinspace</EntityMention>
**Native Encoding**: 793,068 (April 20, 2023) — Direct Bitcoin encoding begins
**Counterparty Cutoff**: 796,000 (August 15, 2023) — SRC-20 consensus rule
**OLGA Activation**: 865,000 (October 15, 2023) — P2WSH optimization available

**Foundation**: Built on Counterparty protocol (est. 2014) for proven account-based asset tracking
**Storage Model**: UTXO-based (consensus-critical, unprunable)
**Asset Model**: Account-based (balances tracked per address, not per UTXO)

## Citation

When citing this whitepaper, please use:

```
Bitcoin Stamps Community (2026). Bitcoin Stamps Protocol: A Technical Whitepaper.
Version 1.0. Retrieved from https://bitcoinstamps.xyz/en/whitepaper/
```

## Community and Development

- **GitHub Repository**: [stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps)
- **Telegram**: [t.me/BitcoinStamps](https://t.me/BitcoinStamps) — Community hub
- **Community Hub**: [Bitcoin Stamps Community](/en/community/)
- **Protocol Documentation**: [Protocols Overview](/en/protocols/)
- **Development Tutorials**: [Developer Guides](/en/tutorials/)

---

*This whitepaper serves as the canonical technical specification for Bitcoin Stamps protocol. All implementations should reference this document for protocol compliance and consensus rules.*
