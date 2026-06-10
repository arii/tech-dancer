#!/usr/bin/env python3
"""
Unified GitHub and Git client for hrm-workspace operations.
Handles git commands and GitHub CLI interactions.
"""

import json
import logging
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional, Union

from common_config import HRM_REPO_DIR, setup_logging

logger = setup_logging("github_client")


class GitHubClient:
    """Client for interacting with Git and GitHub CLI."""

    def __init__(self, repo_path: Union[str, Path] = HRM_REPO_DIR):
        self.repo_path = Path(repo_path)
        self._check_dependencies()

    def _check_dependencies(self):
        """Ensure gh and git are installed."""
        if not shutil.which("gh"):
            logger.error("❌ GitHub CLI ('gh') is not installed.")
            # We don't exit here to allow library usage, but operations will fail
        if not shutil.which("git"):
            logger.error("❌ Git is not installed.")

    def run_cmd(self, cmd_list: List[str], check: bool = True) -> Optional[str]:
        """Run a shell command in the repo directory."""
        try:
            # Check if command exists before running to avoid FileNotFoundError
            executable = cmd_list[0]
            if not shutil.which(executable):
                 logger.error(f"❌ Executable '{executable}' not found.")
                 return None

            result = subprocess.run(
                cmd_list,
                capture_output=True,
                text=True,
                check=check,
                cwd=self.repo_path,
            )
            return result.stdout.strip()
        except subprocess.CalledProcessError as e:
            logger.error(f"❌ Command failed: {' '.join(cmd_list)}")
            logger.error(f"   Error: {e.stderr.strip()}")
            if check:
                raise
            return None

    def run_gh_json(self, cmd_list: List[str]) -> Any:
        """Run a gh command and parse JSON output."""
        try:
            output = self.run_cmd(cmd_list)
            if output:
                return json.loads(output)
            return None
        except (json.JSONDecodeError, subprocess.CalledProcessError):
            return None

    # --- Git Operations ---

    def current_branch(self) -> Optional[str]:
        return self.run_cmd(["git", "branch", "--show-current"], check=False)

    def checkout(self, branch: str, create: bool = False, source: Optional[str] = None) -> bool:
        """Checkout a branch, optionally creating it."""
        cmd = ["git", "checkout"]
        if create:
            cmd.append("-b")
        cmd.append(branch)
        if create and source:
            cmd.append(source)

        try:
            self.run_cmd(cmd)
            return True
        except subprocess.CalledProcessError:
            return False

    def pull(self, remote: str = "origin", branch: Optional[str] = None) -> bool:
        """Pull changes from remote."""
        cmd = ["git", "pull", remote]
        if branch:
            cmd.append(branch)
        try:
            self.run_cmd(cmd)
            return True
        except subprocess.CalledProcessError:
            return False

    def push(self, remote: str = "origin", branch: Optional[str] = None) -> bool:
        """Push changes to remote."""
        cmd = ["git", "push", remote]
        if branch:
            cmd.append(branch)
        try:
            self.run_cmd(cmd)
            return True
        except subprocess.CalledProcessError:
            return False

    def merge(self, branch: str, message: Optional[str] = None, abort_on_conflict: bool = True) -> bool:
        """Merge a branch into current."""
        cmd = ["git", "merge", branch, "--no-edit"]
        if message:
            cmd.extend(["-m", message])

        try:
            self.run_cmd(cmd)
            return True
        except subprocess.CalledProcessError:
            if abort_on_conflict:
                logger.warning(f"⚠️ Merge conflict with {branch}, aborting...")
                self.run_cmd(["git", "merge", "--abort"], check=False)
            return False

    def fetch(self, remote: str = "origin") -> bool:
        try:
            self.run_cmd(["git", "fetch", remote])
            return True
        except subprocess.CalledProcessError:
            return False

    def branch_exists(self, branch: str, remote: bool = False) -> bool:
        cmd = ["git", "show-ref", "--verify", "--quiet"]
        ref = f"refs/remotes/origin/{branch}" if remote else f"refs/heads/{branch}"
        cmd.append(ref)
        try:
            self.run_cmd(cmd)
            return True
        except subprocess.CalledProcessError:
            return False

    def get_file_content(self, branch: str, filepath: str) -> Optional[str]:
        """Fetch the content of a file at a specific branch/revision."""
        try:
            return self.run_cmd(["git", "show", f"{branch}:{filepath}"])
        except subprocess.CalledProcessError:
            logger.warning(f"Failed to fetch content for {filepath} at {branch}")
            return None

    def get_diff(self, base: str, head: str, filepath: str) -> Optional[str]:
        """Fetch the diff for a file between two revisions."""
        try:
            return self.run_cmd(["git", "diff", f"{base}...{head}", "--", filepath])
        except subprocess.CalledProcessError:
            logger.warning(f"Failed to fetch diff for {filepath} between {base} and {head}")
            return None

    def get_changed_files(self, base: str, head: str) -> List[str]:
        """Get a list of changed files between two revisions."""
        try:
            output = self.run_cmd(["git", "diff", "--name-only", f"{base}...{head}"])
            return output.splitlines() if output else []
        except subprocess.CalledProcessError:
            logger.warning(f"Failed to fetch changed files between {base} and {head}")
            return []

    # --- GitHub Operations ---

    def get_pr(self, number: int) -> Optional[Dict[str, Any]]:
        return self.run_gh_json(
            ["gh", "pr", "view", str(number), "--json", "number,title,body,headRefName,baseRefName,headRefOid,state,url,reviewDecision"]
        )

    def list_prs(self, state: str = "open", limit: int = 100) -> List[Dict[str, Any]]:
        return self.run_gh_json(
            [
                "gh",
                "pr",
                "list",
                "--state",
                state,
                "--limit",
                str(limit),
                "--json",
                "number,title,headRefName,baseRefName,headRefOid,state,url,reviewDecision,updatedAt",
            ]
        ) or []

    def get_issue(self, number: int) -> Optional[Dict[str, Any]]:
        return self.run_gh_json(
            ["gh", "issue", "view", str(number), "--json", "number,title,body,url,assignees,updatedAt"]
        )

    def list_issues(self, state: str = "open", limit: int = 100) -> List[Dict[str, Any]]:
        return self.run_gh_json(
            [
                "gh",
                "issue",
                "list",
                "--state",
                state,
                "--limit",
                str(limit),
                "--json",
                "number,title,assignees,updatedAt,url",
            ]
        ) or []

    def post_pr_comment(self, pr_number: int, body: str) -> bool:
        """Post a comment on a Pull Request."""
        try:
            self.run_cmd(["gh", "pr", "comment", str(pr_number), "--body", body])
            return True
        except subprocess.CalledProcessError:
            logger.error(f"Failed to post comment on PR #{pr_number}")
            return False
    def create_issue(self, title: str, body: str, labels: List[str] = None, assignees: List[str] = None) -> Optional[str]:
        """Create a GitHub issue."""
        cmd = ["gh", "issue", "create", "--title", title, "--body", body]
        if labels:
            for label in labels:
                cmd.extend(["--label", label])
        if assignees:
            for assignee in assignees:
                cmd.extend(["--assignee", assignee])

        return self.run_cmd(cmd)
