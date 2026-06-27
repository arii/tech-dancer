#!/usr/bin/env bash
set -e

# Support for --no-mcp and other flags
BUILD_MCP=1
EXTRAS=""
for arg in "$@"; do
    if [ "$arg" == "--no-mcp" ]; then
        BUILD_MCP=0
    elif [ "$arg" == "--with-ai" ]; then
        if [ -z "$EXTRAS" ]; then EXTRAS="ai"; else EXTRAS="$EXTRAS,ai"; fi
    elif [ "$arg" == "--with-audit" ]; then
        if [ -z "$EXTRAS" ]; then EXTRAS="audit"; else EXTRAS="$EXTRAS,audit"; fi
    fi
done

# Check if we are inside the boomtick-pkg dir or root
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "Installing BoomTick CLI..."
if [ -n "$EXTRAS" ]; then
    pip install -e "./cli[$EXTRAS]" --break-system-packages
else
    pip install -e ./cli --break-system-packages
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
