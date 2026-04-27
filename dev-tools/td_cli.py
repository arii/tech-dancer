#!/usr/bin/env python3
"""
td_cli.py - Unified Tech-Dancer Developer CLI

Consolidates multiple fragmented scripts into a single entry point for repo automation.
"""

import argparse
import sys
import os
import re
import subprocess
from datetime import datetime, timezone, timedelta
from github_utils import get_github_token, get_repo_name, get_ci_status, CIFormatter
from repo_utils import walk_tsx, find_patterns_in_file, get_bundle_size, get_any_count
from collections import defaultdict

# --- Issue Validator Logic ---
EXISTING_COMPONENTS = {
    'Box': 'src/layouts/Box.tsx',
    'Stack': 'src/layouts/Stack.tsx',
    'Grid': 'src/layouts/Grid.tsx',
    'Text': 'src/layouts/Text.tsx',
    'Button': 'src/layouts/Button.tsx',
    'ContentCard': 'src/components/ui/ContentCard.tsx',
    'PageHeader': 'src/components/ui/PageHeader.tsx',
    'FilterBar': 'src/components/ui/FilterBar.tsx',
    'FolioGrid': 'src/components/ui/FolioGrid.tsx',
    'Skeleton': 'src/components/ui/Skeleton.tsx',
    'ViewToggle': 'src/components/ui/ViewToggle.tsx',
    'ListRow': 'src/components/ui/ListRow.tsx',
    'MarkdownRenderer': 'src/components/ui/MarkdownRenderer.tsx',
    'DetailLayout': 'src/components/layout/DetailLayout.tsx',
    'useSearchParam': 'src/hooks/useSearchParam.ts',
    'useHotkeys': 'src/hooks/useHotkeys.ts',
    'safeSearch': 'src/lib/utils.ts',
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

REQUIRED_FOR_CONTENT_ISSUES = ['type', 'title', 'date', 'author', 'category', 'excerpt']

def extract_code_blocks(text: str) -> list[str]:
    return re.findall(r'```(?:tsx?|jsx?|html)?\n(.*?)```', text, re.DOTALL)

def check_issue_quality(issue, repo):
    body = issue.body or ''
    title = issue.title or ''
    findings = []
    warnings = []

    code_blocks = extract_code_blocks(body)
    for i, block in enumerate(code_blocks):
        for pattern, message in BANNED_PATTERNS:
            if re.search(pattern, block):
                findings.append(f"Code block {i+1}: {message}")
        for component, path in EXISTING_COMPONENTS.items():
            if re.search(rf'(create|build|make|add|new)\s+.*{component}', block, re.IGNORECASE):
                warnings.append(f"Code block {i+1}: Suggests creating `{component}` — it already exists at `{path}`")

    for component, path in EXISTING_COMPONENTS.items():
        if re.search(rf'(create|build|make|add\s+a\s+new)\s+.*{component}\b', body, re.IGNORECASE):
            warnings.append(f"Issue text suggests creating `{component}` — already exists at `{path}`")

    if title.startswith('Draft:') and '```markdown' in body:
        md_match = re.search(r'```markdown\n(.*?)\n```', body, re.DOTALL)
        if md_match:
            frontmatter = md_match.group(1)
            for field in REQUIRED_FOR_CONTENT_ISSUES:
                if not re.search(rf'^{field}:', frontmatter, re.MULTILINE):
                    findings.append(f"Content issue missing required frontmatter field: `{field}`")

    if not re.search(r'(acceptance criteria|definition of done|## done|verify|test)', body, re.IGNORECASE):
        warnings.append("No acceptance criteria found. Consider adding a 'Verification' or 'Done when' section.")

    if re.search(r'tailwind|className.*flex|className.*grid', body, re.IGNORECASE):
        if not re.search(r'<Box|<Stack|<Grid|primitives|design.tokens', body, re.IGNORECASE):
            warnings.append("Issue mentions Tailwind/className layout but doesn't reference layout primitives (Box/Stack/Grid).")

    return findings, warnings

# --- Conflict Detector Logic ---
def get_pr_files(pr) -> set[str]:
    return {f.filename for f in pr.get_files()}

def detect_conflicts(repo, target_pr_num=None):
    open_prs = list(repo.get_pulls(state='open'))
    file_to_prs = defaultdict(list)
    for pr in open_prs:
        for f in get_pr_files(pr):
            file_to_prs[f].append(pr.number)

    conflicts = defaultdict(list)
    for filename, prs in file_to_prs.items():
        if len(prs) > 1:
            if target_pr_num is None or target_pr_num in prs:
                conflicts[tuple(sorted(prs))].append(filename)
    return conflicts

# --- Migration/Updater Logic ---
RENAMED_ASSETS = { 'accent-brand': 'accent', 'useSearch': 'useSearchParam' }
DEPRECATED_PATHS = { 'src/components/common/': 'src/components/ui/' }

def handle_migrate_tokens(args):
    root_dir = 'src'
    if args.find:
        print(f"🔍 Searching for token: {args.find}")
        for filepath in walk_tsx(root_dir):
            findings = find_patterns_in_file(filepath, [(re.escape(args.find), "Found")])
            for line_num, _, line_content in findings:
                print(f"  {filepath}:{line_num}: {line_content.strip()}")
    elif args.migrate:
        old, new = args.migrate
        action = "[DRY-RUN] Would replace" if args.dry_run else "[EXECUTE] Replacing"
        print(f"{action} `{old}` with `{new}`")
        for filepath in walk_tsx(root_dir):
            with open(filepath, 'r') as f: content = f.read()
            if old in content:
                if not args.dry_run:
                    with open(filepath, 'w') as f: f.write(content.replace(old, new))
                    print(f"  ✅ Updated: {filepath}")
                else: print(f"  📝 Match in: {filepath}")

def handle_update_issues(args):
    from github import Github
    token = get_github_token(); repo_name = get_repo_name()
    g = Github(token); repo = g.get_repo(repo_name)
    print(f"🔍 Scanning open issues in {repo_name}...")
    for issue in repo.get_issues(state='open'):
        body = issue.body or ''; findings = []
        for old, new in RENAMED_ASSETS.items():
            if old in body: findings.append(f"References deprecated name `{old}`. Use `{new}` instead.")
        for old, new in DEPRECATED_PATHS.items():
            if old in body: findings.append(f"References deprecated path `{old}`. New location: `{new}`")
        for pattern, message in BANNED_PATTERNS:
            if re.search(pattern, body): findings.append(f"Contains banned pattern: {message}")
        if findings:
            comment = "## 🤖 Automated Issue Update\n\n" + "\n".join(f"- {f}" for f in findings) + "\n\n---\n*Generated by `td_cli update-issues`*"
            print(f"[{'DRY-RUN' if args.dry_run else 'EXECUTE'}] Found {len(findings)} issues in #{issue.number}")
            if not args.dry_run: issue.create_comment(comment); print(f"✅ Posted update comment to #{issue.number}")
            else: print(f"Preview for #{issue.number}:\n{comment}\n")

# --- CLI Handlers ---
def handle_validate_issue(args):
    from github import Github
    token = get_github_token()
    repo_name = get_repo_name()
    g = Github(token)
    repo = g.get_repo(repo_name)

    issues = []
    if args.all_open:
        issues = list(repo.get_issues(state='open'))
    elif args.issue_number:
        issues = [repo.get_issue(args.issue_number)]
    else:
        print("Error: Provide --issue-number or --all-open")
        sys.exit(1)

    total_findings = 0
    for issue in issues:
        findings, warnings = check_issue_quality(issue, repo)
        total_findings += len(findings)
        status = '✅' if not findings else '❌'
        print(f"{status} #{issue.number}: {issue.title[:60]}")
        for f in findings: print(f"   ❌ {f}")
        for w in warnings: print(f"   ⚠️  {w}")

        if args.post_comments and (findings or warnings):
            comment = "## 🤖 Issue Quality Review\n\n"
            if findings:
                comment += "### ❌ Violations\n" + "\n".join(f"- {f}" for f in findings) + "\n\n"
            if warnings:
                comment += "### ⚠️ Warnings\n" + "\n".join(f"- {w}" for w in warnings) + "\n"
            comment += "\n---\n*Generated by `td_cli validate-issue`*"
            if not args.dry_run:
                issue.create_comment(comment)
                print(f"✅ Posted comment to #{issue.number}")
            else:
                print(f"[DRY-RUN] Would post comment to #{issue.number}")

    if total_findings > 0: sys.exit(1)

def handle_conflicts(args):
    from github import Github
    token = get_github_token()
    repo_name = get_repo_name()
    g = Github(token)
    repo = g.get_repo(repo_name)
    conflicts = detect_conflicts(repo, args.pr)

    if not conflicts:
        print("✅ No potential merge conflicts detected.")
        return

    for pr_pair, files in conflicts.items():
        print(f"⚠️  {' ↔ '.join(f'#{p}' for p in pr_pair)} share {len(files)} file(s):")
        for f in sorted(files)[:10]: print(f"    - {f}")
        print()

def handle_status_board(args):
    from github import Github
    token = get_github_token()
    repo_name = get_repo_name()
    g = Github(token)
    repo = g.get_repo(repo_name)
    current_user_login = g.get_user().login
    open_prs = list(repo.get_pulls(state='open'))

    print("# Active Agent Work Board\n")
    print("| Branch | Issue | Status | CI | Conflicts |")
    print("|--------|-------|--------|----|-----------|")

    for pr in open_prs:
        issue_match = re.search(r'issue-(\d+)', pr.head.ref)
        issue = f"#{issue_match.group(1)}" if issue_match else "—"
        ci_summary, _ = get_ci_status(repo, pr.head.sha)
        ci_display = CIFormatter.format(ci_summary).split(' ')[0]
        print(f"| {pr.head.ref} | {issue} | {'Draft' if pr.draft else 'Open'} | {ci_display} | ... |")

def handle_ratchet_any(args):
    current = get_any_count()
    baseline = 0
    if os.path.exists(args.baseline_file):
        with open(args.baseline_file, 'r') as f:
            baseline = int(f.read().strip() or 0)

    print(f"TypeScript 'any' Ratchet: Current={current}, Baseline={baseline}")
    if current > baseline and baseline > 0:
        print(f"❌ Error: 'any' count increased from {baseline} to {current}.")
        sys.exit(1)

    if args.update:
        with open(args.baseline_file, 'w') as f:
            f.write(str(current))
        print(f"✅ Baseline updated to {current}")

def handle_bundle_size(args):
    size = get_bundle_size()
    baseline = 1000
    if os.path.exists(args.baseline_file):
        with open(args.baseline_file, 'r') as f:
            baseline = int(f.read().strip() or 1000)

    threshold = baseline + args.threshold
    print(f"Bundle Size Check: Current={size}KB, Baseline={baseline}KB, Threshold={threshold}KB")
    if size > threshold:
        print(f"❌ Error: Bundle size exceeds threshold ({size}KB > {threshold}KB).")
        sys.exit(1)

    if args.update:
        with open(args.baseline_file, 'w') as f:
            f.write(str(size))
        print(f"✅ Baseline updated to {size}KB")

def main():
    parser = argparse.ArgumentParser(description="Tech-Dancer Repository CLI")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    # validate-issue
    p_val = subparsers.add_parser("validate-issue")
    p_val.add_argument("--issue-number", type=int)
    p_val.add_argument("--all-open", action="store_true")
    p_val.add_argument("--post-comments", action="store_true")
    p_val.add_argument("--dry-run", action="store_true")
    p_val.set_defaults(func=handle_validate_issue)

    # conflicts
    p_conf = subparsers.add_parser("conflicts")
    p_conf.add_argument("--pr", type=int, help="Specific PR to check")
    p_conf.set_defaults(func=handle_conflicts)

    # status-board
    p_stat = subparsers.add_parser("status-board")
    p_stat.set_defaults(func=handle_status_board)

    # ratchet-any
    p_any = subparsers.add_parser("ratchet-any")
    p_any.add_argument("--baseline-file", default="any-count.txt")
    p_any.add_argument("--update", action="store_true")
    p_any.set_defaults(func=handle_ratchet_any)

    # bundle-size
    p_bundle = subparsers.add_parser("bundle-size")
    p_bundle.add_argument("--baseline-file", default=".bundle-baseline")
    p_bundle.add_argument("--threshold", type=int, default=50)
    p_bundle.add_argument("--update", action="store_true")
    p_bundle.set_defaults(func=handle_bundle_size)

    # migrate-tokens
    p_mig = subparsers.add_parser("migrate-tokens")
    p_mig.add_argument("--find")
    p_mig.add_argument("--migrate", nargs=2, metavar=('OLD', 'NEW'))
    p_mig.add_argument("--dry-run", action="store_true", default=True)
    p_mig.add_argument("--execute", action="store_false", dest="dry_run")
    p_mig.set_defaults(func=handle_migrate_tokens)

    # update-issues
    p_upd = subparsers.add_parser("update-issues")
    p_upd.add_argument("--dry-run", action="store_true", default=True)
    p_upd.add_argument("--execute", action="store_false", dest="dry_run")
    p_upd.set_defaults(func=handle_update_issues)

    args = parser.parse_args()
    if not args.command:
        parser.print_help()
        sys.exit(1)

    args.func(args)

if __name__ == "__main__":
    main()
