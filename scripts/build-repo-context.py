#!/usr/bin/env python3
import json
import pathlib
import sys

def build_repo_context():
    """Gathers static context about the repository."""

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

    # Assemble context
    return {
        "repo": {
             "name": package_summary.get("name", "Unknown Repo"),
        },
        "package_json": package_summary,
        "workflows": workflows,
        "test_snapshots": test_snapshots,
    }

if __name__ == "__main__":
    try:
        context = build_repo_context()
        if not context.get("package_json"):
            raise ValueError("Failed to gather basic repository context (package.json missing or invalid)")
        print(json.dumps(context, indent=2))
    except Exception as e:
        print(f"FATAL: Context generation failed: {e}", file=sys.stderr)
        sys.exit(1)
