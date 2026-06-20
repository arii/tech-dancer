import os
import json
import re
from utils import get_github_token, get_github_client, get_repo_name, CLIError

def validate_review_payload(payload):
    """
    Validates that the review payload is not just boilerplate or empty.
    """
    body = payload.get("body", "")
    comments = payload.get("comments", [])

    placeholders = [
        "<findings>",
        "<summary>",
        "<filename>",
        "<feedback>",
        "<Approved | Approved with Minor Changes | Not Approved>"
    ]

    # Check for real comments (not placeholders)
    real_comments = [
        c for c in comments
        if c.get("body") and c.get("body").strip() != "<feedback>" and c.get("path") != "<filename>"
    ]

    # Check for placeholder markers anywhere in the payload
    found_placeholders = [p for p in placeholders if p in body or any(p in str(c) for c in comments)]

    if found_placeholders:
        raise CLIError(f"Review rejected: Contains boilerplate placeholders: {', '.join(found_placeholders)}")

    # Check for empty/meaningless body
    # Remove markdown headers and comments to see if anything else remains
    clean_body = body
    clean_body = re.sub(r'^#+.*', '', clean_body, flags=re.MULTILINE)
    clean_body = re.sub(r'<!--.*?-->', '', clean_body, flags=re.DOTALL)
    clean_body = clean_body.strip()

    if not clean_body and not real_comments:
        raise CLIError("Review rejected: No meaningful content found in body or comments.")

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

    # Validate payload before proceeding
    validate_review_payload(payload)

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
        import github
        def try_create_review(review_body, review_comments, review_event):
            try:
                pr.create_review(body=review_body, comments=review_comments, event=review_event)
            except github.GithubException as e:
                if e.status == 422:
                    error_msg = json.dumps(e.data) if getattr(e, 'data', None) else str(e)
                    if "Can not approve your own pull request" in error_msg and review_event != "COMMENT":
                        print("⚠️  Cannot approve own PR. Retrying as COMMENT...")
                        try_create_review(review_body, review_comments, "COMMENT")
                        return
                    if review_comments:
                        print("⚠️  Failed to post inline comments due to line resolution error. Retrying with body comments...")
                        fallback_body = review_body
                        fallback_body += "\n\n### Inline Comments (Fallback due to Github line resolution errors)\n"
                        for comment in review_comments:
                            fallback_body += f"- **{comment.get('path')}:{comment.get('line')}**: {comment.get('body')}\n"
                        try_create_review(fallback_body, [], review_event)
                        return
                raise e

        try_create_review(payload.get("body",""), payload.get("comments",[]), event)
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
