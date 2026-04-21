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

[ ] Proposed Comment:

{
  "path": "{{FILENAME}}",
  "line": 1, 
  "body": "Feedback here"
}


{{END_FOR_EACH}}

🚀 Final Payload Generation

Combine the validated comments above into this block and save as review_payload.json

{
  "body": "Overall review summary text here",
  "event": "COMMENT",
  "comments": [
    { "path": "src/example.tsx", "line": 10, "body": "Inline feedback here" }
  ]
}


📟 Submission Command

python3 dev-tools/gh_collab.py review {{NUMBER}} --file review_payload.json
