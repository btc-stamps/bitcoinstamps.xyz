---
title: "Dónde viven los Bitcoin Stamps en los exchanges"
date: "2026-07-05"
author: "reinamora"
description: "Los Bitcoin Stamps y los tokens SRC-20 por todo el mercado: marketplaces nativos, soporte de monedero en OKX, decodificación en exploradores, seguimiento en agregadores y trading al contado de KEVIN y STAMP en BitMart."
tags: ["exchanges", "src-20", "kevin", "adoption"]
leoType: "blog"
---

# Dónde viven los Bitcoin Stamps en los exchanges

Los <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> graban arte y tokens directamente en el conjunto UTXO de Bitcoin, de forma permanente e imposible de podar, y el mercado en general se sigue conectando a ellos. Los tokens <EntityMention entity="src-20">SRC-20</EntityMention> se negocian en sus marketplaces nativos y en un exchange centralizado, residen en un importante monedero Web3, se renderizan de forma nativa en un explorador de bloques de uso general y aparecen en los agregadores que los traders ya consultan. Cada capa hace algo distinto, y cada una es real.

## Los marketplaces nativos van primero

La capa más profunda es el propio protocolo. [OpenStamp](https://docs.openstamp.io/) y [Stampscan](https://stampscan.xyz) negocian e indexan tokens SRC-20 de forma nativa: leen los tokens directamente de Bitcoin, así que lo que ves ahí es el propio estado de la cadena, no el ledger de un tercero. Para la vista canónica de cualquier token SRC-20, empieza aquí.

## OKX: soporte de monedero desde 2024

En febrero de 2024, el OKX Web3 Wallet [añadió soporte para el estándar Stamps SRC-20](https://www.globenewswire.com/news-release/2024/02/14/2828748/0/en/Flash-News-OKX-Wallet-Launches-Support-for-Stamps-SRC-20-Bitcoin-Inscriptions-Standard-Enhancing-User-Experience-with-Viewing-and-Transfer-Capabilities.html), permitiendo a los usuarios guardar, ver y transferir tokens SRC-20. Fue la primera señal clara de que una plataforma importante se tomaba en serio el estándar.

El alcance exacto: esto es soporte de monedero, no un listado de trading. OKX no ha abierto un mercado al contado (spot) de SRC-20, y su marketplace de inscripciones sin comisiones cubría otros estándares, no SRC-20. Puedes guardar y mover tus tokens Stamps en OKX; el trading ocurre en las plataformas del resto de este mapa.

## Los exploradores de bloques decodifican los stamps de forma nativa

Algunos exploradores de Bitcoin de uso general leen los stamps como stamps, no como outputs en bruto. El explorador de Blockchain.com decodifica los Bitcoin Stamps clásicos (de Counterparty) y renderiza la imagen de forma nativa: detecta los datos `STAMP:base64` en la transacción, la etiqueta como Bitcoin Stamp y muestra la imagen junto con sus dimensiones, tipo de medio y asset ID. Abre una [transacción de stamp en vivo](https://www.blockchain.com/explorer/transactions/btc/176a5d0329a8b48d5f86bcaf0078ccc3a57d50013744f4af3ea0c827347520ce) y el arte está justo ahí.

Ese soporte llegó pronto en la historia del protocolo: un explorador de referencia decidió entender el formato. La decodificación nativa de la codificación más reciente, <EntityMention entity="olga">OLGA</EntityMention> (P2WSH), en todos los exploradores de uso general todavía está poniéndose al día, así que [stampchain.io](https://stampchain.io) sigue siendo la vista más completa de cada stamp.

## Agregadores y educación

El descubrimiento también funciona. CoinGecko mantiene una [categoría Top SRC-20 Coins](https://www.coingecko.com/en/categories/src-20), CoinMarketCap tiene páginas de precio para los tokens individuales, y Binance Academy documenta el ecosistema con explicaciones sobre [Bitcoin Stamps](https://academy.binance.com/en/articles/what-are-bitcoin-stamps) y [tokens SRC-20](https://academy.binance.com/en/glossary/src-20-tokens). Eso es seguimiento y educación, no un listado ni una asociación, y importa a su manera: cualquiera que investigue estos tokens ahora encuentra información precisa en plataformas en las que ya confía.

## BitMart: trading al contado de KEVIN y STAMP

El paso más claro en un exchange centralizado llegó el 23 de diciembre de 2025, cuando BitMart abrió el trading al contado de ambos tokens: [KEVIN/USDT](https://www.bitmart.com/crypto/KEVIN) y [STAMP/USDT](https://www.bitmart.com/crypto/STAMP), en su zona Meme e Innovación (anuncios de listado primario para [KEVIN](https://bitmart.zendesk.com/hc/en-us/articles/44674823250971--Primary-Listing-BitMart-Will-List-Bitcoin-Stamps-SRC-20-KEVIN-2025-12-23) y [STAMP](https://bitmart.zendesk.com/hc/en-us/articles/44675420348827--Primary-Listing-BitMart-Will-List-Bitcoin-Stamps-SRC-20-STAMP-2025-12-23)).

Dos tokens SRC-20 de Bitcoin Stamps, uno de ellos el token fundacional del protocolo, ahora se negocian en un exchange centralizado junto a los mercados nativos que los han sostenido desde el principio. La historia completa está en [KEVIN y STAMP se listan en BitMart](/es/blog/2025-12-kevin-stamp-bitmart-listing).

## Por qué KEVIN lleva la historia

<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> es el primer token SRC-20, y su historia es el ecosistema en miniatura. Empezó como arte: el Stamp #4258 en el bloque 783,718 el 3 de abril de 2023, un homenaje a la cultura Rare Pepe que empezó a replicarse por el sistema por sí solo. <EntityMention entity="arwyn">Arwyn</EntityMention> le dio después a esa energía una forma permanente, desplegando <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> como el primer token SRC-20 (Stamp #18,516) el 3 de mayo de 2023, en el bloque 788,041. Hoy cuenta con más de 2,300 holders.

## El juego largo

La presencia de SRC-20 en los exchanges está en una fase más temprana que la de algunos estándares de inscripciones más ruidosos, y Binance Academy lo dice sin rodeos. Lo que cuenta es la dirección: mercados nativos que negocian los tokens en el origen, soporte de monedero en OKX, seguimiento en los principales agregadores, cobertura educativa y trading al contado de KEVIN y STAMP en BitMart. El arte permanente en el conjunto UTXO de Bitcoin está encontrando su camino hacia las pantallas que la gente ya usa.
