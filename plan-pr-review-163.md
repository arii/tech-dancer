# PR Review Plan: #163 — feat: Automate Issue Planning for Vite Environment

<!-- PR_NUMBER: 163 -->

**Repo:** arii/tech-dancer — https://github.com/arii/tech-dancer/pull/163
**Stats:** +137/-0 across 3 file(s)

---

<!-- AGENT INSTRUCTIONS — READ BEFORE DOING ANYTHING ELSE

RULES:
1. Work ONLY from the diff content in this document. Do NOT fetch external data.
2. Do NOT alter the document structure, headings, or fenced code blocks.
3. Keep all ```json blocks intact and properly fenced — the parser depends on them.
4. Do NOT mark Step 3 verification items complete until Step 2 is fully done.

STEPS (in order):
  Step 1: Read the Description and Stats. If additions > 100 lines, you MUST find 10+ lines to cut.
  Step 2: For every file block in "Per-File Audit":
    - Read the diff.
    - Mark each checklist item [x] if clean, or write the violation inline.
    - Replace the "body" value in the Proposed inline comment JSON blocks with specific feedback.
    - Update "line" to the actual diff line number where the issue occurs.
    - You MUST leave a comment for every file, even if just confirming it is clean.
  Step 3: Verify all items below are complete, then mark each [x].
    [ ] Every audit checklist item is marked [x] or has a violation noted.
    [ ] Every Proposed inline comment has a real line number (not 1) and a real body (not a placeholder).
    [ ] The Submission body is filled in with ANTI-AI-SLOP, FINDINGS, and FINAL RECOMMENDATION.
  Step 4: Submit using the command in the Submission section at the bottom.
-->

## Description

Added a set of scripts to automate creating structured Vite implementation plans from GitHub issues. Includes a markdown template (`plan-template.md`), an agent instruction file (`instructions.txt`), and a python script (`generate_plan.py`) to tie it all together using the GitHub CLI and an LLM.

---
*PR created automatically by Jules for task [9534672763496798450](https://jules.google.com/task/9534672763496798450) started by @arii*

---

## Review Standards

You are a Principal Software Engineer performing a deep technical audit.
Evaluate EVERY changed file against the following criteria:

1. Dead abstractions — new class/context/hook that a simpler primitive already handles?
2. Unnecessary indirection — adds a layer where a direct call would do?
3. Responsibility creep — component taking on logic that belongs in a hook or parent?
4. Import bloat — `import React` added unnecessarily? (Not needed in React 17+)
5. Token compliance — raw Tailwind classes or magic pixel values bypassing `design-tokens.ts`?
6. No arbitrary Tailwind — values like `text-[11px]`, `max-w-[1400px]` are explicitly banned.
7. Audit ratio — if additions > 100 lines, find at least 10 lines to cut.

Mandatory response sections (fill these in the Submission body below):
- ANTI-AI-SLOP: verbose/over-engineered patterns found, or confirmed absent
- FINDINGS: per-file critical feedback with specific line numbers
- FINAL RECOMMENDATION: Approved | Approved with Minor Changes | Not Approved

---

## Files Changed

- `[A]` [scripts/generate_plan.py](https://github.com/arii/tech-dancer/pull/163/files) `+92/-0`
- `[A]` [scripts/instructions.txt](https://github.com/arii/tech-dancer/pull/163/files) `+10/-0`
- `[A]` [scripts/plan-template.md](https://github.com/arii/tech-dancer/pull/163/files) `+35/-0`

---

## Per-File Audit

Note: Do NOT skip any file. Leave a comment for every file, even if clean.


<!-- BEGIN_FILE_AUDIT: scripts/generate_plan.py -->
---

### File: `scripts/generate_plan.py` +92/-0 (added)

Diff:
```diff
@@ -0,0 +1,92 @@
+import subprocess
+import sys
+import os
+import logging
+import shutil
+import tempfile
+
+# Configure structured logging
+logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
+logger = logging.getLogger(__name__)
+
+class PlanGenerationError(Exception):
+    """Custom exception for plan generation failures."""
+    pass
+
+def get_resource_paths():
+    """Returns the paths for the template and instructions."""
+    base_dir = os.path.dirname(__file__)
+    return os.path.join(base_dir, "plan-template.md"), os.path.join(base_dir, "instructions.txt")
+
+def fetch_issue(issue_number):
+    """Fetches issue data from GitHub."""
+    logger.debug(f"Attempting to fetch issue #{issue_number}")
+    try:
+        issue_data = subprocess.check_output(
+            ["gh", "issue", "view", str(issue_number), "--json", "title,body"],
+            text=True,
+            stderr=subprocess.PIPE
+        )
+        logger.info(f"Successfully fetched issue #{issue_number}")
+        return issue_data
+    except subprocess.CalledProcessError as e:
+        error_msg = e.stderr.strip() if e.stderr else str(e)
+        logger.debug(f"gh cli error: {error_msg}")
+        raise PlanGenerationError(f"Failed to fetch issue #{issue_number}: {error_msg}") from e
+
+def render_plan(issue_data, template_path, instructions_path):
+    """Calls the LLM to generate the plan and saves it atomically."""
+    with open(template_path, "r") as f:
+        template_content = f.read()
+    with open(instructions_path, "r") as f:
+        instructions_content = f.read()
+
+    prompt = f"Instructions:\n{instructions_content}\n\nTemplate:\n{template_content}\n\nUsing this issue data: {issue_data}, fill out the plan-template.md."
+
+    logger.info("Generating plan via LLM...")
+    temp_fd, temp_path = tempfile.mkstemp(suffix=".md")
+    os.close(temp_fd)
+
+    try:
+        with open(temp_path, "w") as f:
+            subprocess.run(
+                ["llm", "prompt", "-s", "You are a senior dev.", prompt],
+                stdout=f,
+                stderr=subprocess.PIPE,
+                check=True,
+                text=True
+            )
+
+        # Atomic replacement of the final file
+        shutil.move(temp_path, "plan.md")
+        logger.info("Successfully created plan.md")
+
+    except subprocess.CalledProcessError as e:
+        error_msg = e.stderr.strip() if e.stderr else str(e)
+        logger.debug(f"llm cli error: {error_msg}")
+        if os.path.exists(temp_path):
+            os.remove(temp_path)
+        raise PlanGenerationError(f"LLM generation failed: {error_msg}") from e
+
+def generate_plan(issue_number):
+    try:
+        template_path, instructions_path = get_resource_paths()
+        issue_data = fetch_issue(issue_number)
+        render_plan(issue_data, template_path, instructions_path)
+    except PlanGenerationError as e:
+        logger.error(str(e))
+        sys.exit(1)
+    except Exception as e:
+        logger.exception(f"An unexpected error occurred: {e}")
+        sys.exit(1)
+
+if __name__ == "__main__":
+    # Allow overriding log level via environment variable for debugging
+    log_level = os.environ.get("LOG_LEVEL", "INFO").upper()
+    logging.getLogger().setLevel(log_level)
+
+    if len(sys.argv) < 2:
+        logger.error("Usage: python generate_plan.py <issue_number>")
+        sys.exit(1)
+    else:
+        generate_plan(sys.argv[1])
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "scripts/generate_plan.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "scripts/generate_plan.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: scripts/generate_plan.py -->


