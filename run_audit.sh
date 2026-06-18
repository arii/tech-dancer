#!/bin/bash
export HEADLESS=1
for pr in $(gh pr list --state open --json number -q '.[].number'); do
  echo "Auditing PR $pr"
  python3 dev-tools/td_cli.py gh audit-pr $pr --fetch --audit --submit --cleanup --execute
done
