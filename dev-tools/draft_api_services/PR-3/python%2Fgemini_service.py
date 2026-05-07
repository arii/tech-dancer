import os
import json
import re
from typing import List, Dict, Any, Optional
from google import genai
from google.genai import types

from .types import (
    RepoStats, GithubIssue, GithubPullRequest, GithubWorkflowRun,
    GithubWorkflowJob, WorkflowHealthResult, WorkflowQualitativeResult,
    BacklogMaintenanceResult, TechnicalAuditResult, PrHealthAnalysisResult,
    EnrichedPullRequest, CodeReviewResult, ProposedIssue,
    RedundancyAnalysisResult, CleanupAnalysisResult, BranchCleanupResult,
    JulesSession, JulesCleanupResult, PrCleanupResult, ArchitectAnalysisResult,
    PrActionRecommendation, LinkSuggestion, JulesAgentAction
)

def clean_json_string(s: str) -> str:
    s = s.strip()
    s = re.sub(r'^```json\n?', '', s)
    s = re.sub(r'\n?```$', '', s)
    return s.strip()

class GeminiService:
    def __init__(self, api_key: Optional[str] = None):
        if not api_key:
            api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("API_KEY")

        if not api_key:
            raise ValueError("Gemini API Key is missing.")

        self.client = genai.Client(api_key=api_key)

    def generate_repo_briefing(self, stats: RepoStats, velocity: Dict[str, int], recent_issues: List[GithubIssue], recent_prs: List[GithubPullRequest]) -> str:
        prompt = f"""
        Generate a high-level executive briefing for the repository based on these stats:
        Stats: Stars: {stats['stars']}, Forks: {stats['forks']}, Open Issues: {stats['openIssuesCount']}, Open PRs: {stats['openPRsCount']}.
        Activity (Last 7 days): {velocity['opened']} opened, {velocity['closed']} closed.
        Recent Issues: {', '.join([i['title'] for i in recent_issues])}
        Recent PRs: {', '.join([p['title'] for p in recent_prs])}
        Provide a Markdown summary focusing on health and immediate priorities.
        """
        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt
        )
        return response.text or "No briefing available."

    def analyze_workflow_health(self, run: GithubWorkflowRun, jobs: List[GithubWorkflowJob]) -> WorkflowHealthResult:
        run_context = {
            'id': run['id'],
            'name': run['name'],
            'conclusion': run['conclusion'],
            'status': run['status'],
            'head_branch': run['head_branch'],
            'event': run['event'],
            'jobs': [{
                'name': j['name'],
                'conclusion': j['conclusion'],
                'status': j['status'],
                'steps': [{ 'name': s['name'], 'conclusion': s['conclusion'], 'status': s['status'] } for s in j['steps']]
            } for j in jobs]
        }

        prompt = f"""
        Analyze a specific GitHub Actions Workflow Run for failures, flakes, or syntax issues.

        GOAL: Provide a deep technical audit of this specific run.

        RUN DATA:
        {json.dumps(run_context)}

        INSTRUCTIONS:
        1. If the run failed, explain exactly WHY based on the job/step outcomes.
        2. Identify if this looks like a flaky test (e.g. random step failure in a mature job).
        3. Generate high-quality suggested titles and bodies for GitHub issues if a fix is needed.
        4. The 'report' property should be a detailed Markdown analysis of this specific run.
        """

        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        'report': types.Schema(type=types.Type.STRING),
                        'syntaxFailures': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'workflowName': types.Schema(type=types.Type.STRING),
                                    'reason': types.Schema(type=types.Type.STRING),
                                    'fileUrl': types.Schema(type=types.Type.STRING, nullable=True),
                                    'suggestedTitle': types.Schema(type=types.Type.STRING),
                                    'suggestedBody': types.Schema(type=types.Type.STRING)
                                },
                                required=['workflowName', 'reason', 'suggestedTitle', 'suggestedBody']
                            )
                        ),
                        'runtimeErrors': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'runId': types.Schema(type=types.Type.INTEGER),
                                    'jobName': types.Schema(type=types.Type.STRING),
                                    'errorSnippet': types.Schema(type=types.Type.STRING),
                                    'confidence': types.Schema(type=types.Type.STRING, enum=['high', 'medium', 'low']),
                                    'suggestedTitle': types.Schema(type=types.Type.STRING),
                                    'suggestedBody': types.Schema(type=types.Type.STRING)
                                },
                                required=['runId', 'jobName', 'errorSnippet', 'confidence', 'suggestedTitle', 'suggestedBody']
                            )
                        ),
                        'falsePositives': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'jobName': types.Schema(type=types.Type.STRING),
                                    'reason': types.Schema(type=types.Type.STRING),
                                    'flakinessScore': types.Schema(type=types.Type.INTEGER),
                                    'suggestedTitle': types.Schema(type=types.Type.STRING),
                                    'suggestedBody': types.Schema(type=types.Type.STRING)
                                },
                                required=['jobName', 'reason', 'flakinessScore', 'suggestedTitle', 'suggestedBody']
                            )
                        )
                    },
                    required=['report', 'syntaxFailures', 'runtimeErrors', 'falsePositives']
                )
            )
        )
        return json.loads(clean_json_string(response.text or "{}"))

    def analyze_workflow_qualitative(self, workflows: List[Dict[str, str]], runs: List[GithubWorkflowRun], repo_context: Dict[str, str]) -> WorkflowQualitativeResult:
        prompt = f"""
        Perform a QUALITATIVE AUDIT of CI/CD Workflows.

        GOAL: Evaluate the efficacy, coverage, redundancy, and efficiency of GitHub Actions.

        DATA PROVIDED:
        - Workflow Files: {json.dumps([{ 'name': w['name'], 'content': w['content'][:2000] } for w in workflows])}
        - Recent Runs: {json.dumps([{ 'name': r['name'], 'status': r['status'], 'conclusion': r['conclusion'], 'created': r['created_at'] } for r in runs[:10]])}
        - Repo Context: Files present in root: {repo_context.get('fileList')}. Package.json: {repo_context.get('packageJson')}.

        ANALYSIS CRITERIA:
        1. EFFICACY: Do the tests actually catch bugs? Are they running on the right events (push, PR)?
        2. COVERAGE: What's missing? (e.g., repo has frontend files but no frontend tests, or has secrets but no secret scanner).
        3. DUPLICATE: Are multiple workflows doing the same thing? (e.g. two linting workflows).
        4. INEFFICIENT: Are jobs too slow? Are triggers too broad? Are they wasting minutes?

        OUTPUT: A JSON report with scores and specific actionable findings.
        Findings should include 'suggestedTitle' and 'suggestedBody' for a GitHub Issue to fix the qualitative gap.
        """

        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        'summary': types.Schema(type=types.Type.STRING),
                        'efficacyScore': types.Schema(type=types.Type.INTEGER),
                        'efficiencyScore': types.Schema(type=types.Type.INTEGER),
                        'findings': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'type': types.Schema(type=types.Type.STRING, enum=['efficacy', 'coverage', 'duplicate', 'inefficient']),
                                    'severity': types.Schema(type=types.Type.STRING, enum=['critical', 'moderate', 'low']),
                                    'title': types.Schema(type=types.Type.STRING),
                                    'description': types.Schema(type=types.Type.STRING),
                                    'recommendation': types.Schema(type=types.Type.STRING),
                                    'suggestedTitle': types.Schema(type=types.Type.STRING),
                                    'suggestedBody': types.Schema(type=types.Type.STRING)
                                },
                                required=['type', 'severity', 'title', 'description', 'recommendation', 'suggestedTitle', 'suggestedBody']
                            )
                        )
                    },
                    required=['summary', 'efficacyScore', 'efficiencyScore', 'findings']
                )
            )
        )
        return json.loads(clean_json_string(response.text or "{}"))

    def analyze_backlog_maintenance(self, issues: List[GithubIssue], context: Dict[str, Any]) -> BacklogMaintenanceResult:
        summary = [{
            'number': i['number'],
            'title': i['title'],
            'body': i.get('body', ""),
            'labels': [l['name'] for l in i['labels']]
        } for i in issues]

        prompt = f"""
        Perform a BACKLOG QUALITY AUDIT.
        GOAL: Evaluate every issue. If an issue is vague or lacks detail, propose a 'REFINE' transformation.
        The 'proposedIssue.body' MUST be extremely detailed, following repository standards, and include "Acceptance Criteria".
        Use the provided templates to align with standards.
        REPO STYLE CONTEXT: {json.dumps(context.get('templates', {}))}
        CURRENT ISSUES: {json.dumps(summary)}
        """

        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        'summary': types.Schema(type=types.Type.STRING),
                        'healthScore': types.Schema(type=types.Type.INTEGER),
                        'transformations': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'type': types.Schema(type=types.Type.STRING, enum=['CONSOLIDATE', 'REPLACE', 'TRIAGE_ONLY', 'PRUNE']),
                                    'targetIssueNumbers': types.Schema(type=types.Type.ARRAY, items=types.Schema(type=types.Type.INTEGER)),
                                    'reason': types.Schema(type=types.Type.STRING),
                                    'impact': types.Schema(type=types.Type.STRING),
                                    'proposedIssue': types.Schema(
                                        type=types.Type.OBJECT,
                                        properties={
                                            'title': types.Schema(type=types.Type.STRING),
                                            'body': types.Schema(type=types.Type.STRING),
                                            'labels': types.Schema(type=types.Type.ARRAY, items=types.Schema(type=types.Type.STRING)),
                                            'priority': types.Schema(type=types.Type.STRING, enum=['High', 'Medium', 'Low']),
                                            'effort': types.Schema(type=types.Type.STRING, enum=['Small', 'Medium', 'Large'])
                                        },
                                        required=['title', 'body', 'labels', 'priority', 'effort']
                                    )
                                },
                                required=['type', 'targetIssueNumbers', 'reason', 'impact']
                            )
                        )
                    },
                    required=['summary', 'healthScore', 'transformations']
                )
            )
        )
        return json.loads(clean_json_string(response.text or "{}"))

    def run_technical_audit(self, agent_type: str, context: Dict[str, Any]) -> TechnicalAuditResult:
        prompt = f"""
        Perform a technical audit. Persona: {agent_type}.
        Context: {json.dumps(context)}.

        CRITICAL REQUIREMENT: For every item in 'suggestedIssues', the 'body' MUST be a comprehensive, step-by-step implementation guide.
        It MUST include specific code samples or configuration snippets (e.g. YAML for CI/CD, TS for Fullstack) so the developer can implement it immediately.
        Do not be vague. Provide the actual code needed in the issue body.
        """
        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        'report': types.Schema(type=types.Type.STRING),
                        'score': types.Schema(type=types.Type.INTEGER),
                        'criticalFindings': types.Schema(type=types.Type.ARRAY, items=types.Schema(type=types.Type.STRING)),
                        'suggestedIssues': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'title': types.Schema(type=types.Type.STRING),
                                    'body': types.Schema(type=types.Type.STRING, description="Detailed step-by-step guide with code snippets."),
                                    'reason': types.Schema(type=types.Type.STRING),
                                    'priority': types.Schema(type=types.Type.STRING, enum=['High', 'Medium', 'Low']),
                                    'effort': types.Schema(type=types.Type.STRING, enum=['Small', 'Medium', 'Large']),
                                    'labels': types.Schema(type=types.Type.ARRAY, items=types.Schema(type=types.Type.STRING))
                                },
                                required=['title', 'body', 'reason', 'priority', 'effort', 'labels']
                            )
                        )
                    },
                    required=['report', 'score', 'criticalFindings', 'suggestedIssues']
                )
            )
        )
        return json.loads(clean_json_string(response.text or "{}"))

    def analyze_pull_requests(self, prs: List[GithubPullRequest]) -> PrHealthAnalysisResult:
        summary = [{ 'number': p['number'], 'title': p['title'], 'bodySnippet': p.get('body', "")[:200] if p.get('body') else "" } for p in prs]
        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=f"Audit PR health: {json.dumps(summary)}",
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        'report': types.Schema(type=types.Type.STRING),
                        'actions': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'prNumber': types.Schema(type=types.Type.INTEGER),
                                    'title': types.Schema(type=types.Type.STRING),
                                    'action': types.Schema(type=types.Type.STRING, enum=['close', 'comment', 'label', 'publish']),
                                    'label': types.Schema(type=types.Type.STRING, nullable=True),
                                    'reason': types.Schema(type=types.Type.STRING),
                                    'suggestedComment': types.Schema(type=types.Type.STRING, nullable=True),
                                    'confidence': types.Schema(type=types.Type.STRING, enum=['high', 'medium', 'low'])
                                },
                                required=['prNumber', 'title', 'action', 'reason', 'confidence']
                            )
                        )
                    },
                    required=['report', 'actions']
                )
            )
        )
        return json.loads(clean_json_string(response.text or "{}"))

    def generate_code_review(self, pr: EnrichedPullRequest, diff: str) -> CodeReviewResult:
        checks_summary = '\n'.join([f"- {c['name']}: {c['status']} ({c.get('conclusion') or 'Pending'})" for c in pr.get('checkResults', [])]) or "No checks found."

        prompt = f"""
        You are a Principal Software Engineer and Technical Architect.

        TASK: Provide a DEEP, COMPREHENSIVE Code Review for PR #{pr['number']} - "{pr['title']}".

        GUIDELINES:
        1. FILE-BY-FILE ANALYSIS: Group your feedback by file. For every major issue, provide a "Problem" description and an "Implementation Sample" (Actual code snippet).
        2. ARCHITECTURAL IMPACT: How does this change affect the overall system?
        3. BEST PRACTICES: Check for type safety (TypeScript), performance bottlenecks, and security vulnerabilities.
        4. GITHUB CHECKS: I will provide the status of the automated tests (checks). Correlate any failures with the code changes in the diff.
        5. SUGGESTED ISSUES: For every item in the 'suggestedIssues' array, the 'body' MUST be a comprehensive, step-by-step implementation guide.
           It MUST include the "Implementation Sample" (code snippet) mentioned in your analysis so the developer has everything they need in the issue itself.

        PR CONTEXT:
        Title: {pr['title']}
        Description: {pr.get('body') or "No description provided."}

        GITHUB CHECKS STATUS:
        {checks_summary}

        DIFF DATA:
        {diff[:50000]}
        """

        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        'reviewComment': types.Schema(type=types.Type.STRING, description="Comprehensive Markdown review."),
                        'labels': types.Schema(type=types.Type.ARRAY, items=types.Schema(type=types.Type.STRING)),
                        'suggestedIssues': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'title': types.Schema(type=types.Type.STRING),
                                    'body': types.Schema(type=types.Type.STRING, description="Detailed implementation specification including code snippets."),
                                    'reason': types.Schema(type=types.Type.STRING),
                                    'priority': types.Schema(type=types.Type.STRING, enum=['High', 'Medium', 'Low']),
                                    'effort': types.Schema(type=types.Type.STRING, enum=['Small', 'Medium', 'Large']),
                                    'labels': types.Schema(type=types.Type.ARRAY, items=types.Schema(type=types.Type.STRING))
                                },
                                required=['title', 'body', 'reason', 'priority', 'effort', 'labels']
                            )
                        )
                    },
                    required=['reviewComment', 'labels']
                )
            )
        )
        return json.loads(clean_json_string(response.text or "{}"))

    def analyze_jules_cleanup(self, sessions: List[JulesSession], all_prs: List[GithubPullRequest], all_issues: List[GithubIssue]) -> JulesCleanupResult:
        pr_summary = [{ 'number': p['number'], 'state': p['state'], 'base': p['base']['ref'], 'merged': bool(p.get('merged_at')), 'url': p['html_url'] } for p in all_prs]
        issue_summary = [{ 'number': i['number'], 'state': i['state'], 'title': i['title'] } for i in all_issues]
        session_summary = [{
            'name': s['name'],
            'title': s.get('title'),
            'state': s['state'],
            'prs': [o.get('pullRequest', {}).get('url') for o in s.get('outputs', []) if o.get('pullRequest')]
        } for s in sessions]

        prompt = f"""
        JULES SESSION HYGIENE AUDIT.

        GOAL: Identify sessions to delete.
        STRICT CRITERIA FOR DELETION:
        1. The session published a PR that was successfully MERGED into the default 'leader' branch. (If PR is closed but NOT merged, do NOT delete session).
        2. The session was created for a specific issue number, and that issue is now marked as CLOSED.
        3. The session state is FAILED, CANCELLED, or TERMINATED and it's older than 7 days.

        RULES:
        - "CLOSED" PR does NOT equal "FIXED". Only "MERGED" to 'leader' counts.
        - If suggesting deletion based on a PR, you MUST specify the PR number and verify it has 'merged: true' in the provided data.

        DATA PROVIDED:
        - Jules Sessions: {json.dumps(session_summary)}
        - Repo PRs: {json.dumps(pr_summary)}
        - Repo Issues: {json.dumps(issue_summary)}
        """

        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        'report': types.Schema(type=types.Type.STRING),
                        'candidates': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'sessionName': types.Schema(type=types.Type.STRING),
                                    'sessionTitle': types.Schema(type=types.Type.STRING),
                                    'reason': types.Schema(type=types.Type.STRING),
                                    'status': types.Schema(type=types.Type.STRING, enum=['merged', 'closed', 'stale', 'failed', 'redundant']),
                                    'publishedPrs': types.Schema(
                                        type=types.Type.ARRAY,
                                        items=types.Schema(
                                            type=types.Type.OBJECT,
                                            properties={
                                                'number': types.Schema(type=types.Type.INTEGER),
                                                'url': types.Schema(type=types.Type.STRING),
                                                'state': types.Schema(type=types.Type.STRING),
                                                'merged': types.Schema(type=types.Type.BOOLEAN)
                                            },
                                            required=['number', 'url', 'state', 'merged']
                                        )
                                    ),
                                    'relatedIssueNumber': types.Schema(type=types.Type.INTEGER, nullable=True)
                                },
                                required=['sessionName', 'reason', 'status', 'publishedPrs']
                            )
                        )
                    },
                    required=['report', 'candidates']
                )
            )
        )
        return json.loads(clean_json_string(response.text or "{}"))

    def analyze_pr_cleanup(self, open_prs: List[GithubPullRequest], all_issues: List[GithubIssue], closed_prs: List[GithubPullRequest]) -> PrCleanupResult:
        open_pr_data = [{ 'number': p['number'], 'title': p['title'], 'body': p.get('body', "")[:500] if p.get('body') else "" } for p in open_prs]
        issue_data = [{ 'number': i['number'], 'state': i['state'], 'title': i['title'] } for i in all_issues]

        closed_pr_summary = [{
            'number': p['number'],
            'title': p['title'],
            'state': p['state'],
            'url': p['html_url'],
            'merged': bool(p.get('merged_at')),
            'base': p['base']['ref']
        } for p in closed_prs]

        prompt = f"""
        PR HYGIENE AUDIT.

        GOAL: Identify open PRs that should be CLOSED.

        STRICT CRITERIA (Adhere strictly):
        1. FIXED BY ISSUE: The open PR claims to fix an issue (e.g. "Fixes #123") but that issue is ALREADY CLOSED.
        2. FIXED BY OTHER PR: The open PR is a duplicate of a PR that was already MERGED into the default 'leader' branch.

        CRITICAL RULES:
        - Only a PR "MERGED" into the default 'leader' branch satisfies the requirement to close a similar/redundant PR.
        - A "CLOSED" but "NOT MERGED" PR does NOT satisfy the fixed requirement.
        - Verification Requirement: For every candidate, you MUST provide 'evidenceLinks' pointing to the SPECIFIC MERGED PR (on leader) or the CLOSED ISSUE.

        DATA:
        - Open PRs: {json.dumps(open_pr_data)}
        - Issues: {json.dumps(issue_data)}
        - Recently Closed PRs (includes merge status and target branch): {json.dumps(closed_pr_summary)}
        """

        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        'report': types.Schema(type=types.Type.STRING),
                        'candidates': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'prNumber': types.Schema(type=types.Type.INTEGER),
                                    'title': types.Schema(type=types.Type.STRING),
                                    'reason': types.Schema(type=types.Type.STRING),
                                    'action': types.Schema(type=types.Type.STRING, enum=['close', 'comment']),
                                    'evidenceLinks': types.Schema(
                                        type=types.Type.ARRAY,
                                        items=types.Schema(
                                            type=types.Type.OBJECT,
                                            properties={
                                                'type': types.Schema(type=types.Type.STRING, enum=['issue', 'pr']),
                                                'number': types.Schema(type=types.Type.INTEGER),
                                                'url': types.Schema(type=types.Type.STRING),
                                                'state': types.Schema(type=types.Type.STRING)
                                            },
                                            required=['type', 'number', 'url', 'state']
                                        )
                                    )
                                },
                                required=['prNumber', 'title', 'reason', 'action', 'evidenceLinks']
                            )
                        )
                    },
                    required=['report', 'candidates']
                )
            )
        )
        return json.loads(clean_json_string(response.text or "{}"))

    def suggest_strategic_issues(self, issues: List[GithubIssue], prs: List[GithubPullRequest], repo_context: Dict[str, str], guidance: str) -> ArchitectAnalysisResult:
        issue_summary = [{ 'title': i['title'], 'state': i['state'] } for i in issues[:30]]
        prompt = f"""
        Strategic Audit.
        Repo Context: {repo_context.get('fileList')}.
        Existing Backlog: {json.dumps(issue_summary)}.
        Guidance: {guidance}

        GOAL: Suggest high-impact issues. Each 'issue.body' MUST be a comprehensive, step-by-step implementation roadmap with code examples.
        """

        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        'issues': types.Schema(
                            type=types.Type.ARRAY,
                            items=types.Schema(
                                type=types.Type.OBJECT,
                                properties={
                                    'title': types.Schema(type=types.Type.STRING),
                                    'body': types.Schema(type=types.Type.STRING, description="Detailed implementation roadmap with code snippets."),
                                    'priority': types.Schema(type=types.Type.STRING),
                                    'effort': types.Schema(type=types.Type.STRING),
                                    'labels': types.Schema(type=types.Type.ARRAY, items=types.Schema(type=types.Type.STRING)),
                                    'reason': types.Schema(type=types.Type.STRING)
                                },
                                required=['title', 'body', 'priority', 'effort', 'labels', 'reason']
                            )
                        ),
                    },
                    required=['issues']
                )
            )
        )
        return json.loads(clean_json_string(response.text or "{}"))

    def analyze_jules_sessions(self, sessions: List[JulesSession], prs: List[EnrichedPullRequest]) -> List[JulesAgentAction]:
        session_data = [{
            'name': s['name'],
            'state': s['state'],
            'title': s.get('title'),
            'prs': [o.get('pullRequest', {}).get('url') for o in s.get('outputs', []) if o.get('pullRequest')]
        } for s in sessions]

        pr_data = [{
            'number': p['number'],
            'url': p['html_url'],
            'testStatus': p.get('testStatus'),
            'isApproved': p.get('isApproved'),
            'state': p['state']
        } for p in prs]

        prompt = f"""
        Analyze Jules Sessions Operator Tasks.

        GOAL: Identify sessions that are stuck or safe to prune.

        IDENTIFICATION RULES:
        1. STUCK SESSIONS: Session is 'SUCCEEDED' or 'COMPLETED' but has NO pull request URL in outputs. Action: 'message' or 'recover' to request PR creation.
        2. SAFE TO PRUNE: Session has an associated PR that is 'APPROVED', passing CI (testStatus: passed), and is already merged or ready to merge. Action: 'delete' to free up Jules resources.
        3. RESTART: Session has an associated PR that is 'FAILED' and has been stagnant. Action: 'start_over'.

        DATA:
        Sessions: {json.dumps(session_data)}
        Pull Requests: {json.dumps(pr_data)}
        """

        response = self.client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json',
                response_schema=types.Schema(
                    type=types.Type.OBJECT,
                    properties={
                        'sessionName': types.Schema(type=types.Type.STRING),
                        'action': types.Schema(type=types.Type.STRING, enum=['delete', 'recover', 'publish', 'message', 'start_over']),
                        'reason': types.Schema(type=types.Type.STRING),
                        'suggestedCommand': types.Schema(type=types.Type.STRING, nullable=True),
                        'hasPr': types.Schema(type=types.Type.BOOLEAN),
                        'prStatus': types.Schema(type=types.Type.STRING, nullable=True)
                    },
                    required=['sessionName', 'action', 'reason', 'hasPr']
                )
            )
        )
        parsed_response = json.loads(clean_json_string(response.text or "[]"))
        return [parsed_response] if isinstance(parsed_response, dict) else parsed_response
