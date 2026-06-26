## PR Review

**Summary:** This PR refactors visual regression tests to follow the Single Responsibility Principle, splitting `verify_ux_consistency.spec.ts` into dedicated `homepage.spec.ts` and `guide.spec.ts` files. It also introduces a `scrollToSettle` helper to fix CI flakiness related to lazy-loading content and removes obsolete OS-suffixed screenshots.

**Findings:**
- **CI Failure:** The `Build & E2E` check failed. This implies that while the tests were refactored, the test execution failed (likely a snapshot mismatch or the tests not being found depending on the runner configuration).
- **Test Separation:** Splitting the monolithic test file into `homepage.spec.ts` and `guide.spec.ts` aligns well with the repository's style and conventions ("Visual regression tests should adhere to the Single Responsibility Principle").
- **Snapshot Cleanup:** The PR successfully removes the obsolete, OS-suffixed screenshots (`-linux.png`), adhering to the project's Playwright snapshot architecture which groups images strictly by browser project folder.
- **Flakiness Mitigation:** The introduction of `scrollToSettle` in `playwright-helpers.ts` is a solid approach to resolving flakiness caused by lazy-loaded images on full-page visual snapshots.

**Recommendation:** Not Approved. While the architectural improvements and code refactoring perfectly align with repository standards, the PR is failing the `Build & E2E` CI check. Please review the Playwright failure logs and resolve the test breakages before merging.
