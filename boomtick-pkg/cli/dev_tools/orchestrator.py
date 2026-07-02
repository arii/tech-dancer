import hashlib
import os
import re
import json
import sys
import shutil
import subprocess
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional, Tuple
from collections import defaultdict

from dev_tools.services.github import GitHubClient
from dev_tools.services.ai_service import AIClient
from dev_tools.services.jules import JulesClient
from dev_tools.services.repair_service import RepairService
from dev_tools.services.vision_service import VisionService
from dev_tools.services.pr_service import PRService
from dev_tools.services.audit_service import AuditService
from dev_tools.services.remediation_service import RemediationService

from dev_tools.utils import (
    verify_ci_metrics,
    log_error,
    log_warn,
    get_or_create_log_dir,
    CLIError,
    get_github_token,
    get_github_client,
    get_repo_name,
    get_gha_variable,
    set_gha_variable,
    run_command,
    is_ai_available,
    extract_failing_info,
    clean_gha_logs,
    walk_tsx,
    find_patterns_in_file,
    get_bundle_size,
    get_any_count,
    verify_pr_scope
)
from dev_tools.handlers.command_handler import CommandHandler
from dev_tools.models import IssueSummary, PRSummary
from dev_tools.config import get_config

PROJECT_CONFIG = get_config()

