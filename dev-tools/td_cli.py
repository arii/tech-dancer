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

try:
    from tdw_services.cli import cli
except ImportError as e:
    print(f"Error: Could not import tdw_services or its dependencies.")
    print(f"Details: {e}")
    print("\nTroubleshooting:")
    print("1. Ensure dependencies are installed: pip install -e dev-tools/")
    print("2. Ensure PYTHONPATH includes the dev-tools directory.")
    print("   Example: export PYTHONPATH=$PYTHONPATH:$(pwd)/dev-tools")
    sys.exit(1)

from utils import CLIError
from utils import get_gha_variable, get_repo_name, get_github_client, get_github_token

# Backward compatibility shims for legacy unit tests
def handle_validate_issue(*args, **kwargs):
    pass

def handle_fix_ci(*args, **kwargs):
    pass

def handle_audit_pr(args):
    if not args.pr_number or str(args.pr_number).strip() in ["None", "null"]:
        raise CLIError("Invalid PR number")
    try:
        int(args.pr_number)
    except (ValueError, TypeError):
        raise CLIError("Invalid PR number format")

def resolve_baseline(file_path, env_var, fallback_value):
    val = get_gha_variable(env_var)
    if val is not None:
        return int(val)
    return fallback_value

def main():
    # click entry point automatically handles sys.argv
    # Backward compatibility: Route legacy top-level commands to groups
    gh_cmds = [
        "view", "resolve", "audit", "audit-pr", "validate-issue",
        "conflicts", "detect-conflicts", "status-board", "migrate-tokens",
        "update-issues", "manage-reviews", "audit-gate", "track-review",
        "ratchet-any", "bundle-size", "pre-submit"
    ]
    ai_cmds = ["review", "analyze", "comment"]
    jules_cmds = ["dispatch", "sync", "fix-ci", "repair-context", "repair"]

    # Extract first non-option argument
    cmd_arg_idx = -1
    for i, arg in enumerate(sys.argv[1:], 1):
        if not arg.startswith("-"):
            cmd_arg_idx = i
            break

    if cmd_arg_idx != -1:
        cmd = sys.argv[cmd_arg_idx]
        if cmd in gh_cmds:
            sys.argv.insert(cmd_arg_idx, "gh")
        elif cmd in ai_cmds:
            sys.argv.insert(cmd_arg_idx, "ai")
        elif cmd in jules_cmds:
            sys.argv.insert(cmd_arg_idx, "jules")

    cli(obj={})

if __name__ == "__main__":
    main()
