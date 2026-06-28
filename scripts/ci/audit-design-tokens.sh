#!/usr/bin/env bash
set -e
set -o pipefail
# Dynamic search for TSX files to avoid hardcoded paths.
# We use sed instead of grep to avoid non-zero exit codes when no matches are found,
# which ensures compatibility with 'set -o pipefail'.
VIOLATIONS=$(find . -name "*.tsx" -not -path "*/node_modules/*" -type f -print0 | xargs -0 -r sed -n '/#[0-9a-fA-F]\{3,6\}/p' \
  | sed '/design-tokens\|tokens.css\|\/\/ impeccable-ignore/d' | wc -l | tr -d ' ')

if [ "$VIOLATIONS" -gt 0 ]; then
  echo "⚠️ Found $VIOLATIONS raw hex color(s) in tsx files. Use CSS variables instead."
  find . -name "*.tsx" -not -path "*/node_modules/*" -type f -print0 | xargs -0 -r grep -rn '#[0-9a-fA-F]\{3,6\}' | grep -v "design-tokens\|tokens.css"
  exit 1
fi
echo "✅ Design token compliance passed."
