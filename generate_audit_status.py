import json

with open('issues.json', 'r') as f:
    issues_data = json.load(f)

issues = issues_data.get('data', {}).get('issues', [])

with open('issue-audit-status.md', 'w') as f:
    f.write("# GitHub Issue Audit Status\n\n")
    f.write("## Summary\n\n")
    f.write(f"- Total open issues reviewed: 0/{len(issues)}\n")
    f.write("- Issues recommended to keep open: 0\n")
    f.write("- Issues recommended for clarification: 0\n")
    f.write("- Issues recommended to merge: 0\n")
    f.write("- Issues recommended to close: 0\n")
    f.write("- Issues blocked by PRs or other work: 0\n\n")
    f.write("## Issue Checklist\n\n")

    for issue in issues:
        num = issue['number']
        title = issue['title']
        f.write(f"### Issue #{num} — {title}\n\n")
        f.write("- [ ] Relevance checked\n")
        f.write("- [ ] Duplicate check completed\n")
        f.write("- [ ] Related PRs checked\n")
        f.write("- [ ] Current implementation checked\n")
        f.write("- [ ] Labels / milestone reviewed\n")
        f.write("- [ ] Audit note written\n")
        f.write("- [ ] Recommendation recorded\n\n")
        f.write("**Recommendation:** \n")
        f.write("**Reason:** \n\n")

print(f"Generated issue-audit-status.md with {len(issues)} issues.")
