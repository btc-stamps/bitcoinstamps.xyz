---
title: "El primer Bitcoin Stamp"
date: "2023-03-07"
author: "reinamora"
description: "El 7 de marzo de 2023, en el bloque 779,652, mikeinspace creó el Stamp 0 e inició el protocolo Bitcoin Stamps: arte permanente almacenado directamente en el conjunto UTXO de Bitcoin."
tags: ["history", "bitcoin-stamps", "milestone", "genesis"]
leoType: "blog"
---

# El primer Bitcoin Stamp

El 7 de marzo de 2023, en el bloque 779,652, <EntityMention entity="mikeinspace">mikeinspace</EntityMention> creó el Stamp 0. Es una pequeña obra de pixel art con ojos láser, y es el génesis del protocolo <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>.

El Stamp 0 no era solo una imagen en la cadena. Era la prueba de una idea distinta sobre dónde debería vivir el arte digital.

## Por qué importa el conjunto UTXO

La mayoría de los enfoques de arte on-chain almacenan los datos en lugares que un nodo completo puede descartar más tarde. Los witness data se pueden podar. Las referencias fuera de la cadena pueden pudrirse cuando el host desaparece. <EntityMention entity="mikeinspace">mikeinspace</EntityMention> quería algo más fuerte: arte que cada nodo completo tenga que conservar, para siempre, porque forma parte del estado gastable de Bitcoin.

Bitcoin Stamps colocó los datos de la imagen en el propio conjunto UTXO. Ese es el conjunto de salidas de transacción no gastadas que cada nodo rastrea para saber qué monedas existen. Los datos almacenados ahí no se pueden podar sin romper la visión que el nodo tiene de la cadena. Por eso un stamp es tan permanente como la propia contabilidad de Bitcoin.

El bloque 779,652 es donde comenzó esa garantía. El Stamp 0 ha sido transportado por cada nodo completo desde entonces, y lo seguirá siendo mientras Bitcoin funcione.

## Un movimiento a partir de un solo bloque

La decisión tomada en el bloque 779,652 marcó el tono de todo lo que vino después. La permanencia primero. Sin hosts en los que confiar, sin poda que temer, sin dependencia externa que pueda desaparecer en silencio.

Esa única decisión abrió la puerta a los tokens <EntityMention entity="src-20">SRC-20</EntityMention>, a los nombres <EntityMention entity="src-101">SRC-101</EntityMention> y a toda una comunidad de artistas y constructores que querían que su obra sobreviviera a cualquier plataforma. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>, el primer token SRC-20, llegó más tarde en 2023, pero se apoya sobre los cimientos que se establecieron aquí.

Si quieres entender por qué Bitcoin Stamps funciona como funciona, empieza en el bloque 779,652. Todo en el protocolo se remonta al momento en que <EntityMention entity="mikeinspace">mikeinspace</EntityMention> decidió que permanente significaba permanente.

---

*Lee la especificación técnica completa en el [Whitepaper de Bitcoin Stamps](/en/whitepaper/), y explora el ecosistema en [stampchain.io](https://stampchain.io).*
