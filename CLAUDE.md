# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website for Nick Liu built with Hugo static site generator, using the Ananke theme. The site is automatically deployed to GitHub Pages via GitHub Actions.

## Architecture

- **Static Site Generator**: Hugo v0.144.2 (extended version)
- **Theme**: Ananke (installed as git submodule)
- **Deployment**: GitHub Pages via GitHub Actions
- **Content Structure**: 
  - `/content/about/` - About page
  - `/content/experience/` - Work experience
  - `/content/education/` - Education details
  - `/content/skills/` - Skills listing
  - `/content/posts/` - Blog posts

## Development Commands

### Local Development

First, install Hugo locally:
```bash
# macOS with Homebrew
brew install hugo

# Or download from https://github.com/gohugoio/hugo/releases
```

Run development server:
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

Themes are installed as git submodules:
```bash
# Initialize submodules after cloning
git submodule update --init --recursive

# Update themes to latest version
git submodule update --remote --merge
```

### Creating Content

New blog post:
```bash
hugo new posts/my-new-post.md
```

New section page:
```bash
hugo new section-name/_index.md
```

## Deployment

The site automatically deploys to GitHub Pages when pushing to the `main` branch. The workflow:
1. Builds with Hugo extended version
2. Uploads to GitHub Pages artifact storage
3. Deploys to GitHub Pages environment

Manual deployment trigger:
- Go to Actions tab → Deploy Hugo site to Pages → Run workflow

## Configuration

Main configuration is in `hugo.toml`:
- Site title, base URL, and language settings
- Theme selection (currently using `ananke`)
- Menu structure for navigation
- Various display parameters (reading time, share buttons, etc.)

## Important Notes

- The site uses Hugo extended version for SCSS support
- Both Ananke and PaperMod themes are available as submodules
- Cloudflare Workers setup exists (`functions/_worker.js`) for edge deployment if needed
- Custom layouts can be added in `/layouts/` directory
- The 404 page and schema templates are customized in `/layouts/`
- **Hugo v0.149.1**: Site requires Hugo v0.149.1 for compatibility with latest theme updates
- **Theme Override**: `layouts/partials/social-share.html` overrides theme to fix deprecated `.Site.Social`

## PR Workflow

### Creating a Pull Request

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test locally:
   ```bash
   hugo server -D
   hugo --gc --minify  # Test production build
   ```

3. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: your commit message"
   ```

4. Push to remote:
   ```bash
   git push -u origin feature/your-feature-name
   ```

5. Create PR using GitHub CLI:
   ```bash
   gh pr create --title "Your PR title" --body "Your PR description"
   ```

6. Monitor GitHub Actions workflow for CI/CD checks

### Cloudflare Pages Deployment

If deploying to Cloudflare Pages, set the following environment variable in the dashboard:
```
HUGO_VERSION = 0.149.1
```

Build settings:
- Build command: `hugo --gc --minify`
- Output directory: `public`