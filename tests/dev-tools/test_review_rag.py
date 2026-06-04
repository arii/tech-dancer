import os
import sys
import tempfile
from pathlib import Path
import unittest
from unittest.mock import MagicMock, patch

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../dev-tools')))

from tdw_services.orchestrator import Orchestrator
from tdw_services.services.gemini import LocalAIClient
from tdw_services.services.rag import HashEmbeddingProvider, ReviewRAGStore, build_review_queries, chunk_text
from tdw_services.cli import cli
from click.testing import CliRunner


class TestReviewRAG(unittest.TestCase):
    def test_chunk_text_uses_roughly_500_token_segments(self):
        chunks = chunk_text(' '.join(f'token{i}' for i in range(1100)), max_tokens=500)

        self.assertEqual(len(chunks), 3)
        self.assertEqual(len(chunks[0].split()), 500)
        self.assertEqual(len(chunks[1].split()), 500)
        self.assertEqual(len(chunks[2].split()), 100)

    def test_build_review_queries_uses_changed_files_and_added_code(self):
        diff = '+++ b/src/App.tsx\n+import { Stack } from "@/layouts"\n+querySelector("#bad")\n'

        queries = build_review_queries(diff)

        self.assertTrue(any('src/App.tsx' in query for query in queries))
        self.assertTrue(any('queryselector' in query for query in queries))
        self.assertLessEqual(len(queries), 5)

    def test_store_retrieves_similar_historical_chunk(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            store = ReviewRAGStore(
                index_path=os.path.join(tmpdir, 'index.json'),
                embedding_provider=HashEmbeddingProvider(),
            )
            store.replace([
                {
                    'source_type': 'pull_request',
                    'title': 'PR #10: fix DOM access',
                    'text': 'Avoid querySelector in TSX components; use controlled React state instead.',
                    'metadata': {'number': 10},
                },
                {
                    'source_type': 'coding_standard',
                    'title': 'CODEX.md',
                    'text': 'Run pnpm run doctor before builds.',
                    'metadata': {'path': 'CODEX.md'},
                },
            ])

            results = store.retrieve(['querySelector DOM access controlled state'], top_k=1)

            self.assertEqual(results[0]['title'], 'PR #10: fix DOM access')

    def test_chunk_prompt_includes_rag_context_and_standards(self):
        client = LocalAIClient()
        prompt = client._build_chunk_prompt(
            {'file': 'src/App.tsx', 'diff_text': '+querySelector("#bad")', 'truncated': False},
            'Test PR',
            'No checks found.',
            {
                'historical_chunks': [
                    {
                        'source_type': 'pull_request',
                        'title': 'PR #9: remove DOM access',
                        'text': 'Past decision: no querySelector in UI components.',
                        'score': 0.9,
                    }
                ],
                'codex_chunks': [
                    {
                        'source_type': 'coding_standard',
                        'title': 'AGENTS.md',
                        'text': 'No direct DOM access.',
                        'score': 0.8,
                    }
                ],
            },
        )

        self.assertIn('RELEVANT HISTORICAL CONTEXT', prompt)
        self.assertIn('Past decision: no querySelector', prompt)
        self.assertIn('CODING STANDARDS', prompt)
        self.assertIn('No direct DOM access', prompt)

    def test_build_review_rag_index_includes_ci_failure_logs_with_fix_commit(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            orch = Orchestrator()
            orch._github = MagicMock()
            orch._github.fetch_closed_pulls.return_value = [
                {
                    'number': 7,
                    'title': 'Fix lint',
                    'body': 'Repair lint failure.',
                    'html_url': 'https://example.test/pull/7',
                    'head': {'sha': 'abc123'},
                    'merge_commit_sha': 'def456',
                }
            ]
            orch._github.fetch_pr_review_comments.return_value = []
            orch._github.fetch_pr_issue_comments.return_value = []
            orch._github.fetch_check_runs.return_value = [
                {'id': 11, 'external_id': None, 'name': 'lint', 'conclusion': 'failure', 'url': 'https://example.test/check/11'}
            ]
            orch._github.fetch_check_run_logs.return_value = 'src/App.tsx:10:5: no querySelector [eslint/no-restricted-syntax]'

            result = orch.build_review_rag_index(limit=1, index_path=os.path.join(tmpdir, 'index.json'))
            store = ReviewRAGStore(os.path.join(tmpdir, 'index.json'), embedding_provider=HashEmbeddingProvider())
            ci_chunks = [chunk for chunk in store.chunks if chunk.source_type == 'ci_failure']

            self.assertEqual(result['status'], 'success')
            self.assertEqual(result['ci_failures'], 1)
            self.assertEqual(len(ci_chunks), 1)
            self.assertIn('def456', ci_chunks[0].text)


    def test_get_review_rag_context_does_not_write_default_index_as_side_effect(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            old_cwd = os.getcwd()
            try:
                os.chdir(tmpdir)
                Path('CODEX.md').write_text('Run doctor before testing.', encoding='utf-8')
                Path('AGENTS.md').write_text('No direct DOM access.', encoding='utf-8')

                context = Orchestrator().get_review_rag_context('+++ b/src/App.tsx\n+querySelector("#bad")\n')

                self.assertFalse(Path('.agent/review-rag-index.json').exists())
                self.assertGreaterEqual(len(context['codex_chunks']), 1)
            finally:
                os.chdir(old_cwd)

    def test_limit_zero_builds_standards_index_without_github_calls(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            old_cwd = os.getcwd()
            try:
                os.chdir(tmpdir)
                Path('CODEX.md').write_text('Runtime standard.', encoding='utf-8')
                Path('AGENTS.md').write_text('Agent standard.', encoding='utf-8')
                orch = Orchestrator()
                orch._github = MagicMock()

                result = orch.build_review_rag_index(limit=0, index_path='index.json')

                self.assertEqual(result['status'], 'success')
                self.assertEqual(result['pull_requests'], 0)
                self.assertEqual(result['comments'], 0)
                orch._github.fetch_closed_pulls.assert_not_called()
                self.assertTrue(Path('index.json').exists())
            finally:
                os.chdir(old_cwd)


    @patch('tdw_services.orchestrator.Orchestrator.build_review_rag_index')
    def test_index_rag_cli_calls_orchestrator(self, mock_index):
        mock_index.return_value = {
            'status': 'success',
            'index_path': '.agent/review-rag-index.json',
            'documents': 2,
            'chunks': 3,
            'pull_requests': 0,
            'comments': 0,
            'warning': None,
        }
        result = CliRunner().invoke(cli, ['ai', 'index-rag', '--limit', '5'])

        self.assertEqual(result.exit_code, 0)
        mock_index.assert_called_once_with(limit=5, index_path=None)

    def test_build_review_rag_index_allows_standards_only_partial_index(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            orch = Orchestrator()
            orch._github = MagicMock()
            orch._github.fetch_closed_pulls.side_effect = RuntimeError('token unavailable')

            result = orch.build_review_rag_index(limit=1, index_path=os.path.join(tmpdir, 'index.json'))

            self.assertEqual(result['status'], 'partial')
            self.assertGreaterEqual(result['documents'], 1)
            self.assertIn('token unavailable', result['warning'])


if __name__ == '__main__':
    unittest.main()
