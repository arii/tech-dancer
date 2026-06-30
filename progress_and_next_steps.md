# BoomTick-Pkg Consolidation Progress

## 📊 Consolidation Epic: Status Overview

The monorepo restructuring to group `boomtick-mcp` and `dev-tools` under the self-contained `boomtick-pkg/` directory is complete. This consolidation enables proper Python/TypeScript packaging, streamlines repository-wide automation, and provides a foundation for progressive context discovery and standardized architectural entry points.

---

## 🛠️ Task 1: Package boomtick-cli & Consolidated Extraction

### Task 1.1: Packaging & Entry Points
- [x] **Directory Restructuring**: Legacy directories moved into a proper package structure under `boomtick-pkg/cli/dev_tools` and `boomtick-pkg/mcp/`.
- [x] **Console Entry Points**: Defined `td` and `td-cli` entry points in `pyproject.toml` based on `cli-schema.json`. Enables agents to use the **compiled entry points** (`td` / `td-cli`) instead of hardcoding `td-cli`.
- [x] **Architecture Alignment**: Standardized on a unified project structure, ensuring **separation of business logic** from configuration by utilizing `importlib.resources` and ESM-safe path resolutions.
- [x] **Dynamic Configuration**: Swapped hardcoded paths for dynamic loading in `dev_tools_sdk` and `mcp/src/config.ts`.
- [x] **Progressive Context Discovery**: Implemented `build-repo-context.py` to index repository structure, JSON schemas, and MCP tools into `.agent-context.json`. This solves the **"cold-start" problem** where agents initially lack repository context to provide efficient feedback.
- [ ] **Native Argument Refactoring**: (#3144): Transition manual `sys.argv` help interceptors to standard `argparse`/`click` configurations (e.g., `add_help=False`).

### Task 1.2: Package Extraction & CI
- [x] **Composite Action Migration**: Local GitHub Action workflows refactored into composite actions under `boomtick-pkg/mcp/actions/`.
- [ ] **JSCPD CI Integration**: Configure root CI gates to run duplicate detection checks using settings from `.jscpd.json`.
- [ ] **Subtree Push Verification**: Finalize and verify the unit is extractable via `git subtree push`.

### Task 1.3: Onboarding Automation
- [x] **Setup Alignment**: `boomtick-pkg/install.sh` provides a single entry point for local environment configuration.
- [x] **Workspace Validation**: Enforced environment rules using `workspace.json` validated by `workspace-schema.json`.
- [x] **Environment Template**: Provided `.env.example` defining standardized token requirements.

---

## 🧹 Task 2: Technical Debt & Logic Simplification
*Goal: Remove complexity that makes the repository difficult to diagnose and update.*

- [x] **Redundant Default Removal**: (#3103): Audit `ProjectConfig` (Python) and `config.ts` (TypeScript) to remove hardcoded fallbacks that shadow configuration.
- [x] **Logic Flattening**: (#3046, #3071, #3074, #3075): Eliminate script-calling-script chains; consolidate orchestration logic directly into `dev_tools` handlers.
- [x] **Redundant Schema Cleanup**: (#3144, #3171): Remove legacy `cli-schema.json` fragments and ensure the unified schema in `boomtick-pkg/cli/dev_tools` is the sole authority.
- [x] **Legacy Reference Cleanup**: (#3149): Scrub remaining documentation and code comments for legacy names (`boomtick-mcp`, `dev-tools/`) to ensure the transition to `boomtick-pkg` is absolute.
- [x] **Failover Behavior Simplification**: (#3103): Replace complex multi-layered fallbacks for tokens and paths with a "fail-fast" configuration pattern.
- [x] **Import Hardening**: (#3151): Eliminate all instances of `sys.path` hacking in favor of absolute package imports and editable installations.
- [x] **Test Leakage Elimination**: (#3151, #3147): Remove all production logic that branches based on the presence of `pytest` in `sys.modules`.

---

## 🏗️ Architectural Review & Resolution Guide

### 1. Identified Anti-Patterns & Security Risks

#### Anti-Pattern 1: Brittle, Redundant `sys.argv` Hacking
Legacy entrypoints used raw `sys.argv` string matching to intercept `-h` and `--help` flags, often leading to unreachable dead code and brittle test-aware logic.
*   **Fix:** Use `argparse(add_help=False)` or `click` native configurations.

#### Anti-Pattern 2: Dynamic Path Mutation (`sys.path` Hacking)
Manual resolution of relative service dependencies via `sys.path.append` introduces **Path Injection Risks** and environment instability.
*   **Fix:** Structure code as absolute subpackages and utilize `pyproject.toml` console scripts.

### 2. Standardized Packaging Standards (Mandated)
- **Deterministic Imports**: No runtime mutations of `sys.path`.
- **No Test Leakage**: Production logic must never check for `pytest` in `sys.modules`.
- **Native Argument Handling**: Use structural parsers (`argparse`, `click`) instead of manual `sys.argv` slicing.

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
  - Audited and updated all remaining `dev-tools` and `boomtick-mcp` path references.
  - Eliminated legacy token fallbacks (`GH_TOKEN`, `PAT_TOKEN`) in favor of standardized `GITHUB_TOKEN`.
  - **Migration Verification**: Confirmed no active runtime dependencies remain on legacy root directories; all operations transitioned to `boomtick-pkg`.

---

## 🚀 Next Steps

1. **Refactor Native Arguments**: Finalize argparse integration across dev_tools and ensure complete removal of `sys.argv` string matching (#3144)
2. **Internalize workflows inside package**: Evolve the package design so that GitHub Workflows themselves are defined entirely inside the `boomtick-pkg` package directory, keeping `.github/workflows/` as extremely lightweight triggers pointing directly to the ones packaged under `boomtick-pkg/workflows/`.
3. **JSCPD Integration**: Add a dedicated CI step to run `jscpd` against the codebase using the existing `.jscpd.json` configuration.
4. **Subtree Push Preparation**: Once verified, prepare the final subtree push target if extraction to `arii/boomtick` is desired.

---

## 📓 CLI Failure Ledger

*No `td` or CLI command failures have been encountered during the setup and verification steps in this session.*

*Note: Any future failing `td` CLI commands will be logged here with their arguments, error output, and context for debugging.*

*2026-06-26T14:40:56-07:00* **MCP tool call failure**: Attempted `github.get_pr_diff` via MCP with arguments `{\"pr_number\":3011}` which did not match expected schema (`prNumber`). Resulted in error `invalid tool call: invalid_args`.
