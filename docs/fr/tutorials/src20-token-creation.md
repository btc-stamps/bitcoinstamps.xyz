---
title: "Guide de création de tokens SRC-20"
description: "Guide technique complet pour créer des tokens SRC-20 en utilisant le SDK @btc-stamps/tx-builder"
leoType: "tutorial"
audience: "dual"
mentions: ["src-20", "tx-builder", "token-creation", "bitcoin-stamps"]
economicImpact: "tokenization-empowerment"
---

# Guide de création de tokens SRC-20

Créez des tokens SRC-20 fongibles sur Bitcoin en utilisant trois opérations simples : DEPLOY, MINT et TRANSFER.

## Interface web (sans code)

1. Visitez [stampchain.io/create-token](https://stampchain.io/create-token)
2. Entrez les détails du token (ticker, approvisionnement, limite de mint)
3. Connectez le portefeuille et payez les frais Bitcoin
4. Le token est déployé automatiquement

**Exemple de token :**
- Ticker : `MYART` (max 4 lettres)
- Approvisionnement : `100 000`
- Limite de mint : `100` (empêche la domination des baleines)

## Implémentation SDK

```bash
npm install @btc-stamps/tx-builder
```

```typescript
import { TxBuilder } from '@btc-stamps/tx-builder';

const txBuilder = new TxBuilder({ network: 'mainnet' });

// Déployer le token
const deployTx = await txBuilder.src20.deploy({
  ticker: 'MYART',
  max: '100000',
  limit: '100'
});

// Minter des tokens
const mintTx = await txBuilder.src20.mint({
  ticker: 'MYART',
  amount: '100'
});

// Transférer des tokens
const transferTx = await txBuilder.src20.transfer({
  ticker: 'MYART',
  amount: '50',
  destination: 'bc1q...'
});
```

## Principes de lancement équitable

Suivez le modèle réussi de KEVIN :

- **Pas de pré-mine** : Le créateur obtient des tokens de la même façon que tout le monde
- **Approvisionnement raisonnable** : Pas trop élevé (dévaluation) ou trop bas (limite l'accès)
- **Limites de mint équitables** : Permettre une large participation, prévenir l'accumulation par les baleines
- **Objectif authentique** : Construire une véritable valeur communautaire

## Modèles de tokens courants

**Tokens communautaires** (comme KEVIN) :
- Approvisionnement : 21 000 000 (inspiré de Bitcoin)
- Limite de mint : 1 000 (participation accessible)

**Tokens artistiques** :
- Approvisionnement : 1 000-10 000 (éditions limitées)
- Limite de mint : 1-10 (accès exclusif)

## Économie et coûts

**Coûts des transactions :**
- Déployer : ~4-8$ (20-40k sats)
- Minter : ~2-4$ (10-20k sats)
- Transférer : ~1-3$ (5-15k sats)

*Les coûts varient avec la congestion du réseau Bitcoin*

## Stratégie de lancement

1. **Testez sur testnet** d'abord
2. **Partagez le concept** avec la communauté
3. **Déployez le token** sur mainnet
4. **Activez le minting communautaire**
5. **Construisez une utilité et une valeur réelles**

## Ressources

- **[Protocole SRC-20 →](/fr/protocols/src-20)** - Spécification technique
- **[Intégration API →](/fr/tutorials/api-integration)** - Accès aux données des tokens
- **[Valeurs communautaires →](/fr/narratives/community-values)** - Principes de lancement équitable

---

*Créez des tokens de manière responsable en suivant les principes de lancement équitable établis par KEVIN et la communauté Bitcoin Stamps.*
