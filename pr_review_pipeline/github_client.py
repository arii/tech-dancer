import os
import requests
from typing import Dict, Any, List, Optional
from github import Github, Auth
from pr_review_pipeline.config import settings

class GitHubClient:
    def __init__(self, repo: Optional[str] = None):
        self.repo_name = repo or settings.github_repo

        # Determine authentication token
        token = os.environ.get("GH_TOKEN")
        if not token:
            try:
                import subprocess
                token = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, check=True).stdout.strip()
            except Exception:
                pass

        if token:
            self.gh = Github(auth=Auth.Token(token))
            self.token = token
        else:
            self.gh = Github()
            self.token = None

        self.repo = self.gh.get_repo(self.repo_name)

    def get_pr_details(self, pr_number: int) -> Dict[str, Any]:
        pr = self.repo.get_pull(pr_number)
        return {
            "title": pr.title,
            "body": pr.body,
            "number": pr.number,
            "baseRefName": pr.base.ref,
            "headRefName": pr.head.ref
        }

    def get_pr_diff(self, pr_number: int) -> str:
        url = f"https://api.github.com/repos/{self.repo_name}/pulls/{pr_number}"
        headers = {"Accept": "application/vnd.github.v3.diff"}
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"

        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.text

    def create_issue(self, title: str, body: str, labels: List[str] = []) -> str:
        issue = self.repo.create_issue(
            title=title,
            body=body,
            labels=labels
        )
        return issue.html_url
