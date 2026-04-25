import os
import sys
from github import Github

def main():
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        print("GITHUB_TOKEN not found")
        return

    g = Github(token)
    repo = g.get_repo("arii/tech-dancer")
    # Using the branch name from previous submit
    pulls = repo.get_pulls(state='open', head='fix/lab-component-tokens-901468585020252794')

    for pr in pulls:
        print(f"--- PR #{pr.number}: {pr.title} ---")
        print(f"URL: {pr.html_url}\n")

        print("## Review Comments")
        for comment in pr.get_review_comments():
            print(f"[{comment.path}:{comment.line}] @{comment.user.login}: {comment.body}")

        print("\n## Issue Comments")
        for comment in pr.get_issue_comments():
            print(f"@{comment.user.login}: {comment.body}")

if __name__ == "__main__":
    main()
