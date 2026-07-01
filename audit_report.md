# Audit Report: Boomtick MCP & CLI Tools

## Context
The goal of the `boomtick` MCP commands is to provide agents with multi-step, deterministic scripts for complex, frequently requested actions. However, over time, the MCP implementation has replicated numerous atomic GitHub and CLI commands. This leads to redundancy, context window bloat, and confusion for AI agents when deciding between raw shell commands (`run_in_bash_session`), `td-cli`, and native MCP tools.

---

## Section 1: Tool Analysis: Redundancy vs. Syntax/Workflow Management

While many tools exposed via the MCP server appear to simply wrap basic Git, GitHub CLI (`gh`), or `td-cli` commands, it's crucial to distinguish between true redundancy and tools that actively manage syntax complexity or enforce specific repository workflows.

### Truly Redundant Tools (Candidates for Removal)
These tools provide no additional value over standard bash commands and only serve to bloat the token window:
- `repo.get_changed_files`: Can easily be done by the agent using `git status` and `git diff`.
- `repo.get_package_scripts`: The agent can just `cat package.json` and read it.
- `github.issue_view`: The standard GitHub MCP already provides robust issue viewing.

### Tools Managing Syntax and Workflow (Keep but Refine)
These tools might *look* atomic, but they actually prevent the agent from making syntax errors, handle search/discovery abstractions, or enforce strict project workflows (e.g., standardizing PR creation or branching strategies). They should be preserved but documented clearly so the agent understands *why* they must be used over raw bash:
- `github.create_pull_request`: Manages the specific `td gh create-pr` syntax and project defaults (e.g., base branch resolution).
- `github.checkout_branch` & `repo.create_branch`: These often manage internal worktree logic or branch naming conventions required by the repository's git workflow.
- `github.create_issue` / `github.issue_update`: These abstract away complex JSON formatting or markdown linting that raw `gh` commands might fail on if the agent constructs the arguments poorly.
- `repo.commit_patch`: Prevents common agent errors when applying diffs (e.g., handling malformed patches) by routing through tested `td-cli` logic.

---

## Section 2: Missing / Recommended Multi-step MCP Tools (Candidates for Addition)

The focus of the MCP server should shift toward complex, multi-step deterministic workflows currently hidden in `orchestrator.py` and the `td-cli`. These actions provide high value because they handle orchestration, parsing, API interactions, and error handling seamlessly.

**Valuable Multi-step Workflows to Add to MCP:**
- **`github.aggregate_prs`**: Expose the `aggregate_prs` orchestrator logic (`td gh aggregate`) to seamlessly combine multiple PRs, resolve simple conflicts, and create a consolidated branch.
- **`repo.pre_submit_checks`**: Expose the full suite of `pre_submit_checks` (`td gh pre-submit`) which runs a rigorous, deterministic gauntlet before opening PRs.
- **`github.generate_ci_summary_report`**: Expose `generate_ci_summary_report` (`td gh summary-report`) to provide the agent with a rich markdown summary of the CI state and metrics.
- **`github.audit_pr`**: Expose the `audit_pr` workflow for headless UI and structural auditing.
- **`github.resolve_conflicts_workflow`**: Expose a higher-level conflict resolution workflow rather than just fetching conflict files.

---

## Section 3: Impact Analysis of CLI vs MCP on Agent Performance

Currently, agents exhibit a fallback behavior where they bypass MCP tools in favor of running `td-cli` directly via the shell. This occurs due to several factors:

1. **Schema Rigidity vs. CLI Flexibility:** MCP tools define rigid input schemas (e.g., Zod schemas in TypeScript). If an agent needs a flag or option available in `td-cli` but not mapped in the MCP schema, it defaults to bash.
2. **Duplication and Cognitive Load:** When the system prompts include both the availability of MCP tools and instructions referencing `td-cli` commands, the agent faces a choice. To avoid parsing rigid JSON or dealing with MCP error responses, the agent leans on familiar shell patterns.
3. **Token Usage:** Every redundant MCP tool adds to the `ListTools` payload, consuming precious tokens in the system prompt. For example, registering 10 atomic GitHub tools inflates the context window, leaving less room for the agent to reason about actual business logic.
4. **Error Transparency:** CLI commands executed via shell often return standard UNIX error codes and full `stderr` outputs. If the MCP wrapper obscures this output (e.g., returning a generic "Failed to create issue"), the agent will revert to the shell to diagnose the exact issue.

---

## Section 4: Concrete Recommendations and Specific Tool Audits

### 4.1 MCP Tool Registry Audit (`boomtick-pkg/mcp/src/tools/`)

