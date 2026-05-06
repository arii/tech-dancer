#!/usr/bin/env python3
"""
td_cli.py - Unified Tech-Dancer Developer CLI

Consolidates multiple fragmented scripts into a single entry point for repo automation.
Supports structured JSON output for tool integration.
"""

import argparse
import sys
import os
import re
import json
from datetime import datetime, timezone, timedelta
from utils import (
    get_github_token,
    get_github_client,
    get_repo_name,
    get_gha_variable,
    set_gha_variable,
    CLIError,
    run_command
)
from repo_utils import walk_tsx, find_patterns_in_file, get_bundle_size, get_any_count
from collections import defaultdict

from scope_check import verify_pr_scope, get_project_config
PROJECT_CONFIG = get_project_config()

# --- Anti-Pattern Audit Configuration ---
AUDIT_CHECK_DIRS = ['src/features', 'src/pages', 'src/App.tsx']

# --- Shared Logic ---

def log_error(msg: str):
    """Prints a standardized error message to stderr with timestamp."""
    now = datetime.now().strftime("%H:%M:%S")
    print(f"[{now}] ❌ Error: {msg}", file=sys.stderr)

def log_diag(msg: str):
    """Prints a diagnostic message to stderr with timestamp."""
    now = datetime.now().strftime("%H:%M:%S")
    print(f"[{now}] ℹ️  {msg}", file=sys.stderr)

def add_execution_args(parser: argparse.ArgumentParser):
    """Registers consistent dry-run and execute flags to a subparser."""
    parser.add_argument("--dry-run", action="store_true", default=True,
                      help="Preview actions without side effects (default)")
    parser.add_argument("--execute", action="store_false", dest="dry_run",
                      help="Enable actual side effects (e.g., posting to GitHub, modifying files)")

def get_env_or_gha(env_var: str) -> str | None:
    """Helper to safely fetch variables avoiding CLI fallback if explicitly empty in CI."""
    if env_var in os.environ:
        return os.environ[env_var]
    return get_gha_variable(env_var)

def resolve_baseline(file_path: str | None, env_var: str, fallback_value: int) -> int:
    """Resolves a baseline value from CLI argument, environment variable, or GHA variable."""
    if file_path:
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                return int(f.read().strip() or fallback_value)

    val = get_env_or_gha(env_var)
    if val is not None and str(val).strip() != "":
        return int(val)

    return fallback_value

def get_audit_results(content: str = None, targets: list[str] = None):
    """Calls the JS audit tool and returns parsed JSON results."""
    cmd = ["node", "scripts/detect-antipatterns.mjs", "--json"]
    if targets:
        cmd.extend(targets)
    elif content is not None:
        cmd.append("-")

    # Use execute_raw because the audit tool exits 1 on findings, which is expected
    res = run_command(cmd, check=False, input_str=content)
    try:
        return json.loads(res.stdout)
    except json.JSONDecodeError as e:
        log_error(f"Failed to parse audit results as JSON: {e}")
        if res.stderr:
            print(f"   Stderr: {res.stderr.strip()}", file=sys.stderr)
        if res.stdout:
            print(f"   Stdout (first 200 chars): {res.stdout[:200].strip()}", file=sys.stderr)
        return {"violations": {}, "config": {}}

def extract_code_blocks(text: str) -> list[str]:
    return re.findall(r'```(?:tsx?|jsx?|html)?\n(.*?)```', text, re.DOTALL)

def get_pr_files(pr) -> set[str]:
    return {f.filename for f in pr.get_files()}

def detect_conflicts(repo, target_pr_num=None):
    open_prs = list(repo.get_pulls(state='open'))
    file_to_prs = defaultdict(list)
    for pr in open_prs:
        for f in get_pr_files(pr): file_to_prs[f].append(pr.number)

    conflicts = defaultdict(list)
    for filename, prs in file_to_prs.items():
        if len(prs) > 1 and (target_pr_num is None or target_pr_num in prs):
            conflicts[tuple(sorted(prs))].append(filename)
    return conflicts


def parse_review_payload(review_path: str) -> dict:
    """Extracts the JSON payload from a review markdown file."""
    if not os.path.exists(review_path):
        raise CLIError(f"Review file missing: {review_path}")

    with open(review_path, 'r') as f:
        content = f.read()

    json_match = re.search(r'```json\n(.*?)\n```', content, re.DOTALL)
    if not json_match:
        raise CLIError("Could not find JSON block in review document")

    try:
        return json.loads(json_match.group(1))
    except json.JSONDecodeError as e:
        raise CLIError(f"Failed to parse JSON block: {str(e)}")


def validate_submit_review_contract(payload: dict) -> list[str]:
    """Validates fields expected by submit_review.py for create_review payload."""
    errors = []

    body = payload.get("body")
    if not isinstance(body, str) or not body.strip():
        errors.append("payload.body must be a non-empty string")

    comments = payload.get("comments", [])
    if not isinstance(comments, list):
        errors.append("payload.comments must be a list when provided")
    else:
        for i, comment in enumerate(comments):
            if not isinstance(comment, dict):
                errors.append(f"payload.comments[{i}] must be an object")
                continue
            for field in ["path", "body"]:
                if field not in comment or not isinstance(comment[field], str) or not comment[field].strip():
                    errors.append(f"payload.comments[{i}].{field} must be a non-empty string")
            has_line = isinstance(comment.get("line"), int)
            has_position = isinstance(comment.get("position"), int)
            if not (has_line or has_position):
                errors.append(f"payload.comments[{i}] must include integer 'line' or 'position'")

    return errors

# --- CLI Handlers ---

