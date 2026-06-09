This PR adds important integration and schema compliance updates to Boomtick MCP tools.

**Feedback:**
- **What is working well:** Adding explicit error messages for `writeMode` and `pushMode` solves a common issue with LLM agent prompt adherence.
- **Issues to fix:** The `deploy` CI job is failing. Additionally, I noticed that `repair-agent.prompt.md` was heavily overwritten in a newer PR (#1917) to use a deterministic contract that explicitly forbids parameters. Adding this new standard "Tool Execution Rules" section to `repair-agent.prompt.md` conflicts directly with the memory directive: "the multi-agent merge-conflict prompts (`orchestrator.prompt.md`, `repair-agent.prompt.md`) are exceptions. Their `mcp_boomtick_*` tools are pre-authorized, operate deterministically, and take NO explicit parameters. Do not add generic execution rules to these files."
- **Actionable instructions:** Revert the changes to `repair-agent.prompt.md`. Fix whatever caused the `deploy` CI job to fail.

**CI Status:** ❌ Failing tests (`deploy` job).
