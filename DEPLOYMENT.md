# Bitcoin Stamps Documentation - Production Deployment Guide

## Overview

This guide covers the automated production deployment of the Bitcoin Stamps documentation site to Cloudflare Pages with the custom domain `bitcoinstamps.xyz`.

## Current Status

✅ **Development site**: https://dev.bitcoinstamps.xyz  
🚧 **Production site**: https://bitcoinstamps.xyz (ready for deployment)

## Deployment Architecture

### Platform: Cloudflare Pages
- **Custom Domain**: bitcoinstamps.xyz
- **Build Command**: `npm run docs:build`
- **Output Directory**: `dist`
- **Framework**: VitePress with LEO API system

### Cultural Requirements (CRITICAL)
- ✅ **KEVIN Attribution**: Fixed to show "Arwyn" (was showing "Reinamora")
- ✅ **KEVIN Name**: Preserved as ALL CAPS across all languages
- ✅ **Trinity Narrative**: Maintained in kevin-origin stories
- ✅ **API Generation**: 16 entities, 4 protocols, 5 languages

## GitHub Actions Workflow

### File: `.github/workflows/deploy-cloudflare.yml`

The automated deployment workflow includes:

1. **Cultural Validation**: Verifies KEVIN creator attribution is "Arwyn"
2. **Build Process**: Generates multilingual API and documentation
3. **Deployment**: Pushes to Cloudflare Pages with custom domain
4. **Preview**: Creates preview deployments for pull requests

### Required Secrets

Configure these in GitHub repository settings:

```bash
CLOUDFLARE_API_TOKEN    # Cloudflare API token with Pages:Edit permissions
CLOUDFLARE_ACCOUNT_ID   # Cloudflare account ID
GITHUB_TOKEN           # Automatically provided by GitHub Actions
```

### Workflow Features

- **Cultural Preservation Validation**: Ensures KEVIN shows "Arwyn" 
- **Multi-language Support**: Builds API in 5 languages (EN, ES, FR, ZH, TR)
- **API Generation**: Creates 16+ entity endpoints with 4 protocol definitions
- **Preview Deployments**: Automatic preview URLs for pull requests
- **Build Optimizations**: Configured for Cloudflare Pages performance

## VitePress Configuration Updates

### Custom Domain Optimizations

```typescript
// Base path for custom domain
base: '/', // Always use root path for bitcoinstamps.xyz

// Updated meta tags for production domain
og:url: 'https://bitcoinstamps.xyz/'
og:image: 'https://bitcoinstamps.xyz/android-chrome-512x512.png'

// Multilingual SEO support
hreflang: 'en' -> 'https://bitcoinstamps.xyz/en/'
hreflang: 'es' -> 'https://bitcoinstamps.xyz/es/'
// ... etc for all 5 languages
```

### Build Performance

- Removed heavy Vite optimizations to prevent module resolution issues
- Using esbuild minification for faster builds
- Optimized for Cloudflare Pages CDN delivery

## API System Status

### LEO API Generation ✅

**Generated Files**:
- `dist/api/entities.json` (16 entities)
- `dist/api/protocols.json` (4 protocols)  
- `dist/api/schema.json` (3 schemas)
- Individual entity files: `kevin.json`, `src-20.json`, etc.

**Multi-language Variants**:
- `dist/en/api/` (English - default)
- `dist/es/api/` (Spanish)
- `dist/fr/api/` (French)
- `dist/zh/api/` (Chinese)
- `dist/tr/api/` (Turkish)

### Cultural Verification ✅

**KEVIN Entity Validation**:
```json
{
  "entity": {
    "id": "kevin",
    "name": "KEVIN",              // ✅ ALL CAPS preserved
    "creator": "Arwyn",           // ✅ Fixed from "Reinamora"
    "firstStampNumber": 4258,     // ✅ Added for validation
    "src20StampNumber": 18516,    // ✅ Added for validation
    "culturalSignificance": "high"
  }
}
```

## Deployment Process

### Automated Deployment (Recommended)

1. **Push to main branch** triggers automatic deployment
2. **GitHub Actions** runs full validation and build
3. **Cultural validation** ensures KEVIN attribution is correct
4. **Build succeeds** → Deploys to bitcoinstamps.xyz
5. **Preview URLs** for pull requests

