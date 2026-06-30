import os
import re
import sys
from datetime import datetime
from typing import Dict, Any, Optional
from dev_tools.utils import run_command, CLIError, clean_gha_logs, extract_failing_info, get_repo_name, get_github_client
from dev_tools.config import get_config

PROJECT_CONFIG = get_config()

class RemediationService:
    def __init__(self, orchestrator):
        self.orchestrator = orchestrator

    def fix_ci(self, pr_number: Optional[int] = None, branch: Optional[str] = None, api_key: Optional[str] = None, dry_run: bool = True) -> Dict[str, Any]:
        repo_name = get_repo_name()
        g = get_github_client()
        repo = g.get_repo(repo_name)
        if pr_number:
            pr = repo.get_pull(int(pr_number))
            branch = pr.head.ref
        else:
            branch = branch or run_command(['git', 'branch', '--show-current']).strip()
            pulls = list(repo.get_pulls(state='open', head=f"{repo.owner.login}:{branch}"))
            pr = pulls[0] if pulls else None

        if not pr: raise CLIError(f"Could not find PR for branch {branch}")
        if api_key: self.orchestrator.jules.api_key = api_key

        # Analyze failing check runs
        check_runs = self.orchestrator.github.fetch_check_runs(pr.head.sha)
        failing_logs = []
        structured_failures = []
        for run in check_runs:
            if run.get('conclusion') == 'failure':
                logs = self.orchestrator.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))
                cleaned_logs = clean_gha_logs(logs)
                important_lines = [l for l in cleaned_logs.splitlines() if any(x in l.lower() for x in ['error', 'fail', 'ts', 'vitest', 'playwright', '🔴'])]
                snippet = "\n".join(important_lines[-30:]) if important_lines else cleaned_logs[-2000:]
                failing_logs.append(f"Check Run: {run.get('name')}\nLogs:\n{snippet}")
                findings = extract_failing_info(logs)
                for f in findings:
                    structured_failures.append(f"File: {f['file']}, Line: {f['line']}, Error: {f['message']} ({f['type']})")

        # Load prompt template
        prompt_path = "boomtick-pkg/mcp/src/agents/fix-ci.prompt.md"
        if not os.path.exists(prompt_path):
             raise CLIError(f"Prompt template missing: {prompt_path}")

        with open(prompt_path, 'r') as f:
            prompt = f.read().replace('{{base_branch_name}}', PROJECT_CONFIG.base_branch_name)
            prompt = prompt.replace('{{base_branch}}', PROJECT_CONFIG.base_branch)

        if structured_failures:
            prompt += "\n\n## CI Failure Analysis\n\nStructured Failure Analysis:\n- " + "\n- ".join(structured_failures)
        if failing_logs:
            prompt += "\n\nDetailed Failing Logs (Snippets):\n" + "\n---\n".join(failing_logs)

        source_id = self.orchestrator.get_env_or_gha("JULES_SOURCE_ID") or self.orchestrator.jules.discover_source_id(repo_name)
        if not source_id: raise CLIError("JULES_SOURCE_ID missing and auto-discovery failed.")

        session_name = "dry-run-session"
        if not dry_run:
            res = self.orchestrator.jules.create_session_from_source(source_id, branch, prompt)
            if res: session_name = res.get("name")
            else: raise CLIError("Jules API session creation failed")

        feedback = f"🤖 **Jules is on it!**\n\nInitialized autonomous repair session (`{session_name}`) for branch `{branch}`."
        if pr and not dry_run: pr.create_issue_comment(feedback)
        return {"session": session_name, "branch": branch, "feedback": feedback, "agent_name": "Jules"}
