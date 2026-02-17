---
title: "Protocole de Stockage OLGA"
description: "Optimisation du stockage de données P2WSH offrant des réductions de coûts de 30 à 95 % pour les transactions Bitcoin Stamps"
leoType: "protocol"
audience: "both"
mentions: ["olga", "p2wsh", "storage-optimization", "cost-reduction", "efficiency"]
blockHeight: 865000
culturalSignificance: "medium"
protocolType: "optimization"
---

# Protocole de Stockage OLGA

<SmartStructuredData />

Le **Protocole de Stockage OLGA** est une méthode avancée de stockage de données P2WSH qui offre des **réductions de coûts de 30 à 95 %** pour les transactions Bitcoin Stamps en remplaçant l'approche coûteuse du multisig 2/3 par un stockage efficace via des scripts de témoin.

## Caractéristiques Clés

- **Économies Massives** : Réduction de 30 à 95 % des frais de transaction vs le multisig 2/3
- **Compatibilité Universelle** : Fonctionne avec tous les protocoles Bitcoin Stamps (SRC-20, SRC-101, SRC-721)
- **Stockage Immuable** : Stockage permanent des données sur Bitcoin via P2WSH
- **Priorité Mineurs** : Meilleure efficacité des frais que le multisig, en particulier lors de frais élevés
- **Agnostique au Protocole** : Bénéficie tous les types de transactions Bitcoin Stamps

## Avantages OLGA pour Tous les Utilisateurs

**Réduction Automatique des Coûts :**
- **Efficacité de Stockage** : Réduisez les coûts de création de stamps de 50 à 80 % vs le multisig
- **Création de Jetons** : Frais réduits pour le déploiement de jetons SRC-20
- **Déploiement de Collections** : Configuration moins coûteuse des collections SRC-721
- **Enregistrement de Noms** : Coûts réduits pour le minage de noms SRC-101

**Avantages de Stockage :**
- **Données Immuables** : Stockage permanent des scripts de témoin sur Bitcoin
- **Favorable aux Mineurs** : Meilleure priorité que le multisig lors de frais élevés
- **P2WSH Efficient** : Structure de script Bitcoin optimale pour les données
- **Pas de Perte de Données** : Préservation complète du contenu original

**Comment Fonctionne OLGA :**
1. **Créez normalement** en utilisant n'importe quelle interface Bitcoin Stamps
2. **OLGA s'active automatiquement** lors de la création de transaction (bloc 865 000+)
3. **Le stockage P2WSH** remplace la méthode coûteuse du multisig 2/3
4. **Les frais réduits** sont automatiquement reflétés dans le coût final
5. **Les données complètes** sont stockées en permanence dans les scripts de témoin Bitcoin

## Implémentation Technique

Pour les développeurs implémentant des applications optimisées OLGA :

### Fonctionnalités d'Optimisation du Stockage
- **Scripts de Témoin P2WSH** : Stockage efficace de scripts de témoin Bitcoin
- **Optimisation Automatique** : Fonctionne de manière transparente avec les protocoles existants
- **Compatibilité Universelle** : Prend en charge tous les protocoles Bitcoin Stamps
- **Priorité Mineurs** : Meilleurs taux d'inclusion pendant les périodes de frais élevés

