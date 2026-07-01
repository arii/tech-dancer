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


# BoomTick MCP / CLI Architecture — Next Steps

Based on the Capability Inventory audit, the Redundancy Audit, and current MCP tool-design best practices.

---

## 0. Verify Before Cutting Anything

- [ ] Confirm the **actual tool surface** of your connected GitHub MCP server (don't assume it covers `create_issue`, `get_pr_diff`, `search_open_prs`, etc. — check your live `mcp_servers` config/version). Some "redundant" removals could leave a real capability gap if your GitHub MCP doesn't expose the primitive you're relying on.
- [ ] Pull agent session logs/transcripts and measure how often each MCP tool is actually invoked vs. bypassed in favor of raw bash/`gh`/`td`. This turns the "agents fall back to shell" claim from a plausible narrative into a data-backed one, and tells you which wrappers are dead weight vs. quietly load-bearing.
- [ ] Spot-check whether any "thin wrapper" on the removal list is doing something bash/`gh` genuinely can't replicate (e.g., a repo-specific default, auth handling, or output shaping). If so, move it to "keep" or "rework" instead of "remove."

## 1. Remove Redundant Thin Wrappers

**CLI (`td gh ...`):**
- [ ] `checkout` — redundant with `git checkout` / `gh pr checkout`
- [ ] `view`, `issue-view`, `pr-diff` — redundant with `gh issue view` / `gh pr view` / `gh pr diff`
- [ ] `create-issue`, `create-pr` — redundant with `gh issue create` / `gh pr create`
- [ ] `post-comment`, `issue-comment` — redundant with `gh pr comment` / `gh issue comment`
- [ ] `search-prs` — redundant with `gh search prs`
- [ ] `td repo logs` — overlaps with `gh run view --log`

**MCP:**
- [ ] `github.checkout_branch`, `repo.create_branch` — agents can do this via bash/git directly
- [ ] `github.create_pull_request`, `github.get_pr_diff`, `github.search_open_prs`
- [ ] `repo.commit_patch` — agents apply patches/commit via bash directly
- [ ] `repo.get_changed_files` — redundant with `git diff --name-only`
- [ ] `repo.get_package_scripts` — superseded by the new script-runner tool below (don't just delete — replace with something that adds value)

**REVISED — do NOT remove, keep and harden instead:**
- `github.create_issue`, `github.issue_view`, `github.issue_update`, `github.issue_comment` (and add `github.issue_close` as its own explicit tool if not already separate from `issue_update`)
- Rationale: issue ops are high-frequency and flag-heavy. The original "redundant with `gh`" argument was about *capability* overlap, not *discovery cost*. If removing the MCP tool means the agent falls back to `gh issue --help` or a web search to relearn syntax, you've traded a schema-load cost for a live-exploration cost — net worse, not better. Keep these as first-class, well-specified MCP tools (see §5a below) precisely so the agent never needs to look anything up.

**Rollout, don't hard-delete immediately:**
- [ ] Deprecate first: log a warning when a legacy wrapper is invoked, pointing the agent to the native `gh`/`git` equivalent.
- [ ] Remove deprecated commands from default `--help` output before removing them from the schema entirely.
- [ ] Only fully remove after a deprecation window + confirming via logs that usage has dropped to ~zero.

## 2. Keep — Multi-Step / Policy-Enforcement Tools

No changes needed, but worth double-checking each still earns its "keep" status against the rule of thumb in §4:
- [ ] `td gh aggregate`, `td gh resolve-conflicts`
- [ ] `td gh audit`, `td gh audit-gate`, `td gh audit-pr`, `td gh verify-metrics`, `td gh verify-versions`
- [ ] `td agent *`, `td gh status-board`, `td gh migrate-tokens`
- [ ] `td ux *`

## 3. Build the New Package-Script-Runner MCP Tool

This is your highest-value near-term addition — it's real orchestration, not a wrapper.

- [ ] Design `repo.run_script(script_name, args?)` (or similar) to actually **execute** a package.json script, not just list it.
- [ ] Return **structured** output: exit code, stdout/stderr separated (not merged), duration, and — where applicable — parsed results (e.g., test pass/fail counts, lint error counts) rather than raw dumped text.
- [ ] Pass through raw `stderr`/exit codes on failure instead of a generic "script failed" message — this is what stops agents from reflexively shelling out to double-check what happened.
- [ ] Write the tool description with an explicit "when NOT to use this" clause (e.g., "for one-off exploratory commands, use bash directly; this tool is for known package.json scripts only").

## 4. Add the Other High-Value Deterministic Workflows

- [ ] `td gh fix-review-comments` — fetch unresolved review comments, group by file, generate a fix plan, apply, test, re-review
- [ ] `td ci recover` — analyze failing CI logs and propose/apply fixes
- [ ] `td repo release-prep` — consolidate changelog, bump versions, prep release PR
- [ ] `td repo sync-long-lived` — safely sync `main` into staging/long-lived branches

For each: only promote to an MCP tool (vs. CLI-only) if it meets the rule of thumb below.

## 5. Apply Tool-Design Best Practices to Everything That Stays or Gets Added

- [ ] **Domain-prefix** tool names for clarity/scalability (e.g., `repo.run_script`, `github.audit_pr` — you're already mostly doing this, audit for consistency).
- [ ] Prefer **search/action-focused** tools over list-all tools where relevant (matches your existing bias toward `search-prs` style patterns, just don't duplicate what GitHub MCP already search-exposes).
- [ ] Every MCP tool description should state: what it does, **when NOT to use it** (redirect to CLI/bash), rough token/response-time cost, and any rate limits.
- [ ] Audit every existing MCP tool handler for **error passthrough** — replace opaque generic error strings with raw stderr/structured JSON errors from `dev_tools.cli`.

### 5a. Schema Hardening for High-Frequency Tools (Issues, etc.)

For any tool you're keeping specifically to avoid `-h`/help-text exploration or web search, the schema itself has to be self-sufficient:
- [ ] Every parameter: explicit type, required/optional marked, one-line description with a concrete example value — not just a name.
- [ ] Use **enums** for constrained fields (e.g., `state: "open" | "closed"`, `state_reason: "completed" | "not_planned"`) instead of free-text strings the model has to guess the valid values for.
- [ ] Include 1–2 example calls directly in the tool description (e.g., `issue_update({ issue_number: 42, state: "closed", labels: ["fixed"] })`).
- [ ] If a required field's valid values depend on repo state (e.g., existing label names), either expose a companion read-only lookup tool or document the constraint inline — don't leave the model to discover it by trial and error.

### 5b. Explicit No-Search / No-Help Policy in `AGENTS.md`

Schema hardening reduces the *need* to explore, but add a hard rule for the cases where the model might still be tempted:

```markdown
## Tool Usage Policy — Issues & GitHub Operations

For all issue create/update/comment/close/view operations, ALWAYS use the
github.issue_* MCP tools. Do NOT:
- Run `gh issue --help`, `gh --help`, or any `-h`/`--help` flag
- Search the web for `gh` CLI syntax
- Fall back to raw `gh issue create ...` via bash

If a required parameter is unclear, the tool schema is the source of truth —
do not attempt to discover it via help text or search. If the schema is
genuinely insufficient for the task, stop and ask rather than exploring.
```

- [ ] Place this near the top of `AGENTS.md` — early instructions get weighted more heavily than ones buried deep in the file.
- [ ] Optional hard backstop: wrap `gh` in the dev environment so `-h`/`--help` return a short redirect instead of full help text, making the "don't explore" rule self-enforcing rather than relying purely on instruction compliance.

## 6. Rule of Thumb: What Graduates from `td_cli` to MCP

Keep agent access to `td_cli` and bash — do **not** go MCP-only. Only promote a command to MCP if it meets one of:
1. Called multiple times per agent session **and** structured JSON output would meaningfully save parsing/reasoning tokens vs. text output.
2. Enforces a policy gate that must not be bypassable (e.g., `audit-gate`, `verify-metrics`).
3. Orchestrates 3+ steps with real error-handling logic.

Everything else (one-off flags, debugging, anything needing full flexibility) stays CLI/bash-accessible to agents.

## 7. Documentation & Agent Instruction Updates

- [ ] Update `AGENTS.md` to explicitly state the layering: bash/git/gh (substrate) → `td_cli` (flexible full-surface layer) → MCP (narrow, high-value orchestration/policy only).
- [ ] Reconcile `AGENTS.md`, `cli-schema.json`, and the MCP server config so they no longer contradict each other (this is the root cause of the "archaeology loop" behavior you've seen agents fall into).
- [ ] Update system prompts to point to native `gh`/`git` for basic operations and reserve MCP mentions for the orchestration tools only.
- [ ] Document the "when NOT to use" guidance for each MCP tool in one place agents can reference, not buried per-tool.

## 8. Token / Context Efficiency (Watch List, Not Urgent Yet)

- [ ] If your total MCP tool count keeps growing after the cleanup above, evaluate exposing MCP servers as a **code API** (agent writes code against a generated tool file tree) instead of loading every tool definition into context upfront. This is Anthropic's current recommended pattern for scaling past dozens of tools without ballooning context.
- [ ] Track total `ListTools` payload size as a metric over time so you catch bloat creeping back in before it becomes a problem again.

## 9. Rollout Order (Suggested Sequence)

1. Log-based verification (§0) — do this first, it de-risks everything after it.
2. Deprecation warnings on thin wrappers (§1), not deletion yet.
3. Ship the package-script-runner tool (§3) — highest immediate value, validates the "structured output done right" pattern.
4. Apply error-passthrough + "when not to use" description fixes (§5) to existing keep-list tools.
5. Update `AGENTS.md` / schema / config alignment (§7).
6. Build remaining high-value workflow additions (§4) one at a time, each validated against the rule of thumb (§6).
7. Hard-remove deprecated wrappers once logs confirm near-zero usage.
8. Revisit §8 (code-execution-as-MCP) only if tool count/context bloat becomes measurable again.

---

## 10. Productionizing the Current Implementation

Your stance: don't rip out tested, working functions — but stop defaulting to "wrap everything GitHub MCP-adjacent as a boomtick-mcp tool." Selective coverage, hardened for production. This section is the operational checklist for that.

### 10a. Triage the Existing Tool Set First

- [ ] Split every current `github.*` / `repo.*` tool into three buckets:
  - **Tested & load-bearing** — keep as-is, just harden (10b–10e).
  - **Untested/rarely used, capability-duplicate** — candidates for the deprecation path in §1, regardless of how "done" they feel.
  - **Untested but high discovery-cost** (like issues) — keep, but treat as not-yet-production and run through the full hardening checklist below before calling it done.
- [ ] Don't add new 1:1 wrappers by default going forward. The bar for "wrap it in MCP" is the rule of thumb in §6, not "GitHub MCP has an equivalent and it'd be nice to have ours too."

### 10b. Testing

- [ ] Unit tests per tool handler: valid input → expected structured output; invalid/missing required field → expected structured error (not a thrown exception that becomes an opaque MCP error).
- [ ] Integration/contract tests against a real (sandbox or dedicated test) repo — not mocks only — so schema drift against the live GitHub API is caught before agents hit it.
- [ ] Regression test: for every tool moved from "remove" back to "keep" (like the issue tools), add a test asserting the schema actually contains the enum/example/description fields from §5a — this is what prevents the tool from silently degrading back into something that needs `-h` to use correctly.

### 10c. Versioning & Change Management

- [ ] Semver the `boomtick-mcp` package itself; treat any tool schema change (renamed param, changed enum values, changed required-ness) as at minimum a minor bump.
- [ ] Maintain a changelog entry per tool addition/removal/schema change — this is what keeps `AGENTS.md`, `cli-schema.json`, and the MCP config from drifting back into the contradictions that caused the "archaeology loop" behavior.
- [ ] Deprecation notices live in the tool description itself (not just docs) for at least one release cycle before removal, so an agent reading the schema mid-transition sees the warning directly.

### 10d. Observability

- [ ] Structured logging per tool call: tool name, input (redact secrets), success/failure, latency, and — for GitHub-touching tools — whether it hit a live API rate limit.
- [ ] Track per-tool invocation counts over time. This closes the loop from §0's log-based verification — you should be able to answer "is this tool still earning its schema-token cost" from a dashboard, not a guess.
- [ ] Alert on elevated error rates per tool — a spike usually means either GitHub API drift or a schema gap that's forcing malformed calls.

### 10e. Security & Reliability Hardening

- [ ] Validate all tool inputs server-side — never trust that the model's call matches the schema; treat every input as untrusted, same as any other MCP server exposed to an LLM caller.
- [ ] Use least-privilege GitHub tokens scoped to only what each tool category needs (issues vs. PRs vs. repo admin) rather than one broad token for the whole MCP server.
- [ ] Handle GitHub API rate limiting explicitly — backoff/retry with a clear structured error surfaced to the agent (not a silent hang or generic failure) so the agent doesn't loop or fall back to bash out of confusion.
- [ ] Decide transport deliberately: stdio for local/dev agent use (lowest latency), HTTP if you need the MCP server reachable by multiple agents/environments — don't default to HTTP if you don't need it.

### 10f. Documentation Convergence

- [ ] One canonical source of truth for "which tool for which task" — the `AGENTS.md` policy section from §5b/§7, not scattered across READMEs, code comments, and tool descriptions independently.
- [ ] CI check (even a simple script) that fails the build if `cli-schema.json` and the live MCP tool registration diverge — this is cheap insurance against the exact contradiction problem that caused agent confusion before.
