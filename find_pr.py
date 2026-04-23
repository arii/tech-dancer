import requests
import os
import subprocess
import json

def get_token():
    try:
        out = subprocess.check_output(['env', '-u', 'GITHUB_TOKEN', 'gh', 'auth', 'token'], stderr=subprocess.DEVNULL, text=True).strip()
        if out: return out
    except Exception: pass
    return os.getenv("GITHUB_TOKEN")

token = get_token()
headers = {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github.v3+json"}
repo = "arii/tech-dancer"
url = f"https://api.github.com/repos/{repo}/pulls"
try:
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    prs = resp.json()
    for pr in prs:
        print(f"PR #{pr['number']}: {pr['title']} ({pr['head']['ref']})")
except Exception as e:
    print(f"Error: {e}")
