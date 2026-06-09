#!/usr/bin/env bash

set -e

sync_branch() {
    local base_branch="${1:-main}"
    echo "Fetching latest changes from origin..."
    git fetch origin

    echo "Rebasing current branch onto origin/${base_branch}..."
    git rebase "origin/${base_branch}"

    echo "Force pushing to the remote branch..."
    git push -f

    echo "Branch synced successfully!"
}

check_workspace() {
    echo "[STEP] Validating git workspace..."
    if ! git diff-index --quiet HEAD --; then
        echo "[ERROR] Uncommitted changes found. Please commit or stash before proceeding."
        return 1
    fi
    echo "[DONE] Workspace is clean."
}

# If the script is run directly with arguments, execute the function
if [[ "${BASH_SOURCE[0]}" == "${0}" ]] && [[ $# -gt 0 ]]; then
    cmd="$1"
    shift
    case "$cmd" in
        sync)
            sync_branch "$@"
            ;;
        check)
            check_workspace
            ;;
        *)
            echo "Usage: $0 {sync|check}"
            return 1
            ;;
    esac
fi
