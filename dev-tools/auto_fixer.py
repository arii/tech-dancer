import os
import sys
import subprocess
import json

# Add dev-tools/tdw_services to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'tdw_services'))

from services.jules import JulesClient

def process_session(client, session_id):
    activities = client.list_messages(session_id)
    if not activities:
        return False, "No activities"

    # Search activities for the last message
    last_msg = ""
    for act in reversed(activities):
        if "agentMessaged" in act:
            last_msg = act["agentMessaged"].get("agentMessage", "")
            break
        elif "userMessaged" in act:
            um = act["userMessaged"]
            if isinstance(um, str):
                last_msg = um
            elif isinstance(um, dict) and "userMessage" in um:
                um_sub = um["userMessage"]
                last_msg = um_sub if isinstance(um_sub, str) else um_sub.get("body", "")
            break

    if "CI failed" in last_msg or "requirement for a code patch" in last_msg:
        return True, last_msg
    return False, last_msg

def run_repair():
    print("Running repair.py...")
    repair_script = os.path.join(os.path.dirname(__file__), "repair.py")
    result = subprocess.run([sys.executable, repair_script], capture_output=True, text=True)
    print(result.stdout)
    print(result.stderr)
    return result.returncode == 0

def main():
    api_key = os.environ.get("JULES_API_KEY")
    if not api_key:
        print("JULES_API_KEY environment variable is not set.")
        sys.exit(1)

    client = JulesClient(api_key=api_key)
    print("Fetching sessions...")
    sessions = client.list_sessions(pageSize=50)
    print(f"Found {len(sessions)} sessions.")

    for session in sessions:
        session_id = session.get("name")
        details = client.get_session(session_id)
        if not details:
            continue

        state = details.get("state")
        if state in ("IN_PROGRESS", "AWAITING_USER_FEEDBACK"):
            print(f"Checking session {session_id} in state {state}...")
            needs_fix, msg = process_session(client, session_id)
            if needs_fix:
                print(f"  -> Needs fix. Trigger: {msg[:100]}")
                success = run_repair()
                if success:
                    print("  -> Repair finished. Sending resolution message...")
                    client.send_message(session_id, "I have applied the fix locally and resolved the issue using repair.py.")
                else:
                    print("  -> Repair failed or no actionable errors were found. Sending update...")
                    client.send_message(session_id, "I attempted to run repair.py, but no actionable errors were fixed.")

if __name__ == "__main__":
    main()
