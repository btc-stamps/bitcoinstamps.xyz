---
title: "SRC-721 : de l'art on-chain composable"
date: "2023-06-01"
author: "reinamora"
description: "Le 1er juin 2023, au bloc 792 370, la première implémentation SRC-721 a apporté des NFT composables et en couches à Bitcoin Stamps, en référençant de l'art on-chain pour réduire le coût de frappe."
tags: ["history", "src-721", "milestone", "nft"]
leoType: "blog"
---

# SRC-721 : de l'art on-chain composable

Le 1er juin 2023, au bloc 792 370, la première implémentation <EntityMention entity="src-721">SRC-721</EntityMention> est passée en production sur <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>. Elle a apporté des actifs non fongibles composables et en couches au protocole, et elle a résolu un vrai problème de coût.

## Le problème de coût qu'elle a résolu

Stocker une image complète dans l'ensemble UTXO de Bitcoin est permanent, mais ce n'est pas gratuit. Une grande collection où chaque NFT porte sa propre œuvre complète devient vite coûteuse. C'est acceptable pour une pièce isolée. C'est douloureux pour un ensemble de milliers.

SRC-721 a pris une voie différente. Au lieu de re-stamper les mêmes actifs encore et encore, un token SRC-721 référence de l'art déjà présent on-chain et compose la pièce finale à partir de ces couches. Un trait se trouve on-chain une seule fois, puis de nombreux tokens pointent vers lui. Le coût de frappe (mint) baisse parce que vous ne payez pas pour stocker les mêmes pixels encore et encore.

## La composabilité comme idée de premier plan

Le mot clé est composable. Un token n'est pas une image plate unique, c'est une recette : cet arrière-plan, ce corps, ces yeux, assemblés à partir de couches qui vivent en permanence dans l'ensemble UTXO. La recette est petite et bon marché. Les couches sont partagées.

Cette conception a rendu pratiques des collections plus grandes et plus riches sur Bitcoin Stamps sans renoncer à la garantie de permanence qui a commencé au bloc 779 652.

## Où cela a mené

SRC-721 ne s'est pas arrêté aux références en couches. Il a ensuite évolué vers SRC-721r, qui ajoute la récursion : des tokens qui s'appuient sur d'autres données on-chain de manières plus profondes et plus flexibles. Le travail sur la récursion est né directement de la fondation composable posée au bloc 792 370.

SRC-721 se tient aux côtés des tokens fongibles <EntityMention entity="src-20">SRC-20</EntityMention> et des noms <EntityMention entity="src-101">SRC-101</EntityMention> dans le cadre de la famille plus large de standards Bitcoin Stamps. Chacun répond à un besoin différent, et tous héritent de la même règle : les données sont permanentes parce qu'elles vivent là où Bitcoin ne peut pas les élaguer.

---

*Lisez les standards de token dans le [Whitepaper de Bitcoin Stamps](/en/whitepaper/), et explorez l'écosystème sur [stampchain.io](https://stampchain.io).*
