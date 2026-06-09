This PR fixes build failures in `src/features/research/ResearchAnalytics.tsx` and reverts an incomplete refactor, ensuring responsive padding and proper rendering of the Engineering Systems and Articles sections.

**Feedback:**
- **What is working well:** Reverting the incomplete refactor correctly restores the "Engineering Systems" grid and the "Articles & Research" sections that were accidentally removed or malformed. Using declarative `<Stack as={NavLink} ...>` instead of `onClick={navigate}` aligns with project routing guidelines (Rule #9).
- **Issues to fix:** The checks show a failure `vitest run` on `boomtick-mcp`. However, the changes in this PR are restricted to React frontend code (`.tsx`) and playwright snapshots. It seems unlikely this PR caused the `boomtick-mcp` backend test failures unless it's a shared environment issue or base branch drift. Additionally, the `Build & E2E` job passed, which implies the Playwright tests passed with the updated snapshots.
- **Actionable instructions:** The code changes look correct. Investigate the `boomtick-mcp` test failure to confirm it is unrelated to this frontend PR. If unrelated, this is ready to merge.

**CI Status:** ❌ Failing tests in `boomtick-mcp` (likely unrelated to frontend changes).
