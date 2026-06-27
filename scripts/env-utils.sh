#!/usr/bin/env bash

# Shared utility functions for environment setup and profile management.

get_active_profiles() {
  echo "${BOOMTICK_PROFILES:-}"
}

parse_profiles_list() {
  local profiles
  profiles=$(get_active_profiles)
  local active=""
  # Support comma-separated list
  if [[ ",$profiles," == *",ai,"* ]]; then active="$active ai"; fi
  if [[ ",$profiles," == *",audit,"* ]]; then active="$active audit"; fi
  echo $active
}

construct_install_args() {
  local active_profiles
  active_profiles=$(parse_profiles_list)
  local args="--no-mcp"

  for p in $active_profiles; do
    args="$args --with-$p"
  done
  echo "$args"
}

get_uv_flags() {
  if [ -z "${VIRTUAL_ENV:-}" ]; then
    echo "--system"
  else
    echo ""
  fi
}
