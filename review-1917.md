This PR successfully adds multi-agent merge conflict resolution prompts, defining distinct roles and deterministic workflows for the Orchestrator and Repair agents. The prompts are well-structured and clearly define pre-authorized permissions and execution pipelines.

**Feedback:**
- **What is working well:** The prompts are explicit about deterministic execution, pre-authorized tools, and failure handling. This removes ambiguity and forces the agents into reliable execution loops.
- **Issues to fix:** The checks show a failure `vitest run` on `boomtick-mcp`. This seems related to test suites expecting certain file structures or prompt definitions.
- **Actionable instructions:** Investigate the failure in `pnpm run test` within `boomtick-mcp`. Ensure that any hardcoded paths or test assertions regarding the available agents account for these newly added `.prompt.md` files in `boomtick-mcp/src/agents/`.

**CI Status:** ❌ Failing tests in `boomtick-mcp`.
