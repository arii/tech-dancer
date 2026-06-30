import sys
import os

try:
    from dev_tools.cli import cli
    from dev_tools import utils
    from dev_tools.utils import get_github_token, get_repo_name, get_gha_variable, CLIError, get_github_client

    import dev_tools.orchestrator
    dev_tools.orchestrator.get_github_client = get_github_client
    dev_tools.orchestrator.get_repo_name = get_repo_name
    dev_tools.orchestrator.get_github_token = get_github_token
    dev_tools.orchestrator.get_gha_variable = get_gha_variable

    from dev_tools.orchestrator import Orchestrator
    _orch = Orchestrator()
    resolve_baseline = _orch.resolve_baseline

    def handle_fix_ci(args):
        if not get_github_token():
             raise CLIError("Missing GITHUB_TOKEN", code=401)
        if not getattr(args, 'api_key', None) and not os.environ.get("JULES_API_KEY"):
            raise CLIError("Missing JULES_API_KEY", code=401)
        if not get_repo_name():
             raise CLIError("Could not determine repository name", code=400)
        return _orch.fix_ci(
            pr_number=getattr(args, 'pr_number', None),
            branch=getattr(args, 'branch', None),
            api_key=getattr(args, 'api_key', None),
            dry_run=getattr(args, 'dry_run', True)
        )

    def handle_validate_issue(args):
        return _orch.validate_issue(
            issue_number=getattr(args, 'issue_number', None),
            all_open=getattr(args, 'all_open', False),
            post_comments=getattr(args, 'post_comments', False),
            dry_run=getattr(args, 'dry_run', True)
        )

    def resolve_baseline(file_path, env_var, fallback):
        val = get_gha_variable(env_var)
        if val: return int(val)
        return _orch.resolve_baseline(file_path, env_var, fallback)

    def handle_audit_pr(args):
        pr_num = getattr(args, 'pr_number', None)
        if pr_num in ["null", "", None]:
             raise CLIError("Invalid PR number")
        try:
            pr_num = int(pr_num)
        except (ValueError, TypeError):
             raise CLIError("Invalid PR number format")

        return _orch.audit_pr(
            pr_num,
            fetch=getattr(args, 'fetch', False),
            audit=getattr(args, 'audit', False),
            submit=getattr(args, 'submit', False),
            cleanup=getattr(args, 'cleanup', False),
            dry_run=getattr(args, 'dry_run', True),
            event=getattr(args, 'event', None)
        )
except ImportError as e:
    print(f"Error importing in td_cli shim: {e}", file=sys.stderr)
