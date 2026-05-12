#!/bin/bash
# review-worktree.sh - Ollama Code Review Runner for Worktree
# Usage: ./dev-tools/review-worktree.sh [worktree_path] [file_pattern]

set -e

WORKTREE_PATH="${1:-/home/ari/tech-dancer-worktree-extend-event-data-model}"
FILE_PATTERN="${2:-**/*.tsx}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MAIN_REPO="$(cd "$SCRIPT_DIR/.." && pwd)"

# Ensure Ollama is available
if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
  echo "❌ Error: Ollama is not running. Start it with: ollama serve"
  exit 1
fi

# Ensure code-reviewer model exists
if ! ollama list | grep -q "code-reviewer"; then
  echo "🔧 Creating code-reviewer model..."
  cd "$MAIN_REPO"
  ollama create code-reviewer -f dev-tools/CodeReviewer.mf
fi

echo "🦙 Starting Ollama Code Review"
echo "📁 Worktree: $WORKTREE_PATH"
echo "🔍 Pattern: $FILE_PATTERN"
echo ""

# Change to worktree
cd "$WORKTREE_PATH"

# Find and review files
REVIEW_COUNT=0
TOTAL_FILES=0

while IFS= read -r -d '' file; do
  TOTAL_FILES=$((TOTAL_FILES + 1))
  
  # Skip files over 50KB
  file_size_kb=$(($(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null) / 1024))
  if [ "$file_size_kb" -gt 50 ]; then
    echo "⏭️  Skipping $file (${file_size_kb}KB > 50KB limit)"
    continue
  fi
  
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "📝 Reviewing: $file"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  
  # Use absolute path to ollama_reviewer.py from main repo
  python3 "$MAIN_REPO/dev-tools/ollama_reviewer.py" "$file"
  REVIEW_COUNT=$((REVIEW_COUNT + 1))
  echo ""
done < <(find . -type f -path "./$FILE_PATTERN" -print0 2>/dev/null)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Review Complete"
echo "📊 Reviewed: $REVIEW_COUNT/$TOTAL_FILES files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
