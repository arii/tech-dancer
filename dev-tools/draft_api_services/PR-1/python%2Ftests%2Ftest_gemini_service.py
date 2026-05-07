import unittest
from unittest.mock import MagicMock, patch
import os
import json
from gemini_service import GeminiService
from gemini_service.models import RepoStats, GithubIssue, GithubUser, GithubPullRequest, GithubLabel

class TestGeminiService(unittest.TestCase):
    def setUp(self):
        # Mock environment variable for API_KEY
        self.env_patcher = patch.dict(os.environ, {"API_KEY": "fake-api-key"})
        self.env_patcher.start()

        # Patch the genai.Client
        self.client_patcher = patch("gemini_service.core.genai.Client")
        self.mock_client_class = self.client_patcher.start()
        self.mock_client = self.mock_client_class.return_value

        self.service = GeminiService()

    def tearDown(self):
        self.client_patcher.stop()
        self.env_patcher.stop()

    def test_generate_repo_briefing(self):
        stats = RepoStats(
            openIssuesCount=10,
            openPRsCount=2,
            lastUpdated="2023-10-27",
            stars=150,
            forks=30
        )
        velocity = {"opened": 5, "closed": 3}
        user = GithubUser(login="user1", avatar_url="", html_url="")
        label = GithubLabel(id=1, name="bug", color="red", description="Something is broken")
        recent_issues = [
            GithubIssue(id=1, number=101, title="Bug in login", user=user, state="open", html_url="", created_at="2023-10-26", updated_at="2023-10-26", labels=[label])
        ]
        recent_prs = [
            GithubPullRequest(id=2, node_id="node1", number=102, title="Fix login bug", user=user, state="open", html_url="", created_at="2023-10-26", updated_at="2023-10-26", draft=False, head={"ref": "fix/login", "sha": "abc"}, base={"ref": "main"}, labels=[label])
        ]

        # Mock the response
        mock_response = MagicMock()
        mock_response.text = "This is a mock briefing."
        self.mock_client.models.generate_content.return_value = mock_response

        briefing = self.service.generate_repo_briefing(stats, velocity, recent_issues, recent_prs)

        self.assertEqual(briefing, "This is a mock briefing.")
        self.mock_client.models.generate_content.assert_called_once()

    def test_parse_issues_from_text(self):
        text = "Fix the login bug."

        # Mock response with parsed property
        mock_issue = MagicMock()
        mock_issue.title = "Fix login bug"

        mock_response = MagicMock()
        mock_response.parsed = [mock_issue]
        self.mock_client.models.generate_content.return_value = mock_response

        issues = self.service.parse_issues_from_text(text)

        self.assertEqual(len(issues), 1)
        self.assertEqual(issues[0].title, "Fix login bug")
        self.mock_client.models.generate_content.assert_called_once()

if __name__ == "__main__":
    unittest.main()
