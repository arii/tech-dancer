---
description: review a single GitHub pull request with in-depth inline feedback using decoupled files
---

# Review a Pull Request

// turbo-all

1. **Generate the review documents**:
```bash
python3 dev-tools/fetch_pr_review_data.py PR_NUMBER
```
(This creates `pr-context-PR_NUMBER.md` for reading, and `pr-review-PR_NUMBER.md` for writing).

2. **Read the Context & Instructions**:
   - Read `.agent/workflows/REVIEW_INSTRUCTIONS.md` to understand the audit criteria.
   - Read `pr-context-PR_NUMBER.md` to analyze the code diffs and stats.

3. **Draft the Feedback (Output)**:
   - Open the generated `pr-review-PR_NUMBER.md` file.
   - Explicitly mark every `- [ ]` checklist item as `- [x]` or note the violation. This step is mandatory.
   - Fill in the `body` string within the JSON block at the bottom of the file with your overall findings and final recommendation.
   - Populate the `comments` array within the JSON block with specific inline feedback. Ensure path and line match the diff exactly.
   - **Do not edit the pr-context file.**

4. **Submit**: Parse the document and submit the review in one step:
```bash
python3 dev-tools/submit_pr_review_data.py pr-review-PR_NUMBER.md
```
