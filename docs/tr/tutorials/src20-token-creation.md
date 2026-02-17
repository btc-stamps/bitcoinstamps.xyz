---
title: "SRC-20 Token Oluşturma Rehberi"
description: "@btc-stamps/tx-builder SDK kullanarak SRC-20 token oluşturmak için eksiksiz teknik rehber"
leoType: "tutorial"
audience: "dual"
mentions: ["src-20", "tx-builder", "token-creation", "bitcoin-stamps"]
economicImpact: "tokenization-empowerment"
---

# SRC-20 Token Oluşturma Rehberi

Üç basit işlem kullanarak Bitcoin üzerinde SRC-20 fungible tokenlar oluşturun: DEPLOY, MINT ve TRANSFER.

## Web Arayüzü (Kod Gerektirmez)

1. [stampchain.io/create-token](https://stampchain.io/create-token) adresini ziyaret edin
2. Token detaylarını girin (ticker, arz, mint limiti)
3. Cüzdanı bağlayın ve Bitcoin ücretlerini ödeyin
4. Token otomatik olarak dağıtılır

**Örnek Token:**
- Ticker: `MYART` (maksimum 4 harf)
- Arz: `100.000`
- Mint Limiti: `100` (balina hakimiyetini önler)

## SDK Uygulaması

```bash
npm install @btc-stamps/tx-builder
```

```typescript
import { TxBuilder } from '@btc-stamps/tx-builder';

const txBuilder = new TxBuilder({ network: 'mainnet' });

// Token dağıt
const deployTx = await txBuilder.src20.deploy({
  ticker: 'MYART',
  max: '100000',
  limit: '100'
});

// Token mint et
const mintTx = await txBuilder.src20.mint({
  ticker: 'MYART',
  amount: '100'
});

// Token transfer et
const transferTx = await txBuilder.src20.transfer({
  ticker: 'MYART',
  amount: '50',
  destination: 'bc1q...'
});
```

### Protokol İşlemleri

SRC-20, Bitcoin'de saklanan JSON verisini kullanır:

```typescript
interface SRC20Operation {
  p: 'SRC-20';
  op: 'DEPLOY' | 'MINT' | 'TRANSFER';
  tick: string;        // 4 harfli ticker
  max?: string;        // Toplam arz (DEPLOY)
  lim?: string;        // Mint limiti (DEPLOY)
  amt?: string;        // Miktar (MINT/TRANSFER)
}
```

## Fair Launch İlkeleri

KEVIN'in başarılı modelini takip edin:

- **Ön Madencilik Yok**: Yaratıcı token alır ile herkes aynı şekilde
- **Makul Arz**: Çok yüksek değil (değer kaybı) veya çok düşük değil (erişimi sınırlar)
- **Adil Mint Limitleri**: Geniş katılıma izin ver, balina birikimini önle
- **Özgün Amaç**: Gerçek topluluk değeri oluştur

## Yaygın Token Desenleri

**Topluluk Tokenları** (KEVIN gibi):
- Arz: 21.000.000 (Bitcoin'den ilham alınmış)
- Mint Limiti: 1.000 (erişilebilir katılım)

**Sanat Tokenları**:
- Arz: 1.000-10.000 (sınırlı baskılar)
- Mint Limiti: 1-10 (özel erişim)

**Fayda Tokenları**:
- Arz: Amaçlanan kullanıma uygun
- Mint Limiti: Kullanıcı ihtiyaçlarına dayalı

## Ekonomi ve Maliyetler

**İşlem Maliyetleri:**
- Dağıtım: ~4-8$ (20-40k sat)
- Mint: ~2-4$ (10-20k sat)
- Transfer: ~1-3$ (5-15k sat)

*Maliyetler Bitcoin ağ yoğunluğuyla değişir*

## Lansman Stratejisi

1. Önce **testnet'te test edin**
2. Konsepti **toplulukla paylaşın**
3. Mainnet'te **token dağıtın**
4. **Topluluk mint'ini etkinleştirin**
5. **Gerçek fayda ve değer oluşturun**

## Kaynaklar

- **[SRC-20 Protokolü →](/tr/protocols/src-20)** - Teknik özellikler
- **[API Entegrasyonu →](/tr/tutorials/api-integration)** - Token veri erişimi
- **[Topluluk Değerleri →](/tr/narratives/community-values)** - Fair launch ilkeleri
- **[Token Oluştur →](https://stampchain.io/create-token)** - Web arayüzü

---

*KEVIN ve Bitcoin Stamps topluluğu tarafından belirlenen fair launch ilkelerine uygun olarak sorumlu bir şekilde token oluşturun.*
