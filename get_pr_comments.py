import os
import json
import urllib.request
import sys

token = os.environ.get('GITHUB_TOKEN') or os.environ.get('GH_TOKEN')
repo = os.environ.get('GITHUB_REPOSITORY') or 'arii/tech-dancer'
pr_number = sys.argv[1]

def get_json(url):
    req = urllib.request.Request(url)
    if token:
        req.add_header('Authorization', f'token {token}')
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read())

print(f"--- Issue Comments for #{pr_number} ---")
comments = get_json(f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments")
for c in comments:
    print(f"ID: {c['id']} [{c['user']['login']}]: {c['body']}")

print(f"\n--- Review Comments for #{pr_number} ---")
r_comments = get_json(f"https://api.github.com/repos/{repo}/pulls/{pr_number}/comments")
for c in r_comments:
    print(f"ID: {c['id']} [{c['user']['login']}] ({c.get('path')}:{c.get('line')}): {c['body']}")
