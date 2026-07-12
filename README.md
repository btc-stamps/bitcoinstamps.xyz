<div align="center">
  <img src="https://raw.githubusercontent.com/btc-stamps/bitcoinstamps.xyz/main/docs/assets/bitcoinstamps-docs-github-hero.png" alt="Bitcoin Stamps - Docs" width="100%">

### Bitcoin Stamps - Documentation
#### Official website documentation for the Bitcoin Stamps protocol

&nbsp;

[![Live](https://img.shields.io/badge/live-bitcoinstamps.xyz-F7931A?logo=bitcoin&logoColor=white)](https://bitcoinstamps.xyz)&nbsp;&nbsp;
[![CI - LEO API Quality Assurance](https://github.com/btc-stamps/bitcoinstamps.xyz/actions/workflows/ci.yml/badge.svg)](https://github.com/btc-stamps/bitcoinstamps.xyz/actions/workflows/ci.yml)&nbsp;&nbsp;
[![Deploy to Cloudflare Pages](https://github.com/btc-stamps/bitcoinstamps.xyz/actions/workflows/deploy-cloudflare.yml/badge.svg)](https://github.com/btc-stamps/bitcoinstamps.xyz/actions/workflows/deploy-cloudflare.yml)&nbsp;&nbsp;
[![License: MIT](https://img.shields.io/badge/license-MIT-F7931A)](LICENSE)


&nbsp;

---

</div> 
&nbsp;

## 📋 Overview

The docs site for [Bitcoin Stamps](https://bitcoinstamps.xyz), unprunable data storage on Bitcoin's UTXO set. Built with [VitePress](https://vitepress.dev) and published in 7 languages (en, es, fr, zh, tr, pt, cs). It serves both developers and artists, with automated Schema.org generation for AI discoverability and cultural preservation of community context (yes, KEVIN is detected automatically).

**Live site:** [bitcoinstamps.xyz](https://bitcoinstamps.xyz) · **Dev preview:** [dev.bitcoinstamps.xyz](https://dev.bitcoinstamps.xyz)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Documentation Structure

- **Guide**: introduction and getting started
- **Developers**: API reference, SDK docs, and technical specs
- **Artists**: creative tutorials and beginner-friendly guides
- **Protocols**: SRC-20, SRC-101, SRC-721, SRC-721r, and OLGA specifications
- **Community**: contribution guidelines and community resources

## Protocol Coverage

| Standard | What it covers |
|----------|----------------|
| **SRC-20** | Fungible tokens, with block 796,000 enhancements |
| **SRC-101** | Decentralized naming system |
| **SRC-721** | Non-fungible token standard for Stamps |
| **SRC-721r** | Recursion standard allowing stamps to reference and combine multiple stamps |
| **OLGA** | P2WSH encoding optimization for all protocols |

## Bitcoin Art Theme

Custom VitePress theme with Bitcoin-inspired aesthetics:

- Bitcoin orange (#F7931A) and gold (#FFD700) color scheme
- Professional typography for both technical and creative content
- Responsive design supporting developer and artist workflows
- Dark/light mode with Bitcoin-themed styling

## Smart LEO Architecture

Intelligent AI discoverability with minimal maintenance: simple frontmatter plus content produces full Schema.org output, no manual LEO work.

- **Intelligent Schema.org generation**: automated entity detection (80% maintenance reduction)
- **Cultural preservation**: automatic KEVIN and community context recognition
- **Economic narrative integration**: Bitcoin network benefits woven throughout the docs

Key components:

- `<SmartStructuredData />`: zero-config automatic Schema.org generation
- `<EntityMention entity="kevin" />`: entity linking with cultural enhancement
- `useLEO()` composable: content analysis and entity detection

## Internationalization

The site ships in 7 languages: English (source), Spanish, French, Chinese, Turkish, Portuguese, and Czech.

Non-English locales (`docs/es`, `docs/fr`, `docs/zh`, `docs/tr`, ...) can silently fall behind the `docs/en` source as en is enriched. To surface that drift, CI runs a **warn-only** freshness gate:

```bash
npm run i18n:freshness            # human-readable per-locale drift report
npm run i18n:freshness -- --json  # machine-readable report
```

For each en page it checks every locale counterpart and classifies it as `OK`, `MISSING`, `ABRIDGED` (materially fewer sections), `STALE` (abridged **and** en was git-modified much more recently), or `DIVERGENT` (a structurally different, usually much larger, tree). Locales are auto-discovered from `docs/<loc>/index.md`, so new languages are covered automatically. The gate (`scripts/check-i18n-freshness.mjs`, the `i18n-freshness` CI job) is **non-blocking**: translations legitimately lag the source, so it reports drift as a CI `::warning::` plus job summary rather than failing the build.

## Contributing

We welcome contributions from both developers and artists.

1. Branch from `main` and open a pull request against `main` (flat workflow, squash merge)
2. CI must pass before merge (LEO validation, build checks)
3. Merges to `main` deploy automatically to Cloudflare Pages

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow, and the site's [contribution guidelines](https://bitcoinstamps.xyz/en/community/contributing) for content standards.

## Deployment

Pushes to `main` trigger the [Deploy to Cloudflare Pages](https://github.com/btc-stamps/bitcoinstamps.xyz/actions/workflows/deploy-cloudflare.yml) workflow, which builds the site and publishes it to production at [bitcoinstamps.xyz](https://bitcoinstamps.xyz).

## Ecosystem

- [bitcoinstamps.xyz](https://bitcoinstamps.xyz): this docs site, live
- [stampchain.io](https://stampchain.io): block explorer and API ([repo](https://github.com/stampchain-io/stampchain.io), [API docs](https://stampchain.io/docs))
- [btc_stamps](https://github.com/stampchain-io/btc_stamps): reference indexer
- [tx-builder](https://github.com/btc-stamps/tx-builder): transaction builder library
- Org profiles: [btc-stamps](https://github.com/btc-stamps) (tooling) · [stampchain-io](https://github.com/stampchain-io) (protocol and indexer)

## License

MIT License, see [LICENSE](LICENSE) for details.

&nbsp;

---

<div align="center">

Built with Bitcoin 🧡 Permanent by design

</div>
