from typing import List, Dict, Any, Optional
from tdw_services.services.github import GitHubClient
from tdw_services.services.jules import JulesClient

def find_pr_for_session(session: Dict[str, Any], prs: List[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    session_id = session.get("name", "").replace("sessions/", "")
    source_ctx = session.get("sourceContext", {}).get("githubRepoContext", {})
    session_branch = source_ctx.get("startingBranch", "")

    for pr in prs:
        pr_branch = pr.get("head", {}).get("ref", "")
        pr_body = pr.get("body", "") or ""

        if session_id in pr_body:
            return pr

        if session_branch and session_branch == pr_branch:
            return pr

    return None

def main():
    print("Starting Jules Feedback Loop Daemon...")
    gh_client = GitHubClient()
    jules_client = JulesClient()

    try:
        prs = gh_client._request('GET', f'/repos/{gh_client.repo}/pulls?state=open')
    except Exception as e:
        print(f"Failed to fetch PRs: {e}")
        return

    try:
        sessions = jules_client.list_sessions(pageSize=50)
    except Exception as e:
        print(f"Failed to fetch sessions: {e}")
        return

    active_sessions = sessions

    for session in active_sessions:
        session_id = session.get("name")
        print(f"Checking Session {session_id}...")

        pr = find_pr_for_session(session, prs)
        if not pr:
            print("  No active PR found for this session.")
            continue

        pr_number = pr.get("number")
        pr_title = pr.get("title")
        head_sha = pr.get("head", {}).get("sha")
        print(f"  Matched with PR #{pr_number}: {pr_title}")

        messages = jules_client.get_messages(session_id)
        if not messages:
            print("  No messages found or failed to fetch.")
            continue

        last_message = messages[-1]
        if last_message["role"] == "user":
            print("  Last message was from user. Waiting for Jules to respond.")
            continue

        # Check CI status
        checks = gh_client.fetch_check_runs(head_sha)
        if not checks:
            print("  No CI checks found.")
            continue

        all_completed = all(c.get("status") == "completed" for c in checks)
        any_failed_or_cancelled = any(c.get("conclusion") in ["failure", "timed_out", "action_required", "cancelled", "startup_failure"] for c in checks)

        if not all_completed:
            print("  Checks are still pending.")
            continue

        if any_failed_or_cancelled:
            failed_checks = [c for c in checks if c.get("conclusion") in ["failure", "timed_out", "action_required", "cancelled", "startup_failure"]]
            print(f"  Found {len(failed_checks)} failed checks.")

            for check in failed_checks:
                log = gh_client.fetch_check_run_logs(check.get("id"), check.get("external_id"))
                log_snippet = log[-2000:] if len(log) > 2000 else log

                feedback_msg = f"CI Check '{check.get('name')}' failed. Here are the logs:\n```\n{log_snippet}\n```\nPlease fix the issue and push the changes."
                print(f"  Sending feedback to session {session_id} for check {check.get('name')}")
                jules_client.send_message(session_id, feedback_msg)

            continue

        print(f"  All checks passed. Sending success message to session {session_id}")
        jules_client.send_message(session_id, "All CI checks have passed successfully! You can proceed to merge or mark as completed.")

if __name__ == "__main__":
    main()
