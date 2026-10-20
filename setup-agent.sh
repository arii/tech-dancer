#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Bootstrapping environment..."
echo "📦 Installing/updating boomtick-cli..."

PYTHON_BIN="python3"
if [ -d ".venv/bin" ]; then
    PYTHON_BIN=".venv/bin/python3"
fi

"$PYTHON_BIN" -m pip install --upgrade --break-system-packages boomtick-cli

echo "🔍 Verifying 'td' installation..."
if ! command -v td >/dev/null 2>&1; then
    BIN_DIR="$(dirname "$PYTHON_BIN")"
    if [ -f "$BIN_DIR/td" ]; then
        export PATH="$BIN_DIR:$PATH"
    else
        USER_BASE_BIN="$("$PYTHON_BIN" -m site --user-base 2>/dev/null)/bin"
        if [ -d "$USER_BASE_BIN" ]; then
            export PATH="$USER_BASE_BIN:$PATH"
        fi
    fi
fi

td --help >/dev/null

echo "🩺 Running 'td doctor'..."
td doctor