def handle_validate_issue(args):
    repo = get_github_client().get_repo(get_repo_name())

    issues = []
    if args.all_open: issues = list(repo.get_issues(state='open'))
    elif args.issue_number: issues = [repo.get_issue(args.issue_number)]
    else: raise CLIError("Provide --issue-number or --all-open")

    results = []
    total_findings = 0

    # Get config from audit tool
    audit_base = get_audit_results(content="")
    config = audit_base.get("config", {})

    for issue in issues:
        findings, warnings = [], []; body = issue.body or ''; title = issue.title or ''

        # 1. Audit code blocks
        for i, block in enumerate(extract_code_blocks(body)):
            res = get_audit_results(content=block)
            violations = res.get("violations", {}).get("stdin", [])
            for v in violations:
                val = v.get('value', 'N/A')
                findings.append(f"Code block {i+1}: {v['message']} (value: {val})")

            for comp, path in config.get('existingComponents', {}).items():
                if re.search(rf'(create|build|make|add|new)\s+.*{comp}', block, re.IGNORECASE):
                    warnings.append(f"Code block {i+1}: Suggests `{comp}` (exists at `{path}`)")

        # 2. Global body checks
        for comp, path in config.get('existingComponents', {}).items():
            if re.search(rf'(create|build|make|add\s+a\s+new)\s+.*{comp}\b', body, re.IGNORECASE):
                warnings.append(f"Issue suggests `{comp}` (exists at `{path}`)")

        if title.startswith('Draft:') and '```markdown' in body:
            md_match = re.search(r'```markdown\n(.*?)\n```', body, re.DOTALL)
            if md_match:
                for field in config.get('requiredContentFields', []):
                    if not re.search(rf'^{field}:', md_match.group(1), re.MULTILINE):
                        findings.append(f"Missing frontmatter: `{field}`")

        if not re.search(r'(acceptance criteria|definition of done|## done|verify|test)', body, re.IGNORECASE):
            warnings.append("No acceptance criteria.")

        if re.search(r'tailwind|className.*flex|className.*grid', body, re.IGNORECASE) and not re.search(r'<Box|<Stack|<Grid|primitives|design.tokens', body, re.IGNORECASE):
            warnings.append("Mentions Tailwind but not layout primitives.")

        issue_result = {"number": issue.number, "title": title, "findings": findings, "warnings": warnings}
        results.append(issue_result)
        total_findings += len(findings)

        if not args.json:
            print(f"{'✅' if not findings else '❌'} #{issue.number}: {title[:60]}")
            for f in findings: print(f"   ❌ {f}")
            for w in warnings: print(f"   ⚠️  {w}")

        if args.post_comments and (findings or warnings):
            comment = "## 🤖 Issue Quality Review\n\n"
            if findings: comment += "### ❌ Violations\n" + "\n".join(f"- {f}" for f in findings) + "\n\n"
            if warnings: comment += "### ⚠️ Warnings\n" + "\n".join(f"- {w}" for w in warnings) + "\n"
            if not args.dry_run: issue.create_comment(comment + "\n---\n*Generated by `td_cli validate-issue`*")

    if args.json: print(json.dumps({"status": "success" if total_findings == 0 else "error", "issues": results}, indent=2))
    if total_findings > 0:
        if not args.json:
            log_error(f"Found {total_findings} blocking findings. Exiting with code 1.")
        sys.exit(1)

def handle_detect_conflicts(args):
    repo = get_github_client().get_repo(get_repo_name())
    conflicts = detect_conflicts(repo, args.pr)

    formatted = []
    for pr_pair, files in conflicts.items():
        formatted.append({"prs": list(pr_pair), "files": files})
        if not args.json:
            print(f"⚠️  {' ↔ '.join(f'#{p}' for p in pr_pair)} share {len(files)} file(s):")
            for f in sorted(files)[:10]: print(f"    - {f}")

    if args.json: print(json.dumps({"status": "success", "conflicts": formatted}, indent=2))
    elif not conflicts: print("✅ No potential merge conflicts detected.")

def handle_conflicts(args):
    def run_step(cmd: str):
        res = run_command(cmd, check=False, shell=True)
        return {"cmd": cmd, "code": res.returncode, "stdout": (res.stdout or "").strip(), "stderr": (res.stderr or "").strip()}

    def emit(payload: dict):
        print(json.dumps(payload, indent=2) if args.json else payload.get("message", payload.get("status", "")))

    base_branch = getattr(args, "base", "main") or "main"
    planned = ["git fetch origin", f"git merge-base origin/{base_branch} HEAD", "git reset --soft <MERGE_BASE>", 'git commit -m "chore: squashed commits prior to conflict resolution"', f"git merge origin/{base_branch}", "pnpm test -u", "git add -A", "git commit --amend --no-edit"]
    dirty = run_step("git status --porcelain")
    branch = run_step("git branch --show-current")
    is_dirty = bool(dirty["stdout"])
    current_branch = branch["stdout"]
    is_detached = branch["code"] != 0 or not current_branch
    on_protected = current_branch in {"main", "master", base_branch} if current_branch else False

    if args.dry_run:
        emit({"status":"preview","message":"Dry-run preview only. No git mutations were executed.","base_branch":base_branch,"preflight":{"is_dirty":is_dirty,"current_branch":current_branch or None,"detached_head":is_detached,"on_protected_branch":on_protected},"planned_commands":planned,"executed_commands":[]})
        return
    if is_dirty and not getattr(args, "force", False):
        emit({"status":"aborted","message":"Working tree is dirty. Commit/stash changes or pass --force.","planned_commands":planned})
        return
    if is_detached or on_protected:
        emit({"status":"aborted","message":"Unsafe branch state for conflict command.","planned_commands":planned})
        return

    executed = []
    for cmd in ["git fetch origin", f"git merge-base origin/{base_branch} HEAD"]:
        step = run_step(cmd); executed.append(step)
        if step["code"] != 0:
            emit({"status":"error","message":f"Command failed: {cmd}","executed_commands":executed}); return
    merge_base = executed[-1]["stdout"]

    for cmd in [f"git reset --soft {merge_base}", 'git commit -m "chore: squashed commits prior to conflict resolution"', f"git merge origin/{base_branch}"]:
        step = run_step(cmd); executed.append(step)
        if step["code"] != 0 and cmd.startswith("git merge "):
            unresolved = run_step("git diff --name-only --diff-filter=U")
            emit({"status":"merge_conflicts","message":"Merge reported conflicts. Manual resolution required.","conflicted_files":[x for x in unresolved["stdout"].splitlines() if x.strip()],"executed_commands":executed+[unresolved]})
            return
        if step["code"] != 0:
            emit({"status":"error","message":f"Command failed: {cmd}","executed_commands":executed}); return

    for cmd in ["pnpm test -u", "git add -A", "git commit --amend --no-edit"]:
        step = run_step(cmd); executed.append(step)
        if step["code"] != 0:
            emit({"status":"error","message":f"Command failed: {cmd}","executed_commands":executed}); return

    emit({"status":"success","message":"Conflict handling and snapshot updates complete.","executed_commands":executed})

