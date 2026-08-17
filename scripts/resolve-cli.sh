#!/usr/bin/env bash
# Centralized CLI path resolution for BoomTick / Tech Dancer.
# Returns the absolute path to the CLI directory.

# Find repo root if not provided
REPO_ROOT="${REPO_ROOT:-$(git rev-parse --show-toplevel 2>/dev/null || pwd -P)}"

# Check relative to SCRIPT_DIR first for remote action context execution
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"

if [ -d "${REPO_ROOT}/boomtick-pkg/cli" ]; then
    printf "%s\n" "${REPO_ROOT}/boomtick-pkg/cli"
elif [ -d "${REPO_ROOT}/cli" ]; then
    printf "%s\n" "${REPO_ROOT}/cli"
elif [ -d "${SCRIPT_DIR}/../boomtick-pkg/cli" ]; then
    printf "%s\n" "${SCRIPT_DIR}/../boomtick-pkg/cli"
elif [ -d "${SCRIPT_DIR}/../cli" ]; then
    printf "%s\n" "${SCRIPT_DIR}/../cli"
else
    # Fallback to REPO_ROOT or SCRIPT_DIR/.. if pyproject.toml is in present directory or parent directory
    if [ -f "pyproject.toml" ]; then
        printf "%s\n" "$(pwd -P)"
    elif [ -f "${REPO_ROOT}/pyproject.toml" ]; then
        printf "%s\n" "${REPO_ROOT}"
    elif [ -f "${SCRIPT_DIR}/../pyproject.toml" ]; then
        printf "%s\n" "$(cd "${SCRIPT_DIR}/.." && pwd -P)"
    else
        # Fallback to REPO_ROOT or current working directory to avoid breaking setup-workspace when CLI is installed via PyPI
        printf "%s\n" "${REPO_ROOT}"
    fi
fi
