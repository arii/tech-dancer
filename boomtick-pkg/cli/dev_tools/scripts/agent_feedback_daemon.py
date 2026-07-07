import sys
import os
import re
sys.path.append('boomtick-pkg/cli')
from dev_tools.services.jules import JulesClient
from dev_tools.services.github import GitHubClient

jc = JulesClient()
gh = GitHubClient()

sessions = jc.list_sessions(pageSize=50)
active_sessions = [s for s in sessions if s.get("state") == "IN_PROGRESS"]
prs = gh.list_pull_requests(state='open', limit=100)

for s in active_sessions:
    session_id = s.get("name")
    prompt = s.get("prompt", "")
    clean_id = session_id.replace("sessions/", "")

    matched_pr = None

    for pr in prs:
        title = pr.get("title", "")
        body = pr.get("body", "") or ""
        headRefName = pr.get("headRefName", pr.get("head", {}).get("ref", ""))

        # 1. Look for session ID in PR body
        if clean_id in body or session_id in body:
            matched_pr = pr
            break

        # 2. Look for PR branch name in session prompt
        if headRefName and headRefName in prompt:
            matched_pr = pr
            break

        # 3. Look for session ID in branch name
        if headRefName and clean_id in headRefName:
            matched_pr = pr
            break

        # 4. Title substring
        if (title and title in prompt) or (prompt and prompt in title):
            matched_pr = pr
            break

    # 5. Extract Task ID from PR body to match with Jules sessions (Jules outputs a standard Task ID footer)
    if not matched_pr:
        for pr in prs:
            body = pr.get("body", "") or ""
            # *PR created automatically by Jules for task [7038220722506047760](...)*
            match = re.search(r"task\s*\[(\d+)\]", body)
            if match and match.group(1) == clean_id:
                matched_pr = pr
                break

    if not matched_pr:
        print(f"[{session_id}] No PR matched")
        continue

    print(f"[{session_id}] Matched PR: {matched_pr['number']} ({matched_pr['title']})")

    messages = jc.get_messages(session_id)
    if not messages:
        print(f"[{session_id}] No messages")
        continue

    last_msg = messages[-1]
    print(f"[{session_id}] Last message role: {last_msg.get('role')}")

    if last_msg.get('role') == 'jules':
        print(f"[{session_id}] Triggering feedback...")
        cmd = f"PYTHONPATH=boomtick-pkg/cli python3 boomtick-pkg/cli/dev_tools/td_cli.py jules trigger-feedback {session_id}"
        os.system(cmd)
    else:
        print(f"[{session_id}] Skipping, last message is from user")
