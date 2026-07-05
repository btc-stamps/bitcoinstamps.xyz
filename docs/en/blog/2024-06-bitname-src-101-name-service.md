---
title: "Bitname & SRC-101: A Name Service for Bitcoin"
date: "2024-06-10"
author: "reinamora"
description: "On June 10, 2024, Bitname and the Stampchain team introduced SRC-101, a UTXO-anchored Bitcoin name service for .btc names. SRC-101 names had their on-chain genesis at block 870,652."
tags: ["history", "src-101", "bitname", "naming", "milestone"]
leoType: "blog"
---

# Bitname & SRC-101: A Name Service for Bitcoin

On June 10, 2024, Bitname, working with the Stampchain team, introduced <EntityMention entity="src-101">SRC-101</EntityMention>: a name service for Bitcoin built on the <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> standard. It brings human-readable .btc names to the protocol, and it anchors them where every stamp lives, in the UTXO set.

## The problem with raw addresses

Bitcoin addresses are long strings that nobody can remember or read aloud safely. Naming systems fix that by mapping a friendly name to an address. The hard part is doing it without a trusted server that can lie, censor, or disappear.

<EntityMention entity="src-101">SRC-101</EntityMention> solves it the Bitcoin Stamps way. A .btc name is registered on-chain, UTXO-anchored, and validated by the same rules that make a stamp permanent. There's no central registry to trust. The chain is the registry.

## Built for every address type

SRC-101 was designed to name all Bitcoin address types, not just one format. That matters because Bitcoin has several address kinds in active use, and a name service that only covered one would leave large parts of the ecosystem out. SRC-101 covers the range, so a name can point at the address people actually use.

## On-chain genesis at block 870,652

The standard was announced in June 2024, and SRC-101 names had their on-chain genesis at block 870,652 on November 17, 2024. That's the height where the naming data started landing on Bitcoin under the new standard, with the same permanence guarantee as the rest of the protocol.

## A fourth pillar

<EntityMention entity="src-101">SRC-101</EntityMention> joined <EntityMention entity="src-20">SRC-20</EntityMention> tokens and SRC-721 art as a core part of the Bitcoin Stamps family. Each standard answers a different need. SRC-101 answers identity: a permanent, self-owned name that lives on Bitcoin and points wherever you say it does, with no host in the middle.

---

*Read the naming spec in the [Bitcoin Stamps Whitepaper](/en/whitepaper/), and explore the ecosystem at [stampchain.io](https://stampchain.io).*
