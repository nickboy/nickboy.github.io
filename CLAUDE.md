# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Nick Liu (Senior Software Engineer at Meta) built with Hugo static site generator, using the Blowfish theme. The site is deployed to Cloudflare Pages.

## Architecture

- **Static Site Generator**: Hugo v0.156.0 (extended version)
- **Theme**: Blowfish (installed as git submodule)
- **Deployment**: Cloudflare Pages (auto-deploys on push to `main`)
- **Configuration**: Multi-file config in `config/_default/` (hugo.toml, params.toml, languages.en.toml, menus.en.toml, markup.toml)
- **Content Structure**:
  - `/content/about/` - About page
  - `/content/experience/` - Work experience
  - `/content/education/` - Education details
  - `/content/skills/` - Skills listing
  - `/content/projects/` - Featured projects
  - `/content/posts/` - Blog posts
- **Data Files**: `/data/en/` contains YAML data (experience.yaml, projects.yaml, author.yaml, blogs.yaml)
- **Assets**: `/assets/img/` for images processed by Hugo Pipes
- **Custom CSS**: `assets/css/custom.css` (auto-loaded by Blowfish)
- **Custom JS**: `layouts/partials/extend-footer.html` (auto-loaded by Blowfish)
- **Layout Overrides**: `layouts/` for custom templates and partials
- **Scripts**: `scripts/` for asset generation (favicons, OG images)

## Development Commands

### Local Development

```bash
hugo server -D
# Server runs at http://localhost:1313
```

Build the site:

```bash
hugo --gc --minify
# Output goes to ./public/
```

### Theme Management

The Blowfish theme is installed as a git submodule:

```bash
git submodule update --init --recursive
```

### Creating Content

New blog post:

```bash
hugo new posts/my-new-post.md
```

### Asset Generation

Favicon generation (all sizes + ICO + webmanifest):

```bash
node scripts/generate-favicon.mjs
```

OG image generation:

```bash
node scripts/generate-og-image.mjs
```

### Testing

```bash
npm test              # Run Playwright E2E tests
npm run test:ui       # Interactive UI mode
npm run test:debug    # Debug mode
npx markdownlint-cli2 'content/**/*.md'  # Lint markdown
```

## Deployment

The site deploys to **Cloudflare Pages** automatically when pushing to `main`.

- Build command: `hugo --gc --minify`
- Output directory: `public`
- Environment variable: `HUGO_VERSION = 0.156.0`

A GitHub Actions workflow (`.github/workflows/hugo.yaml`) also exists for GitHub Pages as a backup.

## Configuration

Configuration uses Blowfish's multi-file approach in `config/_default/`:

- `hugo.toml` - Base site config (theme, taxonomies, outputs)
- `params.toml` - Theme parameters (color scheme, homepage layout, article settings, search)
- `languages.en.toml` - Language settings, author profile, social links
- `menus.en.toml` - Navigation menu structure
- `markup.toml` - Markdown rendering settings

## Customizations

### Blowfish Extension Points

- **Custom CSS**: `assets/css/custom.css` - auto-loaded by Blowfish, no import needed
- **Footer JS**: `layouts/partials/extend-footer.html` - injected at page bottom
- **Head tags**: `layouts/partials/extend-head.html` - injected in `<head>`

Never modify theme files directly in `themes/blowfish/`. Use extension points or layout overrides.

### Custom CSS Features

- Dark mode logo backgrounds (white padding for logos in dark mode)
- Tab fade-in animations using `@keyframes`
- Scroll-fade animations for timeline items and cards

### Custom JS Features

- IntersectionObserver-based scroll-fade animations for `.timeline-item` and `.card` elements

### Asset Generation

- `scripts/generate-favicon.mjs` - Generates `<NL/>` branded favicons (16x16, 32x32, 180x180), ICO, and webmanifest
- `scripts/generate-og-image.mjs` - Generates default Open Graph image

## Git & PR Rules

- **No AI attribution** — Do NOT include "Co-Authored-By: Claude", "Generated with Claude Code", or any AI-generated tags in commit messages or pull request descriptions.
- Use conventional commit style (`feat:`, `fix:`, `docs:`, etc.)

## Important Notes

- The site uses Hugo extended version for CSS processing
- Blowfish uses Hugo Pipes for Tailwind CSS (build-time, not CDN)
- Color scheme is `noir` with dark mode as default
- Homepage uses `profile` layout mode
- Search is enabled via Fuse.js (built into Blowfish)
- Hugo version warning about Blowfish compatibility (0.141.0-0.155.3) can be ignored — site builds and works correctly with 0.156.0
- **Do not use `{{</* icon */>}}` shortcodes inside headings** — they break rendering and produce `HAHAHUGOSHORTCODE` text

## Cloudflare Pages Deployment

Set the following environment variable in the Cloudflare dashboard:

```text
HUGO_VERSION = 0.156.0
```

Build settings:

- Build command: `hugo --gc --minify`
- Output directory: `public`

## Claude Code Skills

Project-level skills in `.claude/skills/` are auto-discovered by Claude Code:

- **blog-writing** - Tech blog authoring conventions, shortcode usage, writing style guide
- **site-optimize** - Build, deploy, performance, asset generation, configuration
- **pre-push-checks** - Full CI pipeline locally before pushing (lint, build, htmltest, Playwright)
