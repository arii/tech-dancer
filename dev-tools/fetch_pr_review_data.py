import subprocess
import os
import requests
import sys

def get_token():
    """Retrieves the GitHub token via gh CLI (strips invalid GITHUB_TOKEN env), falls back to env var."""
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

    # 1. Fetch PR Metadata and Files
    try:
        pr_resp = requests.get(f"https://api.github.com/repos/{repo}/pulls/{pr_num}", headers=headers).json()
        files_resp = requests.get(f"https://api.github.com/repos/{repo}/pulls/{pr_num}/files", headers=headers).json()

        if 'message' in pr_resp and pr_resp['message'] == 'Not Found':
            print(f"Error: PR #{pr_num} not found in {repo}.")
            sys.exit(1)
    except Exception as e:
        print(f"Error fetching PR data: {e}")
        sys.exit(1)

    # 2. Build Components for the Template
    title = pr_resp.get('title', 'Unknown Title')
    description = pr_resp.get('body') or 'No description provided.'

    file_list = []
    file_blocks = []
    diff_summaries = []

    for f in files_resp:
        status = f['status']
        fname = f['filename']
        add = f['additions']
        delt = f['deletions']
        patch = f.get('patch', 'Binary file or no diff available.')

        # High-level file list
        file_list.append(f"- [{status[0].upper()}] `{fname}` (+{add}/-{delt})")

        # Diff snippet for the overview section
        diff_summaries.append(f"### {fname}\n```diff\n{patch[:600]}\n```")

        # Per-file audit block
        block = f"### File: `{fname}`\n"
        block += "- [ ] **Architecture Check**\n"
        block += "    - [ ] Logic belongs in this layer\n"
        block += "    - [ ] No circular dependencies or leaky abstractions\n"
        block += "- [ ] **Design System Check**\n"
        block += "    - [ ] Uses spacing/color tokens from `src/styles/`\n"
        block += "    - [ ] No magic numbers or hardcoded pixel values\n"
        block += "- [ ] **Implementation Check**\n"
        block += "    - [ ] Types are strict (no `any`)\n"
        block += "    - [ ] Side effects are correctly managed in hooks\n"
        block += "- [ ] **Proposed Comment:**\n"
        block += "```json\n"
        block += "{\n"
        block += f'  "path": "{fname}",\n'
        block += '  "line": 1,\n'
        block += '  "body": "Feedback here"\n'
        block += "}\n"
        block += "```"
        file_blocks.append(block)

    # 3. Read the Template — resolve relative to the script's repo root
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    template_path = os.path.join(repo_root, ".github", "PULL_REQUEST_REVIEW_TEMPLATE.md")

    if not os.path.exists(template_path):
        print(f"Warning: Template not found at {template_path}. Using internal default.")
        template_content = (
            "# Plan for reviewing pull request #{{NUMBER}}\n\n"
            "## {{TITLE}}\n\n{{DESCRIPTION}}\n\n"
            "## 📂 Files changed\n{{FILES_CHANGES}}\n\n"
            "## 🔍 Diffs\n{{DIFFS}}\n\n"
            "## 🛠 Per-File Audit Details\n{{FOR_EACH_FILE}}\n{{END_FOR_EACH}}"
        )
    else:
        with open(template_path, 'r') as t:
            template_content = t.read()

    # 4. Populate Template
    content = template_content
    content = content.replace("{{NUMBER}}", pr_num)
    content = content.replace("{{TITLE}}", title)
    content = content.replace("{{DESCRIPTION}}", description)
    content = content.replace("{{FILES_CHANGES}}", "\n".join(file_list))
    content = content.replace("{{DIFFS}}", "\n\n".join(diff_summaries))

    # Inject per-file blocks between markers
    start_marker = "{{FOR_EACH_FILE}}"
    end_marker = "{{END_FOR_EACH}}"

    if start_marker in content and end_marker in content:
        parts = content.split(start_marker)
        rest = parts[1].split(end_marker)
        content = parts[0] + "\n\n---\n\n".join(file_blocks) + rest[1]

    # 5. Write output to /tmp (never pollute the repo)
    out_path = f"/tmp/pr-review-{pr_num}.md"
    with open(out_path, "w") as out:
        out.write(content)

    print(f"✅ Review plan created: {out_path}")
    print(f"   Open with: cat {out_path}")
    print(f"   Then submit with: python3 dev-tools/gh_collab.py review {pr_num} --file /tmp/review_payload.json")

if __name__ == "__main__":
    main()