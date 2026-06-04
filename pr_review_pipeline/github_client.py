import subprocess
import json
import os
from typing import Dict, Any, List, Optional

class GitHubClient:
    def __init__(self, repo: Optional[str] = None):
        self.repo = repo or os.environ.get("GITHUB_REPO") or "owner/repo"

    def _run_gh(self, args: List[str]) -> str:
        try:
            result = subprocess.run(["gh"] + args, capture_output=True, text=True, check=True)
            return result.stdout
        except subprocess.CalledProcessError as e:
            print(f"GH Error: {e.stderr}")
            raise

    def get_pr_details(self, pr_number: int) -> Dict[str, Any]:
        output = self._run_gh(["pr", "view", str(pr_number), "--json", "title,body,number,baseRefName,headRefName"])
        return json.loads(output)

    def get_pr_diff(self, pr_number: int) -> str:
        return self._run_gh(["pr", "diff", str(pr_number)])

    def create_issue(self, title: str, body: str, labels: List[str] = []) -> str:
        args = ["issue", "create", "--title", title, "--body", body]
        for label in labels:
            args.extend(["--label", label])
        return self._run_gh(args).strip()