def handle_review_smoke(args):
    pr_num = args.pr
    review_dir = os.path.join(os.getcwd(), "dev-tools", "logs", "reviews")
    ctx_path = os.path.join(review_dir, f"pr-context-{pr_num}.md")
    rev_path = os.path.join(review_dir, f"pr-review-{pr_num}.md")
    audit_args = argparse.Namespace(pr_number=str(pr_num), fetch=True, audit=True, submit=False, cleanup=False, dry_run=True, event=None, json=True, base=None, command="audit-pr", func=handle_audit_pr)
    handle_audit_pr(audit_args)
    payload = parse_review_payload(rev_path)
    contract_errors = validate_submit_review_contract(payload)
    repo = get_github_client().get_repo(get_repo_name())
    conflicts = detect_conflicts(repo, pr_num)
    print(json.dumps({"status":"success" if not contract_errors else "error","data":{"pr":pr_num,"files":{"context":ctx_path,"review":rev_path},"contract":{"valid":not contract_errors,"errors":contract_errors},"payload":payload,"conflicts":[{"prs":list(k),"files":v} for k,v in conflicts.items()]}}, indent=2))
    if contract_errors:
        sys.exit(1)

def handle_status_board(args):
    repo = get_github_client().get_repo(get_repo_name())

    prs_data = []
    if not args.json: print("# Active Agent Work Board\n| Branch | Issue | Status | Conflicts |\n|--------|-------|--------|-----------|")

    for pr in repo.get_pulls(state='open'):
        m = re.search(r'issue-(\d+)', pr.head.ref); issue = f"#{m.group(1)}" if m else "—"
        if not args.json: print(f"| {pr.head.ref} | {issue} | {'Draft' if pr.draft else 'Open'} | ... |")
        prs_data.append({"number": pr.number, "branch": pr.head.ref, "issue": issue, "status": "Draft" if pr.draft else "Open"})

    if args.json: print(json.dumps({"status": "success", "work": prs_data}, indent=2))

def handle_ratchet_any(args):
    current = get_any_count()
    baseline = resolve_baseline(args.baseline_file, 'ANY_COUNT_BASELINE', 0)

    res = {"current": current, "baseline": baseline}
    if not args.json: print(f"TypeScript 'any' Ratchet: Current={current}, Baseline={baseline}")

    if current > baseline:
        msg = f"'any' count increased from {baseline} to {current}."
        if args.json: print(json.dumps({"status": "error", "message": msg, "data": res}, indent=2))
        else: print(f"❌ Error: {msg}")
        sys.exit(1)

    if args.update:
        if not args.dry_run:
            if args.baseline_file:
                with open(args.baseline_file, 'w') as f:
                    f.write(str(current))
                if not args.json: print(f"✅ Updated {args.baseline_file} to {current}")
            else:
                if set_gha_variable('ANY_COUNT_BASELINE', str(current)):
                    if not args.json: print(f"✅ Updated ANY_COUNT_BASELINE to {current}")
                else:
                    if not args.json: print(f"❌ Failed to update ANY_COUNT_BASELINE.")
                    sys.exit(1)
        elif not args.json:
            target = args.baseline_file if args.baseline_file else "ANY_COUNT_BASELINE"
            print(f"[DRY-RUN] Would update {target} to {current}")
    if args.json: print(json.dumps({"status": "success", "data": res}, indent=2))

def handle_bundle_size(args):
    size = get_bundle_size()
    baseline = resolve_baseline(args.baseline_file, 'BUNDLE_BASELINE_KB', 3000)

    res = {"size_kb": size, "baseline_kb": baseline, "threshold_kb": baseline + args.threshold}
    if not args.json: print(f"Bundle Size Check: Current={size}KB, Baseline={baseline}KB")

    if size > res["threshold_kb"]:
        msg = f"Bundle size exceeds threshold ({size}KB > {res['threshold_kb']}KB)."
        if args.json: print(json.dumps({"status": "error", "message": msg, "data": res}, indent=2))
        else: print(f"❌ Error: {msg}")
        sys.exit(1)

    if args.update:
        if not args.dry_run:
            if args.baseline_file:
                with open(args.baseline_file, 'w') as f:
                    f.write(str(size))
                if not args.json: print(f"✅ Updated {args.baseline_file} to {size}")
            else:
                if set_gha_variable('BUNDLE_BASELINE_KB', str(size)):
                    if not args.json: print(f"✅ Updated BUNDLE_BASELINE_KB to {size}")
                else:
                    if not args.json: print(f"❌ Failed to update BUNDLE_BASELINE_KB.")
                    sys.exit(1)
        elif not args.json:
            target = args.baseline_file if args.baseline_file else "BUNDLE_BASELINE_KB"
            print(f"[DRY-RUN] Would update {target} to {size}")
    if args.json: print(json.dumps({"status": "success", "data": res}, indent=2))

def handle_migrate_tokens(args):
    root_dir = 'src'
    matches = []
    if args.find:
        if not args.json: print(f"🔍 Searching for token: {args.find}")
        for filepath in walk_tsx(root_dir):
            findings = find_patterns_in_file(filepath, [(re.escape(args.find), "Found")])
            for ln, _, content in findings:
                matches.append({"file": filepath, "line": ln, "content": content.strip()})
                if not args.json: print(f"  {filepath}:{ln}: {content.strip()}")
    elif args.migrate:
        old, new = args.migrate
        if not args.json: print(f"{'[DRY-RUN] Would replace' if args.dry_run else '[EXECUTE] Replacing'} `{old}` with `{new}`")
        for filepath in walk_tsx(root_dir):
            with open(filepath, 'r') as f: c = f.read()
            if old in c:
                matches.append({"file": filepath})
                if not args.dry_run:
                    with open(filepath, 'w') as f: f.write(c.replace(old, new))
                    if not args.json: print(f"  ✅ Updated: {filepath}")
                elif not args.json: print(f"  📝 Match in: {filepath}")

    if args.json: print(json.dumps({"status": "success", "matches": matches}, indent=2))

