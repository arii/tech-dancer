import sys
import logging
from dev_tools.services.jules import JulesClient
from dev_tools.services.github import GitHubClient
from dev_tools.orchestrator import Orchestrator
from typing import Dict, Any, Optional, List
import time
import json
import re
import requests

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ExtendedJulesClient(JulesClient):
    """JulesClient subclass with extended timeouts for daemon use."""
    def get_messages(self, session_id: str) -> List[Dict[str, Any]]:
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


class JulesFeedbackDaemon:
    def __init__(self):
        self.jules = ExtendedJulesClient()
        self.github = GitHubClient()
        self.orchestrator = Orchestrator()
        # Ensure the orchestrator uses our extended client
        self.orchestrator.initialize_jules(self.jules)

    def run(self):
        logger.info("Starting Jules Feedback Daemon")
        try:
            sessions = self.jules.list_sessions(pageSize=50)
            logger.info(f"Found {len(sessions)} sessions")
        except Exception as e:
            logger.error(f"Error fetching sessions: {e}")
            sys.exit(1)

        # We defer PR fetching to _process_session for more targeted lookups
        # but we use a cache to avoid re-fetching same data
        self._pr_cache = {}

        for session in sessions:
            self._process_session(session)

    def _get_pr_for_session(self, session: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Optimized PR lookup for a session."""
        session_id = session.get("name", "").replace("sessions/", "")

        # 1. Try metadata/outputs first if available (fastest)
        if session.get("outputs") and isinstance(session["outputs"], list):
            for output in session["outputs"]:
                if output.get("pullRequest") and output["pullRequest"].get("url"):
                    match = re.search(r"/pull/(\d+)", output["pullRequest"]["url"])
                    if match:
                        pr_num = int(match.group(1))
                        if pr_num not in self._pr_cache:
                            self._pr_cache[pr_num] = self.github.fetch_pr_details(pr_num)
                        return self._pr_cache[pr_num]

        # 2. Try branch name from sourceContext (fast)
        branch = None
        if session.get("sourceContext"):
            branch = session["sourceContext"].get("githubRepoContext", {}).get("startingBranch")

        if branch:
            # Targeted PR search by branch
            prs = self.github.list_pull_requests(state='open') # Still need to list for branch match unless we use search API
            # Optimization: If we have many PRs, use search API for targeted branch lookup
            for pr in prs:
                if pr.get("headRefName") == branch:
                    if pr['number'] not in self._pr_cache:
                        self._pr_cache[pr['number']] = pr
                    return pr

        # 3. Fallback to session ID in body (Batch search)
        # Only do this if we haven't found it yet
        prs = self.github.search_pull_requests(f'"{session_id}" state:open', limit=1)
        if prs:
            return prs[0]

        return None

    def _process_session(self, session: Dict[str, Any]):
        session_id = session.get("name", "").replace("sessions/", "")
        if not session_id:
            return

        logger.info(f"Processing session {session_id}")
        matched_pr = self._get_pr_for_session(session)

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
    try:
        daemon = JulesFeedbackDaemon()
        daemon.run()
    except Exception as e:
        logger.error(f"Daemon crashed: {e}")
        sys.exit(1)
