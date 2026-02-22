---
title: "Managing Dotfiles Like a Pro with Yadm"
date: 2026-01-15
draft: false
tags: ["dotfiles", "yadm", "automation", "devops"]
categories: ["Development Environment"]
description: "How I use yadm to manage my macOS dotfiles with automated testing, daily maintenance scripts, and a pre-commit workflow that keeps everything in check."
showTableOfContents: true
---

Every developer eventually reaches the point where their configs become too valuable to lose. For me, that moment came when I spent a weekend setting up a new MacBook and realized I couldn't reproduce my environment reliably. That's when I started managing my dotfiles properly.

After trying bare git repos, GNU Stow, and chezmoi, I settled on [yadm](https://yadm.io/) — and it's been my go-to for over a year.

## Why Yadm?

There are many dotfile managers. Here's why yadm won:

| Tool | Approach | My Take |
|------|----------|---------|
| **Bare git** | Raw git with `$HOME` as work tree | Works but fragile, no extras |
| **GNU Stow** | Symlink farm manager | Requires specific directory structure |
| **chezmoi** | Template-based with state management | Powerful but complex, uses its own DSL |
| **yadm** | Thin wrapper around git | Git-native, minimal learning curve, built-in extras |

The key insight: **yadm is just git**. Every git command works — `yadm add`, `yadm commit`, `yadm push`, `yadm diff`. If you know git, you know yadm. No new concepts to learn.

What yadm adds on top:

- **Alternate files**: Different configs per machine (work vs personal) using `##hostname` or `##os` suffixes
- **Encryption**: Encrypt sensitive files with GPG before pushing
- **Bootstrap**: Run a setup script on first clone
- **Native `$HOME` tracking**: No symlinks, files live where they belong

## My Directory Structure

Here's what I track:

```
~
├── .zshrc                    # Shell config (Zsh + Zinit + Oh-My-Zsh)
├── .tmux.conf                # tmux configuration
├── .config/
│   ├── ghostty/config        # Ghostty terminal
│   ├── kitty/kitty.conf      # Kitty terminal (backup)
│   ├── nvim/                 # Neovim/LazyVim config
│   ├── starship.toml         # Prompt
│   ├── atuin/config.toml     # Shell history
│   ├── mise/config.toml      # Version manager
│   └── ripgrep/config        # Ripgrep defaults
├── .local/bin/               # Custom scripts
├── .Brewfile                 # Homebrew packages
└── .yadm/
    └── hooks/pre-commit      # Pre-commit validation
```

The `.gitignore` is crucial — you want to explicitly track only what you need:

```gitignore
# Ignore everything by default
*
# Then selectively un-ignore
!.zshrc
!.tmux.conf
!.config/ghostty/
!.config/nvim/
!.Brewfile
# ... etc
```

## Automated Daily Maintenance

One of the more opinionated parts of my setup is `daily-maintenance.sh` — a script that runs automatically and keeps everything updated.

```bash
#!/bin/bash
# Runs daily via launchd, keeps tools fresh

# Homebrew
brew update && brew upgrade && brew cleanup

# Zinit plugins
zsh -ic 'zinit update --all'

# Neovim (via bob)
bob update --all

# LazyVim
nvim --headless "+Lazy! sync" +qa

# Cleanup broken symlinks in ~/.local/bin
find ~/.local/bin -type l ! -exec test -e {} \; -delete
```

The script:
- **Tracks last run date** to prevent duplicate runs
- **Catches up** if the laptop was off (runs on next login)
- Has quick aliases: `mr` (run), `ms` (status), `ml` (logs)

I also have a control script for managing it:

```bash
daily-maintenance-control.sh start   # Enable auto-run
daily-maintenance-control.sh stop    # Disable
daily-maintenance-control.sh status  # Check state
daily-maintenance-control.sh logs    # View recent logs
```

## Pre-Commit Testing

Every `yadm commit` runs through a pre-commit hook:

```bash
#!/bin/bash
# .yadm/hooks/pre-commit

# Run the test suite
bash ~/test-dotfiles.sh
if [ $? -ne 0 ]; then
    echo "Tests failed. Commit aborted."
    exit 1
fi
```

The test suite (`test-dotfiles.sh`) validates:

- **Shell syntax**: `bash -n` on all `.sh` files
- **ShellCheck**: Static analysis for shell scripts
- **Markdown lint**: All `.md` files pass markdownlint
- **YAML lint**: Configuration files are valid
- **File permissions**: Scripts in `.local/bin/` are executable
- **No secrets**: Checks for accidentally committed tokens or keys

This catches mistakes before they reach the repo. I never push broken configs.

## Version Management with Mise

[Mise](https://mise.jdx.dev/) (formerly rtx) manages language runtimes across my machines:

```toml
# ~/.config/mise/config.toml
[tools]
node = "lts"
python = "latest"
go = "latest"
ruby = "latest"

[settings]
idiomatic_version_file_enable = true  # Reads .nvmrc, .python-version, etc.
not_found_auto_install = true         # Auto-install missing versions
jobs = 4                              # Parallel installations
```

The `idiomatic_version_file_enable` setting is key — it means mise respects `.nvmrc`, `.python-version`, and `.tool-versions` files in project directories. So when I `cd` into a project that needs Node 18, mise automatically activates it.

## Practical Tips

### 1. Start Small

Don't try to track everything at once. Start with:
```bash
yadm add ~/.zshrc
yadm add ~/.config/ghostty/config
yadm commit -m "initial: shell and terminal config"
```

Add more as you modify things.

### 2. Use Branches for Experiments

```bash
yadm checkout -b experiment/new-shell-config
# Try things out...
yadm checkout main  # Revert if it didn't work
```

### 3. Bootstrap Script for New Machines

Create a bootstrap that gets a fresh machine to your preferred state:

```bash
#!/bin/bash
# ~/.config/yadm/bootstrap

# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install packages
brew bundle --file=~/.Brewfile

# Set default shell
chsh -s $(which zsh)

echo "Bootstrap complete. Restart your terminal."
```

Then on a new machine:
```bash
yadm clone https://github.com/youruser/dotfiles.git
yadm bootstrap
```

### 4. Keep Sensitive Data Out

Use `.gitignore` aggressively and yadm's encryption for anything sensitive:

```bash
# Encrypt SSH configs
yadm encrypt
```

Git credentials should go through Git Credential Manager, never in dotfiles.

### 5. Document Your Setup

I keep a `CLAUDE.md` in my dotfiles repo — it documents the architecture, conventions, and mandatory rules. This serves as both documentation for myself and instructions for AI assistants helping me modify configs.

## The Payoff

With this setup:

- **New machine setup**: Clone + bootstrap, done in under an hour
- **Daily updates**: Automated, zero manual intervention
- **Config changes**: Tested before commit, never push broken configs
- **Cross-machine sync**: `yadm pull` on any machine
- **Rollback**: Full git history, revert any change

The initial investment is a few hours. The ongoing cost is near zero. And the peace of mind knowing your entire development environment is versioned, tested, and reproducible? Priceless.

Check out my full setup at [github.com/nickboy/dotfiles](https://github.com/nickboy/dotfiles).
