# Jules → Dev-Tools Migration Strategy

## Executive Summary

The `dev-tools/jules/` directory contains ~4,100 lines of utilities extracted from an external workspace (`hrm-workspace`). This prompt clarifies how to extract **generic, reusable features** from jules into the main dev-tools codebase, while **excluding all HRM-specific references**.

**End State**: The `dev-tools/jules/` directory will be **deleted**. All extracted utilities will be integrated into `tdw_services/` or standalone utility modules.

---

## 1. What to IGNORE (HRM-Specific Code)

### 1.1 Absolute Blockers – Do Not Migrate

These files and patterns are **hrm-workspace specific** and must be **deleted entirely**:

| Pattern | Example Files | Reason |
|---------|---------------|--------|
| HRM repo paths | `bash_alias.sh`, `common_config.py` | Hardcoded `/home/ari/hrm-workspace` paths; assumes `hrm/` subrepo exists. |
| HRM validation | `validate_hrm_layout.py` | Checks for HRM-specific files (`hrm/package.json`, `hrm/server.ts`, etc.). |
| HRM PR processing | `process_pr.py` | Hardcoded `repo = "arii/hrm"` and HRM-specific validators. |
| HRM session cleanup | `close_jules_sessions.py`, `delete_failed_sessions.py` | Assumes HRM session lifecycle. |
| HRM environment setup | `verify_oauth_local.py` | HRM-specific OAuth/local dev config. |
| HRM worktree management | `clean-worktrees.sh`, `test_pr_in_worktree.sh` | Manages HRM-specific worktree directories. |

**Decision Rule**: If a file imports `from common_config import HRM_REPO_DIR` or mentions `arii/hrm`, **delete it**.

---

## 2. What CAN Be Migrated (Generic Features)

### 2.0 Jules API Integration Strategy (Critical Decision Point)

**Background**: There are two ways to interact with Jules:

1. **Jules CLI** (`jules` binary) – Higher-level, user-friendly commands
   - Local operations: `jules new`, `jules teleport`, `jules remote list`
   - Focuses on session lifecycle (create, list, pull, apply)
   - Simpler but less comprehensive (no fine-grained session querying)
   - Example: `jules new --repo arii/tech-dancer "fix auth bug"`

2. **Jules REST API** (`https://julius.googleapis.com/v1alpha`) – Lower-level, comprehensive
   - Used by `dev-tools/jules/julius_client.py` (~180 lines)
   - Full CRUD: list sources, create sessions, send messages, query status, delete sessions
   - Better for automated workflows, filtering, pagination
   - Example: `POST /sessions` with source filter

**Recommendation**: **Migrate the REST API client, not the CLI**.

**Rationale**:
- Dev-tools already wraps the API; no need to shell out to `jules` CLI
- REST API provides **real-time status visibility** (`get_session()` returns state, progress, execution logs)
- REST API enables **message streaming** (`send_message()`, `get_message()` for streaming agent output)
- REST API supports **programmatic control** (batch operations, filtering, fine-grained session queries)
- `tdw_services` is already Python-based; `julius_client.py` integrates cleanly
- Jules CLI is user-friendly for manual workflows (`jules new`, `jules teleport`); REST API powers automation
- Future enhancements (custom prompt injection, real-time feedback loops, session analytics) depend on REST API

**Why NOT the Jules CLI**:
- CLI lacks status polling → can't monitor agent progress
- CLI lacks message streaming → can't see what Jules is doing in real time
- CLI is subprocess-based → adds overhead, reduces observability
- CLI is designed for user interaction, not automation

**Integration Point**: Extract `julius_client.py` → `tdw_services/services/agents.py` (REST API wrapper with status + message support).

---

### 2.1 GitHub Operations (Migrate to `tdw_services/services/github.py`)

**File**: `github_client.py` (~150 lines, ~80% generic)

