---
title: "My Vibe Coding Workflow: How I Built This Site with Claude Code"
date: 2026-02-22
draft: false
tags: ["vibe-coding", "claude-code", "ai", "productivity"]
categories: ["AI & Productivity"]
description: "A step-by-step look at how I rebuilt my portfolio site using vibe coding with Claude Code — what worked, what didn't, and the workflow patterns I actually use."
showTableOfContents: true
---

{{< lead >}}
I rebuilt my entire portfolio site in a weekend using vibe coding with {{< badge >}}Claude Code{{< /badge >}}. Here's what my workflow actually looks like — no hype, just the real process with honest tradeoffs.
{{< /lead >}}

If you've been following the AI discourse, you've probably heard the term "vibe coding" — coined by Andrej Karpathy in early 2025. The idea is simple: describe what you want in natural language, let the AI write the code, and focus on directing rather than typing. Collins Dictionary even named it Word of the Year.

But most takes on vibe coding are either breathless hype or dismissive eye-rolls. I wanted to share what it actually looks like when a senior engineer uses it for a real project.

## Why I Rebuilt This Site

My old portfolio was stale. It was a basic Jekyll site I'd set up years ago and barely touched. I wanted something that:

- Looked modern without me fighting CSS for a week
- Had a blog for technical writing
- Was fast and easy to deploy
- Didn't require a JavaScript framework for what's essentially static content

I chose **Hugo** because I'd used it before and respected its speed. I picked the {{< badge >}}Blowfish{{< /badge >}} theme because it had exactly the profile-style homepage I wanted, dark mode out of the box, and Tailwind CSS built in. I didn't need to evaluate 50 themes — I saw one that matched my mental picture and committed.

That decision — knowing what I wanted and picking quickly — is the kind of thing AI can't do for you.

## My Setup

The core of my vibe coding setup is straightforward:

- **Claude Code** running in my terminal (Ghostty + tmux)
- A **CLAUDE.md** file at the project root defining architecture, commands, and conventions
- **Plan Mode** for anything non-trivial (more on this below)
- **Git** on a feature branch so I can always roll back

{{< alert "bolt" >}}
**The CLAUDE.md file is the most underrated part of this workflow.** It's like onboarding documentation for your AI pair programmer. Mine specifies the Hugo version, theme, config file locations, deployment target, and coding conventions. Without it, every conversation starts from scratch.
{{< /alert >}}

### What I Tried Before

Before settling on Claude Code, I experimented with Copilot for autocomplete and Cursor for structured edits. They're good tools, but for this kind of project — scaffolding an entire site, configuring a theme, writing CI pipelines — I needed something that could reason about the full project context, not just the file I had open. See my [tool comparison](/posts/vibe-coding-tools-compared/) for the full breakdown of why I chose Claude Code.

## The Real Workflow, Step by Step

Here's how a typical session actually goes:

{{< timeline >}}

{{< timelineItem icon="lightbulb" header="Describe the Goal" badge="Step 1" >}}
I start by describing what I want in plain English. Not pseudocode, not implementation details — just the outcome. Example: "Migrate the site from the default Blowfish config to a profile-style homepage with my work experience and projects."
{{< /timelineItem >}}

{{< timelineItem icon="search" header="Plan Mode" badge="Step 2" >}}
For anything touching multiple files, I use Plan Mode. Claude reads the codebase, proposes a plan, and I review it before any code gets written. This is where I catch bad architectural decisions early.
{{< /timelineItem >}}

{{< timelineItem icon="code" header="Generate and Review" badge="Step 3" >}}
Claude writes the code. I review every change — not line by line like a code review, but structurally. Does this match how Blowfish expects configs? Is this the right Hugo partial to override?
{{< /timelineItem >}}

{{< timelineItem icon="pencil" header="Iterate and Fix" badge="Step 4" >}}
Rarely does the first pass work perfectly. I run <code>hugo server</code>, see what's off, and describe the issue. Sometimes I fix things myself — especially design choices and CSS tweaks.
{{< /timelineItem >}}

{{< timelineItem icon="check" header="Commit and Move On" badge="Step 5" >}}
Once a feature works, I commit on the feature branch and move to the next task. Small, focused commits so I can revert if needed.
{{< /timelineItem >}}

{{< /timeline >}}

### Where AI Saved Me Hours

Some tasks are perfect for vibe coding:

