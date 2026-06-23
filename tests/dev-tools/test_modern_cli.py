import unittest
from unittest.mock import MagicMock, patch
import sys
import os
import json

# Add dev-tools to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from tdw_services.cli import cli
from click.testing import CliRunner

class TestModernCLI(unittest.TestCase):
    def setUp(self):
        self.runner = CliRunner()

    @patch('tdw_services.orchestrator.Orchestrator.validate_issue')
    def test_validate_issue_calls_orchestrator(self, mock_validate):
        mock_validate.return_value = {"status": "success", "issues": [], "total_findings": 0}
        result = self.runner.invoke(cli, ['gh', 'validate-issue', '--issue-number', '123'])
        self.assertEqual(result.exit_code, 0)
        mock_validate.assert_called_once()

    @patch('tdw_services.orchestrator.Orchestrator.audit_pr')
    def test_audit_pr_calls_orchestrator(self, mock_audit):
        mock_audit.return_value = {"pr": 123}
        result = self.runner.invoke(cli, ['gh', 'audit-pr', '123', '--fetch'])
        self.assertEqual(result.exit_code, 0)
        # Check that it's called with expected kwargs including defaults from Click
        mock_audit.assert_called_once()
        args, kwargs = mock_audit.call_args
        self.assertEqual(args[0], 123)
        self.assertTrue(kwargs['fetch'])
        self.assertFalse(kwargs['audit'])

    @patch('tdw_services.orchestrator.Orchestrator.analyze_file')
    def test_analyze_calls_orchestrator(self, mock_analyze):
        mock_analyze.return_value = "solid code"
        result = self.runner.invoke(cli, ['ai', 'analyze', 'README.md'])
        self.assertEqual(result.exit_code, 0)
        mock_analyze.assert_called_once_with('README.md')

    @patch('tdw_services.orchestrator.Orchestrator.resolve_pr_conflicts')
    def test_resolve_conflicts_calls_orchestrator(self, mock_resolve):
        mock_resolve.return_value = {"status": "success", "message": "done"}
        result = self.runner.invoke(cli, ['gh', 'resolve-conflicts', '--pr', '123'])
        self.assertEqual(result.exit_code, 0)
        mock_resolve.assert_called_once_with(123)

if __name__ == '__main__':
    unittest.main()
