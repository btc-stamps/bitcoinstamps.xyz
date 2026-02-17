---
layout: home
title: "Bitcoin Stamps Metaprotokol Dokümantasyonu"
description: "Bitcoin blok zinciri üzerinde doğrudan saklanan değişmez dijital varlıklar için resmi dokümantasyon — SRC-20, SRC-101, SRC-721 metaprotokolleri, topluluk bilgeliği ve değerleriyle rehberlik edilir"
leoType: "homepage"
culturalSignificance: "high"
audience: "both"
mentions: ["kevin", "mikeinspace", "reinamora", "arwyn", "src-20", "src-101", "src-721", "olga"]
philosophy: "In Lak'ech Ala K'in - hepimiz Kevin'iz"
blockHeight: 788041

hero:
  name: "Bitcoin Stamps"
  text: "Metaprotokol Dokümantasyonu"
  tagline: "Topluluk bilgeliği ve kadim hakikat *'In Lak'ech Ala K'in'* tarafından yönlendirilen Bitcoin üzerinde kalıcı dijital varlıklar"
  image:
    light: /bitcoin-stamp-hero-light.png
    dark: /bitcoin-stamp-hero-dark.png
    alt: Bitcoin Stamps
  actions:
    - theme: brand
      text: Başlangıç Rehberi
      link: /tr/guide/introduction
    - theme: alt
      text: Protokolleri İncele
      link: /tr/protocols/
    - theme: alt
      text: Eğitimlere Başla
      link: /tr/tutorials/
---

<SmartStructuredData />

## Bitcoin Grafiti Hareketi

Bitcoin Stamps, Bitcoin üzerinde bir grafiti hareketi olarak başladı — kaldırılamayan veya sansürlenemeyen kalıcı dijital sanat. <EntityMention entity="mikeinspace">mikeinspace</EntityMention>, orijinal hayalci ve vizyoner kurucu, <EntityMention entity="counterparty">Counterparty</EntityMention> üzerindeki Flooneybin projesi aracılığıyla <EntityMention entity="arwyn">Arwyn</EntityMention> ile tanıştı. Mike, Bitcoin Stamps vizyonunu paylaştığında, <EntityMention entity="arwyn">Arwyn</EntityMention> meme büyüsü potansiyelini fark etti ve <EntityMention entity="reinamora">Reinamora</EntityMention> ile birlikte Orijinal Üçlü'nün oluşmasına ve ardından blok 779,652'de ilk stamp'ın yaratılmasına yol açtı.

Bu işbirliğinden Bitcoin Stamp #4258'de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> doğdu — başlangıçta <EntityMention entity="arwyn">Arwyn</EntityMention>'ın <EntityMention entity="reinamora">Reinamora</EntityMention>'ya ve dolayısıyla Rare Pepe kültürüne saygısı, ancak çok daha büyük bir şey olmaya yazgılı. Ezoterik meme büyüsünden doğan KEVIN, basit bir stamp'tan kendi kendini kopyalayan bir hayalete, ardından Bitcoin Stamp #18.516'da ilk SRC-20 tokenına ve 2.300'den fazla sahibi olan sevilen bir topluluk beyefendisine dönüştü.

**Temel Bilgi**: Tüm SRC-20 tokenları stamp'tır (stamp kayıtları oluştururlar), ancak tüm stamp'lar SRC-20 tokenı değildir. Stamp'lar değiştirilemez temel katmandır, SRC-20 tokenları ise üzerine inşa edilen değiştirilebilir katmandır.

