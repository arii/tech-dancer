from github import Github
import subprocess
import re
import os

def get_repo_name():
    try:
        url = subprocess.check_output(
            ['git', 'config', '--get', 'remote.origin.url'],
            stderr=subprocess.DEVNULL, text=True
        ).strip()
        match = re.search(r'[:/]([^/]+/[^/.]+)(\.git)?$', url)
        return match.group(1) if match else url
    except Exception:
        return None

repo_name = get_repo_name()
token = os.getenv("GITHUB_TOKEN")

if not token:
    print("No GITHUB_TOKEN found")
else:
    g = Github(token)
    repo = g.get_repo(repo_name)
    pulls = repo.get_pulls(state='open', head='fix/lab-component-tokens-901468585020252794')
    for pr in pulls:
        print(f"PR_NUMBER={pr.number}")
