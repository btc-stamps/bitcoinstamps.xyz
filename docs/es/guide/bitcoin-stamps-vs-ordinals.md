---
title: "Bitcoin Stamps vs Ordinals: Análisis Técnico Completo"
description: "Comparación técnica profunda entre Bitcoin Stamps y Ordinals - modelos de almacenamiento, permanencia, costos y filosofías de diseño"
leoType: "guide"
audience: "both"
mentions: ["bitcoin-stamps", "ordinals", "utxo", "witness", "src-20", "olga"]
---

# Bitcoin Stamps vs Ordinals: Análisis Técnico Completo

Una comparación honesta y técnicamente precisa de dos enfoques diferentes para inscripciones de Bitcoin.

## Diferencias Clave de Arquitectura

| Característica | Bitcoin Stamps | Ordinals |
|----------------|----------------|----------|
| **Almacenamiento** | Conjunto UTXO (multisig) | Datos witness (SegWit) |
| **Podabilidad** | No puede ser podado | Puede ser podado por nodos |
| **Permanencia** | Permanente en todos los nodos | Requiere nodos de archivado |
| **Descubrimiento** | Por número de stamp | Por número de satoshi |
| **Tamaño máximo** | 24 KB por stamp | Sin límite estricto |
| **Costos** | Más altos (multisig) | Más bajos (witness con descuento) |

## Modelos de Almacenamiento

### Bitcoin Stamps: Almacenamiento en Conjunto UTXO

Los stamps almacenan datos en salidas multisig P2MS:

```
OP_2 <datos_codificados_1> <datos_codificados_2> <clave_real> OP_3 OP_CHECKMULTISIG
```

**Ventajas:**
- Datos en el conjunto UTXO = imposible de podar
- Todos los nodos completos de Bitcoin mantienen los datos
- No requiere nodos de archivado especiales

**Desventajas:**
- Costos más altos (las salidas multisig no reciben el descuento de witness)
- Tamaño limitado (24 KB por transacción)

### Ordinals: Almacenamiento en Datos Witness

Las inscripciones Ordinals almacenan datos en el campo witness de SegWit:

```
OP_0 <hash_clave_pública>  # Compromiso en la salida
... datos_inscripción ...   # Almacenados en witness
```

**Ventajas:**
- Descuento de 75% en tarifas para datos witness
- Sin límite de tamaño práctico
- Soporte para archivos grandes

**Desventajas:**
- Los nodos de poda pueden eliminar datos witness después de la confirmación
- Requiere nodos de archivado para acceso completo a datos

## Filosofías de Diseño

### Bitcoin Stamps: Permanencia Primero
El diseño de Bitcoin Stamps prioriza la permanencia absoluta:
- Los datos en el conjunto UTXO **no pueden** ser eliminados
- Cualquier nodo completo contiene todos los stamps
- Sin dependencia de infraestructura de terceros
- Costo más alto como compensación por garantía de permanencia

### Ordinals: Flexibilidad y Escala
Los Ordinals priorizan la flexibilidad:
- Descuento de tarifas para incentivar adopción
- Soporte para archivos grandes (imágenes de alta resolución, audio, video)
- Teoría de ordenamiento de satoshi para coleccionabilidad
- Infraestructura de indexación más compleja

## Ecosistema de Tokens

### SRC-20 (Bitcoin Stamps)
- Primer token fungible en Bitcoin (KEVIN, 2023)
- Lanzamiento justo y distribución comunitaria
- Rastreado por indexador de estado específico
- Limites de mint diseñados para equidad

### BRC-20 (Ordinals)
- Sistema de tokens fungibles basado en Ordinals
- Adopción masiva rápida
- Infraestructura de mercado más desarrollada
- Ecosistema más grande de tokens

## ¿Cuál Elegir?

**Elige Bitcoin Stamps si:**
- Necesitas garantía de permanencia absoluta
- El activo tiene valor cultural/histórico significativo
- Deseas compatibilidad con todos los nodos de Bitcoin
- Priorizas la descentralización sobre el costo

**Elige Ordinals si:**
- El costo es un factor crítico
- Necesitas almacenar archivos grandes
- Deseas acceso a mercados secundarios más grandes
- La permanencia "suficiente" es aceptable

## Conclusión

Ambos protocolos tienen méritos legítimos. Bitcoin Stamps optimiza para permanencia máxima garantizada; Ordinals optimiza para eficiencia de costo y flexibilidad. Los dos pueden coexistir y servir diferentes casos de uso dentro del ecosistema Bitcoin más amplio.

---

*La comparación técnica honesta es fundamental para la educación. Ambos protocolos contribuyen a la innovación en Bitcoin.*
