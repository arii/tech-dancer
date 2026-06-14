# BoomTick.blog — Content Contributor Guide

This guide explains how to add new content to the site using GitHub Issues and the automated PR workflow. For instructions on setting up the developer/agent environment, see [docs/agent/environment-setup.md](docs/agent/environment-setup.md).

## How It Works

**You write the issue** → **Bot extracts markdown** → **PR opens** → **You merge**

## Submitting Content via GitHub Issue

1. **New Issue**: Title it `Draft: <Your Post Title Here>`.
2. **Body**: Paste a fenced markdown block:
   \```markdown
   <content>
   \```

## Checklist

- [ ] Issue title starts with `Draft:`
- [ ] Body contains a single `\```markdown` block
- [ ] Frontmatter includes required fields (see root README.md)
- [ ] Affiliate disclosure included if product links appear
