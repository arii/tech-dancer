import os
import re
import subprocess
import sys
from typing import Optional, Tuple, List, Dict
try:
    from github import Github, GithubException
    from github.Repository import Repository
except ImportError:
    print("Error: PyGithub not installed. Run 'pip install PyGithub'")
    sys.exit(1)

def get_github_token() -> Optional[str]:
    """Retrieves the GitHub token from environment or via gh CLI."""
    token = os.getenv("GITHUB_TOKEN")
    if token:
        return token
    try:
        result = subprocess.run(
            ["gh", "auth", "token"],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None

def get_repo_name() -> Optional[str]:
    """Auto-detect repo from git remote."""
    try:
        url = subprocess.check_output(
            ['git', 'config', '--get', 'remote.origin.url'],
            stderr=subprocess.DEVNULL, text=True
        ).strip()
        match = re.search(r'[:/]([^/]+/[^/.]+)(\.git)?$', url)
        return match.group(1) if match else url
    except Exception:
        return os.getenv("GH_REPO")

def get_ci_status(repo: Repository, sha: str) -> Tuple[str, List[str]]:
    """
    Aggregates CI status from Check Runs and Combined Status API for a given SHA.
    Returns (status_summary, failed_runs_list).
    """
    try:
        commit = repo.get_commit(sha)
        combined_status = commit.get_combined_status()
        check_runs = commit.get_check_runs()

        failed_runs = []
        in_progress = 0
        total_checks = 0

        for run in check_runs:
            total_checks += 1
            if run.status in ['in_progress', 'queued']:
                in_progress += 1
            elif run.conclusion not in ['success', 'skipped', 'neutral']:
                failed_runs.append(f"{run.name} ({run.conclusion or 'no conclusion'})")

        total_checks += combined_status.total_count
        if combined_status.state in ['failure', 'error']:
            for s in combined_status.statuses:
                if s.state in ['failure', 'error']:
                    failed_runs.append(s.context)

        if failed_runs or combined_status.state in ['failure', 'error']:
            summary = "FAILURE | FAILED: " + ", ".join(set(failed_runs)) if failed_runs else f"FAILURE | {combined_status.state.upper()}"
            return summary, list(set(failed_runs))

        if in_progress > 0 or combined_status.state == 'pending':
            return f"PENDING | {in_progress} runs in progress", []

        if total_checks > 0:
            return "SUCCESS | All checks passed", []

        return "No checks found", []
    except Exception as e:
        return f"Error fetching CI: {str(e)}", []

class CIFormatter:
    """Encapsulates CI status icon mapping and string formatting."""

    ICON_MAP: Dict[str, str] = {
        "FAILURE": "🔴",
        "PENDING": "🟡",
        "SUCCESS": "🟢"
    }

    @classmethod
    def format(cls, summary: str) -> str:
        """Returns a standardized string format for CI status."""
        icon = next((icon for key, icon in cls.ICON_MAP.items() if key in summary), "⚪")
        return f"{icon} {summary}"
