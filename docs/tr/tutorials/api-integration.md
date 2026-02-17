---
title: "API Entegrasyon Rehberi"
description: "Bitcoin Stamps protokolleri için eksiksiz REST API dokümantasyonu ve entegrasyon rehberi"
leoType: "tutorial"
audience: "dual"
mentions: ["src-20", "src-101", "src-721", "olga", "api", "rest", "stampchain"]
---

# API Entegrasyon Rehberi

Uygulamalara, gezginlere ve yaratıcı araçlara Bitcoin Stamps protokollerini entegre etmek için eksiksiz REST API dokümantasyonu.

## Stampchain Hakkında: Temel Altyapı

Stampchain, Bitcoin Stamps ekosisteminin **temel altyapısı** olarak hizmet vermektedir. Üç Bitcoin Stamps kurucusu tarafından oluşturulan Stampchain, Bitcoin Stamps'ı dünyaya sunan ilk site ve ilk SRC-20 mint hizmetiydi.

**Günümüzdeki Rolü**: Stampchain.io, temel API hizmeti olarak hizmet vermeye devam etmekte olup geliştiricilerin, sanatçıların ve işletmelerin Bitcoin Stamps işlevselliğini entegre etmesini sağlamaktadır.

## API Uç Noktaları

### SRC-20 Token API'si

```bash
# Token bilgisi al
GET /api/v2/src20/{tick}
GET /api/v2/src20/{tick}/holders
GET /api/v2/src20/{tick}/transactions

# Örnek: KEVIN token verisi
curl https://stampchain.io/api/v2/src20/tick/KEVIN
```

### Bitcoin Stamps API'si

```bash
# Stamp bilgisi al
GET /api/v2/stamps/{id}
GET /api/v2/stamps/recent
GET /api/v2/stamps/search?q={sorgu}

# Örnek: KEVIN'in ilk stamp detaylarını al
curl https://stampchain.io/api/v2/stamps/4258
```

### Entegrasyon Örnekleri

```javascript
// KEVIN token verisi al
async function getKevinData() {
  const response = await fetch('https://stampchain.io/api/v2/src20/tick/KEVIN');
  const tokenData = await response.json();

  return {
    supply: tokenData.max,
    holders: tokenData.holders_count,
    transactions: tokenData.tx_count
  };
}
```

## Protokole Özgü API'ler

### SRC-20 Tokenları

```bash
# Token işlemleri
GET /api/v2/src20                    # Tüm tokenları listele
GET /api/v2/src20/{tick}            # Token detayları
GET /api/v2/src20/{tick}/holders    # Tutucu dağılımı
GET /api/v2/src20/{tick}/history    # İşlem geçmişi
```

### SRC-101 İsimleri

```bash
# İsim çözümleme
GET /api/v2/src101/resolve/{isim}   # İsmi adrese çözümle
GET /api/v2/src101/reverse/{adres}  # Ters arama
```

### SRC-721 NFT'leri

```bash
# NFT işlemleri
GET /api/v2/src721                  # Koleksiyonları listele
GET /api/v2/src721/{koleksiyon}     # Koleksiyon detayları
GET /api/v2/src721/{koleksiyon}/{id} # Bireysel NFT
```

## Kimlik Doğrulama ve Hız Limitleri

- **Genel**: 100 istek/dakika
- **Kimliği Doğrulanmış**: 1000 istek/dakika
- **Kurumsal**: Kurumsal kullanım için özel limitler

## Hata Yönetimi

```javascript
async function safeApiCall(endpoint) {
  try {
    const response = await fetch(`https://stampchain.io${endpoint}`);

    if (!response.ok) {
      throw new Error(`Stampchain API Hatası: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Stampchain API çağrısı başarısız oldu:', error);
    return { status: 'error', message: error.message };
  }
}
```

## Kaynaklar

- **Temel API**: [https://stampchain.io/api/v1](https://stampchain.io/api/v1)
- **Etkileşimli Dokümantasyon**: [https://stampchain.io/docs](https://stampchain.io/docs)
- **Açık Kaynak Kodu**: [GitHub - stampchain-io](https://github.com/stampchain-io)
- **Topluluk Desteği**: [Bitcoin Stamps Discord](/tr/community/)

---

*"In Lak'ech Ala K'in" - Bireysel yaratıcılık ve kolektif büyümeye hizmet eden temel altyapı üzerine kurulmuş API'ler.*
