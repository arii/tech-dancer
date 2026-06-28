## Comprehensive PR Review: #3119

### Summary
This PR transitions CI optimization by replacing legacy background/wait patterns with the native GitHub Actions `parallel:` step matrix. It refactors `ci.yml` grouping logic, sequentializes the `Visual Diff` step to avoid race conditions against dependent jobs, ensures Port 4174 is used for Playwright Smoke tests in parallel mode to prevent contention with Lighthouse, and updates the `heartbeat.ts` script to write non-colliding UUID-based log chunks.

### Observations
* **File Changes:**
  * `.github/workflows/ci.yml`: Successfully integrates `parallel:` blocks for the `test-build` job and the four phases of `impact-analysis`, moving away from buggy `background:` and `wait:` pseudo-steps. The `Visual Diff` step is correctly executed sequentially. Playwright's `PORT` is correctly forced to `4174`.
  * `scripts/lib/heartbeat.ts`: Swapped `fs.promises.appendFile` for unique UUID writes via `randomUUID()`, perfectly mitigating write-contention during the newly paralleled CI steps.
  * `.github/workflows/security.yml`: Removed deprecated `# actionlint-disable syntax-check` comments as actionlint now ignores the `parallel` keyword natively.
* **Adherence to Repository Standards:** This PR flawlessly addresses multiple environment rules outlined in memory regarding parallel execution, port contention (Playwright vs Lighthouse), sequential `Visual Diff` constraints, and heartbeat log contention.
* **CI Status:** The PR passes all validation (`deploy`, `build`, `resolve-conflicts`, `verify-changes`, etc.).

### Recommendations
* The changes are architecturally sound and adhere perfectly to the new parallel execution model.
* The UUID generation for `heartbeat.ts` is exactly what was needed to prevent race conditions during parallel `pnpm exec tsx scripts/heartbeat.ts` executions.

### Conclusion
Excellent optimizations for CI stability and performance. Ready for merge.
