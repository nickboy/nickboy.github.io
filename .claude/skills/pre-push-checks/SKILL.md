---
name: pre-push-checks
description: |
  Use when user asks to "push", "create PR", "pull request", "merge",
  mentions "git push", "CI", "pre-push", "run checks", "run all tests",
  or before pushing any changes to the remote repository.
version: 1.0.0
tools: Read, Glob, Grep, Bash, Edit, Write
---

# Pre-Push Checks

Run the full CI pipeline locally before pushing to remote. This mirrors
the GitHub Actions CI workflow (`.github/workflows/ci.yaml`) exactly.

## Mandatory Checklist

Every push MUST pass all of these checks. Run them in order — fix any
failures before proceeding to the next step.

### 1. Lint

```bash
# Markdown (content files)
npx markdownlint-cli2 'content/**/*.md'

# CSS
npx stylelint 'assets/css/**/*.css'

# JS/TS
npx eslint .

# YAML (data files)
yamllint -c .yamllint.yml data/
```

### 2. Build (production mode, no drafts)

```bash
hugo --gc --minify
```

CI builds without `-D`. If a page links to a draft-only post, htmltest
will catch the broken link. Remove or un-draft the referenced post.

### 3. HTML validation

```bash
# If htmltest is installed locally:
htmltest
```

Checks internal links in `public/`. Configured via `.htmltest.yml`.
Common failures: broken links to non-existent or draft-only pages.

### 4. Playwright E2E tests (all test files)

```bash
npx playwright test --project=chromium
```

This runs ALL test files in `tests/`, not just one. CI uses chromium
only. The web server starts automatically via `playwright.config.ts`.

## Common Pitfalls

- **Running only some tests**: Always use `npx playwright test --project=chromium`
  (no specific file), not `npx playwright test tests/one-file.spec.ts`.
  CI runs the full suite.
- **Building with `-D`**: CI uses `hugo --gc --minify` (no drafts).
  Posts with `draft: true` won't exist in CI builds. Any links to them
  from non-draft pages will fail htmltest validation.
- **ESLint Node globals**: Scripts in `scripts/` use Node.js globals
  (`console`, `Buffer`). The ESLint config has an override for
  `scripts/**/*.mjs` — add new script files there if needed.
- **Stylelint BEM classes**: Blowfish theme uses BEM-style class names
  (`tab__panel`, `tab--active`). Use `stylelint-disable` comments for
  theme class selectors that can't be renamed.
- **Stale test expectations**: Homepage "Recent" section shows the 6
  most recent posts (`showRecentItems = 6` in `params.toml`). Tests
  should not hardcode specific post titles — use count checks instead.

## Git & PR Rules

- No AI attribution in commits or PR descriptions — no "Co-Authored-By:
  Claude", "Generated with Claude Code", or similar tags.
- Use conventional commit style (`feat:`, `fix:`, `docs:`, etc.).

## Quick One-Liner

Run all checks sequentially (stop on first failure):

```bash
npx markdownlint-cli2 'content/**/*.md' \
  && npx stylelint 'assets/css/**/*.css' \
  && npx eslint . \
  && hugo --gc --minify \
  && npx playwright test --project=chromium
```
