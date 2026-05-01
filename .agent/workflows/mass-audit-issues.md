---
description: systematically audit, review, and organize open issues in bulk to determine if they should be kept, updated, or abandoned
---

# Mass Audit Issues Workflow

This workflow standardizes the process for auditing multiple open issues, allowing agents to systematically review the issue backlog, determine if they are still relevant, and act accordingly (keep, update, abandon).

// turbo-all

1. **Fetch open issues**:
```bash
gh issue list --limit 100 --json number,title,author,updatedAt,labels,body
```

2. **Update Tracking**: Create or update `ISSUE_TRACKING.md` in the project root with a summary table tracking the issues to review.

3. **Audit the Issues**: For each issue fetched in step 1, analyze the content (`body`), labels, and `updatedAt` to determine its state:
   - **Keep**: The issue is still relevant, actively being worked on, or represents a valid future enhancement/bug.
   - **Update**: The issue is relevant but lacks information, references deprecated paths/assets, or needs a bump to restart discussion. (You can also run `python3 dev-tools/td_cli.py update-issues` to check for deprecated terms).
   - **Abandon**: The issue is stale, no longer applicable, resolved implicitly by other PRs, or lacking actionable details.

4. **Take Action**:
   - **For Keep**: Note the reasoning in your tracking document. Add any labels if necessary.
   - **For Update**: Add a comment to the issue asking for more details, or pointing out deprecated references.
     ```bash
     gh issue comment <ISSUE_NUMBER> --body "Your update comment here"
     ```
   - **For Abandon**: Close the issue with a polite comment explaining why it is being closed.
     ```bash
     gh issue close <ISSUE_NUMBER> --reason "not planned" -c "Closing this issue as it appears to be stale or no longer applicable. If this is still relevant, please feel free to reopen it."
     ```

5. **Track & Repeat**: Update `ISSUE_TRACKING.md` with the outcome ("Kept", "Updated", "Abandoned") and proceed to the next issue.
