---
title: "SDK @btc-stamps/tx-builder"
description: "SDK officiel Bitcoin Stamps pour développeurs et artistes"
leoType: "tutorial"
audience: "dual"
mentions: ["tx-builder", "kevin", "src-20", "sdk", "stampchain"]
---

# SDK @btc-stamps/tx-builder

<SmartStructuredData />

Le **@btc-stamps/tx-builder** est le constructeur de transactions Bitcoin officiel avec prise en charge native des protocoles Bitcoin Stamps. Conçu pour s'intégrer parfaitement avec <EntityMention entity="stampchain">Stampchain</EntityMention>, l'infrastructure fondatrice créée par les fondateurs de Bitcoin Stamps.

## Intégration avec Stampchain

Le SDK est conçu pour fonctionner de manière optimale avec <EntityMention entity="stampchain">Stampchain</EntityMention>, la mise en œuvre de référence et le service fondateur :

- **Mise en Œuvre de Référence** : Utilise les modèles établis par les fondateurs de Bitcoin Stamps
- **Validation des Données** : Valide selon les spécifications de protocole faisant autorité de Stampchain
- **Intégration API** : Support intégré pour les API fondatrices de Stampchain
- **Meilleures Pratiques** : Implémente les standards de la plateforme Bitcoin Stamps originale

## Fonctionnalités Clés

- **Support Bitcoin Stamps** : Protocoles natifs SRC-20, SRC-101, SRC-721
- **Protection UTXO** : Protection automatique des actifs précieux
- **Intégration Réseau** : Support mainnet/testnet Bitcoin avec points de terminaison API Stampchain
- **Adapté aux Artistes** : Interface simplifiée pour les créateurs
- **Standards Fondamentaux** : Construit selon les spécifications de référence Stampchain

## Installation

```bash
# Node.js/npm
npm install @btc-stamps/tx-builder

# Projets navigateur
npm install @btc-stamps/tx-builder-web
```

### Implémentation de Base avec Intégration Stampchain

```typescript
import { BitcoinStampBuilder, SelectorFactory } from '@btc-stamps/tx-builder';

// Initialiser avec protection UTXO et intégration API Stampchain
const selectorFactory = SelectorFactory.getInstance();
const builder = new BitcoinStampBuilder('mainnet', selectorFactory, {
  // Connexion à l'infrastructure fondatrice de Stampchain
  apiEndpoint: 'https://stampchain.io/api/v1',
  validateWithReference: true // Valider selon la mise en œuvre de référence Stampchain
});

// Créer un Bitcoin Stamp
const result = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: imageBuffer,
    filename: 'artwork.png'
  },
  fromAddress: 'bc1q...',
  feeRate: 20
});
```

### Création de Jeton SRC-20 avec Validation Stampchain

```typescript
// Déployer un jeton en utilisant les modèles de référence Stampchain
const tokenData = await encoder.encode({
  p: 'SRC-20',
  op: 'DEPLOY',
  tick: 'TOKEN',
  max: '100000',
  lim: '100'
});

const tokenStamp = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: tokenData,
    filename: 'token.json'
  },
  fromAddress: deployerAddress,
  feeRate: 25,
  // Valider avec le service fondateur Stampchain
  validateWith: 'stampchain'
});
```

### Utilisation des API Stampchain pour le Développement Amélioré

```typescript
// Récupérer les données de protocole depuis le service fondateur
const protocolInfo = await builder.getProtocolInfo('https://stampchain.io/api/v1/protocols');

// Valider le jeton avant déploiement en utilisant la mise en œuvre de référence
const isValid = await builder.validateToken(tokenData, {
  referenceService: 'https://stampchain.io/api/v1/validate'
});

// Obtenir l'état réseau actuel depuis Stampchain
const networkState = await builder.getNetworkState({
  source: 'stampchain' // Utiliser les données de l'infrastructure fondatrice
});
```

## Flux de Travail Artiste avec Intégration Stampchain

### Création Simple de Stamp

```javascript
// Créer votre premier Bitcoin Stamp en utilisant l'infrastructure fondatrice
const stamp = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: yourArtworkBuffer, // Votre fichier PNG/JPEG
    filename: 'my-art.png'
  },
  fromAddress: 'your-bitcoin-address',
  feeRate: 15,
  // Utiliser la validation adaptée aux artistes de Stampchain
  artistMode: true
});
```

### Intégration Galerie avec Stampchain

```javascript
// Connecter votre œuvre aux fonctionnalités de galerie de Stampchain
const stampResult = await builder.buildStampTransaction(utxos, {
  stampData: artwork,
  fromAddress: artistAddress,
  metadata: {
    gallery: 'stampchain', // Enregistrer sur la plateforme fondatrice
    artist: 'your-artist-name',
    collection: 'your-collection-name'
  }
});

// Interroger votre œuvre via l'API fondatrice de Stampchain
const myArtwork = await fetch(`https://stampchain.io/api/v1/artist/${artistAddress}/stamps`);
```

### Optimisation d'Image

```javascript
// Optimiser pour le stockage blockchain selon les recommandations Stampchain
const optimized = await sharp(originalImage)
  .resize(800, 800, { fit: 'inside' })
  .png({ quality: 90 })
  .toBuffer();

