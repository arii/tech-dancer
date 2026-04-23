---
description: systematically audit, track, and review multiple GitHub pull requests in bulk
---

# Mass Audit PRs Workflow

This workflow standardizes the process for auditing multiple open Pull Requests, ensuring consistent code quality, tracking current review status, and efficiently submitting inline feedback across a batch of PRs using a decoupled read/write architecture.

// turbo-all

1. **Fetch open PRs**:
```bash
gh pr list --state open --json number,title,author --jq '.[] | "- #\(.number) \(.title) (@\(.author.login))"'
```

2. **Update Tracking**: Create or update `REVIEW_TRACKING.md` in the project root with a summary table tracking PR statuses and the chronological list of PRs to review.

3. **Generate Review Context & Output Templates**: For a selected batch of PRs, run the fetch script. This will generate a read-only `pr-context-<PR>.md` and a writeable `pr-review-<PR>.md` for each.
```bash
python3 dev-tools/fetch_pr_review_data.py PR_NUMBER
```

4. **Audit the PRs**: For each PR, READ the instructions in `.agent/workflows/REVIEW_INSTRUCTIONS.md` and the diffs in `pr-context-<PR_NUMBER>.md`.

5. **Draft the Review**:
   - **DO NOT** edit the `pr-context-<PR_NUMBER>.md` markdown file.
   - **EDIT** the `pr-review-<PR_NUMBER>.md` file.
   - You **MUST** evaluate the code against the checklist and physically mark each `- [ ]` box as `- [x]`.
   - Add your general findings, final recommendation, and specific inline comments mapped to exact line numbers into the json block at the bottom of the file.

6. **Submit the Review**: Run the submission script against the populated review file.
```bash
python3 dev-tools/submit_pr_review_data.py pr-review-PR_NUMBER.md
```

7. **Track & Repeat**: Update `REVIEW_TRACKING.md` with the outcome ("Approved", "Changes Requested") and proceed to the next PR.
