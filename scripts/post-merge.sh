#!/bin/bash
set -e
pnpm install --frozen-lockfile
if pnpm --filter db exec true >/dev/null 2>&1; then
  pnpm --filter db push
fi
