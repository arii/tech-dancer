import os
import sys
import pytest
from unittest.mock import MagicMock

# Create mock modules to prevent import errors
sys.modules['tdw_services.services.dependency_graph'] = MagicMock()
sys.modules['tdw_services.services.vector_store'] = MagicMock()

sys.path.append(os.path.join(os.getcwd(), "dev-tools"))
from get_ai_context import get_context

class DummyDependencyGraph:
    def get_dependencies(self, filepath):
        return ["dep1", "dep2"]
    def get_dependents(self, filepath):
        return ["dependent1"]

class DummyVectorStore:
    def query(self, diff_text, n_results=3):
        return [
            {"metadata": {"path": "other_file.py"}, "document": "some code"},
            {"metadata": {"path": "main_file.py"}, "document": "main code"}
        ]

class DummyFailingVectorStore:
    def query(self, diff_text, n_results=3):
        raise Exception("Database connection failed")

def test_get_context_valid_inputs():
    graph = DummyDependencyGraph()
    store = DummyVectorStore()

    result = get_context("main_file.py", "diff text", graph, store, n_results=2)

    assert result["path"] == "main_file.py"
    assert result["dependencies"] == ["dep1", "dep2"]
    assert result["dependents"] == ["dependent1"]
    assert len(result["semantic"]) == 1
    assert result["semantic"][0]["path"] == "other_file.py"

def test_get_context_empty_inputs():
    graph = DummyDependencyGraph()
    store = DummyVectorStore()

    with pytest.raises(ValueError, match="filepath must be a non-empty string"):
        get_context("", "diff text", graph, store)

    with pytest.raises(ValueError, match="diff_text must be a non-empty string"):
        get_context("main_file.py", "", graph, store)

def test_get_context_store_failure():
    graph = DummyDependencyGraph()
    store = DummyFailingVectorStore()

    # The function should not raise an exception, but handle it gracefully
    result = get_context("main_file.py", "diff text", graph, store)

    assert result["path"] == "main_file.py"
    assert result["dependencies"] == ["dep1", "dep2"]
    assert len(result["semantic"]) == 0
