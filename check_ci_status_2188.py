import sys
import json
from tdw_services.services.github import GitHubClient

def main():
    client = GitHubClient()
    pr_number = 2188
    pr_data = client._request('GET', f'/repos/{client.repo}/pulls/{pr_number}')
    sha = pr_data['head']['sha']
    print(f"Latest SHA for PR #{pr_number}: {sha}")

    runs_data = client._request('GET', f'/repos/{client.repo}/commits/{sha}/check-runs')
    runs = runs_data.get('check_runs', [])

    print("\n--- Check Runs ---")
    for run in runs:
        print(f"[{run['status']}] {run['name']}: {run['conclusion']} - {run['url']}")
        if run['conclusion'] == 'failure':
             print(f"  Fetching logs for {run['name']} (ID: {run['id']})...")
             try:
                 logs = client.fetch_check_run_logs(run['id'], run['external_id'])
                 log_lines = logs.splitlines()
                 print("  --- Last 100 lines of logs ---")
                 for line in log_lines[-100:]:
                     print(f"  {line}")
                 print("  --- End of logs ---\n")
             except Exception as e:
                 print(f"  Failed to fetch logs: {e}")

if __name__ == "__main__":
    main()
