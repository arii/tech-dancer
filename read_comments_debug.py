import sys
import os
import json

# Add dev-tools to path to import tdw_services and utils
sys.path.append(os.path.join(os.getcwd(), 'dev-tools'))

try:
    from tdw_services.services.github import GitHubClient
    client = GitHubClient()

    # Use the repo-specific PR number from my previous discovery
    pr_number = 2217

    print(f"--- Issue Comments for PR #{pr_number} ---")
    issue_comments = client._request('GET', f'/repos/{client.repo}/issues/{pr_number}/comments')
    for c in issue_comments:
        print(f"[{c['user']['login']}]: {c['body']}\n")

    print(f"--- Review Comments for PR #{pr_number} ---")
    review_comments = client._request('GET', f'/repos/{client.repo}/pulls/{pr_number}/comments')
    for c in review_comments:
        path = c.get('path', 'unknown')
        line = c.get('line', 'unknown')
        print(f"[{c['user']['login']}] at {path}:{line}: {c['body']}\n")

except Exception as e:
    print(f"Error: {e}")
