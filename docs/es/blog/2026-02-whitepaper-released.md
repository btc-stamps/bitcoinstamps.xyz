---
title: "Publicado el whitepaper del protocolo Bitcoin Stamps"
date: "2026-02-25"
author: "reinamora"
description: "El whitepaper técnico oficial del protocolo Bitcoin Stamps ya está disponible, documentando la especificación completa de los activos digitales permanentes en Bitcoin mediante el almacenamiento en UTXO."
tags: ["whitepaper", "protocol", "src-20", "bitcoin-stamps", "announcement"]
leoType: "blog"
---

# Publicado el whitepaper del protocolo Bitcoin Stamps

Tras años construyendo, iterando y refinando el protocolo que ha hecho realidad los activos digitales permanentes en Bitcoin, nos enorgullece anunciar la publicación oficial del whitepaper técnico del protocolo <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>.

Este documento representa la culminación de un trabajo iniciado en el bloque 779,652, cuando <EntityMention entity="mikeinspace">mikeinspace</EntityMention> inscribió el primerísimo Bitcoin Stamp, un momento que inició un movimiento que ninguno de nosotros pudo predecir del todo.

## Qué cubre el whitepaper

El whitepaper es una especificación técnica completa del metaprotocolo <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>, que abarca cada capa de la pila del protocolo:

**Arquitectura del protocolo.** Cómo Bitcoin Stamps aprovecha el conjunto UTXO para el almacenamiento permanente de datos críticos para el consenso. A diferencia de los enfoques basados en witness data que los nodos completos pueden podar, los datos de un stamp viven en salidas de transacción gastables. Cada nodo completo debe almacenarlos. Esa garantía de permanencia es fundamental.

**Estándares de tokens.** La especificación completa de los tokens fungibles <EntityMention entity="src-20">SRC-20</EntityMention> (operaciones DEPLOY, MINT, TRANSFER), los activos no fungibles SRC-721, el naming descentralizado SRC-101 y la recursión componible SRC-721r. El modelo de saldo basado en cuentas que sustenta a <EntityMention entity="src-20">SRC-20</EntityMention> se documenta en detalle, dejando claro por qué difiere de los esquemas de tokens ligados a UTXO.

**Modelo económico.** Las estructuras de comisiones y el ahorro de costes real que aporta la optimización OLGA P2WSH (reducción del 30-95% frente a bare multisig), activada en el bloque 865,000.

**Análisis de seguridad.** El modelo de amenazas, los vectores de ataque y las garantías de permanencia que hacen que <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> sea duradero a lo largo de toda la vida de Bitcoin.

**Propuestas de mejora de Stamps.** El marco de gobernanza SIP y las propuestas activas actuales (de SIP-0001 hasta SIP-0008) que dan forma al futuro del protocolo.

## Un protocolo construido por la comunidad

El whitepaper no es obra de un único autor. Documenta un protocolo que surgió de una colaboración genuina:

<EntityMention entity="mikeinspace">mikeinspace</EntityMention> aportó la visión original: la idea de que los activos digitales podían almacenarse de forma permanente en el conjunto UTXO de Bitcoin, inmunes a la poda, garantizados por el consenso.

Arwyn dio a esa visión su primera expresión cultural, creando el Bitcoin Stamp #4258 en el bloque 783,718, y canalizando más tarde esa energía creativa en el primer token <EntityMention entity="src-20">SRC-20</EntityMention>, <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>, en el bloque 788,041.

Reinamora diseñó los protocolos técnicos que convirtieron la visión en infraestructura funcional: el indexador, los esquemas de codificación, las reglas de consenso y, finalmente, la optimización OLGA que hizo el protocolo económicamente accesible para todos.

El propio <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> sigue siendo la prueba viviente de que el protocolo funciona como se pretendía: el primer token <EntityMention entity="src-20">SRC-20</EntityMention> de lanzamiento justo, con más de 2,300 holders que se sumaron no por el bombo, sino por reconocer lo que el protocolo representa.

## Lee el whitepaper

El whitepaper está disponible en varios formatos:

- **[Descargar PDF](/bitcoin-stamps-whitepaper.pdf)**: para archivo y lectura sin conexión.
- **[Ver HTML](/bitcoin-stamps-whitepaper.html)**: legible en el navegador con el formato completo.
- **[Fuente en Markdown](/bitcoin-stamps-whitepaper-combined.md)**: para desarrolladores y colaboradores.

Las secciones individuales también están disponibles en [GitHub](https://github.com/stampchain-io/btc_stamps/tree/main/docs/whitepaper) para quienes quieran leer por separado la arquitectura, los estándares de tokens o el análisis de seguridad.

## Cronología del protocolo

El whitepaper documenta la evolución completa del protocolo:

| Bloque | Hito |
|------:|-----------|
| 779,652 | Primer Bitcoin Stamp |
| 788,041 | Primer token SRC-20 (<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>) |
| 793,068 | Primera codificación nativa de Bitcoin |
| 796,000 | Corte de Counterparty (regla de consenso SRC-20) |
| 865,000 | Activación de OLGA (optimización P2WSH) |

## Qué viene después

Un whitepaper es documentación, no un destino. El protocolo sigue evolucionando a través del proceso SIP. Las propuestas activas están abordando la optimización de comisiones, nuevas capacidades de tokens y casos de uso ampliados para los datos permanentes on-chain.

Si estás construyendo sobre <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>, el whitepaper es tu referencia canónica. Si eres nuevo en el protocolo, es el mejor documento único para entender por qué este enfoque de los activos digitales permanentes en Bitcoin es diferente, y por qué esa diferencia importa.

---

*El whitepaper ya está disponible en [bitcoinstamps.xyz/en/whitepaper/](/en/whitepaper/).*

*Únete a la comunidad en [Telegram](https://t.me/BitcoinStamps) y explora el ecosistema en [stampchain.io](https://stampchain.io).*

*In Lak'ech Ala K'in, todos somos <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>.*
