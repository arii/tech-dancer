#!/usr/bin/env bash
if [ -z "${GH_TOKEN:-}" ] && [ -n "${GITHUB_TOKEN:-}" ]; then
  export GH_TOKEN="$GITHUB_TOKEN"
fi
export GIT_TERMINAL_PROMPT=0
