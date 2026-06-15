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

def run_command(cmd: Union[str, List[str]], shell: bool = False, check: bool = True, input_str: Optional[str] = None, log_on_error: bool = True) -> Union[str, subprocess.CompletedProcess]:
    """
    Unified command execution helper.
    """
    proc = subprocess.run(
        cmd,
        shell=shell,
        input=input_str,
        capture_output=True,
        text=True,
        check=False
    )
    if proc.returncode != 0 and log_on_error:
        print(f"❌ Command failed (exit {proc.returncode}): {proc.args}", file=sys.stderr)
        if proc.stdout:
            print(f"--- stdout ---\n{proc.stdout.strip()}", file=sys.stderr)
        if proc.stderr:
            print(f"--- stderr ---\n{proc.stderr.strip()}", file=sys.stderr)

    if check:
        if proc.returncode != 0:
            raise CLIError(f"Command failed with exit code {proc.returncode}", code=proc.returncode)
        return proc.stdout.strip()

    return proc

def get_repo_name() -> Optional[str]:
    """Auto-detect repo from environment variables or git remote."""
    repo = os.getenv("GITHUB_REPOSITORY") or os.getenv("GH_REPO")
    if repo:
        return repo

    try:
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
        return None

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
        # Move project config to standard path logic? The utils file uses __file__
        self.config_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "config.json")
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
        if name in self.cache:
            return str(self.cache[name])

        if self.gh_available is None:
            try:
                run_command(["gh", "--version"], log_on_error=False)
                self.gh_available = True
            except (CLIError, FileNotFoundError):
                self.gh_available = False

        if not self.gh_available:
            return None

        try:
            result = run_command(
                ["gh", "variable", "list"],
                check=False,
                log_on_error=False
            )

            if result.returncode == 0:
                for line in result.stdout.splitlines():
                    parts = line.split('\t')
                    if len(parts) >= 2 and parts[0] == name:
                        val = parts[1].strip()
                        self.cache[name] = val
                        self._save_cache()
                        return val
                return None

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
            elif "resource not accessible by integration" in stderr:
                print(f"⚠️  Warning: Cannot fetch variable '{name}' due to permissions.", file=sys.stderr)
                return None
            else:
                if result.stderr:
                    print(f"❌ Error fetching GHA variable '{name}': {result.stderr.strip()}", file=sys.stderr)
        except Exception as e:
            print(f"❌ Unexpected error calling 'gh' CLI: {e}", file=sys.stderr)

        return None

    def set_variable(self, name: str, value: str) -> bool:
        self.cache[name] = value
        self._save_cache()

        if self.gh_available is None:
            try:
                run_command(["gh", "--version"], log_on_error=False)
                self.gh_available = True
            except (CLIError, FileNotFoundError):
                self.gh_available = False

        if not self.gh_available:
            return False

        try:
            run_command(
                ["gh", "variable", "set", name, "--body", str(value)],
                log_on_error=True
            )
            return True
        except Exception as e:
            print(f"❌ Error setting GHA variable '{name}': {e}", file=sys.stderr)
            return False

def get_gha_variable(name: str) -> Optional[str]:
    return GHAConfigManager().get_variable(name)

def set_gha_variable(name: str, value: str) -> bool:
    return GHAConfigManager().set_variable(name, value)
