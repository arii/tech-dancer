import sys
import os
sys.path.append('dev-tools')
try:
    from utils import get_github_client, get_repo_name
    client = get_github_client()
    repo_name = get_repo_name()
    repo = client.get_repo(repo_name)
    pr = repo.get_pull(2497)
    print(f"PR #{pr.number}: {pr.title}")

    print("--- Issue Comments ---")
    for comment in pr.get_issue_comments():
        print(f"[{comment.created_at}] {comment.user.login}: {comment.body}")

    print("--- Review Comments (Inline) ---")
    for comment in pr.get_review_comments():
        print(f"[{comment.created_at}] {comment.user.login} on {comment.path}:{comment.line}: {comment.body}")

    print("--- Reviews ---")
    for review in pr.get_reviews():
        print(f"[{review.submitted_at}] {review.user.login} ({review.state}): {review.body}")
except Exception as e:
    print(f"Error: {e}")
