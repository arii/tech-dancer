import subprocess
import json
import os
import sys

def run_cmd(cmd, check=True):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if check and result.returncode != 0:
        print(f"Error: {result.stderr}")
        raise Exception(f"Command failed: {' '.join(cmd)}")
    return result.stdout.strip()

def get_open_prs():
    output = run_cmd(["gh", "pr", "list", "--state", "open", "--json", "number,headRefName,title,body"])
    return json.loads(output)

def get_changed_files(base, head):
    output = run_cmd(["git", "diff", "--name-only", f"{base}...{head}"])
    return output.splitlines()

def is_churn(filename):
    churn_patterns = [
        ".github/workflows/",
        "pnpm-lock.yaml",
        "etl/data/wcs_prelims.parquet",
        "etl/data/event_queue.json",
        "dev-tools/logs/",
    ]
    for pattern in churn_patterns:
        if filename.startswith(pattern) or filename == pattern:
            return True
    return False

def process_pr(pr):
    num = pr["number"]
    branch = pr["headRefName"]
    title = pr["title"]
    print(f"\n--- Processing PR #{num}: {title} (Branch: {branch}) ---")

    try:
        run_cmd(["git", "checkout", branch])
        
        # 1. Squash
        base = "origin/main"
        merge_base = run_cmd(["git", "merge-base", "HEAD", base])
        
        # Check if there are commits to squash
        commits = run_cmd(["git", "log", "--oneline", f"{merge_base}..HEAD"])
        if not commits:
            print("No new commits on this branch relative to main.")
            # Still might need to rebase/filter
        
        changed_files = get_changed_files(base, "HEAD")
        print(f"Files changed: {len(changed_files)}")

        # 2. Filter scope & Fix conflicts
        # Revert churn files to main version
        for f in changed_files:
            if is_churn(f):
                print(f"Reverting churn file: {f}")
                run_cmd(["git", "checkout", base, "--", f], check=False)

        # Re-commit if anything changed due to filtering
        status = run_cmd(["git", "status", "--porcelain"])
        if status:
            run_cmd(["git", "add", "."])
            run_cmd(["git", "commit", "-m", f"Cleanup churn and squash: {title}"], check=False)

        # 3. Final Squash onto main
        # We want one commit on top of current origin/main
        run_cmd(["git", "reset", "--soft", base])
        run_cmd(["git", "add", "."])
        # Check if there's anything to commit
        if run_cmd(["git", "status", "--porcelain"]):
            run_cmd(["git", "commit", "-m", title])
        else:
            print("No changes remaining after cleanup.")
            return

        # 4. Push
        print(f"Pushing squashed and cleaned branch {branch}...")
        run_cmd(["git", "push", "-f", "origin", branch])
        print(f"PR #{num} processed successfully.")

    except Exception as e:
        print(f"Failed to process PR #{num}: {e}")

def main():
    prs = get_open_prs()
    # Filter for the PRs we care about if needed, or do all
    for pr in prs:
        process_pr(pr)

if __name__ == "__main__":
    main()
