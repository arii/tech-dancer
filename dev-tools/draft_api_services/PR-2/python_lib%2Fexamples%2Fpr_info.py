from github_client import GitHubClient
import os

def main():
    token = os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPO")

    if not token or not repo:
        print("Please set GITHUB_TOKEN and GITHUB_REPO environment variables.")
        return

    client = GitHubClient(token, repo)

    print("Fetching PRs...")
    prs = client.fetch_pull_requests(state='open')
    print(f"Found {len(prs)} open PRs.")

    if prs:
        pr_number = prs[0]['number']
        print(f"\nDetails for PR #{pr_number}:")
        details = client.fetch_pr_details(pr_number)
        print(f"Title: {details['title']}")
        print(f"State: {details['state']}")

        print("\nFetching PR diff...")
        diff = client.fetch_pr_diff(pr_number)
        print(f"Diff length: {len(diff)} characters")
        print(f"First 100 chars of diff:\n{diff[:100]}")

if __name__ == "__main__":
    main()
