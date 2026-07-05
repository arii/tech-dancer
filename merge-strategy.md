# Merge Strategy

Given the successful review of the 19 open PRs across the repository:

1. **Merge Method**: All PRs have successfully completed validation, built, and bypassed foundational gates without errors. They should be merged via **Squash and Merge** to maintain a linear history on the `main` branch.
2. **Order of Operation**: No strong interdependence exists based on the modified files list and lack of overlap violations. They can be safely merged in PR chronological order or batched via `td-cli gh aggregate main <PR_LIST>` for rapid integration.
3. **Post-Merge**: After all code has been incorporated into `main`, re-execute `pnpm run agent:prime` to sync the global `agent-context.json` so tools downstream don't trip over stale MCP schemas.
