# pylint: disable=missing-docstring
import unittest
from typing import Any, Dict, List
from unittest.mock import MagicMock, patch

from dev_tools.orchestrator import Orchestrator


class TestIssueValidation(unittest.TestCase):
    def setUp(self) -> None:
        self.orch = Orchestrator()

    @patch("dev_tools.orchestrator.get_github_client")
    @patch("dev_tools.orchestrator.get_repo_name")
    @patch("dev_tools.orchestrator.Orchestrator.get_audit_results")
    def test_validate_issue_spec_driven_success(
        self, mock_audit: MagicMock, mock_repo_name: MagicMock, mock_gh_client: MagicMock
    ) -> None:
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

        result: Dict[str, Any] = self.orch.validate_issue(issue_number=1)
        self.assertEqual(result["total_findings"], 0)

    @patch("dev_tools.orchestrator.get_github_client")
    @patch("dev_tools.orchestrator.get_repo_name")
    @patch("dev_tools.orchestrator.Orchestrator.get_audit_results")
    def test_validate_issue_spec_driven_edge_cases(
        self, mock_audit: MagicMock, mock_repo_name: MagicMock, mock_gh_client: MagicMock
    ) -> None:
        mock_repo_name.return_value = "owner/repo"
        mock_audit.return_value = {"violations": {}, "config": {}}

        # Test case: different heading levels and whitespace
        mock_issue = MagicMock()
        mock_issue.number = 1
        mock_issue.title = "feat: edge cases"
        mock_issue.body = """
# Problem Statement
Something is broken.

  ### Goal
To fix it.

#### NON-GOALS
Not to fix other things.

## Proposed Approach
Do this and that.

##### Alternatives Considered
None.

###### Architectural Impact
- [x] None of the above

# Scope
### Files expected to change
    1. Understand the issue
  2. Determine approach
3. Specify scope
  4. Definition of Done
"""
        mock_gh_client.return_value.get_repo.return_value.get_issue.return_value = mock_issue

        result: Dict[str, Any] = self.orch.validate_issue(issue_number=1)
        self.assertEqual(
            result["total_findings"],
            0,
            f"Expected 0 findings but got {result['total_findings']}: {result['issues'][0]['findings']}",
        )

    @patch("dev_tools.orchestrator.get_github_client")
    @patch("dev_tools.orchestrator.get_repo_name")
    @patch("dev_tools.orchestrator.Orchestrator.get_audit_results")
    def test_validate_issue_spec_driven_missing_sections(
        self, mock_audit: MagicMock, mock_repo_name: MagicMock, mock_gh_client: MagicMock
    ) -> None:
        mock_repo_name.return_value = "owner/repo"
        mock_audit.return_value = {"violations": {}, "config": {}}

        mock_issue = MagicMock()
        mock_issue.number = 2
        mock_issue.title = "feat: missing sections"
        mock_issue.body = "## Problem Statement\nOnly this."
        mock_gh_client.return_value.get_repo.return_value.get_issue.return_value = mock_issue

        result: Dict[str, Any] = self.orch.validate_issue(issue_number=2)
        self.assertGreater(result["total_findings"], 0)
        findings: List[str] = result["issues"][0]["findings"]
        self.assertTrue(any("Missing spec-driven sections" in f for f in findings))
        self.assertIn("Goal", findings[0])
        self.assertIn("Non-Goals", findings[0])

    @patch("dev_tools.orchestrator.get_github_client")
    @patch("dev_tools.orchestrator.get_repo_name")
    @patch("dev_tools.orchestrator.Orchestrator.get_audit_results")
    def test_validate_issue_empty_body(
        self, mock_audit: MagicMock, mock_repo_name: MagicMock, mock_gh_client: MagicMock
    ) -> None:
        mock_repo_name.return_value = "owner/repo"
        mock_audit.return_value = {"violations": {}, "config": {}}

        mock_issue = MagicMock()
        mock_issue.number = 3
        mock_issue.title = "feat: empty body"
        mock_issue.body = ""
        mock_gh_client.return_value.get_repo.return_value.get_issue.return_value = mock_issue

        result: Dict[str, Any] = self.orch.validate_issue(issue_number=3)
        self.assertGreater(result["total_findings"], 0)
        findings: List[str] = result["issues"][0]["findings"]
        self.assertIn("Issue body is empty.", findings)


if __name__ == "__main__":
    unittest.main()
