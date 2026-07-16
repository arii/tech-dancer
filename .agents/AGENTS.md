# Tooling and MCP Protocol

This protocol defines the tool selection hierarchy to ensure fast, reliable, and
context-aware operations. Agents **must** prioritize specialized tools over
general-purpose shell commands.

---

## 🧠 Intelligence First: Index and Schema

Before executing **any** command, agents MUST:

1. **Consult `.agent-context.json`** — ground truth for repository structure,
   `file_tree`, `cli_schema`, current feature flags, and metadata. This file is
   built by `boomtick-pkg/scripts/build-repo-context.py` and kept fresh by the git hooks in
   `.githooks/`.
2. **Consult `boomtick-pkg/cli/dev_tools/cli-schema.json`** — canonical authority for local CLI
   commands. Never guess flags. Never run `--help`. The schema is also embedded
   in `.agent-context.json` under the `cli_schema` key, so a single read of that
   file covers both.

---

## ⚠️ Enforcement: MCP is Not Optional

Tier 1 MCP tools are the **required first call** — not a preference.

Every `boomtick-mcp` tool automatically:
1. Reads `.agent-context.json` to inject `file_tree` and `cli_schema` into context
2. Calls the appropriate `td` subcommand internally
3. Returns structured output with repo context already attached

Calling `td` directly (Tier 2) skips step 1.
Calling raw bash (Tier 3) skips steps 1 and 2.

**Violation pattern to avoid:**

```bash
# ❌ Wrong — bypasses MCP, no context injection, no index hydration
td gh pr-diff 2280

# ✅ Correct — MCP hydrates .agent-context.json, calls td internally
github.get_pr_diff(pr_number=2280)
```

Only escalate to a lower tier if the MCP tool is **genuinely unavailable**. If an MCP tool or dev-tool command fails or requires fallback to a lower tier, you MUST document the issue in the CLI Failure Ledger (within `progress_and_next_steps.md`) rather than silently bypassing it.

### 🚫 Zero-Fallback & Self-Correction Policy

Raw terminal execution (e.g., `git checkout && git push` via Bash) is **strictly forbidden** for standard development tasks if a Tier 1 (MCP) or Tier 2 (td) tool exists.

**Self-Correction Rule**: If you catch yourself about to run a raw shell
command (like `gh issue list` or `git checkout`) that has an MCP or `td`
equivalent, you MUST stop and use the pre-packaged tool instead.

If you encounter a schema error or a missing argument in an MCP tool, you must **fix the tool's code or schema** rather than falling back to raw terminal commands. Bypassing MCP tools hides structural errors and prevents clean automation audits.

---

## 🧬 Hierarchy of Tooling

| Tier | Tool | When to Use |
| :--- | :--- | :--- |
| **Tier 1** | `boomtick-mcp` tools | Always — primary entry point for all repo and GitHub operations |
| **Tier 2** | `td` | Only when a Tier 1 tool is unavailable or the CLI provides logic not yet exposed via MCP |
| **Tier 3** | Raw bash / `gh` CLI | Last resort — only when no Tier 1 or Tier 2 tool exists for the task |

---

## 🗺️ Tool Mapping Table

