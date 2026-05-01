import json
import sys
import subprocess
from datetime import datetime, timezone

def main():
    try:
        with open('issues.json', 'r') as f:
            issues = json.load(f)
    except FileNotFoundError:
        print("issues.json not found. Please run 'gh issue list' first.")
        sys.exit(1)

    now = datetime.now(timezone.utc)

    for issue in issues:
        number = issue.get('number')
        title = issue.get('title')
        updated_at_str = issue.get('updatedAt')

        updated_at = datetime.fromisoformat(updated_at_str.replace('Z', '+00:00'))
        days_stale = (now - updated_at).days

        action = "KEEP"
        reason = "Recently updated"

        if days_stale > 90:
            action = "ABANDON"
            reason = f"Stale for {days_stale} days"
        elif days_stale > 30:
            action = "UPDATE"
            reason = f"No activity for {days_stale} days"

        print(f"Issue #{number}: {title}")
        print(f"  -> Action: {action} ({reason})")

        # Here we could theoretically use github API to add comments or close issues
        # For now, we will just print the recommendation.

if __name__ == "__main__":
    main()
