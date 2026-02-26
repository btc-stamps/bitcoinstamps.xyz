# bitcoinstamps.xyz - Claude Code Instructions

## Project Overview

Official Bitcoin Stamps documentation site (bitcoinstamps.xyz) with:
- **VitePress + LEO** (Large Language Model Enhanced Organization) system
- **5-language i18n**: English, Spanish, French, Chinese, Turkish
- **Cultural preservation** for KEVIN, Trinity narratives, and Rare Pepe heritage
- **Entity-driven content** with automated Schema.org structured data
- **Translation management infrastructure** for systematic multilingual coordination

**TaskMaster tag**: `bitcoinstamps.xyz` — all task operations use workspace root `.taskmaster/`

## Cultural Preservation Requirements

### KEVIN (Critical)
- KEVIN must always be referenced in ALL CAPS
- Preserve beloved community mascot status and Rare Pepe cultural heritage connections
- Reference kevinstamp.com for official KEVIN content
- Use `<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>` for all references

### Trinity Formation Narrative (Critical)
- **mikeinspace**: Always lowercase, original dreamer and visionary founder
- **Arwyn**: Standard case, orchestrator/magician behind KEVIN
- **Reinamora**: Standard case, technical architect of protocols
- Preserve Flooneybin connection story and founding narrative

### Historical Accuracy (Required)
- Block numbers and transaction hashes must be verified
- Protocol evolution timeline must be accurate
- Community metrics and statistics should be current

## LEO Entity System

**EntityMention Component**:
```markdown
<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>
<EntityMention entity="src-20">SRC-20</EntityMention>
<EntityMention entity="mikeinspace">mikeinspace</EntityMention>
```

**Available Entities**:
- Cultural Icons: `kevin`, `mikeinspace`, `arwyn`, `reinamora`, `derpherpstein`
- Protocols: `src-20`, `src-721`, `src-101`, `olga`, `bitcoin-stamps`
- Infrastructure: `counterparty`, `stampchain`
- Tools: `@btc-stamps/tx-builder`

**Entity Data Locations**:
- Primary definitions: `docs/.vitepress/api/multilingual-data.ts`
- Detection logic: `docs/.vitepress/theme/composables/useLEO.ts`
- Component rendering: `docs/.vitepress/theme/components/LEO/EntityMention.vue`

**Entity Editing** (Special Care Required):
- Cultural entities (KEVIN, Trinity) require community discussion
- Protocol entities must maintain technical accuracy
- All entity changes affect all 5 languages simultaneously

## Content Structure

**File Organization**:
```
docs/en/                    # English content (primary source of truth)
├── protocols/              # Technical protocol documentation
├── tutorials/              # Step-by-step guides
├── narratives/             # Cultural stories and history
├── community/              # Community showcase and resources
└── guide/                  # Getting started content
```

**Shared Technical Data** (auto-synchronized across languages):
```
docs/.vitepress/data/
├── protocol-milestones.yaml    # Block heights and consensus dates
├── community-metrics.yaml      # Holder counts and statistics
├── technical-specs.yaml        # Protocol versions and features
├── network-constants.yaml      # Bitcoin network constants
└── external-links.yaml         # API endpoints and resources
```

**Content Update Workflow**:
1. **English First**: All content changes start in `docs/en/` files
2. **Entity Usage**: Use EntityMention components for all entity references
3. **Cultural Validation**: Ensure KEVIN and Trinity narratives are preserved
4. Translation Management Infrastructure detects English changes and coordinates multilingual updates

## Build System (VitePress + Custom Plugins)

**Custom Build Plugins** (project-specific, not generic VitePress):
- `leo-api-validator`: Validates entity consistency before build
- `translation-management`: Handles multilingual workflow and cultural validation
- `copy-well-known`: Ensures AI discovery files are copied to `dist/` (VitePress skips dotfiles by default)

**Key Source Paths**:
- VitePress config: `docs/.vitepress/config.ts`
- LEO API generation: `docs/.vitepress/api/multilingual-data.ts`, `endpoints.ts`
- Static AI discovery: `docs/public/.well-known/ai-plugin.json` → `dist/.well-known/`

**Build Rules**:
- Never manually edit files in `dist/` — auto-generated
- All static files must go in `docs/public/` to be copied to `dist/`
- Changes to entity data require full rebuild to update all language variants

## Quality and Performance Standards

**Content Requirements**:
- Technical accuracy verified against blockchain data
- Cultural preservation maintained (KEVIN, Trinity, Rare Pepe)
- EntityMention components used for all entity references
- DualAudience components for developer/artist content
- Schema.org structured data validation

**Performance Targets**:
- Build time impact <10% for LEO system features
- Page load times <3 seconds; mobile-optimized responsive design
- Multilingual API responses <200ms

**Cultural Standards**:
- KEVIN significance and mascot status preserved
- Trinity formation story accuracy maintained
- Community values ("In Lak'ech Ala K'in") reflected
- Rare Pepe heritage connections honored; fair launch principles upheld

## Testing and Validation

**Automated Checks**:
- EntityMention component usage validation
- Cultural preservation rule enforcement
- Translation completeness verification
- Schema.org structured data validation

**Manual Verification**:
- KEVIN cultural context preservation
- Trinity narrative historical accuracy
- Protocol documentation technical correctness
- Multilingual content consistency

## Community Collaboration

**GitHub Workflow**:
- Community members edit English content via pull requests
- Maintainer review for technical and cultural accuracy
- Entity changes require special validation and community discussion
- Cultural content receives extended community review

## Do Not Touch Without Explicit Permission

- `docs/.vitepress/api/types.d.ts` — Core type definitions
- `docs/.vitepress/config.ts` — VitePress configuration
- `package.json` dependencies — Production dependencies
- `.github/workflows/` — CI/CD workflows
- `dist/` directory — Auto-generated, never edit manually
- KEVIN cultural significance or mascot status
- Trinity formation narrative accuracy (mikeinspace, Arwyn, Reinamora)
- Historical block numbers and consensus dates

## Cross-Project References

- **stampchain.io API**: Block explorer and production API — see [stampchain.io CLAUDE.md](mdc:../stampchain.io/CLAUDE.md)
- **tx-builder**: Transaction builder library used in tutorials — see [tx-builder CLAUDE.md](mdc:../tx-builder/CLAUDE.md)
- **types**: Shared TypeScript types for Bitcoin Stamps protocol entities

---

**Remember**: Bitcoin Stamps documentation serves both developers and artists while preserving the unique cultural heritage that makes this community special. Every change should honor both technical excellence and cultural authenticity.

*In Lak'ech Ala K'in* - I am you and you are me - We are all KEVIN