def handle_update_issues(args):
    repo_name = get_repo_name()
    g = get_github_client(); repo = g.get_repo(repo_name)

    updates = []
    if not args.json: print(f"🔍 Scanning open issues in {repo_name}...")

    audit_base = get_audit_results(content="")
    config = audit_base.get("config", {})
    deprecated = config.get("deprecated", {})

    for issue in repo.get_issues(state='open'):
        body = issue.body or ''; findings = []
        for old, new in deprecated.get('assets', {}).items():
            if old in body: findings.append(f"References deprecated name `{old}`. Use `{new}` instead.")
        for old, new in deprecated.get('paths', {}).items():
            if old in body: findings.append(f"References deprecated path `{old}`. New location: `{new}`")

        # Audit issue body
        res = get_audit_results(content=body)
        violations = res.get("violations", {}).get("stdin", [])
        for v in violations:
             val = v.get('value', 'N/A')
             findings.append(f"Contains banned pattern: {v['message']} (value: {val})")

        if findings:
            updates.append({"number": issue.number, "findings": findings})
            comment = "## 🤖 Automated Issue Update\n\n" + "\n".join(f"- {f}" for f in findings) + "\n\n---\n*Generated by `td_cli update-issues`*"
            if not args.json: print(f"[{'DRY-RUN' if args.dry_run else 'EXECUTE'}] Found {len(findings)} findings in #{issue.number}")
            if not args.dry_run: issue.create_comment(comment); print(f"✅ Posted update comment to #{issue.number}")
            elif not args.json: print(f"Preview for #{issue.number}:\n{comment}\n")

    if args.json: print(json.dumps({"status": "success", "updates": updates}, indent=2))

def handle_audit_pr(args):
    pr_num = args.pr_number; review_dir = os.path.join(os.getcwd(), "dev-tools", "logs", "reviews")
    ctx_path = os.path.join(review_dir, f"pr-context-{pr_num}.md"); rev_path = os.path.join(review_dir, f"pr-review-{pr_num}.md")

    res = {"pr": pr_num, "files": {}}

    if args.fetch:
        repo = get_github_client().get_repo(get_repo_name()); pr = repo.get_pull(int(pr_num))
        title = pr.title; author = pr.user.login; desc = pr.body or '_No description provided._'
        context_lines = [f"# PR Context: #{pr.number} — {title}", f"**Author:** @{author}\n", f"## Description\n{desc}\n", "## Files Changed"]
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
        template_path = os.path.join(os.path.dirname(__file__), "review_template.md")
        if os.path.exists(template_path): template = open(template_path).read().format(pr_num=pr_num, head_sha=pr.head.sha)
        else: template = f"# PR Review: #{pr_num}\n- SHA: {pr.head.sha}\n"
        with open(rev_path, "w") as f: f.write(template)
        res["files"]["context"] = ctx_path
        res["files"]["review"] = rev_path
        if not args.json: print(f"✅ Generated review files for PR #{pr_num}")

    if args.audit:
        if not os.path.exists(ctx_path): raise CLIError(f"Context file missing: {ctx_path}")
        with open(ctx_path) as f: context = f.read()
        changed_files = re.findall(r'### `([^`]+)`', context); auto_findings = []

        scope_warning = verify_pr_scope(changed_files)
        if scope_warning:
            auto_findings.append({"path": "PR SCOPE", "issue": scope_warning, "severity": "major"})

        files_to_audit = [f for f in changed_files if (f.endswith('.tsx') or f.endswith('.ts')) and os.path.exists(f)]
        if files_to_audit:
            try:
                # Use pnpm run audit as requested, passing targets after --
                # log_on_error=False because audit script exits 1 on violations, which is expected
                proc = run_command(["pnpm", "run", "audit", "--", "--json"] + files_to_audit, check=False, log_on_error=False)
                output = proc.stdout
                if output:
                    # pnpm might add some noise to stdout before/after the actual JSON if not careful,
                    # but our script uses process.stdout.write for JSON.
                    # We try to find the JSON part if there's noise.
                    audit_data = {}
                    if "{" in output:
                        json_start = output.find("{")
                        json_end = output.rfind("}") + 1
                        try:
                            audit_data = json.loads(output[json_start:json_end])
                        except json.JSONDecodeError:
                            log_error("Failed to parse JSON from audit output.")

                    violations_dict = audit_data.get("violations", {})
                    for filepath, violations in violations_dict.items():
                        for v in violations:
                            val = v.get('value', 'N/A')
                            auto_findings.append({
                                "path": filepath,
                                "issue": f"{v['pattern']}: {v['message']} (value: {val})",
                                "severity": v.get('severity', 'minor')
                            })
            except Exception as e:
                if not args.json: print(f"⚠️  Audit script failed: {e}")

        res["auto_findings"] = auto_findings
        if not args.json:
            findings_str = ""
            if auto_findings:
                print(f"📋 Found {len(auto_findings)} violations:")
                for f in auto_findings: print(f"  [{f['severity'].upper()}] {f['path']}: {f['issue']}")
                findings_str = "\n".join([f"- [{f['severity'].upper()}] {f['path']}: {f['issue']}" for f in auto_findings])

                # Update review template with findings
                if os.path.exists(rev_path):
                    with open(rev_path, 'r') as f: rev_content = f.read()
                    # Convert findings to JSON string format for body injection
                    json_findings = findings_str.replace("\n", "\\n")
                    rev_content = rev_content.replace("<findings>", json_findings)
                    rev_content = rev_content.replace("<summary>", f"Audit identified {len(auto_findings)} violations.")
                    with open(rev_path, 'w') as f: f.write(rev_content)
                    log_diag(f"Updated review template with {len(auto_findings)} findings.")
            else:
                if os.path.exists(rev_path):
                    with open(rev_path, 'r') as f: rev_content = f.read()
                    rev_content = rev_content.replace("<findings>", "No violations found.")
                    rev_content = rev_content.replace("<summary>", "Audit passed with no violations.")
                    with open(rev_path, 'w') as f: f.write(rev_content)

            # 1. Trigger autonomous repair agent (using Ollama) to fix files in place
            log_diag(f"Starting autonomous repair for PR #{pr_num}...")
            # Use raw audit output if available for better parsing in repair.py
            repair_input = output if (args.audit and 'output' in locals() and output) else ctx_path
            run_command([sys.executable, os.path.join(os.path.dirname(__file__), "repair.py"), repair_input], check=False)

            # 2. Use Ollama to generate the final review recommendation if possible
            if os.path.exists(rev_path):
                try:
                    from repair import get_ollama_response
                    with open(rev_path, 'r') as f: rev_content = f.read()

                    if auto_findings:
                        prompt = f"Review the following PR audit findings and provide a final recommendation (Approved, Approved with Minor Changes, or Not Approved). Respond ONLY with the recommendation string.\n\nFINDINGS:\n{findings_str}"
                    else:
                        prompt = "The PR audit passed with no violations. Provide a final recommendation: 'Approved'. Respond ONLY with the recommendation string."

                    llm_result = get_ollama_response(prompt)
                    recommendation = llm_result.get("response", "") if llm_result.get("ok") else ""

                    if not recommendation:
                        log_diag("Ollama unavailable. Using rule-based fallback recommendation.")
                        recommendation = "Not Approved" if auto_findings else "Approved"

                    recommendation = recommendation.strip().strip("'\"")
                    # Handle potential long responses or explanations despite instructions
                    # Order matters: check for rejections first
                    if "Not Approved" in recommendation:
                        recommendation = "Not Approved"
                    elif "Minor Changes" in recommendation:
                        recommendation = "Approved with Minor Changes"
                    elif "Approved" in recommendation:
                        recommendation = "Approved"

                    rev_content = rev_content.replace("<Approved | Approved with Minor Changes | Not Approved>", recommendation)
                    with open(rev_path, 'w') as f: f.write(rev_content)
                    log_diag(f"Recommendation: {recommendation} (Ollama fallback used if offline)")
                except (ImportError, Exception) as e:
                    log_diag(f"Skipping AI recommendation (Ollama/repair.py unavailable or failed: {e})")

    if args.submit:
        from submit_review import submit_review
        submit_review(pr_num, rev_path, cleanup=args.cleanup, dry_run=args.dry_run, event_override=args.event, is_json=args.json)

    if args.json: print(json.dumps({"status": "success", "data": res}, indent=2))

