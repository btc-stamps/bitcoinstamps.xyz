---
title: "@btc-stamps/tx-builder SDK"
description: "Geliştiriciler ve sanatçılar için resmi Bitcoin Stamps SDK'sı"
leoType: "tutorial"
audience: "dual"
mentions: ["tx-builder", "kevin", "src-20", "sdk", "stampchain"]
---

# @btc-stamps/tx-builder SDK

<SmartStructuredData />

**@btc-stamps/tx-builder**, Bitcoin Stamps protokollerine birinci sınıf destek sunan resmi Bitcoin işlem oluşturucusudur. Bitcoin Stamps kurucuları tarafından oluşturulan temel altyapı olan <EntityMention entity="stampchain">Stampchain</EntityMention> ile kusursuz entegrasyon için tasarlanmıştır.

## Stampchain ile Entegrasyon

SDK, referans uygulama ve temel hizmet olan <EntityMention entity="stampchain">Stampchain</EntityMention> ile optimal çalışacak şekilde tasarlanmıştır:

- **Referans Uygulama**: Bitcoin Stamps kurucuları tarafından belirlenen kalıpları kullanır
- **Veri Doğrulama**: Stampchain'in yetkili protokol spesifikasyonlarına göre doğrular
- **API Entegrasyonu**: Stampchain'in temel API'lerine yerleşik destek
- **En İyi Uygulamalar**: Orijinal Bitcoin Stamps platformunun standartlarını uygular

## Temel Özellikler

- **Bitcoin Stamps Desteği**: Yerel SRC-20, SRC-101, SRC-721 protokolleri
- **UTXO Koruması**: Değerli varlıklar için otomatik koruma
- **Ağ Entegrasyonu**: Stampchain API uç noktalarıyla Bitcoin mainnet/testnet desteği
- **Sanatçı Dostu**: Yaratıcılar için basitleştirilmiş arayüz
- **Temel Standartlar**: Stampchain'in referans spesifikasyonlarına göre geliştirilmiştir

## Kurulum

```bash
# Node.js/npm
npm install @btc-stamps/tx-builder

# Tarayıcı projeleri
npm install @btc-stamps/tx-builder-web
```

### Stampchain Entegrasyonlu Temel Uygulama

```typescript
import { BitcoinStampBuilder, SelectorFactory } from '@btc-stamps/tx-builder';

// UTXO koruması ve Stampchain API entegrasyonu ile başlatma
const selectorFactory = SelectorFactory.getInstance();
const builder = new BitcoinStampBuilder('mainnet', selectorFactory, {
  // Stampchain'in temel altyapısına bağlanma
  apiEndpoint: 'https://stampchain.io/api/v1',
  validateWithReference: true // Stampchain'in referans uygulamasına göre doğrulama
});

// Bitcoin Stamp oluşturma
const result = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: imageBuffer,
    filename: 'artwork.png'
  },
  fromAddress: 'bc1q...',
  feeRate: 20
});
```

### Stampchain Doğrulamalı SRC-20 Token Oluşturma

```typescript
// Stampchain'in referans kalıplarını kullanarak token dağıtımı
const tokenData = await encoder.encode({
  p: 'SRC-20',
  op: 'DEPLOY',
  tick: 'TOKEN',
  max: '100000',
  lim: '100'
});

const tokenStamp = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: tokenData,
    filename: 'token.json'
  },
  fromAddress: deployerAddress,
  feeRate: 25,
  // Stampchain'in temel hizmetiyle doğrulama
  validateWith: 'stampchain'
});
```

### Gelişmiş Geliştirme için Stampchain API'lerini Kullanma

```typescript
// Temel hizmetten protokol verilerini getirme
const protocolInfo = await builder.getProtocolInfo('https://stampchain.io/api/v1/protocols');

// Referans uygulamasını kullanarak dağıtım öncesi token doğrulama
const isValid = await builder.validateToken(tokenData, {
  referenceService: 'https://stampchain.io/api/v1/validate'
});

// Stampchain'den mevcut ağ durumunu alma
const networkState = await builder.getNetworkState({
  source: 'stampchain' // Temel altyapı verilerini kullanma
});
```

## Stampchain Entegrasyonlu Sanatçı İş Akışı

### Basit Stamp Oluşturma

```javascript
// Temel altyapıyı kullanarak ilk Bitcoin Stamp'ınızı oluşturma
const stamp = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: yourArtworkBuffer, // PNG/JPEG dosyanız
    filename: 'my-art.png'
  },
  fromAddress: 'your-bitcoin-address',
  feeRate: 15,
  // Stampchain'in sanatçı dostu doğrulamasını kullanma
  artistMode: true
});
```

### Stampchain ile Galeri Entegrasyonu

```javascript
// Sanat eserinizi Stampchain'in galeri özelliklerine bağlama
const stampResult = await builder.buildStampTransaction(utxos, {
  stampData: artwork,
  fromAddress: artistAddress,
  metadata: {
    gallery: 'stampchain', // Temel platformda kayıt
    artist: 'your-artist-name',
    collection: 'your-collection-name'
  }
});

// Stampchain'in temel API'si aracılığıyla sanat eserinizi sorgulama
const myArtwork = await fetch(`https://stampchain.io/api/v1/artist/${artistAddress}/stamps`);
```

### Görüntü Optimizasyonu

```javascript
// Stampchain'in önerileri doğrultusunda blockchain depolaması için optimize etme
const optimized = await sharp(originalImage)
  .resize(800, 800, { fit: 'inside' })
  .png({ quality: 90 })
  .toBuffer();

