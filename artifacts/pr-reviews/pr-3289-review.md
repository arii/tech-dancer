## Issue Audit Result

**Recommendation:** Completed, close

**Reason:**
This PR updates the `gitleaks/gitleaks-action` from version 2 to version 3. This update ensures compatibility with the new GitHub Node 24 runtime and removes deprecation warnings, keeping security checks modern and reliable.

**Implementation Evidence:**
- Files checked:
  - `.github/workflows/ci.yml` (and any other workflow using gitleaks)
- PRs checked: #3289
- Tests or validation: CI security scans (gitleaks) complete successfully.

**Remaining Work:**
None.
