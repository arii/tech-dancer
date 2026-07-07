import pytest
from unittest.mock import MagicMock, patch
from dev_tools.orchestrator import Orchestrator

@pytest.fixture
def orchestrator():
    with patch('dev_tools.orchestrator.GitHubClient'), \
         patch('dev_tools.orchestrator.get_config'):
        orch = Orchestrator()
        orch._github = MagicMock()
        return orch

def test_plan_aggregation_logic(orchestrator):
    # Mock PR details
    orchestrator.github.fetch_pr_details.side_effect = lambda pr_num: {
        "number": pr_num,
        "title": f"PR {pr_num}",
        "user": {"login": "user1"}
    }

    # Mock PR files
    orchestrator.github.fetch_pr_files.side_effect = lambda pr_num: [
        {"filename": "file1.py"},
        {"filename": f"file_{pr_num}.py"}
    ]

    # Mock PR diff
    orchestrator.github.fetch_pr_diff.side_effect = lambda pr_num: f"+++ b/file1.py\n@@ -1,1 +1,1 @@\n+modified in {pr_num}"

    # Mock runtime check
    orchestrator.runtime_check = MagicMock(return_value={"node": "24.x", "pnpm": "10.x"})

    # Mock log directories
    with patch('dev_tools.orchestrator.get_or_create_log_dir', return_value='/tmp'), \
         patch('builtins.open', MagicMock()):

        res = orchestrator.plan_aggregation([3281, 3282], "feat/test")

        assert res["status"] == "success"
        assert "workflow-plan-aggregation-feat-test.md" in res["plan_path"]
        assert "aggregation-context-feat-test.md" in res["context_path"]
        assert "aggregation-plan-feat-test.md" in res["skeleton_path"]

        # Verify Github API calls
        assert orchestrator.github.fetch_pr_details.call_count == 2
        assert orchestrator.github.fetch_pr_files.call_count == 2
        assert orchestrator.github.fetch_pr_diff.call_count == 2
