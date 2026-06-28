## Comprehensive PR Review: #3122

### Summary
This PR integrates `jscpd` for duplicate code detection into `package.json` and significantly refactors GitHub workflows by attempting to internalize them into `boomtick-pkg/workflows/` as reusable composite workflows.

### Observations & Critical Findings
* **CI Validation Missing:** ❌ *Critical Failure.* The CI pipeline status explicitly reads `_No check runs found._`. This means the workflow refactoring fundamentally broke GitHub Actions execution for this branch.
* **Codebase Churn / Over-engineering:** The decision to replace all `.github/workflows/` with lightweight wrapper files that just `uses:` another local file inside `boomtick-pkg/workflows/` is a massive over-engineering anti-pattern. GitHub Actions does not cleanly support local composite workflow resolution for `workflow_call` across complex monorepos without significant pathing overhead. This introduces unnecessary indirection and breaks the native CI trigger mechanisms.
* **JSCPD Integration:** While adding `jscpd` to `package.json` is a good step to avoid `npx` overhead, bundling it with this massive workflow breakage obscures the useful change.

### Recommendations
* **REJECTED.** The workflow internalization pattern introduced here is harmful codebase churn that immediately broke the CI pipeline.
* Do not merge this PR. The `jscpd` configuration should be extracted into a separate, focused PR.
* The changes to `.github/workflows` must be reverted immediately as they mask underlying problems and create redundant wrapper files.

### Conclusion
This PR introduces severe regressions by over-engineering the CI pipeline and breaking the execution context. Do not merge.
