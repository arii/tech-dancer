import sys
sys.path.append('dev-tools')
from tdw_services.services.github import GitHubClient

client = GitHubClient()
print("Methods in GitHubClient:")
for method in dir(client):
    if not method.startswith('_'):
        print(f"  - {method}")