<!-- BEGIN_FILE_AUDIT: scripts/instructions.txt -->
---

### File: `scripts/instructions.txt` +10/-0 (added)

Diff:
```diff
@@ -0,0 +1,10 @@
+# Last reviewed: 2024-05-15 — keep in sync with AGENTS.md
+
+> **Role:** You are an expert Senior Software Engineer specializing in Vite, React/Vue, and modern web performance.
+> **Task:** Read the provided GitHub Issue and populate the plan-template.md.
+> **Guidelines:**
+>  1. Be specific. Don't just say "Fix the bug"; say "Update the useAuth hook to handle 401 errors."
+>  2. For Vite repos, prioritize build-efficiency and tree-shaking.
+>  3. Ensure the Verification section includes specific visual checks relevant to the issue.
+>  4. Keep the tone professional and concise.
+>  5. Adhere strictly to the architectural and styling conventions documented in `AGENTS.md`.
\ No newline at end of file
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "scripts/instructions.txt",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "scripts/instructions.txt",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: scripts/instructions.txt -->


<!-- BEGIN_FILE_AUDIT: scripts/plan-template.md -->
---

### File: `scripts/plan-template.md` +35/-0 (added)

Diff:
```diff
@@ -0,0 +1,35 @@
+# Implementation Plan: {{issue_title}}
+
+## 📄 Original Issue Content
+{{issue_body}}
+
+---
+
+## 🛠️ Proposed Solution
+*Overview of the architectural changes or logic updates required.*
+
+---
+
+## 🏃 Implementation Steps
+1. [ ] **Setup:** (e.g., Create branch `feat/issue-{{issue_number}}`)
+2. [ ] **Core Logic:** ...
+3. [ ] **UI/UX Updates:** ...
+4. [ ] **Cleanup:** (e.g., Remove deprecated components)
+
+---
+
+## ✅ Verification Checklist (Vite/Frontend)
+
+### ⚙️ Build & Syntax
+- [ ] **Linting:** Run `npm run lint` (ensure no new warnings).
+- [ ] **Type Check:** Run `npx tsc` (if using TypeScript).
+- [ ] **Production Build:** Run `npm run build` to ensure the Vite optimizer and Rollup build succeed.
+
+### 🧪 Automated Testing
+- [ ] **Unit Tests:** Run `npm run test` (Vitest).
+- [ ] **Visual/UX:** Run `npx playwright test` or `cypress run`.
+
+### 👁️ Manual UX Review
+- [ ] **Responsive Check:** Verify on Mobile/Desktop breakpoints.
+- [ ] **Theme Check:** Verify Light/Dark mode transitions.
+- [ ] **Performance:** Check "Network" tab in DevTools for unexpected bundle bloat.
```

Audit checklist (mark [x] when confirmed clean, or write the violation inline):
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

Proposed inline comments — add one block per issue found. Copy the block to add more.
Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
At minimum one comment per file is required, even if just confirming the file is clean.
```json
{
  "path": "scripts/plan-template.md",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "scripts/plan-template.md",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: scripts/plan-template.md -->


---

## Submission

After completing every file block above, fill in the body below and run the command.

<!-- BEGIN_SUBMISSION_JSON -->
```json
{
  "body": "## ANTI-AI-SLOP\n<findings or confirmed absent>\n\n## FINDINGS\n<per-file summary with line references>\n\n## FINAL RECOMMENDATION\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
  "comments": [
    { "path": "src/example.tsx", "line": 10, "body": "Inline feedback here" }
  ]
}
```
<!-- END_SUBMISSION_JSON -->

Command:
```bash
python3 dev-tools/submit_pr_review_data.py plan-pr-review-163.md
```
