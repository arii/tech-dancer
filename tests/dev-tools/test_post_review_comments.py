import os
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import MagicMock

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from tdw_services.orchestrator import Orchestrator
from utils import CLIError


REVIEW_SNAPSHOT = """# Reviews

## PR #12 — First

URL: https://github.com/owner/repo/pull/12

```markdown
Please tighten the first change.
```

## PR #34 — Second

```markdown
Please verify the second change.
```
"""


class TestPostReviewComments(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.snapshot = Path(self.temp_dir.name) / 'reviews.md'
        self.snapshot.write_text(REVIEW_SNAPSHOT, encoding='utf-8')
        self.orch = Orchestrator()
        self.github = MagicMock()
        self.orch._github = self.github

    def tearDown(self):
        self.temp_dir.cleanup()

    def test_parse_review_comments(self):
        comments = self.orch.parse_pr_review_comments(str(self.snapshot))

        self.assertEqual(comments, {
            12: 'Please tighten the first change.',
            34: 'Please verify the second change.',
        })

    def test_dry_run_is_local_only(self):
        result = self.orch.post_pr_review_comments(str(self.snapshot))

        self.assertTrue(result['dry_run'])
        self.assertEqual(result['count'], 2)
        self.assertEqual(result['comments'][0]['action'], 'would_create')
        self.github.fetch_issue_comments.assert_not_called()
        self.github.create_issue_comment.assert_not_called()

    def test_execute_creates_comment_with_idempotency_marker(self):
        self.github.fetch_pr_details.return_value = {'state': 'open'}
        self.github.fetch_issue_comments.return_value = []
        self.github.create_issue_comment.return_value = {'html_url': 'https://example.test/comment/1'}

        result = self.orch.post_pr_review_comments(str(self.snapshot), pr_numbers=[12], dry_run=False)

        self.assertEqual(result['comments'], [{'pr': 12, 'action': 'created', 'url': 'https://example.test/comment/1'}])
        body = self.github.create_issue_comment.call_args.args[1]
        self.assertIn('Please tighten the first change.', body)
        self.assertIn('<!-- td-cli:pr-review-comment pr=12 -->', body)

    def test_execute_skips_existing_marked_comment(self):
        self.github.fetch_pr_details.return_value = {'state': 'open'}
        self.github.fetch_issue_comments.return_value = [{
            'id': 99,
            'html_url': 'https://example.test/comment/99',
            'body': '<!-- td-cli:pr-review-comment pr=12 -->',
        }]

        result = self.orch.post_pr_review_comments(str(self.snapshot), pr_numbers=[12], dry_run=False)

        self.assertEqual(result['comments'][0]['action'], 'skipped_existing')
        self.github.create_issue_comment.assert_not_called()
        self.github.update_issue_comment.assert_not_called()

    def test_replace_updates_existing_marked_comment(self):
        self.github.fetch_pr_details.return_value = {'state': 'open'}
        self.github.fetch_issue_comments.return_value = [{
            'id': 99,
            'html_url': 'https://example.test/comment/99',
            'body': '<!-- td-cli:pr-review-comment pr=12 -->',
        }]
        self.github.update_issue_comment.return_value = {'html_url': 'https://example.test/comment/99'}

        result = self.orch.post_pr_review_comments(str(self.snapshot), pr_numbers=[12], replace=True, dry_run=False)

        self.assertEqual(result['comments'][0]['action'], 'updated')
        self.github.update_issue_comment.assert_called_once()

    def test_execute_skips_closed_pr(self):
        self.github.fetch_pr_details.return_value = {'state': 'closed', 'html_url': 'https://example.test/pr/12'}

        result = self.orch.post_pr_review_comments(str(self.snapshot), pr_numbers=[12], dry_run=False)

        self.assertEqual(result['comments'][0]['action'], 'skipped_not_open')
        self.github.fetch_issue_comments.assert_not_called()
        self.github.create_issue_comment.assert_not_called()

    def test_missing_selected_pr_fails_clearly(self):
        with self.assertRaises(CLIError) as context:
            self.orch.post_pr_review_comments(str(self.snapshot), pr_numbers=[56])

        self.assertIn('#56', str(context.exception))


if __name__ == '__main__':
    unittest.main()
