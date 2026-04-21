---
description: review a GitHub pull request with in-depth inline feedback
---

# Review a Pull Request

// turbo-all

1. Fetch the PR diff to understand what changed (replace `PR_NUMBER`):
```bash
python3 - <<'EOF'
import subprocess, os, requests
def get_token():
    try: return subprocess.check_output(['env','-u','GITHUB_TOKEN','gh','auth','token'], stderr=subprocess.DEVNULL, text=True).strip()
    except: pass
    return os.getenv("GITHUB_TOKEN","")
token = get_token()
headers = {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github.v3+json"}
pr = PR_NUMBER  # <-- set this
files = requests.get(f"https://api.github.com/repos/arii/tech-dancer/pulls/{pr}/files", headers=headers).json()
for f in files:
    print(f"\n[{f['status']}] {f['filename']} +{f['additions']}/-{f['deletions']}")
    if f.get('patch'): print(f['patch'][:800])
EOF
```

2. Read the diff output. For EVERY changed file evaluate:
   - **Dead abstractions** — new class/context/hook that a simpler primitive handles?
   - **Unnecessary indirection** — does this add a layer where a direct call would do?
   - **Responsibility creep** — component taking on logic that belongs in a hook or parent?
   - **Import bloat** — `import React` not needed in React 17+?
   - **Token compliance** — raw Tailwind or inline styles bypassing design tokens?
   - **Audit ratio** — if additions > 100 lines, find 10+ lines to remove.

3. Write the review payload to `/tmp` (never commit review files to the repo):
```bash
cat > /tmp/review_payload.json <<'JSON'
{
  "body": "## ANTI-AI-SLOP\n<!-- Flag verbose comments, over-engineering, duplicate patterns. -->\n\n## FINDINGS\n<!-- Per-file feedback. Inline comments cover specific lines. -->\n\n## FINAL RECOMMENDATION\n<!-- Approved | Approved with Minor Changes | Not Approved -->",
  "comments": [
    { "path": "src/example.tsx", "line": 10, "body": "Inline feedback targeting the most critical line of this file." }
  ]
}
JSON
```

4. Submit in one step — the link to the review is printed on success:
```bash
python3 dev-tools/gh_collab.py review PR_NUMBER --file /tmp/review_payload.json
```

