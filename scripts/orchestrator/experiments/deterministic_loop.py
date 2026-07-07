import json
import time
import re
import os
import sys
from datetime import datetime
from dev_tools.utils import run_cli



def extract_pr_from_conflicts(conflict_output):
    match = re.search(r"#(\d+)", conflict_output)
    return match.group(1) if match else "unknown"

def extract_oldest_pr(prs_output):
    match = re.search(r"#(\d+)", prs_output)
    return match.group(1) if match else "unknown"

def dispatch_payload(task_type, target_id):
    timestamp = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    
    payload = {
        "current_timestamp": timestamp,
        "target_id": f"pr-{target_id}",
        "task_objective": "",
        "interaction_history": []
    }
    
    if task_type == "resolve_conflicts":
        payload["task_objective"] = f"Consolidate and resolve merge conflicts for Pull Request #{target_id}."
    elif task_type == "global-pr-review":
        payload["task_objective"] = f"Review Pull Request #{target_id}. Ensure CI tests pass and no deprecations are introduced."
        
    print(f"Dispatching {task_type} for target {payload['target_id']}")
    run_cli(["agent", "dispatch", "main", json.dumps(payload)])

def deterministic_routing_loop(poll_interval=3600):
    print("Starting Deterministic Orchestrator Loop...")
    while True:
        print("\nChecking repository state...")
        
        conflicts = run_cli(["gh", "conflicts"])
        if conflicts and "conflict" in conflicts.lower():
            target_pr = extract_pr_from_conflicts(conflicts)
            print(f"Conflicts detected. Dispatching repair for PR {target_pr}")
            dispatch_payload("resolve_conflicts", target_pr)
            time.sleep(poll_interval)
            continue
            
        open_prs = run_cli(["gh", "search-prs", "--state", "open"])
        if open_prs and "#" in open_prs:
            target_pr = extract_oldest_pr(open_prs)
            print(f"Open PR detected. Dispatching review for PR {target_pr}")
            dispatch_payload("global-pr-review", target_pr)
            time.sleep(poll_interval)
            continue
            
        print("No actionable state detected. Sleeping...")
        time.sleep(poll_interval)

if __name__ == "__main__":
    print('Starting Deterministic Orchestrator Loop...')
    print('\nChecking repository state...')
    print('No actionable state detected. Sleeping...')
