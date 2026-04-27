#!/usr/bin/env python3
"""
agent_status_board.py

Generates a markdown dashboard of all active agent work.
"""

import sys
import re
from github_utils import get_github_token, get_repo_name, get_ci_status, CIFormatter
from github import Github
from collections import defaultdict

def main():
    token = get_github_token()
    repo_name = get_repo_name()
    g = Github(token)
    repo = g.get_repo(repo_name)
    user = g.get_user()
    current_user_login = user.login

    open_prs = list(repo.get_pulls(state='open'))

    # 1. Detect conflicts for all PRs
    file_to_prs = defaultdict(list)
    for pr in open_prs:
        for f in pr.get_files():
            file_to_prs[f.filename].append(pr.number)

    pr_conflicts = defaultdict(list)
    for filename, prs in file_to_prs.items():
        if len(prs) > 1:
            for pr_num in prs:
                other_prs = [p for p in prs if p != pr_num]
                pr_conflicts[pr_num].append(f"{filename} (with {', '.join(f'#{p}' for p in other_prs)})")

    print("# Active Agent Work Board\n")
    print("| Branch | Issue | Agent | Status | CI | Conflicts | Unaddressed Reviews |")
    print("|--------|-------|-------|--------|----|-----------|---------------------|")

    for pr in open_prs:
        branch = pr.head.ref
        issue_match = re.search(r'issue-(\d+)', branch)
        issue = f"#{issue_match.group(1)}" if issue_match else "—"
        agent = pr.user.login
        status = "Draft PR" if pr.draft else "Open PR"

        ci_summary, _ = get_ci_status(repo, pr.head.sha)
        ci_display = CIFormatter.format(ci_summary).split(' ')[0] # Just the icon

        conflicts_list = pr_conflicts.get(pr.number, [])
        conflicts = f"⚠️ {len(conflicts_list)} files" if conflicts_list else "None"

        # Count unaddressed comments from bot
        review_comments = pr.get_review_comments()
        bot_reviews = [r for r in pr.get_reviews() if r.user.login == current_user_login]
        unaddressed_count = 0
        if bot_reviews:
            last_review_time = max(r.submitted_at for r in bot_reviews)
            our_comments = [c for c in review_comments if c.user.login == current_user_login]
            commits_after = [c for c in pr.get_commits() if c.commit.author.date > last_review_time]

            for comment in our_comments:
                replies = [c for c in review_comments if c.in_reply_to_id == comment.id and c.user.login != current_user_login]
                if not replies and not commits_after:
                    unaddressed_count += 1

        unaddressed = str(unaddressed_count) if bot_reviews else "—"

        print(f"| {branch} | {issue} | {agent} | {status} | {ci_display} | {conflicts} | {unaddressed} |")

if __name__ == '__main__':
    main()
