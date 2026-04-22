# PR Review Plan: #165 — Add GitHub Collaborative Dev Tool

<!-- PR_NUMBER: 165 -->

**Repo:** arii/tech-dancer — https://github.com/arii/tech-dancer/pull/165
**Stats:** +1020/-0 across 8 file(s)

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

Adds a new GitHub PR review collaborative dev tool in Python to the `Dev tools/` directory and updates `AGENTS.md` with instructions for AI agents on how to use it.

---
*PR created automatically by Jules for task [2764299371510011337](https://jules.google.com/task/2764299371510011337) started by @arii*

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

- `[A]` [.agent/workflows/review-pr.md](https://github.com/arii/tech-dancer/pull/165/files) `+30/-0`
- `[A]` [.github/PULL_REQUEST_REVIEW_TEMPLATE.md](https://github.com/arii/tech-dancer/pull/165/files) `+128/-0`
- `[M]` [.gitignore](https://github.com/arii/tech-dancer/pull/165/files) `+6/-0`
- `[M]` [AGENTS.md](https://github.com/arii/tech-dancer/pull/165/files) `+43/-0`
- `[A]` [dev-tools/README.md](https://github.com/arii/tech-dancer/pull/165/files) `+73/-0`
- `[A]` [dev-tools/fetch_pr_review_data.py](https://github.com/arii/tech-dancer/pull/165/files) `+124/-0`
- `[A]` [dev-tools/gh_collab.py](https://github.com/arii/tech-dancer/pull/165/files) `+408/-0`
- `[A]` [dev-tools/submit_pr_review_data.py](https://github.com/arii/tech-dancer/pull/165/files) `+208/-0`

---

## Per-File Audit

Note: Do NOT skip any file. Leave a comment for every file, even if clean.


<!-- BEGIN_FILE_AUDIT: .agent/workflows/review-pr.md -->
---

### File: `.agent/workflows/review-pr.md` +30/-0 (added)

Diff:
```diff
@@ -0,0 +1,30 @@
+---
+description: review a GitHub pull request with in-depth inline feedback
+---
+
+# Review a Pull Request
+
+// turbo-all
+
+1. Generate the structured review document:
+```bash
+python3 dev-tools/fetch_pr_review_data.py PR_NUMBER
+```
+
+2. Read the generated plan and for EVERY changed file evaluate:
+   - **Dead abstractions** — new class/context/hook that a simpler primitive handles?
+   - **Unnecessary indirection** — does this add a layer where a direct call would do?
+   - **Responsibility creep** — component taking on logic that belongs in a hook or parent?
+   - **Import bloat** — `import React` not needed in React 17+?
+   - **Token compliance** — raw Tailwind or inline styles bypassing design tokens?
+   - **Audit ratio** — if additions > 100 lines, find 10+ lines to remove.
+
+3. Fill in `plan-pr-review-PR_NUMBER.md` (in the project root):
+   - Mark every audit checklist item `[x]` (or note a violation inline)
+   - Replace every `<FILL IN: ...>` in the `Proposed inline comment` JSON with real, line-referenced feedback
+   - Fill in the `body` in the Submission JSON with ANTI-AI-SLOP / FINDINGS / FINAL RECOMMENDATION
+
+4. Parse and submit in one step — the link is printed on success:
+```bash
+python3 dev-tools/submit_pr_review_data.py plan-pr-review-PR_NUMBER.md
+```
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
  "path": ".agent/workflows/review-pr.md",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": ".agent/workflows/review-pr.md",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: .agent/workflows/review-pr.md -->


<!-- BEGIN_FILE_AUDIT: .github/PULL_REQUEST_REVIEW_TEMPLATE.md -->
---

### File: `.github/PULL_REQUEST_REVIEW_TEMPLATE.md` +128/-0 (added)

Diff:
```diff
@@ -0,0 +1,128 @@
+# PR Review Plan: #165 — Add GitHub Collaborative Dev Tool
+
+<!-- PR_NUMBER: 165 -->
+
+**Repo:** arii/tech-dancer — https://github.com/arii/tech-dancer/pull/165
+**Stats:** +1020/-0 across 8 file(s)
+
+---
+
+<!-- AGENT INSTRUCTIONS — READ BEFORE DOING ANYTHING ELSE
+
+RULES:
+1. Work ONLY from the diff content in this document. Do NOT fetch external data.
+2. Do NOT alter the document structure, headings, or fenced code blocks.
+3. Keep all ```json blocks intact and properly fenced — the parser depends on them.
+4. Do NOT mark Step 3 verification items complete until Step 2 is fully done.
+
+STEPS (in order):
+  Step 1: Read the Description and Stats. If additions > 100 lines, you MUST find 10+ lines to cut.
+  Step 2: For every file block in "Per-File Audit":
+    - Read the diff.
+    - Mark each checklist item [x] if clean, or write the violation inline.
+    - Replace the "body" value in the Proposed inline comment JSON blocks with specific feedback.
+    - Update "line" to the actual diff line number where the issue occurs.
+    - You MUST leave a comment for every file, even if just confirming it is clean.
+  Step 3: Verify all items below are complete, then mark each [x].
+    [ ] Every audit checklist item is marked [x] or has a violation noted.
+    [ ] Every Proposed inline comment has a real line number (not 1) and a real body (not a placeholder).
+    [ ] The Submission body is filled in with ANTI-AI-SLOP, FINDINGS, and FINAL RECOMMENDATION.
+  Step 4: Submit using the command in the Submission section at the bottom.
+-->
+
+## Description
+
+Adds a new GitHub PR review collaborative dev tool in Python to the `Dev tools/` directory and updates `AGENTS.md` with instructions for AI agents on how to use it.

---
*PR created automatically by Jules for task [2764299371510011337](https://jules.google.com/task/2764299371510011337) started by @arii*
+
+---
+
+## Review Standards
+
+You are a Principal Software Engineer performing a deep technical audit.
+Evaluate EVERY changed file against the following criteria:
+
+1. Dead abstractions — new class/context/hook that a simpler primitive already handles?
+2. Unnecessary indirection — adds a layer where a direct call would do?
+3. Responsibility creep — component taking on logic that belongs in a hook or parent?
+4. Import bloat — `import React` added unnecessarily? (Not needed in React 17+)
+5. Token compliance — raw Tailwind classes or magic pixel values bypassing `design-tokens.ts`?
+6. No arbitrary Tailwind — values like `text-[11px]`, `max-w-[1400px]` are explicitly banned.
+7. Audit ratio — if additions > 100 lines, find at least 10 lines to cut.
+
+Mandatory response sections (fill these in the Submission body below):
+- ANTI-AI-SLOP: verbose/over-engineered patterns found, or confirmed absent
+- FINDINGS: per-file critical feedback with specific line numbers
+- FINAL RECOMMENDATION: Approved | Approved with Minor Changes | Not Approved
+
+---
+
+## Files Changed
+
+- `[A]` [.agent/workflows/review-pr.md](https://github.com/arii/tech-dancer/pull/165/files) `+30/-0`
- `[A]` [.github/PULL_REQUEST_REVIEW_TEMPLATE.md](https://github.com/arii/tech-dancer/pull/165/files) `+128/-0`
- `[M]` [.gitignore](https://github.com/arii/tech-dancer/pull/165/files) `+6/-0`
- `[M]` [AGENTS.md](https://github.com/arii/tech-dancer/pull/165/files) `+43/-0`
- `[A]` [dev-tools/README.md](https://github.com/arii/tech-dancer/pull/165/files) `+73/-0`
- `[A]` [dev-tools/fetch_pr_review_data.py](https://github.com/arii/tech-dancer/pull/165/files) `+124/-0`
- `[A]` [dev-tools/gh_collab.py](https://github.com/arii/tech-dancer/pull/165/files) `+408/-0`
- `[A]` [dev-tools/submit_pr_review_data.py](https://github.com/arii/tech-dancer/pull/165/files) `+208/-0`
+
+---
+
+## Per-File Audit
+
+Note: Do NOT skip any file. Leave a comment for every file, even if clean.
+
+{{FOR_EACH_FILE}}
+<!-- BEGIN_FILE_AUDIT: {{FILENAME}} -->
+---
+
+### File: `{{FILENAME}}` {{FILE_STATS}} ({{FILE_STATUS}})
+
+Diff:
+```diff
+{{DIFF}}
+```
+
+Audit checklist (mark [x] when confirmed clean, or write the violation inline):
+- [ ] Architecture: Logic belongs in this layer, no leaky abstractions, no cross-domain coupling
+- [ ] Design System: Uses design tokens — no magic numbers, no arbitrary Tailwind values
+- [ ] Types: Strict — no `any`, no implicit types
+- [ ] React: No unnecessary `import React` (React 17+)
+
+Proposed inline comments — add one block per issue found. Copy the block to add more.
+Do NOT remove the backtick fences. Do NOT leave placeholder text in `body`.
+At minimum one comment per file is required, even if just confirming the file is clean.
+```json
+{
+  "path": "{{FILENAME}}",
+  "line": 1,
+  "body": "<FILL IN: feedback for this line>"
+}
+```
+
+Add additional blocks below for other issues in this file:
+```json
+{
+  "path": "{{FILENAME}}",
+  "line": 1,
+  "body": "<optional second comment — delete this block if not needed>"
+}
+```
+<!-- END_FILE_AUDIT: {{FILENAME}} -->
+{{END_FOR_EACH}}
+
+---
+
+## Submission
+
+After completing every file block above, fill in the body below and run the command.
+
+<!-- BEGIN_SUBMISSION_JSON -->
+```json
+{
+  "body": "## ANTI-AI-SLOP\n<findings or confirmed absent>\n\n## FINDINGS\n<per-file summary with line references>\n\n## FINAL RECOMMENDATION\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
+  "comments": [
+    { "path": "src/example.tsx", "line": 10, "body": "Inline feedback here" }
+  ]
+}
+```
+<!-- END_SUBMISSION_JSON -->
+
+Command:
+```bash
+python3 dev-tools/submit_pr_review_data.py plan-pr-review-165.md
+```
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
  "path": ".github/PULL_REQUEST_REVIEW_TEMPLATE.md",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": ".github/PULL_REQUEST_REVIEW_TEMPLATE.md",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: .github/PULL_REQUEST_REVIEW_TEMPLATE.md -->


<!-- BEGIN_FILE_AUDIT: .gitignore -->
---

### File: `.gitignore` +6/-0 (modified)

Diff:
```diff
@@ -20,3 +20,9 @@ venv/
 etl/data/*.parquet
 !etl/data/wcs_prelims.parquet
 package-lock.json
+
+# PR review working files (always written to /tmp, never the repo)
+pr-review-*.md
+review_payload.json
+
+plan-pr-review-*.md
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
  "path": ".gitignore",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": ".gitignore",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: .gitignore -->


<!-- BEGIN_FILE_AUDIT: AGENTS.md -->
---

### File: `AGENTS.md` +43/-0 (modified)

Diff:
```diff
@@ -42,6 +42,49 @@ These are **Rules for writing clean .tsx files** to ensure every `.tsx` file adh
 
 ## 9. 🧭 Routing Is Declarative
 - Navigation uses route config (not hardcoded)
+- Do NOT use `HashRouter`.
+
+## 23. 🤝 Collaborative GitHub Workflows
+
+The `dev-tools/gh_collab.py` script handles all PR review interactions. Auth is automatic via `gh auth token` — no manual `GITHUB_TOKEN` export needed.
+
+**Step 1 — Generate a structured per-file review plan:**
+```bash
+python3 dev-tools/fetch_pr_review_data.py <PR_NUMBER>
+# Outputs to /tmp/pr-review-<PR_NUMBER>.md — read it to understand what changed
+cat /tmp/pr-review-<PR_NUMBER>.md
+```
+
+**Step 2 — Submit a Code Review (one step):**
+```bash
+python3 dev-tools/gh_collab.py review <PR_NUMBER> --file /tmp/review_payload.json
+```
+
+The `/tmp/review_payload.json` must use the anti-slop structure:
+```json
+{
+  "body": "## ANTI-AI-SLOP\n...\n## FINDINGS\n...\n## FINAL RECOMMENDATION\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
+  "comments": [
+    { "path": "src/foo.tsx", "line": 42, "body": "Inline comment text" }
+  ]
+}
+```
+
+**Other commands:**
+- `python3 dev-tools/gh_collab.py create <PR> --file payload.json` — create pending review without submitting
+- `python3 dev-tools/gh_collab.py submit <PR> COMMENT|APPROVE|REQUEST_CHANGES` — submit existing pending review
+- `python3 dev-tools/gh_collab.py plan --pr-info ... --inline ... --general ... --reviews ... --output PR_Plan.md`
+- Add `--dry-run` flag to any command to simulate without hitting the API.
+
+**Code Review Standards (anti-bloat):**
+When reviewing, evaluate EVERY changed file against these criteria:
+1. **Dead abstractions** — Is a new class/context/hook solving a problem that a simpler primitive already handles?
+2. **Unnecessary indirection** — Does this add a layer where a direct call would do?
+3. **Responsibility creep** — Is a component taking on logic that belongs in a hook or a parent?
+4. **Import bloat** — Are `React` default imports added unnecessarily (not needed in React 17+)?
+5. **Token compliance** — Are design tokens used, or is raw Tailwind/inline style leaking in?
+6. Post an inline comment on the most critical line of each file changed.
+
 
 ## 10. 🎞 Motion Must Use Tokens
 - Motion values come from `motionTokens`
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
  "path": "AGENTS.md",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "AGENTS.md",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: AGENTS.md -->


<!-- BEGIN_FILE_AUDIT: dev-tools/README.md -->
---

### File: `dev-tools/README.md` +73/-0 (added)

Diff:
```diff
@@ -0,0 +1,73 @@
+# GitHub Collaborative Dev Tool
+
+A unified command-line tool for managing GitHub Pull Request reviews and collaborative development. It works across any repository by automatically detecting your Git environment. It seamlessly consolidates offline markdown planning and online API interactions.
+
+## Prerequisites
+- Python 3.7+
+- `requests` library (`pip install requests`)
+- A GitHub Personal Access Token set as `GITHUB_TOKEN` in your environment.
+
+## Installation & Setup (Alias)
+
+To make this tool easily accessible from anywhere in your terminal, set up an alias:
+
+1. Make the script executable:
+   ```bash
+   chmod +x "dev-tools/gh_collab.py"
+   ```
+
+2. Add the alias to your `~/.bashrc`, `~/.zshrc`, or equivalent shell profile (replace `/path/to/` with your actual absolute path):
+   ```bash
+   alias gh-collab="python3 /path/to/dev-tools/gh_collab.py"
+   ```
+
+3. Reload your profile (e.g., `source ~/.zshrc`). Now you can use `gh-collab` directly from any project directory!
+
+## Usage
+
+This tool has three main commands: `plan`, `create`, and `submit`.
+
+### 1. Plan
+Generates a markdown document to help you track and strategize responses to PR comments.
+
+```bash
+gh-collab plan \
+  --pr-info pr.json \
+  --inline inline.json \
+  --general general.json \
+  --reviews reviews.json \
+  --output PR_Plan.md
+```
+
+### 2. Create
+Creates a pending PR review on GitHub. You can pass a simple body string or a JSON file containing structured review data.
+
+```bash
+# Using a simple string
+gh-collab create 123 --body "Starting my review."
+
+# Using a JSON file
+gh-collab create 123 --file review_payload.json
+```
+
+### 3. Submit
+Submits your pending review with a specific action (`APPROVE`, `REQUEST_CHANGES`, or `COMMENT`).
+
+```bash
+gh-collab submit 123 APPROVE
+```
+
+## AI Agent Integration (agent.md)
+
+To enable AI agents (like Cursor, Aider, or custom integrations) to use this tool autonomously, add the following to your project's `agent.md` or `.cursorrules` file:
+
+### PR Review & Feedback Workflow
+When asked to address PR comments or review code, utilize the `gh-collab` CLI tool (located at `dev-tools/gh_collab.py`):
+1. **Plan:** If raw JSON comment data is present, run `python3 dev-tools/gh_collab.py plan ...` to generate a `PR_Plan.md` file. Read this file to understand the requested changes.
+2. **Draft Reviews:** As you fix code, use `python3 dev-tools/gh_collab.py create <PR_NUMBER> --body "<Your message>"` to draft your responses.
+3. **Submit:** Once code changes are pushed, run `python3 dev-tools/gh_collab.py submit <PR_NUMBER> COMMENT` to finalize the review.
+*Ensure `GITHUB_TOKEN` is exported in the environment before running.*
+
+## Global Flags
+- `--repo`: Override the auto-detected repository (e.g., `--repo octocat/Hello-World`).
+- `--dry-run`: Simulate API requests without making actual changes.
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
  "path": "dev-tools/README.md",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "dev-tools/README.md",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: dev-tools/README.md -->


<!-- BEGIN_FILE_AUDIT: dev-tools/fetch_pr_review_data.py -->
---

### File: `dev-tools/fetch_pr_review_data.py` +124/-0 (added)

Diff:
```diff
@@ -0,0 +1,124 @@
+import subprocess
+import os
+import requests
+import sys
+
+
+def get_token():
+    """Retrieves the GitHub token via gh CLI, falls back to env var."""
+    try:
+        out = subprocess.check_output(
+            ['env', '-u', 'GITHUB_TOKEN', 'gh', 'auth', 'token'],
+            stderr=subprocess.DEVNULL, text=True
+        ).strip()
+        if out:
+            return out
+    except Exception:
+        pass
+    return os.getenv("GITHUB_TOKEN", "")
+
+
+def get_repo():
+    """Auto-detect repo from git remote."""
+    try:
+        url = subprocess.check_output(
+            ['git', 'config', '--get', 'remote.origin.url'],
+            stderr=subprocess.DEVNULL, text=True
+        ).strip()
+        if url.endswith('.git'):
+            url = url[:-4]
+        return url.split('://github.com')[-1].split(':')[-1].lstrip('/')
+    except Exception:
+        return os.getenv("GH_REPO", "arii/tech-dancer")
+
+
+def main():
+    if len(sys.argv) < 2:
+        print("Usage: python3 dev-tools/fetch_pr_review_data.py <PR_NUMBER>")
+        sys.exit(1)
+
+    pr_num = sys.argv[1]
+    token = get_token()
+    repo = get_repo()
+    headers = {
+        "Authorization": f"Bearer {token}",
+        "Accept": "application/vnd.github.v3+json"
+    }
+
+    # ── Fetch PR metadata and file list ───────────────────────────────────────
+    try:
+        pr_resp = requests.get(f"https://api.github.com/repos/{repo}/pulls/{pr_num}", headers=headers).json()
+        files_resp = requests.get(f"https://api.github.com/repos/{repo}/pulls/{pr_num}/files", headers=headers).json()
+        if 'message' in pr_resp and pr_resp['message'] == 'Not Found':
+            print(f"Error: PR #{pr_num} not found in {repo}.")
+            sys.exit(1)
+    except Exception as e:
+        print(f"Error fetching PR data: {e}")
+        sys.exit(1)
+
+    title = pr_resp.get('title', 'Unknown Title')
+    description = (pr_resp.get('body') or 'No description provided.').strip()
+    additions = pr_resp.get('additions', 0)
+    deletions = pr_resp.get('deletions', 0)
+    changed_files = pr_resp.get('changed_files', 0)
+
+    file_list_lines = []
+    for f in files_resp:
+        pr_url = f"https://github.com/{repo}/pull/{pr_num}"
+        file_list_lines.append(
+            f"- `[{f['status'][0].upper()}]` [{f['filename']}]({pr_url}/files) `+{f['additions']}/-{f['deletions']}`"
+        )
+
+    # ── Load template ─────────────────────────────────────────────────────────
+    script_dir = os.path.dirname(os.path.abspath(__file__))
+    repo_root = os.path.dirname(script_dir)
+    template_path = os.path.join(repo_root, ".github", "PULL_REQUEST_REVIEW_TEMPLATE.md")
+
+    if not os.path.exists(template_path):
+        print(f"Error: Template not found at {template_path}")
+        sys.exit(1)
+
+    with open(template_path, 'r') as t:
+        template = t.read()
+
+    # ── Extract and iterate the per-file template block ───────────────────────
+    start_marker = "{{FOR_EACH_FILE}}"
+    end_marker = "{{END_FOR_EACH}}"
+
+    if start_marker not in template or end_marker not in template:
+        print("Error: Template is missing {{FOR_EACH_FILE}} / {{END_FOR_EACH}} markers.")
+        sys.exit(1)
+
+    before, rest = template.split(start_marker, 1)
+    file_template, after = rest.split(end_marker, 1)
+
+    per_file_rendered = []
+    for f in files_resp:
+        patch = f.get('patch', '_Binary file or no textual diff available._')
+        block = file_template
+        block = block.replace("{{FILENAME}}", f['filename'])
+        block = block.replace("{{FILE_STATS}}", f"+{f['additions']}/-{f['deletions']}")
+        block = block.replace("{{FILE_STATUS}}", f['status'])
+        block = block.replace("{{DIFF}}", patch)
+        per_file_rendered.append(block)
+
+    # ── Populate top-level placeholders ───────────────────────────────────────
+    content = before + "\n".join(per_file_rendered) + after
+    content = content.replace("165", pr_num)
+    content = content.replace("Add GitHub Collaborative Dev Tool", title)
+    content = content.replace("+1020/-0 across 8 file(s)", f"+{additions}/-{deletions} across {changed_files} file(s)")
+    content = content.replace("Adds a new GitHub PR review collaborative dev tool in Python to the `Dev tools/` directory and updates `AGENTS.md` with instructions for AI agents on how to use it.

---
*PR created automatically by Jules for task [2764299371510011337](https://jules.google.com/task/2764299371510011337) started by @arii*", description)
+    content = content.replace("- `[A]` [.agent/workflows/review-pr.md](https://github.com/arii/tech-dancer/pull/165/files) `+30/-0`
- `[A]` [.github/PULL_REQUEST_REVIEW_TEMPLATE.md](https://github.com/arii/tech-dancer/pull/165/files) `+128/-0`
- `[M]` [.gitignore](https://github.com/arii/tech-dancer/pull/165/files) `+6/-0`
- `[M]` [AGENTS.md](https://github.com/arii/tech-dancer/pull/165/files) `+43/-0`
- `[A]` [dev-tools/README.md](https://github.com/arii/tech-dancer/pull/165/files) `+73/-0`
- `[A]` [dev-tools/fetch_pr_review_data.py](https://github.com/arii/tech-dancer/pull/165/files) `+124/-0`
- `[A]` [dev-tools/gh_collab.py](https://github.com/arii/tech-dancer/pull/165/files) `+408/-0`
- `[A]` [dev-tools/submit_pr_review_data.py](https://github.com/arii/tech-dancer/pull/165/files) `+208/-0`", "\n".join(file_list_lines))
+
+    # ── Write to project root (workspace-accessible by agents) ──────────────────
+    out_path = os.path.join(repo_root, f"plan-pr-review-{pr_num}.md")
+    with open(out_path, "w") as out:
+        out.write(content)
+
+    print(f"✅ Review plan created: {out_path}")
+    print(f"   Read with:   cat {out_path}")
+    print(f"   Submit with: python3 dev-tools/submit_pr_review_data.py {out_path}")
+
+
+if __name__ == "__main__":
+    main()
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
  "path": "dev-tools/fetch_pr_review_data.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "dev-tools/fetch_pr_review_data.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: dev-tools/fetch_pr_review_data.py -->


<!-- BEGIN_FILE_AUDIT: dev-tools/gh_collab.py -->
---

### File: `dev-tools/gh_collab.py` +408/-0 (added)

Diff:
```diff
@@ -0,0 +1,408 @@
+import argparse
+import json
+import os
+import sys
+import subprocess
+from datetime import datetime
+import requests
+
+# --- Settings ---
+# These settings help our AI and human devs stay in sync on the project.
+def get_github_token():
+    try:
+        out = subprocess.check_output(['env', '-u', 'GITHUB_TOKEN', 'gh', 'auth', 'token'], stderr=subprocess.DEVNULL, text=True).strip()
+        if out: return out
+    except Exception:
+        pass
+    return os.getenv("GITHUB_TOKEN")
+
+TOKEN = get_github_token()
+ENV_REPO = os.getenv("GH_REPO")
+REVIEW_LOG = os.path.expanduser("~/.gh_pending_reviews")
+
+# Default structured review body template (anti-slop directives).
+# Agents should replace the placeholder sections with actual findings.
+REVIEW_BODY_TEMPLATE = """\
+## ANTI-AI-SLOP
+<!-- Flag: verbose comments, over-engineering, duplicate patterns, unnecessary abstractions. -->
+<!-- Audit ratio: if additions > 100 lines, find 10+ lines to remove. -->
+
+## FINDINGS
+<!-- Per-file critical feedback. Inline comments cover specific lines. -->
+
+## FINAL RECOMMENDATION
+<!--  Approved | Approved with Minor Changes | Not Approved -->
+"""
+
+# ==========================================
+# API INTERACTION LAYER
+# ==========================================
+
+class GitHubAPI:
+    def __init__(self, repo_override=None, dry_run=False):
+        self.repo = repo_override or ENV_REPO or self._auto_detect_repo()
+        self.dry_run = dry_run
+
+        if not self.repo:
+            self._error("I couldn't detect a GitHub repo here. Are we in the right git folder? You can also pass --repo or set GH_REPO.")
+        if not TOKEN and not self.dry_run:
+            self._error("Whoops, GITHUB_TOKEN environment variable isn't set. I need that to talk to GitHub!")
+
+    def _auto_detect_repo(self):
+        try:
+            url = subprocess.check_output(
+                ['git', 'config', '--get', 'remote.origin.url'],
+                stderr=subprocess.DEVNULL, text=True
+            ).strip()
+            if url.endswith('.git'): url = url[:-4]
+            return url.split('://github.com')[-1].split(':')[-1]
+        except:
+            return None
+
+    def _get_headers(self):
+        return {
+            "Authorization": f"Bearer {TOKEN}",
+            "Accept": "application/vnd.github.v3+json",
+        }
+
+    def _error(self, msg):
+        print(f"Error: {msg}", file=sys.stderr)
+        sys.exit(1)
+
+    def _info(self, msg):
+        print(f"Info: {msg}")
+
+    def _request(self, method, path, data=None):
+        url = f"https://api.github.com/repos/{self.repo}/{path.lstrip('/')}"
+        if self.dry_run:
+            self._info(f"[Dry-Run] {method} {url}")
+            if data: print(json.dumps(data, indent=2))
+            if 'commits' in path: return [{"sha": "MOCK_SHA"}]
+            if method == 'GET' and 'reviews' in path: return []
+            return {"id": "MOCK_ID", "state": "PENDING", "sha": "MOCK_SHA"}
+
+        resp = requests.request(method, url, headers=self._get_headers(), json=data)
+        if not resp.ok:
+            self._error(f"The GitHub API wasn't happy about that ({resp.status_code}): {resp.text}")
+        return resp.json()
+
+    def get_pending_review(self, pr_num):
+        reviews = self._request("GET", f"pulls/{pr_num}/reviews")
+        pending = [r for r in reviews if r.get('state') == 'PENDING']
+        return pending[0] if pending else None
+
+    def create_review(self, pr_num, json_file=None, body=None):
+        data = {}
+        if json_file:
+            with open(json_file, 'r') as f:
+                data = json.load(f)
+        else:
+            data['body'] = body or "🤖 Automated review session started via collab CLI."
+
+        if not data.get('commit_id'):
+            commits = self._request("GET", f"pulls/{pr_num}/commits")
+            if commits:
+                data['commit_id'] = commits[-1]['sha']
+
+        if not self.dry_run and self.get_pending_review(pr_num):
+            self._error(f"Already have a pending review for PR #{pr_num}. Submit or clear it first.")
+
+        res = self._request("POST", f"pulls/{pr_num}/reviews", data)
+        review_id = res['id']
+
+        os.makedirs(os.path.dirname(REVIEW_LOG), exist_ok=True)
+        with open(REVIEW_LOG, "a") as f:
+            f.write(f"{datetime.now()}|{self.repo}|PR#{pr_num}|{review_id}\n")
+
+        print(f"✅ Pending review {review_id} created.")
+        return review_id
+
+    def review_and_submit(self, pr_num, json_file=None, body=None, event="COMMENT"):
+        """Create a pending review and immediately submit it — avoids the two-step race condition."""
+        review_id = self.create_review(pr_num, json_file=json_file, body=body)
+        if self.dry_run:
+            print(f"[Dry-Run] Would submit review {review_id} as {event}")
+            return
+        self._request("POST", f"pulls/{pr_num}/reviews/{review_id}/events", {"event": event.upper()})
+        review_url = f"https://github.com/{self.repo}/pull/{pr_num}#pullrequestreview-{review_id}"
+        print(f"🚀 Review submitted as {event}.")
+        print(f"🔗 {review_url}")
+
+    def submit_review(self, pr_num, event, review_id=None):
+        if not review_id:
+            pending = self.get_pending_review(pr_num)
+            if not pending: self._error(f"No pending review found for PR #{pr_num}.")
+            review_id = pending['id']
+
+        self._request("POST", f"pulls/{pr_num}/reviews/{review_id}/events", {"event": event.upper()})
+        review_url = f"https://github.com/{self.repo}/pull/{pr_num}#pullrequestreview-{review_id}"
+        print(f"🚀 Review submitted as {event}.")
+        print(f"🔗 {review_url}")
+
+
+# ==========================================
+# MARKDOWN PLANNER LAYER
+# ==========================================
+
+class ReviewPlanner:
+    @staticmethod
+    def truncate(text, length=70):
+        text = ' '.join(text.strip().split())
+        if len(text) > length:
+            return text[: length - 3] + '...'
+        return text
+
+    @staticmethod
+    def format_date(iso_date):
+        try:
+            dt = datetime.fromisoformat(iso_date.replace('Z', '+00:00'))
+            return dt.strftime('%Y-%m-%d')
+        except Exception:
+            return iso_date[:10] if iso_date else 'unknown'
+
+    @staticmethod
+    def quote_body(body):
+        lines = body.strip().split('\n')
+        return '\n'.join('> ' + line if line.strip() else '>' for line in lines)
+
+    @classmethod
+    def generate_plan(cls, pr_info, inline_comments, general_comments, reviews, repo, output_path):
+        pr_number = pr_info.get('number', '?')
+        pr_title = pr_info.get('title', 'Unknown')
+        pr_author = pr_info.get('author', {}).get('login', 'unknown')
+
+        replies_by_parent = {}
+        inline_top_level = []
+        for c in inline_comments:
+            parent_id = c.get('in_reply_to_id')
+            if parent_id:
+                replies_by_parent.setdefault(parent_id, []).append(c)
+            else:
+                inline_top_level.append(c)
+
+        inline_top_level.sort(key=lambda c: (c.get('path', ''), c.get('line') or c.get('original_line') or 0))
+
+        tracker = cls._build_tracker(inline_top_level, general_comments)
+        inline_section = cls._build_inline_section(inline_top_level, replies_by_parent)
+        review_summary_section = cls._build_review_body_section(reviews)
+        general_section = cls._build_general_section(general_comments)
+
+        n_inline = len(inline_top_level)
+        n_general = len(general_comments)
+        total = n_inline + n_general
+
+        pr_url = f'https://github.com/{repo}/pull/{pr_number}'
+        gen_date = datetime.now().strftime('%Y-%m-%d')
+
+        doc = f"""# AI Collab Plan: PR #{pr_number}
+
+> **Note for AI & Human Collaborators:** This plan is generated to structure our review workflow.
+> Please use this structured breakdown to ensure all automated suggestions and manual checks are addressed thoroughly!
+
+**PR:** {pr_title}
+**URL:** {pr_url}
+**Repo:** {repo}
+**Author:** @{pr_author}
+**Generated:** {gen_date}
+**Status:** In Progress
+**Comments to Address:** {total} ({n_inline} inline, {n_general} general)
+
+---
+
+## 🧠 Code Review Best Practices
+
+*Before drafting responses or reviewing code, please adhere to these guidelines:*
+- **Scope & Focus:** Keep feedback strictly relevant to the PR's main goal. Isolate unrelated refactors or nitpicks to separate issues or flag them as explicitly non-blocking.
+- **Actionable & Clear:** Suggest specific code changes rather than vague complaints.
+- **Explain the "Why":** Ground your requests in objective principles (e.g., security, performance, readability, architecture) rather than pure opinion.
+- **Constructive Tone:** Be collaborative and empathetic. Ask clarifying questions instead of making immediate demands.
+- **Highlight the Good:** Take a moment to call out elegant solutions and clean code.
+
+---
+
+## Progress Tracker
+
+{tracker}
+
+---
+
+## Response Options Reference
+
+| Strategy | When to use |
+|---|---|
+| `modify-code` | Change the code to address the feedback |
+| `add-comment` | Reply for clarification without changing code yet |
+| `new-github-issue` | Valid feedback, but out of scope for this PR |
+| `disagree` | Explain why you are keeping the code as is |
+| `acknowledged` | Simple "thanks" or "done" for non-actionable items |
+| `question` | Need more information from the reviewer |
+
+---
+
+{review_summary_section}
+
+## Inline Review Detail
+
+{inline_section}
+
+## General Comment Detail
+
+{general_section}
+        """
+        with open(output_path, 'w') as f:
+            f.write(doc)
+        print(f"Created PR Collab Plan at: {output_path}")
+
+    @classmethod
+    def _format_comment_list(cls, comments, is_general=False, start_idx=1):
+        lines = []
+        n = start_idx
+        for c in comments:
+            author = c.get('user', {}).get('login', 'unknown')
+            preview = cls.truncate(c.get('body', ''), 60)
+            if is_general:
+                lines.append(f'- [ ] {n}. [general] @{author} — "{preview}"')
+            else:
+                path, line = c.get('path', 'unknown'), c.get('line') or c.get('original_line', '?')
+                lines.append(f'- [ ] {n}. [`{path}:{line}`] @{author} — "{preview}"')
+            c['_global_idx'] = n
+            n += 1
+        return lines, n
+
+    @classmethod
+    def _build_tracker(cls, inline_top_level, general_comments):
+        lines = []
+        n = 1
+        if inline_top_level:
+            lines.append('**Inline Review Comments:**')
+            inline_lines, n = cls._format_comment_list(inline_top_level, is_general=False, start_idx=n)
+            lines.extend(inline_lines)
+
+        if general_comments:
+            if lines: lines.append('')
+            lines.append('**General PR Comments:**')
+            general_lines, n = cls._format_comment_list(general_comments, is_general=True, start_idx=n)
+            lines.extend(general_lines)
+
+        return '\n'.join(lines) if lines else '_No comments found._'
+
+    @classmethod
+    def _format_comment_detail(cls, c, replies_by_parent=None, is_general=False):
+        idx = c.get('_global_idx', '?')
+        author, date = c.get('user', {}).get('login', 'unknown'), cls.format_date(c.get('created_at', ''))
+        body = c.get('body', '').strip()
+
+        if is_general:
+            block = [f'### {idx}. @{author} — {date}\n']
+        else:
+            path, line = c.get('path', 'unknown'), c.get('line') or c.get('original_line', '?')
+            block = [f'### {idx}. `{path}` line {line} — @{author}', f'**Date:** {date}\n']
+            diff_hunk = c.get('diff_hunk', '').strip()
+            if diff_hunk:
+                hunk_lines = diff_hunk.split('\n')
+                if len(hunk_lines) > 12: hunk_lines = ['...'] + hunk_lines[-12:]
+                block.extend(['**Context:**', '```diff'] + hunk_lines + ['```\n'])
+
+        block.append(cls.quote_body(body) + '\n')
+
+        if replies_by_parent and c.get('id') in replies_by_parent:
+            for reply in replies_by_parent[c['id']]:
+                r_author, r_date = reply.get('user', {}).get('login', 'unknown'), cls.format_date(reply.get('created_at', ''))
+                block.extend([f'**Reply — @{r_author} ({r_date}):**', cls.quote_body(reply.get('body', '').strip()), '\n'])
+
+        block.extend([
+            '**Response Strategy:**',
+            '<!-- Action: modify-code | add-comment | new-github-issue | disagree | acknowledged | question -->',
+            '<!-- Rationale: [Briefly explain why, applying the best practices above] -->\n',
+            '---'
+        ])
+        return '\n'.join(block)
+
+    @classmethod
+    def _build_inline_section(cls, inline_top_level, replies_by_parent):
+        if not inline_top_level: return '_No inline review comments._\n'
+        parts = [cls._format_comment_detail(c, replies_by_parent=replies_by_parent, is_general=False) for c in inline_top_level]
+        return '\n\n'.join(parts)
+
+    @classmethod
+    def _build_review_body_section(cls, reviews):
+        relevant = [r for r in reviews if r.get('body', '').strip() and r.get('state') in ('CHANGES_REQUESTED', 'COMMENTED', 'COMMENT')]
+        if not relevant: return ''
+
+        parts = ['## Review Summaries\n', '_These are the overall review messages (not tied to a specific line)._\n']
+        for r in relevant:
+            author, date, state = r.get('user', {}).get('login', 'unknown'), cls.format_date(r.get('submitted_at', '')), r.get('state', '')
+            parts.extend([f'### @{author} — {date} ({state})\n', cls.quote_body(r.get('body', '').strip()), ''])
+        return '\n'.join(parts)
+
+    @classmethod
+    def _build_general_section(cls, general_comments):
+        if not general_comments: return '_No general PR comments._\n'
+        parts = [cls._format_comment_detail(c, is_general=True) for c in general_comments]
+        return '\n\n'.join(parts)
+
+# ==========================================
+# CLI ENTRY POINT
+# ==========================================
+
+def main():
+    parser = argparse.ArgumentParser(description="GitHub Review & AI Collaboration Tool")
+    parser.add_argument("--repo", help="Override repo (owner/repo)")
+    parser.add_argument("--dry-run", action="store_true", help="Simulate API requests without making changes")
+
+    sub = parser.add_subparsers(dest="cmd", required=True)
+
+    # Subcommand: plan
+    p_plan = sub.add_parser("plan", help="Generate a markdown response plan from PR data")
+    p_plan.add_argument("--pr-info", required=True)
+    p_plan.add_argument("--inline", required=True)
+    p_plan.add_argument("--general", required=True)
+    p_plan.add_argument("--reviews", required=True)
+    p_plan.add_argument("--output", required=True, help="Markdown output path")
+
+    # Subcommand: create
+    p_create = sub.add_parser("create", help="Create a pending review on GitHub")
+    p_create.add_argument("pr", help="PR Number")
+    p_create.add_argument("--file", help="JSON file with review data")
+    p_create.add_argument("--body", help="Simple comment body")
+
+    # Subcommand: review (create + submit in one step)
+    p_review = sub.add_parser("review", help="Create and immediately submit a review in one step")
+    p_review.add_argument("pr", help="PR Number")
+    p_review.add_argument("--file", help="JSON file with review payload (body, comments[])")
+    p_review.add_argument("--body", help="Simple comment body (no inline comments)")
+    p_review.add_argument("--event", choices=["APPROVE", "REQUEST_CHANGES", "COMMENT"], default="COMMENT")
+
+    # Subcommand: submit
+    p_submit = sub.add_parser("submit", help="Submit a pending review on GitHub")
+    p_submit.add_argument("pr", help="PR Number")
+    p_submit.add_argument("event", choices=["APPROVE", "REQUEST_CHANGES", "COMMENT"])
+    p_submit.add_argument("--id", help="Optional review ID override")
+
+    args = parser.parse_args()
+
+    if args.cmd == "plan":
+        def load_json(path):
+            with open(path, 'r') as f: return json.load(f)
+
+        repo = args.repo or ENV_REPO or "unknown/repo"
+        ReviewPlanner.generate_plan(
+            pr_info=load_json(args.pr_info),
+            inline_comments=load_json(args.inline),
+            general_comments=load_json(args.general),
+            reviews=load_json(args.reviews),
+            repo=repo,
+            output_path=args.output
+        )
+    else:
+        gh = GitHubAPI(repo_override=args.repo, dry_run=args.dry_run)
+        if args.cmd == "create":
+            gh.create_review(args.pr, json_file=args.file, body=args.body)
+        elif args.cmd == "review":
+            gh.review_and_submit(args.pr, json_file=args.file, body=args.body, event=args.event)
+        elif args.cmd == "submit":
+            gh.submit_review(args.pr, args.event, review_id=args.id)
+
+if __name__ == "__main__":
+    main()
+
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
  "path": "dev-tools/gh_collab.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "dev-tools/gh_collab.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: dev-tools/gh_collab.py -->


<!-- BEGIN_FILE_AUDIT: dev-tools/submit_pr_review_data.py -->
---

### File: `dev-tools/submit_pr_review_data.py` +208/-0 (added)

Diff:
```diff
@@ -0,0 +1,208 @@
+"""
+submit_pr_review_data.py
+
+Parses a completed pr-review-NUMBER.md document and submits the review via gh_collab.py.
+
+The document structure (generated by fetch_pr_review_data.py) provides all needed info:
+  - PR number from the title line
+  - Overall review body from the json block in "## Submission" (or legacy "## 🚀 Submission Steps")
+  - Inline comments from each "Proposed inline comment" json block
+
+Usage:
+    python3 dev-tools/submit_pr_review_data.py /tmp/pr-review-163.md
+    python3 dev-tools/submit_pr_review_data.py /tmp/pr-review-163.md --dry-run
+"""
+
+import json
+import re
+import subprocess
+import sys
+import os
+
+
+PLACEHOLDER_PATTERNS = [
+    r"<FILL IN",
+    r"Feedback here",
+    r"<slop findings>",
+    r"<per-file summary>",
+    r"Approved | Approved with Minor Changes | Not Approved",
+]
+
+
+def is_placeholder(text: str) -> bool:
+    return any(re.search(p, text) for p in PLACEHOLDER_PATTERNS)
+
+
+def extract_pr_number(text: str) -> str:
+    """Extract PR number from marker or title line."""
+    # Try marker first
+    m = re.search(r"<!-- PR_NUMBER: (\d+) -->", text)
+    if m:
+        return m.group(1)
+
+    # Fallback to title line
+    lines = text.splitlines()
+    for line in lines[:5]:
+        m = re.search(r"#PR Review.*?#(\d+)", line.replace(" ", ""))
+        if not m:
+            m = re.search(r"#\s*(\d+)", line)
+        if m:
+            return m.group(1)
+    return None
+
+
+def extract_json_blocks(text: str) -> list[dict]:
+    """Extract all ```json ... ``` blocks from text and parse them."""
+    blocks = []
+    # More forgiving regex for the fence start
+    for m in re.finditer(r"```json\s*(.*?)```", text, re.DOTALL):
+        raw = m.group(1).strip()
+        try:
+            blocks.append((json.loads(raw), m.start()))
+        except json.JSONDecodeError:
+            # Try to find the first '{' and last '}' to handle bots adding text inside the fence
+            brace_match = re.search(r"(\{.*\})", raw, re.DOTALL)
+            if brace_match:
+                try:
+                    blocks.append((json.loads(brace_match.group(1)), m.start()))
+                except json.JSONDecodeError:
+                    pass
+    return blocks
+
+
+def parse_review_doc(path: str) -> tuple[str, str, list[dict]]:
+    """
+    Returns (pr_number, overall_body, inline_comments).
+    Raises ValueError with a descriptive message if the document is incomplete.
+    """
+    with open(path, "r") as f:
+        text = f.read()
+
+    # ── PR number ──────────────────────────────────────────────────────────────
+    pr_number = extract_pr_number(text)
+    if not pr_number:
+        raise ValueError("Could not find PR number (checked markers and title line).")
+
+    # ── Overall body from Submission ──────────────────────────────────────────
+    # Try BEGIN_SUBMISSION_JSON marker first
+    submission_match = re.search(
+        r"<!-- BEGIN_SUBMISSION_JSON -->(.*?)<!-- END_SUBMISSION_JSON -->",
+        text, re.DOTALL
+    )
+    if submission_match:
+        submission_text = submission_match.group(1)
+    else:
+        # Fallback to heading-based matching
+        submission_section_match = re.search(r"## (?:🚀 Submission Steps|Submission)(.*)", text, re.DOTALL)
+        if not submission_section_match:
+            raise ValueError("Document is missing the '## Submission' section (and marker).")
+        submission_text = submission_section_match.group(1)
+
+    submission_blocks = extract_json_blocks(submission_text)
+    if not submission_blocks:
+        raise ValueError("No valid JSON block found in the Submission section.")
+
+    overall_body = submission_blocks[0][0].get("body", "")
+    if is_placeholder(overall_body):
+        raise ValueError(
+            "Overall review body still contains placeholder text. "
+            "Fill in ANTI-AI-SLOP, FINDINGS, and FINAL RECOMMENDATION before submitting."
+        )
+
+    # ── Inline comments ───────────────────────────────────────────────────────
+    inline_comments = []
+    skipped = []
+
+    # Strategy: Find all file audit blocks (markers) or use the legacy marker
+    file_audit_blocks = re.finditer(
+        r"<!-- BEGIN_FILE_AUDIT: (.*?) -->(.*?)<!-- END_FILE_AUDIT: \1 -->",
+        text, re.DOTALL
+    )
+
+    found_marker = False
+    for fb in file_audit_blocks:
+        found_marker = True
+        filename = fb.group(1)
+        block_text = fb.group(2)
+        json_match = re.search(r"```json\s*(.*?)```", block_text, re.DOTALL)
+        if not json_match:
+            continue
+
+        raw_json = json_match.group(1).strip()
+        # Handle bots putting multiple objects in one block or adding text
+        blocks = extract_json_blocks(f"```json\n{raw_json}\n```")
+        for comment, _ in blocks:
+            body = comment.get("body", "")
+            line = comment.get("line", 1)
+            path_str = comment.get("path", filename) # Use filename from marker if path missing
+
+            if is_placeholder(body):
+                skipped.append(path_str)
+                continue
+
+            inline_comments.append({"path": path_str, "line": line, "body": body})
+
+    # Legacy Fallback if NO BEGIN_FILE_AUDIT markers found at all
+    if not found_marker:
+        comment_pattern = re.compile(r"\*\*Proposed inline comment\*\*.*?\n(```json\s*\n.*?```)", re.DOTALL)
+        for m in comment_pattern.finditer(text):
+            raw_block = m.group(1)
+            blocks = extract_json_blocks(raw_block)
+            for comment, _ in blocks:
+                body = comment.get("body", "")
+                line = comment.get("line", 1)
+                path_str = comment.get("path", "")
+                if is_placeholder(body):
+                    skipped.append(path_str or "unknown")
+                    continue
+                inline_comments.append({"path": path_str, "line": line, "body": body})
+
+    if skipped:
+        print(f"\n  ⚠️  {len(skipped)} item(s) skipped (unfilled placeholders).")
+
+    return pr_number, overall_body, inline_comments
+
+
+def main():
+    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
+        print(__doc__)
+        sys.exit(0)
+
+    doc_path = sys.argv[1]
+    dry_run = "--dry-run" in sys.argv
+
+    if not os.path.exists(doc_path):
+        print(f"Error: File not found: {doc_path}")
+        sys.exit(1)
+
+    print(f"📄 Parsing: {doc_path}")
+
+    try:
+        pr_number, overall_body, inline_comments = parse_review_doc(doc_path)
+    except ValueError as e:
+        print(f"\n❌ {e}")
+        sys.exit(1)
+
+    print(f"   PR #{pr_number} — {len(inline_comments)} inline comment(s) extracted")
+
+    # Write payload next to the review doc (workspace-accessible)
+    payload_path = os.path.join(os.path.dirname(os.path.abspath(doc_path)), "review_payload.json")
+
+    with open(payload_path, "w") as f:
+        json.dump(payload, f, indent=2)
+    print(f"✅ Payload written: {payload_path}")
+
+    # ── Submit via gh_collab.py ────────────────────────────────────────────────
+    script_dir = os.path.dirname(os.path.abspath(__file__))
+    gh_collab = os.path.join(script_dir, "gh_collab.py")
+
+    cmd = ["python3", gh_collab, "review", pr_number, "--file", payload_path]
+    if dry_run:
+        cmd.insert(2, "--dry-run")
+
+    result = subprocess.run(cmd, cwd=os.path.dirname(script_dir))
+    sys.exit(result.returncode)
+
+
+if __name__ == "__main__":
+    main()
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
  "path": "dev-tools/submit_pr_review_data.py",
  "line": 1,
  "body": "<FILL IN: feedback for this line>"
}
```

Add additional blocks below for other issues in this file:
```json
{
  "path": "dev-tools/submit_pr_review_data.py",
  "line": 1,
  "body": "<optional second comment — delete this block if not needed>"
}
```
<!-- END_FILE_AUDIT: dev-tools/submit_pr_review_data.py -->


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
python3 dev-tools/submit_pr_review_data.py plan-pr-review-165.md
```
