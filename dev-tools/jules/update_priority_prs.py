#!/usr/bin/env python3
"""
Update PRs with changes from the leader branch.
Can update specific PRs/branches provided as arguments, or all open PRs if no arguments are given.
"""

import sys
import os
import argparse
import re
from pathlib import Path

# Add parent directory to path to import common modules
current_dir = Path(__file__).resolve().parent
parent_dir = current_dir.parent
sys.path.insert(0, str(parent_dir))

from common_config import HRM_REPO_DIR, setup_logging, setup_python_path
from github_client import GitHubClient

setup_python_path()
logger = setup_logging("update_prs")

def get_branch_from_arg(client: GitHubClient, arg: str) -> str:
    """Resolve an argument (PR number or branch name) to a branch name."""
    # Check if it looks like a PR number (digits, optionally starting with #)
    if re.match(r'^#?\d+$', arg):
        pr_number = arg.lstrip('#')
        logger.info(f"Resolving PR #{pr_number}...")
        pr_data = client.get_pr(int(pr_number))
        if pr_data and 'headRefName' in pr_data:
            return pr_data['headRefName']
        else:
            logger.error(f"Could not find branch for PR #{pr_number}")
            return None
    return arg

def update_branch(client: GitHubClient, branch: str) -> bool:
    """Update a single branch with leader."""
    logger.info(f"🔄 Processing {branch}...")

    # Check if branch exists locally or remotely
    if not client.branch_exists(branch) and not client.branch_exists(branch, remote=True):
            logger.warning(f"⚠️ Branch {branch} not found locally or on remote, skipping")
            return False

    # Checkout
    if not client.checkout(branch):
            # Try creating tracking branch
            if not client.checkout(branch, create=True, source=f"origin/{branch}"):
                logger.error(f"Could not checkout {branch}")
                return False

    logger.info(f"Pulling {branch}...")
    client.pull("origin", branch)

    logger.info(f"Merging leader into {branch}...")
    if client.merge("leader"):
        logger.info(f"✅ Merge successful, pushing {branch}...")
        if client.push("origin", branch):
                logger.info(f"✅ Updated {branch}")
                return True
        else:
                logger.error(f"❌ Failed to push {branch}")
                return False
    else:
        logger.warning(f"⚠️  Conflicts in {branch} - skipping")
        # Merge is already aborted by client.merge if it fails
        return False

def main():
    parser = argparse.ArgumentParser(description="Update PR branches with changes from leader.")
    parser.add_argument('targets', metavar='TARGET', type=str, nargs='*',
                        help='PR numbers (e.g. 123, #123) or branch names. If empty, updates ALL open PRs.')

    args = parser.parse_args()

    client = GitHubClient(repo_path=HRM_REPO_DIR)

    # Ensure we're on leader
    logger.info("Switching to leader branch...")
    if not client.checkout("leader"):
        logger.error("Failed to checkout leader branch. Aborting.")
        return

    logger.info("Pulling latest leader...")
    if not client.pull("origin", "leader"):
        logger.warning("Could not pull latest leader")

    branches_to_update = []

    if args.targets:
        logger.info(f"Processing {len(args.targets)} specified targets...")
        for target in args.targets:
            branch = get_branch_from_arg(client, target)
            if branch:
                branches_to_update.append(branch)
    else:
        logger.info("No targets specified. Fetching ALL open PRs...")
        open_prs = client.list_prs(state="open", limit=100)
        # Filter out dependabot or specific excluded branches if needed?
        # For now, let's update everything that isn't dependabot to be safe,
        # duplicating the logic from the old script slightly but cleaner.
        for pr in open_prs:
            branch = pr['headRefName']
            if "dependabot" not in branch:
                branches_to_update.append(branch)
        logger.info(f"Found {len(branches_to_update)} open PRs to update.")

    if not branches_to_update:
        logger.info("No branches to update.")
        return

    updated_count = 0
    failed_count = 0

    for branch in branches_to_update:
        if update_branch(client, branch):
            updated_count += 1
        else:
            failed_count += 1

    # Return to leader
    client.checkout("leader")

    logger.info("==================== SUMMARY ====================")
    logger.info(f"Total branches processed: {len(branches_to_update)}")
    logger.info(f"Successfully updated: {updated_count}")
    if failed_count > 0:
        logger.error(f"Failed/Skipped: {failed_count}")

if __name__ == "__main__":
    main()
