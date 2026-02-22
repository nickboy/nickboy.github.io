---
title: "Catppuccin Mocha: Why I Theme Everything the Same Color"
date: 2026-02-22
draft: false
tags: ["terminal", "theming", "catppuccin", "productivity"]
categories: ["Development Environment"]
description: "How a single color palette across my terminal, editor, and tools creates visual consistency that reduces cognitive load — plus the exact hex values I use everywhere."
showTableOfContents: true
---

{{< lead >}}
Your development environment should feel like **one cohesive tool**, not a collection of unrelated windows with clashing colors. I theme everything with the same palette — {{< badge >}}Catppuccin Mocha{{< /badge >}} — and the result is a workspace where context-switching between tools is effortless.
{{< /lead >}}

## Why One Palette Everywhere?

Most developers pick a theme for their editor and call it a day. Their terminal is one color, their editor another, their tmux status bar a third, and their Git diffs something else entirely. Every time they switch contexts, their brain spends a fraction of a second recalibrating.

That friction adds up. When **red means error** in every single tool — terminal output, editor diagnostics, Git diffs, monitoring dashboards — you process information faster because your visual vocabulary is consistent.

## The Palette

[Catppuccin](https://github.com/catppuccin/catppuccin) is a community-driven pastel theme with four flavor variants. I use **Mocha**, the darkest flavor, across everything.

### Base Colors

{{< swatches "#1e1e2e" "#313244" "#45475a" >}}

Base, Surface0, Surface1 — the foundation. Deep blues that are easy on the eyes during long sessions.

### Accent Colors

{{< swatches "#89b4fa" "#f38ba8" "#a6e3a1" >}}

Blue (info/links), Red (errors/deletions), Green (success/additions) — these carry semantic meaning across every tool.

### Warm Accents

{{< swatches "#fab387" "#f9e2af" "#cba6f7" >}}

Peach (warnings), Yellow (highlights), Mauve (keywords) — used for syntax highlighting and UI accents.

## Where I Use It

Every tool in my daily workflow runs Catppuccin Mocha:

{{< chart >}}
type: 'doughnut',
data: {
  labels: ['Ghostty (Terminal)', 'Neovim (Editor)', 'tmux (Multiplexer)', 'FZF & Starship (Shell)', 'delta (Git Pager)', 'bat (Cat Replacement)'],
  datasets: [{
    data: [1, 1, 1, 1, 1, 1],
    backgroundColor: ['#89b4fa', '#f38ba8', '#a6e3a1', '#fab387', '#cba6f7', '#f9e2af'],
    borderColor: '#1e1e2e',
    borderWidth: 3
  }]
},
options: {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Tools Using Catppuccin Mocha',
      color: '#cdd6f4',
      font: { size: 16 }
    },
    legend: {
      labels: {
        color: '#cdd6f4',
        padding: 16
      }
    }
  }
}
{{< /chart >}}

## Configuration Snippets

Here's how I set up Catppuccin Mocha in each tool:

{{< tabs >}}

{{< tab "Ghostty" >}}

```bash
# ~/.config/ghostty/config
theme = catppuccin-mocha
background-opacity = 0.75
background-blur-radius = 20
```

Ghostty ships with Catppuccin built-in — just set the theme name. The transparency lets the palette blend with the desktop for a frosted-glass aesthetic.

{{< /tab >}}

{{< tab "Neovim" >}}

```lua
-- LazyVim extra or manual plugin
{ "catppuccin/nvim",
  name = "catppuccin",
  opts = {
    flavour = "mocha",
    transparent_background = true,
    integrations = {
      treesitter = true,
      telescope = { enabled = true },
      which_key = true,
    },
  },
}
```

The Catppuccin Neovim plugin has first-class integrations with virtually every popular plugin — Treesitter, Telescope, nvim-cmp, and more all get coordinated colors.

{{< /tab >}}

{{< tab "tmux" >}}

```bash
# ~/.config/tmux/tmux.conf
set -g @plugin 'catppuccin/tmux'
set -g @catppuccin_flavor 'mocha'
set -g @catppuccin_window_status_style "rounded"
```

The tmux plugin adds a themed status bar with window indicators, session name, and system info — all matching the terminal and editor.

{{< /tab >}}

{{< tab "FZF" >}}

```bash
# ~/.zshrc
export FZF_DEFAULT_OPTS=" \
--color=bg+:#313244,bg:#1e1e2e,spinner:#f5e0dc \
--color=hl:#f38ba8,fg:#cdd6f4,header:#f38ba8 \
--color=info:#cba6f7,pointer:#f5e0dc,marker:#f5e0dc \
--color=fg+:#cdd6f4,prompt:#cba6f7,hl+:#f38ba8"
```

FZF's color configuration takes raw hex values, so you set each UI element individually. Once configured, fuzzy finding matches the rest of your environment perfectly.

{{< /tab >}}

{{< tab "delta" >}}

```gitconfig
# ~/.gitconfig
[delta]
    syntax-theme = Catppuccin Mocha
    minus-style = syntax "#3B1219"
    plus-style = syntax "#1C3A2D"
```

Delta (the Git pager) uses the Catppuccin bat theme for syntax highlighting in diffs. The custom minus/plus styles tint additions green and deletions red using the Mocha palette.

{{< /tab >}}

{{< /tabs >}}

## The Cognitive Load Argument

{{< alert "lightbulb" >}}
**The real benefit isn't aesthetics** — it's that context-switching between terminal, editor, and browser no longer requires your brain to re-adapt to different color semantics. Red means error everywhere. Blue means info everywhere. Green means success everywhere.
{{< /alert >}}

When I jump from reading a Git diff (red = deleted, green = added) to my editor (red = error diagnostic, green = test passing) to my terminal output (red = failed command, green = success), my brain doesn't skip a beat. The color semantics are identical.

This is the same principle behind why airports, hospitals, and road signs use standardized color systems. Consistency reduces cognitive overhead.

## The Full Color Reference

For anyone wanting to replicate this setup, here are the key Catppuccin Mocha values I use most:

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Base | Dark blue | `#1e1e2e` | Backgrounds |
| Text | Light lavender | `#cdd6f4` | Primary text |
| Blue | Soft blue | `#89b4fa` | Links, info, variables |
| Red | Soft red | `#f38ba8` | Errors, deletions |
| Green | Soft green | `#a6e3a1` | Success, additions |
| Peach | Warm peach | `#fab387` | Warnings, numbers |
| Yellow | Soft yellow | `#f9e2af` | Highlights, strings |
| Mauve | Purple | `#cba6f7` | Keywords, headings |
| Overlay | Muted gray | `#6c7086` | Comments, secondary text |

## Getting Started

If you want to try Catppuccin Mocha yourself, the project has ports for [300+ apps](https://github.com/catppuccin/catppuccin). Start with your terminal emulator and editor, then expand from there.

{{< github repo="catppuccin/catppuccin" >}}

For my complete configuration files including all the snippets above, check out my dotfiles:

{{< github repo="nickboy/dotfiles" >}}
