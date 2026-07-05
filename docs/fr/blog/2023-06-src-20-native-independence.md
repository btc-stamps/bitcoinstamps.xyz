---
title: "SRC-20 devient natif : l'indépendance vis-à-vis de Counterparty"
date: "2023-06-06"
author: "reinamora"
description: "Le 6 juin 2023, au bloc 793 068, SRC-20 s'est encodé directement sur Bitcoin pour la première fois. La coupure de Counterparty au bloc 796 000 a fait de l'encodage natif la règle de consensus."
tags: ["history", "src-20", "counterparty", "milestone", "consensus"]
leoType: "blog"
---

# SRC-20 devient natif : l'indépendance vis-à-vis de Counterparty

Le 6 juin 2023, au bloc 793 068, <EntityMention entity="src-20">SRC-20</EntityMention> s'est encodé directement sur Bitcoin pour la première fois. C'est un jalon de souveraineté : le standard de token a cessé de dépendre d'un autre protocole et a commencé à s'écrire directement sur la chaîne de base.

## Le point de départ Counterparty

Les premières transactions <EntityMention entity="src-20">SRC-20</EntityMention> reposaient sur <EntityMention entity="counterparty">Counterparty</EntityMention>, un métaprotocole présent sur Bitcoin depuis 2014. Counterparty a donné au standard une voie d'encodage fonctionnelle à ses tout débuts, et cela a permis à la communauté d'avancer vite.

Mais s'appuyer sur un autre protocole signifie hériter de ses hypothèses et de ses contraintes. Pour un standard bâti autour de la permanence et de l'autosuffisance, cette dépendance était un point en suspens.

## L'encodage natif au bloc 793 068

Le bloc 793 068 est là où <EntityMention entity="src-20">SRC-20</EntityMention> a obtenu son propre encodage Bitcoin natif. À partir de là, un déploiement, une frappe (mint) ou un transfert pouvait s'écrire directement sur Bitcoin sans passer par Counterparty du tout. Les données du token atterrissent dans le même stockage fondé sur l'UTXO qui donne à chaque stamp sa permanence.

## La coupure au bloc 796 000

L'encodage natif à lui seul n'était pas toute l'histoire. Le protocole a aussi tracé une ligne nette. Au bloc 796 000, le 26 juin 2023, le <EntityMention entity="src-20">SRC-20</EntityMention> fondé sur <EntityMention entity="counterparty">Counterparty</EntityMention> est devenu invalide. Après cette hauteur, la règle de consensus est claire : SRC-20 est un encodage Bitcoin natif, point final.

Cette coupure est ce qui a transformé une nouvelle capacité en un vrai standard. Il n'y a aucune ambiguïté sur les transactions qui comptent. Les indexeurs, les portefeuilles et quiconque valide la chaîne suivent la même règle, ancrée à un bloc précis.

## Pourquoi la souveraineté compte ici

L'indépendance vis-à-vis de <EntityMention entity="counterparty">Counterparty</EntityMention> signifie que <EntityMention entity="src-20">SRC-20</EntityMention> tient sur Bitcoin seul. Pas de second protocole en qui avoir confiance, pas d'ensemble de règles externe à suivre. La garantie de permanence qui a commencé avec le premier stamp couvre désormais les tokens fongibles de bout en bout, décidée entièrement par le consensus de Bitcoin.

---

*Lisez la spécification d'encodage dans le [Whitepaper de Bitcoin Stamps](/en/whitepaper/), et explorez l'écosystème sur [stampchain.io](https://stampchain.io).*
