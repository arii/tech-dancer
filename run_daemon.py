import sys
import os

sys.path.insert(0, os.path.abspath('boomtick-pkg/cli'))

from dev_tools.services.jules import JulesClient
from dev_tools.services.github import GitHubClient
from dev_tools.orchestrator import Orchestrator

def main():
    jules = JulesClient()
    github = GitHubClient()
    orch = Orchestrator()

    print("Listing sessions...")
    sessions = jules.list_sessions(pageSize=50)
    print(f"Found {len(sessions)} sessions.")

    print("Fetching open PRs...")
    prs = github.list_pull_requests(state='open')
    print(f"Found {len(prs)} open PRs.")

    for session in sessions:
        session_id = session.get('name')
        if not session_id:
            continue

        clean_id = session_id.replace("sessions/", "")

        # 1. Fetch message history
        messages = jules.get_messages(session_id)
        if not messages:
            print(f"Session {clean_id}: No messages.")
            continue

        last_message = messages[-1]
        if last_message['role'] != 'jules':
            print(f"Session {clean_id}: Last message is from user (role: {last_message['role']}), skipping to avoid double-feedback.")
            continue

        # 2. Match session to PR
        matched_pr = None

        # Check session outputs
        if session.get("outputs") and isinstance(session["outputs"], list):
            import re
            for output in session["outputs"]:
                if output.get("pullRequest") and output["pullRequest"].get("url"):
                    match = re.search(r"/pull/(\d+)", output["pullRequest"]["url"])
                    if match:
                        pr_num = int(match.group(1))
                        # Find in PRs
                        for pr in prs:
                            if pr['number'] == pr_num:
                                matched_pr = pr
                                break
                    if matched_pr:
                        break

        if not matched_pr:
            # Check prompt branch name or title substring or body
            prompt = session.get('prompt', '')
            for pr in prs:
                full_pr = github.fetch_pr_details(pr['number'])
                title = full_pr.get('title') or ""
                body = full_pr.get('body') or ""

                # Check if session ID is in PR body or title
                if clean_id in title or clean_id in body:
                    matched_pr = pr
                    break

                # We could also check branch name in session prompt if it's there
                head_ref = full_pr.get('head', {}).get('ref', '')
                if head_ref and head_ref in prompt:
                    matched_pr = pr
                    break

        if matched_pr:
            print(f"Session {clean_id}: Matched with PR #{matched_pr['number']}. Triggering feedback...")
            # 3. Trigger feedback via orchestrator
            res = orch.trigger_jules_feedback(session_id)
            print(f"Result: {res}")
        else:
            print(f"Session {clean_id}: No matching PR found.")

if __name__ == "__main__":
    main()
