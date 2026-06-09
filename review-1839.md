This PR successfully consolidates several overlapping PRs into a single UX audit tooling and dev-tools automation update.

**Feedback:**
- **What is working well:** Consolidating multiple PRs into one is an excellent strategy to reduce repository noise and enforce consistent tooling. The changes correctly add the missing commands and helpers requested in the original PRs.
- **Issues to fix:** The PR state is currently marked as `CONFLICTING` with the base branch. This means it cannot be merged as-is. Additionally, the `deploy` CI job failed.
- **Actionable instructions:** Rebase the branch onto `main` and resolve the merge conflicts. Once resolved, investigate the `deploy` job failure to ensure the deployment workflow succeeds.

**CI Status:** ❌ Failing tests (`deploy` job) and the PR has merge conflicts.
