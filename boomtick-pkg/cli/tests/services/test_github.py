import unittest
from unittest.mock import patch, MagicMock
import sys
import os

# Add paths to sys.path
sys.path.append(os.path.join(os.getcwd(), "boomtick-pkg", "cli"))
sys.path.append(os.path.join(os.getcwd(), "boomtick-pkg", "cli", "dev_tools"))

from tdw_services.services.github import GitHubClient

class TestGitHubClientPagination(unittest.TestCase):
    @patch('tdw_services.services.github.GitHubClient._detect_repo')
    @patch('utils.get_github_token')
    def setUp(self, mock_token, mock_detect):
        mock_token.return_value = "dummy_token"
        mock_detect.return_value = "owner/repo"
        self.client = GitHubClient(repo="owner/repo")

    @patch('tdw_services.services.github.requests.Session.request')
    def test_list_pull_requests_pagination_and_filtering(self, mock_request):
        # Search response returning 1 item matching 'bug' label
        mock_search_res = MagicMock()
        mock_search_res.json.return_value = {"items": [{"number": 101}]}
        mock_search_res.status_code = 200

        # Details response
        mock_details_res = MagicMock()
        mock_details_res.json.return_value = {"number": 101, "title": "Bug PR", "user": {"login": "user"}, "head": {"ref": "b"}, "base": {"ref": "m"}, "draft": False, "mergeable_state": "clean", "updated_at": "2023", "html_url": "url", "labels": [{"name": "bug"}]}
        mock_details_res.status_code = 200

        mock_request.side_effect = [mock_search_res, mock_details_res]

        # Request up to 150 PRs with label 'bug'
        prs = self.client.list_pull_requests(limit=150, labels=["bug"])

        # Should only find 1 PR
        self.assertEqual(len(prs), 1)
        self.assertEqual(prs[0]["number"], 101)
        # Should have called search API and details API
        self.assertEqual(mock_request.call_count, 2)

if __name__ == '__main__':
    unittest.main()
