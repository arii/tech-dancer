#!/usr/bin/env bash
set -e
set -o pipefail
echo "::group::Audit"
trap 'echo "::endgroup::"' EXIT
# Use the direct path to td_cli.py and set PYTHONPATH to include core CLI packages
export PYTHONPATH="boomtick-pkg/cli:boomtick-pkg/cli/dev_tools:$PYTHONPATH"
if ! node scripts/detect-antipatterns.mjs; then echo "Audit failed"; exit 1; fi
python3 boomtick-pkg/cli/dev_tools/td_cli.py gh audit-gate
