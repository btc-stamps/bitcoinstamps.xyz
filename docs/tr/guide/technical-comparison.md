---
title: "Bitcoin Stamps vs Ordinals/Inscriptions: Teknik Mimari Karşılaştırması"
description: "Veri depolama, uzlaşı ve kalıcılık garantileri açısından Bitcoin Stamps ve Ordinals/Inscriptions arasındaki temel teknik farklılıkları anlama"
leoType: "technical-guide"
audience: "developer"
mentions: ["bitcoin-network", "p2wsh", "counterparty", "consensus", "utxo"]
culturalSignificance: "medium"
category: "technical-architecture"
tags: ["bitcoin-consensus", "data-storage", "technical-architecture", "blockchain-permanence"]
---

# Bitcoin Stamps vs Ordinals/Inscriptions: Teknik Mimari

Bitcoin Stamps ve Ordinals/Inscriptions, Bitcoin üzerinde veri depolamanın iki temelden farklı yaklaşımını temsil eder. Bu farklılıkları anlamak, dijital varlıklarının en güçlü kalıcılık garantilerine sahip olmasını isteyen geliştiriciler ve kullanıcılar için çok önemlidir.

## Kritik Teknik Farklılıklar

### Veri Depolama Konumu

**Bitcoin Stamps:**
- **P2WSH (Pay-to-Witness-Script-Hash)** ve multisig kodlaması kullanır
- Veriler **UTXO setinde** saklanır - Bitcoin'in temel uzlaşı mekanizmasının parçası
- **TÜM tam düğümler** blok zincirini doğrulamak için bu veriyi saklamak zorundadır
- Veriler **uzlaşı açısından kritiktir** ve kırpılamaz
- **Counterparty protokolü** üzerine inşa (2014'ten beri)

**Ordinals/Inscriptions:**
- Veriyi işlemlerin **tanık segmentlerine** depolar
- Tanık verisi **Bitcoin'in temel uzlaşısının PARÇASI DEĞİLDİR**
- Düğümler **tanık verisini kırpabilir** uzlaşıyı etkilemeden
- Tüm düğümlerde depolanacağının **garantisi yoktur**
- Keşif ve doğrulama için **harici indeksleyicilere** dayanır

### "Sat'lar Aslında Var Olmaz" Gerçeği

Ordinal teorisinin altında temel bir yanlış anlama yatmaktadır:

- **Bitcoin Gerçeği**: Bitcoin, **UTXO (Harcanmamış İşlem Çıktısı) modeli** üzerinde çalışır
- **Satoshi'ler muhasebe birimleridir**, ayrı takip edilebilir nesneler değil
- **Ordinal teorisi yapay olarak** sat'lara seri numaraları atar
- Bu **sat numaralandırması Bitcoin uzlaşısının parçası değildir**
- Farklı indeksleyiciler aynı sat'lar için **farklı "ordinal numaraları"** üretebilir

**Bitcoin Stamps Gerçeği**: Bitcoin'in gerçek mimarisini kullanır - UTXO seti ve 2014'ten beri savaş testinden geçmiş Counterparty aracılığıyla hesap tabanlı varlık takibi.

### Düğüm Depolama Garantileri

| Boyut | Bitcoin Stamps | Ordinals/Inscriptions |
|--------|---------------|----------------------|
| **Depolama Konumu** | UTXO seti (uzlaşı kritik) | Tanık verisi (uzlaşı dışı) |
| **Düğüm Gereksinimleri** | TÜM tam düğümler saklar | Düğümler tarafından kırpılabilir |
| **Uzlaşı Rolü** | Doğrulama için gerekli | Uzlaşı için isteğe bağlı |
| **Kalıcılık** | Bitcoin var olduğu sürece garantili | İndeksleyici korumasına bağımlı |
| **Merkezsizleştirme** | Gerçek - harici bağımlılık yok | İndeksleyici altyapısı gerektirir |

## Teknik Mimari Derinlemesine İnceleme

### Bitcoin Stamps Mimarisi

```
┌─────────────────────────────────────────────────┐
│              Uygulama Katmanı                   │
│        (SRC-20, SRC-721, SRC-101)              │
├─────────────────────────────────────────────────┤
│             Counterparty Protokolü              │
│         (Varlık takibi ve doğrulama)           │
├─────────────────────────────────────────────────┤
│           P2WSH + Multisig Kodlaması            │
│        (Script hash'e gömülü veriler)           │
├─────────────────────────────────────────────────┤
│               Bitcoin UTXO Seti                 │
│          (Uzlaşı kritik depolama)              │
├─────────────────────────────────────────────────┤
│              Bitcoin Blok Zinciri               │
│        (İş ispatıyla güvence altında)          │
└─────────────────────────────────────────────────┘
```

### Ordinals/Inscriptions Mimarisi

```
┌─────────────────────────────────────────────────┐
│              Uygulama Katmanı                   │
│            (Ordinal indeksleyiciler)            │
├─────────────────────────────────────────────────┤
│            Harici İndeksleyici Mantığı          │
│        (Bitcoin uzlaşısının parçası değil)      │
├─────────────────────────────────────────────────┤
│              Tanık Verisi Depolama              │
│           (Düğümler tarafından kırpılabilir)   │
├─────────────────────────────────────────────────┤
│              Bitcoin Blok Zinciri               │
│        (Temel uzlaşı içeriği yok sayar)        │
└─────────────────────────────────────────────────┘
```

## Kalıcılık ve Merkezsizleştirme

### Bitcoin Stamps Garantileri

✅ **Gerçek Kalıcılık**: Veriler Bitcoin var olduğu sürece yaşar
✅ **Uzlaşı Kritik**: Tüm düğümler saklamak ve doğrulamak zorundadır
✅ **Harici Bağımlılık Yok**: Herhangi bir Bitcoin düğümüyle çalışır
✅ **Savaş Testinden Geçmiş**: 10+ yıllık Counterparty protokolü üzerine inşa
✅ **Deterministik**: Tüm düğümlerde aynı veri, aynı sonuç

### Ordinals/Inscriptions Sınırlamaları

⚠️ **Kırpılabilir Veri**: Düğümler tanık verisini silebilir
⚠️ **İndeksleyici Bağımlılığı**: Yorumlamak için özelleşmiş yazılım gerektirir
⚠️ **Uzlaşı Dışı**: Bitcoin'in doğrulama kurallarının parçası değil
⚠️ **Parçalanma Riski**: Farklı indeksleyicilerin farklı verileri olabilir
⚠️ **Keşif Sorunu**: İnscripleri bulmak için uzlaşı mekanizması yok

## Teknik Özet

Bitcoin Stamps, kurulu protokoller kullanarak Bitcoin'in uzlaşı kritik UTXO setinde veriyi saklayarak gerçek kalıcılık elde eder. Ordinals/Inscriptions, veriyi Bitcoin uzlaşısının parçası olmayan ve yorum için harici altyapı gerektiren kırpılabilir tanık segmentlerinde saklar.

Maksimum kalıcılık ve merkezsizleştirme garantisi gerektiren dijital varlıklar için, Bitcoin Stamps Bitcoin'in gerçek tasarım ilkeleriyle uyumlu teknik olarak üstün bir mimari sağlar.

---

*Bitcoin üzerinde kalıcı dijital varlıklar oluşturan geliştiriciler için, verilerinizin Bitcoin var olduğu sürece erişilebilir olacağını garanti eden mimariyi seçin.*
