---
title: "OLGA: stamps mais baratos e maiores via P2WSH"
date: "2024-03-03"
author: "reinamora"
description: "A OLGA moveu a codificação dos stamps para P2WSH, ativando para os Classic Stamps no bloco 833,000 e para o SRC-20 no bloco 865,000. Reduz o tamanho da transação em cerca de metade e as taxas em 60-70%."
tags: ["history", "olga", "milestone", "p2wsh", "fees"]
leoType: "blog"
---

# OLGA: stamps mais baratos e maiores via P2WSH

A <EntityMention entity="olga">OLGA</EntityMention> é a atualização de codificação que tornou o <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> mais barato e maior ao mesmo tempo. Moveu os dados dos stamps para saídas P2WSH, e eliminou uma fatia de sobrecarga que cada stamp anterior andava a pagar.

## Duas alturas de ativação

A OLGA foi lançada em duas fases, cada uma fixada a um bloco. A codificação P2WSH para os Classic Stamps ativou no bloco 833,000, a 3 de março de 2024. O primeiro stamp OLGA P2WSH do <EntityMention entity="src-20">SRC-20</EntityMention> chegou mais tarde, no bloco 865,000, a 10 de outubro de 2024. Ambas as alturas são pontos de verificação de consenso, pelo que os indexadores sabem exatamente quando cada caminho é ativado.

## O que a P2WSH muda

A codificação mais antiga apoiava-se em saídas multisig simples (bare multisig) e envolvia os dados em Base64. O Base64 torna os dados binários seguros para transportar, mas acrescenta cerca de um terço de bytes extra apenas para codificação. Numa cadeia onde se paga por byte, essa sobrecarga é um custo real.

A OLGA elimina a camada Base64 e usa, em vez disso, saídas Pay-to-Witness-Script-Hash (P2WSH). O resultado:

- As transações ficam cerca de 50% mais pequenas.
- As taxas caem aproximadamente 60 a 70%.
- Uma única transação de stamp pode transportar até cerca de 64 kB de dados.

Mais pequeno e mais barato significa que mais pessoas podem criar stamps, e uma maior capacidade por transação significa que arte mais rica cabe on-chain.

## A mesma permanência, custo mais baixo

A parte importante: nada disto enfraqueceu a garantia de permanência. Os stamps OLGA continuam a viver no conjunto UTXO, continuam a não poder ser podados, continuam a herdar a durabilidade do próprio Bitcoin. A OLGA mudou a forma como os dados são empacotados, não o local onde vivem.

É esse o padrão que o <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> continua a repetir: introduzir melhorias por detrás de alturas de ativação, prová-las contra a cadeia e nunca trocar permanência por conveniência. A OLGA tornou o protocolo acessível a muito mais pessoas sem abdicar daquilo que faz de um stamp um stamp.

---

*Leia o modelo económico no [Whitepaper do Bitcoin Stamps](/en/whitepaper/), e explore o ecossistema em [stampchain.io](https://stampchain.io).*
