import json
import os
import sys
from typing import List, Optional

# Import run_command from utils
from utils import run_command

def get_project_config():
    config_path = os.path.join(os.path.dirname(__file__), "project_config.json")
    if not os.path.exists(config_path):
        return {
            "core_dirs": ["src/layouts/", "src/components/"],
            "monolithic_pr_threshold": 3,
            "base_branch": "origin/main"
        }
    with open(config_path) as f:
        return json.load(f)

def get_changed_files():
    """Returns the list of files changed in the current branch."""
    config = get_project_config()
    base = config.get("base_branch", "origin/main")
    # Use check=False to manually handle fallback
    res = run_command(["git", "diff", "--name-only", base], check=False, log_on_error=False)
    if res.returncode == 0:
        return res.stdout.strip().splitlines()

    res = run_command(["git", "diff", "--name-only", "HEAD"], check=False, log_on_error=False)
    if res.returncode == 0:
        return res.stdout.strip().splitlines()

    return []

def verify_pr_scope(file_list=None):
    """Checks if a PR touches too many core layout/component files."""
    if file_list is None:
        file_list = get_changed_files()

    config = get_project_config()
    core_dirs = config.get("core_dirs", [])
    allowed_scope = config.get("allowed_scope", [])
    threshold = config.get("monolithic_pr_threshold", 3)

    core_files = [
        f for f in file_list
        if any(f.startswith(d) for d in core_dirs)
        and not any(f.startswith(a) for a in allowed_scope if f.startswith(a))
    ]
    if len(core_files) > threshold:
        return f"PR scope warning: Touching {len(core_files)} core files in {core_dirs}. Consider splitting this monolithic PR to avoid merge conflicts (AGENTS.md §23)."
    return None

if __name__ == "__main__":
    # If run as a script, it expects file names as arguments or via stdin
    # If no arguments/stdin, it auto-detects changed files in the repo
    files = sys.argv[1:]
    if not files and not sys.stdin.isatty():
        files = sys.stdin.read().splitlines()

    if not files:
        warning = verify_pr_scope()
    else:
        warning = verify_pr_scope(files)

    if warning:
        print(warning)
        sys.exit(0)
    sys.exit(0)
