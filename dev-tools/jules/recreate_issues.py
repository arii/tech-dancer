#!/usr/bin/env python3
import subprocess
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def run_command(command, cwd):
    """Runs a command and returns its output as a JSON object."""
    try:
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=True,
            cwd=cwd
        )
        return json.loads(result.stdout) if result.stdout else None
    except (subprocess.CalledProcessError, json.JSONDecodeError) as e:
        logging.error(f"Failed to run command '{' '.join(command)}': {e}")
        return None

def get_open_issues(repo_path):
    """Fetches all open issues from the specified repository."""
    logging.info("Fetching open issues...")
    command = ["gh", "issue", "list", "--state", "open", "--json", "number"]
    return run_command(command, repo_path)

def has_linked_pr(issue_number, repo_path):
    """Checks if an issue has any linked pull requests."""
    logging.info(f"Checking for linked PRs on issue #{issue_number}...")
    command = ["gh", "issue", "view", str(issue_number), "--json", "timelineItems"]
    timeline = run_command(command, repo_path)
    
    if timeline and "timelineItems" in timeline:
        for item in timeline["timelineItems"]:
            if item.get("__typename") == "CrossReferenceEvent" and "source" in item:
                if item["source"].get("type") == "PULL_REQUEST":
                    logging.info(f"  - Found linked PR for issue #{issue_number}")
                    return True
    
    logging.info(f"  - No linked PR found for issue #{issue_number}")
    return False

def close_and_reopen_issue(issue_number, repo_path):
    """Closes and then reopens an issue."""
    logging.info(f"Recreating issue #{issue_number}...")
    
    # Close the issue
    close_command = ["gh", "issue", "close", str(issue_number)]
    close_result = subprocess.run(close_command, capture_output=True, text=True, cwd=repo_path)
    if close_result.returncode != 0:
        logging.error(f"  - Failed to close issue #{issue_number}: {close_result.stderr}")
        return

    # Reopen the issue
    reopen_command = ["gh", "issue", "reopen", str(issue_number)]
    reopen_result = subprocess.run(reopen_command, capture_output=True, text=True, cwd=repo_path)
    if reopen_result.returncode != 0:
        logging.error(f"  - Failed to reopen issue #{issue_number}: {reopen_result.stderr}")
        return
        
    logging.info(f"  - Successfully recreated issue #{issue_number}")

def main():
    repo_path = "hrm"  # Target the hrm repository in the current workspace
    
    issues = get_open_issues(repo_path)
    if not issues:
        logging.info("No open issues found.")
        return
        
    for issue in issues:
        issue_number = issue["number"]
        if not has_linked_pr(issue_number, repo_path):
            close_and_reopen_issue(issue_number, repo_path)
            
if __name__ == "__main__":
    main()
