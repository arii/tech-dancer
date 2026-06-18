import os
import requests
import json
import sys

sys.path.append(os.path.join(os.getcwd(), 'dev-tools'))
try:
    from utils import get_github_token
    token = get_github_token()
except ImportError:
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")

repo = "arii/tech-dancer"

def get_comments(issue_number):
    url = f"https://api.github.com/repos/{repo}/issues/{issue_number}/comments"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/vnd.github.v3+json"
    }
    resp = requests.get(url, headers=headers)
    if resp.status_code != 200:
        return []
    return resp.json()

if __name__ == "__main__":
    pr_num = 2520
    print(f"--- Comments for PR {pr_num} ---")
    comments = get_comments(pr_num)
    if not comments:
        print("No comments found.")
    for c in comments:
        print(f"[{c['user']['login']}]: {c['body']}\n")
