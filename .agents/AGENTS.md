# Tooling and MCP Protocol

This protocol defines the tool selection hierarchy to ensure fast, reliable, and asynchronous operations. Agents must prioritize specialized tools and structured metadata over general-purpose shell commands.

## 🧐 Intelligence First: Index and Schema

Before executing any command or searching the filesystem, agents **MUST** consult the following ground-truth files. This is the primary way to understand the repository state without redundant exploration.

1.  **`.agent-context.json`**: The canonical repository index. Contains the file tree, package manifests, and active project configurations.
2.  **`dev-tools/cli-schema.json`**: The single source of truth for all local developer tools (`td_cli.py`). Never use `--help`.

## 🧬 Hierarchy of Tooling

Agents must follow this hierarchy for every task:

1.  **Tier 1: Boomtick MCP Tools** (Primary) - Optimized for repository-specific tasks. Asynchronous and structured.
2.  **Tier 2: Local Dev-Tools** (`dev-tools/td_cli.py`) - Specialized repository logic for auditing and lifecycle management.
3.  **Tier 3: Raw Bash/CLI Commands** (Fallback) - Only for tasks with no Tier 1 or Tier 2 coverage.

---

## 🗺️ Tool Mapping Table

| Category | Task | Tier 1: MCP Tool (Primary) | Tier 2: Local Dev-Tools (`td_cli.py`) | Tier 3: Raw Bash/CLI (Fallback) |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub** | Search PRs | `github.search_open_prs` | `gh search-prs` | `gh pr list` |
| **GitHub** | Get PR Diff | `github.get_pr_diff` | `gh pr-diff <PR>` | `gh pr diff <PR>` |
| **GitHub** | Check Conflicts | `github.get_merge_conflict_files` | `gh merge-conflicts <PR>` | `git merge-tree` |
| **GitHub** | Audit PR | - | `gh audit-pr <PR>` | - |
| **GitHub** | Comment on PR | `github.comment_triage_summary` | - | `gh pr comment` |
| **Repository** | List Changed Files | `repo.get_changed_files` | - | `git diff --name-only` |
| **Repository** | Read CI Logs | `repo.read_ci_logs` | `repo ci-logs <PR>` | `gh run view` |
| **Testing** | Run Vitest | `repo.run_tests` | - | `pnpm test` |
| **Testing** | Run Playwright | `repo.run_playwright` | `repo run-playwright` | `npx playwright test` |
| **Testing** | Run Lighthouse | `repo.run_lighthouse` | - | `npx lhci autorun` |
| **Automation** | Create Jules Session | `jules.create_session` | `agent dispatch` | - |
| **Audit** | UI Anti-patterns | - | - | `pnpm run audit:anti-patterns` |

*Note: For Tier 2, always prefix with `python3 dev-tools/td_cli.py`.*

---

## 🛠️ Usage Guidelines

### 🔄 Refreshing the Index
If the index appears stale, run `pnpm run agent:prime`. Git hooks automatically refresh it on branch switches and merges.

### ⚡ Performance
Always prefer MCP tools for heavy operations. They prevent blocking the main execution thread and handle environment-specific redacting.

### 🛡️ Safety
MCP tools use isolated worktrees for mutating operations. Do not manually manage worktrees if `repo.create_repair_branch` or similar tools are available.
