#!/usr/bin/env python3
import os
import sys
import json
import logging
import subprocess

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Add CLI package to python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'boomtick-pkg', 'cli'))
from dev_tools.services.jules import JulesClient
from dev_tools.services.github import GitHubClient

def main():
    try:
        jules_client = JulesClient()
        gh_client = GitHubClient()

        # 1. List active sessions
        logger.info("Listing active Jules sessions...")
        sessions = jules_client.list_sessions(pageSize=50)
        active_sessions = [s for s in sessions if s.get('state') == 'IN_PROGRESS']
        logger.info(f"Found {len(active_sessions)} active sessions.")

        if not active_sessions:
            logger.info("No active sessions to process.")
            return

        # 2. Fetch open PRs
        logger.info("Fetching open PRs...")
        prs = gh_client.list_pull_requests(state='open')
        pr_details = {}
        for pr in prs:
            pr_details[pr.get('number')] = {
                "title": pr.get('title', ''),
                "body": pr.get('body') or "",
                "branch": pr.get('head', {}).get('ref', ''),
            }
        logger.info(f"Fetched {len(pr_details)} open PRs.")

        # 3. Process sessions
        for session in active_sessions:
            session_id = session.get('name')
            logger.info(f"Processing session {session_id}...")

            # Fetch message history
            messages = jules_client.get_messages(session_id)
            if not messages:
                logger.info(f"No messages found for {session_id}, skipping.")
                continue

            last_message = messages[-1]
            if last_message.get('role') != 'jules':
                logger.info(f"Skipping {session_id} - last message is from user (avoids double feedback).")
                continue

            # Match session to PR
            prompt = session.get('prompt', '')
            source_context = session.get('sourceContext', {})
            github_repo_context = source_context.get('githubRepoContext', {})
            starting_branch = github_repo_context.get('startingBranch')

            matched_pr_num = None
            for pr_number, pr in pr_details.items():
                if (pr['title'] and pr['title'] in prompt) or \
                   (starting_branch and starting_branch == pr['branch']) or \
                   (session_id and session_id in pr['body']):
                    matched_pr_num = pr_number
                    break

            if not matched_pr_num:
                logger.info(f"No matching PR found for {session_id}.")
                continue

            logger.info(f"Matched {session_id} to PR #{matched_pr_num}.")

            # 4. Trigger full feedback loop for the PR
            logger.info(f"Running full feedback pipeline for PR #{matched_pr_num} using trigger_jules_feedback...")

            try:
                cmd = ["python3", "boomtick-pkg/cli/dev_tools/td_cli.py", "--no-json", "agent", "trigger-feedback", session_id]
                env = os.environ.copy()
                env["PYTHONPATH"] = os.path.join(os.getcwd(), "boomtick-pkg/cli")
                res = subprocess.run(cmd, env=env, check=True, capture_output=True, text=True)
                logger.info(f"Triggered feedback for {session_id}. Result: {res.stdout}")
            except subprocess.CalledProcessError as e:
                logger.error(f"Error triggering feedback for {session_id}: {e.stderr}")

    except Exception as e:
        logger.error(f"Error in daemon: {e}", exc_info=True)

if __name__ == "__main__":
    main()
