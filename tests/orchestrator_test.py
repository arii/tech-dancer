import pytest
from unittest.mock import MagicMock, patch
from tdw_services.orchestrator import Orchestrator

class TestFeedbackLoop:
    @patch('tdw_services.orchestrator.JulesClient')
    @patch('tdw_services.orchestrator.GitHubClient')
    @patch('tdw_services.orchestrator.log_info')
    def test_run_feedback_loop_passing(self, mock_log, mock_gh_class, mock_jules_class):
        # Setup
        orch = Orchestrator()
        orch._jules = MagicMock()
        orch._github = MagicMock()

        orch.jules.list_sessions.return_value = [{'name': 'sessions/test-session', 'prompt': 'test'}]
        orch.github.repo = 'test/repo'
        orch.github._request.return_value = [{
            'number': 123,
            'title': 'Test PR',
            'body': 'test-session',
            'head': {'sha': 'abc', 'ref': 'branch'}
        }]

        orch.jules.get_messages.return_value = [{'role': 'user'}, {'role': 'jules'}]
        orch.github.fetch_check_runs.return_value = [{'name': 'ci', 'status': 'completed', 'conclusion': 'success'}]

        # Execute
        orch.run_feedback_loop()

        # Verify
        orch.jules.send_message.assert_called_with('sessions/test-session', "All checks passed successfully. You may proceed.")

    @patch('tdw_services.orchestrator.JulesClient')
    @patch('tdw_services.orchestrator.GitHubClient')
    @patch('tdw_services.orchestrator.log_info')
    def test_run_feedback_loop_failing(self, mock_log, mock_gh_class, mock_jules_class):
        # Setup
        orch = Orchestrator()
        orch._jules = MagicMock()
        orch._github = MagicMock()

        orch.jules.list_sessions.return_value = [{'name': 'sessions/fail-session', 'prompt': 'test'}]
        orch.github.repo = 'test/repo'
        orch.github._request.return_value = [{
            'number': 456,
            'title': 'Fail PR',
            'body': 'fail-session',
            'head': {'sha': 'def', 'ref': 'branch'}
        }]

        orch.jules.get_messages.return_value = [{'role': 'jules'}]
        orch.github.fetch_check_runs.return_value = [{'id': 1, 'name': 'build', 'status': 'completed', 'conclusion': 'failure', 'external_id': 'ext'}]
        orch.github.fetch_check_run_logs.return_value = "Error at file.ts:10:5"

        with patch('tdw_services.orchestrator.extract_failing_info') as mock_extract:
            mock_extract.return_value = [{'file': 'file.ts', 'line': '10', 'type': 'ts', 'message': 'error'}]

            # Execute
            orch.run_feedback_loop()

            # Verify
            args, _ = orch.jules.send_message.call_args
            assert "The CI pipeline reported failures" in args[1]
            assert "### Failed Check: build" in args[1]
            assert "file.ts:10" in args[1]

    @patch('tdw_services.orchestrator.JulesClient')
    @patch('tdw_services.orchestrator.GitHubClient')
    @patch('tdw_services.orchestrator.log_error')
    def test_run_feedback_loop_error_handling(self, mock_log_err, mock_gh_class, mock_jules_class):
        orch = Orchestrator()
        orch._jules = MagicMock()
        orch.jules.list_sessions.side_effect = Exception("API Error")

        # Should not raise
        orch.run_feedback_loop()

        mock_log_err.assert_called()
        assert "Error in feedback loop" in mock_log_err.call_args[0][0]
