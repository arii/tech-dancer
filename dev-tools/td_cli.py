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
import subprocess
import json
from datetime import datetime, timezone, timedelta
from utils import get_github_token, get_repo_name, get_gha_variable, set_gha_variable, CLIError
from repo_utils import walk_tsx, find_patterns_in_file, get_bundle_size, get_any_count
from collections import defaultdict

from scope_check import verify_pr_scope, get_project_config
PROJECT_CONFIG = get_project_config()

# --- Anti-Pattern Audit Configuration ---
AUDIT_CHECK_DIRS = ['src/features', 'src/pages', 'src/App.tsx']

# --- Shared Logic ---

def resolve_baseline(file_path: str | None, env_var: str, fallback_value: int) -> int:
    """Resolves a baseline value from CLI argument, environment variable, or GHA variable."""
    if file_path:
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                return int(f.read().strip() or fallback_value)

    # 1. Environment Variable (High Priority in CI)
    env_val = os.environ.get(env_var)
    if env_val is not None and str(env_val).strip() != "":
        return int(env_val)

    # 2. GitHub Actions Variable (Local Fetch)
    gha_val = get_gha_variable(env_var)
    if gha_val is not None:
        return int(gha_val)

    return fallback_value

def get_audit_results(content: str = None, targets: list[str] = None):
    """Calls the JS audit tool and returns parsed JSON results."""
    cmd = ["node", "scripts/detect-antipatterns.mjs", "--json"]
    if targets:
        cmd.extend(targets)
    elif content is not None:
        cmd.append("-")

    proc = subprocess.run(cmd, input=content, capture_output=True, text=True)
    try:
        return json.loads(proc.stdout)
    except json.JSONDecodeError:
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


# --- CLI Handlers ---

def handle_validate_issue(args):
    from github import Github
    token = get_github_token()
    if not token: raise CLIError("GitHub token not found", code=401)
    repo = Github(token).get_repo(get_repo_name())

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
    if total_findings > 0: sys.exit(1)

def handle_detect_conflicts(args):
    from github import Github
    token = get_github_token()
    if not token: raise CLIError("GitHub token not found", code=401)
    repo = Github(token).get_repo(get_repo_name())
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
    """
    Squashes commits, attempts auto-resolution of simple conflicts,
    and updates snapshots.
    """
    def run(cmd, exit_on_fail=False):
        print(f"🏃 Running: {cmd}")
        res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"⚠️ Output/Error:\n{res.stderr.strip() or res.stdout.strip()}")
            if exit_on_fail:
                sys.exit(res.returncode)
        return res.returncode, res.stdout.strip()

    base_branch = getattr(args, 'base', 'main') or 'main'

    # 1. Squash all commits relative to the base branch
    print("📦 Squashing current branch commits...")
    run("git fetch origin")
    code, merge_base = run(f"git merge-base origin/{base_branch} HEAD")

    if code == 0 and merge_base:
        run(f"git reset --soft {merge_base}")
        run('git commit -m "chore: squashed commits prior to conflict resolution"')

    # 2. Merge base to auto-resolve simple conflicts
    print(f"🔄 Merging origin/{base_branch}...")
    merge_code, _ = run(f"git merge origin/{base_branch}")

    if merge_code != 0:
        print("🚧 Complex conflicts remain. Git has auto-resolved the simple ones.")
        print("Please resolve the remaining file conflicts manually.")
        print("⚠️ Skipping snapshot updates until conflict markers are cleared.")
        return

    # 3. Update snapshots after successful merge
    print("📸 Updating test snapshots...")
    run("pnpm test -u")

    # Amend the snapshot updates directly into our squashed commit
    run("git add -A")
    run("git commit --amend --no-edit")

    print("✅ Conflict handling and snapshot updates complete!")

