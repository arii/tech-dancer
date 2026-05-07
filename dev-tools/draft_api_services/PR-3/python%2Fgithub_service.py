import os
import requests
import json
import time
from typing import List, Optional, Dict, Any, Union
from .types import (
    GithubIssue, GithubPullRequest, RepoStats, EnrichedPullRequest,
    GithubWorkflowRun, GithubWorkflowJob
)

BASE_URL = 'https://api.github.com'

class GithubService:
    def __init__(self, token: Optional[str] = None):
        self.token = token
        self._cache = {}

    def _request(self, endpoint: str, method: str = 'GET', data: Optional[Dict] = None, headers: Optional[Dict] = None, is_text: bool = False) -> Any:
        url = f"{BASE_URL}{endpoint}"
        req_headers = {
            'Accept': 'application/vnd.github.v3.diff' if is_text else 'application/vnd.github.v3+json',
        }
        if not is_text:
             req_headers['Content-Type'] = 'application/json'

        if self.token:
            req_headers['Authorization'] = f"token {self.token}"

        if headers:
            req_headers.update(headers)

        response = requests.request(method, url, headers=req_headers, json=data)

        if response.status_code == 429 or (response.status_code == 403 and response.headers.get('x-ratelimit-remaining') == '0'):
            raise Exception("GitHub API Rate Limit Exceeded.")

        if not response.ok:
            error_message = f"Error: {response.status_code}"
            try:
                error_body = response.json()
                if 'message' in error_body:
                    error_message = error_body['message']
            except:
                pass
            raise Exception(error_message)

        if method != 'GET' and response.status_code == 204:
            return {}

        if is_text:
            return response.text

        return response.json()

    def fetch_repo_stats(self, repo: str) -> RepoStats:
        data = self._request(f"/repos/{repo}")

        # Get open PR count via search API as it's not in standard repo stats
        try:
            search_data = self._request(f"/search/issues?q=repo:{repo}+is:pr+is:open")
            open_prs_count = search_data.get('total_count', 0)
        except:
            open_prs_count = 0

        return {
            'openIssuesCount': data['open_issues_count'],
            'openPRsCount': open_prs_count,
            'lastUpdated': data['updated_at'],
            'stars': data['stargazers_count'],
            'forks': data['forks_count'],
        }

    def get_velocity(self, repo: str) -> Dict[str, int]:
        from datetime import datetime, timedelta

        one_week_ago = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')

        # Count opened issues/PRs
        opened_query = f"repo:{repo} created:>{one_week_ago}"
        opened_data = self._request(f"/search/issues?q={requests.utils.quote(opened_query)}")

        # Count closed issues/PRs
        closed_query = f"repo:{repo} closed:>{one_week_ago}"
        closed_data = self._request(f"/search/issues?q={requests.utils.quote(closed_query)}")

        return {
            'opened': opened_data.get('total_count', 0),
            'closed': closed_data.get('total_count', 0)
        }

    def fetch_issues(self, repo: str, state: str = 'open') -> List[GithubIssue]:
        data = self._request(f"/repos/{repo}/issues?state={state}&per_page=100")
        return [item for item in data if 'pull_request' not in item]

    def fetch_pull_requests(self, repo: str, state: str = 'open') -> List[GithubPullRequest]:
        return self._request(f"/repos/{repo}/pulls?state={state}&per_page=100")

    def fetch_pr_details(self, repo: str, number: int) -> GithubPullRequest:
        return self._request(f"/repos/{repo}/pulls/{number}")

    def fetch_pr_reviews(self, repo: str, number: int) -> List[Any]:
        return self._request(f"/repos/{repo}/pulls/{number}/reviews")

    def fetch_pr_diff(self, repo: str, number: int) -> str:
        return self._request(f"/repos/{repo}/pulls/{number}", is_text=True)

    def fetch_check_runs(self, repo: str, ref: str) -> List[Dict[str, Any]]:
        try:
            data = self._request(f"/repos/{repo}/commits/{ref}/check-runs")
            return [{
                'name': run['name'],
                'status': run['status'],
                'conclusion': run['conclusion'],
                'url': run['html_url']
            } for run in data['check_runs']]
        except:
            return []

    def fetch_workflow_runs(self, repo: str) -> List[GithubWorkflowRun]:
        data = self._request(f"/repos/{repo}/actions/runs?per_page=50")
        return data.get('workflow_runs', [])

    def fetch_workflow_run_jobs(self, repo: str, run_id: int) -> List[GithubWorkflowJob]:
        data = self._request(f"/repos/{repo}/actions/runs/{run_id}/jobs")
        return data.get('jobs', [])

    def fetch_repo_content(self, repo: str, path: str) -> Any:
        try:
            data = self._request(f"/repos/{repo}/contents/{path}")
            if not isinstance(data, list) and data.get('content') and data.get('encoding') == 'base64':
                import base64
                return base64.b64decode(data['content']).decode('utf-8')
            return data
        except:
            return None

    def fetch_workflows_content(self, repo: str) -> List[Dict[str, str]]:
        try:
            workflows_dir = self._request(f"/repos/{repo}/contents/.github/workflows")
            results = []
            for file in workflows_dir:
                if file['type'] == 'file' and (file['name'].endswith('.yml') or file['name'].endswith('.yaml')):
                    content = self.fetch_repo_content(repo, file['path'])
                    if content:
                        results.append({'name': file['name'], 'path': file['path'], 'content': content})
            return results
        except:
            return []

    def create_issue(self, repo: str, issue: Dict[str, Any]) -> Any:
        return self._request(f"/repos/{repo}/issues", method='POST', data=issue)

    def update_issue(self, repo: str, number: int, updates: Dict[str, Any]) -> Any:
        return self._request(f"/repos/{repo}/issues/{number}", method='PATCH', data=updates)

    def add_comment(self, repo: str, number: int, body: str) -> Any:
        return self._request(f"/repos/{repo}/issues/{number}/comments", method='POST', data={'body': body})

    def fetch_enriched_pull_requests(self, repo: str) -> List[EnrichedPullRequest]:
        prs = self.fetch_pull_requests(repo, 'open')
        subset = prs[:50]
        results: List[EnrichedPullRequest] = []

        for pr in subset:
            try:
                details = self.fetch_pr_details(repo, pr['number'])
                reviews = self.fetch_pr_reviews(repo, pr['number'])
                check_results = self.fetch_check_runs(repo, pr['head']['sha'])

                failed_count = len([r for r in check_results if r['conclusion'] in ['failure', 'timed_out']])
                pending_count = len([r for r in check_results if r['status'] != 'completed'])

                test_status = 'unknown'
                if failed_count > 0:
                    test_status = 'failed'
                elif pending_count > 0:
                    test_status = 'pending'
                elif len(check_results) > 0:
                    test_status = 'passed'

                latest_reviews_by_user = {}
                for r in reviews:
                    latest_reviews_by_user[r['user']['login']] = r['state']

                review_states = list(latest_reviews_by_user.values())
                is_approved = 'APPROVED' in review_states and 'CHANGES_REQUESTED' not in review_states

                results.append({
                    **details,
                    'testStatus': test_status,
                    'checkResults': check_results,
                    'isApproved': is_approved,
                    'isBig': (details.get('changed_files', 0) or 0) > 15,
                    'isReadyToMerge': details.get('mergeable') is True,
                    'isLeaderBranch': details['base']['ref'].lower() in ['leader', 'main', 'master', 'develop']
                })
            except Exception as e:
                # Fallback if enrichment fails
                results.append({
                    **pr,
                    'testStatus': 'unknown',
                    'checkResults': [],
                    'isApproved': False,
                    'isBig': False,
                    'isReadyToMerge': False,
                    'isLeaderBranch': False
                })
        return results

    def fetch_core_repo_context(self, repo: str) -> Dict[str, Any]:
        try:
            root = self._request(f"/repos/{repo}/contents/")
            file_list = ", ".join([f['path'] for f in root]) if isinstance(root, list) else 'unknown'
        except:
            file_list = 'unknown'

        readme = self.fetch_repo_content(repo, 'README.md') or ""
        package_json = self.fetch_repo_content(repo, 'package.json') or ""

        try:
            ci = self._request(f"/repos/{repo}/contents/.github/workflows")
            has_ci = isinstance(ci, list) and len(ci) > 0
        except:
            has_ci = False

        return {
            'fileList': file_list,
            'readmeSnippet': readme[:1500] if readme else "",
            'packageJson': package_json[:1500] if package_json else "",
            'hasCI': has_ci
        }

    def fetch_repo_templates(self, repo: str) -> Dict[str, str]:
        paths = [
            '.github/ISSUE_TEMPLATE/bug_report.md',
            '.github/ISSUE_TEMPLATE/feature_request.md',
            '.github/CONTRIBUTING.md',
            'CONTRIBUTING.md',
            'AUDIT.md',
            'HACKING.md',
            'DEVELOPMENT.md'
        ]
        templates = {}
        for path in paths:
            content = self.fetch_repo_content(repo, path)
            if content:
                templates[path] = content[:1000]
        return templates

    def prefetch_repository_data(self, repo: str) -> Dict[str, Any]:
        return {
            'issues': self.fetch_issues(repo, 'open'),
            'prs': self.fetch_pull_requests(repo, 'open'),
            'closedPrs': self.fetch_pull_requests(repo, 'closed')
        }
