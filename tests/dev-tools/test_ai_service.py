# pylint: disable=missing-docstring,protected-access,unused-argument
import unittest
from unittest.mock import MagicMock, patch

from dev_tools.services.ai_service import AIClient


class TestAIService(unittest.TestCase):
    def setUp(self):
        self.ai_service = AIClient()
        self.ai_service._dependency_graph = MagicMock()
        self.ai_service._vector_store = MagicMock()

    @patch("sys.stderr")
    def test_get_context_for_chunk_exception_handling(self, mock_stderr):
        chunk = {"file": "test_file.py", "diff_text": "test diff"}

        self.ai_service._dependency_graph.get_dependencies.return_value = ["dep1"]
        self.ai_service._dependency_graph.get_dependents.return_value = []

        # Simulate an exception in vector search
        self.ai_service._vector_store.query.side_effect = Exception("Test vector exception")

        # Function should handle exception safely without crashing
        result = self.ai_service._get_context_for_chunk(chunk)

        # Ensure it still returned a string with at least some context
        self.assertIsInstance(result, str)
        self.assertIn("### Dependency Context", result)


if __name__ == "__main__":
    unittest.main()
