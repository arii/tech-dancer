from typing import List, Dict, Optional, Any, TypedDict, Union, Literal
from dataclasses import dataclass

# GitHub Types

class GithubUser(TypedDict):
    login: str
    avatar_url: str
    html_url: str

class GithubLabel(TypedDict):
    id: int
    name: str
    color: str
    description: str

class GithubIssue(TypedDict):
    id: int
    number: int
    title: str
    user: GithubUser
    state: Literal['open', 'closed']
    html_url: str
    body: str
    created_at: str
    updated_at: str
    labels: List[GithubLabel]
    pull_request: Optional[Dict[str, str]]

class GithubPullRequest(TypedDict):
    id: int
    node_id: str
    number: int
    title: str
    user: GithubUser
    state: Literal['open', 'closed']
    html_url: str
    body: str
    created_at: str
    updated_at: str
    merged_at: Optional[str]
    draft: bool
    head: Dict[str, Any]  # Simplified for now
    base: Dict[str, Any]  # Simplified for now
    labels: List[GithubLabel]
    mergeable: Optional[bool]
    mergeable_state: Optional[str]
    changed_files: Optional[int]
    additions: Optional[int]
    deletions: Optional[int]
    comments: Optional[int]

class EnrichedPullRequest(GithubPullRequest):
    testStatus: Literal['passed', 'failed', 'pending', 'unknown']
    checkResults: Optional[List[Dict[str, Any]]]
    isBig: bool
    isReadyToMerge: bool
    isLeaderBranch: bool
    isApproved: bool

class RepoStats(TypedDict):
    openIssuesCount: int
    openPRsCount: int
    lastUpdated: str
    stars: int
    forks: int

class GithubWorkflowRun(TypedDict):
    id: int
    name: str
    node_id: str
    head_branch: str
    head_sha: str
    run_number: int
    event: str
    status: str
    conclusion: Optional[str]
    workflow_id: int
    url: str
    html_url: str
    created_at: str
    updated_at: str

class GithubWorkflowJob(TypedDict):
    id: int
    run_id: int
    name: str
    status: str
    conclusion: Optional[str]
    started_at: str
    completed_at: Optional[str]
    html_url: str
    steps: List[Dict[str, Any]]

# Analysis Results Types

class WorkflowHealthResult(TypedDict):
    report: str
    syntaxFailures: List[Dict[str, Any]]
    runtimeErrors: List[Dict[str, Any]]
    falsePositives: List[Dict[str, Any]]

class WorkflowQualitativeResult(TypedDict):
    summary: str
    efficacyScore: int
    efficiencyScore: int
    findings: List[Dict[str, Any]]

class ProposedIssue(TypedDict):
    title: str
    body: str
    reason: str
    priority: Literal['High', 'Medium', 'Low']
    effort: Literal['Small', 'Medium', 'Large']
    labels: List[str]

class TechnicalAuditResult(TypedDict):
    agentType: str
    report: str
    timestamp: int
    criticalFindings: List[str]
    suggestedIssues: List[ProposedIssue]
    score: int

class BacklogMaintenanceResult(TypedDict):
    summary: str
    transformations: List[Dict[str, Any]]
    healthScore: int

class RedundancyAnalysisResult(TypedDict):
    summary: str
    redundantIssues: List[Dict[str, Any]]
    consolidatedIssues: List[Dict[str, Any]]

class PrHealthAnalysisResult(TypedDict):
    report: str
    actions: List[Dict[str, Any]]

class CodeReviewResult(TypedDict):
    reviewComment: str
    labels: List[str]
    suggestedIssues: Optional[List[ProposedIssue]]

class CleanupAnalysisResult(TypedDict):
    report: str
    actions: List[Dict[str, Any]]

class BranchCleanupResult(TypedDict):
    report: str
    candidates: List[Dict[str, Any]]

class JulesCleanupResult(TypedDict):
    report: str
    candidates: List[Dict[str, Any]]

class PrCleanupResult(TypedDict):
    report: str
    candidates: List[Dict[str, Any]]

class ArchitectAnalysisResult(TypedDict):
    issues: List[ProposedIssue]
    suggestedPivot: Optional[Dict[str, Any]]

class JulesAgentAction(TypedDict):
    sessionName: str
    action: Literal['delete', 'recover', 'publish', 'message', 'start_over']
    reason: str
    suggestedCommand: Optional[str]
    hasPr: bool
    prStatus: Optional[str]

class LinkSuggestion(TypedDict):
    prNumber: int
    issueNumber: int
    confidence: str
    reason: str
    prTitle: Optional[str]
    prState: Optional[str]
    issueTitle: Optional[str]
    issueState: Optional[str]

class PrActionRecommendation(TypedDict):
    prNumber: int
    action: Literal['close', 'prioritize', 'comment', 'publish']
    reason: str
    suggestedComment: Optional[str]

# Jules Types

class JulesSession(TypedDict):
    name: str
    state: str
    createTime: str
    updateTime: Optional[str]
    title: Optional[str]
    outputs: Optional[List[Dict[str, Any]]]
    sourceContext: Optional[Dict[str, Any]]
    error: Optional[Dict[str, Any]]

class JulesSource(TypedDict):
    name: str
    displayName: Optional[str]
