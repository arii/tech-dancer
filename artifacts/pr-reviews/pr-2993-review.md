## PR Review

**Summary:** This PR updates `jspdf` to `4.2.1` and uses `pnpm.overrides` to force `shell-quote` to `^1.9.0` to address security vulnerabilities. It also hardcodes `BUNDLE_BASELINE_KB` to `3685` in the CI configuration.

**Findings:**
- **Security Updates:** Updating `jspdf` and overriding `shell-quote` are correct procedures to remediate known vulnerabilities. The lockfile is correctly included in the modified files.
- **CI Changes:** In `.github/workflows/ci.yml`, the environment variable `BUNDLE_BASELINE_KB` was changed from reading a repository variable (`${{ vars.BUNDLE_BASELINE_KB }}`) to a hardcoded string `3685`. While this might have been necessary to pass CI due to the bundle size increasing after upgrading `jspdf`, hardcoding this value circumvents the repository variable mechanism designed for this purpose.
- **CI Status:** All relevant CI checks (Deployment Impact Analysis, Build & E2E, CodeQL, Lint & Type Check) have passed successfully, indicating the `jspdf` bump didn't break existing PDF generation functionality and the `shell-quote` override works with existing tools.

**Recommendation:** Approved with Minor Changes. The security patches are necessary and effective. However, the hardcoding of `BUNDLE_BASELINE_KB: 3685` in `.github/workflows/ci.yml` is an anti-pattern. Consider reverting this line and updating the `BUNDLE_BASELINE_KB` repository variable in GitHub Settings instead to maintain configurability.
