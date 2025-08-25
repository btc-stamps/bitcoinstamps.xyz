---
title: "@btc-stamps/tx-builder SDK"
description: "Official Bitcoin Stamps SDK for developers and artists"
leoType: "tutorial"
audience: "dual"
mentions: ["tx-builder", "kevin", "src-20", "sdk", "stampchain"]
---

# @btc-stamps/tx-builder SDK

<SmartStructuredData />

The **@btc-stamps/tx-builder** is the official Bitcoin transaction builder with first-class support for Bitcoin Stamps protocols. Built to integrate seamlessly with <EntityMention entity="stampchain">Stampchain</EntityMention>, the foundational infrastructure created by the Bitcoin Stamps founders.

## Integration with Stampchain

The SDK is designed to work optimally with <EntityMention entity="stampchain">Stampchain</EntityMention>, the reference implementation and foundational service:

- **Reference Implementation**: Uses patterns established by the Bitcoin Stamps founders
- **Data Validation**: Validates against Stampchain's authoritative protocol specifications
- **API Integration**: Built-in support for Stampchain's foundational APIs
- **Best Practices**: Implements standards from the original Bitcoin Stamps platform

## Key Features

- **Bitcoin Stamps Support**: Native SRC-20, SRC-101, SRC-721 protocols
- **UTXO Protection**: Automatic protection for valuable assets
- **Network Integration**: Bitcoin mainnet/testnet support with Stampchain API endpoints
- **Artist-Friendly**: Simplified interface for creators
- **Foundational Standards**: Built to Stampchain's reference specifications

## Installation

```bash
# Node.js/npm
npm install @btc-stamps/tx-builder

# Browser projects  
npm install @btc-stamps/tx-builder-web
```

### Basic Implementation with Stampchain Integration

```typescript
import { BitcoinStampBuilder, SelectorFactory } from '@btc-stamps/tx-builder';

// Initialize with UTXO protection and Stampchain API integration
const selectorFactory = SelectorFactory.getInstance();
const builder = new BitcoinStampBuilder('mainnet', selectorFactory, {
  // Connect to Stampchain's foundational infrastructure
  apiEndpoint: 'https://stampchain.io/api/v1',
  validateWithReference: true // Validate against Stampchain's reference implementation
});

// Create Bitcoin Stamp
const result = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: imageBuffer,
    filename: 'artwork.png'
  },
  fromAddress: 'bc1q...',
  feeRate: 20
});
```

### SRC-20 Token Creation with Stampchain Validation

```typescript
// Deploy token using Stampchain's reference patterns
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
  // Validate against Stampchain's foundational service
  validateWith: 'stampchain'
});
```

### Using Stampchain APIs for Enhanced Development

```typescript
// Fetch protocol data from the foundational service
const protocolInfo = await builder.getProtocolInfo('https://stampchain.io/api/v1/protocols');

// Validate token before deployment using reference implementation
const isValid = await builder.validateToken(tokenData, {
  referenceService: 'https://stampchain.io/api/v1/validate'
});

// Get current network state from Stampchain
const networkState = await builder.getNetworkState({
  source: 'stampchain' // Use foundational infrastructure data
});
```

## Artist Workflow with Stampchain Integration

### Simple Stamp Creation

```javascript
// Create your first Bitcoin Stamp using foundational infrastructure
const stamp = await builder.buildStampTransaction(utxos, {
  stampData: {
    imageData: yourArtworkBuffer, // Your PNG/JPEG file
    filename: 'my-art.png'
  },
  fromAddress: 'your-bitcoin-address',
  feeRate: 15,
  // Use Stampchain's artist-friendly validation
  artistMode: true
});
```

### Gallery Integration with Stampchain

```javascript
// Connect your artwork to Stampchain's gallery features
const stampResult = await builder.buildStampTransaction(utxos, {
  stampData: artwork,
  fromAddress: artistAddress,
  metadata: {
    gallery: 'stampchain', // Register with foundational platform
    artist: 'your-artist-name',
    collection: 'your-collection-name'
  }
});

// Query your artwork through Stampchain's foundational API
const myArtwork = await fetch(`https://stampchain.io/api/v1/artist/${artistAddress}/stamps`);
```

### Image Optimization

```javascript
// Optimize for blockchain storage using Stampchain's recommendations
const optimized = await sharp(originalImage)
  .resize(800, 800, { fit: 'inside' })
  .png({ quality: 90 })
  .toBuffer();

