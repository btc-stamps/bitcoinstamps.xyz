---
title: "Protocole Bitcoin Stamps : Livre blanc technique"
description: "Spécification technique complète du métaprotocole Bitcoin Stamps - actifs numériques permanents sur Bitcoin via le stockage UTXO"
leoType: "whitepaper"
audience: "unified"
culturalSignificance: "high"
mentions: ["bitcoin-stamps", "src-20", "src-721", "src-101", "olga", "counterparty", "utxo", "p2wsh", "whitepaper"]
category: "technical-specification"
---

# Protocole Bitcoin Stamps : Livre blanc technique

<div style="margin: 1.5rem 0 2.5rem; padding: 1.5rem 1.75rem; background: var(--vp-c-bg-soft); border-left: 4px solid var(--vp-c-brand-1); border-radius: 0 8px 8px 0;">

**Innovation fondamentale** &mdash; Exploiter l'ensemble UTXO de Bitcoin pour le stockage permanent de données, rendant les données d'actifs critiques au consensus et impossibles à tailler. Tous les nœuds complets doivent stocker les données de stamps pour valider les transactions, garantissant la permanence tant que Bitcoin existe.

</div>

## Résumé

Bitcoin Stamps est un métaprotocole pour créer des actifs numériques permanents et immuables sur Bitcoin via le stockage UTXO direct. Contrairement aux approches de données témoins, Bitcoin Stamps intègre les données d'actifs dans les sorties de transactions en utilisant le multi-signature nu et l'encodage P2WSH, assurant un stockage universel des nœuds et une permanence critique au consensus.

| Propriété | Description |
|-----------|-------------|
| **Permanence basée sur UTXO** | Données stockées dans les sorties dépensables, pas dans les segments témoins |
| **Stockage critique au consensus** | Requis pour la validation des transactions sur tous les nœuds |
| **Actifs basés sur compte** | Suivi de solde à la Counterparty, pas de tokens liés aux UTXO |
| **Support multi-protocoles** | Architecture extensible pour tokens, noms et récursion |
| **Encodage optimisé pour les coûts** | OLGA P2WSH réduit les frais de 30-95% vs multi-sig nu |

---

## Téléchargement

<div style="margin: 1.5rem 0; padding: 1.75rem; background: var(--vp-c-bg-soft); border-radius: 8px; text-align: center;">
  <p style="font-size: 1.1rem; margin-bottom: 1rem; font-weight: 600;">Livre blanc technique Bitcoin Stamps</p>
  <p style="margin-bottom: 1.25rem; color: var(--vp-c-text-2);">Spécification complète incluant architecture, standards de tokens, économie et détails d'implémentation</p>
  <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
    <a href="/bitcoin-stamps-whitepaper.pdf" download style="display: inline-block; padding: 10px 22px; background: var(--vp-c-brand-1); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">Télécharger PDF</a>
    <a href="/bitcoin-stamps-whitepaper.html" target="_blank" style="display: inline-block; padding: 10px 22px; background: var(--vp-c-neutral); color: var(--vp-c-neutral-inverse); text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">Voir HTML</a>
    <a href="/bitcoin-stamps-whitepaper-combined.md" download style="display: inline-block; padding: 10px 22px; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">Source Markdown</a>
  </div>
</div>

---

## Chronologie du protocole

| Bloc | Date | Étape |
|-----:|------|-------|
| 779 652 | 29 mars 2023 | Premier Bitcoin Stamp par mikeinspace |
| 788 041 | 20 avril 2023 | Premier token SRC-20 (KEVIN) déployé par Arwyn |
| 793 068 | 20 avril 2023 | Premier encodage natif Bitcoin (sans Counterparty) |
| 796 000 | 15 août 2023 | Coupure Counterparty — règle de consensus SRC-20 |
| 833 000 | — | Transactions P2WSH activées sur les stamps |
| 865 000 | 15 octobre 2023 | Activation OLGA — optimisation P2WSH pour SRC-20 |

---

## Citation

```
Communauté Bitcoin Stamps (2026). Protocole Bitcoin Stamps : Un livre blanc technique.
Version 1.0. Récupéré de https://bitcoinstamps.xyz/fr/whitepaper/
```

---

## Communauté

| | |
|-|-|
| **GitHub** | [stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps) |
| **Telegram** | [t.me/BitcoinStamps](https://t.me/BitcoinStamps) |
| **Communauté** | [Communauté Bitcoin Stamps](/fr/community/) |
| **Protocoles** | [Documentation des protocoles](/fr/protocols/) |
| **Tutoriels** | [Guides développeurs](/fr/tutorials/) |
