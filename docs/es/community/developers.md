---
title: "Recursos para Desarrolladores"
description: "Recursos técnicos completos, SDK, APIs y guías de integración para desarrolladores de Bitcoin Stamps"
leoType: "developer-resource"
audience: "technical"
mentions: ["tx-builder", "stampchain", "src-20", "src-721", "olga", "api"]
---

# Recursos para Desarrolladores

Todo lo que necesitas para construir sobre los protocolos Bitcoin Stamps, desde APIs hasta SDKs y código de ejemplo.

## SDK Principal: @btc-stamps/tx-builder

El SDK oficial para crear Bitcoin Stamps y tokens SRC-20 programáticamente.

```bash
npm install @btc-stamps/tx-builder
```

```typescript
import { TxBuilder } from '@btc-stamps/tx-builder';

const txBuilder = new TxBuilder({ network: 'mainnet' });

// Crear un Bitcoin Stamp
const stampResult = await txBuilder.createStamp({
  imageData: imageBuffer,
  fromAddress: 'tu-dirección-bitcoin',
  feeRate: 20
});

// Desplegar token SRC-20
const deployResult = await txBuilder.src20.deploy({
  ticker: 'MITOKEN',
  max: '21000000',
  limit: '1000'
});
```

## API REST

### Endpoints Principales

```bash
# Información de stamps
GET https://stampchain.io/api/v2/stamps/{id}
GET https://stampchain.io/api/v2/stamps/recent

# Tokens SRC-20
GET https://stampchain.io/api/v2/src20/{tick}
GET https://stampchain.io/api/v2/src20/{tick}/holders

# Ejemplo: Obtener datos del token KEVIN
curl https://stampchain.io/api/v2/src20/tick/KEVIN
```

### Límites de Velocidad

- **Público**: 100 solicitudes/minuto
- **Autenticado**: 1000 solicitudes/minuto
- **Empresarial**: Límites personalizados disponibles

## Recursos Técnicos

- **[Documentación API →](/es/tutorials/api-integration)** - Guía completa de integración API
- **[Integración SDK →](/es/tutorials/sdk-integration)** - Documentación SDK detallada
- **[Código Fuente](https://github.com/stampchain-io)** - Repositorios GitHub de código abierto
- **[Documentación Interactiva](https://stampchain.io/docs)** - Sandbox API en vivo

## Protocolos

- **[SRC-20](/es/protocols/src-20)** - Estándar de tokens fungibles
- **[SRC-101](/es/protocols/src-101)** - Sistema de nombres en Bitcoin
- **[SRC-721](/es/protocols/src-721)** - NFTs avanzados con capacidades recursivas
- **[OLGA](/es/protocols/olga)** - Protocolo de almacenamiento optimizado

## Soporte para Desarrolladores

- **[Discord #developers](https://discord.gg/bitcoinstamps)** - Canal técnico de la comunidad
- **[GitHub Issues](https://github.com/stampchain-io)** - Reportes de bugs y solicitudes de características
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/bitcoin-stamps)** - Preguntas y respuestas técnicas

---

*Construido sobre Bitcoin, para desarrolladores que quieren crear valor permanente en la blockchain más segura del mundo.*
