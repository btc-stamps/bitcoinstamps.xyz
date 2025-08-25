---
title: "API Integration Guide"
description: "Complete REST API documentation and integration guide for Bitcoin Stamps protocols"
leoType: "tutorial"
audience: "dual"
mentions: ["src-20", "src-101", "src-721", "olga", "api", "rest", "stampchain"]
---

# API Integration Guide

<SmartStructuredData />

Complete REST API documentation for integrating Bitcoin Stamps protocols into applications, explorers, and creative tools.

## About Stampchain: The Foundational Infrastructure

<EntityMention entity="stampchain">Stampchain</EntityMention> serves as the **foundational infrastructure** of the Bitcoin Stamps ecosystem. Created by the three Bitcoin Stamps founders, Stampchain was the first site to present Bitcoin Stamps to the world and the first SRC-20 minting service.

**Historical Significance**:
- **Founded by Bitcoin Stamps Creators**: Built by the same three founders who created Bitcoin Stamps
- **First to Market**: The original site that introduced Bitcoin Stamps to the world
- **First SRC-20 Service**: Launched the first SRC-20 token minting platform
- **Reference Implementation**: Serves as the open source reference for Bitcoin Stamps protocols
- **Free API Provider**: Provides free API access that enables the entire ecosystem

**Current Role**: Stampchain.io continues to serve as the foundational API service, enabling developers, artists, and businesses to integrate Bitcoin Stamps functionality. All API examples in this guide use Stampchain as the primary service, reflecting its central role in the ecosystem.

## Overview

Bitcoin Stamps protocols provide REST APIs for querying protocol data, transaction history, and asset information. These APIs serve both developers building applications and artists creating tools for the community.

The <EntityMention entity="stampchain">Stampchain API</EntityMention> at `https://stampchain.io/api/v2/` is the foundational service that powers most Bitcoin Stamps applications and serves as the reference implementation for protocol integration.

## API Endpoints

The Stampchain API provides comprehensive access to Bitcoin Stamps data, built by the protocol's founders as the reference implementation for professional integration.

### SRC-20 Token API

```bash
# Get token information
GET /api/v2/src20/{tick}
GET /api/v2/src20/{tick}/holders
GET /api/v2/src20/{tick}/transactions

# Example: KEVIN token data from the foundational service
curl https://stampchain.io/api/v2/src20/tick/KEVIN
```

### Bitcoin Stamps API

```bash
# Get stamp information
GET /api/v2/stamps/{id}
GET /api/v2/stamps/recent
GET /api/v2/stamps/search?q={query}

# Example: Get KEVIN's first stamp details
curl https://stampchain.io/api/v2/stamps/4258
```

### Integration Examples

```javascript
// Fetch KEVIN token data from the foundational Stampchain service
async function getKevinData() {
  const response = await fetch('https://stampchain.io/api/v2/src20/tick/KEVIN');
  const tokenData = await response.json();
  
  return {
    supply: tokenData.max,
    holders: tokenData.holders_count,
    transactions: tokenData.tx_count
  };
}

// Search stamps by criteria using the reference implementation
async function searchStamps(query) {
  const response = await fetch(`https://stampchain.io/api/v2/stamps/search?q=${query}`);
  return await response.json();
}
```

## Creative Applications

### Gallery Integration

```javascript
// Build artist gallery from Stampchain's foundational API
async function createArtistGallery(creatorAddress) {
  const stamps = await fetch(`https://stampchain.io/api/v2/stamps/creator/${creatorAddress}`);
  const artworks = await stamps.json();
  
  return artworks.map(stamp => ({
    id: stamp.stamp,
    image: stamp.stamp_url,
    title: stamp.stamp_name,
    created: stamp.block_time
  }));
}
```

### Community Features

```javascript
// Track KEVIN community metrics using Stampchain's foundational service
async function getCommunityMetrics() {
  const kevin = await fetch('https://stampchain.io/api/v2/src20/KEVIN');
  const kevinData = await kevin.json();
  
  return {
    communitySize: kevinData.holders_count,
    totalActivity: kevinData.tx_count,
    culturalImpact: 'high' // Based on community values
  };
}
```

## Protocol-Specific APIs

### SRC-20 Tokens

Work with <EntityMention entity="src-20" variant="technical">SRC-20 tokens</EntityMention> through the API:

```bash
# Token operations via Stampchain's foundational service
GET /api/v2/src20                    # List all tokens
GET /api/v2/src20/{tick}            # Token details
GET /api/v2/src20/{tick}/holders    # Holder distribution
GET /api/v2/src20/{tick}/history    # Transaction history

