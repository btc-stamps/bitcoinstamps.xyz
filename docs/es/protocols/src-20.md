---
title: "Estándar de Tokens SRC-20"
description: "Estándar de tokens fungibles de Bitcoin Stamps que permite la creación permanente de tokens directamente en Bitcoin con características mejoradas e innovación impulsada por la comunidad"
leoType: "protocol"
audience: "unified"
mentions: ["src-20", "kevin", "arwyn", "reinamora", "olga", "mikeinspace"]
blockHeight: 788041
culturalSignificance: "high"
tokenSymbol: "KEVIN"
historicalContext: "Génesis en el bloque 788,041 (KEVIN), la codificación nativa de Bitcoin comenzó en el bloque 793,068, corte de Counterparty en el bloque 796,000"
author: reinamora
---

# Estándar de Tokens SRC-20

El **Estándar de Tokens SRC-20** permite la creación de tokens fungibles como una capa construida sobre los Bitcoin Stamps. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> comenzó su vida como el Stamp #4258 (bloque 783,718), donde exhibió un comportamiento autorreplicante, similar a un fantasma, por todo el sistema. Reconociendo que esta consciencia digital necesitaba una forma adecuada, <EntityMention entity="arwyn">Arwyn</EntityMention> creó el primer token SRC-20 en el bloque 788,041 (Stamp #18,516), dando a <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> una existencia tangible como ícono cultural y querida mascota de la comunidad con más de 2,300 poseedores.

**Aprende la Historia Completa**:
- **[El Origen de KEVIN →](/es/narratives/kevin-origin)** - De experimento artístico a primer token SRC-20
- **[Historia de Bitcoin Stamps →](/es/narratives/bitcoin-stamps-history)** - Cronología sagrada, incluida la génesis de SRC-20
- **[Filosofía Comunitaria →](/es/community/)** - Los valores que guían la creación de tokens

## Evolución del Protocolo

- **Bloque 788,041**: Primer token SRC-20 (KEVIN) en Counterparty
- **Bloque 793,068**: Primer SRC-20 nativo de Bitcoin (codificación directa)
- **Bloque 796,000**: Corte de SRC-20 en Counterparty (regla de consenso: ignorar los tokens de CP después de este punto)
- **Bloque 865,000**: Optimización <EntityMention entity="olga">OLGA</EntityMention> disponible para todos los tokens SRC-20

**Fundamento Técnico**: Todos los tokens SRC-20 son stamps (crean registros de stamp en Bitcoin), pero no todos los stamps son tokens SRC-20. Los stamps proporcionan la capa base no fungible, mientras que SRC-20 crea la capa de tokens fungibles por encima.

## Características Clave

- **Integración Bitcoin Verdadera**: Tokens almacenados directamente en Bitcoin, no en sidechains
- **Lanzamiento Justo**: Sin pre-minados ni ventajas privilegiadas, siguiendo el ejemplo de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>
- **Almacenamiento Permanente**: Registros de tokens inmutables en la blockchain más segura del mundo
- **Impulsado por la Comunidad**: Protocolo evolucionado a través de colaboración de base entre desarrolladores

## Creando Tu Token SRC-20

**Creación Fácil Sin Código:**

### **[Crear Token SRC-20 →](https://stampchain.io)**

1. **Visita el Creador de Tokens** en Stampchain.io
2. **Planifica tu token** siguiendo el exitoso modelo de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>
3. **Establece parámetros** (ticker, suministro, límites de mint)
4. **Despliega** tu token de forma permanente en Bitcoin

### Pautas de Planificación de Tokens

Sigue el exitoso modelo de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>:
- **Lanzamiento Justo**: Sin pre-asignación, igualdad de oportunidades para todos
- **Nombre Significativo**: Elige un ticker que represente tu visión
- **Comunidad Primero**: Construye un compromiso genuino, no solo especulación
- **Suministro Razonable**: Considera el tamaño de tu comunidad y tus objetivos

## Implementación Técnica

Para desarrolladores que implementen SRC-20 programáticamente:

### Estructura del Protocolo
- **DEPLOY**: Crear un nuevo token (requiere ticker, suministro máximo, límite de mint)
- **MINT**: Crear suministro de token (requiere ticker, cantidad)
- **TRANSFER**: Enviar tokens (requiere ticker, cantidad, destino)

