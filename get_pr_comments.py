import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'dev-tools'))
from utils import get_github_client, get_repo_name

def main():
    pr_number = 2769
    repo_name = get_repo_name()
    client = get_github_client()
    repo = client.get_repo(repo_name)
    pr = repo.get_pull(pr_number)

    print(f"Comments for PR #{pr_number}:")
    for comment in pr.get_issue_comments():
        print(f"--- {comment.user.login} at {comment.created_at} ---")
        print(comment.body)
        print()

    for comment in pr.get_review_comments():
        print(f"--- [Review] {comment.user.login} on {comment.path}:{comment.line} at {comment.created_at} ---")
        print(comment.body)
        print()

if __name__ == "__main__":
    main()
