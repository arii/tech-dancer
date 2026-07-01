# BoomTick-Pkg Consolidation: Audits & Remaining Tasks

## 📊 Consolidation Epic: Status Overview

The monorepo restructuring to group `boomtick-pkg/mcp` and `boomtick-cli` under the self-contained `boomtick-pkg/` directory is complete. This consolidation enables proper Python/TypeScript packaging, streamlines repository-wide automation, and provides a foundation for progressive context discovery and standardized architectural entry points.

---

## 🔍 Completed Audits & Technical Debt Resolutions

### 1. Configuration & Redundant Defaults Audit
*   **Status:** **Resolved** (PR #3170 / #3183)
*   **Audit Findings & Action Taken:**
    *   Audited `ProjectConfig` (Python) and `config.ts` (TypeScript).
    *   Removed nested, hardcoded, and duplicate fallback values from the TypeScript MCP.
    *   Implemented a cached configuration singleton in TypeScript (`config.ts`) that executes `python3 -m dev_tools.cli config view` to dynamically fetch repository configuration from the Python CLI. This establishes the Python CLI as the single source of truth for config defaults and avoids configuration shadowing.

### 2. Test Leakage Elimination Audit
*   **Status:** **Resolved** (Implemented & Verified)
*   **Audit Findings & Action Taken:**
    *   Audited the codebase for test-awareness leakage patterns (`if "pytest" not in sys.modules:`).
    *   Identified two occurrences in `boomtick-pkg/cli/dev_tools/cli.py` (error handler exit wrapper) and `boomtick-pkg/cli/dev_tools/td_cli.py` (ImportError exit wrapper).
    *   Replaced the check in `cli.py` with standard `sys.exit(code)` (allowing standard testing frameworks like pytest to capture `SystemExit` normally via `pytest.raises(SystemExit)`).
    *   Replaced the check in `td_cli.py` with standard script execution context detection (`if __name__ == "__main__":`).
    *   Verified that all 132 Vitest cases and 33 Pytest cases continue to pass cleanly.

### 3. Tester Findings Verification & Fixes
We systematically reviewed the findings reported by the tester:
- **Recursive Symlink**: **Inaccurate / Resolved**. No symlinks exist at `boomtick-pkg/boomtick-pkg`.
- **Binary Artifacts (`.pyc` / `__pycache__`)**: **Inaccurate / Resolved**. These are ignored by `.gitignore` and are not tracked in revision control.
- **Redundant Configuration (`current_config.py`)**: **Resolved**. The duplicate configuration file has been fully purged from the repository.
- **Import Errors**:
  - `verify_versions.py`: **Resolved**. Dynamic path mutations were removed; the script now uses absolute package imports.
  - `ai_service.py`: **Accurate & Fixed**. Added the missing `import requests` at the top of the file to prevent runtime errors when the Gemini fallback path executes.
- **Path Resolution**: **Accurate & Fixed**. Fixed an off-by-one error in `boomtick-pkg/mcp/src/config.ts` where `repoPath` resolved to `../../../../` instead of `../../../` in the fallback case.
- **Dependency Gaps**: **Accurate & Fixed**. Added the missing `duckduckgo-search>=6.0.0` dependency to the CLI's `pyproject.toml`.
- **CI & Environment Blockers**:
  - **Missing Root Configs (`.node-version` / `.npmrc`)**: **Inaccurate**. Both files are present in the repository root.
  - **Git History Depth**: **Inaccurate**. Reusable workflow actions already specify `fetch-depth: 0`.
  - **Missing Validation Scripts (`detect-antipatterns.mjs`)**: **Expected**. This is a repository-specific UI validation script, designed to reside in the host repository root where the CLI executes.
  - **pnpm Filter Support**: **Inaccurate**. Unified `pnpm-workspace.yaml` is correctly present in the root.

---

## 🛠️ Outstanding Task 1: Package Extraction & CI
- [ ] **JSCPD CI Integration** (Issue #3194): Configure root CI gates to run duplicate detection checks using settings from `.jscpd.json`.
- [ ] **Subtree Push Verification** (Issue #3195): Finalize and verify the unit is extractable via `git subtree push`.

---

## 🧹 Outstanding Task 2: Technical Debt & Logic Simplification
- [ ] **Legacy Reference Cleanup** (Issue #3196): Scrub remaining documentation and code comments for legacy names (`boomtick-mcp`, `dev-tools/`) to ensure the transition to `boomtick-pkg` is absolute.
- [x] **Architectural Standards** (Issue #3108): Implement mandated architectural standards for CLI and packaging (remove sys.path hacks, transition manual sys.argv). **[Resolved in consolidated PR #3215]**

---

## 🔍 Verification Checklist

- [x] **`install.sh` Execution**: Installs correctly and sets up the workspace.
- [x] **CLI Doctor Checks**: `td doctor` succeeds and outputs clean JSON.
- [x] **MCP Server Build**: `pnpm --filter ./boomtick-pkg/mcp build` succeeds.
- [x] **Tests Verification**:
  - `pnpm test` (root tests) passes all 134 test cases.
  - `pnpm --filter ./boomtick-pkg/mcp test` passes all 23 MCP test cases.
- [x] **Runtime Environment & Dependency Enforcement**:
  - Verified Node version `24.16.0` and pnpm version `10.28.2`.
  - Ran `pnpm install --frozen-lockfile` locally and confirmed update.

- [x] **PR 3010 Alignment**:
  - Branch is a superset containing complete packaging features.
  - Aligned `.github/workflows/ai-chatops.yml` and `self-healing.yml`.

- [x] **Path Fixes & Legacy Cleanup**:
  - Audited and updated all remaining `boomtick-cli` and `boomtick-pkg/mcp` path references.
  - Eliminated legacy token fallbacks (`GH_TOKEN`, `PAT_TOKEN`) in favor of standardized `GITHUB_TOKEN`.
  - **Migration Verification**: Confirmed no active runtime dependencies remain on legacy root directories; all operations transitioned to `boomtick-pkg`.

---

## 🚀 Next Steps & Action Plan
1. **Internalize workflows inside package** (Issue #3203): Evolve the package design so that GitHub Workflows themselves are defined entirely inside the `boomtick-pkg` package directory, keeping `.github/workflows/` as extremely lightweight triggers pointing directly to the ones packaged under `boomtick-pkg/workflows/`.
2. **JSCPD Integration**: Add a dedicated CI step to run `jscpd` against the codebase using the existing `.jscpd.json` configuration.
3. **Subtree Push Preparation**: Once verified, prepare the final subtree push target if extraction to `arii/boomtick` is desired.

---

## 📓 CLI Failure Ledger

- **2026-06-30T15:59:39-07:00** **MCP tool validation failure**: Attempted `github.issue_update` via MCP which returned validation error: `issueNumber required, received undefined` due to schema drift between the host (expecting camelCase `issueNumber`) and the compiled contract (expecting snake_case `issue_number`).
  - *Fix/Remediation:* Implemented a translation wrapper in [github.issue_update.ts](file:///home/ari/tech-dancer/boomtick-pkg/mcp/src/tools/github.issue_update.ts) to map `issueNumber` to `issue_number` fallback.
- **2026-06-30T15:57:47-07:00** **Missing CLI State Update option**: Attempted to close GitHub issues but discovered `td-cli gh issue-update` and the MCP tool lacked support for updating issue states (`--state`).
  - *Fix/Remediation:* Added `--state` (open/closed) parameters to the Python client, orchestrator models, Click options, and TS tool handler. Later, updated the MCP payload schema in `boomtick-pkg/mcp/src/mcp/definitions.ts` to actually expose `state` to the agent and make `body` optional.
