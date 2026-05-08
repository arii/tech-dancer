import os
import subprocess
import json
import base64
from typing import Optional, List, Dict, Any
import urllib.request
import urllib.parse

class GitHubClient:
    def __init__(self, token: Optional[str] = None, repo: Optional[str] = None):
        self.token = token or os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
        if not self.token:
            raise ValueError("Missing GITHUB_TOKEN environment variable.")
        self.repo = repo or os.environ.get("GITHUB_REPOSITORY") or os.environ.get("GH_REPO")
        if not self.repo:
            self.repo = self._detect_repo()
        self.base_url = "https://api.github.com"

    def _detect_repo(self) -> str:
        try:
            res = self.run_authenticated_gh(['config', '--get', 'remote.origin.url'])
            url = res.strip()
            import re
            match = re.search(r'[:/]([^/]+/[^/.]+)(\.git)?$', url)
            return match.group(1) if match else url
        except Exception:
            return ""

    def run_authenticated_gh(self, command_args: List[str]) -> str:
        """Executes a GH CLI command using the PAT from environment."""
        env = os.environ.copy()
        # Forces GH to use the token without needing 'gh auth login'
        env["GH_TOKEN"] = self.token
        env["GITHUB_TOKEN"] = self.token

        proc = subprocess.run(["gh"] + command_args, env=env, capture_output=True, text=True)
        if proc.returncode != 0:
            raise Exception(f"GH command failed: {proc.stderr}")
        return proc.stdout

    def _request(self, method: str, path: str, json_data: Optional[Dict] = None, is_text: bool = False) -> Any:
        url = f"{self.base_url}{path}"
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Accept": "application/vnd.github.v3.diff" if is_text else "application/vnd.github.v3+json",
        }

        req_data = None
        if json_data:
            req_data = json.dumps(json_data).encode("utf-8")
            headers["Content-Type"] = "application/json"

        req = urllib.request.Request(url, data=req_data, headers=headers, method=method)

        try:
            with urllib.request.urlopen(req) as response:
                if is_text:
                    return response.read().decode('utf-8')
                return json.loads(response.read().decode('utf-8'))
        except urllib.error.URLError as e:
             raise Exception(f"GitHub API Error: {e}")

    def fetch_pr_details(self, number: int) -> Dict[str, Any]:
        return self._request('GET', f'/repos/{self.repo}/pulls/{number}')

    def fetch_pr_diff(self, number: int) -> str:
        return self._request('GET', f'/repos/{self.repo}/pulls/{number}', is_text=True)

    def fetch_prs_for_commit(self, commit_sha: str) -> List[Dict[str, Any]]:
        return self._request('GET', f'/repos/{self.repo}/commits/{commit_sha}/pulls')

    def fetch_check_runs(self, ref: str) -> List[Dict[str, Any]]:
        try:
            data = self._request('GET', f'/repos/{self.repo}/commits/{ref}/check-runs')
            return [{
                'name': run.get('name'),
                'status': run.get('status'),
                'conclusion': run.get('conclusion'),
                'url': run.get('html_url')
            } for run in data.get('check_runs', [])]
        except:
            return []

    def create_issue_comment(self, number: int, body: str) -> Dict[str, Any]:
        return self._request('POST', f'/repos/{self.repo}/issues/{number}/comments', json_data={'body': body})

    def create_review(self, number: int, body: str, comments: List[Dict[str, Any]], event: str) -> Dict[str, Any]:
        data = {
            "body": body,
            "event": event,
            "comments": comments
        }
        return self._request('POST', f'/repos/{self.repo}/pulls/{number}/reviews', json_data=data)

    def download_zipball(self, ref: str, dest: str = "repo.zip") -> None:
        """A stateless download helper for the Orchestrator"""
        self.run_authenticated_gh(["api", f"/repos/{self.repo}/zipball/{ref}", ">", dest])
        subprocess.run(["unzip", "-o", dest], check=True)
