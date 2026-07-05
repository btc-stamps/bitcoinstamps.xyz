---
title: "Stamps İndeksleyicisi Açık Kaynak Oluyor"
date: "2024-06-24"
author: "reinamora"
description: "24 Haziran 2024'te, çekirdek geliştiriciler Classic Stamps, OLGA, SRC-20, SRC-721 ve SRC-101 desteğini kapsayan tam Bitcoin Stamps indeksleyicisini açık kaynak yaptı."
tags: ["history", "indexer", "open-source", "milestone"]
leoType: "blog"
---

# Stamps İndeksleyicisi Açık Kaynak Oluyor

24 Haziran 2024'te, çekirdek geliştiriciler tam <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> indeksleyicisini açık kaynak yaptı. Zinciri okuyan ve stamp durumunu yeniden oluşturan eksiksiz kod herkese açık hale geldi ve bu, kulağa gelebileceğinden daha büyük bir olay.

## Bir indeksleyici neden önemli

Bitcoin Stamps verileri UTXO kümesinde yaşar, ancak Bitcoin düğümleri bir stamp'in ne olduğunu bilmez. Onlar sanatı veya token bakiyelerini değil, işlem çıktılarını görür. Bir şeyin ham zinciri okuması, stamp işlemlerini bulması, bunların kodunu çözmesi ve neyin var olduğunun ve kimin sahip olduğunun defterini oluşturması gerekir. O şey, indeksleyicidir.

İndeksleyici kapalıysa, topluluk protokolün gerçek durumu hakkında tek bir tarafın sözüne güvenmek zorunda kalır. Onu açık kaynak yapmak, bu güven gerekliliğini ortadan kaldırır. Herkes aynı kodu çalıştırabilir, genesis'ten itibaren indeksleyebilir ve cevabı kendisi kontrol edebilir.

## Sürümün kapsadıkları

Açık kaynak indeksleyici, tam standart ailesini işler:

- **Classic Stamps**, orijinal çıplak çoklu imza (bare multisig) sanatı.
- **<EntityMention entity="olga">OLGA</EntityMention>**, boyutu ve ücretleri azaltan P2WSH kodlaması.
- **<EntityMention entity="src-20">SRC-20</EntityMention>** değiştirilebilir token'lar, yerel kodlama kuralları dahil.
- **SRC-721** birleştirilebilir NFT'ler.
- **<EntityMention entity="src-101">SRC-101</EntityMention>** merkeziyetsiz adlandırma.

Bu, tek bir kod tabanındaki her konsensüsle ilgili yoldur; böylece tek bir çalıştırma, protokolün tamamını zincire karşı doğrulayabilir.

## Herkes tarafından doğrulanabilir

Açık kaynak, iddiaları test edebileceğiniz şeylere dönüştürür. Bir sürüm konsensüsle doğrulandığını söylediğinde, buna inanmanız gerekmez. Kodu çekersiniz, 779,652 numaralı bloktan itibaren yeniden ayrıştırırsınız ve hash'leri karşılaştırırsınız. Bu disiplin, sonraki sürümlerin üzerine inşa ettiği şeydir; tam da projenin hâlâ kullandığı genesis'ten yeniden ayrıştırma kapısına kadar.

İndeksleyiciyi açık kaynak yapmak, <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>'i kalıcılık öncelikli bir protokolün olması gereken yere koydu: tamamen incelenebilir, bağımsız olarak çalıştırılabilir ve herhangi bir ekip yerine topluluğu tarafından sahiplenilen.

---

*İndeksleyici [GitHub'da stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps) adresinde bulunuyor. Ekosistemi [stampchain.io](https://stampchain.io) adresinde keşfedin.*
