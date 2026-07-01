import os
import re
import shutil
import subprocess
from typing import Dict, Any, List, Optional
from collections import defaultdict
from dev_tools.utils import run_command, CLIError, clean_gha_logs, extract_failing_info
from dev_tools.config import get_config

PROJECT_CONFIG = get_config()

class PRService:
    def __init__(self, github_client):
        self.github = github_client

    def list_prs(self, state: str = "open", limit: int = 100, include_drafts: bool = True, labels: Optional[List[str]] = None) -> Dict[str, Any]:
        prs = self.github.list_pull_requests(state=state, limit=limit, labels=labels)
        if not include_drafts:
            prs = [pr for pr in prs if not pr.get("isDraft")]
        return {"prs": prs}

    def get_ci_logs(self, pr_number: int, include_all: bool = False) -> Dict[str, Any]:
        pr_data = self.github.fetch_pr_details(pr_number)
        head_sha = pr_data.get("head", {}).get("sha")
        if not head_sha:
            raise CLIError(f"Could not determine head SHA for PR #{pr_number}")
        checks = self.github.fetch_check_runs(head_sha)
        failed_checks = [c for c in checks if c.get("conclusion") == "failure"]
        logs = {}
        check_suites = self.github.fetch_check_suites(head_sha)
        for suite in check_suites:
            runs = self.github.fetch_check_runs_for_suite(suite['id'])
            for run in runs:
                if include_all or run.get("conclusion") == "failure":
                    log_content = self.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))
                    logs[run["name"]] = log_content[:10000]
        return {"checks": checks, "failedChecks": failed_checks, "logs": logs}

    def stream_ci_logs(self, pr_number: int, grep: Optional[str] = None) -> str:
        pr_data = self.github.fetch_pr_details(pr_number)
        head_sha = pr_data.get("head", {}).get("sha")
        if not head_sha: raise CLIError(f"Could not determine head SHA for PR #{pr_number}")
        check_runs = self.github.fetch_check_runs(head_sha)
        all_logs = []
        for run in check_runs[:20]:
            log_content = self.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))
            all_logs.append(f"--- LOGS FOR JOB: {run['name']} (ID: {run['id']}) ---")
            all_logs.append(log_content[-20000:])
            all_logs.append("\n")
        combined_logs = "\n".join(all_logs)
        if grep:
            grep_pattern = grep.lower()
            return "\n".join([line for line in combined_logs.splitlines() if grep_pattern in line.lower()])
        return combined_logs

    def get_merge_conflicts(self, pr_number: int, base_branch: str = None) -> Dict[str, Any]:
        if base_branch is None: base_branch = PROJECT_CONFIG.base_branch_name
        pr_data = self.github.fetch_pr_details(pr_number)
        head_ref = pr_data.get("head", {}).get("ref")
        if not head_ref: raise CLIError(f"Could not determine head ref for PR #{pr_number}")
        run_command(["git", "fetch", "origin", head_ref])
        run_command(["git", "fetch", "origin", base_branch])
        worktree_path = os.path.join(os.getcwd(), f"worktree-conflict-{pr_number}.tmp")
        if os.path.exists(worktree_path): shutil.rmtree(worktree_path, ignore_errors=True)
        run_command(["git", "worktree", "add", worktree_path, f"origin/{head_ref}"])
        conflict_files = []
        command_log = ""
        try:
            res = run_command(["git", "merge", "--no-commit", "--no-ff", f"origin/{base_branch}"], cwd=worktree_path, check=False)
            command_log = res.stdout + res.stderr
            if res.returncode != 0:
                res_diff = run_command(["git", "diff", "--name-only", "--diff-filter=U"], cwd=worktree_path, check=False)
                conflict_files = [f.strip() for f in res_diff.stdout.splitlines() if f.strip()]
                run_command(["git", "merge", "--abort"], cwd=worktree_path, check=False)
        finally:
            run_command(["git", "worktree", "remove", "-f", worktree_path], check=False)
            if os.path.exists(worktree_path): shutil.rmtree(worktree_path, ignore_errors=True)
        return {"prNumber": pr_number, "baseBranch": base_branch, "headRef": head_ref, "conflictFiles": conflict_files, "commandLog": command_log}

    def get_pr_diff_shapen(self, pr_number: int) -> Dict[str, Any]:
        files = self.github.fetch_pr_files(pr_number)
        diff_text = self.github.fetch_pr_diff(pr_number)
        MAX_DIFF_SIZE = 50000
        truncated = False
        if len(diff_text) > MAX_DIFF_SIZE:
            diff_text = diff_text[:MAX_DIFF_SIZE] + "\n\n... [Diff truncated due to size] ..."
            truncated = True
        return {
            "prNumber": pr_number,
            "files": [{"path": f.get("filename"), "status": f.get("status") or "modified", "additions": f.get("additions"), "deletions": f.get("deletions")} for f in files],
            "diffText": diff_text,
            "truncated": truncated
        }

    def aggregate_prs(self, target_branch: str, pr_numbers: List[int]) -> Dict[str, Any]:
        base_branch = PROJECT_CONFIG.base_branch_name
        run_command(["git", "checkout", base_branch])
        run_command(["git", "pull", "origin", base_branch])
        run_command(["git", "checkout", "-b", target_branch])
        aggregate_body = ""
        successfully_merged = []
        for pr_num in pr_numbers:
            pr_data = self.github.fetch_pr_details(pr_num)
            head_ref = pr_data.get('head', {}).get('ref')
            if not head_ref: raise CLIError(f"Could not determine head ref for PR #{pr_num}")
            run_command(["git", "fetch", "origin", f"pull/{pr_num}/head:{head_ref}"])
            run_command(["git", "checkout", target_branch])
            res = run_command(["git", "merge", head_ref, "-m", f"Merging PR #{pr_num}"], check=False)
            if res.returncode != 0:
                run_command(["git", "merge", "--abort"])
                raise CLIError(f"CRITICAL: Conflict in PR #{pr_num}.", code=res.returncode)
            successfully_merged.append(pr_num)
            aggregate_body += f"Closes #{pr_num}\n\n### Description from PR #{pr_num}:\n{pr_data.get('body')}\n\n---\n"
        run_command(["git", "push", "-u", "origin", target_branch])
        pr_res = self.github.create_pull_request(f"Aggregated Feature: {target_branch}", aggregate_body, target_branch, base_branch)
        return {"status": "success", "branch": target_branch, "merged_prs": successfully_merged, "pr_url": pr_res.get("html_url"), "message": f"Successfully aggregated {len(successfully_merged)} PRs"}

    def update_issue(self, issue_number: int, body: Optional[str] = None, labels: Optional[List[str]] = None, add_labels: Optional[List[str]] = None, remove_labels: Optional[List[str]] = None, state: Optional[str] = None) -> Dict[str, Any]:
        if body is not None and not body.strip(): raise CLIError("Issue body cannot be empty.")
        res = None
        if labels is not None and (add_labels or remove_labels):
            raise CLIError("Cannot combine full label replacement (--labels) with incremental changes (--add-labels, --remove-labels)")

        update_kwargs = {}
        if body is not None: update_kwargs['body'] = body
        if labels is not None: update_kwargs['labels'] = labels
        if state is not None: update_kwargs['state'] = state

        if update_kwargs:
            res = self.github.update_issue(issue_number, **update_kwargs)

        if add_labels:
            res = self.github.add_labels(issue_number, add_labels)

        if remove_labels:
            for label in remove_labels:
                self.github.remove_label(issue_number, label)
            if res is None and not update_kwargs:
                res = self.github.fetch_issue_details(issue_number)

        if res is None:
            raise CLIError("Nothing to update.")
        return res
