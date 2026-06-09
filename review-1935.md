This PR successfully consolidates several overlapping preview-related infrastructure PRs (#1870, #1885, parts of #1900, #1791) into a single mergeable branch. It addresses GitHub Pages fallback logic, deployment hardening, and preview dashboard stability.

**Feedback:**
- **What is working well:** Consolidating overlapping PRs drastically reduces merge conflicts and keeps `main` stable. All CI checks are green (including the previously problematic `deploy` job), indicating the changes successfully align with repository expectations and deploy workflows.
- **Issues to fix:** The code looks clean and validation checks all passed. No new issues found.
- **Actionable instructions:** Ready for merge.

**CI Status:** ✅ All CI checks are passing.
