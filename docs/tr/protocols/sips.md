---
title: "Stamps İyileştirme Önerileri (SIP'ler)"
description: "Koşullu transferler, köprüler, gizlilik özellikleri ve yerel AMM dahil Bitcoin Stamps protokol iyileştirmeleri için resmi kayıt ve uygulama yol haritası"
leoType: "protocol-overview"
audience: "both"
mentions: ["src-20", "kevin", "reinamora", "olga"]
culturalSignificance: "high"
protocols: ["src-20"]
---

# Stamps İyileştirme Önerileri (SIP'ler)

Stamps İyileştirme Önerisi süreci, Bitcoin Stamps ekosistemine protokol düzeyinde değişiklikler önermek, incelemek ve etkinleştirmek için yapılandırılmış bir çerçeve sunar. Her SIP, ekosistem genelinde tutarlı davranış için indeksleyiciler arasında uygulamayı koordine eder.

## SIP Nedir?

SIP (Stamps İyileştirme Önerisi), **protokol uzlaşısını** etkileyen değişiklikler için gereklidir - yani tüm indeksleyicilerin ekosistem genelinde tutarlı davranış için değişikliği aynı şekilde uygulaması gerekir.

SIP'ler şunlar için gereklidir:
- Yeni SRC-20 işlemleri (koşullu transferler, köprüler, para iadeleri)
- Mevcut işlemlerdeki yeni alanlar (hashlock, timelock)
- Yeni kodlama yöntemleri (ikili formatlar, P2WSH yapıları)
- Çapraz zincir köprü protokolleri

SIP'ler, uzlaşı davranışını değiştirmeyen yalnızca indeksleyici optimizasyonları, API özellikleri veya hata düzeltmeleri için GEREKLİ DEĞİLDİR.

**Süreç Belgesi**: [SIP-0000](https://github.com/stampchain-io/btc_stamps/issues/686), eksiksiz öneri yaşam döngüsünü ve inceleme sürecini tanımlar.

<SipRegistry />

## Dahil Olmak

SIP süreci tüm topluluk üyelerine açıktır:

1. **Tartış** — Aktif SIP'ler için GitHub sorunlarındaki konuşmalara katılın
2. **Öner** — [SIP-0000 formatını](https://github.com/stampchain-io/btc_stamps/issues/686) takip ederek yeni protokol önerileri oluşturun
3. **İncele** — Teknik özellikler hakkında teknik geri bildirim sağlayın
4. **Uygula** — Kabul edilen öneriler için indeksleyici desteği oluşturun

**GitHub Deposu**: [stampchain-io/btc_stamps](https://github.com/stampchain-io/btc_stamps)

---

*SIP süreci kasıtlı olarak hafiftir - yeniliği yavaşlatmadan indeksleyiciler arasında koordinasyon sağlamaya yetecek kadar yapı.*
