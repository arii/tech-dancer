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
from datetime import datetime, timezone, timedelta
from github import Github, GithubException
from github_utils import get_github_token, get_repo_name, get_ci_status, CIFormatter

# Setup Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger("pr_review_manager")

def check_review_responses(repo, pr, current_user_login: str) -> list[dict]:
    """
    For each review comment the bot left, check if:
    - The author replied (engaged)
    - A new commit was pushed after the comment
    - The thread was resolved
    """
    unaddressed = []
    reviews = pr.get_reviews()
    bot_reviews = [r for r in reviews if r.user.login == current_user_login]

    if not bot_reviews:
        return []

    # Get inline comments from our reviews
    review_comments = pr.get_review_comments()
    our_comments = [c for c in review_comments if c.user.login == current_user_login]

    # Get commits after our last review
    last_review_time = max(r.submitted_at for r in bot_reviews)
    commits_after = [c for c in pr.get_commits() if c.commit.author.date > last_review_time]

    for comment in our_comments:
        # Check for reply in the thread
        replies = [c for c in review_comments
                   if c.in_reply_to_id == comment.id
                   and c.user.login != current_user_login]

        has_commits_after = len(commits_after) > 0
        has_reply = len(replies) > 0

        if not has_commits_after and not has_reply:
            unaddressed.append({
                'comment_id': comment.id,
                'path': comment.path,
                'line': comment.position,
                'body_preview': comment.body[:80],
                'url': comment.html_url
            })

    return unaddressed

def check_stale_reviews(repo, current_user_login: str, stale_days: int = 3):
    """Flag PRs where we requested changes but nothing happened."""
    stale_prs = []
    for pr in repo.get_pulls(state='open'):
        reviews = list(pr.get_reviews())
        our_reviews = [r for r in reviews if r.user.login == current_user_login]

        if not our_reviews:
            continue

        last_review = max(our_reviews, key=lambda r: r.submitted_at)
        if last_review.state != 'CHANGES_REQUESTED':
            continue

        commits_after = [c for c in pr.get_commits()
                        if c.commit.author.date > last_review.submitted_at]

        age = datetime.now(timezone.utc) - last_review.submitted_at
        if age > timedelta(days=stale_days) and not commits_after:
            stale_prs.append({
                'number': pr.number,
                'title': pr.title,
                'days': age.days
            })
    return stale_prs

def process_pull_requests(token: str, repo_name: str, dry_run: bool, cleanup_comments: bool, check_responses: bool = False) -> None:
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
        # Utilizes .reversed property on the paginated list for efficiency
        last_review = next((r for r in pr.get_reviews().reversed if r.user.login == current_user_login), None)

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
        ci_display = CIFormatter.format(ci_summary)

        print(f"[PR #{pr_number}] {pr_title}")
        print(f"  ├── {status}")
        print(f"  └── CI: {ci_display}")

        if check_responses:
            unaddressed = check_review_responses(repo, pr, current_user_login)
            if unaddressed:
                print(f"  └── ⚠️ UNADDRESSED COMMENTS ({len(unaddressed)}):")
                for u in unaddressed:
                    print(f"       - {u['path']}:{u['line']} \"{u['body_preview']}...\" → {u['url']}")
        print()

    if check_responses:
        logger.info("Checking for stale reviews...")
        stale = check_stale_reviews(repo, current_user_login)
        for s in stale:
            print(f"⏰ STALE: PR #{s['number']} '{s['title'][:40]}' — Changes requested {s['days']} days ago, no response.")

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
        "--check-responses",
        action="store_true",
        help="Check if agents addressed review comments and find stale reviews."
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
        cleanup_comments=not args.skip_cleanup,
        check_responses=args.check_responses
    )

if __name__ == "__main__":
    main()
