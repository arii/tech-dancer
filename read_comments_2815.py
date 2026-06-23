from tdw_services.services.github import GitHubClient
import json
import sys

client = GitHubClient()
repo = client.repo
pr_number = 2815

print(f"Reading comments for PR #{pr_number}")

# Read comments
comments = client._request('GET', f'/repos/{repo}/issues/{pr_number}/comments')
print("Issue Comments:")
for c in comments:
    print(f"Author: {c['user']['login']}")
    print(f"Body: {c['body']}")
    print("-" * 20)

# Read review comments
review_comments = client._request('GET', f'/repos/{repo}/pulls/{pr_number}/comments')
print("Review Comments:")
for c in review_comments:
    print(f"Author: {c['user']['login']}")
    print(f"File: {c['path']}")
    print(f"Body: {c['body']}")
    print("-" * 20)
