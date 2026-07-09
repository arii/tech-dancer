# ⚡ Agent Cheat Sheet

This document provides a condensed overview of the Tier 1 MCP tools and their Tier 2 CLI equivalents. Use these tools to minimize token usage and ensure consistent execution.

## 🛠️ Tier 1 (MCP) -> Tier 2 (CLI) Mapping

| Tier 1 MCP Tool | Tier 2 CLI Command Equivalent | Purpose |
| :--- | :--- | :--- |
| `repo.get_command_schema` | `td-cli schema "<path>"` | **Primary Schema Discovery** (Token Efficient) |
| `github.get_pr` | `td-cli gh view <PR>` | View PR details |
| `github.get_pr_diff` | `td-cli gh pr-diff <PR>` | Get PR diff |
| `github.search_open_prs` | `td-cli gh search-prs` | List/Search PRs |
| `github.issue_view` | `td-cli gh issue-view <ISSUE>` | View issue details |
| `github.create_pull_request`| `td-cli gh create-pr` | Create a new PR |
| `repo.run_playwright` | `td-cli repo run-playwright` | Run E2E tests |
| `repo.read_ci_logs` | `td-cli repo ci-logs <PR>` | Fetch CI logs |
| `boomtick.health` | `td-cli doctor` | Verify runtime environment |

## 🚀 Common CLI Workflows & Overrides

### PR Audit & Submission
If the standard MCP tools are insufficient, use the specialized audit command:
```bash
# Full audit flow: fetch, audit, and submit (Tier 2)
td-cli gh audit-pr <PR_NUMBER> --fetch --audit --submit --execute
```

### Environment Consistency
```bash
td-cli doctor         # Verify Node/pnpm versions
td-cli context-warm    # Refresh .agent-context.json
td-cli build           # Build the project
```

## ⚠️ Key Flags & Reminders

- **`--execute`**: Many `td-cli` commands default to `--dry-run`. You MUST append `--execute` (or use `--no-dry-run` if applicable) to commit changes.
- **`--json`**: Use this for structured data parsing when calling Tier 2 directly.
- **`--schema`**: Use `td-cli schema "subcommand"` to get only the relevant flags for a specific command instead of reading the entire `cli-schema.json`.
- **Zero Fallback**: Avoid raw `git` or `gh` commands if a `td-cli` or MCP tool exists.

See the full [AGENTS.md](../AGENTS.md) for core principles and detailed protocols.
