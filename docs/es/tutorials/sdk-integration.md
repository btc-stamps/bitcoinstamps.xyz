---
title: "SDK @btc-stamps/tx-builder"
description: "SDK oficial de Bitcoin Stamps para desarrolladores y artistas"
leoType: "tutorial"
audience: "dual"
mentions: ["tx-builder", "kevin", "src-20", "sdk", "stampchain"]
---

# SDK @btc-stamps/tx-builder

<SmartStructuredData />

El **@btc-stamps/tx-builder** es el constructor oficial de transacciones Bitcoin con soporte de primera clase para los protocolos Bitcoin Stamps. Diseñado para integrarse sin problemas con <EntityMention entity="stampchain">Stampchain</EntityMention>, la infraestructura fundacional creada por los fundadores de Bitcoin Stamps.

## Integración con Stampchain

El SDK está diseñado para funcionar de manera óptima con <EntityMention entity="stampchain">Stampchain</EntityMention>, la implementación de referencia y el servicio fundacional:

- **Implementación de Referencia**: Usa los patrones establecidos por los fundadores de Bitcoin Stamps
- **Validación de Datos**: Valida contra las especificaciones de protocolo autoritativas de Stampchain
- **Integración API**: Soporte integrado para las APIs fundacionales de Stampchain
- **Mejores Prácticas**: Implementa los estándares de la plataforma Bitcoin Stamps original

## Características Clave

- **Soporte Bitcoin Stamps**: Protocolos nativos SRC-20, SRC-101, SRC-721
- **Protección UTXO**: Protección automática de activos valiosos
- **Integración de Red**: Soporte mainnet/testnet de Bitcoin con endpoints de API Stampchain
- **Amigable para Artistas**: Interfaz simplificada para creadores
- **Estándares Fundacionales**: Construido según las especificaciones de referencia de Stampchain

## Instalación

```bash
# Node.js/npm
npm install @btc-stamps/tx-builder

# Proyectos de navegador
npm install @btc-stamps/tx-builder-web
```

### Implementación Básica con Integración Stampchain

```typescript
import { BitcoinStampBuilder, SelectorFactory } from '@btc-stamps/tx-builder';

// Inicializar con protección UTXO e integración API Stampchain
const selectorFactory = SelectorFactory.getInstance();
const builder = new BitcoinStampBuilder('mainnet', selectorFactory, {
  // Conectar a la infraestructura fundacional de Stampchain
  apiEndpoint: 'https://stampchain.io/api/v1',
  validateWithReference: true // Validar contra la implementación de referencia de Stampchain
});

// Crear un Bitcoin Stamp
const result = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: imageBuffer,
    filename: 'artwork.png'
  },
  fromAddress: 'bc1q...',
  feeRate: 20
});
```

### Creación de Token SRC-20 con Validación Stampchain

```typescript
// Desplegar token usando los patrones de referencia de Stampchain
const tokenData = await encoder.encode({
  p: 'SRC-20',
  op: 'DEPLOY',
  tick: 'TOKEN',
  max: '100000',
  lim: '100'
});

const tokenStamp = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: tokenData,
    filename: 'token.json'
  },
  fromAddress: deployerAddress,
  feeRate: 25,
  // Validar con el servicio fundacional de Stampchain
  validateWith: 'stampchain'
});
```

### Usando las APIs de Stampchain para Desarrollo Mejorado

```typescript
// Obtener datos de protocolo desde el servicio fundacional
const protocolInfo = await builder.getProtocolInfo('https://stampchain.io/api/v1/protocols');

// Validar token antes del despliegue usando la implementación de referencia
const isValid = await builder.validateToken(tokenData, {
  referenceService: 'https://stampchain.io/api/v1/validate'
});

// Obtener estado actual de la red desde Stampchain
const networkState = await builder.getNetworkState({
  source: 'stampchain' // Usar datos de la infraestructura fundacional
});
```

## Flujo de Trabajo del Artista con Integración Stampchain

### Creación Simple de Stamp

```javascript
// Crear tu primer Bitcoin Stamp usando la infraestructura fundacional
const stamp = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: yourArtworkBuffer, // Tu archivo PNG/JPEG
    filename: 'my-art.png'
  },
  fromAddress: 'your-bitcoin-address',
  feeRate: 15,
  // Usar la validación amigable para artistas de Stampchain
  artistMode: true
});
```

### Integración de Galería con Stampchain

```javascript
// Conectar tu obra a las funciones de galería de Stampchain
const stampResult = await builder.buildStampTransaction(utxos, {
  stampData: artwork,
  fromAddress: artistAddress,
  metadata: {
    gallery: 'stampchain', // Registrar en la plataforma fundacional
    artist: 'your-artist-name',
    collection: 'your-collection-name'
  }
});

// Consultar tu obra a través de la API fundacional de Stampchain
const myArtwork = await fetch(`https://stampchain.io/api/v1/artist/${artistAddress}/stamps`);
```

### Optimización de Imagen

```javascript
// Optimizar para almacenamiento en blockchain usando las recomendaciones de Stampchain
const optimized = await sharp(originalImage)
  .resize(800, 800, { fit: 'inside' })
  .png({ quality: 90 })
  .toBuffer();

