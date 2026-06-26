# Dev-Tools Portability & Packaging Readiness

This document assesses the portability of the `dev-tools/` suite and outlines the steps required to extract it into a standalone, distributable package.

## Packaging Readiness Verdict
**Verdict:** High. `dev-tools/` is now parameterized and can be adopted by other repositories with zero changes to its Python source code. Only `project_config.json` needs to be customized for each new consumer.

## Configurable Values
The following values are now surfaced in `dev-tools/project_config.json`:

- `github_repo`: The target GitHub repository (e.g., `owner/repo`).
- `base_branch`: The primary branch to diff against (e.g., `origin/main`).
- `core_dirs`: Directories considered "core" for monolithic PR detection.
- `monolithic_pr_threshold`: Number of core files touched before a PR is flagged as monolithic.
- `content_scopes`: Mapping of content domain names to their directory prefixes.
- `audit_check_dirs`: Directories to be scanned by the headless UI audit.
- `ai_review_model`: The model used for AI code reviews (default: `gpt-4o`).
- `ai_vision_model`: The model used for AI vision audits (default: `gpt-4o`).
- `ai_synthesis_model`: The model used for general AI synthesis (default: `gpt-4o-mini`).
- `ui_indicators`: Patterns used to detect UI-related changes for specialized heuristics.
- `allowed_bots`: List of bot usernames whose comments are collected for review summaries.
- `worktree_prefix`: Prefix for temporary git worktrees created during repair operations.
- `spec_sections`: Required markdown sections for issue validation.

## Remaining Blockers / Hardcoded Assumptions
While most configuration is now parameterized, some assumptions remain:

1. **Tool Dependencies**:
   - `node` and `pnpm`: Several scripts rely on these being available to run TypeScript/JavaScript helpers (e.g., `scripts/detect-antipatterns.mjs`). These helpers are currently located outside of `dev-tools/`.
   - `jq`: `aggregate-prs.sh` requires `jq` to parse `project_config.json` and GitHub CLI output.
   - `gh`: Many scripts rely on the GitHub CLI (`gh`) being installed and authenticated.
2. **Environment Variables**: AI model calls still depend on `GITHUB_TOKEN`, `GH_TOKEN`, or `GEMINI_API_KEY` being set in the environment.
3. **Repository Structure**: Some tools assume a standard layout (e.g., `src/`, `node_modules/`) which might vary between projects.
4. **Shell Scripts**: The `.sh` files in `dev-tools/` may still contain hardcoded paths to scripts outside of the `dev-tools/` directory.

## Next Steps for Standalone Packaging
To fully decouple `dev-tools/` and publish it as a standalone package:

1. **Internalize JS Helpers**: Port critical JavaScript helpers (like the anti-pattern detector) to Python or bundle them within the `dev-tools/` package.
2. **Abstract File Operations**: Ensure all file operations are relative to the project root detected at runtime.
3. **PyPI Packaging**: Create a standard `setup.py` or `pyproject.toml` to define dependencies and entry points.
4. **CI/CD Integration**: Create generic GitHub Action templates that can be easily adopted by other repositories.
