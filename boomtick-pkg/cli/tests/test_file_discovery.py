import os
import pytest
from unittest.mock import patch, MagicMock
from dev_tools.utils import list_tracked_files

def test_list_tracked_files_git_success():
    mock_files = "src/App.tsx\nsrc/index.ts\nREADME.md"
    with patch("dev_tools.utils.run_command", return_value=mock_files):
        # All files
        files = list_tracked_files(".")
        assert files == ["README.md", "src/App.tsx", "src/index.ts"]

        # Filtered by extension
        files = list_tracked_files(".", extensions=[".tsx"])
        assert files == ["src/App.tsx"]

        # Recursive check
        # Since the mock returns paths starting with 'src/', and we search in 'src'
        # with recursive=False, it should NOT find them because their parent is 'src'.
        # Wait, the current implementation of list_tracked_files for recursive=False:
        # parent = os.path.dirname(f)
        # if parent != safe_target: continue
        # If f = 'src/App.tsx' and safe_target = 'src', parent is 'src'.
        # So it SHOULD find them.
        files = list_tracked_files("src", recursive=False)
        assert "src/App.tsx" in files
        assert "src/index.ts" in files
        assert "README.md" not in files

def test_list_tracked_files_git_fallback():
    # Simulate git failure
    with patch("dev_tools.utils.run_command", side_effect=Exception("git not found")):
        with patch("os.walk") as mock_walk:
            mock_walk.return_value = [
                (".", ["src"], ["README.md"]),
                ("./src", [], ["App.tsx", "index.ts"])
            ]

            # Recursive
            files = list_tracked_files(".")
            # os.path.join(".", "README.md") -> "./README.md"
            assert "./README.md" in files
            assert "./src/App.tsx" in files

            # Non-recursive
            files = list_tracked_files(".", recursive=False)
            assert files == ["./README.md"]

def test_list_tracked_files_empty_target():
    with patch("dev_tools.utils.run_command", return_value=""):
        assert list_tracked_files("") == []
