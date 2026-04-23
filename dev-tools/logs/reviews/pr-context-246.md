# PR Context: #246 — Update dev-tools with CI checks and re-review tracking
**Stats:** +295/-115 across 6 files
**Author:** @arii
**Last Commit:** 2026-04-23T15:07:29Z

## Description
This update expands the `dev-tools` suite with a new `pr_review_manager.py` tool that provides a high-level overview of open PRs, their review status (Needs Review, Needs Re-Review, or Up-to-Date), and their current CI health. It also includes a mechanism to clean up previous review comments to reduce PR noise. Additionally, `fetch_pr_review_data.py` now includes CI status in its generated context files to provide reviewers with immediate visibility into build outcomes.

Fixes #239

---
*PR created automatically by Jules for task [15637729022473842211](https://jules.google.com/task/15637729022473842211) started by @arii*

## Files Changed
- 🟡 `dev-tools/README.md` (+8/-3)
- 🟡 `dev-tools/fetch_pr_review_data.py` (+47/-110)
- 🟡 `dev-tools/gh_collab.py` (+1/-2)
- 🟢 `dev-tools/github_utils.py` (+80/-0)
- 🟢 `dev-tools/pr_review_manager.py` (+129/-0)
- 🟢 `dev-tools/review_template.md` (+30/-0)

## Diffs

### `dev-tools/README.md` (modified)
**Valid Comment Ranges (New File):** 25-40
```diff
@@ -25,11 +25,16 @@ Automates visual testing for the Impeccable Design framework.
  25 | CLI tool for spinning up isolated development environments automatically.
  26 | * Usage: `python3 dev-tools/vdev.py [setup|exec|cleanup] <branch>`
  27 | 
  28 |+### 5. PR Review Manager (`pr_review_manager.py`)
  29 |+Principled tool to track PR review states and clean up obsolete comments.
  30 |+* Features: Commit-aware re-review tracking, CI status monitoring, and automated comment cleanup.
  31 |+* Usage: `python3 dev-tools/pr_review_manager.py [--execute] [--skip-cleanup]`
  32 |+
  33 | ## Prerequisites
  34 | - Python 3.7+
     |-- `requests` and `playwright` libraries
     |-- A GitHub Personal Access Token set as `GITHUB_TOKEN` in your environment (for `gh_collab`).
     |-- `gh` CLI and `llm` CLI installed (for `generate_plan.py`).
  35 |+- `requests`, `playwright`, and `PyGithub` libraries
  36 |+- A GitHub Personal Access Token set as `GITHUB_TOKEN` in your environment.
  37 |+- `gh` CLI (for token retrieval) and `llm` CLI installed.
  38 | 
  39 | ## AI Agent Integration
  40 | AI agents are instructed via `AGENTS.md` to use these tools autonomously to:
```

### `dev-tools/fetch_pr_review_data.py` (modified)
**Valid Comment Ranges (New File):** 7-81, 87-95, 106-125
```diff
@@ -7,109 +7,75 @@
   7 |   2. pr-review-{NUMBER}.md (Writeable checklist and JSON output block)
   8 | """
   9 | 
     |-import subprocess
  10 | import os
     |-import requests
  11 | import sys
  12 | import re
     |-
     |-def get_token():
     |-    """Retrieves the GitHub token via gh CLI, falls back to env var."""
     |-    try:
     |-        out = subprocess.check_output(
     |-            ['env', '-u', 'GITHUB_TOKEN', 'gh', 'auth', 'token'],
     |-            stderr=subprocess.DEVNULL, text=True
     |-        ).strip()
     |-        if out:
     |-            return out
     |-    except Exception:
     |-        pass
     |-    return os.getenv("GITHUB_TOKEN", "")
     |-
     |-def get_repo():
     |-    """Auto-detect repo from git remote."""
     |-    try:
     |-        url = subprocess.check_output(
     |-            ['git', 'config', '--get', 'remote.origin.url'],
     |-            stderr=subprocess.DEVNULL, text=True
     |-        ).strip()
     |-        if url.endswith('.git'):
     |-            url = url[:-4]
     |-        return url.split('://github.com')[-1].split(':')[-1].lstrip('/')
     |-    except Exception:
     |-        return os.getenv("GH_REPO", "arii/tech-dancer")
  13 |+import subprocess
  14 |+from github import Github, GithubException
  15 |+from github_utils import get_github_token, get_repo_name, get_ci_status, get_ci_icon
  16 | 
  17 | def main():
  18 |     if len(sys.argv) < 2:
  19 |         print("Usage: python3 dev-tools/fetch_pr_review_data.py <PR_NUMBER>")
  20 |         sys.exit(1)
  21 | 
     |-    pr_num = sys.argv[1]
     |-    token = get_token()
     |-    repo = get_repo()
     |-    headers = {
     |-        "Authorization": f"Bearer {token}",
     |-        "Accept": "application/vnd.github.v3+json"
     |-    }
     |-
     |-    # ── Fetch PR metadata and file list ───────────────────────────────────────
     |-    base_override = sys.argv[2] if len(sys.argv) > 2 else None
  22 |+    pr_num = int(sys.argv[1])
  23 |+    token = get_github_token()
  24 |+    repo_name = get_repo_name()
  25 |     
  26 |+    if not token:
  27 |+        print("❌ GitHub token not found.")
  28 |+        sys.exit(1)
  29 |+
  30 |+    g = Github(token)
  31 |     try:
     |-        pr_url = f"https://api.github.com/repos/{repo}/pulls/{pr_num}"
     |-        pr_resp = requests.get(pr_url, headers=headers)
     |-        pr_resp.raise_for_status()
     |-        pr_data = pr_resp.json()
     |-
     |-        # If base_override is provided, we use 'gh pr diff' to get the custom patch
     |-        # otherwise we use the standard file list from the API
     |-        files_url = f"{pr_url}/files"
     |-        files_resp = requests.get(files_url, headers=headers).json()
     |-
     |-        # Fetch last commit time
     |-        commits_url = f"{pr_url}/commits"
     |-        commits_resp = requests.get(commits_url, headers=headers).json()
     |-        last_commit_time = "Unknown"
     |-        if commits_resp and len(commits_resp) > 0:
     |-            last_commit_time = commits_resp[-1].get('commit', {}).get('author', {}).get('date', 'Unknown')
     |-
     |-    except requests.exceptions.RequestException as e:
  32 |+        repo = g.get_repo(repo_name)
  33 |+        pr = repo.get_pull(pr_num)
  34 |+    except GithubException as e:
  35 |         print(f"❌ Failed to fetch PR data: {e}")
  36 |         sys.exit(1)
  37 | 
     |-    title = pr_data.get('title', 'Unknown Title')
     |-    description = pr_data.get('body') or '_No description provided._'
     |-    author = pr_data.get('user', {}).get('login', 'Unknown')
     |-    additions = pr_data.get('additions', 0)
     |-    deletions = pr_data.get('deletions', 0)
     |-    changed_files = pr_data.get('changed_files', 0)
  38 |+    # ── Fetch CI Status ───────────────────────────────────────────────────
  39 |+    head_sha = pr.head.sha
  40 |+    ci_summary, _ = get_ci_status(repo, head_sha)
  41 |+    ci_display = f"{get_ci_icon(ci_summary)} {ci_summary}"
  42 |+
  43 |+    title = pr.title
  44 |+    description = pr.body or '_No description provided._'
  45 |+    author = pr.user.login
  46 |+    additions = pr.additions
  47 |+    deletions = pr.deletions
  48 |+    changed_files = pr.changed_files
  49 |+    last_commit_time = pr.updated_at.isoformat()
  50 | 
  51 |     # ── Generate Context Markdown (Read-Only) ─────────────────────────────────
  52 |     context_lines = []
  53 |     context_lines.append(f"# PR Context: #{pr_num} — {title}")
  54 |     context_lines.append(f"**Stats:** +{additions}/-{deletions} across {changed_files} files")
  55 |     context_lines.append(f"**Author:** @{author}")
     |-    context_lines.append(f"**Last Commit:** {last_commit_time}\n")
  56 |+    context_lines.append(f"**Last Activity:** {last_commit_time}")
  57 |+    context_lines.append(f"**CI Status:** {ci_display}\n")
  58 |     context_lines.append(f"## Description\n{description}\n")
  59 |     context_lines.append("## Files Changed")
  60 | 
     |-    for f in files_resp:
     |-        status_icon = "🟢" if f['status'] == "added" else "🔴" if f['status'] == "removed" else "🟡"
     |-        context_lines.append(f"- {status_icon} `{f['filename']}` (+{f['additions']}/-{f['deletions']})")
  61 |+    files = pr.get_files()
  62 |+    for f in files:
  63 |+        status_icon = "🟢" if f.status == "added" else "🔴" if f.status == "removed" else "🟡"
  64 |+        context_lines.append(f"- {status_icon} `{f.filename}` (+{f.additions}/-{f.deletions})")
  65 | 
  66 |     context_lines.append("\n## Diffs")
     |-    for f in files_resp:
     |-        filename = f['filename']
     |-        context_lines.append(f"\n### `{filename}` ({f['status']})")
  67 |+    base_override = sys.argv[2] if len(sys.argv) > 2 else None
  68 |+
  69 |+    for f in files:
  70 |+        filename = f.filename
  71 |+        context_lines.append(f"\n### `{filename}` ({f.status})")
  72 |         
     |-        patch = f.get('patch', '_No textual diff available._')
  73 |+        patch = f.patch or '_No textual diff available._'
  74 |         if base_override:
  75 |             try:
     |-                head_ref = pr_data.get('head', {}).get('ref')
     |-                # Use git diff to compare main stack against the PR head
     |-                # We use main...HEAD format to get changes from the common ancestor
  76 |+                # Fallback to git diff if base override is requested
  77 |                 patch = subprocess.check_output(
     |-                    ['git', 'diff', f'{base_override}...origin/{head_ref}', '--', filename],
  78 |+                    ['git', 'diff', f'{base_override}...origin/{pr.head.ref}', '--', filename],
  79 |                     stderr=subprocess.PIPE, text=True
  80 |                 )
  81 |                 if not patch.strip():
@@ -121,12 +87,9 @@ def main():
  87 |         valid_ranges = []
  88 |         if patch != '_No textual diff available._':
  89 |             lines = patch.splitlines()
     |-            current_hunk_start = 0
     |-            current_hunk_len = 0
  90 |             new_line_num = 0
  91 |             for line in lines:
  92 |                 if line.startswith('@@'):
     |-                    # Parse hunk header: @@ -old_start,old_count +new_start,new_count @@
  93 |                     match = re.search(r'\+(\d+),?(\d*)', line)
  94 |                     if match:
  95 |                         new_line_num = int(match.group(1))
@@ -143,46 +106,20 @@ def main():
 106 |                     new_line_num += 1
 107 |             patch = "\n".join(annotated_diff)
 108 | 
     |-        # Inform the AI of valid comment ranges to prevent 422 errors
 109 |         range_str = ", ".join(valid_ranges) if valid_ranges else "None (Binary or too large)"
 110 |         context_lines.append(f"**Valid Comment Ranges (New File):** {range_str}")
 111 |         context_lines.append(f"```diff\n{patch}\n```")
 112 | 
 113 |     context_content = "\n".join(context_lines)
 114 | 
 115 |     # ── Generate Review Template (Writeable) ──────────────────────────────────
     |-    review_template = f"""# PR Review: #{pr_num}
     |-    
     |-## Context
     |-- **Last Commit Tracked:** {last_commit_time}
     |-
     |-## Audit Checklist
     |-For EVERY changed file, verify against these standards. Mark as `- [x]` when verified.
     |-- [ ] Dead abstractions: No new class, context, or hook that a simpler primitive handles.
     |-- [ ] Unnecessary indirection: No layer of wrapping where a direct function call suffices.
     |-- [ ] Responsibility creep: Component does not take on state/logic belonging in parent/hook.
     |-- [ ] Import bloat: No unnecessary `import React from 'react'` (React 17+).
     |-- [ ] Token compliance: Uses established design tokens (no raw Tailwind values or inline styles).
     |-- [ ] Audit ratio: If > 100 lines added, identified at least 10 lines to refactor/remove.
     |-
     |-## Output JSON
     |-Provide your findings and inline comments in the JSON block below.
     |-DO NOT REMOVE THE BACKTICKS.
     |-
     |-```json
     |-{{
     |-  "body": "## ANTI-AI-SLOP\\n<findings>\\n\\n## FINDINGS\\n<summary>\\n\\n## FINAL RECOMMENDATION\\n<Approved | Approved with Minor Changes | Not Approved>",
     |-  "comments": [
     |-    {{
     |-      "path": "<filename>",
     |-      "line": 1,
     |-      "body": "<feedback>"
     |-    }}
     |-  ]
     |-}}
     |-```
     |-"""
     |-    # ── Write files to dedicated reviews folder ───────────────────────────────
 116 |+    template_path = os.path.join(os.path.dirname(__file__), "review_template.md")
 117 |+    if os.path.exists(template_path):
 118 |+        with open(template_path, "r") as f:
 119 |+            review_template = f.read().format(pr_num=pr_num, head_sha=head_sha)
 120 |+    else:
 121 |+        # Fallback if template file is missing
 122 |+        review_template = f"# PR Review: #{pr_num}\n- SHA: {head_sha}\n"
 123 |     repo_root = os.getcwd()
 124 |     output_dir = os.path.join(repo_root, "dev-tools", "logs", "reviews")
 125 |     os.makedirs(output_dir, exist_ok=True)
```

### `dev-tools/gh_collab.py` (modified)
**Valid Comment Ranges (New File):** 82-88
```diff
@@ -82,8 +82,7 @@ def _request(self, method, path, data=None):
  82 |             return {"id": "MOCK_ID", "state": "PENDING", "sha": "MOCK_SHA"}
  83 | 
  84 |         resp = requests.request(method, url, headers=self._get_headers(), json=data)
     |-        if not resp.ok:
     |-            self._error(f"The GitHub API wasn't happy about that ({resp.status_code}): {resp.text}")
  85 |+        resp.raise_for_status()
  86 |         return resp.json()
  87 | 
  88 |     def get_pending_review(self, pr_num):
```

### `dev-tools/github_utils.py` (added)
**Valid Comment Ranges (New File):** 1-80
```diff
@@ -0,0 +1,80 @@
   1 |+import os
   2 |+import re
   3 |+import subprocess
   4 |+import sys
   5 |+from typing import Optional, Tuple, List
   6 |+try:
   7 |+    from github import Github, GithubException, Repository
   8 |+except ImportError:
   9 |+    print("Error: PyGithub not installed. Run 'pip install PyGithub'")
  10 |+    sys.exit(1)
  11 |+
  12 |+def get_github_token() -> Optional[str]:
  13 |+    """Retrieves the GitHub token via gh CLI, falls back to env var."""
  14 |+    try:
  15 |+        out = subprocess.check_output(
  16 |+            ['env', '-u', 'GITHUB_TOKEN', 'gh', 'auth', 'token'],
  17 |+            stderr=subprocess.DEVNULL, text=True
  18 |+        ).strip()
  19 |+        if out:
  20 |+            return out
  21 |+    except Exception:
  22 |+        pass
  23 |+    return os.getenv("GITHUB_TOKEN")
  24 |+
  25 |+def get_repo_name() -> Optional[str]:
  26 |+    """Auto-detect repo from git remote."""
  27 |+    try:
  28 |+        url = subprocess.check_output(
  29 |+            ['git', 'config', '--get', 'remote.origin.url'],
  30 |+            stderr=subprocess.DEVNULL, text=True
  31 |+        ).strip()
  32 |+        match = re.search(r'[:/]([^/]+/[^/.]+)(\.git)?$', url)
  33 |+        return match.group(1) if match else url
  34 |+    except Exception:
  35 |+        return os.getenv("GH_REPO")
  36 |+
  37 |+def get_ci_status(repo, sha: str) -> Tuple[str, List[str]]:
  38 |+    """
  39 |+    Aggregates CI status from Check Runs and Combined Status API for a given SHA.
  40 |+    Returns (status_summary, failed_runs_list).
  41 |+    """
  42 |+    try:
  43 |+        commit = repo.get_commit(sha)
  44 |+        combined_status = commit.get_combined_status()
  45 |+        check_runs = commit.get_check_runs()
  46 |+
  47 |+        failed_runs = []
  48 |+        in_progress = 0
  49 |+        total_checks = 0
  50 |+
  51 |+        for run in check_runs:
  52 |+            total_checks += 1
  53 |+            if run.status in ['in_progress', 'queued']:
  54 |+                in_progress += 1
  55 |+            elif run.conclusion not in ['success', 'skipped', 'neutral']:
  56 |+                failed_runs.append(f"{run.name} ({run.conclusion or 'no conclusion'})")
  57 |+
  58 |+        total_checks += combined_status.total_count
  59 |+        if combined_status.state in ['failure', 'error']:
  60 |+            for s in combined_status.statuses:
  61 |+                if s.state in ['failure', 'error']:
  62 |+                    failed_runs.append(s.context)
  63 |+
  64 |+        if failed_runs:
  65 |+            return f"FAILURE | FAILED: {', '.join(set(failed_runs))}", list(set(failed_runs))
  66 |+        elif in_progress > 0 or combined_status.state == 'pending':
  67 |+            return f"PENDING | {in_progress} runs in progress", []
  68 |+        elif total_checks > 0:
  69 |+            return "SUCCESS | All checks passed", []
  70 |+        else:
  71 |+            return "No checks found", []
  72 |+    except Exception as e:
  73 |+        return f"Error fetching CI: {str(e)}", []
  74 |+
  75 |+def get_ci_icon(summary: str) -> str:
  76 |+    """Returns a visual icon for the CI status summary."""
  77 |+    if "FAILURE" in summary: return "🔴"
  78 |+    if "PENDING" in summary: return "🟡"
  79 |+    if "SUCCESS" in summary: return "🟢"
  80 |+    return "⚪"
```

### `dev-tools/pr_review_manager.py` (added)
**Valid Comment Ranges (New File):** 1-129
```diff
@@ -0,0 +1,129 @@
   1 |+#!/usr/bin/env python3
   2 |+"""
   3 |+PR Review Manager
   4 |+Automatically determines PR review state (Needs Review, Needs Re-Review, Up-to-Date)
   5 |+includes CI check outcomes, and cleans up previous bot/user comments on PRs to reduce spam.
   6 |+Uses PyGithub for cross-platform compatibility.
   7 |+"""
   8 |+
   9 |+import argparse
  10 |+import logging
  11 |+import sys
  12 |+from github import Github, GithubException
  13 |+from github_utils import get_github_token, get_repo_name, get_ci_status
  14 |+
  15 |+# Setup Logging
  16 |+logging.basicConfig(
  17 |+    level=logging.INFO,
  18 |+    format="%(asctime)s [%(levelname)s] %(message)s",
  19 |+    datefmt="%Y-%m-%d %H:%M:%S"
  20 |+)
  21 |+logger = logging.getLogger("pr_review_manager")
  22 |+
  23 |+def process_pull_requests(token: str, repo_name: str, dry_run: bool, cleanup_comments: bool) -> None:
  24 |+    g = Github(token)
  25 |+    try:
  26 |+        user = g.get_user()
  27 |+        current_user_login = user.login
  28 |+        logger.info(f"Authenticated as: {current_user_login}")
  29 |+    except GithubException as e:
  30 |+        logger.error(f"Failed to authenticate: {e}")
  31 |+        sys.exit(1)
  32 |+
  33 |+    try:
  34 |+        repo = g.get_repo(repo_name)
  35 |+    except GithubException as e:
  36 |+        logger.error(f"Failed to get repo {repo_name}: {e}")
  37 |+        sys.exit(1)
  38 |+
  39 |+    prs = repo.get_pulls(state='open', sort='updated', direction='desc')
  40 |+
  41 |+    found_any = False
  42 |+    for pr in prs:
  43 |+        found_any = True
  44 |+        pr_number = pr.number
  45 |+        pr_title = pr.title
  46 |+        latest_commit_sha = pr.head.sha
  47 |+
  48 |+        # 1. Comment Cleanup - Only delete comments with the tool's marker
  49 |+        if cleanup_comments:
  50 |+            comments = pr.get_issue_comments()
  51 |+            for comment in comments:
  52 |+                if comment.user.login == current_user_login and "<!-- td-review-manager-comment -->" in comment.body:
  53 |+                    if dry_run:
  54 |+                        logger.info(f"[DRY-RUN] Would delete tool comment {comment.id} on PR #{pr_number}")
  55 |+                    else:
  56 |+                        comment.delete()
  57 |+                        logger.warning(f"Deleted tool comment {comment.id} on PR #{pr_number}")
  58 |+
  59 |+        # 2. Review State Analysis
  60 |+        # Fetch reviews and find the most recent one from the current user
  61 |+        last_review = next((r for r in reversed(pr.get_reviews()) if r.user.login == current_user_login), None)
  62 |+
  63 |+        if not last_review:
  64 |+            status = "ACTION: Needs Initial Review"
  65 |+        else:
  66 |+            reviewed_commit = last_review.commit_id
  67 |+
  68 |+            if reviewed_commit != latest_commit_sha:
  69 |+                status = f"ACTION: Needs Re-Review (Updated from {reviewed_commit[:7]} to {latest_commit_sha[:7]})"
  70 |+            else:
  71 |+                status = "STATE: Review Up-To-Date"
  72 |+
  73 |+        # 3. CI Check Outcomes
  74 |+        ci_summary, _ = get_ci_status(repo, latest_commit_sha)
  75 |+
  76 |+        print(f"[PR #{pr_number}] {pr_title}")
  77 |+        print(f"  ├── {status}")
  78 |+        print(f"  └── CI: {ci_summary}\n")
  79 |+
  80 |+    if not found_any:
  81 |+        logger.info("No open pull requests found.")
  82 |+
  83 |+def main():
  84 |+    parser = argparse.ArgumentParser(description="Principled PR Review Tracker and Comment Cleaner")
  85 |+    parser.add_argument(
  86 |+        "--execute",
  87 |+        action="store_true",
  88 |+        help="WARNING: Disables dry-run and permanently deletes previous comments."
  89 |+    )
  90 |+    parser.add_argument(
  91 |+        "--skip-cleanup",
  92 |+        action="store_true",
  93 |+        help="Skip analyzing and deleting old comments entirely."
  94 |+    )
  95 |+    parser.add_argument(
  96 |+        "--repo",
  97 |+        help="Target repository in 'owner/repo' format. Auto-detected if omitted."
  98 |+    )
  99 |+    parser.add_argument(
 100 |+        "--token",
 101 |+        help="GitHub Personal Access Token. Defaults to GITHUB_TOKEN environment variable."
 102 |+    )
 103 |+
 104 |+    args = parser.parse_args()
 105 |+
 106 |+    token = args.token or get_github_token()
 107 |+    if not token:
 108 |+        logger.error("GitHub token not found. Set GITHUB_TOKEN or pass --token.")
 109 |+        sys.exit(1)
 110 |+
 111 |+    repo_name = args.repo or get_repo_name()
 112 |+    if not repo_name:
 113 |+        logger.error("Could not detect repository name. Use --repo.")
 114 |+        sys.exit(1)
 115 |+
 116 |+    is_dry_run = not args.execute
 117 |+
 118 |+    if is_dry_run and not args.skip_cleanup:
 119 |+        logger.info("Starting in DRY-RUN mode. No comments will be deleted. Pass --execute to apply changes.")
 120 |+
 121 |+    process_pull_requests(
 122 |+        token=token,
 123 |+        repo_name=repo_name,
 124 |+        dry_run=is_dry_run,
 125 |+        cleanup_comments=not args.skip_cleanup
 126 |+    )
 127 |+
 128 |+if __name__ == "__main__":
 129 |+    main()
```

### `dev-tools/review_template.md` (added)
**Valid Comment Ranges (New File):** 1-30
```diff
@@ -0,0 +1,30 @@
   1 |+# PR Review: #{pr_num}
   2 |+
   3 |+## Context
   4 |+- **Last Commit Tracked (SHA):** {head_sha}
   5 |+
   6 |+## Audit Checklist
   7 |+For EVERY changed file, verify against these standards. Mark as `- [x]` when verified.
   8 |+- [ ] Dead abstractions: No new class, context, or hook that a simpler primitive handles.
   9 |+- [ ] Unnecessary indirection: No layer of wrapping where a direct function call suffices.
  10 |+- [ ] Responsibility creep: Component does not take on state/logic belonging in parent/hook.
  11 |+- [ ] Import bloat: No unnecessary `import React from 'react'` (React 17+).
  12 |+- [ ] Token compliance: Uses established design tokens (no raw Tailwind values or inline styles).
  13 |+- [ ] Audit ratio: If > 100 lines added, identified at least 10 lines to refactor/remove.
  14 |+
  15 |+## Output JSON
  16 |+Provide your findings and inline comments in the JSON block below.
  17 |+DO NOT REMOVE THE BACKTICKS.
  18 |+
  19 |+```json
  20 |+{{
  21 |+  "body": "## ANTI-AI-SLOP\\n<findings>\\n\\n## FINDINGS\\n<summary>\\n\\n## FINAL RECOMMENDATION\\n<Approved | Approved with Minor Changes | Not Approved>\\n\\n<!-- td-review-manager-comment -->",
  22 |+  "comments": [
  23 |+    {{
  24 |+      "path": "<filename>",
  25 |+      "line": 1,
  26 |+      "body": "<feedback>"
  27 |+    }}
  28 |+  ]
  29 |+}}
  30 |+```
```