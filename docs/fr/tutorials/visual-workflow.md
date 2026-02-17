---
title: "Guide de workflow visuel"
description: "Guide visuel complet du workflow de création Bitcoin Stamps utilisant le SDK @btc-stamps/tx-builder"
leoType: "tutorial"
audience: "dual"
mentions: ["tx-builder", "kevin", "bitcoin-stamps", "workflow", "utxo", "visual-guide"]
economicImpact: "educational-empowerment"
---

# Guide de workflow visuel

Apprenez le processus de création Bitcoin Stamps grâce à des étapes visuelles claires.

## Processus de création

```mermaid
graph TD
    A[🎨 Créer du contenu] --> B[📦 Préparer les données]
    B --> C[⚡ Construire la transaction]
    C --> D[📡 Diffuser sur Bitcoin]
    D --> E[✅ Stamp permanent créé]

    style A fill:#ff6b6b,stroke:#fff,color:#fff
    style E fill:#4ecdc4,stroke:#fff,color:#fff
```

## Processus étape par étape

### 1. Préparez votre contenu
- **Image** : PNG, JPEG, GIF, SVG, HTML supportés - le coût est la principale contrainte
- **Taille** : Gardez sous 24 Ko pour des frais raisonnables
- **Format** : Optimisez pour le stockage permanent

### 2. Choisissez votre méthode

**Interface Web (Recommandée)**
1. Visitez [stampchain.io/create](https://stampchain.io/tool/stamp/create)
2. Téléchargez votre image
3. Connectez le portefeuille et payez les frais réseau
4. Votre stamp est créé quand votre transaction est confirmée sur Bitcoin

**Intégration SDK**
```typescript
import { TxBuilder } from '@btc-stamps/tx-builder';

const txBuilder = new TxBuilder({ network: 'mainnet' });

const result = await txBuilder.createStamp({
  imageData: imageBuffer,
  fromAddress: 'votre-adresse',
  feeRate: 20
});
```

### 3. Flux de transaction

```mermaid
sequenceDiagram
    participant Vous
    participant TxBuilder
    participant Bitcoin

    Vous->>TxBuilder: Soumettre les données d'image
    TxBuilder->>TxBuilder: Optimiser et encoder les données
    TxBuilder->>Bitcoin: Créer la transaction
    Bitcoin->>Bitcoin: Confirmer dans le bloc
    Bitcoin-->>Vous: Stamp permanent créé !
```

### 4. Vérifiez votre création
Une fois confirmé sur Bitcoin, votre stamp est :
- ✅ **Permanent** - Stocké pour toujours sur Bitcoin
- ✅ **Vérifiable** - Authentique cryptographiquement
- ✅ **Accessible** - Visible sur les explorateurs de stamps
- ✅ **Transférable** - Peut être transféré à d'autres

## Modèles courants

### Tokens à lancement équitable (comme KEVIN)
```mermaid
graph LR
    A[Déployer Token] --> B[Communauté Découvre]
    B --> C[Minting Équitable Commence]
    C --> D[Croissance Organique]
    D --> E[Signification Culturelle]
```

## Ressources

- **[Créer votre premier Stamp →](/fr/tutorials/creating-first-stamp)** - Guide de création détaillé
- **[Documentation SDK →](/fr/tutorials/sdk-integration)** - Implémentation technique
- **[Explorateur Stampchain →](https://stampchain.io)** - Voir les stamps existants

---

*Les guides visuels aident à combler le fossé entre la technologie Bitcoin complexe et l'expression créative. Suivez le chemin de KEVIN de la simple création à l'impact culturel durable.*
