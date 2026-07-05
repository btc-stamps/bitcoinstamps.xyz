---
title: "El indexador de Stamps se vuelve de código abierto"
date: "2024-06-24"
author: "reinamora"
description: "El 24 de junio de 2024, los desarrolladores principales publicaron como código abierto el indexador completo de Bitcoin Stamps, cubriendo el soporte de Classic Stamps, OLGA, SRC-20, SRC-721 y SRC-101."
tags: ["history", "indexer", "open-source", "milestone"]
leoType: "blog"
---

# El indexador de Stamps se vuelve de código abierto

El 24 de junio de 2024, los desarrolladores principales publicaron como código abierto el indexador completo de <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention>. El código completo que lee la cadena y reconstruye el estado de los stamps se hizo público, y eso es más importante de lo que podría parecer.

## Por qué importa un indexador

Los datos de Bitcoin Stamps viven en el conjunto UTXO, pero los nodos de Bitcoin no saben qué es un stamp. Ven salidas de transacción, no arte ni saldos de tokens. Algo tiene que leer la cadena en bruto, encontrar las transacciones de stamps, decodificarlas y construir el libro mayor de lo que existe y quién lo posee. Ese algo es el indexador.

Si el indexador es cerrado, la comunidad tiene que confiar en la palabra de una sola parte sobre el verdadero estado del protocolo. Publicarlo como código abierto elimina ese requisito de confianza. Cualquiera puede ejecutar el mismo código, indexar desde el génesis y comprobar la respuesta por sí mismo.

## Qué cubre el lanzamiento

El indexador de código abierto maneja toda la familia de estándares:

- **Classic Stamps**, el arte original en multisig simple (bare multisig).
- **<EntityMention entity="olga">OLGA</EntityMention>**, la codificación P2WSH que redujo el tamaño y las comisiones.
- Tokens fungibles **<EntityMention entity="src-20">SRC-20</EntityMention>**, incluidas las reglas de codificación nativa.
- NFTs componibles **SRC-721**.
- Nombres descentralizados **<EntityMention entity="src-101">SRC-101</EntityMention>**.

Esa es toda vía relevante para el consenso en un solo código base, así que una sola ejecución puede validar todo el protocolo frente a la cadena.

## Verificable por cualquiera

El código abierto convierte las afirmaciones en cosas que puedes probar. Cuando un lanzamiento dice que está validado por consenso, no tienes que creerlo por fe. Descargas el código, reparseas desde el bloque 779,652 y comparas los hashes. Esa disciplina es sobre la que se construyen los lanzamientos posteriores, hasta llegar a la prueba de reparseo desde el génesis que el proyecto todavía usa.

Publicar el indexador como código abierto puso a <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> donde debe estar un protocolo que prioriza la permanencia: totalmente inspeccionable, ejecutable de forma independiente y propiedad de su comunidad en lugar de un solo equipo.

---

*El indexador vive en [stampchain-io/btc_stamps en GitHub](https://github.com/stampchain-io/btc_stamps). Explora el ecosistema en [stampchain.io](https://stampchain.io).*
