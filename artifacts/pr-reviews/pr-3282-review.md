## Issue Audit Result

**Recommendation:** Completed, close

**Reason:**
This PR updates the code review standards to require concrete evidence for HIGH/blocking severity, downgrading speculative issues to questions or nitpicks. This correctly aligns with memory: `Code reviews follow a strict evidentiary bar for 'HIGH / Blocking' severity. A blocking concern must point to a concrete contradiction in the diff... Speculative concerns... must be downgraded to 'Question' or 'Nitpick'.` and `Code review system prompts enforcing synchronized evidentiary standards are located in boomtick-pkg/cli/dev_tools/services/ai_service.py...`. The correct files were updated and CI passed.

**Implementation Evidence:**
- Files checked:
  - `boomtick-pkg/cli/dev_tools/services/ai_service.py`
  - `scripts/lib/visualReviewConstants.ts`
  - `.agents/workflows/REVIEW_INSTRUCTIONS.md`
- PRs checked: #3282
- Tests or validation: All CI checks have passed successfully.

**Remaining Work:**
None.
