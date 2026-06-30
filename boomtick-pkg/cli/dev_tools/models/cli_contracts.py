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

class CheckoutBranchRequest(BaseModel):
    branch: str = Field(description="The name of the branch to checkout.")
    worktreePath: Optional[str] = Field(default=None, description="Optional path to the worktree to perform the checkout in.")

class GetMergeConflictFilesRequest(BaseModel):
    prNumber: int = Field(description="The number of the pull request to check for conflicts.")
    baseBranch: str = Field(default="main", description="The base branch to check against (default: 'main').")

class RunTestsRequest(BaseModel):
    commands: Optional[List[str]] = Field(default=None, description="Optional list of commands to run (default includes install, lint, test, build).")
    timeoutSeconds: int = Field(default=300, description="Maximum time in seconds to wait for tests (default: 300).")
    worktreePath: Optional[str] = Field(default=None, description="Optional path to the worktree to run tests in.")

class CreatePullRequestRequest(BaseModel):
    title: str = Field(description="PR Title.")
    body: str = Field(description="Description of changes.")
    head: str = Field(description="The branch containing changes to merge.")
    base: str = Field(default="main", description="The target branch to merge into.")
    draft: bool = Field(default=False, description="Whether to create the PR as a draft.")

class IssueViewRequest(BaseModel):
    issueNumber: int = Field(description="The number of the issue to view.")

class IssueUpdateRequest(BaseModel):
    issueNumber: int = Field(description="The number of the issue to update.")
    body: str = Field(description="The new body content for the issue.")

class IssueCommentRequest(BaseModel):
    issueNumber: int = Field(description="The number of the issue to comment on.")
    body: str = Field(description="The content of the comment.")