| Category | Task | Tier 1: MCP (required first) | Tier 2: `td` (fallback) | Tier 3: Bash (last resort) |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub** | Search PRs | `github.search_open_prs` | `td gh search-prs` | `gh pr list` |
| **GitHub** | Get PR Diff | `github.get_pr_diff` | `td gh pr-diff <PR>` | `gh pr diff <PR>` |
| **GitHub** | Check Conflicts (global) | `github.get_merge_conflict_files` | `td gh conflicts` | - |
| **GitHub** | Detect Conflicts (single PR) | `github.get_merge_conflict_files` | `td gh detect-conflicts --pr <PR>` | `git merge-tree` |
| **GitHub** | Merge Conflicts (PR vs base) | `github.get_merge_conflict_files` | `td gh merge-conflicts <PR>` | - |
| **GitHub** | Resolve Conflicts | `github.create_repair_branch` | `td gh resolve-conflicts --pr <PR>` | - |
| **GitHub** | Comment on PR | `github.comment_triage_summary` | `td gh audit-pr <PR> --submit` | `gh pr comment` |
| **GitHub** | Status Board | `github.get_status_board` | `td gh status-board` | - |
| **GitHub** | PR Overlaps | `github.analyze_overlaps` | `td gh overlaps` | - |
| **GitHub** | Plan Review | `github.plan_review` | `td agent plan-review --pr <PR>` | - |
| **GitHub** | Audit PR (Submit) | `github.audit_pr` | `td gh audit-pr <PR> --submit` | - |
| **GitHub** | Manage Reviews | `github.manage_reviews` | `td gh manage-reviews` | - |
| **GitHub** | Validate Issue | `github.validate_issue` | `td gh validate-issue` | - |
| **GitHub** | Create Issue | `github.create_issue` | `td gh create-issue` | `gh issue create` |
| **GitHub** | Aggregate PRs / Consolidate | - | `td gh aggregate <TARGET_BRANCH> <PR_NUMBERS...>` (Note: Use `main` branch as base) | - |
| **GitHub** | Pre-submit Gate | `github.pre_submit` | `td gh pre-submit` | - |
| **Repository** | Read Repo Index | `repo.read_agent_context` | `cat .agent-context.json` | - |
| **Repository** | List Changed Files | `repo.get_changed_files` | - | `git diff --name-only` |
| **Repository** | Read CI Logs | `repo.read_ci_logs` | `td repo ci-logs <PR>` | `gh run view` |
| **Repository** | Runtime Check | `repo.doctor` | `td doctor` | - |
| **Testing** | Run Vitest | `repo.run_tests` | - | `pnpm test` |
| **Testing** | Run Playwright | `repo.run_playwright` | `td repo run-playwright` | `npx playwright test` |
| **Testing** | Run Lighthouse | `repo.run_lighthouse` | - | `npx lhci autorun` |
| **Repository** | Create Branch | `repo.create_branch` | - | `git checkout -b` |

---

## 🔍 Code Review Orchestration

The `orchestrateCodeReview` pipeline must source all inputs from MCP tools.
Internal diff-fetching functions (`getCodeDiffSummary`, direct filesystem reads)
must not be called directly — they bypass context injection.

### Required Input Chain (in order)

```
repo.read_agent_context
  → github.get_pr_diff
    → repo.get_changed_files
      → cache check (prevState.cache hash)
        → role gate (file surface check)
          → LLM call (only if no cache hit and role matches surface)
```

### Why This Matters

`.agent-context.json` contains the full `file_tree` and `cli_schema` already
indexed by `boomtick-pkg/scripts/build-repo-context.py`. Using `repo.read_agent_context`
provides pre-indexed structure for free — no redundant filesystem traversal,
no duplicate diff fetches, no re-indexing on every run.

### Role Gating (Token Optimization)

Before dispatching an LLM call, check the changed file surface against the role:

| Role | Only run if changed files include... |
| :--- | :--- |
| `SECURITY` | auth, token, secret, key, crypto, jwt, `.env`, `.pem` surface |
| `PERFORMANCE` | `.ts`, `.tsx`, `.js` files (skip for doc/config-only PRs) |
| `STYLE` | any `src/` files |
| `ARCHITECTURE` | structural files: `package.json`, `vite.config`, `tsconfig`, `src/` |

Early exit: if 2+ roles return `fail`, skip remaining roles — the PR is already
blocked and further LLM calls add no value.

---

## 🛠️ MCP Tool Usage Guidelines

### Asynchronous Operations
Always prefer MCP tools for heavy operations (running tests, fetching large
diffs) to avoid blocking the main execution thread and to leverage built-in
timeouts and safety guards.

