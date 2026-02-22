---
title: "Modern CLI Tools That Replaced My Unix Classics"
date: 2026-02-01
draft: false
tags: ["cli", "tools", "rust", "productivity", "terminal"]
categories: ["Development Environment"]
description: "A practical guide to modern CLI alternatives — bat, eza, ripgrep, fd, zoxide, and more — that have permanently replaced my traditional Unix toolbox."
showTableOfContents: true
---

{{< lead >}}
I've been gradually replacing classic Unix tools with modern alternatives, mostly written in {{< badge >}}Rust{{< /badge >}}. After a year of daily use, these aren't experiments anymore — they're muscle memory.
{{< /lead >}}

## The Replacements

| Classic | Modern | Why |
|---------|--------|-----|
| `cat` | {{< badge >}}bat{{< /badge >}} | Syntax highlighting, line numbers, git integration |
| `ls` | {{< badge >}}eza{{< /badge >}} | Icons, git status, tree view, color-coded |
| `grep` | {{< badge >}}ripgrep{{< /badge >}} | 10x faster, respects `.gitignore`, smart case |
| `find` | {{< badge >}}fd{{< /badge >}} | Simpler syntax, respects `.gitignore`, colored output |
| `cd` | {{< badge >}}zoxide{{< /badge >}} | Learns your habits, fuzzy matching |
| `sed` | {{< badge >}}sd{{< /badge >}} | Intuitive regex syntax, no escaping nightmare |
| `du` | {{< badge >}}dust{{< /badge >}} | Visual directory size with a tree view |
| `df` | {{< badge >}}duf{{< /badge >}} | Colorful, filterable disk usage |
| `top` | {{< badge >}}btop{{< /badge >}} | Beautiful TUI with mouse support, per-core graphs |
| `ps` | {{< badge >}}procs{{< /badge >}} | Colorized, searchable, tree view |
| `history` | {{< badge >}}atuin{{< /badge >}} | Encrypted sync, full-text search, workspace filtering |

### Setting Up Aliases

In my `.zshrc`, I alias the classics to their replacements so the transition is invisible:

```bash
alias cat="bat"
alias vim="nvim"
alias vi="nvim"
alias top="btop"
alias du="dust"
alias df="duf"
alias ps="procs"
```

For `eza`, I use a Zinit plugin that configures it with sensible defaults:

```bash
zinit light z-shell/zsh-eza
# Gives me: ls, ll, la, lt all backed by eza with --git, --icons, --group-directories-first
```

## Deep Dive: The Tools That Matter Most

### bat — cat with Wings

bat isn't just `cat` with colors. I use it as:

- A pager for other tools (git diff, man pages)
- A preview engine for FZF
- A syntax highlighter for Atuin's history preview

```bash
# Use bat as the FZF preview
export FZF_CTRL_T_OPTS="--preview 'bat -n --color=always --line-range :500 {}'"
```

{{< github repo="sharkdp/bat" >}}

### ripgrep — The Search Engine

ripgrep is absurdly fast. My `.ripgreprc` configures smart defaults:

```bash
--smart-case        # Case-insensitive unless you use uppercase
--follow            # Follow symlinks
--hidden            # Search hidden files
--max-filesize=100M
```

I also define custom file type groups:

```bash
--type-add=web:*.{html,css,js,ts,jsx,tsx,vue,svelte}
--type-add=config:*.{json,yaml,yml,toml,ini,conf}
--type-add=shell:*.{sh,bash,zsh,fish}
```

Then I can search only web files: `rg "useState" --type web`.

{{< alert "bolt" >}}
**Power move**: `rgf` — ripgrep piped into FZF with a preview, opening results in Neovim.
{{< /alert >}}

```bash
rgf() {
  rg --color=always --line-number --no-heading "$@" |
    fzf --ansi --delimiter ':' \
        --preview 'bat --color=always {1} --highlight-line {2}' \
        --preview-window 'up,60%,border-bottom,+{2}+3/3,~3' |
    awk -F: '{print "+"$2, $1}' |
    xargs -r nvim
}
```

{{< github repo="BurntSushi/ripgrep" >}}

### zoxide — cd That Learns

After using zoxide for a few months, I can't go back. It learns which directories you visit most:

```bash
z work      # jumps to ~/workspace (most visited match)
z dot       # jumps to ~/dotfiles
zi          # interactive mode with FZF
```

I integrate it with FZF for even more power:

