# bitcoinstamps.xyz - Claude Code Instructions

## Project Overview

This is the official Bitcoin Stamps documentation site (bitcoinstamps.xyz) featuring:
- **VitePress documentation site** with custom LEO (Large Language Model Enhanced Organization) system
- **Multilingual support** for 5 languages (English, Spanish, French, Chinese, Turkish)
- **Cultural preservation system** for KEVIN, Trinity narratives, and Rare Pepe heritage
- **Entity-driven content** with automated Schema.org structured data
- **Translation management infrastructure** for systematic multilingual coordination

## Task Master AI Integration

**Task management is handled at the workspace root level.**
- TaskMaster tag: `bitcoinstamps.xyz`
- All task operations use workspace root `.taskmaster/` (NOT a local .taskmaster)
- See workspace-level [.taskmaster/CLAUDE.md](mdc:../../.taskmaster/CLAUDE.md) for workflow commands

## Project-Specific Guidelines

### Cultural Preservation Requirements

**KEVIN Cultural Protection** (Critical):
- KEVIN must always be referenced in ALL CAPS
- Preserve beloved community mascot status
- Maintain Rare Pepe cultural heritage connections
- Reference kevinstamp.com for official KEVIN content
- Use `<EntityMention entity="kevin" variant="cultural">KEVIN</EntityMention>` for all references

**Trinity Formation Narrative** (Critical):
- **mikeinspace**: Always lowercase, original dreamer and visionary founder
- **Arwyn**: Standard case, orchestrator/magician behind KEVIN
- **Reinamora**: Standard case, technical architect of protocols
- Preserve Flooneybin connection story and founding narrative

**Historical Accuracy** (Required):
- Block numbers and transaction hashes must be verified
- Protocol evolution timeline must be accurate
- Community metrics and statistics should be current

### Entity System Guidelines

**EntityMention Component Usage**:
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

### Content Structure Guidelines

**File Organization**:
```
docs/en/                    # English content (primary)
├── protocols/              # Technical protocol documentation  
├── tutorials/              # Step-by-step guides
├── narratives/             # Cultural stories and history
├── community/              # Community showcase and resources
└── guide/                  # Getting started content
```

**Shared Technical Data** (Auto-synchronized across languages):
```
docs/.vitepress/data/
├── protocol-milestones.yaml    # Block heights and consensus dates
├── community-metrics.yaml      # Holder counts and statistics
├── technical-specs.yaml        # Protocol versions and features
├── network-constants.yaml      # Bitcoin network constants
└── external-links.yaml         # API endpoints and resources
```

### Development Workflow

**Content Updates**:
1. **English First**: All content changes start in `docs/en/` files
2. **Entity Usage**: Use EntityMention components for all entity references
3. **Cultural Validation**: Ensure KEVIN and Trinity narratives are preserved
4. **Build Testing**: Always test with `npm run build` before committing

**Translation Workflow**:
1. **Automatic Detection**: Translation Management Infrastructure detects English changes
2. **Cultural Preservation**: Automated validation for KEVIN and Trinity content
3. **Manual Coordination**: Use workflow management for systematic translation
4. **Community Review**: Community validation for cultural accuracy

**Entity Editing** (Special Care Required):
- Review entity editing guidelines before making changes
- Cultural entities (KEVIN, Trinity) require community discussion
- Protocol entities must maintain technical accuracy
- All entity changes affect 5 languages simultaneously

### Build System and File Generation

**Build Architecture**:
The project uses VitePress with custom plugins for automated file generation and AI agent optimization.

**Build Commands**:
```bash
# Development server
npm run docs:dev

# Production build (generates dist/ directory)
npm run docs:build

# Build preview
npm run docs:preview

# Build with testing
npm run build:with-test

# Entity validation (development)
node dev/validate-multilingual-api.js
```

**Generated Files Structure**:
```
dist/                           # Build output (auto-generated, gitignored)
├── .well-known/               # AI agent discovery
│   └── ai-plugin.json         # OpenAI plugin manifest
├── api/                       # Generated API endpoints
│   ├── entities.json          # LEO entity data (multilingual)
│   ├── protocols.json         # Protocol specifications
│   ├── schema.json           # Schema.org structured data
│   ├── consensus-blocks.json  # Consensus milestone data
│   └── [entity-name].json    # Individual entity files
├── en/, es/, fr/, zh/, tr/   # Multilingual HTML pages
└── assets/                   # Bundled CSS/JS assets
```

