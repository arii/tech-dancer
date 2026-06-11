import urllib.request
import urllib.error
import json
import os
import sys

token = os.environ.get('GH_TOKEN')
if not token:
    print("GH_TOKEN is missing")
    sys.exit(1)

headers = {
    'Authorization': f'token {token}',
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28'
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

def get_pr_checks(head_sha):
    url = f'https://api.github.com/repos/arii/tech-dancer/commits/{head_sha}/check-runs'
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        return {"error": str(e)}

def post_comment(pr_number, comment):
    url = f'https://api.github.com/repos/arii/tech-dancer/issues/{pr_number}/comments'
    data = json.dumps({'body': comment}).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except urllib.error.URLError as e:
        print(f"Error posting comment to PR {pr_number}: {e.read().decode()}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python pr_reviewer.py <command> [args]")
        sys.exit(1)

    cmd = sys.argv[1]

    if cmd == "list":
        prs = get_prs()
        for pr in prs:
            print(f"{pr['number']}")

    elif cmd == "details":
        if len(sys.argv) < 3:
            print("Need PR number")
            sys.exit(1)
        pr_number = sys.argv[2]

        url = f'https://api.github.com/repos/arii/tech-dancer/pulls/{pr_number}'
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req) as response:
                pr = json.loads(response.read().decode())
        except Exception as e:
            print(f"PR {pr_number} not found: {e}")
            sys.exit(1)

        print(f"=== PR #{pr['number']}: {pr['title']} ===")
        print(f"Branch: {pr['head']['ref']}")
        print(f"Base: {pr['base']['ref']}")
        print(f"State: {pr['state']}")
        print(f"Mergeable: {pr.get('mergeable', 'Unknown')}")
        print("\n=== Body ===")
        print(pr['body'] or "No body")

        print("\n=== Checks ===")
        checks = get_pr_checks(pr['head']['sha'])
        if 'check_runs' in checks:
            for check in checks['check_runs']:
                print(f"- {check['name']}: {check['status']} ({check['conclusion']})")
        else:
            print("Could not fetch checks.")

        print("\n=== Diff Snippet (first 4000 chars) ===")
        diff = get_pr_diff(pr['number'])
        print(diff[:4000])
        if len(diff) > 4000:
            print(f"\n... (truncated {len(diff) - 4000} chars)")

    elif cmd == "comment":
        if len(sys.argv) < 4:
            print("Need PR number and comment file path")
            sys.exit(1)
        pr_number = sys.argv[2]
        comment_file = sys.argv[3]

        with open(comment_file, 'r') as f:
            comment = f.read()

        result = post_comment(pr_number, comment)
        if result:
            print(f"Successfully posted comment to PR #{pr_number}")
