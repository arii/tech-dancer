from typing import Dict, Any, List
from github_service import GithubService
from gemini_service import GeminiService
from jules_service import JulesService

class OrchestrationService:
    def __init__(self, github_token: str = None, gemini_api_key: str = None, jules_api_key: str = None):
        self.github = GithubService(token=github_token)
        self.gemini = GeminiService(api_key=gemini_api_key)
        self.jules = JulesService(api_key=jules_api_key)

    def review_pr_with_ai(self, repo: str, pr_number: int) -> Dict:
        """
        Fetches a PR, its diff, and generates a code review using Gemini.
        Returns the evaluation result.
        """
        pr_details = self.github.fetch_pr_details(repo, pr_number)
        enriched_pr = self.github.enrich_single_pr(repo, pr_details, include_reviews=False)
        pr_diff = self.github.fetch_pr_diff(repo, pr_number)

        review_result = self.gemini.generate_code_review(enriched_pr, pr_diff)
        return review_result

    def diagnose_failed_workflows(self, repo: str, run_id: int) -> Dict:
        """
        Fetches workflow run details, jobs, and annotations, and uses Gemini
        to perform a root cause analysis and provide fix recommendations.
        """
        run = self.github.fetch_workflow_runs(repo, status="failure")
        # Find the specific run_id
        target_run = next((r for r in run if r.get("id") == run_id), None)
        if not target_run:
            raise ValueError(f"Run ID {run_id} not found or is not a failed run.")

        jobs = self.github.fetch_workflow_run_jobs(repo, run_id)

        annotations = {}
        for job in jobs:
            job_id = job.get("id")
            if job_id:
                annotations[job_id] = self.github.fetch_job_annotations(repo, job_id)

        # For simplicity, we don't fetch the exact workflow file content in this flow
        # but could be added by correlating run.workflow_id with fetch_workflows_content
        return self.gemini.analyze_workflow_health(target_run, jobs, annotations)

    def analyze_sync_issues(self, repo: str, pr_number: int) -> Dict:
        """
        Analyzes a PR diff to identify phantom changes or complex merge conflicts.
        """
        pr_details = self.github.fetch_pr_details(repo, pr_number)
        pr_diff = self.github.fetch_pr_diff(repo, pr_number)

        return self.gemini.analyze_pr_for_sync(pr_details, pr_diff)

    def start_jules_task(self, repo: str, branch: str, prompt: str, title: str = None) -> Dict:
        """
        Creates a new Jules session for a specific repo and branch with a given prompt.
        """
        source_id = self.jules.find_source_for_repo(repo)
        if not source_id:
            raise ValueError(f"Could not find a Jules source mapping for repository: {repo}")

        session = self.jules.create_session(
            prompt=prompt,
            source_id=source_id,
            branch=branch,
            title=title
        )

        session["ui_url"] = self.jules.get_session_url(session.get("name"))
        return session
