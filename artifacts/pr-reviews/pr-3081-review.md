## Comprehensive PR Review: #3081

### Summary
This PR extracts and modularizes core CI routines (linting, type-checking, and test/build) into standalone GitHub composite actions under `boomtick-pkg/mcp/actions/`. It updates the main `.github/workflows/ci.yml` pipeline to consume these reusable actions, significantly reducing YAML repetition and promoting a "modular install" philosophy. It also addresses type linting (`CreateBranchInput`) and pathing issues in `detect-antipatterns.mjs`.

### Observations
* **File Changes:**
  * `.github/workflows/ci.yml`: Refactored to utilize the new composite actions (`actions/lint-typecheck`, `actions/test-build`, `actions/impact-analysis`).
  * `boomtick-pkg/mcp/actions/`: Introduced new composite action files (`lint-typecheck/action.yml`, `test-build/action.yml`, `impact-analysis/action.yml`). `setup/action.yml` was updated to securely set Git `safe.directory`.
  * `repo.create_branch.ts` & `test`: Extracted `CreateBranchInput` type to fix TypeScript inference issues in tests.
  * `knip.ts`: Removed redundant `node-fetch` ignore rule.
  * `detect-antipatterns.mjs`: Added `PYTHONPATH` explicitly to the `execFileSync` call for `scope_check.py` to ensure it works outside the root shell context.
* **Adherence to Repository Standards:** The modularization of actions directly supports the repository's dual-mode execution strategy (standalone vs monolith), building on the `setup-workspace` work from #3123. The Python path injection in Node scripts prevents silent failures across boundaries.
* **CI Status:** The PR passes all validation (`deploy`, `build`, `resolve-conflicts`, `verify-changes`, etc.).

### Recommendations
* The extraction of CI logic into composite actions makes the workflow YAML much cleaner and allows `boomtick-pkg` consumers to easily leverage the same CI steps.
* Be cautious of merge conflicts in `.github/workflows/ci.yml` if this PR is merged alongside PR #3119 (which introduced `parallel` blocks to `ci.yml`). The composite actions may need to be updated to support parallel execution internally if that was the intent.

### Conclusion
Solid architectural improvement that increases reusability and cleans up the main CI workflow. The minor TS and path fixes are spot on. Ready for merge.
