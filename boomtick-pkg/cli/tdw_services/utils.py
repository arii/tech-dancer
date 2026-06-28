import sys
import re
from typing import List
import os

def get_or_create_log_dir(subdir: str) -> str:
    """Returns the path to a specific log subdirectory and ensures it exists."""
    log_dir = os.path.join(os.getcwd(), "boomtick-pkg", "cli", "logs", subdir)
    os.makedirs(log_dir, exist_ok=True)
    return log_dir

def mask_sensitive_data(msg: str) -> str:
    """Redacts sensitive information like GitHub tokens from strings."""
    if not isinstance(msg, str):
        msg = str(msg)

    # Redact GitHub Tokens (Personal Access Tokens and Fine-grained Tokens)
    msg = re.sub(r'ghp_[a-zA-Z0-9]{36,}', 'ghp_***', msg)
    msg = re.sub(r'github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59,}', 'github_pat_***', msg)

    # Generic token redaction for URLs or assignments (e.g., token=ABC123xyz)
    msg = re.sub(r'(?i)(token|auth|key|secret|password|access_token)([:=])[a-zA-Z0-9._-]{10,}', r'\1\2***', msg)

    return msg

def log_info(msg: str):
    """Logs an informational message to stderr."""
    print(mask_sensitive_data(msg), file=sys.stderr)

def log_error(msg: str):
    """Logs an error message to stderr."""
    print(f"❌ Error: {mask_sensitive_data(msg)}", file=sys.stderr)

def log_warn(msg: str):
    """Logs a warning message to stderr."""
    print(f"⚠️  Warning: {mask_sensitive_data(msg)}", file=sys.stderr)

def log_debug(msg: str):
    """Logs a debug message to stderr."""
    print(f"DEBUG: {mask_sensitive_data(msg)}", file=sys.stderr)

def extract_failing_info(logs: str) -> List[dict]:
    """Extracts failing test and build information from logs."""
    findings = []
    # TS Errors
    ts_errors = re.findall(r"([a-zA-Z0-9_\-\./]+\.[tj]sx?):(\d+):(\d+) - error (TS\d+): (.*)", logs)
    for file_path, line, col, code, msg in ts_errors:
        findings.append({"file": file_path, "line": line, "message": f"{code}: {msg}", "type": "typescript"})

    # Vitest Errors (Robust)
    # Matches FAIL followed by the test file, then non-greedily finds the first ❯ trace
    # (?!FAIL) ensures we don't skip over another FAIL block
    vitest_matches = re.finditer(r"FAIL\s+([^\n]+)(?:(?!FAIL).)*?❯\s+([^\n:]+):(\d+):(\d+)", logs, re.DOTALL)
    for m in vitest_matches:
        findings.append({
            "file": m.group(2),
            "line": m.group(3),
            "message": f"Test Failure in {m.group(1)}",
            "type": "vitest"
        })

    # Playwright Errors
    playwright_matches = re.finditer(r"\s*\d+\)\s+\[([^\]]+)\]\s+›\s+([^\s:]+):(\d+):(\d+)\s+›\s+(.*)", logs)
    for m in playwright_matches:
        findings.append({
            "file": m.group(2),
            "line": m.group(3),
            "message": f"Playwright [{m.group(1)}] › {m.group(5)}",
            "type": "playwright"
        })

    return findings

def clean_gha_logs(logs: str) -> str:
    """Removes GitHub Action noise from logs while preserving actual error messages."""
    if not logs:
        return ""

    lines = logs.splitlines()
    cleaned = []

    # Patterns to filter out after timestamp removal
    noise_patterns = [
        r'^\[command\].*',
        r'^##\[command\].*',
        r'^##\[warning\].*',
        r'^##\[error\]Process completed with exit code.*',
        r'^Removing credentials config.*',
        r'^Stop and remove container.*',
        r'^Remove container network.*',
        r'^Cleaning up orphan processes.*',
        r'^/usr/bin/docker.*',
    ]
    combined_noise = re.compile('|'.join(noise_patterns), re.IGNORECASE)

    for line in lines:
        # 1. Strip ANSI escape codes
        line = re.sub(r'\x1b\[[0-9;]*[mGKF]', '', line)

        # 2. Strip GHA timestamps
        line = re.sub(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z\s+', '', line)

        # 3. Filter noise
        if not combined_noise.search(line) and line.strip():
            cleaned.append(line)

    return "\n".join(cleaned)

def get_base_dir() -> str:
    """Returns the absolute path to the CLI package root."""
    import os
    return os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def ensure_dir(*parts: str) -> str:
    """Joins path parts, ensures the directory exists, and returns the absolute path."""
    import os
    path = os.path.join(get_base_dir(), *parts)
    os.makedirs(path, exist_ok=True)
    return path

