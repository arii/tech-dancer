import sys
import os
import requests

# Set PYTHONPATH to include dev-tools
sys.path.append(os.path.join(os.getcwd(), 'dev-tools'))

from tdw_services.services.github import GitHubClient

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 read_pr_comments.py <PR_NUMBER>")
        sys.exit(1)

    pr_number = int(sys.argv[1])
    client = GitHubClient()

    # We want to read PR comments. issues/{number}/comments gets general comments.
    # pulls/{number}/comments gets review comments on specific lines.

    repo = client.repo

    print(f"Reading comments for PR {pr_number} in {repo}...")

    # Issue comments
    issue_comments = client._request('GET', f'/repos/{repo}/issues/{pr_number}/comments')
    print("\n--- Issue Comments ---")
    for c in issue_comments:
        print(f"[{c['user']['login']}]: {c['body']}\n")

    # Review comments
    review_comments = client._request('GET', f'/repos/{repo}/pulls/{pr_number}/comments')
    print("\n--- Review Comments ---")
    for c in review_comments:
        print(f"[{c['user']['login']}] {c['path']}:{c.get('line') or c.get('original_line')}: {c['body']}\n")

if __name__ == "__main__":
    main()
