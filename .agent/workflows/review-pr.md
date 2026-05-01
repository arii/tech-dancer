---
description: review a single GitHub pull request with in-depth inline feedback using decoupled files
---

# Review a Pull Request

// turbo-all

0. **Pre-flight validation**:
```bash
python3 dev-tools/td_cli.py conflicts --pr PR_NUMBER
python3 dev-tools/td_cli.py validate-issue --issue-number RELATED_ISSUE_NUMBER
```

1. **Generate the review documents**:
```bash
python3 dev-tools/td_cli.py audit-pr PR_NUMBER --fetch
```
(This creates `dev-tools/logs/reviews/pr-context-PR_NUMBER.md` for reading, and `dev-tools/logs/reviews/pr-review-PR_NUMBER.md` for writing).

2. **Read the Context & Instructions**:
   - Read `.agent/workflows/REVIEW_INSTRUCTIONS.md` to understand the audit criteria.
   - Read `dev-tools/logs/reviews/pr-context-PR_NUMBER.md` to analyze the code diffs, stats, and **Last Commit Time**.

3. **Draft the Feedback (Output)**:
   - Open the generated `dev-tools/logs/reviews/pr-review-PR_NUMBER.md` file.
   - Explicitly mark every `- [ ]` checklist item as `- [x]` or note the violation. This step is mandatory.
   - Fill in the `body` string within the JSON block at the bottom of the file with your overall findings and final recommendation.
   - Populate the `comments` array within the JSON block with specific inline feedback. Ensure path and line match the diff exactly.
   - **Do not edit the pr-context file.**

4. **Submit & Cleanup**: Parse the document and submit the review in one step. Use `--cleanup` to remove the working files on success:
```bash
python3 dev-tools/td_cli.py audit-pr PR_NUMBER --submit --cleanup
```
