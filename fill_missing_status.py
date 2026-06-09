import re

def update_status():
    with open('review-status.md', 'r') as f:
        content = f.read()

    # Need to fill 1885 and 1791 properly since the previous attempt failed due to a bad regex/matching
    replacements = {
        "## PR #1885: chore: clarify set -e intent in manage-previews.sh (repairs #1860)": """## PR #1885: chore: clarify set -e intent in manage-previews.sh (repairs #1860)
[Link](https://github.com/arii/tech-dancer/pull/1885)

- [x] Desktop UX review completed (N/A)
- [x] Mobile UX review completed (N/A)
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided

**Merge readiness assessment:**
Ready to merge.

**Notes on blockers, risks, and required fixes:**
- None. Trivial comment change.
""",
        "## PR #1791: feat(merch): overhaul merch page and address E2E test issues": """## PR #1791: feat(merch): overhaul merch page and address E2E test issues
[Link](https://github.com/arii/tech-dancer/pull/1791)

- [x] Desktop UX review completed
- [x] Mobile UX review completed
- [x] Main branch conflict check completed
- [x] CI status checked
- [x] Feedback provided

**Merge readiness assessment:**
Not ready.

**Notes on blockers, risks, and required fixes:**
- Branch has merge conflicts with `main`.
- Unintentionally checking in generated files inside `artifacts/ux-audit/`.
"""
    }

    for target, new_text in replacements.items():
        if target in content:
            # We just replace the header with the full content to avoid regex issues on the subsequent text since it's currently truncated
            content = content.replace(target, new_text)

    with open('review-status.md', 'w') as f:
        f.write(content)

if __name__ == "__main__":
    update_status()
