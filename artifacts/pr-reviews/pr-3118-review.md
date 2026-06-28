## Comprehensive PR Review: #3118

### Summary
This PR refactors `Task 2: Config Flattening` by consolidating orchestration and version checking into the unified `tdw_services` pattern, eliminating loose external scripts like `verify_versions.py` and `version_utils.py`. Additionally, the MCP server configuration now implements proper "fail-fast" runtime checks for critical variables in CI, removing shadowed defaults.

### Observations
* **File Deletions:** `boomtick-pkg/cli/verify_versions.py` and `boomtick-pkg/cli/version_utils.py` were fully removed, aligning with the architectural mandate to consolidate standalone scripts directly into `Orchestrator` / `VersionService`.
* **Config Flattening:** `boomtick-pkg/cli/dev_tools/dev_tools_sdk/config.py` correctly absorbs and simplifies the project config lookup (project-agnostic defaults).
* **MCP Server Changes:** `boomtick-pkg/mcp/src/config.ts` correctly removes the hardcoded `arii` and `tech-dancer` repo fallbacks, replacing them with a strict `if (process.env.CI === "true") throw new Error(...)` block. This prevents dangerous execution when tokens/repos are not explicitly wired.
* **CI Status:** The PR passes all validation (`deploy`, `build`, `resolve-conflicts`, `verify-changes`, etc.).

### Recommendations
* The changes are architecturally sound and adhere perfectly to the memory constraints (e.g. "Redundant standalone scripts like ... verify_versions.py ... have been deleted." and "fail-fast patterns for critical settings").

### Conclusion
Excellent refactor that cleans up legacy scripts and hardens the application config for agnostic CI environments. Ready for merge.
