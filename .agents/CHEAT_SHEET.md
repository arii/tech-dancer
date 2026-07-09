# ⚡ Agent Cheat Sheet (Optimized)

This condensed guide maps common operations to their most efficient Tier 1 (MCP) or Tier 2 (CLI) tools. For full protocols and core principles, always consult the main [AGENTS.md](../AGENTS.md).

## 🛠️ Efficient Tool Selection

| Action | Primary Tool (Tier 1 / MCP) | CLI Equivalent (Tier 2) |
| :--- | :--- | :--- |
| **Discover Args** | `repo.get_command_schema` | `td-cli schema "<path>"` |
| **PR View** | `github.get_pr` | `td-cli gh view <PR>` |
| **PR Diff** | `github.get_pr_diff` | `td-cli gh pr-diff <PR>` |
| **Search PRs** | `github.search_open_prs` | `td-cli gh search-prs` |
| **Create PR** | `github.create_pull_request`| `td-cli gh create-pr` |
| **Issue View** | `github.issue_view` | `td-cli gh issue-view <ID>` |
| **Tests/CI** | `repo.run_playwright` | `td-cli repo run-playwright`|
| **Health Check** | `boomtick.health` | `td-cli doctor` |

## 🚀 Key Overrides & Flags

- **Full PR Audit**: `td-cli gh audit-pr <PR> --fetch --audit --submit --execute`
- **Context Refresh**: `td-cli context-warm` (updates `.agent-context.json`)
- **Execution**: Many CLI commands require `--execute` to commit changes; otherwise, they default to `--dry-run`.
- **Structured Data**: Use `--json` with Tier 2 commands for machine-readable output.

## ⚠️ Reminders

- **Token Efficiency**: Use `repo.get_command_schema` instead of reading the full `cli-schema.json`.
- **Zero Fallback**: Avoid raw `git` or `gh` commands if a specialized tool exists.
