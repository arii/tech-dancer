#!/bin/bash
set -e

# Ensure we are in the project root
cd "$(dirname "$0")/.."

echo "=== Starting Minimal Jules Setup (Base) ==="

# Force non-interactive frontend to prevent any hanging prompts
export DEBIAN_FRONTEND=noninteractive

# Helper for tool checks
check_tool() {
  if ! command -v "$1" &> /dev/null; then
    echo "❌ Error: $1 is not installed. Please install it before running this script."
    exit 1
  fi
}

# 0. Tool presence checks
echo "Checking prerequisites..."
check_tool pnpm

# 1. Install Node.js dependencies
echo "Installing Node dependencies..."
if ! pnpm install --frozen-lockfile; then
  echo "❌ Error: pnpm install failed. Check your package.json and pnpm-lock.yaml."
  exit 1
fi

echo "=== Base Jules Setup Complete! ==="
echo "Note: Heavy dependencies (Playwright, Python ETL) are decoupled to reduce snapshot size."
echo "Refer to AGENTS.md for on-demand setup scripts: setup-playwright.sh, setup-python.sh."
