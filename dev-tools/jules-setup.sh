#!/bin/bash
set -e

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
# Jules pre-installs Python 3.12+ and pip, but we still want an isolated venv
echo "Setting up Python virtual environment..."
python3 -m venv .venv
source .venv/bin/activate
pip install -r etl/requirements.txt

# Alternatively, since `uv` is preinstalled on Jules, you could also do:
# uv venv
# source .venv/bin/activate
# uv pip install -r etl/requirements.txt

echo "=== Jules Setup Complete! ==="
