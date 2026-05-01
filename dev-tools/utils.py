import os
import subprocess
from typing import Optional

class CLIError(Exception):
    def __init__(self, message, code=1, data=None):
        self.message = message
        self.code = code
        self.data = data
        super().__init__(self.message)

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
        import re
        match = re.search(r'[:/]([^/]+/[^/.]+)(\.git)?$', url)
        return match.group(1) if match else url
    except Exception:
        return os.getenv("GH_REPO")

def get_gha_variable(name: str) -> Optional[str]:
    """Retrieves a GitHub Actions variable via the gh CLI."""
    try:
        # Check if gh is installed
        subprocess.run(["gh", "--version"], capture_output=True, check=True)

        result = subprocess.run(
            ["gh", "variable", "get", name, "--body"],
            capture_output=True,
            text=True
        )
        if result.returncode == 0:
            return result.stdout.strip()

        # Log specific warning for auth issues (return code 1 with specific message)
        if "not authenticated" in result.stderr.lower():
            print(f"⚠️  Warning: 'gh' CLI not authenticated. Cannot fetch GHA variable '{name}'.")
        elif "could not find" not in result.stderr.lower():
            # If it's not a "not found" error, it might be something else worth warning about
            pass

        return None
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None
