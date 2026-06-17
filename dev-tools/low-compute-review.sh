#!/bin/bash
set -e

# dev-tools/low-compute-review.sh
# A helper script to run AI reviews. Now updated to use remote services if available,
# falling back to Ollama if locally configured.

if [ -z "$1" ]; then
    echo "Usage: $0 <PR_NUMBER> [additional options]"
    echo "Example: $0 1665 --no-cache"
    exit 1
fi

PR_NUMBER=$1
shift

# Check if we have remote AI credentials
if [ -n "$GITHUB_TOKEN" ] || [ -n "$GEMINI_API_KEY" ]; then
    echo "🚀 Running AI review on PR #$PR_NUMBER using remote AI service..."
    PYTHONPATH=dev-tools \
    python3 dev-tools/td_cli.py ai review "$PR_NUMBER" "$@"
else
    echo "🤖 Preparing local Ollama review environment (no remote API keys found)..."

    if ! command -v ollama &> /dev/null; then
        echo "❌ Error: ollama is not installed and no remote AI credentials found."
        exit 1
    fi

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
    echo "🚀 Running local AI review on PR #$PR_NUMBER..."
    PYTHONPATH=dev-tools \
    AI_MODEL=qwen2.5-coder:1.5b \
    AI_SYNTHESIS_MODEL=qwen2.5-coder:1.5b \
    python3 dev-tools/td_cli.py ai review "$PR_NUMBER" "$@"
fi
