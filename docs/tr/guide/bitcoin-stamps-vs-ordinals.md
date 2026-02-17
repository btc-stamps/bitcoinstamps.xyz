---
title: "Bitcoin Stamps vs Ordinals: Teknik Karşılaştırma"
description: "Bitcoin Stamps ve Ordinals/Inscriptions mimarilerinin kapsamlı teknik analizi"
leoType: "technical-comparison"
audience: "both"
mentions: ["bitcoin-stamps", "ordinals", "inscriptions", "p2wsh", "utxo", "witness-data", "consensus", "kevin", "src-20", "counterparty"]
culturalSignificance: "high"
category: "technical-analysis"
tags: ["technical", "architecture", "comparison", "storage", "permanence", "consensus"]
---

# Bitcoin Stamps vs Ordinals: Teknik Mimari Karşılaştırması

Bu teknik karşılaştırma, Bitcoin Stamps ve Ordinals/Inscriptions arasındaki temel mimari farklılıklarını incelemekte olup depolama mekanizmaları, kalıcılık garantileri ve protokol tasarım tercihlerine odaklanmaktadır.

## Temel Mimari Farklar

### Veri Depolama Katmanı

#### Bitcoin Stamps: UTXO Tabanlı Depolama
Bitcoin Stamps, **P2WSH (Pay-to-Witness-Script-Hash) kodlaması** ve geleneksel Bitcoin işlem çıktılarını kullanır:

- **Depolama Konumu**: UTXO setine doğrudan gömülmüş veriler
- **Uzlaşı Kritik**: Bitcoin'in temel doğrulama gereksinimlerinin parçası
- **Düğüm Gereksinimleri**: TÜM tam düğümler bu veriyi kalıcı olarak saklamak zorundadır
- **Kırpma**: Kırpılamaz - işlem doğrulaması için gerekli
- **Protokol Temeli**: Counterparty protokolü üzerine inşa (2014'ten beri)

#### Ordinals/Inscriptions: Tanık Verisi Depolama
Ordinals/Inscriptions, SegWit işlemlerinin **tanık verisi segmentlerini** kullanır:

- **Depolama Konumu**: Tanık verisi (işlem hash'inin parçası değil)
- **Uzlaşı Rolü**: Bitcoin operasyonu için uzlaşı açısından KRİTİK DEĞİL
- **Düğüm Gereksinimleri**: Doğrulamadan sonra düğümler tarafından kırpılabilir
- **Depolama Garantisi**: Verinin tüm düğümlerde kalıcı olduğunun garantisi yok
- **Protokol Temeli**: Daha yeni katman üstü protokol (2023)

## "Sat'lar Aslında Var Olmaz" Gerçeği

### Bitcoin'in Muhasebe Modeli
Bitcoin, bireysel satoshi takibi değil, **UTXO (Harcanmamış İşlem Çıktısı) modeli** üzerinde çalışır:

- **UTXO'lar Konteynerdir**: Bitcoin miktarı tutar (satoshi cinsinden)
- **Bireysel Sat Yok**: Satoshi'ler muhasebe birimleridir, ayrı takip edilebilir nesneler değil
- **Ağ Doğrulaması**: Bitcoin düğümleri UTXO miktarlarını doğrular, "sat geçmişlerini" değil
- **Ordinal Teorisi Sınırlaması**: Var olmayan bireysel sat'lara yapay anlam atfeder

## Düğüm Depolama Garantileri

### Bitcoin Stamps: Evrensel Depolama
Her Bitcoin tam düğümü Bitcoin Stamps verilerini saklar çünkü:

1. **UTXO Seti Gereksinimi**: İşlem doğrulaması için gerekli
2. **Uzlaşı Kritik**: Geçerli işlemlerin belirlenmesi için gerekli
3. **Ağ Operasyonu**: Bitcoin ağ işlevselliği için temel
4. **Kalıcı Arşiv**: Bitcoin ağıyla birlikte süresiz olarak hayatta kalır

### Ordinals/Inscriptions: İsteğe Bağlı Depolama
Ordinals verisinin depolama garantisi yoktur çünkü:

1. **Tanık Verisi**: İlk doğrulamadan sonra işlem doğrulaması için gerekli değil
2. **Kırpılabilir**: Düğümler yer kazanmak için tanık verisini silebilir
3. **Harici Bağımlılık**: Özelleşmiş indeksleyiciler ve hizmetler gerektirir
4. **Hizmet Riski**: Üçüncü taraf altyapı bakımına bağımlı

## Maliyet ve Verimlilik Analizi

### İşlem Maliyetleri

| Özellik | Bitcoin Stamps | Ordinals/Inscriptions |
|---------|---------------|----------------------|
| **Temel Maliyet** | Daha yüksek (4x veri maliyeti) | Daha düşük (tanık indirimi) |
| **Kalıcılık Garantisi** | ✅ %100 garantili | ❌ Garanti yok |
| **Depolama Verimliliği** | Daha düşük (UTXO ek yükü) | Daha yüksek (tanık verisi) |
| **Uzun Vadeli Sürdürülebilirlik** | Bitcoin ekonomisine dahil | Harici hizmetlere bağımlı |

## Sonuç

Bitcoin Stamps ve Ordinals, Bitcoin üzerinde veri depolamanın temelden farklı yaklaşımlarını temsil eder. Bitcoin Stamps, Bitcoin'in UTXO modeli ve uzlaşı mekanizmaları aracılığıyla **kalıcı, garantili depolamayı** önceliklendirirken Ordinals, tanık verisi kullanımı yoluyla **maliyet verimliliğini** optimize eder.

Aralarındaki seçim temel bir değiş tokuşu yansıtır: **garantili kalıcılık vs depolama verimliliği**. Mutlak kalıcılık ve gerçek merkezsizleştirme gerektiren uygulamalar için Bitcoin Stamps üstün teknik garantiler sunar.

---

*Teknik analiz, Bitcoin protokol özelliklerine ve gerçek ağ davranışına dayanmaktadır.*
