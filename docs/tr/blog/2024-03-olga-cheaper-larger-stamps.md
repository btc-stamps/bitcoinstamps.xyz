---
title: "OLGA: P2WSH ile Daha Ucuz, Daha Büyük Stamp'ler"
date: "2024-03-03"
author: "reinamora"
description: "OLGA, stamp kodlamasını P2WSH'ye taşıdı; klasik stamp'ler için 833,000 numaralı blokta ve SRC-20 için 865,000 numaralı blokta etkinleşti. İşlem boyutunu yaklaşık yarı yarıya, ücretleri ise %60-70 azaltır."
tags: ["history", "olga", "milestone", "p2wsh", "fees"]
leoType: "blog"
---

# OLGA: P2WSH ile Daha Ucuz, Daha Büyük Stamp'ler

<EntityMention entity="olga">OLGA</EntityMention>, <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>'i aynı anda hem daha ucuz hem de daha büyük hale getiren kodlama yükseltmesidir. Stamp verilerini P2WSH çıktılarına taşıdı ve daha önceki her stamp'in ödemekte olduğu bir yığın ek yükü ortadan kaldırdı.

## İki etkinleştirme yüksekliği

OLGA, her biri bir bloğa sabitlenmiş iki aşamada kullanıma sunuldu. Klasik stamp P2WSH kodlaması 3 Mart 2024'te 833,000 numaralı blokta etkinleşti. İlk <EntityMention entity="src-20">SRC-20</EntityMention> P2WSH OLGA stamp'i daha sonra, 10 Ekim 2024'te 865,000 numaralı blokta geldi. Her iki yükseklik de konsensüs kontrol noktalarıdır, böylece indeksleyiciler her yolun tam olarak ne zaman açıldığını bilir.

## P2WSH neyi değiştirir

Eski kodlama, çıplak çoklu imza (bare multisig) çıktılarına dayanıyordu ve verileri Base64 içine sarıyordu. Base64, ikili verilerin güvenli bir şekilde taşınmasını sağlar, ancak yalnızca kodlama için yaklaşık üçte bir oranında fazladan bayt ekler. Bayt başına ödeme yaptığınız bir zincirde, bu ek yük gerçek bir maliyettir.

OLGA, Base64 katmanını kaldırır ve bunun yerine Pay-to-Witness-Script-Hash (P2WSH) çıktılarını kullanır. Sonuç:

- İşlemler yaklaşık %50 daha küçülür.
- Ücretler kabaca %60 ila %70 oranında düşer.
- Tek bir stamp işlemi, yaklaşık 64 kB'a kadar veri taşıyabilir.

Daha küçük ve daha ucuz olması, daha fazla insanın stamp oluşturabileceği anlamına gelir; işlem başına daha büyük kapasite ise daha zengin sanatın zincire sığması anlamına gelir.

## Aynı kalıcılık, daha düşük maliyet

Önemli olan kısım: bunların hiçbiri kalıcılık garantisini zayıflatmadı. OLGA stamp'leri hâlâ UTXO kümesinde yaşar, hâlâ budanamaz, hâlâ Bitcoin'in kendi dayanıklılığını devralır. OLGA, verilerin nasıl paketlendiğini değiştirdi, nerede yaşadığını değil.

Bu, <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>'in tekrarlayıp durduğu kalıptır: iyileştirmeleri etkinleştirme yüksekliklerinin arkasına yerleştirmek, bunları zincire karşı kanıtlamak ve kolaylık uğruna kalıcılıktan asla vazgeçmemek. OLGA, bir stamp'i stamp yapan şeyden vazgeçmeden protokolü çok daha fazla kişi için erişilebilir hale getirdi.

---

*Ekonomik modeli [Bitcoin Stamps Whitepaper](/en/whitepaper/) içinde okuyun ve ekosistemi [stampchain.io](https://stampchain.io) adresinde keşfedin.*