| MCP Tool Name | Assessment | Recommendation | Justification |
| :--- | :--- | :--- | :--- |
| `ddgs.search.ts` | Keep | Keep | Required for external search abstraction outside of git scope. |
| `github.checkout_branch.ts` | Keep (Refine) | Update Description | Enforces branch naming/worktree resolution over raw git. |
| `github.comment_triage_summary.ts` | Keep | Keep | High-value multi-step aggregation workflow. |
| `github.create_issue.ts` | Keep (Refine) | Update Description | Manages syntax complexity and linting to prevent malformed GH API calls. |
| `github.create_pull_request.ts` | Keep (Refine) | Update Description | Enforces `base` defaults and formatting conventions over raw GH CLI. |
| `github.get_merge_conflict_files.ts` | Deprecate | Remove | Agent can easily resolve via `git status` or standard GitHub MCP. |
| `github.get_pr_diff.ts` | Deprecate | Remove | Agent can fetch via `gh pr diff` or standard GitHub MCP. |
| `github.issue_comment.ts` | Deprecate | Remove | Standard GitHub MCP handles this natively; redundant logic. |
| `github.issue_update.ts` | Keep (Refine) | Update Description | Enforces state-vs-label parsing logic explicitly defined in `td-cli`. |
| `github.issue_view.ts` | Deprecate | Remove | Standard GitHub MCP provides full issue viewing capabilities. |
| `github.open_replacement_pr.ts` | Keep | Keep | High-value, complex multi-step state management. |
| `github.search_open_prs.ts` | Deprecate | Remove | Standard GitHub MCP provides issue/PR search capabilities. |
| `repo.commit_patch.ts` | Keep | Keep | Prevents patch application failure states common with agents. |
| `repo.create_branch.ts` | Keep (Refine) | Update Description | Enforces branch naming conventions over raw `git checkout -b`. |
| `repo.create_repair_branch.ts` | Keep | Keep | Multi-step context preservation and branching workflow. |
| `repo.get_changed_files.ts` | Deprecate | Remove | Agent should use `git diff --name-only`. |
| `repo.get_package_scripts.ts` | Deprecate | Remove | Agent can simply read `package.json`. |
| `repo.get_route_map.ts` | Keep | Keep | High-value repository abstraction parsing. |
| `repo.logs.ts` | Keep | Keep | Abstracts log location discovery within the repo workspace. |
| `repo.read_ci_logs.ts` | Keep | Keep | High-value abstraction to parse GH actions APIs. |
| `repo.run_lighthouse.ts` | Keep | Keep | Deterministic execution of external evaluation logic. |
| `repo.run_playwright.ts` | Keep | Keep | Deterministic execution of UI verification logic. |

### 4.2 CLI Command Audit (`td-cli`) to MCP Mapping

| CLI Command Group | Command | Recommendation | Justification |
| :--- | :--- | :--- | :--- |
| **`gh`** | `aggregate` | **Add to MCP** | Core multi-step deterministic workflow currently missing from MCP. |
| **`gh`** | `audit-pr` | **Add to MCP** | High-value automated feedback loop. |
| **`gh`** | `pre-submit` | **Add to MCP** | Crucial, complex gauntlet check that agents often fail to run correctly. |
| **`gh`** | `summary-report` | **Add to MCP** | Generates aggregated metrics required for context loading. |
| **`gh`** | `overlaps` | **Add to MCP** | High-value logic for deduplicating workstreams. |
| **`gh`** | `migrate-tokens` | Keep as CLI | Better suited for manual developer execution via shell; rigid schema limits utility. |
| **`gh`** | `status-board` | Keep as CLI | Output is for human consumption, agents should use raw queries. |
| **`gh`** | `checkout`, `create-pr`, etc. | Bound to existing MCP | These power the "Keep (Refine)" tools evaluated in section 4.1. |
| **`agent`** | `dispatch`, `fix-ci` | **Add to MCP** | Allows an agent to spawn sub-agents for complex tasks (Jules client). |
| **`agent`** | `plan-review`, `plan-aggregation` | **Add to MCP** | Exposes the deterministic orchestrator planning pipelines. |
| **`ai`** | `get-context` | **Add to MCP** | Crucial vector/dependency graph generation. |

### 4.3 Next Steps Execution Plan

1. **Execute Deprecations:** Delete the 7 identified deprecated `.ts` files from `boomtick-pkg/mcp/src/tools/` and remove them from `index.ts`.
2. **Schema Regeneration:** For the tools marked "Keep (Refine)", update their descriptions in the `.ts` definitions to explicitly state their workflow enforcement value, then regenerate schemas to prevent agent fallback.
3. **Implement Missing Workflows:** Create new MCP tool endpoints for `gh aggregate`, `gh pre-submit`, `gh summary-report`, and `agent dispatch` by wrapping the existing `td-cli` endpoints via `subprocess/runCommand`.
4. **Update System Prompts:** Modify `.agent-context.json` and `AGENTS.md` to instruct agents that atomic Git/GH actions must be executed via `run_in_bash_session`, while MCP tools are strictly reserved for the explicitly listed workflow automations.