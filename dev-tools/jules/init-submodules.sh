#!/usr/bin/env bash
set -euo pipefail

# Initialize and update submodules if needed
if git submodule status >/dev/null 2>&1; then
  echo "[INFO] Checking submodule status..."
  status=$(git submodule status || true)
  echo "$status"
else
  echo "[ERROR] Not a git repository or submodules unsupported here."
  exit 1
fi

echo "[INFO] Initializing and updating submodules..."
git submodule update --init --recursive
echo "[OK] Submodules initialized."
