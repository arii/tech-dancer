import os
import sys
import tempfile
import unittest
from unittest.mock import MagicMock, patch

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from tdw_services.orchestrator import Orchestrator
from utils import CLIError


class TestCommentPR(unittest.TestCase):
    def setUp(self):
        self.orch = Orchestrator()
        self.orch._github = MagicMock()

    def test_dry_run_previews_comment_without_github_request(self):
        result = self.orch.comment_pr(123, body='  ## Review\n\nLooks good.  ')

        self.assertEqual(result['pr'], 123)
        self.assertTrue(result['dry_run'])
        self.assertFalse(result['posted'])
        self.assertEqual(result['body'], '## Review\n\nLooks good.')
        self.orch._github.create_issue_comment.assert_not_called()

    @patch('tdw_services.orchestrator.get_github_token', return_value='fake-token')
    def test_execute_posts_comment_to_pr_conversation(self, mock_token):
        self.orch._github.create_issue_comment.return_value = {'html_url': 'https://example.test/comment/1'}

        result = self.orch.comment_pr(123, body='## Review', dry_run=False)

        self.orch._github.create_issue_comment.assert_called_once_with(123, '## Review')
        self.assertTrue(result['posted'])
        self.assertEqual(result['comment']['html_url'], 'https://example.test/comment/1')

    @patch('tdw_services.orchestrator.get_github_token', return_value=None)
    def test_execute_reports_missing_token_clearly(self, mock_token):
        with self.assertRaisesRegex(CLIError, 'Set CODEX_GH_TOKEN or GITHUB_TOKEN'):
            self.orch.comment_pr(123, body='## Review', dry_run=False)
        self.orch._github.create_issue_comment.assert_not_called()

    def test_reads_multiline_comment_from_file(self):
        with tempfile.NamedTemporaryFile('w', encoding='utf-8', delete=False) as comment_file:
            comment_file.write('## Review\n\n- Fix the failing check.\n')
            comment_path = comment_file.name
        self.addCleanup(lambda: os.path.exists(comment_path) and os.unlink(comment_path))

        result = self.orch.comment_pr(123, body_file=comment_path)

        self.assertEqual(result['body'], '## Review\n\n- Fix the failing check.')

    def test_rejects_conflicting_body_sources(self):
        with self.assertRaisesRegex(CLIError, 'either --body or --body-file'):
            self.orch.comment_pr(123, body='review', body_file='review.md')

    def test_rejects_empty_comment(self):
        with self.assertRaisesRegex(CLIError, 'comment body is empty'):
            self.orch.comment_pr(123, body='  ')

    def test_rejects_missing_comment_file(self):
        with self.assertRaisesRegex(CLIError, 'Comment file missing'):
            self.orch.comment_pr(123, body_file='/tmp/does-not-exist-review.md')


if __name__ == '__main__':
    unittest.main()
