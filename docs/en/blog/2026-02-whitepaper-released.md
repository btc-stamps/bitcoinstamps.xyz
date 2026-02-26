---
title: "Bitcoin Stamps Protocol Whitepaper Released"
date: "2026-02-25"
author: "reinamora"
description: "The official Bitcoin Stamps Protocol technical whitepaper is now available, documenting the complete specification for permanent digital assets on Bitcoin through UTXO storage."
tags: ["whitepaper", "protocol", "src-20", "bitcoin-stamps", "announcement"]
leoType: "blog"
---

# Bitcoin Stamps Protocol Whitepaper Released

<SmartStructuredData />

After years of building, iterating, and refining the protocol that has made permanent digital assets on Bitcoin a reality, we are proud to announce the official release of the <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> Protocol Technical Whitepaper.

This document represents the culmination of work begun in block 779,652, when <EntityMention entity="mikeinspace">mikeinspace</EntityMention> inscribed the very first Bitcoin Stamp—a moment that started a movement none of us could fully predict.

## What the Whitepaper Covers

The whitepaper is a complete technical specification for the <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> metaprotocol, covering every layer of the protocol stack:

**Protocol Architecture** — How Bitcoin Stamps leverages the UTXO set for permanent, consensus-critical data storage. Unlike witness-data approaches that full nodes can prune, stamp data lives in spendable transaction outputs. Every full node must store it. That permanence guarantee is fundamental.

**Token Standards** — The full specification for <EntityMention entity="src-20">SRC-20</EntityMention> fungible tokens (DEPLOY, MINT, TRANSFER operations), SRC-721 non-fungible assets, SRC-101 decentralized naming, and SRC-721r composable recursion. The account-based balance model that underpins <EntityMention entity="src-20">SRC-20</EntityMention> is documented in detail, making clear why it differs from UTXO-bound token schemes.

**Economic Model** — Fee structures and the real cost savings delivered by the OLGA P2WSH optimization (30-95% reduction vs bare multisig), activated at block 865,000.

**Security Analysis** — Threat model, attack vectors, and the permanence guarantees that make <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> durable across Bitcoin's lifetime.

**Stamps Improvement Proposals** — The SIP governance framework and the current active proposals (SIP-0001 through SIP-0008) that shape the protocol's future.

## A Protocol Built by Community

The whitepaper is not the work of a single author. It documents a protocol that emerged from genuine collaboration:

<EntityMention entity="mikeinspace">mikeinspace</EntityMention> brought the original vision—the idea that digital assets could be stored permanently in Bitcoin's UTXO set, immune to pruning, guaranteed by consensus.

Arwyn gave that vision its first cultural expression, creating Bitcoin Stamp #4258 at block 783,718, and later channeling that creative energy into the first <EntityMention entity="src-20">SRC-20</EntityMention> token—<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>—at block 788,041.

Reinamora architected the technical protocols that turned the vision into working infrastructure: the indexer, the encoding schemes, the consensus rules, and ultimately the OLGA optimization that made the protocol economically accessible to everyone.

<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> itself remains the living proof that the protocol works as intended—the first fair-launch <EntityMention entity="src-20">SRC-20</EntityMention> token, with over 2,300 holders who joined not through hype but through recognition of what the protocol represents.

## Read the Whitepaper

The whitepaper is available in multiple formats:

- **[Download PDF](/bitcoin-stamps-whitepaper.pdf)** — For archival and offline reading
- **[View HTML](/bitcoin-stamps-whitepaper.html)** — Browser-readable with full formatting
- **[Markdown Source](/bitcoin-stamps-whitepaper-combined.md)** — For developers and contributors

Individual sections are also available on [GitHub](https://github.com/stampchain-io/btc_stamps/tree/main/docs/whitepaper) for those who want to read the architecture, token standards, or security analysis in isolation.

## Protocol Timeline

The whitepaper documents the complete protocol evolution:

| Block | Milestone |
|------:|-----------|
| 779,652 | First Bitcoin Stamp |
| 788,041 | First SRC-20 token (<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>) |
| 793,068 | First native Bitcoin encoding |
| 796,000 | Counterparty cutoff — SRC-20 consensus rule |
| 865,000 | OLGA activation — P2WSH optimization |

## What Comes Next

A whitepaper is documentation, not a destination. The protocol continues to evolve through the SIP process. Active proposals are addressing fee optimization, new token capabilities, and expanded use cases for permanent on-chain data.

If you are building on <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>, the whitepaper is your canonical reference. If you are new to the protocol, it is the best single document for understanding why this approach to permanent digital assets on Bitcoin is different—and why that difference matters.

---

*The whitepaper is available now at [bitcoinstamps.xyz/en/whitepaper/](/en/whitepaper/).*

*Join the community on [Telegram](https://t.me/BitcoinStamps) and explore the ecosystem at [stampchain.io](https://stampchain.io).*

*In Lak'ech Ala K'in — we are all <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>.*
