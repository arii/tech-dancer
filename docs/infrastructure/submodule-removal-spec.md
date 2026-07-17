# Submodule Removal and Decoupling Verification: Architectural Specification

This document defines the official, concrete plan, requirements, step-by-step procedure, configuration changes, actions/workflow changes, and validation checks required for Phase 4: removing the `boomtick-pkg` submodule.

---

## 1. Prerequisites and Decoupling Status

Before executing Phase 4, the following milestones from Phase 1, Phase 2, and Phase 3 must be fully verified as complete:

1. **Python CLI Published:** The `boomtick-cli` Python package must be published to PyPI (or a private package index), allowing developers and CI/CD pipelines to install the CLI via `pip install boomtick-cli` instead of running `pip install -e boomtick-pkg/cli`.
2. **MCP Server Published:** The Model Context Protocol (MCP) server must be built, published, and distributed as a published npm package or a container image (e.g., ghcr.io/arii/boomtick-mcp:latest) rather than running from the local source of the submodule.
3. **Standalone Composite Actions:** Reusable GitHub Actions located inside `boomtick-pkg/mcp/actions/` (such as `setup-workspace` and `update-pr-comment`) must be extracted into their own standalone repositories or published as independent, version-tagged actions (e.g., `uses: arii/setup-workspace@v1`).
4. **Environment Agnosticism:** The installed CLI and MCP server must rely entirely on root-level configuration files (such as `project_config.json` and `.env`) and loud fail-fast runtime exceptions instead of any silent fallback assumptions pointing to `tech-dancer`.

---

## 2. Submodule Removal Procedure

Once prerequisites are satisfied, the physical submodule removal must be performed using the following deterministic git and system commands:

```bash
# 1. De-initialize the submodule to remove it from git's local configuration
git submodule deinit -f boomtick-pkg

# 2. Remove the submodule directory from git tracking and working directory
git rm -f boomtick-pkg

# 3. Clean up the internal Git directory for the submodule
rm -rf .git/modules/boomtick-pkg
```

If `.gitmodules` contains no other submodule entries after this operation, the file must be removed completely:

```bash
git rm .gitmodules
```

---

## 3. Configuration & Dependency Replacements

### 3.1 Python Environment

Replace local editable path installation in setup scripts with standard pip dependency requirements.
Update `requirements-dev.txt` to include:

```text
boomtick-cli>=0.4.0
```

Update references to local PYTHONPATH variables in `package.json` scripts:

```json
{
  "audit:anti-patterns": "PYTHONPATH=dev_tools:dev_tools/dev_tools node scripts/detect-antipatterns.mjs"
}
```
*Note: Any scripts or linter rules must now run via the installed `td-cli` command.*

### 3.2 Node.js & pnpm Workspace

Remove `boomtick-pkg` from `pnpm-workspace.yaml` and clean up package references:

```yaml
# Updated pnpm-workspace.yaml
packages:
  - "."
enableGlobalVirtualStore: true
```

---

## 4. CI/CD Workflow Modifications

All GitHub Actions workflows under `.github/workflows/` must be updated to remove source-level submodule dependencies.

### 4.1 Trigger Path Updates

In `.github/workflows/ci.yml` and `.github/workflows/deploy.yml`, remove path triggers targeting `boomtick-pkg`:

```yaml
# Before:
paths:
  - 'boomtick-pkg/**'
  - 'boomtick-pkg'
  - '.gitmodules'

# After:
paths:
  - 'src/**'
  - 'etl/**'
  - 'package.json'
  - 'pnpm-lock.yaml'
```

### 4.2 Composite Action Replacements

All references to local actions like `./boomtick-pkg/mcp/actions/setup-workspace` must be replaced with their decoupled, published equivalents.

For example, in `.github/workflows/ci.yml`:

```yaml
# Before:
- name: Setup Workspace
  uses: ./boomtick-pkg/mcp/actions/setup-workspace
  with:
    setup-python: 'true'

# After:
- name: Setup Workspace
  uses: arii/setup-workspace@v1
  with:
    setup-python: 'true'
```

### 4.3 Legacy Workflow Removal

The legacy submodule synchronization workflow, `.github/workflows/update-submodule.yml`, is no longer needed and must be permanently deleted from the repository.

---

## 5. Verification Checklist & Gatekeeper Rules

Before merging the submodule removal, the following validation checks must pass in their entirety:

1. **Clean Installation:** Run `pnpm install` and verify `pnpm-lock.yaml` is clean and contains zero references to `boomtick-pkg`.
2. **Local Lint & Build:** Run `pnpm run lint` and `pnpm run build` to ensure no workspace compile-time or static analysis errors exist.
3. **CLI Doctor Check:** Execute the decoupled CLI doctor command `td-cli doctor` to verify environment consistency and confirm that all configuration variables are loaded successfully.
4. **E2E Testing:** Execute `pnpm run test:e2e` to confirm that standard play-tests and visual regressions are passing successfully with zero failures.
5. **Quality Review:** Run the validation command `td-cli gh validate-issue` on any open issues to ensure that no stale configuration rules are triggered.
