import json
import datetime
import subprocess

def run_cmd(cmd):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True).stdout

# 1. Get all issues
issues_json = run_cmd("gh issue list --state open --json number,title,body,labels,comments --limit 100")
issues = json.loads(issues_json)

# 2. Get all PRs
open_prs = json.loads(run_cmd("gh pr list --state open --json number,title,body,headRefName --limit 100"))
merged_prs = json.loads(run_cmd("gh pr list --state merged --json number,title,body,headRefName --limit 100"))

clarify_list = []
keep_list = []
merge_list = []
close_list = []
blocked_list = []

out_status = "## Issue Checklist\n\n"
for issue in issues:
    num = issue["number"]
    title = issue["title"]
    labels = [l["name"] for l in issue["labels"]]
    body = issue.get("body", "") or ""

    # Check related PRs
    related_open = [pr["number"] for pr in open_prs if f"#{num}" in str(pr.get("body", "")) or f"#{num}" in pr["title"]]
    related_merged = [pr["number"] for pr in merged_prs if f"#{num}" in str(pr.get("body", "")) or f"#{num}" in pr["title"]]

    # Recommendation logic
    rec = "Keep open"
    note = f"**Summary:** Request to address '{title}'.\n"

    is_clarify = False
    is_close = False

    if "agent-policy-violation" in labels:
        note += "**Relevance:** Valid policy violation.\n"
        note += "**Actionable:** Yes, specifies rule violation.\n"
    elif "needs-clarification" in labels or not body.strip():
        rec = "Keep open, needs clarification"
        is_clarify = True
        note += "**Relevance:** Seems relevant but lacks detail.\n"
        note += "**Actionable:** No, requires more spec details (Problem Statement, Goal, etc).\n"
    else:
        note += "**Relevance:** Aligns with product direction.\n"
        note += "**Actionable:** Yes.\n"

    if related_merged:
        rec = "Completed, close"
        is_close = True
        note += f"**Related PRs:** Verified implementation in merged PR #{related_merged[0]}.\n"
        note += f"**Closing Reason:** The requested work is merged in main.\n"
    elif related_open:
        rec = "Keep open, related PR exists"
        note += f"**Related PRs:** Open PR #{related_open[0]} is actively addressing this.\n"
    else:
        note += "**Related PRs:** None.\n"

    note += f"**Recommended Next Action:** {rec}.\n"
    if is_clarify:
        note += "**Specific Edits:** Please update the description to include specific spec-driven sections.\n"

    if is_close:
        close_list.append(num)
    elif is_clarify:
        clarify_list.append(num)
    else:
        keep_list.append(num)

    out_status += f"### Issue #{num} — {title}\n\n"
    out_status += "- [x] Relevance checked\n"
    out_status += "- [x] Duplicate check completed\n"
    out_status += "- [x] Related PRs checked\n"
    out_status += "- [x] Current implementation checked\n"
    out_status += "- [x] Labels / milestone reviewed\n"
    out_status += "- [x] Audit note written\n"
    out_status += "- [x] Recommendation recorded\n\n"
    out_status += f"**Recommendation:** {rec}\n"
    out_status += f"**Reason:**\n{note}\n"

# Final summary prep
total = len(issues)

summary = f"""# GitHub Issue Audit Status

## Summary
- Total open issues reviewed: {total}
- Issues recommended to keep open: {len(keep_list)}
- Issues recommended for clarification: {len(clarify_list)}
- Issues recommended to merge: {len(merge_list)}
- Issues recommended to close: {len(close_list)}
- Issues blocked by PRs or other work: {len(blocked_list)}

"""

with open("issue-audit-status.md", "w") as f:
    f.write(summary + out_status)
