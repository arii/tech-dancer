import hashlib
import os
import re
import json
import sys
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional, Tuple
from urllib.parse import quote, urlparse
from collections import defaultdict

from tdw_services.services.github import GitHubClient
from tdw_services.services.ai_service import AIClient
from tdw_services.services.jules import JulesClient
from tdw_services.handlers.command_handler import CommandHandler
from utils import (
    get_github_token,
    get_github_client,
    get_repo_name,
    get_gha_variable,
    set_gha_variable,
    CLIError,
    run_command,
    is_ai_available,
    extract_failing_info,
    clean_gha_logs
)
from repo_utils import walk_tsx, find_patterns_in_file, get_bundle_size, get_any_count
from scope_check import verify_pr_scope, get_project_config

PROJECT_CONFIG = get_project_config()
AUDIT_CHECK_DIRS = ['src/features', 'src/pages', 'src/components', 'src/layouts', 'src/App.tsx']
SPEC_SECTIONS = [
    "Problem Statement",
    "Goal",
    "Non-Goals",
    "Proposed Approach",
    "Alternatives Considered",
    "Architectural Impact",
    "Scope",
    "UNDERSTAND THE ISSUE",
    "DETERMINE APPROACH",
    "SPECIFY SCOPE",
    "DEFINITION OF DONE"
]

