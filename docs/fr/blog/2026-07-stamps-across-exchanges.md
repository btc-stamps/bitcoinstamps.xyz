---
title: "Où vivent les Bitcoin Stamps sur les exchanges"
date: "2026-07-05"
author: "reinamora"
description: "Les Bitcoin Stamps et les tokens SRC-20 sur l'ensemble du marché : marketplaces natifs, prise en charge par le wallet OKX, décodage par les explorateurs, suivi par les agrégateurs et trading au comptant de KEVIN et STAMP sur BitMart."
tags: ["exchanges", "src-20", "kevin", "adoption"]
leoType: "blog"
---

# Où vivent les Bitcoin Stamps sur les exchanges

Les <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> inscrivent de l'art et des tokens directement dans l'ensemble UTXO de Bitcoin, de manière permanente et impossible à élaguer, et le marché dans son ensemble continue de s'y connecter. Les tokens <EntityMention entity="src-20">SRC-20</EntityMention> se négocient sur leurs marketplaces natifs et sur un exchange centralisé, se logent dans un wallet Web3 majeur, s'affichent nativement dans un explorateur de blocs grand public et apparaissent sur les agrégateurs que les traders consultent déjà. Chaque couche fait quelque chose de différent, et chacune est réelle.

## Les marketplaces natifs viennent en premier

La couche la plus profonde, c'est le protocole lui-même. [OpenStamp](https://docs.openstamp.io/) et [Stampscan](https://stampscan.xyz) négocient et indexent les tokens SRC-20 nativement : ils lisent les tokens directement sur Bitcoin, si bien que ce que vous y voyez est l'état propre de la chaîne, et non le registre d'un tiers. Pour la vue canonique de n'importe quel token SRC-20, commencez ici.

## OKX : prise en charge par le wallet depuis 2024

En février 2024, le OKX Web3 Wallet [a ajouté la prise en charge du standard Stamps SRC-20](https://www.globenewswire.com/news-release/2024/02/14/2828748/0/en/Flash-News-OKX-Wallet-Launches-Support-for-Stamps-SRC-20-Bitcoin-Inscriptions-Standard-Enhancing-User-Experience-with-Viewing-and-Transfer-Capabilities.html), permettant aux utilisateurs de conserver, consulter et transférer des tokens SRC-20. C'était le premier signal clair qu'une plateforme majeure prenait le standard au sérieux.

Le périmètre précis : il s'agit de prise en charge par le wallet, pas d'un listing de trading. OKX n'a pas ouvert de marché au comptant (spot) SRC-20, et sa marketplace d'inscriptions sans frais couvrait d'autres standards, pas SRC-20. Vous pouvez conserver et déplacer vos tokens Stamps sur OKX ; le trading se passe sur les plateformes du reste de cette carte.

## Les explorateurs de blocs décodent nativement les stamps

Certains explorateurs Bitcoin grand public lisent les stamps comme des stamps, et non comme des outputs bruts. L'explorateur de Blockchain.com décode les Bitcoin Stamps classiques (de Counterparty) et affiche l'image nativement : il détecte les données `STAMP:base64` dans la transaction, l'étiquette comme un Bitcoin Stamp et montre l'image avec ses dimensions, son type de média et son asset ID. Ouvrez une [transaction de stamp en direct](https://www.blockchain.com/explorer/transactions/btc/176a5d0329a8b48d5f86bcaf0078ccc3a57d50013744f4af3ea0c827347520ce) et l'art est juste là.

Cette prise en charge est arrivée tôt dans l'histoire du protocole : un explorateur grand public a choisi de comprendre le format. Le décodage natif de l'encodage plus récent, <EntityMention entity="olga">OLGA</EntityMention> (P2WSH), sur l'ensemble des explorateurs grand public est encore en train de rattraper son retard, si bien que [stampchain.io](https://stampchain.io) reste la vue la plus complète de chaque stamp.

## Agrégateurs et pédagogie

La découverte fonctionne aussi. CoinGecko maintient une [catégorie Top SRC-20 Coins](https://www.coingecko.com/en/categories/src-20), CoinMarketCap propose des pages de prix pour chacun des tokens, et Binance Academy documente l'écosystème avec des explications sur les [Bitcoin Stamps](https://academy.binance.com/en/articles/what-are-bitcoin-stamps) et les [tokens SRC-20](https://academy.binance.com/en/glossary/src-20-tokens). C'est du suivi et de la pédagogie, pas un listing ni un partenariat, et cela compte à sa manière : quiconque se renseigne sur ces tokens trouve désormais une couverture exacte sur des plateformes auxquelles il fait déjà confiance.

## BitMart : trading au comptant de KEVIN et STAMP

L'étape la plus claire du côté d'un exchange centralisé est arrivée le 23 décembre 2025, quand BitMart a ouvert le trading au comptant des deux tokens : [KEVIN/USDT](https://www.bitmart.com/crypto/KEVIN) et [STAMP/USDT](https://www.bitmart.com/crypto/STAMP), dans sa zone Meme et Innovation (annonces de listing primaire pour [KEVIN](https://bitmart.zendesk.com/hc/en-us/articles/44674823250971--Primary-Listing-BitMart-Will-List-Bitcoin-Stamps-SRC-20-KEVIN-2025-12-23) et [STAMP](https://bitmart.zendesk.com/hc/en-us/articles/44675420348827--Primary-Listing-BitMart-Will-List-Bitcoin-Stamps-SRC-20-STAMP-2025-12-23)).

Deux tokens SRC-20 Bitcoin Stamps, dont l'un est le token fondateur du protocole, se négocient désormais sur un exchange centralisé, aux côtés des marchés natifs qui les portent depuis le début. L'histoire complète est dans [KEVIN et STAMP arrivent sur BitMart](/en/blog/2025-12-kevin-stamp-bitmart-listing).

## Pourquoi KEVIN porte l'histoire

<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> est le premier token SRC-20, et son histoire est l'écosystème en miniature. Il a commencé comme de l'art : le Stamp #4258 au bloc 783 718 le 3 avril 2023, un hommage à la culture Rare Pepe qui s'est mis à se répliquer de lui-même à travers le système. <EntityMention entity="arwyn">Arwyn</EntityMention> a ensuite donné à cette énergie une forme permanente, en déployant <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> comme le premier token SRC-20 (Stamp #18 516) le 3 mai 2023, au bloc 788 041. Aujourd'hui, il compte plus de 2 300 détenteurs.

## Le jeu à long terme

La présence de SRC-20 sur les exchanges en est à un stade plus précoce que celle de certains standards d'inscriptions plus bruyants, et Binance Academy le dit sans détour. Ce qui compte, c'est la direction : des marchés natifs qui négocient les tokens à la source, la prise en charge par le wallet OKX, le suivi sur les principaux agrégateurs, une couverture pédagogique, et le trading au comptant de KEVIN et STAMP sur BitMart. L'art permanent sur l'ensemble UTXO de Bitcoin trouve son chemin vers les écrans que les gens utilisent déjà.
