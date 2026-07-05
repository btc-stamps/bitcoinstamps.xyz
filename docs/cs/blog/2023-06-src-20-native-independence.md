---
title: "SRC-20 přechází na nativní kódování: nezávislost na Counterparty"
date: "2023-06-06"
author: "reinamora"
description: "6. června 2023, v bloku 793,068, se SRC-20 poprvé zakódoval přímo na Bitcoinu. Odříznutí Counterparty v bloku 796,000 učinilo z nativního kódování konsenzuální pravidlo."
tags: ["history", "src-20", "counterparty", "milestone", "consensus"]
leoType: "blog"
---

# SRC-20 přechází na nativní kódování: nezávislost na Counterparty

6. června 2023, v bloku 793,068, se <EntityMention entity="src-20">SRC-20</EntityMention> poprvé zakódoval přímo na Bitcoinu. Jde o milník svrchovanosti: standard tokenů přestal záviset na jiném protokolu a začal se zapisovat rovnou na základní řetězec.

## Výchozí bod u Counterparty

Rané transakce <EntityMention entity="src-20">SRC-20</EntityMention> se vezly na <EntityMention entity="counterparty">Counterparty</EntityMention>, metaprotokolu, který žil na Bitcoinu už od roku 2014. Counterparty dal standardu v jeho nejranějších dnech funkční cestu kódování a to umožnilo komunitě postupovat rychle.

Spoléhat na jiný protokol ale znamená zdědit jeho předpoklady i jeho omezení. Pro standard postavený kolem trvalosti a soběstačnosti byla tato závislost nedořešeným koncem.

## Nativní kódování v bloku 793,068

Blok 793,068 je místem, kde <EntityMention entity="src-20">SRC-20</EntityMention> získal vlastní nativní bitcoinové kódování. Od té chvíle mohly být operace nasazení (deploy), ražby (mint) nebo převodu (transfer) zapsány přímo na Bitcoinu, aniž by vůbec směřovaly přes Counterparty. Data tokenu končí v témže úložišti založeném na UTXO, které dává každému stampu jeho trvalost.

## Odříznutí v bloku 796,000

Samotné nativní kódování nebylo celým příběhem. Protokol také narýsoval pevnou hranici. V bloku 796,000, dne 26. června 2023, se <EntityMention entity="src-20">SRC-20</EntityMention> založený na <EntityMention entity="counterparty">Counterparty</EntityMention> stal neplatným. Za touto výškou je konsenzuální pravidlo jasné: SRC-20 je nativní bitcoinové kódování, tečka.

Toto odříznutí je tím, co proměnilo novou schopnost ve skutečný standard. Není žádná nejednoznačnost v tom, které transakce se počítají. Indexery, peněženky a kdokoli, kdo ověřuje řetězec, se řídí stejným pravidlem ukotveným ke konkrétnímu bloku.

## Proč zde na svrchovanosti záleží

Nezávislost na <EntityMention entity="counterparty">Counterparty</EntityMention> znamená, že <EntityMention entity="src-20">SRC-20</EntityMention> stojí na Bitcoinu sám. Žádný druhý protokol, kterému je třeba důvěřovat, žádná externí sada pravidel, kterou je třeba sledovat. Záruka trvalosti, která začala u prvního stampu, nyní pokrývá zaměnitelné tokeny od začátku do konce, rozhodovaná výhradně konsenzem Bitcoinu.

---

*Specifikaci kódování si přečtěte v [Bitcoin Stamps Whitepaperu](/en/whitepaper/) a ekosystém prozkoumejte na [stampchain.io](https://stampchain.io).*
