#!/bin/bash

# Pre-commit hook to verify Git identity
EXPECTED_NAME="Antigravity Agent"
EXPECTED_EMAIL="ariandersrobotics@gmail.com"

# Read current local config or environment variables
CURRENT_NAME=$(git config user.name)
CURRENT_EMAIL=$(git config user.email)

# Alternatively check environment variables if they are set
if [ -n "$GIT_AUTHOR_NAME" ]; then
    CURRENT_NAME="$GIT_AUTHOR_NAME"
fi
if [ -n "$GIT_AUTHOR_EMAIL" ]; then
    CURRENT_EMAIL="$GIT_AUTHOR_EMAIL"
fi

if [ "$CURRENT_NAME" != "$EXPECTED_NAME" ] || [ "$CURRENT_EMAIL" != "$EXPECTED_EMAIL" ]; then
    echo "ERROR: Invalid Git identity for this workspace."
    echo "Expected: $EXPECTED_NAME <$EXPECTED_EMAIL>"
    echo "Found:    $CURRENT_NAME <$CURRENT_EMAIL>"
    echo "Please ensure you are using the Antigravity Agent profile."
    exit 1
fi

# Prevent commits to main
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" == "main" ] || [ "$BRANCH" == "master" ]; then
    echo "ERROR: Direct commits to $BRANCH are disabled. Please use a feature branch."
    exit 1
fi

exit 0
