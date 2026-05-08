> Follow `.agent/AGENT_CONTRACT.md` before reading anything else.

## Failure Modes (Read Before Starting)

- **DO NOT** read context from any source other than the files specified below.
- **DO NOT** create new files unless this workflow explicitly says so.
- **DO NOT** skip steps because an earlier step produced no output.
- **DO NOT** submit partial JSON — all placeholder values must be replaced.
- If you are uncertain about a line number, re-read the diff. Never guess.

---
description: systematically audit, track, and review multiple GitHub pull requests in bulk
---

## Workflow State

Current step: [ ] Step 0 | [ ] Step 1 | [ ] Step 2 | [ ] Step 3 | [ ] Step 4

Instructions: Mark each step complete (`[x]`) before proceeding to the next.
A step is only complete when its output file exists and contains non-placeholder content.

# Mass Audit PRs Workflow

This workflow standardizes the process for auditing multiple open Pull Requests, ensuring consistent code quality, tracking current review status, and efficiently submitting inline feedback across a batch of PRs using a decoupled read/write architecture.

// turbo-all

1. **Fetch open PRs**:
```bash
gh pr list --state open --json number,title,author --jq '.[] | "- #\(.number) \(.title) (@\(.author.login))"'
```

2. **Check for conflicts**:
```bash
python3 dev-tools/td_cli.py conflicts
```
Review output and determine safe merge order before proceeding.

3. **Update Tracking**: Create or update `REVIEW_TRACKING.md` in the project root with a summary table tracking PR statuses and the chronological list of PRs to review.

4. **Generate Review Context & Output Templates**: For a selected batch of PRs, run the fetch script. This will generate a read-only `pr-context-<PR>.md` and a writeable `pr-review-<PR>.md` for each.
```bash
python3 dev-tools/td_cli.py audit-pr PR_NUMBER --fetch
```

5. **Audit the PRs**: For each PR, READ the instructions in `.agent/workflows/REVIEW_INSTRUCTIONS.md` and the diffs in `pr-context-<PR_NUMBER>.md`.

6. **Draft the Review**:
   - **DO NOT** edit the `pr-context-<PR_NUMBER>.md` markdown file.
   - **EDIT** the `pr-review-<PR_NUMBER>.md` file.
   - You **MUST** evaluate the code against the checklist and physically mark each `- [ ]` box as `- [x]`.
   - Add your general findings, final recommendation, and specific inline comments mapped to exact line numbers into the json block at the bottom of the file.

7. **Submit the Review**: Run the submission script against the populated review file.
```bash
python3 dev-tools/td_cli.py audit-pr PR_NUMBER --submit
```

8. **Track & Repeat**: Update `REVIEW_TRACKING.md` with the outcome ("Approved", "Changes Requested") and proceed to the next PR.
