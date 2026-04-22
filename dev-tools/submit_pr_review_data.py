"""
submit_pr_review_data.py

Parses a completed pr-review-NUMBER.md document and submits the review via gh_collab.py.
It simply extracts the JSON block from the bottom of the markdown document, making
it highly robust against markdown formatting hallucinations.
"""

import json
import re
import subprocess
import sys
import os

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 dev-tools/submit_pr_review_data.py <pr-review-NUMBER.md>")
        sys.exit(1)

    filepath = sys.argv[1]
    dry_run = "--dry-run" in sys.argv

    if not os.path.exists(filepath):
        print(f"❌ File not found: {filepath}")
        sys.exit(1)

    with open(filepath, "r") as f:
        content = f.read()

    # Extract PR number from the filename (e.g., pr-review-123.md)
    m = re.search(r'pr-review-(\d+)\.md', os.path.basename(filepath))
    if not m:
        print("❌ Could not extract PR number from filename.")
        sys.exit(1)
    pr_number = m.group(1)

    # Extract the JSON block
    json_match = re.search(r'```json\n(.*?)\n```', content, re.DOTALL)
    if not json_match:
        print("❌ Could not find ```json block in the review document.")
        sys.exit(1)

    try:
        payload = json.loads(json_match.group(1))
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON in review document: {e}")
        sys.exit(1)

    # Basic placeholder validation
    body_text = payload.get("body", "")
    if "<findings>" in body_text or "<summary>" in body_text:
         print("❌ Placeholders found in JSON body. Please complete the review.")
         sys.exit(1)

    if payload.get("comments") and payload["comments"][0].get("path") == "<filename>":
        print("❌ Placeholders found in JSON comments. Please complete the review.")
        sys.exit(1)

    # Write payload to temporary file for gh_collab.py
    payload_path = f"/tmp/review-payload-{pr_number}.json"
    with open(payload_path, "w") as f:
        json.dump(payload, f, indent=2)
    print(f"✅ Payload written: {payload_path}")

    # Determine GitHub API Event type
    event = "COMMENT"
    if "Not Approved" in body_text:
        event = "REQUEST_CHANGES"
    elif "Approved" in body_text:
        event = "APPROVE"

    # Submit via gh_collab.py
    script_dir = os.path.dirname(os.path.abspath(__file__))
    gh_collab = os.path.join(script_dir, "gh_collab.py")

    cmd = ["python3", gh_collab, "review", pr_number, "--file", payload_path, "--event", event]
    if dry_run:
        cmd.insert(2, "--dry-run")

    result = subprocess.run(cmd, cwd=os.path.dirname(script_dir), capture_output=True, text=True)
    
    # Audit Summary Report
    print("\n" + "="*60)
    print("                PR TECHNICAL AUDIT REPORT")
    print("="*60)
    print(f"PR Number:    #{pr_number}")
    print(f"Outcome:      {'SUCCESS' if result.returncode == 0 else 'FAILURE'}")
    print(f"Event:        {event}")
    print(f"Comments:     {len(payload.get('comments', []))} submitted")
    
    if result.returncode != 0:
        print(f"\n❌ Error Details:\n{result.stderr or result.stdout}")
        if "422" in (result.stderr or result.stdout):
            print("\n💡 TIP: GitHub 422 errors usually mean a line number is outside the diff patch.")
        sys.exit(1)
    else:
        print("\n✅ Successfully submitted review!")

if __name__ == "__main__":
    main()
