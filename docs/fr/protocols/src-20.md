---
title: "Standard de Jetons SRC-20"
description: "Standard de jetons fongibles Bitcoin Stamps permettant la création de jetons permanents directement sur Bitcoin avec des fonctionnalités améliorées et une innovation communautaire"
leoType: "protocol"
audience: "unified"
mentions: ["src-20", "kevin", "arwyn", "reinamora", "olga", "mikeinspace"]
blockHeight: 788041
culturalSignificance: "high"
tokenSymbol: "KEVIN"
historicalContext: "Genèse au bloc 788,041 (KEVIN), l'encodage Bitcoin natif a commencé au bloc 793,068, coupure Counterparty au bloc 796,000"
author: reinamora
---

# Standard de Jetons SRC-20

Le **Standard de Jetons SRC-20** permet la création de jetons fongibles en tant que couche construite au-dessus des Bitcoin Stamps. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> a débuté sa vie en tant que Stamp #4258 (bloc 783,718), où il a présenté un comportement auto-réplicant, tel un fantôme, à travers tout le système. Reconnaissant que cette conscience numérique avait besoin d'une forme adéquate, <EntityMention entity="arwyn">Arwyn</EntityMention> a créé le premier jeton SRC-20 au bloc 788,041 (Stamp #18,516), donnant à <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> une existence tangible en tant qu'icône culturelle et mascotte communautaire bien-aimée avec plus de 2 300 détenteurs.

