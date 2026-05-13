#!/usr/bin/env bash

# WCS ETL Execution Wrapper
# This script activates the local virtual environment and runs the scraper in a single batch.

set -e

# Navigate to the repository root (relative to this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

# Detect and activate virtual environment
if [ -d ".venv" ]; then
    echo "🔍 Activating .venv..."
    source .venv/bin/activate
elif [ -d "venv" ]; then
    echo "🔍 Activating venv..."
    source venv/bin/activate
else
    echo "⚠️  No virtual environment found. Please run 'python3 -m venv .venv && source .venv/bin/activate && pip install -r etl/requirements.txt'"
    exit 1
fi

# Set PYTHONPATH to repository root for module resolution
export PYTHONPATH="."

# Default Batch Arguments
YEARS=${1:-1}
LIMIT=${2:-10}

echo "🚀 Starting WCS ETL (Years: $YEARS, Limit: $LIMIT)..."
python3 etl/scraper.py --years "$YEARS" --limit "$LIMIT" --queue etl/data/event_queue.json --ledger etl/data/wcs_prelims.parquet

echo "✅ Batch complete."
