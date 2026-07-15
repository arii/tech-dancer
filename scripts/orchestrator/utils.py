# pylint: disable=missing-docstring
import os
import re
import subprocess
import time

CLI_BASE = ["python3", "-m", "dev_tools.cli"]


def run_cli(args, suppress_errors=False):
    """Executes a BoomTick CLI command and returns the standard output."""
    cmd = CLI_BASE + args
    env = os.environ.copy()
    existing_path = env.get("PYTHONPATH", "")
    local_paths = "boomtick-pkg/cli:boomtick-pkg/cli/dev_tools"
    env["PYTHONPATH"] = f"{local_paths}:{existing_path}" if existing_path else local_paths
    env["CI"] = "true"
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True, env=env)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        if not suppress_errors:
            print(f"CLI Error: {e.stderr}")
        return "" if suppress_errors else None


def get_session_id():
    """Runs 'agent sync' and parses the output for the active session ID."""
    stdout = run_cli(["agent", "sync"])
    if not stdout:
        return None
    match = re.search(r"(?:Session ID|id):\s*([a-zA-Z0-9_-]+)", stdout, re.IGNORECASE)
    return match.group(1) if match else None


def wait_for_agent(session_id, poll_interval=10, timeout=300, max_retries=30):
    """Blocks execution until the agent reaches a terminal state or requests input."""
    print(f"Polling state for session {session_id}...")
    start_time = time.time()
    retries = 0
    while True:
        if time.time() - start_time > timeout:
            raise TimeoutError(f"Timeout of {timeout}s exceeded while waiting for session {session_id}.")
        if retries >= max_retries:
            raise RuntimeError(f"Max retries of {max_retries} exceeded while waiting for session {session_id}.")

        messages = run_cli(["agent", "messages", session_id])
        if messages:
            is_completed = "SUCCESS" in messages or "ABORTED_THROTTLED" in messages
            is_waiting = "waiting for input" in messages.lower() or "failed" in messages.lower()
            if is_completed or is_waiting:
                print("Agent 1 is ready.")
                break
        retries += 1
        time.sleep(poll_interval)