**Source File Locations**:
```
docs/
├── public/                    # Static files copied to dist/
│   ├── .well-known/          # AI discovery files
│   │   └── ai-plugin.json    # → dist/.well-known/ai-plugin.json
│   └── api/                  # Static API data
│       └── consensus-blocks.json # → dist/api/consensus-blocks.json
├── .vitepress/
│   ├── config.ts             # Build configuration with custom plugins
│   ├── api/                  # LEO API generation system
│   │   ├── multilingual-data.ts # Entity definitions
│   │   └── endpoints.ts      # API file generation
│   └── theme/                # Custom VitePress theme
└── en/, es/, fr/, zh/, tr/   # Multilingual markdown content
```

**Build Process Flow**:
1. **LEO API System**: Generates entity data from markdown frontmatter and components
2. **Translation Management**: Processes multilingual content and cultural validation
3. **Static File Copy**: Copies files from `docs/public/` to `dist/`
4. **Well-Known Plugin**: Ensures `.well-known/` directory is properly copied (VitePress doesn't handle dotfiles by default)
5. **VitePress Build**: Generates HTML pages and bundles assets

**Custom Build Plugins**:
- `leo-api-validator`: Validates entity consistency before build
- `translation-management`: Handles multilingual workflow and cultural validation
- `copy-well-known`: Ensures AI discovery files are copied to dist/

**Important Notes**:
- Never manually edit files in `dist/` - they are auto-generated
- All static files must go in `docs/public/` to be copied to `dist/`
- Changes to entity data require full rebuild to update all language variants
- Build process includes cultural preservation validation for KEVIN and Trinity narratives

### Quality Standards

**Content Requirements**:
- Technical accuracy verified against blockchain data
- Cultural preservation maintained (KEVIN, Trinity, Rare Pepe)
- EntityMention components used for all entity references
- DualAudience components for developer/artist content
- Schema.org structured data validation

**Performance Requirements**:
- Build time impact <10% for LEO system features
- Page load times <3 seconds
- Mobile-optimized responsive design
- Multilingual API responses <200ms

**Cultural Standards**:
- KEVIN significance and mascot status preserved
- Trinity formation story accuracy maintained
- Community values ("In Lak'ech Ala K'in") reflected
- Rare Pepe heritage connections honored
- Fair launch principles and community values upheld

### Testing and Validation

**Automated Checks**:
- EntityMention component usage validation
- Cultural preservation rule enforcement
- Translation completeness verification
- Schema.org structured data validation
- Build process success confirmation

**Manual Verification**:
- KEVIN cultural context preservation
- Trinity narrative historical accuracy
- Protocol documentation technical correctness
- Community guidelines compliance
- Multilingual content consistency

### Community Collaboration

**GitHub Workflow**:
- Community members edit English content via pull requests
- Maintainer review for technical and cultural accuracy
- Entity changes require special validation and discussion
- Cultural content receives extended community review
- Translation coordination through automated workflow management

**Documentation References**:
- Production readiness: See development documentation
- Community editing: Follow contributor guidelines
- Entity system: Reference entity editing validation guide
- Translation management: Use content management workflow

## Claude Code 2025 Best Practices

### The "Do Not Touch" List (Critical ⚠️)

**Never modify these without explicit user permission**:
- `docs/.vitepress/api/types.d.ts` - Core type definitions
- `docs/.vitepress/config.ts` - VitePress configuration
- Workspace-level `.taskmaster/` directory - Task Master AI files
- `package.json` dependencies - Production dependencies
- `.github/workflows/` - CI/CD workflows
- `dist/` directory - Auto-generated, never edit manually

**Cultural Content Protection**:
- Never alter KEVIN cultural significance or mascot status
- Preserve Trinity formation narrative accuracy (mikeinspace, Arwyn, Reinamora)
- Maintain historical block numbers and consensus dates
- Keep community values and "In Lak'ech Ala K'in" philosophy

### Quality Control Shortcuts

Use these standardized patterns for efficient workflows:

- **QPLAN**: "Analyze similar parts of codebase for consistency before implementing"
- **QCODE**: "Implement plan, run tests, prettier, and type checking"
- **QCHECK**: "Perform skeptical senior engineer review of the changes"

### Extended Thinking Triggers

For complex problems, use escalating thinking levels:
- **"think"**: Basic extended reasoning
- **"think hard"**: Deeper analysis and consideration
- **"think harder"**: Maximum depth reasoning
- **"ultrathink"**: Most comprehensive analysis

### Claude Code Workflow Integration

**Plan Mode Usage**:
- Use `claude --permission-mode plan` for complex multi-file changes
- Use **Shift+Tab** to cycle through permission modes during session
- Plan mode is recommended for entity system changes affecting multiple languages

**Subagent Integration**:
- Use `/agents` to see available specialized agents
- Project has custom agents for entity validation and cultural preservation
- Claude Code will auto-delegate appropriate tasks to specialized subagents

**Context Management**:
- Use `/clear` frequently between different tasks to maintain focus
- Use **@file.ext** syntax to quickly reference specific files
- Use **#** during session to add instructions to CLAUDE.md organically

**Memory Management**:
- Use `/memory` to edit memory files (CLAUDE.md, etc.)
- Use `#` shortcut to quickly add memories during conversation
- CLAUDE.md imports with `@path/to/file` syntax (supports recursive imports)

**MCP Integration**:
- Use `claude mcp list` to see connected MCP servers
- Use `/mcp` in Claude Code to authenticate with OAuth servers
- Use `@server:protocol://resource` to reference MCP resources
- MCP prompts available as `/mcp__servername__promptname` slash commands

### Custom Commands Available

Project-specific slash commands (use with `/command-name`):
- `/entity-check` - Validate entity definitions across all languages
- `/cultural-review` - Ensure KEVIN and Trinity narrative preservation  
- `/build-test` - Run full build and validate all generated files
- `/protocol-update [protocol-name]` - Update protocol definitions with proper attributions

### Hooks Configuration

**Available Hooks** (configured in `.claude/settings.json`):
- `PreToolUse` - Validate commands before execution
- `PostToolUse` - Run quality checks after file modifications
- `UserPromptSubmit` - Add context or validate prompts
- `SessionStart` - Load development context automatically
- `SessionEnd` - Cleanup and logging tasks

**Hook Security**:
- Use `$CLAUDE_PROJECT_DIR` for project-relative paths
- Always quote shell variables: `"$VAR"` not `$VAR`
- Validate inputs and avoid path traversal attacks
- Skip sensitive files (.env, .git/, keys)

### Development Environment

**Required Tools**:
- Node.js 18+ for VitePress and build system
- Task Master AI (`task-master` command) for project management
- Git for version control and worktree management

**Key Development Commands**:
```bash
npm run docs:dev          # Development server
npm run docs:build        # Production build
npm run docs:preview      # Preview built site
# Task management via MCP (workspace-level, tag: bitcoinstamps.xyz)
```

**File Watching**: VitePress watches `.md`, `.vue`, and data files automatically. Changes to entity data require full rebuild.

### Advanced Claude Code Features

**Status Line Configuration**:
- Use `/statusline` to set up custom status display
- Add `statusLine.command` to `.claude/settings.json`
- Display model, directory, git branch, cost metrics
- Updates automatically during conversation

**Output Styles**:
- Use `/output-style` to change system prompt behavior
- Built-in styles: Default, Explanatory, Learning
- Create custom styles with `/output-style:new`
- Stored in `~/.claude/output-styles` or `.claude/output-styles`

**Memory Management**:
- Enterprise policy: `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS)
- Project memory: `./CLAUDE.md` (shared via git)
- User memory: `~/.claude/CLAUDE.md` (personal preferences)
- Local project: `./CLAUDE.local.md` (deprecated, use imports instead)

## Important Notes

- **Cultural Heritage**: This project preserves authentic Bitcoin Stamps community culture
- **Technical Excellence**: Maintain high standards for protocol documentation accuracy  
- **Community Values**: Honor "we are all Kevin" philosophy and fair launch principles
- **AI Optimization**: Content structured for AI agent discoverability and semantic relationships
- **Multilingual Integrity**: Cultural context must be preserved across all languages

---

**Remember**: Bitcoin Stamps documentation serves both developers and artists while preserving the unique cultural heritage that makes this community special. Every change should honor both technical excellence and cultural authenticity.

*In Lak'ech Ala K'in* - I am you and you are me - We are all KEVIN