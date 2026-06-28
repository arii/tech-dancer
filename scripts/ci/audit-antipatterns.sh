#!/usr/bin/env bash
set -e
set -o pipefail
echo "::group::Audit"
trap 'echo "::endgroup::"' EXIT
if ! node scripts/detect-antipatterns.mjs; then echo "Audit failed"; fi
td gh audit-gate
