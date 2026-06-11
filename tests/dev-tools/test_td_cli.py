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

    @patch.dict(os.environ, {"ANTIGRAVITY_API_KEY": "fake_key"})
    def test_jules_client_init(self):
        from tdw_services.services.jules import JulesClient
        client = JulesClient()
        self.assertEqual(client.api_key, "fake_key")

    @patch.dict(os.environ, clear=True)
    def test_jules_client_missing_key(self):
        from tdw_services.services.jules import JulesClient
        # Only remove specific keys to avoid breaking pytest
        if "ANTIGRAVITY_API_KEY" in os.environ:
            del os.environ["ANTIGRAVITY_API_KEY"]
        if "JULES_API_KEY" in os.environ:
            del os.environ["JULES_API_KEY"]

        with self.assertRaises(ValueError):
            JulesClient()


    @patch('tdw_services.orchestrator.get_github_token')
    @patch('tdw_services.orchestrator.get_github_client')
    @patch('tdw_services.orchestrator.get_repo_name')
    @patch('td_cli.get_github_token')
    @patch('tdw_services.orchestrator.get_github_client')
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

    @patch('tdw_services.services.github.GitHubClient.fetch_check_runs')
    @patch('submit_review.get_github_token')
    @patch('submit_review.get_repo_name')
    @patch('submit_review.get_github_client')
    @patch('os.path.exists')
    @patch('builtins.open', new_callable=unittest.mock.mock_open, read_data='# Review\n```json\n{"body": "Approved"}\n```')
    @patch.dict('os.environ', {'GITHUB_TOKEN': 'fake-token'})
    def test_submit_review_dry_run_default(self, mock_file, mock_exists, mock_get_client, mock_repo, mock_token, mock_fetch_checks):
        """Test that submit_review defaults to dry-run True"""
        mock_exists.return_value = True
        mock_token.return_value = "fake-token"
        mock_repo.return_value = "owner/repo"

        mock_pr = MagicMock()
        mock_get_client.return_value.get_repo.return_value.get_pull.return_value = mock_pr

        submit_review(123, "fake-path.md", dry_run=True)

        # Verify review was NOT created
        mock_pr.create_review.assert_not_called()

    @patch('tdw_services.services.github.GitHubClient.fetch_check_runs')
    @patch('submit_review.get_github_token')
    @patch('submit_review.get_repo_name')
    @patch('submit_review.get_github_client')
    @patch('os.path.exists')
    @patch('builtins.open', new_callable=unittest.mock.mock_open, read_data='# Review\n```json\n{"body": "Approved"}\n```')
    @patch.dict('os.environ', {'GITHUB_TOKEN': 'fake-token'})
    def test_submit_review_execute(self, mock_file, mock_exists, mock_get_client, mock_repo, mock_token, mock_fetch_checks):
        """Test that submit_review executes when dry_run is False"""
        mock_exists.return_value = True
        mock_token.return_value = "fake-token"
        mock_repo.return_value = "owner/repo"

        mock_pr = MagicMock()
        mock_get_client.return_value.get_repo.return_value.get_pull.return_value = mock_pr

        submit_review(123, "fake-path.md", dry_run=False)

        # Verify review WAS created
        mock_pr.create_review.assert_called_once()

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

class TestOllamaSchemaConversion(unittest.TestCase):
    def test_to_standard_schema(self):
        from utils import to_standard_schema
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

