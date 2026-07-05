---
title: "L'indexeur Stamps passe en open source"
date: "2024-06-24"
author: "reinamora"
description: "Le 24 juin 2024, les développeurs principaux ont ouvert le code de l'indexeur Bitcoin Stamps complet, couvrant la prise en charge des Classic Stamps, d'OLGA, de SRC-20, de SRC-721 et de SRC-101."
tags: ["history", "indexer", "open-source", "milestone"]
leoType: "blog"
---

# L'indexeur Stamps passe en open source

Le 24 juin 2024, les développeurs principaux ont ouvert le code de l'indexeur <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> complet. Le code intégral qui lit la chaîne et reconstruit l'état des stamps est devenu public, et c'est plus important que cela n'en a l'air.

## Pourquoi un indexeur compte

Les données de Bitcoin Stamps vivent dans l'ensemble UTXO, mais les nœuds Bitcoin ne savent pas ce qu'est un stamp. Ils voient des sorties de transaction, pas de l'art ni des soldes de tokens. Quelque chose doit lire la chaîne brute, trouver les transactions de stamps, les décoder et construire le registre de ce qui existe et de qui le détient. Ce quelque chose, c'est l'indexeur.

Si l'indexeur est fermé, la communauté doit se fier à la parole d'une seule partie sur le véritable état du protocole. Ouvrir son code supprime cette exigence de confiance. N'importe qui peut exécuter le même code, indexer depuis la genèse et vérifier la réponse par lui-même.

## Ce que couvre la version

L'indexeur open source gère toute la famille de standards :

- **Classic Stamps**, l'art bare-multisig d'origine.
- **<EntityMention entity="olga">OLGA</EntityMention>**, l'encodage P2WSH qui a réduit la taille et les frais.
- **<EntityMention entity="src-20">SRC-20</EntityMention>**, les tokens fongibles, y compris les règles d'encodage natif.
- **SRC-721**, les NFT composables.
- **<EntityMention entity="src-101">SRC-101</EntityMention>**, le nommage décentralisé.

C'est l'ensemble des voies pertinentes pour le consensus dans une seule base de code, de sorte qu'une seule exécution peut valider tout le protocole face à la chaîne.

## Vérifiable par quiconque

L'open source transforme les affirmations en choses que vous pouvez tester. Quand une version dit qu'elle est validée par consensus, vous n'avez pas à le croire sur parole. Vous récupérez le code, vous reparsez depuis le bloc 779 652 et vous comparez les hachages. Cette discipline est ce sur quoi les versions ultérieures s'appuient, jusqu'à l'épreuve de reparsing depuis la genèse que le projet utilise encore.

Ouvrir le code de l'indexeur a placé <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> là où un protocole qui privilégie la permanence devrait être : entièrement inspectable, exécutable de façon indépendante, et possédé par sa communauté plutôt que par une seule équipe.

---

*L'indexeur se trouve sur [stampchain-io/btc_stamps sur GitHub](https://github.com/stampchain-io/btc_stamps). Explorez l'écosystème sur [stampchain.io](https://stampchain.io).*
