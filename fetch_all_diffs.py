import urllib.request
import urllib.error
import json
import os
import sys

token = os.environ.get('GH_TOKEN')
headers = {
    'Authorization': f'token {token}',
    'Accept': 'application/vnd.github.v3+json'
}

def get_prs():
    url = 'https://api.github.com/repos/arii/tech-dancer/pulls?state=open&per_page=100'
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

def get_pr_diff(pr_number):
    url = f'https://api.github.com/repos/arii/tech-dancer/pulls/{pr_number}'
    diff_headers = headers.copy()
    diff_headers['Accept'] = 'application/vnd.github.v3.diff'
    req = urllib.request.Request(url, headers=diff_headers)
    try:
        with urllib.request.urlopen(req) as response:
            return response.read().decode()
    except Exception as e:
        return f"Error fetching diff: {e}"

if __name__ == "__main__":
    prs = get_prs()
    prs = sorted(prs, key=lambda x: x['number'])

    with open("all_prs_summary.txt", "w") as f:
        for pr in prs:
            diff = get_pr_diff(pr['number'])
            f.write(f"====================================================\n")
            f.write(f"PR #{pr['number']}: {pr['title']}\n")
            f.write(f"Branch: {pr['head']['ref']} | Base: {pr['base']['ref']} | Mergeable: {pr.get('mergeable')}\n")
            f.write(f"Body: {pr.get('body', '')[:200]}...\n")
            f.write(f"--- DIFF ---\n")
            f.write(diff[:2000] + ("\n...[truncated]...\n" if len(diff) > 2000 else "\n"))
            f.write(f"====================================================\n\n")