**Generic Methods to Extract**:
- `run_cmd()` – wrapper for subprocess with cwd support
- `run_gh_json()` – parse `gh` JSON output
- `current_branch()` – get HEAD branch
- `checkout()` – switch/create branch
- `list_issues()` – query issues with filtering
- `create_issue()` – file new issue
- `list_pull_requests()` – query PRs
- `get_diff()` – fetch diff for a PR
- `list_files_in_pr()` – enumerate changed files

**HRM-Specific to Strip**:
- Constructor default: `repo_path: Union[str, Path] = HRM_REPO_DIR` → make optional with None default
- Any hardcoded repo references in docstrings or comments

**Integration Point**: Merge into existing `tdw_services/services/github.py` (already has GitHub client code).

---

### 2.2 Jules REST API Client (Migrate to `tdw_services/services/agents.py`)

**Files**: `julius_client.py` (~180 lines), `julius_ops.py` (~600 lines)

**Decision: Use REST API, Not CLI**

The Jules REST API is the right choice because:
- **Real-time status visibility** – `get_session()` returns state (`PENDING`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED`)
- **Message streaming** – `get_message()` retrieves agent output, enabling live feedback
- **Programmatic control** – batch creation, filtering, pagination (CLI can't do this)
- **Better error recovery** – structured responses enable retry logic
- **Automation-first** – designed for tools, not just users

Key REST API endpoints (in `julius_client.py`):
- `GET /sources` – list available repos
- `GET /sessions` – list all sessions with filters/pagination
- `GET /sessions/{id}` – fetch session details + status + logs
- `POST /sessions` – create new session
- `POST /sessions/{id}:sendMessage` – dispatch task to session
- `GET /sessions/{id}/messages/{msgId}` – poll agent output (streaming)
- `DELETE /sessions/{id}` – terminate session

**What to Extract from `julius_client.py`** (~90% reusable):

Generic API client methods:
- `list_sources()` – enumerate available sources (repos)
- `list_sessions()` – paginated session enumeration with filters
- `get_session()` – fetch session details + status + logs
- `create_session()` – spawn a new agent session
- `send_message()` – dispatch task to active session
- `get_message()` – poll session output (streaming support)
- `delete_session()` – clean up completed/failed sessions
- `_request()` – low-level HTTP wrapper with retries, error handling

**What to Extract from `julius_ops.py`** (~70% reusable):

Generic operations:
- Session polling/wait logic with backoff
- Batch session creation patterns
- Session result aggregation
- Error recovery strategies
- Message polling with timeout

**HRM-Specific to Remove** (from both files):
- `JULIUS_DEFAULT_SOURCE = "sources/github/arii/hrm"` → parameterize
- `JULIUS_API_BASE_URL` → move to config or env var
- `common_config.HRM_REPO_DIR` imports → remove dependency
- HRM-specific message templates (like "validate HRM layout")
- Any hardcoded `arii/hrm` repo references

**Integration Point**: Create `tdw_services/services/agents.py` with:
- `JulesClient` class (HTTP client with status + message support)
- `SessionManager` mixin (lifecycle + polling + streaming)
- Example: `agents.create_session(source="arii/tech-dancer", task="fix auth")`; then `agents.poll_session(session_id)` for real-time output

**API Key Handling**:
- Read from `JULIUS_API_KEY` env var (existing pattern in `julius_client.py`)
- Already supported in `dev-tools/utils.py`

---

### 2.3 Agent Dispatch & Orchestration (Migrate to `tdw_services/orchestrator.py`)

**File**: `dispatch_agents.py` (~250 lines), `agentic_review.py` (~380 lines)

**Generic Patterns to Extract**:
- Base `Auditor` class for creating auditors
- Agent composition and execution framework
- Pattern for registering custom auditors
- Result aggregation and reporting

**HRM-Specific to Remove**:
- `FrontendAuditor` class (HRM app layout assumptions)
- All file paths like `app/`, `app/components/`
- HRM-specific metrics and checks
- `_grep_file()` method → use existing repo utilities

**Integration Point**: Enhance `tdw_services/orchestrator.py` with generic auditor base class.

---

### 2.4 Session & Secrets Management (Conditional)

**Files**: `delete_archived_sessions.py`, `publish_old_sessions.py`, `secrets_ops.py`

**Assessment**:
- These are *moderately* generic but tightly coupled to Jules API
- Only migrate if `tdw_services/services/agents.py` needs session lifecycle ops

**Decision**: Defer for now. Include `secrets_ops.py` only if dev-tools plan to manage GitHub secrets programmatically.

---

### 2.5 Git Workflow Utilities (Migrate to `tdw_services/handlers/`)

**Files**: `sync-branch.sh`, `migrate-pr-commands.sh`, `check-workspace.sh`

**Generic Utilities**:
- `check-workspace.sh` – validate git repo setup
- `sync-branch.sh` – fetch and track remote branches

**HRM-Specific to Adapt**:
- Replace hardcoded `/home/ari/hrm-workspace` with dynamic repo root detection
- Remove assumptions about worktree layout

**Integration Point**: Create `scripts/git-utils.sh` for reusable git helpers.

---

### 2.6 Code Analysis Utilities (Migrate with Caution)

**Files**: `audit_codebase.py` (~220 lines), `analyze_structure.py` (~100 lines)

**Generic Value**:
- Generic AST/import analysis patterns
- Abstract traversal framework

**HRM-Specific**:
- Hardcoded file paths and patterns for `next.js`, `app/` layout
- Assumes TypeScript/Node.js project structure

**Decision**: Extract only the generic traversal framework; remove project-specific rules.

---

## 3. Integration Strategy

### 3.1 Phase 1: Audit & Extract (This Task)

1. **Create mapping document** (in `plan.md`):
   - List each jules file → target migration path
   - Flag HRM-specific code blocks for removal
   - Identify overlaps with existing tdw_services code

2. **Check for overlaps** with existing dev-tools:
   - `utils.py` – already has GitHub token, repo detection, error handling
   - `tdw_services/services/github.py` – existing GitHub client
   - `tdw_services/orchestrator.py` – existing command orchestration
   - `tdw_services/handlers/` – existing handler patterns

3. **Generate integration PRs** (to be authored):
   - PR #1: Merge `github_client.py` → `tdw_services/services/github.py`
   - PR #2: Create `tdw_services/services/agents.py` for Jules client + ops
   - PR #3: Extract `Auditor` base class → `tdw_services/orchestrator.py`
   - PR #4: Create `scripts/git-utils.sh` for git helpers
   - PR #5: Cleanup pass – delete `dev-tools/jules/`

### 3.2 Phase 2: Consolidation

For each extracted utility:

1. **Adopt naming conventions** from existing dev-tools:
   - Service classes live in `tdw_services/services/`
   - CLI commands in `tdw_services/cli.py`
   - Handlers in `tdw_services/handlers/`

2. **Remove duplication**:
   - Audit existing `utils.py` for methods to consolidate
   - Ensure GitHub client doesn't duplicate existing `get_github_client()`

3. **Update imports** in main `td_cli.py`:
   - If new service added, register in CLI entry points

### 3.3 Phase 3: Deletion

1. Back up `dev-tools/jules/` to a branch or archive
2. Delete `dev-tools/jules/` directory entirely
3. Verify no remaining imports of `jules.*` modules
4. Update `dev-tools/README.md` to remove any jules references

---

## 4. Concrete Overlap Analysis

### 4.1 Existing utilities in `dev-tools/utils.py`

| Function | Purpose | Jules Equiv? | Action |
|----------|---------|--------------|--------|
| `get_github_token()` | Auth token resolution | N/A (specific to dev-tools) | Keep |
| `get_repo_name()` | Detect repo slug | Overlaps with `github_client.get_remote_url()` | Consolidate |
| `get_gha_variable()` | GitHub Actions variable lookup | Unique to GHA | Keep |
| `get_github_client()` | Factory for PyGithub client | Generic; could enhance | Merge with GitHub service |
| `get_ollama_url()`, etc. | Model config | Unique to dev-tools | Keep |

### 4.2 Existing classes in `tdw_services/`

| Class | Purpose | Jules Equiv? | Action |
|-------|---------|--------------|--------|
| `Orchestrator` | Command router + executor | Overlaps with `dispatch_agents.py` | Enhance with `Auditor` base |
| `github.py` services | GitHub API calls | Overlaps with `github_client.py` | Merge both |
| CLI handlers | Command dispatch | Similar patterns to `dispatch_agents.py` | Align patterns |

### 4.3 No Direct Overlaps (Safe to Add)

- Jules API client (`jules_client.py`) – new capability
- Session lifecycle (if added) – new capability
- Git workflow utilities (`git-utils.sh`) – new capability
- Code auditor base class – new capability

---

## 5. Decision Tree for Each File

Use this to classify each jules file:

```
Is this file only for hrm-workspace?
  ├─ YES (uses HRM_REPO_DIR, arii/hrm hardcoding) → DELETE
  └─ NO → Next

Does this file have >80% generic, reusable code?
  ├─ YES → EXTRACT & MIGRATE
  │   ├─ GitHub ops? → merge into tdw_services/services/github.py
  │   ├─ Jules/Agent ops? → create tdw_services/services/agents.py
  │   ├─ Orchestration? → enhance tdw_services/orchestrator.py
  │   └─ Scripts/utils? → create scripts/git-utils.sh
  └─ NO → DELETE
```

---

## 6. Implementation Checklist

### For Each File to Migrate:

- [ ] Read file and identify HRM-specific blocks (search for `HRM_REPO_DIR`, `arii/hrm`, hardcoded paths)
- [ ] Extract generic functions/classes to new/existing target module
- [ ] Update docstrings to be generic (remove workspace assumptions)
- [ ] Replace hardcoded defaults with None or environment variable lookups
- [ ] Run `pnpm run audit` (if Python code affects linting)
- [ ] Write unit tests for extracted functions (if not already present)
- [ ] Update `tdw_services/cli.py` if new command entry point needed
- [ ] Verify backward compatibility (no breaking changes to existing API)

### For Deletion:

- [ ] Verify no remaining imports from `dev-tools.jules.*`
- [ ] Grep entire codebase for `from jules import`, `import jules`
- [ ] Update `dev-tools/README.md` – remove any jules docs
- [ ] Delete `dev-tools/julius/` directory

---

## 7. Example: Extracting `github_client.py`

**Before** (HRM-specific):
```python
from common_config import HRM_REPO_DIR

class GitHubClient:
    def __init__(self, repo_path: Union[str, Path] = HRM_REPO_DIR):
        self.repo_path = Path(repo_path)
```

**After** (generic, ready for tdw_services):
```python
import os
from pathlib import Path

class GitHubClient:
    def __init__(self, repo_path: Union[str, Path] = None):
        """
        Initialize GitHub client.
        
        Args:
            repo_path: Path to repository. Defaults to current working directory.
        """
        self.repo_path = Path(repo_path or os.getcwd())
```

---

## 8. Files to Handle Individually

| File | Status | Action |
|------|--------|--------|
| `bash_alias.sh` | HRM-specific | DELETE |
| `check_branch_session.py` | HRM-specific | DELETE |
| `check-workspace.sh` | ~60% generic | EXTRACT git utils |
| `cleanup.sh` | HRM-specific | DELETE |
| `clean-worktrees.sh` | HRM-specific | DELETE |
| `close_julius_sessions.py` | HRM-specific | DELETE |
| `common_config.py` | HRM-specific | DELETE |
| `delete_archived_sessions.py` | Generic (deferred) | DEFER or DELETE |
| `delete_failed_sessions.py` | Generic (deferred) | DEFER or DELETE |
| `dispatch_agents.py` | Generic | EXTRACT |
| `github_client.py` | ~80% generic | EXTRACT |
| `init-submodules.sh` | HRM-specific | DELETE |
| `agentic_review.py` | ~60% generic | EXTRACT (base class only) |
| `analyze_structure.py` | ~50% generic | EXTRACT (framework only) |
| `audit_codebase.py` | ~50% generic | EXTRACT (framework only) |
| `jules_client.py` | ~90% generic | EXTRACT |
| `jules_ops.py` | ~70% generic | EXTRACT (framework + ops, remove HRM logic) |
| `migrate-pr-commands.sh` | HRM-specific | DELETE |
| `process_pr.py` | HRM-specific | DELETE |
| `publish_old_sessions.py` | Generic (deferred) | DEFER |
| `recreate_issues.py` | HRM-specific | DELETE |
| `secrets_ops.py` | Moderately generic | DEFER (optional) |
| `sync-branch.sh` | ~70% generic | EXTRACT |
| `test_pr_in_worktree.sh` | HRM-specific | DELETE |
| `update_priority_prs.py` | HRM-specific | DELETE |
| `verify_oauth_local.py` | HRM-specific | DELETE |
| `verify-pr.sh` | HRM-specific | DELETE |

---

## 9. Success Criteria

✅ **Task Complete When**:

1. Migration prompt is finalized and socialized with team
2. No `dev-tools/julius/` directory exists in final codebase
3. All extracted utilities are in `tdw_services/` or `scripts/`
4. All imports of `from julius import ...` are removed
5. `dev-tools/README.md` updated to reflect new capabilities
6. `pnpm lint`, `pnpm test`, `pnpm build` all pass
7. No HRM-specific strings remain in dev-tools (except in git history)
8. Each extracted feature has:
   - Clear docstrings (generic, no workspace assumptions)
   - Unit tests (if applicable)
   - CLI integration (if applicable)

---

## 10. Next Steps

1. **Review this prompt** with team; clarify any ambiguities
2. **Create a detailed plan** in `dev-tools/plan.md`:
   - Map each file to PR + target
   - List code blocks to remove
   - Identify test coverage gaps
3. **Start Phase 1 PRs** in order:
   - GitHub client consolidation
   - New agents service
   - Orchestrator enhancements
   - Git utils
   - Final cleanup
4. **Iterate** on integration; adjust based on overlap discoveries

---

## Appendix: Quick Reference – Repo Structure

```
dev-tools/
├── td_cli.py                    # Main CLI entry point
├── utils.py                     # Shared utilities (token, repo detection)
├── tdw_services/
│   ├── cli.py                   # CLI command routing
│   ├── orchestrator.py          # Command execution + orchestration
│   ├── handlers/                # Command handlers
│   │   └── command_handler.py
│   ├── services/
│   │   ├── github.py            # GitHub API client (existing)
│   │   ├── gemini.py            # Gemini integration
│   │   ├── jules.py             # Jules integration (minimal)
│   │   └── __init__.py
│   └── ux_report.py             # UX audit reporting
├── scripts/
│   ├── detect-antipatterns.mjs
│   └── ... (more scripts)
├── julius/                      # ← TO BE DELETED AFTER MIGRATION
│   ├── github_client.py         # ← Extract to tdw_services/services/github.py
│   ├── julius_client.py         # ← Extract to tdw_services/services/agents.py
│   ├── dispatch_agents.py       # ← Extract to tdw_services/orchestrator.py
│   └── ... (other files)
└── README.md
```

---

## Appendix: Key Questions to Answer Before Starting

1. **Priority**: Are there specific jules features the team wants first?
2. **Testing**: Should extracted utilities have unit tests in `tests/` or integration tests?
3. **Backward Compatibility**: Any external scripts depend on `dev-tools.julius.*`?
4. **Performance**: Any performance-critical code in jules that needs special handling?
5. **Secrets**: Should `secrets_ops.py` be migrated (adds GitHub secret management)?

