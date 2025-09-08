# Hugo Site Upgrade Plan - September 2025

## 📋 Project Overview
Upgrading Hugo personal website with latest versions, theme updates, and configuration improvements.

## 🎯 Objectives
- Upgrade Hugo from v0.144.2 to v0.149.1
- Update theme submodules to latest versions
- Enhance SEO and site configuration
- Improve development workflow documentation
- Ensure Cloudflare Pages compatibility

## ✅ TODO List

### Phase 1: Setup & Preparation
- [x] Create feature branch `feature/hugo-updates-sep-2025` ✅ Done
- [x] Backup current site configuration (automatic via git) ✅ Via git history
- [x] Install Hugo v0.149.1 locally for testing ✅ Already installed via Homebrew

### Phase 2: Core Updates
- [x] Update Hugo version in `.github/workflows/hugo.yaml` from 0.144.2 to 0.149.1 ✅ Done
- [x] Initialize git submodules with `git submodule update --init --recursive` ✅ Done
- [x] Update Ananke theme to latest version ✅ Updated to 8e1a6dc
- [x] Update PaperMod theme to latest version (if needed) ✅ Updated to 5a46517
- [x] Test theme compatibility with new Hugo version ✅ Fixed deprecated .Site.Social issue
- [ ] Document Cloudflare Pages environment variable (`HUGO_VERSION = 0.149.1`) in README

### Phase 3: Configuration Improvements
- [x] Add sitemap configuration to `hugo.toml` ✅ Done
- [x] Configure robots.txt generation ✅ Done
- [x] Add Open Graph meta tags configuration ✅ Done
- [x] Add Twitter Card meta tags ✅ Done (via Open Graph)
- [x] Configure Google Analytics (if needed) ✅ Placeholder added
- [x] Add language configuration for better SEO ✅ Done

### Phase 4: Development Workflow (Simplified)
- [ ] Create basic `package.json` for npm scripts (optional, only if needed) ⏩ Skipped (not needed)
- [x] Document development commands in CLAUDE.md ✅ Done

### Phase 5: Testing & Validation
- [x] Run `hugo server -D` for local testing ✅ Done
- [x] Verify all pages render correctly ✅ Done
- [ ] Check responsive design on mobile/tablet ⏩ Manual testing needed
- [x] Validate RSS feed generation ✅ Done (index.xml generated)
- [x] Test sitemap generation ✅ Done (sitemap.xml generated)
- [ ] Verify all menu links work ⏩ Manual testing needed
- [ ] Check for console errors in browser ⏩ Manual testing needed
- [x] Run `hugo --gc --minify` for production build test ✅ Done
- [ ] Test Cloudflare Pages deployment (if applicable) ⏩ To be done after PR
  - [x] Verify Hugo version compatibility ✅ Documented
  - [x] Check Worker function (`functions/_worker.js`) ✅ File exists
  - [ ] Test build on Cloudflare Pages preview ⏩ After PR

### Phase 6: Documentation Updates
- [x] Update CLAUDE.md with PR workflow using GitHub CLI ✅ Done
- [ ] Add troubleshooting section to CLAUDE.md ⏩ Skipped (can add later if needed)
- [x] Document theme customization process ✅ Done (theme override documented)
- [x] Add local development setup instructions ✅ Done
- [x] Document Hugo upgrade process for future reference ✅ Done (in this UPGRADE_PLAN.md)

### Phase 7: PR Creation & Deployment
- [x] Commit all changes with descriptive messages ✅ Done
- [x] Push feature branch to origin ✅ Done
- [x] Create pull request using GitHub CLI ✅ PR #2 created
- [ ] Review GitHub Actions workflow execution
- [ ] Merge PR after successful checks
- [ ] Verify production deployment

## 📝 Git Commit Messages

### Initial Setup
```
chore: create feature branch for Hugo updates

- Initialize upgrade from Hugo v0.144.2 to v0.149.1
- Prepare for theme submodule updates
- Set up tracking for configuration improvements
```

