import sys
import os
from tdw_services.services.github import GitHubClient

def fetch_pr_comments(pr_number):
    client = GitHubClient()
    try:
        # Fetch issue comments
        issue_comments = client._request('GET', f'/repos/{client.repo}/issues/{pr_number}/comments')
        print(f"--- ISSUE COMMENTS FOR PR #{pr_number} ---")
        for comment in issue_comments:
            print(f"[{comment.get('user', {}).get('login')}] {comment.get('body')}\n")

        # Fetch review comments
        review_comments = client._request('GET', f'/repos/{client.repo}/pulls/{pr_number}/comments')
        print(f"--- REVIEW COMMENTS FOR PR #{pr_number} ---")
        for comment in review_comments:
            print(f"[{comment.get('user', {}).get('login')} at {comment.get('path')}:{comment.get('line')}] {comment.get('body')}\n")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        fetch_pr_comments(sys.argv[1])
    else:
        print("Usage: python3 fetch_comments.py <PR_NUMBER>")
