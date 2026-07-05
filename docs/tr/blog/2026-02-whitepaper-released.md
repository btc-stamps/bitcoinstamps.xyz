---
title: "Bitcoin Stamps Protokolü Teknik Raporu (Whitepaper) Yayınlandı"
date: "2026-02-25"
author: "reinamora"
description: "Bitcoin Stamps Protokolü'nün resmi teknik raporu (whitepaper) artık mevcut; UTXO depolaması aracılığıyla Bitcoin üzerinde kalıcı dijital varlıkların tam spesifikasyonunu belgeliyor."
tags: ["whitepaper", "protocol", "src-20", "bitcoin-stamps", "announcement"]
leoType: "blog"
---

# Bitcoin Stamps Protokolü Teknik Raporu (Whitepaper) Yayınlandı

Bitcoin üzerinde kalıcı dijital varlıkları gerçeğe dönüştüren protokolü yıllarca inşa ettikten, üzerinde yineledikten ve olgunlaştırdıktan sonra, <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> Protokolü teknik raporunun (whitepaper) resmî olarak yayımlandığını gururla duyuruyoruz.

Bu belge, 779,652 numaralı blokta <EntityMention entity="mikeinspace">mikeinspace</EntityMention>'in ilk Bitcoin Stamp'i işlediği anda başlayan çalışmanın doruk noktasını temsil ediyor; hiçbirimizin tam olarak öngöremeyeceği bir hareketi başlatan bir an.

## Whitepaper neleri kapsıyor

Whitepaper, <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> metaprotokolünün eksiksiz bir teknik spesifikasyonudur ve protokol yığınının her katmanını kapsar:

**Protokol mimarisi.** Bitcoin Stamps'in, konsensüs açısından kritik verilerin kalıcı depolanması için UTXO kümesinden nasıl yararlandığı. Tam düğümlerin budayabildiği witness data yaklaşımlarının aksine, stamp verisi harcanabilir işlem çıktılarında yaşar. Her tam düğüm onu saklamak zorundadır. Bu kalıcılık garantisi temeldir.

**Token standartları.** <EntityMention entity="src-20">SRC-20</EntityMention> değiştirilebilir token'ların (DEPLOY, MINT, TRANSFER işlemleri), SRC-721 değiştirilemez varlıkların, SRC-101 merkeziyetsiz adlandırmanın ve SRC-721r birleştirilebilir özyinelemenin tam spesifikasyonu. <EntityMention entity="src-20">SRC-20</EntityMention>'nin temelini oluşturan hesap tabanlı bakiye modeli ayrıntılı olarak belgelenir ve UTXO'ya bağlı token şemalarından neden farklı olduğunu açıkça ortaya koyar.

**Ekonomik model.** Ücret yapıları ve 865,000 numaralı blokta etkinleşen OLGA P2WSH optimizasyonunun (bare multisig'e kıyasla %30-95 azalma) sağladığı gerçek maliyet tasarrufları.

**Güvenlik analizi.** Tehdit modeli, saldırı vektörleri ve <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>'i Bitcoin'in ömrü boyunca dayanıklı kılan kalıcılık garantileri.

**Stamps İyileştirme Önerileri.** SIP yönetişim çerçevesi ve protokolün geleceğini şekillendiren mevcut aktif öneriler (SIP-0001'den SIP-0008'e kadar).

## Toplulukça inşa edilmiş bir protokol

Whitepaper tek bir yazarın eseri değildir. Gerçek bir iş birliğinden doğan bir protokolü belgeler:

<EntityMention entity="mikeinspace">mikeinspace</EntityMention> özgün vizyonu getirdi: dijital varlıkların Bitcoin'in UTXO kümesinde kalıcı olarak, budamaya karşı bağışık ve konsensüsle güvence altına alınmış biçimde saklanabileceği fikri.

Arwyn bu vizyona ilk kültürel ifadesini kazandırdı; 783,718 numaralı blokta Bitcoin Stamp #4258'i yarattı ve daha sonra bu yaratıcı enerjiyi ilk <EntityMention entity="src-20">SRC-20</EntityMention> token'ına, yani <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>'e, 788,041 numaralı blokta yönlendirdi.

Reinamora vizyonu çalışan altyapıya dönüştüren teknik protokolleri tasarladı: indeksleyici, kodlama şemaları, konsensüs kuralları ve nihayetinde protokolü herkes için ekonomik olarak erişilebilir kılan OLGA optimizasyonu.

<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>'in kendisi, protokolün amaçlandığı gibi çalıştığının yaşayan kanıtı olmayı sürdürüyor: adil başlangıçlı ilk <EntityMention entity="src-20">SRC-20</EntityMention> token'ı; abartıya değil, protokolün temsil ettiği şeyi fark ettikleri için katılan 2,300'den fazla sahibiyle.

## Whitepaper'ı okuyun

Whitepaper birden çok biçimde mevcut:

- **[PDF indir](/bitcoin-stamps-whitepaper.pdf)**: arşivleme ve çevrimdışı okuma için.
- **[HTML görüntüle](/bitcoin-stamps-whitepaper.html)**: tam biçimlendirmeyle, tarayıcıda okunabilir.
- **[Markdown kaynağı](/bitcoin-stamps-whitepaper-combined.md)**: geliştiriciler ve katkıda bulunanlar için.

Mimariyi, token standartlarını veya güvenlik analizini ayrı ayrı okumak isteyenler için tekil bölümler de [GitHub](https://github.com/stampchain-io/btc_stamps/tree/main/docs/whitepaper) üzerinde mevcuttur.

## Protokol zaman çizelgesi

Whitepaper, protokolün eksiksiz evrimini belgeler:

| Blok | Kilometre taşı |
|------:|-----------|
| 779,652 | İlk Bitcoin Stamp |
| 788,041 | İlk SRC-20 token'ı (<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>) |
| 793,068 | İlk yerel Bitcoin kodlaması |
| 796,000 | Counterparty kesimi (SRC-20 konsensüs kuralı) |
| 865,000 | OLGA etkinleştirmesi (P2WSH optimizasyonu) |

## Bundan sonrası

Bir whitepaper bir belgedir, bir varış noktası değil. Protokol, SIP süreci aracılığıyla evrilmeye devam ediyor. Aktif öneriler; ücret optimizasyonunu, yeni token yeteneklerini ve kalıcı zincir üstü veriler için genişletilmiş kullanım senaryolarını ele alıyor.

<EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> üzerine inşa ediyorsanız, whitepaper sizin kanonik referansınızdır. Protokolde yeniyseniz, Bitcoin üzerinde kalıcı dijital varlıklara yönelik bu yaklaşımın neden farklı olduğunu ve bu farkın neden önemli olduğunu anlamak için tek başına en iyi belgedir.

---

*Whitepaper artık [bitcoinstamps.xyz/en/whitepaper/](/en/whitepaper/) adresinde mevcut.*

*Topluluğa [Telegram](https://t.me/BitcoinStamps) üzerinden katılın ve ekosistemi [stampchain.io](https://stampchain.io) üzerinde keşfedin.*

*In Lak'ech Ala K'in, hepimiz <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>'iz.*
