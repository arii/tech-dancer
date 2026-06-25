#!/usr/bin/env bash
if [ -z "${GITHUB_TOKEN:-}" ] && [ -n "${CODEX_GH_TOKEN:-}" ]; then
  export GITHUB_TOKEN="$CODEX_GH_TOKEN"
fi
if [ -z "${GH_TOKEN:-}" ] && [ -n "${GITHUB_TOKEN:-}" ]; then
  export GH_TOKEN="$GITHUB_TOKEN"
fi
export GIT_TERMINAL_PROMPT=0
