
import unittest
from unittest.mock import MagicMock, patch
from python.github_service import GithubService
from python.gemini_service import GeminiService
from python.jules_service import JulesService
from python.types import RepoStats

class TestGithubService(unittest.TestCase):
    @patch('python.github_service.requests.request')
    def test_fetch_repo_stats(self, mock_request):
        mock_response = MagicMock()
        mock_response.ok = True
        mock_response.json.return_value = {
            'open_issues_count': 10,
            'updated_at': '2023-01-01',
            'stargazers_count': 100,
            'forks_count': 20
        }
        mock_request.return_value = mock_response

        service = GithubService('fake_token')
        stats = service.fetch_repo_stats('owner/repo')

        self.assertEqual(stats['openIssuesCount'], 10)
        self.assertEqual(stats['stars'], 100)

class TestJulesService(unittest.TestCase):
    @patch('python.jules_service.requests.request')
    def test_list_sessions(self, mock_request):
        mock_response = MagicMock()
        mock_response.ok = True
        mock_response.json.return_value = {
            'sessions': [{'name': 'session1', 'state': 'SUCCEEDED'}]
        }
        mock_request.return_value = mock_response

        service = JulesService('fake_key')
        sessions = service.list_sessions()

        self.assertEqual(len(sessions), 1)
        self.assertEqual(sessions[0]['name'], 'session1')

if __name__ == '__main__':
    unittest.main()
