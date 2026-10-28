Agent 2 Orchestrator

This directory contains the deployment and experimental scripts for the "Agent 2" Orchestrator system, which drives the autonomous engineering agent (Jules).

Directory Structure

agent_2_orchestrator.py: The primary Orchestrator implementation. This handles initializing new Jules sessions, storing session IDs, and polling message state before dispatching tasks.

experiments/genai_orchestrator.py: Explores using a fast LLM (gpt-4o-mini) to read CLI outputs (gh status-board) and dynamically generate tasks for Agent 1.

experiments/deterministic_loop.py: Explores a rigid while loop that acts on basic string matching from the CLI tools (e.g., triggering a task when it sees "conflicts" in td gh conflicts).

experiments/continuous_dev_loop.py: Simulates an end-to-end continuous integration pipeline where Agent 2 feeds a backlog of GitHub issues sequentially to a "Lead Engineer" Agent 1.

Usage

You can run the primary orchestrator locally from the repository root:

# Start a new Agent 1 session and initialize the loop
python3 scripts/orchestrator/agent_2_orchestrator.py

# Attach to an existing session
python3 scripts/orchestrator/agent_2_orchestrator.py --session-id <SESSION_ID>


To test the experimental routing loops:

python3 scripts/orchestrator/experiments/continuous_dev_loop.py

Agent 2 (Orchestrator) Routing Experiments

These experiments explore two different ways Agent 2 can decide what task to dispatch to Agent 1 (Jules).

Experiment 1: Lightweight GenAI Orchestrator

Instead of hardcoding targets, Agent 2 uses a fast, cheap model (like gpt-4o-mini from your project_config.json) to read the current repository status and dynamically formulate the task_objective for Jules.

Concept

Run td gh status-board.

Pass the status board text to a lightweight LLM.

The LLM outputs a formatted JSON payload for Jules based on what needs the most attention (e.g., stale PRs, active conflicts).

Implementation Snippet (genai_orchestrator.py)

import subprocess
import json
import os

# Assuming you have an LLM client setup (e.g., OpenAI or Google GenAI)
from some_llm_library import generate_text 

def get_repo_status():
    result = subprocess.run(["td", "gh", "status-board"], capture_output=True, text=True)
    return result.stdout

def generate_dynamic_payload():
    repo_status = get_repo_status()
    
    prompt = f"""
    You are the Orchestrator. Review this repo status:
    {repo_status}
    
    Decide the single most important task for an engineering agent. 
    Output ONLY a JSON payload:
    {{
      "current_timestamp": "2026-06-26T00:00:00Z",
      "target_id": "<PR_NUMBER_OR_BRANCH>",
      "task_objective": "<Specific instructions>",
      "interaction_history": []
    }}
    """
    
    # Lightweight GenAI call (e.g., gpt-4o-mini)
    llm_response = generate_text(model="gpt-4o-mini", prompt=prompt)
    return json.loads(llm_response)

# Dispatch to Jules
# payload = generate_dynamic_payload()
# run_cli(["agent", "dispatch", payload["target_id"], json.dumps(payload)])


Experiment 2: Deterministic State Machine (Loops)

Agent 2 operates on a strict interval or cron job. It runs specific CLI checks and uses rigid if/else logic to trigger predefined playbooks. No LLM is used for routing.

Concept

Polling Loop checks gh search-prs and gh conflicts.

If conflicts are found > Dispatch CONSOLIDATE_CONFLICTED_PR playbook.

Else If open PRs > Dispatch REVIEW_PR playbook.

Sleep and repeat.

Implementation Snippet (deterministic_loop.py)

import subprocess
import json
import time
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from utils import run_cli

def deterministic_routing_loop(poll_interval=3600):
    while True:
        print("Checking repository state...")
        
        # 1. Check for Conflicts
        conflicts = run_cli(["gh", "conflicts"])
        if "conflict" in conflicts.lower():
            target_pr = extract_pr_from_conflicts(conflicts) # Implement regex extraction
            print(f"Conflicts detected. Dispatching repair for PR {target_pr}")
            dispatch_payload("resolve_conflicts", target_pr)
            time.sleep(poll_interval)
            continue
            
        # 2. Check for Open PRs needing review
        open_prs = run_cli(["gh", "search-prs", "--state", "open"])
        if open_prs:
            target_pr = extract_oldest_pr(open_prs)
            print(f"Open PR detected. Dispatching review for PR {target_pr}")
            dispatch_payload("global-pr-review", target_pr)
            time.sleep(poll_interval)
            continue
            
        print("No actionable state detected. Sleeping...")
        time.sleep(poll_interval)

def dispatch_payload(task_type, target_id):
    # Map task_type to static JSON payloads defined in your architecture doc
    pass 


Experiment 3: Continuous Issue Resolution Loop (End-to-End)

Agent 2 manages a backlog of issues and creates a continuous development pipeline. It establishes a develop branch, spins up a primary Jules session, and feeds it issues one by one, waiting for each to be resolved, approved, and merged before sending the next.

