---
title: "Propositions d'amélioration des Stamps (SIP)"
description: "Registre officiel et feuille de route d'implémentation des améliorations du protocole Bitcoin Stamps incluant transferts conditionnels, ponts, fonctionnalités de confidentialité et AMM natif"
leoType: "protocol-overview"
audience: "both"
mentions: ["src-20", "kevin", "reinamora", "olga"]
culturalSignificance: "high"
protocols: ["src-20"]
---

# Propositions d'amélioration des Stamps (SIP)

Le processus de Proposition d'amélioration des Stamps fournit un cadre structuré pour proposer, examiner et activer des changements au niveau du protocole dans l'écosystème Bitcoin Stamps. Chaque SIP coordonne l'implémentation entre les indexeurs pour maintenir un comportement cohérent dans tout l'écosystème.

## Qu'est-ce qu'un SIP ?

Un SIP (Stamps Improvement Proposal) est requis pour les changements qui affectent le **consensus du protocole** — ce qui signifie que tous les indexeurs doivent implémenter le changement de manière identique pour un comportement cohérent dans l'écosystème.

Les SIP sont nécessaires pour :
- Nouvelles opérations SRC-20 (transferts conditionnels, ponts, remboursements)
- Nouveaux champs sur les opérations existantes (hashlock, timelock)
- Nouvelles méthodes d'encodage (formats binaires, structures P2WSH)
- Protocoles de pont inter-chaînes

Les SIP ne sont PAS nécessaires pour les optimisations d'indexeur uniquement, les fonctionnalités API ou les corrections de bogues qui ne changent pas le comportement du consensus.

**Document de processus** : [SIP-0000](https://github.com/stampchain-io/btc_stamps/issues/686) définit le cycle de vie complet de la proposition et le processus de révision.

<SipRegistry />

## S'impliquer

Le processus SIP est ouvert à tous les membres de la communauté :

1. **Discuter** — Rejoindre les conversations dans les issues GitHub pour les SIP actifs
2. **Proposer** — Créer de nouvelles propositions de protocoles en suivant le [format SIP-0000](https://github.com/stampchain-io/btc_stamps/issues/686)
3. **Examiner** — Fournir des retours techniques sur les spécifications
4. **Implémenter** — Construire le support d'indexeur pour les propositions acceptées

**Dépôt GitHub** : [stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps)

---

*Le processus SIP est intentionnellement léger — assez de structure pour coordonner entre les indexeurs sans ralentir l'innovation.*
