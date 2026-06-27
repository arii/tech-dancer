import re
from typing import Dict, Any, Optional, List, Tuple, Iterable
from tdw_services.entity_types import IssueDetails, IssueProtocol
from utils import (
    get_github_client,
    get_repo_name,
    CLIError
)
from dev_tools_sdk.config import load_project_config

PROJECT_CONFIG = load_project_config()
SPEC_SECTIONS = PROJECT_CONFIG.spec_sections

class IssueService:
    def __init__(self, orchestrator):
        self.orch = orchestrator

    def create_issue(self, title: str, body: Optional[str]) -> IssueDetails:
        """
        Creates a new GitHub issue.
        """
        if body is None or not body.strip():
            raise CLIError("Issue body cannot be empty.")
        try:
            return self.orch.github.create_issue(title, body)
        except Exception as e:
            raise CLIError(f"Failed to create GitHub issue: {str(e)}")

    def get_issue_details(self, issue_number: int) -> IssueDetails:
        """
        Fetches details of a GitHub issue.
        """
        try:
            return self.orch.github.fetch_issue_details(issue_number)
        except Exception as e:
            raise CLIError(f"Failed to fetch GitHub issue details: {str(e)}")

    def update_issue_body(self, issue_number: int, body: Optional[str]) -> IssueDetails:
        """
        Updates an issue's body.
        """
        if body is None or not body.strip():
            raise CLIError("Issue body cannot be empty.")
        try:
            return self.orch.github.update_issue(issue_number, body)
        except Exception as e:
            raise CLIError(f"Failed to update GitHub issue body: {str(e)}")

    def post_comment(self, entity_number: int, body: Optional[str]) -> Dict[str, Any]:
        """
        Posts a comment to a Pull Request or Issue.
        """
        if body is None or not body.strip():
            raise CLIError("Comment body cannot be empty.")
        try:
            return self.orch.github.create_issue_comment(entity_number, body)
        except Exception as e:
            raise CLIError(f"Failed to post GitHub comment: {str(e)}")

    def validate_issue(self, issue_number: Optional[int] = None, all_open: bool = False, post_comments: bool = False, dry_run: bool = True) -> Dict[str, Any]:
        repo = get_github_client().get_repo(get_repo_name())
        issues: List[IssueProtocol] = []
        if all_open:
            issues = list(repo.get_issues(state='open'))
        elif issue_number:
            issues = [repo.get_issue(issue_number)]
        else:
            raise CLIError("Provide --issue-number or --all-open")

        results = []
        total_findings = 0
        audit_base = self.orch.get_audit_results(content="")
        config = audit_base.get("config", {})

        for issue in issues:
            findings = []
            warnings = []
            body = issue.body or ''
            title = issue.title or ''

            if not body.strip():
                findings.append("Issue body is empty.")

            for i, block in enumerate(self.orch.extract_code_blocks(body)):
                res = self.orch.get_audit_results(content=block)
                violations = res.get("violations", {}).get("stdin", [])
                for v in violations:
                    val = v.get('value', 'N/A')
                    findings.append(f"Code block {i+1}: {v['message']} (value: {val})")
                for comp, path in config.get('existingComponents', {}).items():
                    if re.search(rf'(create|build|make|add|new)\s+.*{comp}', block, re.IGNORECASE):
                        warnings.append(f"Code block {i+1}: Suggests `{comp}` (exists at `{path}`)")
            for comp, path in config.get('existingComponents', {}).items():
                if re.search(rf'(create|build|make|add\s+a\s+new)\s+.*{comp}\b', body, re.IGNORECASE):
                    warnings.append(f"Issue suggests `{comp}` (exists at `{path}`)")
            if re.match(r'^Draft.*:', title) and '```markdown' in body:
                md_match = re.search(r'```markdown\n(.*?)\n```', body, re.DOTALL)
                if md_match:
                    for field in config.get('requiredContentFields', []):
                        if not re.search(rf'^{field}:', md_match.group(1), re.MULTILINE):
                            findings.append(f"Missing frontmatter: `{field}`")
            if not re.search(r'(acceptance criteria|definition of done|## done|verify|test)', body, re.IGNORECASE):
                warnings.append("No acceptance criteria.")
            if re.search(r'tailwind|className.*flex|className.*grid', body, re.IGNORECASE) and not re.search(r'<Box|<Stack|<Grid|primitives|design.tokens', body, re.IGNORECASE):
                warnings.append("Mentions Tailwind but not layout primitives.")

            # Spec-Driven Issue Validation
            missing_spec_sections = [s for s in SPEC_SECTIONS if not self.orch._has_spec_section(s, body)]
            if missing_spec_sections:
                findings.append(f"Missing spec-driven sections: {', '.join(f'`{s}`' for s in missing_spec_sections)}")

            issue_result = {"number": issue.number, "title": title, "findings": findings, "warnings": warnings}
            results.append(issue_result)
            total_findings += len(findings)
            if post_comments and (findings or warnings):
                comment = "## 🤖 Issue Quality Review\n\n"
                if findings: comment += "### ❌ Violations\n" + "\n".join(f"- {f}" for f in findings) + "\n\n"
                if warnings: comment += "### ⚠️ Warnings\n" + "\n".join(f"- {w}" for w in warnings) + "\n"
                if not dry_run: issue.create_comment(comment + "\n---\n*Generated by `td_cli validate-issue`*")

        return {"status": "success" if total_findings == 0 else "error", "issues": results, "total_findings": total_findings}

    def update_issues(self, dry_run: bool = True) -> List[Dict[str, Any]]:
        repo = get_github_client().get_repo(get_repo_name()); updates = []
        audit_base = self.orch.get_audit_results(content=""); config = audit_base.get("config", {})
        deprecated = config.get("deprecated", {})
        for issue in repo.get_issues(state='open'):
            body = issue.body or ''; findings = []
            for old, new in deprecated.get('assets', {}).items():
                if old in body: findings.append(f"References deprecated name `{old}`. Use `{new}` instead.")
            for old, new in deprecated.get('paths', {}).items():
                if old in body: findings.append(f"References deprecated path `{old}`. New location: `{new}`")
            res = self.orch.get_audit_results(content=body)
            violations = res.get("violations", {}).get("stdin", [])
            for v in violations: findings.append(f"Contains banned pattern: {v['message']} (value: {v.get('value', 'N/A')})")
            if findings:
                updates.append({"number": issue.number, "findings": findings})
                if not dry_run: issue.create_comment("## 🤖 Automated Issue Update\n\n" + "\n".join(f"- {f}" for f in findings) + "\n\n---\n*Generated by `td_cli update-issues`*")
        return updates
