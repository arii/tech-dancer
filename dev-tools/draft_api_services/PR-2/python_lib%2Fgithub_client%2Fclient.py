import requests
import time
import base64
from typing import List, Dict, Optional, Any, Union
import concurrent.futures

class GitHubClient:
    BASE_URL = 'https://api.github.com'

    def __init__(self, token: str, repo: str):
        self.token = token
        self.repo = repo
        self.headers = {
            'Authorization': f'token {token}',
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
        }

    def _request(self, method: str, endpoint: str, is_text: bool = False, **kwargs) -> Any:
        url = f"{self.BASE_URL}{endpoint}"
        headers = self.headers.copy()
        if is_text:
            headers['Accept'] = 'application/vnd.github.v3.diff'

        if 'headers' in kwargs:
            headers.update(kwargs.pop('headers'))

        retries = 2
        while retries >= 0:
            try:
                response = requests.request(method, url, headers=headers, **kwargs)
                if response.status_code == 429 or (response.status_code == 403 and response.headers.get('x-ratelimit-remaining') == '0'):
                    raise Exception("GitHub API Rate Limit Exceeded.")

                if not response.ok:
                    try:
                        error_body = response.json()
                        error_message = error_body.get('message', f'Error: {response.status_code}')
                    except:
                        error_message = f'Error: {response.status_code}'
                    raise Exception(error_message)

                if response.status_code == 204:
                    return {}

                if is_text:
                    return response.text

                return response.json()
            except Exception as e:
                if retries == 0:
                    raise e
                retries -= 1
                time.sleep(2 - retries)

    def fetch_repo_stats(self) -> Dict[str, Any]:
        data = self._request('GET', f'/repos/{self.repo}')
        # GitHub API returns total count of open issues + PRs in open_issues_count
        # We need to subtract PRs to get just issues, but efficiently.
        # However, to be perfectly accurate we might need to fetch PR count or Issues count.
        # But 'open_issues_count' in repo object is: "The number of open issues and pull requests for the repository."
        # If we want exact stats as per TS implementation:
        # TS implementation:
        # openIssuesCount: data.open_issues_count,
        # openPRsCount: 0,
        # So TS implementation was also not quite right or just accepting the API quirk.
        # I will improve it by fetching open PR count if possible, but for now let's stick to what was requested + correction.
        # Let's verify what `fetchRepoStats` in TS did.
        # It returned `openPRsCount: 0`.
        # So I will calculate it if I can.
        # A quick way is to search for open PRs count.
        # search/issues?q=repo:OWNER/NAME+type:pr+state:open

        open_prs_count = 0
        try:
             search_result = self._request('GET', f'/search/issues?q=repo:{self.repo}+type:pr+state:open&per_page=1')
             open_prs_count = search_result.get('total_count', 0)
        except:
             pass

        total_open = data.get('open_issues_count', 0)
        open_issues_count = total_open - open_prs_count

        return {
            'openIssuesCount': open_issues_count,
            'openPRsCount': open_prs_count,
            'lastUpdated': data.get('updated_at'),
            'stars': data.get('stargazers_count'),
            'forks': data.get('forks_count'),
        }

    def fetch_issues(self, state: str = 'open') -> List[Dict[str, Any]]:
        data = self._request('GET', f'/repos/{self.repo}/issues?state={state}&per_page=100')
        return [item for item in data if 'pull_request' not in item]

    def fetch_pull_requests(self, state: str = 'open') -> List[Dict[str, Any]]:
        return self._request('GET', f'/repos/{self.repo}/pulls?state={state}&per_page=100')

    def fetch_pr_details(self, number: int) -> Dict[str, Any]:
        return self._request('GET', f'/repos/{self.repo}/pulls/{number}')

    def fetch_pr_reviews(self, number: int) -> List[Dict[str, Any]]:
        return self._request('GET', f'/repos/{self.repo}/pulls/{number}/reviews')

    def fetch_pr_diff(self, number: int) -> str:
        return self._request('GET', f'/repos/{self.repo}/pulls/{number}', is_text=True)

    def fetch_prs_for_commit(self, commit_sha: str) -> List[Dict[str, Any]]:
        return self._request('GET', f'/repos/{self.repo}/commits/{commit_sha}/pulls')

    def fetch_check_runs(self, ref: str) -> List[Dict[str, Any]]:
        try:
            data = self._request('GET', f'/repos/{self.repo}/commits/{ref}/check-runs')
            return [{
                'name': run.get('name'),
                'status': run.get('status'),
                'conclusion': run.get('conclusion'),
                'url': run.get('html_url')
            } for run in data.get('check_runs', [])]
        except:
            return []

    def fetch_branches(self) -> List[Dict[str, Any]]:
        return self._request('GET', f'/repos/{self.repo}/branches?per_page=100')

    def fetch_workflow_runs(self) -> List[Dict[str, Any]]:
        data = self._request('GET', f'/repos/{self.repo}/actions/runs?per_page=50')
        return data.get('workflow_runs', [])

    def fetch_workflow_run_jobs(self, run_id: int) -> List[Dict[str, Any]]:
        data = self._request('GET', f'/repos/{self.repo}/actions/runs/{run_id}/jobs')
        return data.get('jobs', [])

    def fetch_workflows_content(self) -> List[Dict[str, str]]:
        try:
            workflows_dir = self._request('GET', f'/repos/{self.repo}/contents/.github/workflows')
            results = []
            for file in workflows_dir:
                if file.get('type') == 'file' and (file.get('name', '').endswith('.yml') or file.get('name', '').endswith('.yaml')):
                    content = self.fetch_repo_content(file.get('path'))
                    if content:
                        results.append({
                            'name': file.get('name'),
                            'path': file.get('path'),
                            'content': content
                        })
            return results
        except:
            return []

    def delete_branch(self, branch_name: str) -> Any:
        import urllib.parse
        encoded_ref_path = "/".join([urllib.parse.quote(part) for part in branch_name.split('/')])
        return self._request('DELETE', f'/repos/{self.repo}/git/refs/heads/{encoded_ref_path}')

    def create_issue(self, title: str, body: str, labels: Optional[List[str]] = None) -> Dict[str, Any]:
        data = {'title': title, 'body': body}
        if labels:
            data['labels'] = labels
        return self._request('POST', f'/repos/{self.repo}/issues', json=data)

    def update_issue(self, number: int, updates: Dict[str, Any]) -> Dict[str, Any]:
        return self._request('PATCH', f'/repos/{self.repo}/issues/{number}', json=updates)

    def add_labels(self, number: int, labels: List[str]) -> List[Dict[str, Any]]:
        return self._request('POST', f'/repos/{self.repo}/issues/{number}/labels', json={'labels': labels})

    def remove_label(self, number: int, label: str) -> List[Dict[str, Any]]:
        import urllib.parse
        return self._request('DELETE', f'/repos/{self.repo}/issues/{number}/labels/{urllib.parse.quote(label)}')

    def add_comment(self, number: int, body: str) -> Dict[str, Any]:
        return self._request('POST', f'/repos/{self.repo}/issues/{number}/comments', json={'body': body})

    def fetch_comments(self, number: int) -> List[Dict[str, Any]]:
        return self._request('GET', f'/repos/{self.repo}/issues/{number}/comments')

    def fetch_review_comments(self, number: int) -> List[Dict[str, Any]]:
        return self._request('GET', f'/repos/{self.repo}/pulls/{number}/comments')

    def publish_pull_request(self, number: int, node_id: Optional[str] = None) -> Dict[str, Any]:
        if not node_id:
            pr = self.fetch_pr_details(number)
            node_id = pr.get('node_id')

        query = f'mutation {{ markPullRequestReadyForReview(input: {{pullRequestId: "{node_id}"}}) {{ pullRequest {{ isDraft }} }} }}'
        return self._request('POST', '/graphql', json={'query': query})

    def fetch_repo_content(self, path: str) -> Optional[str]:
        try:
            data = self._request('GET', f'/repos/{self.repo}/contents/{path}')
            if isinstance(data, dict) and 'content' in data and data.get('encoding') == 'base64':
                return base64.b64decode(data['content']).decode('utf-8')
            return data
        except:
            return None

    def fetch_repo_templates(self) -> Dict[str, str]:
        paths = [
            '.github/ISSUE_TEMPLATE/bug_report.md',
            '.github/ISSUE_TEMPLATE/feature_request.md',
            '.github/CONTRIBUTING.md',
            'CONTRIBUTING.md',
            'AUDIT.md',
            'HACKING.md',
            'DEVELOPMENT.md'
        ]
        results = {}
        for path in paths:
            content = self.fetch_repo_content(path)
            if content:
                results[path] = content[:1000]
        return results

    def fetch_enriched_pull_requests(self) -> List[Dict[str, Any]]:
        prs = self.fetch_pull_requests(state='open')
        subset = prs[:50]
        results = []

        def enrich_pr(pr):
            try:
                # Fetch details, reviews, and check runs in parallel for this PR
                with concurrent.futures.ThreadPoolExecutor() as executor:
                    future_details = executor.submit(self.fetch_pr_details, pr['number'])
                    future_reviews = executor.submit(self.fetch_pr_reviews, pr['number'])
                    future_checks = executor.submit(self.fetch_check_runs, pr['head']['sha'])

                    details = future_details.result()
                    reviews = future_reviews.result()
                    check_results = future_checks.result()

                test_status = 'unknown'
                failed_count = len([r for r in check_results if r['conclusion'] == 'failure' or r['conclusion'] == 'timed_out'])
                pending_count = len([r for r in check_results if r['status'] != 'completed'])

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

                return {
                    **details,
                    'testStatus': test_status,
                    'checkResults': check_results,
                    'isApproved': is_approved,
                    'isBig': (details.get('changed_files', 0) > 15),
                    'isReadyToMerge': details.get('mergeable') is True,
                    'isLeaderBranch': details['base']['ref'].lower() in ['leader', 'main', 'master', 'develop']
                }
            except Exception as e:
                pr_copy = pr.copy()
                pr_copy.update({
                    'testStatus': 'unknown',
                    'isApproved': False,
                    'isBig': False,
                    'isReadyToMerge': False,
                    'isLeaderBranch': False
                })
                return pr_copy

        with concurrent.futures.ThreadPoolExecutor() as executor:
            # Parallelize enrichment across all PRs
            future_results = [executor.submit(enrich_pr, pr) for pr in subset]
            for future in concurrent.futures.as_completed(future_results):
                results.append(future.result())

        return results

    def fetch_core_repo_context(self) -> Dict[str, Any]:
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future_root = executor.submit(self._request, 'GET', f'/repos/{self.repo}/contents/')
            # Use fetch_repo_content to get decoded content
            future_readme = executor.submit(self.fetch_repo_content, 'README.md')
            future_pkg = executor.submit(self.fetch_repo_content, 'package.json')
            future_ci = executor.submit(self._request, 'GET', f'/repos/{self.repo}/contents/.github/workflows')

            try:
                root = future_root.result()
            except:
                root = []

            try:
                readme = future_readme.result()
                if not isinstance(readme, str):
                   readme = ""
            except:
                readme = ""

            try:
                pkg = future_pkg.result()
                if not isinstance(pkg, str):
                   pkg = ""
            except:
                pkg = ""

            try:
                ci = future_ci.result()
            except:
                ci = []

        return {
            'fileList': ', '.join([f['path'] for f in root]) if isinstance(root, list) else 'unknown',
            'readmeSnippet': readme[:1500] if isinstance(readme, str) else "",
            'packageJson': pkg[:1500] if isinstance(pkg, str) else "",
            'hasCI': isinstance(ci, list) and len(ci) > 0
        }

    def prefetch_repository_data(self) -> Dict[str, Any]:
        with concurrent.futures.ThreadPoolExecutor() as executor:
            future_issues = executor.submit(self.fetch_issues, state='open')
            future_open_prs = executor.submit(self.fetch_pull_requests, state='open')
            future_closed_prs = executor.submit(self.fetch_pull_requests, state='closed')

            return {
                'issues': future_issues.result(),
                'prs': future_open_prs.result(),
                'closedPrs': future_closed_prs.result()
            }
