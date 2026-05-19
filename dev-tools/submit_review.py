import os
import json
import re
from utils import get_github_token, get_github_client, get_repo_name, CLIError

def submit_review(pr_number, filepath, cleanup=False, dry_run=True, event_override=None, is_json=False):
    """
    Submits a PR review from a markdown file containing a JSON payload.
    """
    if not os.path.exists(filepath):
        raise CLIError(f"Review file missing: {filepath}")

    with open(filepath, 'r') as f:
        content = f.read()

    json_match = re.search(r'```json\n(.*?)\n```', content, re.DOTALL)
    if not json_match:
        raise CLIError("Could not find JSON block in review document")

    try:
        payload = json.loads(json_match.group(1))
    except json.JSONDecodeError as e:
        raise CLIError(f"Failed to parse JSON block: {str(e)}")

    repo_name = get_repo_name()
    if not repo_name:
        raise CLIError("Could not detect repository name")

    repo = get_github_client().get_repo(repo_name)
    pr = repo.get_pull(int(pr_number))

    # CI Status Check Integration: Block approvals on failing CI
    from tdw_services.services.github import GitHubClient
    gh_client = GitHubClient()
    check_runs = gh_client.fetch_check_runs(pr.head.sha)
    failing_checks = [run.get('name') for run in check_runs if run.get('conclusion') == 'failure']

    event = event_override or ("REQUEST_CHANGES" if "Not Approved" in payload.get("body","") else "APPROVE" if "Approved" in payload.get("body","") else "COMMENT")

    if failing_checks and event == "APPROVE":
        event = "COMMENT"
        warning = f"> ⚠️ **BLOCKING CI FAILURE**: Approval overridden to COMMENT because the following checks are failing: {', '.join(failing_checks)}. Please resolve CI issues before approval.\n\n"
        payload["body"] = warning + payload.get("body", "")

    if not dry_run:
        pr.create_review(body=payload.get("body",""), comments=payload.get("comments",[]), event=event)
        if event == "REQUEST_CHANGES":
            labels = [l.name for l in pr.labels]
            if "needs-design-system-fix" not in labels and any(k in payload.get("body","").lower() for k in ['tailwind', 'token']):
                pr.add_to_labels("needs-design-system-fix")

        if not is_json:
            print(f"✅ Submitted {event} for PR #{pr_number}")

        if cleanup:
            if os.path.exists(filepath):
                os.remove(filepath)
            ctx = filepath.replace('pr-review-', 'pr-context-')
            if os.path.exists(ctx):
                os.remove(ctx)
    else:
        if not is_json:
            print(f"[DRY-RUN] Would submit {event} for PR #{pr_number}")

    return {"status": "success", "event": event, "pr": pr_number}
