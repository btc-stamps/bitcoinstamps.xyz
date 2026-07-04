---
title: "Protocolos do Bitcoin Stamps"
description: "Suite completa de metaprotocolos que permitem ativos digitais permanentes, tokens e serviços descentralizados diretamente na blockchain do Bitcoin"
leoType: "protocol-overview"
audience: "both"
mentions: ["src-20", "src-101", "src-721", "olga", "kevin", "mikeinspace", "arwyn", "reinamora"]
culturalSignificance: "high"
protocols: ["src-20", "src-101", "src-721", "olga"]
---

# Protocolos do Bitcoin Stamps

Suite completa de metaprotocolos que permitem ativos digitais permanentes, tokens e serviços diretamente no Bitcoin. Começou com o primeiro stamp do <EntityMention entity="mikeinspace">mikeinspace</EntityMention> no bloco 779,652 e com o <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> como o primeiro token SRC-20 no bloco 788,041.

## Arquitetura do Protocolo

```
┌─────────────────────────────────────┐
│           Applications              │
├────────────┬────────────┬───────────┤
│   SRC-20   │   SRC-721  │  SRC-101  │ ← Token Standards
├────────────┴────────────┴───────────┤
│    OLGA / P2WSH   │    MULTISIG     │ ← Encoding Layer
├───────────────────┴─────────────────┤
│          Bitcoin Blockchain         │ ← Permanent Storage
└─────────────────────────────────────┘
```

## Padrões de Protocolo

### Tokens SRC-20
Tokens fungíveis no Bitcoin. O <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> foi o primeiro <EntityMention entity="src-20" variant="technical">SRC-20 token</EntityMention>, demonstrando princípios de lançamento justo e crescimento orientado pela comunidade.

**Funcionalidades**: Armazenamento direto no Bitcoin, codificação <EntityMention entity="olga">OLGA</EntityMention>, distribuição comunitária

**[Especificação Completa do SRC-20 →](/en/protocols/src-20)**

### Nomes SRC-101
Nomes legíveis por humanos para endereços e recursos do Bitcoin utilizando o <EntityMention entity="src-101" variant="technical">SRC-101 protocol</EntityMention>.

**Funcionalidades**: Resolução descentralizada, mapeamento de endereços, sistema de identidade legível

**[Saiba Mais Sobre o SRC-101 →](/en/protocols/src-101)**

### Padrão de Recursão SRC-721
Capacidades avançadas de recursão que permitem combinar múltiplos Bitcoin Stamps em obras de arte compostas através do <EntityMention entity="src-721" variant="technical">SRC-721</EntityMention>.

**Funcionalidades**: Referências recursivas de stamps, camadas de arte combináveis, combinações de múltiplos stamps

**[Explore o SRC-721 →](/en/protocols/src-721)**

### Codificação OLGA P2WSH
Protocolo de otimização da codificação que reduz os custos de transação ao utilizar P2WSH em vez de multisig simples através do <EntityMention entity="olga" variant="technical">OLGA</EntityMention>.

**Funcionalidades**: Codificação P2WSH, redução de custos, suporte multiprotocolo

**[Detalhes Técnicos do OLGA →](/en/protocols/olga)**

### Propostas de Melhoria dos Stamps (SIPs)
Enquadramento estruturado para alterações ao nível do protocolo que coordenam a implementação entre indexadores. Inclui um roteiro para transferências condicionais, pontes, funcionalidades de privacidade e AMM nativo.

**Funcionalidades**: Governança do protocolo, coordenação da implementação, lançamento faseado

**[Ver o Registo de SIPs e o Roteiro →](/en/protocols/sips)**

## Começar

Pronto para construir com os protocolos do Bitcoin Stamps?

- **[Crie o Seu Primeiro Stamp →](/en/tutorials/creating-first-stamp)** - Comece com a criação básica de stamps
- **[Tutorial de Tokens SRC-20 →](/en/tutorials/src20-token-creation)** - Aprenda o desenvolvimento de tokens  
- **[Integração do SDK →](/en/tutorials/sdk-integration)** - Guia de implementação técnica
- **[Recursos da Comunidade →](/en/community/)** - Obtenha ajuda e apoio

---

*Todos os protocolos do Bitcoin Stamps armazenam os dados permanentemente no Bitcoin, garantindo que os seus ativos digitais duram tanto quanto a própria rede.*
