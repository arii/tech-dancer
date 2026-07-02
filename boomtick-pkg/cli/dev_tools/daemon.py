import sys
import logging
from dev_tools.services.jules import JulesClient
from dev_tools.services.github import GitHubClient
from dev_tools.orchestrator import Orchestrator
from typing import Dict, Any, Optional
import time
import json
import re
import requests

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Monkey-patch get_messages to use a longer timeout, to avoid random read timeouts from Jules API
def _get_messages_long(self, session_id: str):
    clean_id = self._get_clean_id(session_id, "sessions")
    url = f"{self.base_url}/sessions/{clean_id}/activities"
    # Set timeout to 30s instead of the default 10s
    response = requests.get(url, headers=self.headers, timeout=30)
    response.raise_for_status()
    activities = response.json().get("activities", [])
    messages = []
    for act in activities:
        content = self._extract_activity_content(act)
        if content:
            messages.append({
                "role": "user" if act.get("originator") == "user" else "jules",
                "content": content,
                "time": act.get("createTime")
            })
    return messages

JulesClient.get_messages = _get_messages_long


class JulesFeedbackDaemon:
    def __init__(self):
        self.jules = JulesClient()
        self.github = GitHubClient()
        self.orchestrator = Orchestrator()

    def run(self):
        logger.info("Starting Jules Feedback Daemon")
        try:
            sessions = self.jules.list_sessions(pageSize=50)
            logger.info(f"Found {len(sessions)} sessions")

            open_prs = self.github.list_pull_requests(state="open")
            logger.info(f"Found {len(open_prs)} open PRs")
        except Exception as e:
            logger.error(f"Error fetching initial data: {e}")
            return

        for session in sessions:
            self._process_session(session, open_prs)

    def _process_session(self, session: Dict[str, Any], prs: list):
        session_id = session.get("name", "").replace("sessions/", "")
        if not session_id:
            return

        logger.info(f"Processing session {session_id}")
        prompt = session.get("prompt", "")

        matched_pr = None
        for pr in prs:
            pr_title = pr.get("title", "") or ""
            pr_body = pr.get("body", "") or ""
            pr_branch = pr.get("headRefName", "") or ""

            # Match by session ID in PR body
            if session_id in pr_body:
                matched_pr = pr
                break

            # Match by PR branch name in prompt
            if pr_branch and pr_branch in prompt:
                matched_pr = pr
                break

            # Try matching PR title as a substring of prompt or vice-versa
            if pr_title and (pr_title.lower() in prompt.lower() or prompt.lower() in pr_title.lower()):
                matched_pr = pr
                break

        if not matched_pr:
            logger.info(f"No matching PR found for session {session_id}")
            return

        logger.info(f"Matched PR #{matched_pr['number']} ({matched_pr.get('headRefName')}) for session {session_id}")

        try:
            messages = self.jules.get_messages(session_id)
        except Exception as e:
            logger.error(f"Error getting messages for session {session_id}: {e}")
            return

        if not messages:
            logger.info(f"No messages for session {session_id}")
            return

        last_message = messages[-1]
        if last_message.get("role") == "user":
            logger.info(f"Last message from user, skipping feedback to avoid double-feedback for {session_id}")
            return

        if last_message.get("role") == "jules":
            logger.info(f"Triggering feedback for session {session_id} matching PR #{matched_pr['number']}")
            try:
                # Use orchestrator.trigger_jules_feedback which executes CI validation logic
                res = self.orchestrator.trigger_jules_feedback(session_id)
                logger.info(f"Feedback triggered successfully: {res.get('status', 'unknown')}")
            except Exception as e:
                logger.error(f"Error triggering feedback for {session_id}: {e}")

if __name__ == '__main__':
    daemon = JulesFeedbackDaemon()
    daemon.run()
