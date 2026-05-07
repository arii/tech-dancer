from github_client import GitHubClient
import os

def main():
    token = os.environ.get("GITHUB_TOKEN")
    repo = os.environ.get("GITHUB_REPO")

    if not token or not repo:
        print("Please set GITHUB_TOKEN and GITHUB_REPO environment variables.")
        return

    client = GitHubClient(token, repo)

    print("Creating a new issue...")
    new_issue = client.create_issue(
        title="Test Issue from Python Client",
        body="This is a test issue created by the Python GitHub client.",
        labels=["test", "documentation"]
    )
    print(f"Created issue #{new_issue['number']}: {new_issue['title']}")

    print("\nAdding a comment to the issue...")
    client.add_comment(new_issue['number'], "Adding a comment via API.")
    print("Comment added.")

    print("\nClosing the issue...")
    client.update_issue(new_issue['number'], {"state": "closed"})
    print("Issue closed.")

if __name__ == "__main__":
    main()
