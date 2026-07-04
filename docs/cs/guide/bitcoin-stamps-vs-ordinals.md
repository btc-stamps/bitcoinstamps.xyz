---
title: "Bitcoin Stamps vs Ordinals: Technické srovnání"
description: "Komplexní technická analýza architektur Bitcoin Stamps a Ordinals/Inscriptions, zkoumající ukládání v UTXO, kódování P2WSH, záruky uzlů a zásadní rozdíly mezi protokoly"
leoType: "technical-comparison"
audience: "both"
mentions: ["bitcoin-stamps", "ordinals", "inscriptions", "p2wsh", "utxo", "witness-data", "consensus", "kevin", "src-20", "counterparty"]
culturalSignificance: "high"
category: "technical-analysis"
tags: ["technical", "architecture", "comparison", "storage", "permanence", "consensus"]
---

# Bitcoin Stamps vs Ordinals: Srovnání technické architektury

Toto technické srovnání zkoumá zásadní architektonické rozdíly mezi Bitcoin Stamps a Ordinals/Inscriptions se zaměřením na mechanismy ukládání, záruky trvalosti a rozhodnutí v návrhu protokolu.

## Základní architektonické rozdíly

### Vrstva ukládání dat

#### Bitcoin Stamps: Ukládání založené na UTXO
Bitcoin Stamps používají **kódování P2WSH (Pay-to-Witness-Script-Hash)** a tradiční transakční výstupy Bitcoinu:

- **Umístění dat**: Data vložená přímo do sady UTXO
- **Kritické pro konsensus**: Součást základních validačních požadavků Bitcoinu
- **Požadavky na uzly**: VŠECHNY plné uzly musí tato data ukládat trvale
- **Ořezávání**: Nelze ořezat – vyžadováno pro validaci transakcí
- **Základ protokolu**: Postaveno na <EntityMention entity="counterparty">protokolu Counterparty</EntityMention> (zavedeném v roce 2014)

#### Ordinals/Inscriptions: Ukládání ve svědeckých datech
Ordinals/Inscriptions používají **segmenty svědeckých dat** transakcí SegWit:

- **Umístění dat**: Svědecká data (nejsou součástí hashe transakce)
- **Role v konsensu**: NENÍ kritické pro konsensus provozu Bitcoinu
- **Požadavky na uzly**: Uzly je mohou po validaci ořezat
- **Záruka ukládání**: Žádná záruka, že data přetrvají na všech uzlech
- **Základ protokolu**: Novější překryvný protokol (2023)

## Realita „saty ve skutečnosti neexistují“

### Účetní model Bitcoinu
Bitcoin funguje na **modelu UTXO (Unspent Transaction Output)**, nikoli na sledování jednotlivých satoshi:

- **UTXO jsou kontejnery**: Uchovávají množství bitcoinu (měřená v satoshi)
- **Žádné jednotlivé saty**: Satoshi jsou účetní jednotky, nikoli samostatné sledovatelné objekty  
- **Validace sítě**: Uzly Bitcoinu validují částky UTXO, nikoli „historie satů“
- **Omezení teorie Ordinals**: Přisuzuje umělý význam neexistujícím jednotlivým satům

### Realita technické implementace

```
Bitcoin Network Reality:
┌──────────────────┐    ┌──────────────────┐
│   UTXO: 0.001    │───▶│  UTXO: 0.0005    │
│   BTC (100,000   │    │  BTC (50,000     │
│   satoshis)      │    │  satoshis)       │  
└──────────────────┘    └──────────────────┘

Ordinal Theory Overlay (Not Consensus):
"This sat #123456789 has trait X" ← Artificial assignment
```

**Validace Bitcoin Core**: Kontroluje částky a skripty, NIKOLI historie jednotlivých satů.

## Záruky ukládání na uzlech

### Bitcoin Stamps: Univerzální ukládání
Každý plný uzel Bitcoinu ukládá data Bitcoin Stamps, protože:

