import json
import os
import sys
from datetime import datetime

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from utils import run_cli, get_session_id, wait_for_agent

def execute_continuous_dev_loop(issue_queue):
    """
    Simulates a continuous integration pipeline where Agent 1 acts as Lead Engineer.
    """
    base_branch = "main"

    print(f"Initializing primary Agent 1 session on {base_branch}...")
    initial_payload = {
        "current_timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "target_id": base_branch,
        "task_objective": f"Initialize session on {base_branch} branch. Stand by to orchestrate issue resolutions.",
        "interaction_history": []
    }

    run_cli(["agent", "dispatch", base_branch, json.dumps(initial_payload)])
    session_id = get_session_id()

    if not session_id:
        print("Could not initialize base session. Aborting.")
        return

    wait_for_agent(session_id)

    # Process issues sequentially
    for issue_id in issue_queue:
        print(f"\n--- Assigning Issue #{issue_id} to Agent 1 ---")

        task_objective = (
            f"Resolve Issue #{issue_id}. "
            "1. You may create sub-sessions using your CLI tools if needed to handle this branch. "
            f"2. Fix the issue and open a Pull Request into the '{base_branch}' branch. "
            "3. Ensure tests pass. "
            "4. Verify the PR is approved and merged before returning SUCCESS."
        )

        payload = {
            "current_timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            "target_id": f"issue-{issue_id}",
            "task_objective": task_objective,
            "interaction_history": [{"timestamp": "2026-06-26T23:12:00Z", "status": "SUCCESS"}]
        }

        run_cli(["agent", "send", session_id, json.dumps(payload)])
        wait_for_agent(session_id)
        print(f"Issue #{issue_id} lifecycle complete. Moving to next issue in queue.")

    print("\nIssue queue exhausted. Continuous development loop complete.")

if __name__ == "__main__":
    # Example Backlog Queue
    mock_issue_queue = [101, 102]
    execute_continuous_dev_loop(mock_issue_queue)
