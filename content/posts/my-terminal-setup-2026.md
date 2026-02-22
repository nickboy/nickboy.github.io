---
title: "My Terminal Setup in 2026: Ghostty, tmux, and Neovim"
date: 2026-02-15
draft: false
tags: ["terminal", "ghostty", "tmux", "neovim", "productivity"]
categories: ["Development Environment"]
description: "A walkthrough of my daily development environment built around Ghostty, tmux with sesh, and Neovim with LazyVim — tuned for speed, aesthetics, and seamless navigation."
showTableOfContents: true
---

After years of refining my terminal workflow, I've landed on a stack I genuinely enjoy using every day: **Ghostty** as the terminal emulator, **tmux** with **sesh** for session management, and **Neovim** with **LazyVim** for editing. Everything runs on macOS (Apple Silicon) with a consistent **Catppuccin Mocha** theme across all tools.

Here's a deep dive into how it all fits together.

## Ghostty: The Terminal Emulator

I switched to [Ghostty](https://ghostty.org) from Kitty a while back and haven't looked back. It's written in Zig, GPU-accelerated, and buttery smooth.

My key configuration choices:

```bash
# ~/.config/ghostty/config
theme = catppuccin-mocha
font-family = "Hack Nerd Font Mono"
font-size = 14
background-opacity = 0.75
background-blur-radius = 20
```

The **75% transparency with 20px blur** gives a nice frosted-glass look where my desktop wallpaper bleeds through — purely aesthetic, but it makes long coding sessions more pleasant.

### Quake-style Drop-down Terminal

One of my favorite features is the quick terminal bound to `Cmd+backtick`:

```bash
keybind = global:super+grave_accent=toggle_quick_terminal
quick-terminal-position = top
quick-terminal-screen = main
quick-terminal-animation-duration = 0.1
```

It slides down from the top of the screen for quick commands without leaving my current context. I use it constantly for git operations, running tests, and quick file checks.

### Split Panes

```bash
keybind = super+shift+d=new_split:right
keybind = super+d=new_split:down
keybind = super+shift+enter=toggle_split_zoom
```

These mirror my tmux bindings closely, so muscle memory works regardless of whether I'm in a tmux session or not.

## tmux + sesh: Session Management

tmux is the backbone of my workflow. I use **Ctrl+A** as my prefix (classic screen users will relate) and [sesh](https://github.com/joshmedeski/sesh) for smart session management.

### Core Configuration

```bash
# Prefix
set -g prefix C-a
unbind C-b
bind C-a send-prefix

# Start windows and panes at 1, not 0
set -g base-index 1
setw -g pane-base-index 1

# Mouse support
set -g mouse on

# True color support
set -g default-terminal "tmux-256color"
set -ag terminal-overrides ",xterm-256color:RGB"
```

### The sesh Session Picker

The killer feature is pressing `Prefix + T` to get an FZF-powered session picker:

```bash
bind-key "T" run-shell "sesh connect \"$(
  sesh list | fzf-tmux -p 55%,60% \
    --no-sort --border-label ' sesh ' \
    --prompt '> ' \
    --header '  ^a all ^t tmux ^g configs ^x zoxide ^d tmux kill ^f find' \
    --bind 'tab:down,btab:up' \
    --bind 'ctrl-a:change-prompt(> )+reload(sesh list)' \
    --bind 'ctrl-t:change-prompt(> )+reload(sesh list -t)' \
    --bind 'ctrl-g:change-prompt(> )+reload(sesh list -c)' \
    --bind 'ctrl-x:change-prompt(> )+reload(sesh list -z)' \
    --bind 'ctrl-f:change-prompt(> )+reload(fd -H -d 2 -t d -E .Trash . ~)' \
    --bind 'ctrl-d:execute(tmux kill-session -t {})+change-prompt(> )+reload(sesh list)'
)\""
```

This gives me instant access to all tmux sessions, zoxide directories, and config paths — all fuzzy-searchable. I can jump between projects in under a second.

### vim-tmux-navigator

For seamless navigation between tmux panes and Neovim splits, I use [vim-tmux-navigator](https://github.com/christoomey/vim-tmux-navigator). `Ctrl+h/j/k/l` moves between panes regardless of whether they're tmux panes or Neovim windows.

### Session Persistence

```bash
# tmux-resurrect + tmux-continuum
set -g @resurrect-capture-pane-contents 'on'
set -g @continuum-restore 'on'
set -g @continuum-save-interval '15'
```

Sessions survive restarts. I never lose my workspace layout.

## Neovim with LazyVim

I run Neovim via [bob](https://github.com/MordechaiHadad/bob) (a Neovim version manager) and use [LazyVim](https://www.lazyvim.org/) as my configuration framework.

### LazyVim Extras

I have 19 extras enabled, including:

- **AI**: `claudecode` and `copilot` for AI-assisted coding
- **Languages**: Docker, Go, Java, JSON, Markdown, Python, Rust, TOML, TypeScript
- **Editor**: `harpoon2` for quick file marks, `inc-rename` for live rename preview
- **UI**: `treesitter-context` for sticky function headers
- **DAP**: Core debugging support
- **Testing**: Core test runner

### Key Customizations

```lua
-- Transparent background to match Ghostty
{ "catppuccin/nvim", opts = {
    transparent_background = true,
}}

-- Smooth scrolling
{ "karb94/neoscroll.nvim", opts = {
    duration_multiplier = 0.4,
    easing = "linear",
}}

-- Global statusline
vim.opt.laststatus = 3
vim.opt.scrolloff = 10
vim.opt.cmdheight = 0
```

### Claude Code Integration

I recently added keybindings for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) directly in Neovim:

```lua
-- Toggle Claude Code terminal
vim.keymap.set("n", "<leader>ac", function()
  require("snacks").terminal.toggle("claude", { win = { style = "terminal" }})
end, { desc = "Claude Code Toggle" })

-- Send visual selection to Claude
vim.keymap.set("v", "<leader>as", function()
  -- Yanks selection and sends to Claude terminal
end, { desc = "Claude Code Send Selection" })
```

This lets me highlight code, send it to Claude for analysis, and apply suggestions — all without leaving the editor.

## The Full Flow

Here's how it all connects in my daily work:

1. **Launch Ghostty** — transparent, GPU-accelerated terminal appears
2. **`Prefix + T`** — sesh picker opens, I fuzzy-search for a project
3. **tmux session loads** — with my saved layout (editor left, terminal right)
4. **Neovim opens** — LazyVim with treesitter highlighting, LSP, and AI assistance
5. **Navigate freely** — `Ctrl+h/j/k/l` moves between Neovim and tmux panes seamlessly
6. **Quick terminal** — `Cmd+backtick` for one-off commands without context switching

Everything shares the same **Catppuccin Mocha** color scheme, so the visual experience is cohesive. The transparent backgrounds mean my terminal, editor, and status bars all blend together.

## Wrapping Up

This setup has evolved over many iterations. The key principles:

- **Consistency**: Same theme, same keybindings philosophy across all tools
- **Speed**: Every action should take less than a second
- **Integration**: Tools should talk to each other (vim-tmux-navigator, sesh + zoxide, etc.)

All my configs are managed with [yadm](https://yadm.io/) and available on [GitHub](https://github.com/nickboy/dotfiles). Feel free to steal what's useful.
