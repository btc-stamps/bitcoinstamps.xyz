---
title: "Vydán whitepaper protokolu Bitcoin Stamps"
date: "2026-02-25"
author: "reinamora"
description: "Oficiální technický whitepaper protokolu Bitcoin Stamps je nyní k dispozici a dokumentuje kompletní specifikaci trvalých digitálních aktiv na Bitcoinu prostřednictvím úložiště v UTXO."
tags: ["whitepaper", "protocol", "src-20", "bitcoin-stamps", "announcement"]
leoType: "blog"
---

# Vydán whitepaper protokolu Bitcoin Stamps

Po letech budování, iterování a vylepšování protokolu, který učinil z trvalých digitálních aktiv na Bitcoinu realitu, s hrdostí oznamujeme oficiální vydání technického whitepaperu protokolu <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>.

Tento dokument představuje vyvrcholení práce zahájené v bloku 779,652, kdy <EntityMention entity="mikeinspace">mikeinspace</EntityMention> vyryl úplně první Bitcoin Stamp, což byl okamžik, který odstartoval hnutí, jež nikdo z nás nedokázal plně předvídat.

## Co whitepaper pokrývá

Whitepaper je kompletní technická specifikace metaprotokolu <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> a pokrývá každou vrstvu protokolového zásobníku:

**Architektura protokolu.** Jak Bitcoin Stamps využívá množinu UTXO k trvalému ukládání dat kritických pro konsenzus. Na rozdíl od přístupů založených na witness data, které mohou plné uzly prořezat, data stampu žijí v utratitelných transakčních výstupech. Každý plný uzel je musí uchovávat. Tato záruka trvalosti je zásadní.

**Tokenové standardy.** Úplná specifikace zaměnitelných tokenů <EntityMention entity="src-20">SRC-20</EntityMention> (operace DEPLOY, MINT, TRANSFER), nezaměnitelných aktiv SRC-721, decentralizovaného pojmenování SRC-101 a skládatelné rekurze SRC-721r. Model zůstatků založený na účtech, o který se <EntityMention entity="src-20">SRC-20</EntityMention> opírá, je podrobně zdokumentován a objasňuje, proč se liší od tokenových schémat vázaných na UTXO.

**Ekonomický model.** Struktury poplatků a reálné úspory nákladů, které přináší optimalizace OLGA P2WSH (snížení o 30 až 95 % oproti bare multisig), aktivovaná v bloku 865,000.

**Bezpečnostní analýza.** Model hrozeb, vektory útoků a záruky trvalosti, které <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> činí odolným po celou dobu existence Bitcoinu.

**Návrhy na vylepšení Stamps.** Řídicí rámec SIP a aktuální aktivní návrhy (SIP-0001 až SIP-0008), které utvářejí budoucnost protokolu.

## Protokol vybudovaný komunitou

Whitepaper není dílem jediného autora. Dokumentuje protokol, který vzešel z opravdové spolupráce:

<EntityMention entity="mikeinspace">mikeinspace</EntityMention> přinesl původní vizi: myšlenku, že digitální aktiva lze trvale ukládat do množiny UTXO Bitcoinu, imunní vůči prořezávání a zaručená konsenzem.

Arwyn dal této vizi její první kulturní vyjádření, když v bloku 783,718 vytvořil Bitcoin Stamp #4258, a později tuto tvůrčí energii přetavil do prvního tokenu <EntityMention entity="src-20">SRC-20</EntityMention>, <EntityMention entity="kevin" variant="cultural">KEVINa</EntityMention>, v bloku 788,041.

Reinamora navrhl technické protokoly, které vizi proměnily ve fungující infrastrukturu: indexer, kódovací schémata, konsenzuální pravidla a nakonec optimalizaci OLGA, díky níž se protokol stal ekonomicky dostupným pro každého.

Samotný <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> zůstává živoucím důkazem, že protokol funguje tak, jak má: první token <EntityMention entity="src-20">SRC-20</EntityMention> s férovým spuštěním, s více než 2,300 držiteli, kteří se přidali nikoli kvůli humbuku, ale díky tomu, že rozpoznali, co protokol představuje.

## Přečtěte si whitepaper

Whitepaper je k dispozici v několika formátech:

- **[Stáhnout PDF](/bitcoin-stamps-whitepaper.pdf)**: pro archivaci a čtení offline.
- **[Zobrazit HTML](/bitcoin-stamps-whitepaper.html)**: čitelné v prohlížeči s plným formátováním.
- **[Zdroj v Markdownu](/bitcoin-stamps-whitepaper-combined.md)**: pro vývojáře a přispěvatele.

Jednotlivé sekce jsou také k dispozici na [GitHubu](https://github.com/stampchain-io/btc_stamps/tree/main/docs/whitepaper) pro ty, kdo si chtějí přečíst architekturu, tokenové standardy nebo bezpečnostní analýzu samostatně.

## Časová osa protokolu

Whitepaper dokumentuje kompletní vývoj protokolu:

| Blok | Milník |
|------:|-----------|
| 779,652 | První Bitcoin Stamp |
| 788,041 | První token SRC-20 (<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>) |
| 793,068 | První nativní kódování Bitcoinu |
| 796,000 | Odříznutí Counterparty (konsenzuální pravidlo SRC-20) |
| 865,000 | Aktivace OLGA (optimalizace P2WSH) |

## Co bude dál

Whitepaper je dokumentace, nikoli cíl. Protokol se dál vyvíjí prostřednictvím procesu SIP. Aktivní návrhy řeší optimalizaci poplatků, nové schopnosti tokenů a rozšířené případy použití pro trvalá on-chain data.

Pokud stavíte na <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>, whitepaper je vaše kanonická reference. Pokud jste v protokolu noví, je to nejlepší jediný dokument pro pochopení toho, proč je tento přístup k trvalým digitálním aktivům na Bitcoinu odlišný a proč na tom rozdílu záleží.

---

*Whitepaper je nyní k dispozici na [bitcoinstamps.xyz/en/whitepaper/](/en/whitepaper/).*

*Připojte se ke komunitě na [Telegramu](https://t.me/BitcoinStamps) a prozkoumejte ekosystém na [stampchain.io](https://stampchain.io).*

*In Lak'ech Ala K'in, všichni jsme <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>.*
