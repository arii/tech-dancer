#!/usr/bin/env bash
set -e

# Support for --no-mcp and other flags
BUILD_MCP=1
EXTRAS=""

# Centralized profile detection
for arg in "$@"; do
    case "$arg" in
        --no-mcp)
            BUILD_MCP=0
            ;;
        --with-ai)
            if [ -z "$EXTRAS" ]; then EXTRAS="ai"; else EXTRAS="$EXTRAS,ai"; fi
            ;;
        --with-audit)
            if [ -z "$EXTRAS" ]; then EXTRAS="audit"; else EXTRAS="$EXTRAS,audit"; fi
            ;;
    esac
done

# Check if we are inside the boomtick-pkg dir or root
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

# Detect if we should use --system flag with uv
uv_flags=""
if [ -z "${VIRTUAL_ENV:-}" ]; then
  uv_flags="--system"
fi

echo "Installing BoomTick CLI..."
# Use uv if available for high-speed installation
if command -v uv &> /dev/null; then
    if [ -n "$EXTRAS" ]; then
        uv pip install $uv_flags --break-system-packages -e "./cli[$EXTRAS]"
    else
        uv pip install $uv_flags --break-system-packages -e ./cli
    fi
else
    if [ -n "$EXTRAS" ]; then
        pip install --break-system-packages -e "./cli[$EXTRAS]"
    else
        pip install --break-system-packages -e ./cli
    fi
fi

if [ "$BUILD_MCP" -eq 1 ]; then
    echo "Building BoomTick MCP..."
    cd mcp
    if command -v pnpm &> /dev/null; then
        pnpm install --engine-strict=false
        npx tsc
    elif command -v npm &> /dev/null; then
        npm install
        npm run build
    else
        echo "Warning: Neither pnpm nor npm found. Skipping MCP build."
    fi
fi

echo "BoomTick installation complete!"
