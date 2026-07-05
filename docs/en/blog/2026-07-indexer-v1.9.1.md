---
title: "Bitcoin Stamps Indexer v1.9.1 Released"
date: "2026-07-04"
author: "reinamora"
description: "The v1.9.1 indexer release activates SRC-101 P2WSH/OLGA encoding at block 940,000, adds a market-data and webhook layer, and passes a full genesis-to-tip consensus re-validation proven hash-identical to the production ledger."
tags: ["indexer", "release", "src-101", "olga", "consensus", "announcement"]
leoType: "blog"
---

# Bitcoin Stamps Indexer v1.9.1 Released

The Bitcoin Stamps Indexer **v1.9.1** is out. It is the 1.9 feature line: a consensus-validated set of protocol activations and hardening, including <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH/OLGA encoding, a new market-data and webhook layer, a Rust-accelerated parse path, and a full genesis-to-tip consensus re-validation.

Every consensus-affecting change is activation-gated or flag-gated (default off), and the release was proven **hash-identical to the production ledger** through a from-genesis reparse. Full release notes and the Docker image are on GitHub: [stampchain-io/btc_stamps release 1.9.1](https://github.com/stampchain-io/btc_stamps/releases/tag/1.9.1).

## Highlights

- **<EntityMention entity="src-101">SRC-101</EntityMention> P2WSH / <EntityMention entity="olga">OLGA</EntityMention> encoding** activates at **block 940,000**. Before activation, SRC-101 is supported via bare multisig only; after activation, both bare multisig and P2WSH work, differentiated at the JSON level (`"p":"src-101"`).
- **SRC-721R deploy detection** for P2WSH transactions, recursive SRC-721 description parsing, and safer dual processing for cursed stamps.
- **Market data and sales history**: a multi-source cache (KuCoin, StampScan) with confidence-weighted averaging, holder caches, and a sales-history pipeline covering dispensers, atomic swaps, OTC, and auctions.
- **Real-time webhooks** for new blocks and reorgs, with SSRF protection, and non-blocking by design so notifications never affect indexing.
- **Performance**: a Rust-accelerated parse path in the main block loop, plus a CP-skip optimization that avoids Counterparty API calls on blocks with no Counterparty data (validated hash-identical).
- **A fresh bootstrap snapshot to block 956,000** is published for fast sync.

## Consensus validation

The release earns its "consensus-validated" label. A from-genesis to tip reparse on Python 3.12 matched the production ledger hash-for-hash: txlist and ledger hashes agreed across all 176,328 blocks, verified with per-block reference checks. All consensus-adjacent dependency bumps passed the same reparse gate.

## Interpreter support (important)

Run the indexer on **Python 3.10, 3.11, or 3.12**. Consensus is proven byte-identical across those three. **Do not run on Python 3.13**: it tightened `base64`/`binascii` decoding and diverges from consensus at block 783,775 (a stamp mis-classification). The published `btcstamps/indexer:1.9.1` image is built on Python 3.12, the certified runtime.

## Upgrade notes

- **Requires Counterparty `v11.0.1+`** (for the CP V2 API endpoint fix).
- Apply the new schema (market-data, holder-cache, and sales-history tables plus a `fee_rate_sat_vb` column and new indexes).
- Use the bootstrap snapshot to block 956,000 on S3 for a fast initial sync.

This release keeps the same discipline that has defined <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> from block 779,652 onward: new features land behind activation heights, and consensus is proven against the real chain before anything ships.
