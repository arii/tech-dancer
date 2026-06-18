import json
import os
import sys
from typing import List, Optional, Set

# Import run_command from utils
from utils import run_command

def get_project_config():
    config_path = os.path.join(os.path.dirname(__file__), "project_config.json")
    if not os.path.exists(config_path):
        return {
            "core_dirs": ["src/layouts/", "src/components/"],
            "monolithic_pr_threshold": 3,
            "base_branch": "origin/main",
            "content_scopes": {
                "resources": "content/resources/",
                "posts": "content/posts/",
                "blog": "content/blog/",
                "studies": "content/studies/"
            }
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
    """Checks if a PR touches too many core layout/component files or mixes content scopes."""
    if file_list is None:
        file_list = get_changed_files()

    config = get_project_config()
    core_dirs = config.get("core_dirs", [])
    threshold = config.get("monolithic_pr_threshold", 3)

    core_files = [f for f in file_list if any(f.startswith(d) for d in core_dirs)]
    if len(core_files) > threshold:
        return f"PR scope warning: Touching {len(core_files)} core files in {core_dirs}. Consider splitting this monolithic PR to avoid merge conflicts (AGENTS.md §23)."

    # Content Scope Check
    content_scopes = config.get("content_scopes", {
        "resources": "content/resources/",
        "posts": "content/posts/",
        "blog": "content/blog/",
        "studies": "content/studies/"
    })

    active_scopes: Set[str] = set()
    for f in file_list:
        for scope_name, prefix in content_scopes.items():
            if f.startswith(prefix):
                active_scopes.add(scope_name)

    if len(active_scopes) > 1:
        return f"Content scope warning: Mixed content domains detected ({', '.join(active_scopes)}). PRs should be split by scope: Event Facts, Gear Assets, Merch Catalog, or Articles (AGENTS.md §21)."

    # Mixed Content and Code Check
    has_content = len(active_scopes) > 0
    code_files = [f for f in file_list if f.startswith("src/") and not any(f.startswith(d) for d in core_dirs)]

    if has_content and len(code_files) > 2:
        return "PR scope warning: Mixing significant code changes with content updates. Consider splitting content corrections from feature development."

    # Golden File Check
    golden_files = config.get("golden_files", [])
    modified_golden = [f for f in file_list if f in golden_files]
    if modified_golden:
        return f"PR scope warning: Modifying golden files: {', '.join(modified_golden)}. These files are shared surfaces and should be reconciled only by a designated merge step (AGENTS.md §20)."

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
