# Tooling and MCP Protocol

This protocol defines the tool selection hierarchy to ensure fast, reliable, and asynchronous operations. Agents must prioritize specialized tools over general-purpose shell commands.

## 🧐 Intelligence First: Index and Schema

Before executing any command, agents MUST:
1.  **Consult `.agent-context.json`**: This is the ground truth for repository structure, current feature flags, and metadata.
2.  **Consult `dev-tools/cli-schema.json`**: This is the canonical authority for local CLI commands. Never guess flags or run `--help`.

## 🧬 Hierarchy of Tooling

1.  **Tier 1: Boomtick MCP Tools** (Primary) - Use these first. They are optimized for the repository and provide structured, asynchronous output.
2.  **Tier 2: Local Dev-Tools** (`dev-tools/td_cli.py`) - Use if a Tier 1 tool is unavailable or if the CLI version provides necessary specialized logic.
3.  **Tier 3: Raw Bash/CLI Commands** (Fallback) - Only use if no Tier 1 or Tier 2 tool exists for the specific task.

---

## 🗺️ Tool Mapping Table

| Category | Task | Tier 1: MCP Tool (Primary) | Tier 2: Local Dev-Tools (`td_cli.py`) | Tier 3: Raw Bash/CLI (Fallback) |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub** | Search PRs | `github.search_open_prs` | `python3 dev-tools/td_cli.py gh search-prs` | `gh pr list` |
| **GitHub** | Get PR Diff | `github.get_pr_diff` | `python3 dev-tools/td_cli.py gh pr-diff <PR>` | `gh pr diff <PR>` |
| **GitHub** | Check Conflicts | `github.get_merge_conflict_files` | `python3 dev-tools/td_cli.py gh merge-conflicts <PR>` | `git merge-tree` |
| **GitHub** | Comment on PR | `github.comment_triage_summary` | - | `gh pr comment` |
| **Repository** | List Changed Files | `repo.get_changed_files` | - | `git diff --name-only` |
| **Repository** | Read CI Logs | `repo.read_ci_logs` | `python3 dev-tools/td_cli.py repo ci-logs <PR>` | `gh run view` |
| **Testing** | Run Vitest | `repo.run_tests` | - | `pnpm test` |
| **Testing** | Run Playwright | `repo.run_playwright` | `python3 dev-tools/td_cli.py repo run-playwright` | `npx playwright test` |
| **Testing** | Run Lighthouse | `repo.run_lighthouse` | - | `npx lhci autorun` |
| **Automation** | Create Jules Session | `jules.create_session` | `python3 dev-tools/td_cli.py agent dispatch` | - |

---

## 🛠️ MCP Tool Usage Guidelines

### Asynchronous Operations
Always prefer MCP tools for heavy operations (like running tests or fetching large diffs) to avoid blocking the main execution thread and to leverage built-in timeouts and safety guards.

### Safety and Isolation
Boomtick MCP tools automatically handle isolated worktrees for mutating operations. Do **not** manually create worktrees via bash if a corresponding MCP tool (e.g., `repo.create_repair_branch`) is available.

### Redaction and Tokens
MCP tools automatically handle token redaction and authentication. Avoid passing raw `GITHUB_TOKEN` values in bash commands if an MCP tool can perform the same action.
