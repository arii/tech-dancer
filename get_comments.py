import os
import requests
import json

token = os.environ.get('GH_TOKEN')
headers = {
    'Authorization': f'token {token}',
    'Accept': 'application/vnd.github.v3+json'
}

repo = 'arii/tech-dancer'
pr_number = '2697'

# Issue comments
issue_url = f'https://api.github.com/repos/{repo}/issues/{pr_number}/comments'
# PR review comments
review_url = f'https://api.github.com/repos/{repo}/pulls/{pr_number}/comments'
# PR reviews (for top-level review comments)
reviews_url = f'https://api.github.com/repos/{repo}/pulls/{pr_number}/reviews'

def get_and_print(url, label):
    resp = requests.get(url, headers=headers)
    if resp.status_code == 200:
        print(f'--- {label} ---')
        comments = resp.json()
        for c in comments:
            user = c.get('user', {}).get('login')
            body = c.get('body')
            print(f"Author: {user}")
            print(f"Body: {body}")
            print('---')
    else:
        print(f'Failed to get {label}: {resp.status_code} {resp.text}')

get_and_print(issue_url, 'Issue Comments')
get_and_print(review_url, 'Review Comments')
get_and_print(reviews_url, 'Reviews')
