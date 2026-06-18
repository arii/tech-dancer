import sys
import os
sys.path.append('dev-tools')
try:
    from utils import get_github_client, get_repo_name
    client = get_github_client()
    repo_name = get_repo_name()
    repo = client.get_repo(repo_name)
    pr = repo.get_pull(2497)
    print(f"Title: {pr.title}")
    print(f"Body: {pr.body}")
    print("--- Review Comments (inline) ---")
    for comment in pr.get_review_comments():
        print(f"File: {comment.path}, Line: {comment.line}, Comment: {comment.body}")
    print("--- Issue Comments ---")
    for comment in pr.get_issue_comments():
        print(f"User: {comment.user.login}, Body: {comment.body}")
except Exception as e:
    print(f"Error: {e}")
