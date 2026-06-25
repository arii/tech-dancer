#!/usr/bin/env bash

# .githooks/update-env.sh
# Shared logic to update environment dependencies and tools

# Allow users to opt-out via environment variable
if [ "${SKIP_GIT_HOOKS:-0}" = "1" ] || [ "${CI:-false}" = "true" ]; then
    exit 0
fi

changed_files="$1"

check_run() {
    [ -n "$changed_files" ] && echo "$changed_files" | grep -qE "$1"
}

if check_run "pnpm-lock.yaml|package.json"; then
    if command -v pnpm >/dev/null 2>&1; then
        echo "📦 Node dependencies changed. Running pnpm install..."
        if [ -f "pnpm-lock.yaml" ]; then
            pnpm install --frozen-lockfile || echo "⚠️  pnpm install --frozen-lockfile failed. Please run manually."
        else
            pnpm install || echo "⚠️  pnpm install failed. Please run manually."
        fi
    else
        echo "⚠️  pnpm not found. Skipping dependency update."
    fi
fi

if check_run "^dev-tools/"; then
    if command -v python3 >/dev/null 2>&1; then
        echo "🐍 dev-tools changed. Re-installing in editable mode..."
        if ! python3 -m pip install --root-user-action=ignore -e ./dev-tools; then
            python3 -m pip install --root-user-action=ignore -e ./dev-tools --break-system-packages || echo "⚠️  dev-tools re-installation failed. Please run manually."
        fi
    else
        echo "⚠️  python3 not found. Skipping dev-tools update."
    fi
fi

if check_run "^boomtick-mcp/"; then
    if command -v pnpm >/dev/null 2>&1; then
        echo "🤖 boomtick-mcp changed. Rebuilding..."
        pnpm --filter boomtick-mcp run build || echo "⚠️  boomtick-mcp build failed. Please run manually."
    else
        echo "⚠️  pnpm not found. Skipping boomtick-mcp build."
    fi
fi
