This PR adds a UX storyboard document for redesigning the `/research` page and introduces a slight relaxation to the Node version checking in `orchestrator.py`.

**Feedback:**
- **What is working well:** The UX storyboard (`docs/research-storyboard.md`) is comprehensive and clearly outlines the responsive priorities and layout primitives needed for the redesign.
- **Issues to fix:**
  1. The PR is marked as `UNKNOWN` mergeability. The checks run were incomplete (missing the usual linting and testing matrix), so it requires a rebase against `main`.
  2. Modifying `dev-tools/tdw_services/orchestrator.py` to loosen the Node.js version check from strict `22.22.2` equality to just checking the major version `22.x` **violates the core CODEX.md runtime contract**. The project explicitly mandates exactly Node.js `22.22.2`. This change must be reverted.
- **Actionable instructions:**
  1. Revert the changes to `dev-tools/tdw_services/orchestrator.py`. Do not alter the strict Node.js runtime enforcement.
  2. Rebase the branch onto `main` to trigger the full CI pipeline.

**CI Status:** ❓ CI check results are missing or incomplete.
