---
title: "OLGA: Levnější a větší stampy díky P2WSH"
date: "2024-03-03"
author: "reinamora"
description: "OLGA přesunula kódování stampů na P2WSH; pro classic stampy se aktivovala v bloku 833,000 a pro SRC-20 v bloku 865,000. Zmenšuje velikost transakce zhruba na polovinu a poplatky o 60 až 70 %."
tags: ["history", "olga", "milestone", "p2wsh", "fees"]
leoType: "blog"
---

# OLGA: Levnější a větší stampy díky P2WSH

<EntityMention entity="olga">OLGA</EntityMention> je vylepšení kódování, které <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> zároveň zlevnilo i zvětšilo. Přesunulo data stampu do výstupů P2WSH a odstranilo kus režie, kterou platil každý dřívější stamp.

## Dvě aktivační výšky

OLGA se zaváděla ve dvou fázích, každá ukotvená k jednomu bloku. Kódování P2WSH pro classic stampy se aktivovalo v bloku 833,000 dne 3. března 2024. První stamp <EntityMention entity="src-20">SRC-20</EntityMention> P2WSH OLGA přišel později, v bloku 865,000 dne 10. října 2024. Obě výšky jsou konsenzuální kontrolní body, takže indexery přesně vědí, kdy se která cesta zapne.

## Co P2WSH mění

Starší kódování se opíralo o výstupy bare multisig a data balilo do Base64. Base64 činí binární data bezpečnými pro přenos, ale přidává zhruba třetinu bajtů navíc za nic než za kódování. Na řetězci, kde platíte za bajt, je tato režie skutečným nákladem.

OLGA vypouští vrstvu Base64 a místo toho používá výstupy Pay-to-Witness-Script-Hash (P2WSH). Výsledek:

- Transakce jsou zhruba o 50 % menší.
- Poplatky klesají zhruba o 60 až 70 %.
- Jediná transakce stampu unese až přibližně 64 kB dat.

Menší a levnější znamená, že stampovat může více lidí, a větší kapacita na transakci znamená, že se on-chain vejde bohatší umění.

## Táž trvalost, nižší náklady

Důležité je: nic z toho neoslabilo záruku trvalosti. Stampy OLGA stále žijí v UTXO setu, stále je nelze prořezat, stále dědí vlastní odolnost Bitcoinu. OLGA změnila, jak jsou data zabalena, nikoli kde žijí.

To je vzorec, který <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> stále opakuje: přinášet vylepšení za aktivačními výškami, prokazovat je proti řetězci a nikdy nevyměnit trvalost za pohodlí. OLGA zpřístupnila protokol mnohem více lidem, aniž by se vzdala toho, co dělá ze stampu stamp.

---

*Ekonomický model si přečtěte v [Bitcoin Stamps Whitepaperu](/en/whitepaper/) a ekosystém prozkoumejte na [stampchain.io](https://stampchain.io).*
