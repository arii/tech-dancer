import os
import re
import subprocess
import sys
from typing import Optional, Tuple, List
try:
    from github import Github, GithubException, Repository
except ImportError:
    print("Error: PyGithub not installed. Run 'pip install PyGithub'")
    sys.exit(1)

def get_github_token() -> Optional[str]:
    """Retrieves the GitHub token via gh CLI, falls back to env var."""
    try:
        out = subprocess.check_output(
            ['env', '-u', 'GITHUB_TOKEN', 'gh', 'auth', 'token'],
            stderr=subprocess.DEVNULL, text=True
        ).strip()
        if out:
            return out
    except Exception:
        pass
    return os.getenv("GITHUB_TOKEN")

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

def get_ci_status(repo, sha: str) -> Tuple[str, List[str]]:
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
            if run.conclusion in ['failure', 'error', 'timed_out', 'action_required']:
                failed_runs.append(run.name)
            elif run.status in ['in_progress', 'queued']:
                in_progress += 1

        total_checks += combined_status.total_count
        if combined_status.state in ['failure', 'error']:
            for s in combined_status.statuses:
                if s.state in ['failure', 'error']:
                    failed_runs.append(s.context)

        if failed_runs:
            return f"FAILURE | FAILED: {', '.join(set(failed_runs))}", list(set(failed_runs))
        elif in_progress > 0 or combined_status.state == 'pending':
            return f"PENDING | {in_progress} runs in progress", []
        elif total_checks > 0:
            return "SUCCESS | All checks passed", []
        else:
            return "No checks found", []
    except Exception as e:
        return f"Error fetching CI: {str(e)}", []

def get_ci_icon(summary: str) -> str:
    """Returns a visual icon for the CI status summary."""
    if "FAILURE" in summary: return "🔴"
    if "PENDING" in summary: return "🟡"
    if "SUCCESS" in summary: return "🟢"
    return "⚪"
