---
title: "OLGA Storage Protocol"
description: "P2WSH data storage optimization providing 30-95% cost reductions for Bitcoin Stamps transactions"
leoType: "protocol"
audience: "unified"
mentions: ["olga", "p2wsh", "storage-optimization", "cost-reduction", "efficiency"]
blockHeight: 865000
culturalSignificance: "medium"
protocolType: "optimization"
---

# OLGA Storage Protocol

<SmartStructuredData />

The **OLGA Storage Protocol** is an advanced P2WSH data storage method that provides **30-95% cost reductions** for Bitcoin Stamps transactions by replacing the costly 2/3 multisig approach with efficient witness script storage.

## Key Features

- **Massive Cost Savings**: 30-95% reduction in transaction fees vs 2/3 multisig
- **Universal Compatibility**: Works across all Bitcoin Stamps protocols (SRC-20, SRC-101, SRC-721)
- **Immutable Storage**: Permanent data storage on Bitcoin using P2WSH
- **Miner Priority**: Better fee efficiency than multisig, especially at high fee rates
- **Protocol Agnostic**: Benefits all Bitcoin Stamps transaction types

## OLGA Benefits for All Users

**Automatic Cost Reduction:**
- **Storage Efficiency**: Reduce stamp creation costs by 50-80% vs multisig
- **Token Creation**: Lower fees for SRC-20 token deployment  
- **Collection Deployment**: Cheaper SRC-721 collection setup
- **Name Registration**: Reduced costs for SRC-101 name minting

**Storage Benefits:**
- **Immutable Data**: Permanent witness script storage on Bitcoin
- **Miner Friendly**: Better priority than multisig at high fee rates
- **Efficient P2WSH**: Optimal Bitcoin script structure for data
- **No Data Loss**: Complete preservation of original content

**How OLGA Works:**
1. **Create normally** using any Bitcoin Stamps interface
2. **OLGA activates automatically** during transaction creation (block 865,000+)
3. **P2WSH storage** replaces costly 2/3 multisig method
4. **Reduced fees** automatically reflected in final cost
5. **Full data** stored permanently in Bitcoin witness scripts

## Technical Implementation

For developers implementing OLGA-optimized applications:

### Storage Optimization Features
- **P2WSH Witness Scripts**: Efficient Bitcoin witness script storage
- **Automatic Optimization**: Works transparently with existing protocols
- **Universal Compatibility**: Supports all Bitcoin Stamps protocols
- **Miner Priority**: Better inclusion rates during high fee periods

### Development Resources
- **[TX-Builder SDK →](https://github.com/stampchain-io/stamps_sdk)** - OLGA integration built-in
- **[API Documentation →](/en/tutorials/api-integration)** - P2WSH storage endpoints
- **[Protocol Specs →](https://github.com/stampchain-io/stamps_sdk)** - Technical implementation details

## Storage Techniques

### P2WSH Witness Scripts
- **Witness Data**: Store data in Bitcoin witness scripts
- **Script Optimization**: Efficient opcode usage for data storage
- **Immutable Storage**: Permanent data preservation on Bitcoin
- **Miner Priority**: Better fee efficiency than multisig scripts

### Cost Optimization
- **Fee Reduction**: 30-95% savings vs 2/3 multisig approach
- **High Fee Resilience**: Better priority during network congestion
- **Efficient Encoding**: Optimal Bitcoin script structure
- **Legacy Compatibility**: Fallback to multisig when needed

### Protocol Integration
- **SRC-20**: P2WSH storage for token metadata and deployment
- **SRC-101**: Efficient witness storage for name records
- **SRC-721**: Optimized layer references using P2WSH
- **Cross-Protocol**: Universal P2WSH storage for all protocols

## Cost Reduction Examples

### Real-World Savings (vs 2/3 Multisig)

**Image Stamps:**
- **2/3 Multisig**: 24KB image = ~480,000 sats (poor miner priority)
- **OLGA P2WSH**: Same data = ~160,000 sats (better priority)
- **Savings**: 67% reduction (320,000 sats saved)

**SRC-20 Tokens:**
- **2/3 Multisig**: Token deployment = ~50,000 sats
- **OLGA P2WSH**: Same deployment = ~20,000 sats
- **Savings**: 60% reduction (30,000 sats saved)

**SRC-721 Collections:**
- **2/3 Multisig**: Collection = ~200,000 sats (penalized at high fees)
- **OLGA P2WSH**: Same collection = ~80,000 sats (better priority)
- **Savings**: 60% reduction (120,000 sats saved)

## Network Impact

### Efficiency Benefits
- **Better Fee Efficiency**: P2WSH more efficient than multisig storage
- **Improved Miner Priority**: Especially beneficial at high fee rates
- **Witness Data Storage**: Leverages Bitcoin's witness script capabilities
- **Network Compatibility**: Standard Bitcoin transaction types

### Miner Benefits
- **Higher Priority**: OLGA transactions get better inclusion priority
- **Fee Optimization**: More efficient fee-per-byte ratios
- **Reduced Penalties**: No multisig fee penalties that affected pre-OLGA stamps

## Getting Started

OLGA P2WSH storage is **automatically enabled** (block 865,000+) in all major Bitcoin Stamps tools:

**Automatic Integration:**
- **[Stampchain.io →](https://stampchain.io)** - OLGA enabled by default
- **[TX-Builder SDK →](https://github.com/stampchain-io/stamps_sdk)** - Built-in P2WSH storage
- **[Artist Tools →](/en/tutorials/artist-tools)** - Automatic optimization

**For Developers:**
- **[SDK Integration →](/en/tutorials/sdk-integration)** - OLGA configuration options
- **[API Reference →](/en/tutorials/api-integration)** - P2WSH storage endpoints
- **[Protocol Specs →](https://github.com/stampchain-io/stamps_sdk)** - Technical details

## Technical Background

**Evolution from Multisig:**
Bitcoin Stamps originally used 2/3 multisig transactions with data in 2 signature operations. This was:
- **Costly**: Higher transaction fees
- **Penalized**: Poor priority with miners, especially at high fee rates
- **Inefficient**: Suboptimal use of Bitcoin's script capabilities

**OLGA Solution (Block 865,000+):**
Based on JP Janssen's Counterparty testing, OLGA adopted P2WSH witness scripts:
- **Efficient Storage**: Data stored in witness scripts
- **Better Priority**: Improved miner inclusion, especially during high fees
- **Immutable**: Permanent, uncensorable Bitcoin storage
- **Cost Effective**: 30-95% fee reduction vs multisig

---

*OLGA makes Bitcoin Stamps more accessible through efficient P2WSH storage while maintaining the permanent, immutable nature of on-chain data.*