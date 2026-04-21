import re

with open('dev-tools/fetch_pr_review_data.py', 'r') as f:
    content = f.read()

# Fix the iteration over files_resp to handle errors safely without breaking types
content = content.replace("for f in files_resp:\n        pr_url", "for f in (files_resp if isinstance(files_resp, list) else []):\n        if not isinstance(f, dict): continue\n        pr_url")
content = content.replace("for f in files_resp:\n        patch = f.get", "for f in (files_resp if isinstance(files_resp, list) else []):\n        if not isinstance(f, dict): continue\n        patch = f.get")

with open('dev-tools/fetch_pr_review_data.py', 'w') as f:
    f.write(content)