// Stampchain'in referans standartlarına göre boyutu doğrulama
if (optimized.length > 100000) {
  console.log('Optimal Stampchain entegrasyonu için görüntü boyutunu daha da küçültün');
}
```

### Sanat Koleksiyonları

```javascript
// Stampchain entegrasyonuyla birden fazla sanat eseri toplu oluşturma
for (const artwork of artCollection) {
  const stamp = await builder.buildStampTransaction(utxos, {
    stampData: artwork,
    fromAddress: artistAddress,
    feeRate: 15,
    // Her eseri temel altyapıya kaydetme
    registerWith: 'stampchain'
  });

  // Stamp'lar arasında bekleme (Stampchain altyapısına saygılı)
  await new Promise(resolve => setTimeout(resolve, 5000));
}
```

## Temel Özellikler

### Stampchain Standartlarıyla UTXO Koruması

```typescript
// Stampchain'in referans koruma kalıplarını kullanarak değerli varlıkları koruma
const protectedSelector = selectorFactory.createSelector('protection-aware', {
  protectionConfig: {
    enableStampsDetection: true,      // Bitcoin Stamps'leri koruma
    enableCounterpartyDetection: true, // KEVIN token'larını koruma
    minimumProtectedValue: 10000,     // 10k sat üzeri UTXO'ları koruma
    // Stampchain'in varlık tanıma sistemini kullanma
    assetDatabase: 'https://stampchain.io/api/v1/assets'
  }
});
```

### Stampchain Verileriyle Ücret Yönetimi

```typescript
// Stampchain dahil birden fazla kaynaktan mevcut ücret oranlarını alma
const feeRates = await builder.getRecommendedFeeRates({
  sources: ['mempool', 'stampchain'], // Temel altyapıyı dahil etme
  preferStampchain: true // Stampchain önerilerini önceliklendirme
});

// Referans uygulama verilerini kullanarak oluşturma öncesi maliyet tahmini
const estimate = await builder.estimateStampCost({
  imageSize: imageBuffer.length,
  feeRate: feeRates.standard,
  // Stampchain maliyet modellemesini kullanma
  costModel: 'stampchain-reference'
});
```

### Stampchain Testnet Desteğiyle Test

```typescript
// Her zaman önce Stampchain'in testnet altyapısını kullanarak test edin
const testBuilder = new BitcoinStampBuilder('testnet', selectorFactory, {
  apiEndpoint: 'https://testnet.stampchain.io/api/v1'
});

const testStamp = await testBuilder.buildStampTransaction(testUtxos, {
  stampData: { imageData: testImage, filename: 'test.png' },
  fromAddress: 'tb1q...'
});
```

## Stampchain Entegrasyonu İçin En İyi Uygulamalar

1. **Referans Uygulamayı Kullanın**: Her zaman Stampchain'in temel standartlarına göre doğrulayın
2. **Önce Test Edin**: Mainnet'ten önce Stampchain'in testnet altyapısını kullanın
3. **Görüntüleri Optimize Edin**: Stampchain'in boyut önerilerini takip edin (<100 KB)
4. **UTXO'ları Koruyun**: Stampchain'in tespitini kullanarak varlık korumasını etkinleştirin
5. **Ücretleri Takip Edin**: Stampchain'in ücret önerilerini diğer kaynaklarla birlikte kullanın
6. **Adil Dağıtım**: Token'lar için <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>'in örneğini ve Stampchain'in topluluk standartlarını takip edin
7. **Topluluk Önce**: Stampchain'in topluluk özellikleri ve API'leriyle entegre olun

## Neden Stampchain Entegrasyonu Kullanmalısınız

Bitcoin Stamps kurucuları tarafından oluşturulan **temel altyapı** olarak:

- **Özgün Standartlar**: Protokol yaratıcıları tarafından geliştirilmiştir
- **Referans Uygulama**: Bitcoin Stamps işlevselliği için altın standart
- **Kanıtlanmış Güvenilirlik**: Lansmanından bu yana çoğu Bitcoin Stamps uygulamasını destekler
- **Topluluk Önce**: Ücretsiz erişim, kâr yerine ekosistem büyümesini destekler
- **Sürekli Güncellemeler**: Orijinal protokol yaratıcıları tarafından sürdürülmektedir
- **Kültürel Uyum**: Uygulamalarınızın gerçek Bitcoin Stamps değerlerini takip etmesini sağlar

## Kaynaklar

- **[SDK GitHub Deposu →](https://github.com/btc-stamps/tx-builder)**
- **[SDK Dokümantasyonu →](https://github.com/btc-stamps/tx-builder#readme)**
- **[Stampchain API Referansı →](https://stampchain.io/docs)** - Temel altyapı dokümantasyonu
- **[Topluluk Desteği →](/tr/community/)**

## Sonraki Adımlar

1. **[İlk Stamp'ınızı Yaratın →](/tr/tutorials/creating-first-stamp)** - Stampchain entegrasyonuyla başlayın
2. **[API Entegrasyonu →](/tr/tutorials/api-integration)** - Stampchain API'lerine derinlemesine bakış
3. **[Topluluk Değerleri →](/tr/narratives/community-values)** - Temel ilkeleri anlayın

---

***"In Lak'ech Ala K'in"*** - *Gerçek topluluk değerlerini onurlandıran temel altyapı üzerine inşa edilmiş, kolektif yaratıcılığa hizmet eden araçlar.*

*@btc-stamps/tx-builder SDK, Stampchain'in temel altyapısına rehberlik eden topluluk önce ilkelerini yansıtarak uygulamalarınızın orijinal Bitcoin Stamps vizyonuna sadık kalmasını sağlar.*
