---
title: "OLGA: stamps más baratos y grandes mediante P2WSH"
date: "2024-03-03"
author: "reinamora"
description: "OLGA trasladó la codificación de stamps a P2WSH, activándose para los stamps clásicos en el bloque 833,000 y para SRC-20 en el bloque 865,000. Reduce el tamaño de las transacciones a aproximadamente la mitad y las comisiones en un 60-70%."
tags: ["history", "olga", "milestone", "p2wsh", "fees"]
leoType: "blog"
---

# OLGA: stamps más baratos y grandes mediante P2WSH

<EntityMention entity="olga">OLGA</EntityMention> es la mejora de codificación que hizo a <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> más barato y más grande al mismo tiempo. Trasladó los datos de los stamps a salidas P2WSH, y eliminó una parte de la sobrecarga que todos los stamps anteriores habían estado pagando.

## Dos alturas de activación

OLGA se desplegó en dos etapas, cada una fijada a un bloque. La codificación P2WSH para stamps clásicos se activó en el bloque 833,000 el 3 de marzo de 2024. El primer stamp <EntityMention entity="src-20">SRC-20</EntityMention> P2WSH OLGA llegó más tarde, en el bloque 865,000 el 10 de octubre de 2024. Ambas alturas son puntos de control de consenso, así que los indexadores saben exactamente cuándo se activa cada vía.

## Qué cambia P2WSH

La codificación más antigua se apoyaba en salidas de multisig simple (bare multisig) y envolvía los datos en Base64. Base64 hace que los datos binarios sean seguros de transportar, pero añade aproximadamente un tercio de bytes extra que no sirven para nada más que la propia codificación. En una cadena donde pagas por byte, esa sobrecarga es un coste real.

OLGA elimina la capa de Base64 y usa en su lugar salidas Pay-to-Witness-Script-Hash (P2WSH). El resultado:

- Las transacciones son alrededor de un 50% más pequeñas.
- Las comisiones caen entre un 60 y un 70% aproximadamente.
- Una sola transacción de stamp puede transportar hasta unos 64 kB de datos.

Más pequeño y más barato significa que más gente puede hacer stamps, y una mayor capacidad por transacción significa que cabe on-chain arte más rico.

## La misma permanencia, menor coste

Lo importante: nada de esto debilitó la garantía de permanencia. Los stamps OLGA siguen viviendo en el conjunto UTXO, siguen sin poder podarse, siguen heredando la propia durabilidad de Bitcoin. OLGA cambió cómo se empaquetan los datos, no dónde viven.

Ese es el patrón que <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> sigue repitiendo: lanzar mejoras detrás de alturas de activación, demostrarlas frente a la cadena y nunca sacrificar la permanencia por comodidad. OLGA hizo el protocolo accesible a mucha más gente sin renunciar a lo que hace que un stamp sea un stamp.

---

*Lee el modelo económico en el [Whitepaper de Bitcoin Stamps](/en/whitepaper/), y explora el ecosistema en [stampchain.io](https://stampchain.io).*
