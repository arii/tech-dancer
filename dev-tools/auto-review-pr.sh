#!/bin/bash
# auto-review-pr.sh
# Bash wrapper for the Python PR Review Orchestrator

python3 "$(dirname "$0")/auto_review_pr.py" "$@"