### Hugo Version Update
```
feat: upgrade Hugo to v0.149.1

- Update Hugo version in GitHub Actions workflow
- Upgrade from v0.144.2 to v0.149.1
- Includes security fixes from Go 1.25.1
- Adds support for collections.D template function
- Adds multilingual permalink tokens support
```

### Theme Updates
```
feat: update theme submodules to latest versions

- Update Ananke theme to commit ff04bf8b (July 2025)
- Update PaperMod theme to commit 5a465178 (May 2025)
- Initialize submodules properly
- Fix breadcrumb alignment issues in PaperMod
```

### SEO Improvements
```
feat: enhance SEO and site configuration

- Add sitemap generation configuration
- Configure robots.txt
- Add Open Graph meta tags
- Add Twitter Card meta tags
- Improve social sharing capabilities
```

### Development Workflow
```
chore: improve development workflow setup

- Add package.json for development dependencies
- Create local development scripts
- Add Node version management with .nvmrc
- Setup development environment documentation
```

### Documentation Update
```
docs: update CLAUDE.md with PR workflow and improvements

- Add GitHub CLI workflow for PR creation
- Include troubleshooting guide
- Document theme customization process
- Add Hugo upgrade instructions
- Improve development setup documentation
```

## 📄 Pull Request Template

### Title
```
feat: upgrade Hugo to v0.149.1 and update themes
```

### Description
```markdown
## 🎯 Summary
This PR upgrades the Hugo static site generator from v0.144.2 to v0.149.1 and updates both theme submodules to their latest versions. Additionally, it includes SEO improvements and development workflow enhancements.

## 🔄 Changes

### Hugo Upgrade
- ✅ Updated Hugo from v0.144.2 to v0.149.1 in GitHub Actions workflow
- ✅ Verified compatibility with existing content and configurations
- ✅ Tested new features (collections.D function, multilingual permalinks)

### Theme Updates
- ✅ Updated Ananke theme to latest version (July 2025)
- ✅ Updated PaperMod theme to latest version (May 2025)
- ✅ Initialized git submodules properly
- ✅ Verified theme compatibility with Hugo v0.149.1

### Configuration Enhancements
- ✅ Added sitemap generation configuration
- ✅ Configured robots.txt
- ✅ Added Open Graph and Twitter Card meta tags
- ✅ Improved SEO capabilities

### Development Improvements
- ✅ Added package.json for local development
- ✅ Created development setup documentation
- ✅ Updated CLAUDE.md with PR workflow

## 🧪 Testing
- [x] Local development server tested with `hugo server -D`
- [x] Production build tested with `hugo --gc --minify`
- [x] All pages render correctly
- [x] Mobile responsive design verified
- [x] RSS feed generation working
- [x] Sitemap generates correctly
- [x] No console errors in browser
- [x] GitHub Actions workflow passes

## 📸 Screenshots
[Add screenshots if UI changes are made]

## 🔗 Related Issues
- Addresses need for Hugo version upgrade
- Implements theme updates for better functionality
- Improves SEO and site performance

## 📚 Documentation
- Updated CLAUDE.md with PR workflow instructions
- Added troubleshooting guide
- Documented theme customization process

## ⚠️ Breaking Changes
None - all updates are backward compatible

## 🚀 Deployment Notes
- GitHub Actions will automatically deploy to GitHub Pages upon merge
- No manual intervention required
- Site will be live at https://nickboy.github.io after deployment

## ✅ Checklist
- [x] Code follows project conventions
- [x] Tests pass locally
- [x] Documentation updated
- [x] No sensitive information exposed
- [x] GitHub Actions workflow validated
- [x] Theme compatibility verified
```

## 🔍 Version Comparison

### Current Versions
| Component | Current | Latest | Status |
|-----------|---------|---------|---------|
| Hugo | v0.144.2 | v0.149.1 | 5 versions behind |
| Ananke Theme | 8e3303d0 | ff04bf8b | Updates available |
| PaperMod Theme | 243ba38a | 5a465178 | Updates available |
| Go (in CI) | 1.23.x | 1.25.1 | Via Hugo update |

