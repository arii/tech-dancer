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

_gh_available = None

def get_gha_variable(name: str) -> Optional[str]:
    """Retrieves a GitHub Actions variable via the gh CLI with robust error handling."""
    global _gh_available

    # 1. Check if gh is installed (cached)
    if _gh_available is None:
        try:
            subprocess.run(["gh", "--version"], capture_output=True, check=True)
            _gh_available = True
        except (subprocess.CalledProcessError, FileNotFoundError):
            _gh_available = False

    if not _gh_available:
        return None

    try:
        result = subprocess.run(
            ["gh", "variable", "get", name, "--body"],
            capture_output=True,
            text=True
        )

        if result.returncode == 0:
            return result.stdout.strip()

        stderr = result.stderr.lower()

        # 2. Handle specific failure modes with clear feedback
        if "not authenticated" in stderr or "not logged in" in stderr:
            # Only warn once per session to avoid spam
            if not hasattr(get_gha_variable, "_warned_auth"):
                print(f"⚠️  Warning: 'gh' CLI not authenticated. Run 'gh auth login' to fetch baselines.", file=sys.stderr)
                setattr(get_gha_variable, "_warned_auth", True)
        elif "could not find" in stderr:
            # Expected if variable isn't set, return None silently
            return None
        elif "no git repository" in stderr:
            if not hasattr(get_gha_variable, "_warned_repo"):
                print(f"⚠️  Warning: Not a git repository or no remote configured for 'gh' CLI.", file=sys.stderr)
                setattr(get_gha_variable, "_warned_repo", True)
        else:
            # Generic non-zero error handling
            if result.stderr:
                print(f"❌ Error fetching GHA variable '{name}': {result.stderr.strip()}", file=sys.stderr)

        return None
    except Exception as e:
        print(f"❌ Unexpected error calling 'gh' CLI: {e}", file=sys.stderr)
        return None
