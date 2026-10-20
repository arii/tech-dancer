#!/usr/bin/env bash
# Centralized CLI binary resolution for Tech Dancer.
# Returns the executable path for 'td'.

if command -v td >/dev/null 2>&1; then
    command -v td
else
    echo "Error: Could not resolve 'td' executable on PATH" >&2
    exit 1
fi
