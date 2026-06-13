import json
import os

def compile_interactive_audit_payload():
    # Read your tool's pre-calculated impact metrics
    impact_json_path = 'artifacts/impact-analysis/impact.json'
    if not os.path.exists(impact_json_path):
        impact_json_path = 'artifacts/impact-analysis.json'

    try:
        with open(impact_json_path, 'r') as f:
            impact_data = json.load(f)
    except FileNotFoundError:
        impact_data = {}

    # We look for the first interactive route we find for the purpose of this example/script
    dom_review_dir = 'artifacts/dom-review'
    diff_snippet = "No interaction diff found."

    if os.path.exists(dom_review_dir):
        for route_slug in os.listdir(dom_review_dir):
            diff_path = os.path.join(dom_review_dir, route_slug, 'diff.txt')
            if os.path.exists(diff_path):
                with open(diff_path, 'r') as f:
                    diff_snippet = f.read()[:1000] # Cap tokens aggressively
                break

    system_prompt = (
        "You are a DevAI User-Interaction Auditor.\n"
        "Verify if an explicit user interaction (input entering/button clicking) achieved its layout goal."
    )

    user_prompt = f"""
### INTENDED INTERACTION FUNCTIONAL SCOPE ###
{impact_data.get('description', 'User enters search string and submits.')}

### STRUCTURAL DOM TREE DELTA (BEFORE vs AFTER CLICK) ###
```diff
{diff_snippet}
```

Evaluate if the DOM layout correctly reacted to the click event. Identify if components collapsed, threw errors, or stayed stagnant. Keep response to 2 sentences max.
"""

    return system_prompt, user_prompt

if __name__ == "__main__":
    system, user = compile_interactive_audit_payload()
    print("--- SYSTEM PROMPT ---")
    print(system)
    print("\n--- USER PROMPT ---")
    print(user)
