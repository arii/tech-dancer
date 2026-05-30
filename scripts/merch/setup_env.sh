#!/bin/bash
# scripts/merch/setup_env.sh
# Automates the font registration process for developers.

FONT_DIR="$HOME/.local/share/fonts"
FONT_FILE="scripts/merch/fonts/CooperBlack.ttf"

if [ ! -f "$FONT_FILE" ]; then
    echo "Error: Font file $FONT_FILE not found."
    echo "Please place a licensed copy of CooperBlack.ttf in scripts/merch/fonts/"
    exit 1
fi

mkdir -p "$FONT_DIR"
cp "$FONT_FILE" "$FONT_DIR/"
fc-cache -f -v
echo "✓ Cooper Black font registered successfully."
