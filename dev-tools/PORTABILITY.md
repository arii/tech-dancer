# dev-tools Portability Status

This document assesses the portability and standalone packaging readiness of the `dev-tools/` suite.

## Summary

The `dev-tools/` suite has been audited and parameterized to enable reuse in other repositories with minimal effort. Most repository-specific assumptions (paths, bot names, AI models, branch names) have been moved to `dev-tools/project_config.json`.

## Configuration

To adopt `dev-tools/` in a new repository, customize `dev-tools/project_config.json`. Key configurable values include:

- `core_dirs`: Directories considered "core" for scope checks.
- `audit_check_dirs`: Directories to be audited for UI anti-patterns.
- `base_branch`: The default branch for diffs (e.g., `origin/main`).
- `ai_review_model`, `ai_synthesis_model`, `ai_vision_model`: AI models to use for different tasks.
- `allowed_bots`: Bot usernames recognized as AI sources.
- `worktree_prefix`: Prefix for temporary git worktrees.
- `spec_sections`: Required sections for issue validation.
- `content_scopes`: Prefixes for content-specific scope checks.

## Portability Verdict

**Verdict: Standalone Packaging Ready**

The `dev-tools/` directory can be extracted into a standalone package or shared via `git subtree split`. A new consumer only needs to:
1. Copy the `dev-tools/` directory.
2. Provide a customized `project_config.json`.
3. Set required environment variables (e.g., `GITHUB_TOKEN`, `GEMINI_API_KEY` if used).

## Remaining Work / Blockers

While most hardcoded values have been surfaced, the following areas may still require attention for a truly "plug-and-play" experience:

1. **Tool-specific Scripts**: Some tools (like `detect-antipatterns.mjs`) are still located in `scripts/` (root) rather than inside `dev-tools/`. These need to be migrated to `dev-tools/` (tracked in issue #2960).
2. **Hardcoded Logic in Heuristics**: While paths are configurable, some business logic in `orchestrator.py`'s `evaluate_pr_heuristics` (e.g., specific check names like "Build & E2E") might still be repo-specific.
3. **External Dependencies**: `dev-tools` relies on certain root-level files like `package.json` and `.node-version` for runtime checks. These should ideally be made more flexible or bundled.
4. **boomtick-mcp Integration**: The MCP server's source was not part of this audit and may contain hardcoded references that need to be parameterized in its own repository.
