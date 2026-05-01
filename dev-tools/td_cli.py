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
from utils import get_github_token, get_repo_name, get_gha_variable, CLIError
from repo_utils import walk_tsx, find_patterns_in_file, get_bundle_size, get_any_count
from collections import defaultdict

from scope_check import verify_pr_scope, get_project_config
PROJECT_CONFIG = get_project_config()
EXISTING_COMPONENTS = {
    'Box': 'src/layouts/Box.tsx', 'Stack': 'src/layouts/Stack.tsx', 'Grid': 'src/layouts/Grid.tsx',
    'Text': 'src/layouts/Text.tsx', 'Button': 'src/layouts/Button.tsx', 'ContentCard': 'src/components/ui/ContentCard.tsx',
    'PageHeader': 'src/components/ui/PageHeader.tsx', 'FilterBar': 'src/components/ui/FilterBar.tsx',
    'FolioGrid': 'src/components/ui/FolioGrid.tsx', 'Skeleton': 'src/components/ui/Skeleton.tsx',
    'ViewToggle': 'src/components/ui/ViewToggle.tsx', 'ListRow': 'src/components/ui/ListRow.tsx',
    'MarkdownRenderer': 'src/components/ui/MarkdownRenderer.tsx', 'DetailLayout': 'src/components/layout/DetailLayout.tsx',
    'useSearchParam': 'src/hooks/useSearchParam.ts', 'useHotkeys': 'src/hooks/useHotkeys.ts', 'safeSearch': 'src/lib/utils.ts',
}

# --- Anti-Pattern Audit Configuration ---
AUDIT_CHECK_DIRS = ['src/features', 'src/pages', 'src/components', 'src/App.tsx']

AUDIT_LAYOUT_SUGGESTIONS = {
    'flex flex-col': '<Stack direction="col">',
    'flex flex-row': '<Stack direction="row">',
    'flex items-center': '<Stack align="center">',
    'flex justify-between': '<Stack justify="between">',
    'grid grid-cols': '<Grid cols={...}>',
}

AUDIT_CONFIG = {
    'allowedColors': [
        'bg', 'surface', 'accent', 'accent-brand', 'accent-navy',
        'text-main', 'text-body', 'text-dim', 'line', 'white', 'black',
        'transparent', 'current', 'yellow-400', 'emerald-500', 'red-500',
        'amber-500', 'success', 'error', 'warning'
    ],
    'allowedTextUtils': ['left', 'right', 'center', 'justify', 'uppercase', 'lowercase', 'capitalize', 'normal-case', 'italic', 'not-italic'],
    'allowedTextSizes': ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
    'rules': [
        {
            'name': 'Arbitrary Value',
            'pattern': r'-\[.*?\]',
            'message': 'Avoid arbitrary values like -[...]. Use design tokens instead.'
        },
        {
            'name': 'Raw Layout/Spacing',
            'pattern': r'\b(flex|grid|items-|justify-|p[xytrbl]?-|m[xytrbl]?-|gap-)\b',
            'isClassNameRule': True,
            'message': 'Use <Box />, <Stack />, or <Grid /> primitives for layout and spacing.'
        },
        {
            'name': 'div Layout',
            'pattern': r'<div\s+[^>]*?className=["\'](.*?(?:flex|grid|p-|m-|gap-).*?)["\']',
            'message': 'Avoid using <div> for layout. Use layout primitives from src/layouts/.'
        }
      ]
}

BANNED_PATTERNS = [
    (r'HashRouter', 'HashRouter is banned. Use createBrowserRouter (AGENTS.md §9)'),
    (r'import React from .react.', 'Unnecessary React import — React 17+ (AGENTS.md §4)'),
    (r'style=\{\{', 'Inline styles are banned. Use design tokens (AGENTS.md §11)'),
    (r'text-\[\d+px\]', 'Arbitrary px Tailwind value. Use design tokens (AGENTS.md §1)'),
    (r'bg-\[#', 'Raw hex color in Tailwind. Use CSS variables from tokens.css'),
    (r'<div\s+className=".*?(flex|grid|p-|m-)', 'Raw layout div. Use <Box/>, <Stack/>, <Grid/> primitives (AGENTS.md §3)'),
    (r'className=".*?text-\[\d', 'Arbitrary text size. Use typeSizes from design-tokens.ts'),
]

