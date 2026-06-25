import sys
import os
sys.path.append(os.path.join(os.getcwd(), 'dev-tools'))
from tdw_services.services.github import GitHubClient

client = GitHubClient()
repo = client.repo
# The _request method likely doesn't support params as a kwarg based on the error.
# Let's try putting them in the URL.
prs = client._request('GET', f'/repos/{repo}/pulls?state=open')
for pr in prs:
    print(f"PR #{pr['number']}: {pr['head']['ref']} - {pr['title']}")
