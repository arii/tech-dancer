import os
import sys
import json
import requests
from tdw_services.services.github import GitHubClient

def main():
    client = GitHubClient()
    pr_number = 2836
    print(f"Reading comments for PR #{pr_number}...")

    # Get issue comments
    issue_comments = client._request("GET", f"/repos/{client.repo}/issues/{pr_number}/comments")

    # Get review comments
    review_comments = client._request("GET", f"/repos/{client.repo}/pulls/{pr_number}/comments")

    all_comments = []
    for c in issue_comments:
        all_comments.append({
            "author": c["user"]["login"],
            "body": c["body"],
            "created_at": c["created_at"],
            "type": "issue"
        })
    for c in review_comments:
        all_comments.append({
            "author": c["user"]["login"],
            "body": c["body"],
            "created_at": c["created_at"],
            "type": "review",
            "path": c.get("path")
        })

    # Sort by date
    all_comments.sort(key=lambda x: x["created_at"])

    print(json.dumps(all_comments, indent=2))

if __name__ == "__main__":
    main()
