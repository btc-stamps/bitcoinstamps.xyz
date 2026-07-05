---
title: "O indexador de stamps torna-se open source"
date: "2024-06-24"
author: "reinamora"
description: "A 24 de junho de 2024, os programadores principais abriram o código de todo o indexador Bitcoin Stamps, abrangendo o suporte a Classic Stamps, OLGA, SRC-20, SRC-721 e SRC-101."
tags: ["history", "indexer", "open-source", "milestone"]
leoType: "blog"
---

# O indexador de stamps torna-se open source

A 24 de junho de 2024, os programadores principais abriram o código de todo o indexador <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>. O código completo que lê a cadeia e reconstrói o estado dos stamps tornou-se público, e isso é mais importante do que pode parecer.

## Porque é que um indexador importa

Os dados do Bitcoin Stamps vivem no conjunto UTXO, mas os nós do Bitcoin não sabem o que é um stamp. Veem saídas de transação, não arte nem saldos de tokens. Algo tem de ler a cadeia em bruto, encontrar as transações de stamps, descodificá-las e construir o ledger daquilo que existe e de quem o detém. Esse algo é o indexador.

Se o indexador for fechado, a comunidade tem de confiar na palavra de uma só parte sobre o verdadeiro estado do protocolo. Abrir o código elimina esse requisito de confiança. Qualquer pessoa pode correr o mesmo código, indexar desde a génese e verificar a resposta por si própria.

## O que o lançamento abrange

O indexador open source trata de toda a família de padrões:

- **Classic Stamps**, a arte original em multisig simples (bare multisig).
- **<EntityMention entity="olga">OLGA</EntityMention>**, a codificação P2WSH que reduziu o tamanho e as taxas.
- **<EntityMention entity="src-20">SRC-20</EntityMention>**, os tokens fungíveis, incluindo as regras de codificação nativa.
- **SRC-721**, os NFTs componíveis.
- **<EntityMention entity="src-101">SRC-101</EntityMention>**, a nomeação descentralizada.

É todo o caminho relevante para o consenso numa só base de código, pelo que uma única execução pode validar o protocolo inteiro contra a cadeia.

## Verificável por qualquer pessoa

O open source transforma afirmações em coisas que se podem testar. Quando um lançamento diz que está validado por consenso, não é preciso aceitá-lo por fé. Puxa-se o código, reprocessa-se desde o bloco 779,652 e comparam-se os hashes. Essa disciplina é aquilo sobre que os lançamentos posteriores se constroem, precisamente através do gate de reprocessamento desde a génese que o projeto ainda usa.

Abrir o código do indexador colocou o <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> onde um protocolo que prioriza a permanência deve estar: totalmente inspecionável, executável de forma independente e pertencente à sua comunidade, e não a uma única equipa.

---

*O indexador vive em [stampchain-io/btc_stamps no GitHub](https://github.com/stampchain-io/btc_stamps). Explore o ecossistema em [stampchain.io](https://stampchain.io).*