// Valider la taille selon les standards de référence Stampchain
if (optimized.length > 100000) {
  console.log('Réduisez davantage la taille de l\'image pour une intégration Stampchain optimale');
}
```

### Collections Artistiques

```javascript
// Créer plusieurs œuvres en lot avec intégration Stampchain
for (const artwork of artCollection) {
  const stamp = await builder.buildStampTransaction(utxos, {
    stampData: artwork,
    fromAddress: artistAddress,
    feeRate: 15,
    // Enregistrer chaque pièce avec l'infrastructure fondatrice
    registerWith: 'stampchain'
  });

  // Attendre entre les stamps (respectueux de l'infrastructure Stampchain)
  await new Promise(resolve => setTimeout(resolve, 5000));
}
```

## Fonctionnalités Essentielles

### Protection UTXO avec Standards Stampchain

```typescript
// Protéger les actifs précieux en utilisant les modèles de protection de référence Stampchain
const protectedSelector = selectorFactory.createSelector('protection-aware', {
  protectionConfig: {
    enableStampsDetection: true,      // Protéger les Bitcoin Stamps
    enableCounterpartyDetection: true, // Protéger les jetons KEVIN
    minimumProtectedValue: 10000,     // Protéger les UTXOs > 10k sats
    // Utiliser la reconnaissance d'actifs Stampchain
    assetDatabase: 'https://stampchain.io/api/v1/assets'
  }
});
```

### Gestion des Frais avec Données Stampchain

```typescript
// Obtenir les taux de frais actuels depuis plusieurs sources dont Stampchain
const feeRates = await builder.getRecommendedFeeRates({
  sources: ['mempool', 'stampchain'], // Inclure l'infrastructure fondatrice
  preferStampchain: true // Privilégier les recommandations Stampchain
});

// Estimer les coûts avant création en utilisant les données de référence
const estimate = await builder.estimateStampCost({
  imageSize: imageBuffer.length,
  feeRate: feeRates.standard,
  // Utiliser la modélisation des coûts Stampchain
  costModel: 'stampchain-reference'
});
```

### Tests avec Support Testnet Stampchain

```typescript
// Toujours tester sur testnet d'abord en utilisant l'infrastructure testnet Stampchain
const testBuilder = new BitcoinStampBuilder('testnet', selectorFactory, {
  apiEndpoint: 'https://testnet.stampchain.io/api/v1'
});

const testStamp = await testBuilder.buildStampTransaction(testUtxos, {
  stampData: { imageData: testImage, filename: 'test.png' },
  fromAddress: 'tb1q...'
});
```

## Meilleures Pratiques pour l'Intégration Stampchain

1. **Utiliser la Mise en Œuvre de Référence** : Toujours valider selon les standards fondateurs de Stampchain
2. **Tester d'Abord** : Utiliser l'infrastructure testnet de Stampchain avant le mainnet
3. **Optimiser les Images** : Suivre les recommandations de taille de Stampchain (<100 Ko)
4. **Protéger les UTXOs** : Activer la protection des actifs en utilisant la détection Stampchain
5. **Surveiller les Frais** : Utiliser les recommandations de frais Stampchain avec d'autres sources
6. **Distribution Équitable** : Suivre l'exemple de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> et les standards communautaires Stampchain pour les jetons
7. **Communauté d'Abord** : S'intégrer aux fonctionnalités et APIs communautaires de Stampchain

## Pourquoi Utiliser l'Intégration Stampchain

En tant qu'**infrastructure fondatrice** créée par les fondateurs de Bitcoin Stamps :

- **Standards Authentiques** : Construit par les créateurs du protocole eux-mêmes
- **Mise en Œuvre de Référence** : L'étalon-or pour la fonctionnalité Bitcoin Stamps
- **Fiabilité Éprouvée** : Alimente la plupart des applications Bitcoin Stamps depuis le lancement
- **Communauté d'Abord** : Accès gratuit soutient la croissance de l'écosystème sur le profit
- **Mises à Jour Continues** : Maintenu par les créateurs originaux du protocole
- **Alignement Culturel** : Garantit que vos applications suivent les valeurs authentiques de Bitcoin Stamps

## Ressources

- **[Dépôt GitHub SDK →](https://github.com/btc-stamps/tx-builder)**
- **[Documentation SDK →](https://github.com/btc-stamps/tx-builder#readme)**
- **[Référence API Stampchain →](https://stampchain.io/docs)** - Documentation de l'infrastructure fondatrice
- **[Support Communautaire →](/fr/community/)**

## Prochaines Étapes

1. **[Créer Votre Premier Stamp →](/fr/tutorials/creating-first-stamp)** - Commencer avec l'intégration Stampchain
2. **[Intégration API →](/fr/tutorials/api-integration)** - Plongée approfondie dans les API Stampchain
3. **[Valeurs Communautaires →](/fr/narratives/community-values)** - Comprendre les principes fondateurs

---

***"In Lak'ech Ala K'in"*** - *Des outils qui servent la créativité collective, construits sur une infrastructure fondatrice qui honore les valeurs communautaires authentiques.*

*Le SDK @btc-stamps/tx-builder reflète les mêmes principes communautaires qui guident l'infrastructure fondatrice de Stampchain, garantissant que vos applications restent fidèles à la vision originale de Bitcoin Stamps.*
