---
title: "Lanzamiento del indexador Bitcoin Stamps v1.9.1"
date: "2026-07-04"
author: "reinamora"
description: "La versión v1.9.1 del indexador activa la codificación SRC-101 P2WSH/OLGA en el bloque 940,000, añade una capa de datos de mercado y webhooks, y supera una revalidación de consenso completa desde el génesis hasta la punta, demostrada idéntica en hash al ledger de producción."
tags: ["indexer", "release", "src-101", "olga", "consensus", "announcement"]
leoType: "blog"
---

# Lanzamiento del indexador Bitcoin Stamps v1.9.1

El indexador de Bitcoin Stamps **v1.9.1** ya está disponible. Es la línea de funcionalidades 1.9: un conjunto de activaciones de protocolo y refuerzos validados por consenso, que incluye la codificación <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH/OLGA, una nueva capa de datos de mercado y webhooks, una ruta de parseo acelerada en Rust y una revalidación de consenso completa desde el génesis hasta la punta.

Cada cambio que afecta al consenso está condicionado por activación o por un flag (desactivado por defecto), y la versión se demostró **idéntica en hash al ledger de producción** mediante un reparseo desde el génesis. Las notas de la versión completas y la imagen Docker están en GitHub: [stampchain-io/btc_stamps release 1.9.1](https://github.com/stampchain-io/btc_stamps/releases/tag/1.9.1).

## Novedades destacadas

- **Codificación <EntityMention entity="src-101">SRC-101</EntityMention> P2WSH / <EntityMention entity="olga">OLGA</EntityMention>** se activa en el **bloque 940,000**. Antes de la activación, SRC-101 solo se admite mediante multisig simple (bare multisig); tras la activación funcionan tanto el multisig simple como P2WSH, diferenciados a nivel de JSON (`"p":"src-101"`).
- **Detección de despliegues SRC-721R** para transacciones P2WSH, parseo recursivo de descripciones SRC-721 y un procesamiento dual más seguro para los sellos malditos (cursed stamps).
- **Datos de mercado e historial de ventas**: una caché multifuente (KuCoin, StampScan) con promediado ponderado por confianza, cachés de holders y una tubería de historial de ventas que abarca dispensadores, intercambios atómicos, OTC y subastas.
- **Webhooks en tiempo real** para nuevos bloques y reorganizaciones (reorgs), con protección contra SSRF, y no bloqueantes por diseño, de modo que las notificaciones nunca afectan a la indexación.
- **Rendimiento**: una ruta de parseo acelerada en Rust en el bucle principal de bloques, más una optimización de omisión de CP que evita llamadas a la API de Counterparty en bloques sin datos de Counterparty (validada idéntica en hash).
- **Un nuevo snapshot de arranque (bootstrap) hasta el bloque 956,000** se publica para una sincronización rápida.

## Validación de consenso

La versión se gana su etiqueta de "validada por consenso". Un reparseo desde el génesis hasta la punta en Python 3.12 coincidió con el ledger de producción hash por hash: los hashes de txlist y de ledger concordaron en los 176,328 bloques, verificados con comprobaciones de referencia por bloque. Todas las actualizaciones de dependencias adyacentes al consenso superaron la misma prueba de reparseo.

## Soporte de intérprete (importante)

Ejecuta el indexador en **Python 3.10, 3.11 o 3.12**. El consenso está demostrado como idéntico byte a byte en esas tres versiones. **No lo ejecutes en Python 3.13**: endureció la decodificación de `base64`/`binascii` y diverge del consenso en el bloque 783,775 (una clasificación errónea de un sello). La imagen publicada `btcstamps/indexer:1.9.1` está construida sobre Python 3.12, el entorno de ejecución certificado.

## Notas de actualización

- **Requiere Counterparty `v11.0.1+`** (para la corrección del endpoint de la API CP V2).
- Aplica el nuevo esquema (tablas de datos de mercado, caché de holders e historial de ventas, además de una columna `fee_rate_sat_vb` y nuevos índices).
- Usa el snapshot de arranque hasta el bloque 956,000 en S3 para una sincronización inicial rápida.

Esta versión mantiene la misma disciplina que ha definido a <EntityMention entity="bitcoin-stamps">Bitcoin Stamps</EntityMention> desde el bloque 779,652 en adelante: las nuevas funcionalidades se activan detrás de alturas de activación, y el consenso se demuestra frente a la cadena real antes de que se publique nada.
