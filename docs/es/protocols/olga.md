---
title: "Protocolo de Almacenamiento OLGA"
description: "Optimización de almacenamiento de datos P2WSH que proporciona reducciones de costo del 30-95% para transacciones de Bitcoin Stamps"
leoType: "protocol"
audience: "unified"
mentions: ["olga", "p2wsh", "storage-optimization", "cost-reduction", "efficiency"]
blockHeight: 865000
culturalSignificance: "medium"
protocolType: "optimization"
---

# Protocolo de Almacenamiento OLGA

<SmartStructuredData />

El **Protocolo de Almacenamiento OLGA** es un método avanzado de almacenamiento de datos P2WSH que proporciona **reducciones de costos del 30-95%** para transacciones de Bitcoin Stamps, reemplazando el costoso enfoque de multifirma 2/3 con almacenamiento eficiente en scripts witness.

## Características Clave

- **Ahorro Masivo de Costos**: Reducción del 30-95% en comisiones de transacción frente a multifirma 2/3
- **Compatibilidad Universal**: Funciona en todos los protocolos de Bitcoin Stamps (SRC-20, SRC-101, SRC-721)
- **Almacenamiento Inmutable**: Almacenamiento permanente de datos en Bitcoin usando P2WSH
- **Prioridad con Mineros**: Mayor eficiencia de comisiones que la multifirma, especialmente con tasas altas
- **Agnóstico al Protocolo**: Beneficia todos los tipos de transacciones de Bitcoin Stamps

## Beneficios de OLGA para Todos los Usuarios

**Reducción Automática de Costos:**
- **Eficiencia de Almacenamiento**: Reduce los costos de creación de stamps del 50-80% frente a multifirma
- **Creación de Tokens**: Menores comisiones para el despliegue de tokens SRC-20
- **Despliegue de Colecciones**: Configuración más económica de colecciones SRC-721
- **Registro de Nombres**: Costos reducidos para el minteo de nombres SRC-101

**Beneficios de Almacenamiento:**
- **Datos Inmutables**: Almacenamiento permanente en scripts witness de Bitcoin
- **Amigable con Mineros**: Mejor prioridad que la multifirma con tasas de comisión altas
- **P2WSH Eficiente**: Estructura óptima de script de Bitcoin para datos
- **Sin Pérdida de Datos**: Preservación completa del contenido original

**Cómo Funciona OLGA:**
1. **Crea normalmente** usando cualquier interfaz de Bitcoin Stamps
2. **OLGA se activa automáticamente** durante la creación de la transacción (bloque 865,000+)
3. **El almacenamiento P2WSH** reemplaza el costoso método de multifirma 2/3
4. **Las comisiones reducidas** se reflejan automáticamente en el costo final
5. **Los datos completos** se almacenan permanentemente en los scripts witness de Bitcoin

## Implementación Técnica

Para desarrolladores que implementan aplicaciones optimizadas con OLGA:

### Características de Optimización de Almacenamiento
- **Scripts Witness P2WSH**: Almacenamiento eficiente en scripts witness de Bitcoin
- **Optimización Automática**: Funciona de forma transparente con los protocolos existentes
- **Compatibilidad Universal**: Admite todos los protocolos de Bitcoin Stamps
- **Prioridad con Mineros**: Mejores tasas de inclusión durante períodos de comisiones altas

