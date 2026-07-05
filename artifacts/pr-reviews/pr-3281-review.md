## Issue Audit Result

**Recommendation:** Completed, close

**Reason:**
This PR scopes the AI reviewer prompt directly to the PR's stated purpose (by injecting `pr.body`). It also scopes security warnings strictly to cases where new untrusted input paths are introduced. This precisely mirrors memory: `The system prompt incorporates the PR description to ground the review in its stated intent and instructs the model to only flag security issues if the diff introduces a new untrusted input path...`. CI passed.

**Implementation Evidence:**
- Files checked:
  - `boomtick-pkg/cli/dev_tools/services/ai_service.py`
- PRs checked: #3281
- Tests or validation: CI Lint, Type Check, and Security Scans passed.

**Remaining Work:**
None.
