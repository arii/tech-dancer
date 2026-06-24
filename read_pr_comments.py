from tdw_services.services.github import GitHubClient
import json

client = GitHubClient()
repo = client.repo

# Find the PR number for the branch
prs = client._request('GET', f'/repos/{repo}/pulls?head=fix/node-version-mismatch-v24&state=open')
if not prs:
    print("No open PR found for branch fix/node-version-mismatch-v24")
else:
    pr_number = prs[0]['number']
    print(f"Found PR #{pr_number}")

    # Read comments
    comments = client._request('GET', f'/repos/{repo}/issues/{pr_number}/comments')
    print("Issue Comments:")
    print(json.dumps(comments, indent=2))

    # Read review comments
    review_comments = client._request('GET', f'/repos/{repo}/pulls/{pr_number}/comments')
    print("Review Comments:")
    print(json.dumps(review_comments, indent=2))
