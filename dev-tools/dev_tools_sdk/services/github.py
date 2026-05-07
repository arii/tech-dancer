from __future__ import annotations

import json
from dataclasses import dataclass

from ..utils.auth import run_authenticated_gh


@dataclass
class PullRequestSummary:
    number: int
    title: str
    author: str
    state: str


class GitHubService:
    def __init__(self, repo: str | None = None):
        self.repo = repo

    def _repo_args(self) -> list[str]:
        return ["-R", self.repo] if self.repo else []

    def view_pr(self, number: int) -> PullRequestSummary:
        args = ["pr", "view", str(number), "--json", "number,title,author,state", *self._repo_args()]
        res = run_authenticated_gh(args)
        if res.returncode != 0:
            raise RuntimeError(res.stderr.strip() or "Failed to view pull request.")
        payload = json.loads(res.stdout)
        return PullRequestSummary(
            number=payload["number"],
            title=payload["title"],
            author=payload["author"]["login"],
            state=payload["state"],
        )

    def list_changed_files(self, number: int) -> list[str]:
        args = ["pr", "view", str(number), "--json", "files", *self._repo_args()]
        res = run_authenticated_gh(args)
        if res.returncode != 0:
            raise RuntimeError(res.stderr.strip() or "Failed to read PR files.")
        payload = json.loads(res.stdout)
        return [f["path"] for f in payload.get("files", [])]
