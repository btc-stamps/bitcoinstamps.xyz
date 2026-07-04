---
title: "Protokoly Bitcoin Stamps"
description: "Kompletní sada metaprotokolů umožňujících trvalá digitální aktiva, tokeny a decentralizované služby přímo v blockchainu Bitcoinu"
leoType: "protocol-overview"
audience: "both"
mentions: ["src-20", "src-101", "src-721", "olga", "kevin", "mikeinspace", "arwyn", "reinamora"]
culturalSignificance: "high"
protocols: ["src-20", "src-101", "src-721", "olga"]
---

# Protokoly Bitcoin Stamps

Kompletní sada metaprotokolů umožňujících trvalá digitální aktiva, tokeny a služby přímo na Bitcoinu. Začalo to první známkou <EntityMention entity="mikeinspace">mikeinspace</EntityMention> v bloku 779,652 a <EntityMention entity="kevin" variant="cultural">KEVINem</EntityMention> jako prvním tokenem SRC-20 v bloku 788,041.

## Architektura protokolu

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

## Standardy protokolu

### Tokeny SRC-20
Zaměnitelné tokeny na Bitcoinu. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> byl prvním <EntityMention entity="src-20" variant="technical">tokenem SRC-20</EntityMention>, který demonstroval principy férového spuštění a komunitně řízený růst.

**Vlastnosti**: Přímé uložení na Bitcoinu, kódování <EntityMention entity="olga">OLGA</EntityMention>, komunitní distribuce

**[Kompletní specifikace SRC-20 →](/en/protocols/src-20)**

### Jména SRC-101
Lidsky čitelná jména pro bitcoinové adresy a zdroje pomocí <EntityMention entity="src-101" variant="technical">protokolu SRC-101</EntityMention>.

**Vlastnosti**: Decentralizovaný překlad jmen, mapování adres, čitelný systém identity

**[Zjistěte více o SRC-101 →](/en/protocols/src-101)**

### Standard rekurze SRC-721
Pokročilé rekurzivní schopnosti umožňující kombinovat více Bitcoin Stamps do složeného uměleckého díla prostřednictvím <EntityMention entity="src-721" variant="technical">SRC-721</EntityMention>.

**Vlastnosti**: Rekurzivní odkazy na známky, skládatelné umělecké vrstvy, kombinace více známek

**[Prozkoumejte SRC-721 →](/en/protocols/src-721)**

### Kódování OLGA P2WSH
Optimalizační protokol kódování, který snižuje transakční náklady použitím P2WSH namísto holého multisigu prostřednictvím <EntityMention entity="olga" variant="technical">OLGA</EntityMention>.

**Vlastnosti**: Kódování P2WSH, snížení nákladů, podpora více protokolů

**[Technické detaily OLGA →](/en/protocols/olga)**

### Návrhy na vylepšení Stamps (SIPs)
Strukturovaný rámec pro změny na úrovni protokolu koordinující implementaci napříč indexery. Zahrnuje plán pro podmíněné převody, mosty, funkce soukromí a nativní AMM.

**Vlastnosti**: Správa protokolu, koordinace implementace, fázové zavádění

**[Zobrazit registr a plán SIP →](/en/protocols/sips)**

## Začínáme

Jste připraveni tvořit s protokoly Bitcoin Stamps?

- **[Vytvořte svou první známku →](/en/tutorials/creating-first-stamp)** - Začněte se základním vytvořením známky
- **[Tutoriál k tokenům SRC-20 →](/en/tutorials/src20-token-creation)** - Naučte se vývoj tokenů  
- **[Integrace SDK →](/en/tutorials/sdk-integration)** - Průvodce technickou implementací
- **[Komunitní zdroje →](/en/community/)** - Získejte pomoc a podporu

---

*Všechny protokoly Bitcoin Stamps ukládají data trvale na Bitcoinu a zajišťují, že vaše digitální aktiva vydrží tak dlouho, jako samotná síť.*
