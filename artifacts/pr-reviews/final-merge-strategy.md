# Final Merge Strategy

Based on the 16 comprehensive PR reviews conducted, we strongly recommend merging the PRs in the following sequential order to avoid conflicts and ensure systemic stability:

## Phase 1: Core CI and Environment Fixes
* **PR #3123**: chore/boomtick-pkg-extraction-verification. Implements core monolithic/standalone CI setup mode.
* **PR #3081**: feat/modularize-ci-and-install. Extracts CI logic into composite actions (relies on setup from #3123).
* **PR #3119**: optimize-ci-background-steps. Integrates `parallel:` executing the newly modularized actions without wait conditions.
* **PR #3122**: **[REJECTED]** ci-jscpd-internalization. This PR over-engineered the workflow files, breaking the CI pipeline (`_No check runs found._`). The jscpd changes should be extracted and the workflow changes reverted.

## Phase 2: Configuration & Validation Consolidation
* **PR #3118**: **[BLOCKED]** refactor/task-2-config-flattening. Deletes redundant validation scripts and centralizes versions. Blocked pending full CI test validation.
* **PR #3117**: **[REJECTED]** prevent-version-downgrades. This PR modifies deprecated files that #3118 deletes. The logic is redundant codebase churn and should be ported manually to #3118 if missing. Do not merge.
* **PR #3120**: workflow-audit-fix. Validates issues cleanly and captures CLI exceptions.
* **PR #3116**: refactor/cli-issue-commands. Cleans up commands with `TypedDict` and masking.
* **PR #3102**: fix/branch-validation-on-dispatch. Improves API search efficiency.

## Phase 3: Entrypoint Standardization
* **PR #3115**: fix-setup-anomalies. Fixes bash paths and adds inline `--help` bypasses.
* **PR #3124**: refactor-cli-entrypoints. Removes redundant imports and adds click context logic.
* **PR #3121**: refactor/cli-entrypoint-standardization. Fully refactors `click.Group` and removes testing logic in `sys.argv`. *Recommendation: Merge #3115, then #3124, then #3121 as #3121 enforces the strictest control over the entry points.*
* **PR #3105**: feat/ci-parallelism. **WARNING:** This PR renames `td_cli.py` to `td`. This must be merged *last* in this group. All PRs modifying `td_cli.py` (#3115, #3124, #3121, #3116) must be merged before this rename happens to prevent breaking the git history tracking.

## Phase 4: Feature Addition & Daemons
* **PR #3114**: implement-github-create-issue-mcp. Introduces a new MCP tool. It's largely isolated but imports the CLI path.
* **PR #3127**: jules/daemon-feedback. A daemon execution trace with no file modifications. Can be closed or merged anytime.
* **PR #3125**: issue-audit-2026-06-28. Documentation artifacts. Missing `issue-audit-status.md` as noted in the review, but safe to merge once corrected.
