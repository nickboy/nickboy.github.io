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

### Testing

```bash
npm test              # Run Playwright E2E tests
npm run test:ui       # Interactive UI mode
npm run test:debug    # Debug mode
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

## Important Notes

- The site uses Hugo extended version for CSS processing
- Blowfish uses Hugo Pipes for Tailwind CSS (build-time, not CDN)
- Color scheme is `noir` with dark mode as default
- Homepage uses `profile` layout mode
- Search is enabled via Fuse.js (built into Blowfish)
- Hugo version warning about Blowfish compatibility (0.141.0-0.155.3) can be ignored — site builds and works correctly with 0.156.0

## Cloudflare Pages Deployment

Set the following environment variable in the Cloudflare dashboard:
```
HUGO_VERSION = 0.156.0
```

Build settings:
- Build command: `hugo --gc --minify`
- Output directory: `public`
