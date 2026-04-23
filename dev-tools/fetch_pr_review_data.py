"""
fetch_pr_review_data.py

Fetches PR metadata and diffs from GitHub.
Generates two files to decouple read context from write output:
  1. pr-context-{NUMBER}.md (Read-Only diffs and info)
  2. pr-review-{NUMBER}.md (Writeable checklist and JSON output block)
"""

import os
import sys
import re
import subprocess
from github import Github, GithubException
from github_utils import get_github_token, get_repo_name, get_ci_status, get_ci_icon

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 dev-tools/fetch_pr_review_data.py <PR_NUMBER>")
        sys.exit(1)

    pr_num = int(sys.argv[1])
    token = get_github_token()
    repo_name = get_repo_name()
    
    if not token:
        print("❌ GitHub token not found.")
        sys.exit(1)

    g = Github(token)
    try:
        repo = g.get_repo(repo_name)
        pr = repo.get_pull(pr_num)
    except GithubException as e:
        print(f"❌ Failed to fetch PR data: {e}")
        sys.exit(1)

    # ── Fetch CI Status ───────────────────────────────────────────────────
    head_sha = pr.head.sha
    ci_summary, _ = get_ci_status(repo, head_sha)
    ci_display = f"{get_ci_icon(ci_summary)} {ci_summary}"

    title = pr.title
    description = pr.body or '_No description provided._'
    author = pr.user.login
    additions = pr.additions
    deletions = pr.deletions
    changed_files = pr.changed_files
    last_commit_time = pr.updated_at.isoformat()

    # ── Generate Context Markdown (Read-Only) ─────────────────────────────────
    context_lines = []
    context_lines.append(f"# PR Context: #{pr_num} — {title}")
    context_lines.append(f"**Stats:** +{additions}/-{deletions} across {changed_files} files")
    context_lines.append(f"**Author:** @{author}")
    context_lines.append(f"**Last Activity:** {last_commit_time}")
    context_lines.append(f"**CI Status:** {ci_display}\n")
    context_lines.append(f"## Description\n{description}\n")
    context_lines.append("## Files Changed")

    files = pr.get_files()
    for f in files:
        status_icon = "🟢" if f.status == "added" else "🔴" if f.status == "removed" else "🟡"
        context_lines.append(f"- {status_icon} `{f.filename}` (+{f.additions}/-{f.deletions})")

    context_lines.append("\n## Diffs")
    base_override = sys.argv[2] if len(sys.argv) > 2 else None

    for f in files:
        filename = f.filename
        context_lines.append(f"\n### `{filename}` ({f.status})")
        
        patch = f.patch or '_No textual diff available._'
        if base_override:
            try:
                # Fallback to git diff if base override is requested
                patch = subprocess.check_output(
                    ['git', 'diff', f'{base_override}...origin/{pr.head.ref}', '--', filename],
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
            new_line_num = 0
            for line in lines:
                if line.startswith('@@'):
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

        range_str = ", ".join(valid_ranges) if valid_ranges else "None (Binary or too large)"
        context_lines.append(f"**Valid Comment Ranges (New File):** {range_str}")
        context_lines.append(f"```diff\n{patch}\n```")

    context_content = "\n".join(context_lines)

    # ── Generate Review Template (Writeable) ──────────────────────────────────
    template_path = os.path.join(os.path.dirname(__file__), "review_template.md")
    if os.path.exists(template_path):
        with open(template_path, "r") as f:
            review_template = f.read().format(pr_num=pr_num, head_sha=head_sha)
    else:
        # Fallback if template file is missing
        review_template = f"# PR Review: #{pr_num}\n- SHA: {head_sha}\n"
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
