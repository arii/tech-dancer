from __future__ import annotations

import json
import os
import subprocess
import requests
from dataclasses import dataclass

from ..utils.auth import get_github_token


@dataclass
class PullRequestSummary:
    number: int
    title: str
    author: str
    state: str


class GitHubService:
    def __init__(self, repo: str | None = None):
        self.repo = repo or os.environ.get("GITHUB_REPOSITORY") or os.environ.get("GH_REPO")
        if not self.repo:
            self.repo = self._detect_repo()
        self.token = get_github_token()

    def _detect_repo(self) -> str:
        try:
            proc = subprocess.run(['git', 'config', '--get', 'remote.origin.url'], capture_output=True, text=True)
            url = proc.stdout.strip()
            import re
            match = re.search(r'[:/]([^/]+/[^/.]+)(\.git)?$', url)
            if not match:
                raise ValueError("Could not parse repository URL.")
            return match.group(1)
        except Exception:
            return ""

    def _request(self, method: str, path: str) -> dict:
        base_url = os.environ.get("GITHUB_API_URL", "https://api.github.com")
        url = f"{base_url}{path}"
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Accept": "application/vnd.github.v3+json",
        }
        timeout = int(os.environ.get("GITHUB_API_TIMEOUT", 30))
        try:
            response = requests.request(method, url, headers=headers, timeout=timeout)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            # We avoid logging the full exception which might contain sensitive URL parameters
            # by relying on the safe requests stringification, but we can be extra careful.
            status_code = getattr(e.response, 'status_code', 'Unknown')
            raise RuntimeError(f"GitHub API Error {status_code} on {method} request.")

    def view_pr(self, number: int) -> PullRequestSummary:
        try:
            payload = self._request('GET', f'/repos/{self.repo}/pulls/{number}')
        except Exception as e:
            raise RuntimeError(f"Failed to view pull request: {e}")
        return PullRequestSummary(
            number=payload["number"],
            title=payload["title"],
            author=payload.get("user", {}).get("login", ""),
            state=payload["state"],
        )

    def list_changed_files(self, number: int) -> list[str]:
        try:
            payload = self._request('GET', f'/repos/{self.repo}/pulls/{number}/files')
        except Exception as e:
            raise RuntimeError(f"Failed to read PR files: {e}")
        return [f["filename"] for f in payload]

    def diff_stats(self, number: int) -> dict[str, int]:
        try:
            payload = self._request('GET', f'/repos/{self.repo}/pulls/{number}')
        except Exception as e:
            raise RuntimeError(f"Failed to read PR stats: {e}")
        return {
            "additions": int(payload.get("additions", 0)),
            "deletions": int(payload.get("deletions", 0)),
            "changed_files": int(payload.get("changed_files", 0)),
        }

    def resolve_conflicts(self, number: int, dry_run: bool = True) -> str:
        mode = "dry-run" if dry_run else "execute"
        return f"resolve_conflicts(pr={number}, mode={mode}) not yet automated"
