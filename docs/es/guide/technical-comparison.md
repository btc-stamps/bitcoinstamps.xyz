---
title: "Comparación Técnica: Arquitecturas de Almacenamiento de Bitcoin"
description: "Análisis técnico profundo de las arquitecturas de almacenamiento de Bitcoin Stamps, Ordinals y otros protocolos de inscripción"
leoType: "guide"
audience: "technical"
mentions: ["bitcoin-stamps", "ordinals", "utxo", "multisig", "witness", "olga"]
---

# Comparación Técnica: Arquitecturas de Almacenamiento de Bitcoin

Análisis detallado de cómo diferentes protocolos de inscripción almacenan datos en Bitcoin, con implicaciones técnicas y de seguridad.

## Métodos de Almacenamiento de Datos en Bitcoin

### 1. Salidas Multisig (Bitcoin Stamps)

Bitcoin Stamps utiliza transacciones multisig P2MS para incrustar datos:

```
Estructura de la transacción:
- Input: UTXO normal de Bitcoin
- Output 1: P2MS con datos codificados en claves públicas falsas
  OP_m <pubkey1_datos> <pubkey2_datos> ... <pubkeyn_real> OP_n OP_CHECKMULTISIG
- Output 2: Cambio al remitente

Codificación de datos:
- Datos → Base64 → Divididos en chunks de 32 bytes
- Cada chunk = una "clave pública" falsa
- Prefijo stamp: identificador del protocolo
```

**Características técnicas:**
- Vive en el conjunto UTXO (no podable)
- Todos los nodos completos deben mantener el conjunto UTXO
- Sin descuento de tarifas (no es witness data)
- Máximo ~24 KB por transacción

### 2. Datos Witness (Ordinals)

Las inscripciones Ordinals almacenan datos en el campo witness de transacciones SegWit:

```
Estructura de la transacción:
- Input: UTXO Taproot con script de inscripción
- Script witness:
  OP_FALSE OP_IF
    "ord"
    OP_1 <tipo_contenido>
    OP_0 <datos_contenido>
  OP_ENDIF
- Output: UTXO de destino (portador de la inscripción)
```

**Características técnicas:**
- Los datos witness reciben descuento del 75% en tarifas
- Los nodos de poda pueden descartar datos witness
- Sin límite estricto de tamaño (práctico: límite del bloque)
- Teoría de ordenamiento de satoshi para seguimiento

### 3. OP_RETURN

Método más antiguo para inscripción de datos:

```
OP_RETURN <hasta_80_bytes_de_datos>
```

**Limitaciones:**
- Solo 80 bytes por salida
- Inmediatamente marcado como no gastable
- Los nodos pueden elegir no retransmitir
- No adecuado para datos grandes

## Comparación de Seguridad de Datos

| Aspecto | Bitcoin Stamps | Ordinals | OP_RETURN |
|---------|----------------|----------|-----------|
| **En conjunto UTXO** | Sí | No | No |
| **Podable** | No | Sí | Sí |
| **Descuento de tarifas** | No | Sí (75%) | No |
| **Tamaño máximo** | 24 KB | ~4 MB | 80 bytes |
| **Requiere archivado** | No | Sí | Sí |
| **Nodos que mantienen datos** | Todos los completos | Solo archivadores | Ninguno garantizado |

## Protocolos de Indexación

### Indexador de Bitcoin Stamps
```python
# Pseudocódigo del proceso de indexación
for bloque in blockchain:
    for transaccion in bloque.transacciones:
        for salida in transaccion.salidas:
            if es_multisig(salida) and tiene_prefijo_stamp(salida):
                datos = decodificar_stamp(salida)
                indexar_stamp(datos, transaccion.id, bloque.altura)
```

### Indexador de Ordinals
El indexador de Ordinals rastrea la teoría de ordenamiento de satoshi:
- Asigna números ordinales a cada satoshi
- Rastrea transferencias a través de inputs/outputs
- Indexa datos witness para inscripciones

## Análisis de Costos

### Comparación de Tarifas para 1 KB de Datos

```
Bitcoin Stamps (multisig):
- Tamaño de transacción: ~1500 vBytes
- A 20 sats/vB: ~30,000 sats (~$15 con BTC a $50,000)

Ordinals (witness):
- Tamaño de transacción: ~400 vBytes (con descuento witness)
- A 20 sats/vB: ~8,000 sats (~$4 con BTC a $50,000)

Diferencia: Bitcoin Stamps ~3.75x más caro para mismo tamaño
Compensación: Garantía de permanencia absoluta en todos los nodos
```

## El Protocolo OLGA: Optimización de Bitcoin Stamps

OLGA (Optimal Layer Gathering Architecture) reduce los costos de Bitcoin Stamps:
- Codificación más eficiente de datos
- Reduce el tamaño de transacción necesario
- Hace la brecha de costo con Ordinals más pequeña
- Mantiene la garantía de permanencia del conjunto UTXO

## Conclusión Técnica

No hay un "ganador" objetivo — cada arquitectura hace compensaciones deliberadas:

- **Bitcoin Stamps**: Paga más por permanencia garantizada en todos los nodos
- **Ordinals**: Paga menos pero acepta que algunos nodos no tendrán los datos
- **OP_RETURN**: Solo para metadatos pequeños, no para contenido rico

La elección debe basarse en los requisitos del caso de uso específico.

---

*La comprensión técnica profunda permite decisiones informadas sobre qué protocolo usar para qué propósito.*