RENAMED_ASSETS = { 'accent-brand': 'accent', 'useSearch': 'useSearchParam' }
DEPRECATED_PATHS = { 'src/components/common/': 'src/components/ui/' }
REQUIRED_FOR_CONTENT_ISSUES = ['type', 'title', 'date', 'author', 'category', 'excerpt']

# --- Shared Logic ---

def resolve_baseline(file_path: str | None, env_var: str, default_file: str, fallback_value: int) -> int:
    """Resolves a baseline value from CLI argument, environment variable, GHA variable, or default file."""
    if file_path:
        if os.path.exists(file_path):
            with open(file_path, 'r') as f:
                return int(f.read().strip() or fallback_value)

    # 1. Environment Variable (High Priority in CI)
    env_val = os.environ.get(env_var)
    if env_val and env_val.strip():
        return int(env_val)

    # 2. GitHub Actions Variable (Local Fetch)
    gha_val = get_gha_variable(env_var)
    if gha_val:
        return int(gha_val)

    # 3. Default File (Legacy Fallback)
    if os.path.exists(default_file):
        with open(default_file, 'r') as f:
            return int(f.read().strip() or fallback_value)

    return fallback_value

def get_violations_count(content: str, filepath: str) -> int:
    if '// impeccable-ignore-file' in content:
        return 0

    lines = content.split('\n')
    violations_count = 0

    # 1. Check for regex patterns defined in rules
    for rule in AUDIT_CONFIG['rules']:
        if rule.get('isClassNameRule'):
            continue

        pattern = rule['pattern']
        for match in re.finditer(pattern, content):
            line_num = content.count('\n', 0, match.start()) + 1
            if line_num <= len(lines) and '// impeccable-ignore' in lines[line_num - 1]:
                continue
            violations_count += 1

    # 2. Check for classes in className
    class_name_regex = r'className=["\'](.*?)["\']'
    for match in re.finditer(class_name_regex, content):
        line_num = content.count('\n', 0, match.start()) + 1
        if line_num <= len(lines) and '// impeccable-ignore' in lines[line_num - 1]:
            continue

        class_str = match.group(1)
        classes = class_str.split()

        layout_rule = next(r for r in AUDIT_CONFIG['rules'] if r['name'] == 'Raw Layout/Spacing')

        for cls in classes:
            # Check against Raw Layout/Spacing rule
            if re.search(layout_rule['pattern'], cls):
                violations_count += 1

            # Colors check
            if re.search(r'\b(bg-|text-)\b', cls):
                color_match = re.search(r'\b(?:[a-z-]+:)?(bg|text)-([a-z0-9/-]+)\b', cls)
                if color_match:
                    base_color = color_match.group(2).split('/')[0]
                    full_token = f"{color_match.group(1)}-{base_color}"

                    is_allowed = (base_color in AUDIT_CONFIG['allowedColors'] or
                                  full_token in AUDIT_CONFIG['allowedColors'] or
                                  base_color in AUDIT_CONFIG['allowedTextUtils'] or
                                  base_color in AUDIT_CONFIG['allowedTextSizes'])

                    if not is_allowed:
                        violations_count += 1

        # Check for layout suggestions (once per className match)
        # Mirroring JS logic: Object.entries(LAYOUT_SUGGESTIONS).forEach(([pattern, suggestion]) => { if (classStr.includes(pattern)) { ... } })
        # Note: JS version only adds once per LINE if not already added for 'Layout Suggestion'
        # To match exactly, we'd need to track line violations.
        # But JS adds once per className check effectively because it's inside the className loop.
        # Wait, JS has `if (!violations.find(v => v.line === lineNum && v.pattern === 'Layout Suggestion'))`

        for pattern, suggestion in AUDIT_LAYOUT_SUGGESTIONS.items():
            if pattern in class_str:
                violations_count += 1
                break # Only count ONE layout suggestion per className match to stay closer to JS "once per line" (usually one className per line)

    return violations_count

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
    for issue in issues:
        findings, warnings = [], []; body = issue.body or ''; title = issue.title or ''
        for i, block in enumerate(extract_code_blocks(body)):
            for pattern, msg in BANNED_PATTERNS:
                if re.search(pattern, block): findings.append(f"Code block {i+1}: {msg}")
            for comp, path in EXISTING_COMPONENTS.items():
                if re.search(rf'(create|build|make|add|new)\s+.*{comp}', block, re.IGNORECASE): warnings.append(f"Code block {i+1}: Suggests `{comp}` (exists at `{path}`)")
        for comp, path in EXISTING_COMPONENTS.items():
            if re.search(rf'(create|build|make|add\s+a\s+new)\s+.*{comp}\b', body, re.IGNORECASE): warnings.append(f"Issue suggests `{comp}` (exists at `{path}`)")
        if title.startswith('Draft:') and '```markdown' in body:
            md_match = re.search(r'```markdown\n(.*?)\n```', body, re.DOTALL)
            if md_match:
                for field in REQUIRED_FOR_CONTENT_ISSUES:
                    if not re.search(rf'^{field}:', md_match.group(1), re.MULTILINE): findings.append(f"Missing frontmatter: `{field}`")
        if not re.search(r'(acceptance criteria|definition of done|## done|verify|test)', body, re.IGNORECASE): warnings.append("No acceptance criteria.")
        if re.search(r'tailwind|className.*flex|className.*grid', body, re.IGNORECASE) and not re.search(r'<Box|<Stack|<Grid|primitives|design.tokens', body, re.IGNORECASE): warnings.append("Mentions Tailwind but not layout primitives.")

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