def handle_review_smoke(args):
    pr_num = args.pr
    review_dir = os.path.join(os.getcwd(), "dev-tools", "logs", "reviews")
    ctx_path = os.path.join(review_dir, f"pr-context-{pr_num}.md")
    rev_path = os.path.join(review_dir, f"pr-review-{pr_num}.md")

    audit_args = argparse.Namespace(
        pr_number=str(pr_num),
        fetch=True,
        audit=True,
        submit=False,
        cleanup=False,
        dry_run=True,
        event=None,
        json=True,
        base=None,
        command="audit-pr",
        func=handle_audit_pr
    )

    handle_audit_pr(audit_args)

    payload = parse_review_payload(rev_path)
    contract_errors = validate_submit_review_contract(payload)

    repo = get_github_client().get_repo(get_repo_name())
    conflicts = detect_conflicts(repo, pr_num)
    formatted_conflicts = [{"prs": list(k), "files": v} for k, v in conflicts.items()]

    result = {
        "status": "success" if not contract_errors else "error",
        "data": {
            "pr": pr_num,
            "files": {"context": ctx_path, "review": rev_path},
            "contract": {"valid": not contract_errors, "errors": contract_errors},
            "payload": payload,
            "conflicts": formatted_conflicts
        }
    }
    print(json.dumps(result, indent=2))

    if contract_errors:
        sys.exit(1)


def handle_pre_submit(args):
    if not args.json: print("🔍 Running pre-submission checks...")
    results = {"steps": []}
    try:
        def run_step(name, cmd, ignore_failure=False):
            if not args.json: print(f"--- {name} ---")
            if ignore_failure:
                res = run_command(cmd, check=False)
                status = "success" if res.returncode == 0 else "failure"
                results["steps"].append({"name": name, "status": status})
                return res.stdout.strip()
            else:
                try:
                    stdout = run_command(cmd)
                    results["steps"].append({"name": name, "status": "success"})
                    return stdout
                except CLIError as e:
                    results["steps"].append({"name": name, "status": "failure"})
                    raise e

        run_step("Anti-Pattern Audit", ["pnpm", "run", "audit"])
        run_step("TypeScript", ["pnpm", "run", "type-check"])
        run_step("Lint", ["pnpm", "run", "lint"])

        # Baseline Configuration Check
        if not args.json: print("--- Baseline Configuration ---")
        missing_vars = []
        for var_name in ["BUNDLE_BASELINE_KB", "ANY_COUNT_BASELINE"]:
            if not (os.environ.get(var_name) or get_gha_variable(var_name)):
                missing_vars.append(var_name)

        if missing_vars:
            msg = f"Missing GHA variables: {', '.join(missing_vars)}. Run 'gh variable set <NAME> --body <VALUE>' to configure them locally."
            if not args.json: print(f"  ⚠️  {msg}")
            results["steps"].append({"name": "Baseline Check", "status": "warning", "message": msg})
        else:
            results["steps"].append({"name": "Baseline Check", "status": "success"})
            if not args.json: print("  ✅ Technical debt baselines are configured.")

        # PR Scope Check
        scope_warning = verify_pr_scope()

        if scope_warning:
            if not args.json: print(f"  ⚠️ {scope_warning}")
            results["steps"].append({"name": "PR Scope Check", "status": "warning", "message": scope_warning})

        try:
            client = get_github_client()
        except CLIError:
            client = None
        if client:
            if not args.json: print("--- Conflict Check ---")
            conflicts = detect_conflicts(client.get_repo(get_repo_name()))
            results["conflicts"] = [{"prs": list(p), "files": f} for p, f in conflicts.items()]
            if not args.json:
                if conflicts:
                    for pr_pair, files in conflicts.items(): print(f"⚠️  {' ↔ '.join(f'#{p}' for p in pr_pair)} share {len(files)} file(s)")
                else: print("✅ No conflicts detected.")

        if args.json: print(json.dumps({"status": "success", "results": results}, indent=2))
        elif not args.json: print("✅ Pre-submission checks passed.")
    except Exception as e:
        if args.json: print(json.dumps({"status": "error", "message": str(e), "results": results}, indent=2))
        else: print(f"❌ Pre-submission checks failed: {e}")
        sys.exit(1)

