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

## Section 4: Concrete Recommendations and Next Steps

1. **Deprecate Truly Redundant MCP Tools:** Remove tools that offer no workflow enforcement (e.g., `get_changed_files`, `get_package_scripts`). Ensure agents are instructed to rely on raw bash for purely read-only atomic actions.
2. **Clarify Workflow Tools in Prompts:** For tools like `create_pull_request` or `commit_patch`, update their descriptions in the MCP schema to explicitly state *why* they are required (e.g., "Use this instead of raw git to ensure branch conventions are followed").
3. **Enhance Multi-step Tools:** Introduce new MCP tools specifically for the `orchestrator.py` workflows (Aggregation, CI Summaries, Pre-submit). These should accept high-level intent and return rich JSON payloads.
4. **Align Schemas:** Where MCP tools wrap `td-cli` commands, ensure the MCP Zod schemas perfectly map the underlying Python `click` options to prevent feature gap fallbacks.
5. **Improve Error Passthrough:** Update existing MCP tool handlers to return the raw `stderr` or structured JSON errors generated by `dev_tools.cli` instead of throwing opaque generic Error strings.
6. **Update Agent Instructions:** Refine the agent system prompts (e.g., `.agent-context.json` or `AGENTS.md`) to clearly delineate that MCP should be used exclusively for *complex orchestrations*, while bash is preferred for *atomic git operations*.
