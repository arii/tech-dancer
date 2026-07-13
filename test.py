import json

with open('issues.json', 'r') as f:
    issues_data = json.load(f)
issues = issues_data.get('data', {}).get('issues', [])

print(f"Total issues: {len(issues)}")
for issue in issues:
    print(f"{issue['number']}: {issue['title']}")
