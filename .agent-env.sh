#!/usr/bin/env bash
if [ -z "${GH_TOKEN:-}" ] && [ -n "${CODEX_GH_TOKEN:-}" ]; then
  export GH_TOKEN="$CODEX_GH_TOKEN"
fi
if [ -z "${GITHUB_TOKEN:-}" ] && [ -n "${GH_TOKEN:-}" ]; then
  export GITHUB_TOKEN="$GH_TOKEN"
fi
export GIT_TERMINAL_PROMPT=0
