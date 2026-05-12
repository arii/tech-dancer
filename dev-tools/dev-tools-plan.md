# Dev-Tools Unified SDK & CLI Plan (Completed)

## 0) Goal

Build a **library-first DevTools SDK** and a **single CLI** that replace fragmented scripts while preserving all current capabilities (GitHub ops, AI review, Jules dispatch, repair workflows), with a local-first cost model and web-readiness.

---

## 1) Scope and Constraints

### In Scope

- Consolidate GitHub, Gemini/Ollama review, and Jules session logic into services.
- Create one orchestrator that runs multi-service workflows.
- Replace ad-hoc scripts with a unified CLI entrypoint.
- Standardize configuration via `project_config.json`.
- Consolidate Python dependencies into one package definition.

### Out of Scope (for first delivery)

- Full production web dashboard UI.
- Replacing every shell utility immediately (some remain wrappers initially).
- Complex migration of historical branches/PR draft metadata.

### Hard Constraints

- Must run in stateless/ephemeral environments.
- Must support token-based auth without interactive `gh auth login`.
- Must provide dry-run behavior for destructive operations.

---

## 2) Target Architecture

## Package layout

```text
dev_tools_sdk/
  __init__.py
  config.py
  models.py
  services/
    github.py
    gemini.py
    ollama.py
    jules.py
    review.py
  orchestrator.py
  cli.py
  utils/
    auth.py
    cache.py
    fs.py
    git_ops.py
    logging.py
scripts/
  td_cli.py  # thin compatibility shim forwarding to dev_tools_sdk.cli
project_config.json
pyproject.toml
```

## Responsibilities

- **GitHubService**: PR reads/diffs, comments, conflict detection, archive/checkout fallbacks.
- **GeminiService**: cloud review and high-confidence final audits.
- **OllamaService**: local-first inference path.
- **JulesService**: agent session dispatch/status polling.
- **ReviewService**: normalizes prompts/templates and review outputs.
- **Orchestrator**: composes services for workflows (`audit`, `repair`, `resolve`, `dispatch`).

---

## 3) Implementation Plan by Phase

## Phase 1 — Baseline Audit & Mapping

1. Inventory logic in:
   - `repo_utils.py`, `utils.py`, `repair.py`, `scope_check.py`, `mergellama.py`.
   - `clients/jules_api_client.py`.
   - `draft_api_services/` decoded drafts (URL-encoded names).
2. Build parity matrix (feature → source file → target class method).
3. Identify deprecated scripts and required compatibility shims.

**Exit Criteria:** feature parity matrix approved and no unmapped critical workflow.

## Phase 2 — SDK Foundation

1. Implement `config.py` with schema validation for `project_config.json`.
2. Add shared models/exceptions.
3. Implement utility modules (`auth`, `cache`, `git_ops`, `logging`, `fs`).

**Exit Criteria:** SDK loads config, auth wrapper works with `GH_TOKEN`/`GITHUB_TOKEN`, unit tests pass for config/auth.

## Phase 3 — Service Extraction

1. Implement `GitHubService`:
   - PR metadata/diff fetch.
   - Comment CRUD.
   - Conflict detection helpers.
   - Stateless checkout via GitHub archive API fallback.
2. Implement `GeminiService` and `OllamaService`.
3. Implement `JulesService` from existing client and drafts.
4. Implement `ReviewService` for prompt templates and response normalization.

**Exit Criteria:** integration tests show each service can run independently with mocks.

## Phase 4 — Orchestrator Workflows

1. Implement workflows:
   - `support_review`
   - `fix_merge_conflict`
   - `dispatch_jules_review`
   - `repair_local_state`
2. Add **Local-First Gatekeeper**:
   - Ollama primary, Gemini fallback.
   - confidence/error fallback rules.
3. Add cache policy by file hash / diff hash.

**Exit Criteria:** end-to-end dry-run succeeds for each workflow.

## Phase 5 — Unified CLI

1. Implement Typer-based CLI in `dev_tools_sdk/cli.py`.
2. Command groups:
   - `gh`: `view`, `resolve`, `audit`
   - `ai`: `review`, `analyze`
   - `jules`: `dispatch`, `sync`
   - `env`: `verify`
   - `repair`
3. Keep `dev-tools/td_cli.py` as backward-compatible wrapper.

**Exit Criteria:** old entrypoint continues to function; help output documents new commands.