def handle_status_board(args):
    from github import Github
    token = get_github_token()
    if not token: raise CLIError("GitHub token not found", code=401)
    repo = Github(token).get_repo(get_repo_name())

    prs_data = []
    if not args.json: print("# Active Agent Work Board\n| Branch | Issue | Status | Conflicts |\n|--------|-------|--------|-----------|")

    for pr in repo.get_pulls(state='open'):
        m = re.search(r'issue-(\d+)', pr.head.ref); issue = f"#{m.group(1)}" if m else "—"
        if not args.json: print(f"| {pr.head.ref} | {issue} | {'Draft' if pr.draft else 'Open'} | ... |")
        prs_data.append({"branch": pr.head.ref, "issue": issue, "status": "Draft" if pr.draft else "Open"})

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
    from github import Github
    token = get_github_token(); repo_name = get_repo_name()
    if not token: raise CLIError("GitHub token not found", code=401)
    g = Github(token); repo = g.get_repo(repo_name)

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
        token = get_github_token()
        if not token: raise CLIError("GitHub token not found", code=401)
        from github import Github; repo = Github(token).get_repo(get_repo_name()); pr = repo.get_pull(int(pr_num))
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
                proc = subprocess.run(["pnpm", "run", "audit", "--", "--json"] + files_to_audit, capture_output=True, text=True)
                if proc.stdout:
                    # pnpm might add some noise to stdout before/after the actual JSON if not careful,
                    # but our script uses process.stdout.write for JSON.
                    # We try to find the JSON part if there's noise.
                    output = proc.stdout
                    if "{" in output:
                        json_start = output.find("{")
                        json_end = output.rfind("}") + 1
                        audit_data = json.loads(output[json_start:json_end])
                    for filepath, violations in audit_data.items():
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
            if auto_findings:
                print(f"📋 Found {len(auto_findings)} violations:")
                for f in auto_findings: print(f"  [{f['severity'].upper()}] {f['path']}: {f['issue']}")
            subprocess.call(["copilot", "-p", f"Auditing PR #{pr_num}...", "--allow-tool", "read", "--allow-tool", "write", "--allow-tool", "file_edit"])

    if args.submit:
        from submit_review import submit_review
        submit_review(pr_num, rev_path, cleanup=args.cleanup, dry_run=args.dry_run, event_override=args.event, is_json=args.json)

    if args.json: print(json.dumps({"status": "success", "data": res}, indent=2))

def handle_pre_submit(args):
    if not args.json: print("🔍 Running pre-submission checks...")
    results = {"steps": []}
    try:
        def run_step(name, cmd, ignore_failure=False):
            if not args.json: print(f"--- {name} ---")
            proc = subprocess.run(cmd, capture_output=args.json, text=True)
            results["steps"].append({"name": name, "status": "success" if proc.returncode == 0 else "failure"})
            if proc.returncode != 0 and not ignore_failure: raise subprocess.CalledProcessError(proc.returncode, cmd)
            return proc

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

        token = get_github_token()
        if token:
            if not args.json: print("--- Conflict Check ---")
            from github import Github
            conflicts = detect_conflicts(Github(token).get_repo(get_repo_name()))
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

    # Ensure Ollama is running or at least check it
    try:
        import urllib.request
        urllib.request.urlopen("http://localhost:11434/api/tags", timeout=2)
    except Exception:
        if not args.json: print("⚠️ Ollama does not seem to be running on http://localhost:11434. Repair might fail.")

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
        # Run lint and tsc to gather logs
        res_lint = subprocess.run(["pnpm", "run", "lint:ox"], capture_output=True, text=True)
        res_tsc = subprocess.run(["pnpm", "run", "type-check"], capture_output=True, text=True)
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
            subprocess.run(["git", "worktree", "add", "-b", branch_name, worktree_path, "HEAD"], check=True, capture_output=True)
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

        cmd = [sys.executable, repair_script, tmp_log_path]
        # Also pass eslint json if available locally? For now let's keep it simple.

        proc = subprocess.run(cmd)
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
    proc_current = subprocess.run(["node", "scripts/detect-antipatterns.mjs", "--count-only"], capture_output=True, text=True)
    current_count = int(proc_current.stdout.strip() or 0)

    # 1. Try to get baseline from GHA variable or Environment
    baseline_count = resolve_baseline(None, 'AUDIT_BASELINE', -1)

    # 2. If not set, fallback to origin/main comparison (dynamic baseline)
    if baseline_count == -1:
        baseline_count = 0
        try:
            ls_cmd = ["git", "ls-tree", "-r", "origin/main", "--name-only"]
            main_files = subprocess.check_output(ls_cmd, text=True, stderr=subprocess.DEVNULL).splitlines()

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
                    content = subprocess.check_output(show_cmd, text=True, stderr=subprocess.DEVNULL)
                    proc_baseline = subprocess.run(["node", "scripts/detect-antipatterns.mjs", "--count-only", "-"],
                                                   input=content, capture_output=True, text=True)
                    baseline_count += int(proc_baseline.stdout.strip() or 0)
                except subprocess.CalledProcessError:
                    continue
        except subprocess.CalledProcessError:
            pass

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
    from github import Github
    from clients.jules_api_client import JulesAPIClient

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

    g = Github(token)
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
            branch = subprocess.check_output(['git', 'branch', '--show-current'], text=True).strip()
            if not branch: raise Exception("No current branch detected")
            if not args.json: print(f"ℹ️  Detected current branch: `{branch}`")
            pulls = list(repo.get_pulls(state='open', head=f"{repo.owner.login}:{branch}"))
            pr = pulls[0] if pulls else None
        except Exception as e:
            raise CLIError(f"Could not resolve branch or PR: {e}. Provide --pr-number or --branch.", code=400)

    # 3. Initialize Jules Client and Resolve Source ID
    client = JulesAPIClient(api_key)

    source_id = os.environ.get("JULES_SOURCE_ID") or get_gha_variable("JULES_SOURCE_ID")
    if not source_id:
        if not args.json: print("🔍 JULES_SOURCE_ID not found, attempting auto-discovery...")
        try:
            source_id = client.discover_source_id(repo.full_name)
        except Exception as e:
            raise CLIError(f"Error during JULES_SOURCE_ID auto-discovery: {e}", code=500)

    if not source_id:
        raise CLIError("JULES_SOURCE_ID is missing and auto-discovery failed. Ensure JULES_SOURCE_ID is set in GHA variables.", code=400)

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

