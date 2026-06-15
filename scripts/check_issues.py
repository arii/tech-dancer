import os
import sys
from github import Github, Auth

def get_github_token():
    return os.getenv("CODEX_GH_TOKEN") or os.getenv("GH_TOKEN") or os.getenv("GITHUB_TOKEN") or os.getenv("PAT_TOKEN")

def main():
    token = get_github_token()
    if not token:
        print("No GitHub token found")
        sys.exit(1)

    g = Github(auth=Auth.Token(token))
    repo = g.get_repo("arii/tech-dancer")

    issue_numbers = [1867, 1863, 2208, 2211]

    for num in issue_numbers:
        try:
            issue = repo.get_issue(num)
            print(f"Issue #{issue.number}: {issue.title}")
            print(f"State: {issue.state}")
            print("-" * 20)
        except Exception as e:
            print(f"Error fetching issue #{num}: {e}")

if __name__ == "__main__":
    main()
