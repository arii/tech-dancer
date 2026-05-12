import sys
import os
sys.path.append('dev-tools')
from utils import get_github_client, get_repo_name
import subprocess

try:
    client = get_github_client()
    repo_name = get_repo_name()
    print(f"Repo: {repo_name}")
    repo = client.get_repo(repo_name)
    branch = subprocess.check_output(['git', 'branch', '--show-current']).decode().strip()
    print(f"Branch: {branch}")
    # The head parameter usually needs "owner:branch" or just "branch"
    # Try both if needed, but let's try just the branch first or list all open
    prs = list(repo.get_pulls(state='open'))
    found = False
    for pr in prs:
        if pr.head.ref == branch:
            found = True
            print(f"PR #{pr.number}: {pr.title}")
            print("\n--- Issue Comments ---")
            for comment in pr.get_issue_comments():
                print(f"[{comment.user.login}]: {comment.body}")
            print("\n--- Review Comments ---")
            for comment in pr.get_review_comments():
                line = comment.line if comment.line else comment.original_line
                print(f"[{comment.user.login}] ({comment.path}:{line}): {comment.body}")
    if not found:
        print("No open PR found for this branch.")
except Exception as e:
    print(f"Error: {e}")
