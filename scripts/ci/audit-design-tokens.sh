#!/usr/bin/env bash
set -e
# Dynamic search for TSX files to avoid hardcoded paths.
VIOLATIONS=$(find . -name "*.tsx" -not -path "*/node_modules/*" -type f | xargs grep -h '#[0-9a-fA-F]\{3,6\}' \
  | grep -vc "design-tokens\|tokens.css\|// impeccable-ignore" || echo 0)
if [ "$VIOLATIONS" -gt 0 ]; then
  echo "⚠️ Found $VIOLATIONS raw hex color(s) in tsx files. Use CSS variables instead."
  find . -name "*.tsx" -not -path "*/node_modules/*" -type f | xargs grep -rn '#[0-9a-fA-F]\{3,6\}' | grep -v "design-tokens\|tokens.css"
  exit 1
fi
echo "✅ Design token compliance passed."
