import sys
import os
import json

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tdw_services'))
from services.jules import JulesClient
from services.github import GitHubClient

def run_feedback_loop():
    jc = JulesClient()
    gh = GitHubClient()

    print("Fetching active Jules sessions...")
    sessions = jc.list_sessions()
    print(f"Found {len(sessions)} sessions.")

    print("Fetching open PRs...")
    try:
        pr_data_raw = gh.run_authenticated_gh(['pr', 'list', '--json', 'number,headRefName,title'])
        prs = json.loads(pr_data_raw)
    except Exception as e:
        print(f"Error fetching PRs: {e}")
        return

    print(f"Found {len(prs)} open PRs.")

    for session in sessions:
        session_id = session.get('name')
        if not session_id:
            continue

        print(f"Analyzing session {session_id}")

        messages = jc.get_messages(session_id)
        if not messages:
            continue

        last_msg = messages[-1]
        if last_msg.get('role') != 'jules':
            print(f"Session {session_id} is not waiting for feedback (last message role: {last_msg.get('role')}).")
            continue

        print(f"Session {session_id} might need feedback.")

        # Extract numeric session ID
        numeric_id = session_id.replace("sessions/", "")

        # Match PR
        matched_pr = None
        for pr in prs:
            if numeric_id in pr['headRefName']:
                matched_pr = pr
                break

        if not matched_pr:
            print(f"Could not match PR for session {session_id}")
            continue

        print(f"Matched session {session_id} to PR #{matched_pr['number']} (branch: {matched_pr['headRefName']})")

        try:
            checks = gh.fetch_check_runs(matched_pr['headRefName'])

            # If there are no checks at all, we shouldn't assume failure or success
            if not checks:
                print(f"No checks found for branch {matched_pr['headRefName']}.")
                continue

            failed = [c for c in checks if c['conclusion'] == 'failure']
            in_progress = [c for c in checks if c['status'] in ('in_progress', 'queued')]

            if in_progress:
                print("Checks still running. Skipping.")
            elif failed:
                print(f"Failed checks: {len(failed)}")
                for f in failed:
                    print(f"Fetching logs for check {f['name']}")
                    logs = gh.fetch_check_run_logs(f['id'], f.get('external_id'))

                    # Extract last part of the logs, e.g. 2000 characters
                    log_segment = logs[-2000:] if len(logs) > 2000 else logs

                    feedback = f"Check '{f['name']}' failed. Logs:\n```\n{log_segment}\n```"
                    print(f"Sending failure feedback to {session_id}")
                    jc.send_message(session_id, feedback)
            else:
                print("All checks passed.")
                jc.send_message(session_id, "All CI checks have passed successfully. You can proceed.")
        except Exception as e:
            print(f"Error checking PR #{matched_pr['number']}: {e}")

if __name__ == "__main__":
    run_feedback_loop()
