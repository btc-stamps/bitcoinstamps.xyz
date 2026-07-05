---
title: "SRC-721: arte on-chain componível"
date: "2023-06-01"
author: "reinamora"
description: "A 1 de junho de 2023, no bloco 792,370, a primeira implementação de SRC-721 trouxe NFTs em camadas e componíveis ao Bitcoin Stamps, referenciando arte on-chain para reduzir o custo de cunhagem."
tags: ["history", "src-721", "milestone", "nft"]
leoType: "blog"
---

# SRC-721: arte on-chain componível

A 1 de junho de 2023, no bloco 792,370, a primeira implementação de <EntityMention entity="src-721">SRC-721</EntityMention> entrou em funcionamento no <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>. Trouxe ativos não fungíveis componíveis e em camadas ao protocolo, e resolveu um problema real de custo.

## O problema de custo que resolveu

Armazenar uma imagem completa no conjunto UTXO do Bitcoin é permanente, mas não é gratuito. Uma coleção grande, em que cada NFT carrega a sua própria obra completa, torna-se cara depressa. Isso não é problema para uma peça única. É doloroso para um conjunto de milhares.

O SRC-721 seguiu um caminho diferente. Em vez de voltar a estampar os mesmos ativos vezes sem conta, um token SRC-721 referencia arte que já está on-chain e compõe a peça final a partir dessas camadas. Um traço fica on-chain uma vez, e depois muitos tokens apontam para ele. O custo de cunhagem cai porque não se está a pagar para armazenar os mesmos pixels repetidamente.

## A componibilidade como ideia de primeira classe

A palavra-chave é componível. Um token não é uma imagem única e achatada, é uma receita: este fundo, aquele corpo, estes olhos, montados a partir de camadas que vivem permanentemente no conjunto UTXO. A receita é pequena e barata. As camadas são partilhadas.

Esse desenho tornou práticas coleções maiores e mais ricas no Bitcoin Stamps, sem abdicar da garantia de permanência que começou no bloco 779,652.

## Aonde levou

O SRC-721 não parou nas referências em camadas. Evoluiu mais tarde para o SRC-721r, que acrescenta recursão: tokens que se constroem sobre outros dados on-chain de formas mais profundas e flexíveis. O trabalho de recursão nasceu diretamente dos alicerces componíveis estabelecidos no bloco 792,370.

O SRC-721 coloca-se ao lado dos tokens fungíveis <EntityMention entity="src-20">SRC-20</EntityMention> e dos nomes <EntityMention entity="src-101">SRC-101</EntityMention> como parte da família mais alargada de padrões do Bitcoin Stamps. Cada um responde a uma necessidade diferente, e todos herdam a mesma regra: os dados são permanentes porque vivem onde o Bitcoin não os pode podar.

---

*Leia os padrões de tokens no [Whitepaper do Bitcoin Stamps](/en/whitepaper/), e explore o ecossistema em [stampchain.io](https://stampchain.io).*
