---
description: review a GitHub pull request with in-depth inline feedback
---

# Review a Pull Request

// turbo-all

1. Generate the structured review document:
```bash
python3 dev-tools/fetch_pr_review_data.py PR_NUMBER
```

2. Read the generated file and fill in your findings for each file:
```bash
cat /tmp/pr-review-PR_NUMBER.md
```
Open `/tmp/pr-review-PR_NUMBER.md` and complete every `Proposed Comment` block with real, critical, anti-bloat feedback. Apply the anti-slop audit ratio: if additions > 100 lines, find 10+ lines to cut.

3. Execute the submission steps documented at the bottom of `/tmp/pr-review-PR_NUMBER.md`.
