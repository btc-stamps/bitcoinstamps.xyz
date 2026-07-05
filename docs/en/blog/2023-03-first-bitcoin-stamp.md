---
title: "The First Bitcoin Stamp"
date: "2023-03-07"
author: "reinamora"
description: "On March 7, 2023, at block 779,652, mikeinspace created Stamp 0 and started the Bitcoin Stamps protocol: permanent art stored directly in Bitcoin's UTXO set."
tags: ["history", "bitcoin-stamps", "milestone", "genesis"]
leoType: "blog"
---

# The First Bitcoin Stamp

On March 7, 2023, at block 779,652, <EntityMention entity="mikeinspace">mikeinspace</EntityMention> created Stamp 0. It's a small piece of laser-eyes pixel art, and it's the genesis of the <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> protocol.

Stamp 0 wasn't just a picture on the chain. It was a proof of a different idea about where digital art should live.

## Why the UTXO set matters

Most on-chain art approaches store data in places a full node can drop later. Witness data can be pruned. Off-chain references can rot when the host goes away. <EntityMention entity="mikeinspace">mikeinspace</EntityMention> wanted something stronger: art that every full node has to keep, forever, because it's part of the spendable state of Bitcoin.

Bitcoin Stamps put the image data into the UTXO set itself. That's the set of unspent transaction outputs every node tracks to know what coins exist. Data stored there can't be pruned away without breaking the node's view of the chain. So a stamp is as permanent as Bitcoin's own accounting.

Block 779,652 is where that guarantee started. Stamp 0 has been carried by every full node since, and it will keep being carried as long as Bitcoin runs.

## A movement from one block

The choice at block 779,652 set the tone for everything that followed. Permanence first. No hosts to trust, no pruning to fear, no external dependency that can quietly disappear.

That single decision opened the door to <EntityMention entity="src-20">SRC-20</EntityMention> tokens, <EntityMention entity="src-101">SRC-101</EntityMention> names, and a whole community of artists and builders who wanted their work to outlast any one platform. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>, the first SRC-20 token, came later in 2023, but it stands on the foundation laid here.

If you want to understand why Bitcoin Stamps works the way it does, start at block 779,652. Everything in the protocol traces back to the moment <EntityMention entity="mikeinspace">mikeinspace</EntityMention> decided that permanent meant permanent.

---

*Read the full technical spec in the [Bitcoin Stamps Whitepaper](/en/whitepaper/), and explore the ecosystem at [stampchain.io](https://stampchain.io).*
