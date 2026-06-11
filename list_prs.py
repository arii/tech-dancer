import urllib.request
import urllib.error
import json
import os

token = os.environ.get('GH_TOKEN')
url = 'https://api.github.com/repos/arii/tech-dancer/pulls?state=open'
headers = {
    'Authorization': f'token {token}',
    'Accept': 'application/vnd.github.v3+json'
}
req = urllib.request.Request(url, headers=headers)
try:
    with urllib.request.urlopen(req) as response:
        prs = json.loads(response.read().decode())
        for pr in prs:
            print(f"PR #{pr['number']}: {pr['title']} (Branch: {pr['head']['ref']})")
except urllib.error.URLError as e:
    print(e.read().decode())
