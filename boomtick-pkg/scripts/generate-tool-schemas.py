import json
import os
import sys

# Ensure boomtick-pkg/cli is in the path so we can import tdw_services
repo_root = os.getcwd()
cli_root = os.path.join(repo_root, "boomtick-pkg", "cli")
if cli_root not in sys.path:
    sys.path.insert(0, cli_root)

from tdw_services.models.cli_contracts import (
    SearchPrsRequest,
    CreateIssueRequest,
    GetPrDiffRequest,
    ReadCiLogsRequest,
    CreateJulesSessionRequest
)

def generate_schemas():
    models = {
        "github.search_open_prs": SearchPrsRequest,
        "github.create_issue": CreateIssueRequest,
        "github.get_pr_diff": GetPrDiffRequest,
        "repo.read_ci_logs": ReadCiLogsRequest,
        "jules.create_session": CreateJulesSessionRequest
    }

    schemas = {}
    for name, model in models.items():
        # Use model_json_schema() for Pydantic V2
        schema = model.model_json_schema()
        # Clean up some Pydantic-specific fields if necessary,
        # but MCP inputSchema is basically JSON Schema.
        schemas[name] = schema

    output_path = os.path.join(cli_root, "dev_tools", "generated-schemas.json")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(schemas, f, indent=2)

    print(f"Successfully generated schemas at {output_path}")

if __name__ == "__main__":
    generate_schemas()