def handle_repair(args):
    """Wraps repair.py for AI-assisted CI repair."""
    import tempfile
    import shutil
    from repair import check_ollama_health, ERROR_SERVICE_DOWN, ERROR_MODEL_MISSING, ERROR_GENERATION_FAILED

    def _rule_based_recommendations(logs: str) -> list[str]:
        findings = []
        if re.search(r"TS\d+", logs):
            findings.append("TypeScript errors detected: run `pnpm run type-check` and resolve reported TS codes in order.")
        if "no-unused-vars" in logs or "unused" in logs.lower():
            findings.append("Unused symbols detected: remove dead code or prefix intentionally unused params with `_`.")
        if "anti-pattern" in logs.lower() or "arbitrary values" in logs.lower():
            findings.append("Design-system violations detected: replace raw Tailwind/layout classes with primitives and tokens.")
        if not findings:
            findings.append("Run `pnpm run lint:ox` and `pnpm run type-check`, then address the first error per file deterministically.")
        return findings

    ollama_health = check_ollama_health()
    if not ollama_health["ok"] and not args.json:
        print(f"⚠️ Ollama unavailable ({ollama_health['code']}): {ollama_health['message']}")
        if ollama_health["code"] == ERROR_MODEL_MISSING:
            print("⚠️ Remediation:", ollama_health.get("remediation", "Run `ollama pull <model>`."))

    logs_source = ""
    logs_content = ""

    if args.stdin:
        logs_content = sys.stdin.read()
        logs_source = "stdin"
    elif args.logs:
        if os.path.exists(args.logs):
            with open(args.logs, 'r') as f:
                logs_content = f.read()
            logs_source = args.logs
        else:
            raise CLIError(f"Log file not found: {args.logs}")
    else:
        if not args.json: print("🔍 No logs provided. Running local triage...")
        # Run lint and tsc to gather logs - using execute_raw as we WANT the error logs
        # We gather both stdout and stderr for triage
        res_lint = run_command(["pnpm", "run", "lint:ox"], check=False)
        res_tsc = run_command(["pnpm", "run", "type-check"], check=False)
        logs_content = res_lint.stdout + res_lint.stderr + "\n" + res_tsc.stdout + res_tsc.stderr
        logs_source = "local triage"

    if not logs_content.strip():
        if not args.json: print("✅ No errors found in logs or local triage. Nothing to repair.")
        return

    worktree_path = None
    original_cwd = os.getcwd()
    repair_script = os.path.abspath(os.path.join(os.path.dirname(__file__), "repair.py"))

    try:
        if args.worktree:
            branch_name = f"repair/local-{datetime.now().strftime('%H%M%S')}"
            worktree_path = tempfile.mkdtemp(prefix="tech-dancer-repair-")
            if not args.json: print(f"🏗️  Setting up git worktree at {worktree_path} (branch: {branch_name})...")
            run_command(["git", "worktree", "add", "-b", branch_name, worktree_path, "HEAD"])
            os.chdir(worktree_path)
            # We need to make sure node_modules or dependencies are available if we verify
            # But local repair script runs pnpm. Maybe just symlink node_modules for speed?
            if os.path.exists(os.path.join(original_cwd, "node_modules")):
                os.symlink(os.path.join(original_cwd, "node_modules"), os.path.join(worktree_path, "node_modules"))

        # Write logs to a temp file for repair.py
        with tempfile.NamedTemporaryFile(mode='w', suffix=".log", delete=False) as tmp_log:
            tmp_log.write(logs_content)
            tmp_log_path = tmp_log.name

        if not args.json: print(f"🤖 Starting autonomous repair agent using {logs_source}...")

        if not ollama_health["ok"]:
            recs = _rule_based_recommendations(logs_content)
            if args.json:
                print(json.dumps({
                    "status": "success",
                    "mode": "fallback",
                    "error": {
                        "code": ollama_health["code"],
                        "message": ollama_health["message"]
                    },
                    "recommendations": recs
                }, indent=2))
            else:
                print("🧭 Ollama is unavailable, using deterministic fallback recommendations:")
                for rec in recs:
                    print(f"  - {rec}")
            return

        cmd = [sys.executable, repair_script, tmp_log_path]
        # Also pass eslint json if available locally? For now let's keep it simple.

        proc = run_command(cmd, check=False)
        os.unlink(tmp_log_path)

        if proc.returncode == 0:
            if args.json:
                print(json.dumps({
                    "status": "success",
                    "worktree": worktree_path,
                    "branch": branch_name if args.worktree else None
                }, indent=2))
            else:
                print("✅ Repair process completed.")
                if worktree_path:
                    print(f"👉 Inspect your fixed code at: {worktree_path}")
                    print(f"   Branch: {branch_name}")
        else:
            if args.json: print(json.dumps({"status": "error", "code": proc.returncode}, indent=2))
            else: print(f"❌ Repair process failed with code {proc.returncode}")
            sys.exit(proc.returncode)

    finally:
        os.chdir(original_cwd)

def handle_audit_gate(args):
    # Current violations count
    stdout_current = run_command(["node", "scripts/detect-antipatterns.mjs", "--count-only"])
    current_count = int(stdout_current or 0)

    # 1. Try to get baseline from GHA variable or Environment
    baseline_count = resolve_baseline(None, 'AUDIT_BASELINE', -1)

    # 2. If not set, fallback to origin/main comparison (dynamic baseline)
    if baseline_count == -1:
        baseline_count = 0
        try:
            ls_cmd = ["git", "ls-tree", "-r", "origin/main", "--name-only"]
            main_files = run_command(ls_cmd).splitlines()

            relevant_main_files = []
            for mf in main_files:
                if not (mf.endswith('.tsx') or mf.endswith('.ts')):
                    continue
                for check_dir in AUDIT_CHECK_DIRS:
                    if mf == check_dir or mf.startswith(check_dir + '/'):
                        relevant_main_files.append(mf)
                        break

            for mf in relevant_main_files:
                try:
                    show_cmd = ["git", "show", f"origin/main:{mf}"]
                    # Don't log error here as it might be expected if file is new
                    res_show = run_command(show_cmd, check=False, log_on_error=False)
                    if res_show.returncode != 0:
                        continue

                    content = res_show.stdout
                    stdout_baseline = run_command(["node", "scripts/detect-antipatterns.mjs", "--count-only", "-"],
                                               input_str=content)
                    baseline_count += int(stdout_baseline or 0)
                except (CLIError) as e:
                    print(f"⚠️  Warning: Failed to calculate baseline for {mf}: {e}", file=sys.stderr)
                    continue
        except (CLIError) as e:
            print(f"⚠️  Warning: Failed to resolve dynamic audit baseline: {e}", file=sys.stderr)

    if not args.json:
        print(f"UI Anti-Pattern Audit: Current={current_count}, Baseline={baseline_count}")

    if current_count > baseline_count:
        msg = f"Anti-pattern violations increased from {baseline_count} to {current_count}."
        if args.json:
            print(json.dumps({"status": "error", "message": msg, "data": {"current": current_count, "baseline": baseline_count}}, indent=2))
        else:
            print(f"❌ Error: {msg}")
        sys.exit(1)

    if args.json:
        print(json.dumps({"status": "success", "data": {"current": current_count, "baseline": baseline_count}}, indent=2))
    elif not args.json:
        print("✅ No new violations introduced.")

