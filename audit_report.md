# Audit Report: Boomtick MCP & CLI Tools

## Context
The goal of the `boomtick` MCP commands is to provide agents with multi-step, deterministic scripts for complex, frequently requested actions. However, over time, the MCP implementation has replicated numerous atomic GitHub and CLI commands. This leads to redundancy, context window bloat, and confusion for AI agents when deciding between raw shell commands (`run_in_bash_session`), `td-cli`, and native MCP tools.

---

## Section 1: Redundant / Unnecessary Tools (Candidates for Removal)

Many tools currently exposed via the MCP server simply wrap basic Git, GitHub CLI (`gh`), or `td-cli` atomic commands. An agent capable of running bash commands already possesses these capabilities, making these MCP endpoints redundant. Providing these as MCP tools wastes token space and creates decision paralysis.

**Redundant MCP Tools to Remove:**
- `github.checkout_branch`: Direct wrapper around `td gh checkout` or `git checkout`.
- `github.create_issue`: Direct wrapper around `td gh create-issue` or `gh issue create`.
- `github.create_pull_request`: Direct wrapper around `td gh create-pr` or `gh pr create`.
- `github.issue_view`: Direct wrapper around `td gh issue-view` or `gh issue view`.
- `github.issue_update`: Direct wrapper around `td gh issue-update` or `gh issue edit`.
- `github.issue_comment`: Direct wrapper around `td gh issue-comment` or `gh issue comment`.
- `repo.get_changed_files`: Can easily be done by the agent using `git status` and `git diff`.
- `repo.get_package_scripts`: The agent can just `cat package.json`.
- `repo.create_branch`: The agent can just run `git checkout -b <branch>`.
- `repo.commit_patch`: The agent can apply patches and commit using standard git commands.

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

1. **Deprecate Atomic MCP Tools:** Remove the 1:1 mapping tools (e.g., `checkout_branch`, `create_issue`) from the MCP server. Ensure agents are instructed to rely on raw `git`, `gh` CLI, or `td-cli` for basic actions.
2. **Enhance Multi-step Tools:** Introduce new MCP tools specifically for the `orchestrator.py` workflows (Aggregation, CI Summaries, Pre-submit). These should accept high-level intent and return rich JSON payloads.
3. **Align Schemas:** Where MCP tools wrap `td-cli` commands, ensure the MCP Zod schemas perfectly map the underlying Python `click` options to prevent feature gap fallbacks.
4. **Improve Error Passthrough:** Update existing MCP tool handlers to return the raw `stderr` or structured JSON errors generated by `dev_tools.cli` instead of throwing opaque generic Error strings.
5. **Update Agent Instructions:** Refine the agent system prompts (e.g., `.agent-context.json` or `AGENTS.md`) to clearly delineate that MCP should be used exclusively for *complex orchestrations*, while bash is preferred for *atomic git operations*.
