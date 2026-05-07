from github_client import GitHubClient
import os

# Example usage:
# export GITHUB_TOKEN="your_token"
# export GITHUB_REPO="owner/repo"

def main():
    token = os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPO")

    if not token or not repo:
        print("Please set GITHUB_TOKEN and GITHUB_REPO environment variables.")
        return

    client = GitHubClient(token, repo)

    print(f"Fetching stats for {repo}...")
    stats = client.fetch_repo_stats()
    print(f"Stats: {stats}")

    print("\nFetching open issues...")
    issues = client.fetch_issues()
    print(f"Found {len(issues)} open issues.")
    if issues:
        print(f"First issue: {issues[0]['title']}")

    print("\nFetching branches...")
    branches = client.fetch_branches()
    print(f"Found {len(branches)} branches.")

if __name__ == "__main__":
    main()
