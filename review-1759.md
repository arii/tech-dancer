This PR aims to clarify the project taxonomy on the /research page by replacing confusing titles and removing redundant "Active" status badges, fixing #1746.

**Feedback:**
- **What is working well:** Providing an `id` prop to `FolioGrid` is a helpful improvement that enables easier anchor links and better section targeting.
- **Issues to fix:** The PR state is currently marked as `CONFLICTING` with the base branch. The diff also shows changes in `ResearchAnalytics.tsx` that look extremely similar to changes made in PR 1854 (e.g., removing `SEO`, `useNavigate`), which suggests overlap or out-of-date base code. The checks (CI) data is empty, meaning tests have likely failed to run recently.
- **Actionable instructions:** Rebase the branch onto `main` to resolve merge conflicts. Be careful with overlapping changes to `src/features/research/ResearchAnalytics.tsx`. Run `pnpm test` and `pnpm lint` after resolving conflicts.

**CI Status:** ❌ PR has merge conflicts.
