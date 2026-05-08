import sys
import os
import json
from datetime import datetime, timezone
import click
from tdw_services.orchestrator import Orchestrator

# Import legacy utils for backwards compatibility during migration
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from repo_utils import walk_tsx, find_patterns_in_file, get_bundle_size, get_any_count
from scope_check import verify_pr_scope
from utils import get_github_client, get_repo_name, CLIError, run_command, set_gha_variable, get_gha_variable

# Fallback to td_cli handlers for unimplemented logic, preserving behavior
try:
    import td_cli
except ImportError:
    pass

# CLI Group
@click.group()
@click.option('--json', 'json_output', is_flag=True, help='Output results in JSON format')
@click.pass_context
def cli(ctx, json_output):
    """Unified Tech-Dancer DevTools CLI"""
    ctx.ensure_object(dict)
    ctx.obj['JSON'] = json_output
    ctx.obj['ORCHESTRATOR'] = Orchestrator()

# --- Utility Helpers ---
def out(ctx, msg, data=None):
    if ctx.obj['JSON']:
        payload = {"status": "success"}
        if data: payload.update(data)
        click.echo(json.dumps(payload, indent=2))
    else:
        click.echo(msg)

def err(ctx, msg, code=1, data=None):
    if ctx.obj['JSON']:
        payload = {"status": "error", "message": msg, "code": code}
        if data: payload.update({"data": data})
        click.echo(json.dumps(payload, indent=2))
    else:
        click.echo(f"❌ Error: {msg}", err=True)
    sys.exit(code)

class DummyArgs:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

# ==========================================
# GH COMMAND GROUP
# ==========================================
@cli.group()
def gh():
    """GitHub Operations"""
    pass

@gh.command()
@click.argument('pr_number', type=int)
@click.pass_context
def view(ctx, pr_number):
    orch = ctx.obj['ORCHESTRATOR']
    pr = orch.github.fetch_pr_details(pr_number)
    out(ctx, f"PR #{pr.get('number')}: {pr.get('title')}\nState: {pr.get('state')}", data={"pr": pr})

@gh.command()
@click.argument('file', required=False)
@click.option('--base')
@click.pass_context
def resolve(ctx, file, base):
    if file:
        orch = ctx.obj['ORCHESTRATOR']
        success = orch.resolve_conflict(file)
        if success:
            out(ctx, f"✅ Resolved conflicts in {file}", data={"resolved_file": file})
        else:
            err(ctx, f"Failed to resolve conflicts in {file}")
    else:
        args = DummyArgs(base=base, json=ctx.obj['JSON'])
        td_cli.handle_resolve_conflicts(args)

@gh.command()
@click.pass_context
def audit(ctx):
    out(ctx, "Headless audit functionality to be implemented.")

# --- Migrated Legacy GH Commands ---
@gh.command()
@click.argument('pr_number', type=int)
@click.option('--fetch', is_flag=True)
@click.option('--audit', 'run_audit', is_flag=True)
@click.option('--submit', is_flag=True)
@click.option('--cleanup', is_flag=True)
@click.option('--dry-run/--execute', default=True)
@click.option('--base')
@click.option('--event')
@click.pass_context
def audit_pr(ctx, pr_number, fetch, run_audit, submit, cleanup, dry_run, base, event):
    orch = ctx.obj['ORCHESTRATOR']
    if fetch:
        pr = orch.github.fetch_pr_details(pr_number)
        diff = orch.github.fetch_pr_diff(pr_number)
        context_file = f"pr-context-{pr_number}.md"
        with open(context_file, "w") as f:
            f.write(f"# PR #{pr_number}: {pr.get('title')}\n\n## Description\n{pr.get('body')}\n\n## Diff\n```diff\n{diff}\n```\n")
        out(ctx, f"✅ Context generated for PR #{pr_number}", data={"context_file": context_file})
    elif run_audit:
        context_file = f"pr-context-{pr_number}.md"
        if not os.path.exists(context_file):
            err(ctx, f"Context file missing. Run with --fetch first.", code=1)
        with open(context_file, "r") as f: diff = f.read()
        res = orch.review_pr(pr_number)
        out(ctx, f"✅ Generated AI review for PR #{pr_number}", data=res)
    elif submit:
        # Simplistic stub for submit (would use GitHubClient.create_review)
        out(ctx, f"Would submit review for PR #{pr_number}")
    else:
        out(ctx, "No action specified. Use --fetch, --audit, or --submit")

@gh.command()
@click.option('--issue-number', type=int)
@click.option('--all-open', is_flag=True)
@click.option('--post-comments', is_flag=True)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def validate_issue(ctx, issue_number, all_open, post_comments, dry_run):
    args = DummyArgs(issue_number=issue_number, all_open=all_open, post_comments=post_comments, dry_run=dry_run, json=ctx.obj['JSON'])
    td_cli.handle_validate_issue(args)

@gh.command()
@click.option('--base')
@click.pass_context
def conflicts(ctx, base):
    args = DummyArgs(base=base, json=ctx.obj['JSON'])
    td_cli.handle_conflicts(args)