1. **Požadavek sady UTXO**: Potřebné pro validaci transakcí
2. **Kritické pro konsensus**: Vyžadováno pro určení platných transakcí
3. **Provoz sítě**: Nezbytné pro funkčnost sítě Bitcoinu
4. **Trvalý archiv**: Přetrvává neomezeně dlouho se sítí Bitcoinu

### Ordinals/Inscriptions: Volitelné ukládání
Data Ordinals nemají žádnou záruku ukládání, protože:

1. **Svědecká data**: Nejsou vyžadována pro validaci transakcí po počátečním ověření
2. **Ořezatelná**: Uzly mohou svědecká data smazat pro úsporu místa
3. **Externí závislost**: Vyžaduje specializované indexery a služby
4. **Riziko služby**: Závislé na údržbě infrastruktury třetích stran

## Analýza technické architektury

### Bitcoin Stamps: Model založený na účtech
Postaveno na osvědčené <EntityMention entity="counterparty">architektuře Counterparty</EntityMention>:

```typescript
// Simplified asset tracking model
interface StampAsset {
  owner: BitcoinAddress;
  assetName: string;
  quantity: number;
  // Simple account balance - no UTXO complexity
}
```

**Přínosy:**
- Jednoduchá správa aktiv
- Jasný model vlastnictví  
- Zavedený protokol (více než 10 let)
- Není potřeba složité sledování UTXO

### Ordinals: Složitost sledování UTXO
Vyžaduje sledování jednotlivých satoshi napříč transakcemi:

```typescript
// Complex sat tracking model
interface OrdinalSat {
  satNumber: number;
  currentUTXO: UTXOReference;
  inscriptionData?: InscriptionData;
  transferHistory: Transaction[];
  // Must track every movement
}
```

**Výzvy:**
- Složité sledování stavu napříč všemi transakcemi
- Problémy s fragmentací UTXO
- Nejednoznačnost „umístění“ satu ve víc­evstupových transakcích
- Nekonsensuální požadavky na sledování

## Analýza nákladů a efektivity

### Transakční náklady

| Vlastnost | Bitcoin Stamps | Ordinals/Inscriptions |
|---------|---------------|----------------------|
| **Základní náklady** | Vyšší (4× náklady na data) | Nižší (sleva na svědecká data) |
| **Záruka trvalosti** | ✅ 100% zaručeno | ❌ Žádná záruka |
| **Efektivita ukládání** | Nižší (režie UTXO) | Vyšší (svědecká data) |
| **Dlouhodobá udržitelnost** | Zabudováno do ekonomiky Bitcoinu | Závisí na externích službách |

### Dopad na síť

**Bitcoin Stamps:**
- Zvětšují sadu UTXO (mírný dopad na ukládání na všech uzlech)
- Generují transakční poplatky podporující těžaře
- Posilují síť prostřednictvím zvýšeného využití
- Přispívají k ekonomickému bezpečnostnímu modelu Bitcoinu

**Ordinals/Inscriptions:**
- Mohou výrazně nafouknout svědecká data
- Mohou zvýšit požadavky na šířku pásma
- Generují poplatky, ale se slevou na svědecká data
- Omezený příspěvek k bezpečnostní ekonomice sítě

## Filozofie návrhu protokolu

### Bitcoin Stamps: Konzervativní přístup
- **Osvědčený základ**: <EntityMention entity="counterparty">Protokol Counterparty</EntityMention> prověřený od roku 2014
- **Nativní pro Bitcoin**: Funguje v rámci existujícího ekonomického a technického modelu Bitcoinu
- **Udržitelný růst**: Navrženo pro dlouhodobý vývoj protokolu
- **Hodnoty komunity**: Ztělesněné principy férového spuštění <EntityMention entity="kevin" variant="cultural">KEVINa</EntityMention>

### Ordinals: Inovace za cenu
- **Nový přístup**: Kreativní využití prostoru svědeckých dat
- **Teoretický rámec**: Překryvný systém číslování satoshi
- **Rychlá adopce**: Rychlé přijetí trhem navzdory technickým omezením
- **Externí závislosti**: Vyžaduje specializovanou infrastrukturu

## Analýza decentralizace

