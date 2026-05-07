import requests
import json
import base64
import os
import time
from typing import Dict, Any, List, Optional
from urllib.parse import urlparse, parse_qs

class GithubService:
    BASE_URL = "https://api.github.com"

    def __init__(self, token: str = None):
        self.token = token or os.environ.get("GITHUB_TOKEN")

    def _request(self, method: str, endpoint: str, headers: Dict = None, **kwargs) -> Any:
        if headers is None:
            headers = {}

        req_headers = {"Accept": "application/vnd.github.v3+json"}
        if self.token:
            req_headers["Authorization"] = f"token {self.token}"

        req_headers.update(headers)

        full_url = f"{self.BASE_URL}{endpoint}"

        retries = 2
        while retries >= 0:
            try:
                response = requests.request(method, full_url, headers=req_headers, timeout=30, **kwargs)

                if response.status_code == 429 or (response.status_code == 403 and response.headers.get("x-ratelimit-remaining") == "0"):
                    raise Exception("GitHub API Rate Limit Exceeded.")

                if response.status_code == 204:
                    return None

                response.raise_for_status()

                content_type = response.headers.get("Content-Type", "")
                if "application/json" in content_type:
                    return response.json()
                else:
                    return response.text
            except requests.exceptions.Timeout:
                if retries == 0:
                    raise Exception(f"Request timed out. Target: {full_url}")
                retries -= 1
                time.sleep(1)
            except requests.exceptions.RequestException as e:
                if retries == 0:
                    try:
                        error_body = e.response.json()
                        error_message = error_body.get("message", str(e))
                        raise Exception(f"GitHub API Error ({e.response.status_code}): {error_message}")
                    except (ValueError, AttributeError):
                        raise Exception(f"Network error: Failed to reach GitHub API. {str(e)}")
                retries -= 1
                time.sleep(1)

    def fetch_pull_requests(self, repo: str, state: str = "open") -> List[Dict]:
        return self._request("GET", f"/repos/{repo}/pulls?state={state}&per_page=100")

    def fetch_pr_details(self, repo: str, number: int) -> Dict:
        return self._request("GET", f"/repos/{repo}/pulls/{number}")

    def fetch_pr_diff(self, repo: str, number: int) -> str:
        headers = {"Accept": "application/vnd.github.v3.diff"}
        diff = self._request("GET", f"/repos/{repo}/pulls/{number}", headers=headers)
        return self._prune_diff(diff)

    def _prune_diff(self, diff: str) -> str:
        if not diff:
            return ""

        ignored_files = [
            'pnpm-lock.yaml', 'package-lock.json', 'yarn.lock', 'bun.lockb',
            'composer.lock', 'Gemfile.lock', 'Cargo.lock', 'mix.lock', 'poetry.lock'
        ]
        ignored_extensions = ['.map', '.min.js', '.min.css']

        sections = diff.split("diff --git ")
        if len(sections) <= 1:
            return diff

        header = sections[0]
        pruned_sections = []

        for section in sections[1:]:
            first_line = section.split('\n')[0]
            # First line looks like: a/package.json b/package.json
            parts = first_line.split(" b/")
            if len(parts) < 2:
                pruned_sections.append(section)
                continue

            path = parts[1].split()[0]
            file_name = path.split('/')[-1].lower()

            is_ignored_file = any(f.lower() == file_name for f in ignored_files)
            is_ignored_extension = any(path.lower().endswith(ext) for ext in ignored_extensions)

            if "GIT binary patch" in section or "Binary files differ" in section:
                continue

            if not is_ignored_file and not is_ignored_extension:
                pruned_sections.append(section)

        if not pruned_sections:
             return header
        return header + "diff --git " + "diff --git ".join(pruned_sections)

    def fetch_check_runs(self, repo: str, ref: str) -> List[Dict]:
        try:
            data = self._request("GET", f"/repos/{repo}/commits/{ref}/check-runs")
            return [
                {
                    "name": run.get("name"),
                    "status": run.get("status"),
                    "conclusion": run.get("conclusion"),
                    "url": run.get("html_url")
                }
                for run in data.get("check_runs", [])
            ]
        except Exception:
            return []

    def fetch_combined_status(self, repo: str, ref: str) -> Dict:
        try:
            data = self._request("GET", f"/repos/{repo}/commits/{ref}/status")
            return {
                "state": data.get("state"),
                "statuses": [
                    {
                        "name": s.get("context"),
                        "status": s.get("state"),
                        "conclusion": "success" if s.get("state") == "success" else ("failure" if s.get("state") != "pending" else None),
                        "url": s.get("target_url")
                    }
                    for s in data.get("statuses", [])
                ]
            }
        except Exception:
            return {"state": "unknown", "statuses": []}

    def fetch_workflow_runs(self, repo: str, page: int = 1, status: str = None) -> List[Dict]:
        status_param = f"&status={status}" if status else ""
        data = self._request("GET", f"/repos/{repo}/actions/runs?per_page=100&page={page}{status_param}")
        return data.get("workflow_runs", [])

    def fetch_workflow_run_jobs(self, repo: str, run_id: int) -> List[Dict]:
        data = self._request("GET", f"/repos/{repo}/actions/runs/{run_id}/jobs")
        return data.get("jobs", [])

    def fetch_job_annotations(self, repo: str, job_id: int) -> List[Dict]:
        try:
            return self._request("GET", f"/repos/{repo}/check-runs/{job_id}/annotations")
        except Exception:
            return []

    def fetch_workflows_content(self, repo: str) -> List[Dict]:
        try:
            workflows_dir = self._request("GET", f"/repos/{repo}/contents/.github/workflows")
            results = []
            for file in workflows_dir:
                if file.get("type") == "file" and (file.get("name").endswith(".yml") or file.get("name").endswith(".yaml")):
                    content = self.fetch_repo_content(repo, file.get("path"))
                    if content:
                        results.append({"name": file.get("name"), "path": file.get("path"), "content": content})
            return results
        except Exception:
            return []

    def fetch_repo_content(self, repo: str, path: str) -> Any:
        try:
            data = self._request("GET", f"/repos/{repo}/contents/{path}")
            if isinstance(data, dict) and data.get("encoding") == "base64" and data.get("content"):
                return base64.b64decode(data["content"]).decode("utf-8")
            return data
        except Exception:
            return None

    def create_issue(self, repo: str, title: str, body: str, labels: List[str] = None) -> Dict:
        payload = {"title": title, "body": body}
        if labels:
            payload["labels"] = labels
        return self._request("POST", f"/repos/{repo}/issues", json=payload)

    def update_issue(self, repo: str, number: int, updates: Dict) -> Dict:
        return self._request("PATCH", f"/repos/{repo}/issues/{number}", json=updates)

    def add_labels(self, repo: str, number: int, labels: List[str]) -> Dict:
        return self._request("POST", f"/repos/{repo}/issues/{number}/labels", json={"labels": labels})

    def remove_label(self, repo: str, number: int, label: str) -> Dict:
        return self._request("DELETE", f"/repos/{repo}/issues/{number}/labels/{label}")

    def add_comment(self, repo: str, number: int, body: str) -> Dict:
        return self._request("POST", f"/repos/{repo}/issues/{number}/comments", json={"body": body})

    def update_pull_request_branch(self, repo: str, number: int) -> Dict:
        return self._request("PUT", f"/repos/{repo}/pulls/{number}/update-branch")

    def fetch_comments(self, repo: str, number: int) -> List[Dict]:
        return self._request("GET", f"/repos/{repo}/issues/{number}/comments")

    def fetch_review_comments(self, repo: str, number: int) -> List[Dict]:
        return self._request("GET", f"/repos/{repo}/pulls/{number}/comments")

    def fetch_pr_reviews(self, repo: str, number: int) -> List[Dict]:
        return self._request("GET", f"/repos/{repo}/pulls/{number}/reviews")

    def find_pr_preview_url(self, repo: str, number: int) -> Optional[str]:
        try:
            comments = self.fetch_comments(repo, number)
            review_comments = self.fetch_review_comments(repo, number)
            all_comments = comments + review_comments
            all_comments.sort(key=lambda x: x.get("created_at", ""), reverse=True)

            patterns = [
                "vercel.app", "netlify.app", "cloudflare.com", "github.io",
                "amplifyapp.com", "render.com", "Deploy preview URL:",
                "Preview:", "Visit preview:"
            ]

            for comment in all_comments:
                body = comment.get("body", "")
                if not body:
                    continue
                # simplistic search
                for pattern in patterns:
                    if pattern in body:
                        # Extract URL - simplistic extraction
                        words = body.split()
                        for word in words:
                            if word.startswith("http") and pattern in word:
                                return word.strip("()[]{},")
            return None
        except Exception:
            return None

    def publish_pull_request(self, repo: str, number: int, node_id: str = None) -> Dict:
        if not node_id:
            pr = self.fetch_pr_details(repo, number)
            node_id = pr.get("node_id")

        query = f'mutation {{ markPullRequestReadyForReview(input: {{pullRequestId: "{node_id}"}}) {{ pullRequest {{ isDraft }} }} }}'
        return self._request("POST", "/graphql", json={"query": query})

    def enrich_single_pr(self, repo: str, pr: Dict, include_reviews: bool = False) -> Dict:
        number = pr.get("number")
        sha = pr.get("head", {}).get("sha")

        details = self.fetch_pr_details(repo, number)
        reviews = self.fetch_pr_reviews(repo, number) if include_reviews else []
        check_results = self.fetch_check_runs(repo, sha)

        commit_status = {"state": "unknown", "statuses": []}
        if not check_results:
             commit_status = self.fetch_combined_status(repo, sha)

        all_checks = check_results + commit_status.get("statuses", [])

        # Derive test status
        failed_count = sum(1 for r in all_checks if r.get("conclusion") in ['failure', 'timed_out', 'action_required'])
        pending_count = sum(1 for r in all_checks if r.get("status") not in ['completed', 'success', 'skipped', 'cancelled'])

        test_status = "unknown"
        if failed_count > 0:
            test_status = "failed"
        elif pending_count > 0:
            test_status = "pending"
        elif len(all_checks) > 0:
            all_passed = all(r.get("conclusion") in ['success', 'skipped', 'neutral'] for r in all_checks)
            test_status = "passed" if all_passed else "failed"
        else:
            state = commit_status.get("state")
            if state == "success": test_status = "passed"
            elif state in ["failure", "error"]: test_status = "failed"
            elif state == "pending": test_status = "pending"

        latest_reviews = {}
        for r in reviews:
             if r.get("user"):
                 latest_reviews[r["user"].get("login")] = r.get("state")

        review_states = list(latest_reviews.values())
        is_approved = "APPROVED" in review_states and "CHANGES_REQUESTED" not in review_states

        base_ref = details.get("base", {}).get("ref", "").lower()

        enriched = dict(details)
        enriched.update({
            "testStatus": test_status,
            "checkResults": all_checks,
            "isApproved": is_approved,
            "isBig": details.get("changed_files", 0) > 15,
            "isReadyToMerge": details.get("mergeable") is True,
            "isLeaderBranch": base_ref in ['leader', 'main', 'master', 'develop']
        })
        return enriched