### Recursos para Desarrolladores
- **[SDK TX-Builder →](https://github.com/stampchain-io/stamps_sdk)** - Integración OLGA incorporada
- **[Documentación API →](/en/tutorials/api-integration)** - Endpoints de almacenamiento P2WSH
- **[Especificaciones del Protocolo →](https://github.com/stampchain-io/stamps_sdk)** - Detalles de implementación técnica

## Técnicas de Almacenamiento

### Scripts Witness P2WSH
- **Datos Witness**: Almacena datos en scripts witness de Bitcoin
- **Optimización de Scripts**: Uso eficiente de opcodes para almacenamiento de datos
- **Almacenamiento Inmutable**: Preservación permanente de datos en Bitcoin
- **Prioridad con Mineros**: Mayor eficiencia de comisiones que los scripts multifirma

### Optimización de Costos
- **Reducción de Comisiones**: Ahorro del 30-95% frente al enfoque de multifirma 2/3
- **Resistencia a Comisiones Altas**: Mejor prioridad durante congestión de red
- **Codificación Eficiente**: Estructura óptima de script de Bitcoin
- **Compatibilidad con Legado**: Respaldo a multifirma cuando sea necesario

### Integración con Protocolos
- **SRC-20**: Almacenamiento P2WSH para metadatos de tokens y despliegue
- **SRC-101**: Almacenamiento witness eficiente para registros de nombres
- **SRC-721**: Referencias de capas optimizadas usando P2WSH
- **Cruzado entre Protocolos**: Almacenamiento P2WSH universal para todos los protocolos

## Ejemplos de Reducción de Costos

### Ahorros Reales (frente a Multifirma 2/3)

**Stamps de Imagen:**
- **Multifirma 2/3**: Imagen de 24KB = ~480,000 sats (baja prioridad con mineros)
- **OLGA P2WSH**: Los mismos datos = ~160,000 sats (mejor prioridad)
- **Ahorro**: Reducción del 67% (320,000 sats ahorrados)

**Tokens SRC-20:**
- **Multifirma 2/3**: Despliegue de token = ~50,000 sats
- **OLGA P2WSH**: El mismo despliegue = ~20,000 sats
- **Ahorro**: Reducción del 60% (30,000 sats ahorrados)

**Colecciones SRC-721:**
- **Multifirma 2/3**: Colección = ~200,000 sats (penalizada con comisiones altas)
- **OLGA P2WSH**: La misma colección = ~80,000 sats (mejor prioridad)
- **Ahorro**: Reducción del 60% (120,000 sats ahorrados)

## Impacto en la Red

### Beneficios de Eficiencia
- **Mayor Eficiencia de Comisiones**: P2WSH más eficiente que el almacenamiento multifirma
- **Mejor Prioridad con Mineros**: Especialmente beneficioso con tasas de comisión altas
- **Almacenamiento en Datos Witness**: Aprovecha las capacidades de scripts witness de Bitcoin
- **Compatibilidad de Red**: Tipos de transacciones Bitcoin estándar

### Beneficios para Mineros
- **Mayor Prioridad**: Las transacciones OLGA obtienen mejor prioridad de inclusión
- **Optimización de Comisiones**: Ratios de comisión por byte más eficientes
- **Penalizaciones Reducidas**: Sin penalizaciones de comisiones multifirma que afectaban los stamps pre-OLGA

## Garantía de Permanencia

Los Bitcoin Stamps alcanzan un nivel de permanencia de datos arquitectónicamente superior a otros protocolos basados en Bitcoin. OLGA optimiza el costo de lograr esta permanencia mientras preserva sus garantías fundamentales.

### Cómo OLGA Mantiene la Permanencia

Los stamps pre-OLGA incorporan datos directamente en el **conjunto de salidas de transacciones no gastadas (UTXO)** mediante salidas de multifirma bare — datos que cada nodo Bitcoin con validación completa debe conservar para verificar nuevas transacciones. OLGA cambia el mecanismo de almacenamiento a scripts witness P2WSH para mayor eficiencia de costos, mientras que los hashes de salida P2WSH permanecen en el conjunto UTXO como prueba inmutable de la existencia de los datos. Los datos codificados en sí mismos quedan registrados permanentemente en los bloques de Bitcoin y son recuperables por cualquier nodo que haya procesado esos bloques. OLGA reduce los costos de transacción sin sacrificar la permanencia que define a los Bitcoin Stamps.

### Contraste con Ordinals y los Datos Witness

Las inscripciones de Ordinals almacenan sus datos en la parte **witness** (SegWit) de las transacciones de Bitcoin. Si bien los datos witness se incluyen en los bloques, el protocolo de Bitcoin permite explícitamente a los nodos podar los datos witness después de la validación. Un nodo podado puede descartar las secciones witness por completo y seguir funcionando como participante válido en la red. Esto significa que la disponibilidad de los datos de Ordinals depende de que los nodos de archivo elijan conservar esos datos — no está garantizado estructuralmente.

Los Bitcoin Stamps adoptan un enfoque fundamentalmente diferente. Ya sea usando el método original de multifirma bare o la optimización P2WSH de OLGA, los Stamps crean salidas no gastables cuyos hashes son retenidos en el conjunto UTXO por cada nodo completo. Los datos quedan permanentemente anclados a la capa de consenso de Bitcoin en lugar de almacenarse en una sección opcional y podable.

### Implicación Práctica

Cualquier Bitcoin Stamp creado con OLGA puede recuperarse desde **cualquier nodo completo de Bitcoin, indefinidamente**. OLGA logra un ahorro de costos del 30-95% sin comprometer esta garantía. No hay dependencia de infraestructura de archivo especializada, servicios de anclaje IPFS o capas de disponibilidad de datos de terceros. La propia red Bitcoin sirve como la capa de almacenamiento permanente e incensurable — OLGA simplemente hace que acceder a esa permanencia sea más asequible.

## Comenzar

El almacenamiento P2WSH de OLGA está **habilitado automáticamente** (bloque 865,000+) en todas las principales herramientas de Bitcoin Stamps:

**Integración Automática:**
- **[Stampchain.io →](https://stampchain.io)** - OLGA habilitado por defecto
- **[SDK TX-Builder →](https://github.com/stampchain-io/stamps_sdk)** - Almacenamiento P2WSH incorporado
- **[Herramientas para Artistas →](/en/tutorials/artist-tools)** - Optimización automática

**Para Desarrolladores:**
- **[Integración de SDK →](/en/tutorials/sdk-integration)** - Opciones de configuración de OLGA
- **[Referencia de API →](/en/tutorials/api-integration)** - Endpoints de almacenamiento P2WSH
- **[Especificaciones del Protocolo →](https://github.com/stampchain-io/stamps_sdk)** - Detalles técnicos

## Contexto Técnico

**Evolución desde Multifirma:**
Los Bitcoin Stamps originalmente usaban transacciones de multifirma 2/3 con datos en 2 operaciones de firma. Esto era:
- **Costoso**: Comisiones de transacción más altas
- **Penalizado**: Baja prioridad con los mineros, especialmente con tasas de comisión altas
- **Ineficiente**: Uso subóptimo de las capacidades de script de Bitcoin

**Solución OLGA (Bloque 865,000+):**
Basado en las pruebas de Counterparty de JP Janssen, OLGA adoptó scripts witness P2WSH:
- **Almacenamiento Eficiente**: Datos almacenados en scripts witness
- **Mejor Prioridad**: Mejor inclusión por parte de mineros, especialmente durante comisiones altas
- **Inmutable**: Almacenamiento permanente e incensurable en Bitcoin
- **Rentable**: Reducción de comisiones del 30-95% frente a multifirma

---

*OLGA hace que los Bitcoin Stamps sean más accesibles mediante un almacenamiento P2WSH eficiente, manteniendo la naturaleza permanente e inmutable de los datos en cadena.*
