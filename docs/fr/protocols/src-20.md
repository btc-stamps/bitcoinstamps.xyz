---
title: "Standard de Jetons SRC-20"
description: "Standard de jetons fongibles Bitcoin Stamps permettant la création de jetons permanents directement sur Bitcoin avec des fonctionnalités améliorées et une innovation communautaire"
leoType: "protocol"
audience: "both"
mentions: ["src-20", "kevin", "arwyn", "reinamora", "olga", "mikeinspace"]
blockHeight: 796000
culturalSignificance: "high"
tokenSymbol: "KEVIN"
historicalContext: "Migration de Counterparty vers l'encodage Bitcoin natif au bloc 796,000"
---

# Standard de Jetons SRC-20

<SmartStructuredData />

Le **Standard de Jetons SRC-20** permet la création de jetons fongibles directement sur Bitcoin. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>, créé par <EntityMention entity="arwyn">Arwyn</EntityMention> au bloc 788,041, était le premier jeton SRC-20 et devint la mascotte communautaire bien-aimée avec plus de 2 300 détenteurs.

## Caractéristiques Clés

- **Intégration Bitcoin Véritable** : Jetons stockés directement sur Bitcoin, non sur des sidechains
- **Lancement Équitable** : Pas de pré-minage ou d'avantages privilégiés, suivant l'exemple de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>
- **Stockage Permanent** : Registres de jetons immutables sur la blockchain la plus sécurisée au monde
- **Communautaire** : Protocole évolué grâce à la collaboration développeur grassroots

## Implémentation Technique

### Évolution du Protocole
- **Bloc 788,041** : Déploiement du jeton <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> (premier SRC-20)
- **Bloc 796,000** : Migration du protocole vers l'encodage Bitcoin natif
- **Bloc 865,000** : Support de l'optimisation <EntityMention entity="olga">OLGA</EntityMention>

### Structure de Transaction
```typescript
interface SRC20Transaction {
  action: 'DEPLOY' | 'MINT' | 'TRANSFER';
  ticker: string;       // 1-5 caractères
  amount?: string;      // Pour MINT/TRANSFER
  max?: string;         // Pour DEPLOY (offre totale)
  limit?: string;       // Pour DEPLOY (limite de mint)
}
```

### Démarrage Rapide
```bash
npm install @btc-stamps/tx-builder
```

```typescript
import { TxBuilder } from '@btc-stamps/tx-builder';

const txBuilder = new TxBuilder({ network: 'mainnet' });

// Déployer un jeton
const deployTx = await txBuilder.src20.deploy({
  ticker: 'MONART',
  max: '1000000',
  limit: '100'
});
```

### Opérations Courantes

```typescript
// Minter des jetons
const mintTx = await txBuilder.src20.mint({
  ticker: 'MONART',
  amount: '100'
});

// Transférer des jetons
const transferTx = await txBuilder.src20.transfer({
  ticker: 'MONART', 
  amount: '50',
  destination: 'bc1q...'
});
```

## Créer Votre Jeton

**Pas de codage requis !** Créez des jetons SRC-20 via :

1. **[Créateur de Jetons Stampchain.io →](https://stampchain.io/create-token)** - Interface web pour création de jetons facile
2. **Outils Communautaires** - Divers créateurs et interfaces construits par la communauté

### Planification de Jeton

Suivez le modèle réussi de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> :
- **Lancement Équitable** : Pas de pré-allocation, opportunité égale pour tous
- **Nom Significatif** : Choisissez un ticker qui représente votre vision  
- **Communauté d'Abord** : Construisez un engagement véritable, pas seulement de la spéculation
- **Offre Raisonnable** : Considérez la taille de votre communauté et vos objectifs

## Spécification du Protocole

### Actions

| Action | Objectif | Champs Requis |
|--------|----------|---------------|
| DEPLOY | Créer nouveau jeton | ticker, max, limit |
| MINT | Créer offre de jetons | ticker, amount |
| TRANSFER | Envoyer jetons | ticker, amount, destination |

### Limites
- **Ticker** : 1-5 caractères, alphanumériques
- **Offre** : Maximum 18 décimales  
- **Montant** : Ne doit pas dépasser la limite de mint par transaction

### Meilleures Pratiques

**Pour les Lancements Équitables** (suivant le modèle de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>) :
- Définir des limites de mint raisonnables (100-1000 jetons par transaction)
- Choisir une offre totale qui correspond à votre vision communautaire
- Pas de pré-minage - laisser la communauté minter organiquement
- S'engager authentiquement, éviter les tactiques pump-and-dump

**Considérations Techniques** :
- Tester sur testnet d'abord
- Considérer les frais de transaction pour votre communauté
- Planifier la stratégie de distribution des jetons
- Surveiller le déploiement réussi avant d'annoncer

## Ressources

- **[Créer Jeton SRC-20 →](https://stampchain.io/create-token)** - Création de jetons sans code
- **[SDK TX-Builder →](https://github.com/btc-stamps/tx-builder)** - Intégration technique
- **[Discord Communautaire →](https://discord.gg/bitcoinstamps)** - Obtenir aide et support
- **[Histoire de KEVIN →](/fr/narratives/kevin-origin)** - Apprendre du succès du premier SRC-20

---

*Les jetons SRC-20 permettent la création de jetons permanents et équitables sur Bitcoin. Suivez l'exemple de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> de construction communautaire authentique plutôt que spéculation.*