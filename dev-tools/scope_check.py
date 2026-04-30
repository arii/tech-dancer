import json
import os
import sys

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

def verify_pr_scope(file_list):
    """Checks if a PR touches too many core layout/component files."""
    config = get_project_config()
    core_dirs = config.get("core_dirs", [])
    threshold = config.get("monolithic_pr_threshold", 3)

    core_files = [f for f in file_list if any(f.startswith(d) for d in core_dirs)]
    if len(core_files) > threshold:
        return f"PR scope warning: Touching {len(core_files)} core files in {core_dirs}. Consider splitting this monolithic PR to avoid merge conflicts (AGENTS.md §23)."
    return None

if __name__ == "__main__":
    # If run as a script, it expects file names as arguments or via stdin
    files = sys.argv[1:]
    if not files and not sys.stdin.isatty():
        files = sys.stdin.read().splitlines()

    warning = verify_pr_scope(files)
    if warning:
        print(warning)
        sys.exit(0)
    sys.exit(0)
