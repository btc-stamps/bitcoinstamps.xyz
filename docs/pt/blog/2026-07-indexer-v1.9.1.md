---
title: "Lançamento do indexador Bitcoin Stamps v1.9.1"
date: "2026-07-04"
author: "reinamora"
description: "A versão v1.9.1 do indexador ativa a codificação SRC-101 P2WSH/OLGA no bloco 940,000, adiciona uma camada de dados de mercado e webhooks, e passa por uma revalidação de consenso completa da génese até à ponta da cadeia, comprovada idêntica em hash ao ledger de produção."
tags: ["indexer", "release", "src-101", "olga", "consensus", "announcement"]
leoType: "blog"
---

# Lançamento do indexador Bitcoin Stamps v1.9.1

O indexador Bitcoin Stamps **v1.9.1** já está disponível. É a linha de funcionalidades 1.9: um conjunto de ativações de protocolo e reforços validados por consenso, incluindo a codificação <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH/OLGA, uma nova camada de dados de mercado e webhooks, um caminho de parsing acelerado em Rust e uma revalidação de consenso completa da génese até à ponta da cadeia.

Cada mudança que afeta o consenso é condicionada por ativação ou por uma flag (desativada por predefinição), e a versão foi comprovada **idêntica em hash ao ledger de produção** através de um reparsing desde a génese. As notas de versão completas e a imagem Docker estão no GitHub: [stampchain-io/btc_stamps release 1.9.1](https://github.com/stampchain-io/btc_stamps/releases/tag/1.9.1).

## Destaques

- **Codificação <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH / <EntityMention entity="olga">OLGA</EntityMention>** é ativada no **bloco 940,000**. Antes da ativação, o SRC-101 é suportado apenas via multisig simples (bare multisig); após a ativação, tanto o multisig simples como o P2WSH funcionam, diferenciados no nível do JSON (`"p":"src-101"`).
- **Deteção de deploys SRC-721R** para transações P2WSH, parsing recursivo de descrições SRC-721 e um processamento duplo mais seguro para stamps amaldiçoados (cursed stamps).
- **Dados de mercado e histórico de vendas**: um cache multifonte (KuCoin, StampScan) com média ponderada por confiança, caches de detentores (holders) e um pipeline de histórico de vendas que abrange dispensadores, trocas atómicas (atomic swaps), OTC e leilões.
- **Webhooks em tempo real** para novos blocos e reorganizações (reorgs), com proteção contra SSRF, e não bloqueantes por design, de modo que as notificações nunca afetam a indexação.
- **Desempenho**: um caminho de parsing acelerado em Rust no ciclo principal de blocos, além de uma otimização de omissão de CP que evita chamadas à API da Counterparty em blocos sem dados da Counterparty (validada idêntica em hash).
- **Um novo snapshot de bootstrap até o bloco 956,000** é publicado para sincronização rápida.

## Validação de consenso

A versão merece o seu rótulo de "validada por consenso". Um reparsing da génese até à ponta da cadeia no Python 3.12 correspondeu ao ledger de produção hash a hash: os hashes de txlist e de ledger concordaram em todos os 176,328 blocos, verificados com verificações de referência bloco a bloco. Todas as atualizações de dependências adjacentes ao consenso passaram pelo mesmo teste de reparsing.

## Interpretadores suportados (importante)

Execute o indexador em **Python 3.10, 3.11 ou 3.12**. O consenso está comprovado como idêntico byte a byte nessas três versões. **Não execute no Python 3.13**: ele tornou mais estrita a descodificação de `base64`/`binascii` e diverge do consenso no bloco 783,775 (uma classificação incorreta de um stamp). A imagem publicada `btcstamps/indexer:1.9.1` é construída sobre o Python 3.12, o runtime certificado.

## Notas de atualização

- **Requer Counterparty `v11.0.1+`** (para a correção do endpoint da API CP V2).
- Aplique o novo esquema (tabelas de dados de mercado, cache de detentores e histórico de vendas, além de uma coluna `fee_rate_sat_vb` e novos índices).
- Use o snapshot de bootstrap até o bloco 956,000 no S3 para uma sincronização inicial rápida.

Esta versão mantém a mesma disciplina que define o <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> desde o bloco 779,652 em diante: as novas funcionalidades entram atrás de alturas de ativação, e o consenso é comprovado contra a cadeia real antes de qualquer coisa ser publicada.
