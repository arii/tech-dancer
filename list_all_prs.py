import os
import json
import urllib.request

token = os.environ.get('GITHUB_TOKEN') or os.environ.get('GH_TOKEN')
repo = os.environ.get('GITHUB_REPOSITORY') or 'arii/tech-dancer'

def get_json(url):
    req = urllib.request.Request(url)
    if token:
        req.add_header('Authorization', f'token {token}')
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read())

prs = get_json(f"https://api.github.com/repos/{repo}/pulls?state=open")
for pr in prs:
    print(f"#{pr['number']} [{pr['head']['ref']}]: {pr['title']}")
