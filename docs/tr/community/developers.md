---
title: "Geliştiriciler"
description: "Bitcoin Stamps için kapsamlı geliştirici kaynakları - SDK'lar, API'ler, protokoller ve entegrasyon rehberleri"
leoType: "developer-hub"
audience: "developers"
mentions: ["sdk", "api", "protocols", "integration", "stampchain"]
culturalSignificance: "medium"
category: "development"
tags: ["sdk", "api", "protocols", "integration", "getting-started"]
---

# Geliştiriciler

Bitcoin Stamps protokollerini kullanarak uygulama geliştirmek ve ekosisteme entegre olmak için kapsamlı geliştirici kaynakları.

## Geliştiriciler İçin Hızlı Başlangıç

### Temel Kaynaklar

**[Protokol Dokümantasyonu →](/tr/protocols/)**
- Tüm Bitcoin Stamps protokolleri için teknik özellikler
- SRC-20, SRC-101, SRC-721 ve OLGA uygulamaları
- Entegrasyon gereksinimleri ve en iyi uygulamalar

**[SDK Entegrasyonu →](/tr/tutorials/sdk-integration)**
- Resmi SDK kurulumu ve yapılandırması
- Kod örnekleri ve uygulama rehberleri
- Test ve dağıtım iş akışları

**[API Entegrasyonu →](/tr/tutorials/api-integration)**
- REST API dokümantasyonu ve uç noktalar
- Kimlik doğrulama ve hız sınırlama
- Veri formatları ve yanıt şemaları

### Geliştirme Araçları

**SDK'lar ve Kütüphaneler:**
- **[@btc-stamps/tx-builder →](https://github.com/stampchain-io/stamps_sdk)** - Resmi JavaScript/TypeScript SDK
- **Python SDK** - Python entegrasyon kütüphanesi
- **API İstemcileri** - Kullanıma hazır API sarmalayıcıları

**Geliştirici Platformları:**
- **[Stampchain.io →](https://stampchain.io)** - Birincil API ve veri kaynağı
- **[GitHub →](https://github.com/btc-stamps)** - Açık kaynak depoları
- **Test Araçları** - Yerel geliştirme ve test yardımcı programları

## Protokol Uygulaması

### Temel Protokoller

**[SRC-20 Tokenları →](/tr/protocols/src-20)**
- Bitcoin Stamps için fungible token standardı
- Uygulama rehberi ve örnekler
- Fair launch ilkeleri ve en iyi uygulamalar

**[SRC-101 İsimleri →](/tr/protocols/src-101)**
- İnsan tarafından okunabilir adlandırma sistemi
- Kayıt ve çözümleme mekanikleri
- Mevcut uygulamalarla entegrasyon

**[SRC-721 Özyineleme →](/tr/protocols/src-721)**
- Gelişmiş NFT işlevselliği
- Zincir üzeri özellikler ve yetenekler
- Karmaşık varlık bileşimi desenleri

**[OLGA P2WSH Kodlaması →](/tr/protocols/olga)**
- Bitcoin Stamps için optimize edilmiş veri depolama
- P2WSH işlem desenleri
- Maliyet optimizasyon teknikleri

### Entegrasyon Desenleri

**Cüzdan Entegrasyonu:**
- Bitcoin Stamps cüzdan desteği
- Bakiye takibi ve işlem geçmişi
- Çok protokollü varlık yönetimi

**Uygulama Geliştirme:**
- Stamps destekli uygulamalar oluşturma
- Kullanıcı deneyimi en iyi uygulamaları
- Performans optimizasyon stratejileri

## Başlarken

### 1. Ortam Kurulumu

```bash
# Resmi SDK'yı yükleyin
npm install @btc-stamps/tx-builder

# Veya yarn kullanarak
yarn add @btc-stamps/tx-builder
```

### 2. Temel Entegrasyon

```javascript
import { StampBuilder } from '@btc-stamps/tx-builder';

// Ağ yapılandırmasıyla başlatın
const builder = new StampBuilder({
  network: 'mainnet',
  apiKey: 'your-api-key'
});

// İlk stamp'ınızı oluşturun
const stamp = await builder.createStamp({
  image: imageBuffer,
  description: 'İlk Bitcoin Stamp'ım'
});
```

### 3. Gelişmiş Kullanım

**SRC-20 Token Oluşturma:**
```javascript
// Yeni bir SRC-20 token dağıtın
const token = await builder.deploySRC20({
  tick: 'MYTOKEN',
  max: '21000000',
  lim: '1000'
});
```

**API Veri Erişimi:**
```javascript
// Stamp verisini getir
const stampData = await api.getStamp(stampId);

// Token bakiyelerini getir
const balances = await api.getBalances(address);
```

## Geliştirici Kaynakları

### Dokümantasyon

**Teknik Rehberler:**
- [İlk Stamp'ınızı Oluşturma →](/tr/tutorials/creating-first-stamp) - Adım adım geliştirme rehberi
- [SDK Entegrasyonu →](/tr/tutorials/sdk-integration) - SDK kurulumu ve kullanımı
- [API Entegrasyonu →](/tr/tutorials/api-integration) - API ile veri erişimi

**Topluluk ve Destek:**
- **Discord** - Gerçek zamanlı yardım için #developers kanalı
- **GitHub Tartışmaları** - Teknik sorular ve özellik istekleri
- **Stack Overflow** - `bitcoin-stamps` etiketli sorular

### Katkıda Bulunma

- **[Katkı Rehberi →](/tr/community/contributing)** - Bitcoin Stamps'a nasıl katkıda bulunulur
- **Hata Raporları** - Sorun takibi ve çözümü
- **Özellik Önerileri** - Topluluk odaklı geliştirme

## En İyi Uygulamalar

### Geliştirme Yönergeleri

**Kod Kalitesi:**
- Tür güvenliği için TypeScript kullanın
- Kapsamlı hata işleme uygulayın
- Bitcoin Stamps kodlama standartlarına uyun
- Tüm işlevler için kapsamlı testler yazın

**Güvenlik:**
- Özel anahtarları istemci kodunda asla göstermeyin
- Tüm kullanıcı girişlerini kapsamlı biçimde doğrulayın
- Tüm API iletişimleri için HTTPS kullanın
- API çağrıları için hız sınırlaması uygulayın

---

**Geliştirmeye başlamaya hazır mısınız?** Yolunuzu seçin:

- **Bitcoin Stamps'ta yeni misiniz?** → [Protokol Genel Bakışı](/tr/protocols/)
- **Entegre etmeye hazır mısınız?** → [SDK Entegrasyon Rehberi](/tr/tutorials/sdk-integration)
- **API erişimine mi ihtiyacınız var?** → [API Entegrasyon Rehberi](/tr/tutorials/api-integration)
