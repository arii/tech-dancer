from dev_tools.utils import get_github_client, get_repo_name
import sys

def main(pr_number):
    gh = get_github_client()
    repo_name = get_repo_name()
    repo = gh.get_repo(repo_name)
    pr = repo.get_pull(pr_number)

    print(f"PR #{pr.number}: {pr.title}")
    print("--- Comments ---")
    for comment in pr.get_issue_comments():
        print(f"[{comment.user.login}]: {comment.body}")
        print("-" * 20)

    print("\n--- Review Comments ---")
    for comment in pr.get_review_comments():
        print(f"[{comment.user.login}] in {comment.path}:{comment.line}: {comment.body}")
        print("-" * 20)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        main(int(sys.argv[1]))
    else:
        print("Usage: python3 fetch_pr_comments.py <PR_NUMBER>")
