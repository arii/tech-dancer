import re

with open("issue-audit-status.md", "r") as f:
    text = f.read()

# Fix the header order issue
if text.startswith("# GitHub Issue Audit Status\n\n## Summary\n"):
    pass # Already ok
elif "## Summary" in text and "# GitHub Issue Audit Status" in text:
    parts = text.split("# GitHub Issue Audit Status")
    if len(parts) == 2:
        text = "# GitHub Issue Audit Status" + parts[1]

with open("issue-audit-status.md", "w") as f:
    f.write(text.strip() + "\n")
