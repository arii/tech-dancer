#!/bin/bash
set -e

# Ensure we are in the project root
cd "$(dirname "$0")/.."

echo "=== Starting Custom Jules Setup ==="

# Force non-interactive frontend to prevent any hanging prompts
export DEBIAN_FRONTEND=noninteractive
export UV_NO_PROGRESS=true

# Helper for tool checks
check_tool() {
  if ! command -v "$1" &> /dev/null; then
    echo "❌ Error: $1 is not installed. Please install it before running this script."
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

# 0. Tool presence checks
echo "Checking prerequisites..."
check_tool pnpm
check_tool npx
check_tool uv

# 1. Install Node.js dependencies
echo "Installing Node dependencies..."
if ! pnpm install --frozen-lockfile; then
  echo "❌ Error: pnpm install failed. Check your package.json and pnpm-lock.yaml."
  exit 1
fi

# 2. Install Playwright browsers
echo "Installing Playwright browsers (Chromium)..."
if ! npx playwright install chromium; then
  echo "❌ Error: Playwright browser installation failed."
  exit 1
fi

# 3. Install Playwright system dependencies
echo "Installing Playwright system dependencies..."
if ! run_sudo npx playwright install-deps chromium; then
  echo "⚠️  Warning: Playwright system dependencies might be missing. E2E tests may fail."
fi

# 4. Setup Python ETL environment
echo "Setting up Python virtual environment..."
rm -rf .venv
if ! uv venv .venv; then
  echo "❌ Error: Failed to create virtual environment."
  exit 1
fi

source .venv/bin/activate

echo "Installing Python dependencies..."
if ! uv pip install -r etl/requirements.txt; then
  echo "❌ Error: Failed to install Python requirements."
  exit 1
fi

echo "=== Jules Setup Complete! ==="
