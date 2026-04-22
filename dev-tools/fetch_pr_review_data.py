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
        pr_resp = requests.get(f"https://api.github.com/repos/{repo}/pulls/{pr_num}", headers=headers).json()
        files_resp = requests.get(f"https://api.github.com/repos/{repo}/pulls/{pr_num}/files", headers=headers).json()
        if 'message' in pr_resp and pr_resp['message'] == 'Not Found':
            print(f"Error: PR #{pr_num} not found in {repo}.")
            sys.exit(1)
    except Exception as e:
        print(f"Error fetching PR data: {e}")
        sys.exit(1)

    title = pr_resp.get('title', 'Unknown Title')
    description = (pr_resp.get('body') or 'No description provided.').strip()
    additions = pr_resp.get('additions', 0)
    deletions = pr_resp.get('deletions', 0)
    changed_files = pr_resp.get('changed_files', 0)

    file_list_lines = []
    for f in files_resp:
        pr_url = f"https://github.com/{repo}/pull/{pr_num}"
        file_list_lines.append(
            f"- `[{f['status'][0].upper()}]` [{f['filename']}]({pr_url}/files) `+{f['additions']}/-{f['deletions']}`"
        )

    # ── Load template ─────────────────────────────────────────────────────────
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    template_path = os.path.join(repo_root, ".github", "PULL_REQUEST_REVIEW_TEMPLATE.md")

    if not os.path.exists(template_path):
        print(f"Error: Template not found at {template_path}")
        sys.exit(1)

    with open(template_path, 'r') as t:
        template = t.read()

    # ── Extract and iterate the per-file template block ───────────────────────
    start_marker = "{{FOR_EACH_FILE}}"
    end_marker = "{{END_FOR_EACH}}"

    if start_marker not in template or end_marker not in template:
        print("Error: Template is missing {{FOR_EACH_FILE}} / {{END_FOR_EACH}} markers.")
        sys.exit(1)

    before, rest = template.split(start_marker, 1)
    file_template, after = rest.split(end_marker, 1)

    per_file_rendered = []
    for f in files_resp:
        patch = f.get('patch', '_Binary file or no textual diff available._')
        block = file_template
        block = block.replace("{{FILENAME}}", f['filename'])
        block = block.replace("{{FILE_STATS}}", f"+{f['additions']}/-{f['deletions']}")
        block = block.replace("{{FILE_STATUS}}", f['status'])
        block = block.replace("{{DIFF}}", patch)
        per_file_rendered.append(block)

    # ── Populate top-level placeholders ───────────────────────────────────────
    content = before + "\n".join(per_file_rendered) + after
    content = content.replace("{{NUMBER}}", pr_num)
    content = content.replace("{{TITLE}}", title)
    content = content.replace("{{STATS}}", f"+{additions}/-{deletions} across {changed_files} file(s)")
    content = content.replace("{{DESCRIPTION}}", description)
    content = content.replace("{{FILES_CHANGES}}", "\n".join(file_list_lines))

    # ── Write to project root (workspace-accessible by agents) ──────────────────
    out_path = os.path.join(repo_root, f"plan-pr-review-{pr_num}.md")
    with open(out_path, "w") as out:
        out.write(content)

    print(f"✅ Review plan created: {out_path}")
    print(f"   Read with:   cat {out_path}")
    print(f"   Submit with: python3 dev-tools/submit_pr_review_data.py {out_path}")


if __name__ == "__main__":
    main()