---
title: "Publication du whitepaper du protocole Bitcoin Stamps"
date: "2026-02-25"
author: "reinamora"
description: "Le whitepaper technique officiel du protocole Bitcoin Stamps est désormais disponible, documentant la spécification complète des actifs numériques permanents sur Bitcoin via le stockage dans l'UTXO."
tags: ["whitepaper", "protocol", "src-20", "bitcoin-stamps", "announcement"]
leoType: "blog"
---

# Publication du whitepaper du protocole Bitcoin Stamps

Après des années passées à construire, itérer et affiner le protocole qui a fait des actifs numériques permanents sur Bitcoin une réalité, nous sommes fiers d'annoncer la sortie officielle du whitepaper technique du protocole <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>.

Ce document représente l'aboutissement d'un travail entamé au bloc 779 652, quand <EntityMention entity="mikeinspace">mikeinspace</EntityMention> a inscrit le tout premier Bitcoin Stamp, un moment qui a lancé un mouvement qu'aucun de nous n'aurait pu pleinement prédire.

## Ce que couvre le whitepaper

Le whitepaper est une spécification technique complète du métaprotocole <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>, couvrant chaque couche de la pile du protocole :

**Architecture du protocole.** Comment Bitcoin Stamps exploite l'ensemble UTXO pour un stockage de données permanent et critique pour le consensus. Contrairement aux approches fondées sur les witness data que les nœuds complets peuvent élaguer, les données d'un stamp vivent dans des sorties de transaction dépensables. Chaque nœud complet doit les stocker. Cette garantie de permanence est fondamentale.

**Standards de token.** La spécification complète des tokens fongibles <EntityMention entity="src-20">SRC-20</EntityMention> (opérations DEPLOY, MINT, TRANSFER), des actifs non fongibles SRC-721, du nommage décentralisé SRC-101 et de la récursion composable SRC-721r. Le modèle de solde fondé sur les comptes qui sous-tend le <EntityMention entity="src-20">SRC-20</EntityMention> est documenté en détail, mettant en évidence pourquoi il diffère des schémas de token liés à l'UTXO.

**Modèle économique.** Les structures de frais et les économies de coûts réelles apportées par l'optimisation OLGA P2WSH (réduction de 30 à 95 % par rapport au bare multisig), activée au bloc 865 000.

**Analyse de sécurité.** Le modèle de menace, les vecteurs d'attaque et les garanties de permanence qui rendent <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> durable tout au long de la vie de Bitcoin.

**Propositions d'amélioration de Stamps.** Le cadre de gouvernance SIP et les propositions actives actuelles (de SIP-0001 à SIP-0008) qui façonnent l'avenir du protocole.

## Un protocole bâti par la communauté

Le whitepaper n'est pas l'œuvre d'un seul auteur. Il documente un protocole né d'une véritable collaboration :

<EntityMention entity="mikeinspace">mikeinspace</EntityMention> a apporté la vision originale : l'idée que des actifs numériques pouvaient être stockés de façon permanente dans l'ensemble UTXO de Bitcoin, à l'abri de l'élagage, garantis par le consensus.

Arwyn a donné à cette vision sa première expression culturelle, en créant le Bitcoin Stamp #4258 au bloc 783 718, puis en canalisant cette énergie créative dans le premier token <EntityMention entity="src-20">SRC-20</EntityMention>, <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>, au bloc 788 041.

Reinamora a architecturé les protocoles techniques qui ont transformé la vision en infrastructure fonctionnelle : l'indexeur, les schémas d'encodage, les règles de consensus et, finalement, l'optimisation OLGA qui a rendu le protocole économiquement accessible à tous.

<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> lui-même demeure la preuve vivante que le protocole fonctionne comme prévu : le premier token <EntityMention entity="src-20">SRC-20</EntityMention> à lancement équitable, avec plus de 2 300 détenteurs qui l'ont rejoint non par battage médiatique, mais par reconnaissance de ce que le protocole représente.

## Lire le whitepaper

Le whitepaper est disponible en plusieurs formats :

- **[Télécharger le PDF](/bitcoin-stamps-whitepaper.pdf)** : pour l'archivage et la lecture hors ligne.
- **[Voir le HTML](/bitcoin-stamps-whitepaper.html)** : lisible dans le navigateur avec la mise en forme complète.
- **[Source Markdown](/bitcoin-stamps-whitepaper-combined.md)** : pour les développeurs et les contributeurs.

Les sections individuelles sont également disponibles sur [GitHub](https://github.com/stampchain-io/btc_stamps/tree/main/docs/whitepaper) pour ceux qui veulent lire l'architecture, les standards de token ou l'analyse de sécurité isolément.

## Chronologie du protocole

Le whitepaper documente l'évolution complète du protocole :

| Bloc | Jalon |
|------:|-----------|
| 779 652 | Premier Bitcoin Stamp |
| 788 041 | Premier token SRC-20 (<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>) |
| 793 068 | Premier encodage natif Bitcoin |
| 796 000 | Coupure Counterparty (règle de consensus SRC-20) |
| 865 000 | Activation d'OLGA (optimisation P2WSH) |

## La suite

Un whitepaper est une documentation, pas une destination. Le protocole continue d'évoluer via le processus SIP. Les propositions actives traitent de l'optimisation des frais, de nouvelles capacités de token et de cas d'usage élargis pour les données permanentes on-chain.

Si vous construisez sur <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>, le whitepaper est votre référence canonique. Si vous découvrez le protocole, c'est le meilleur document unique pour comprendre pourquoi cette approche des actifs numériques permanents sur Bitcoin est différente, et pourquoi cette différence compte.

---

*Le whitepaper est disponible dès maintenant sur [bitcoinstamps.xyz/en/whitepaper/](/en/whitepaper/).*

*Rejoignez la communauté sur [Telegram](https://t.me/BitcoinStamps) et explorez l'écosystème sur [stampchain.io](https://stampchain.io).*

*In Lak'ech Ala K'in, nous sommes tous <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>.*
