import sys
import os
import json
from datetime import datetime, timezone
import click
from tdw_services.orchestrator import Orchestrator

# Import legacy utils for backwards compatibility during migration
from repo_utils import walk_tsx, find_patterns_in_file, get_bundle_size, get_any_count
from scope_check import verify_pr_scope
from utils import get_github_client, get_repo_name, CLIError, run_command, set_gha_variable, get_gha_variable

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
    orch = ctx.obj['ORCHESTRATOR']
    if file:
        if orch.resolve_conflict(file):
            out(ctx, f"✅ Resolved conflicts in {file}", data={"resolved_file": file})
        else:
            err(ctx, f"Failed to resolve conflicts in {file}")
    else:
        resolved = orch.resolve_conflicts_headless()
        out(ctx, f"✅ Resolved {len(resolved)} files.", data={"resolved": resolved})

@gh.command()
@click.pass_context
def audit(ctx):
    out(ctx, "Headless audit functionality to be implemented.")

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
    try:
        res = orch.audit_pr(pr_number, fetch=fetch, audit=run_audit, submit=submit, cleanup=cleanup, dry_run=dry_run, event=event)
        out(ctx, f"✅ Audit PR #{pr_number} action complete.", data=res)
    except CLIError as e:
        err(ctx, str(e), code=e.code)

@gh.command()
@click.option('--issue-number', type=int)
@click.option('--all-open', is_flag=True)
@click.option('--post-comments', is_flag=True)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def validate_issue(ctx, issue_number, all_open, post_comments, dry_run):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.validate_issue(issue_number=issue_number, all_open=all_open, post_comments=post_comments, dry_run=dry_run)
    if not ctx.obj['JSON']:
        for issue in res['issues']:
            click.echo(f"{'✅' if not issue['findings'] else '❌'} #{issue['number']}: {issue['title'][:60]}")
            for f in issue['findings']: click.echo(f"   ❌ {f}")
            for w in issue['warnings']: click.echo(f"   ⚠️  {w}")
    if res['status'] == 'error':
        err(ctx, f"Found {res['total_findings']} blocking findings.", data=res)
    else:
        out(ctx, "✅ Issue validation complete.", data=res)

@gh.command()
@click.option('--base')
@click.pass_context
def conflicts(ctx, base):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.handle_conflicts(base_branch=base or 'main')
    if res['status'] == 'success':
        out(ctx, res['message'], data=res)
    else:
        err(ctx, res['message'], data=res)

@gh.command()
@click.option('--pr', type=int)
@click.pass_context
def detect_conflicts(ctx, pr):
    orch = ctx.obj['ORCHESTRATOR']
    conflicts = orch.handle_detect_conflicts(pr_num=pr)
    if not ctx.obj['JSON']:
        if not conflicts: click.echo("✅ No potential merge conflicts detected.")
        for c in conflicts:
            click.echo(f"⚠️  {' ↔ '.join(f'#{p}' for p in c['prs'])} share {len(c['files'])} file(s):")
            for f in sorted(c['files'])[:10]: click.echo(f"    - {f}")
    out(ctx, f"Found {len(conflicts)} potential conflicts.", data={"conflicts": conflicts})

@gh.command()
@click.pass_context
def status_board(ctx):
    orch = ctx.obj['ORCHESTRATOR']
    prs = orch.handle_status_board()
    if not ctx.obj['JSON']:
        click.echo("# Active Agent Work Board\n| Branch | Issue | Status |")
        for pr in prs:
            click.echo(f"| {pr['branch']} | {pr['issue']} | {pr['status']} |")
    out(ctx, f"Found {len(prs)} open PRs.", data={"work": prs})

@gh.command()
@click.option('--find')
@click.option('--migrate', nargs=2, type=str)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def migrate_tokens(ctx, find, migrate, dry_run):
    orch = ctx.obj['ORCHESTRATOR']
    matches = orch.migrate_tokens(find=find, migrate=migrate, dry_run=dry_run)
    out(ctx, f"Found {len(matches)} matches.", data={"matches": matches})

@gh.command()
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def update_issues(ctx, dry_run):
    orch = ctx.obj['ORCHESTRATOR']
    updates = orch.update_issues(dry_run=dry_run)
    out(ctx, f"Found {len(updates)} updates.", data={"updates": updates})

