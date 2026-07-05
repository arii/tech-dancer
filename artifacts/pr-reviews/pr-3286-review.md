## Issue Audit Result

**Recommendation:** Completed, close

**Reason:**
This PR updates the parameter `id` to `sessionId` in Jules MCP tools to explicitly enforce passing session IDs over PR IDs. This perfectly addresses the issue described in the memory context: `When using jules.* MCP tools... the required parameter is sessionId, which must be a long numeric Jules session ID... not a GitHub pull request or issue number.`. The PR implements this directly within `boomtick-pkg/mcp/src/mcp/definitions.ts` and updates all corresponding tools and tests. CI passes.

**Implementation Evidence:**
- Files checked:
  - `boomtick-pkg/mcp/src/mcp/definitions.ts`
  - `boomtick-pkg/mcp/src/tools/jules/*.ts`
- PRs checked: #3286
- Tests or validation: All CI checks have passed successfully.

**Remaining Work:**
None.
