import os
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
