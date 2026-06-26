from __future__ import annotations

import os
import subprocess
from typing import Sequence


class AuthError(RuntimeError):
    pass


def get_github_token(env_vars: Sequence[str] = ("GITHUB_TOKEN", "GH_TOKEN", "PAT_TOKEN")) -> str:
    for var in env_vars:
        value = os.getenv(var)
        if value:
            return value
    try:
        proc = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, check=False)
        if proc.returncode == 0 and proc.stdout.strip():
            return proc.stdout.strip()
    except Exception:
        pass
    raise AuthError("Missing GITHUB_TOKEN/GH_TOKEN.")


