import os
from github import Github

token = os.environ.get('GH_TOKEN')
repo_name = 'arii/tech-dancer'
pr_number = 2774

g = Github(token)
repo = g.get_repo(repo_name)
pr = repo.get_pull(pr_number)

print(f"--- Comments for PR #{pr_number} ---")
for comment in pr.get_issue_comments():
    print(f"[{comment.user.login}]: {comment.body}")
    print("-" * 20)

for review in pr.get_reviews():
    if review.body:
        print(f"--- Review by {review.user.login} ---")
        print(review.body)
        print("-" * 20)
    for comment in review.get_comments():
        print(f"[{comment.user.login} in {comment.path}:{comment.line}]: {comment.body}")
        print("-" * 20)