def handle_repair_context(args):
    from error_rag import RAGPipeline
    pipeline = RAGPipeline()

    if args.log:
        prompt = pipeline.generate_prompt(args.log)
        if prompt:
            print(prompt)
        else:
            raise CLIError("Failed to generate repair context from log line.")
    elif args.file:
        if not os.path.exists(args.file):
            raise CLIError(f"Log file not found: {args.file}")
        with open(args.file, 'r') as f:
            for line in f:
                prompt = pipeline.generate_prompt(line)
                if prompt:
                    print(prompt)
                    print("-" * 40)
    else:
        raise CLIError("Provide --log or --file")

def handle_fix_ci(args):
    from clients.jules_api_client import JulesAPIClient

    repo_name = get_repo_name()

    # 1. Validate Environment & Credentials
    token = get_github_token()
    if not token:
        raise CLIError("Missing GITHUB_TOKEN. Ensure 'secrets.GITHUB_TOKEN' is passed to the environment.", code=401)

    api_key = args.api_key or os.environ.get("JULES_API_KEY")
    if not api_key:
        raise CLIError("Missing JULES_API_KEY. Provide it via --api-key or 'secrets.JULES_API_KEY' environment variable.", code=401)

    repo_name = get_repo_name()
    if not repo_name:
        raise CLIError("Could not determine repository name. Ensure the script is run within a git repository or GH_REPO is set.", code=400)

    g = get_github_client()
    repo = g.get_repo(repo_name)

    # 2. Resolve PR and Branch
    pr = None
    if args.pr_number:
        try:
            pr = repo.get_pull(int(args.pr_number))
            branch = pr.head.ref
        except Exception as e:
            raise CLIError(f"Failed to fetch PR #{args.pr_number}: {e}", code=404)
    elif args.branch:
        branch = args.branch
        pulls = list(repo.get_pulls(state='open', head=f"{repo.owner.login}:{branch}"))
        pr = pulls[0] if pulls else None
    else:
        # Local dev fallback: detect current branch
        try:
            branch = run_command(['git', 'branch', '--show-current'])
            if not branch: raise Exception("No current branch detected")
            if not args.json: print(f"ℹ️  Detected current branch: `{branch}`")
            pulls = list(repo.get_pulls(state='open', head=f"{repo.owner.login}:{branch}"))
            pr = pulls[0] if pulls else None
        except Exception as e:
            raise CLIError(f"Could not resolve branch or PR: {e}. Provide --pr-number or --branch.", code=400)

    # 3. Initialize Jules Client and Resolve Source ID
    client = JulesAPIClient(api_key)

    source_id = get_env_or_gha("JULES_SOURCE_ID")

    if not source_id:
        if not args.json: print("🔍 JULES_SOURCE_ID not found, attempting auto-discovery...")
        try:
            source_id = client.discover_source_id(repo.full_name)
            if not source_id:
                raise Exception("No matching source found")
        except Exception as e:
            raise CLIError(f"JULES_SOURCE_ID is missing and auto-discovery failed ({e}). Ensure JULES_SOURCE_ID is set in GHA variables.", code=400)

    # 3. Call Jules API
    if not args.json: print(f"🚀 Initializing Jules session for branch `{branch}`...")

    session_name = "dry-run-session"
    if not args.dry_run:
        prompt = "Analyze the failing CI logs and fix the errors. Prioritize adherence to RepoAuditor Anti-Slop directives."
        response = client.create_session(source_id, branch, prompt)
        if response:
            session_name = response.get("name")
        else:
            raise CLIError("Jules API session creation failed")
    elif not args.json:
        print(f"[DRY-RUN] Would create session with source sources/{source_id}")

    # 4. Feedback
    feedback = f"🤖 **Jules is on it!**\n\nInitialized an autonomous repair session (`{session_name}`) for branch `{branch}`."
    if pr and not args.dry_run:
        pr.create_issue_comment(feedback)
        if not args.json: print(f"✅ Posted feedback to PR #{pr.number}")
    elif not args.json:
        print(feedback)

    if args.json: print(json.dumps({"status": "success", "session": session_name, "branch": branch}, indent=2))

def handle_track_review(args):
    filepath = args.file or "REVIEW_TRACKING.md"
    if not os.path.exists(filepath):
        with open(filepath, "w") as f:
            f.write("| PR # | Status | Auditor | Conflicts |\n|------|--------|---------|-----------|\n")

    if args.pr and args.status:
        # Deduplicate: check if PR already exists in the file
        exists = False
        with open(filepath, "r") as f:
            lines = f.readlines()
            for line in lines:
                if f"| {args.pr} |" in line:
                    exists = True
                    break

        if not exists:
            with open(filepath, "a") as f:
                f.write(f"| {args.pr} | {args.status} | {args.auditor or 'System'} | {args.conflicts or 'None'} |\n")
            if not args.json: print(f"✅ Tracked PR #{args.pr} in {filepath}")
        else:
            if not args.json: print(f"ℹ️  PR #{args.pr} already tracked in {filepath}")

    if args.json: print(json.dumps({"status": "success", "file": filepath}, indent=2))

