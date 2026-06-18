import unittest
from unittest.mock import MagicMock, patch
import sys
import os

# Add dev-tools to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from tdw_services.orchestrator import Orchestrator

class TestIssueValidation(unittest.TestCase):
    def setUp(self):
        self.orch = Orchestrator()

    @patch('tdw_services.orchestrator.get_github_client')
    @patch('tdw_services.orchestrator.get_repo_name')
    @patch('tdw_services.orchestrator.Orchestrator.get_audit_results')
    def test_validate_issue_spec_driven_success(self, mock_audit, mock_repo_name, mock_gh_client):
        mock_repo_name.return_value = "owner/repo"
        mock_audit.return_value = {"violations": {}, "config": {}}

        mock_issue = MagicMock()
        mock_issue.number = 1
        mock_issue.title = "feat: some feature"
        mock_issue.body = """
## Problem Statement
Something is broken.

## Goal
To fix it.

## Non-Goals
Not to fix other things.

## Proposed Approach
Do this and that.

### Alternatives Considered
None.

### Architectural Impact
- [x] None of the above

## Scope
### Files expected to change
1. UNDERSTAND THE ISSUE
2. DETERMINE APPROACH
3. SPECIFY SCOPE
4. DEFINITION OF DONE
"""
        mock_gh_client.return_value.get_repo.return_value.get_issue.return_value = mock_issue

        result = self.orch.validate_issue(issue_number=1)
        self.assertEqual(result["total_findings"], 0)

    @patch('tdw_services.orchestrator.get_github_client')
    @patch('tdw_services.orchestrator.get_repo_name')
    @patch('tdw_services.orchestrator.Orchestrator.get_audit_results')
    def test_validate_issue_spec_driven_missing_sections(self, mock_audit, mock_repo_name, mock_gh_client):
        mock_repo_name.return_value = "owner/repo"
        mock_audit.return_value = {"violations": {}, "config": {}}

        mock_issue = MagicMock()
        mock_issue.number = 2
        mock_issue.title = "feat: missing sections"
        mock_issue.body = "## Problem Statement\nOnly this."
        mock_gh_client.return_value.get_repo.return_value.get_issue.return_value = mock_issue

        result = self.orch.validate_issue(issue_number=2)
        self.assertGreater(result["total_findings"], 0)
        findings = result["issues"][0]["findings"]
        self.assertTrue(any("Missing spec-driven sections" in f for f in findings))
        self.assertIn("## Goal", findings[0])
        self.assertIn("## Non-Goals", findings[0])

if __name__ == '__main__':
    unittest.main()
