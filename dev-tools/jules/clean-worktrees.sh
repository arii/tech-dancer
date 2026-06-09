#!/usr/bin/env bash
set -euo pipefail

WORKSPACE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKTREES_BASE="${WORKSPACE_ROOT}/worktrees"
REPO_DIR="${WORKSPACE_ROOT}/hrm"

echo "[INFO] Cleaning up worktrees..."

# Prune stale worktree references
if [ -d "${REPO_DIR}" ]; then
  echo "[INFO] Pruning stale worktree references..."
  cd "${REPO_DIR}"
  git worktree prune
  echo "[OK] Pruned stale references."
fi

# Remove worktrees directory if it exists
if [ -d "${WORKTREES_BASE}" ]; then
  echo "[INFO] Removing worktrees directory: ${WORKTREES_BASE}"
  rm -rf "${WORKTREES_BASE}"
  echo "[OK] Removed worktrees directory."
else
  echo "[INFO] No worktrees directory found at: ${WORKTREES_BASE}"
fi

# Recreate empty worktrees directory
mkdir -p "${WORKTREES_BASE}"
echo "[OK] Created fresh worktrees directory."

echo "[DONE] Worktrees cleanup complete."
