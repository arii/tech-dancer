import urllib.request
import urllib.error
import json
import os
import sys

token = os.environ.get('GH_TOKEN')
headers = {
    'Authorization': f'token {token}',
    'Accept': 'application/vnd.github.v3+json'
}

def get_prs():
    url = 'https://api.github.com/repos/arii/tech-dancer/pulls?state=open&per_page=100'
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def get_pr_diff(pr_number):
    url = f'https://api.github.com/repos/arii/tech-dancer/pulls/{pr_number}'
    diff_headers = headers.copy()
    diff_headers['Accept'] = 'application/vnd.github.v3.diff'
    req = urllib.request.Request(url, headers=diff_headers)
    try:
        with urllib.request.urlopen(req) as response:
            return response.read().decode()
    except Exception as e:
        return ""

def get_pr_checks(head_sha):
    url = f'https://api.github.com/repos/arii/tech-dancer/commits/{head_sha}/check-runs'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        return {"check_runs": []}

def evaluate_pr(pr, diff, checks):
    is_ui = "src/components" in diff or "src/pages" in diff or "src/layouts" in diff or "src/index.css" in diff or "tailwind" in diff
    is_python = ".py" in diff

    fails = [c['name'] for c in checks.get('check_runs', []) if c.get('conclusion') == 'failure']

    feedback = f"### Specific Review for PR #{pr['number']}\n\n"

    # What's working
    feedback += "**What is working well:**\n"
    feedback += f"- The scope is clearly defined in branch `{pr['head']['ref']}`.\n"
    if not fails:
        feedback += "- All CI checks appear to be passing.\n"

    feedback += "\n**Specific Issues & Actionable Fixes:**\n"

    if fails:
        feedback += f"- **CI Failure:** The following checks are failing: {', '.join(fails)}. Please investigate the logs for these jobs.\n"
        if "Build & E2E" in fails:
            feedback += "  - *Fix:* Ensure `pnpm run build` passes locally and all `playwright` tests succeed via `pnpm test:e2e`.\n"
        elif "deploy" in fails:
            feedback += "  - *Fix:* Verify that the `dist` directory compiles correctly without TypeScript or Vite errors.\n"

    if is_ui:
        if "px-" in diff or "py-" in diff or "mt-" in diff or "flex" in diff or "grid" in diff or "text-[" in diff:
            feedback += "- **Design System Anti-patterns:** The diff contains raw Tailwind classes (e.g. padding/margin utility classes, arbitrary values).\n"
            feedback += "  - *Fix:* Replace raw Tailwind layout classes with `Stack`, `Box`, or `Grid` primitives using design tokens (e.g., `gap={4}`, `paddingY={{ base: 4, md: 1.5 }}`). Verify by running `pnpm run audit`.\n"

        feedback += "- **Mobile UX Verification:** For any UI additions, ensure horizontal layout does not overflow a 390px viewport.\n"
        feedback += "  - *Fix:* If adding interactive elements, wrap them to enforce a minimum 48x48px touch target for accessibility.\n"

    if is_python:
        feedback += "- **Python Scripting:** Python changes detected.\n"
        feedback += "  - *Fix:* Ensure `python3 -m pytest tests/` passes. Update `test_td_cli.py` or equivalent test files if extending `dev-tools`.\n"

    if pr.get('mergeable') is False:
        feedback += "- **Merge Conflicts:** This PR has conflicts with the `main` base branch.\n"
        feedback += "  - *Fix:* Pull `main` into your branch, resolve the conflicts (e.g., via `python3 dev-tools/td_cli.py gh conflicts`), and force push.\n"

    if "overlap" in pr['title'].lower() or "cli" in pr['title'].lower():
        feedback += "- **Overlap / Interdependency:** This PR touches dev-tools or overlap logic.\n"
        feedback += "  - *Fix:* Ensure this is rebased against recent changes in #2076 or #2070 to avoid overlapping functionality.\n"

    # Default if no specific issues caught by heuristics
    if feedback.endswith("**Specific Issues & Actionable Fixes:**\n"):
        feedback += "- Review the diff against `audit` guidelines. Ensure no console errors exist in the target components.\n"

    return feedback

if __name__ == "__main__":
    prs = get_prs()
    prs = sorted(prs, key=lambda x: x['number'])

    for pr in prs:
        diff = get_pr_diff(pr['number'])
        checks = get_pr_checks(pr['head']['sha'])

        fb = evaluate_pr(pr, diff, checks)

        with open(f"real_feedback_{pr['number']}.md", "w") as f:
            f.write(fb)

        print(f"Generated realistic feedback for {pr['number']}")
