import os
import subprocess
import sys
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
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        if isinstance(e, subprocess.CalledProcessError):
            print(f"Error retrieving GitHub token: {e.stderr.strip()}", file=sys.stderr)
        return None

def get_gh_variable(name: str) -> Optional[str]:
    """Retrieves a GitHub repository variable using the gh CLI."""
    try:
        proc = subprocess.run(["gh", "variable", "get", name], capture_output=True, text=True, check=True)
        if proc.stdout.strip():
            return proc.stdout.strip()
    except subprocess.CalledProcessError as e:
        # Don't log 404s as errors if it just means variable isn't set yet
        if "not found" not in e.stderr.lower():
            print(f"Error getting variable {name}: {e.stderr.strip()}", file=sys.stderr)
    except Exception as e:
        print(f"Unexpected error getting variable {name}: {e}", file=sys.stderr)
    return None

def set_gh_variable(name: str, value: str) -> bool:
    """Sets a GitHub repository variable using the gh CLI."""
    try:
        subprocess.run(["gh", "variable", "set", name, "--body", value], check=True, capture_output=True, text=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error setting variable {name}: {e.stderr.strip()}", file=sys.stderr)
        return False
    except Exception as e:
        print(f"Unexpected error setting variable {name}: {e}", file=sys.stderr)
        return False
