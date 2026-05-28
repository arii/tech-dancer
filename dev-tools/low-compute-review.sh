#!/bin/bash
set -e

# dev-tools/low-compute-review.sh
# A helper script to setup and run local Ollama reviews using resource-friendly models (qwen2.5-coder:1.5b) on low-compute machines.

if [ -z "$1" ]; then
    echo "Usage: $0 <PR_NUMBER> [additional options]"
    echo "Example: $0 1665 --no-cache"
    exit 1
fi

PR_NUMBER=$1
shift

echo "🤖 Preparing low-compute review environment..."

# 1. Pull the lightweight 1.5b base model if not already present
echo "📦 Ensuring qwen2.5-coder:1.5b is available..."
ollama pull qwen2.5-coder:1.5b

# 2. Dynamically build the code-reviewer model using a temporary Modelfile to keep Git repository clean
echo "🛠️  Creating custom code-reviewer model from 1.5b base..."
TEMP_MF=$(mktemp)
sed 's/FROM qwen2.5-coder:7b/FROM qwen2.5-coder:1.5b/g' dev-tools/CodeReviewer.mf > "$TEMP_MF"
ollama create code-reviewer -f "$TEMP_MF"
rm -f "$TEMP_MF"

# 3. Execute the review with environment variable overrides
echo "🚀 Running AI review on PR #$PR_NUMBER..."
PYTHONPATH=dev-tools \
OLLAMA_MODEL=qwen2.5-coder:1.5b \
OLLAMA_SYNTHESIS_MODEL=qwen2.5-coder:1.5b \
python3 dev-tools/td_cli.py ai review "$PR_NUMBER" "$@"
