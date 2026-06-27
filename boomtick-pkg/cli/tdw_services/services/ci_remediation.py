import os
import sys
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from utils import (
    get_github_client,
    get_repo_name,
    CLIError,
    run_command,
    extract_failing_info,
    clean_gha_logs
)
from dev_tools_sdk.config import load_project_config

PROJECT_CONFIG = load_project_config()

class CIRemediationService:
    def __init__(self, orchestrator):
        self.orch = orchestrator

    def repair_local(self, logs_path: Optional[str] = None, stdin: bool = False, worktree: bool = False) -> Dict[str, Any]:
        logs_content = ""
        if stdin: logs_content = sys.stdin.read()
        elif logs_path:
            if os.path.exists(logs_path):
                with open(logs_path, 'r') as f: logs_content = f.read()
            else: raise CLIError(f"Log file not found: {logs_path}")
        else:
            res_lint = run_command(["pnpm", "run", "lint:ox"], check=False)
            res_tsc = run_command(["pnpm", "run", "type-check"], check=False)
            logs_content = res_lint.stdout + res_lint.stderr + "\n" + res_tsc.stdout + res_tsc.stderr
        if not logs_content.strip(): return {"status": "success", "message": "No errors found."}
        import tempfile, shutil
        original_cwd = os.getcwd(); repair_script = os.path.abspath(os.path.join(original_cwd, "dev-tools", "repair.py"))
        worktree_path = None; branch_name = None
        try:
            if worktree:
                branch_name = f"repair/local-{datetime.now().strftime('%H%M%S')}"
                prefix = PROJECT_CONFIG.worktree_prefix
                worktree_path = tempfile.mkdtemp(prefix=prefix)
                run_command(["git", "worktree", "add", "-b", branch_name, worktree_path, "HEAD"])
                os.chdir(worktree_path)
                if os.path.exists(os.path.join(original_cwd, "node_modules")):
                    os.symlink(os.path.join(original_cwd, "node_modules"), os.path.join(worktree_path, "node_modules"))
            with tempfile.NamedTemporaryFile(mode='w', suffix=".log", delete=False) as tmp_log:
                tmp_log.write(logs_content); tmp_log_path = tmp_log.name
            cmd = [sys.executable, repair_script, tmp_log_path]
            proc = run_command(cmd, check=False)
            os.unlink(tmp_log_path)
            if proc.returncode == 0: return {"status": "success", "message": "Repair completed.", "worktree": worktree_path, "branch": branch_name}
            else: return {"status": "error", "message": f"Repair failed with code {proc.returncode}"}
        finally: os.chdir(original_cwd)

    def fix_ci(self, pr_number: Optional[int] = None, branch: Optional[str] = None, api_key: Optional[str] = None, dry_run: bool = True) -> Dict[str, Any]:
        repo_name = get_repo_name(); g = get_github_client(); repo = g.get_repo(repo_name)
        if pr_number:
            pr = repo.get_pull(int(pr_number))
            branch = pr.head.ref
        elif branch: pulls = list(repo.get_pulls(state='open', head=f"{repo.owner.login}:{branch}")); pr = pulls[0] if pulls else None
        else:
            branch = run_command(['git', 'branch', '--show-current']).strip()
            pulls = list(repo.get_pulls(state='open', head=f"{repo.owner.login}:{branch}")); pr = pulls[0] if pulls else None

        if not pr:
            raise CLIError(f"Could not find PR for branch {branch}")

        if api_key: self.orch.jules.api_key = api_key

        # Analyze failing check runs
        check_runs = self.orch.github.fetch_check_runs(pr.head.sha)
        failing_logs = []
        structured_failures = []
        for run in check_runs:
            if run.get('conclusion') == 'failure':
                logs = self.orch.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))

                # Clean logs and take a smart snippet
                cleaned_logs = clean_gha_logs(logs)

                # Prioritize lines with error signatures
                important_lines = []
                for line in cleaned_logs.splitlines():
                    if any(x in line.lower() for x in ['error', 'fail', 'ts', 'vitest', 'playwright', '🔴']):
                        important_lines.append(line)

                if important_lines:
                    snippet = "\n".join(important_lines[-30:]) # Keep last 30 important lines
                else:
                    snippet = cleaned_logs[-2000:] # Fallback to tail of cleaned logs

                failing_logs.append(f"Check Run: {run.get('name')}\nLogs:\n{snippet}")

                findings = extract_failing_info(logs)
                for f in findings:
                    structured_failures.append(f"File: {f['file']}, Line: {f['line']}, Error: {f['message']} ({f['type']})")

        base_branch = PROJECT_CONFIG.base_branch
        base_branch_name = PROJECT_CONFIG.base_branch_name

        prompt = f"""# Agent Prompt: Self-Review, Fix, and Publish PR

You are a senior engineering agent reviewing your own branch before publishing.

Compare the current branch against `{base_branch_name}`, identify issues, fix them directly, validate the result, and open or update a pull request. Do not stop after giving recommendations.

## Rules

- Do not ask for confirmation before making fixes.
- Do not ask the user to run commands.
- Do not stop until you have opened or updated a PR.
- Do not make unrelated refactors.
- Do not publish with known failing checks unless the failure is clearly unrelated and documented.
- If local setup prevents a check from running, document the attempted command, the setup gap, and the follow-up needed.

## Steps

1. Check branch state with `git status`, `git branch --show-current`, `git remote -v`, and `git fetch origin {base_branch_name}`.
2. Review the full diff with `git diff {base_branch}...HEAD`, `git diff --stat {base_branch}...HEAD`, `git log --oneline {base_branch}..HEAD`, and `git diff --cached`.
3. Create a checklist covering correctness, edge cases, TypeScript/imports, dead code, UI/mobile behavior, accessibility, validation, repo hygiene, and PR description quality.
4. Fix the issues directly.
5. Validate using the repo scripts from `package.json`, such as lint, typecheck, test, and build.
   - For CI remediation, favor targeted testing (e.g., `pnpm run test:e2e:targeted -- <args>`) and represent failures using the structured schema described in `docs/agent/ci-remediation.md`.
6. If validation fails, fix the root cause and rerun the failing check. If the environment blocks a check, document the exact command and reason.
7. Final review with `git status`, `git diff {base_branch}...HEAD`, `git diff --stat {base_branch}...HEAD`, and a search for TODO/FIXME/debug leftovers.
8. Commit, push, and create or update the PR with a clear summary and validation notes.

## Final response

Respond only after the PR is created or updated:

- PR link
- Changes made
- Self-review fixes
- Validation results
- Notes or documented limitations"""

        if structured_failures:
            prompt += "\n\n## CI Failure Analysis\n\nStructured Failure Analysis:\n- " + "\n- ".join(structured_failures)

        if failing_logs:
            prompt += "\n\nDetailed Failing Logs (Snippets):\n" + "\n---\n".join(failing_logs)

        agent_name = "Jules"
        source_id = self.orch.get_env_or_gha("JULES_SOURCE_ID") or self.orch.jules.discover_source_id(repo_name)
        if not source_id: raise CLIError("JULES_SOURCE_ID missing and auto-discovery failed.")
        session_name = "dry-run-session"
        if not dry_run:
            res = self.orch.jules.create_session_from_source(source_id, branch, prompt)
            if res: session_name = res.get("name")
            else: raise CLIError(f"{agent_name} API session creation failed")
        feedback = f"🤖 **{agent_name} is on it!**\n\nInitialized autonomous repair session (`{session_name}`) for branch `{branch}`."
        if pr and not dry_run: pr.create_issue_comment(feedback)
        return {"session": session_name, "branch": branch, "feedback": feedback, "agent_name": agent_name}

    def repair_context(self, log: Optional[str] = None, log_file: Optional[str] = None, pr_number: Optional[int] = None) -> List[str]:
        from error_rag import RAGPipeline
        pipeline = RAGPipeline(); prompts = []
        if log: prompts.append(pipeline.generate_prompt(log))
        elif log_file:
            with open(log_file) as f:
                for line in f:
                    p = pipeline.generate_prompt(line)
                    if p: prompts.append(p)
        elif pr_number:
            repo_name = get_repo_name()
            g = get_github_client()
            repo = g.get_repo(repo_name)
            pr = repo.get_pull(pr_number)
            check_runs = self.orch.github.fetch_check_runs(pr.head.sha)
            for run in check_runs:
                if run.get('conclusion') == 'failure':
                    logs = self.orch.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))
                    for line in logs.splitlines():
                        p = pipeline.generate_prompt(line)
                        if p: prompts.append(p)
        return prompts