class Orchestrator:
    _CMD_PATTERNS = {
        "conflict_resolve": r"(?<!\w)@conflict-resolve\b",
        "update_snapshots": r"(?<!\w)@update-snapshots\b",
        "ai_chatops": r"(?<!\w)/(ai-fix|ai-review)\b",
        "jules_fix_ci": r"(?<!\w)@jules-fix-ci\b",
    }

    def __init__(self) -> None:
        self._github = None
        self._ai = None
        self._jules = None
        self._pr_service = None
        self._audit_service = None
        self._remediation_service = None

    @property
    def github(self) -> GitHubClient:
        if self._github is None: self._github = GitHubClient()
        return self._github

    @property
    def ai(self) -> AIClient:
        if self._ai is None: self._ai = AIClient()
        return self._ai

    @property
    def jules(self) -> JulesClient:
        if self._jules is None: self._jules = JulesClient()
        return self._jules

    @property
    def pr_service(self) -> PRService:
        if self._pr_service is None: self._pr_service = PRService(self.github)
        return self._pr_service

    @property
    def audit_service(self) -> AuditService:
        if self._audit_service is None: self._audit_service = AuditService(self)
        return self._audit_service

    @property
    def remediation_service(self) -> RemediationService:
        if self._remediation_service is None: self._remediation_service = RemediationService(self)
        return self._remediation_service


    def ratchet_any(self, update: bool = False, baseline_file: Optional[str] = None, dry_run: bool = True) -> Dict[str, Any]:
        current = get_any_count()
        baseline = self.resolve_baseline(baseline_file, 'ANY_COUNT_BASELINE', 0)
        res = {"current": current, "baseline": baseline, "status": "success" if current <= baseline else "error"}
        if current > baseline: res["message"] = f"'any' count increased from {baseline} to {current}."
        if update:
            if not dry_run:
                if baseline_file:
                    with open(baseline_file, 'w') as f: f.write(str(current))
                else: set_gha_variable('ANY_COUNT_BASELINE', str(current))
            res["updated"] = not dry_run
        return res

    def check_bundle_size(self, update: bool = False, baseline_file: Optional[str] = None, threshold: int = 50, dry_run: bool = True) -> Dict[str, Any]:
        size = get_bundle_size()
        baseline = self.resolve_baseline(baseline_file, 'BUNDLE_BASELINE_KB', 3080)
        threshold_kb = baseline + threshold
        res = {"size_kb": size, "baseline_kb": baseline, "threshold_kb": threshold_kb, "status": "success" if size <= threshold_kb else "error"}
        if size > threshold_kb: res["message"] = f"Bundle size exceeds threshold ({size}KB > {threshold_kb}KB)."
        if update:
            if not dry_run:
                if baseline_file:
                    with open(baseline_file, 'w') as f: f.write(str(size))
                else: set_gha_variable('BUNDLE_BASELINE_KB', str(size))
            res["updated"] = not dry_run
        return res

    def get_env_or_gha(self, env_var: str) -> Optional[str]:
        if env_var in os.environ: return os.environ[env_var]
        return get_gha_variable(env_var)

    def resolve_baseline(self, file_path: Optional[str], env_var: str, fallback_value: int) -> int:
        if file_path and os.path.exists(file_path):
            with open(file_path, 'r') as f: return int(f.read().strip() or fallback_value)
        val = self.get_env_or_gha(env_var)
        return int(val) if val is not None and str(val).strip() != "" else fallback_value

    def get_audit_results(self, content: Optional[str] = None, targets: Optional[List[str]] = None) -> Dict[str, Any]:
        cmd = ["node", "scripts/detect-antipatterns.mjs", "--json"]
        if targets:
            cmd.extend(targets)
        elif content is not None:
            cmd.append("-")
        res = run_command(cmd, check=False, input_str=content)
        try:
            return json.loads(res.stdout)
        except json.JSONDecodeError:
            return {"violations": {}, "config": {}}

    def extract_code_blocks(self, text: str) -> List[str]:
        return re.findall(r'```(?:tsx?|jsx?|html)?\n(.*?)```', text, re.DOTALL)

    def get_pr_files(self, pr: Any) -> set[str]:
        return {f.filename for f in pr.get_files()}

    def detect_conflicts(self, target_pr_num: Optional[int] = None) -> Dict[Tuple[int, ...], List[str]]:
        repo = get_github_client().get_repo(get_repo_name())
        open_prs = list(repo.get_pulls(state='open'))
        file_to_prs = defaultdict(list)
        for pr in open_prs:
            for f in self.get_pr_files(pr):
                file_to_prs[f].append(pr.number)
        conflicts = defaultdict(list)
        for filename, prs in file_to_prs.items():
            if len(prs) > 1 and (target_pr_num is None or target_pr_num in prs):
                conflicts[tuple(sorted(prs))].append(filename)
        return conflicts

    def _has_spec_section(self, section_name: str, text: str) -> bool:
        """Robustly checks for the presence of a markdown section or numbered list item."""
        # Matches markdown headers (# Section Name) or numbered items (1. SECTION NAME)
        header_pattern = rf"^\s*#+\s*{re.escape(section_name)}\b"
        list_pattern = rf"^\s*\d+\.\s*{re.escape(section_name)}\b"
        return bool(re.search(header_pattern, text, re.IGNORECASE | re.MULTILINE) or
                    re.search(list_pattern, text, re.IGNORECASE | re.MULTILINE))

    def _read_safe_file(self, file_path: str, max_size: int = 1024 * 1024) -> str:
        """
        Validates and reads a file from within the repository root.
        """
        abs_path = os.path.abspath(file_path)
        repo_root = os.path.abspath(os.getcwd())
        try:
            if os.path.commonpath([repo_root, abs_path]) != repo_root:
                raise CLIError(f"Security Error: Path {file_path} is outside of repository root.")
        except ValueError:
            raise CLIError(f"Security Error: Path {file_path} is invalid or outside of repository root.")

        if not os.path.exists(abs_path):
            raise CLIError(f"File not found: {file_path}")

        if os.path.getsize(abs_path) > max_size:
            raise CLIError(f"File size exceeds limit of {max_size} bytes.")

        with open(abs_path, 'r', encoding='utf-8') as f:
            return f.read()

    def create_issue(self, title: str, body: str) -> Dict[str, Any]:
        """
        Creates a new GitHub issue.
        """
        res = self.github.create_issue(title, body)
        return {
            "status": "success",
            "issue": IssueSummary(**res).model_dump()
        }

    def get_issue_details(self, issue_number: int) -> Dict[str, Any]:
        """
        Fetches details of a GitHub issue.
        """
        return self.github.fetch_issue_details(issue_number)

    def update_issue(self, issue_number: int, body: Optional[str] = None, labels: Optional[List[str]] = None, add_labels: Optional[List[str]] = None, remove_labels: Optional[List[str]] = None, state: Optional[str] = None) -> Dict[str, Any]:
        """
        Updates an issue's body, labels, and/or state.
        """
        res = None
        if labels is not None and (add_labels or remove_labels):
            raise CLIError("Cannot combine full label replacement (--labels) with incremental changes (--add-labels, --remove-labels)")

        update_kwargs = {}
        if body is not None:
            update_kwargs['body'] = body
        if labels is not None:
            update_kwargs['labels'] = labels
        if state is not None:
            update_kwargs['state'] = state

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
            raise CLIError("Nothing to update. Provide body, labels, add-labels, remove-labels, or state.")

        return {
            "status": "success",
            "issue": IssueSummary(**res).model_dump()
        }

    # Delegation to PRService
    def list_prs(self, *args, **kwargs): return self.pr_service.list_prs(*args, **kwargs)
    def get_ci_logs(self, *args, **kwargs): return self.pr_service.get_ci_logs(*args, **kwargs)
    def stream_ci_logs(self, *args, **kwargs): return self.pr_service.stream_ci_logs(*args, **kwargs)
    def get_merge_conflicts(self, *args, **kwargs): return self.pr_service.get_merge_conflicts(*args, **kwargs)
    def get_pr_diff_shapen(self, *args, **kwargs): return self.pr_service.get_pr_diff_shapen(*args, **kwargs)
    def aggregate_prs(self, *args, **kwargs): return self.pr_service.aggregate_prs(*args, **kwargs)
    def update_issue(self, *args, **kwargs): return self.pr_service.update_issue(*args, **kwargs)
    def post_comment(self, entity_number: int, body: Optional[str]) -> Dict[str, Any]:
        if body is None or not body.strip(): raise CLIError("Comment body cannot be empty.")
        return self.github.create_issue_comment(entity_number, body)

    # Delegation to AuditService
    def get_audit_results(self, *args, **kwargs): return self.audit_service.get_audit_results(*args, **kwargs)
    def validate_issue(self, *args, **kwargs): return self.audit_service.validate_issue(*args, **kwargs)
    def handle_audit_gate(self, *args, **kwargs): return self.audit_service.handle_audit_gate(*args, **kwargs)

    # Delegation to RemediationService
    def fix_ci(self, *args, **kwargs): return self.remediation_service.fix_ci(*args, **kwargs)

    def parse_comment(self, body: str, author_association: str) -> Dict[str, Any]:
        results = {k: bool(re.search(v, body)) for k, v in self._CMD_PATTERNS.items()}
        return {
            "conflict_resolve": results["conflict_resolve"],
            "update_snapshots": results["update_snapshots"],
            "ai_chatops": results["ai_chatops"],
            "jules_fix_ci": results["jules_fix_ci"] and author_association in ['OWNER', 'MEMBER', 'COLLABORATOR']
        }

    def runtime_check(self) -> Dict[str, str]:
        """Ensures the runtime environment matches the contract."""
        run_command(["corepack", "enable"], check=False)
        run_command(["corepack", "prepare", "pnpm@10.28.2", "--activate"], check=False)

        # Mirror scripts/check-runtime.mjs logic in Python
        try:
            with open(".node-version", "r") as f:
                expected_node = f.read().strip().replace('v', '')
        except FileNotFoundError:
            try:
                with open(".nvmrc", "r") as f:
                    expected_node = f.read().strip().replace('v', '')
            except FileNotFoundError:
                expected_node = "24.16.0"

        actual_node = run_command(["node", "-v"]).strip().replace('v', '')
        is_ci = os.environ.get("CI") == "true"
        is_jules = "jules" in os.environ.get("USER", "").lower() or os.environ.get("JULES_API_KEY")

        expected_prefix = ".".join(expected_node.split(".")[:2]) + "."
        node_matches = (actual_node.startswith(expected_prefix) or is_jules) if is_ci else actual_node == expected_node

        if not node_matches and not is_jules:
            log_error(f"Node version mismatch\nExpected: {expected_node}\nActual:   {actual_node}")
            raise CLIError("Node version mismatch. Do not switch versions manually.")

        manifest_path = "package.json"
        if not os.path.exists(manifest_path) and os.path.exists("workspace.json"):
            manifest_path = "workspace.json"

        if os.path.exists(manifest_path):
            with open(manifest_path, "r") as f:
                pkg = json.load(f)
            expected_pnpm = pkg.get("packageManager", "").replace("pnpm@", "") or "10.28.2"
        else:
            expected_pnpm = "10.28.2"

        actual_pnpm = run_command(["pnpm", "--version"]).strip()

        if not actual_pnpm or actual_pnpm != expected_pnpm:
            log_error(f"pnpm version mismatch\nExpected: {expected_pnpm}\nActual:   {actual_pnpm}")
            raise CLIError(f"Run: corepack enable && corepack prepare pnpm@{expected_pnpm} --activate")

        return {"node": actual_node, "pnpm": actual_pnpm}


    def verify_ci_metrics(self, **kwargs):
        return verify_ci_metrics(**kwargs)

    def generate_ci_summary_report(self):
        """Generates a markdown summary of CI metrics."""
        metrics_res = self.verify_ci_metrics()

        report = ["## 📊 CI Metrics Verification"]

        if metrics_res['status'] == 'error':
            report.append(f"❌ **FAILED**: {metrics_res['message']}")
        elif metrics_res['status'] == 'warning':
            report.append(f"⚠️  **WARNING**: {metrics_res['message']}")
        else:
            report.append("✅ **PASSED**: All metrics within limits.")

        if 'metrics' in metrics_res:
            m = metrics_res['metrics']
            report.append("\n### AI Token Usage")
            report.append(f"- **Input:** {m['inputTokens']} / {m['inputThreshold']}")
            report.append(f"- **Output:** {m['outputTokens']} / {m['outputThreshold']}")
            report.append(f"- **Total:** {m['totalTokens']} / {m['totalThreshold']}")

            report.append("\n<details><summary>Raw Metrics JSON</summary>\n")
            report.append("```json")
            report.append(json.dumps(metrics_res, indent=2))
            report.append("```\n</details>")

        return "\n".join(report)

    def pre_submit_checks(self) -> Dict[str, Any]:
        results: Dict[str, Any] = {"steps": []}

        # 1. Runtime Check (Fail Fast)
        try:
            self.runtime_check()
            results["steps"].append({"name": "Runtime Check", "status": "success"})
        except CLIError as e:
            results["steps"].append({"name": "Runtime Check", "status": "failure", "error": str(e)})
            raise e

        def run_step(name: str, cmd: List[str]) -> None:
            try:
                run_command(cmd)
                results["steps"].append({"name": name, "status": "success"})
            except CLIError as e:
                results["steps"].append({"name": name, "status": "failure", "error": str(e)})
                raise e
        run_step("Anti-Pattern Audit", ["node", "scripts/detect-antipatterns.mjs"])
        run_step("Version Downgrade Check", [PROJECT_CONFIG.cli_alias, "gh", "verify-versions"])
        run_step("TypeScript", ["pnpm", "run", "type-check"])
        run_step("Lint", ["pnpm", "run", "lint"])
        missing_vars = [v for v in ["BUNDLE_BASELINE_KB", "ANY_COUNT_BASELINE"] if not (os.environ.get(v) or get_gha_variable(v))]
        if missing_vars: results["steps"].append({"name": "Baseline Check", "status": "warning", "message": f"Missing GHA variables: {', '.join(missing_vars)}"})
        else: results["steps"].append({"name": "Baseline Check", "status": "success"})
        scope_warning = verify_pr_scope()
        if scope_warning: results["steps"].append({"name": "PR Scope Check", "status": "warning", "message": scope_warning})
        conflicts = self.detect_conflicts()
        results["conflicts"] = [{"prs": list(p), "files": f} for p, f in conflicts.items()]
        return results

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
        original_cwd = os.getcwd(); repair_script = os.path.abspath(os.path.join(original_cwd, "dev-tools", "repair.py"))
        worktree_path = None; branch_name = None
        try:
            branch_name = f"repair/local-{datetime.now().strftime('%H%M%S')}"
            prefix = PROJECT_CONFIG.worktree_prefix
            # Create temporary worktree within repo root to avoid Security Error
            worktree_path = os.path.join(original_cwd, f"{prefix}{datetime.now().strftime('%H%M%S')}")
            os.makedirs(worktree_path, exist_ok=True)
            run_command(["git", "worktree", "add", "-b", branch_name, worktree_path, "HEAD"])
            os.chdir(worktree_path)
            if os.path.exists(os.path.join(original_cwd, "node_modules")):
                os.symlink(os.path.join(original_cwd, "node_modules"), os.path.join(worktree_path, "node_modules"))
            # Create temporary log file within repo root logs/
            log_dir = get_or_create_log_dir("repair")
            with tempfile.NamedTemporaryFile(mode='w', suffix=".log", delete=False, dir=log_dir) as tmp_log:
                tmp_log.write(logs_content); tmp_log_path = tmp_log.name
            cmd = [sys.executable, repair_script, tmp_log_path]
            proc = run_command(cmd, check=False)
            os.unlink(tmp_log_path)
            if proc.returncode == 0: return {"status": "success", "message": "Repair completed.", "worktree": worktree_path, "branch": branch_name}
            else: return {"status": "error", "message": f"Repair failed with code {proc.returncode}"}
        finally: os.chdir(original_cwd)

    def handle_audit_gate(self) -> Dict[str, Any]:
        current_count = int(run_command(["node", "scripts/detect-antipatterns.mjs", "--count-only"]) or 0)
        baseline_count = self.resolve_baseline(None, 'AUDIT_BASELINE', -1)

        is_shallow = run_command(["git", "rev-parse", "--is-shallow-repository"], check=False).stdout.strip() == "true"

        if baseline_count == -1 or is_shallow:
            if is_shallow:
                 # In a shallow clone, git ls-tree/show on base branch will fail or be incomplete.
                 # Fall back to GHA variable if possible.
                 val = self.get_env_or_gha('AUDIT_BASELINE')
                 if val: return {"current": current_count, "baseline": int(val), "status": "success" if current_count <= int(val) else "error"}
                 # If no GHA variable, we cannot determine baseline accurately in shallow clone.
                 log_warn("Shallow repository detected and no AUDIT_BASELINE variable found. Falling back to 0.")

            baseline_count = 0
            base = PROJECT_CONFIG.base_branch
            base_files = run_command(["git", "ls-tree", "-r", base, "--name-only"]).splitlines()
            # Ensure AUDIT_CHECK_DIRS are handled as a list of prefixes
            relevant = [mf for mf in base_files if (mf.endswith('.tsx') or mf.endswith('.ts')) and any(mf == d or mf.startswith(d + '/') for d in PROJECT_CONFIG.audit_check_dirs)]
            for mf in relevant:
                res_show = run_command(["git", "show", f"{base}:{mf}"], check=False, log_on_error=False)
                if res_show.returncode == 0:
                    baseline_count += int(run_command(["node", "scripts/detect-antipatterns.mjs", "--count-only", "-"], input_str=res_show.stdout) or 0)
        return {"current": current_count, "baseline": baseline_count, "status": "success" if current_count <= baseline_count else "error"}

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

        if api_key: self.jules.api_key = api_key

        # Analyze failing check runs
        check_runs = self.github.fetch_check_runs(pr.head.sha)
        failing_logs = []
        structured_failures = []
        for run in check_runs:
            if run.get('conclusion') == 'failure':
                logs = self.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))

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
        source_id = self.get_env_or_gha("JULES_SOURCE_ID") or self.jules.discover_source_id(repo_name)
        if not source_id: raise CLIError("JULES_SOURCE_ID missing and auto-discovery failed.")
        session_name = "dry-run-session"
        if not dry_run:
            res = self.jules.create_session_from_source(source_id, branch, prompt)
            if res: session_name = res.get("name")
            else: raise CLIError(f"{agent_name} API session creation failed")
        feedback = f"🤖 **{agent_name} is on it!**\n\nInitialized autonomous repair session (`{session_name}`) for branch `{branch}`."
        if pr and not dry_run: pr.create_issue_comment(feedback)
        return {"session": session_name, "branch": branch, "feedback": feedback, "agent_name": agent_name}

    def manage_reviews(self, check_responses: bool = False, cleanup_comments: bool = False, dry_run: bool = True) -> List[Dict[str, Any]]:
        g = get_github_client(); repo = g.get_repo(get_repo_name()); login = g.get_user().login; prs_data = []
        for pr in repo.get_pulls(state='open', sort='updated', direction='desc'):
            last_review = next((r for r in pr.get_reviews().reversed if r.user.login == login), None)
            status = "ACTION: Needs Review" if not last_review else f"ACTION: Needs Re-Review" if last_review.commit_id != pr.head.sha else "STATE: Up-To-Date"
            item = {"number": pr.number, "title": pr.title, "status": status, "unaddressed": []}
            if check_responses:
                our_coms = [c for c in pr.get_review_comments() if c.user.login == login]
                after_coms = [c for c in pr.get_review_comments() if c.user.login != login and any(c.in_reply_to_id == oc.id for oc in our_coms)]
                if our_coms and not after_coms: item["unaddressed"] = [f"{c.path}:{c.position}" for c in our_coms]
            if cleanup_comments:
                for c in pr.get_issue_comments():
                    if c.user.login == login and "<!-- td-review-manager-comment -->" in c.body:
                        if not dry_run: c.delete()
            prs_data.append(item)
        return prs_data

    def track_review(self, pr_num: int, status: str, auditor: str, dry_run: bool = True) -> Dict[str, Any]:
        tracking_file = "REVIEW_TRACKING.md"; now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
        content = open(tracking_file).read() if os.path.exists(tracking_file) else "# PR Review Tracking\n\n| PR | Status | Auditor | Last Updated |\n|----|--------|---------|--------------|\n"
        lines = content.splitlines(); new_lines = []; found = False
        for line in lines:
            if line.startswith("|") and f"| #{pr_num} |" in line:
                new_lines.append(f"| #{pr_num} | {status} | {auditor} | {now} |"); found = True
            else: new_lines.append(line)
        if not found: new_lines.append(f"| #{pr_num} | {status} | {auditor} | {now} |")
        if not dry_run:
            with open(tracking_file, "w") as f: f.write("\n".join(new_lines) + "\n")
        return {"pr": pr_num, "status": status, "updated": not dry_run}

    def resolve_conflict(self, file_path: str) -> bool:
        """
        Detects merge conflicts via GitHubClient (implicit local git), analyzes logic with AI.
        """
        return self.ai.resolve_file_conflicts(file_path)

    def resolve_conflicts_headless(self) -> List[str]:
        files = self.find_conflict_files(); resolved, failed = [], []
        for f in files:
            if self.resolve_conflict(f): resolved.append(f)
            else: failed.append(f)
        if failed: raise CLIError(f"Failed to resolve: {', '.join(failed)}")
        return resolved

    def _cleanup_worktree(self, worktree_path: str) -> None:
        """Robustly cleans up a git worktree and its directory."""
        # Unregister and attempt to remove the worktree via git
        run_command(["git", "worktree", "remove", "-f", worktree_path], check=False, log_on_error=False)

        # Forcefully delete the directory if it still exists
        if os.path.exists(worktree_path):
            shutil.rmtree(worktree_path, ignore_errors=True)

        # Prune stale worktree metadata
        run_command(["git", "worktree", "prune"], check=False, log_on_error=False)

        # Final safety check
        if os.path.exists(worktree_path):
            raise CLIError(f"Failed to clean up worktree directory: {worktree_path}")

    def find_conflict_files(self) -> List[str]:
        """
        Robustly finds files with git conflict markers, ignoring build artifacts and dependencies.
        """
        res = run_command([
            "grep", "-lrE", "^<<<<<<<|^=======|^>>>>>>>", ".",
            "--exclude-dir=boomtick-pkg",
            "--exclude-dir=node_modules",
            "--exclude-dir=dist",
            "--exclude-dir=.git",
            "--exclude-dir=build",
            "--exclude-dir=target",
            "--exclude-dir=.venv"
        ], check=False, log_on_error=False)
        if res.returncode == 0 and res.stdout:
            return [f.strip() for f in res.stdout.splitlines() if f.strip()]
        return []


    def repair_context(self, log: Optional[str] = None, log_file: Optional[str] = None, pr_number: Optional[int] = None) -> List[str]:
        pipeline = RepairService(); prompts = []
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
            check_runs = self.github.fetch_check_runs(pr.head.sha)
            for run in check_runs:
                if run.get('conclusion') == 'failure':
                    logs = self.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))
                    for line in logs.splitlines():
                        p = pipeline.generate_prompt(line)
                        if p: prompts.append(p)
        return prompts

    def run_ux_audit(self, route: Optional[str] = None, all_routes: bool = False, desktop: bool = False, mobile: bool = False, screenshots_only: bool = False, images_only: bool = False, contrast_only: bool = False, overflow_only: bool = False) -> Dict[str, Any]:
        """
        Runs the UX audit suite using Playwright.
        """
        # Ensure routes are discovered
        run_command(["pnpm", "exec", "tsx", "scripts/ux-discover-routes.ts"])

        routes = ["/"]
        if all_routes:
            with open("artifacts/ux-audit/routes.json", "r") as f:
                routes = json.load(f)["routes"]
        elif route:
            routes = [route]

        viewports = []
        if desktop: viewports = ["desktop-1280", "desktop-1440"]
        elif mobile: viewports = ["mobile-375", "mobile-390", "mobile-430"]

        flags = []
        if images_only: flags.append("--images-only")
        if overflow_only: flags.append("--overflow-only")
        if contrast_only: flags.append("--contrast-only")

        results = []
        for r in routes:
            cmd = ["pnpm", "exec", "tsx", "scripts/ux-audit-runner.ts", r]
            if viewports:
                for vp in viewports:
                    res = run_command(cmd + [vp] + flags, check=False)
                    results.append({"route": r, "viewport": vp, "status": "success" if res.returncode == 0 else "error"})
            else:
                res = run_command(cmd + flags, check=False)
                results.append({"route": r, "status": "success" if res.returncode == 0 else "error"})

        return {"status": "success", "results": results}

    def run_lighthouse(self, route: Optional[str] = None) -> Dict[str, Any]:
        """
        Runs Lighthouse audits.
        """
        # Ensure routes are discovered
        run_command(["pnpm", "exec", "tsx", "scripts/ux-discover-routes.ts"])

        cmd = ["pnpm", "exec", "tsx", "scripts/ux-lighthouse-runner.ts"]
        if route:
            # Note: Lighthouse runner might need updates to handle single route arg if desired,
            # but for now it uses routes.json.
            pass

        res = run_command(cmd, check=False)
        return {"status": "success" if res.returncode == 0 else "error", "output": res.stdout}

    def generate_ux_report(self) -> Dict[str, Any]:
        """
        Aggregates results into a Markdown report.
        """
        generate_report()
        return {"status": "success", "report": "artifacts/ux-audit/ux-audit-report.md"}

    def run_playwright(self, grep: Optional[str] = None, worktree_path: Optional[str] = None) -> Dict[str, Any]:
        """Runs Playwright tests and parses the JSON report."""
        playwright_args = ["playwright", "test", "--reporter=json"]
        if grep:
            playwright_args.extend(["--grep", grep])

        res = run_command(["pnpm"] + playwright_args, cwd=worktree_path, check=False)

        failed_tests = []
        try:
            if "{" in res.stdout:
                json_data = res.stdout[res.stdout.find("{"):]
                try:
                    report = json.loads(json_data)
                    for suite in report.get("suites", []):
                        for spec in suite.get("specs", []):
                            if not spec.get("ok"):
                                error = "Unknown error"
                                if spec.get("tests") and spec["tests"][0].get("results") and spec["tests"][0]["results"][0].get("error"):
                                    error = spec["tests"][0]["results"][0]["error"].get("message", "Unknown error")

                                failed_tests.append({
                                    "title": spec.get("title"),
                                    "file": spec.get("file"),
                                    "error": error
                                })
                except json.JSONDecodeError as e:
                    log_error(f"Failed to parse Playwright JSON report: {e}\nRaw output: {res.stdout}")
        except Exception as e:
            log_error(f"Unexpected error parsing Playwright output: {e}")

        return {
            "success": res.returncode == 0,
            "command": " ".join(["pnpm"] + playwright_args),
            "failedTests": failed_tests
        }
    def get_ci_logs(self, pr_number: int, include_all: bool = False) -> Dict[str, Any]:
        """Fetches CI logs for failing (or all) check runs in a PR."""
        # Get PR head SHA
        pr_data = self.github.fetch_pr_details(pr_number)
        head_sha = pr_data.get("head", {}).get("sha")

        if not head_sha:
            raise CLIError(f"Could not determine head SHA for PR #{pr_number}")

        # Get check runs
        checks = self.github.fetch_check_runs(head_sha)
        failed_checks = [c for c in checks if c.get("conclusion") == "failure"]

        logs = {}
        # Get check suites to find workflow runs
        check_suites = self.github.fetch_check_suites(head_sha)

        for suite in check_suites:
            runs = self.github.fetch_check_runs_for_suite(suite['id'])
            for run in runs:
                if include_all or run.get("conclusion") == "failure":
                    log_content = self.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))
                    logs[run["name"]] = log_content[:10000]

        return {
            "checks": checks,
            "failedChecks": failed_checks,
            "logs": logs
        }

    def stream_ci_logs(self, pr_number: int, grep: Optional[str] = None) -> str:
        """Fetches and combines all CI logs for the latest workflow run of a PR."""
        # Get PR head SHA
        pr_data = self.github.fetch_pr_details(pr_number)
        head_sha = pr_data.get("head", {}).get("sha")

        if not head_sha:
            raise CLIError(f"Could not determine head SHA for PR #{pr_number}")

        # Get all check runs for this SHA
        check_runs = self.github.fetch_check_runs(head_sha)

        all_logs = []
        # Limit to latest 20 jobs to avoid extreme memory usage
        for run in check_runs[:20]:
            # Fetch logs via API to avoid terminal paging/buffering issues
            log_content = self.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))
            header = f"--- LOGS FOR JOB: {run['name']} (ID: {run['id']}) ---"
            all_logs.append(header)
            # Truncate each log to 20k chars to balance detail vs memory
            all_logs.append(log_content[-20000:])
            all_logs.append("\n")

        combined_logs = "\n".join(all_logs)

        if grep:
            grep_pattern = grep.lower()
            lines = combined_logs.splitlines()
            filtered_lines = [line for line in lines if grep_pattern in line.lower()]
            return "\n".join(filtered_lines)

        return combined_logs

    def get_merge_conflicts(self, pr_number: int, base_branch: str = None) -> Dict[str, Any]:
        """Detects merge conflicts for a PR against a base branch using a temporary worktree."""
        if base_branch is None:
            base_branch = PROJECT_CONFIG.base_branch_name
        # Get PR head ref
        pr_data = self.github.fetch_pr_details(pr_number)
        head_ref = pr_data.get("head", {}).get("ref")

        if not head_ref:
            raise CLIError(f"Could not determine head ref for PR #{pr_number}")

        # Ensure we have the latest
        run_command(["git", "fetch", "origin", head_ref])
        run_command(["git", "fetch", "origin", base_branch])

        worktree_path = os.path.join(os.getcwd(), f"worktree-conflict-{pr_number}.tmp")
        self._cleanup_worktree(worktree_path)

        run_command(["git", "worktree", "add", worktree_path, f"origin/{head_ref}"])

        conflict_files = []
        command_log = ""
        try:
            res = run_command(
                ["git", "merge", "--no-commit", "--no-ff", f"origin/{base_branch}"],
                cwd=worktree_path,
                check=False
            )
            command_log = res.stdout + res.stderr

            if res.returncode != 0:
                res_diff = run_command(
                    ["git", "diff", "--name-only", "--diff-filter=U"],
                    cwd=worktree_path,
                    check=False
                )
                conflict_files = [f.strip() for f in res_diff.stdout.splitlines() if f.strip()]
                run_command(["git", "merge", "--abort"], cwd=worktree_path, check=False)
        finally:
            run_command(["git", "worktree", "remove", "-f", worktree_path], check=False)
            if os.path.exists(worktree_path):
                shutil.rmtree(worktree_path, ignore_errors=True)

        return {
            "prNumber": pr_number,
            "baseBranch": base_branch,
            "headRef": head_ref,
            "conflictFiles": conflict_files,
            "commandLog": command_log
        }

    def get_pr_diff_shapen(self, pr_number: int) -> Dict[str, Any]:
        """Fetches PR diff, applies truncation and shapes file info."""
        # Get files list
        files = self.github.fetch_pr_files(pr_number)

        # Get diff text
        diff_text = self.github.fetch_pr_diff(pr_number)

        MAX_DIFF_SIZE = 50000
        truncated = False
        if len(diff_text) > MAX_DIFF_SIZE:
            diff_text = diff_text[:MAX_DIFF_SIZE] + "\n\n... [Diff truncated due to size] ..."
            truncated = True

        return {
            "prNumber": pr_number,
            "files": [
                {
                    "path": f.get("filename"),
                    "status": f.get("status") or "modified",
                    "additions": f.get("additions"),
                    "deletions": f.get("deletions")
                } for f in files
            ],
            "diffText": diff_text,
            "truncated": truncated
        }

    def list_prs(self, state: str = "open", limit: int = 100, include_drafts: bool = True, labels: Optional[List[str]] = None) -> Dict[str, Any]:
        """Lists PRs with optional filtering."""
        prs = self.github.list_pull_requests(state=state, limit=limit, labels=labels)

        if not include_drafts:
            prs = [pr for pr in prs if not pr.get("isDraft")]

        return {
            "status": "success",
            "prs": [PRSummary(**pr).model_dump() for pr in prs]
        }

    def trigger_jules_feedback(self, session_id: str) -> Dict[str, Any]:
        """Ports logic from trigger-feedback.ts to provide CI feedback to Jules."""
        session = self.jules.get_session(session_id)
        if not session:
             raise CLIError(f"Session {session_id} not found.")

        pr_number = None
        # Try to find PR in session outputs
        if session.get("outputs") and isinstance(session["outputs"], list):
            for output in session["outputs"]:
                if output.get("pullRequest") and output["pullRequest"].get("url"):
                    match = re.search(r"/pull/(\d+)", output["pullRequest"]["url"])
                    if match:
                        pr_number = int(match.group(1))
                        break

        # Search via gh for PRs mentioning session ID if not found
        if not pr_number:
            prs = self.github.list_pull_requests(state='open')
            clean_id = session_id.replace("sessions/", "")
            for pr in prs:
                # Need full details for body
                full_pr = self.github.fetch_pr_details(pr['number'])
                if clean_id in (full_pr.get('title') or "") or clean_id in (full_pr.get('body') or ""):
                    pr_number = pr['number']
                    break

        if not pr_number:
            return {
                "status": "no_pr_found",
                "message": "Could not associate session with an open PR."
            }

        pr_details = self.github.fetch_pr_details(pr_number)
        sha = pr_details.get("head", {}).get("sha")
        check_runs = self.github.fetch_check_runs(sha)

        if not check_runs:
            return {"status": "no_checks", "message": "No CI checks found for this PR head."}

        failed_checks = [run for run in check_runs if run.get("status") == "completed" and run.get("conclusion") == "failure"]
        in_progress = any(run.get("status") != "completed" for run in check_runs)

        if in_progress:
            return {"status": "in_progress", "message": "CI checks are still in progress."}

        feedback = ""
        if failed_checks:
            feedback = "The CI pipeline reported failures. Here are the details:\n\n"
            for run in failed_checks:
                feedback += f"### Failed Check: {run['name']}\n"
                logs = self.github.fetch_check_run_logs(run['id'], external_id=run.get('external_id'))
                findings = extract_failing_info(logs)
                if findings:
                    for f in findings:
                        feedback += f"- File: `{f['file']}:{f['line']}` ({f['type']})\n  Message: {f['message']}\n"
                else:
                    # Clean logs and take a smart snippet as fallback
                    cleaned_logs = clean_gha_logs(logs)
                    feedback += f"```\n{cleaned_logs[-2000:]}\n```\n"
                feedback += "\n"
        else:
            feedback = "All checks passed successfully. You may proceed."

        self.jules.send_message(session_id, feedback)
        return {"status": "success", "feedback": feedback}

    def aggregate_prs(self, target_branch: str, pr_numbers: List[int]) -> Dict[str, Any]:
        """
        Aggregates multiple PRs into a single target branch and creates a consolidated PR.
        """
        def run(cmd: List[str], check: bool = True) -> subprocess.CompletedProcess:
            return run_command(cmd, check=check)

        base_branch = PROJECT_CONFIG.base_branch_name

        # 1. Isolation & Cleanliness
        run(["git", "checkout", base_branch])
        run(["git", "pull", "origin", base_branch])
        run(["git", "checkout", "-b", target_branch])

        aggregate_body = ""
        successfully_merged = []

        for pr_num in pr_numbers:
            # 2. Sequential Extraction & Deterministic Sequence
            pr_data = self.github.fetch_pr_details(pr_num)
            head_ref = pr_data.get('head', {}).get('ref')
            title = pr_data.get('title')
            body = pr_data.get('body') or ""

            if not head_ref:
                raise CLIError(f"Could not determine head ref for PR #{pr_num}")

            # 2.5 Handle forks by using git fetch
            # This ensures the branch is available locally and handles forks correctly
            run(["git", "fetch", "origin", f"pull/{pr_num}/head:{head_ref}"])

            # Switch back to the target branch
            run(["git", "checkout", target_branch])

            # 3. Safety First: Attempt automated integration merge
            # Use 'ort' strategy implicitly by standard merge if git version supports it,
            # or just standard merge.
            res = run_command(["git", "merge", head_ref, "-m", f"Merging PR #{pr_num}: {title}"], check=False)

            if res.returncode != 0:
                # Conflict encountered
                run(["git", "merge", "--abort"])
                raise CLIError(f"CRITICAL: Conflict in PR #{pr_num}. Restored stable state of {target_branch}.", code=res.returncode)

            # 4. Metadata Preservation
            successfully_merged.append(pr_num)
            aggregate_body += f"Closes #{pr_num}\n\n### Description from PR #{pr_num} ({title}):\n{body}\n\n---\n"

        # Push the compiled branch
        run(["git", "push", "-u", "origin", target_branch])

        # Create consolidated PR
        pr_title = f"Aggregated Feature: {target_branch}"
        pr_res = self.github.create_pull_request(pr_title, aggregate_body, target_branch, base_branch)
        pr_url = pr_res.get("html_url")

        return {
            "status": "success",
            "branch": target_branch,
            "merged_prs": successfully_merged,
            "pr_url": pr_url,
            "message": f"Successfully aggregated {len(successfully_merged)} PRs into {target_branch}"
        }

    def generate_review_workflow(self, pr_number: int, issue_number: Optional[int] = None) -> Dict[str, Any]:
        """Generates a deterministic review workflow plan for an agent."""
        # 1. Environment Validation
        env_res = self.runtime_check()
        env_output = f"Runtime OK: node {env_res['node']}, pnpm {env_res['pnpm']}"

        # 2. Issue Validation
        issue_output = "No issue number provided."
        if issue_number:
            res = self.validate_issue(issue_number=issue_number)
            issue_output = json.dumps(res, indent=2)

        # 3. Conflict Detection
        conflicts = self.handle_detect_conflicts(pr_num=pr_number)
        conflict_output = json.dumps(conflicts, indent=2)

        # 4. PR Context Generation
        audit_res = self.audit_pr(pr_number, fetch=True)
        pr_context_file = audit_res["files"]["context"]

        pr_summary = ""
        ci_status = ""
        failure_logs = ""

        if os.path.exists(pr_context_file):
            with open(pr_context_file, "r") as f:
                pr_context_content = f.read()

            summary_match = re.search(r'(# PR Context:.*?)(?=## CI Status|## Diff Stats)', pr_context_content, re.DOTALL)
            if summary_match: pr_summary = summary_match.group(1).strip()

            ci_status_match = re.search(r'(## CI Status.*?)(?=## Diff Stats|## Failing Tests)', pr_context_content, re.DOTALL)
            if ci_status_match: ci_status = ci_status_match.group(1).strip()

            failure_logs_match = re.search(r'(## Failing Tests.*?)(?=## Diff Stats|$)', pr_context_content, re.DOTALL)
            if failure_logs_match: failure_logs = failure_logs_match.group(1).strip()

            if not pr_summary: pr_summary = "See " + pr_context_file
            if not ci_status: ci_status = "See " + pr_context_file
            if not failure_logs: failure_logs = "See " + pr_context_file

        # 5. Impact Analysis
        impact_output = "Not available."
        if os.path.exists("scripts/impact-analysis.ts"):
            res = run_command(["npx", "tsx", "scripts/impact-analysis.ts"], check=False)
            impact_output = res.stdout + res.stderr

        # 6. Existing Review Data
        gemini_review = "None."
        if os.path.exists("artifacts/gemini-code-review.md"):
            with open("artifacts/gemini-code-review.md", "r") as f: gemini_review = f.read()

        github_models_review = "None."
        if os.path.exists("artifacts/github-models-code-review.md"):
            with open("artifacts/github-models-code-review.md", "r") as f: github_models_review = f.read()

        # Generate workflow plan
        plan_dir = get_or_create_log_dir("workflows")
        plan_path = os.path.join(plan_dir, f"workflow-plan-pr-{pr_number}.md")

        with open(plan_path, "w") as f:
            f.write(f"""# Workflow Plan: PR #{pr_number}

## Agent Instructions

- setup complete
- validation complete
- context collected
- diagnostics collected

Agent must not repeat these steps.

---

## Workflow State

[x] Environment Validation
[x] Issue Validation
[x] Conflict Detection
[x] Context Collection
[x] Impact Analysis
[ ] Review Analysis
[ ] Review Authoring
[ ] Completion Verification

---

## Collected Context

### Validation Output
```text
{env_output}
```

### Issue Validation Output
```text
{issue_output}
```

### Conflict Output
```text
{conflict_output}
```

### PR Summary
Relevant excerpts from:
`{pr_context_file}`

```text
{pr_summary}
```

### CI Status
Relevant excerpts:
```text
{ci_status}
```

### Failure Logs
Relevant excerpts:
```text
{failure_logs}
```

### Impact Analysis
Relevant excerpts:
```text
{impact_output}
```

### Existing AI Reviews
**Gemini:**
```markdown
{gemini_review}
```

**GitHub Models:**
```markdown
{github_models_review}
```

---

## Allowed Files

Agent may read:
`.agents/workflows/REVIEW_INSTRUCTIONS.md`
`boomtick-pkg/cli/logs/reviews/pr-review-{pr_number}.md`

---

## Writable Files

Agent may modify:
`boomtick-pkg/cli/logs/reviews/pr-review-{pr_number}.md`

---

## Remaining Tasks

### Step 1
Review supplied evidence.

### Step 2
Populate review file.

### Step 3
Verify:
- JSON valid
- checklist complete
- comments reference valid diff lines

---

## Completion Criteria

All checklist items resolved.
No placeholders remain.
No guessed line numbers.
No invented findings.
Every finding must reference supplied evidence.

---

## Final Output

Output exactly:

```bash
td gh audit-pr {pr_number} --submit --cleanup --execute
```

Only after successful completion.
""")
        return {"status": "success", "plan_path": plan_path}

    def generate_aggregate_prs_workflow(self) -> Dict[str, Any]:
        """Generates a deterministic aggregation workflow plan for an agent."""
        # 1. Environment Validation
        env_res = self.runtime_check()
        env_output = f"Runtime OK: node {env_res['node']}, pnpm {env_res['pnpm']}"

        # 2. Get Open PRs and Overlaps
        prs_output = "No data."
        # Re-implement minimal overlap logic without pickle
        repo = get_github_client().get_repo(get_repo_name())
        pulls = list(repo.get_pulls(state='open'))[:50]

        file_to_prs = defaultdict(list)
        pr_titles = {}
        for pr in pulls:
            num = str(pr.number)
            pr_titles[num] = pr.title
            # Standardize file fetch to avoid visual snapshots
            files = {f.filename for f in pr.get_files() if not f.filename.startswith("tests/visual.spec.ts-snapshots/")}
            for f in files:
                file_to_prs[f].append(num)

        overlap_groups = defaultdict(list)
        for file, prs in file_to_prs.items():
            if len(prs) > 1:
                overlap_groups[frozenset(prs)].append(file)

        report = ["--- EXACT OVERLAP GROUPS ---"]
        for pr_set, files in sorted(overlap_groups.items(), key=lambda x: len(x[1]), reverse=True):
            pr_list = sorted(list(pr_set), key=int)
            report.append(f"PRs {', '.join(pr_list)} overlap on {len(files)} files:")
            for pr_num in pr_list:
                report.append(f"  [{pr_num}] {pr_titles.get(pr_num)}")

        prs_output = "\n".join(report)

        # Generate workflow plan
        plan_dir = get_or_create_log_dir("workflows")
        plan_path = os.path.join(plan_dir, "workflow-plan-aggregate-prs.md")

        with open(plan_path, "w") as f:
            f.write(f"""# Workflow Plan: Aggregate PRs

## Agent Instructions

- setup complete
- validation complete
- open PRs retrieved

Agent must not repeat these steps.

---

## Workflow State

[x] Environment Validation
[x] Retrieve Open PRs
[ ] Review Overlaps
[ ] Consolidate/Abandon PRs
[ ] Completion Verification

---

## Collected Context

### Validation Output
```text
{env_output}
```

### Open PRs Output
```text
{prs_output}
```

---

## Allowed Files

Agent may read:
`.agents/workflows/REVIEW_INSTRUCTIONS.md`

---

## Writable Files

Agent may modify:
(Any relevant branch or PR metadata using `td`)

---

## Remaining Tasks

### Step 1
Review the overlap output.

### Step 2
Use `td gh` commands to merge, close, or consolidate redundant pull requests.

### Step 3
Verify all related PRs have been appropriately tagged or closed.

---

## Completion Criteria

Overlapping functionality identified and resolved.

""")
        return {"status": "success", "plan_path": plan_path}

    def resolve_pr_conflicts(self, pr_number: int, allow_unrelated: bool = False, strategy: Optional[str] = None, push: bool = False) -> Dict[str, Any]:
        """
        Sets up a worktree for a specific PR and attempts to merge the base branch.
        """
        original_cwd = os.getcwd()
        # Use a path that is clearly temporary and matches existing patterns for ignored files
        worktree_path = os.path.join(original_cwd, f"worktree-pr-{pr_number}.tmp")
        changed_dir = False

        try:
            # 1. Fetch PR details early to fail fast
            pr_data = self.github.fetch_pr_details(pr_number)
            default_base = PROJECT_CONFIG.base_branch_name
            base_branch = pr_data.get('base', {}).get('ref', default_base)
            head_ref = pr_data.get('head', {}).get('ref')

            if not head_ref:
                raise CLIError(f"Could not determine head ref for PR #{pr_number}")

            # 2. Clean up existing worktree if present
            self._cleanup_worktree(worktree_path)

            # 3. Fetch PR branch and create worktree directly on it
            run_command(["git", "fetch", "origin", f"+pull/{pr_number}/head:{head_ref}"], check=True)
            run_command(["git", "worktree", "add", worktree_path, head_ref], check=True)

            # 4. Switch to worktree and perform git operations
            changed_dir = True
            os.chdir(worktree_path)

            # Ensure origin/base_branch is up-to-date
            run_command(["git", "fetch", "origin", base_branch], check=True)

            # Attempt merge from base branch.
            merge_cmd = ["git", "merge", f"origin/{base_branch}", "-m", f"Merge {base_branch} into PR #{pr_number}"]
            if allow_unrelated:
                merge_cmd.append("--allow-unrelated-histories")
            if strategy in ["ours", "theirs"]:
                merge_cmd.extend(["-X", strategy])

            res = run_command(merge_cmd, check=False)
            if not isinstance(res, subprocess.CompletedProcess):
                raise CLIError("Failed to execute git merge command")

            if res.returncode == 0:
                message = f"✅ PR #{pr_number} merged successfully with {base_branch}.\nPath: {worktree_path}"
                status = "success"
                if push:
                    head_branch = pr_data.get('head', {}).get('ref')
                    if not head_branch:
                        raise CLIError(f"Cannot push: head branch is missing for PR #{pr_number}")
                    try:
                        # Use authenticated URL if token is available to avoid terminal prompts
                        if self.github.token and self.github.repo:
                            auth_url = f"https://x-access-token:{self.github.token}@github.com/{self.github.repo}.git"
                            run_command(["git", "push", auth_url, f"HEAD:{head_branch}"], check=True)
                        else:
                            run_command(["git", "push", "origin", head_branch], check=True)
                        message += f"\n🚀 Successfully pushed resolution to {head_branch}"
                    except Exception as push_err:
                        message += f"\n⚠️  Merge successful but push failed: {str(push_err)}"
                        status = "partial_success"
            else:
                message = f"⚠️  Conflicts detected in PR #{pr_number} when merging {base_branch}.\nAction Required: Resolve them manually in the worktree.\nCommand: cd {worktree_path}"
                status = "conflict"

            return {
                "status": status,
                "message": message,
                "worktree_path": worktree_path,
                "pr_number": pr_number,
                "base_branch": base_branch,
                "head_branch": head_ref
            }
        except CLIError:
            raise
        finally:
            if changed_dir:
                os.chdir(original_cwd)
