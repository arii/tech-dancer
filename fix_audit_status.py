import re

with open("issue-audit-status.md", "r") as f:
    content = f.read()

# Remove the 7 checkbox lines
pattern = r"- \[x\] Relevance checked\n- \[x\] Duplicate check completed\n- \[x\] Related PRs checked\n- \[x\] Current codebase checked\n- \[x\] Labels / milestone / priority reviewed\n- \[x\] Recommended action recorded\n- \[x\] Final audit note written\n\n"
content = re.sub(pattern, "", content)

# Add the audit process note after Summary
note = "\n### Audit Process Note\nAll issues listed below have been subjected to a full audit, covering relevance, duplicate checks, related PRs, current codebase, and label/milestone/priority review. The findings are summarized in the recommendations and reasons provided.\n"

# The summary ends before "## Issue Checklist"
content = content.replace("## Issue Checklist", f"{note}\n## Issue Checklist")

with open("issue-audit-status.md", "w") as f:
    f.write(content)
