# ⚡ Agent Cheat Sheet

This is a condensed guide for optimized tool usage. For full protocols and principles, consult **[AGENTS.md](../AGENTS.md)**.

## 🛠️ Tool Selection

| Goal | Primary Tool (Tier 1 / MCP) | CLI Equivalent (Tier 2) |
| :--- | :--- | :--- |
| **Discover Args** | `repo.get_command_schema` | `td-cli schema "<path>"` |
| **Search PRs** | `github.search_open_prs` | `td-cli gh search-prs` |
| **Tests/CI** | `repo.run_playwright` | `td-cli repo run-playwright`|
| **Environment** | `boomtick.health` | `td-cli doctor` |

## 🚀 Key Overrides

- **PR Audit**: `td-cli gh audit-pr <PR> --fetch --audit --submit --execute`
- **Context Refresh**: `td-cli context-warm` (updates `.agent-context.json`)

## ⚠️ Reminders

- **Token Efficiency**: Always prefer `repo.get_command_schema` over reading the 70KB `cli-schema.json`.
- **Commit Changes**: CLI commands require `--execute` to bypass the default dry-run mode.
- **Zero Fallback**: Special tools (Tier 1/2) must be used over raw `git`/`gh` when available.
