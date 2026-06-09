This PR adds a comprehensive documentation and migration strategy to extract generic features from `dev-tools/jules/` and implement a REST API approach.

**Feedback:**
- **What is working well:** Defining the migration strategy explicitly in documentation is a great practice. It clearly maps out what to extract and what to delete (legacy HRM-specific code). All CI checks pass, which is expected for a docs-only change.
- **Issues to fix:** The implementation of this exact migration strategy seems to have already been completed in PR #1931 ("refactor(dev-tools): decommission jules module and extract generic tdw_services"). Merging this documentation now might be redundant or slightly out-of-sync if PR #1931 is merged simultaneously or shortly after.
- **Actionable instructions:** Ensure the documentation aligns perfectly with the actual implementation in PR #1931. Alternatively, close this PR if the documentation is no longer necessary now that the refactor is complete.

**CI Status:** ✅ All CI checks are passing.
