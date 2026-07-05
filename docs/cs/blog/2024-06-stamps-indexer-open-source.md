---
title: "Stamps indexer se stává open source"
date: "2024-06-24"
author: "reinamora"
description: "24. června 2024 hlavní vývojáři uvolnili jako open source kompletní indexer Bitcoin Stamps, který pokrývá podporu Classic Stamps, OLGA, SRC-20, SRC-721 a SRC-101."
tags: ["history", "indexer", "open-source", "milestone"]
leoType: "blog"
---

# Stamps indexer se stává open source

24. června 2024 hlavní vývojáři uvolnili jako open source kompletní indexer <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>. Kompletní kód, který čte řetězec a rekonstruuje stav stampů, se stal veřejným, a to je větší věc, než by se mohlo zdát.

## Proč na indexeru záleží

Data Bitcoin Stamps žijí v UTXO setu, ale bitcoinové uzly nevědí, co je stamp. Vidí transakční výstupy, nikoli umění nebo zůstatky tokenů. Něco musí číst surový řetězec, najít transakce stampů, dekódovat je a sestavit účetní knihu toho, co existuje a kdo to drží. Tím něčím je indexer.

Pokud je indexer uzavřený, komunita musí věřit slovu jedné strany o skutečném stavu protokolu. Uvolnění do open source tento požadavek důvěry odstraňuje. Kdokoli může spustit tentýž kód, zaindexovat od genesis a ověřit si odpověď sám.

## Co vydání pokrývá

Open source indexer zpracovává celou rodinu standardů:

- **Classic Stamps**, původní umění v bare multisig.
- **<EntityMention entity="olga">OLGA</EntityMention>**, kódování P2WSH, které snížilo velikost a poplatky.
- **<EntityMention entity="src-20">SRC-20</EntityMention>** zaměnitelné tokeny, včetně pravidel nativního kódování.
- **SRC-721** skládatelné NFT.
- **<EntityMention entity="src-101">SRC-101</EntityMention>** decentralizované pojmenovávání.

To je každá konsenzuálně relevantní cesta v jedné kódové základně, takže jediné spuštění může ověřit celý protokol proti řetězci.

## Ověřitelné kýmkoli

Open source proměňuje tvrzení ve věci, které můžete otestovat. Když vydání říká, že je ověřené konsenzem, nemusíte to brát na víru. Stáhnete kód, znovu naparsujete od bloku 779,652 a porovnáte hashe. Tato disciplína je tím, na čem staví pozdější vydání, až po kontrolu opětovného parsování od genesis, kterou projekt stále používá.

Uvolnění indexeru do open source postavilo <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> tam, kde by protokol upřednostňující trvalost měl být: plně kontrolovatelný, nezávisle spustitelný a vlastněný svou komunitou spíše než jakýmkoli jedním týmem.

---

*Indexer najdete na [stampchain-io/btc_stamps na GitHubu](https://github.com/stampchain-io/btc_stamps). Ekosystém prozkoumejte na [stampchain.io](https://stampchain.io).*
