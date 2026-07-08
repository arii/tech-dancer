import os
import pytest
from unittest.mock import patch, MagicMock
from dev_tools.utils import list_tracked_files, prune_untracked_scratchpads

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

def test_list_tracked_files_include_untracked():
    def mock_run(cmd, **kwargs):
        if "--others" in cmd:
            return "src/App.tsx\nnew_file.py"
        return "src/App.tsx"

    with patch("dev_tools.utils.run_command", side_effect=mock_run):
        # Tracked only
        assert "new_file.py" not in list_tracked_files(".")
        # Including untracked
        assert "new_file.py" in list_tracked_files(".", include_untracked=True)

def test_prune_untracked_scratchpads(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)

    # Create some "scratchpad" files
    (tmp_path / "fix_issue.py").write_text("print('fix')")
    (tmp_path / "test_run.sh").write_text("echo 'test'")
    (tmp_path / "data.tmp").write_text("temp")

    # Create legitimate files (tracked in mock)
    src_dir = tmp_path / "src"
    src_dir.mkdir()
    (src_dir / "main.py").write_text("real code")

    # Protected file
    (tmp_path / "setup-agent.sh").write_text("bootstrap")

    def mock_run_others(cmd, **kwargs):
        if "--others" in cmd:
            return "fix_issue.py\ntest_run.sh\ndata.tmp\nsrc/main.py\nsetup-agent.sh"
        return ""

    with patch("dev_tools.utils.run_command", side_effect=mock_run_others):
        # We need to mock os.remove and check calls, or actually check files.
        # Since we changed CWD to tmp_path, we can check actual file existence.

        deleted = prune_untracked_scratchpads()

        assert "fix_issue.py" in deleted
        assert "test_run.sh" in deleted
        assert "data.tmp" in deleted
        assert "src/main.py" not in deleted # Not root-level in patterns
        assert "setup-agent.sh" not in deleted # Protected

        assert not (tmp_path / "fix_issue.py").exists()
        assert not (tmp_path / "test_run.sh").exists()
        assert not (tmp_path / "data.tmp").exists()
        assert (src_dir / "main.py").exists()
        assert (tmp_path / "setup-agent.sh").exists()
