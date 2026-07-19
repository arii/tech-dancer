#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd -P || pwd)"
export VENV_PATH="${SCRIPT_DIR}/.venv"

# Delegate execution to the setup-agent.sh script within the boomtick-pkg submodule.
"$SCRIPT_DIR/boomtick-pkg/setup-agent.sh" "$@"

echo "[setup-agent] Installing td-cli from submodule..."
# Ensure the virtual environment is activated or used
if [ -d "$VENV_PATH" ]; then
    export PATH="$VENV_PATH/bin:$PATH"
    pip install --root-user-action=ignore -e "$SCRIPT_DIR/boomtick-pkg/cli"
else
    echo "Warning: .venv not found, skipping td-cli install."
fi
