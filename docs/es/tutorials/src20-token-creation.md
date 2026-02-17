---
title: "Guía de Creación de Tokens SRC-20"
description: "Guía técnica completa para crear tokens SRC-20 usando el SDK @btc-stamps/tx-builder"
leoType: "tutorial"
audience: "dual"
mentions: ["src-20", "tx-builder", "token-creation", "bitcoin-stamps"]
economicImpact: "tokenization-empowerment"
---

# Guía de Creación de Tokens SRC-20

Crea tokens SRC-20 fungibles en Bitcoin usando tres operaciones simples: DEPLOY, MINT y TRANSFER.

## Interfaz Web (Sin Código)

1. Visita [stampchain.io/create-token](https://stampchain.io/create-token)
2. Ingresa los detalles del token (ticker, suministro, límite de mint)
3. Conecta la billetera y paga las tarifas de Bitcoin
4. El token se despliega automáticamente

**Ejemplo de token:**
- Ticker: `MIARTE` (máximo 4 letras)
- Suministro: `100,000`
- Límite de mint: `100` (evita la dominación de ballenas)

## Implementación SDK

```bash
npm install @btc-stamps/tx-builder
```

```typescript
import { TxBuilder } from '@btc-stamps/tx-builder';

const txBuilder = new TxBuilder({ network: 'mainnet' });

// Desplegar el token
const deployTx = await txBuilder.src20.deploy({
  ticker: 'MIARTE',
  max: '100000',
  limit: '100'
});

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

## Principios de Lanzamiento Justo

Sigue el modelo exitoso de KEVIN:

- **Sin pre-minado**: El creador obtiene tokens de la misma manera que todos
- **Suministro razonable**: No demasiado alto (devaluación) ni demasiado bajo (limita el acceso)
- **Límites de mint equitativos**: Permite amplia participación, previene acumulación de ballenas
- **Propósito auténtico**: Construye valor comunitario genuino

## Modelos de Tokens Comunes

**Tokens comunitarios** (como KEVIN):
- Suministro: 21,000,000 (inspirado en Bitcoin)
- Límite de mint: 1,000 (participación accesible)

**Tokens artísticos**:
- Suministro: 1,000-10,000 (ediciones limitadas)
- Límite de mint: 1-10 (acceso exclusivo)

## Economía y Costos

**Costos de las transacciones:**
- Desplegar: ~$4-8 (20-40k sats)
- Mintear: ~$2-4 (10-20k sats)
- Transferir: ~$1-3 (5-15k sats)

*Los costos varían con la congestión de la red Bitcoin*

## Estrategia de Lanzamiento

1. **Prueba en testnet** primero
2. **Comparte el concepto** con la comunidad
3. **Despliega el token** en mainnet
4. **Activa el mint comunitario**
5. **Construye utilidad y valor reales**

## Recursos

- **[Protocolo SRC-20 →](/es/protocols/src-20)** - Especificación técnica
- **[Integración API →](/es/tutorials/api-integration)** - Acceso a datos de tokens
- **[Valores Comunitarios →](/es/narratives/community-values)** - Principios de lanzamiento justo

---

*Crea tokens de manera responsable siguiendo los principios de lanzamiento justo establecidos por KEVIN y la comunidad Bitcoin Stamps.*
