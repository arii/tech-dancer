#!/usr/bin/env bash

# .githooks/update-env.sh
# Shared logic to update environment dependencies and tools

# Allow users to opt-out via environment variable
if [ "${SKIP_GIT_HOOKS:-0}" = "1" ]; then
    echo "⏭️  SKIP_GIT_HOOKS is set. Skipping environment update hooks."
    exit 0
fi

if [ "${CI:-false}" = "true" ]; then
    # Usually we don't want hooks running in CI to avoid side effects and redundant work
    exit 0
fi

changed_files="$1"

check_run() {
    [ -n "$changed_files" ] && printf "%s\n" "$changed_files" | grep -qE "$1"
}

if check_run "^(pnpm-lock\.yaml|package\.json)$"; then
    if command -v pnpm >/dev/null 2>&1; then
        echo "📦 Node dependencies changed. Running pnpm install..."
        # Bypass engine checks for agents running on v22 (v24 required by engines.node)
        engine_flags=""
        if [ "$USER" = "jules" ] || [ -n "$JULES_API_KEY" ]; then
            engine_flags="--engine-strict=false"
        fi

        if [ -f "pnpm-lock.yaml" ]; then
            pnpm install --frozen-lockfile $engine_flags || echo "❌ ERROR: pnpm install --frozen-lockfile failed. Please run 'pnpm install' manually to sync dependencies."
        else
            pnpm install $engine_flags || echo "❌ ERROR: pnpm install failed. Please run 'pnpm install' manually."
        fi
    else
        echo "⚠️  WARNING: pnpm not found. Skipping dependency update."
    fi
fi

if check_run "^(src/|content/|package\.json|scripts/agent-prime\.mjs)"; then
    if command -v pnpm >/dev/null 2>&1; then
        echo "🔍 Indexable content changed. Updating .agent-context.json..."
        pnpm run agent:prime || echo "❌ ERROR: 'pnpm run agent:prime' failed. Please run it manually to update the agent index."
    else
        echo "⚠️  WARNING: pnpm not found. Skipping agent index update."
    fi
fi
