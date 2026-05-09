import unittest
from unittest.mock import MagicMock, patch
import sys
import os

# Add dev-tools to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from utils import CLIError
import td_cli

class TestTDCliCrash(unittest.TestCase):
    @patch('td_cli.get_github_client')
    @patch('td_cli.get_repo_name')
    def test_handle_audit_pr_null_error(self, mock_repo, mock_client):
        args = MagicMock()
        args.pr_number = "null"
        args.fetch = True

        # This should now raise CLIError instead of ValueError
        with self.assertRaises(CLIError) as cm:
            td_cli.handle_audit_pr(args)
        self.assertIn("Invalid PR number", cm.exception.message)

    @patch('td_cli.get_github_client')
    @patch('td_cli.get_repo_name')
    def test_handle_audit_pr_none_error(self, mock_repo, mock_client):
        args = MagicMock()
        args.pr_number = None
        args.fetch = True

        # This should now raise CLIError instead of TypeError
        with self.assertRaises(CLIError) as cm:
            td_cli.handle_audit_pr(args)
        self.assertIn("Invalid PR number", cm.exception.message)

    @patch('td_cli.get_github_client')
    @patch('td_cli.get_repo_name')
    def test_handle_audit_pr_empty_error(self, mock_repo, mock_client):
        args = MagicMock()
        args.pr_number = ""
        args.fetch = True

        # This should now raise CLIError
        with self.assertRaises(CLIError) as cm:
            td_cli.handle_audit_pr(args)
        self.assertIn("Invalid PR number", cm.exception.message)

    @patch('td_cli.get_github_client')
    @patch('td_cli.get_repo_name')
    def test_handle_audit_pr_non_numeric_error(self, mock_repo, mock_client):
        args = MagicMock()
        args.pr_number = "abc"
        args.fetch = True

        # This should now raise CLIError instead of ValueError
        with self.assertRaises(CLIError) as cm:
            td_cli.handle_audit_pr(args)
        self.assertIn("Invalid PR number format", cm.exception.message)

if __name__ == '__main__':
    unittest.main()
