from github import Github
import os
import subprocess

def get_github_token():
    return os.getenv("GITHUB_TOKEN")

def get_repo_name():
    try:
        url = subprocess.check_output(
            ['git', 'config', '--get', 'remote.origin.url'],
            stderr=subprocess.DEVNULL, text=True
        ).strip()
        import re
        match = re.search(r'[:/]([^/]+/[^/.]+)(\.git)?$', url)
        return match.group(1) if match else url
    except Exception:
        return os.getenv("GH_REPO")

token = get_github_token()
repo_name = get_repo_name()

if not token:
    print("No GITHUB_TOKEN found")
    exit(1)

g = Github(token)
repo = g.get_repo(repo_name)

print(f"Searching PRs for repo: {repo_name}")
for pr in repo.get_pulls(state='open'):
    print(f"PR #{pr.number}: {pr.title} (Branch: {pr.head.ref})")
