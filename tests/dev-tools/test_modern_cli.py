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

    @patch('tdw_services.orchestrator.Orchestrator.mobile_ux_audit')
    def test_mobile_audit_calls_orchestrator(self, mock_mobile_audit):
        mock_mobile_audit.return_value = {"errorCount": 0, "warningCount": 0, "audits": [], "reportPath": '/tmp/report.json'}
        result = self.runner.invoke(cli, ['gh', 'mobile-audit', '--route', '/', '--route', '/gear'])

        self.assertEqual(result.exit_code, 0)
        mock_mobile_audit.assert_called_once_with(base_url='http://localhost:3000/', routes=['/', '/gear'], output_dir=None)

    @patch('tdw_services.orchestrator.Orchestrator.mobile_ux_audit')
    def test_mobile_audit_can_fail_on_layout_errors(self, mock_mobile_audit):
        mock_mobile_audit.return_value = {"errorCount": 1, "warningCount": 0, "audits": [], "reportPath": '/tmp/report.json'}
        result = self.runner.invoke(cli, ['gh', 'mobile-audit', '--fail-on-errors'])

        self.assertEqual(result.exit_code, 1)
        self.assertIn('1 error(s)', result.output)

    @patch('tdw_services.orchestrator.Orchestrator.post_pr_review_comments')
    def test_post_review_comments_calls_orchestrator(self, mock_post):
        mock_post.return_value = {"status": "success", "count": 1, "comments": []}
        with self.runner.isolated_filesystem():
            with open('reviews.md', 'w', encoding='utf-8') as review_file:
                review_file.write('## PR #123\n\n```markdown\nLooks good.\n```\n')
            result = self.runner.invoke(cli, ['gh', 'post-review-comments', 'reviews.md', '--pr', '123'])

        self.assertEqual(result.exit_code, 0)
        mock_post.assert_called_once_with('reviews.md', pr_numbers=[123], replace=False, dry_run=True)

    @patch('tdw_services.orchestrator.Orchestrator.analyze_file')
    def test_analyze_calls_orchestrator(self, mock_analyze):
        mock_analyze.return_value = "solid code"
        result = self.runner.invoke(cli, ['ai', 'analyze', 'README.md'])
        self.assertEqual(result.exit_code, 0)
        mock_analyze.assert_called_once_with('README.md')

if __name__ == '__main__':
    unittest.main()
