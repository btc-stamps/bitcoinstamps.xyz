---
title: "Estándar de Tokens SRC-20"
description: "Estándar de tokens fungibles de Bitcoin Stamps que permite la creación permanente de tokens directamente en Bitcoin con características mejoradas e innovación impulsada por la comunidad"
leoType: "protocol"
audience: "both"
mentions: ["src-20", "kevin", "arwyn", "reinamora", "olga", "mikeinspace"]
blockHeight: 796000
culturalSignificance: "high"
tokenSymbol: "KEVIN"
historicalContext: "Migración de Counterparty a codificación nativa de Bitcoin en el bloque 796,000"
---

# Estándar de Tokens SRC-20

<SmartStructuredData />

El **Estándar de Tokens SRC-20** permite la creación de tokens fungibles directamente en Bitcoin. <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>, creado por <EntityMention entity="arwyn">Arwyn</EntityMention> en el bloque 788,041, fue el primer token SRC-20 y se convirtió en la querida mascota comunitaria con más de 2,300 tenedores.

## Características Clave

- **Integración Bitcoin Verdadera**: Tokens almacenados directamente en Bitcoin, no en sidechains
- **Lanzamiento Justo**: Sin pre-minados o ventajas privilegiadas, siguiendo el ejemplo de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>
- **Almacenamiento Permanente**: Registros de tokens inmutables en la blockchain más segura del mundo
- **Impulsado por la Comunidad**: Protocolo evolucionado a través de colaboración grassroots de desarrolladores

## Implementación Técnica

### Evolución del Protocolo
- **Bloque 788,041**: Despliegue del token <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> (primer SRC-20)
- **Bloque 796,000**: Migración del protocolo a codificación nativa de Bitcoin
- **Bloque 865,000**: Soporte de optimización <EntityMention entity="olga">OLGA</EntityMention>

### Estructura de Transacción
```typescript
interface SRC20Transaction {
  action: 'DEPLOY' | 'MINT' | 'TRANSFER';
  ticker: string;       // 1-5 caracteres
  amount?: string;      // Para MINT/TRANSFER
  max?: string;         // Para DEPLOY (suministro total)
  limit?: string;       // Para DEPLOY (límite de mint)
}
```

### Inicio Rápido
```bash
npm install @btc-stamps/tx-builder
```

```typescript
import { TxBuilder } from '@btc-stamps/tx-builder';

const txBuilder = new TxBuilder({ network: 'mainnet' });

// Desplegar token
const deployTx = await txBuilder.src20.deploy({
  ticker: 'MIARTE',
  max: '1000000',
  limit: '100'
});
```

### Operaciones Comunes

```typescript
// Mintear tokens
const mintTx = await txBuilder.src20.mint({
  ticker: 'MIARTE',
  amount: '100'
});

// Transferir tokens
const transferTx = await txBuilder.src20.transfer({
  ticker: 'MIARTE', 
  amount: '50',
  destination: 'bc1q...'
});
```

## Creando Tu Token

**¡No se requiere codificación!** Crea tokens SRC-20 a través de:

1. **[Creador de Tokens Stampchain.io →](https://stampchain.io/create-token)** - Interfaz web para creación fácil de tokens
2. **Herramientas Comunitarias** - Varios creadores e interfaces construidos por la comunidad

### Planificación de Tokens

Sigue el modelo exitoso de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>:
- **Lanzamiento Justo**: Sin pre-asignación, oportunidad igual para todos
- **Nombre Significativo**: Elige un ticker que represente tu visión  
- **Comunidad Primero**: Construye compromiso genuino, no solo especulación
- **Suministro Razonable**: Considera el tamaño de tu comunidad y objetivos

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
- Establecer límites de mint razonables (100-1000 tokens por transacción)
- Elegir suministro total que coincida con tu visión comunitaria
- Sin pre-minado - dejar que la comunidad mintee orgánicamente
- Comprometerse auténticamente, evitar tácticas pump-and-dump

**Consideraciones Técnicas**:
- Probar en testnet primero
- Considerar comisiones de transacción para tu comunidad
- Planear estrategia de distribución de tokens
- Monitorear despliegue exitoso antes de anunciar

## Recursos

- **[Crear Token SRC-20 →](https://stampchain.io/create-token)** - Creación de tokens sin código
- **[SDK TX-Builder →](https://github.com/btc-stamps/tx-builder)** - Integración técnica
- **[Discord Comunitario →](https://discord.gg/bitcoinstamps)** - Obtener ayuda y soporte
- **[Historia de KEVIN →](/es/narratives/kevin-origin)** - Aprender del éxito del primer SRC-20

---

*Los tokens SRC-20 permiten la creación de tokens permanentes y justos en Bitcoin. Sigue el ejemplo de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> de construcción comunitaria auténtica sobre especulación.*