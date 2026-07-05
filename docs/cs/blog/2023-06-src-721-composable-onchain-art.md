---
title: "SRC-721: Skládatelné on-chain umění"
date: "2023-06-01"
author: "reinamora"
description: "1. června 2023, v bloku 792,370, přinesla první implementace SRC-721 na Bitcoin Stamps vrstvené, skládatelné NFT, které odkazují na on-chain umění a snižují tak náklady na ražbu."
tags: ["history", "src-721", "milestone", "nft"]
leoType: "blog"
---

# SRC-721: Skládatelné on-chain umění

1. června 2023, v bloku 792,370, byla na <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> spuštěna první implementace <EntityMention entity="src-721">SRC-721</EntityMention>. Přinesla protokolu skládatelná, vrstvená nezaměnitelná aktiva a vyřešila reálný problém s náklady.

## Problém s náklady, který vyřešila

Uložení celého obrázku do UTXO setu Bitcoinu je trvalé, ale není zadarmo. Velká kolekce, kde každé jednotlivé NFT nese své vlastní kompletní dílo, se rychle prodraží. To je v pořádku u jednorázového kusu. U sady tisíců je to bolestivé.

SRC-721 zvolil jinou cestu. Namísto opakovaného přeražování týchž aktiv token SRC-721 odkazuje na umění, které už je on-chain, a výsledný kus skládá z těchto vrstev. Vlastnost (trait) leží on-chain jednou a poté na ni ukazuje mnoho tokenů. Náklady na ražbu klesají, protože neplatíte za opakované ukládání týchž pixelů.

## Skládatelnost jako prvořadá myšlenka

Klíčové slovo je skládatelný. Token není jeden plochý obrázek, je to recept: toto pozadí, ono tělo, tyto oči, poskládané z vrstev, které trvale žijí v UTXO setu. Recept je malý a levný. Vrstvy jsou sdílené.

Tento návrh učinil větší a bohatší kolekce na Bitcoin Stamps praktickými, aniž by se vzdal záruky trvalosti, která začala v bloku 779,652.

## Kam to vedlo

SRC-721 se nezastavil u vrstvených odkazů. Později se vyvinul v SRC-721r, který přidává rekurzi: tokeny, které staví na jiných on-chain datech hlubšími a flexibilnějšími způsoby. Práce na rekurzi vyrostla přímo ze skládatelného základu položeného v bloku 792,370.

SRC-721 stojí po boku zaměnitelných tokenů <EntityMention entity="src-20">SRC-20</EntityMention> a jmen <EntityMention entity="src-101">SRC-101</EntityMention> jako součást širší rodiny standardů Bitcoin Stamps. Každý z nich odpovídá na jinou potřebu a všechny dědí totéž pravidlo: data jsou trvalá, protože žijí tam, kde je Bitcoin nemůže prořezat.

---

*Standardy tokenů si přečtěte v [Bitcoin Stamps Whitepaperu](/en/whitepaper/) a ekosystém prozkoumejte na [stampchain.io](https://stampchain.io).*
