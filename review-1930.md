This PR updates the `jules fix-ci` prompt in `dev-tools/tdw_services/orchestrator.py` to instruct the agent to act autonomously, fixing issues and updating the PR directly without asking for confirmation.

**Feedback:**
- **What is working well:** The prompt structure is clear, deterministic, and enforces the "do not ask for confirmation" and "document environment limitations" rules, which aligns well with the agent guidelines in this repository.
- **Issues to fix:** None. The tests pass, and the changes safely update the orchestrator prompt.
- **Actionable instructions:** Ready for merge.

**CI Status:** ✅ All CI checks are passing.
