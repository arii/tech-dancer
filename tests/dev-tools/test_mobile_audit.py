import json
import os
import sys
import unittest
from unittest.mock import MagicMock, patch

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from tdw_services.orchestrator import Orchestrator
from utils import CLIError


class TestMobileAudit(unittest.TestCase):
    def setUp(self):
        self.orch = Orchestrator()

    @patch('tdw_services.orchestrator.run_command')
    def test_runs_mobile_browser_audit_for_requested_routes(self, mock_run):
        mock_run.return_value = MagicMock(
            returncode=0,
            stdout=json.dumps({
                'status': 'success',
                'results': [],
                'findingCount': 0,
                'reportPath': 'test-results/mobile-ux-audit/report.json',
            }),
            stderr='',
        )

        result = self.orch.audit_mobile('http://localhost:4173', ['/blog', '/gear'])

        mock_run.assert_called_once_with([
            'pnpm', 'exec', 'tsx', 'scripts/mobile-ux-audit.ts',
            '--url', 'http://localhost:4173',
            '--output-dir', 'test-results/mobile-ux-audit',
            '--route', '/blog',
            '--route', '/gear',
        ], check=False, log_on_error=False)
        self.assertEqual(result['status'], 'success')
        self.assertEqual(result['exit_code'], 0)

    @patch('tdw_services.orchestrator.run_command')
    def test_preserves_overflow_report_when_browser_audit_fails(self, mock_run):
        mock_run.return_value = MagicMock(
            returncode=1,
            stdout=json.dumps({
                'status': 'failure',
                'results': [{'route': '/', 'viewport': {'width': 360}, 'findings': [{'type': 'document-overflow'}]}],
                'findingCount': 1,
                'reportPath': 'test-results/mobile-ux-audit/report.json',
            }),
            stderr='',
        )

        result = self.orch.audit_mobile('http://localhost:4173')

        self.assertEqual(result['status'], 'failure')
        self.assertEqual(result['findingCount'], 1)
        self.assertEqual(result['exit_code'], 1)

    @patch('tdw_services.orchestrator.verify_pr_scope', return_value=None)
    @patch('tdw_services.orchestrator.run_command')
    def test_pr_audit_adds_mobile_browser_findings(self, mock_run, mock_scope):
        import tempfile
        from pathlib import Path

        mock_run.return_value = MagicMock(returncode=0, stdout='', stderr='')
        self.orch.audit_mobile = MagicMock(return_value={
            'status': 'failure',
            'results': [{
                'route': '/blog',
                'viewport': {'width': 360},
                'findings': [{
                    'type': 'element-outside-viewport',
                    'message': 'Visible element extends outside the 360px viewport.',
                    'selector': '[data-testid="post-title"]',
                }],
            }],
            'findingCount': 1,
        })

        with tempfile.TemporaryDirectory() as temp_dir:
            review_dir = Path(temp_dir, 'dev-tools', 'logs', 'reviews')
            review_dir.mkdir(parents=True)
            Path(review_dir, 'pr-context-123.md').write_text('# Context\n', encoding='utf-8')
            original_cwd = os.getcwd()
            try:
                os.chdir(temp_dir)
                result = self.orch.audit_pr(123, audit=True, mobile_url='http://localhost:4173', mobile_routes=('/blog',))
            finally:
                os.chdir(original_cwd)

        self.orch.audit_mobile.assert_called_once_with('http://localhost:4173', ['/blog'])
        self.assertEqual(result['auto_findings'][0]['severity'], 'major')
        self.assertIn('[data-testid="post-title"]', result['auto_findings'][0]['issue'])

    def test_pr_audit_requires_mobile_url_for_routes(self):
        with self.assertRaisesRegex(CLIError, '--mobile-route requires --mobile-url'):
            self.orch.audit_pr(123, audit=True, mobile_routes=('/blog',))

    def test_pr_audit_requires_audit_flag_for_mobile_url(self):
        with self.assertRaisesRegex(CLIError, '--mobile-url requires --audit'):
            self.orch.audit_pr(123, mobile_url='http://localhost:4173')

    @patch('tdw_services.orchestrator.run_command')
    def test_reports_browser_startup_failure(self, mock_run):
        mock_run.return_value = MagicMock(returncode=2, stdout='', stderr='browser executable missing')

        with self.assertRaisesRegex(CLIError, 'browser executable missing'):
            self.orch.audit_mobile('http://localhost:4173')


if __name__ == '__main__':
    unittest.main()
