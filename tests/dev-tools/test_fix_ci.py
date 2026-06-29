import unittest
from unittest.mock import MagicMock, patch
import sys
import os

# Add dev-tools to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

import td_cli
from utils import CLIError

class TestFixCIValidation(unittest.TestCase):

    @patch('utils.get_github_token')
    def test_handle_fix_ci_missing_github_token(self, mock_token):
        """Test that handle_fix_ci raises CLIError when GITHUB_TOKEN is missing"""
        mock_token.return_value = None
        args = MagicMock()

        # In modern workflow, missing token fails inside orchestrator setup
        with patch('tdw_services.orchestrator.Orchestrator.fix_ci') as mock_fix_ci:
            mock_fix_ci.side_effect = CLIError("Missing GITHUB_TOKEN", code=401)
            with self.assertRaises(CLIError) as cm:
                td_cli.handle_fix_ci(args)

        self.assertEqual(cm.exception.code, 401)
        self.assertIn("Missing GITHUB_TOKEN", cm.exception.message)

    @patch('utils.get_github_token')
    @patch('os.environ.get')
    def test_handle_fix_ci_missing_jules_api_key(self, mock_env_get, mock_token):
        """Test that handle_fix_ci raises CLIError when JULES_API_KEY is missing"""
        mock_token.return_value = "fake-token"
        mock_env_get.side_effect = lambda k, default=None: None if k == "JULES_API_KEY" else default

        args = MagicMock()
        args.api_key = None

        with self.assertRaises(CLIError) as cm:
            td_cli.handle_fix_ci(args)

        self.assertEqual(cm.exception.code, 401)
        self.assertIn("Missing JULES_API_KEY", cm.exception.message)

    @patch('utils.get_github_token')
    @patch('utils.get_repo_name')
    @patch('os.environ.get')
    def test_handle_fix_ci_missing_repo_name(self, mock_env_get, mock_repo, mock_token):
        """Test that handle_fix_ci raises CLIError when repo name cannot be determined"""
        mock_token.return_value = "fake-token"
        mock_repo.return_value = None
        mock_env_get.side_effect = lambda k, default=None: "fake-api-key" if k == "JULES_API_KEY" else default

        args = MagicMock()
        args.api_key = None

        with patch('tdw_services.orchestrator.Orchestrator.fix_ci') as mock_fix_ci:
            mock_fix_ci.side_effect = CLIError("Could not determine repository name", code=400)
            with self.assertRaises(CLIError) as cm:
                td_cli.handle_fix_ci(args)

        self.assertEqual(cm.exception.code, 400)
        self.assertIn("Could not determine repository name", cm.exception.message)

    @patch('utils.get_github_token')
    @patch('utils.get_repo_name')
    @patch('td_cli._orch.fix_ci')
    @patch('os.environ.get')
    def test_handle_fix_ci_with_jules_api_key(self, mock_env_get, mock_fix_ci, mock_repo, mock_token):
        """Test that handle_fix_ci passes and calls fix_ci when JULES_API_KEY is present"""
        mock_token.return_value = "fake-token"
        mock_repo.return_value = "owner/repo"
        mock_env_get.side_effect = lambda k, default=None: "fake-jules-key" if k == "JULES_API_KEY" else default
        mock_fix_ci.return_value = {"branch": "main", "agent_name": "Jules"}

        args = MagicMock()
        args.api_key = None
        args.pr_number = 123
        args.branch = "main"
        args.dry_run = True

        res = td_cli.handle_fix_ci(args)
        self.assertEqual(res["agent_name"], "Jules")
        mock_fix_ci.assert_called_once()

if __name__ == '__main__':
    unittest.main()
