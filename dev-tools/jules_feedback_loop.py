#!/usr/bin/env python3
"""
Automated Agent Feedback Daemon.
Coordinates active Jules agent sessions with their respective GitHub PRs and CI checks.
"""

import sys
import requests
from tdw_services.services.jules import JulesClient
from dev_tools_sdk.utils.auth import get_github_client
from dev_tools_sdk.utils.common import get_repo_name
from dev_tools_sdk.utils.logs import extract_failing_info, clean_gha_logs

def run_feedback_loop():
    try:
        jules = JulesClient()
    except Exception as e:
        print(f"Failed to initialize JulesClient: {e}")
        return

    try:
        gh = get_github_client()
        repo_name = get_repo_name()
        if not repo_name:
            print("Failed to determine repo name.")
            return
        repo = gh.get_repo(repo_name)
    except Exception as e:
        print(f"Failed to initialize GitHub client: {e}")
        return

    sessions = jules.list_sessions(pageSize=50)
    open_prs = list(repo.get_pulls(state='open'))

    for session in sessions:
        state = session.get("state", "UNKNOWN")
        if state in ["COMPLETED", "CLOSED", "FAILED", "CANCELED"]:
            continue

        session_id = session.get("name")
        if not session_id:
            continue

        messages = jules.get_messages(session_id)
        if not messages:
            continue

        last_message = messages[-1]
        if last_message.get("role") == "user":
            continue

        matched_pr = None
        source_ctx = session.get("sourceContext", {}).get("githubRepoContext", {})
        starting_branch = source_ctx.get("startingBranch")

        for pr in open_prs:
            if starting_branch and pr.head.ref == starting_branch:
                matched_pr = pr
                break
            if pr.title in messages[0].get("content", ""):
                matched_pr = pr
                break

        if not matched_pr:
            continue

        commits = matched_pr.get_commits()
        if commits.totalCount > 0:
            last_commit = commits[commits.totalCount - 1]
            check_runs = last_commit.get_check_runs()

            all_completed = True
            any_failed = False
            failed_logs = []

            for run in check_runs:
                if run.status != "completed":
                    all_completed = False
                elif run.conclusion in ["failure", "timed_out", "action_required"]:
                    any_failed = True
                    try:
                        # Attempt to download logs using GitHub API via requests
                        token = gh._auth.token if hasattr(gh, '_auth') and hasattr(gh._auth, 'token') else None
                        headers = {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json"} if token else {}
                        res = requests.get(f"https://api.github.com/repos/{repo_name}/actions/jobs/{run.id}/logs", headers=headers, allow_redirects=True)
                        if res.status_code == 200:
                            failed_logs.append(clean_gha_logs(res.text))
                    except Exception as e:
                        print(f"Failed to fetch logs for {run.name}: {e}")

            if any_failed:
                print(f"PR {matched_pr.number} failed, sending feedback.")
                findings = extract_failing_info("\n".join(failed_logs))
                feedback = "Some CI checks failed."
                if findings:
                    feedback += " Findings:\n" + "\n".join(f"- {f['file']}:{f['line']} {f['message']}" for f in findings)
                else:
                    feedback += f" Logs:\n\n{failed_logs[0][:1500] if failed_logs else 'No logs available.'}"
                jules.send_message(session_id, feedback)
            elif all_completed and check_runs.totalCount > 0:
                print(f"PR {matched_pr.number} passed, sending success message.")
                jules.send_message(session_id, "CI checks passed! You can proceed to submit/merge.")

if __name__ == "__main__":
    run_feedback_loop()
