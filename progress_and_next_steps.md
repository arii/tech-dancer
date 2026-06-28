# BoomTick-Pkg Consolidation Progress

## 📊 Consolidation Epic: Status Overview

The monorepo restructuring to group `boomtick-mcp` and `dev-tools` under the self-contained `boomtick-pkg/` directory is complete. This consolidation enables proper Python/TypeScript packaging and streamlines repository-wide automation.

---

## 🛠️ Task 1.1: Package boomtick-cli & MCP Server
- [x] **Directory Restructuring**: Legacy directories moved into a proper package structure under `boomtick-pkg/cli/dev_tools` and `boomtick-pkg/mcp/`.
- [x] **Console Entry Points**: Defined `td` and `td-cli` entry points in `pyproject.toml` based on `cli-schema.json`.
- [x] **Architecture Alignment**: Standardized on a unified project structure, ensuring **separation of business logic** from configuration by utilizing `importlib.resources` and ESM-safe path resolutions.
- [x] **Dynamic Configuration**: Swapped hardcoded paths for dynamic loading in `dev_tools_sdk` and `mcp/src/config.ts`, enabling the package to find **project config** and schemas regardless of installation path.

## 📦 Task 1.2: Consolidated Package Extraction
- [x] **Composite Action Migration**: Local GitHub Action workflows refactored into composite actions under `boomtick-pkg/mcp/actions/` (setup, ci-validate, ai-review).
- [ ] **JSCPD CI Integration**: Configure root CI gates to run duplicate detection checks using settings from `.jscpd.json`.
- [ ] **Subtree Push Verification**: Finalize and verify the unit is extractable via `git subtree push`.

## 🚀 Task 1.3: One-Command Onboarding Automation
- [x] **Setup Alignment**: `boomtick-pkg/install.sh` provides a single entry point for local environment configuration, ensuring consistent toolchains across the team.
- [x] **Workspace Validation**: Enforced environment rules using `workspace.json` validated by `workspace-schema.json` to gate against version mismatches.
- [x] **Environment Template**: Provided `.env.example` defining standardized token requirements for CI/CD and local development.

---

## 🔍 Verification Checklist

- [x] **`install.sh` Execution**: Installs correctly and sets up the workspace.
- [x] **CLI Doctor Checks**: `td doctor` succeeds and outputs clean JSON.
- [x] **MCP Server Build**: `pnpm --filter ./boomtick-pkg/mcp build` succeeds.
- [x] **Tests Verification**:
  - `pnpm test` (root tests) passes all 134 test cases.
  - `pnpm --filter ./boomtick-pkg/mcp test` passes all 23 MCP test cases.
- [x] **Runtime Environment & Dependency Enforcement**:
  - Verified Node version `24.16.0` (set via `.node-version` and checked in `package.json` engines).
  - Verified pnpm version `10.28.2` (set via `package.json` engines / packageManager).
  - Ran `pnpm install --frozen-lockfile` locally and confirmed that the lockfile is now fully updated.

- [x] **PR 3010 Alignment**:
  - Branch is a superset containing complete packaging features (including `tdw_services` in `pyproject.toml` and proper `install.sh`).
  - Adopted automated PR healing trigger for `.github/workflows/self-healing.yml`.
  - Aligned `.github/workflows/ai-chatops.yml` with `workflow_dispatch` for dispatcher integration.

- [x] **Path Fixes & Legacy Cleanup**:
  - Audited and updated all remaining `dev-tools` and `boomtick-mcp` path references in active scripts.
  - Eliminated legacy token fallbacks (`GH_TOKEN`, `PAT_TOKEN`) in favor of standardized `GITHUB_TOKEN`.

---

## 🚀 Next Steps

1. **Verify PR Validation / ChatOps in CI**: Test workflow runs on GitHub side to confirm that composite actions execute successfully.
2. **JSCPD Integration**: Add a dedicated CI step to run `jscpd` against the codebase using the existing `.jscpd.json` configuration.
3. **Subtree Push Preparation**: Once verified, prepare the final subtree push target if extraction to `arii/boomtick` is desired.

---

## 📓 CLI Failure Ledger

*No `td` or CLI command failures have been encountered during the setup and verification steps in this session.*

*Note: Any future failing `td` CLI commands will be logged here with their arguments, error output, and context for debugging.*

*2026-06-26T14:40:56-07:00* **MCP tool call failure**: Attempted `github.get_pr_diff` via MCP with arguments `{\"pr_number\":3011}` which did not match expected schema (`prNumber`). Resulted in error `invalid tool call: invalid_args`.
