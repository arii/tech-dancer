---
description: review a GitHub pull request with in-depth inline feedback
---

# Review a Pull Request

// turbo-all

1. Fetch the PR diff to understand what changed:
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

2. Read the output and examine each file changed. For every file, evaluate:
   - **Dead abstractions** — new class/context/hook that a simpler primitive already handles?
   - **Unnecessary indirection** — does this add a layer where a direct call would do?
   - **Responsibility creep** — component taking on logic for a hook or parent?
   - **Import bloat** — unnecessary `import React` (not needed in React 17+)?
   - **Token compliance** — raw Tailwind or inline styles leaking past design tokens?

3. Write `review_payload.json` with an inline comment targeting the most critical line of each changed file:
```json
{
  "body": "Overall review summary text here",
  "comments": [
    { "path": "src/example.tsx", "line": 10, "body": "Inline feedback here" }
  ]
}
```

4. Submit the review in one step:
```bash
python3 dev-tools/gh_collab.py review PR_NUMBER --file review_payload.json
```
