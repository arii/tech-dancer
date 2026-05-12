#!/bin/bash
# Quick review script for extend-event-data-model branch
# Reviews all changed .tsx and .ts files in the worktree

set -e

WORKTREE="/home/ari/tech-dancer-worktree-extend-event-data-model"
MAIN_REPO="/home/ari/tech-dancer"

echo "🦙 Ollama Review: extend-event-data-model branch"
echo ""

# Check Ollama is running
if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
  echo "❌ Ollama not running. Start with: ollama serve"
  exit 1
fi

# Ensure model exists
if ! ollama list | grep -q "code-reviewer"; then
  echo "🔧 Creating code-reviewer model..."
  ollama create code-reviewer -f "$MAIN_REPO/dev-tools/CodeReviewer.mf"
fi

cd "$WORKTREE"

# Get list of changed files compared to main
echo "📊 Finding changed TypeScript/TSX files..."
git fetch origin main:main 2>/dev/null || true
CHANGED_FILES=$(git diff --name-only main...HEAD | grep -E '\.(ts|tsx)$' || true)

if [ -z "$CHANGED_FILES" ]; then
  echo "ℹ️  No TypeScript/TSX files changed in this branch"
  exit 0
fi

echo "Found $(echo "$CHANGED_FILES" | wc -l) file(s) to review"
echo ""

# Review each file
COUNT=0
while IFS= read -r file; do
  if [ ! -f "$file" ]; then
    echo "⏭️  Skipping deleted file: $file"
    continue
  fi
  
  COUNT=$((COUNT + 1))
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📝 [$COUNT] $file"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  python3 "$MAIN_REPO/dev-tools/ollama_reviewer.py" "$file" || echo "⚠️  Review failed for $file"
  echo ""
done <<< "$CHANGED_FILES"

echo "✅ Review complete! Reviewed $COUNT files."
