#!/bin/bash
set -e

# Ensure we are in the project root
cd "$(dirname "$0")/.."

echo "=== Installing Playwright Chromium and System Deps ==="

export DEBIAN_FRONTEND=noninteractive

# Helper for tool checks
check_tool() {
  if ! command -v "$1" &> /dev/null; then
    echo "❌ Error: $1 is not installed. Please run ./dev-tools/snapshot.sh first or install it manually."
    exit 1
  fi
}

# Helper for sudo
run_sudo() {
  if command -v sudo &> /dev/null && sudo -n true 2>/dev/null; then
    sudo "$@"
  else
    echo "⚠️  Warning: sudo not available or requires password. Attempting without sudo..."
    "$@"
  fi
}

check_tool npx

echo "Installing Chromium browser..."
if ! npx playwright install chromium; then
  echo "❌ Error: Playwright browser installation failed."
  exit 1
fi

echo "Installing system dependencies..."
if ! run_sudo npx playwright install-deps chromium; then
  echo "⚠️  Warning: Playwright system dependencies might be missing. E2E tests may fail if libraries are not pre-installed."
fi

echo "=== Playwright Setup Complete! ==="
