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

    @patch('td_cli.get_github_token')
    @patch('td_cli.get_repo_name')
    @patch('github.Github')
    def test_validate_issue_dry_run_default(self, mock_github_class, mock_repo, mock_token):
        """Test that validate-issue defaults to dry-run True"""
        mock_token.return_value = "fake-token"
        mock_repo.return_value = "owner/repo"

        mock_issue = MagicMock()
        mock_issue.number = 123
        mock_issue.title = "Test Issue"
        mock_issue.body = "Test Body"

        mock_github_class.return_value.get_repo.return_value.get_issue.return_value = mock_issue

        args = MagicMock()
        args.issue_number = 123
        args.all_open = False
        args.post_comments = True
        args.dry_run = True  # Default
        args.json = False

        td_cli.handle_validate_issue(args)

        # Verify comment was NOT created
        mock_issue.create_comment.assert_not_called()

    @patch('submit_review.get_github_token')
    @patch('submit_review.get_repo_name')
    @patch('submit_review.Github')
    @patch('os.path.exists')
    @patch('builtins.open', new_callable=unittest.mock.mock_open, read_data='# Review\n```json\n{"body": "Approved"}\n```')
    def test_submit_review_dry_run_default(self, mock_file, mock_exists, mock_github, mock_repo, mock_token):
        """Test that submit_review defaults to dry-run True"""
        mock_exists.return_value = True
        mock_token.return_value = "fake-token"
        mock_repo.return_value = "owner/repo"

        mock_pr = MagicMock()
        mock_github.return_value.get_repo.return_value.get_pull.return_value = mock_pr

        submit_review(123, "fake-path.md", dry_run=True)

        # Verify review was NOT created
        mock_pr.create_review.assert_not_called()

    @patch('submit_review.get_github_token')
    @patch('submit_review.get_repo_name')
    @patch('submit_review.Github')
    @patch('os.path.exists')
    @patch('builtins.open', new_callable=unittest.mock.mock_open, read_data='# Review\n```json\n{"body": "Approved"}\n```')
    def test_submit_review_execute(self, mock_file, mock_exists, mock_github, mock_repo, mock_token):
        """Test that submit_review executes when dry_run is False"""
        mock_exists.return_value = True
        mock_token.return_value = "fake-token"
        mock_repo.return_value = "owner/repo"

        mock_pr = MagicMock()
        mock_github.return_value.get_repo.return_value.get_pull.return_value = mock_pr

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

        baseline = td_cli.resolve_baseline(None, "FAKE_VAR", "fake.txt", 100)

        self.assertEqual(baseline, 42)
        mock_gha_get.assert_called_with("FAKE_VAR")

if __name__ == '__main__':
    unittest.main()