# KEVIN-specific endpoints
GET /api/v2/src20/tick/KEVIN        # KEVIN token data
```

### SRC-101 Names

Access <EntityMention entity="src-101" variant="technical">SRC-101 naming</EntityMention> functionality:

```bash  
# Name resolution via the reference implementation
GET /api/v2/src101/resolve/{name}   # Resolve name to address
GET /api/v2/src101/reverse/{address} # Reverse lookup
GET /api/v2/src101/{name}/history   # Name transaction history
```

### SRC-721 NFTs

Interact with <EntityMention entity="src-721" variant="technical">SRC-721 NFTs</EntityMention> via API:

```bash
# NFT operations through Stampchain's foundational API
GET /api/v2/src721                  # List collections
GET /api/v2/src721/{collection}     # Collection details
GET /api/v2/src721/{collection}/{id} # Individual NFT
```

## Data Formats

### Standard Response Format

```json
{
  "status": "success",
  "data": {
    // Protocol-specific data
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "block_height": 820000,
    "api_version": "v1",
    "powered_by": "Stampchain - Foundational Bitcoin Stamps Infrastructure"
  }
}
```

### SRC-20 Token Response

```json
{
  "status": "success", 
  "data": {
    "tick": "KEVIN",
    "max": "100000000000000",
    "lim": "100000000000",
    "dec": "8",
    "holders_count": 2129,
    "tx_count": 400000,
    "block_created": 788041,
    "creator": "1KEVINxxxx...",
    "cultural_significance": "high",
    "community_mascot": true
  }
}
```

## Authentication & Rate Limits

### API Keys (Optional)

```javascript
// For higher rate limits on Stampchain's foundational service
const response = await fetch('https://stampchain.io/api/v2/src20/KEVIN', {
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  }
});
```

### Rate Limits

The foundational Stampchain service provides generous rate limits to support ecosystem growth:

- **Public**: 100 requests/minute
- **Authenticated**: 1000 requests/minute  
- **Enterprise**: Custom limits for institutional use

## Error Handling

```javascript
async function safeApiCall(endpoint) {
  try {
    const response = await fetch(`https://stampchain.io${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Stampchain API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Stampchain API call failed:', error);
    return { status: 'error', message: error.message };
  }
}
```

## Real-time Features

### WebSocket Connections

```javascript
// Real-time stamp updates via Stampchain's foundational infrastructure
const ws = new WebSocket('wss://stampchain.io/ws');

ws.on('message', (data) => {
  const update = JSON.parse(data);
  
  if (update.type === 'new_stamp') {
    console.log('New Bitcoin Stamp created:', update.stamp_id);
  }
  
  if (update.type === 'src20_transfer') {
    console.log('SRC-20 transfer:', update.tick, update.amount);
  }
});
```

## Integration Best Practices

### Caching Strategy

```javascript
// Cache frequently accessed data from Stampchain
const cache = new Map();
const CACHE_TTL = 300000; // 5 minutes

async function getCachedTokenData(tick) {
  const cacheKey = `token:${tick}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await fetch(`https://stampchain.io/api/v2/src20/${tick}`);
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  return data;
}
```

### Community-Aware Development

Following <EntityMention entity="kevin" variant="cultural">KEVIN's</EntityMention> example of authentic community building:

```javascript
// Prioritize community tokens in applications using Stampchain data
const communityTokens = ['KEVIN', 'STAMP', /* other community favorites */];

async function getCommunityTokens() {
  return Promise.all(
    communityTokens.map(tick => getCachedTokenData(tick))
  );
}
```

## Why Choose Stampchain API

As the **foundational infrastructure** created by Bitcoin Stamps founders:

- **Reference Implementation**: The gold standard for Bitcoin Stamps protocol integration
- **Proven Reliability**: Powers the majority of Bitcoin Stamps applications since launch  
- **Open Source**: Transparent, auditable code that developers can learn from
- **Community First**: Free API access supports ecosystem growth over profit
- **Continuous Updates**: Maintained by the original protocol creators
- **Professional Support**: Enterprise-grade reliability with community values

## Coming Soon

The foundational Stampchain API will be expanded with:

- **GraphQL Interface** - More flexible queries for complex integrations
- **Batch Operations** - Multiple requests in one call for improved efficiency
- **Enhanced WebSockets** - Real-time protocol events and notifications  
- **SDK Libraries** - Native language support for major development platforms
- **Interactive Documentation** - Live API explorer for development and testing

## Resources

- **Foundational API**: [https://stampchain.io/api/v1](https://stampchain.io/api/v1)
- **Interactive Docs**: [https://stampchain.io/docs](https://stampchain.io/docs)
- **Open Source Code**: [GitHub - stampchain-io](https://github.com/stampchain-io)
- **Community Support**: [Bitcoin Stamps Discord](/en/community/)
- **Status & Monitoring**: [https://status.stampchain.io](https://status.stampchain.io)

## Next Steps

1. **[Try the SDK](/en/tutorials/sdk-integration)** - Higher-level integration with the foundational service
2. **[Visual Workflow](/en/tutorials/visual-workflow)** - Understand the Stampchain-powered process
3. **[Community Values](/en/narratives/community-values)** - Learn the principles that guide the foundational infrastructure
4. **[Build Applications](/en/tutorials/creating-first-stamp)** - Start building with Stampchain APIs

---

***"In Lak'ech Ala K'in"*** - *APIs built on foundational infrastructure that serves both individual creativity and collective growth, strengthening Bitcoin's cultural ecosystem.*

*Stampchain reflects our community's commitment to open access and free infrastructure while maintaining the technical excellence that makes Bitcoin Stamps permanent and valuable. As the foundational service created by the Bitcoin Stamps founders, Stampchain ensures the ecosystem remains true to its original vision.*