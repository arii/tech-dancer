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
    cleanup = "--cleanup" in sys.argv
    event_override = next((arg.split('=')[1] for arg in sys.argv if arg.startswith('--event=')), None)

    # Ensure path is absolute for easier cleanup
    filepath = os.path.abspath(filepath)

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
    placeholders = ["<findings>", "<summary>", "<Approved | Approved with Minor Changes | Not Approved>"]
    found_placeholders = [p for p in placeholders if p.lower() in body_text.lower()]
    
    if found_placeholders:
         print(f"❌ Placeholders found in JSON body: {', '.join(found_placeholders)}")
         print("AI Audit failed to complete the analysis block.")
         sys.exit(1)

    if payload.get("comments") and any(c.get("path") == "<filename>" for c in payload["comments"]):
        print("❌ Placeholders found in JSON comments path.")
        sys.exit(1)

    # ── Pre-flight Line Validation ───────────────────────────────────────────
    context_file = filepath.replace(f"pr-review-{pr_number}.md", f"pr-context-{pr_number}.md")
    if os.path.exists(context_file):
        print(f"🔍 Validating line numbers against {os.path.basename(context_file)}...")
        with open(context_file, "r") as f:
            ctx_content = f.read()
        
        # Parse valid ranges per file
        # Format: ### `filename` (status)
        # OR: ### `filename`
        file_sections = re.split(r'### `?([^`\n]+)`?.*?\n', ctx_content)
        valid_map = {}
        # file_sections[0] is prefix
        # i=1 is fname, i=2 is content
        for i in range(1, len(file_sections), 2):
            fname = file_sections[i].strip()
            section_content = file_sections[i+1]
            
            # Find the range line in this section
            range_match = re.search(r'\*\*Valid Comment Ranges \(New File\):\*\* (.*)', section_content)
            if range_match:
                ranges = []
                for r in range_match.group(1).split(", "):
                    if "-" in r:
                        try:
                            start, end = map(int, r.split("-"))
                            ranges.append((start, end))
                        except ValueError:
                            continue
                valid_map[fname] = ranges

        # Filter comments
        original_count = len(payload.get("comments", []))
        valid_comments = []
        for c in payload.get("comments", []):
            path = c.get("path")
            line = c.get("line")
            
            if path in valid_map:
                is_valid = False
                for start, end in valid_map[path]:
                    if start <= line <= end:
                        is_valid = True
                        break
                if is_valid:
                    valid_comments.append(c)
                else:
                    print(f"⚠️ Dropping comment on {path}:{line} (Outside hunk context)")
            else:
                # If file not in map (e.g. binary), allow it but it might still fail 422
                valid_comments.append(c)
        
        payload["comments"] = valid_comments
        if len(valid_comments) < original_count:
            print(f"✅ Filtered {original_count - len(valid_comments)} invalid comments.")

    # Write payload to temporary file for gh_collab.py
    payload_path = f"/tmp/review-payload-{pr_number}.json"
    with open(payload_path, "w") as f:
        json.dump(payload, f, indent=2)
    print(f"✅ Payload written: {payload_path}")

    # Determine GitHub API Event type
    event = "COMMENT"
    if event_override:
        event = event_override
    elif "Not Approved" in body_text:
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
            print("\n💡 Retrying without inline comments (fallback)...")
            payload["comments"] = []
            with open(payload_path, 'w') as f:
                json.dump(payload, f, indent=2)
            
            result = subprocess.run(cmd, cwd=os.path.dirname(script_dir), capture_output=True, text=True)
            if result.returncode == 0:
                print("✅ Fallback submission successful (body only).")
            else:
                print(f"❌ Fallback also failed: {result.stderr or result.stdout}")
                sys.exit(1)
        else:
            sys.exit(1)
    else:
        print("\n✅ Successfully submitted review!")
        
        if cleanup:
            print("\n🧹 Cleaning up review files...")
            try:
                os.remove(filepath)
                # Also try to remove the context file
                context_file = filepath.replace(f"pr-review-{pr_number}.md", f"pr-context-{pr_number}.md")
                if os.path.exists(context_file):
                    os.remove(context_file)
                print("✅ Cleanup complete.")
            except Exception as e:
                print(f"⚠️ Cleanup failed: {e}")

if __name__ == "__main__":
    main()
