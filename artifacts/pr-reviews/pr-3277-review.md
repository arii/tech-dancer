## Issue Audit Result

**Recommendation:** Completed, close

**Reason:**
This PR properly implements the `github.get_pr` MCP tool to separate GitHub PR querying from Jules session tools. It creates the tool handler in `boomtick-pkg/mcp/src/tools/`, defines it in `definitions.ts`, and wires it correctly into `server.ts`. This follows the exact instructions in memory regarding MCP tool addition: `New MCP tools require their configuration to be added to boomtick-pkg/mcp/src/mcp/definitions.ts, their handler implemented... and registered in... server.ts.`. CI tests complete correctly.

**Implementation Evidence:**
- Files checked:
  - `boomtick-pkg/mcp/src/mcp/definitions.ts`
  - `boomtick-pkg/mcp/src/mcp/server.ts`
  - `boomtick-pkg/mcp/src/tools/github.get_pr.ts`
- PRs checked: #3277
- Tests or validation: CI typechecks and audits pass successfully.

**Remaining Work:**
None.
