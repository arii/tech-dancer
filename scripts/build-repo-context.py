#!/usr/bin/env python3
import subprocess
import json
import pathlib
import sys

def build_repo_context():
    """Gathers context about the repository."""

    # 1. Package JSON
    try:
        package_json = json.loads(pathlib.Path("package.json").read_text())
        # simplify package.json to the most important parts for context
        package_summary = {
            "name": package_json.get("name"),
            "scripts": package_json.get("scripts", {}),
            "dependencies": list(package_json.get("dependencies", {}).keys()),
            "devDependencies": list(package_json.get("devDependencies", {}).keys()),
        }
    except Exception as e:
        print(f"Error reading package.json: {e}", file=sys.stderr)
        package_summary = {}

    # 2. Workflows
    try:
        workflows = [str(p) for p in pathlib.Path(".github/workflows").glob("*.yml")]
    except Exception as e:
        print(f"Error reading workflows: {e}", file=sys.stderr)
        workflows = []

    # 3. Test Snapshots
    try:
        test_snapshots = [str(p) for p in pathlib.Path("src").rglob("__snapshots__/*.snap")]
    except Exception as e:
        print(f"Error reading snapshots: {e}", file=sys.stderr)
        test_snapshots = []

    # 4. Recent Commits
    try:
        recent_commits = subprocess.check_output(
            ["git", "log", "--oneline", "-10"]
        ).decode().strip().splitlines()
    except Exception as e:
        print(f"Error getting recent commits: {e}", file=sys.stderr)
        recent_commits = []

    # 5. Changed Files
    try:
        changed_files = subprocess.check_output(
            [git, diff, --name-only, HEAD~1]
        ).decode().strip().splitlines()
    except Exception as e:
         print(f"Error getting changed files: {e}", file=sys.stderr)
         changed_files = []

    # Assemble context
    return {
        "repo": {
             "name": package_summary.get("name", "Unknown Repo"),
        },
        "package_json": package_summary,
        "workflows": workflows,
        "test_snapshots": test_snapshots,
        "recent_commits": recent_commits,
        "changed_files": changed_files,
    }

if __name__ == "__main__":
    context = build_repo_context()
    print(json.dumps(context, indent=2))
