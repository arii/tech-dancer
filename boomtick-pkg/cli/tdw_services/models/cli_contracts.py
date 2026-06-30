from typing import List, Optional, Literal
from pydantic import BaseModel, Field

class SearchPrsRequest(BaseModel):
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

class CreateIssueRequest(BaseModel):
    title: str = Field(description="The title of the issue.")
    body: str = Field(description="The body/description of the issue.")

class GetPrDiffRequest(BaseModel):
    prNumber: int = Field(description="The number of the pull request to get the diff for.")

class ReadCiLogsRequest(BaseModel):
    prNumber: int
    all: bool = Field(default=False, description="Include logs for successful runs (default: false).")

class CreateJulesSessionRequest(BaseModel):
    task: str = Field(description="The instructions for Jules.")
    branch: Optional[str] = Field(default=None, description="The base branch to start from (e.g., 'main').")
    pr: Optional[int] = Field(default=None, description="The PR number to use as the base branch context.")
