#!/usr/bin/env python3
"""
auto_review_pr.py

Orchestrates the PR review lifecycle:
1. Fetch PR data and generate templates (Stage 1)
2. Provide instructions for the technical audit (Stage 2)
3. Submit the completed review (Stage 3)
"""

import subprocess
import sys
import os
import argparse

def run_command(cmd):
    """Utility to run shell commands and return output."""
    try:
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"❌ Command failed: {' '.join(cmd)}")
        print(f"Error: {e.stderr}")
        sys.exit(1)

def main():
    parser = argparse.ArgumentParser(description="PR Review Orchestrator")
    parser.add_argument("pr_number", help="The PR number to review")
    parser.add_argument("--fetch", action="store_true", help="Stage 1 only: Fetch PR data")
    parser.add_argument("--audit", action="store_true", help="Stage 2 only: Perform AI-automated audit")
    parser.add_argument("--submit", action="store_true", help="Stage 3 only: Submit completed review")
    parser.add_argument("--auto", action="store_true", help="Run Stage 1-3 end-to-end automatically (Default)")
    parser.add_argument("--cleanup", action="store_true", help="Cleanup files after submission")
    parser.add_argument("--dry-run", action="store_true", help="Perform a dry-run submission")
    parser.add_argument("--submit-only", action="store_true", help="Skip Fetch/Audit and only try to submit existing review")
    parser.add_argument("--event", help="Override submission event (COMMENT, APPROVE, REQUEST_CHANGES)")
    parser.add_argument("--base", help="Specify a custom base branch for comparison (e.g., main)")
    
    args = parser.parse_args()
    pr_num = args.pr_number
    
    review_dir = os.path.join(os.getcwd(), "dev-tools", "logs", "reviews")
    context_file = os.path.join(review_dir, f"pr-context-{pr_num}.md")
    review_file = os.path.join(review_dir, f"pr-review-{pr_num}.md")

    # Handle --submit-only as a special case of bypassing auto
    if args.submit_only:
        subprocess.run(["python3", sys.argv[0], pr_num, "--submit"] + (["--cleanup"] if args.cleanup else []) + (["--dry-run"] if args.dry_run else []), check=True)
        return

    # If no specific stage is requested, default to --auto
    is_auto = args.auto or (not args.fetch and not args.audit and not args.submit)

    if is_auto:
        print(f"🔄 END-TO-END AUTOMATION for PR #{pr_num}")
        # Stage 1: Fetch
        fetch_cmd = ["python3", sys.argv[0], pr_num, "--fetch"]
        if args.base:
            fetch_cmd.extend(["--base", args.base])
        subprocess.run(fetch_cmd, check=True)
        # Stage 2: Audit
        subprocess.run(["python3", sys.argv[0], pr_num, "--audit"], check=True)
        # Stage 3: Submit (force COMMENT for safety if own PR)
        submit_cmd = ["python3", sys.argv[0], pr_num, "--submit"]
        if args.cleanup:
            submit_cmd.append("--cleanup")
        if args.dry_run:
            submit_cmd.append("--dry-run")
        if args.event:
            submit_cmd.extend(["--event", args.event])
        else:
            submit_cmd.extend(["--event", "COMMENT"]) # Default to COMMENT for safety in auto mode
            
        print(f"🚀 Finalizing Stage 3...")
        subprocess.run(submit_cmd, check=True)
        print(f"\n✨ End-to-end review complete for PR #{pr_num}!")
        return

    if args.fetch:
        print(f"🚀 Stage 1: Fetching PR #{pr_num} data (base: {args.base or 'default'})...")
        cmd = ["python3", "dev-tools/fetch_pr_review_data.py", pr_num]
        if args.base:
            cmd.append(args.base)
        run_command(cmd)
        print(f"\n✅ Files generated:")
        print(f"  - Context: {context_file}")
        print(f"  - Template: {review_file}")

    elif args.audit:
        if not os.path.exists(context_file) or not os.path.exists(review_file):
            print(f"❌ Missing review files for PR #{pr_num}. Did you run --fetch?")
            sys.exit(1)
            
        print(f"🚀 Stage 2: Performing AI-automated audit for PR #{pr_num}...")
        
        # Auditor instructions decoupled from script to reduce duplication
        prompt = (
            f"You are the tech-dancer technical auditor. Auditing PR #{pr_num}.\n\n"
            f"1. READ dev-tools/REVIEW_INSTRUCTIONS.md for your core protocol.\n"
            f"2. READ the context in {context_file}\n"
            f"3. MODIFY the review template {review_file} DIRECTLY using the `file_edit` or `write` tools.\n"
            f"   - Mark all checklist items as [x].\n"
            f"   - Fill the JSON block at the bottom with your findings (NO PLACEHOLDERS).\n"
            f"\nDO NOT CREATE NEW FILES. ONLY EDIT {review_file}."
        )
        
        # Construct the copilot command with user-recommended flags
        copilot_cmd = [
            "copilot", "-p", prompt,
            "--allow-tool", "read",
            "--allow-tool", "write",
            "--allow-tool", "file_edit"
        ]
        
        print(f"📡 Invoking Copilot CLI...")
        # Since copilot can be long-running, we use call instead of run_command to show output live
        subprocess.call(copilot_cmd)
        
        print(f"\n✅ AI Audit stage complete.")
        print(f"   Review findings in: {review_file}")

    elif args.submit:
        if not os.path.exists(review_file):
            print(f"❌ Review file not found: {review_file}")
            sys.exit(1)
            
        # Hardening: Clear any existing pending review first
        print(f"🧹 Clearing any existing pending reviews for PR #{pr_num}...")
        res = subprocess.run(["python3", "dev-tools/gh_collab.py", "submit", pr_num, "COMMENT"], 
                       capture_output=True, text=True)
        if res.returncode != 0 and "No pending review" not in res.stderr:
            print(f"⚠️ Warning during pending review cleanup: {res.stderr.strip()}")

        print(f"🚀 Stage 3: Submitting PR #{pr_num} review...")
        cmd = ["python3", "dev-tools/submit_pr_review_data.py", review_file]
        if args.cleanup:
            cmd.append("--cleanup")
        if args.dry_run:
            cmd.append("--dry-run")
        if args.event:
            cmd.append(f"--event={args.event}")
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"❌ Command failed: {' '.join(cmd)}")
            print(f"Error: {result.stderr or result.stdout}")
            sys.exit(1)
        
        print(result.stdout)
        print(f"\n✅ Submission complete for PR #{pr_num}.")

if __name__ == "__main__":
    main()