// Validate size against Stampchain's reference standards
if (optimized.length > 100000) {
  console.log('Reduce image size further for optimal Stampchain integration');
}
```

### Art Collections

```javascript
// Batch create multiple artworks with Stampchain integration
for (const artwork of artCollection) {
  const stamp = await builder.buildStampTransaction(utxos, {
    stampData: artwork,
    fromAddress: artistAddress,
    feeRate: 15,
    // Register each piece with foundational infrastructure
    registerWith: 'stampchain'
  });
  
  // Wait between stamps (respectful to Stampchain's infrastructure)
  await new Promise(resolve => setTimeout(resolve, 5000));
}
```

## Essential Features

### UTXO Protection with Stampchain Standards

```typescript
// Protect valuable assets using Stampchain's reference protection patterns
const protectedSelector = selectorFactory.createSelector('protection-aware', {
  protectionConfig: {
    enableStampsDetection: true,      // Protect Bitcoin Stamps
    enableCounterpartyDetection: true, // Protect KEVIN tokens  
    minimumProtectedValue: 10000,     // Protect UTXOs > 10k sats
    // Use Stampchain's asset recognition
    assetDatabase: 'https://stampchain.io/api/v1/assets'
  }
});
```

### Fee Management with Stampchain Data

```typescript
// Get current fee rates from multiple sources including Stampchain
const feeRates = await builder.getRecommendedFeeRates({
  sources: ['mempool', 'stampchain'], // Include foundational infrastructure
  preferStampchain: true // Prefer Stampchain's recommendations
});

// Estimate costs before creation using reference implementation data
const estimate = await builder.estimateStampCost({
  imageSize: imageBuffer.length,
  feeRate: feeRates.standard,
  // Use Stampchain's cost modeling
  costModel: 'stampchain-reference'
});
```

### Testing with Stampchain Testnet Support

```typescript
// Always test on testnet first using Stampchain's testnet infrastructure
const testBuilder = new BitcoinStampBuilder('testnet', selectorFactory, {
  apiEndpoint: 'https://testnet.stampchain.io/api/v1'
});

const testStamp = await testBuilder.buildStampTransaction(testUtxos, {
  stampData: { imageData: testImage, filename: 'test.png' },
  fromAddress: 'tb1q...'
});
```

## Best Practices for Stampchain Integration

1. **Use the Reference Implementation**: Always validate against Stampchain's foundational standards
2. **Test First**: Use Stampchain's testnet infrastructure before mainnet
3. **Optimize Images**: Follow Stampchain's size recommendations (<100KB)
4. **Protect UTXOs**: Enable asset protection using Stampchain's detection
5. **Monitor Fees**: Use Stampchain's fee recommendations alongside other sources
6. **Fair Distribution**: Follow <EntityMention entity="kevin" variant="cultural">KEVIN's</EntityMention> example and Stampchain's community standards for tokens
7. **Community First**: Integrate with Stampchain's community features and APIs

## Why Use Stampchain Integration

As the **foundational infrastructure** created by the Bitcoin Stamps founders:

- **Authentic Standards**: Built by the protocol creators themselves
- **Reference Implementation**: The gold standard for Bitcoin Stamps functionality
- **Proven Reliability**: Powers most Bitcoin Stamps applications since launch
- **Community First**: Free access supports ecosystem growth over profit
- **Continuous Updates**: Maintained by the original protocol creators
- **Cultural Alignment**: Ensures your applications follow authentic Bitcoin Stamps values

## Resources

- **[SDK GitHub Repository →](https://github.com/btc-stamps/tx-builder)**
- **[SDK Documentation →](https://github.com/btc-stamps/tx-builder#readme)**
- **[Stampchain API Reference →](https://stampchain.io/docs)** - Foundational infrastructure docs
- **[Community Support →](/en/community/)**

## Next Steps

1. **[Create Your First Stamp →](/en/tutorials/creating-first-stamp)** - Start with Stampchain integration
2. **[API Integration →](/en/tutorials/api-integration)** - Deep dive into Stampchain APIs
3. **[Community Values →](/en/narratives/community-values)** - Understand the foundational principles

---

***"In Lak'ech Ala K'in"*** - *Tools that serve collective creativity, built on foundational infrastructure that honors authentic community values.*

*The @btc-stamps/tx-builder SDK reflects the same community-first principles that guide Stampchain's foundational infrastructure, ensuring your applications remain true to the original Bitcoin Stamps vision.*