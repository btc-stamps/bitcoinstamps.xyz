---
title: "The Stamps Indexer Goes Open Source"
date: "2024-06-24"
author: "reinamora"
description: "On June 24, 2024, the core developers open-sourced the full Bitcoin Stamps indexer, covering Classic Stamps, OLGA, SRC-20, SRC-721, and SRC-101 support."
tags: ["history", "indexer", "open-source", "milestone"]
leoType: "blog"
---

# The Stamps Indexer Goes Open Source

On June 24, 2024, the core developers open-sourced the full <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> indexer. The complete code that reads the chain and reconstructs stamp state became public, and that's a bigger deal than it might sound.

## Why an indexer matters

Bitcoin Stamps data lives in the UTXO set, but Bitcoin nodes don't know what a stamp is. They see transaction outputs, not art or token balances. Something has to read the raw chain, find the stamp transactions, decode them, and build the ledger of what exists and who holds it. That something is the indexer.

If the indexer is closed, the community has to trust one party's word about the true state of the protocol. Open-sourcing it removes that trust requirement. Anyone can run the same code, index from genesis, and check the answer for themselves.

## What the release covers

The open-source indexer handles the full standard family:

- **Classic Stamps**, the original bare-multisig art.
- **<EntityMention entity="olga">OLGA</EntityMention>**, the P2WSH encoding that cut size and fees.
- **<EntityMention entity="src-20">SRC-20</EntityMention>** fungible tokens, including the native encoding rules.
- **SRC-721** composable NFTs.
- **<EntityMention entity="src-101">SRC-101</EntityMention>** decentralized naming.

That's every consensus-relevant path in one codebase, so a single run can validate the whole protocol against the chain.

## Verifiable by anyone

Open source turns claims into things you can test. When a release says it's consensus-validated, you don't have to take it on faith. You pull the code, reparse from block 779,652, and compare hashes. That discipline is what later releases build on, right through the from-genesis reparse gate the project still uses.

Open-sourcing the indexer put <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> where a permanence-first protocol should be: fully inspectable, independently runnable, and owned by its community rather than any one team.

---

*The indexer lives at [stampchain-io/btc_stamps on GitHub](https://github.com/stampchain-io/btc_stamps). Explore the ecosystem at [stampchain.io](https://stampchain.io).*
