---
title: SRC-20 Token Protokolü
description: KEVIN tarafından öncülük edilen Bitcoin üzerindeki fungible token protokolü için kapsamlı teknik rehber
---

# SRC-20: Fungible Token Protokolü

SRC-20, Bitcoin blok zinciri üzerinde **fungible (değiştirilebilir) tokenlar** yaratmak için geliştirilmiş protokoldür. KEVIN token'ının öncülük ettiği bu protokol, Bitcoin Stamps ekosistemin ekonomik temelini oluşturur.

## Protokol Genel Bakışı

<ProtocolCard 
  protocol="src-20"
  displayName="SRC-20 Tokenlar"
  description="Bitcoin üzerinde fungible tokenlar için KEVIN tarafından öncülük edilen protokol"
  :features='[
    "Fungible token desteği",
    "KEVIN kültürel mirası",
    "Topluluk tabanlı dağıtım",
    "DeFi entegrasyonu"
  ]'
  :blockHeight="788041"
  culturalSignificance="high"
  :relatedProtocols="[
    { id: 'kevin', name: 'KEVIN Token', relationship: 'pioneered-by' },
    { id: 'counterparty', name: 'Counterparty', relationship: 'builds-on' }
  ]"
  featured="true"
  kevinLegacy="İlk SRC-20 token olan KEVIN, bu protokolün kültürel temelini oluşturmuş ve topluluk odaklı token ekonomisine öncülük etmiştir."
/>

### Temel Özellikler

- **Fungible Tokenlar**: Her token birimi değiştirilebilir ve eşdeğer
- **Bitcoin Güvenliği**: Bitcoin'in güvenlik modeli ile korunur
- **Kalıcı Depolama**: Blok zincirinde ebedi depolama garantisi
- **Standard Operasyonlar**: Deploy, mint, transfer işlemleri

### KEVIN Mirası

KEVIN token'ı, SRC-20 protokolünün **kültürel kurucu taşıdır**:
- **İlk başarılı uygulama** olarak protokolün gücünü kanıtladı
- **Topluluk odaklı dağıtım** modelini kurdu
- **Kültürel simge** haline geldi
- **Protokol standartlarını** belirledi

## Teknik Spesifikasyonlar

### Veri Yapısı

```json
{
  "p": "src-20",
  "op": "deploy|mint|transfer",
  "tick": "TOKEN",
  "amt": "1000",
  "lim": "21000000"
}
```

### Operasyon Türleri

#### Deploy (Dağıtım)
Yeni token kontratı oluşturma:

```json
{
  "p": "src-20",
  "op": "deploy",
  "tick": "TOKEN",
  "max": "21000000",
  "lim": "1000"
}
```

**Parametreler**:
- `tick`: Token simgesi (4-5 karakter)
- `max`: Maksimum toplam arz
- `lim`: Transfer başına limit (isteğe bağlı)

#### Mint (Basım)
Token üretimi:

```json
{
  "p": "src-20",
  "op": "mint",
  "tick": "TOKEN",
  "amt": "1000"
}
```

**Parametreler**:
- `tick`: Token simgesi
- `amt`: Basılacak miktar

#### Transfer (Transfer)
Token transferi:

```json
{
  "p": "src-20",
  "op": "transfer",
  "tick": "TOKEN",
  "amt": "100",
  "to": "address"
}
```

**Parametreler**:
- `tick`: Token simgesi
- `amt`: Transfer miktarı
- `to`: Hedef adres

## KEVIN Token: Case Study

### Tarihsel Önem

**KEVIN**, Bitcoin Stamps ekosisteminin **kültürel ve ekonomik kalbidir**:

- **Stamp #25,624**: İlk SRC-20 token
- **Blok 788,041**: Genesis anı
- **Toplam Arz**: 21,000,000 KEVIN
- **Dağıtım**: Fair launch, ön madencilik yok

### Kültürel Etki

**Topluluk İnşası**:
- Ekosistemin **sembolu** ve **maskotu**
- Sosyal medya **meme kültürü**
- **Topluluk koordinasyonu** aracı
- **Kültürel kimlik** yaratıcısı

**Ekonomik Rol**:
- **Rezerv varlık** statüsü
- **Likidite çifti** temel birimi
- **Governance token** potansiyeli
- **Değer ölçüm** standardı

### Başarı Metrikleri

- **Holder Sayısı**: 50,000+ aktif sahip
- **İşlem Hacmi**: Yüksek günlük aktivite
- **Kültürel Erişim**: Twitter, Discord, Reddit varlığı
- **Platform Entegrasyonu**: Çoklu platform desteği

## Token Geliştirme Rehberi

### 1. Token Tasarımı

**Temel Kararlar**:
```
• Token Simgesi: Benzersiz 4-5 karakter
• Toplam Arz: Ekonomik model uygun
• Dağıtım Stratejisi: Fair launch veya kontrollü
• Kullanım Durumu: Açık değer propozisyonu
```

**KEVIN Modeli İncelemesi**:
- **Basit simge**: KEVIN (5 karakter)
- **Bitcoin referansı**: 21M total supply
- **Fair distribution**: Herkese açık minting
- **Clear purpose**: Community building

### 2. Dağıtım İmplementasyonu

