from typing import List, Optional, Any, Dict, Union
from pydantic import BaseModel
from enum import Enum

class RepoStats(BaseModel):
    openIssuesCount: int
    openPRsCount: int
    lastUpdated: str
    stars: int
    forks: int

class GithubUser(BaseModel):
    login: str
    avatar_url: str
    html_url: str

class GithubLabel(BaseModel):
    id: int
    name: str
    color: str
    description: Optional[str] = None

class GithubIssue(BaseModel):
    id: int
    number: int
    title: str
    user: GithubUser
    state: str
    html_url: str
    body: Optional[str] = None
    created_at: str
    updated_at: str
    labels: List[GithubLabel]
    pull_request: Optional[Dict[str, str]] = None

class GithubPullRequest(BaseModel):
    id: int
    node_id: str
    number: int
    title: str
    user: GithubUser
    state: str
    html_url: str
    body: Optional[str] = None
    created_at: str
    updated_at: str
    merged_at: Optional[str] = None
    draft: bool
    head: Dict[str, Any]
    base: Dict[str, Any]
    labels: List[GithubLabel]
    mergeable: Optional[bool] = None
    mergeable_state: Optional[str] = None
    changed_files: Optional[int] = None
    additions: Optional[int] = None
    deletions: Optional[int] = None
    comments: Optional[int] = None

class EnrichedPullRequest(GithubPullRequest):
    testStatus: str # 'passed' | 'failed' | 'pending' | 'unknown'
    checkResults: Optional[List[Dict[str, Any]]] = None
    isBig: bool
    isReadyToMerge: bool
    isLeaderBranch: bool
    isApproved: bool

class GithubWorkflowRun(BaseModel):
    id: int
    name: str
    node_id: str
    head_branch: str
    head_sha: str
    run_number: int
    event: str
    status: str
    conclusion: Optional[str] = None
    workflow_id: int
    url: str
    html_url: str
    created_at: str
    updated_at: str

class GithubWorkflowJob(BaseModel):
    id: int
    run_id: int
    name: str
    status: str
    conclusion: Optional[str] = None
    started_at: str
    completed_at: Optional[str] = None
    html_url: str
    steps: List[Dict[str, Any]]

class SyntaxFailure(BaseModel):
    workflowName: str
    reason: str
    fileUrl: Optional[str] = None
    suggestedTitle: str
    suggestedBody: str

class RuntimeError(BaseModel):
    runId: int
    jobName: str
    errorSnippet: str
    confidence: str # 'high' | 'medium' | 'low'
    suggestedTitle: str
    suggestedBody: str

class FalsePositive(BaseModel):
    jobName: str
    reason: str
    flakinessScore: int
    suggestedTitle: str
    suggestedBody: str

class WorkflowHealthResult(BaseModel):
    report: str
    syntaxFailures: List[SyntaxFailure]
    runtimeErrors: List[RuntimeError]
    falsePositives: List[FalsePositive]

class Finding(BaseModel):
    type: str # 'efficacy' | 'coverage' | 'duplicate' | 'inefficient'
    severity: str # 'critical' | 'moderate' | 'low'
    title: str
    description: str
    recommendation: str
    suggestedTitle: str
    suggestedBody: str

class WorkflowQualitativeResult(BaseModel):
    summary: str
    efficacyScore: int
    efficiencyScore: int
    findings: List[Finding]

class ProposedIssue(BaseModel):
    title: str
    body: str
    reason: str
    priority: str # 'High' | 'Medium' | 'Low'
    effort: str # 'Small' | 'Medium' | 'Large'
    labels: List[str]

class TechnicalAuditResult(BaseModel):
    report: str
    score: int
    criticalFindings: List[str]
    suggestedIssues: List[ProposedIssue]

class BacklogTransformation(BaseModel):
    type: str # 'CONSOLIDATE' | 'REPLACE' | 'TRIAGE_ONLY' | 'PRUNE'
    targetIssueNumbers: List[int]
    proposedIssue: Optional[Dict[str, Any]] = None
    reason: str
    impact: str

class BacklogMaintenanceResult(BaseModel):
    summary: str
    healthScore: int
    transformations: List[BacklogTransformation]

class PrHealthAction(BaseModel):
    prNumber: int
    title: str
    action: str # 'close' | 'comment' | 'label' | 'publish'
    label: Optional[str] = None
    reason: str
    suggestedComment: Optional[str] = None
    confidence: str # 'high' | 'medium' | 'low'

class PrHealthAnalysisResult(BaseModel):
    report: str
    actions: List[PrHealthAction]

class CodeReviewResult(BaseModel):
    reviewComment: str
    labels: List[str]
    suggestedIssues: Optional[List[ProposedIssue]] = None

class RedundancyAnalysisResult(BaseModel):
    summary: str
    redundantIssues: List[Dict[str, Any]]
    consolidatedIssues: List[Dict[str, Any]]

class CleanupRecommendation(BaseModel):
    issueNumber: int
    action: str # 'close' | 'comment'
    reason: str
    prReference: Optional[int] = None
    sessionReference: Optional[str] = None
    commentBody: Optional[str] = None
    confidence: str # 'high' | 'medium' | 'low'

class CleanupAnalysisResult(BaseModel):
    report: str
    actions: List[CleanupRecommendation]

class BranchCleanupRecommendation(BaseModel):
    branchName: str
    reason: str
    type: str # 'merged' | 'stale' | 'abandoned'
    confidence: str # 'high' | 'medium' | 'low'

class BranchCleanupResult(BaseModel):
    report: str
    candidates: List[BranchCleanupRecommendation]

class JulesSession(BaseModel):
    name: str
    state: str
    createTime: str
    updateTime: Optional[str] = None
    title: Optional[str] = None
    outputs: Optional[List[Dict[str, Any]]] = None
    sourceContext: Optional[Dict[str, Any]] = None
    error: Optional[Dict[str, Any]] = None

class JulesCleanupRecommendation(BaseModel):
    sessionName: str
    sessionTitle: Optional[str] = None
    reason: str
    status: str # 'merged' | 'closed' | 'stale' | 'failed' | 'redundant'
    publishedPrs: List[Dict[str, Any]]
    relatedIssueNumber: Optional[int] = None

class JulesCleanupResult(BaseModel):
    report: str
    candidates: List[JulesCleanupRecommendation]

class PrCleanupRecommendation(BaseModel):
    prNumber: int
    title: str
    reason: str
    action: str # 'close' | 'comment'
    evidenceLinks: List[Dict[str, Any]]

class PrCleanupResult(BaseModel):
    report: str
    candidates: List[PrCleanupRecommendation]

class ArchitectAnalysisResult(BaseModel):
    issues: List[ProposedIssue]
    suggestedPivot: Optional[Dict[str, Any]] = None

class PrActionRecommendation(BaseModel):
    prNumber: int
    action: str # 'close' | 'prioritize' | 'comment' | 'publish'
    reason: str
    suggestedComment: Optional[str] = None

class LinkSuggestion(BaseModel):
    prNumber: int
    issueNumber: int
    confidence: str
    reason: str
    prTitle: Optional[str] = None
    prState: Optional[str] = None
    issueTitle: Optional[str] = None
    issueState: Optional[str] = None

class JulesAgentAction(BaseModel):
    sessionName: str
    action: str # 'delete' | 'recover' | 'publish' | 'message' | 'start_over'
    reason: str
    suggestedCommand: Optional[str] = None
    hasPr: bool
    prStatus: Optional[str] = None

class RestartAnalysisResult(BaseModel):
    plan: str
    title: str
