import sys
sys.path.append('dev-tools')
from utils import get_github_client, get_repo_name

repo = get_github_client().get_repo(get_repo_name())
open_prs = list(repo.get_pulls(state='open'))

for pr in open_prs:
    print(f"=== PR #{pr.number} ===")
    print(f"Title: {pr.title}")
    print(f"Description:\n{pr.body}")
    print(f"State: {pr.state}")

    files = list(pr.get_files())
    print(f"Files changed ({len(files)}):")
    for f in files:
        print(f"  - {f.filename} (+{f.additions} -{f.deletions})")
    print("\n")
