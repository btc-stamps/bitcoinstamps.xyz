---
title: "Bitcoin Stamps Protokolü: Teknik Teknik Doküman"
description: "Bitcoin Stamps metaprotokolu için eksiksiz teknik özellikler - UTXO depolama yoluyla Bitcoin üzerinde kalıcı dijital varlıklar"
leoType: "whitepaper"
audience: "unified"
culturalSignificance: "high"
mentions: ["bitcoin-stamps", "src-20", "src-721", "src-101", "olga", "counterparty", "utxo", "p2wsh", "whitepaper"]
category: "technical-specification"
---

# Bitcoin Stamps Protokolü: Teknik Doküman

<div style="margin: 1.5rem 0 2.5rem; padding: 1.5rem 1.75rem; background: var(--vp-c-bg-soft); border-left: 4px solid var(--vp-c-brand-1); border-radius: 0 8px 8px 0;">

**Temel Yenilik** &mdash; Bitcoin'in UTXO setini kalıcı veri depolama için kullanmak, varlık verilerini uzlaşı açısından kritik ve kırpılamaz hale getirir. Tüm tam düğümler, işlemleri doğrulamak için stamp verilerini depolamak zorundadır, bu da Bitcoin var olduğu sürece kalıcılığı garanti eder.

</div>

## Özet

Bitcoin Stamps, doğrudan UTXO depolama yoluyla Bitcoin üzerinde kalıcı, değiştirilemez dijital varlıklar oluşturmak için bir metaprotokoldür. Tanık verisi yaklaşımlarından farklı olarak, Bitcoin Stamps varlık verilerini ham multisig ve P2WSH kodlaması kullanarak işlem çıktılarına gömer, evrensel düğüm depolama ve uzlaşı açısından kritik kalıcılık sağlar.

Protokol, Counterparty temellerinden (blok 779.652) yerel Bitcoin kodlamasına (blok 793.068) ve OLGA aracılığıyla P2WSH optimizasyonuna (blok 865.000) kadar evrildi. Hesap tabanlı varlık takibi üzerine inşa edilen Bitcoin Stamps; fungible tokenlar (SRC-20), fungible olmayan varlıklar (temel stamplar), merkezi olmayan adlandırma (SRC-101) ve bileşilebilir özyineleme (SRC-721) destekler.

| Özellik | Açıklama |
|---------|-------------|
| **UTXO tabanlı kalıcılık** | Tanık segmentlerde değil, harcanabilir çıktılarda depolanan veriler |
| **Uzlaşı kritik depolama** | Tüm düğümlerde işlem doğrulaması için gerekli |
| **Hesap tabanlı varlıklar** | Counterparty tarzı bakiye takibi, UTXO bağlı tokenlar değil |
| **Çoklu protokol desteği** | Tokenlar, isimler ve özyineleme için genişletilebilir mimari |
| **Maliyet optimize edilmiş kodlama** | OLGA P2WSH, ham multisig'e göre ücretleri %30-95 azaltır |

---

## İndirme

<div style="margin: 1.5rem 0; padding: 1.75rem; background: var(--vp-c-bg-soft); border-radius: 8px; text-align: center;">
  <p style="font-size: 1.1rem; margin-bottom: 1rem; font-weight: 600;">Bitcoin Stamps Teknik Dokümanı</p>
  <p style="margin-bottom: 1.25rem; color: var(--vp-c-text-2);">Mimari, token standartları, ekonomi ve uygulama detaylarını içeren eksiksiz özellikler</p>
  <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
    <a href="/bitcoin-stamps-whitepaper.pdf" download style="display: inline-block; padding: 10px 22px; background: var(--vp-c-brand-1); color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">PDF İndir</a>
    <a href="/bitcoin-stamps-whitepaper.html" target="_blank" style="display: inline-block; padding: 10px 22px; background: var(--vp-c-neutral); color: var(--vp-c-neutral-inverse); text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">HTML Görüntüle</a>
    <a href="/bitcoin-stamps-whitepaper-combined.md" download style="display: inline-block; padding: 10px 22px; border: 1px solid var(--vp-c-divider); color: var(--vp-c-text-1); text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem;">Markdown Kaynak</a>
  </div>
