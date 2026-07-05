---
title: "Le premier Bitcoin Stamp"
date: "2023-03-07"
author: "reinamora"
description: "Le 7 mars 2023, au bloc 779 652, mikeinspace a créé le Stamp 0 et lancé le protocole Bitcoin Stamps : de l'art permanent stocké directement dans l'ensemble UTXO de Bitcoin."
tags: ["history", "bitcoin-stamps", "milestone", "genesis"]
leoType: "blog"
---

# Le premier Bitcoin Stamp

Le 7 mars 2023, au bloc 779 652, <EntityMention entity="mikeinspace">mikeinspace</EntityMention> a créé le Stamp 0. C'est une petite œuvre de pixel art aux yeux laser, et c'est la genèse du protocole <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>.

Le Stamp 0 n'était pas qu'une image sur la chaîne. C'était la preuve d'une idée différente sur l'endroit où l'art numérique devrait vivre.

## Pourquoi l'ensemble UTXO compte

La plupart des approches d'art on-chain stockent les données dans des endroits qu'un nœud complet peut supprimer plus tard. Les witness data peuvent être élaguées (pruned). Les références hors chaîne peuvent pourrir quand l'hôte disparaît. <EntityMention entity="mikeinspace">mikeinspace</EntityMention> voulait quelque chose de plus solide : de l'art que chaque nœud complet doit conserver, pour toujours, parce qu'il fait partie de l'état dépensable de Bitcoin.

Bitcoin Stamps a placé les données de l'image dans l'ensemble UTXO lui-même. C'est l'ensemble des sorties de transaction non dépensées que chaque nœud suit pour savoir quelles pièces existent. Les données stockées là ne peuvent pas être élaguées sans casser la vision que le nœud a de la chaîne. Un stamp est donc aussi permanent que la comptabilité même de Bitcoin.

Le bloc 779 652 est là où cette garantie a commencé. Le Stamp 0 a été transporté par chaque nœud complet depuis lors, et il continuera de l'être tant que Bitcoin fonctionnera.

## Un mouvement à partir d'un seul bloc

Le choix fait au bloc 779 652 a donné le ton à tout ce qui a suivi. La permanence d'abord. Pas d'hôtes en qui avoir confiance, pas d'élagage à craindre, pas de dépendance externe qui puisse disparaître en silence.

Cette seule décision a ouvert la porte aux tokens <EntityMention entity="src-20">SRC-20</EntityMention>, aux noms <EntityMention entity="src-101">SRC-101</EntityMention> et à toute une communauté d'artistes et de bâtisseurs qui voulaient que leur œuvre survive à n'importe quelle plateforme. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>, le premier token SRC-20, est arrivé plus tard en 2023, mais il repose sur les fondations posées ici.

Si vous voulez comprendre pourquoi Bitcoin Stamps fonctionne comme il le fait, commencez au bloc 779 652. Tout dans le protocole remonte au moment où <EntityMention entity="mikeinspace">mikeinspace</EntityMention> a décidé que permanent signifiait permanent.

---

*Lisez la spécification technique complète dans le [Whitepaper de Bitcoin Stamps](/en/whitepaper/), et explorez l'écosystème sur [stampchain.io](https://stampchain.io).*
