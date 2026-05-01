import os
import sys
import subprocess
import json
from typing import Optional
from gh_client import get_github_token

class CLIError(Exception):
    def __init__(self, message, code=1, data=None):
        self.message = message
        self.code = code
        self.data = data
        super().__init__(self.message)

def extract_json(text: str) -> Optional[dict]:
    """Extracts the first JSON object found in a string, even if surrounded by noise."""
    try:
        start = text.find('{')
        if start == -1:
            return None

        # We try to parse from the first '{' and see if it succeeds.
        # JSONDecoder.raw_decode parses a JSON document and returns the object and the index where it ended.
        decoder = json.JSONDecoder()
        obj, end = decoder.raw_decode(text[start:])
        return obj
    except Exception:
        # Fallback to simple find/rfind if raw_decode fails
        try:
            end = text.rfind('}') + 1
            if end > start:
                return json.loads(text[start:end])
        except Exception:
            pass
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
                ["gh", "variable", "get", name, "--body"],
                capture_output=True,
                text=True
            )

            if result.returncode == 0:
                val = result.stdout.strip()
                self.cache[name] = val
                self._save_cache()
                return val

            stderr = result.stderr.lower()
            if "not authenticated" in stderr or "not logged in" in stderr:
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

def get_gha_variable(name: str) -> Optional[str]:
    """Helper function to retrieve a GHA variable via the global manager."""
    return GHAConfigManager().get_variable(name)
