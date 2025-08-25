---
title: Protokol Genel Bakış
description: Bitcoin Stamps ekosistemindeki tüm protokollerin kapsamlı rehberi - SRC-20, SRC-101, SRC-721 ve OLGA
---

# Bitcoin Stamps Protokolleri

Bitcoin Stamps, Bitcoin blok zinciri üzerinde çeşitli dijital varlık türlerini destekleyen **modüler protokol sistemidir**. Her protokol, farklı kullanım durumları ve değer yaratım mekanizmaları için özelleşmiş tasarımlar sunar.

## Protokol Mimarisi

### Temel Katman: Bitcoin
- **Güvenlik**: Bitcoin'in güvenli altyapısı
- **Kalıcılık**: Blok zincirinde ebedi depolama
- **Merkezi Olmama**: Global, sansür dirençli ağ

### Metaprotokol Katmanı: Counterparty
- **İşlevsellik**: Gelişmiş varlık işlemleri
- **Programlanabilirlik**: Akıllı kontrat yetenekleri
- **Standartlaşma**: Protokol uyumluluğu

### Bitcoin Stamps Katmanı
- **Optimizasyon**: Maliyet ve verimlilik
- **Standarlaşma**: Tutarlı veri formatları
- **İnovasyon**: Topluluk odaklı geliştirme

## Temel Protokoller

## SRC-20: Fungible Tokenlar

<ProtocolCard 
  protocol="src-20"
  displayName="SRC-20 Tokenlar"
  description="Bitcoin üzerinde fungible (değiştirilebilir) tokenlar için KEVIN tarafından öncülük edilen protokol"
  :features='[
    "Fungible token desteği",
    "Topluluk tabanlı dağıtım",
    "DeFi entegrasyonu",
    "Mikro-işlem desteği"
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
- **Standart Fungible Tokenlar**: ERC-20'ye benzer işlevsellik
- **Bitcoin Güvenliği**: Değiştirilemez sahiplik kayıtları
- **Topluluk Dağıtımı**: Adil başlangıç mekanizmaları
- **Ekonomik Fayda**: Ticaret ve DeFi uygulamaları

[**SRC-20 Detaylı Rehber →**](/tr/protocols/src-20)

---

## SRC-101: İsim Sistemi

<ProtocolCard 
  protocol="src-101"
  displayName="SRC-101 İsimler"
  description="Bitcoin üzerinde insan dostu adlandırma ve dijital kimlik protokolu"
  :features='[
    "İnsan dostu adlandırma",
    "Namespace yönetimi",
    "Dijital kimlik",
    "Çakışma koruması"
  ]'
  culturalSignificance="medium"
  :relatedProtocols="[
    { id: 'bitcoin-stamps', name: 'Bitcoin Stamps', relationship: 'extends' }
  ]"
/>

### Temel Özellikler
- **DNS Benzeri Sistem**: Hiyerarşik adlandırma yapısı
- **Sahiplik Kontrolü**: Merkezi olmayan kimlik yönetimi
- **Çakışma Koruması**: Benzersiz ad garantisi
- **Gelecek Proof**: Uygulama genişletme potansiyeli

[**SRC-101 Detaylı Rehber →**](/tr/protocols/src-101)

---

## SRC-721: Benzersiz NFTler

<ProtocolCard 
  protocol="src-721"
  displayName="SRC-721 NFTler"
  description="Bitcoin üzerinde benzersiz, takip edilebilir dijital varlıklar ve sanat eserleri protokolu"
  :features='[
    "Benzersiz varlık desteği",
    "Metadata desteği",
    "Transfer mekanizmaları",
    "Telif hakkı koruması"
  ]'
  culturalSignificance="high"
  :relatedProtocols="[
    { id: 'bitcoin-stamps', name: 'Bitcoin Stamps', relationship: 'extends' }
  ]"
/>

### Temel Özellikler
- **Benzersiz Varlıklar**: Her token eşsiz ve değiştirilemez
- **Zengin Metadata**: Detaylı varlık açıklamaları
- **Sanat Odaklı**: Dijital sanatçılar için tasarlanmış
- **Kalıcı Depolama**: Değişmez varlık kaydı

[**SRC-721 Detaylı Rehber →**](/en/protocols/src-721) *(İngilizce)*

---

## OLGA: Sıkıştırma Protokolü

