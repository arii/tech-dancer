import re

filepath = 'boomtick-pkg/cli/dev_tools/services/ai_service.py'
with open(filepath, 'r') as f:
    content = f.read()

target = """    def _sanitize_issue_data(self, issue: Dict) -> None:
        if issue.get("severity") == "error" and not issue.get("counterexample"):
            issue["counterexample"] = "No counterexample provided by AI."
        if "counterexample" in issue and issue["counterexample"] is not None:
            if not isinstance(issue["counterexample"], str):
                issue["counterexample"] = str(issue["counterexample"])"""

replacement = """    def _sanitize_issue_data(self, issue: Dict) -> None:
        if issue.get("severity") == "error" and (issue.get("counterexample") is None or issue.get("counterexample") == ""):
            issue["counterexample"] = "No counterexample provided by AI."
        if "counterexample" in issue and issue["counterexample"] is not None:
            if not isinstance(issue["counterexample"], str):
                issue["counterexample"] = str(issue["counterexample"])"""

new_content = content.replace(target, replacement)

with open(filepath, 'w') as f:
    f.write(new_content)
