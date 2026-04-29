#!/bin/bash
set -e

# Ensure we are in the project root
cd "$(dirname "$0")/.."

echo "=== Installing Playwright Chromium and System Deps ==="

export DEBIAN_FRONTEND=noninteractive

# Helper for sudo
run_sudo() {
  if command -v sudo &> /dev/null && sudo -n true 2>/dev/null; then
    sudo "$@"
  else
    echo "⚠️  Warning: sudo not available or requires password. Attempting without sudo..."
    "$@"
  fi
}

npx playwright install chromium
if ! run_sudo npx playwright install-deps chromium; then
  echo "⚠️  Warning: Playwright system dependencies might be missing."
fi

echo "=== Playwright Setup Complete! ==="
