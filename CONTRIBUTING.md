# Contributing to Bitcoin Stamps

The Bitcoin Stamps community welcomes contributors who embrace **"In Lak'ech Ala K'in"** — we build together as one decentralized art ecosystem.

## Core Values

- **Artistic Authenticity**: Genuine creative expression
- **Fair Distribution**: No pre-mines or insider advantages
- **Community First**: Decisions benefit everyone
- **Permanent Culture**: Building lasting value on Bitcoin

**Cultural elements to preserve**: KEVIN's cultural significance, "In Lak'ech Ala K'in" philosophy, fair launch principles, and historical accuracy.

## Ways to Contribute

### Documentation & Translations

This project powers [bitcoinstamps.xyz](https://bitcoinstamps.xyz). The biggest need right now is **translation help** — English content is complete (28 pages) but other languages need contributors:

| Language | Coverage | Help Needed |
|----------|----------|-------------|
| English | 100% | Review & updates |
| Turkish | 43% | Translation |
| Chinese | 21% | Translation |
| Spanish | 18% | Translation |
| French | 18% | Translation |

To contribute translations:
1. Fork this repository
2. Copy the English page from `docs/en/` to the target language directory (e.g., `docs/es/`)
3. Translate the content, preserving frontmatter and component tags
4. Submit a pull request

### Developers

- **Protocol tooling**: Build on [tx-builder](https://github.com/btc-stamps/tx-builder) or contribute to the [indexer](https://github.com/stampchain-io/btc_stamps)
- **Documentation improvements**: Fix errors, improve examples, add code samples
- **LEO system**: Enhance AI discoverability and Schema.org structured data
- **Infrastructure**: CI/CD, build system, testing

### Artists

- **Create Bitcoin Stamps**: Use the <100KB constraint as creative opportunity
- **Build on culture**: Reference existing community symbols and narratives
- **Fair token launches**: Follow KEVIN's example — no pre-mines

### Writers

- **Technical docs**: Serve both developers and artists
- **Cultural context**: Include community values in technical content
- **Historical accuracy**: Preserve facts, block numbers, and attributions

## Getting Started

### Prerequisites

- Node.js 18+
- Git

### Local Development

```bash
# Clone and install
git clone https://github.com/btc-stamps/bitcoin-stamps-docs.git
cd bitcoin-stamps-docs
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

### Project Structure

```
docs/
├── en/                     # English content (primary)
│   ├── protocols/          # SRC-20, SRC-721, SRC-101, OLGA specs
│   ├── tutorials/          # Step-by-step guides
│   ├── narratives/         # Cultural stories and history
│   ├── community/          # Community resources
│   └── guide/              # Getting started
├── es/, fr/, zh/, tr/      # Translations (same structure)
├── .vitepress/
│   ├── config.ts           # VitePress configuration
│   ├── api/                # LEO API generation system
│   └── theme/              # Custom Bitcoin art theme
└── public/                 # Static assets and API files
```

## Pull Request Process

1. **English first**: Content changes start in `docs/en/` files
2. **Use EntityMention components** for entity references (KEVIN, protocols, people)
3. **Preserve cultural context**: KEVIN in ALL CAPS, Trinity narrative accuracy
4. **Test your build**: Run `npm run docs:build` before submitting
5. **Small PRs**: Focused changes are easier to review

## Quality Standards

**Technical**: Clean code, Bitcoin security model compliance, peer review

**Content**: Historical accuracy, proper cultural references, clear communication

**Cultural**: KEVIN significance preserved, Trinity formation narrative accurate, fair launch principles upheld

## Code of Conduct

- Respect for all community members
- Authentic interactions over speculation
- "In Lak'ech Ala K'in" spirit in all collaboration

## Resources

- [bitcoinstamps.xyz](https://bitcoinstamps.xyz) — Live documentation
- [stampchain.io](https://stampchain.io) — Explorer and minting tools
- [API Documentation](https://stampchain.io/docs) — OpenAPI reference
- [Telegram](https://t.me/BitcoinStamps) — Community chat
- [kevinstamp.com](https://kevinstamp.com) — Learn KEVIN's story

---

*"We are all Kevin. We build together."*
