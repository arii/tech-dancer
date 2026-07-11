# Merge Strategy & Overlaps

During the review of the 10 PRs, the following conflicts were detected:

1. **Conflict between PR 3515 and PR 3532**:
   - Both modify `boomtick-pkg/install.sh`. PR 3532 unconditionally enforces `.venv` usage (removing CI conditional bypasses), and PR 3515 adds environment variable initialization and a post-installation health check.
   - **Resolution Strategy**: Merge PR 3532 first, as it is a fix for non-interactive scripts. Then merge PR 3515 and manually resolve the conflict by keeping the unconditional venv setup from 3532 while adding the `.env` initialization and `doctor` check from 3515.

2. **Conflict between PR 3538 and PR 3524**:
   - Both modify `boomtick-pkg/cli/dev_tools/services/github.py` and `boomtick-pkg/cli/tests/test_labels.py`. PR 3538 adds pylint fixes, while PR 3524 adds a new `state` parameter to `update_issue`.
   - **Resolution Strategy**: Merge PR 3524 first as it contains feature additions. Rebase PR 3538 and ensure pylint fixes still apply correctly to the updated code.

3. **Conflict between PR 3538 and PR 3534**:
   - Both modify `boomtick-pkg/cli/dev_tools/orchestrator.py` and `boomtick-pkg/cli/dev_tools/cli.py`.
   - **Resolution Strategy**: Similar to the above, merge PR 3534 first to secure the CI feature logic, then rebase PR 3538.

4. **Conflict between PR 3538, PR 3533, and PR 3516**:
   - All modify `package.json` (PR 3533 for overrides, PR 3538 possibly for lint rule or dependencies, PR 3516 for TS).
   - **Resolution Strategy**: Merge PR 3533 first as it's a security fix. Merge PR 3516 next. Finally, rebase PR 3538.

## Recommended Merge Order:
1. PR 3533 (Security)
2. PR 3532 (Fix)
3. PR 3519 (Fix)
4. PR 3521 (Fix)
5. PR 3524 (Feature)
6. PR 3534 (Feature)
7. PR 3516 (Chore)
8. PR 3515 (Feature - Resolve conflict with 3532)
9. PR 3538 (Chore - Resolve conflicts with 3524, 3534, 3533, 3516)
10. PR 3537 (Chore - Standalone markdown changes)