- **CI/CD pipeline**: I described my deployment target (Cloudflare Pages) and got a working GitHub Actions workflow in one shot. Setting up Hugo builds with the right version pinning would have taken me an hour of docs-reading.
- **Boilerplate content structure**: Creating the data files for experience, projects, and education with the exact YAML schema Blowfish expects.
- **Theme configuration**: Blowfish has dozens of params. Claude read the theme docs and generated a coherent `params.toml` with the settings I described.
- **Shortcode usage**: Instead of reading Blowfish's shortcode documentation for every component, I described what I wanted ("a timeline showing my workflow steps") and got working shortcode markup.

### Where I Had to Take Over

Other tasks don't work well with vibe coding:

- **Design taste**: "Make it look good" isn't a useful prompt. I had to make specific choices about color schemes, spacing, what information to highlight on the homepage.
- **Architectural decisions**: Should I use Hugo's data templates or content pages for work experience? That's a structural choice with long-term implications. I decided, then told the AI.
- **Debugging theme quirks**: When Blowfish's Hugo version compatibility warning showed up, I had to understand what it meant and decide to ignore it. When the Jekyll `.nojekyll` file kept appearing, I had to diagnose it myself.
- **Content and voice**: The actual writing — blog posts, about page copy, project descriptions — that's all me. AI can scaffold structure, but it can't know what I want to emphasize about my career.

## My Prompt Patterns

After dozens of sessions, I've noticed what works and what doesn't:

{{< tabs >}}
{{< tab "Effective Prompts" >}}

**Be specific about the outcome, vague about implementation:**

> "Add a blog section that shows the 5 most recent posts on the homepage with title, date, and a 2-line summary. Use whatever Blowfish shortcodes or partials are appropriate."

**Reference existing patterns:**

> "Create a new blog post following the same front matter format as my existing posts. The topic is terminal setup."

**Provide constraints:**

> "Update the CI pipeline but keep the build under 2 minutes. Don't add any npm dependencies."

{{< /tab >}}
{{< tab "Ineffective Prompts" >}}

**Too vague:**

> "Make the site better."

This generates random changes with no clear direction.

**Too prescriptive:**

> "On line 47 of params.toml, change the value of showRecent to 5 and then on line 52..."

If you're specifying exact line numbers, just edit the file yourself.

**No context:**

> "Fix the bug."

Which bug? What's the expected behavior? What did you observe? AI needs the same context a human colleague would.

{{< /tab >}}
{{< /tabs >}}

## The Honest Tradeoffs

### What I Gained

- **Speed on boilerplate**: Tasks that are well-documented but tedious (config files, CI pipelines, data schemas) go from hours to minutes.
- **Lower context-switching cost**: Instead of bouncing between docs, Stack Overflow, and my editor, I describe what I need and iterate.
- **Exploration**: I tried Blowfish features I wouldn't have bothered with manually — charts, timelines, keyword lists — because the cost of experimenting was near zero.

### What Felt Off

- **False confidence**: Sometimes the generated code looks correct but has subtle issues — a Hugo partial that works in development but breaks in production builds, or a config value that's deprecated.
- **Dependency on review skills**: If I didn't already know Hugo, I wouldn't catch the mistakes. Vibe coding amplifies your existing knowledge; it doesn't replace it.
- **Context limits**: Long sessions eventually lose context. I learned to keep sessions focused on one feature at a time.

{{< alert "graduation-cap" >}}
**Key insight**: Vibe coding doesn't reduce the skill required — it changes *where* the skill is applied. Instead of writing code, you're reviewing code, making architectural decisions, and evaluating tradeoffs. That's arguably harder.
{{< /alert >}}

## Advice for Engineers Considering This Workflow

1. **Start with a CLAUDE.md file.** Define your project's architecture, conventions, and tools before you start prompting. This is the single highest-leverage thing you can do.

2. **Use Plan Mode for anything non-trivial.** Don't let the AI start writing code until you've agreed on the approach. This prevents the most expensive mistakes.

3. **Stay on a feature branch.** Vibe coding generates a lot of changes fast. You need the safety net of easy reverts.

4. **Review structurally, not syntactically.** Don't read every line. Ask: does this change make sense architecturally? Does it follow the patterns in my project?

5. **Know when to take over.** If you've gone back and forth three times on the same issue, it's faster to just fix it yourself. The AI is a tool, not a pair programmer who will eventually "get it."

6. **Keep sessions focused.** One feature per session. Commit, then start fresh. Your AI assistant doesn't get tired, but it does lose context.

For a deeper look at where vibe coding fits in professional engineering, see my post on [why it amplifies senior engineers rather than replacing them](/posts/vibe-coding-senior-engineer/).

This site is the proof of concept. Every page, every blog post, every CI pipeline was built using this workflow. It's not magic — it's a genuinely useful tool when you know how to wield it.