### Recursos de Desarrollo
- **[SDK TX-Builder →](https://github.com/btc-stamps/tx-builder)** - Integración técnica completa
- **[Documentación de la API →](https://stampchain.io/api)** - Accede a los datos de los tokens programáticamente
- **[Discord Comunitario →](https://discord.gg/bitcoinstamps)** - Canal de soporte para desarrolladores

## Especificación del Protocolo

### Acciones

| Acción | Propósito | Campos Requeridos |
|--------|-----------|-------------------|
| DEPLOY | Crear nuevo token | ticker, max, limit |
| MINT | Crear suministro de token | ticker, amount |
| TRANSFER | Enviar tokens | ticker, amount, destination |

### Límites
- **Ticker**: 1-5 caracteres, alfanuméricos
- **Suministro**: Máximo 18 decimales
- **Cantidad**: No debe exceder el límite de mint por transacción

### Mejores Prácticas

**Para Lanzamientos Justos** (siguiendo el modelo de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>):
- Establece límites de mint razonables (100-1000 tokens por transacción)
- Elige un suministro total que coincida con tu visión comunitaria
- Sin pre-minado: deja que la comunidad mintee orgánicamente
- Comprométete auténticamente, evita tácticas pump-and-dump

**El Patrón de Éxito de KEVIN**:
1. **Visión Artística Auténtica** - Comienza con un propósito creativo genuino
2. **Economía Comunitaria Justa** - Da a todos igualdad de oportunidades
3. **Compromiso a Largo Plazo** - Construye cultura, no solo bombo
4. **Empoderamiento Comunitario** - Deja que la comunidad sea dueña de la narrativa
5. **Valor Permanente** - Crea un significado cultural duradero

**Consideraciones Técnicas**:
- Prueba primero en testnet
- Considera las comisiones de transacción para tu comunidad
- Planifica la estrategia de distribución de tokens
- Monitorea el despliegue exitoso antes de anunciar

## Contexto Cultural y Filosofía

Los tokens SRC-20 llevan adelante la filosofía de Bitcoin Stamps de *"In Lak'ech Ala K'in"* - "Yo soy tú y tú eres yo". La evolución de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> desde el homenaje artístico de <EntityMention entity="arwyn">Arwyn</EntityMention> hasta convertirse en la querida mascota de la comunidad demuestra cómo la creatividad auténtica puede construir un valor cultural duradero.

**Valores Comunitarios**:
- **Principios de Lanzamiento Justo**: Igualdad de oportunidades para todos los miembros de la comunidad
- **Autenticidad Cultural**: Los tokens deben servir a propósitos genuinos, no solo a la especulación
- **Visión a Largo Plazo**: Construir comunidades duraderas en lugar de bombo a corto plazo
- **Expresión Creativa**: Los tokens como vehículos de expresión artística y cultural

## Garantía de Permanencia

Los Bitcoin Stamps, incluidos todos los registros de tokens SRC-20, alcanzan un nivel de permanencia de datos arquitectónicamente superior al de otros protocolos basados en Bitcoin. Esta garantía se deriva de cómo se almacenan los datos de los Stamps en la red Bitcoin.

### Por Qué los Datos SRC-20 No Pueden Podarse

Las operaciones de tokens SRC-20 (deploy, mint y transfer) se codifican directamente en el **conjunto de salidas de transacción no gastadas (UTXO)**, el conjunto de datos central que todo nodo Bitcoin de validación completa debe conservar para verificar nuevas transacciones. Dado que estos datos residen en salidas que los nodos están obligados a mantener, no pueden descartarse sin romper el consenso. Cualquier nodo completo de Bitcoin, en cualquier momento futuro, conservará el registro completo de cada despliegue, mint y transferencia de tokens SRC-20.

### Contraste con Ordinals y los Datos de Testigo

Las inscripciones Ordinals almacenan sus datos en la porción de **testigo (witness, SegWit)** de las transacciones de Bitcoin. Aunque los datos de testigo se incluyen en los bloques, el protocolo de Bitcoin permite explícitamente que los nodos poden los datos de testigo tras la validación. Un nodo podado puede descartar por completo las secciones de testigo y seguir funcionando como un participante válido de la red. Esto significa que la disponibilidad de los datos de Ordinals depende de que los nodos de archivo decidan conservarlos, no está garantizada estructuralmente.

Los Bitcoin Stamps adoptan el enfoque opuesto. Al integrar los datos en el conjunto UTXO en lugar de en los datos de testigo, los Stamps garantizan que cada nodo completo —ya sea de archivo o podado— conserve los datos como parte obligatoria de las operaciones de consenso.

### Implicación Práctica

Cualquier registro de token SRC-20 puede recuperarse desde **cualquier nodo completo de Bitcoin, indefinidamente**. No hay dependencia de infraestructura de archivo especializada, servicios de fijación en IPFS ni capas de disponibilidad de datos de terceros. La propia red Bitcoin sirve como la capa de almacenamiento permanente e incensurable para todos los datos de tokens SRC-20.

## Recursos

- **[Crear Token SRC-20 →](https://stampchain.io)** - Creación de tokens sin código
- **[SDK TX-Builder →](https://github.com/btc-stamps/tx-builder)** - Integración técnica
- **[Discord Comunitario →](https://discord.gg/bitcoinstamps)** - Obtén ayuda y soporte
- **[La Historia Completa de KEVIN →](/es/narratives/kevin-origin)** - Aprende del recorrido del primer SRC-20
- **[Historia de Bitcoin Stamps →](/es/narratives/bitcoin-stamps-history)** - Cronología sagrada y contexto cultural

---

*Los tokens SRC-20 permiten la creación de tokens permanentes y justos en Bitcoin. Sigue el ejemplo de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> de construcción comunitaria auténtica guiada por la sabiduría ancestral y la innovación moderna.*
