# Cloudflare Pages Deployment Setup

## ⚠️ IMPORTANT: Manual Configuration Required

Cloudflare Pages requires manual configuration in the dashboard for Hugo version.

### Required Environment Variables

| Environment | Variable Name | Value | Status |
|------------|---------------|-------|---------|
| **Production** | `HUGO_VERSION` | `0.149.1` | ❌ Currently 0.144.2 - NEEDS UPDATE |
| **Preview** | `HUGO_VERSION` | `0.149.1` | ❌ Not set - NEEDS ADDING |

### Setup Instructions

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/)
2. Select your project: `nickboy-github-io`
3. Go to **Settings** → **Environment variables**

#### For Preview Environment:
1. Click **Add variable**
2. Set:
   - Variable name: `HUGO_VERSION`
   - Value: `0.149.1`
   - Environment: Preview

#### For Production Environment:
1. Find existing `HUGO_VERSION` variable
2. Edit value from `0.144.2` to `0.149.1`
3. Save changes

### Build Configuration (Already Set)
- Build command: `hugo`
- Build output directory: `public`
- Root directory: `/` (leave empty)

### Why This is Required
- The updated Ananke theme requires Hugo v0.149.1+
- Cloudflare's default Hugo version (v0.118.2) is too old
- The `.hugo-version` file is ignored by Cloudflare Pages

### Verification
After setting the environment variables, trigger a new deployment:
1. Push any commit to trigger preview build
2. Check build logs for: `hugo v0.149.1`