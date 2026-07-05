---
title: "OLGA: Cheaper, Larger Stamps via P2WSH"
date: "2024-03-03"
author: "reinamora"
description: "OLGA moved stamp encoding to P2WSH, activating for classic stamps at block 833,000 and for SRC-20 at block 865,000. It cuts transaction size by about half and fees by 60-70%."
tags: ["history", "olga", "milestone", "p2wsh", "fees"]
leoType: "blog"
---

# OLGA: Cheaper, Larger Stamps via P2WSH

<EntityMention entity="olga">OLGA</EntityMention> is the encoding upgrade that made <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> cheaper and bigger at the same time. It moved stamp data into P2WSH outputs, and it removed a chunk of overhead that every earlier stamp had been paying.

## Two activation heights

OLGA rolled out in two stages, each pinned to a block. Classic-stamp P2WSH encoding activated at block 833,000 on March 3, 2024. The first <EntityMention entity="src-20">SRC-20</EntityMention> P2WSH OLGA stamp came later, at block 865,000 on October 10, 2024. Both heights are consensus checkpoints, so indexers know exactly when each path turns on.

## What P2WSH changes

The older encoding leaned on bare multisig outputs and wrapped the data in Base64. Base64 makes binary data safe to carry, but it adds roughly a third of extra bytes for nothing but encoding. On a chain where you pay per byte, that overhead is a real cost.

OLGA drops the Base64 layer and uses Pay-to-Witness-Script-Hash (P2WSH) outputs instead. The result:

- Transactions get about 50% smaller.
- Fees fall by roughly 60 to 70%.
- A single stamp transaction can carry up to around 64 kB of data.

Smaller and cheaper means more people can stamp, and bigger per-transaction capacity means richer art fits on-chain.

## Same permanence, lower cost

The important part: none of this weakened the permanence guarantee. OLGA stamps still live in the UTXO set, still can't be pruned, still inherit Bitcoin's own durability. OLGA changed how the data is packed, not where it lives.

That's the pattern <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> keeps repeating: land improvements behind activation heights, prove them against the chain, and never trade away permanence for convenience. OLGA made the protocol accessible to far more people without giving up the thing that makes a stamp a stamp.

---

*Read the economic model in the [Bitcoin Stamps Whitepaper](/en/whitepaper/), and explore the ecosystem at [stampchain.io](https://stampchain.io).*
