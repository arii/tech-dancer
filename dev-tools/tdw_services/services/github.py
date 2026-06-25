import os
import subprocess
import json
import sys
from tdw_services.utils import log_info
import base64
import requests
import time
from typing import Optional, List, Dict, Any

class GitHubClient:
    def __init__(self, token: Optional[str] = None, repo: Optional[str] = None):
        from utils import get_github_token
        self.token = token or get_github_token()
        if not self.token:
            raise ValueError("Missing GITHUB_TOKEN environment variable.")
        self.repo = repo or os.environ.get("GITHUB_REPOSITORY") or os.environ.get("GH_REPO")
        if not self.repo:
            self.repo = self._detect_repo()
        self.base_url = "https://api.github.com"

    def _detect_repo(self) -> str:
        try:
            proc = subprocess.run(['git', 'config', '--get', 'remote.origin.url'], capture_output=True, text=True)
            url = proc.stdout.strip()
            import re
            match = re.search(r'[:/]([^/]+/[^/.]+)(\.git)?$', url)
            return match.group(1) if match else url
        except Exception:
            return ""

    def run_authenticated_gh(self, command_args: List[str]) -> str:
        """Executes a GH CLI command using the PAT from environment."""
        env = os.environ.copy()
        # Forces GH to use the token without needing 'gh auth login'
        env["GH_TOKEN"] = self.token
        env["GITHUB_TOKEN"] = self.token

        proc = subprocess.run(["gh"] + command_args, env=env, capture_output=True, text=True)
        if proc.returncode != 0:
            raise Exception(f"GH command failed: {proc.stderr}")
        return proc.stdout

    def run_authenticated_gh_with_retry(self, command_args: List[str], max_retries: int = 3, delay: int = 5) -> str:
        """Executes a GH CLI command using the PAT with retry mechanism."""
        for attempt in range(max_retries):
            try:
                return self.run_authenticated_gh(command_args)
            except Exception as e:
                log_info(f"Attempt {attempt+1} failed: {e}")
                if attempt < max_retries - 1:
                    time.sleep(delay)
                else:
                    raise

    def _request(self, method: str, path: str, json_data: Optional[Dict] = None, is_text: bool = False, accept: Optional[str] = None, allow_redirects: bool = True) -> Any:
        url = f"{self.base_url}{path}"
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Accept": accept or ("application/vnd.github.v3.diff" if is_text else "application/vnd.github.v3+json"),
        }

        try:
            response = requests.request(
                method,
                url,
                headers=headers,
                json=json_data,
                timeout=30,
                allow_redirects=allow_redirects
            )
            response.raise_for_status()
            if is_text:
                return response.text
            return response.json()
        except requests.exceptions.RequestException as e:
             raise Exception(f"GitHub API Error: {e}")

    def search_open_prs(self, state: str = "open", include_drafts: bool = True, max_results: int = 10, labels: Optional[List[str]] = None) -> List[Dict[str, Any]]:
        """Searches for PRs with the given parameters and filters."""
        args = [
            "pr",
            "list",
            "--state", state,
            "--limit", str(max_results),
            "--json", "number,title,author,headRefName,baseRefName,isDraft,mergeStateStatus,reviewDecision,statusCheckRollup,updatedAt,url"
        ]

        if labels:
            args.append("--label")
            args.append(",".join(labels))

        res = self.run_authenticated_gh(args)
        prs = json.loads(res)

        if not include_drafts:
            prs = [pr for pr in prs if not pr.get("isDraft")]

        return prs

    def get_pr_diff_with_files(self, number: int) -> Dict[str, Any]:
        """Fetches the list of files changed in a PR and its diff text with size limits."""
        # Get files
        files_res = self.run_authenticated_gh(["pr", "view", str(number), "--json", "files"])
        files_data = json.loads(files_res).get("files", [])

        # Get diff text
        diff_text = self.run_authenticated_gh(["pr", "diff", str(number)])

        max_diff_size = 50000
        truncated = False
        if len(diff_text) > max_diff_size:
            diff_text = diff_text[:max_diff_size] + "\n\n... [Diff truncated due to size] ..."
            truncated = True

        formatted_files = []
        for f in files_data:
            formatted_files.append({
                "path": f.get("path"),
                "status": f.get("status", "modified"),
                "additions": f.get("additions"),
                "deletions": f.get("deletions")
            })

        return {
            "prNumber": number,
            "files": formatted_files,
            "diffText": diff_text,
            "truncated": truncated
        }

    def fetch_pr_files(self, number: int) -> List[Dict[str, Any]]:
        """Fetches the list of files changed in a PR."""
        return self._request('GET', f'/repos/{self.repo}/pulls/{number}/files')

    def fetch_pr_details(self, number: int) -> Dict[str, Any]:
        return self._request('GET', f'/repos/{self.repo}/pulls/{number}')

    def fetch_pr_diff(self, number: int) -> str:
        return self._request('GET', f'/repos/{self.repo}/pulls/{number}', is_text=True)

    def fetch_prs_for_commit(self, commit_sha: str) -> List[Dict[str, Any]]:
        return self._request('GET', f'/repos/{self.repo}/commits/{commit_sha}/pulls')

    def fetch_check_runs(self, ref: str) -> List[Dict[str, Any]]:
        try:
            res = self.run_authenticated_gh(['api', f'/repos/{self.repo}/commits/{ref}/check-runs'])
            data = json.loads(res)
            return [{
                'id': run.get('id'),
                'name': run.get('name'),
                'status': run.get('status'),
                'conclusion': run.get('conclusion'),
                'url': run.get('html_url'),
                'external_id': run.get('external_id')
            } for run in data.get('check_runs', [])]
        except Exception:
            return []

    def read_ci_logs(self, pr_number: int) -> Dict[str, Any]:
        """Fetches CI logs for a given PR."""
        # Get head ref SHA
        pr_data_res = self.run_authenticated_gh(["pr", "view", str(pr_number), "--json", "headRefOid"])
        head_ref_oid = json.loads(pr_data_res).get("headRefOid")

        if not head_ref_oid:
            raise Exception("Failed to get PR head SHA")

        # Get check runs
        checks_res = self.run_authenticated_gh(["api", f"/repos/{self.repo}/commits/{head_ref_oid}/check-runs", "--jq", ".check_runs[] | {id, name, status, conclusion, html_url}"])

        checks = []
        for line in checks_res.strip().split("\n"):
            if line:
                checks.append(json.loads(line))

        failed_checks = [c for c in checks if c.get("conclusion") == "failure"]
        logs = {}

        # Get check suites to find runs
        runs_res = self.run_authenticated_gh(["api", f"/repos/{self.repo}/commits/{head_ref_oid}/check-suites"])
        check_suites = json.loads(runs_res).get("check_suites", [])

        for suite in check_suites:
            try:
                jobs_res = self.run_authenticated_gh(["api", f"/repos/{self.repo}/check-suites/{suite['id']}/check-runs"])
                runs = json.loads(jobs_res).get("check_runs", [])

                for run in runs:
                    if run.get("conclusion") == "failure":
                        try:
                            log_res = self.run_authenticated_gh(["api", f"/repos/{self.repo}/actions/jobs/{run['id']}/logs"])
                            logs[run["name"]] = log_res[:10000]
                        except Exception:
                            pass
            except Exception:
                pass

        return {
            "checks": checks,
            "failedChecks": failed_checks,
            "logs": logs
        }

    def fetch_check_run_logs(self, check_run_id: int, external_id: Optional[str] = None) -> str:
        """Fetches logs for a specific check run, using external_id (job_id) if available. Gracefully fallback to check_run_id if external_id 404s."""
        # Ensure we have a valid ID and it's a string for the URL path
        job_id = str(external_id) if external_id is not None else str(check_run_id)
        try:
            # GitHub API returns a 302 redirect to a URL that expires after a few minutes
            # We explicitly set Accept to None or a generic type to avoid the .diff default in _request
            return self._request('GET', f'/repos/{self.repo}/actions/jobs/{job_id}/logs', is_text=True, accept="application/vnd.github.v3+json", allow_redirects=True)
        except Exception as e:
            error_msg = str(e)
            if external_id is not None and "404" in error_msg:
                # Fallback to query by raw check_run_id
                job_id = str(check_run_id)
                try:
                    return self._request('GET', f'/repos/{self.repo}/actions/jobs/{job_id}/logs', is_text=True, accept="application/vnd.github.v3+json")
                except Exception as fallback_e:
                    return f"Failed to fetch logs for job {job_id} after fallback: {str(fallback_e)}"
            return f"Failed to fetch logs for job {job_id}: {error_msg}"

    def create_issue_comment(self, number: int, body: str) -> Dict[str, Any]:
        return self._request('POST', f'/repos/{self.repo}/issues/{number}/comments', json_data={'body': body})

    def create_review(self, number: int, body: str, comments: List[Dict[str, Any]], event: str) -> Dict[str, Any]:
        data = {
            "body": body,
            "event": event,
            "comments": comments
        }
        return self._request('POST', f'/repos/{self.repo}/pulls/{number}/reviews', json_data=data)

    def download_zipball(self, ref: str, dest: str = "repo.zip") -> None:
        """A stateless download helper for the Orchestrator"""
        url = f"{self.base_url}/repos/{self.repo}/zipball/{ref}"
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(url, headers=headers, stream=True)
        response.raise_for_status()
        with open(dest, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        subprocess.run(["unzip", "-o", dest], check=True)
