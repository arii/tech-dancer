#!/usr/bin/env bash
set -e

# Source shared utilities
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
if [ -f "${SCRIPT_DIR}/../scripts/env-utils.sh" ]; then
  source "${SCRIPT_DIR}/../scripts/env-utils.sh"
elif [ -f "${SCRIPT_DIR}/scripts/env-utils.sh" ]; then
  source "${SCRIPT_DIR}/scripts/env-utils.sh"
fi

# Support for --no-mcp and other flags
BUILD_MCP=1
EXTRAS=""
# Direct argument parsing for --with-* flags
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

# If parse_profiles_list exists, augment EXTRAS from BOOMTICK_PROFILES
if command -v parse_profiles_list &> /dev/null; then
    ACTIVE=$(parse_profiles_list)
    for p in $ACTIVE; do
        if [[ ",$EXTRAS," != *",$p,"* ]]; then
            if [ -z "$EXTRAS" ]; then EXTRAS="$p"; else EXTRAS="$EXTRAS,$p"; fi
        fi
    done
fi

# Check if we are inside the boomtick-pkg dir or root
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

# Detect if we should use --system flag with uv
uv_flags=""
if command -v get_uv_flags &> /dev/null; then
  uv_flags=$(get_uv_flags)
else
  if [ -z "${VIRTUAL_ENV:-}" ]; then uv_flags="--system"; fi
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
