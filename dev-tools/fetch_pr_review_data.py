import subprocess
import os
import requests
import sys

# ── Project review standards embedded here so the document is self-contained ──
REVIEW_STANDARDS = """\
## 📐 Review Standards (Anti-Bloat)

You are a Principal Software Engineer performing a deep technical audit.
Evaluate EVERY changed file against the following criteria:

1. **Dead abstractions** — new class/context/hook that a simpler primitive already handles?
2. **Unnecessary indirection** — adds a layer where a direct call would do?
3. **Responsibility creep** — component taking on logic that belongs in a hook or parent?
4. **Import bloat** — `import React` added unnecessarily? (Not needed in React 17+)
5. **Token compliance** — raw Tailwind classes or magic pixel values bypassing `design-tokens.ts`?
6. **No arbitrary Tailwind** — values like `text-[11px]`, `max-w-[1400px]` are explicitly banned.
7. **Audit ratio** — if additions > 100 lines, find 10+ lines to cut.

### Mandatory Response Sections
- `## ANTI-AI-SLOP` — what verbose/over-engineered patterns were found or confirmed absent
- `## FINDINGS` — per-file critical feedback (reference specific line numbers)
- `## FINAL RECOMMENDATION` — one of: `Approved` | `Approved with Minor Changes` | `Not Approved`
"""


def get_token():
    """Retrieves the GitHub token via gh CLI (strips conflicting GITHUB_TOKEN env), falls back to env var."""
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

    # ── 1. Fetch PR Metadata and Files ────────────────────────────────────────
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
    pr_url = f"https://github.com/{repo}/pull/{pr_num}"

    # ── 2. Build document sections ────────────────────────────────────────────
    file_list_lines = []
    per_file_blocks = []

    for f in files_resp:
        status = f['status']
        fname = f['filename']
        add = f['additions']
        delt = f['deletions']
        patch = f.get('patch', '_Binary file or no textual diff available._')

        file_list_lines.append(f"- `[{status[0].upper()}]` [{fname}]({pr_url}/files) `+{add}/-{delt}`")

        block = f"""---

### `{fname}` `+{add}/-{delt}` ({status})

**Full diff:**
```diff
{patch}
```

**Audit checklist:**
- [ ] Architecture: Logic belongs in this layer, no leaky abstractions
- [ ] Design System: Uses design tokens, no magic numbers or arbitrary Tailwind
- [ ] Types: Strict — no `any`, no implicit types
- [ ] React: No unnecessary `import React` (React 17+)

**Proposed inline comment** _(fill in `line` and `body` before submitting)_:
```json
{{
  "path": "{fname}",
  "line": 1,
  "body": "<FILL IN: critical feedback for the most important line in this file>"
}}
```"""
        per_file_blocks.append(block)

    # ── 3. Assemble the full self-contained document ──────────────────────────
    content = f"""# PR Review: #{pr_num} — {title}

**Repo:** [{repo}](https://github.com/{repo})
**PR:** [{pr_url}]({pr_url})
**Stats:** +{additions}/-{deletions} across {changed_files} file(s)

## Description

{description}

{REVIEW_STANDARDS}

---

## 📂 Files Changed

{chr(10).join(file_list_lines)}

---

## 🔍 Per-File Audit

{chr(10).join(per_file_blocks)}

---

## 🚀 Submission Steps

After completing every `Proposed inline comment` block above, collect them into `/tmp/review_payload.json`:

```json
{{
  "body": "## ANTI-AI-SLOP\\n<your slop findings>\\n\\n## FINDINGS\\n<per-file summary>\\n\\n## FINAL RECOMMENDATION\\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
  "comments": [
    {{ "path": "src/example.tsx", "line": 10, "body": "Feedback here" }}
  ]
}}
```

Then submit:
```bash
python3 dev-tools/gh_collab.py review {pr_num} --file /tmp/review_payload.json
```
"""

    # ── 4. Write to /tmp ──────────────────────────────────────────────────────
    out_path = f"/tmp/pr-review-{pr_num}.md"
    with open(out_path, "w") as out:
        out.write(content)

    print(f"✅ Review plan created: {out_path}")
    print(f"   Read with:   cat {out_path}")
    print(f"   Submit with: python3 dev-tools/gh_collab.py review {pr_num} --file /tmp/review_payload.json")


if __name__ == "__main__":
    main()