# PR Context: #757 — feat: implement agent workflow for resolving PR overlaps
**Author:** @arii

## Description
This PR replaces the manual bash scripts for analyzing overlapping PRs with an automated agent workflow triggered via GitHub Actions.

It introduces a new command `resolve-overlaps` to the central `td_cli.py` which aggregates files touched by multiple PRs and dispatches a Jules API session. This session asks Jules to create a unified branch resolving these conflicts. The functionality is exposed via a new GitHub action that listens for `/review-pr` issue comments.

---
*PR created automatically by Jules for task [13851234057570235125](https://jules.google.com/task/13851234057570235125) started by @arii*

## Files Changed

## Diffs