**Apprenez l'histoire complète** :
- **[Histoire d'origine de KEVIN →](/fr/narratives/kevin-origin)** - D'expérience artistique à premier jeton SRC-20
- **[Histoire de Bitcoin Stamps →](/fr/narratives/bitcoin-stamps-history)** - Chronologie sacrée incluant la genèse de SRC-20
- **[Philosophie communautaire →](/fr/community/)** - Les valeurs qui guident la création de jetons

## Évolution du Protocole

- **Bloc 788,041** : Premier jeton SRC-20 (KEVIN) sur Counterparty
- **Bloc 793,068** : Premier SRC-20 natif de Bitcoin (encodage direct)
- **Bloc 796,000** : Coupure des SRC-20 sur Counterparty (règle de consensus : ignorer les jetons CP après ce point)
- **Bloc 865,000** : Optimisation <EntityMention entity="olga">OLGA</EntityMention> disponible pour tous les jetons SRC-20

**Fondement technique** : Tous les jetons SRC-20 sont des stamps (ils créent des enregistrements de stamp sur Bitcoin), mais tous les stamps ne sont pas des jetons SRC-20. Les stamps fournissent la couche de base non fongible, tandis que SRC-20 crée la couche de jetons fongibles au-dessus.

## Caractéristiques Clés

- **Intégration Bitcoin Véritable** : Jetons stockés directement sur Bitcoin, non sur des sidechains
- **Lancement Équitable** : Pas de pré-minage ou d'avantages privilégiés, suivant l'exemple de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>
- **Stockage Permanent** : Registres de jetons immutables sur la blockchain la plus sécurisée au monde
- **Communautaire** : Protocole évolué grâce à la collaboration développeur grassroots

## Créer Votre Jeton SRC-20

**Création facile sans code :**

### **[Créer un Jeton SRC-20 →](https://stampchain.io)**

1. **Visitez le Créateur de Jetons** sur Stampchain.io
2. **Planifiez votre jeton** en suivant le modèle réussi de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>
3. **Définissez les paramètres** (ticker, offre, limites de mint)
4. **Déployez** votre jeton de façon permanente sur Bitcoin

### Lignes directrices de planification de jeton

Suivez le modèle réussi de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> :
- **Lancement Équitable** : Pas de pré-allocation, opportunité égale pour tous
- **Nom Significatif** : Choisissez un ticker qui représente votre vision
- **Communauté d'Abord** : Construisez un engagement véritable, pas seulement de la spéculation
- **Offre Raisonnable** : Considérez la taille de votre communauté et vos objectifs

## Implémentation Technique

Pour les développeurs qui implémentent SRC-20 de manière programmatique :

### Structure du Protocole
- **DEPLOY** : Créer un nouveau jeton (nécessite ticker, offre maximale, limite de mint)
- **MINT** : Créer de l'offre de jetons (nécessite ticker, montant)
- **TRANSFER** : Envoyer des jetons (nécessite ticker, montant, destination)

### Ressources de Développement
- **[SDK TX-Builder →](https://github.com/btc-stamps/tx-builder)** - Intégration technique complète
- **[Documentation de l'API →](https://stampchain.io/api)** - Accédez aux données des jetons de manière programmatique
- **[Discord Communautaire →](https://discord.gg/bitcoinstamps)** - Canal de support pour développeurs

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

**Le modèle de succès de KEVIN** :
1. **Vision Artistique Authentique** - Commencez avec un but créatif véritable
2. **Économie Communautaire Équitable** - Donnez à chacun une opportunité égale
3. **Engagement à Long Terme** - Construisez une culture, pas seulement du battage
4. **Autonomisation Communautaire** - Laissez la communauté s'approprier le récit
5. **Valeur Permanente** - Créez une signification culturelle durable

**Considérations Techniques** :
- Tester sur testnet d'abord
- Considérer les frais de transaction pour votre communauté
- Planifier la stratégie de distribution des jetons
- Surveiller le déploiement réussi avant d'annoncer

## Contexte Culturel et Philosophie

Les jetons SRC-20 perpétuent la philosophie Bitcoin Stamps de *"In Lak'ech Ala K'in"* - "Je suis toi et tu es moi". L'évolution de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> depuis l'hommage artistique d'<EntityMention entity="arwyn">Arwyn</EntityMention> jusqu'à mascotte communautaire bien-aimée démontre comment la créativité authentique peut construire une valeur culturelle durable.

**Valeurs Communautaires** :
- **Principes de Lancement Équitable** : Opportunité égale pour tous les membres de la communauté
- **Authenticité Culturelle** : Les jetons devraient servir des objectifs véritables, pas seulement la spéculation
- **Vision à Long Terme** : Construire des communautés durables plutôt que du battage à court terme
- **Expression Créative** : Les jetons comme véhicules d'expression artistique et culturelle

## Garantie de Permanence

Les Bitcoin Stamps, y compris tous les registres de jetons SRC-20, atteignent un niveau de permanence des données architecturalement supérieur à celui des autres protocoles basés sur Bitcoin. Cette garantie découle de la manière dont les données des Stamps sont stockées sur le réseau Bitcoin.

### Pourquoi les données SRC-20 ne peuvent pas être élaguées

Les opérations de jetons SRC-20 (deploy, mint et transfer) sont encodées directement dans l'**ensemble des sorties de transaction non dépensées (UTXO)** - le jeu de données central que chaque nœud Bitcoin à validation complète doit conserver afin de vérifier de nouvelles transactions. Comme ces données résident dans des sorties que les nœuds sont tenus de conserver, elles ne peuvent être écartées sans rompre le consensus. N'importe quel nœud complet Bitcoin, à tout moment futur, détiendra le registre complet de chaque déploiement, mint et transfert de jetons SRC-20.

### Contraste avec Ordinals et les données témoins

Les inscriptions Ordinals stockent leurs données dans la portion **témoin (witness, SegWit)** des transactions Bitcoin. Bien que les données témoins soient incluses dans les blocs, le protocole de Bitcoin permet explicitement aux nœuds d'élaguer les données témoins après validation. Un nœud élagué peut écarter entièrement les sections témoins et continuer à fonctionner comme un participant valide du réseau. Cela signifie que la disponibilité des données Ordinals dépend du choix des nœuds d'archives de conserver ces données - elle n'est pas structurellement garantie.

Les Bitcoin Stamps adoptent l'approche inverse. En intégrant les données dans l'ensemble UTXO plutôt que dans les données témoins, les Stamps garantissent que chaque nœud complet - qu'il soit d'archives ou élagué - conserve les données comme partie obligatoire des opérations de consensus.

### Implication Pratique

N'importe quel registre de jeton SRC-20 peut être récupéré depuis **n'importe quel nœud complet Bitcoin, indéfiniment**. Il n'y a aucune dépendance à une infrastructure d'archives spécialisée, à des services de pinning IPFS ou à des couches de disponibilité de données tierces. Le réseau Bitcoin lui-même sert de couche de stockage permanente et incensurable pour toutes les données de jetons SRC-20.

## Ressources

- **[Créer un Jeton SRC-20 →](https://stampchain.io)** - Création de jetons sans code
- **[SDK TX-Builder →](https://github.com/btc-stamps/tx-builder)** - Intégration technique
- **[Discord Communautaire →](https://discord.gg/bitcoinstamps)** - Obtenir aide et support
- **[L'histoire complète de KEVIN →](/fr/narratives/kevin-origin)** - Apprendre du parcours du premier SRC-20
- **[Histoire de Bitcoin Stamps →](/fr/narratives/bitcoin-stamps-history)** - Chronologie sacrée et contexte culturel

---

*Les jetons SRC-20 permettent la création de jetons permanents et équitables sur Bitcoin. Suivez l'exemple de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> de construction communautaire authentique guidée par la sagesse ancestrale et l'innovation moderne.*
