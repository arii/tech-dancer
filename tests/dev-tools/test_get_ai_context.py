import unittest
from unittest.mock import MagicMock, patch
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../boomtick-pkg/cli/dev_tools')))

from get_ai_context import get_context

class TestGetAIContext(unittest.TestCase):
    def setUp(self):
        self.mock_graph = MagicMock()
        self.mock_store = MagicMock()

    def test_get_context_valid_input(self):
        self.mock_graph.get_dependencies.return_value = ["dep1", "dep2"]
        self.mock_graph.get_dependents.return_value = ["dep3"]
        self.mock_store.query.return_value = [
            {"metadata": {"path": "other_file.py"}, "document": "some code"},
            {"metadata": {"path": "test_file.py"}, "document": "ignored code"}
        ]

        result = get_context("test_file.py", "diff text", self.mock_graph, self.mock_store)

        self.assertEqual(result["path"], "test_file.py")
        self.assertEqual(result["dependencies"], ["dep1", "dep2"])
        self.assertEqual(result["dependents"], ["dep3"])
        self.assertEqual(len(result["semantic"]), 1)
        self.assertEqual(result["semantic"][0]["path"], "other_file.py")

    def test_get_context_empty_input(self):
        result = get_context("", "", self.mock_graph, self.mock_store)

        self.assertEqual(result["path"], "")
        self.assertEqual(result["dependencies"], [])
        self.assertEqual(result["dependents"], [])
        self.assertEqual(result["semantic"], [])
        self.mock_graph.get_dependencies.assert_not_called()
        self.mock_store.query.assert_not_called()

    def test_get_context_invalid_input_types(self):
        result = get_context(None, 123, self.mock_graph, self.mock_store)

        self.assertEqual(result["path"], None)
        self.assertEqual(result["dependencies"], [])
        self.assertEqual(result["dependents"], [])
        self.assertEqual(result["semantic"], [])

    @patch("sys.stderr")
    def test_get_context_vector_store_exception(self, mock_stderr):
        self.mock_store.query.side_effect = Exception("Test exception")

        # Ensure it doesn't crash
        result = get_context("test_file.py", "diff text", self.mock_graph, self.mock_store)

        self.assertEqual(result["semantic"], [])

if __name__ == '__main__':
    unittest.main()
