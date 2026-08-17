#!/usr/bin/env bash
# Centralized CLI path resolution for BoomTick / Tech Dancer.
# Returns the absolute path to the CLI directory.

# Find repo root if not provided
REPO_ROOT="${REPO_ROOT:-$(git rev-parse --show-toplevel 2>/dev/null || pwd -P)}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"

# Helper function to check if a directory is a valid CLI directory containing pyproject.toml or setup.py
is_cli_dir() {
    local dir="$1"
    if [ -n "$dir" ] && [ -d "$dir" ] && { [ -f "$dir/pyproject.toml" ] || [ -f "$dir/setup.py" ]; }; then
        return 0
    fi
    return 1
}

if is_cli_dir "${REPO_ROOT}/boomtick-pkg/cli"; then
    printf "%s\n" "${REPO_ROOT}/boomtick-pkg/cli"
elif is_cli_dir "${REPO_ROOT}/cli"; then
    printf "%s\n" "${REPO_ROOT}/cli"
elif is_cli_dir "${SCRIPT_DIR}/../boomtick-pkg/cli"; then
    printf "%s\n" "${SCRIPT_DIR}/../boomtick-pkg/cli"
elif is_cli_dir "${SCRIPT_DIR}/../cli"; then
    printf "%s\n" "${SCRIPT_DIR}/../cli"
else
    # Check for GHA runner remote action paths (_actions/arii/boomtick/*)
    ACTION_CLI=""
    for candidate in /home/runner/work/_actions/arii/boomtick/*; do
        if is_cli_dir "$candidate/cli"; then
            ACTION_CLI="$candidate/cli"
            break
        elif is_cli_dir "$candidate/boomtick-pkg/cli"; then
            ACTION_CLI="$candidate/boomtick-pkg/cli"
            break
        fi
    done

    if [ -n "$ACTION_CLI" ]; then
        printf "%s\n" "$ACTION_CLI"
    elif is_cli_dir "$(pwd -P)"; then
        printf "%s\n" "$(pwd -P)"
    else
        echo "Error: Could not resolve CLI_ROOT" >&2
        exit 1
    fi
fi
