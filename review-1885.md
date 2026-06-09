This PR adds a clarifying comment to `scripts/manage-previews.sh` explaining the use of `set -e`.

**Feedback:**
- **What is working well:** Adding explanatory comments for aggressive failure handling is good practice and helps maintainers understand the script's intent without changing executable logic.
- **Issues to fix:** None. The change is safe, isolated, and passes all CI checks.
- **Actionable instructions:** The PR is ready to merge.

**CI Status:** ✅ All CI checks are passing.
