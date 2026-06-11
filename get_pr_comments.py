from tdw_services.services.github import GitHubClient
import os

client = GitHubClient()
repo = client.repo
branch = "fix/home-mobile-overflow"

# Fetch PRs for the branch
url = f"/repos/{repo}/pulls?head=arii:{branch}&state=open"
prs = client._request('GET', url)

if prs:
    pr_number = prs[0]['number']
    print(f"PR_NUMBER: {pr_number}")

    # Try to fetch comments
    comments_url = f"/repos/{repo}/issues/{pr_number}/comments"
    comments = client._request('GET', comments_url)
    for c in comments:
        print(f"Comment from {c['user']['login']}: {c['body']}")

    review_comments_url = f"/repos/{repo}/pulls/{pr_number}/comments"
    review_comments = client._request('GET', review_comments_url)
    for rc in review_comments:
        print(f"Review Comment from {rc['user']['login']} on {rc['path']}:{rc.get('line')}: {rc['body']}")
else:
    print("No PR found for branch " + branch)
