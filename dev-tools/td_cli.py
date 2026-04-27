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
import json
from datetime import datetime, timezone, timedelta
from github_utils import get_github_token, get_repo_name
from repo_utils import walk_tsx, find_patterns_in_file, get_bundle_size, get_any_count
from collections import defaultdict

# --- Configuration & Constants ---
EXISTING_COMPONENTS = {
    'Box': 'src/layouts/Box.tsx', 'Stack': 'src/layouts/Stack.tsx', 'Grid': 'src/layouts/Grid.tsx',
    'Text': 'src/layouts/Text.tsx', 'Button': 'src/layouts/Button.tsx', 'ContentCard': 'src/components/ui/ContentCard.tsx',
    'PageHeader': 'src/components/ui/PageHeader.tsx', 'FilterBar': 'src/components/ui/FilterBar.tsx',
    'FolioGrid': 'src/components/ui/FolioGrid.tsx', 'Skeleton': 'src/components/ui/Skeleton.tsx',
    'ViewToggle': 'src/components/ui/ViewToggle.tsx', 'ListRow': 'src/components/ui/ListRow.tsx',
    'MarkdownRenderer': 'src/components/ui/MarkdownRenderer.tsx', 'DetailLayout': 'src/components/layout/DetailLayout.tsx',
    'useSearchParam': 'src/hooks/useSearchParam.ts', 'useHotkeys': 'src/hooks/useHotkeys.ts', 'safeSearch': 'src/lib/utils.ts',
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
    token = get_github_token(); repo = Github(token).get_repo(get_repo_name())

    issues = []
    if args.all_open: issues = list(repo.get_issues(state='open'))
    elif args.issue_number: issues = [repo.get_issue(args.issue_number)]
    else: print("Error: Provide --issue-number or --all-open"); sys.exit(1)

    total_findings = 0
    for issue in issues:
        findings, warnings = [], []; body = issue.body or ''; title = issue.title or ''
        for i, block in enumerate(re.findall(r'```(?:tsx?|jsx?|html)?\n(.*?)```', body, re.DOTALL)):
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

        total_findings += len(findings)
        print(f"{'✅' if not findings else '❌'} #{issue.number}: {issue.title[:60]}")
        for f in findings: print(f"   ❌ {f}")
        for w in warnings: print(f"   ⚠️  {w}")
        if args.post_comments and (findings or warnings):
            comment = "## 🤖 Issue Quality Review\n\n"
            if findings: comment += "### ❌ Violations\n" + "\n".join(f"- {f}" for f in findings) + "\n\n"
            if warnings: comment += "### ⚠️ Warnings\n" + "\n".join(f"- {w}" for w in warnings) + "\n"
            if not args.dry_run: issue.create_comment(comment + "\n---\n*Generated by `td_cli validate-issue`*")
    if total_findings > 0: sys.exit(1)

def handle_conflicts(args):
    from github import Github
    repo = Github(get_github_token()).get_repo(get_repo_name())
    conflicts = detect_conflicts(repo, args.pr)
    if not conflicts: print("✅ No potential merge conflicts detected."); return
    for pr_pair, files in conflicts.items():
        print(f"⚠️  {' ↔ '.join(f'#{p}' for p in pr_pair)} share {len(files)} file(s):")
        for f in sorted(files)[:10]: print(f"    - {f}")

def handle_status_board(args):
    from github import Github
    repo = Github(get_github_token()).get_repo(get_repo_name())
    print("# Active Agent Work Board\n| Branch | Issue | Status | Conflicts |\n|--------|-------|--------|-----------|")
    for pr in repo.get_pulls(state='open'):
        m = re.search(r'issue-(\d+)', pr.head.ref); issue = f"#{m.group(1)}" if m else "—"
        print(f"| {pr.head.ref} | {issue} | {'Draft' if pr.draft else 'Open'} | ... |")

def handle_ratchet_any(args):
    current = get_any_count(); baseline = 0
    if os.path.exists(args.baseline_file): baseline = int(open(args.baseline_file).read().strip() or 0)
    print(f"TypeScript 'any' Ratchet: Current={current}, Baseline={baseline}")
    if current > baseline: print(f"❌ Error: 'any' count increased."); sys.exit(1)
    if args.update: open(args.baseline_file, 'w').write(str(current))

def handle_bundle_size(args):
    size = get_bundle_size(); baseline = int(open(args.baseline_file).read().strip() or 1000) if os.path.exists(args.baseline_file) else 1000
    print(f"Bundle Size Check: Current={size}KB, Baseline={baseline}KB")
    if size > baseline + args.threshold: print(f"❌ Error: Bundle size exceeds threshold."); sys.exit(1)
    if args.update: open(args.baseline_file, 'w').write(str(size))

def handle_migrate_tokens(args):
    root_dir = 'src'
    if args.find:
        print(f"🔍 Searching for token: {args.find}")
        for filepath in walk_tsx(root_dir):
            findings = find_patterns_in_file(filepath, [(re.escape(args.find), "Found")])
            for ln, _, content in findings: print(f"  {filepath}:{ln}: {content.strip()}")
    elif args.migrate:
        old, new = args.migrate
        print(f"{'[DRY-RUN] Would replace' if args.dry_run else '[EXECUTE] Replacing'} `{old}` with `{new}`")
        for filepath in walk_tsx(root_dir):
            with open(filepath, 'r') as f: c = f.read()
            if old in c:
                if not args.dry_run:
                    with open(filepath, 'w') as f: f.write(c.replace(old, new))
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

def handle_audit_pr(args):
    pr_num = args.pr_number; review_dir = os.path.join(os.getcwd(), "dev-tools", "logs", "reviews")
    ctx_path = os.path.join(review_dir, f"pr-context-{pr_num}.md"); rev_path = os.path.join(review_dir, f"pr-review-{pr_num}.md")
    if args.fetch:
        token = get_github_token(); from github import Github; repo = Github(token).get_repo(get_repo_name()); pr = repo.get_pull(int(pr_num))
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
        # Template generation
        template_path = os.path.join(os.path.dirname(__file__), "review_template.md")
        if os.path.exists(template_path): template = open(template_path).read().format(pr_num=pr_num, head_sha=pr.head.sha)
        else: template = f"# PR Review: #{pr_num}\n- SHA: {pr.head.sha}\n"
        with open(rev_path, "w") as f: f.write(template)
        print(f"✅ Generated review files for PR #{pr_num}")

    if args.audit:
        with open(ctx_path) as f: context = f.read()
        changed_files = re.findall(r'### `([^`]+)`', context); auto_findings = []
        for fp in changed_files:
            if fp.endswith('.tsx') and os.path.exists(fp):
                content = open(fp).read()
                if "import React from 'react'" in content: auto_findings.append({"path": fp, "issue": "Unnecessary `import React`", "severity": "minor"})
                if 'HashRouter' in content: auto_findings.append({"path": fp, "issue": "HashRouter usage banned", "severity": "major"})
                for m in re.finditer(r'text-\[\d+px\]|bg-\[#[0-9a-fA-F]+\]', content): auto_findings.append({"path": fp, "issue": f"Arbitrary Tailwind: `{m.group()}`", "severity": "minor"})
        if auto_findings:
            print(f"📋 Found {len(auto_findings)} violations:")
            for f in auto_findings: print(f"  [{f['severity'].upper()}] {f['path']}: {f['issue']}")
        subprocess.call(["copilot", "-p", f"Auditing PR #{pr_num}...", "--allow-tool", "read", "--allow-tool", "write", "--allow-tool", "file_edit"])

    if args.submit:
        handle_submit_review_logic(rev_path, args.cleanup, args.dry_run, args.event)

def handle_submit_review_logic(filepath, cleanup, dry_run, event_override):
    from github import Github
    with open(filepath) as f: content = f.read()
    pr_num = re.search(r'pr-review-(\d+)\.md', filepath).group(1)
    json_block = re.search(r'```json\n(.*?)\n```', content, re.DOTALL).group(1)
    payload = json.loads(json_block)

    token = get_github_token(); repo = Github(token).get_repo(get_repo_name()); pr = repo.get_pull(int(pr_num))
    event = event_override or ("REQUEST_CHANGES" if "Not Approved" in payload.get("body","") else "APPROVE" if "Approved" in payload.get("body","") else "COMMENT")

    if not dry_run:
        pr.create_review(body=payload.get("body",""), comments=payload.get("comments",[]), event=event)
        if event == "REQUEST_CHANGES":
            labels = [l.name for l in pr.labels]
            if "needs-design-system-fix" not in labels and any(k in payload.get("body","").lower() for k in ['tailwind', 'token']): pr.add_to_labels("needs-design-system-fix")
        print(f"✅ Submitted {event} for PR #{pr_num}")
        if cleanup: os.remove(filepath); os.remove(filepath.replace('pr-review-','pr-context-'))
    else: print(f"[DRY-RUN] Would submit {event} for PR #{pr_num}")

def handle_pre_submit(args):
    print("🔍 Running pre-submission checks...")
    try:
        subprocess.run(["pnpm", "run", "audit"], check=False)
        subprocess.run(["pnpm", "run", "type-check"], check=True)
        subprocess.run(["pnpm", "run", "lint"], check=True)
        for fp in walk_tsx():
            for ln, _, _ in find_patterns_in_file(fp, [(r"^import React from 'react'", "Unnecessary import")]): print(f"  ⚠️ {fp}:{ln}: Found unnecessary 'import React'")
        for fp in walk_tsx():
            if 'HashRouter' in open(fp).read(): print(f"❌ HashRouter usage found in {fp}."); sys.exit(1)
        if get_github_token():
            from github import Github
            conflicts = detect_conflicts(Github(get_github_token()).get_repo(get_repo_name()))
            if conflicts:
                for pr_pair, files in conflicts.items(): print(f"⚠️  {' ↔ '.join(f'#{p}' for p in pr_pair)} share {len(files)} file(s)")
            else: print("✅ No conflicts detected.")
        print("✅ Pre-submission checks passed.")
    except Exception as e: print(f"❌ Pre-submission checks failed: {e}"); sys.exit(1)

def handle_manage_reviews(args):
    from github import Github
    token = get_github_token(); g = Github(token); repo = g.get_repo(get_repo_name()); login = g.get_user().login
    for pr in repo.get_pulls(state='open', sort='updated', direction='desc'):
        last_review = next((r for r in pr.get_reviews().reversed if r.user.login == login), None)
        status = "ACTION: Needs Review" if not last_review else f"ACTION: Needs Re-Review" if last_review.commit_id != pr.head.sha else "STATE: Up-To-Date"
        print(f"[PR #{pr.number}] {pr.title}\n  ├── {status}")
        if args.check_responses:
            unaddressed = []; revs = list(pr.get_reviews()); our_revs = [r for r in revs if r.user.login == login]
            if our_revs:
                last_time = max(r.submitted_at for r in our_revs); our_coms = [c for c in pr.get_review_comments() if c.user.login == login]
                after_coms = [c for c in pr.get_review_comments() if c.user.login != login and any(c.in_reply_to_id == oc.id for oc in our_coms)]
                commits_after = [c for c in pr.get_commits() if c.commit.author.date > last_time]
                for oc in our_coms:
                    if not any(ac.in_reply_to_id == oc.id for ac in after_coms) and not commits_after: unaddressed.append(f"{oc.path}:{oc.position}")
                if unaddressed: print(f"  └── ⚠️ UNADDRESSED ({len(unaddressed)})")
        if args.cleanup_comments:
            for c in pr.get_issue_comments():
                if c.user.login == login and "<!-- td-review-manager-comment -->" in c.body:
                    if not args.dry_run: c.delete(); print(f"  Deleted tool comment {c.id}")
                    else: print(f"  [DRY-RUN] Would delete tool comment {c.id}")

def main():
    parser = argparse.ArgumentParser(description="Tech-Dancer Repository CLI")
    subparsers = parser.add_subparsers(dest="command", help="Command to run")

    for cmd, func in [("validate-issue", handle_validate_issue), ("conflicts", handle_conflicts), ("status-board", handle_status_board),
                      ("ratchet-any", handle_ratchet_any), ("bundle-size", handle_bundle_size), ("migrate-tokens", handle_migrate_tokens),
                      ("update-issues", handle_update_issues), ("audit-pr", handle_audit_pr), ("pre-submit", handle_pre_submit),
                      ("manage-reviews", handle_manage_reviews)]:
        p = subparsers.add_parser(cmd)
        if cmd == "validate-issue": p.add_argument("--issue-number", type=int); p.add_argument("--all-open", action="store_true"); p.add_argument("--post-comments", action="store_true"); p.add_argument("--dry-run", action="store_true")
        elif cmd == "conflicts": p.add_argument("--pr", type=int)
        elif cmd == "ratchet-any": p.add_argument("--baseline-file", default="any-count.txt"); p.add_argument("--update", action="store_true")
        elif cmd == "bundle-size": p.add_argument("--baseline-file", default=".bundle-baseline"); p.add_argument("--threshold", type=int, default=50); p.add_argument("--update", action="store_true")
        elif cmd == "migrate-tokens": p.add_argument("--find"); p.add_argument("--migrate", nargs=2, metavar=('OLD', 'NEW')); p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "update-issues": p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
        elif cmd == "audit-pr": p.add_argument("pr_number"); p.add_argument("--fetch", action="store_true"); p.add_argument("--audit", action="store_true"); p.add_argument("--submit", action="store_true"); p.add_argument("--cleanup", action="store_true"); p.add_argument("--dry-run", action="store_true"); p.add_argument("--event"); p.add_argument("--base")
        elif cmd == "manage-reviews": p.add_argument("--check-responses", action="store_true"); p.add_argument("--cleanup-comments", action="store_true"); p.add_argument("--dry-run", action="store_true", default=True); p.add_argument("--execute", action="store_false", dest="dry_run")
        p.set_defaults(func=func)

    args = parser.parse_args()
    if not args.command: parser.print_help(); sys.exit(1)
    args.func(args)

if __name__ == "__main__":
    main()
