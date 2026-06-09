This PR restructures the `/research` page to better highlight high-impact flagship projects like BoomTick.blog and RepoAuditor AI.

**Feedback:**
- **What is working well:** Creating a unified `<Tag>` component and adding explicit `ResearchCTA` definitions cleans up the UI and improves code reuse, fully adhering to the "Composition Over Configuration" rule.
- **Issues to fix:** The PR is marked as `MERGEABLE` but the CI checks are completely missing. Additionally, this PR heavily modifies `ResearchAnalytics.tsx` and `src/config/research-tools.ts`, which overlaps significantly with the changes in PR #1854 and PR #1759.
- **Actionable instructions:** Ensure that this PR does not conflict with the layout fixes in PR #1854. Rebase and push to trigger the full CI pipeline so we can confirm the layout changes do not break E2E or anti-pattern tests.

**CI Status:** ❓ CI checks are missing or incomplete.
