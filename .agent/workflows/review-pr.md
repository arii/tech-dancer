---
description: review a GitHub pull request2. Read the generated plan. For EVERY changed file evaluate:
   - **Dead abstractions** — new class/context/hook that a simpler primitive handles?
   - **Unnecessary indirection** — does this add a layer where a direct call would do?
   - **Responsibility creep** — component taking on logic that belongs in a hook or parent?
   - **Import bloat** — `import React` not needed in React 17+?
   - **Token compliance** — raw Tailwind or inline styles bypassing design tokens?
   - **Audit ratio** — if additions > 100 lines, find 10+ lines to remove.

3. Fill in the generated `/tmp/pr-review-PR_NUMBER.md`:
   - Mark every audit checklist item `[x]` (or note a violation)
   - Replace every `<FILL IN: ...>` in the `Proposed inline comment` JSON blocks with real, line-referenced feedback
   - Fill in the `body` in the Submission Steps JSON with ANTI-AI-SLOP / FINDINGS / FINAL RECOMMENDATION

4. Parse and submit in one step — the link is printed on success:
```bash
python3 dev-tools/submit_pr_review_data.py /tmp/pr-review-PR_NUMBER.md
```
