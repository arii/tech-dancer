This PR aims to overhaul the merch page and address E2E test issues by mocking form submissions and adding UX consistency screenshots.

**Feedback:**
- **What is working well:** The intent to improve E2E testing and run automated UX audits is sound, and mock usage for contact forms correctly prevents side effects during tests.
- **Issues to fix:** The PR state is currently marked as `CONFLICTING` with the base branch. The diff seems to contain generated artifacts in `artifacts/ux-audit/issues/` which should likely be excluded via `.gitignore` or handled dynamically rather than checked into version control. The checks (CI) data is also empty/missing in the fetched data, suggesting it may not have run successfully recently or the conflict prevents standard checks.
- **Actionable instructions:** Rebase the branch onto `main` to resolve the merge conflicts. Ensure that generated artifacts in `artifacts/` are not checked into the repository (update `.gitignore` if necessary and remove them from the branch).

**CI Status:** ❌ PR has merge conflicts.
