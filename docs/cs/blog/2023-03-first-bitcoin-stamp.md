---
title: "První Bitcoin Stamp"
date: "2023-03-07"
author: "reinamora"
description: "7. března 2023, v bloku 779,652, vytvořil mikeinspace Stamp 0 a spustil protokol Bitcoin Stamps: trvalé umění uložené přímo v UTXO setu Bitcoinu."
tags: ["history", "bitcoin-stamps", "milestone", "genesis"]
leoType: "blog"
---

# První Bitcoin Stamp

7. března 2023, v bloku 779,652, vytvořil <EntityMention entity="mikeinspace">mikeinspace</EntityMention> Stamp 0. Jde o malý kousek pixel-artu s laserovýma očima a je to genesis protokolu <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>.

Stamp 0 nebyl jen obrázek v řetězci. Byl důkazem jiné představy o tom, kde by mělo digitální umění žít.

## Proč na UTXO setu záleží

Většina přístupů k on-chain umění ukládá data na místa, která může plný uzel později zahodit. Witness data lze prořezat (prune). Off-chain odkazy mohou zpuchřet, když zmizí hostitel. <EntityMention entity="mikeinspace">mikeinspace</EntityMention> chtěl něco silnějšího: umění, které musí každý plný uzel uchovávat navždy, protože je součástí utratitelného stavu Bitcoinu.

Bitcoin Stamps umístil obrazová data přímo do UTXO setu. To je množina neutracených transakčních výstupů (UTXO), kterou každý uzel sleduje, aby věděl, jaké mince existují. Data uložená tam nelze prořezat, aniž by se narušil pohled uzlu na řetězec. Stamp je tedy stejně trvalý jako samotné účetnictví Bitcoinu.

Blok 779,652 je místem, kde tato záruka začala. Stamp 0 od té doby nese každý plný uzel a ponese jej tak dlouho, dokud Bitcoin poběží.

## Hnutí z jednoho bloku

Volba v bloku 779,652 udala tón všemu, co následovalo. Trvalost na prvním místě. Žádní hostitelé, kterým je třeba důvěřovat, žádné prořezávání, kterého je třeba se bát, žádná externí závislost, která může tiše zmizet.

Toto jediné rozhodnutí otevřelo dveře tokenům <EntityMention entity="src-20">SRC-20</EntityMention>, jménům <EntityMention entity="src-101">SRC-101</EntityMention> a celé komunitě umělců a tvůrců, kteří chtěli, aby jejich dílo přežilo jakoukoli jednotlivou platformu. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>, první token SRC-20, přišel později v roce 2023, ale stojí na základech položených zde.

Pokud chcete pochopit, proč Bitcoin Stamps funguje tak, jak funguje, začněte u bloku 779,652. Vše v protokolu se vrací k okamžiku, kdy se <EntityMention entity="mikeinspace">mikeinspace</EntityMention> rozhodl, že trvalé znamená trvalé.

---

*Kompletní technickou specifikaci si přečtěte v [Bitcoin Stamps Whitepaperu](/en/whitepaper/) a ekosystém prozkoumejte na [stampchain.io](https://stampchain.io).*
