---
title: "SRC-20 Goes Native: Independence from Counterparty"
date: "2023-06-06"
author: "reinamora"
description: "On June 6, 2023, at block 793,068, SRC-20 encoded directly on Bitcoin for the first time. The Counterparty cutoff at block 796,000 made native encoding the consensus rule."
tags: ["history", "src-20", "counterparty", "milestone", "consensus"]
leoType: "blog"
---

# SRC-20 Goes Native: Independence from Counterparty

On June 6, 2023, at block 793,068, <EntityMention entity="src-20">SRC-20</EntityMention> encoded directly on Bitcoin for the first time. It's a sovereignty milestone: the token standard stopped depending on another protocol and started writing itself straight onto the base chain.

## The Counterparty starting point

Early <EntityMention entity="src-20">SRC-20</EntityMention> transactions rode on <EntityMention entity="counterparty">Counterparty</EntityMention>, a metaprotocol that had lived on Bitcoin since 2014. Counterparty gave the standard a working encoding path in its earliest days, and that let the community move fast.

But relying on another protocol means inheriting its assumptions and its constraints. For a standard built around permanence and self-sufficiency, that dependency was a loose end.

## Native encoding at block 793,068

Block 793,068 is where <EntityMention entity="src-20">SRC-20</EntityMention> got its own native Bitcoin encoding. From there, a deploy, mint, or transfer could be written directly on Bitcoin without routing through Counterparty at all. The token data lands in the same UTXO-based storage that gives every stamp its permanence.

## The cutoff at block 796,000

Native encoding alone wasn't the whole story. The protocol also drew a hard line. At block 796,000, on June 26, 2023, <EntityMention entity="counterparty">Counterparty</EntityMention>-based <EntityMention entity="src-20">SRC-20</EntityMention> became invalid. After that height, the consensus rule is clear: SRC-20 is native Bitcoin encoding, full stop.

That cutoff is what turned a new capability into a real standard. There's no ambiguity about which transactions count. Indexers, wallets, and anyone validating the chain follow the same rule, anchored to a specific block.

## Why sovereignty matters here

Independence from <EntityMention entity="counterparty">Counterparty</EntityMention> means <EntityMention entity="src-20">SRC-20</EntityMention> stands on Bitcoin alone. No second protocol to trust, no external rule set to track. The permanence guarantee that started with the first stamp now covers fungible tokens end to end, decided entirely by Bitcoin consensus.

---

*Read the encoding spec in the [Bitcoin Stamps Whitepaper](/en/whitepaper/), and explore the ecosystem at [stampchain.io](https://stampchain.io).*