### Safety and Isolation
Boomtick MCP tools automatically handle isolated worktrees for mutating
operations. Do **not** manually create worktrees via bash if a corresponding
MCP tool (e.g. `repo.create_repair_branch`) is available.

### Redaction and Tokens
MCP tools automatically handle token redaction and authentication. Avoid
passing raw `GITHUB_TOKEN` values in bash commands if an MCP tool can perform
the same action.

### CLI Schema Fallback
If calling Tier 2 directly, read the CLI schema from `.agent-context.json`
rather than guessing flags or running `--help`:

```bash
# Extract schema for a specific subcommand before calling it
cat .agent-context.json | python3 -c "
import json, sys
schema = json.load(sys.stdin)
print(json.dumps(schema['cli_schema']['subcommands']['gh pr-diff'], indent=2))
"
```

This is what `boomtick-mcp` does automatically on every call.

### 🔄 MCP Tool Schema Synchronization

To prevent schema drift (e.g., outdated parameters or case mismatches), MCP tool schemas are automatically synchronized from `boomtick-pkg/mcp/src/mcp/definitions.ts` to:
1. **Global Config**: `~/.gemini/antigravity-cli/mcp/boomtick-mcp/`
2. **Project Local**: `boomtick-pkg/mcp/.mcp/schemas/`

Synchronization occurs automatically during:
- `pnpm run verify:schemas` (pre-build gate)
- `.githooks/update-env.sh` (triggered by git pull/checkout if MCP code changes)

**Best Practice**: If your agent environment supports project-level tool configuration, configure it to prefer the schemas in `boomtick-pkg/mcp/.mcp/schemas/`. This ensures you are always using the most up-to-date tool definitions for the current branch.

## 🧠 Repository Agnosticism & Config Enforcement

All agents must strictly respect repository-agnostic layout structures.
- **Root Configuration:** Base parameters (e.g. `github_repo`, `vite_base_path`) must be declared in `project_config.json` at the root of the repository, which is tracked under revision control.
- **Environment Isolation:** Secrets (e.g., API keys, auth tokens) must never be committed to `project_config.json` and must remain strictly in environment variables (such as `GITHUB_TOKEN`).
- **Fail-Fast Policy:** Both `td` and `boomtick-mcp` tools are configured to fail fast with loud errors if any required config parameters are missing. Do not attempt to bypass this contract by hardcoding values.

## Appendix: CLI Entrypoint & Packaging Standards

### 1. Deterministic Imports over sys.path Manipulation
* **Rule:** Runtime mutations of the system path (sys.path.append, sys.path.insert) are strictly prohibited.
* **Reasoning:** Dynamic path manipulation opens up vectors for local path injection exploits, breaks static analysis tools, and causes unpredictable module resolution failures during containerized execution.
* **Remediation:** All internal utilities, engines, and sidecar components must be structured as absolute subpackages or declared as explicit project dependencies in pyproject.toml. Developers must install the package locally using editable installations (pip install -e .) during development.

### 2. Elimination of Test Leakage in Production
* **Rule:** Production logic must never be conditionally executed based on the presence of testing modules or frameworks (e.g., checking "pytest" in sys.modules).
* **Reasoning:** Infiltrating production blocks with test logic obscures code flow, complicates static typing, and creates brittle runtime behaviors that differ wildly between execution environments.
* **Remediation:** Rely entirely on testing framework idioms—such as pytest's monkeypatch and mocking libraries—to mimic runtime state, override environment attributes, and assert execution constraints cleanly.

### 3. Native Argument Handling
* **Rule:** Raw iteration or evaluation of sys.argv to emulate validation constraints is banned.
* **Reasoning:** Manual slicing and string matching bypass standard syntax verification engines, leading to redundant checks, unreachable dead code, and unhandled edge-case flag configurations.
* **Remediation:** Utilize concrete structural definition classes (argparse, click). If default features (such as standard help banners) must be suppressed for machine-to-machine integrations, explicitly pass configuration attributes (add_help=False) directly to the parser factory.
