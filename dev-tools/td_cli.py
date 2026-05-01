#!/usr/bin/env python3
"""
td_cli.py - Unified Tech-Dancer Developer CLI

Consolidates multiple fragmented scripts into a single entry point for repo automation.
Supports structured JSON output for tool integration.
"""

import argparse
import sys
import os
import subprocess
import json
from utils import get_repo_name, CLIError
from gh_client import get_github_token
from issue_manager import handle_validate_issue, handle_update_issues
from baseline_manager import handle_ratchet_any, handle_bundle_size
from pr_manager import handle_conflicts, handle_status_board, handle_audit_pr, handle_manage_reviews, detect_conflicts
from audit_logic import get_audit_baseline_count
from scope_check import verify_pr_scope

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
    from utils import extract_json
    current_count = 0
    try:
        proc = subprocess.run(["pnpm", "run", "audit", "--", "--json"], capture_output=True, text=True)
        if proc.stdout:
            audit_data = extract_json(proc.stdout)
            if audit_data:
                current_count = sum(len(violations) for violations in audit_data.values())
            elif proc.returncode == 0:
                current_count = 0
    except Exception as e:
        if not args.json: print(f"⚠️ Failed to get current audit count via JS script: {e}")

    baseline_count = get_audit_baseline_count()

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

def handle_migrate_tokens(args):
    # Keeping migrate-tokens here for now as it is a specialized utility
    from repo_utils import walk_tsx, find_patterns_in_file
    import re
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
