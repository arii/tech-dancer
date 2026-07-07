import json
import argparse
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from utils import run_cli, get_session_id, wait_for_agent

JULES_SYSTEM_PROMPT = """You are Jules, an autonomous software engineering agent. You execute actions on demand when given a task payload. You do not manage loops, and you do not schedule your own future executions. However, you are strictly responsible for verifying that you do not perform actions on the same asset too frequently.

Current Time Reference: Whenever you are invoked, the Orchestrator will provide the current timestamp. Time-Aware Throttling Rule:
Look at the interaction_history provided in your input payload. Find the most recent timestamp for the matching target_id. If less than 1 hour has elapsed between that past timestamp and the current time, you must ABORT the execution.

Expected Input Payload Format:
{ "current_timestamp": "YYYY-MM-DDTHH:MM:SSZ", "target_id": "[Identifier]", "task_objective": "[Objective]", "interaction_history": [ {"timestamp": "YYYY-MM-DDTHH:MM:SSZ", "target_id": "[ID]", "status": "SUCCESS"} ] }

Output Format: You must evaluate the time constraint first. Your output must be a clean JSON block matching one of the two outcomes below:
Outcome A (Throttled): { "status": "ABORTED_THROTTLED", "timestamp": "...", "target_id": "...", "action_attempted": "None", "utility_evaluation": "NOT_USEFUL", "reason": "..." }
Outcome B (Proceed): { "status": "SUCCESS", "timestamp": "...", "target_id": "...", "action_attempted": "...", "utility_evaluation": "USEFUL | NOT_USEFUL", "findings": "..." }

Initial Task Payload:
"""

def execute_orchestrator_loop(existing_session_id=None):
    """Main execution flow for Agent 2 orchestrating Agent 1 (Jules)."""
    target_branch = "main"
    session_id = existing_session_id

    # 1. Initialize or Attach
    if not session_id:
        initial_payload = {
            "current_timestamp": "2026-06-26T23:12:00Z",
            "target_id": target_branch,
            "task_objective": "Initialize ledger and standby.",
            "interaction_history": []
        }

        full_dispatch_task = f"{JULES_SYSTEM_PROMPT}\n{json.dumps(initial_payload)}"
        print("Dispatching new task with system prompt...")
        run_cli(["agent", "dispatch", target_branch, full_dispatch_task])

        session_id = get_session_id()

    if not session_id:
        print("Failed to capture Session ID. Aborting.")
        return

    print(f"Active Session ID: {session_id}")
    wait_for_agent(session_id)

    # 3. Send High-Level Follow-up Instruction
    # In practice, this payload is dynamically generated based on repository state.
    target_pr = 2280
    follow_up_payload = {
        "current_timestamp": "2026-06-27T00:15:00Z",
        "target_id": f"pr-{target_pr}",
        "task_objective": f"Perform a comprehensive review of PR #{target_pr}.",
        "interaction_history": [{"timestamp": "2026-06-26T23:12:00Z", "status": "SUCCESS"}]
    }

    print(f"Sending PR Review payload to session {session_id}...")
    run_cli(["agent", "send", session_id, json.dumps(follow_up_payload)])

    # 4. Await Completion & Read Response
    wait_for_agent(session_id)
    final_output = run_cli(["agent", "messages", session_id])

    print("\n--- Agent 1 Output ---")
    try:
        jules_response = json.loads(final_output)
        print(f"Jules Findings: {jules_response.get('findings')}")
        print(f"Utility: {jules_response.get('utility_evaluation')}")
    except json.JSONDecodeError:
        print(final_output)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Agent 2 Orchestrator")
    parser.add_argument("--session-id", type=str, help="Attach to an existing Agent 1 session ID", default=None)
    args = parser.parse_args()
    execute_orchestrator_loop(existing_session_id=args.session_id)
