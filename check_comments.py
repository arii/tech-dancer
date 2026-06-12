import os
import sys
from github import Github, Auth

token = os.environ.get("GITHUB_TOKEN") or os.environ.get("CODEX_GH_TOKEN")
if not token:
    print("Missing token")
    sys.exit(1)

auth = Auth.Token(token)
g = Github(auth=auth)
repo = g.get_repo("arii/tech-dancer")
prs = repo.get_pulls(state='open')

for pr in prs:
    comments = list(pr.get_issue_comments())
    has_jules_comment = any("Jules" in c.body for c in comments)
    print(f"PR #{pr.number}: {'✅ Has Jules comment' if has_jules_comment else '❌ No Jules comment'}")
