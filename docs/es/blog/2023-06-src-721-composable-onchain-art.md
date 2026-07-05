---
title: "SRC-721: arte on-chain componible"
date: "2023-06-01"
author: "reinamora"
description: "El 1 de junio de 2023, en el bloque 792,370, la primera implementación de SRC-721 trajo NFTs por capas y componibles a Bitcoin Stamps, referenciando arte on-chain para reducir el coste de acuñación."
tags: ["history", "src-721", "milestone", "nft"]
leoType: "blog"
---

# SRC-721: arte on-chain componible

El 1 de junio de 2023, en el bloque 792,370, la primera implementación de <EntityMention entity="src-721">SRC-721</EntityMention> se puso en marcha en <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>. Trajo al protocolo activos no fungibles componibles y por capas, y resolvió un problema real de coste.

## El problema de coste que resolvió

Almacenar una imagen completa en el conjunto UTXO de Bitcoin es permanente, pero no es gratis. Una colección grande en la que cada NFT lleva su propia obra completa se encarece rápido. Eso está bien para una pieza única. Es doloroso para un conjunto de miles.

SRC-721 tomó otro camino. En lugar de volver a estampar los mismos activos una y otra vez, un token SRC-721 referencia arte que ya está on-chain y compone la pieza final a partir de esas capas. Un rasgo se coloca on-chain una sola vez, y luego muchos tokens apuntan a él. El coste de acuñación baja porque no estás pagando por almacenar los mismos píxeles una y otra vez.

## La componibilidad como idea de primera clase

La palabra clave es componible. Un token no es una imagen plana, es una receta: este fondo, ese cuerpo, estos ojos, ensamblados a partir de capas que viven permanentemente en el conjunto UTXO. La receta es pequeña y barata. Las capas son compartidas.

Ese diseño hizo prácticas las colecciones más grandes y ricas en Bitcoin Stamps sin renunciar a la garantía de permanencia que empezó en el bloque 779,652.

## A dónde llevó

SRC-721 no se detuvo en las referencias por capas. Más tarde evolucionó hacia SRC-721r, que añade recursión: tokens que se construyen sobre otros datos on-chain de formas más profundas y flexibles. El trabajo de recursión surgió directamente de la base componible establecida en el bloque 792,370.

SRC-721 se sitúa junto a los tokens fungibles <EntityMention entity="src-20">SRC-20</EntityMention> y los nombres <EntityMention entity="src-101">SRC-101</EntityMention> como parte de la familia más amplia de estándares de Bitcoin Stamps. Cada uno responde a una necesidad distinta, y todos heredan la misma regla: los datos son permanentes porque viven donde Bitcoin no los puede podar.

---

*Lee los estándares de tokens en el [Whitepaper de Bitcoin Stamps](/en/whitepaper/), y explora el ecosistema en [stampchain.io](https://stampchain.io).*