### Manual Deployment (Backup)

```bash
# 1. Build locally
npm run docs:build

# 2. Verify KEVIN attribution
cat dist/api/kevin.json | grep '"creator"'
# Should show: "creator": "Arwyn",

# 3. Deploy via Cloudflare CLI
npx wrangler pages deploy dist --project-name=bitcoin-stamps-docs
```

## Domain Configuration

### Cloudflare Pages Project Settings

```yaml
Project Name: bitcoin-stamps-docs
Custom Domain: bitcoinstamps.xyz
Build Command: npm run docs:build
Build Output Directory: dist
Root Directory: /
Node Version: 18.x
```

### DNS Configuration (Cloudflare)

```
A    bitcoinstamps.xyz         -> Cloudflare Pages IP
AAAA bitcoinstamps.xyz         -> Cloudflare Pages IPv6
CNAME www.bitcoinstamps.xyz    -> bitcoin-stamps-docs.pages.dev
```

## Testing & Validation

### Pre-Deployment Checklist

```bash
# 1. Clean build
rm -rf dist && npm run docs:build

# 2. Verify KEVIN attribution
grep '"creator": "Arwyn"' dist/api/kevin.json
grep '"creator": "Arwyn"' dist/*/api/kevin.json

# 3. Check API completeness
ls dist/api/*.json | wc -l  # Should be 19+ files
ls dist/*/api/ | wc -l      # Should be 4 language directories

# 4. Verify site structure
ls dist/en/ dist/es/ dist/fr/ dist/zh/ dist/tr/
```

### Post-Deployment Validation

```bash
# 1. API endpoints
curl https://bitcoinstamps.xyz/api/kevin.json | jq .entity.creator
# Should return: "Arwyn"

# 2. Multi-language support
curl https://bitcoinstamps.xyz/es/api/kevin.json | jq .entity.name
# Should return: "KEVIN"

# 3. Schema.org data
curl https://bitcoinstamps.xyz/api/schema.json | jq .schemas[0].name
# Should include Bitcoin Stamps schema
```

## Monitoring & Maintenance

### Build Monitoring

- **GitHub Actions**: Monitor workflow success/failure
- **Cultural Validation**: Alerts if KEVIN attribution changes
- **API Health**: Validates 16+ entities across 5 languages
- **Performance**: Build time typically <30 seconds

### Content Updates

1. **Documentation Changes**: Edit `.md` files, push to main
2. **API Updates**: Modify `multilingual-data.ts`, test locally
3. **Cultural Changes**: Any KEVIN-related updates require validation

## Troubleshooting

### Common Issues

**Build Failing**:
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm ci
npm run docs:build
```

**Cultural Validation Failing**:
```bash
# Check KEVIN creator
grep -n "creator:" docs/.vitepress/api/multilingual-data.ts
# Should show line with 'Arwyn'
```

**API Generation Issues**:
```bash
# Test API validation
npm run test:leo-api
npm run test:translation
```

### Emergency Rollback

If deployment fails:
1. Check GitHub Actions logs for specific error
2. Cultural validation failure → Fix KEVIN data → Redeploy
3. Build failure → Check dependencies → Clear cache → Retry
4. DNS issues → Verify Cloudflare Pages custom domain settings

## Success Criteria Complete ✅

- ✅ **GitHub Actions workflow** created with cultural validation
- ✅ **KEVIN creator attribution** fixed from "Reinamora" → "Arwyn"  
- ✅ **VitePress configuration** optimized for Cloudflare Pages
- ✅ **Build process** validates and generates 16+ entities in 5 languages
- ✅ **Custom domain** configuration ready for bitcoinstamps.xyz
- ✅ **Cultural preservation** requirements maintained
- ✅ **API generation** functional (LEO system working)

## Next Steps

1. **Configure GitHub repository secrets** (Cloudflare API token, Account ID)
2. **Set up custom domain** in Cloudflare Pages project
3. **Test deployment** by pushing to main branch
4. **Verify production site** at https://bitcoinstamps.xyz
5. **Monitor first production deployment** for any issues

---

**Generated**: 2025-08-27  
**Status**: Ready for production deployment  
**Cultural Requirements**: ✅ All met (KEVIN attribution fixed)