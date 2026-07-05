---
title: "SRC-20 torna-se nativo: independência da Counterparty"
date: "2023-06-06"
author: "reinamora"
description: "A 6 de junho de 2023, no bloco 793,068, o SRC-20 codificou-se diretamente no Bitcoin pela primeira vez. O corte da Counterparty no bloco 796,000 tornou a codificação nativa a regra de consenso."
tags: ["history", "src-20", "counterparty", "milestone", "consensus"]
leoType: "blog"
---

# SRC-20 torna-se nativo: independência da Counterparty

A 6 de junho de 2023, no bloco 793,068, o <EntityMention entity="src-20">SRC-20</EntityMention> codificou-se diretamente no Bitcoin pela primeira vez. É um marco de soberania: o padrão de tokens deixou de depender de outro protocolo e começou a escrever-se diretamente na cadeia base.

## O ponto de partida na Counterparty

As primeiras transações <EntityMention entity="src-20">SRC-20</EntityMention> apoiavam-se na <EntityMention entity="counterparty">Counterparty</EntityMention>, um metaprotocolo que existia no Bitcoin desde 2014. A Counterparty deu ao padrão um caminho de codificação funcional nos seus primeiros dias, e isso permitiu à comunidade avançar depressa.

Mas depender de outro protocolo significa herdar os seus pressupostos e as suas restrições. Para um padrão construído em torno da permanência e da autossuficiência, essa dependência era uma ponta solta.

## Codificação nativa no bloco 793,068

O bloco 793,068 é onde o <EntityMention entity="src-20">SRC-20</EntityMention> ganhou a sua própria codificação nativa no Bitcoin. A partir daí, uma implementação (deploy), cunhagem (mint) ou transferência podia escrever-se diretamente no Bitcoin sem passar pela Counterparty. Os dados do token vão parar ao mesmo armazenamento baseado em UTXO que dá permanência a cada stamp.

## O corte no bloco 796,000

A codificação nativa, só por si, não era toda a história. O protocolo também traçou uma linha rígida. No bloco 796,000, a 26 de junho de 2023, o <EntityMention entity="src-20">SRC-20</EntityMention> baseado na <EntityMention entity="counterparty">Counterparty</EntityMention> tornou-se inválido. Depois dessa altura, a regra de consenso é clara: o SRC-20 é codificação nativa no Bitcoin, ponto final.

Esse corte foi o que transformou uma nova capacidade num verdadeiro padrão. Não há ambiguidade sobre quais transações contam. Indexadores, carteiras e qualquer pessoa a validar a cadeia seguem a mesma regra, ancorada a um bloco específico.

## Porque é que a soberania importa aqui

A independência da <EntityMention entity="counterparty">Counterparty</EntityMention> significa que o <EntityMention entity="src-20">SRC-20</EntityMention> assenta apenas no Bitcoin. Sem um segundo protocolo em que confiar, sem um conjunto de regras externo a acompanhar. A garantia de permanência que começou com o primeiro stamp cobre agora os tokens fungíveis de ponta a ponta, decidida inteiramente pelo consenso do Bitcoin.

---

*Leia a especificação de codificação no [Whitepaper do Bitcoin Stamps](/en/whitepaper/), e explore o ecossistema em [stampchain.io](https://stampchain.io).*
