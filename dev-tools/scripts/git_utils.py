#!/usr/bin/env python3
import sys
import subprocess

def run_command(cmd, check=True):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, text=True, capture_output=True)
    if result.returncode != 0:
        print(f"[ERROR] Command failed: {' '.join(cmd)}")
        print(result.stderr)
        if check:
            sys.exit(result.returncode)
    return result

def sync_branch(base_branch="main"):
    print("Fetching latest changes from origin...")
    run_command(["git", "fetch", "origin"])

    print(f"Rebasing current branch onto origin/{base_branch}...")
    run_command(["git", "rebase", f"origin/{base_branch}"])

    print("Force pushing to the remote branch...")
    run_command(["git", "push", "-f"])

    print("Branch synced successfully!")

def check_workspace():
    print("[STEP] Validating git workspace...")
    result = run_command(["git", "diff-index", "--quiet", "HEAD", "--"], check=False)
    if result.returncode != 0:
        print("[ERROR] Uncommitted changes found. Please commit or stash before proceeding.")
        sys.exit(1)
    print("[DONE] Workspace is clean.")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        args = sys.argv[2:]
        if cmd == "sync":
            sync_branch(*args)
        elif cmd == "check":
            check_workspace()
        else:
            print(f"Usage: {sys.argv[0]} {{sync|check}}")
            sys.exit(1)
