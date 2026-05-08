import os
import sys
import subprocess
import json
import time
import requests
from typing import Optional, Union, List

def is_ollama_available(url: Optional[str] = None) -> bool:
    """Checks if the Ollama server is running and accessible."""
    if not url:
        url = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/generate")

    # Ensure we use the /tags endpoint for the check
    check_url = url.replace("/api/generate", "/api/tags") if "/api/generate" in url else url

    try:
        response = requests.get(check_url, timeout=5)
        return response.status_code == 200
    except Exception:
        return False

def call_ollama(prompt: str, model: str = "qwen2.5-coder:7b", max_retries: int = 3, url: Optional[str] = None) -> Optional[str]:
    """
    Robust Ollama API abstraction with exponential backoff and error handling.
    Utilizes connection pooling via requests.
    """
    if not url:
        url = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/generate")

    data = {
        "model": model,
        "prompt": prompt,
        "stream": False
    }

    # Simple connection reuse via session if multiple calls were expected in same process,
    # but for individual calls we just use requests.post
    for attempt in range(1, max_retries + 1):
        try:
            # 120s timeout for heavy inference tasks
            response = requests.post(url, json=data, timeout=120)
            response.raise_for_status()
            res_data = response.json()
            return res_data.get("response")

        except requests.exceptions.HTTPError as e:
            err_msg = f"HTTP Error: {str(e)}"
        except requests.exceptions.ConnectionError as e:
            err_msg = f"Connection Error: {str(e)}"
        except requests.exceptions.Timeout as e:
            err_msg = f"Timeout Error: {str(e)}"
        except requests.exceptions.JSONDecodeError:
            err_msg = "Failed to decode JSON response from Ollama"
        except Exception as e:
            err_msg = f"Unexpected error: {str(e)}"

        if attempt == max_retries:
            print(f"❌ Ollama API failed after {max_retries} attempts: {err_msg}", file=sys.stderr)
            return None

        sleep_time = 2 ** attempt
        print(f"⚠️  Ollama attempt {attempt} failed ({err_msg}). Retrying in {sleep_time}s...", file=sys.stderr)
        time.sleep(sleep_time)

class CLIError(Exception):
    def __init__(self, message, code=1, data=None):
        self.message = message
        self.code = code
        self.data = data
        super().__init__(self.message)

def run_command(cmd: Union[str, List[str]], shell: bool = False, check: bool = True, input_str: Optional[str] = None, log_on_error: bool = True) -> Union[str, subprocess.CompletedProcess]:
    """
    Unified command execution helper.
    - If check=True (default): returns stripped stdout string, raises CLIError on non-zero exit.
    - If check=False: returns CompletedProcess object.
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

def get_github_token() -> Optional[str]:
    """Retrieves the GitHub token from environment or via gh CLI."""
    token = os.getenv("GITHUB_TOKEN")
    if token:
        return token
    try:
        return run_command(["gh", "auth", "token"], log_on_error=False)
    except (CLIError, FileNotFoundError):
        return None

def get_repo_name() -> Optional[str]:
    """Auto-detect repo from environment variables or git remote."""
    repo = os.getenv("GITHUB_REPOSITORY") or os.getenv("GH_REPO")
    if repo:
        return repo

    try:
        # Using check=False here to avoid noisy logs for a common discovery step
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
                run_command(["gh", "--version"], log_on_error=False)
                self.gh_available = True
            except (CLIError, FileNotFoundError):
                self.gh_available = False

        if not self.gh_available:
            return None

        # 3. Fetch from gh CLI
        try:
            result = run_command(
                ["gh", "variable", "get", name],
                check=False,
                log_on_error=False
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
        """Sets a variable using the gh CLI and updates local cache."""
        # 1. Update local cache
        self.cache[name] = value
        self._save_cache()

        # 2. Check gh CLI availability
        if self.gh_available is None:
            try:
                run_command(["gh", "--version"], log_on_error=False)
                self.gh_available = True
            except (CLIError, FileNotFoundError):
                self.gh_available = False

        if not self.gh_available:
            return False

        # 3. Set via gh CLI
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
    """Helper function to retrieve a GHA variable via the global manager."""
    return GHAConfigManager().get_variable(name)

def set_gha_variable(name: str, value: str) -> bool:
    """Helper function to set a GHA variable via the global manager."""
    return GHAConfigManager().set_variable(name, value)

def get_github_client():
    from github import Github, Auth
    token = get_github_token()
    if not token:
        raise CLIError("GitHub token not found", code=401)
    return Github(auth=Auth.Token(token))
