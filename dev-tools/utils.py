import os
import subprocess
from typing import Optional

class CLIError(Exception):
    def __init__(self, message, code=1, data=None):
        self.message = message
        self.code = code
        self.data = data
        super().__init__(self.message)

import json
from gh_client import get_github_token

def extract_json(text: str) -> Optional[dict]:
    """Extracts the first JSON object found in a string, even if surrounded by noise."""
    try:
        start = text.find('{')
        end = text.rfind('}') + 1
        if start != -1 and end != -1:
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
