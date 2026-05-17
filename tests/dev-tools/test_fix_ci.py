import unittest
from unittest.mock import MagicMock, patch
import sys
import os

# Add dev-tools to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from tdw_services.orchestrator import Orchestrator
from utils import CLIError

class TestFixCIValidation(unittest.TestCase):

    @patch('tdw_services.orchestrator.get_repo_name')
    @patch('tdw_services.orchestrator.get_github_client')
    def test_handle_fix_ci_missing_github_token(self, mock_client, mock_repo):
        """Test that fix_ci raises an error related to github client when token is missing"""
        mock_client.side_effect = CLIError("Missing GITHUB_TOKEN environment variable.", code=401)
        mock_repo.return_value = "owner/repo"
        orch = Orchestrator()
        orch._github = mock_client.return_value

        with self.assertRaises(CLIError) as cm:
            orch.fix_ci(pr_number=123)

        self.assertEqual(cm.exception.code, 401)
        self.assertIn("Missing GITHUB_TOKEN", cm.exception.message)

    @patch('tdw_services.orchestrator.Orchestrator.get_env_or_gha')
    @patch('tdw_services.orchestrator.get_repo_name')
    @patch('tdw_services.orchestrator.get_github_client')
    def test_handle_fix_ci_missing_jules_api_key(self, mock_client, mock_repo, mock_env_or_gha):
        """Test that fix_ci raises CLIError when JULES_API_KEY is missing"""
        mock_repo.return_value = "owner/repo"

        pr_mock = MagicMock()
        pr_mock.head.ref = "test-branch"
        pr_mock.head.sha = "12345"

        repo_mock = MagicMock()
        repo_mock.get_pull.return_value = pr_mock
        mock_client.return_value.fetch_check_runs.return_value = []
        mock_client.return_value.get_repo.return_value = repo_mock

        # Simulate missing API key inside JulesClient
        mock_env_or_gha.side_effect = lambda k: None if "JULES" in k else "value"

        with patch('tdw_services.services.jules.JulesClient.__init__', return_value=None):
            orch = Orchestrator()
            orch._github = mock_client.return_value
            # Mocking Jules client to throw when API key is missing during session creation or source discovery
            orch._jules = MagicMock()
            orch.jules.discover_source_id = MagicMock(return_value=None)

            with self.assertRaises(CLIError) as cm:
                orch.fix_ci(pr_number=123)

            self.assertIn("JULES_SOURCE_ID missing", cm.exception.message)

    @patch('tdw_services.orchestrator.get_repo_name')
    def test_handle_fix_ci_missing_repo_name(self, mock_repo):
        """Test that handle_fix_ci raises CLIError when repo name cannot be determined"""
        mock_repo.return_value = None

        orch = Orchestrator()

        # We will mock the whole get_github_client().get_repo to throw what it actually throws
        with patch('tdw_services.orchestrator.get_github_client') as mock_client:
            mock_client.return_value.get_repo.side_effect = CLIError("Could not determine repository name", code=400)
            with self.assertRaises(CLIError) as cm:
                orch.fix_ci(pr_number=123)

            self.assertEqual(cm.exception.code, 400)
            self.assertIn("Could not determine repository name", cm.exception.message)

if __name__ == '__main__':
    unittest.main()