**Deploy İşlemi**:
```bash
# Token kontratını deploy etme
{
  "p": "src-20",
  "op": "deploy", 
  "tick": "MYTOKEN",
  "max": "21000000",
  "lim": "1000"
}
```

**Mint Stratejisi**:
```bash
# Topluluk mint'i
{
  "p": "src-20",
  "op": "mint",
  "tick": "MYTOKEN", 
  "amt": "1000"
}
```

### 3. Topluluk İnşası

**KEVIN Stratejisini Takip Etme**:

1. **Kültürel Hikaye**: Token'ın origin story'sini yaratın
2. **Visual Identity**: Memorable görsel kimlik
3. **Social Media**: Twitter, Discord, Reddit presence
4. **Community Events**: Regular topluluk etkinlikleri
5. **Developer Support**: Araç ve dokümantasyon

### 4. Teknik Entegrasyon

**SDK Kullanımı**:
```javascript
import { SRC20Builder } from '@btc-stamps/tx-builder'

const src20 = new SRC20Builder()

// Deploy new token
const deployTx = await src20.deploy({
  tick: 'MYTOKEN',
  max: '21000000',
  lim: '1000'
})

// Mint tokens
const mintTx = await src20.mint({
  tick: 'MYTOKEN',
  amt: '1000'
})

// Transfer tokens  
const transferTx = await src20.transfer({
  tick: 'MYTOKEN',
  amt: '100',
  to: 'recipient_address'
})
```

## Ekonomik Modeller

### Fair Launch Modeli (KEVIN Tipi)

**Özellikler**:
- Ön madencilik yok
- Herkese açık mint
- First-come-first-served
- Topluluk odaklı

**Avantajlar**:
- Maksimum adalet
- Güçlü topluluk
- Organik büyüme
- Düşük merkezi kontrolü

### Kontrollü Dağıtım Modeli

**Özellikler**:
- Geliştiriciler için reserve
- Vesting schedules
- Strategic partnerships
- Controlled release

**Kullanım Durumları**:
- Enterprise projekler
- Utility tokens
- Governance tokens
- Protocol tokens

## İleri Teknikler

### Batch İşlemleri

Çoklu işlemleri optimize etme:
```javascript
const batchMint = await src20.batchMint([
  { tick: 'TOKEN', amt: '1000' },
  { tick: 'TOKEN', amt: '1000' },
  { tick: 'TOKEN', amt: '1000' }
])
```

### Metadata Entegrasyonu

Token hakkında ek bilgiler:
```json
{
  "p": "src-20",
  "op": "deploy",
  "tick": "TOKEN",
  "max": "21000000",
  "lim": "1000",
  "meta": {
    "name": "My Token",
    "description": "Token description",
    "icon": "data:image/png;base64,..."
  }
}
```

### OLGA Optimizasyonu

Maliyet azaltma için OLGA protokolü kullanımı:
```javascript
const optimizedMint = await src20.mint({
  tick: 'TOKEN',
  amt: '1000'
}, { 
  olga: true,
  compression: 'high'
})
```

## Güvenlik Hususları

### Best Practices

1. **Double Spend Korunması**: İşlem onaylarını bekleyin
2. **Address Validation**: Hedef adresleri doğrulayın
3. **Amount Validation**: Miktar hesaplarını kontrol edin
4. **Network Fees**: Yeterli Bitcoin rezervi tutun

### Yaygın Hatalar

- **Insufficient funds**: Yetersiz Bitcoin balance
- **Invalid ticker**: Geçersiz token simgesi
- **Exceeded limits**: Limit aşımı
- **Double deployment**: Aynı ticker'ı tekrar deploy etme

## DeFi Entegrasyonu

### Liquidity Pools

KEVIN tabanlı likidite havuzları:
```
KEVIN/BTC Pair
TOKEN/KEVIN Pair  
KEVIN/USDC Pair
```

### Staking Protocols

Token staking için framework:
- Lock periods
- Reward calculations
- Auto-compounding
- Governance rights

## Gelecek Geliştirmeler

### Roadmap

1. **Phase 1**: Enhanced metadata support
2. **Phase 2**: Cross-chain bridges
3. **Phase 3**: DeFi protocol integration
4. **Phase 4**: DAO governance tools

### Community Proposals

- **Delegation system**: Token voting delegation
- **Burn mechanisms**: Deflasyon mekanizmaları
- **Yield farming**: Automated market making
- **Insurance pools**: Protocol güvenliği

## Başlangıç Checklist

### Token Yaratıcıları İçin

- [ ] Token konsepti ve hikayesi tanımlayın
- [ ] Ekonomik parametreleri hesaplayın
- [ ] Visual identity oluşturun  
- [ ] Deploy işlemini planlayın
- [ ] Topluluk kanalları kurun
- [ ] Launch stratejisi belirleyin

### Geliştiriciler İçin

- [ ] SDK'yı kurun ve yapılandırın
- [ ] Test environment hazırlayın
- [ ] Integration testlerini yazın
- [ ] Error handling implementasyonu
- [ ] Performance optimizasyonu
- [ ] Monitoring ve alerting

---

*SRC-20 protokolü, Bitcoin üzerinde token ekonomisi yaratmanın en kanıtlanmış yoludur. KEVIN'in başarı hikayesinden ilham alarak, kendi token projenizi güvenle başlatabilirsiniz.*