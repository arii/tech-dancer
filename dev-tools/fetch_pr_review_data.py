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
import re

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
    base_override = sys.argv[2] if len(sys.argv) > 2 else None
    
    try:
        pr_url = f"https://api.github.com/repos/{repo}/pulls/{pr_num}"
        pr_resp = requests.get(pr_url, headers=headers)
        pr_resp.raise_for_status()
        pr_data = pr_resp.json()

        # If base_override is provided, we use 'gh pr diff' to get the custom patch
        # otherwise we use the standard file list from the API
        files_url = f"{pr_url}/files"
        files_resp = requests.get(files_url, headers=headers).json()

        # Fetch last commit time
        commits_url = f"{pr_url}/commits"
        commits_resp = requests.get(commits_url, headers=headers).json()
        last_commit_time = "Unknown"
        if commits_resp and len(commits_resp) > 0:
            last_commit_time = commits_resp[-1].get('commit', {}).get('author', {}).get('date', 'Unknown')

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
    context_lines.append(f"**Author:** @{author}")
    context_lines.append(f"**Last Commit:** {last_commit_time}\n")
    context_lines.append(f"## Description\n{description}\n")
    context_lines.append("## Files Changed")

    for f in files_resp:
        status_icon = "🟢" if f['status'] == "added" else "🔴" if f['status'] == "removed" else "🟡"
        context_lines.append(f"- {status_icon} `{f['filename']}` (+{f['additions']}/-{f['deletions']})")

    context_lines.append("\n## Diffs")
    for f in files_resp:
        filename = f['filename']
        context_lines.append(f"\n### `{filename}` ({f['status']})")
        
        patch = f.get('patch', '_No textual diff available._')
        if base_override:
            try:
                head_ref = pr_data.get('head', {}).get('ref')
                # Use git diff to compare main stack against the PR head
                # We use main...HEAD format to get changes from the common ancestor
                patch = subprocess.check_output(
                    ['git', 'diff', f'{base_override}...origin/{head_ref}', '--', filename],
                    stderr=subprocess.PIPE, text=True
                )
                if not patch.strip():
                    patch = "_No textual diff available against base branch._"
            except Exception as e:
                patch = f"_Error fetching custom diff against {base_override}: {str(e)}_"

        annotated_diff = []
        valid_ranges = []
        if patch != '_No textual diff available._':
            lines = patch.splitlines()
            current_hunk_start = 0
            current_hunk_len = 0
            new_line_num = 0
            for line in lines:
                if line.startswith('@@'):
                    # Parse hunk header: @@ -old_start,old_count +new_start,new_count @@
                    match = re.search(r'\+(\d+),?(\d*)', line)
                    if match:
                        new_line_num = int(match.group(1))
                        hunk_len = int(match.group(2)) if match.group(2) else 1
                        valid_ranges.append(f"{new_line_num}-{new_line_num + hunk_len - 1}")
                    annotated_diff.append(line)
                elif line.startswith('+'):
                    annotated_diff.append(f"{new_line_num:4d} |{line}")
                    new_line_num += 1
                elif line.startswith('-'):
                    annotated_diff.append(f"     |{line}")
                else:
                    annotated_diff.append(f"{new_line_num:4d} |{line}")
                    new_line_num += 1
            patch = "\n".join(annotated_diff)

        # Inform the AI of valid comment ranges to prevent 422 errors
        range_str = ", ".join(valid_ranges) if valid_ranges else "None (Binary or too large)"
        context_lines.append(f"**Valid Comment Ranges (New File):** {range_str}")
        context_lines.append(f"```diff\n{patch}\n```")

    context_content = "\n".join(context_lines)

    # ── Generate Review Template (Writeable) ──────────────────────────────────
    review_template = f"""# PR Review: #{pr_num}
    
## Context
- **Last Commit Tracked:** {last_commit_time}

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
    # ── Write files to dedicated reviews folder ───────────────────────────────
    repo_root = os.getcwd()
    output_dir = os.path.join(repo_root, "dev-tools", "logs", "reviews")
    os.makedirs(output_dir, exist_ok=True)

    ctx_path = os.path.join(output_dir, f"pr-context-{pr_num}.md")
    rev_path = os.path.join(output_dir, f"pr-review-{pr_num}.md")

    with open(ctx_path, "w") as f:
        f.write(context_content)

    with open(rev_path, "w") as f:
        f.write(review_template)

    print(f"✅ Generated Read-Only Context: {ctx_path}")
    print(f"✅ Generated Writeable Template: {rev_path}")

if __name__ == "__main__":
    main()
