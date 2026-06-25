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
        if [ -f "pnpm-lock.yaml" ]; then
            pnpm install --frozen-lockfile || echo "❌ ERROR: pnpm install --frozen-lockfile failed. Please run 'pnpm install' manually to sync dependencies."
        else
            pnpm install || echo "❌ ERROR: pnpm install failed. Please run 'pnpm install' manually."
        fi
    else
        echo "⚠️  WARNING: pnpm not found. Skipping dependency update."
    fi
fi

if check_run "^dev-tools/"; then
    if command -v python3 >/dev/null 2>&1; then
        echo "🐍 dev-tools changed. Re-installing in editable mode..."
        # Try normal install first, then fallback for externally managed environments
        if ! python3 -m pip install --root-user-action=ignore -e ./dev-tools; then
            python3 -m pip install --root-user-action=ignore -e ./dev-tools --break-system-packages || echo "❌ ERROR: dev-tools re-installation failed. Please run 'pip install -e ./dev-tools' manually."
        fi
    else
        echo "⚠️  WARNING: python3 not found. Skipping dev-tools update."
    fi
fi

if check_run "^boomtick-mcp/"; then
    if command -v pnpm >/dev/null 2>&1; then
        echo "🤖 boomtick-mcp changed. Rebuilding..."
        pnpm --filter boomtick-mcp run build || echo "❌ ERROR: boomtick-mcp build failed. Please run 'pnpm --filter boomtick-mcp run build' manually."
    else
        echo "⚠️  WARNING: pnpm not found. Skipping boomtick-mcp build."
    fi
fi
