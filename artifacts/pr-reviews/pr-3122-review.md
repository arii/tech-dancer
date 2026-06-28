## Comprehensive PR Review: #3122

### Summary
This PR integrates `jscpd` into the main `package.json` and updates the `ci:local` script to run duplicate code audits (`audit:dupes`) alongside existing checks. It updates the lockfile appropriately and removes the external `npx jscpd` usage from GitHub Actions by using the internalized version. It also introduces an ETL workflow validation config.

### Observations
* **File Changes:**
  * `package.json` correctly adds `jscpd` (v5.0.11) as a dependency, and the scripts section now includes `audit:dupes` utilizing it. `ci:local` correctly chains this new check.
  * `pnpm-lock.yaml` correctly reflects the `jscpd` addition and its platform-specific bindings.
  * `.github/workflows/ci.yml` updates correctly swap `npx jscpd .` for `pnpm run audit:dupes`, reducing dependency installation overhead in CI.
  * ETL and workflow validation additions (`workflow-validation.yml`, `etl.yml`) look standard for maintaining ETL pipelines and validating workflows via `actionlint`.
* **CI Status:** The PR passes all CI checks (`deploy`, `build`, `resolve-conflicts`, `verify-changes`).
* **Adherence to Repository Standards:** The integration directly addresses internalizing duplicate code detection correctly.

### Recommendations
* The changes are complete and correct. Internalizing `jscpd` will slightly speed up CI runs.
* Note: The `workflow-validation.yml` contains a `-ignore 'unexpected key "parallel"'` which correctly supports the experimental GitHub actions features used in this project.

### Conclusion
Code changes look excellent. The `jscpd` integration is sound and standardizes the toolset. Ready for merge.
