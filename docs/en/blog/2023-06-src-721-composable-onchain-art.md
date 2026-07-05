---
title: "SRC-721: Composable On-Chain Art"
date: "2023-06-01"
author: "reinamora"
description: "On June 1, 2023, at block 792,370, the first SRC-721 implementation brought layered, composable NFTs to Bitcoin Stamps, referencing on-chain art to cut mint cost."
tags: ["history", "src-721", "milestone", "nft"]
leoType: "blog"
---

# SRC-721: Composable On-Chain Art

On June 1, 2023, at block 792,370, the first <EntityMention entity="src-721">SRC-721</EntityMention> implementation went live on <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>. It brought composable, layered non-fungible assets to the protocol, and it solved a real cost problem.

## The cost problem it solved

Storing a full image in Bitcoin's UTXO set is permanent, but it isn't free. A large collection where every single NFT carries its own complete artwork gets expensive fast. That's fine for a one-off piece. It's painful for a set of thousands.

SRC-721 took a different route. Instead of restamping the same assets over and over, an SRC-721 token references art that's already on-chain and composes the final piece from those layers. A trait sits on-chain once, then many tokens point at it. The mint cost drops because you're not paying to store the same pixels again and again.

## Composability as a first-class idea

The key word is composable. A token isn't one flat picture, it's a recipe: this background, that body, these eyes, assembled from layers that live permanently in the UTXO set. The recipe is small and cheap. The layers are shared.

That design made larger, richer collections practical on Bitcoin Stamps without giving up the permanence guarantee that started at block 779,652.

## Where it led

SRC-721 didn't stop at layered references. It later evolved into SRC-721r, which adds recursion: tokens that build on other on-chain data in deeper, more flexible ways. The recursion work grew directly out of the composable foundation set at block 792,370.

SRC-721 sits alongside <EntityMention entity="src-20">SRC-20</EntityMention> fungible tokens and <EntityMention entity="src-101">SRC-101</EntityMention> names as part of the wider Bitcoin Stamps standard family. Each one answers a different need, and all of them inherit the same rule: the data is permanent because it lives where Bitcoin can't prune it.

---

*Read the token standards in the [Bitcoin Stamps Whitepaper](/en/whitepaper/), and explore the ecosystem at [stampchain.io](https://stampchain.io).*
