This PR successfully adds the `github.find_similar_prs` tool and optimizes PR file fetching to improve the analysis pipeline for the Boomtick MCP. The additions to `src/tools/` follow consistent patterns.

**Feedback:**
- **What is working well:** The `includeFiles` toggle and the similarity calculation approach directly solve the issue of identifying overlapping PR scopes without excessive API calls.
- **Issues to fix:** The checks show a failure `vitest run` on `boomtick-mcp`. The test file `src/tools/github.find_similar_prs.test.ts` imports from a mock correctly, but the mock implementation seems to be causing an issue with how `searchOpenPrsHandler` handles its `arguments`.
- **Actionable instructions:** Investigate the failure in `pnpm run test` within `boomtick-mcp`. Ensure `vi.mocked(searchPrs.searchOpenPrsHandler).mockResolvedValue` exactly matches the expected return schema in the tests.

**CI Status:** ❌ Failing tests in `boomtick-mcp`. Please review CI logs and resolve the vitest failures.
