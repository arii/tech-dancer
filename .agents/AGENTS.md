# Tooling and MCP Protocol

This protocol defines the tool selection hierarchy to ensure fast, reliable, and asynchronous operations. Agents must prioritize specialized tools and structured metadata over general-purpose shell commands.

## 🛑 MCP is Not Optional

Direct shell execution for common Git/GitHub tasks (e.g., `gh pr diff`, `git diff`) is considered a **Contract Violation**. MCP tools provide necessary safety guards, token redaction, and structured output that raw commands lack.

**Violation Pattern Example:**
> ❌ *Bad: "I will now run `gh pr diff 123` to see the changes."*
> ✅ *Good: "I will use `github.get_pr_diff({ prNumber: 123 })` to retrieve the structured diff."*

---

## 🧐 Intelligence First: Index and Schema

Before executing any command or searching the filesystem, agents **MUST** consult the following ground-truth files. This is the primary way to understand the repository state without redundant exploration.

1.  **`.agent-context.json`**: The canonical repository index. Contains package manifests and active project configurations.
2.  **`dev-tools/cli-schema.json`**: The single source of truth for all local developer tools (`td_cli.py`). Never use `--help`.

---

## 🧬 Hierarchy of Tooling

Consult the detailed **Tool Mapping Table** in the root `AGENTS.md` for tier-based command selection.

1.  **Tier 1: Boomtick MCP Tools** (Primary) - Optimized for repository-specific tasks. Asynchronous and structured.
2.  **Tier 2: Local Dev-Tools** (`dev-tools/td_cli.py`) - Specialized repository logic for auditing and lifecycle management.
3.  **Tier 3: Raw Bash/CLI Commands** (Fallback) - Only for tasks with no Tier 1 or Tier 2 coverage.

---

## 🤖 Code Review Input Chain

When performing a code review, the following input chain **MUST** be respected to avoid hallucination:

| Role | Primary Input Source | Fallback / Context |
| :--- | :--- | :--- |
| **Architect** | `repo://diff/{PR}` | `repo://routes` |
| **Security** | `repo://diff/{PR}` | `repo://package-json` |
| **Style/UX** | `repo://diff/{PR}` | `repo://design-tokens` |
| **Verifier** | `repo://ci/{PR}` | `repo://playwright/{branch}` |

---

## 🛠️ Usage Guidelines

### 🔄 Refreshing the Index
If the index appears stale, run `pnpm run agent:prime`. Git hooks automatically refresh it on branch switches and merges.

### ⚡ Performance
Always prefer MCP tools for heavy operations. They prevent blocking the main execution thread and handle environment-specific redacting.

### 🛡️ Safety
MCP tools use isolated worktrees for mutating operations. Do not manually manage worktrees if `repo.create_repair_branch` or similar tools are available.
