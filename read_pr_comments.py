import os
import sys
import json

# Add dev-tools to path to import tdw_services
sys.path.append(os.path.join(os.getcwd(), 'dev-tools'))

from tdw_services.services.github import GitHubClient

client = GitHubClient()
repo = client.repo
branch = 'refactor/standardize-about-page-tokens-v2'

# Find the PR number for the branch
prs = client._request('GET', f'/repos/{repo}/pulls?head=arii:{branch}&state=all')
if not prs:
    # Try without owner prefix
    prs = client._request('GET', f'/repos/{repo}/pulls?head={branch}&state=all')

if not prs:
    print(f"No PR found for branch {branch}")
    # List open PRs to see what's available
    all_prs = client._request('GET', f'/repos/{repo}/pulls?state=open')
    print("Open PRs:")
    for pr in all_prs:
        print(f"#{pr['number']}: {pr['title']} ({pr['head']['ref']})")
else:
    pr_number = prs[0]['number']
    print(f"Found PR #{pr_number}")

    # Read comments
    comments = client._request('GET', f'/repos/{repo}/issues/{pr_number}/comments')
    print("Issue Comments:")
    for comment in comments:
        print(f"- {comment['user']['login']}: {comment['body']}")

    # Read review comments
    review_comments = client._request('GET', f'/repos/{repo}/pulls/{pr_number}/comments')
    print("Review Comments:")
    for comment in review_comments:
        print(f"- {comment['user']['login']} ({comment['path']}:{comment.get('line')}): {comment['body']}")
