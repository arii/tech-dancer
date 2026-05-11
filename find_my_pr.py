import os
import json
import urllib.request
import subprocess

token = os.environ.get('GITHUB_TOKEN') or os.environ.get('GH_TOKEN')
repo = os.environ.get('GITHUB_REPOSITORY') or 'arii/tech-dancer'

def get_json(url):
    req = urllib.request.Request(url)
    if token:
        req.add_header('Authorization', f'token {token}')
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read())

branch = subprocess.check_output(['git', 'branch', '--show-current']).decode().strip()
print(f"Current branch: {branch}")

prs = get_json(f"https://api.github.com/repos/{repo}/pulls?state=open")
for pr in prs:
    if pr['head']['ref'] == branch:
        print(f"FOUND PR: #{pr['number']} - {pr['title']}")
        # Get comments
        comments = get_json(f"https://api.github.com/repos/{repo}/issues/{pr['number']}/comments")
        print("\n--- Issue Comments ---")
        for c in comments:
            print(f"ID: {c['id']} [{c['user']['login']}]: {c['body']}")

        # Get review comments
        r_comments = get_json(f"https://api.github.com/repos/{repo}/pulls/{pr['number']}/comments")
        print("\n--- Review Comments ---")
        for c in r_comments:
            print(f"ID: {c['id']} [{c['user']['login']}] ({c.get('path')}:{c.get('line')}): {c['body']}")
