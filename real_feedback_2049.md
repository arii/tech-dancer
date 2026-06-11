### Specific Review for PR #2049

**What is working well:**
- The scope is clearly defined in branch `fix/modernize-dev-tools-workflows-7085352192852669026`.
- All CI checks appear to be passing.

**Specific Issues & Actionable Fixes:**
- **Python Scripting:** Python changes detected.
  - *Fix:* Ensure `python3 -m pytest tests/` passes. Update `test_td_cli.py` or equivalent test files if extending `dev-tools`.
- **Overlap / Interdependency:** This PR touches dev-tools or overlap logic.
  - *Fix:* Ensure this is rebased against recent changes in #2076 or #2070 to avoid overlapping functionality.
