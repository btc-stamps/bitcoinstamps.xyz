---
title: "Bitcoin Stamps İndeksleyici v1.9.1 Yayınlandı"
date: "2026-07-04"
author: "reinamora"
description: "İndeksleyici v1.9.1 sürümü, 940,000 numaralı blokta SRC-101 P2WSH/OLGA kodlamasını etkinleştirir, bir piyasa verisi ve webhook katmanı ekler ve üretim defteriyle hash bakımından birebir aynı olduğu kanıtlanan, genesis'ten uca tam bir konsensüs yeniden doğrulamasından geçer."
tags: ["indexer", "release", "src-101", "olga", "consensus", "announcement"]
leoType: "blog"
---

# Bitcoin Stamps İndeksleyici v1.9.1 Yayınlandı

Bitcoin Stamps İndeksleyici **v1.9.1** yayında. Bu, 1.9 özellik hattıdır: <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH/OLGA kodlamasını, yeni bir piyasa verisi ve webhook katmanını, Rust ile hızlandırılmış bir ayrıştırma yolunu ve genesis'ten uca tam bir konsensüs yeniden doğrulamasını içeren, konsensüsle doğrulanmış bir protokol etkinleştirme ve sağlamlaştırma paketidir.

Konsensüsü etkileyen her değişiklik etkinleştirme kapılı ya da bayrak kapılıdır (varsayılan olarak kapalı) ve sürüm, genesis'ten itibaren yapılan bir yeniden ayrıştırmayla **üretim defteriyle hash bakımından birebir aynı** olduğu kanıtlanmıştır. Tam sürüm notları ve Docker imajı GitHub'da: [stampchain-io/btc_stamps release 1.9.1](https://github.com/stampchain-io/btc_stamps/releases/tag/1.9.1).

## Öne çıkanlar

- **<EntityMention entity="src-101">SRC-101</EntityMention> P2WSH / <EntityMention entity="olga">OLGA</EntityMention> kodlaması** **940,000 numaralı blokta** etkinleşir. Etkinleşmeden önce SRC-101 yalnızca çıplak çoklu imza (bare multisig) ile desteklenir; etkinleştikten sonra hem çıplak çoklu imza hem de P2WSH çalışır ve JSON düzeyinde ayırt edilir (`"p":"src-101"`).
- **P2WSH işlemleri için SRC-721R dağıtım algılaması**, özyinelemeli SRC-721 açıklama ayrıştırması ve lanetli pullar (cursed stamps) için daha güvenli çift işleme.
- **Piyasa verisi ve satış geçmişi**: güvene göre ağırlıklandırılmış ortalama kullanan çok kaynaklı bir önbellek (KuCoin, StampScan), sahip (holder) önbellekleri ve dağıtıcıları, atomik takasları, OTC'yi ve açık artırmaları kapsayan bir satış geçmişi hattı.
- **Gerçek zamanlı webhook'lar**: yeni bloklar ve yeniden düzenlemeler (reorg) için, SSRF korumasıyla ve tasarım gereği bloklamayan biçimde, böylece bildirimler indekslemeyi asla etkilemez.
- **Performans**: ana blok döngüsünde Rust ile hızlandırılmış bir ayrıştırma yolu ve Counterparty verisi olmayan bloklarda Counterparty API çağrılarından kaçınan bir CP atlama optimizasyonu (hash bakımından birebir aynı olduğu doğrulandı).
- **956,000 numaralı bloğa kadar yeni bir önyükleme (bootstrap) anlık görüntüsü**, hızlı senkronizasyon için yayımlandı.

## Konsensüs doğrulaması

Sürüm, "konsensüsle doğrulanmış" etiketini hak ediyor. Python 3.12 üzerinde genesis'ten uca yapılan bir yeniden ayrıştırma, üretim defteriyle hash hash eşleşti: txlist ve defter hash'leri 176,328 bloğun tamamında uyuştu ve blok başına referans denetimleriyle doğrulandı. Konsensüse komşu tüm bağımlılık yükseltmeleri aynı yeniden ayrıştırma kapısından geçti.

## Yorumlayıcı desteği (önemli)

İndeksleyiciyi **Python 3.10, 3.11 veya 3.12** üzerinde çalıştırın. Konsensüsün bu üç sürümde bayt bayt aynı olduğu kanıtlanmıştır. **Python 3.13 üzerinde çalıştırmayın**: `base64`/`binascii` çözümlemesini sıkılaştırdı ve 783,775 numaralı blokta konsensüsten sapıyor (bir pul yanlış sınıflandırması). Yayımlanan `btcstamps/indexer:1.9.1` imajı, sertifikalı çalışma zamanı olan Python 3.12 üzerine kuruludur.

## Yükseltme notları

- **Counterparty `v11.0.1+` gerektirir** (CP V2 API uç noktası düzeltmesi için).
- Yeni şemayı uygulayın (piyasa verisi, sahip önbelleği ve satış geçmişi tabloları ile bir `fee_rate_sat_vb` sütunu ve yeni indeksler).
- Hızlı bir ilk senkronizasyon için S3'teki 956,000 numaralı bloğa kadar olan önyükleme anlık görüntüsünü kullanın.

Bu sürüm, <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>'i 779,652 numaralı bloktan itibaren tanımlayan aynı disiplini sürdürüyor: yeni özellikler etkinleştirme yüksekliklerinin arkasında devreye girer ve herhangi bir şey yayımlanmadan önce konsensüs gerçek zincire karşı kanıtlanır.
