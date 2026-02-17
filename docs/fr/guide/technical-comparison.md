---
title: "Bitcoin Stamps vs Ordinals/Inscriptions : Architecture technique"
description: "Comprendre les différences techniques fondamentales entre Bitcoin Stamps et Ordinals/Inscriptions concernant le stockage de données, le consensus et les garanties de permanence"
leoType: "technical-guide"
audience: "developer"
mentions: ["bitcoin-network", "p2wsh", "counterparty", "consensus", "utxo"]
culturalSignificance: "medium"
category: "technical-architecture"
tags: ["bitcoin-consensus", "data-storage", "technical-architecture", "blockchain-permanence"]
---

# Bitcoin Stamps vs Ordinals/Inscriptions : Architecture technique

Bitcoin Stamps et Ordinals/Inscriptions représentent deux approches fondamentalement différentes pour stocker des données sur Bitcoin. Comprendre ces différences est crucial pour les développeurs et les utilisateurs qui souhaitent s'assurer que leurs actifs numériques ont les garanties de permanence les plus solides possibles.

## Différences techniques critiques

### Emplacement de stockage des données

**Bitcoin Stamps :**
- Utilise **P2WSH (Pay-to-Witness-Script-Hash)** et l'encodage multi-signature
- Données stockées dans l'**ensemble UTXO** - partie du mécanisme de consensus central de Bitcoin
- **TOUS les nœuds complets** doivent stocker ces données pour valider la blockchain
- Les données sont **critiques au consensus** et ne peuvent pas être élagées
- Construit sur le **protocole Counterparty** (établi en 2014)

**Ordinals/Inscriptions :**
- Stocke les données dans les **segments témoins** des transactions
- Les données témoins ne font **PAS partie du consensus central de Bitcoin**
- Les nœuds peuvent **élaguer les données témoins** sans affecter le consensus
- **Pas garanti** d'être stocké sur tous les nœuds
- Nécessite des **indexeurs externes** pour la découverte et la validation

### Garanties de stockage des nœuds

| Aspect | Bitcoin Stamps | Ordinals/Inscriptions |
|--------|---------------|----------------------|
| **Emplacement de stockage** | Ensemble UTXO (critique au consensus) | Données témoins (non-consensus) |
| **Exigences des nœuds** | TOUS les nœuds complets stockent | Peuvent être élagués par les nœuds |
| **Rôle de consensus** | Requis pour la validation | Optionnel pour le consensus |
| **Permanence** | Garantie tant que Bitcoin existe | Dépend de la préservation des indexeurs |
| **Décentralisation** | Vraie - pas de dépendances externes | Nécessite une infrastructure d'indexeur |

## Architecture technique approfondie

### Architecture Bitcoin Stamps

```
┌─────────────────────────────────────────────────┐
│                Couche Application               │
│         (SRC-20, SRC-721, SRC-101)             │
├─────────────────────────────────────────────────┤
│              Protocole Counterparty             │
│          (Suivi et validation d'actifs)         │
├─────────────────────────────────────────────────┤
│            Encodage P2WSH + Multi-sig           │
│         (Données intégrées dans le hash)        │
├─────────────────────────────────────────────────┤
│              Ensemble UTXO Bitcoin              │
│            (Stockage critique au consensus)     │
├─────────────────────────────────────────────────┤
│              Blockchain Bitcoin                 │
│           (Sécurisée par preuve de travail)     │
└─────────────────────────────────────────────────┘
```

## Résumé technique

Bitcoin Stamps atteint une véritable permanence en stockant les données dans l'ensemble UTXO critique au consensus de Bitcoin en utilisant des protocoles établis. Pour les actifs numériques nécessitant une permanence maximale et des garanties de décentralisation, Bitcoin Stamps fournit une architecture techniquement supérieure qui s'aligne avec les principes de conception réels de Bitcoin.

---

*Pour les développeurs construisant des actifs numériques permanents sur Bitcoin, choisissez l'architecture qui garantit que vos données resteront accessibles tant que Bitcoin existe.*
