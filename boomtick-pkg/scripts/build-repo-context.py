#!/usr/bin/env python3
import json
import pathlib
import sys
import os

def build_repo_context():
    """Gathers static context about the repository."""

    # Discovery: find the repo root and package root
    script_path = pathlib.Path(__file__).resolve()
    # scripts/build-repo-context.py -> package_root
    package_root = script_path.parent.parent

    # Declarative Environment Detection using marker file
    # Standalone root has workspace.json.
    # Monolith root has workspace.json but it's one level up from boomtick-pkg.
    if (package_root / "workspace.json").exists() and not (package_root.parent / "workspace.json").exists():
        is_standalone = True
    else:
        is_standalone = False

    if is_standalone:
        repo_root = package_root
    else:
        # We are in monolith or some other nested structure
        # Ensure we point to the correct package root if we're not already there
        if package_root.name != "boomtick-pkg" and (package_root.parent / "boomtick-pkg").exists():
            package_root = package_root.parent / "boomtick-pkg"
        repo_root = package_root.parent

    # 1. Package JSON (Repo Root)
    try:
        package_json_path = repo_root / "package.json"
        if not package_json_path.exists():
            # Fallback for standalone where it might be in current dir
            package_json_path = pathlib.Path("package.json")

        package_json = json.loads(package_json_path.read_text())
        package_summary = {
            "name": package_json.get("name"),
            "scripts": package_json.get("scripts", {}),
            "dependencies": sorted(list(package_json.get("dependencies", {}).keys())),
            "devDependencies": sorted(list(package_json.get("devDependencies", {}).keys())),
        }
    except Exception as e:
        print(f"Error reading package.json: {e}", file=sys.stderr)
        package_summary = {}

    # 2. Project Config (Repo Root)
    project_config = {}
    try:
        from importlib.resources import files
        try:
            # Try to load from the dev_tools python package if available
            project_config = json.loads(files("dev_tools").joinpath("project_config.json").read_text())
        except Exception:
            # Try root first, then look into boomtick-pkg if in monolith
            project_config_path = repo_root / "project_config.json"
            if not project_config_path.exists() and (repo_root / "boomtick-pkg" / "project_config.json").exists():
                project_config_path = repo_root / "boomtick-pkg" / "project_config.json"

            if project_config_path.exists():
                project_config = json.loads(project_config_path.read_text())
    except Exception as e:
        print(f"Error reading project_config.json: {e}", file=sys.stderr)

    # 3. MCP Schema (Package Internal)
    mcp_schema = {"tools": [], "prompts": [], "resources": []}
    try:
        import subprocess
        mcp_dir = package_root / "mcp"
        if mcp_dir.exists():
            result = subprocess.run(
                ["npx", "tsx", "scripts/export-mcp-schema.ts"],
                cwd=str(mcp_dir),
                capture_output=True,
                text=True,
                check=True
            )
            mcp_schema = json.loads(result.stdout)
    except Exception as e:
        print(f"Error gathering MCP schema: {e}", file=sys.stderr)

    # 4. CLI Schema (Package Internal)
    cli_schema = {}
    try:
        cli_schema_path = package_root / "cli" / "dev_tools" / "cli-schema.json"
        if cli_schema_path.exists():
            cli_schema = json.loads(cli_schema_path.read_text())
    except Exception as e:
        print(f"Error reading cli-schema.json: {e}", file=sys.stderr)

    # 5. File Tree (Repo Root)
    def get_dir_structure(path, max_depth=2, current_depth=0):
        if current_depth >= max_depth:
            return "..."
        structure = {}
        try:
            for item in sorted(path.iterdir()):
                if item.name.startswith('.') or item.name == 'node_modules' or item.name == '__pycache__':
                    continue
                if item.is_dir():
                    structure[item.name + '/'] = get_dir_structure(item, max_depth, current_depth + 1)
                else:
                    structure[item.name] = None
        except Exception:
            pass
        return structure

    file_tree = get_dir_structure(repo_root)

    # Assemble context
    return {
        "repo": {
             "name": package_summary.get("name", "Unknown Repo"),
        },
        "package_json": package_summary,
        "project_config": project_config,
        "mcp_schema": mcp_schema,
        "cli_schema": cli_schema,
        "file_tree": file_tree,
    }

if __name__ == "__main__":
    try:
        context = build_repo_context()
        print(json.dumps(context, indent=2, sort_keys=True))
    except Exception as e:
        print(f"FATAL: Context generation failed: {e}", file=sys.stderr)
        sys.exit(1)