def handle_manage_reviews(args):
    g = get_github_client(); repo = g.get_repo(get_repo_name()); login = g.get_user().login

    prs_data = []
    for pr in repo.get_pulls(state='open', sort='updated', direction='desc'):
        last_review = next((r for r in pr.get_reviews().reversed if r.user.login == login), None)
        status = "ACTION: Needs Review" if not last_review else f"ACTION: Needs Re-Review" if last_review.commit_id != pr.head.sha else "STATE: Up-To-Date"

        pr_item = {"number": pr.number, "title": pr.title, "status": status, "unaddressed": []}
        if not args.json: print(f"[PR #{pr.number}] {pr.title}\n  ├── {status}")

        if args.check_responses:
            revs = list(pr.get_reviews()); our_revs = [r for r in revs if r.user.login == login]
            if our_revs:
                last_time = max(r.submitted_at for r in our_revs); our_coms = [c for c in pr.get_review_comments() if c.user.login == login]
                after_coms = [c for c in pr.get_review_comments() if c.user.login != login and any(c.in_reply_to_id == oc.id for oc in our_coms)]
                commits_after = [c for c in pr.get_commits() if c.commit.author.date > last_time]
                for oc in our_coms:
                    if not any(ac.in_reply_to_id == oc.id for ac in after_coms) and not commits_after:
                        pr_item["unaddressed"].append(f"{oc.path}:{oc.position}")
                if pr_item["unaddressed"] and not args.json: print(f"  └── ⚠️ UNADDRESSED ({len(pr_item['unaddressed'])})")

        if args.cleanup_comments:
            for c in pr.get_issue_comments():
                if c.user.login == login and "<!-- td-review-manager-comment -->" in c.body:
                    if not args.dry_run: c.delete(); print(f"  Deleted tool comment {c.id}")
                    elif not args.json: print(f"  [DRY-RUN] Would delete tool comment {c.id}")
        prs_data.append(pr_item)

    if args.json: print(json.dumps({"status": "success", "prs": prs_data}, indent=2))

def main():
    # Base parser for shared arguments across all subcommands
    base_parser = argparse.ArgumentParser(add_help=False)
    base_parser.add_argument("--json", action="store_true", help="Output results in JSON format")
    base_parser.add_argument("--yes", "--non-interactive", action="store_true", help="Bypass interactive prompts and confirmations")

    main_parser = argparse.ArgumentParser(description="Tech-Dancer Repository CLI", parents=[base_parser])
    subparsers = main_parser.add_subparsers(dest="command", help="Command to run")

    for cmd, func in [("validate-issue", handle_validate_issue), ("conflicts", handle_conflicts), ("detect-conflicts", handle_detect_conflicts),
                      ("status-board", handle_status_board),
                      ("ratchet-any", handle_ratchet_any), ("bundle-size", handle_bundle_size), ("migrate-tokens", handle_migrate_tokens),
                      ("update-issues", handle_update_issues), ("audit-pr", handle_audit_pr), ("pre-submit", handle_pre_submit),
                      ("manage-reviews", handle_manage_reviews), ("fetch-review", handle_audit_pr), ("audit-gate", handle_audit_gate),
                      ("fix-ci", handle_fix_ci), ("repair", handle_repair), ("repair-context", handle_repair_context),
                      ("track-review", handle_track_review), ("review-smoke", handle_review_smoke)]: # fetch-review is alias for audit-pr --fetch
        p = subparsers.add_parser(cmd, parents=[base_parser])
        if cmd == "validate-issue":
            p.add_argument("--issue-number", type=int)
            p.add_argument("--all-open", action="store_true")
            p.add_argument("--post-comments", action="store_true")
            add_execution_args(p)
        elif cmd == "conflicts":
            p.add_argument("--base")
            p.add_argument("--force", action="store_true", help="Allow execution with a dirty working tree")
            add_execution_args(p)
        elif cmd == "detect-conflicts": p.add_argument("--pr", type=int)
        elif cmd == "ratchet-any":
            p.add_argument("--baseline-file")
            p.add_argument("--update", action="store_true")
            add_execution_args(p)
        elif cmd == "bundle-size":
            p.add_argument("--baseline-file")
            p.add_argument("--threshold", type=int, default=50)
            p.add_argument("--update", action="store_true")
            add_execution_args(p)
        elif cmd == "migrate-tokens":
            p.add_argument("--find")
            p.add_argument("--migrate", nargs=2, metavar=('OLD', 'NEW'))
            add_execution_args(p)
        elif cmd == "update-issues":
            add_execution_args(p)
        elif cmd in ["audit-pr", "fetch-review"]:
            p.add_argument("pr_number")
            p.add_argument("--fetch", action="store_true")
            p.add_argument("--audit", action="store_true")
            p.add_argument("--submit", action="store_true")
            p.add_argument("--cleanup", action="store_true")
            add_execution_args(p)
            p.add_argument("--event")
            p.add_argument("--base")
        elif cmd == "manage-reviews":
            p.add_argument("--check-responses", action="store_true")
            p.add_argument("--cleanup-comments", action="store_true")
            add_execution_args(p)
        elif cmd == "audit-gate": pass # Uses global --json if provided
        elif cmd == "repair-context":
            p.add_argument("--log", help="Raw log line")
            p.add_argument("--file", help="Path to log file")
        elif cmd == "fix-ci":
            p.add_argument("--pr-number", help="PR number to fix (auto-detected if omitted)")
            p.add_argument("--branch", help="Branch name to fix (auto-detected if omitted)")
            p.add_argument("--api-key", help="Jules API Key (falls back to JULES_API_KEY env var)")
            add_execution_args(p)
        elif cmd == "repair":
            p.add_argument("--logs", help="Path to CI logs file")
            p.add_argument("--stdin", action="store_true", help="Read logs from stdin")
            p.add_argument("--worktree", action="store_true", help="Run repair in a isolated git worktree")
        elif cmd == "track-review":
            p.add_argument("--pr", type=int, help="PR number")
            p.add_argument("--status", help="Current status of the PR")
            p.add_argument("--auditor", help="Name of the auditor")
            p.add_argument("--conflicts", help="Conflict status")
            p.add_argument("--file", help="Path to tracking file")
        elif cmd == "review-smoke":
            p.add_argument("--pr", type=int, required=True, help="PR number to smoke-validate")
        p.set_defaults(func=func)

    args = main_parser.parse_args()
    if not args.command: main_parser.print_help(); sys.exit(1)

    try:
        args.func(args)
    except CLIError as e:
        if args.json: print(json.dumps({"status": "error", "message": e.message, "code": e.code, "data": e.data}, indent=2))
        else: print(f"❌ Error: {e.message}")
        sys.exit(e.code)
    except Exception as e:
        if args.json: print(json.dumps({"status": "error", "message": str(e)}, indent=2))
        else: raise e
        sys.exit(1)

if __name__ == "__main__":
    main()
