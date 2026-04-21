---
description: review a GitHub pull request with in-depth inline feedback
---

# Review a Pull Request

// turbo-all

1. Generate a structured per-file review plan:
```bash
python3 dev-tools/fetch_pr_review_data.py PR_NUMBER
# Outputs to /tmp/pr-review-PR_NUMBER.md — open and read it
cat /tmp/pr-review-PR_NUMBER.md
```

2. Read the generated plan. For EVERY changed file evaluate:
   - **Dead abstractions** — new class/context/hook that a simpler primitive handles?
   - **Unnecessary indirection** — does this add a layer where a direct call would do?
   - **Responsibility creep** — component taking on logic that belongs in a hook or parent?
   - **Import bloat** — `import React` not needed in React 17+?
   - **Token compliance** — raw Tailwind or inline styles bypassing design tokens?
   - **Audit ratio** — if additions > 100 lines, find 10+ lines to remove.

3. Write the review payload to `/tmp` using the anti-slop structure:
```bash
cat > /tmp/review_payload.json <<'JSON'
{
  "body": "## ANTI-AI-SLOP\n<!-- Flag verbose comments, over-engineering, duplicate patterns. -->\n\n## FINDINGS\n<!-- Per-file feedback. Inline comments cover specific lines. -->\n\n## FINAL RECOMMENDATION\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
  "comments": [
    { "path": "src/example.tsx", "line": 10, "body": "Inline feedback targeting the most critical line of this file." }
  ]
}
JSON
```

4. Submit — the link is printed on success:
```bash
python3 dev-tools/gh_collab.py review PR_NUMBER --file /tmp/review_payload.json
```
