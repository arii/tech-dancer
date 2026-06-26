# Migration Progress & Next Steps

## 📊 Progress Status

The monorepo restructuring to group `boomtick-mcp` and `dev-tools` under the self-contained `boomtick-pkg/` directory is complete. 

### Completed Tasks
1. **Skeleton and Structure**: Created `boomtick-pkg/` containing `cli/` (renamed from `dev-tools/`) and `mcp/` (renamed from `boomtick-mcp/`).
2. **Python Package Refactoring**: Flat `.py` files inside `cli/` restructured into a proper `dev_tools` package. Loaded schemas and config files dynamically using `importlib.resources`.
3. **MCP Re-routing**: Updated ESM config files, imports, and self-relative pathways to account for the new directory structure.
4. **Workspace Configs**: Created `workspace.json`, `workspace-schema.json`, `install.sh`, `.env.example`, and copied rules (`.agents/` and `AGENTS.md`) into `boomtick-pkg/`.
5. **Workflow Slimming**: Refactored `.github/workflows/` (specifically `ci.yml`, `ai-chatops.yml`, and `self-healing.yml`) into composite GitHub Actions in `boomtick-pkg/mcp/actions/`.

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
  - Verified workflows use `.node-version` file for runtime configuration and do not hardcode versions.
  - Checked `uses:` definitions in workflows to ensure standard/original actions (`actions/checkout@v7`, `actions/setup-node@v6`) align with runtime guidelines.
  - Verified that all workspace dependencies/devDependencies are identical to `origin/main` to preserve Docker container compatibility.
  - Ran `pnpm install --frozen-lockfile` locally and confirmed that the lockfile is now fully updated and successfully runs with the `--frozen-lockfile` flag.

- [x] **PR 3010 Comparison & Alignment**:
  - Compared our changes with PR 3010 (`ari/restructure`) and verified that our branch is a superset containing more complete packaging features (e.g. including `tdw_services` in `pyproject.toml`, proper `install.sh`, and `.agents` rule configurations).
  - Adopted PR 3010's automated PR healing trigger for `.github/workflows/self-healing.yml` (`workflow_run` failure of CI) to replace the daily cron schedule, while retaining latest action versions.
  - Aligned `.github/workflows/ai-chatops.yml` with the workflow dispatch trigger (`workflow_dispatch`) to integrate correctly with the repository's `issue-comment-dispatcher.yml` and avoid duplicate executions.
  - Synced `ci.yml` permissions and `GEMINI_API_KEY` configurations from PR 3010.

- [x] **Workspace Action and Configuration Path Fixes**:
  - Identified and fixed remaining hardcoded path references to `dev-tools` (relocating to `boomtick-pkg/cli`) and `boomtick-mcp` (relocating to `boomtick-pkg/mcp`).
  - Staged and committed updates to `.github/actions/setup-workspace/action.yml`, `.devcontainer/Dockerfile`, `.devcontainer/devcontainer.json`, `.githooks/update-env.sh`, `.github/PULL_REQUEST_REVIEW_TEMPLATE.md`, `.github/dependabot.yml`, `.gitignore`, and `ai_service.py` to prevent failing `pip install` commands in PR validation workflows.
  - Audited the codebase and updated all remaining `dev-tools` and `boomtick-mcp` path references in active scripts and configuration tools, including `scripts/lib/codeReviewOrchestrator.ts`, `scripts/lib/projectConfig.ts`, `scripts/send-jules-impact.py`, `scripts/ux-audit-runner.ts`, `scripts/ux-lighthouse-runner.ts`, `eslint.config.mjs`, `knip.ts`, and the MCP Server's internal prompt directory mappings in `boomtick-pkg/mcp/src/mcp/server.ts`. Verified that `pnpm run lint`, `pnpm run knip`, and CLI tests all pass successfully.

- [x] **Elimination of Legacy Token Fallbacks**:
  - Standardized entirely on `GITHUB_TOKEN` for GitHub authentication.
  - Eliminated deprecated `GH_TOKEN` and `PAT_TOKEN` fallbacks and references from `boomtick-pkg/mcp/src/config.ts`, `boomtick-pkg/cli/dev_tools/dev_tools_sdk/utils/auth.py`, `boomtick-pkg/cli/dev_tools/utils.py`, `boomtick-pkg/cli/dev_tools/vision_audit.py`, `boomtick-pkg/cli/snapshot.sh`, and `boomtick-pkg/cli/verify.sh`.

- [x] **Agent Rules Enforcement Updates**:
  - Updated all `AGENTS.md` and `.agents/AGENTS.md` protocol files to explicitly instruct agents that they must document any MCP or dev-tool failures in the CLI Failure Ledger (within `progress_and_next_steps.md`) instead of silently bypassing issues via raw bash/CLI fallbacks.

---

## 🚀 Next Steps

1. **Verify PR Validation / ChatOps in CI**: Test workflow runs on GitHub side to confirm that composite actions execute successfully.
2. **Subtree Push Preparation**: Once verified, prepare the final subtree push target if extraction to `arii/boomtick` is desired.
3. **Internalize workflows inside package**: Further evolve the package design so that GitHub Workflows themselves are defined entirely inside the `boomtick-pkg` package directory, keeping `.github/workflows/` as extremely lightweight triggers pointing directly to the ones packaged under `boomtick-pkg/workflows/`.

---

## 📓 CLI Failure Ledger

*No `td` or CLI command failures have been encountered during the setup and verification steps in this session.*

*Note: Any future failing `td` CLI commands will be logged here with their arguments, error output, and context for debugging.*

*2026-06-26T14:40:56-07:00* **MCP tool call failure**: Attempted `github.get_pr_diff` via MCP with arguments `{\"pr_number\":3011}` which did not match expected schema (`prNumber`). Resulted in error `invalid tool call: invalid_args`.