@gh.command()
@click.option('--check-responses', is_flag=True)
@click.option('--cleanup-comments', is_flag=True)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def manage_reviews(ctx, check_responses, cleanup_comments, dry_run):
    orch = ctx.obj['ORCHESTRATOR']
    prs = orch.manage_reviews(check_responses=check_responses, cleanup_comments=cleanup_comments, dry_run=dry_run)
    out(ctx, f"Checked {len(prs)} PRs.", data={"prs": prs})

@gh.command()
@click.pass_context
def audit_gate(ctx):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.handle_audit_gate()
    msg = f"UI Anti-Pattern Audit: Current={res['current']}, Baseline={res['baseline']}"
    if res['status'] == 'error':
        err(ctx, msg, data=res)
    else:
        out(ctx, msg, data=res)

@gh.command()
@click.option('--pr', required=True, type=int)
@click.option('--status', required=True)
@click.option('--auditor', required=True)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def track_review(ctx, pr, status, auditor, dry_run):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.track_review(pr, status, auditor, dry_run=dry_run)
    out(ctx, f"✅ Updated tracking for PR #{pr}", data=res)

@gh.command()
@click.option('--baseline-file')
@click.option('--update', is_flag=True)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def ratchet_any(ctx, baseline_file, update, dry_run):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.ratchet_any(update=update, baseline_file=baseline_file, dry_run=dry_run)
    msg = f"TypeScript 'any' Ratchet: Current={res['current']}, Baseline={res['baseline']}"
    if res['status'] == 'error':
        err(ctx, msg, data=res)
    else:
        out(ctx, msg, data=res)

@gh.command()
@click.option('--baseline-file')
@click.option('--threshold', type=int, default=50)
@click.option('--update', is_flag=True)
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def bundle_size(ctx, baseline_file, threshold, update, dry_run):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.check_bundle_size(update=update, baseline_file=baseline_file, threshold=threshold, dry_run=dry_run)
    msg = f"Bundle Size Check: Current={res['size_kb']}KB, Baseline={res['baseline_kb']}KB"
    if res['status'] == 'error':
        err(ctx, msg, data=res)
    else:
        out(ctx, msg, data=res)

@gh.command()
@click.pass_context
def pre_submit(ctx):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.pre_submit_checks()
    out(ctx, "Pre-submit checks complete.", data={"results": res})

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
    out(ctx, f"✅ Generated review for PR #{pr_number}", data=res)

@ai.command()
@click.argument('file')
@click.pass_context
def analyze(ctx, file):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.resolve_conflict(file) # Placeholder for analyze
    out(ctx, f"✅ Analyzed {file}", data={"result": res})

@ai.command()
@click.option('--pr', required=True, type=int)
@click.option('--command', required=True)
@click.option('--comment-id')
@click.pass_context
def comment(ctx, pr, command, comment_id):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.handle_comment_command(pr, command, comment_id)
    if res.get('status') == 'error':
        err(ctx, res.get('message'), data=res)
    else:
        out(ctx, res.get('message'), data=res)

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
@click.option('--pr-number', type=int)
@click.option('--branch')
@click.option('--api-key')
@click.option('--dry-run/--execute', default=True)
@click.pass_context
def fix_ci(ctx, pr_number, branch, api_key, dry_run):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.fix_ci(pr_number=pr_number, branch=branch, api_key=api_key, dry_run=dry_run)
    out(ctx, f"🚀 Initialized Jules session for branch `{res['branch']}`", data=res)

@jules.command()
@click.option('--log')
@click.option('--file')
@click.pass_context
def repair_context(ctx, log, file):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.repair_context(log=log, log_file=file)
    out(ctx, f"Generated {len(res)} prompts.", data={"prompts": res})

@jules.command()
@click.option('--logs')
@click.option('--stdin', is_flag=True)
@click.option('--worktree', is_flag=True)
@click.pass_context
def repair(ctx, logs, stdin, worktree):
    orch = ctx.obj['ORCHESTRATOR']
    res = orch.repair_local(logs_path=logs, stdin=stdin, worktree=worktree)
    if res['status'] == 'success':
        out(ctx, res['message'], data=res)
    else:
        err(ctx, res['message'], data=res)

if __name__ == "__main__":
    cli(obj={})
