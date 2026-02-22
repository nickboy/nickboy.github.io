---
name: blog-writing
description: |
  Use when user asks to "write a blog post", "create a post", "new post",
  mentions "content/posts", "blog", "article", "tech writing", or discusses
  creating or editing blog content for this Hugo site.
version: 1.0.0
tools: Read, Glob, Grep, Bash, Edit, Write
---

# Tech Blog Authoring

## Creating a New Post

```bash
hugo new posts/my-post.md
```

Or create manually at `content/posts/my-post.md`.

## Front Matter Conventions

Every post needs this YAML front matter:

```yaml
---
title: "Post Title"
date: 2025-01-15
draft: false
description: "Brief description for SEO and previews"
tags: ["tag1", "tag2"]
categories: ["category"]
showTableOfContents: true
---
```

Optional front matter fields: `series`, `summary`, `showComments`, `showDate`,
`showReadingTime`, `showWordCount`, `showEdit`.

## Blowfish Shortcodes

Available shortcodes for rich content:

- `{{</* lead */>}}` - Larger introductory paragraph
- `{{</* alert */>}}` - Callout boxes (info, warning, error)
- `{{</* badge */>}}` - Inline badges
- `{{</* button href="..." */>}}` - Clickable buttons
- `{{</* icon "name" */>}}` - Inline icons (use in body text, NOT in headings)
- `{{</* typeit */>}}` - Typewriter text animation
- `{{</* mermaid */>}}` - Diagrams (use this, NOT code fences for mermaid)
- `{{</* github repo="user/repo" */>}}` - GitHub repo card
- `{{</* keywordList */>}}` + `{{</* keyword */>}}` - Tag-style keyword lists
- `{{</* tabs */>}}` + `{{</* tab "name" */>}}` - Tabbed content panels
- `{{</* accordion */>}}` + `{{</* accordionItem */>}}` - Collapsible sections
- `{{</* chart */>}}` - Chart.js charts
- `{{</* list */>}}` - Auto-generated content lists
- `{{</* katex */>}}` - Math formulas

### Important Shortcode Rules

- **Never put `{{</* icon */>}}` in headings** (`## heading`). It breaks
  rendering and produces `HAHAHUGOSHORTCODE` in output. Use icons only
  in body text, buttons, or inline content.
- Use `{{</* mermaid */>}}` shortcode for diagrams, not triple-backtick
  mermaid code fences.

## Writing Style Guide

Avoid common AI writing patterns:

- No excessive em dashes (use commas or periods instead)
- Avoid "Here's...", "The key insight...", "Let's dive in..."
- Avoid formal filler: "deceptively", "crucial", "essentially",
  "comprehensive", "robust", "streamlined"
- Mix short and long sentences naturally
- Use casual phrases: "turns out", "pretty much", "kind of"
- Write like you're explaining to a coworker, not writing a textbook
- Start paragraphs with specifics, not generic intros

## Image Handling

Place images in `assets/img/` for Hugo Pipes processing:

```markdown
![Alt text](img/my-image.png)
```

## Pre-commit

Run markdownlint before committing any content:

```bash
npx markdownlint-cli2 'content/**/*.md'
```

Fix all errors before committing.
