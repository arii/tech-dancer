#!/usr/bin/env python3
"""
PR Review Manager
Automatically determines PR review state (Needs Review, Needs Re-Review, Up-to-Date)
includes CI check outcomes, and cleans up previous tool comments on PRs to reduce spam.
Uses PyGithub for cross-platform compatibility.
"""

import argparse
import logging
import sys
from github import Github, GithubException
from github_utils import get_github_token, get_repo_name, get_ci_status, get_ci_icon

# Setup Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger("pr_review_manager")

def process_pull_requests(token: str, repo_name: str, dry_run: bool, cleanup_comments: bool) -> None:
    g = Github(token)
    try:
        user = g.get_user()
        current_user_login = user.login
        logger.info(f"Authenticated as: {current_user_login}")
    except GithubException as e:
        logger.error(f"Failed to authenticate: {e}")
        sys.exit(1)

    try:
        repo = g.get_repo(repo_name)
    except GithubException as e:
        logger.error(f"Failed to get repo {repo_name}: {e}")
        sys.exit(1)

    prs = repo.get_pulls(state='open', sort='updated', direction='desc')

    found_any = False
    for pr in prs:
        found_any = True
        pr_number = pr.number
        pr_title = pr.title
        latest_commit_sha = pr.head.sha

        # 1. Comment Cleanup - Only delete comments with the tool's marker
        if cleanup_comments:
            comments = pr.get_issue_comments()
            for comment in comments:
                if comment.user.login == current_user_login and "<!-- td-review-manager-comment -->" in comment.body:
                    if dry_run:
                        logger.info(f"[DRY-RUN] Would delete tool comment {comment.id} on PR #{pr_number}")
                    else:
                        comment.delete()
                        logger.warning(f"Deleted tool comment {comment.id} on PR #{pr_number}")

        # 2. Review State Analysis
        # Fetch reviews and find the most recent one from the current user
<<<<<<< HEAD
        # Utilizes .reversed property on the paginated list for efficiency
        last_review = next((r for r in pr.get_reviews().reversed if r.user.login == current_user_login), None)
=======
        # reversed(pr.get_reviews()) is an efficient way to find the latest review with PyGithub's PaginatedList
        last_review = next((r for r in reversed(pr.get_reviews()) if r.user.login == current_user_login), None)
>>>>>>> 2e4fd95 (final refactor of dev-tools with ci health and re-review tracking)

        if not last_review:
            status = "ACTION: Needs Initial Review"
        else:
            reviewed_commit = last_review.commit_id

            if reviewed_commit != latest_commit_sha:
                status = f"ACTION: Needs Re-Review (Updated from {reviewed_commit[:7]} to {latest_commit_sha[:7]})"
            else:
                status = "STATE: Review Up-To-Date"

        # 3. CI Check Outcomes
        ci_summary, _ = get_ci_status(repo, latest_commit_sha)
        ci_icon = get_ci_icon(ci_summary)

        print(f"[PR #{pr_number}] {pr_title}")
        print(f"  ├── {status}")
        print(f"  └── CI: {ci_icon} {ci_summary}\n")

    if not found_any:
        logger.info("No open pull requests found.")

def main():
    parser = argparse.ArgumentParser(description="Principled PR Review Tracker and Comment Cleaner")
    parser.add_argument(
        "--execute",
        action="store_true",
        help="WARNING: Disables dry-run and permanently deletes previous tool comments."
    )
    parser.add_argument(
        "--skip-cleanup",
        action="store_true",
        help="Skip analyzing and deleting old tool comments entirely."
    )
    parser.add_argument(
        "--repo",
        help="Target repository in 'owner/repo' format. Auto-detected if omitted."
    )
    parser.add_argument(
        "--token",
        help="GitHub Personal Access Token. Defaults to GITHUB_TOKEN environment variable."
    )

    args = parser.parse_args()

    token = args.token or get_github_token()
    if not token:
        logger.error("GitHub token not found. Set GITHUB_TOKEN or pass --token.")
        sys.exit(1)

    repo_name = args.repo or get_repo_name()
    if not repo_name:
        logger.error("Could not detect repository name. Use --repo.")
        sys.exit(1)

    is_dry_run = not args.execute

    if is_dry_run and not args.skip_cleanup:
        logger.info("Starting in DRY-RUN mode. No comments will be deleted. Pass --execute to apply changes.")

    process_pull_requests(
        token=token,
        repo_name=repo_name,
        dry_run=is_dry_run,
        cleanup_comments=not args.skip_cleanup
    )

if __name__ == "__main__":
    main()
