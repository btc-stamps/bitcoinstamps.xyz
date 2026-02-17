---
title: "OLGA Depolama Protokolü"
description: "Bitcoin Stamps işlemleri için %30-95 maliyet azaltma sağlayan P2WSH veri depolama optimizasyonu"
leoType: "protocol"
audience: "unified"
mentions: ["olga", "p2wsh", "storage-optimization", "cost-reduction", "efficiency"]
blockHeight: 865000
culturalSignificance: "medium"
protocolType: "optimization"
---

# OLGA Depolama Protokolü

**OLGA Depolama Protokolü**, pahalı 2/3 multisig yaklaşımını verimli tanık script depolama ile değiştirerek Bitcoin Stamps işlemleri için **%30-95 maliyet azaltma** sağlayan gelişmiş bir P2WSH veri depolama yöntemidir.

## Temel Özellikler

- **Büyük Maliyet Tasarrufu**: 2/3 multisig'e kıyasla işlem ücretlerinde %30-95 azalma
- **Evrensel Uyumluluk**: Tüm Bitcoin Stamps protokollerinde çalışır (SRC-20, SRC-101, SRC-721)
- **Değiştirilemez Depolama**: P2WSH kullanarak Bitcoin üzerinde kalıcı veri depolama
- **Madenci Önceliği**: Özellikle yüksek ücret oranlarında multisig'den daha iyi ücret verimliliği
- **Protokol Agnostik**: Tüm Bitcoin Stamps işlem türlerine fayda sağlar

## Tüm Kullanıcılar İçin OLGA Faydaları

**Otomatik Maliyet Azaltma:**
- **Depolama Verimliliği**: Stamp oluşturma maliyetlerini multisig'e kıyasla %50-80 azaltın
- **Token Oluşturma**: SRC-20 token dağıtımı için daha düşük ücretler
- **Koleksiyon Dağıtımı**: Daha ucuz SRC-721 koleksiyon kurulumu
- **İsim Kaydı**: SRC-101 isim mint için azaltılmış maliyetler

**OLGA Nasıl Çalışır:**
1. Herhangi bir Bitcoin Stamps arayüzü kullanarak **normal oluşturun**
2. İşlem oluşturma sırasında **OLGA otomatik aktive olur** (blok 865.000+)
3. Pahalı 2/3 multisig yönteminin yerine **P2WSH depolama** geçer
4. **Azaltılmış ücretler** otomatik olarak nihai maliyete yansıtılır
5. **Tam veri** Bitcoin tanık scriptlerinde kalıcı olarak saklanır

## Maliyet Azaltma Örnekleri

### Gerçek Dünya Tasarrufları (2/3 Multisig'e Kıyasla)

**Görüntü Stampları:**
- **2/3 Multisig**: 24KB görüntü = ~480.000 sat (zayıf madenci önceliği)
- **OLGA P2WSH**: Aynı veri = ~160.000 sat (daha iyi öncelik)
- **Tasarruf**: %67 azalma (320.000 sat tasarruf)

**SRC-20 Tokenları:**
- **2/3 Multisig**: Token dağıtımı = ~50.000 sat
- **OLGA P2WSH**: Aynı dağıtım = ~20.000 sat
- **Tasarruf**: %60 azalma (30.000 sat tasarruf)

**SRC-721 Koleksiyonları:**
- **2/3 Multisig**: Koleksiyon = ~200.000 sat (yüksek ücretlerde ceza)
- **OLGA P2WSH**: Aynı koleksiyon = ~80.000 sat (daha iyi öncelik)
- **Tasarruf**: %60 azalma (120.000 sat tasarruf)

## Kalıcılık Garantisi

Bitcoin Stamps, diğer Bitcoin tabanlı protokollerden mimari açıdan üstün bir veri kalıcılığı düzeyi elde eder. OLGA, bu kalıcılığı elde etmenin maliyetini optimize ederken temel garantilerini korur.

### OLGA Kalıcılığı Nasıl Korur

OLGA öncesi stamplar, veriyi doğrudan **harcanmamış işlem çıktısı (UTXO) setindeki** ham multisig çıktıları aracılığıyla gömer - her tam doğrulama Bitcoin düğümünün yeni işlemleri doğrulamak için tutması gereken veriler. OLGA, depolama mekanizmasını maliyet verimliliği için P2WSH tanık scriptlerine kaydırırken, P2WSH çıktı hash'leri UTXO setinde verinin varlığının değiştirilemez kanıtı olarak kalır.

### Ordinals ve Tanık Verisiyle Karşılaştırma

Ordinals yazıtları verilerini Bitcoin işlemlerinin **tanık** (SegWit) bölümünde saklar. Bitcoin'in protokolü açıkça düğümlerin doğrulamadan sonra tanık verisini kırpmasına izin verir. Bu, Ordinals veri kullanılabilirliğinin bu veriyi korumayı seçen arşiv düğümlerine bağlı olduğu anlamına gelir - yapısal olarak garanti edilmez.

Bitcoin Stamps hem orijinal ham multisig yöntemiyle hem de OLGA'nın P2WSH optimizasyonuyla, her tam düğümün UTXO setinde tuttuğu hash'leri olan harcanamaz çıktılar oluşturur.

## Başlarken

OLGA P2WSH depolama, tüm büyük Bitcoin Stamps araçlarında **otomatik olarak etkinleştirilmiştir** (blok 865.000+):

- **[Stampchain.io →](https://stampchain.io)** - OLGA varsayılan olarak etkin
- **[TX-Builder SDK →](https://github.com/stampchain-io/stamps_sdk)** - Dahili P2WSH depolama
- **[Sanatçı Araçları →](/tr/tutorials/artist-tools)** - Otomatik optimizasyon

---

*OLGA, Bitcoin üzerinde kalıcı ve değiştirilemez zincir üstü verinin doğasını korurken verimli P2WSH depolama aracılığıyla Bitcoin Stamps'ı daha erişilebilir hale getirir.*