### Bitcoin Stamps: Skutečná decentralizace
- **Žádné speciální služby**: Funguje s jakýmkoli plným uzlem Bitcoinu
- **Standardní nástroje**: Kompatibilní se stávající infrastrukturou Bitcoinu
- **Sebevalidující**: Integrita dat zaručena konsensem Bitcoinu
- **Odolné vůči budoucnosti**: Přežívají tak dlouho, dokud existuje síť Bitcoinu

### Ordinals/Inscriptions: Závislosti na službách
- **Požadavky na indexery**: Potřebují specializované služby pro sledování a zobrazení
- **Závislosti na API**: Peněženky a aplikace vyžadují vlastní infrastrukturu  
- **Riziko dat**: Obsah inscription se může stát nedostupným
- **Zátěž údržby**: Vyžadována průběžná údržba infrastruktury

## Úvahy pro vývojáře

### Vývoj s Bitcoin Stamps
```typescript
// Simple integration pattern
const stampResult = await btcStampsSDK.createStamp({
  imageData: buffer,
  feeRate: 20
});
// Data automatically stored in UTXO set
// No additional indexing required
```

### Vývoj s Ordinals
```typescript
// Complex integration requirements
const ordinalService = new OrdinalIndexer(API_ENDPOINT);
const inscriptionData = await ordinalService.getInscription(satNumber);
// Requires external service
// Must handle service availability
// Need backup indexer services
```

## Dlouhodobé důsledky

### Bitcoin Stamps: Soulad s protokolem
- **Udržitelné**: V souladu s ekonomickými pobídkami Bitcoinu
- **Škálovatelné**: Model založený na účtech snižuje složitost
- **Udržovatelné**: Standardní nástroje Bitcoinu postačují
- **Vývoj**: Přirozená cesta vylepšování protokolu

### Ordinals/Inscriptions: Otázky udržitelnosti
- **Zátěž infrastruktury**: Průběžná údržba indexerů a služeb
- **Výzvy škálování**: Složitost sledování UTXO roste s adopcí
- **Riziko služby**: Závislé na pokračující podpoře třetích stran
- **Divergence protokolu**: Může být v rozporu s vývojovými prioritami Bitcoin Core

## Technická doporučení

### Pro trvalá digitální aktiva
**Zvolte Bitcoin Stamps, když:**
- Dlouhodobá trvalost je zásadní
- Chcete skutečnou decentralizaci
- Standardní nástroje Bitcoinu postačují
- Náklady jsou druhotné oproti záruce trvalosti

**Zvažte Ordinals, když:**
- Nižší transakční náklady jsou prioritou
- Máte robustní plány na infrastrukturu
- Jsou vyžadovány velké velikosti souborů
- Krátkodobé až střednědobé použití

### Pro vývoj protokolu
**Výhody Bitcoin Stamps:**
- Zavedený základ protokolu
- Prověřená technická architektura
- Kompatibilní s filozofií návrhu Bitcoinu
- Přirozená cesta upgradu pro budoucí vylepšení

## Závěr

Bitcoin Stamps a Ordinals představují zásadně odlišné přístupy k ukládání dat na Bitcoinu. Bitcoin Stamps upřednostňují **trvalé, zaručené uložení** prostřednictvím modelu UTXO a konsensuálních mechanismů Bitcoinu, zatímco Ordinals optimalizují **efektivitu nákladů** prostřednictvím využití svědeckých dat.

Volba mezi nimi odráží zásadní kompromis: **zaručená trvalost vs. efektivita ukládání**. Pro aplikace vyžadující absolutní trvalost a skutečnou decentralizaci poskytují Bitcoin Stamps lepší technické záruky. Pro aplikace upřednostňující efektivitu nákladů a přijímající závislosti na infrastruktuře nabízejí Ordinals alternativní přístup.

Oba protokoly přispívají k růstu ekosystému Bitcoinu, ale jejich odlišné technické základy je činí vhodnými pro různé případy použití a míry tolerance rizika.

---

*Technická analýza vychází ze specifikací protokolu Bitcoin a skutečného chování sítě. Detaily protokolu podléhají průběžnému vývoji a konsensu komunity.*
