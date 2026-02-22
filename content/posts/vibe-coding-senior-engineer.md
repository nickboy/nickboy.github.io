---
title: "Vibe Coding Won't Replace Senior Engineers — It Will Amplify Them"
date: 2026-02-22
draft: false
tags: ["vibe-coding", "claude-code", "ai", "productivity"]
categories: ["AI & Productivity"]
description: "The hype says anyone can code now. The reality is more nuanced — vibe coding shifts what senior engineers do, but experience matters more than ever."
showTableOfContents: true
---

{{< lead >}}
The hype says anyone can code now. The reality? Vibe coding is changing *what* senior engineers do, not *whether* we're needed. And the gap between experienced and inexperienced developers is getting wider, not narrower.
{{< /lead >}}

Collins Dictionary named "vibe coding" their Word of the Year for 2025. Search interest spiked over 6,000%. The narrative is seductive: just describe what you want, AI writes the code, and programming becomes as easy as having a conversation.

I've been vibe coding professionally for over a year now — building production features, CI pipelines, and [this very site](/posts/vibe-coding-workflow/). Here's what the hype gets wrong and what it gets right.

## What Vibe Coding Actually Changes

The fundamental shift isn't about writing code faster. It's about the **feedback loop**. Before AI tools, you had an idea, researched how to implement it, wrote the code, debugged it, and iterated. That cycle could take hours for a non-trivial feature.

With vibe coding, the cycle compresses: describe, review, iterate. But — and this is the part most people miss — **the review step is where all the skill lives**. You need to:

- Recognize when generated code has subtle bugs
- Evaluate whether an approach will scale
- Spot security vulnerabilities in code that looks correct
- Know when the AI is confidently wrong

These are senior engineering skills. You can't review what you don't understand.

## Where Vibe Coding Shines

Let's be honest about what it's genuinely good at:

### Boilerplate and Scaffolding

Setting up a new project, generating config files, creating CI/CD pipelines — this kind of work is well-documented, pattern-heavy, and tedious. AI handles it well because there's usually a clear "right answer" that exists in its training data.

When I set up Cloudflare Pages deployment for this site, Claude Code generated a working GitHub Actions workflow on the first try. That would have taken me 30-45 minutes of reading docs.

### Test Generation

Describe the behavior you want to test, and AI generates reasonable test cases. It's particularly good at edge cases you might not think of. I've found this most useful for generating the scaffolding of test suites — I still review and adjust the assertions, but the boilerplate is handled.

### Documentation and Content

Writing docstrings, README sections, and code comments from existing code. The AI can read the implementation and describe what it does faster than I can type it.

### Learning New Frameworks

When I adopted the {{< badge >}}Blowfish{{< /badge >}} theme for Hugo, vibe coding let me explore its shortcodes and config options conversationally instead of reading through documentation linearly. I'd say "I want a timeline component showing my workflow" and get working code that taught me the API.

## Where Vibe Coding Fails

And here's where it breaks down, sometimes dangerously:

### Architecture Decisions

{{< alert "bolt" >}}
**This is the biggest risk.** AI tools will happily generate code for whatever architecture you describe — even if that architecture is wrong for your use case. They optimize for "does this work?" not "is this the right approach?"
{{< /alert >}}

When I started this site, I had to decide: Hugo vs. Next.js, content pages vs. data templates for experience sections, single config file vs. Blowfish's multi-file approach. These decisions have cascading consequences. An AI can implement any of them, but it can't tell you which one you'll regret in six months.

### Security

Generated code often takes the happy path. It may not sanitize inputs, handle authentication edge cases, or follow the principle of least privilege. In a production environment, shipping unreviewed AI-generated code is a liability.

### Performance Optimization

AI tools generate code that works, not code that's fast. They don't profile your application, understand your data access patterns, or know about the N+1 query that's going to tank your API at scale. Performance work requires understanding the system holistically — exactly the kind of reasoning AI tools struggle with.

### Debugging Complex Issues

When something goes wrong in a way that isn't a simple syntax error — race conditions, subtle state management bugs, infrastructure issues — you need deep understanding of the system. AI tools can help with "what does this error message mean?" but they can't replace the mental model you've built over years of working with a system.

## The Skill Shift: Writing Code to Directing AI

Here's what I've observed in my own work over the past year:

**I write less code.** My keystroke count is probably down 40-50%. But my output hasn't changed — if anything, I ship more features.

