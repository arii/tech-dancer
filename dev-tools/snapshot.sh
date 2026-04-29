#!/bin/bash
set -e

# Ensure we are in the project root
cd "$(dirname "$0")/.."

echo "=== Starting Custom Jules Setup ==="

# 1. Install Node.js dependencies
echo "Installing Node dependencies..."
# Jules pre-installs pnpm 10.x, so we can use it directly
pnpm install

# 2. Install Playwright browsers
# Required for Playwright testing and the WCS ETL scraper
echo "Installing Playwright browsers and dependencies..."
npx playwright install chromium --with-deps

# 3. Setup Python ETL environment
# Since `uv` is preinstalled on Jules, we use it for faster setup
echo "Setting up Python virtual environment..."
# Remove existing .venv to ensure a clean setup if the script is re-run
rm -rf .venv
uv venv
source .venv/bin/activate
uv pip install -r etl/requirements.txt

echo "=== Jules Setup Complete! ==="
