---
title: "Bitname y SRC-101: un servicio de nombres para Bitcoin"
date: "2024-06-10"
author: "reinamora"
description: "El 10 de junio de 2024, Bitname y el equipo de Stampchain presentaron SRC-101, un servicio de nombres para Bitcoin anclado en UTXO para nombres .btc. Los nombres SRC-101 tuvieron su génesis on-chain en el bloque 870,652."
tags: ["history", "src-101", "bitname", "naming", "milestone"]
leoType: "blog"
---

# Bitname y SRC-101: un servicio de nombres para Bitcoin

El 10 de junio de 2024, Bitname, en colaboración con el equipo de Stampchain, presentó <EntityMention entity="src-101">SRC-101</EntityMention>: un servicio de nombres para Bitcoin construido sobre el estándar <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>. Trae al protocolo nombres .btc legibles por humanos, y los ancla donde vive cada stamp, en el conjunto UTXO.

## El problema de las direcciones en bruto

Las direcciones de Bitcoin son cadenas largas que nadie puede recordar ni leer en voz alta con seguridad. Los sistemas de nombres arreglan eso mapeando un nombre amigable a una dirección. La parte difícil es hacerlo sin un servidor de confianza que pueda mentir, censurar o desaparecer.

<EntityMention entity="src-101">SRC-101</EntityMention> lo resuelve a la manera de Bitcoin Stamps. Un nombre .btc se registra on-chain, anclado en UTXO, y validado por las mismas reglas que hacen permanente a un stamp. No hay un registro central en el que confiar. La cadena es el registro.

## Diseñado para todo tipo de dirección

SRC-101 fue diseñado para nombrar todos los tipos de dirección de Bitcoin, no solo un formato. Eso importa porque Bitcoin tiene varios tipos de dirección en uso activo, y un servicio de nombres que solo cubriera uno dejaría fuera a grandes partes del ecosistema. SRC-101 cubre toda la gama, así que un nombre puede apuntar a la dirección que la gente realmente usa.

## Génesis on-chain en el bloque 870,652

El estándar se anunció en junio de 2024, y los nombres SRC-101 tuvieron su génesis on-chain en el bloque 870,652 el 17 de noviembre de 2024. Esa es la altura en la que los datos de nombres empezaron a aterrizar en Bitcoin bajo el nuevo estándar, con la misma garantía de permanencia que el resto del protocolo.

## Un cuarto pilar

<EntityMention entity="src-101">SRC-101</EntityMention> se unió a los tokens <EntityMention entity="src-20">SRC-20</EntityMention> y al arte SRC-721 como parte central de la familia Bitcoin Stamps. Cada estándar responde a una necesidad distinta. SRC-101 responde a la identidad: un nombre permanente y de propiedad propia que vive en Bitcoin y apunta a donde tú digas, sin ningún host en medio.

---

*Lee la especificación de nombres en el [Whitepaper de Bitcoin Stamps](/en/whitepaper/), y explora el ecosistema en [stampchain.io](https://stampchain.io).*
