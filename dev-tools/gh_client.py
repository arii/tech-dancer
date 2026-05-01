import os
import subprocess
from typing import Optional

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

def get_gh_variable(name: str) -> Optional[str]:
    """Retrieves a GitHub repository variable using the gh CLI."""
    try:
        proc = subprocess.run(["gh", "variable", "get", name], capture_output=True, text=True)
        if proc.returncode == 0 and proc.stdout.strip():
            return proc.stdout.strip()
    except Exception:
        pass
    return None

def set_gh_variable(name: str, value: str) -> bool:
    """Sets a GitHub repository variable using the gh CLI."""
    try:
        subprocess.run(["gh", "variable", "set", name, "--body", value], check=True)
        return True
    except Exception:
        return False
