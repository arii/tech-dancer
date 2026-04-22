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
    parser.add_argument("--event", help="Override submission event (COMMENT, APPROVE, REQUEST_CHANGES)")
    
    args = parser.parse_args()
    pr_num = args.pr_number
    
    review_dir = os.path.join(os.getcwd(), "dev-tools", "logs", "reviews")
    context_file = os.path.join(review_dir, f"pr-context-{pr_num}.md")
    review_file = os.path.join(review_dir, f"pr-review-{pr_num}.md")

    # If no specific stage is requested, default to --auto
    is_auto = args.auto or (not args.fetch and not args.audit and not args.submit)

    if is_auto:
        print(f"🔄 END-TO-END AUTOMATION for PR #{pr_num}")
        # Stage 1: Fetch
        subprocess.run(["python3", sys.argv[0], pr_num, "--fetch"], check=True)
        # Stage 2: Audit
        subprocess.run(["python3", sys.argv[0], pr_num, "--audit"], check=True)
        # Stage 3: Submit (force COMMENT for safety if own PR)
        submit_cmd = ["python3", sys.argv[0], pr_num, "--submit"]
        if args.cleanup:
            submit_cmd.append("--cleanup")
        if args.event:
            submit_cmd.extend(["--event", args.event])
        else:
            submit_cmd.extend(["--event", "COMMENT"]) # Default to COMMENT for safety in auto mode
            
        print(f"🚀 Finalizing Stage 3...")
        subprocess.run(submit_cmd, check=True)
        print(f"\n✨ End-to-end review complete for PR #{pr_num}!")
        return

    if args.fetch:
        print(f"🚀 Stage 1: Fetching PR #{pr_num} data...")
        run_command(["python3", "dev-tools/fetch_pr_review_data.py", pr_num])
        print(f"\n✅ Files generated:")
        print(f"  - Context: {context_file}")
        print(f"  - Template: {review_file}")
        print(f"\n👉 STAGE 2: PERFORM TECHNICAL AUDIT")
        print(f"   Option A (Automated): Run this script with --audit")
        print(f"   Option B (Manual): Edit {review_file} manually.")
        print(f"\n👉 STAGE 3: SUBMIT")
        print(f"   Run this script with --submit when finished.")

    elif args.audit:
        if not os.path.exists(context_file) or not os.path.exists(review_file):
            print(f"❌ Missing review files for PR #{pr_num}. Did you run --fetch?")
            sys.exit(1)
            
        print(f"🚀 Stage 2: Performing AI-automated audit for PR #{pr_num}...")
        
        prompt = (
            f"You are a technical auditor for the tech-dancer repository. "
            f"1. Read the PR context in {context_file}\n"
            f"2. Read the review template and PROJECT STANDARDS in {review_file}\n"
            f"3. Perform a rigorous technical audit of the diffs against these standards.\n"
            f"4. Update {review_file}: mark checklist items as [x] and fill the final JSON payload block at the bottom.\n"
            f"Be precise, reference line numbers, and ensure design token compliance."
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
        print(f"   Please review the findings in: {review_file}")
        print(f"   Run with --submit to finalize.")

    elif args.submit:
        if not os.path.exists(review_file):
            print(f"❌ Review file not found: {review_file}")
            print("Did you run with --fetch first?")
            sys.exit(1)
            
        # Hardening: Clear any existing pending review first
        print(f"🧹 Clearing any existing pending reviews for PR #{pr_num}...")
        subprocess.run(["python3", "dev-tools/gh_collab.py", "submit", pr_num, "COMMENT"], 
                       stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)

        print(f"🚀 Stage 3: Submitting PR #{pr_num} review...")
        cmd = ["python3", "dev-tools/submit_pr_review_data.py", review_file]
        if args.cleanup:
            cmd.append("--cleanup")
        if args.event:
            cmd.append(f"--event={args.event}")
        
        result = run_command(cmd)
        print(result)
        print(f"\n✅ Submission complete for PR #{pr_num}.")

    else:
        # Default behavior: if files don't exist, fetch; if they do, prompt for submission
        if not os.path.exists(review_file):
            print(f"No review in progress for PR #{pr_num}. Starting fetch...")
            # Recurse with fetch
            subprocess.run(["python3", sys.argv[0], pr_num, "--fetch"])
        else:
            print(f"Review file exists for PR #{pr_num}: {review_file}")
            choice = input("Submit this review now? (y/n): ")
            if choice.lower() == 'y':
                subprocess.run(["python3", sys.argv[0], pr_num, "--submit"])
            else:
                print("Aborted. You can manually edit the file and run --submit later.")

if __name__ == "__main__":
    main()
