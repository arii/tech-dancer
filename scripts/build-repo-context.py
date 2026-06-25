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
            "dependencies": sorted(list(package_json.get("dependencies", {}).keys())),
            "devDependencies": sorted(list(package_json.get("devDependencies", {}).keys())),
        }
    except Exception as e:
        print(f"Error reading package.json: {e}", file=sys.stderr)
        package_summary = {}

    # 2. Project Config
    project_config = {}
    try:
        project_config_path = pathlib.Path("dev-tools/project_config.json")
        if project_config_path.exists():
            project_config = json.loads(project_config_path.read_text())
    except Exception as e:
        print(f"Error reading project_config.json: {e}", file=sys.stderr)

    # Assemble context
    return {
        "repo": {
             "name": package_summary.get("name", "Unknown Repo"),
        },
        "package_json": package_summary,
        "project_config": project_config,
    }

if __name__ == "__main__":
    try:
        context = build_repo_context()
        if not context.get("package_json"):
            raise ValueError("Failed to gather basic repository context (package.json missing or invalid)")
        # sort_keys=True ensures the output is deterministic for revision control
        print(json.dumps(context, indent=2, sort_keys=True))
    except Exception as e:
        print(f"FATAL: Context generation failed: {e}", file=sys.stderr)
        sys.exit(1)