### Ressources de Développement
- **[SDK TX-Builder →](https://github.com/stampchain-io/stamps_sdk)** - Intégration OLGA intégrée
- **[Documentation API →](/en/tutorials/api-integration)** - Points de terminaison de stockage P2WSH
- **[Spécifications du Protocole →](https://github.com/stampchain-io/stamps_sdk)** - Détails d'implémentation technique

## Techniques de Stockage

### Scripts de Témoin P2WSH
- **Données Témoin** : Stocker les données dans les scripts de témoin Bitcoin
- **Optimisation des Scripts** : Utilisation efficace des opcodes pour le stockage de données
- **Stockage Immuable** : Préservation permanente des données sur Bitcoin
- **Priorité Mineurs** : Meilleure efficacité des frais que les scripts multisig

### Optimisation des Coûts
- **Réduction des Frais** : Économies de 30 à 95 % vs l'approche multisig 2/3
- **Résistance aux Frais Élevés** : Meilleure priorité lors de congestion du réseau
- **Encodage Efficace** : Structure de script Bitcoin optimale
- **Compatibilité Héritée** : Repli sur le multisig si nécessaire

### Intégration des Protocoles
- **SRC-20** : Stockage P2WSH pour les métadonnées et déploiements de jetons
- **SRC-101** : Stockage témoin efficace pour les enregistrements de noms
- **SRC-721** : Références de couches optimisées via P2WSH
- **Multi-Protocoles** : Stockage P2WSH universel pour tous les protocoles

## Exemples de Réduction de Coûts

### Économies Réelles (vs Multisig 2/3)

**Stamps Images :**
- **Multisig 2/3** : Image de 24 Ko = ~480 000 sats (faible priorité mineurs)
- **OLGA P2WSH** : Mêmes données = ~160 000 sats (meilleure priorité)
- **Économies** : Réduction de 67 % (320 000 sats économisés)

**Jetons SRC-20 :**
- **Multisig 2/3** : Déploiement de jeton = ~50 000 sats
- **OLGA P2WSH** : Même déploiement = ~20 000 sats
- **Économies** : Réduction de 60 % (30 000 sats économisés)

**Collections SRC-721 :**
- **Multisig 2/3** : Collection = ~200 000 sats (pénalisé lors de frais élevés)
- **OLGA P2WSH** : Même collection = ~80 000 sats (meilleure priorité)
- **Économies** : Réduction de 60 % (120 000 sats économisés)

## Impact sur le Réseau

### Avantages d'Efficacité
- **Meilleure Efficacité des Frais** : P2WSH plus efficace que le stockage multisig
- **Priorité Mineurs Améliorée** : Particulièrement bénéfique lors de frais élevés
- **Stockage de Données Témoin** : Exploite les capacités des scripts de témoin Bitcoin
- **Compatibilité Réseau** : Types de transactions Bitcoin standards

### Avantages pour les Mineurs
- **Priorité Plus Élevée** : Les transactions OLGA obtiennent une meilleure priorité d'inclusion
- **Optimisation des Frais** : Ratios frais-par-octet plus efficaces
- **Pénalités Réduites** : Pas de pénalités de frais multisig qui affectaient les stamps pré-OLGA

## Garantie de Permanence

Les Bitcoin Stamps atteignent un niveau de permanence des données architecturalement supérieur aux autres protocoles basés sur Bitcoin. OLGA optimise le coût d'atteindre cette permanence tout en préservant ses garanties fondamentales.

### Comment OLGA Maintient la Permanence

Les stamps pré-OLGA intègrent les données directement dans l'**ensemble de sorties de transaction non dépensées (UTXO)** via des sorties multisig nues — données que chaque nœud Bitcoin en validation complète doit conserver pour vérifier les nouvelles transactions. OLGA déplace le mécanisme de stockage vers les scripts de témoin P2WSH pour l'efficacité des coûts, tandis que les hachages des sorties P2WSH restent dans l'ensemble UTXO comme preuve immuable de l'existence des données. Les données encodées elles-mêmes sont enregistrées en permanence dans les blocs Bitcoin et sont récupérables par tout nœud ayant traité ces blocs. OLGA réduit les coûts de transaction sans sacrifier la permanence qui définit les Bitcoin Stamps.

### Contraste avec Ordinals et les Données Témoin

Les inscriptions Ordinals stockent leurs données dans la portion **témoin** (SegWit) des transactions Bitcoin. Bien que les données témoin soient incluses dans les blocs, le protocole de Bitcoin permet explicitement aux nœuds d'élaguer les données témoin après validation. Un nœud élagué peut supprimer les sections témoin entièrement et continuer à fonctionner comme un participant valide au réseau. Cela signifie que la disponibilité des données Ordinals dépend des nœuds d'archivage qui choisissent de conserver ces données — ce n'est pas structurellement garanti.

Les Bitcoin Stamps adoptent une approche fondamentalement différente. Qu'il s'agisse de la méthode multisig nue originale ou de l'optimisation P2WSH d'OLGA, les Stamps créent des sorties non dépensables dont les hachages sont conservés dans l'ensemble UTXO par chaque nœud complet. Les données sont ancrées en permanence à la couche de consensus de Bitcoin plutôt que stockées dans une section optionnelle et élagable.

### Implication Pratique

Tout Bitcoin Stamp créé avec OLGA peut être récupéré depuis **n'importe quel nœud Bitcoin complet, indéfiniment**. OLGA réalise des économies de coûts de 30 à 95 % sans compromettre cette garantie. Il n'y a aucune dépendance envers une infrastructure d'archivage spécialisée, des services d'épinglage IPFS ou des couches de disponibilité de données tierces. Le réseau Bitcoin lui-même sert de couche de stockage permanente et incensurable — OLGA rend simplement l'accès à cette permanence plus abordable.

## Commencer

Le stockage P2WSH OLGA est **activé automatiquement** (bloc 865 000+) dans tous les principaux outils Bitcoin Stamps :

**Intégration Automatique :**
- **[Stampchain.io →](https://stampchain.io)** - OLGA activé par défaut
- **[SDK TX-Builder →](https://github.com/stampchain-io/stamps_sdk)** - Stockage P2WSH intégré
- **[Outils Artiste →](/en/tutorials/artist-tools)** - Optimisation automatique

**Pour les Développeurs :**
- **[Intégration SDK →](/en/tutorials/sdk-integration)** - Options de configuration OLGA
- **[Référence API →](/en/tutorials/api-integration)** - Points de terminaison de stockage P2WSH
- **[Spécifications du Protocole →](https://github.com/stampchain-io/stamps_sdk)** - Détails techniques

## Contexte Technique

**Évolution depuis le Multisig :**
Les Bitcoin Stamps utilisaient à l'origine des transactions multisig 2/3 avec des données dans 2 opérations de signature. Cela était :
- **Coûteux** : Frais de transaction plus élevés
- **Pénalisé** : Faible priorité auprès des mineurs, surtout lors de frais élevés
- **Inefficace** : Utilisation sous-optimale des capacités de script Bitcoin

**Solution OLGA (Bloc 865 000+) :**
Basé sur les tests Counterparty de JP Janssen, OLGA a adopté les scripts de témoin P2WSH :
- **Stockage Efficace** : Données stockées dans les scripts de témoin
- **Meilleure Priorité** : Inclusion mineurs améliorée, surtout lors de frais élevés
- **Immuable** : Stockage Bitcoin permanent et incensurable
- **Rentable** : Réduction des frais de 30 à 95 % vs le multisig

---

*OLGA rend les Bitcoin Stamps plus accessibles grâce au stockage P2WSH efficace tout en maintenant la nature permanente et immuable des données on-chain.*
