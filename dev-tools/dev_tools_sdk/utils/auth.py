from __future__ import annotations

import os
import subprocess
from typing import Sequence, Optional


class AuthError(RuntimeError):
    pass


def get_github_token(env_vars: Sequence[str] = ("CODEX_GH_TOKEN", "GH_TOKEN", "GITHUB_TOKEN", "PAT_TOKEN")) -> Optional[str]:
    """Retrieves the GitHub token from environment or via gh CLI."""
    for var in env_vars:
        value = os.getenv(var)
        if value:
            return value
    try:
        proc = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, check=False)
        if proc.returncode == 0 and proc.stdout.strip():
            return proc.stdout.strip()
    except Exception:
        pass
    return None


def get_github_client():
    """Returns a PyGithub instance authenticated with the detected token."""
    from github import Github, Auth
    token = get_github_token()
    if not token:
        raise AuthError("GitHub token not found")
    return Github(auth=Auth.Token(token))


def run_authenticated_gh(args: Sequence[str]) -> subprocess.CompletedProcess[str]:
    """Runs a gh CLI command with the detected token set in the environment."""
    env = os.environ.copy()
    token = get_github_token()
    if not token:
        raise AuthError("Missing GH_TOKEN/GITHUB_TOKEN.")
    env["GH_TOKEN"] = token
    env["GITHUB_TOKEN"] = token
    return subprocess.run(["gh", *args], env=env, capture_output=True, text=True, check=False)
