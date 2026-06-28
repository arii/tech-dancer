import unittest
from unittest.mock import patch, MagicMock
import os
import sys

# Setup PYTHONPATH
sys.path.insert(0, os.path.abspath("."))
sys.path.insert(0, os.path.abspath("dev_tools"))
sys.path.insert(0, os.path.abspath("dev_tools/dev_tools_sdk"))

from tdw_services.services.github import GitHubClient

class TestGitHubClientNoGH(unittest.TestCase):
    @patch('tdw_services.services.github.requests.Session.request')
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

    @patch('tdw_services.services.github.requests.Session.request')
    def test_list_pull_requests_pagination(self, mock_request):
        mock_response1 = MagicMock()
        mock_response1.json.return_value = [{"number": i} for i in range(1, 101)]
        mock_response1.status_code = 200

        mock_response2 = MagicMock()
        mock_response2.json.return_value = [{"number": 101}]
        mock_response2.status_code = 200

        mock_request.side_effect = [mock_response1, mock_response2]

        client = GitHubClient(token="fake_token", repo="owner/repo")
        prs = client.list_pull_requests(limit=105)

        self.assertEqual(len(prs), 101)
        self.assertEqual(mock_request.call_count, 2)

        # Verify params
        # Verify params
        # The requests.Session.request call structure is `request(method, url, headers=..., json=..., params=..., ...)`
        call1_kwargs = mock_request.call_args_list[0][1]
        self.assertEqual(call1_kwargs.get('params'), None) # Params are embedded in the URL in github.py:111

        url1 = mock_request.call_args_list[0][0][1]
        self.assertIn("page=1", url1)
        self.assertIn("per_page=100", url1)

        url2 = mock_request.call_args_list[1][0][1]
        self.assertIn("page=2", url2)

    @patch('tdw_services.services.github.requests.Session.request')
    def test_list_pull_requests_label_filtering_pulls_endpoint(self, mock_request):
        """
        Tests that list_pull_requests correctly calls the /pulls endpoint and
        filters PRs locally based on labels.
        """
        # Page 1 response containing one matching PR
        mock_pulls_res = MagicMock()
        mock_pulls_res.json.return_value = [{"number": 123, "labels": [{"name": "bug"}, {"name": "ui"}]}]
        mock_pulls_res.status_code = 200

        # Page 2 empty
        mock_empty_res = MagicMock()
        mock_empty_res.json.return_value = []
        mock_empty_res.status_code = 200

        mock_request.side_effect = [mock_pulls_res, mock_empty_res]

        client = GitHubClient(token="fake_token", repo="owner/repo")
        prs = client.list_pull_requests(labels=["bug", "ui"])

        self.assertEqual(len(prs), 1)
        self.assertEqual(prs[0]['number'], 123)

    @patch('tdw_services.services.github.requests.Session.request')
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
