import requests
import os
import json
import re

TOKEN = os.environ.get('GH_TOKEN')
HEADERS = {'Authorization': f'token {TOKEN}', 'Accept': 'application/vnd.github.v3+json'}
REPO = 'arii/tech-dancer'

def get_prs():
    url = f'https://api.github.com/repos/{REPO}/pulls?state=all&per_page=100'
    prs = []
    while url:
        response = requests.get(url, headers=HEADERS)
        if response.status_code != 200:
            break
        prs.extend(response.json())
        url = response.links.get('next', {}).get('url')
        if len(prs) > 300:
            break
    return prs

prs = get_prs()
data = []
for pr in prs[:100]:
    pr_num = pr['number']
    url = f'https://api.github.com/repos/{REPO}/issues/{pr_num}/comments'
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        continue
    comments = response.json()

    impact_comment = None
    human_comments = []
    models_reviewer = []
    gemini_reviewer = []

    for c in comments:
        body = c.get('body', '')
        user = c.get('user', {}).get('login', '')

        if 'Impact Analysis' in body:
            impact_comment = body
        elif 'GitHub Models' in body:
            models_reviewer.append(body)
        elif 'Gemini' in body:
            gemini_reviewer.append(body)
        elif user != 'github-actions[bot]' and not user.endswith('[bot]'):
            human_comments.append(body)

    if impact_comment:
        data.append({
            'pr': pr_num,
            'impact': impact_comment,
            'human': human_comments,
            'models': models_reviewer,
            'gemini': gemini_reviewer
        })

with open('impact_data.json', 'w') as f:
    json.dump(data, f, indent=2)
