#!/usr/bin/env python3
"""
conflict_detector.py

Detects potential merge conflicts between open PRs before they happen.
Compares file change sets across all open PRs and flags overlaps.

Usage: python3 dev-tools/conflict_detector.py
       python3 dev-tools/conflict_detector.py --pr 231  # Check specific PR against all others
"""
import sys
import argparse
from collections import defaultdict
from github_utils import get_github_token, get_repo_name
from github import Github


def get_pr_files(pr) -> set[str]:
    return {f.filename for f in pr.get_files()}


def detect_conflicts(token: str, repo_name: str, target_pr: int = None):
    g = Github(token)
    repo = g.get_repo(repo_name)
    open_prs = list(repo.get_pulls(state='open'))

    # Build file → PR map
    file_to_prs = defaultdict(list)
    pr_files = {}

    for pr in open_prs:
        files = get_pr_files(pr)
        pr_files[pr.number] = files
        for f in files:
            file_to_prs[f].append(pr.number)

    # Find conflicts
    conflicts = defaultdict(list)
    for filename, prs in file_to_prs.items():
        if len(prs) > 1:
            for pr_num in prs:
                if target_pr is None or pr_num == target_pr or target_pr in prs:
                    conflicts[tuple(sorted(prs))].append(filename)

    if not conflicts:
        print("✅ No potential merge conflicts detected across open PRs.")
        return

    print(f"⚠️  Potential merge conflicts detected:\n")
    for pr_pair, files in conflicts.items():
        prs_str = ' ↔ '.join(f'#{p}' for p in pr_pair)
        print(f"  {prs_str} share {len(files)} file(s):")
        for f in sorted(files)[:10]:
            print(f"    - {f}")
        if len(files) > 10:
            print(f"    ... and {len(files)-10} more")
        print()

    # Suggest merge order
    print("📋 Suggested merge order (merge the PR with fewest shared files first):")
    pr_conflict_count = defaultdict(int)
    for pr_pair, files in conflicts.items():
        for pr_num in pr_pair:
            pr_conflict_count[pr_num] += len(files)

    sorted_prs = sorted(pr_conflict_count.items(), key=lambda x: x[1])
    for pr_num, count in sorted_prs[:5]:
        pr = repo.get_pull(pr_num)
        print(f"  #{pr_num} ({count} conflict files): {pr.title[:50]}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--pr', type=int, help='Check specific PR against all others')
    args = parser.parse_args()

    token = get_github_token()
    repo_name = get_repo_name()
    detect_conflicts(token, repo_name, args.pr)


if __name__ == '__main__':
    main()