Note on Hierarchical Agents: In this model, Agent 1 acts as a "Lead Engineer." When instructed to solve an issue, Agent 1 can autonomously use its own MCP tools to spin up sub-sessions (temporary Jules workers) to parallelize tasks or test specific PRs, reporting back to Agent 2 only when the entire issue lifecycle is complete.

Concept

Identify or check out a base develop branch.

Initialize the primary Agent 1 (Jules) session on the develop branch.

Retrieve a list of open issues from the backlog.

Iterate through the issues:

Dispatch a payload instructing Jules to fix the issue, open a PR, and get it merged into develop.

Poll the session until Jules signals SUCCESS (meaning the PR is merged).

Feed the next issue in the queue.

Implementation Snippet (continuous_dev_loop.py)

import subprocess
import json
import time
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from utils import run_cli, get_session_id, wait_for_agent

def execute_continuous_dev_loop(issue_queue):
    """
    issue_queue: List of GitHub issue numbers (e.g., [101, 102, 105])
    """
    base_branch = "develop"
    
    # 1. Pre-flight: Ensure develop branch exists or instruct Jules to create it
    # We will assume Agent 2 uses system git or Jules's repo.create_branch MCP to handle this locally.
    
    # 2. Create the primary Agent 1 session
    print(f"Initializing primary Agent 1 session on {base_branch}...")
    initial_payload = {
        "current_timestamp": "2026-06-26T23:12:00Z",
        "target_id": base_branch,
        "task_objective": "Initialize session on develop branch. Stand by to orchestrate issue resolutions.",
        "interaction_history": []
    }
    
    run_cli(["agent", "dispatch", base_branch, json.dumps(initial_payload)])
    session_id = get_session_id()
    wait_for_agent(session_id)
    
    # 3. Continuous Issue Pipeline
    for issue_id in issue_queue:
        print(f"Assigning Issue #{issue_id} to Agent 1...")
        
        task_objective = (
            f"Resolve Issue #{issue_id}. "
            "1. You may create sub-sessions using your CLI tools if needed to handle this branch. "
            f"2. Fix the issue and open a Pull Request into the '{base_branch}' branch. "
            "3. Ensure tests pass. "
            "4. Verify the PR is approved and merged before returning SUCCESS."
        )
        
        payload = {
            "current_timestamp": "2026-06-27T08:00:00Z", # Dynamically generated in real script
            "target_id": f"issue-{issue_id}",
            "task_objective": task_objective,
            "interaction_history": [{"timestamp": "2026-06-26T23:12:00Z", "status": "SUCCESS"}]
        }
        
        run_cli(["agent", "send", session_id, json.dumps(payload)])
        
        # 4. Await completion of the full issue lifecycle
        wait_for_agent(session_id)
        print(f"Issue #{issue_id} lifecycle complete. Moving to next issue in queue.")
        
    print("Issue queue exhausted. Continuous development loop complete.")


Two-Agent System Architecture: Jules & The Orchestrator

Overview

A continuous, dual-agent system leveraging the td CLI.

Agent 1 (Jules): An autonomous software engineering agent that executes tasks on demand via MCP tools.

Agent 2 (The Orchestrator): A deterministic, scheduled Python script that evaluates repository state and dispatches tasks to Jules.

Agent 1: Jules (Engineering Agent)

Jules is stateless between executions but maintains context via an Orchestrator-provided interaction_history. It is fully autonomous and relies on its own knowledge to select the correct MCP tools for tasks like reviewing PRs, resolving conflicts, and creating issues.

Core Constraints (System Prompt)

No self-scheduling: Executes actions only when given a task payload.

Throttling: Must abort if less than 1 hour has elapsed since the last interaction on the same target_id.

Output: Must respond in a strict JSON format (SUCCESS or ABORTED_THROTTLED).

Zero-Fallback: Relies strictly on defined tools; does not hallucinate CLI commands.

Agent 2: The Orchestrator (Dispatcher)

The Orchestrator is a deterministic script that can run on a cron job or CI pipeline.

Responsibilities

Initialize/Attach: Creates a new Jules session or attaches to an existing one via --session-id.

Poll State: Uses agent messages to block execution while Jules is actively processing a task.

Dispatch Intent: Sends high-level JSON payloads, allowing Jules to autonomously determine how to accomplish the goal.

Orchestrator Script (agent_2_orchestrator.py)

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


Example Payloads

Global PR Review & Consolidation Payload

This payload delegates complex reasoning to Agent 1, providing strict criteria for code reuse, CI checks, and version control without explicitly mapping the tool steps.

{
  "current_timestamp": "2026-06-27T06:37:43Z",
  "target_id": "global-pr-review",
  "task_objective": "Review all open PRs to determine merge readiness or consolidation requirements. Strict evaluation criteria: 1) Verify all CI checks are passing. 2) Ensure no deprecations of actions or versions are introduced. 3) Enforce DRY principles by flagging any repetitive logic or code duplication. 4) Reject the creation of unnecessary new functions if existing ones can be reused. Consolidate overlapping PRs and mark fully compliant PRs as ready for merge.",
  "interaction_history": []
}
