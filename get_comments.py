import os
import sys
sys.path.append(os.path.join(os.getcwd(), 'dev-tools'))
from tdw_services.services.github import GitHubClient
try:
    gh = GitHubClient()
    # Find PR for branch feat/research-devai-articles
    repo_owner = gh.repo.split("/")[0]
    prs = gh._request('GET', f'/repos/{gh.repo}/pulls?head={repo_owner}:feat/research-devai-articles&state=open')
    if prs:
        pr_number = prs[0]['number']
        print(f"PR Number: {pr_number}")
        # Get issue comments (which include general PR comments)
        comments = gh._request('GET', f'/repos/{gh.repo}/issues/{pr_number}/comments')
        print("\n=== Issue Comments ===")
        for c in comments:
            print(f"Author: {c['user']['login']}")
            print(f"Body: {c['body']}")
            print("-" * 20)
        # Get review comments (line-specific)
        review_comments = gh._request('GET', f'/repos/{gh.repo}/pulls/{pr_number}/comments')
        print("\n=== Review Comments ===")
        for c in review_comments:
            print(f"Author: {c['user']['login']}")
            print(f"File: {c['path']} Line: {c.get('line')}")
            print(f"Body: {c['body']}")
            print("-" * 20)
    else:
        print("No open PR found for branch feat/research-devai-articles")
except Exception as e:
    print(f"Error: {e}")
