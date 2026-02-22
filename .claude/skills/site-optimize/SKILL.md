---
name: site-optimize
description: |
  Use when user asks about "performance", "SEO", "optimization", "page speed",
  "build", "deploy", mentions "Cloudflare", "Hugo build", "assets",
  "custom CSS", "favicon", or discusses site performance and deployment.
version: 1.0.0
tools: Read, Glob, Grep, Bash, Edit, Write
---

# Website Optimization

## Build Commands

```bash
# Production build
hugo --gc --minify

# Development server (includes drafts)
hugo server -D
```

## Deployment

Cloudflare Pages auto-deploys on push to `main`.

Environment variable in Cloudflare dashboard:

```
HUGO_VERSION = 0.156.0
```

Build settings: `hugo --gc --minify`, output directory: `public`.

## Blowfish Extension Points

Blowfish provides these auto-loaded extension files:

- **Custom CSS**: `assets/css/custom.css` - loaded automatically by Blowfish
- **Custom JS**: `layouts/partials/extend-footer.html` - injected at page bottom
- **Custom head tags**: `layouts/partials/extend-head.html` - injected in `<head>`

Never modify theme files directly in `themes/blowfish/`. Use extension
points or layout overrides in `layouts/`.

## Asset Generation Scripts

Favicon generation (produces all sizes + ICO + webmanifest):

```bash
node scripts/generate-favicon.mjs
```

OG image generation:

```bash
node scripts/generate-og-image.mjs
```

Both scripts use the `canvas` npm package and output to `static/`.

## Configuration Files

All in `config/_default/`:

- `hugo.toml` - Base site config (theme, taxonomies, outputs)
- `params.toml` - Theme parameters (color scheme, homepage layout, search)
- `languages.en.toml` - Language settings, author profile, social links
- `menus.en.toml` - Navigation menu structure
- `markup.toml` - Markdown rendering settings

## Theme Management

Blowfish is a git submodule:

```bash
git submodule update --init --recursive
```

## Testing

```bash
# Playwright E2E tests
npm test

# Markdown lint
npx markdownlint-cli2 'content/**/*.md'
```

## Known Issues

- Hugo version warning about Blowfish compatibility (0.141.0-0.155.3)
  can be ignored. Site builds and works correctly with 0.156.0.
