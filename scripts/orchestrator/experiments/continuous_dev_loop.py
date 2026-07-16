# pylint: disable=missing-docstring,wrong-import-order
from dev_tools.utils import run_command
import time
import re
import json
import os
import sys
from datetime import datetime

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


def run_cli(args, suppress_errors=False):
    try:
        res = run_command(["td"] + args)
        return res if isinstance(res, str) else ""
    except Exception as e:
        if not suppress_errors:
            print(f"CLI Error: {e}")
        return "" if suppress_errors else None


def get_session_id():
    stdout = run_cli(["agent", "sync"])
    if not stdout:
        return None
    match = re.search(r"(?:Session ID|id):\s*([a-zA-Z0-9_-]+)", stdout, re.IGNORECASE)
    return match.group(1) if match else None


def wait_for_agent(session_id, poll_interval=10, timeout=300, max_retries=30):
    print(f"Polling state for session {session_id}...")
    start_time = time.time()
    retries = 0
    while True:
        if time.time() - start_time > timeout:
            raise TimeoutError(f"Timeout of {timeout}s exceeded while waiting for session {session_id}.")
        if retries >= max_retries:
            raise RuntimeError(f"Max retries of {max_retries} exceeded while waiting for session {session_id}.")

        messages = run_cli(["agent", "messages", session_id])
        if messages:
            is_completed = "SUCCESS" in messages or "ABORTED_THROTTLED" in messages
            is_waiting = "waiting for input" in messages.lower() or "failed" in messages.lower()
            if is_completed or is_waiting:
                print("Primary agent is ready.")
                break
        retries += 1
        time.sleep(poll_interval)


def execute_continuous_dev_loop(issue_queue):
    """
    Simulates a continuous integration pipeline where primary agent acts as Lead Engineer.
    """
    base_branch = "develop"

    print(f"Initializing primary agent session on {base_branch}...")
    initial_payload = {
        "current_timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "target_id": base_branch,
        "task_objective": "Initialize session on develop branch. Stand by to orchestrate issue resolutions.",
        "interaction_history": [],
    }

    run_cli(["agent", "dispatch", base_branch, json.dumps(initial_payload)])
    session_id = get_session_id()

    if not session_id:
        print("Could not initialize base session. Aborting.")
        return

    wait_for_agent(session_id)

    # Process issues sequentially
    for issue_id in issue_queue:
        print(f"\n--- Assigning Issue #{issue_id} to primary agent ---")

        task_objective = (
            f"Resolve Issue #{issue_id}. "
            "1. You should be flexible in determining your own tasks and decide what to do, "
            "but you MUST NOT create new jules sessions ever. Only orchestrator agent can orchestrate that. "
            f"2. Fix the issue and open a Pull Request into the '{base_branch}' branch. "
            "3. Ensure tests pass. "
            "4. Verify the PR is approved and merged before returning SUCCESS."
        )

        payload = {
            "current_timestamp": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            "target_id": f"issue-{issue_id}",
            "task_objective": task_objective,
            "interaction_history": [{"timestamp": "2026-06-26T23:12:00Z", "status": "SUCCESS"}],
        }

        run_cli(["agent", "send", session_id, json.dumps(payload)])
        wait_for_agent(session_id)
        print(f"Issue #{issue_id} lifecycle complete. Moving to next issue in queue.")

    print("\nIssue queue exhausted. Continuous development loop complete.")


if __name__ == "__main__":
    # Example Backlog Queue
    mock_issue_queue = [101, 102]
    execute_continuous_dev_loop(mock_issue_queue)
