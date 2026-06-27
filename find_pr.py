import sys
import os
import json

# Add boomtick-pkg/cli to sys.path
sys.path.append(os.path.join(os.getcwd(), 'boomtick-pkg', 'cli'))
sys.path.append(os.path.join(os.getcwd(), 'boomtick-pkg', 'cli', 'tdw_services'))

from tdw_services.services.github import GitHubClient

client = GitHubClient()
repo = client.repo
print(f"Repo: {repo}")

# List open PRs
prs = client._request('GET', f'/repos/{repo}/pulls?state=open')
for pr in prs:
    print(f"#{pr['number']}: {pr['title']} (Branch: {pr['head']['ref']})")
