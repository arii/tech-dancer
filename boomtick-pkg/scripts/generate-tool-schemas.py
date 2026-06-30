import json
import os
import sys

# Ensure boomtick-pkg/cli is in the path so we can import models
repo_root = os.getcwd()
cli_root = os.path.join(repo_root, "boomtick-pkg", "cli")
if cli_root not in sys.path:
    sys.path.insert(0, cli_root)

from dev_tools.models.cli_contracts import (
    SearchPrsRequest,
    CreateIssueRequest,
    GetPrDiffRequest,
    ReadCiLogsRequest,
    CreateJulesSessionRequest,
    CheckoutBranchRequest,
    GetMergeConflictFilesRequest,
    RunTestsRequest,
    CreatePullRequestRequest,
    IssueViewRequest,
    IssueUpdateRequest,
    IssueCommentRequest
)

def fix_types(obj):
    """Recursively replaces 'integer' with 'number' in JSON schema."""
    if isinstance(obj, dict):
        new_obj = {}
        for k, v in obj.items():
            if k == "type" and v == "integer":
                new_obj[k] = "number"
            else:
                new_obj[k] = fix_types(v)
        return new_obj
    elif isinstance(obj, list):
        return [fix_types(item) for item in obj]
    else:
        return obj

def generate_schemas():
    models = {
        "github.search_open_prs": SearchPrsRequest,
        "github.create_issue": CreateIssueRequest,
        "github.get_pr_diff": GetPrDiffRequest,
        "repo.read_ci_logs": ReadCiLogsRequest,
        "jules.create_session": CreateJulesSessionRequest,
        "github.checkout_branch": CheckoutBranchRequest,
        "github.get_merge_conflict_files": GetMergeConflictFilesRequest,
        "repo.run_tests": RunTestsRequest,
        "github.create_pull_request": CreatePullRequestRequest,
        "github.issue_view": IssueViewRequest,
        "github.issue_update": IssueUpdateRequest,
        "github.issue_comment": IssueCommentRequest
    }

    schemas = {}
    for name, model in models.items():
        # Use model_json_schema() for Pydantic V2
        schema = model.model_json_schema()

        # MCP/TypeScript expects "number" for integers in many cases,
        # and standard JSON Schema "number" covers both.
        schema = fix_types(schema)

        # Pydantic V2 often puts titles in properties, which can be noisy
        if "properties" in schema:
            for prop in schema["properties"].values():
                if "title" in prop:
                    del prop["title"]

        schemas[name] = schema

    output_path = os.path.join(cli_root, "dev_tools", "generated-schemas.json")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w") as f:
        json.dump(schemas, f, indent=2)

    print(f"Successfully generated schemas at {output_path}")

if __name__ == "__main__":
    generate_schemas()
