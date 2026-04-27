#!/bin/bash
# dev-tools/pre-submit-check.sh
# Run all quality gates before any PR submission or push

set -e

echo "🔍 Running pre-submission checks..."

# 1. Anti-pattern audit
echo "--- Step 1: Anti-Pattern Audit ---"
pnpm run audit || true
VIOLATIONS=$(grep -c '\- \[ \]' TODO_ANTIPATTERNS.md || echo 0)
echo "Current violations in scope: $VIOLATIONS"

# 2. TypeScript check
echo "--- Step 2: TypeScript ---"
pnpm run type-check

# 3. Lint
echo "--- Step 3: Lint ---"
pnpm run lint

# 4. Check for import React (React 17+ violation)
echo "--- Step 4: React Import Check ---"
REACT_IMPORTS=$(grep -rn "^import React from 'react'" src --include="*.tsx" | wc -l)
if [ "$REACT_IMPORTS" -gt 0 ]; then
  echo "⚠️ Found unnecessary 'import React' statements:"
  grep -rn "^import React from 'react'" src --include="*.tsx"
fi

# 5. Check for HashRouter usage (banned per AGENTS.md)
echo "--- Step 5: Router Check ---"
if grep -rn "HashRouter" src --include="*.tsx" --include="*.ts"; then
  echo "❌ HashRouter usage found. Use BrowserRouter (createBrowserRouter) instead."
  exit 1
fi

# 6. Check for hardcoded colors in new/modified tsx files
echo "--- Step 6: Token Compliance (modified files) ---"
MODIFIED=$(git diff --cached --name-only --diff-filter=ACM | grep '\.tsx$' || true)
if [ -n "$MODIFIED" ]; then
  for file in $MODIFIED; do
    if grep -n 'text-\[' "$file" | grep -v 'impeccable-ignore'; then
      echo "⚠️ Arbitrary Tailwind value in $file"
    fi
  done
fi

echo "✅ Pre-submission checks passed."
