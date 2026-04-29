#!/bin/bash
set -e

# Ensure we are in the project root
cd "$(dirname "$0")/.."

echo "=== Setting up Python ETL Environment ==="

# Prefer uv for speed if available
if command -v uv &> /dev/null; then
  echo "Using uv for installation..."
  uv venv .venv
  source .venv/bin/activate
  uv pip install -r etl/requirements.txt
else
  echo "uv not found, using python -m venv..."
  python3 -m venv .venv
  source .venv/bin/activate
  pip install -r etl/requirements.txt
fi

echo "=== Python Setup Complete! ==="
