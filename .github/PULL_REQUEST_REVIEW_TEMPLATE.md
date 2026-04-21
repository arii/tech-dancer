Plan for reviewing pull request #{{NUMBER}}

{{TITLE}}

{{DESCRIPTION}}

📋 Review Progress

[ ] Step 1: Context Gathering

[ ] Review PR description and linked issues

[ ] Scan full file list and change sizes

[ ] Step 2: Holistic Analysis

[ ] Check for Dead abstractions (redundant primitives)

[ ] Check for Unnecessary indirection (layer bloat)

[ ] Check for Responsibility creep (logic in wrong place)

[ ] Check for Import bloat (React 17+ compliance)

[ ] Check for Token compliance (raw Tailwind vs design-tokens.ts)

[ ] Step 3: Per-File Audit (See details below)

[ ] Step 4: Finalization

[ ] Draft overall summary

[ ] Generate review_payload.json

[ ] Execute submission command

📂 Files changed

{{FILES_CHANGES}}

🔍 Diffs

{{DIFFS}}

🛠 Per-File Audit Details

{{FOR_EACH_FILE}}

File: {{FILENAME}}

[ ] Architecture Check

[ ] Logic belongs in this layer

[ ] No circular dependencies or leaky abstractions

[ ] Design System Check

[ ] Uses spacing/color tokens from src/styles/

[ ] No magic numbers or hardcoded pixel values

[ ] Implementation Check

[ ] Types are strict (no any)

[ ] Side effects are correctly managed in hooks

- [ ] **Proposed Comment:**
```json
{
  "path": "{{FILENAME}}",
  "line": 1,
  "body": "<FILL IN: critical feedback for this file>"
}
```


{{END_FOR_EACH}}

## 🚀 Submission Steps

1. Collect all `Proposed Comment` blocks above into `/tmp/review_payload.json`:
```json
{
  "body": "## ANTI-AI-SLOP\n<overall summary>\n\n## FINDINGS\n<key findings>\n\n## FINAL RECOMMENDATION\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
  "comments": [
    { "path": "src/example.tsx", "line": 10, "body": "Inline feedback here" }
  ]
}
```

2. Submit:
```bash
python3 dev-tools/gh_collab.py review {{NUMBER}} --file /tmp/review_payload.json
```
