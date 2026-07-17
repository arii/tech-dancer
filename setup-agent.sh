#!/usr/bin/env bash
# Delegate execution to the setup-agent.sh script within the boomtick-pkg submodule.
exec "$(dirname "$0")/boomtick-pkg/setup-agent.sh" "$@"
