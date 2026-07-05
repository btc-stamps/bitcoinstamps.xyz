---
title: "Whitepaper do protocolo Bitcoin Stamps publicado"
date: "2026-02-25"
author: "reinamora"
description: "O whitepaper técnico oficial do protocolo Bitcoin Stamps já está disponível, documentando a especificação completa dos ativos digitais permanentes no Bitcoin através do armazenamento em UTXO."
tags: ["whitepaper", "protocol", "src-20", "bitcoin-stamps", "announcement"]
leoType: "blog"
---

# Whitepaper do protocolo Bitcoin Stamps publicado

Após anos a construir, iterar e refinar o protocolo que tornou os ativos digitais permanentes no Bitcoin uma realidade, temos o orgulho de anunciar a publicação oficial do whitepaper técnico do protocolo <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>.

Este documento representa a culminação de um trabalho iniciado no bloco 779,652, quando <EntityMention entity="mikeinspace">mikeinspace</EntityMention> inscreveu o primeiríssimo Bitcoin Stamp, um momento que deu início a um movimento que nenhum de nós conseguia prever por completo.

## O que o whitepaper abrange

O whitepaper é uma especificação técnica completa do metaprotocolo <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>, cobrindo cada camada da pilha do protocolo:

**Arquitetura do protocolo.** Como o Bitcoin Stamps tira partido do conjunto UTXO para o armazenamento permanente de dados críticos para o consenso. Ao contrário das abordagens baseadas em witness data que os nós completos podem podar, os dados de um stamp vivem em outputs de transação gastáveis. Cada nó completo tem de os armazenar. Essa garantia de permanência é fundamental.

**Padrões de tokens.** A especificação completa dos tokens fungíveis <EntityMention entity="src-20">SRC-20</EntityMention> (operações DEPLOY, MINT, TRANSFER), dos ativos não fungíveis SRC-721, da nomeação descentralizada SRC-101 e da recursão componível SRC-721r. O modelo de saldo baseado em contas que sustenta o <EntityMention entity="src-20">SRC-20</EntityMention> é documentado em detalhe, deixando claro por que difere dos esquemas de tokens ligados ao UTXO.

**Modelo económico.** As estruturas de taxas e a poupança de custos real proporcionada pela otimização OLGA P2WSH (redução de 30-95% face ao bare multisig), ativada no bloco 865,000.

**Análise de segurança.** O modelo de ameaças, os vetores de ataque e as garantias de permanência que tornam o <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> duradouro ao longo de toda a vida do Bitcoin.

**Propostas de melhoria de Stamps.** O quadro de governação SIP e as propostas ativas atuais (de SIP-0001 a SIP-0008) que moldam o futuro do protocolo.

## Um protocolo construído pela comunidade

O whitepaper não é a obra de um único autor. Documenta um protocolo que emergiu de uma colaboração genuína:

<EntityMention entity="mikeinspace">mikeinspace</EntityMention> trouxe a visão original: a ideia de que os ativos digitais podiam ser armazenados de forma permanente no conjunto UTXO do Bitcoin, imunes à poda, garantidos pelo consenso.

Arwyn deu a essa visão a sua primeira expressão cultural, criando o Bitcoin Stamp #4258 no bloco 783,718, e canalizando mais tarde essa energia criativa para o primeiro token <EntityMention entity="src-20">SRC-20</EntityMention>, <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>, no bloco 788,041.

Reinamora arquitetou os protocolos técnicos que transformaram a visão em infraestrutura funcional: o indexador, os esquemas de codificação, as regras de consenso e, por fim, a otimização OLGA que tornou o protocolo economicamente acessível a todos.

O próprio <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> continua a ser a prova viva de que o protocolo funciona como pretendido: o primeiro token <EntityMention entity="src-20">SRC-20</EntityMention> de lançamento justo, com mais de 2,300 detentores que aderiram não pelo alarido, mas pelo reconhecimento daquilo que o protocolo representa.

## Ler o whitepaper

O whitepaper está disponível em vários formatos:

- **[Descarregar PDF](/bitcoin-stamps-whitepaper.pdf)**: para arquivo e leitura offline.
- **[Ver HTML](/bitcoin-stamps-whitepaper.html)**: legível no navegador com a formatação completa.
- **[Fonte Markdown](/bitcoin-stamps-whitepaper-combined.md)**: para programadores e colaboradores.

As secções individuais também estão disponíveis no [GitHub](https://github.com/stampchain-io/btc_stamps/tree/main/docs/whitepaper) para quem quiser ler a arquitetura, os padrões de tokens ou a análise de segurança de forma isolada.

## Cronologia do protocolo

O whitepaper documenta a evolução completa do protocolo:

| Bloco | Marco |
|------:|-----------|
| 779,652 | Primeiro Bitcoin Stamp |
| 788,041 | Primeiro token SRC-20 (<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>) |
| 793,068 | Primeira codificação nativa do Bitcoin |
| 796,000 | Corte da Counterparty (regra de consenso SRC-20) |
| 865,000 | Ativação da OLGA (otimização P2WSH) |

## O que vem a seguir

Um whitepaper é documentação, não um destino. O protocolo continua a evoluir através do processo SIP. As propostas ativas estão a abordar a otimização de taxas, novas capacidades de tokens e casos de uso alargados para dados permanentes on-chain.

Se estás a construir sobre <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>, o whitepaper é a tua referência canónica. Se és novo no protocolo, é o melhor documento único para compreender por que esta abordagem aos ativos digitais permanentes no Bitcoin é diferente, e por que essa diferença importa.

---

*O whitepaper já está disponível em [bitcoinstamps.xyz/en/whitepaper/](/en/whitepaper/).*

*Junta-te à comunidade no [Telegram](https://t.me/BitcoinStamps) e explora o ecossistema em [stampchain.io](https://stampchain.io).*

*In Lak'ech Ala K'in, somos todos <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>.*
