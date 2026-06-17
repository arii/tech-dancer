#!/bin/bash
set -e

# Handle Git LFS if needed, though usually pre-baked
# git lfs install --skip-repo > /dev/null 2>&1 || true

# Mark the workspace as safe to prevent "dubious ownership" errors in CI
if [ -n "$GITHUB_WORKSPACE" ]; then
    git config --global --add safe.directory "$GITHUB_WORKSPACE"
fi

# Pass control to the CMD
exec "$@"