def handle_conflicts(args):
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
    baseline = resolve_baseline(args.baseline_file, 'ANY_COUNT_BASELINE', "any-count.txt", 0)

    res = {"current": current, "baseline": baseline}
    if not args.json: print(f"TypeScript 'any' Ratchet: Current={current}, Baseline={baseline}")

    if current > baseline:
        msg = f"'any' count increased from {baseline} to {current}."
        if args.json: print(json.dumps({"status": "error", "message": msg, "data": res}, indent=2))
        else: print(f"❌ Error: {msg}")
        sys.exit(1)

    if args.update:
        update_file = args.baseline_file or "any-count.txt"
        if not args.dry_run:
            with open(update_file, 'w') as f:
                f.write(str(current))
        elif not args.json:
            print(f"[DRY-RUN] Would update {update_file} to {current}")
    if args.json: print(json.dumps({"status": "success", "data": res}, indent=2))

def handle_bundle_size(args):
    size = get_bundle_size()
    baseline = resolve_baseline(args.baseline_file, 'BUNDLE_BASELINE_KB', ".bundle-baseline", 3000)

    res = {"size_kb": size, "baseline_kb": baseline, "threshold_kb": baseline + args.threshold}
    if not args.json: print(f"Bundle Size Check: Current={size}KB, Baseline={baseline}KB")

    if size > res["threshold_kb"]:
        msg = f"Bundle size exceeds threshold ({size}KB > {res['threshold_kb']}KB)."
        if args.json: print(json.dumps({"status": "error", "message": msg, "data": res}, indent=2))
        else: print(f"❌ Error: {msg}")
        sys.exit(1)

    if args.update:
        update_file = args.baseline_file or ".bundle-baseline"
        if not args.dry_run:
            with open(update_file, 'w') as f:
                f.write(str(size))
        elif not args.json:
            print(f"[DRY-RUN] Would update {update_file} to {size}")
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
    for issue in repo.get_issues(state='open'):
        body = issue.body or ''; findings = []
        for old, new in RENAMED_ASSETS.items():
            if old in body: findings.append(f"References deprecated name `{old}`. Use `{new}` instead.")
        for old, new in DEPRECATED_PATHS.items():
            if old in body: findings.append(f"References deprecated path `{old}`. New location: `{new}`")
        for pattern, message in BANNED_PATTERNS:
            if re.search(pattern, body): findings.append(f"Contains banned pattern: {message}")
        if findings:
            updates.append({"number": issue.number, "findings": findings})
            comment = "## 🤖 Automated Issue Update\n\n" + "\n".join(f"- {f}" for f in findings) + "\n\n---\n*Generated by `td_cli update-issues`*"
            if not args.json: print(f"[{'DRY-RUN' if args.dry_run else 'EXECUTE'}] Found {len(findings)} issues in #{issue.number}")
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
                            auto_findings.append({
                                "path": filepath,
                                "issue": f"{v['pattern']}: {v['message']} (value: {v['value']})",
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

def handle_audit_gate(args):
    current_count = 0
    files_to_check = []

    for dir_path in AUDIT_CHECK_DIRS:
        full_path = os.path.join(os.getcwd(), dir_path)
        if os.path.isfile(full_path) and full_path.endswith('.tsx'):
            files_to_check.append(dir_path)
        elif os.path.isdir(full_path):
            for root, _, files in os.walk(full_path):
                for file in files:
                    if file.endswith('.tsx'):
                        files_to_check.append(os.path.relpath(os.path.join(root, file), os.getcwd()))

    for filepath in files_to_check:
        if os.path.exists(filepath):
            with open(filepath, 'r') as f:
                current_count += get_violations_count(f.read(), filepath)

    baseline_count = 0
    try:
        # Get files from origin/main
        ls_cmd = ["git", "ls-tree", "-r", "origin/main", "--name-only"]
        main_files = subprocess.check_output(ls_cmd, text=True, stderr=subprocess.DEVNULL).splitlines()

        relevant_main_files = []
        for mf in main_files:
            if not mf.endswith('.tsx'):
                continue
            for check_dir in AUDIT_CHECK_DIRS:
                if mf == check_dir or mf.startswith(check_dir + '/'):
                    relevant_main_files.append(mf)
                    break

        for mf in relevant_main_files:
            try:
                show_cmd = ["git", "show", f"origin/main:{mf}"]
                content = subprocess.check_output(show_cmd, text=True, stderr=subprocess.DEVNULL)
                baseline_count += get_violations_count(content, mf)
            except subprocess.CalledProcessError:
                continue
    except subprocess.CalledProcessError:
        # origin/main might not exist
        pass

    if not args.json:
        print(f"UI Anti-Pattern Audit: Current={current_count}, Baseline={baseline_count} (origin/main)")

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

    for cmd, func in [("validate-issue", handle_validate_issue), ("conflicts", handle_conflicts), ("status-board", handle_status_board),
                      ("ratchet-any", handle_ratchet_any), ("bundle-size", handle_bundle_size), ("migrate-tokens", handle_migrate_tokens),
                      ("update-issues", handle_update_issues), ("audit-pr", handle_audit_pr), ("pre-submit", handle_pre_submit),
                      ("manage-reviews", handle_manage_reviews), ("fetch-review", handle_audit_pr), ("audit-gate", handle_audit_gate)]: # fetch-review is alias for audit-pr --fetch
        p = subparsers.add_parser(cmd)
        if cmd == "validate-issue":
            p.add_argument("--issue-number", type=int)
            p.add_argument("--all-open", action="store_true")
            p.add_argument("--post-comments", action="store_true")
            p.add_argument("--dry-run", action="store_true", default=True)
            p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "conflicts": p.add_argument("--pr", type=int)
        elif cmd == "ratchet-any":
            p.add_argument("--baseline-file", default="any-count.txt")
            p.add_argument("--update", action="store_true")
            p.add_argument("--dry-run", action="store_true", default=True)
            p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "bundle-size":
            p.add_argument("--baseline-file", default=".bundle-baseline")
            p.add_argument("--threshold", type=int, default=50)
            p.add_argument("--update", action="store_true")
            p.add_argument("--dry-run", action="store_true", default=True)
            p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "migrate-tokens": p.add_argument("--find"); p.add_argument("--migrate", nargs=2, metavar=('OLD', 'NEW')); p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "update-issues": p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "audit-pr":
            p.add_argument("pr_number")
            p.add_argument("--fetch", action="store_true"); p.add_argument("--audit", action="store_true"); p.add_argument("--submit", action="store_true"); p.add_argument("--cleanup", action="store_true")
            p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
            p.add_argument("--event"); p.add_argument("--base")
        elif cmd == "manage-reviews": p.add_argument("--check-responses", action="store_true"); p.add_argument("--cleanup-comments", action="store_true"); p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "audit-gate": pass # Uses global --json if provided
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
