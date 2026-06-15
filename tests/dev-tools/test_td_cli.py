import unittest
from unittest.mock import MagicMock, patch
import sys
import os
import json

# Add dev-tools to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

import td_cli
from submit_review import submit_review

class TestTDCLI(unittest.TestCase):

    @patch('dev_tools_sdk.utils.auth.get_github_token')
    @patch('dev_tools_sdk.utils.auth.get_github_client')
    @patch('dev_tools_sdk.utils.common.get_repo_name')
    def test_validate_issue_dry_run_default(self, mock_repo, mock_get_client, mock_token):
        """Test that validate-issue defaults to dry-run True"""
        mock_repo.return_value = "owner/repo"
        mock_token.return_value = "fake-token"

        mock_issue = MagicMock()
        mock_issue.number = 123
        mock_issue.title = "Test Issue"
        mock_issue.body = "Test Body"

        mock_repo_obj = MagicMock()
        mock_github_obj = MagicMock()
        mock_github_obj.get_repo.return_value = mock_repo_obj
        mock_repo_obj.get_issue.return_value = mock_issue
        mock_get_client.return_value = mock_github_obj

        args = MagicMock()
        args.issue_number = 123
        args.all_open = False
        args.post_comments = True
        args.dry_run = True  # Default
        args.json = False

        # Re-patching because orchestrator imports these directly
        with patch('tdw_services.orchestrator.get_github_client', return_value=mock_github_obj), \
             patch('tdw_services.orchestrator.get_repo_name', return_value="owner/repo"):
            td_cli.handle_validate_issue(args)

        # Verify comment was NOT created
        mock_issue.create_comment.assert_not_called()

    @patch('tdw_services.services.github.GitHubClient.fetch_check_runs')
    @patch('dev_tools_sdk.utils.auth.get_github_token')
    @patch('dev_tools_sdk.utils.common.get_repo_name')
    @patch('dev_tools_sdk.utils.auth.get_github_client')
    @patch('os.path.exists')
    @patch('builtins.open', new_callable=unittest.mock.mock_open, read_data='# Review\n```json\n{"body": "Approved"}\n```')
    @patch.dict('os.environ', {'GITHUB_TOKEN': 'fake-token'})
    def test_submit_review_dry_run_default(self, mock_file, mock_exists, mock_get_client, mock_repo, mock_token, mock_fetch_checks):
        """Test that submit_review defaults to dry-run True"""
        mock_exists.return_value = True
        mock_token.return_value = "fake-token"
        mock_repo.return_value = "owner/repo"

        mock_pr = MagicMock()
        mock_repo_obj = MagicMock()
        mock_github_obj = MagicMock()
        mock_github_obj.get_repo.return_value = mock_repo_obj
        mock_repo_obj.get_pull.return_value = mock_pr
        mock_get_client.return_value = mock_github_obj

        with patch('submit_review.get_github_client', return_value=mock_github_obj), \
             patch('submit_review.get_repo_name', return_value="owner/repo"):
            submit_review(123, "fake-path.md", dry_run=True)

        # Verify review was NOT created
        mock_pr.create_review.assert_not_called()

    @patch('tdw_services.services.github.GitHubClient.fetch_check_runs')
    @patch('dev_tools_sdk.utils.auth.get_github_token')
    @patch('dev_tools_sdk.utils.common.get_repo_name')
    @patch('dev_tools_sdk.utils.auth.get_github_client')
    @patch('os.path.exists')
    @patch('builtins.open', new_callable=unittest.mock.mock_open, read_data='# Review\n```json\n{"body": "Approved"}\n```')
    @patch.dict('os.environ', {'GITHUB_TOKEN': 'fake-token'})
    def test_submit_review_execute(self, mock_file, mock_exists, mock_get_client, mock_repo, mock_token, mock_fetch_checks):
        """Test that submit_review executes when dry_run is False"""
        mock_exists.return_value = True
        mock_token.return_value = "fake-token"
        mock_repo.return_value = "owner/repo"

        mock_pr = MagicMock()
        mock_repo_obj = MagicMock()
        mock_github_obj = MagicMock()
        mock_github_obj.get_repo.return_value = mock_repo_obj
        mock_repo_obj.get_pull.return_value = mock_pr
        mock_get_client.return_value = mock_github_obj

        with patch('submit_review.get_github_client', return_value=mock_github_obj), \
             patch('submit_review.get_repo_name', return_value="owner/repo"):
            submit_review(123, "fake-path.md", dry_run=False)

        # Verify review WAS created
        mock_pr.create_review.assert_called_once()

    @patch('dev_tools_sdk.utils.common.GHAConfigManager.get_variable')
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
    @patch('dev_tools_sdk.utils.auth.get_github_client')
    @patch('dev_tools_sdk.utils.common.get_repo_name')
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

class TestOllamaSchemaConversion(unittest.TestCase):
    def test_to_standard_schema(self):
        from dev_tools_sdk.utils.ollama import to_standard_schema
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

if __name__ == '__main__':
    unittest.main()
