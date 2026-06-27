import unittest
from unittest.mock import patch, MagicMock
import os
import sys

# Setup PYTHONPATH
sys.path.insert(0, os.path.abspath("boomtick-pkg/cli"))
sys.path.insert(0, os.path.abspath("boomtick-pkg/cli/dev_tools"))

from tdw_services.services.github import GitHubClient

class TestGitHubClientNoGH(unittest.TestCase):
    @patch('tdw_services.services.github.requests.request')
    @patch('tdw_services.services.github.subprocess.run')
    def test_fetch_check_runs_no_gh(self, mock_run, mock_request):
        # Mock requests response
        mock_response = MagicMock()
        mock_response.json.return_value = {"check_runs": []}
        mock_response.raise_for_status.return_value = None
        mock_request.return_value = mock_response

        client = GitHubClient(token="fake_token", repo="owner/repo")
        client.fetch_check_runs("fake_ref")

        # Verify subprocess.run was NOT called with 'gh'
        for call in mock_run.call_args_list:
            args = call[0][0]
            if isinstance(args, list) and args[0] == "gh":
                self.fail(f"gh was called with {args}")

    @patch('tdw_services.services.github.requests.request')
    @patch('tdw_services.services.github.subprocess.run')
    def test_list_pull_requests_no_gh(self, mock_run, mock_request):
        mock_response = MagicMock()
        mock_response.json.return_value = []
        mock_response.raise_for_status.return_value = None
        mock_request.return_value = mock_response

        client = GitHubClient(token="fake_token", repo="owner/repo")
        client.list_pull_requests(limit=10)

        # Verify subprocess.run was NOT called with 'gh'
        for call in mock_run.call_args_list:
            args = call[0][0]
            if isinstance(args, list) and args[0] == "gh":
                self.fail(f"gh was called with {args}")

if __name__ == "__main__":
    unittest.main()
