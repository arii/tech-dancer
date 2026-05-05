import os
import sys
import subprocess
import json
from typing import Optional, Union, List

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

def run_command(cmd: Union[str, List[str]], shell: bool = False, check: bool = True, input_str: Optional[str] = None, log_on_error: bool = True) -> Union[str, subprocess.CompletedProcess]:
    """
    Runs a command, captures stdout/stderr, and handles errors with granular logging.
    If check=True, returns stdout as string.
    If check=False, returns the full CompletedProcess object.
    """
    try:
        proc = subprocess.run(
            cmd,
            shell=shell,
            input=input_str,
            capture_output=True,
            text=True,
            check=check
        )
        return proc.stdout.strip() if check else proc
    except subprocess.CalledProcessError as e:
        if log_on_error:
            print(f"❌ Command failed (exit {e.returncode}): {e.cmd}", file=sys.stderr)
            if e.stdout:
                print(f"--- stdout ---\n{e.stdout.strip()}", file=sys.stderr)
            if e.stderr:
                print(f"--- stderr ---\n{e.stderr.strip()}", file=sys.stderr)

        if check:
            raise CLIError(f"Command failed with exit code {e.returncode}", code=e.returncode)
        # Should not be reachable because subprocess.run with check=False doesn't raise CalledProcessError
        return subprocess.CompletedProcess(e.cmd, e.returncode, e.stdout, e.stderr)

def get_repo_name() -> Optional[str]:
    """Auto-detect repo from git remote."""
    try:
        # Using run_command here with check=False to avoid noisy logs for a common discovery step
        res = run_command(['git', 'config', '--get', 'remote.origin.url'], check=False, log_on_error=False)
        if res.returncode != 0:
            return os.getenv("GH_REPO")
        url = res.stdout.strip()
        if not url:
            return os.getenv("GH_REPO")
        import re
        match = re.search(r'[:/]([^/]+/[^/.]+)(\.git)?$', url)
        return match.group(1) if match else url
    except Exception:
        return os.getenv("GH_REPO")

class GHAConfigManager:
    """Manages GitHub Actions variables with local caching and robust error handling."""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(GHAConfigManager, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if getattr(self, "_initialized", False):
            return
        self.config_path = os.path.join(os.path.dirname(__file__), "config.json")
        self.gh_available = None
        self.warned_auth = False
        self.warned_repo = False
        self.cache = self._load_cache()
        self._initialized = True

    def _load_cache(self) -> dict:
        if os.path.exists(self.config_path):
            try:
                with open(self.config_path, "r") as f:
                    return json.load(f)
            except Exception:
                return {}
        return {}

    def _save_cache(self):
        try:
            with open(self.config_path, "w") as f:
                json.dump(self.cache, f, indent=2)
        except Exception:
            pass

    def get_variable(self, name: str) -> Optional[str]:
        """Retrieves a variable, checking local cache first, then the gh CLI."""
        # 1. Check local cache
        if name in self.cache:
            return str(self.cache[name])

        # 2. Check gh CLI availability
        if self.gh_available is None:
            try:
                subprocess.run(["gh", "--version"], capture_output=True, check=True)
                self.gh_available = True
            except (subprocess.CalledProcessError, FileNotFoundError):
                self.gh_available = False

        if not self.gh_available:
            return None

        # 3. Fetch from gh CLI
        try:
            result = subprocess.run(
                ["gh", "variable", "get", name],
                capture_output=True,
                text=True
            )

            if result.returncode == 0:
                val = result.stdout.strip()
                self.cache[name] = val
                self._save_cache()
                return val

            stderr = result.stderr.lower()
            if "not authenticated" in stderr or "not logged in" in stderr or "gh_token" in stderr:
                if not self.warned_auth:
                    print(f"⚠️  Warning: 'gh' CLI not authenticated. Run 'gh auth login' to fetch baselines.", file=sys.stderr)
                    self.warned_auth = True
            elif "could not find" in stderr:
                return None
            elif "no git repository" in stderr:
                if not self.warned_repo:
                    print(f"⚠️  Warning: Not a git repository or no remote configured for 'gh' CLI.", file=sys.stderr)
                    self.warned_repo = True
            else:
                if result.stderr:
                    print(f"❌ Error fetching GHA variable '{name}': {result.stderr.strip()}", file=sys.stderr)
        except Exception as e:
            print(f"❌ Unexpected error calling 'gh' CLI: {e}", file=sys.stderr)

        return None

    def set_variable(self, name: str, value: str) -> bool:
        """Sets a variable using the gh CLI and updates local cache."""
        # 1. Update local cache
        self.cache[name] = value
        self._save_cache()

        # 2. Check gh CLI availability
        if self.gh_available is None:
            try:
                subprocess.run(["gh", "--version"], capture_output=True, check=True)
                self.gh_available = True
            except (subprocess.CalledProcessError, FileNotFoundError):
                self.gh_available = False

        if not self.gh_available:
            return False

        # 3. Set via gh CLI
        try:
            subprocess.run(
                ["gh", "variable", "set", name, "--body", str(value)],
                check=True,
                capture_output=True
            )
            return True
        except Exception as e:
            print(f"❌ Error setting GHA variable '{name}': {e}", file=sys.stderr)
            return False

def get_gha_variable(name: str) -> Optional[str]:
    """Helper function to retrieve a GHA variable via the global manager."""
    return GHAConfigManager().get_variable(name)

def set_gha_variable(name: str, value: str) -> bool:
    """Helper function to set a GHA variable via the global manager."""
    return GHAConfigManager().set_variable(name, value)