## Phase 6 — Packaging, Verification, and Docs

1. Consolidate dependencies into `pyproject.toml`.
2. Provide installable package build (`python -m build`).
3. Add docs:
   - migration guide from scripts to SDK/CLI
   - environment setup (`snapshot`, on-demand deps)
   - web integration notes (FastAPI + async workers)
4. Add CI checks for lint, type-check, tests, and smoke commands.

**Exit Criteria:** package builds and verification pipeline passes.

---

## 4) CLI Specification (Final)

## `td-cli gh`

- `view <pr>`: summary + changed files + diff stats
- `resolve <pr>`: attempt conflict resolution, emit patch in dry-run
- `audit`: run support review and produce structured report

## `td-cli ai`

- `review <pr>`: produce review from template
- `analyze <file>`: focused AI analysis and recommendations

## `td-cli jules`

- `dispatch <task>`: create session + attach context
- `sync`: poll active sessions

## `td-cli env`

- `verify`: validates tokens, API reachability, local model status

## top-level

- `repair`: repair workflow (in-place or worktree mode)

---

## 5) Local-First Cost Control Strategy

1. **Inference priority**: Ollama → Jules-assisted execution → Gemini final-pass.
2. **Caching**: avoid repeat calls for unchanged content.
3. **Context pruning**: include only relevant files/chunks.
4. **Pre-AI gates**: run local lint/tests before invoking paid APIs.

---

## 6) Stateless & Secure Environment Protocol

1. Token injection from env only (`GH_TOKEN`/`GITHUB_TOKEN`).
2. Never persist tokens to disk/config files.
3. Support temp workspaces for non-repo execution.
4. Provide archive-based checkout fallback when git remote auth is unavailable.
5. Default to dry-run patch output when push safety cannot be guaranteed.

---

## 7) Testing & Quality Gates

## Unit Tests

- config schema validation
- auth wrapper behavior
- cache invalidation
- service method contract tests with mocks

## Integration/Smoke

- CLI command smoke tests (`--help`, basic dry-runs)
- orchestrator dry-run workflows
- env verification checks

## Pre-Submit

- `python3 dev-tools/td_cli.py pre-submit`
- targeted lint/type/test matrix

---

## 8) Milestones & Deliverables

### Milestone A (Foundation)

- SDK skeleton + config + auth + utilities.

### Milestone B (Service Parity)

- GitHub, AI (Gemini/Ollama), Jules service implementations.

### Milestone C (Workflow Completion)

- Orchestrator workflows + caching + fallback logic.

### Milestone D (CLI + Packaging)

- Unified Typer CLI + compatibility wrapper + package build.

### Milestone E (Stabilization)

- Docs, CI gates, migration notes, baseline updates if needed.

---

## 9) Risks and Mitigations

- **Risk:** API drift across GitHub/Gemini/Jules.
  - **Mitigation:** service adapters + strict response models.
- **Risk:** Over-large scope in single PR.
  - **Mitigation:** phase-based PR slicing and compatibility shims.
- **Risk:** Cost spikes from cloud LLM calls.
  - **Mitigation:** local-first gatekeeper + caching + pre-AI checks.

---

## 10) Definition of Done

The plan is complete when:

1. All major workflows run through the orchestrator.
2. `td-cli` is the single documented interface.
3. Legacy scripts are either removed or thin wrappers.
4. Package is installable and test/verification gates pass.
5. Stateless/token-only environments are supported with safe dry-run defaults.

---

## 11) Execution Status

### Completed

- Phase 1: Source inventory and parity mapping completed (`dev-tools/dev-tools-parity-matrix.md`).
- Phase 2: SDK foundation implemented (`config.py`, auth helper, core package scaffolding).
- Phase 3: Service extraction implemented (GitHub, Ollama, Gemini, Jules, Review service modules).
- Phase 4: Orchestrator workflows implemented (`review_pr`, `audit_pr`, `view_pr`, `resolve_pr`, `dispatch_jules_review`, `sync_jules`, `repair_local_state`, `env_verify`).
- Phase 5: Unified grouped CLI implemented (`gh`, `ai`, `jules`, `env`, `repair`) with required subcommands.
- Phase 6: Packaging + verification baseline completed (`pyproject.toml`, CLI entrypoint, SDK unit tests).

### Current State

All plan phases are now implemented in repository form and validated with local SDK parser/config tests.
