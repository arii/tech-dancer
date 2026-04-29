#!/bin/bash
set -e

# Ensure we are in the project root
cd "$(dirname "$0")/.."

echo "=== Starting Custom Jules Setup ==="

# Force non-interactive frontend to prevent any hanging prompts
export DEBIAN_FRONTEND=noninteractive
# Suppress uv progress bars and use system python
export UV_NO_PROGRESS=true
export UV_SYSTEM_PYTHON=1

# 1. Install Node.js dependencies
echo "Installing Node dependencies..."
# Use --frozen-lockfile to avoid unexpected lockfile prompt freezes
pnpm install --frozen-lockfile

# 2. Install Playwright browsers
echo "Installing Playwright browsers..."
# Installing ONLY Chromium saves massive bandwidth and time.
npx playwright install chromium

# 3. Install Playwright system dependencies
echo "Installing Playwright system dependencies..."
# This requires sudo. Jules environment handles this typically.
sudo npx playwright install-deps chromium

# 4. Setup Python ETL environment
echo "Installing Python dependencies (System)..."
# Installing to system python directly since Jules environment is isolated
uv pip install -r etl/requirements.txt

echo "=== Jules Setup Complete! ==="