**I review more code.** Every piece of AI-generated code gets the same scrutiny I'd give a junior developer's pull request. Actually, more scrutiny, because a junior developer at least understands the codebase they're working in.

**I make more decisions.** With the implementation bottleneck reduced, the constraint becomes decision-making: what to build, how to structure it, what tradeoffs to accept. These are the skills that take years to develop.

**I communicate more precisely.** Writing good prompts is surprisingly similar to writing good technical specs. You need to be clear about requirements, constraints, and expected behavior. Vague specs produce vague results — from humans and AI alike.

{{< alert "graduation-cap" >}}
**The real skill shift**: Senior engineers are becoming more like technical leads and less like individual contributors, even when they're working solo. You're directing work, reviewing output, and making architectural calls — the AI handles the typing.
{{< /alert >}}

## The METR Study: Faster Feels, Slower Results

In 2025, METR (Model Evaluation & Threat Research) published a study that surprised many people: experienced developers using AI coding tools were **19% slower** on real-world tasks but **felt 20% faster**.

Why the disconnect?

1. **Context switching cost**: Reviewing AI output, correcting mistakes, and iterating on prompts takes time that doesn't feel like "work"
2. **False starts**: AI-generated code sometimes takes you down a wrong path, and backtracking erases the time savings
3. **Quality gaps**: Code that "works" on the first try often needs revision for edge cases, error handling, and production readiness
4. **Confidence bias**: Getting code instantly feels fast, even when the total cycle time (prompt → review → fix → test) is longer

This doesn't mean AI tools are useless. It means the value isn't raw speed — it's in the *type* of tasks that become feasible. I wouldn't have attempted to build a full Hugo site with custom theme configuration, CI/CD, and 7 blog posts in a weekend without AI assistance. The absolute time might not be faster per task, but the **ambition ceiling** is higher.

{{< mermaid >}}
quadrantChart
    title When to Vibe Code vs Hand-Code
    x-axis Low Complexity --> High Complexity
    y-axis Low Familiarity --> High Familiarity
    quadrant-1 Hand-code
    quadrant-2 Either approach works
    quadrant-3 Vibe code
    quadrant-4 Vibe code with careful review
{{< /mermaid >}}

## My Framework: When to Vibe Code

After a year of daily use, here's my decision process:

**Vibe code when:**

- The task is well-defined with clear inputs and outputs
- There are established patterns or documentation to draw from
- The blast radius of a mistake is low (config files, tests, documentation)
- You're scaffolding something new rather than modifying something complex
- You understand the domain well enough to review the output effectively

**Hand-code when:**

- The task requires deep understanding of existing system behavior
- Security or performance are critical
- You're debugging something subtle
- The architectural approach isn't settled yet
- You need to think through the problem, not just implement a solution

**The meta-rule**: If you wouldn't trust a junior developer's PR for this task without extensive review, don't trust AI-generated code either. And if you would — that's a great candidate for vibe coding.

## Predictions for 2027 and Beyond

Based on the trajectory I've seen:

1. **Context windows will keep growing.** The biggest limitation of current tools is losing context in long sessions. As context windows expand, the range of tasks suitable for vibe coding will grow.

2. **Review tools will emerge.** Right now, reviewing AI-generated code uses the same tools as reviewing human code. I expect specialized tools that highlight common AI failure patterns — security anti-patterns, performance pitfalls, outdated APIs.

3. **The skill premium shifts.** The most valuable engineering skill will be the ability to evaluate, direct, and integrate AI output into production systems. This is system design, not syntax knowledge.

4. **Hybrid workflows become standard.** The debate of "AI vs. no AI" will seem as quaint as "IDE vs. text editor." Every engineer will use AI tools; the differentiator will be how effectively.

5. **Junior engineers face a steeper learning curve.** If you skip the fundamentals and rely on AI from day one, you'll lack the knowledge needed to review AI output. The engineers who'll thrive are the ones who learn to code *and then* learn to direct AI.

The bottom line: vibe coding is a leverage multiplier. It amplifies whatever skills you bring to the table. For senior engineers with strong fundamentals, system design experience, and good judgment — it's a genuine superpower. For anyone hoping it replaces the need to understand software engineering? That's the hype talking.

I detail my daily workflow with Claude Code in [this post](/posts/vibe-coding-workflow/), and compare the major tools in my [2026 tool comparison](/posts/vibe-coding-tools-compared/).
