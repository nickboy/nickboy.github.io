# Cloudflare Pages Deployment Setup

## Required Environment Variables

| Environment | Variable Name | Value |
|------------|---------------|-------|
| **Production** | `HUGO_VERSION` | `0.156.0` |
| **Preview** | `HUGO_VERSION` | `0.156.0` |

## Setup Instructions

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
2. Select your project: `nickboy-github-io`
3. Go to **Settings** > **Environment variables**
4. Set `HUGO_VERSION` to `0.156.0` for both Production and Preview environments

## Build Configuration

- Build command: `hugo --gc --minify`
- Build output directory: `public`
- Root directory: `/` (leave empty)

## Notes

- The site uses the **Blowfish** theme (git submodule)
- Blowfish uses Hugo Pipes for Tailwind CSS processing — no Node.js build step required
- The `.hugo-version` file is ignored by Cloudflare Pages; you must set the env var manually
- `functions/_worker.js` provides basic Cloudflare Workers asset serving

## Verification

After updating environment variables, trigger a new deployment:
1. Push any commit to trigger a preview build
2. Check build logs for: `hugo v0.156.0`