```bash
eval "$(zoxide init zsh --hook pwd)"
```

### fd — find for Humans

{{< tabs >}}
{{< tab "Classic find" >}}

```bash
# find hidden .env files, ignoring node_modules
find . -name ".env" -not -path "*/node_modules/*"
```

{{< /tab >}}
{{< tab "Modern fd" >}}

```bash
# same thing
fd .env
```

{{< /tab >}}
{{< /tabs >}}

fd respects `.gitignore` by default and is the engine behind my FZF file finder:

```bash
export FZF_DEFAULT_COMMAND='fd --type f --strip-cwd-prefix --hidden --follow --exclude .git'
```

## FZF: The Glue That Binds Everything

FZF isn't a replacement — it's an amplifier. It makes every other tool interactive.

### fzf-tab: Tab Completion on Steroids

```bash
zinit light Aloxaf/fzf-tab

# Preview files and directories during tab completion
zstyle ':fzf-tab:complete:cd:*' fzf-preview 'eza -1 --color=always $realpath'
zstyle ':fzf-tab:complete:cat:*' fzf-preview 'bat --color=always $realpath'
```

Now when I type `cd <TAB>`, I get a fuzzy searchable list with directory previews. Same for `cat`, `vim`, and any other command.

### Git Integration

```bash
# Fuzzy branch switcher
gb() {
  git branch --all --sort=-committerdate |
    fzf --preview 'git log --oneline --graph --color=always {1}' |
    sed 's/remotes\/origin\///' |
    xargs git checkout
}
```

### Catppuccin Theme for FZF

Everything gets the same color treatment:

```bash
export FZF_DEFAULT_OPTS=" \
  --color=bg+:#313244,bg:#1e1e2e,spinner:#f5e0dc,hl:#f38ba8 \
  --color=fg:#cdd6f4,header:#f38ba8,info:#cba6f7,pointer:#f5e0dc \
  --color=marker:#b4befe,fg+:#cdd6f4,prompt:#cba6f7,hl+:#f38ba8 \
  --color=selected-bg:#45475a"
```

## Atuin: Shell History Reimagined

[Atuin](https://atuin.sh/) replaces the basic shell history with a SQLite-backed, encrypted, cross-machine synced history.

Key features I rely on:

```toml
# ~/.config/atuin/config.toml
enter_accept = true          # Execute on Enter, not just select
keymap_mode = "auto"         # Respects my Zsh vi-mode
workspaces = true            # Filter by git repo when pressing Up
filter_mode_shell_up_key_binding = "workspace"
style = "compact"
show_preview = true
```

{{< alert "star" >}}
**Killer feature**: Workspace filtering. When I press Up in a git repo, I only see commands I ran in that repo. No more scrolling through unrelated history.
{{< /alert >}}

The secrets filter automatically strips AWS keys, GitHub tokens, and passwords from history:

```toml
secrets_filter = true
history_filter = [
  "^export (AWS|GITHUB|SLACK|TOKEN|SECRET|PASSWORD|KEY)",
]
```

## Starship: The Prompt

[Starship](https://starship.rs/) gives me a fast, informative prompt with minimal configuration. My setup uses Catppuccin Mocha colors with status-bar-style background segments:

- OS icon + username
- Current directory (truncated to 3 levels, with custom icons for ~/Documents, ~/Developer, etc.)
- Git branch + status (ahead/behind/dirty indicators)
- Active language versions (Python, Go, Rust, Node — only shown when relevant)
- Command duration (only if > 45 seconds)

## Installation

{{< alert >}}
All of these tools are in my Brewfile — one `brew bundle` and you're set.
{{< /alert >}}

```bash
# Modern CLI replacements
brew "bat"
brew "eza"
brew "ripgrep"
brew "fd"
brew "fzf"
brew "zoxide"
brew "sd"
brew "dust"
brew "duf"
brew "btop"
brew "procs"
brew "atuin"
brew "starship"
```

## Worth the Switch?

Absolutely. The common thread across all these tools:

1. **Better defaults** — they do what you want without flags
2. **Respect `.gitignore`** — no more accidentally grepping `node_modules`
3. **Colored output** — easier to scan visually
4. **Speed** — most are written in Rust and noticeably faster on large codebases

The transition cost is low — alias the classics, and you'll barely notice the switch. But you'll definitely notice when you're on a machine without them.

Full configs in my dotfiles repo:

{{< github repo="nickboy/dotfiles" >}}
