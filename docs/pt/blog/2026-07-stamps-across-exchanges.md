---
title: "Onde vivem os Bitcoin Stamps nas exchanges"
date: "2026-07-05"
author: "reinamora"
description: "Os Bitcoin Stamps e os tokens SRC-20 por todo o mercado: marketplaces nativos, suporte de carteira na OKX, descodificação em exploradores, seguimento em agregadores e negociação à vista de KEVIN e STAMP na BitMart."
tags: ["exchanges", "src-20", "kevin", "adoption"]
leoType: "blog"
---

# Onde vivem os Bitcoin Stamps nas exchanges

Os <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> gravam arte e tokens diretamente no conjunto UTXO do Bitcoin, de forma permanente e impossível de podar, e o mercado em geral continua a ligar-se a eles. Os tokens <EntityMention entity="src-20">SRC-20</EntityMention> são negociados nos seus marketplaces nativos e numa exchange centralizada, residem numa carteira Web3 importante, são renderizados de forma nativa num explorador de blocos de uso geral e aparecem nos agregadores que os traders já consultam. Cada camada faz algo diferente, e cada uma é real.

## Os marketplaces nativos vêm primeiro

A camada mais profunda é o próprio protocolo. O [OpenStamp](https://docs.openstamp.io/) e o [Stampscan](https://stampscan.xyz) negoceiam e indexam tokens SRC-20 de forma nativa: leem os tokens diretamente do Bitcoin, por isso o que vê ali é o próprio estado da cadeia, não o ledger de um terceiro. Para a vista canónica de qualquer token SRC-20, comece por aqui.

## OKX: suporte de carteira desde 2024

Em fevereiro de 2024, o OKX Web3 Wallet [adicionou suporte para o padrão Stamps SRC-20](https://www.globenewswire.com/news-release/2024/02/14/2828748/0/en/Flash-News-OKX-Wallet-Launches-Support-for-Stamps-SRC-20-Bitcoin-Inscriptions-Standard-Enhancing-User-Experience-with-Viewing-and-Transfer-Capabilities.html), permitindo aos utilizadores guardar, ver e transferir tokens SRC-20. Foi o primeiro sinal claro de que uma plataforma importante levava o padrão a sério.

O âmbito exato: isto é suporte de carteira, não uma listagem de negociação. A OKX não abriu um mercado à vista (spot) de SRC-20, e o seu marketplace de inscriptions sem comissões cobria outros padrões, não o SRC-20. Pode guardar e mover os seus tokens Stamps na OKX; a negociação acontece nas plataformas do resto deste mapa.

## Os exploradores de blocos descodificam os stamps de forma nativa

Alguns exploradores de Bitcoin de uso geral leem os stamps como stamps, não como outputs em bruto. O explorador da Blockchain.com descodifica os Bitcoin Stamps clássicos (da Counterparty) e renderiza a imagem de forma nativa: deteta os dados `STAMP:base64` na transação, etiqueta-a como um Bitcoin Stamp e mostra a imagem juntamente com as suas dimensões, tipo de media e asset ID. Abra uma [transação de stamp em direto](https://www.blockchain.com/explorer/transactions/btc/176a5d0329a8b48d5f86bcaf0078ccc3a57d50013744f4af3ea0c827347520ce) e a arte está mesmo ali.

Esse suporte chegou cedo na história do protocolo: um explorador de referência escolheu compreender o formato. A descodificação nativa da codificação mais recente, <EntityMention entity="olga">OLGA</EntityMention> (P2WSH), em todos os exploradores de uso geral ainda está a recuperar o atraso, por isso o [stampchain.io](https://stampchain.io) continua a ser a vista mais completa de cada stamp.

## Agregadores e educação

A descoberta também funciona. A CoinGecko mantém uma [categoria Top SRC-20 Coins](https://www.coingecko.com/en/categories/src-20), a CoinMarketCap tem páginas de preço para cada um dos tokens, e a Binance Academy documenta o ecossistema com explicações sobre os [Bitcoin Stamps](https://academy.binance.com/en/articles/what-are-bitcoin-stamps) e os [tokens SRC-20](https://academy.binance.com/en/glossary/src-20-tokens). Isso é seguimento e educação, não uma listagem nem uma parceria, e importa à sua maneira: quem investiga estes tokens encontra agora uma cobertura rigorosa em plataformas nas quais já confia.

## BitMart: negociação à vista de KEVIN e STAMP

O passo mais claro do lado de uma exchange centralizada chegou a 23 de dezembro de 2025, quando a BitMart abriu a negociação à vista de ambos os tokens: [KEVIN/USDT](https://www.bitmart.com/crypto/KEVIN) e [STAMP/USDT](https://www.bitmart.com/crypto/STAMP), na sua zona Meme e Inovação (anúncios de listagem primária para [KEVIN](https://bitmart.zendesk.com/hc/en-us/articles/44674823250971--Primary-Listing-BitMart-Will-List-Bitcoin-Stamps-SRC-20-KEVIN-2025-12-23) e [STAMP](https://bitmart.zendesk.com/hc/en-us/articles/44675420348827--Primary-Listing-BitMart-Will-List-Bitcoin-Stamps-SRC-20-STAMP-2025-12-23)).

Dois tokens SRC-20 Bitcoin Stamps, um deles o token fundador do protocolo, são agora negociados numa exchange centralizada, ao lado dos mercados nativos que os sustentam desde o início. A história completa está em [KEVIN e STAMP listam na BitMart](/pt/blog/2025-12-kevin-stamp-bitmart-listing).

## Porque é KEVIN quem carrega a história

<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> é o primeiro token SRC-20, e a sua história é o ecossistema em miniatura. Começou como arte: o Stamp #4258 no bloco 783,718 a 3 de abril de 2023, uma homenagem à cultura Rare Pepe que começou a replicar-se pelo sistema por si só. <EntityMention entity="arwyn">Arwyn</EntityMention> deu depois a essa energia uma forma permanente, implementando <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> como o primeiro token SRC-20 (Stamp #18,516) a 3 de maio de 2023, no bloco 788,041. Hoje conta com mais de 2300 detentores.

## O jogo longo

A presença do SRC-20 nas exchanges está numa fase mais inicial do que a de alguns padrões de inscriptions mais ruidosos, e a Binance Academy di-lo sem rodeios. O que conta é a direção: mercados nativos a negociar os tokens na origem, suporte de carteira na OKX, seguimento nos principais agregadores, cobertura educativa e negociação à vista de KEVIN e STAMP na BitMart. A arte permanente no conjunto UTXO do Bitcoin está a encontrar o seu caminho até aos ecrãs que as pessoas já usam.
