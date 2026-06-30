import unittest
from unittest.mock import MagicMock, patch
import sys
import os
import json

# Add dev-tools to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../boomtick-pkg/cli/dev_tools')))

import td_cli

class TestTDCLI(unittest.TestCase):

    @patch('dev_tools.orchestrator.get_github_token')
    @patch('dev_tools.orchestrator.get_github_client')
    @patch('dev_tools.orchestrator.get_repo_name')
    @patch('td_cli.get_github_token')
    @patch('dev_tools.orchestrator.get_github_client')
    @patch('td_cli.get_repo_name')
    def test_validate_issue_dry_run_default(self, mock_repo, mock_get_client, mock_token, mock_orch_repo, mock_orch_get_client, mock_orch_token):
        """Test that validate-issue defaults to dry-run True"""
        mock_repo.return_value = "owner/repo"
        mock_orch_repo.return_value = "owner/repo"

        mock_issue = MagicMock()
        mock_issue.number = 123
        mock_issue.title = "Test Issue"
        mock_issue.body = "Test Body"

        mock_get_client.return_value.get_repo.return_value.get_issue.return_value = mock_issue
        mock_orch_get_client.return_value.get_repo.return_value.get_issue.return_value = mock_issue

        args = MagicMock()
        args.issue_number = 123
        args.all_open = False
        args.post_comments = True
        args.dry_run = True  # Default
        args.json = False

        td_cli.handle_validate_issue(args)

        # Verify comment was NOT created
        mock_issue.create_comment.assert_not_called()

    @patch('td_cli.get_gha_variable')
    @patch('os.path.exists')
    @patch('os.environ.get')
    def test_resolve_baseline_fallback_to_gha(self, mock_env_get, mock_exists, mock_gha_get):
        """Test that resolve_baseline falls back to GHA variable if env var is missing"""
        mock_exists.return_value = False
        mock_env_get.return_value = None
        mock_gha_get.return_value = "42"

        baseline = td_cli.resolve_baseline(None, "FAKE_VAR", 100)

        self.assertEqual(baseline, 42)
        mock_gha_get.assert_called_with("FAKE_VAR")

class TestTDCliCrash(unittest.TestCase):
    @patch('td_cli.get_github_client')
    @patch('td_cli.get_repo_name')
    def test_handle_audit_pr_invalid_inputs(self, mock_repo, mock_client):
        """Test handle_audit_pr raises CLIError for various invalid PR numbers"""
        cases = [
            ("null", "Invalid PR number"),
            (None, "Invalid PR number"),
            ("", "Invalid PR number"),
            ("abc", "Invalid PR number format"),
            ("None", "Invalid PR number"),
            ("  null  ", "Invalid PR number"),
            ("   ", "Invalid PR number")
        ]

        for pr_num, expected_msg in cases:
            with self.subTest(pr_num=pr_num):
                args = MagicMock()
                args.pr_number = pr_num
                args.fetch = True

                with self.assertRaises(td_cli.CLIError) as cm:
                    td_cli.handle_audit_pr(args)
                self.assertIn(expected_msg, cm.exception.message)

class TestAISchemaConversion(unittest.TestCase):
    def test_to_standard_schema(self):
        from dev_tools.utils import to_standard_schema
        gemini_schema = {
            "type": "OBJECT",
            "properties": {
                "name": {"type": "STRING"},
                "age": {"type": "INTEGER"},
                "tags": {
                    "type": "ARRAY",
                    "items": {"type": "STRING"}
                }
            },
            "required": ["name", "age"]
        }
        expected_schema = {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "age": {"type": "integer"},
                "tags": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["name", "age"]
        }
        self.assertEqual(to_standard_schema(gemini_schema), expected_schema)

class TestIssueCreation(unittest.TestCase):
    def setUp(self):
        # Access the internal orchestrator instance from td_cli
        self.orch = td_cli._orch
        self.mock_github = MagicMock()
        # Mock the github client on the orchestrator
        self.orch._github = self.mock_github

    def test_create_issue_success(self):
        """Test successful issue creation"""
        self.mock_github.create_issue.return_value = {'html_url': 'http://github.com/issue/1'}

        res = self.orch.create_issue('Title', 'Issue Body')

        self.assertEqual(res['html_url'], 'http://github.com/issue/1')
        self.mock_github.create_issue.assert_called_once_with('Title', 'Issue Body')

    @patch('os.path.abspath')
    @patch('os.getcwd')
    def test_read_safe_file_path_traversal(self, mock_getcwd, mock_abspath):
        """Test path traversal protection in _read_safe_file"""
        mock_getcwd.return_value = '/app'
        mock_abspath.side_effect = lambda p: p # Return path as is for simplicity

        # We need to mock commonpath as well since we use it now
        with patch('os.path.commonpath') as mock_common:
            mock_common.return_value = '/' # Root is NOT /app
            with self.assertRaises(td_cli.CLIError) as cm:
                self.orch._read_safe_file('/etc/passwd')
            self.assertIn("outside of repository root", cm.exception.message)

    @patch('os.path.abspath')
    @patch('os.getcwd')
    @patch('os.path.exists')
    @patch('os.path.getsize')
    def test_read_safe_file_too_big(self, mock_getsize, mock_exists, mock_getcwd, mock_abspath):
        """Test file size limit validation in _read_safe_file"""
        # Ensure abspath returns a consistent root for validation
        mock_abspath.side_effect = lambda p: '/app/big.md' if 'big.md' in p else '/app'
        mock_exists.return_value = True
        mock_getsize.return_value = 2 * 1024 * 1024 # 2MB

        with patch('os.path.commonpath') as mock_common:
            mock_common.return_value = '/app'
            with self.assertRaises(td_cli.CLIError) as cm:
                self.orch._read_safe_file('big.md')
            self.assertIn("exceeds limit of", cm.exception.message)

if __name__ == '__main__':
    unittest.main()