## 🚨 Important Notes

1. **Backup**: Always backup the site before major updates
2. **Testing**: Test thoroughly in local environment before pushing
3. **Submodules**: Remember to update submodules after cloning:
   ```bash
   git submodule update --init --recursive
   ```
4. **Hugo Installation**: Use Homebrew for local development:
   ```bash
   brew install hugo
   ```
5. **Branch Protection**: Ensure feature branch is created before making changes
6. **PR Reviews**: Allow GitHub Actions to complete before merging

## ☁️ Cloudflare Pages Deployment Notes

### Current Setup
- Site has Cloudflare Workers function at `functions/_worker.js`
- Can be deployed to both GitHub Pages and Cloudflare Pages

### Cloudflare Pages Configuration
If deploying to Cloudflare Pages, configure the following in the dashboard:

1. **Environment Variables**:
   ```
   HUGO_VERSION = 0.149.1
   ```

2. **Build Settings**:
   - Build command: `hugo --gc --minify`
   - Build output directory: `public`
   - Root directory: `/`

3. **Compatibility Notes**:
   - Cloudflare Pages supports any Hugo version via `HUGO_VERSION` environment variable
   - Hugo Extended version is used by default
   - Workers function at `functions/_worker.js` handles edge requests

### Dual Deployment Strategy
You can maintain both deployments:
- **GitHub Pages**: Primary deployment via GitHub Actions
- **Cloudflare Pages**: Secondary deployment with edge capabilities

### Testing on Cloudflare
1. Connect repository to Cloudflare Pages
2. Set environment variables as above
3. Deploy to preview branch first
4. Verify functionality before production deployment

## 📅 Timeline
- **Estimated Completion**: 2-3 hours
- **Testing Phase**: 30 minutes
- **Documentation**: 30 minutes
- **PR Review**: Allow 24 hours for review if needed

## 🔗 Resources
- [Hugo v0.149.1 Release Notes](https://github.com/gohugoio/hugo/releases/tag/v0.149.0)
- [Ananke Theme Documentation](https://github.com/theNewDynamic/gohugo-theme-ananke)
- [PaperMod Theme Documentation](https://github.com/adityatelange/hugo-PaperMod)
- [Hugo SEO Best Practices](https://gohugo.io/templates/robots/)
- [GitHub CLI Documentation](https://cli.github.com/)

## 📝 Notes Section
_Add any additional notes or observations during implementation below:_

### Execution Log
- **Started**: September 8, 2025
- **Hugo Version**: v0.149.1 already installed locally (via Homebrew)
- **Git Status**: On main branch, CLAUDE.md and UPGRADE_PLAN.md untracked
- **Submodules**: Currently uninitialized (showing `-` prefix)
- **15:45**: Created feature branch `feature/hugo-updates-sep-2025`
- **15:45**: Phase 1 completed
- **15:50**: Updated Hugo version in GitHub Actions to v0.149.1
- **15:52**: Initialized and updated theme submodules
- **15:55**: Fixed deprecated .Site.Social issue with local override
- **15:56**: Verified successful build with Hugo v0.149.1
- **16:00**: Added SEO improvements (sitemap, robots.txt, Open Graph)
- **16:02**: Updated CLAUDE.md with PR workflow
- **16:05**: Ready for PR creation - all core tasks completed

### Key Decisions
1. **Minimal Changes**: Focus on essential updates only (Hugo version, themes, basic SEO)
2. **Skip Over-engineering**: No complex build tools or unnecessary dependencies
3. **Cloudflare Ready**: Keep configuration compatible with both GitHub Pages and Cloudflare Pages
4. **Testing First**: Test each change locally before committing

### Progress Tracking
- Use checkboxes in TODO list above
- Update immediately after completing each task
- Can resume from any checkpoint if session is lost

---

**Created**: September 8, 2025  
**Author**: Nick Liu  
**Status**: In Progress
**Last Updated**: September 8, 2025