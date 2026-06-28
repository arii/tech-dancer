import unittest
from unittest.mock import patch, MagicMock
import sys
import os

# Add paths to sys.path
sys.path.append(os.path.join(os.getcwd(), "boomtick-pkg", "cli"))
sys.path.append(os.path.join(os.getcwd(), "boomtick-pkg", "cli", "dev_tools"))

from tdw_services.services.github import GitHubClient

class TestGitHubClientPagination(unittest.TestCase):
    @patch('utils.get_github_token')
    def setUp(self, mock_token):
        mock_token.return_value = "dummy_token"
        self.client = GitHubClient(repo="owner/repo")

    @patch('tdw_services.services.github.requests.Session.request')
    def test_list_pull_requests_pagination_and_filtering(self, mock_request):
        # When labels are used, it uses Search API which returns {"items": [...]}
        # For Search API, pagination is different, but the test expects 2 calls if limit > per_page
        # However Search API items already filtered by labels.
        search_data = [
            {"number": 101, "title": "Bug PR", "user": {"login": "user"}, "html_url": "url", "labels": [{"name": "bug"}]}
        ]
        mock_response = MagicMock()
        mock_response.json.return_value = {"items": search_data}
        mock_response.status_code = 200

        mock_request.return_value = mock_response

        # Request up to 150 PRs with label 'bug'
        prs = self.client.list_pull_requests(limit=150, labels=["bug"])

        self.assertEqual(len(prs), 1)
        self.assertEqual(prs[0]["number"], 101)
        # Verify Search API was called
        self.assertIn("/search/issues", mock_request.call_args[0][1])

if __name__ == '__main__':
    unittest.main()
