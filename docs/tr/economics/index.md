---
title: "Bitcoin Stamps'ın Neden Daha Pahalı Olduğu: Kalıcı Depolama Ekonomisi"
description: "Bitcoin Stamps fiyatlandırmasını anlama: kalıcı UTXO depolama ile Ordinals tanık verisi depolama karşılaştırması"
leoType: "guide"
audience: "both"
mentions: ["economics", "utxo", "witness-data", "permanent-storage"]
---

# Bitcoin Stamps Ekonomisi

Bitcoin Stamps ile diğer Bitcoin protokolleri arasındaki maliyet farkını anlama.

## Depolama Yöntemi Karşılaştırması

### Bitcoin Stamps: Kalıcı UTXO Depolama

**Ödediğiniz şey:**
- Bitcoin'in UTXO setinde **kalıcı depolama**
- **Her Bitcoin düğümü** verilerinizi sonsuza kadar saklar
- **Gerçek kalıcılık** - Bitcoin'in temel blok zinciri durumunun bir parçası
- **Daha yüksek maliyet** ama maksimum güvenlik ve erişilebilirlik

### Ordinals: Tanık Verisi Depolama

**Ne elde edersiniz:**
- **Tanık verisi depolama** (Bitcoin'in temel durumunun parçası değil)
- Tanık verisinin %75 indirim alması nedeniyle **indirimli ücretler**
- **Sınırlı düğüm depolama** - Bitcoin düğümlerinin tahminen %20'sinden azı tanık verisini saklar
- **Daha düşük maliyet** ama azalmış kalıcılık garantisi

## Fiyat Farkı Neden?

**Basit açıklama:**
- **Bitcoin Stamps** = Veriyi her Bitcoin düğümünde kalıcı olarak sakla
- **Ordinals** = Veriyi tanık bölümünde sakla (tüm düğümlerde garanti edilmez)
- **Sonuç** = Bitcoin Stamps daha pahalıdır ama gerçek kalıcılık sunar

Dünyanın en güvenli ağında **garantili kalıcı depolama** için ödüyorsunuz.

### Teknik Depolama Farkları

**Bitcoin Stamps (UTXO Seti):**
```typescript
// Veriler gerçek Bitcoin çıktılarında saklanır
{
  value: 546,                    // Minimum UTXO değeri
  scriptPubKey: "P2WSH çıktısı",  // Stamp verisi içerir
  // UTXO setinde saklanır = kalıcı
}
```

**Ordinals (Tanık Verisi):**
```typescript
// Veriler tanık bölümünde saklanır
{
  witness: ["<inscription_data>"], // %75 ücret indirimi alır
  // Tüm düğümlerde garanti edilmez
}
```

## Düğüm Depolama Gerçeği

**Bitcoin Stamps:**
- **Bitcoin düğümlerinin %100'ünde** saklanır (UTXO doğrulaması için gerekli)
- Bitcoin'in temel blok zinciri durumunun parçası
- Uzlaşı bozulmadan kırpılamaz

**Ordinals:**
- Tahminen **Bitcoin düğümlerinin %20'sinden azında** saklanır
- Tanık verisi doğrulamadan sonra silinebilir
- Birçok düğüm tanık verisi olmadan kırpılmış modda çalışır

## Dosya Boyutu ve Maliyet İlişkisi

**İşlem Limitleri:**
- **Standart iletim**: İşlem başına 100KB (Bitcoin Core varsayılanı)
- **Standart dışı**: İşlem başına 1MB'a kadar (düğüme bağlı)
- **SRC-721 özyinelemeli**: Katman bileşimi aracılığıyla sınırsız

**Maliyet Örnekleri (20 sat/vB'de):**
- **Küçük stamp (10KB)**: 15-30k sat ($20k BTC'de $3-6)
- **Büyük stamp (50KB)**: 50-100k sat ($20k BTC'de $10-20)
- **Maks. tek işlem (100KB)**: 100-200k sat ($20k BTC'de $20-40)
- **SRC-20 token dağıtımı**: 20-40k sat ($20k BTC'de $4-8)

*Maliyetler Bitcoin ağı koşullarına göre değişir*

## Değer Önerisi

**Neden Bitcoin Stamps İçin Daha Fazla Ödeyin?**
- **Gerçek kalıcılık**: Tüm Bitcoin düğümlerinde garantili depolama
- **Maksimum güvenlik**: Bitcoin'in tam uzlaşısıyla korunur
- **Süregelen maliyet yok**: Kalıcı depolama için tek seferlik ödeme
- **Evrensel erişilebilirlik**: Herhangi bir Bitcoin düğümünden alınabilir

**Ordinals Ne Zaman Daha İyi Olabilir:**
- **Daha düşük maliyet toleransı**: Fiyat birincil endişe olduğunda
- **Geçici depolama**: Kalıcılık kritik olmadığında
- **Deneysel kullanım**: Test veya geçici uygulamalar için

## Başlarken

**İlk Bitcoin Stamp'ınızı Oluşturma:**
1. **[Stampchain.io'yu Ziyaret Edin →](https://stampchain.io)** - Kullanıcı dostu arayüz
2. **Resminizi yükleyin** - Araç maliyetleri tahmin edecektir
3. **Bitcoin ücretini ödeyin** - Bitcoin'de kalıcı depolama için
4. **Sonsuza kadar sahip olun** - Stamp'ınız kalıcı olarak Bitcoin üzerinde

---

*Bitcoin Stamps, UTXO depolama yoluyla maksimum kalıcılık sunarken Ordinals daha düşük maliyetli tanık verisi depolama sağlar. Kalıcılık ve bütçe gereksinimlerinize göre seçin.*
