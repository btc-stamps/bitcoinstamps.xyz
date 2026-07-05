---
title: "OLGA : des stamps moins chers et plus grands grâce au P2WSH"
date: "2024-03-03"
author: "reinamora"
description: "OLGA a déplacé l'encodage des stamps vers le P2WSH, s'activant pour les classic stamps au bloc 833 000 et pour SRC-20 au bloc 865 000. Il réduit la taille des transactions d'environ moitié et les frais de 60 à 70 %."
tags: ["history", "olga", "milestone", "p2wsh", "fees"]
leoType: "blog"
---

# OLGA : des stamps moins chers et plus grands grâce au P2WSH

<EntityMention entity="olga">OLGA</EntityMention> est la mise à niveau d'encodage qui a rendu <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> à la fois moins cher et plus grand. Elle a déplacé les données des stamps dans des sorties P2WSH, et elle a supprimé une part de surcharge que chaque stamp antérieur payait.

## Deux hauteurs d'activation

OLGA a été déployé en deux étapes, chacune ancrée à un bloc. L'encodage P2WSH des classic stamps s'est activé au bloc 833 000, le 3 mars 2024. Le premier stamp <EntityMention entity="src-20">SRC-20</EntityMention> P2WSH OLGA est venu plus tard, au bloc 865 000, le 10 octobre 2024. Les deux hauteurs sont des points de contrôle de consensus, de sorte que les indexeurs savent exactement quand chaque voie s'active.

## Ce que le P2WSH change

L'ancien encodage s'appuyait sur des sorties bare multisig et enveloppait les données en Base64. Le Base64 rend les données binaires sûres à transporter, mais il ajoute environ un tiers d'octets supplémentaires pour rien d'autre que l'encodage. Sur une chaîne où l'on paie à l'octet, cette surcharge est un coût réel.

OLGA abandonne la couche Base64 et utilise à la place des sorties Pay-to-Witness-Script-Hash (P2WSH). Le résultat :

- Les transactions deviennent environ 50 % plus petites.
- Les frais chutent d'environ 60 à 70 %.
- Une seule transaction de stamp peut transporter jusqu'à environ 64 kB de données.

Plus petit et moins cher signifie que plus de gens peuvent stamper, et une plus grande capacité par transaction signifie qu'un art plus riche tient on-chain.

## Même permanence, coût inférieur

Le point important : rien de tout cela n'a affaibli la garantie de permanence. Les stamps OLGA vivent toujours dans l'ensemble UTXO, ne peuvent toujours pas être élagués (pruned) et héritent toujours de la durabilité propre à Bitcoin. OLGA a changé la façon dont les données sont empaquetées, pas l'endroit où elles vivent.

C'est le schéma que <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> ne cesse de répéter : faire atterrir les améliorations derrière des hauteurs d'activation, les prouver face à la chaîne, et ne jamais brader la permanence contre la commodité. OLGA a rendu le protocole accessible à bien plus de gens sans renoncer à ce qui fait d'un stamp un stamp.

---

*Lisez le modèle économique dans le [Whitepaper de Bitcoin Stamps](/en/whitepaper/), et explorez l'écosystème sur [stampchain.io](https://stampchain.io).*
