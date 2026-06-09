#!/usr/bin/env bash
set -euo pipefail

echo "[STEP] Validating HRM layout..."
python local-dev/validate_hrm_layout.py

echo "[STEP] Running structure analyzer..."
python agent-requests/analyze_structure.py --json || true

echo "[DONE] Workspace checks complete."
