import json
import subprocess
from pathlib import Path


class GitHubCliError(RuntimeError):
    pass


def _run_gh(args: list[str], repo: Path) -> str:
    result = subprocess.run(["gh", *args], cwd=repo, text=True, capture_output=True, check=False)
    if result.returncode != 0:
        raise GitHubCliError(result.stderr.strip() or result.stdout.strip())
    return result.stdout


def fetch_pr(pr_number: int, repo: Path) -> dict[str, object]:
    output = _run_gh(["pr", "view", str(pr_number), "--json", "title,body,files,headRefName,baseRefName"], repo)
    return json.loads(output)


def fetch_pr_diff(pr_number: int, repo: Path) -> str:
    return _run_gh(["pr", "diff", str(pr_number)], repo)


def create_issue(title: str, body_file: Path, labels: list[str], repo: Path) -> str:
    args = ["issue", "create", "--title", title, "--body-file", str(body_file)]
    for label in labels:
        args.extend(["--label", label])
    return _run_gh(args, repo)
