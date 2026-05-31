import json
import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from tdw_services.orchestrator import Orchestrator
from utils import CLIError


class TestMobileUxAudit(unittest.TestCase):
    def setUp(self):
        self.orch = Orchestrator()

    @patch('tdw_services.orchestrator.run_command')
    def test_mobile_audit_runs_playwright_script_and_reads_report(self, mock_run):
        mock_run.return_value = MagicMock(returncode=0)
        with tempfile.TemporaryDirectory() as output_dir:
            report_path = Path(output_dir) / 'mobile-ux-audit.json'
            report_path.write_text(json.dumps({
                'errorCount': 1,
                'warningCount': 2,
                'audits': [],
            }), encoding='utf-8')

            result = self.orch.mobile_ux_audit(
                base_url='http://localhost:3000/',
                routes=['/', '/gear'],
                output_dir=output_dir,
            )

        self.assertEqual(result['errorCount'], 1)
        self.assertEqual(result['reportPath'], str(report_path))
        mock_run.assert_called_once_with([
            'pnpm', 'exec', 'tsx', 'scripts/mobile-ux-audit.ts',
            '--base-url', 'http://localhost:3000/',
            '--output-dir', output_dir,
            '--routes', '/,/gear',
        ], check=False)

    @patch('tdw_services.orchestrator.run_command')
    def test_mobile_audit_reports_script_failure(self, mock_run):
        mock_run.return_value = MagicMock(returncode=2)

        with self.assertRaises(CLIError) as context:
            self.orch.mobile_ux_audit(output_dir='/tmp/not-used')

        self.assertIn('Ensure the app is running', str(context.exception))
        self.assertEqual(context.exception.code, 2)


if __name__ == '__main__':
    unittest.main()
