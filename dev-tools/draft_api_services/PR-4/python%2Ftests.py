import unittest
from unittest.mock import patch, MagicMock
from python.orchestration_service import OrchestrationService
import json

class TestOrchestrationService(unittest.TestCase):

    @patch('python.orchestration_service.GithubService')
    @patch('python.orchestration_service.GeminiService')
    @patch('python.orchestration_service.JulesService')
    def test_review_pr_with_ai(self, MockJules, MockGemini, MockGithub):
        mock_github_instance = MockGithub.return_value
        mock_gemini_instance = MockGemini.return_value

        mock_github_instance.fetch_pr_details.return_value = {"number": 1, "title": "Test PR", "base": {"ref": "main"}}
        mock_github_instance.enrich_single_pr.return_value = {"number": 1, "title": "Test PR", "base": {"ref": "main"}, "testStatus": "passed"}
        mock_github_instance.fetch_pr_diff.return_value = "diff --git a/test.txt b/test.txt"

        mock_gemini_instance.generate_code_review.return_value = {
            "reviewComment": "Looks good",
            "recommendation": "Approved",
            "labels": []
        }

        orchestrator = OrchestrationService(github_token="fake", gemini_api_key="fake", jules_api_key="fake")
        result = orchestrator.review_pr_with_ai("owner/repo", 1)

        self.assertEqual(result["recommendation"], "Approved")
        mock_github_instance.fetch_pr_details.assert_called_once_with("owner/repo", 1)
        mock_github_instance.enrich_single_pr.assert_called_once()
        mock_github_instance.fetch_pr_diff.assert_called_once_with("owner/repo", 1)
        mock_gemini_instance.generate_code_review.assert_called_once()

if __name__ == '__main__':
    unittest.main()
