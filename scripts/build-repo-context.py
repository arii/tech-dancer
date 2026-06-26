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
        from importlib.resources import files
        try:
            project_config = json.loads(files("dev_tools").joinpath("project_config.json").read_text())
        except Exception:
            project_config_path = pathlib.Path("project_config.json")
            if project_config_path.exists():
                project_config = json.loads(project_config_path.read_text())
    except Exception as e:
        print(f"Error reading project_config.json: {e}", file=sys.stderr)

    # 3. CLI Schema
    cli_schema = {}
    try:
        from importlib.resources import files
        try:
            cli_schema = json.loads(files("dev_tools").joinpath("cli-schema.json").read_text())
        except Exception:
            cli_schema_path = pathlib.Path("boomtick-pkg/cli/dev_tools/cli-schema.json")
            if cli_schema_path.exists():
                cli_schema = json.loads(cli_schema_path.read_text())
    except Exception as e:
        print(f"Error reading cli-schema.json: {e}", file=sys.stderr)

    # 4. File Tree (Top level and key directories)
    file_tree = {}
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

    file_tree = get_dir_structure(pathlib.Path("."))

    # Assemble context
    return {
        "repo": {
             "name": package_summary.get("name", "Unknown Repo"),
        },
        "package_json": package_summary,
        "project_config": project_config,
        "cli_schema": cli_schema,
        "file_tree": file_tree,
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
