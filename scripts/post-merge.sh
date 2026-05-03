#!/bin/bash
set -e
if command -v pnpm >/dev/null 2>&1; then
  if pnpm --filter db exec true >/dev/null 2>&1; then
    pnpm --filter db push
  fi
fi