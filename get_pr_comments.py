import sys
import os
sys.path.append('dev-tools')
try:
    from utils import get_github_client, get_repo_name
    client = get_github_client()
    repo_name = get_repo_name()
    repo = client.get_repo(repo_name)
    # Search for PRs by branch name
    branch = 'feat/consolidated-ui-updates-8678555418170047605'
    pulls = repo.get_pulls(state='open')
    found = False
    for pr in pulls:
        if pr.head.ref == branch:
            found = True
            print(f"PR #{pr.number}: {pr.title}")
            print("--- Issue Comments ---")
            comments = pr.get_issue_comments()
            for comment in comments:
                print(f"Comment by {comment.user.login}: {comment.body}")
            print("--- Review Comments ---")
            review_comments = pr.get_review_comments()
            for comment in review_comments:
                print(f"Review Comment by {comment.user.login} on {comment.path}: {comment.body}")
    if not found:
        print(f"No open PR found for branch {branch}")
except Exception as e:
    print(f"Error: {e}")