@gh.command()
@click.option('--pr', type=int)
@click.pass_context
def detect_conflicts(ctx, pr):
    args = DummyArgs(pr=pr, json=ctx.obj['JSON'])
    td_cli.handle_detect_conflicts(args)

@gh.command()
@click.pass_context
def status_board(ctx):
    args = DummyArgs(json=ctx.obj['JSON'])
    td_cli.handle_status_board(args)

@gh.command()
@click.option('--find')
@click.option('--migrate', nargs=2, type=str)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def migrate_tokens(ctx, find, migrate, dry_run):
    args = DummyArgs(find=find, migrate=migrate, dry_run=dry_run, json=ctx.obj['JSON'])
    td_cli.handle_migrate_tokens(args)

@gh.command()
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def update_issues(ctx, dry_run):
    args = DummyArgs(dry_run=dry_run, json=ctx.obj['JSON'])
    td_cli.handle_update_issues(args)

@gh.command()
@click.option('--check-responses', is_flag=True)
@click.option('--cleanup-comments', is_flag=True)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def manage_reviews(ctx, check_responses, cleanup_comments, dry_run):
    args = DummyArgs(check_responses=check_responses, cleanup_comments=cleanup_comments, dry_run=dry_run, json=ctx.obj['JSON'])
    td_cli.handle_manage_reviews(args)

@gh.command()
@click.pass_context
def audit_gate(ctx):
    args = DummyArgs(json=ctx.obj['JSON'])
    td_cli.handle_audit_gate(args)

@gh.command()
@click.option('--pr', required=True)
@click.option('--status', required=True)
@click.option('--auditor', required=True)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def track_review(ctx, pr, status, auditor, dry_run):
    args = DummyArgs(pr=pr, status=status, auditor=auditor, dry_run=dry_run, json=ctx.obj['JSON'])
    td_cli.handle_track_review(args)

@gh.command()
@click.option('--baseline-file')
@click.option('--update', is_flag=True)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def ratchet_any(ctx, baseline_file, update, dry_run):
    args = DummyArgs(baseline_file=baseline_file, update=update, dry_run=dry_run, json=ctx.obj['JSON'])
    td_cli.handle_ratchet_any(args)

@gh.command()
@click.option('--baseline-file')
@click.option('--threshold', type=int, default=50)
@click.option('--update', is_flag=True)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def bundle_size(ctx, baseline_file, threshold, update, dry_run):
    args = DummyArgs(baseline_file=baseline_file, threshold=threshold, update=update, dry_run=dry_run, json=ctx.obj['JSON'])
    td_cli.handle_bundle_size(args)

@gh.command()
@click.pass_context
def pre_submit(ctx):
    args = DummyArgs(json=ctx.obj['JSON'])
    td_cli.handle_pre_submit(args)

# ==========================================
# AI COMMAND GROUP
# ==========================================
@cli.group()
def ai():
    """AI Operations"""
    pass

@ai.command()
@click.argument('pr_number', type=int)
@click.pass_context
def review(ctx, pr_number):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.review_pr(pr_number)

    # Format with review_template.md if it exists
    template_path = "dev-tools/review_template.md"
    if os.path.exists(template_path):
        with open(template_path, 'r') as f:
            template = f.read()
            # Simplistic templating replacement
            review_text = template.replace("{{REVIEW_COMMENT}}", res.get("reviewComment", ""))
            res["formatted_review"] = review_text

    out(ctx, f"✅ Generated review for PR #{pr_number}", data=res)

@ai.command()
@click.argument('file')
@click.pass_context
def analyze(ctx, file):
    out(ctx, "AI analyze functionality to be implemented.")

# ==========================================
# JULES COMMAND GROUP
# ==========================================
@cli.group()
def jules():
    """Agent Operations"""
    pass

@jules.command()
@click.argument('branch')
@click.argument('task')
@click.pass_context
def dispatch(ctx, branch, task):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.dispatch_jules_review(branch, task)
    out(ctx, f"✅ Dispatched task on branch {branch}", data=res)

@jules.command()
@click.pass_context
def sync(ctx):
    out(ctx, "Jules sync functionality to be implemented.")

@jules.command()
@click.option('--pr-number')
@click.option('--branch')
@click.option('--api-key')
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def fix_ci(ctx, pr_number, branch, api_key, dry_run):
    args = DummyArgs(pr_number=pr_number, branch=branch, api_key=api_key, dry_run=dry_run, json=ctx.obj['JSON'])
    td_cli.handle_fix_ci(args)

@jules.command()
@click.option('--log')
@click.option('--file')
@click.pass_context
def repair_context(ctx, log, file):
    args = DummyArgs(log=log, file=file, json=ctx.obj['JSON'])
    td_cli.handle_repair_context(args)

@jules.command()
@click.option('--logs')
@click.option('--stdin', is_flag=True)
@click.option('--worktree', is_flag=True)
@click.pass_context
def repair(ctx, logs, stdin, worktree):
    args = DummyArgs(logs=logs, stdin=stdin, worktree=worktree, json=ctx.obj['JSON'])
    td_cli.handle_repair(args)

if __name__ == "__main__":
    cli(obj={})
