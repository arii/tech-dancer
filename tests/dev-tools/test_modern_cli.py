# pylint: disable=import-outside-toplevel,missing-docstring
# pylint: disable=cyclic-import
import unittest
from unittest.mock import patch

from click.testing import CliRunner
from dev_tools.cli import cli


class TestModernCLI(unittest.TestCase):
    def setUp(self):
        self.runner = CliRunner()

    @patch("dev_tools.orchestrator.Orchestrator.validate_issue")
    def test_validate_issue_calls_orchestrator(self, mock_validate):
        mock_validate.return_value = {"status": "success", "issues": [], "total_findings": 0}
        result = self.runner.invoke(cli, ["gh", "validate-issue", "--issue-number", "123"])
        self.assertEqual(result.exit_code, 0)
        mock_validate.assert_called_once()

    @patch("dev_tools.orchestrator.Orchestrator.audit_pr")
    def test_audit_pr_calls_orchestrator(self, mock_audit):
        mock_audit.return_value = {"pr": 123}
        result = self.runner.invoke(cli, ["gh", "audit-pr", "123", "--fetch"])
        self.assertEqual(result.exit_code, 0)
        # Check that it's called with expected kwargs including defaults from Click
        mock_audit.assert_called_once()
        args, kwargs = mock_audit.call_args
        self.assertEqual(args[0], 123)
        self.assertTrue(kwargs["fetch"])
        self.assertFalse(kwargs["audit"])

    @patch("dev_tools.orchestrator.Orchestrator.analyze_file")
    def test_analyze_calls_orchestrator(self, mock_analyze):
        mock_analyze.return_value = "solid code"
        result = self.runner.invoke(cli, ["ai", "analyze", "README.md"])
        self.assertEqual(result.exit_code, 0)
        mock_analyze.assert_called_once_with("README.md")

    @patch("dev_tools.orchestrator.Orchestrator.resolve_pr_conflicts")
    def test_resolve_conflicts_calls_orchestrator(self, mock_resolve):
        mock_resolve.return_value = {"status": "success", "message": "Resolution complete"}
        result = self.runner.invoke(cli, ["gh", "resolve-conflicts", "--pr", "123"])
        self.assertEqual(result.exit_code, 0)
        self.assertIn("Resolution complete", result.output)
        mock_resolve.assert_called_once_with(
            123, allow_unrelated=False, strategy=None, push=False, continue_resolve=False
        )

    @patch("dev_tools.orchestrator.Orchestrator.resolve_pr_conflicts")
    def test_resolve_conflicts_with_strategy_and_push(self, mock_resolve):
        mock_resolve.return_value = {"status": "success", "message": "Resolution complete"}
        result = self.runner.invoke(cli, ["gh", "resolve-conflicts", "--pr", "123", "--strategy", "ours", "--push"])
        self.assertEqual(result.exit_code, 0)
        mock_resolve.assert_called_once_with(
            123, allow_unrelated=False, strategy="ours", push=True, continue_resolve=False
        )

    @patch("dev_tools.orchestrator.Orchestrator.resolve_pr_conflicts")
    def test_resolve_conflicts_with_continue(self, mock_resolve):
        mock_resolve.return_value = {"status": "success", "message": "Resolution finalized"}
        result = self.runner.invoke(cli, ["gh", "resolve-conflicts", "--pr", "123", "--continue"])
        self.assertEqual(result.exit_code, 0)
        self.assertIn("Resolution finalized", result.output)
        mock_resolve.assert_called_once_with(
            123, allow_unrelated=False, strategy=None, push=False, continue_resolve=True
        )

    @patch("dev_tools.orchestrator.Orchestrator.resolve_pr_conflicts")
    def test_resolve_conflicts_handles_error(self, mock_resolve):
        from dev_tools.utils import CLIError

        mock_resolve.side_effect = CLIError("Failed setup", code=500)
        result = self.runner.invoke(cli, ["gh", "resolve-conflicts", "--pr", "123"])
        self.assertNotEqual(result.exit_code, 0)
        self.assertIn("Failed setup", result.output)


if __name__ == "__main__":
    unittest.main()
