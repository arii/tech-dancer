#!/usr/bin/env python3
import sys
import os
import json
import time
import subprocess

# Ensure imports work regardless of execution directory
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from tdw_services.services.jules import JulesClient
from tdw_services.services.github import GitHubClient
from utils import clean_gha_logs, extract_failing_info


def run_audit(pr_number: int) -> str:
    cmd = ["python3", "dev-tools/td_cli.py", "gh", "audit-pr", str(pr_number), "--fetch", "--audit", "--execute"]
    try:
        res = subprocess.run(cmd, capture_output=True, text=True)
        output = res.stdout + "\n" + res.stderr
        if res.returncode != 0:
            output += f"\nERROR: Audit tool failed with exit code {res.returncode}"
        return output
    except Exception as e:
        return f"ERROR: Failed to run audit tool: {e}"

def run_conflicts(pr_number: int) -> str:
    cmd = ["python3", "dev-tools/td_cli.py", "gh", "detect-conflicts", "--pr", str(pr_number)]
    try:
        res = subprocess.run(cmd, capture_output=True, text=True)
        output = res.stdout + "\n" + res.stderr
        if res.returncode != 0:
            output += f"\nERROR: Conflict tool failed with exit code {res.returncode}"
        return output
    except Exception as e:
        return f"ERROR: Failed to run conflict tool: {e}"


def main():
    print("🚀 Starting Jules Auto-Feedback Daemon...")

    try:
        jules_client = JulesClient()
        gh_client = GitHubClient()
    except Exception as e:
        print(f"❌ Initialization Error: {e}")
        return

    print("Fetching active Jules sessions...")
    sessions = jules_client.list_sessions(pageSize=50)
    print(f"Found {len(sessions)} sessions.")

    repo = gh_client.repo
    print(f"Fetching open PRs for repo {repo}...")
    try:
        open_prs = gh_client._request('GET', f'/repos/{repo}/pulls?state=open')
        print(f"Found {len(open_prs)} open PRs.")
    except Exception as e:
        print(f"❌ Error fetching PRs: {e}")
        return

    for session in sessions:
        session_id = session.get('name')
        if not session_id:
            continue

        # Try to match session to a PR
        matched_pr = None
        for pr in open_prs:
            title = pr.get('title', '')
            body = pr.get('body', '')
            branch = pr.get('head', {}).get('ref', '')

            clean_sid = session_id.replace("sessions/", "")

            if clean_sid in title or clean_sid in body:
                matched_pr = pr
                break

            prompt = session.get("prompt", "")
            if branch and branch in prompt:
                matched_pr = pr
                break

        if not matched_pr:
            continue

        print(f"🔗 Matched Session {session_id} to PR #{matched_pr.get('number')} ({matched_pr.get('title')})")

        # Check message history to ensure the agent is waiting for feedback
        messages = jules_client.get_messages(session_id)
        if not messages:
            print(f"  No messages found for session {session_id}, skipping.")
            continue

        last_message = messages[-1]
        if last_message.get("role") != "jules":
            print(f"  Last message is from '{last_message.get('role')}' (not jules), skipping to avoid loop.")
            continue

        print(f"  Agent is waiting for feedback. Checking CI status...")

        commit_sha = matched_pr.get('head', {}).get('sha')
        if not commit_sha:
            print(f"  No head SHA found for PR #{matched_pr.get('number')}, skipping.")
            continue

        check_runs = gh_client.fetch_check_runs(commit_sha)

        all_passed = True
        failed_checks = []
        is_still_running = False

        if check_runs:
            for run in check_runs:
                status = run.get('status')
                conclusion = run.get('conclusion')

                if status != 'completed':
                    print(f"  Check '{run.get('name')}' is still {status}, skipping feedback for now.")
                    all_passed = False
                    is_still_running = True
                    break

                if conclusion == 'failure':
                    all_passed = False
                    failed_checks.append(run)
        else:
            print(f"  No check runs found for PR #{matched_pr.get('number')}.")

        if is_still_running:
            continue

        # If checks are still running, we skip (handled above)
        feedback_parts = []

        if failed_checks:
            ci_feedback = "The CI pipeline reported failures. Here are the details:\n\n"
            for run in failed_checks:
                run_id = run.get('id')
                name = run.get('name')
                external_id = run.get('external_id')

                print(f"  Fetching logs for failed check: {name} (ID: {run_id})")
                logs = gh_client.fetch_check_run_logs(run_id, external_id)

                clean_logs = clean_gha_logs(logs)
                extracted_info = extract_failing_info(clean_logs)

                ci_feedback += f"### Failed Check: {name}\n"
                if extracted_info:
                    for info in extracted_info:
                        ci_feedback += f"- File: `{info['file']}:{info['line']}` ({info['type']})\n  Message: {info['message']}\n"
                else:
                    # Provide snippet of cleaned logs if extraction didn't catch it
                    lines = clean_logs.splitlines()
                    snippet = "\n".join(lines[-30:]) if lines else "No logs found."
                    ci_feedback += f"```\n{snippet}\n```\n"
            feedback_parts.append(ci_feedback)
        elif all_passed and check_runs:
            feedback_parts.append("All CI checks passed successfully.")

        # Run Audit and Conflicts
        print(f"  Running dev-tools audit and conflict checks for PR #{matched_pr.get('number')}...")
        audit_output = run_audit(matched_pr.get('number'))
        conflicts_output = run_conflicts(matched_pr.get('number'))

        feedback_parts.append(f"### Audit Results (`td_cli.py gh audit-pr`)\n```text\n{audit_output}\n```")
        feedback_parts.append(f"### Conflicts Check (`td_cli.py gh detect-conflicts`)\n```text\n{conflicts_output}\n```")

        # Combine all feedback parts
        final_feedback = "\n\n".join(feedback_parts)

        # Check for duplicate feedback to prevent spamming
        if last_message.get("content", "") == final_feedback:
            print(f"  Duplicate feedback detected for session {session_id}, skipping send.")
            continue

        print(f"  Sending feedback to session {session_id}...")
        jules_client.send_message(session_id, final_feedback)
        print("  Feedback sent.")

if __name__ == "__main__":
    main()
