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

def is_churn(filename, pr_title):
    pr_title_lower = pr_title.lower()
    
    # If the PR is specifically about workflows, don't treat them as churn
    if ".github/workflows/" in filename:
        if "workflow" in pr_title_lower or "ci" in pr_title_lower or "action" in pr_title_lower:
            return False
            
    # If the PR is about data/etl, don't treat data files as churn
    if "etl/data/" in filename or filename.endswith(".parquet"):
        if "data" in pr_title_lower or "etl" in pr_title_lower or "parquet" in pr_title_lower:
            return False

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
        # Use checkout --force to ignore untracked file conflicts
        run_cmd(["git", "checkout", "-f", branch])
        
        # 1. Squash preparation
        base = "origin/main"
        # Fetch latest main to ensure we are squashing onto the right base
        run_cmd(["git", "fetch", "origin", "main"])
        merge_base = run_cmd(["git", "merge-base", "HEAD", base])
        
        changed_files = get_changed_files(base, "HEAD")
        print(f"Files changed: {len(changed_files)}")

        # 2. Filter scope & Fix conflicts
        # Revert churn files to main version
        for f in changed_files:
            if is_churn(f, title):
                print(f"Reverting churn file: {f}")
                run_cmd(["git", "checkout", base, "--", f], check=False)

        # 3. Squash onto main
        # This handles the 'squash all commits' and 'simplify merge conflicts' requirement
        # by effectively overwriting any conflicting versions in the branch with the branch's intent
        # but the base is current origin/main.
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
    for pr in prs:
        process_pr(pr)

if __name__ == "__main__":
    main()
