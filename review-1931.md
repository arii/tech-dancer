This PR successfully decommissions the `dev-tools/jules/` directory, extracting generic Git, GitHub, and Agent API tools into `tdw_services` and `td_cli.py`.

**Feedback:**
- **What is working well:** This is a major cleanup that improves cross-project compatibility by removing HRM-specific hardcoded legacy code and placing the operations behind standard CLI commands. All Python and frontend CI checks pass, indicating the refactoring of `td_cli.py` didn't break core CI pipelines.
- **Issues to fix:** None. The tests pass and the refactor achieves the stated goals.
- **Actionable instructions:** Ready for merge.

**CI Status:** ✅ All CI checks are passing.
