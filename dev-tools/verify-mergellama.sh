#!/bin/bash
# verify-mergellama.sh - Local verification script for MergeLlama resolution plumbing

set -e

# Ensure we are in the project root
cd "$(dirname "$0")/.."

TEST_FILE="src/test-mergellama-conflict.tsx"

echo "🧪 Starting local MergeLlama verification..."

# 1. Create a test conflict file
cat > "$TEST_FILE" <<EOF
import React from 'react';

export const ConflictComponent = () => {
<<<<<<< HEAD
  return <div>Hello from HEAD (Main)</div>;
=======
  return <div>Hello from Feature Branch</div>;
>>>>>>> feature-branch
};
EOF

echo "📝 Created test file: $TEST_FILE"

# 2. Run resolution in mock mode
echo "🏃 Running MergeLlama in MOCK mode..."
MERGELLAMA_MOCK=true python3 dev-tools/td_cli.py resolve-conflicts

# 3. Verify the result
if grep -q "<<<<<<<" "$TEST_FILE"; then
  echo "❌ Error: Conflict markers still present in $TEST_FILE"
  exit 1
fi

# The mock resolution keeps the top part (HEAD)
if grep -q "Hello from HEAD (Main)" "$TEST_FILE"; then
  echo "✅ Verification successful! Conflict resolved correctly (mock mode)."
else
  echo "❌ Error: Resolution content does not match expected mock output."
  cat "$TEST_FILE"
  exit 1
fi

# 4. Cleanup
rm "$TEST_FILE"
echo "🧹 Cleaned up test files."
echo "✨ MergeLlama is verified and ready for CI!"
