import json
import os
from dev_tools.models import (
    CreateIssueInput, SearchPRsInput, IssueUpdateInput,
    CreateIssueResponse, SearchPRsResponse, IssueUpdateResponse
)

def generate_schema():
    schemas = {
        "CreateIssueInput": CreateIssueInput.model_json_schema(),
        "SearchPRsInput": SearchPRsInput.model_json_schema(),
        "IssueUpdateInput": IssueUpdateInput.model_json_schema(),
        "CreateIssueResponse": CreateIssueResponse.model_json_schema(),
        "SearchPRsResponse": SearchPRsResponse.model_json_schema(),
        "IssueUpdateResponse": IssueUpdateResponse.model_json_schema(),
    }

    # Save to boomtick-pkg/cli/dev_tools/contract-schema.json
    output_path = os.path.join(os.path.dirname(__file__), "contract-schema.json")
    with open(output_path, "w") as f:
        json.dump(schemas, f, indent=2)

    print(f"Generated contract-schema.json at {output_path}")

if __name__ == "__main__":
    generate_schema()
