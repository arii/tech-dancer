#!/usr/bin/env python3
"""
td_cli.py - Tech-Dancer Developer CLI Shim

This script is a thin wrapper around the unified tdw_services CLI.
It maintains backward compatibility for existing scripts and CI workflows.
"""

import sys
import os

# Add the dev-tools directory to sys.path so we can import tdw_services
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Exporting legacy functions for backwards compatibility of existing unit tests
try:
    from tdw_services.cli import cli
    from utils import get_github_client, get_github_token, get_repo_name, get_gha_variable, CLIError
    from tdw_services.orchestrator import Orchestrator

    # Compatibility shim for legacy handle functions
    def handle_validate_issue(args):
        # Patch tdw_services.orchestrator to use our patched utils functions
        import tdw_services.orchestrator
        import utils
        tdw_services.orchestrator.get_github_client = utils.get_github_client
        tdw_services.orchestrator.get_repo_name = utils.get_repo_name

        orch = Orchestrator()
        return orch.validate_issue(
            issue_number=args.issue_number,
            all_open=args.all_open,
            post_comments=args.post_comments,
            dry_run=args.dry_run
        )

    def handle_audit_pr(args):
        from utils import CLIError
        pr_num = args.pr_number
        if pr_num in [None, "null", "None", ""] or (isinstance(pr_num, str) and not pr_num.strip()):
            raise CLIError("Invalid PR number", code=400)
        try:
            int(pr_num)
        except (ValueError, TypeError):
            raise CLIError("Invalid PR number format", code=400)

        orch = Orchestrator()
        return orch.audit_pr(
            int(pr_num),
            fetch=getattr(args, 'fetch', False),
            audit=getattr(args, 'audit', False)
        )

    def resolve_baseline(env_val, gha_var, default):
        if env_val is not None:
            return int(env_val)
        gha_val = get_gha_variable(gha_var)
        if gha_val:
            return int(gha_val)
        return default

    def handle_fix_ci(args):
        from utils import CLIError
        token = get_github_token()
        if not token:
            raise CLIError("Missing GITHUB_TOKEN environment variable.", code=401)
        jules_key = os.environ.get("JULES_API_KEY") or getattr(args, 'api_key', None)
        if not jules_key:
            raise CLIError("Missing JULES_API_KEY environment variable.", code=401)
        repo_name = get_repo_name()
        if not repo_name:
            raise CLIError("Could not determine repository name.", code=400)

        orch = Orchestrator()
        return orch.fix_ci(
            pr_number=getattr(args, 'pr_number', None),
            branch=getattr(args, 'branch', None),
            api_key=jules_key,
            dry_run=getattr(args, 'dry_run', True)
        )

except ImportError as e:
    print(f"Error: Could not import tdw_services or its dependencies.")
    print(f"Details: {e}")
    print("\nTroubleshooting:")
    print("1. Ensure dependencies are installed: pip install -e dev-tools/")
    print("2. Ensure PYTHONPATH includes the dev-tools directory.")
    print("   Example: export PYTHONPATH=$PYTHONPATH:$(pwd)/dev-tools")
    sys.exit(1)

def main():
    # --- Backward Compatibility Logic ---
    # Intercept sys.argv to route legacy top-level commands to their new groups
    # e.g., 'python td_cli.py status-board' -> 'python td_cli.py gh status-board'

    COMMAND_GROUPS = {
        'view': 'gh', 'resolve': 'gh', 'audit': 'gh', 'audit-pr': 'gh', 'audit_pr': 'gh',
        'validate-issue': 'gh', 'validate_issue': 'gh', 'conflicts': 'gh',
        'detect-conflicts': 'gh', 'detect_conflicts': 'gh', 'status-board': 'gh', 'status_board': 'gh',
        'migrate-tokens': 'gh', 'migrate_tokens': 'gh', 'update-issues': 'gh', 'update_issues': 'gh',
        'manage-reviews': 'gh', 'manage_reviews': 'gh', 'audit-gate': 'gh', 'audit_gate': 'gh',
        'track-review': 'gh', 'track_review': 'gh', 'ratchet-any': 'gh', 'ratchet_any': 'gh',
        'bundle-size': 'gh', 'bundle_size': 'gh', 'pre-submit': 'gh', 'pre_submit': 'gh',
        'review': 'ai', 'analyze': 'ai', 'comment': 'ai',
        'dispatch': 'jules', 'sync': 'jules', 'fix-ci': 'jules', 'fix_ci': 'jules',
        'repair-context': 'jules', 'repair_context': 'jules', 'repair': 'jules'
    }

    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        # Only route if it's not a known group and is a known legacy command
        if cmd not in ['gh', 'ai', 'jules', '--help', '--json'] and cmd in COMMAND_GROUPS:
            group = COMMAND_GROUPS[cmd]
            # Handle --json flag which might appear before the command
            # but usually it's 'python td_cli.py --json status-board'
            # In that case sys.argv[1] is --json and sys.argv[2] is status-board
            sys.argv.insert(1, group)
        elif cmd == '--json' and len(sys.argv) > 2:
            subcmd = sys.argv[2]
            if subcmd not in ['gh', 'ai', 'jules', '--help'] and subcmd in COMMAND_GROUPS:
                group = COMMAND_GROUPS[subcmd]
                sys.argv.insert(2, group)

    # click entry point automatically handles sys.argv
    cli(obj={})

if __name__ == "__main__":
    main()
