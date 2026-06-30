from typing import List, Optional, Literal, Any, Dict, Type
from pydantic import BaseModel, Field, ConfigDict
from pydantic.json_schema import GenerateJsonSchema, JsonSchemaValue
from pydantic_core import core_schema

class MCPGenerateJsonSchema(GenerateJsonSchema):
    """
    Custom JSON Schema generator for MCP compatibility.
    - Maps 'integer' to 'number'.
    - Removes per-field 'title' fields to reduce noise.
    - Preserves top-level model 'title'.
    """
    def generate(self, schema: core_schema.CoreSchema, mode: Literal['validation', 'serialization'] = 'validation') -> JsonSchemaValue:
        res = super().generate(schema, mode)
        # Preserve top-level title but strip field-level ones
        title = res.pop("title", None)
        res = self._fix_types(res)
        if title:
            res["title"] = title
        return res

    def _fix_types(self, obj: Any) -> Any:
        if isinstance(obj, dict):
            new_obj = {}
            for k, v in obj.items():
                if k == "type" and v == "integer":
                    new_obj[k] = "number"
                elif k == "title":
                    continue
                else:
                    new_obj[k] = self._fix_types(v)
            return new_obj
        elif isinstance(obj, list):
            return [self._fix_types(item) for item in obj]
        return obj

class BaseContract(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        str_strip_whitespace=True
    )

    @classmethod
    def model_json_schema(
        cls,
        by_alias: bool = True,
        ref_template: str = "#/$defs/{model}",
        schema_generator: Type[GenerateJsonSchema] = MCPGenerateJsonSchema,
        mode: Literal['validation', 'serialization'] = 'validation',
    ) -> Dict[str, Any]:
        """
        Natively handle integer-to-number conversion and title removal
        using a custom MCPGenerateJsonSchema generator.
        """
        return super().model_json_schema(
            by_alias=by_alias,
            ref_template=ref_template,
            schema_generator=schema_generator,
            mode=mode
        )

class SearchPrsRequest(BaseContract):
    state: Literal["open", "closed", "all"] = Field(
        default="open",
        description="The state of the PRs to search for (open, closed, all)."
    )
    includeDrafts: bool = Field(
        default=True,
        description="Whether to include draft PRs in the results."
    )
    limit: int = Field(
        default=100,
        ge=1,
        le=100,
        description="The maximum number of PRs to return (default: 100, range: 1-100)."
    )
    labels: Optional[List[str]] = Field(
        default=None,
        description="Filter PRs by labels."
    )

class CreateIssueRequest(BaseContract):
    title: str = Field(description="The title of the issue.")
    body: str = Field(description="The body/description of the issue.")

class GetPrDiffRequest(BaseContract):
    prNumber: int = Field(description="The number of the pull request to get the diff for.")

class ReadCiLogsRequest(BaseContract):
    prNumber: int
    all: bool = Field(default=False, description="Include logs for successful runs (default: false).")

class CreateJulesSessionRequest(BaseContract):
    task: str = Field(description="The instructions for Jules.")
    branch: Optional[str] = Field(default=None, description="The base branch to start from (e.g., 'main').")
    pr: Optional[int] = Field(default=None, description="The PR number to use as the base branch context.")

class CheckoutBranchRequest(BaseContract):
    branch: str = Field(description="The name of the branch to checkout.")
    worktreePath: Optional[str] = Field(default=None, description="Optional path to the worktree to perform the checkout in.")

class GetMergeConflictFilesRequest(BaseContract):
    prNumber: int = Field(description="The number of the pull request to check for conflicts.")
    baseBranch: str = Field(default="main", description="The base branch to check against (default: 'main').")

class RunTestsRequest(BaseContract):
    commands: Optional[List[str]] = Field(default=None, description="Optional list of commands to run (default includes install, lint, test, build).")
    timeoutSeconds: int = Field(default=300, description="Maximum time in seconds to wait for tests (default: 300).")
    worktreePath: Optional[str] = Field(default=None, description="Optional path to the worktree to run tests in.")

class CreatePullRequestRequest(BaseContract):
    title: str = Field(description="PR Title.")
    body: str = Field(description="Description of changes.")
    head: str = Field(description="The branch containing changes to merge.")
    base: str = Field(default="main", description="The target branch to merge into.")
    draft: bool = Field(default=False, description="Whether to create the PR as a draft.")

class IssueViewRequest(BaseContract):
    issueNumber: int = Field(description="The number of the issue to view.")

class IssueUpdateRequest(BaseContract):
    issueNumber: int = Field(description="The number of the issue to update.")
    body: str = Field(description="The new body content for the issue.")

class IssueCommentRequest(BaseContract):
    issueNumber: int = Field(description="The number of the issue to comment on.")
    body: str = Field(description="The content of the comment.")
