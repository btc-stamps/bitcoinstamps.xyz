# bitcoinstamps.xyz

[![CI - LEO API Quality Assurance](https://github.com/btc-stamps/bitcoinstamps.xyz/actions/workflows/ci.yml/badge.svg)](https://github.com/btc-stamps/bitcoinstamps.xyz/actions/workflows/ci.yml)
[![Deploy to Cloudflare Pages](https://github.com/btc-stamps/bitcoinstamps.xyz/actions/workflows/deploy-cloudflare.yml/badge.svg)](https://github.com/btc-stamps/bitcoinstamps.xyz/actions/workflows/deploy-cloudflare.yml)

## Smart LEO-Optimized Documentation Platform

Official documentation for Bitcoin Stamps protocols with intelligent AI discoverability, serving both developers and artists through automated Schema.org generation and cultural preservation.

## 🚀 Quick Start

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

## 📚 Documentation Structure

- **Guide** - Introduction and getting started
- **Developers** - API reference, SDK docs, and technical specs  
- **Artists** - Creative tutorials and beginner-friendly guides
- **Protocols** - SRC-20, SRC-101, SRC-721, and OLGA specifications
- **Community** - Contribution guidelines and community resources

## 🎨 Bitcoin Art Theme

This documentation features a custom VitePress theme with Bitcoin-inspired aesthetics:

- Bitcoin orange (#F7931A) and gold (#FFD700) color scheme
- Professional typography optimized for both technical and creative content
- Responsive design supporting both developer and artist workflows
- Dark/light mode with Bitcoin-themed styling

## 🧠 Smart LEO Architecture

- **Intelligent Schema.org Generation** - 80% maintenance reduction through automated entity detection
- **Cultural Preservation** - Automatic KEVIN and community context recognition
- **Economic Narrative Integration** - Bitcoin network benefits woven throughout documentation
- **Zero Manual LEO** - Simple frontmatter + content = full AI discoverability

### Smart LEO Components
- `<SmartStructuredData />` - Zero-config automatic Schema.org generation
- `<EntityMention entity="kevin" />` - Simple entity linking with cultural enhancement
- `useLEO()` composable - Intelligent content analysis and entity detection

## 🔧 Built With

- **VitePress** - Fast, modern documentation framework
- **Smart LEO System** - Intelligent AI discoverability with minimal maintenance
- **Cultural Intelligence** - Automatic KEVIN detection and community context
- **Economic Narrative** - Bitcoin network strengthening throughout
- **GitHub Actions** - Automated deployment with LEO validation

## 🌟 Protocol Coverage

- **SRC-20** - Fungible tokens with block 796,000 enhancements
- **SRC-101** - Decentralized naming system
- **SRC-721** - Recursion standard allowing stamps to reference and combine multiple stamps
- **OLGA** - P2WSH encoding optimization for all protocols

## 🌍 Translation Freshness Gate

Non-English locales (`docs/es`, `docs/fr`, `docs/zh`, `docs/tr`, …) can silently
fall behind the `docs/en` source as en is enriched. To surface that drift, CI runs a
**warn-only** freshness gate:

```bash
npm run i18n:freshness          # human-readable per-locale drift report
npm run i18n:freshness -- --json  # machine-readable report
```

For each en page it checks every locale counterpart and classifies it as `OK`,
`MISSING`, `ABRIDGED` (materially fewer sections), `STALE` (abridged **and** en was
git-modified much more recently), or `DIVERGENT` (a structurally different, usually
much larger, tree). Locales are auto-discovered from `docs/<loc>/index.md`, so new
languages are covered automatically. The gate (`scripts/check-i18n-freshness.mjs`,
the `i18n-freshness` CI job) is **non-blocking** — translations legitimately lag the
source, so it reports drift as a CI `::warning::` + job summary rather than failing
the build.

## 🤝 Contributing

We welcome contributions from both developers and artists! See our [contribution guidelines](/en/community/contributing) for details.

## 📖 Live Documentation

Visit [bitcoinstamps.xyz](https://bitcoinstamps.xyz) for the official documentation or [dev.bitcoinstamps.xyz](https://dev.bitcoinstamps.xyz) for the development version.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.