---
title: "Sortie de l'indexeur Bitcoin Stamps v1.9.1"
date: "2026-07-04"
author: "reinamora"
description: "La version v1.9.1 de l'indexeur active l'encodage SRC-101 P2WSH/OLGA au bloc 940,000, ajoute une couche de données de marché et de webhooks, et réussit une revalidation de consensus complète du genèse jusqu'à la pointe, prouvée identique en hash au registre de production."
tags: ["indexer", "release", "src-101", "olga", "consensus", "announcement"]
leoType: "blog"
---

# Sortie de l'indexeur Bitcoin Stamps v1.9.1

L'indexeur Bitcoin Stamps **v1.9.1** est disponible. C'est la lignée de fonctionnalités 1.9 : un ensemble d'activations de protocole et de renforcements validés par consensus, comprenant l'encodage <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH/OLGA, une nouvelle couche de données de marché et de webhooks, un chemin de parsing accéléré en Rust et une revalidation de consensus complète du genèse jusqu'à la pointe.

Chaque changement affectant le consensus est conditionné par une activation ou par un flag (désactivé par défaut), et la version a été prouvée **identique en hash au registre de production** grâce à un reparsing depuis le genèse. Les notes de version complètes et l'image Docker sont sur GitHub : [stampchain-io/btc_stamps release 1.9.1](https://github.com/stampchain-io/btc_stamps/releases/tag/1.9.1).

## Points forts

- **Encodage <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH / <EntityMention entity="olga">OLGA</EntityMention>** s'active au **bloc 940,000**. Avant l'activation, SRC-101 n'est pris en charge que via le multisig simple (bare multisig) ; après l'activation, le multisig simple et le P2WSH fonctionnent tous les deux, différenciés au niveau du JSON (`"p":"src-101"`).
- **Détection des déploiements SRC-721R** pour les transactions P2WSH, parsing récursif des descriptions SRC-721 et un traitement double plus sûr pour les timbres maudits (cursed stamps).
- **Données de marché et historique des ventes** : un cache multi-source (KuCoin, StampScan) avec moyenne pondérée par confiance, des caches de détenteurs (holders) et un pipeline d'historique des ventes couvrant les distributeurs (dispensers), les échanges atomiques, l'OTC et les enchères.
- **Webhooks en temps réel** pour les nouveaux blocs et les réorganisations (reorgs), avec protection contre le SSRF, et non bloquants par conception, de sorte que les notifications n'affectent jamais l'indexation.
- **Performance** : un chemin de parsing accéléré en Rust dans la boucle principale de blocs, ainsi qu'une optimisation d'omission de CP qui évite les appels à l'API Counterparty sur les blocs sans données Counterparty (validée identique en hash).
- **Un nouveau snapshot d'amorçage (bootstrap) jusqu'au bloc 956,000** est publié pour une synchronisation rapide.

## Validation du consensus

La version mérite son label « validée par consensus ». Un reparsing du genèse jusqu'à la pointe sur Python 3.12 a correspondu au registre de production hash pour hash : les hachages de txlist et de registre ont concordé sur l'ensemble des 176,328 blocs, vérifiés par des contrôles de référence bloc par bloc. Toutes les montées de version de dépendances adjacentes au consensus ont passé la même épreuve de reparsing.

## Prise en charge de l'interpréteur (important)

Exécutez l'indexeur sur **Python 3.10, 3.11 ou 3.12**. Le consensus est prouvé identique octet par octet sur ces trois versions. **N'exécutez pas sur Python 3.13** : il a durci le décodage `base64`/`binascii` et diverge du consensus au bloc 783,775 (une mauvaise classification de timbre). L'image publiée `btcstamps/indexer:1.9.1` est construite sur Python 3.12, l'environnement d'exécution certifié.

## Notes de mise à niveau

- **Nécessite Counterparty `v11.0.1+`** (pour le correctif de l'endpoint de l'API CP V2).
- Appliquez le nouveau schéma (tables de données de marché, de cache de détenteurs et d'historique des ventes, plus une colonne `fee_rate_sat_vb` et de nouveaux index).
- Utilisez le snapshot d'amorçage jusqu'au bloc 956,000 sur S3 pour une synchronisation initiale rapide.

Cette version conserve la même discipline qui définit <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> depuis le bloc 779,652 : les nouvelles fonctionnalités arrivent derrière des hauteurs d'activation, et le consensus est prouvé face à la chaîne réelle avant toute publication.
