---
title: "Vydání indexeru Bitcoin Stamps v1.9.1"
date: "2026-07-04"
author: "reinamora"
description: "Verze indexeru v1.9.1 aktivuje kódování SRC-101 P2WSH/OLGA v bloku 940,000, přidává vrstvu tržních dat a webhooků a prochází úplnou revalidací konsenzu od genesis až po špičku řetězce, prokazatelně shodnou v hashi s produkční účetní knihou."
tags: ["indexer", "release", "src-101", "olga", "consensus", "announcement"]
leoType: "blog"
---

# Vydání indexeru Bitcoin Stamps v1.9.1

Indexer Bitcoin Stamps **v1.9.1** je venku. Jde o funkční řadu 1.9: sadu konsenzem ověřených aktivací protokolu a zpevnění, která zahrnuje kódování <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH/OLGA, novou vrstvu tržních dat a webhooků, parsovací cestu akcelerovanou v Rustu a úplnou revalidaci konsenzu od genesis až po špičku řetězce.

Každá změna ovlivňující konsenzus je řízena aktivační výškou nebo příznakem (ve výchozím stavu vypnutým) a vydání bylo prostřednictvím opětovného parsování od genesis prokázáno jako **shodné v hashi s produkční účetní knihou**. Kompletní poznámky k vydání a Docker image najdete na GitHubu: [stampchain-io/btc_stamps release 1.9.1](https://github.com/stampchain-io/btc_stamps/releases/tag/1.9.1).

## Hlavní novinky

- **Kódování <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH / <EntityMention entity="olga">OLGA</EntityMention>** se aktivuje v **bloku 940,000**. Před aktivací je SRC-101 podporováno pouze přes holý multisig (bare multisig); po aktivaci fungují jak holý multisig, tak P2WSH, rozlišené na úrovni JSON (`"p":"src-101"`).
- **Detekce nasazení SRC-721R** pro transakce P2WSH, rekurzivní parsování popisů SRC-721 a bezpečnější dvojí zpracování prokletých známek (cursed stamps).
- **Tržní data a historie prodejů**: vícezdrojová cache (KuCoin, StampScan) s průměrováním váženým podle důvěryhodnosti, cache držitelů (holderů) a kanál historie prodejů pokrývající dispensery, atomické swapy, OTC a aukce.
- **Webhooky v reálném čase** pro nové bloky a reorganizace (reorgy), s ochranou proti SSRF a z principu neblokující, takže oznámení nikdy neovlivní indexaci.
- **Výkon**: parsovací cesta akcelerovaná v Rustu v hlavní blokové smyčce plus optimalizace přeskočení CP, která se na blocích bez dat Counterparty vyhne voláním Counterparty API (ověřeno jako shodné v hashi).
- **Nový bootstrapovací snapshot až do bloku 956,000** je publikován pro rychlou synchronizaci.

## Ověření konsenzu

Vydání si své označení "ověřeno konsenzem" zaslouží. Opětovné parsování od genesis až po špičku řetězce na Pythonu 3.12 se shodovalo s produkční účetní knihou hash po hashi: hashe txlistu i účetní knihy souhlasily napříč všemi 176,328 bloky, ověřeno referenčními kontrolami po jednotlivých blocích. Všechny aktualizace závislostí sousedících s konsenzem prošly stejnou parsovací kontrolou.

## Podpora interpretu (důležité)

Indexer spouštějte na **Pythonu 3.10, 3.11 nebo 3.12**. Konsenzus je na těchto třech verzích prokázán jako bajt po bajtu shodný. **Nespouštějte jej na Pythonu 3.13**: zpřísnil dekódování `base64`/`binascii` a v bloku 783,775 se od konsenzu odchyluje (chybná klasifikace známky). Publikovaný image `btcstamps/indexer:1.9.1` je postaven na Pythonu 3.12, certifikovaném běhovém prostředí.

## Poznámky k aktualizaci

- **Vyžaduje Counterparty `v11.0.1+`** (kvůli opravě koncového bodu API CP V2).
- Aplikujte nové schéma (tabulky tržních dat, cache držitelů a historie prodejů plus sloupec `fee_rate_sat_vb` a nové indexy).
- Pro rychlou počáteční synchronizaci použijte bootstrapovací snapshot až do bloku 956,000 na S3.

Toto vydání zachovává tutéž disciplínu, která <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> definuje od bloku 779,652 dále: nové funkce přicházejí až za aktivačními výškami a konsenzus se před jakýmkoli nasazením prokazuje proti reálnému řetězci.