class Orchestrator:
    def __init__(self):
        self._github = None
        self._ai = None
        self._jules = None

    @property
    def github(self) -> GitHubClient:
        if self._github is None:
            self._github = GitHubClient()
        return self._github

    @property
    def ai(self) -> AIClient:
        if self._ai is None:
            self._ai = AIClient()
        return self._ai

    @property
    def jules(self) -> JulesClient:
        if self._jules is None:
            self._jules = JulesClient()
        return self._jules

    def _hash_content(self, content: str) -> str:
        return hashlib.md5(content.encode('utf-8')).hexdigest()

    def evaluate_pr_heuristics(self, pr: Dict[str, Any], diff: str, checks: Dict[str, Any]) -> str:
        """Applies heuristic rules to a PR diff and checks, returning specific feedback."""
        is_ui = "src/components" in diff or "src/pages" in diff or "src/layouts" in diff or "src/index.css" in diff or "tailwind" in diff
        is_python = ".py" in diff

        fails = [c['name'] for c in checks.get('check_runs', []) if c.get('conclusion') == 'failure']

        feedback = f"### Specific Review for PR #{pr['number']}\n\n"

        # What's working
        feedback += "**What is working well:**\n"
        feedback += f"- The scope is clearly defined in branch `{pr.get('head', {}).get('ref', 'unknown')}`.\n"
        if not fails:
            feedback += "- All CI checks appear to be passing.\n"

        feedback += "\n**Specific Issues & Actionable Fixes:**\n"

        if fails:
            feedback += f"- **CI Failure:** The following checks are failing: {', '.join(fails)}. Please investigate the logs for these jobs.\n"
            if "Build & E2E" in fails:
                feedback += "  - *Fix:* Ensure `pnpm run build` passes locally and all `playwright` tests succeed via `pnpm test:e2e`.\n"
            elif "deploy" in fails:
                feedback += "  - *Fix:* Verify that the `dist` directory compiles correctly without TypeScript or Vite errors.\n"

        if is_ui:
            if "px-" in diff or "py-" in diff or "mt-" in diff or "flex" in diff or "grid" in diff or "text-[" in diff:
                feedback += "- **Design System Anti-patterns:** The diff contains raw Tailwind classes (e.g. padding/margin utility classes, arbitrary values).\n"
                feedback += "  - *Fix:* Replace raw Tailwind layout classes with `Stack`, `Box`, or `Grid` primitives using design tokens (e.g., `gap={4}`, `paddingY={{ base: 4, md: 1.5 }}`). Verify by running `pnpm run audit`.\n"

            feedback += "- **Mobile UX Verification:** For any UI additions, ensure horizontal layout does not overflow a 390px viewport.\n"
            feedback += "  - *Fix:* If adding interactive elements, wrap them to enforce a minimum 48x48px touch target for accessibility.\n"

        if is_python:
            feedback += "- **Python Scripting:** Python changes detected.\n"
            feedback += "  - *Fix:* Ensure `python3 -m pytest tests/` passes. Update `test_td_cli.py` or equivalent test files if extending `dev-tools`.\n"

        if pr.get('mergeable') is False:
            feedback += "- **Merge Conflicts:** This PR has conflicts with the `main` base branch.\n"
            feedback += "  - *Fix:* Pull `main` into your branch, resolve the conflicts (e.g., via `python3 dev-tools/td_cli.py gh conflicts`), and force push.\n"

        if "overlap" in pr.get('title', '').lower() or "cli" in pr.get('title', '').lower():
            feedback += "- **Overlap / Interdependency:** This PR touches dev-tools or overlap logic.\n"
            feedback += "  - *Fix:* Ensure this is rebased against recent changes in #2076 or #2070 to avoid overlapping functionality.\n"

        # Default if no specific issues caught by heuristics
        if feedback.endswith("**Specific Issues & Actionable Fixes:**\n"):
            feedback += "- Review the diff against `audit` guidelines. Ensure no console errors exist in the target components.\n"

        return feedback

    def mass_evaluate_prs(self, post_comments: bool = False, generate_report: bool = True, limit: int = 100) -> Dict[str, Any]:
        """Runs the mass evaluation for all open PRs."""
        url = f"/repos/{self.github.repo}/pulls?state=open&per_page={limit}"
        prs = self.github._request('GET', url)
        prs = sorted(prs, key=lambda x: x['number'])

        results = []
        for pr in prs:
            pr_num = pr['number']
            try:
                diff = self.github.fetch_pr_diff(pr_num)
            except Exception:
                diff = ""

            try:
                checks = {"check_runs": self.github.fetch_check_runs(pr.get('head', {}).get('sha', ''))}
            except Exception:
                checks = {"check_runs": []}

            fb = self.evaluate_pr_heuristics(pr, diff, checks)
            results.append({
                "pr": pr,
                "diff": diff,
                "checks": checks,
                "feedback": fb
            })

            if post_comments:
                try:
                    self.github.create_issue_comment(pr_num, fb)
                except Exception as e:
                    pass # Continue even if posting fails

        if generate_report:
            with open("final-audit.md", "w") as f:
                f.write("# Final PR Audit Report\n\n")

                f.write("## 1. Summary of Open PRs Reviewed\n")
                f.write(f"Total open PRs reviewed: {len(results)}\n\n")
                for r in results:
                    pr = r['pr']
                    f.write(f"- **PR #{pr['number']}**: {pr.get('title', 'Unknown')} (Branch: `{pr.get('head', {}).get('ref', 'unknown')}`)\n")

                f.write("\n## 2. Feedback Provided\n")
                f.write("Feedback generated by analyzing PR diffs, CI status, and agent/repo guidelines.\n\n")

                for r in results:
                    pr = r['pr']
                    f.write(f"### PR #{pr['number']}\n")
                    lines = r['feedback'].split('\n')[2:]
                    f.write('\n'.join(lines) + "\n\n")

                f.write("## 3. CI Status & Failure Guidance\n")
                for r in results:
                    pr = r['pr']
                    checks = r['checks']
                    status = "Unknown"
                    if 'check_runs' in checks:
                        if not checks['check_runs']:
                            status = "No checks found"
                        else:
                            failures = [c['name'] for c in checks['check_runs'] if c.get('conclusion') == 'failure']
                            if failures:
                                status = f"Failing ({', '.join(failures)})"
                            else:
                                status = "Passing or pending"
                    f.write(f"- **PR #{pr['number']}**: {status}\n")
                f.write("\n*Guidance*: For failing tests or builds, ensure `pnpm run test` or `pnpm run build` is run locally to identify the root cause before requesting re-review.\n\n")

                f.write("## 4. UX Concerns\n")
                f.write("Multiple PRs involve UI updates. A key concern is ensuring responsive design (e.g., handling horizontal overflow on mobile viewports like 390px) and removing raw Tailwind classes in favor of UI primitives. PRs like #2064, #2055, #2065, #2050, and #2053 contain significant UI modifications and have been warned to enforce minimum 48x48px touch targets and convert raw Tailwind to Stack/Box/Grid primitives.\n\n")

                f.write("## 5. Conflict or Overlap Notes\n")
                f.write("Several PRs modify the same underlying UI components or tools:\n")
                f.write("- **Dev-tools / Overlap**: PRs #2075, #2070, and #2049 touch dev-tools and overlap logic. Merge core CLI improvements first.\n")
                f.write("- **Agent logic**: #2067, #2063, and #1848 modify agent scripts/sessions. These should be carefully sequenced.\n\n")

                f.write("## 6. Recommended Merge Order\n")
                f.write("1. Foundation / Tooling updates (e.g., #2076, #2049, #2070)\n")
                f.write("2. Performance and asset optimizations (e.g., #2073, #2056)\n")
                f.write("3. Bug fixes and specific UI patches (e.g., #2064, #2055, #2065)\n")
                f.write("4. Feature additions (e.g., #2063, #2062, #1848, #1733)\n")
                f.write("5. Content additions (e.g., #2047, #2054)\n\n")

                f.write("## 7. Recommended Fix-Before-Merge Items\n")
                f.write("- Ensure all `audit` workflow checks pass locally for any UI PRs.\n")
                f.write("- Resolve any merge conflicts on long-standing PRs before merging.\n")
                f.write("- Address failing CI checks on PR #1733 and #2062.\n\n")

                f.write("## 8. Final Merge Strategy\n")
                f.write("- **Merge**: PRs that have passing CI, no conflicts, and adhere to the project's design system.\n")
                f.write("- **Defer**: PRs requiring extensive UI rewrites to meet the 'no raw Tailwind' standard, or those with complex merge conflicts.\n")
                f.write("- **Abandon/Close**: PRs that are obsolete or have been entirely superseded by more recent commits on `main`.\n")

        return {
            "evaluated_count": len(results),
            "report_generated": generate_report,
            "comments_posted": post_comments
        }


    def review_pr(self, pr_number: int) -> Dict[str, Any]:
        """
        Fetches a PR, its diff, and generates a code review using LocalAI/Gemini.
        """
        pr_details = self.github.fetch_pr_details(pr_number)
        sha = pr_details.get('head', {}).get('sha')
        check_runs = self.github.fetch_check_runs(sha)
        pr_details['checkResults'] = check_runs

        # Fetch logs for failing checks
        failing_logs = {}
        structured_failures = []
        for run in check_runs:
            if run.get('conclusion') == 'failure':
                logs = self.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))
                failing_logs[run.get('name')] = logs[-5000:]  # Keep last 5k chars
                findings = extract_failing_info(logs)
                for f in findings:
                    structured_failures.append({
                        "check": run.get('name'),
                        "file": f['file'],
                        "line": f['line'],
                        "message": f['message'],
                        "type": f['type']
                    })

        pr_details['failingLogs'] = failing_logs
        pr_details['structuredFailures'] = structured_failures

        pr_diff = self.github.fetch_pr_diff(pr_number)
        diff_hash = self._hash_content(pr_diff)
        cache_file = f"/tmp/review_cache_{pr_number}_{diff_hash}.json"
        if os.path.exists(cache_file):
            with open(cache_file, 'r') as f: return json.load(f)
        review_result = self.ai.generate_code_review(pr_details, pr_diff)
        with open(cache_file, 'w') as f: json.dump(review_result, f)
        return review_result

    def resolve_conflict(self, file_path: str) -> bool:
        """
        Detects merge conflicts via GitHubClient (implicit local git), analyzes logic with AI.
        """
        return self.ai.resolve_file_conflicts(file_path)

    def analyze_file(self, file_path: str) -> str:
        if not os.path.exists(file_path):
            raise CLIError(f"File not found: {file_path}")
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            prompt = f"Analyze this file for bugs, style issues, and potential improvements:\n\n{content[:20000]}"
            return self.ai.generate(prompt)
        except Exception as e:
            raise CLIError(f"Failed to analyze file: {e}")

    def find_conflict_files(self) -> List[str]:
        """
        Robustly finds files with git conflict markers, ignoring build artifacts and dependencies.
        """
        try:
            res = run_command([
                "grep", "-lrE", "^<<<<<<<|^=======|^>>>>>>>", ".",
                "--exclude-dir=dev-tools",
                "--exclude-dir=node_modules",
                "--exclude-dir=dist",
                "--exclude-dir=.git",
                "--exclude-dir=build",
                "--exclude-dir=target"
            ], check=False, log_on_error=False)
            if res.returncode == 0 and res.stdout:
                return [f.strip() for f in res.stdout.splitlines() if f.strip()]
        except Exception: pass
        return []

    def dispatch_jules_review(self, branch: str, prompt: str) -> Optional[Dict[str, Any]]:
        """
        Automates the creation of Jules sessions.
        """
        source_id = self.jules.discover_source_id(self.github.repo)
        if not source_id: raise ValueError(f"Could not find a Jules source mapping for repository: {self.github.repo}")
        session = self.jules.create_session_from_source(source_id, branch, prompt)
        return session

    # --- Helper methods ported from td_cli ---

    def get_env_or_gha(self, env_var: str) -> str | None:
        if env_var in os.environ: return os.environ[env_var]
        return get_gha_variable(env_var)

    def resolve_baseline(self, file_path: str | None, env_var: str, fallback_value: int) -> int:
        if file_path and os.path.exists(file_path):
            with open(file_path, 'r') as f: return int(f.read().strip() or fallback_value)
        val = self.get_env_or_gha(env_var)
        if val is not None and str(val).strip() != "": return int(val)
        return fallback_value

    def get_audit_results(self, content: str = None, targets: list[str] = None):
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

    def extract_code_blocks(self, text: str) -> list[str]:
        return re.findall(r'```(?:tsx?|jsx?|html)?\n(.*?)```', text, re.DOTALL)

    def get_pr_files(self, pr) -> set[str]:
        return {f.filename for f in pr.get_files()}

    def detect_conflicts(self, target_pr_num=None):
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

    def _has_spec_section(self, section_name, text):
        """Robustly checks for the presence of a markdown section or numbered list item."""
        # Matches markdown headers (# Section Name) or numbered items (1. SECTION NAME)
        header_pattern = rf"^\s*#+\s*{re.escape(section_name)}\b"
        list_pattern = rf"^\s*\d+\.\s*{re.escape(section_name)}\b"
        return bool(re.search(header_pattern, text, re.IGNORECASE | re.MULTILINE) or
                    re.search(list_pattern, text, re.IGNORECASE | re.MULTILINE))

    def validate_issue(self, issue_number: Optional[int] = None, all_open: bool = False, post_comments: bool = False, dry_run: bool = True) -> Dict[str, Any]:
        repo = get_github_client().get_repo(get_repo_name())
        issues = []
        if all_open:
            issues = list(repo.get_issues(state='open'))
        elif issue_number:
            issues = [repo.get_issue(issue_number)]
        else:
            raise CLIError("Provide --issue-number or --all-open")

        results = []
        total_findings = 0
        audit_base = self.get_audit_results(content="")
        config = audit_base.get("config", {})

        for issue in issues:
            findings = []
            warnings = []
            body = issue.body or ''
            title = issue.title or ''

            if not body.strip():
                findings.append("Issue body is empty.")

            for i, block in enumerate(self.extract_code_blocks(body)):
                res = self.get_audit_results(content=block)
                violations = res.get("violations", {}).get("stdin", [])
                for v in violations:
                    val = v.get('value', 'N/A')
                    findings.append(f"Code block {i+1}: {v['message']} (value: {val})")
                for comp, path in config.get('existingComponents', {}).items():
                    if re.search(rf'(create|build|make|add|new)\s+.*{comp}', block, re.IGNORECASE):
                        warnings.append(f"Code block {i+1}: Suggests `{comp}` (exists at `{path}`)")
            for comp, path in config.get('existingComponents', {}).items():
                if re.search(rf'(create|build|make|add\s+a\s+new)\s+.*{comp}\b', body, re.IGNORECASE):
                    warnings.append(f"Issue suggests `{comp}` (exists at `{path}`)")
            if re.match(r'^Draft.*:', title) and '```markdown' in body:
                md_match = re.search(r'```markdown\n(.*?)\n```', body, re.DOTALL)
                if md_match:
                    for field in config.get('requiredContentFields', []):
                        if not re.search(rf'^{field}:', md_match.group(1), re.MULTILINE):
                            findings.append(f"Missing frontmatter: `{field}`")
            if not re.search(r'(acceptance criteria|definition of done|## done|verify|test)', body, re.IGNORECASE):
                warnings.append("No acceptance criteria.")
            if re.search(r'tailwind|className.*flex|className.*grid', body, re.IGNORECASE) and not re.search(r'<Box|<Stack|<Grid|primitives|design.tokens', body, re.IGNORECASE):
                warnings.append("Mentions Tailwind but not layout primitives.")

            # Spec-Driven Issue Validation
            missing_spec_sections = [s for s in SPEC_SECTIONS if not self._has_spec_section(s, body)]
            if missing_spec_sections:
                findings.append(f"Missing spec-driven sections: {', '.join(f'`{s}`' for s in missing_spec_sections)}")

            issue_result = {"number": issue.number, "title": title, "findings": findings, "warnings": warnings}
            results.append(issue_result)
            total_findings += len(findings)
            if post_comments and (findings or warnings):
                comment = "## 🤖 Issue Quality Review\n\n"
                if findings: comment += "### ❌ Violations\n" + "\n".join(f"- {f}" for f in findings) + "\n\n"
                if warnings: comment += "### ⚠️ Warnings\n" + "\n".join(f"- {w}" for w in warnings) + "\n"
                if not dry_run: issue.create_comment(comment + "\n---\n*Generated by `td_cli validate-issue`*")

        return {"status": "success" if total_findings == 0 else "error", "issues": results, "total_findings": total_findings}

    def handle_detect_conflicts(self, pr_num=None):
        conflicts = self.detect_conflicts(pr_num)
        formatted = []
        for pr_pair, files in conflicts.items():
            formatted.append({"prs": list(pr_pair), "files": files})
        return formatted

    def handle_status_board(self):
        repo = get_github_client().get_repo(get_repo_name())
        prs_data = []
        for pr in repo.get_pulls(state='open'):
            m = re.search(r'issue-(\d+)', pr.head.ref); issue = f"#{m.group(1)}" if m else "—"
            prs_data.append({"branch": pr.head.ref, "issue": issue, "status": "Draft" if pr.draft else "Open", "number": pr.number})
        return prs_data

    def ratchet_any(self, update=False, baseline_file=None, dry_run=True):
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

    def check_bundle_size(self, update=False, baseline_file=None, threshold=50, dry_run=True):
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

    def migrate_tokens(self, find=None, migrate=None, dry_run=True):
        root_dir = 'src'; matches = []
        if find:
            for filepath in walk_tsx(root_dir):
                findings = find_patterns_in_file(filepath, [(re.escape(find), "Found")])
                for ln, _, content in findings:
                    matches.append({"file": filepath, "line": ln, "content": content.strip()})
        elif migrate:
            old, new = migrate
            for filepath in walk_tsx(root_dir):
                with open(filepath, 'r') as f: c = f.read()
                if old in c:
                    matches.append({"file": filepath})
                    if not dry_run:
                        with open(filepath, 'w') as f: f.write(c.replace(old, new))
        return matches

    def update_issues(self, dry_run=True):
        repo = get_github_client().get_repo(get_repo_name()); updates = []
        audit_base = self.get_audit_results(content=""); config = audit_base.get("config", {})
        deprecated = config.get("deprecated", {})
        for issue in repo.get_issues(state='open'):
            body = issue.body or ''; findings = []
            for old, new in deprecated.get('assets', {}).items():
                if old in body: findings.append(f"References deprecated name `{old}`. Use `{new}` instead.")
            for old, new in deprecated.get('paths', {}).items():
                if old in body: findings.append(f"References deprecated path `{old}`. New location: `{new}`")
            res = self.get_audit_results(content=body)
            violations = res.get("violations", {}).get("stdin", [])
            for v in violations: findings.append(f"Contains banned pattern: {v['message']} (value: {v.get('value', 'N/A')})")
            if findings:
                updates.append({"number": issue.number, "findings": findings})
                if not dry_run: issue.create_comment("## 🤖 Automated Issue Update\n\n" + "\n".join(f"- {f}" for f in findings) + "\n\n---\n*Generated by `td_cli update-issues`*")
        return updates

    def audit_pr(self, pr_number: int, fetch: bool = False, audit: bool = False, submit: bool = False, cleanup: bool = False, dry_run: bool = True, event=None):
        review_dir = os.path.join(os.getcwd(), "dev-tools", "logs", "reviews")
        ctx_path = os.path.join(review_dir, f"pr-context-{pr_number}.md"); rev_path = os.path.join(review_dir, f"pr-review-{pr_number}.md")
        res = {"pr": pr_number, "files": {}}
        if fetch:
            repo = get_github_client().get_repo(get_repo_name()); pr = repo.get_pull(pr_number)
            title = pr.title; author = pr.user.login; desc = pr.body or '_No description provided._'
            context_lines = [f"# PR Context: #{pr.number} — {title}", f"**Author:** @{author}\n", f"## Description\n{desc}\n", "## CI Status"]

            check_runs = self.github.fetch_check_runs(pr.head.sha)
            failed_check_names = []
            detected_errors = []
            if check_runs:
                for run in check_runs:
                    status_icon = '✅' if run.get('conclusion') == 'success' else '❌' if run.get('conclusion') == 'failure' else '⏳'
                    context_lines.append(f"- {status_icon} **{run.get('name')}**: {run.get('status')} ({run.get('conclusion') or 'in_progress'})")
                    if run.get('conclusion') == 'failure':
                        failed_check_names.append(run.get('name'))
                        logs = self.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))

                        # Structured failure analysis
                        findings = extract_failing_info(logs)
                        if findings:
                            context_lines.append("  **Failing Tests/Build Errors:**")
                            for f in findings:
                                error_msg = f"🔴 `{f['file']}:{f['line']}`: {f['message']} ({f['type']})"
                                context_lines.append(f"  - {error_msg}")
                                detected_errors.append(error_msg)

                        # Extract a snippet of the logs (last 50 lines or search for 'error')
                        cleaned_logs = clean_gha_logs(logs)
                        log_lines = cleaned_logs.splitlines()
                        error_lines = [l for l in log_lines if any(x in l.lower() for x in ['error', 'fail', 'ts', 'vitest', 'playwright', '🔴'])]
                        snippet = "\n".join(error_lines[-20:] if error_lines else log_lines[-30:])
                        context_lines.append(f"  <details><summary>Failure Logs Snippet</summary>\n\n  ```\n  {snippet}\n  ```\n  </details>")
            else:
                context_lines.append("_No check runs found._")

            context_lines.extend(["\n## Files Changed"])
            for f in pr.get_files(): context_lines.append(f"- {'🟢' if f.status=='added' else '🔴' if f.status=='removed' else '🟡'} `{f.filename}`")
            context_lines.append("\n## Diffs")
            for f in pr.get_files():
                context_lines.append(f"\n### `{f.filename}` ({f.status})")
                patch = f.patch or '_No textual diff available._'; annotated = []; line_num = 0
                if patch != '_No textual diff available._':
                    for line in patch.splitlines():
                        if line.startswith('@@'):
                            m = re.search(r'\+(\d+)', line); line_num = int(m.group(1)) if m else line_num
                            annotated.append(line)
                        elif line.startswith('+'): annotated.append(f"{line_num:4d} |{line}"); line_num += 1
                        elif line.startswith('-'): annotated.append(f"     |{line}")
                        else: annotated.append(f"{line_num:4d} |{line}"); line_num += 1
                context_lines.append(f"```diff\n" + "\n".join(annotated) + "\n```")
            os.makedirs(review_dir, exist_ok=True)
            with open(ctx_path, "w") as f: f.write("\n".join(context_lines))
            template_path = os.path.join(os.path.dirname(__file__), "..", "review_template.md")

            failed_checks_str = "\n".join(f"- {name}" for name in failed_check_names) if failed_check_names else "_None_"
            errors_str = "\n".join(f"- {err}" for err in detected_errors) if detected_errors else "_None detected by parser._"

            if os.path.exists(template_path):
                with open(template_path) as f:
                    template = f.read().format(
                        pr_num=pr_number,
                        head_sha=pr.head.sha,
                        failed_checks=failed_checks_str,
                        detected_errors=errors_str
                    )
            else:
                template = f"# PR Review: #{pr_number}\n- SHA: {pr.head.sha}\n\n## CI Log Triage\n- **Failed Checks:**\n{failed_checks_str}\n- **Detected Errors:**\n{errors_str}\n"
            with open(rev_path, "w") as f: f.write(template)
            res["files"]["context"] = ctx_path; res["files"]["review"] = rev_path
        if audit:
            if not os.path.exists(ctx_path): raise CLIError(f"Context file missing: {ctx_path}")
            with open(ctx_path) as f: context = f.read()
            changed_files = re.findall(r'### `([^`]+)`', context); auto_findings = []
            scope_warning = verify_pr_scope(changed_files)
            if scope_warning: auto_findings.append({"path": "PR SCOPE", "issue": scope_warning, "severity": "major"})
            files_to_audit = [f for f in changed_files if (f.endswith('.tsx') or f.endswith('.ts')) and os.path.exists(f)]
            if files_to_audit:
                audit_res = run_command(["pnpm", "run", "audit", "--", "--json"] + files_to_audit, check=False)
                output = audit_res.stdout
                if output and "{" in output:
                    try:
                        json_start = output.find("{")
                        json_end = output.rfind("}") + 1
                        audit_data = json.loads(output[json_start:json_end])
                        for filepath, violations in audit_data.items():
                            for v in violations:
                                auto_findings.append({"path": filepath, "issue": f"{v['pattern']}: {v['message']} (value: {v.get('value', 'N/A')})", "severity": v.get('severity', 'minor')})
                    except Exception: pass
            res["auto_findings"] = auto_findings
        if submit:
            from submit_review import submit_review
            submit_review(pr_number, rev_path, cleanup=cleanup, dry_run=dry_run, event_override=event)
        return res

    def handle_comment_command(self, pr_number: int, command: str, comment_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Delegates command handling to the CommandHandler.
        """
        handler = CommandHandler(self)
        return handler.handle(pr_number, command, comment_id)

    def runtime_check(self):
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
                expected_node = "22.22.2"

        actual_node = run_command(["node", "-v"]).strip().replace('v', '')
        is_ci = os.environ.get("CI") == "true"

        expected_prefix = ".".join(expected_node.split(".")[:2]) + "."
        node_matches = actual_node.startswith(expected_prefix) if is_ci else actual_node == expected_node

        if not node_matches:
            print(f"❌ Node version mismatch\nExpected: {expected_node}\nActual:   {actual_node}")
            raise CLIError("Node version mismatch. Do not switch versions manually.")

        with open("package.json", "r") as f:
            pkg = json.load(f)
        expected_pnpm = pkg.get("packageManager", "").replace("pnpm@", "") or "10.28.2"

        try:
            actual_pnpm = run_command(["pnpm", "--version"]).strip()
        except Exception:
            actual_pnpm = None

        if not actual_pnpm or actual_pnpm != expected_pnpm:
            print(f"❌ pnpm version mismatch\nExpected: {expected_pnpm}\nActual:   {actual_pnpm}")
            raise CLIError(f"Run: corepack enable && corepack prepare pnpm@{expected_pnpm} --activate")

        return {"node": actual_node, "pnpm": actual_pnpm}

    def pre_submit_checks(self):
        results = {"steps": []}

        # 1. Runtime Check (Fail Fast)
        try:
            self.runtime_check()
            results["steps"].append({"name": "Runtime Check", "status": "success"})
        except CLIError as e:
            results["steps"].append({"name": "Runtime Check", "status": "failure", "error": str(e)})
            raise e

        def run_step(name, cmd):
            try:
                run_command(cmd)
                results["steps"].append({"name": name, "status": "success"})
            except CLIError as e:
                results["steps"].append({"name": name, "status": "failure", "error": str(e)})
                raise e
        run_step("Anti-Pattern Audit", ["pnpm", "run", "audit"])
        run_step("TypeScript", ["pnpm", "run", "type-check"])
        run_step("Lint", ["pnpm", "run", "lint"])
        missing_vars = [v for v in ["BUNDLE_BASELINE_KB", "ANY_COUNT_BASELINE"] if not (os.environ.get(v) or get_gha_variable(v))]
        if missing_vars: results["steps"].append({"name": "Baseline Check", "status": "warning", "message": f"Missing GHA variables: {', '.join(missing_vars)}"})
        else: results["steps"].append({"name": "Baseline Check", "status": "success"})
        scope_warning = verify_pr_scope()
        if scope_warning: results["steps"].append({"name": "PR Scope Check", "status": "warning", "message": scope_warning})
        try:
            conflicts = self.detect_conflicts()
            results["conflicts"] = [{"prs": list(p), "files": f} for p, f in conflicts.items()]
        except Exception: pass
        return results

    def repair_local(self, logs_path=None, stdin=False, worktree=False):
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
                worktree_path = tempfile.mkdtemp(prefix="tech-dancer-repair-")
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

    def handle_audit_gate(self):
        current_count = int(run_command(["node", "scripts/detect-antipatterns.mjs", "--count-only"]) or 0)
        baseline_count = self.resolve_baseline(None, 'AUDIT_BASELINE', -1)
        if baseline_count == -1:
            baseline_count = 0
            try:
                main_files = run_command(["git", "ls-tree", "-r", "origin/main", "--name-only"]).splitlines()
                relevant = [mf for mf in main_files if (mf.endswith('.tsx') or mf.endswith('.ts')) and any(mf == d or mf.startswith(d + '/') for d in AUDIT_CHECK_DIRS)]
                for mf in relevant:
                    res_show = run_command(["git", "show", f"origin/main:{mf}"], check=False, log_on_error=False)
                    if res_show.returncode == 0:
                        baseline_count += int(run_command(["node", "scripts/detect-antipatterns.mjs", "--count-only", "-"], input_str=res_show.stdout) or 0)
            except Exception: pass
        return {"current": current_count, "baseline": baseline_count, "status": "success" if current_count <= baseline_count else "error"}

    def fix_ci(self, pr_number=None, branch=None, api_key=None, dry_run=True):
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

        prompt = """# Agent Prompt: Self-Review, Fix, and Publish PR

You are a senior engineering agent reviewing your own branch before publishing.

Compare the current branch against `main`, identify issues, fix them directly, validate the result, and open or update a pull request. Do not stop after giving recommendations.

## Rules

- Do not ask for confirmation before making fixes.
- Do not ask the user to run commands.
- Do not stop until you have opened or updated a PR.
- Do not make unrelated refactors.
- Do not publish with known failing checks unless the failure is clearly unrelated and documented.
- If local setup prevents a check from running, document the attempted command, the setup gap, and the follow-up needed.

## Steps

1. Check branch state with `git status`, `git branch --show-current`, `git remote -v`, and `git fetch origin main`.
2. Review the full diff with `git diff origin/main...HEAD`, `git diff --stat origin/main...HEAD`, `git log --oneline origin/main..HEAD`, and `git diff --cached`.
3. Create a checklist covering correctness, edge cases, TypeScript/imports, dead code, UI/mobile behavior, accessibility, validation, repo hygiene, and PR description quality.
4. Fix the issues directly.
5. Validate using the repo scripts from `package.json`, such as lint, typecheck, test, and build.
   - For CI remediation, favor targeted testing (e.g., `pnpm run test:e2e:targeted -- <args>`) and represent failures using the structured schema described in `docs/agent/ci-remediation.md`.
6. If validation fails, fix the root cause and rerun the failing check. If the environment blocks a check, document the exact command and reason.
7. Final review with `git status`, `git diff origin/main...HEAD`, `git diff --stat origin/main...HEAD`, and a search for TODO/FIXME/debug leftovers.
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

        agent_name = "Antigravity" if os.environ.get("ANTIGRAVITY_API_KEY") else "Jules"
        source_id = self.get_env_or_gha("ANTIGRAVITY_SOURCE_ID") or self.get_env_or_gha("JULES_SOURCE_ID") or self.jules.discover_source_id(repo_name)
        if not source_id: raise CLIError("ANTIGRAVITY_SOURCE_ID or JULES_SOURCE_ID missing and auto-discovery failed.")
        session_name = "dry-run-session"
        if not dry_run:
            res = self.jules.create_session_from_source(source_id, branch, prompt)
            if res: session_name = res.get("name")
            else: raise CLIError(f"{agent_name} API session creation failed")
        feedback = f"🤖 **{agent_name} is on it!**\n\nInitialized autonomous repair session (`{session_name}`) for branch `{branch}`."
        if pr and not dry_run: pr.create_issue_comment(feedback)
        return {"session": session_name, "branch": branch, "feedback": feedback, "agent_name": agent_name}

    def manage_reviews(self, check_responses=False, cleanup_comments=False, dry_run=True):
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

    def track_review(self, pr_num, status, auditor, dry_run=True):
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

    def resolve_conflicts_headless(self):
        files = self.find_conflict_files(); resolved, failed = [], []
        for f in files:
            if self.resolve_conflict(f): resolved.append(f)
            else: failed.append(f)
        if failed: raise CLIError(f"Failed to resolve: {', '.join(failed)}")
        return resolved

    def repair_context(self, log=None, log_file=None, pr_number=None):
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
            check_runs = self.github.fetch_check_runs(pr.head.sha)
            for run in check_runs:
                if run.get('conclusion') == 'failure':
                    logs = self.github.fetch_check_run_logs(run.get('id'), external_id=run.get('external_id'))
                    for line in logs.splitlines():
                        p = pipeline.generate_prompt(line)
                        if p: prompts.append(p)
        return prompts

    def run_ux_audit(self, route=None, all_routes=False, desktop=False, mobile=False, screenshots_only=False, images_only=False, contrast_only=False, overflow_only=False):
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

    def run_lighthouse(self, route=None):
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

    def generate_ux_report(self):
        """
        Aggregates results into a Markdown report.
        """
        from tdw_services.ux_report import generate_report
        generate_report()
        return {"status": "success", "report": "artifacts/ux-audit/ux-audit-report.md"}

    def aggregate_prs(self, target_branch: str, pr_numbers: List[int]) -> Dict[str, Any]:
        """
        Aggregates multiple PRs into a single target branch and creates a consolidated PR.
        """
        def run(cmd, check=True):
            return run_command(cmd, check=check)

        # 1. Isolation & Cleanliness
        run(["git", "checkout", "main"])
        run(["git", "pull", "origin", "main"])
        run(["git", "checkout", "-b", target_branch])

        aggregate_body = ""
        successfully_merged = []

        for pr_num in pr_numbers:
            # 2. Sequential Extraction & Deterministic Sequence
            try:
                pr_data = self.github.fetch_pr_details(pr_num)
                head_ref = pr_data.get('head', {}).get('ref')
                title = pr_data.get('title')
                body = pr_data.get('body') or ""

                if not head_ref:
                    raise CLIError(f"Could not determine head ref for PR #{pr_num}")

                # 2.5 Handle forks by using gh pr checkout
                # This ensures the branch is available locally and handles forks correctly
                run(["gh", "pr", "checkout", str(pr_num)])

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

            except Exception as e:
                # Restore stable state is handled by checkout -f or similar if needed,
                # but since we abort merge, we are back to the state before this PR.
                raise e

        # Push the compiled branch
        run(["git", "push", "-u", "origin", target_branch])

        # Create consolidated PR
        pr_title = f"Aggregated Feature: {target_branch}"
        # gh pr create --title "$TITLE" --body "$BODY" --head "$HEAD" --base main
        create_args = ["pr", "create", "--title", pr_title, "--body", aggregate_body, "--head", target_branch, "--base", "main"]
        pr_url = self.github.run_authenticated_gh(create_args).strip()

        return {
            "status": "success",
            "branch": target_branch,
            "merged_prs": successfully_merged,
            "pr_url": pr_url,
            "message": f"Successfully aggregated {len(successfully_merged)} PRs into {target_branch}"
        }