<ProtocolCard 
  protocol="olga"
  displayName="OLGA Sıkıştırma"
  description="Bitcoin Stamps için gelişmiş veri sıkıştırma ve maliyet optimizasyon protokolu"
  :features='[
    "Veri sıkıştırma",
    "Maliyet optimizasyonu",
    "Ağ verimliliği",
    "Backward uyumluluk"
  ]'
  culturalSignificance="medium"
  :relatedProtocols="[
    { id: 'src-20', name: 'SRC-20', relationship: 'optimizes' },
    { id: 'src-721', name: 'SRC-721', relationship: 'optimizes' }
  ]"
/>

### Temel Özellikler
- **Akıllı Sıkıştırma**: Otomatik veri optimizasyonu
- **Maliyet Azaltma**: İşlem ücretlerini minimize etme
- **Ağ Verimliliği**: Bandwidth kullanımını iyileştirme
- **Şeffaf İşlem**: Kullanıcı deneyimini etkilemez

[**OLGA Detaylı Rehber →**](/en/protocols/olga) *(İngilizce)*

---

## Protokol Karşılaştırması

| Özellik | SRC-20 | SRC-101 | SRC-721 | OLGA |
|---------|---------|---------|---------|------|
| **Varlık Türü** | Fungible | İsim/Kimlik | Non-Fungible | Optimizasyon |
| **Kullanım Durumu** | Tokenlar | Adlandırma | Sanat/Koleksiyon | Verimlilik |
| **Kültürel Önem** | Çok Yüksek | Orta | Yüksek | Orta |
| **Teknik Karmaşıklık** | Basit | Orta | Orta | Yüksek |
| **Pazar Olgunluğu** | Olgun | Gelişen | Aktif | Yeni |

## Geliştirme Yol Haritası

### Mevcut Durum
- **SRC-20**: Stabil ve yaygın kullanımda
- **SRC-721**: Aktif gelişim ve benimsenme
- **SRC-101**: İlk uygulamalar geliştiriliyor
- **OLGA**: Beta test aşamasında

### Gelecek Güncellemeler
- **Layer 2 Entegrasyonu**: Lightning Network desteği
- **Cross-Chain Bridges**: Multi-chain operabilite
- **DeFi Protokolleri**: Lending ve staking
- **DAO Governance**: Topluluk yönetimi

## Geliştirici Araçları

### SDKs ve Kütüphaneler
- **@btc-stamps/tx-builder**: TypeScript/JavaScript SDK
- **Python SDK**: Python geliştiricileri için
- **REST API**: HTTP tabanlı erişim
- **WebSocket**: Real-time veriler

### Test Araçları
- **Testnet Desteği**: Güvenli geliştirme ortamı
- **Simulator**: Yerel test senaryoları
- **Debugger**: İşlem analizi
- **Documentation**: Kapsamlı kılavuzlar

## Topluluk ve Governance

### Açık Kaynak
- **GitHub**: Tüm kod açık kaynaklı
- **Topluluk Katkıları**: PR'ler ve issues
- **Code Review**: Peer review süreci
- **Şeffaflık**: Public development roadmap

### Standard Geliştirme
- **RFC Süreci**: Protocol improvement proposals
- **Topluluk Oylama**: Feature prioritization  
- **Working Groups**: Specialized development teams
- **Cross-Protocol**: Inter-operability standards

## Başlangıç Rehberleri

### Geliştiriciler için
1. [**NFT Geliştirme**](/tr/tutorials/creating-first-stamp) - Mevcut Türkçe rehber
2. [**SDK Kurulumu**](/en/tutorials/sdk-integration) - (İngilizce)
3. [**İlk Token Yaratma**](/en/tutorials/src20-token-creation) - (İngilizce) 
4. [**API Entegrasyonu**](/en/tutorials/api-integration) - (İngilizce)

### Yaratıcılar için
1. [**Pazar Stratejisi**](/tr/guide/economics) - Mevcut Türkçe rehber
2. [**Sanatçı Araçları**](/en/tutorials/artist-tools) - (İngilizce)
3. [**Görsel İş Akışı**](/en/tutorials/visual-workflow) - (İngilizce)
4. [**Koleksiyon Planlama**](/en/narratives/community-values) - (İngilizce)

---

*Bitcoin Stamps protokolleri, dijital varlıklar için Bitcoin'in gücünü kullanmanın en gelişmiş yollarını sunar. Her protokol, benzersiz değer propozisyonları ve kullanım durumları ile ekosistemin çeşitliliğine katkıda bulunur.*