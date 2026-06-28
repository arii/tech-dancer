## Comprehensive PR Review: #3123

### Summary
This PR implements dual-mode (monolith vs. standalone) support across GitHub Actions and context-building scripts for `boomtick-pkg`. It extracts workspace setup into a reusable composite action and introduces path fallback logic for compatibility.

### Observations
* **Action Updates:** The modifications in `.github/workflows/ci.yml` and `boomtick-pkg/mcp/actions/setup/action.yml` to use `setup-workspace` with conditional paths correctly handle directory structures depending on whether the repo is run standalone or within a monolith.
* **New Action (`setup-workspace`):** The `setup-workspace` action correctly configures Node.js, Python, `pnpm`, and `dev-tools`, while dynamically checking for `boomtick-pkg/cli` vs `cli`. This centralizes environment bootstrapping.
* **MCP Server Modification:** Updating `boomtick-pkg/mcp/src/mcp/server.ts` to use `import.meta.dirname` for `agentsDir` resolution ensures paths work regardless of the installation context, eliminating hardcoded `boomtick-pkg` references.
* **Context Script Updates:** `boomtick-pkg/scripts/build-repo-context.py` now uses the presence of `workspace.json` to differentiate between monolith and standalone setups, gracefully managing `package.json` and `project_config.json` fallbacks.
* **CI Status:** The PR passes all CI checks (`deploy`, `build`, `resolve-conflicts`, `verify-changes`).

### Recommendations
* The changes are robust and align with making the `boomtick-pkg` portable.
* Ensure that the `workspace.json` convention is strictly adhered to in future package updates, as `build-repo-context.py` now relies on its presence/location.

### Conclusion
Excellent work on making the CI and context scripts context-agnostic. The changes are correct and ready for merge.