</div>

---

## İçindekiler

GitHub'da bireysel bölümleri okuyun (kanonik kaynak):

| Bölüm | Başlık | Konular |
|:-------:|-------|--------|
| 1 | [Giriş](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/introduction.md) | Protokol motivasyonu, Counterparty kökenleri, başlangıç bloğu 779.652, OLGA aktivasyonu |
| 2 | [Protokol Mimarisi](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/architecture.md) | UTXO depolama modeli, ham multisig vs P2WSH kodlaması, hesap tabanlı takip |
| 3 | [Token Standartları](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/token-standards.md) | SRC-20, SRC-721, SRC-721r, SRC-101 &mdash; DEPLOY, MINT, TRANSFER işlemleri |
| 4 | [Ekonomik Model](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/economics.md) | Ücret yapıları, UTXO kalıcılık ekonomisi, multisig vs P2WSH maliyet analizi |
| 5 | [Stamps İyileştirme Önerileri](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/improvement-proposals.md) | SIP yönetişimi, aktif öneriler (SIP-0001 - SIP-0008) |
| 6 | [Uygulama](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/implementation.md) | İndeksleyici mimarisi, uzlaşı mekanizmaları, doğrulama mantığı |
| 7 | [Güvenlik Analizi](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/security.md) | Tehdit modeli, saldırı vektörleri, kalıcılık garantileri |
| 8 | [Gelecek Çalışmalar](https://github.com/stampchain-io/btc_stamps/blob/main/docs/whitepaper/future.md) | Araştırma yönleri, SIP yol haritası özeti |

---

## Protokol Zaman Çizelgesi

| Blok | Tarih | Kilometre Taşı |
|------:|------|-----------|
| 779.652 | 29 Mart 2023 | mikeinspace tarafından ilk Bitcoin Stamp |
| 788.041 | 20 Nisan 2023 | Arwyn tarafından ilk SRC-20 token (KEVIN) dağıtımı |
| 793.068 | 20 Nisan 2023 | İlk yerel Bitcoin kodlaması (Counterparty yok) |
| 796.000 | 15 Ağustos 2023 | Counterparty kesimi &mdash; SRC-20 uzlaşı kuralı |
| 833.000 | &mdash; | Stamplarda P2WSH işlemleri etkinleştirildi |
| 865.000 | 15 Ekim 2023 | OLGA aktivasyonu &mdash; SRC-20 için P2WSH optimizasyonu |

<div style="margin: 1rem 0; padding: 1rem 1.5rem; background: var(--vp-c-bg-soft); border-radius: 8px;">

**Temel**: Counterparty protokolü üzerine inşa edilmiştir (2014'ten beri) kanıtlanmış hesap tabanlı varlık takibi için<br>
**Depolama Modeli**: UTXO tabanlı (uzlaşı kritik, kırpılamaz)<br>
**Varlık Modeli**: Hesap tabanlı (bakiyeler adres başına takip edilir, UTXO başına değil)

</div>

---

## Atıf

```
Bitcoin Stamps Topluluğu (2026). Bitcoin Stamps Protokolü: Teknik Doküman.
Sürüm 1.0. Şuradan alındı: https://bitcoinstamps.xyz/tr/whitepaper/
```

---

## Topluluk

| | |
|-|-|
| **GitHub** | [stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps) |
| **Telegram** | [t.me/BitcoinStamps](https://t.me/BitcoinStamps) |
| **Topluluk** | [Bitcoin Stamps Topluluğu](/tr/community/) |
| **Protokoller** | [Protokol Dokümantasyonu](/tr/protocols/) |
| **Eğitimler** | [Geliştirici Rehberleri](/tr/tutorials/) |

---

<div style="text-align: center; color: var(--vp-c-text-2); font-style: italic; padding: 1rem 0;">

Bu teknik doküman, Bitcoin Stamps protokolü için kanonik teknik özellik olarak hizmet vermektedir.<br>
Tüm uygulamalar, protokol uyumluluğu ve uzlaşı kuralları için bu belgeye başvurmalıdır.

</div>
