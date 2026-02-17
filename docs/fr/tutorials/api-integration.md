---
title: "Guide d'intégration API"
description: "Documentation REST API complète et guide d'intégration pour les protocoles Bitcoin Stamps"
leoType: "tutorial"
audience: "dual"
mentions: ["src-20", "src-101", "src-721", "olga", "api", "rest", "stampchain"]
---

# Guide d'intégration API

Documentation REST API complète pour intégrer les protocoles Bitcoin Stamps dans des applications, des explorateurs et des outils créatifs.

## À propos de Stampchain : L'infrastructure fondamentale

Stampchain sert d'**infrastructure fondamentale** de l'écosystème Bitcoin Stamps. Créé par les trois fondateurs de Bitcoin Stamps, Stampchain était le premier site à présenter Bitcoin Stamps au monde et le premier service de minting SRC-20.

**Rôle actuel** : Stampchain.io continue de servir de service API fondamental, permettant aux développeurs, artistes et entreprises d'intégrer la fonctionnalité Bitcoin Stamps.

## Points de terminaison API

### API des tokens SRC-20

```bash
# Obtenir des informations sur le token
GET /api/v2/src20/{tick}
GET /api/v2/src20/{tick}/holders
GET /api/v2/src20/{tick}/transactions

# Exemple : Données du token KEVIN
curl https://stampchain.io/api/v2/src20/tick/KEVIN
```

### API Bitcoin Stamps

```bash
# Obtenir des informations sur le stamp
GET /api/v2/stamps/{id}
GET /api/v2/stamps/recent
GET /api/v2/stamps/search?q={requête}

# Exemple : Obtenir les détails du premier stamp de KEVIN
curl https://stampchain.io/api/v2/stamps/4258
```

### Exemples d'intégration

```javascript
// Récupérer les données du token KEVIN
async function getKevinData() {
  const response = await fetch('https://stampchain.io/api/v2/src20/tick/KEVIN');
  const tokenData = await response.json();

  return {
    supply: tokenData.max,
    holders: tokenData.holders_count,
    transactions: tokenData.tx_count
  };
}
```

## API spécifiques aux protocoles

### Tokens SRC-20

```bash
GET /api/v2/src20                    # Lister tous les tokens
GET /api/v2/src20/{tick}            # Détails du token
GET /api/v2/src20/{tick}/holders    # Distribution des détenteurs
GET /api/v2/src20/{tick}/history    # Historique des transactions
```

## Limites de débit

- **Public** : 100 requêtes/minute
- **Authentifié** : 1000 requêtes/minute
- **Entreprise** : Limites personnalisées pour l'usage institutionnel

## Ressources

- **API fondamentale** : [https://stampchain.io/api/v1](https://stampchain.io/api/v1)
- **Documentation interactive** : [https://stampchain.io/docs](https://stampchain.io/docs)
- **Code open source** : [GitHub - stampchain-io](https://github.com/stampchain-io)
- **Support communautaire** : [Bitcoin Stamps Discord](/fr/community/)

---

*"In Lak'ech Ala K'in" - Des API construites sur une infrastructure fondamentale qui serve à la fois la créativité individuelle et la croissance collective.*
