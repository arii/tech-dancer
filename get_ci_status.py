import sys
import os
sys.path.append('dev-tools')
try:
    from utils import get_github_client, get_repo_name
    client = get_github_client()
    repo_name = get_repo_name()
    repo = client.get_repo(repo_name)
    pr = repo.get_pull(2497)
    commit = repo.get_commit(pr.head.sha)
    combined_status = commit.get_combined_status()
    print(f"Commit: {pr.head.sha}")
    print(f"Combined Status: {combined_status.state}")
    for status in combined_status.statuses:
        print(f"  {status.context}: {status.state} - {status.target_url}")

    # Check Check Runs (Actions)
    check_runs = commit.get_check_runs()
    print("--- Check Runs ---")
    for run in check_runs:
        print(f"  {run.name}: {run.status} ({run.conclusion})")
except Exception as e:
    print(f"Error: {e}")
