This PR resolves lint/build errors in `ResearchAnalytics.tsx` by removing unused variables and fixing malformed JSX.

**Feedback:**
- **What is working well:** Removing unused variables like `portfolioGridItems` is required by the project's strict `oxlint`/`eslint` configuration. Restoring the malformed `Stack` tags fixes the build.
- **Issues to fix:** The code changes overlap significantly with the fixes already present in PR #1854. Both attempt to fix the same layout and lint regressions in `ResearchAnalytics.tsx`.
- **Actionable instructions:** Ensure the changes in this PR do not conflict with the resolution in PR #1854. If #1854 covers the same fixes, one should be closed to prevent conflicts.

**CI Status:** ❓ CI checks status is missing/conflicting.