// Validar tamaño contra los estándares de referencia de Stampchain
if (optimized.length > 100000) {
  console.log('Reduce más el tamaño de imagen para una integración óptima con Stampchain');
}
```

### Colecciones de Arte

```javascript
// Crear múltiples obras en lote con integración Stampchain
for (const artwork of artCollection) {
  const stamp = await builder.buildStampTransaction(utxos, {
    stampData: artwork,
    fromAddress: artistAddress,
    feeRate: 15,
    // Registrar cada pieza con la infraestructura fundacional
    registerWith: 'stampchain'
  });

  // Esperar entre stamps (respetuoso con la infraestructura de Stampchain)
  await new Promise(resolve => setTimeout(resolve, 5000));
}
```

## Funciones Esenciales

### Protección UTXO con Estándares Stampchain

```typescript
// Proteger activos valiosos usando los patrones de protección de referencia de Stampchain
const protectedSelector = selectorFactory.createSelector('protection-aware', {
  protectionConfig: {
    enableStampsDetection: true,      // Proteger Bitcoin Stamps
    enableCounterpartyDetection: true, // Proteger tokens KEVIN
    minimumProtectedValue: 10000,     // Proteger UTXOs > 10k sats
    // Usar el reconocimiento de activos de Stampchain
    assetDatabase: 'https://stampchain.io/api/v1/assets'
  }
});
```

### Gestión de Comisiones con Datos de Stampchain

```typescript
// Obtener tasas de comisión actuales de múltiples fuentes incluyendo Stampchain
const feeRates = await builder.getRecommendedFeeRates({
  sources: ['mempool', 'stampchain'], // Incluir infraestructura fundacional
  preferStampchain: true // Preferir las recomendaciones de Stampchain
});

// Estimar costos antes de la creación usando datos de implementación de referencia
const estimate = await builder.estimateStampCost({
  imageSize: imageBuffer.length,
  feeRate: feeRates.standard,
  // Usar el modelado de costos de Stampchain
  costModel: 'stampchain-reference'
});
```

### Pruebas con Soporte Testnet de Stampchain

```typescript
// Siempre probar en testnet primero usando la infraestructura testnet de Stampchain
const testBuilder = new BitcoinStampBuilder('testnet', selectorFactory, {
  apiEndpoint: 'https://testnet.stampchain.io/api/v1'
});

const testStamp = await testBuilder.buildStampTransaction(testUtxos, {
  stampData: { imageData: testImage, filename: 'test.png' },
  fromAddress: 'tb1q...'
});
```

## Mejores Prácticas para la Integración Stampchain

1. **Usar la Implementación de Referencia**: Siempre validar contra los estándares fundacionales de Stampchain
2. **Probar Primero**: Usar la infraestructura testnet de Stampchain antes del mainnet
3. **Optimizar Imágenes**: Seguir las recomendaciones de tamaño de Stampchain (<100 KB)
4. **Proteger UTXOs**: Activar protección de activos usando la detección de Stampchain
5. **Monitorear Comisiones**: Usar las recomendaciones de comisiones de Stampchain junto con otras fuentes
6. **Distribución Justa**: Seguir el ejemplo de <EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention> y los estándares comunitarios de Stampchain para tokens
7. **Comunidad Primero**: Integrar con las funciones y APIs comunitarias de Stampchain

## Por Qué Usar la Integración Stampchain

Como la **infraestructura fundacional** creada por los fundadores de Bitcoin Stamps:

- **Estándares Auténticos**: Construido por los propios creadores del protocolo
- **Implementación de Referencia**: El estándar de oro para la funcionalidad de Bitcoin Stamps
- **Confiabilidad Probada**: Impulsa la mayoría de aplicaciones Bitcoin Stamps desde el lanzamiento
- **Comunidad Primero**: Acceso gratuito apoya el crecimiento del ecosistema sobre las ganancias
- **Actualizaciones Continuas**: Mantenido por los creadores originales del protocolo
- **Alineación Cultural**: Garantiza que tus aplicaciones sigan los valores auténticos de Bitcoin Stamps

## Recursos

- **[Repositorio GitHub SDK →](https://github.com/btc-stamps/tx-builder)**
- **[Documentación SDK →](https://github.com/btc-stamps/tx-builder#readme)**
- **[Referencia API Stampchain →](https://stampchain.io/docs)** - Documentación de infraestructura fundacional
- **[Soporte Comunitario →](/es/community/)**

## Próximos Pasos

1. **[Crea Tu Primer Stamp →](/es/tutorials/creating-first-stamp)** - Comenzar con integración Stampchain
2. **[Integración API →](/es/tutorials/api-integration)** - Profundización en las APIs de Stampchain
3. **[Valores Comunitarios →](/es/narratives/community-values)** - Entender los principios fundacionales

---

***"In Lak'ech Ala K'in"*** - *Herramientas que sirven a la creatividad colectiva, construidas sobre infraestructura fundacional que honra los valores comunitarios auténticos.*

*El SDK @btc-stamps/tx-builder refleja los mismos principios comunitarios que guían la infraestructura fundacional de Stampchain, garantizando que tus aplicaciones permanezcan fieles a la visión original de Bitcoin Stamps.*
