import os
import sys
import unittest
from unittest.mock import MagicMock, patch

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from tdw_services.orchestrator import Orchestrator


class TestConflictsEnvironmentValidation(unittest.TestCase):
    def setUp(self):
        self.orch = Orchestrator()

    @patch.dict(os.environ, {}, clear=True)
    @patch('tdw_services.orchestrator.run_command')
    def test_missing_origin_remote_reports_fix(self, mock_run):
        mock_run.return_value = MagicMock(returncode=2, stdout='', stderr='No such remote')

        result = self.orch.handle_conflicts()

        self.assertEqual(result['status'], 'environment_error')
        self.assertIn('Missing GitHub origin remote', result['message'])
        self.assertIn('git remote add origin https://github.com/arii/tech-dancer.git', result['message'])
        mock_run.assert_called_once_with(['git', 'remote', 'get-url', 'origin'], check=False, log_on_error=False)

    @patch.dict(os.environ, {'CODEX_GH_TOKEN': 'codex-token', 'GITHUB_TOKEN': 'github-token'}, clear=True)
    @patch('tdw_services.orchestrator.run_command')
    def test_malformed_origin_remote_reports_remote_fix_before_conflict_logic(self, mock_run):
        mock_run.return_value = MagicMock(
            returncode=0,
            stdout='https://github.com/[setup-agent] GitHub token detected for gh via GH_TOKEN..git\n',
            stderr='',
        )

        result = self.orch.handle_conflicts()

        self.assertEqual(result['status'], 'environment_error')
        self.assertIn('Malformed GitHub origin remote', result['message'])
        self.assertIn('git remote set-url origin https://github.com/arii/tech-dancer.git', result['message'])
        self.assertEqual(mock_run.call_count, 1)

    @patch.dict(os.environ, {}, clear=True)
    @patch('tdw_services.orchestrator.run_command')
    def test_missing_token_reports_token_fix_after_valid_origin(self, mock_run):
        mock_run.return_value = MagicMock(returncode=0, stdout='https://github.com/arii/tech-dancer.git\n', stderr='')

        result = self.orch.handle_conflicts()

        self.assertEqual(result['status'], 'environment_error')
        self.assertIn('Missing GitHub token', result['message'])
        self.assertIn('Set CODEX_GH_TOKEN or GITHUB_TOKEN', result['message'])
        self.assertEqual(mock_run.call_count, 1)

    @patch.dict(os.environ, {'CODEX_GH_TOKEN': 'bad token', 'GITHUB_TOKEN': 'github-token'}, clear=True)
    @patch('tdw_services.orchestrator.run_command')
    def test_invalid_codex_token_is_reported_separately_and_preferred(self, mock_run):
        mock_run.return_value = MagicMock(returncode=0, stdout='https://github.com/arii/tech-dancer.git\n', stderr='')

        result = self.orch.handle_conflicts()

        self.assertEqual(result['status'], 'environment_error')
        self.assertIn('Invalid GitHub token from CODEX_GH_TOKEN', result['message'])
        self.assertIn('token-derived URL would be malformed', result['message'])


if __name__ == '__main__':
    unittest.main()
