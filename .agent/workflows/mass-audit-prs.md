---
description: systematically audit, track, and review multiple GitHub pull requests in bulk
---

# Mass Audit PRs Workflow

This workflow standardizes the process for auditing multiple open Pull Requests, ensuring consistent code quality, tracking current review status, and efficiently submitting inline feedback across a batch of PRs.

// turbo-all

1. Fetch the list of all open pull requests to identify the scope of the mass audit:
```bash
gh pr list --state open --json number,title,author --jq '.[] | "- #\(.number) \(.title) (@\(.author.login))"'
```

2. Create or update a central tracking document (e.g., `REVIEW_TRACKING.md` or `UPDATED_REVIEW_TRACKING.md`) in the project root. This file should contain:
   - A summary table tracking PR statuses (Ready to Merge, Awaiting Updates, Needs Initial Review, etc.)
   - A chronological list of PRs to review.
   - Identified overlaps and dependencies to determine the structural order in which PRs should be reviewed and merged.

3. For a selected batch of PRs from your tracking document, generate the structured review plans sequentially:
```bash
python3 dev-tools/fetch_pr_review_data.py PR_NUMBER
```
*(Repeat step 3 for each PR number in your target batch.)*

4. Systematically audit each generated `plan-pr-review-*.md` document. For EVERY modified file in the PR, evaluate against project standards:
   - **Dead abstractions** — new class/context/hook that a simpler primitive handles?
   - **Unnecessary indirection** — does this add a layer where a direct call would do?
   - **Responsibility creep** — component taking on logic that belongs in a hook or parent?
   - **Import bloat** — e.g., `import React` not needed in React 17+?
   - **Design Token compliance** — raw Tailwind classes (`text-[10px]`) or inline styles bypassing design tokens?
   - **Audit ratio** — if additions > 100 lines, find 10+ lines to remove.

5. Update the `plan-pr-review-*.md` document:
   - Mark all audit checklist items `[x]` (or note explicit violations).
   - Replace the `body` value in the proposed inline comment JSON blocks with specific feedback (and ensure the `line` property matches the actual diff line number).
   - Complete the Submission section at the bottom (fill out ANTI-AI-SLOP, FINDINGS, and FINAL RECOMMENDATION).

6. Use the submission script to parse the document and submit the review to GitHub:
```bash
python3 dev-tools/submit_pr_review_data.py plan-pr-review-PR_NUMBER.md
```

7. Update your tracking document (`REVIEW_TRACKING.md`) with the outcome of the review (e.g., "Approved", "Not Approved", "Approved with Minor Changes") to provide an updated merge priority.

8. Proceed to the next PR in the batch and repeat steps 3-7 until the mass audit phase is complete.
