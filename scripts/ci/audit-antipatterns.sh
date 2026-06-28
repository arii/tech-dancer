#!/usr/bin/env bash
set -e
echo "::group::Audit"
trap 'echo "::endgroup::"' EXIT
# Ensure local python bin is on path for td
export PATH="$HOME/.local/bin:/github/home/.local/bin:$PATH"
if ! node scripts/detect-antipatterns.mjs; then echo "Audit failed"; exit 1; fi
td gh audit-gate
