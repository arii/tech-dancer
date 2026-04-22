"""
fetch_pr_review_data.py

Fetches PR metadata and diffs from GitHub.
Generates two files to decouple read context from write output:
  1. pr-context-{NUMBER}.md (Read-Only diffs and info)
  2. pr-review-{NUMBER}.md (Writeable checklist and JSON output block)
"""

import subprocess
import os
import requests
import sys

def get_token():
    """Retrieves the GitHub token via gh CLI, falls back to env var."""
    try:
        out = subprocess.check_output(
            ['env', '-u', 'GITHUB_TOKEN', 'gh', 'auth', 'token'],
            stderr=subprocess.DEVNULL, text=True
        ).strip()
        if out:
            return out
    except Exception:
        pass
    return os.getenv("GITHUB_TOKEN", "")

def get_repo():
    """Auto-detect repo from git remote."""
    try:
        url = subprocess.check_output(
            ['git', 'config', '--get', 'remote.origin.url'],
            stderr=subprocess.DEVNULL, text=True
        ).strip()
        if url.endswith('.git'):
            url = url[:-4]
        return url.split('://github.com')[-1].split(':')[-1].lstrip('/')
    except Exception:
        return os.getenv("GH_REPO", "arii/tech-dancer")

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 dev-tools/fetch_pr_review_data.py <PR_NUMBER>")
        sys.exit(1)

    pr_num = sys.argv[1]
    token = get_token()
    repo = get_repo()
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json"
    }

    # ── Fetch PR metadata and file list ───────────────────────────────────────
    try:
        pr_url = f"https://api.github.com/repos/{repo}/pulls/{pr_num}"
        pr_resp = requests.get(pr_url, headers=headers)
        pr_resp.raise_for_status()
        pr_data = pr_resp.json()

        files_url = f"{pr_url}/files"
        files_resp = requests.get(files_url, headers=headers).json()

    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to fetch PR data: {e}")
        sys.exit(1)

    title = pr_data.get('title', 'Unknown Title')
    description = pr_data.get('body') or '_No description provided._'
    author = pr_data.get('user', {}).get('login', 'Unknown')
    additions = pr_data.get('additions', 0)
    deletions = pr_data.get('deletions', 0)
    changed_files = pr_data.get('changed_files', 0)

    # ── Generate Context Markdown (Read-Only) ─────────────────────────────────
    context_lines = []
    context_lines.append(f"# PR Context: #{pr_num} — {title}")
    context_lines.append(f"**Stats:** +{additions}/-{deletions} across {changed_files} files")
    context_lines.append(f"**Author:** @{author}\n")
    context_lines.append(f"## Description\n{description}\n")
    context_lines.append("## Files Changed")

    for f in files_resp:
        status_icon = "🟢" if f['status'] == "added" else "🔴" if f['status'] == "removed" else "🟡"
        context_lines.append(f"- {status_icon} `{f['filename']}` (+{f['additions']}/-{f['deletions']})")

    context_lines.append("\n## Diffs")
    for f in files_resp:
        context_lines.append(f"\n### `{f['filename']}` ({f['status']})")
        context_lines.append(f"```diff\n{f.get('patch', '_No textual diff available._')}\n```")

    context_content = "\n".join(context_lines)

    # ── Generate Review Template (Writeable) ──────────────────────────────────
    review_template = f"""# PR Review: #{pr_num}

## Audit Checklist
For EVERY changed file, verify against these standards. Mark as `- [x]` when verified.
- [ ] Dead abstractions: No new class, context, or hook that a simpler primitive handles.
- [ ] Unnecessary indirection: No layer of wrapping where a direct function call suffices.
- [ ] Responsibility creep: Component does not take on state/logic belonging in parent/hook.
- [ ] Import bloat: No unnecessary `import React from 'react'` (React 17+).
- [ ] Token compliance: Uses established design tokens (no raw Tailwind values or inline styles).
- [ ] Audit ratio: If > 100 lines added, identified at least 10 lines to refactor/remove.

## Output JSON
Provide your findings and inline comments in the JSON block below.
DO NOT REMOVE THE BACKTICKS.

```json
{{
  "body": "## ANTI-AI-SLOP\\n<findings>\\n\\n## FINDINGS\\n<summary>\\n\\n## FINAL RECOMMENDATION\\n<Approved | Approved with Minor Changes | Not Approved>",
  "comments": [
    {{
      "path": "<filename>",
      "line": 1,
      "body": "<feedback>"
    }}
  ]
}}
```
"""
    # ── Write files to project root ───────────────────────────────────────────
    # Use current working directory (repo root)
    repo_root = os.getcwd()

    ctx_path = os.path.join(repo_root, f"pr-context-{pr_num}.md")
    rev_path = os.path.join(repo_root, f"pr-review-{pr_num}.md")

    with open(ctx_path, "w") as f:
        f.write(context_content)

    with open(rev_path, "w") as f:
        f.write(review_template)

    print(f"✅ Generated Read-Only Context: {ctx_path}")
    print(f"✅ Generated Writeable Template: {rev_path}")

if __name__ == "__main__":
    main()
