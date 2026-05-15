import subprocess
import json
import os
import re

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

def get_relevancy_score(filename, pr_title, pr_body):
    """
    Check if a file is likely relevant to the PR based on title and body.
    """
    content = (pr_title + " " + (pr_body or "")).lower()
    
    # Extract potential keywords from filename
    name_parts = re.split(r'[/._-]', filename.lower())
    
    # High confidence keywords
    for part in name_parts:
        if len(part) > 3 and part in content:
            return True
            
    # Check for direct mentions of the file path or name
    if filename.lower() in content:
        return True
    
    basename = os.path.basename(filename).lower()
    if basename in content:
        return True

    # Special cases for common structures
    if "src/features/" in filename:
        feature_name = filename.split("/")[2]
        if feature_name.lower() in content:
            return True
            
    # Config files/package.json/lockfiles are usually churn unless explicitly mentioned
    if filename in ["package.json", "pnpm-lock.yaml", "tsconfig.json"]:
        if any(kw in content for kw in ["package", "dependency", "install", "npm", "pnpm"]):
            return True
        return False
        
    return False

def process_pr(pr):
    num = pr["number"]
    branch = pr["headRefName"]
    title = pr["title"]
    body = pr["body"]
    print(f"\n--- Processing PR #{num}: {title} (Branch: {branch}) ---")

    try:
        # Switch to branch
        run_cmd(["git", "checkout", "-f", branch])
        
        base = "origin/main"
        run_cmd(["git", "fetch", "origin", "main"])
        
        # Get list of all files changed relative to main
        all_changed = get_changed_files(base, "HEAD")
        
        # Identify files to keep and files to revert
        to_keep = []
        to_revert = []
        
        for f in all_changed:
            # Always keep files in the same directory as the main feature if the feature is mentioned
            if get_relevancy_score(f, title, body):
                to_keep.append(f)
            else:
                to_revert.append(f)
                
        print(f"Total files changed: {len(all_changed)}")
        print(f"Keeping: {len(to_keep)}")
        print(f"Reverting: {len(to_revert)}")

        # Revert unrelated files
        if to_revert:
            # Process in batches to avoid command line length limits
            batch_size = 50
            for i in range(0, len(to_revert), batch_size):
                batch = to_revert[i:i + batch_size]
                run_cmd(["git", "checkout", base, "--"] + batch, check=False)

        # Squash:
        # Reset to main's head, but keep the changes in the index
        run_cmd(["git", "reset", "--soft", base])
        
        # Re-add everything (which now only includes the kept files)
        run_cmd(["git", "add", "."])
        
        # Check status
        status = run_cmd(["git", "status", "--porcelain"])
        if status:
            run_cmd(["git", "commit", "-m", title])
            print(f"Pushing squashed and cleaned branch {branch}...")
            run_cmd(["git", "push", "-f", "origin", branch])
            print(f"PR #{num} processed successfully.")
        else:
            print(f"Skipping PR #{num} - no changes remaining after cleanup.")

    except Exception as e:
        print(f"Failed to process PR #{num}: {e}")

if __name__ == "__main__":
    prs = get_open_prs()
    # Ensure we are not on a branch that will be deleted/modified
    subprocess.run(["git", "checkout", "main"], capture_output=True)
    for pr in prs:
        process_pr(pr)
    run_cmd(["git", "checkout", "main"])