def handle_manage_reviews(args):
    from github import Github
    token = get_github_token()
    if not token: raise CLIError("GitHub token not found", code=401)
    g = Github(token); repo = g.get_repo(get_repo_name()); login = g.get_user().login

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
    parser = argparse.ArgumentParser(description="Tech-Dancer Repository CLI")
    parser.add_argument("--json", action="store_true", help="Output results in JSON format")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    for cmd, func in [("validate-issue", handle_validate_issue), ("conflicts", handle_conflicts), ("detect-conflicts", handle_detect_conflicts),
                      ("status-board", handle_status_board),
                      ("ratchet-any", handle_ratchet_any), ("bundle-size", handle_bundle_size), ("migrate-tokens", handle_migrate_tokens),
                      ("update-issues", handle_update_issues), ("audit-pr", handle_audit_pr), ("pre-submit", handle_pre_submit),
                      ("manage-reviews", handle_manage_reviews), ("fetch-review", handle_audit_pr), ("audit-gate", handle_audit_gate),
                      ("fix-ci", handle_fix_ci), ("repair", handle_repair), ("repair-context", handle_repair_context)]: # fetch-review is alias for audit-pr --fetch
        p = subparsers.add_parser(cmd)
        if cmd == "validate-issue":
            p.add_argument("--issue-number", type=int)
            p.add_argument("--all-open", action="store_true")
            p.add_argument("--post-comments", action="store_true")
            p.add_argument("--dry-run", action="store_true", default=True)
            p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "conflicts": p.add_argument("--base")
        elif cmd == "detect-conflicts": p.add_argument("--pr", type=int)
        elif cmd == "ratchet-any":
            p.add_argument("--baseline-file")
            p.add_argument("--update", action="store_true")
            p.add_argument("--dry-run", action="store_true", default=True)
            p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "bundle-size":
            p.add_argument("--baseline-file")
            p.add_argument("--threshold", type=int, default=50)
            p.add_argument("--update", action="store_true")
            p.add_argument("--dry-run", action="store_true", default=True)
            p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "migrate-tokens": p.add_argument("--find"); p.add_argument("--migrate", nargs=2, metavar=('OLD', 'NEW')); p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "update-issues": p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd in ["audit-pr", "fetch-review"]:
            p.add_argument("pr_number")
            p.add_argument("--fetch", action="store_true"); p.add_argument("--audit", action="store_true"); p.add_argument("--submit", action="store_true"); p.add_argument("--cleanup", action="store_true")
            p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
            p.add_argument("--event"); p.add_argument("--base")
        elif cmd == "manage-reviews": p.add_argument("--check-responses", action="store_true"); p.add_argument("--cleanup-comments", action="store_true"); p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "audit-gate": pass # Uses global --json if provided
        elif cmd == "repair-context":
            p.add_argument("--log", help="Raw log line")
            p.add_argument("--file", help="Path to log file")
        elif cmd == "fix-ci":
            p.add_argument("--pr-number", help="PR number to fix (auto-detected if omitted)")
            p.add_argument("--branch", help="Branch name to fix (auto-detected if omitted)")
            p.add_argument("--api-key", help="Jules API Key (falls back to JULES_API_KEY env var)")
            p.add_argument("--dry-run", action="store_true", default=True)
            p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "repair":
            p.add_argument("--logs", help="Path to CI logs file")
            p.add_argument("--stdin", action="store_true", help="Read logs from stdin")
            p.add_argument("--worktree", action="store_true", help="Run repair in a isolated git worktree")
        p.set_defaults(func=func)

    args = parser.parse_args()
    if not args.command: parser.print_help(); sys.exit(1)

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