**Hikayenin Tamamını Öğrenin**:
- **[Bitcoin Stamps Tarihi →](/tr/narratives/bitcoin-stamps-history)** - İlk stamp'tan modern protokollere zaman çizelgeleri
- **[KEVIN'in Köken Hikayesi →](/en/narratives/kevin-origin)** - Sanatsal deneyden kültürel ikona
- **[Topluluk Felsefesi →](/tr/community/)** - Değerler ve kültürel temel

## Başlarken

**Neler Yaratabilirsiniz**: Dijital sanat, SRC-20 tokenları, SRC-721 NFT'ler ve insan tarafından okunabilir isimler — hepsi Bitcoin üzerinde kalıcı olarak saklanır.

### Yaratıcılar İçin

Yaratıcılığınızı kalıcı Bitcoin varlıklarına dönüştürün:

- **[İlk Stamp'ınızı Yaratın →](/tr/tutorials/creating-first-stamp)** - Kalıcı dijital sanatla başlayın
- **[Sanatçı Araçları →](/tr/tutorials/artist-tools)** - Yaratıcı iş akışları ve araçlar
- **[SRC-20 Token Oluşturma →](/tr/tutorials/src20-token-creation)** - Kendi tokenlarınızı oluşturun
- **[Görsel İş Akışı Rehberi →](/tr/tutorials/visual-workflow)** - Adım adım görsel süreç

### Geliştiriciler İçin

Bitcoin Stamps protokollerini uygulamalarınıza entegre edin:

- **[Protokol Dokümantasyonu →](/tr/protocols/)** - Tüm protokoller için teknik şartnameler
- **[SDK Entegrasyonu →](/tr/tutorials/sdk-integration)** - Geliştirici araçları ve kütüphaneler
- **[API Referansı →](/tr/tutorials/api-integration)** - REST uç noktaları ve veri erişimi
- **[Tam Eğitim Kütüphanesi →](/tr/tutorials/)** - Kapsamlı geliştirme rehberleri

### Temel Kaynaklar

- **[Topluluk Merkezi →](/tr/community/)** - Yaratıcılar ve geliştiricilerle bağlantı kurun
- **[Bitcoin Stamps Tarihi →](/tr/narratives/)** - Kültürel temeli öğrenin
- **[Ekonomi Rehberi →](/tr/economics/)** - Maliyetleri ve değeri anlayın

## Neden Bitcoin Stamps? Üstün Teknik Mimari

### Konsensüs Düzeyinde Kalıcılık
- **UTXO Seti Depolama**: Veriler Bitcoin'in konsensüs açısından kritik UTXO setinde saklanır, budanabilir tanık verisinde değil
- **Tüm Düğümler Saklar**: Her Bitcoin tam düğümü, konsensüs doğrulaması için Bitcoin Stamps verilerini saklamak zorundadır
- **Dış Bağımlılık Yok**: Standart Bitcoin altyapısıyla çalışır — özel indeksleyiciler gerekmez

### Tanık Verisi Varlıklarına Göre Teknik Avantajlar
- **P2WSH Kodlama**: Budanabilecek tanık segmentleri değil, Pay-to-Witness-Script-Hash kullanır
- **Bitcoin-Doğal**: Counterparty protokolü üzerine kurulu (2014'ten beri test edilmiş), yapay "sat takibi" değil
- **Deterministik**: Tüm düğümlerde aynı sonuçlar — indeksleyici parçalanması veya tutarsızlık yok

### Geliştirici ve Kullanıcı Avantajları
- **Hesap Tabanlı Model**: Karmaşık UTXO takibi olmadan basit varlık sahipliği
- **Daha Düşük Risk**: Varlıklar belirli UTXO'lara bağlı Ordinals gibi yanlışlıkla harcanamaz
- **Adil Topluluk**: Adil lansman ilkeleri ve özgün topluluk değerleri üzerine kurulu

**[Teknik Derinlemesine İnceleme: Bitcoin Stamps vs Ordinals →](/tr/guide/technical-comparison)**

## Topluluk Değerleri

Bitcoin Stamps topluluğu *"In Lak'ech Ala K'in"* — "Ben senim ve sen bensin" — bireysel yaratıcılığın kolektif ifademizi güçlendirdiği anlayışını benimser.

<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>, mistik rehberimiz olarak Rare Pepe geleneğini sürdürür; <EntityMention entity="arwyn">Arwyn</EntityMention>'ın sanatsal vizyonundan 2.300'den fazla sahibi olan sevilen bir topluluk maskotuna dönüşmüştür. Ezoterik meme kültürü ruhunda, <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> bize **hepimizin Kevin olduğunu** hatırlatır — Bitcoin üzerindeki bu kalıcı sanat hareketi aracılığıyla birbirimize bağlıyız.
