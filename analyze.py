import json

with open('impact_data.json', 'r') as f:
    data = json.load(f)

for pr in data:
    human_comments = "\n".join(pr['human']).lower()
    if 'broken' in human_comments or 'regression' in human_comments or 'missing' in human_comments:
        print(f"PR: {pr['pr']}")
        print(f"Impact: {pr['impact'][:100]}")
        print("Human:")
        for hc in pr['human']:
            print(hc)
        print("-------")
