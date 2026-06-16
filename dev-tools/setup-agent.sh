#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" 2>/dev/null && pwd -P || pwd)"
START_DIR="$(pwd -P)"

find_repo_root() {
  local dir="$1"
  if git -C "$dir" rev-parse --show-toplevel >/dev/null 2>&1; then
    git -C "$dir" rev-parse --show-toplevel
    return 0
  fi

  while [ "$dir" != "/" ] && [ -n "$dir" ]; do
    if [ -d "$dir/.git" ] || [ -f "$dir/package.json" ] || [ -f "$dir/pnpm-lock.yaml" ]; then
      printf '%s\n' "$dir"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

REPO_ROOT="$(find_repo_root "$START_DIR" || find_repo_root "$SCRIPT_DIR" || pwd -P)"
cd "$REPO_ROOT"

PNPM_VERSION="${PNPM_VERSION:-10.28.2}"
NODE_MAJOR="${NODE_MAJOR:-22}"
SKIP_APT="${SKIP_APT:-0}"
SKIP_PLAYWRIGHT="${SKIP_PLAYWRIGHT:-0}"
SKIP_VALIDATION="${SKIP_VALIDATION:-0}"
SKIP_REMOTE_CONFIG="${SKIP_REMOTE_CONFIG:-0}"

export CI="${CI:-1}"
export DEBIAN_FRONTEND="${DEBIAN_FRONTEND:-noninteractive}"
export PLAYWRIGHT_DOWNLOAD_HOST="${PLAYWRIGHT_DOWNLOAD_HOST:-https://playwright.azureedge.net}"
export PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-/ms-playwright}"

if [ "$(id -u)" -ne 0 ] && ! command -v sudo >/dev/null 2>&1; then
  export NPM_CONFIG_PREFIX="${NPM_CONFIG_PREFIX:-$HOME/.npm-global}"
  export PATH="$NPM_CONFIG_PREFIX/bin:$PATH"
  mkdir -p "$NPM_CONFIG_PREFIX/bin"
fi

log() { echo "[setup-agent] $*"; }
warn() { echo "[setup-agent] WARNING: $*" >&2; }
err() { echo "[setup-agent] ERROR: $*" >&2; exit 1; }
have() { command -v "$1" >/dev/null 2>&1; }

configure_github_auth_env() {
  if [ -z "${GH_TOKEN:-}" ] && [ -n "${CODEX_GH_TOKEN:-}" ]; then
    export GH_TOKEN="$CODEX_GH_TOKEN"
  fi
  if [ -z "${GITHUB_TOKEN:-}" ] && [ -n "${GH_TOKEN:-}" ]; then
    export GITHUB_TOKEN="$GH_TOKEN"
  fi
  if [ -n "${GH_TOKEN:-}" ]; then
    log "GitHub token detected for gh via GH_TOKEN."
  else
    warn "CODEX_GH_TOKEN/GH_TOKEN is not set; gh commands requiring auth will fail."
  fi
}

repo_slug_from_env() {
  if [ -n "${GITHUB_REPOSITORY:-}" ]; then printf '%s\n' "$GITHUB_REPOSITORY"; return 0; fi
  if [ -n "${CODEX_REPOSITORY:-}" ]; then printf '%s\n' "$CODEX_REPOSITORY"; return 0; fi
  if [ -n "${REPO_SLUG:-}" ]; then printf '%s\n' "$REPO_SLUG"; return 0; fi
  return 1
}

repo_slug_from_gh() {
  configure_github_auth_env
  repo_slug_from_env && return 0
  if have gh && [ -n "${GH_TOKEN:-}" ]; then
    gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null && return 0
  fi
  return 1
}

ensure_remote_origin() {
  if [ "$SKIP_REMOTE_CONFIG" = "1" ]; then warn "SKIP_REMOTE_CONFIG=1; skipping remote origin configuration."; return 0; fi
  if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then warn "Not a git repository; skipping remote origin configuration."; return 0; fi
  local current repo_slug
  current="$(git remote get-url origin 2>/dev/null || true)"
  if [ -n "$current" ]; then log "remote.origin already configured: ${current}"; return 0; fi

  local fallback_remote fallback_url
  fallback_remote="$(git remote | head -n 1 || true)"
  if [ -n "$fallback_remote" ]; then
    fallback_url="$(git remote get-url "$fallback_remote" 2>/dev/null || true)"
    if [ -n "$fallback_url" ]; then
      git remote add origin "$fallback_url"
      log "Configured remote.origin from existing remote '${fallback_remote}' => ${fallback_url}"
      return 0
    fi
  fi

  repo_slug="$(repo_slug_from_gh || true)"
  if [ -z "$repo_slug" ]; then
    warn "No remote.origin and could not infer repo slug. Set GITHUB_REPOSITORY, REPO_SLUG, or CODEX_REPOSITORY to owner/repo."
    return 0
  fi
  git remote add origin "https://github.com/${repo_slug}.git"
  log "Configured remote.origin => https://github.com/${repo_slug}.git"
}

write_agent_env_file() {
  cat > "${REPO_ROOT}/.agent-env.sh" <<'EOF_AGENT_ENV'
#!/usr/bin/env bash
if [ -z "${GH_TOKEN:-}" ] && [ -n "${CODEX_GH_TOKEN:-}" ]; then
  export GH_TOKEN="$CODEX_GH_TOKEN"
fi
if [ -z "${GITHUB_TOKEN:-}" ] && [ -n "${GH_TOKEN:-}" ]; then
  export GITHUB_TOKEN="$GH_TOKEN"
fi
export GIT_TERMINAL_PROMPT=0
EOF_AGENT_ENV
  chmod 600 "${REPO_ROOT}/.agent-env.sh"
  log "Wrote .agent-env.sh with token-mapping logic for dev CLI use."
}

run_sudo() { if [ "$(id -u)" -eq 0 ]; then "$@"; elif have sudo; then sudo "$@"; else warn "No sudo/root available; cannot run: $*"; return 127; fi; }
pip_install() { if python3 -m pip install --disable-pip-version-check "$@"; then return 0; fi; python3 -m pip install --disable-pip-version-check --break-system-packages "$@"; }

install_apt_tools() {
  if [ "$SKIP_APT" = "1" ]; then warn "SKIP_APT=1; skipping OS package install."; return 0; fi
  if ! have apt-get; then warn "apt-get not available; skipping OS package install."; return 0; fi
  log "Installing system tools..."
  run_sudo apt-get update -y || return 0
  run_sudo apt-get install -y ca-certificates curl git jq unzip xz-utils gpg gh python3 python3-pip python3-venv python3-setuptools python3-wheel build-essential || warn "Some OS packages could not be installed."
}

ensure_node() { have node || err "node is required."; have npm || err "npm is required."; }

normalize_nvmrc_for_snapshot() {
  [ -f ".nvmrc" ] || return 0; have node || return 0
  local desired actual desired_major actual_major
  desired="$(tr -d '[:space:]' < .nvmrc)"; actual="$(node --version)"
  if printf '%s' "$desired" | grep -Eq '^v?[0-9]+$'; then
    desired_major="${desired#v}"; actual_major="${actual#v}"; actual_major="${actual_major%%.*}"
    if [ "$desired_major" = "$actual_major" ]; then
      log ".nvmrc major ${desired} matches active Node ${actual}."
    else
      warn ".nvmrc requests ${desired}, but active Node is ${actual}."
    fi
  fi
}

ensure_corepack_pnpm() { ensure_node; normalize_nvmrc_for_snapshot; have corepack && corepack enable || true; have corepack && corepack prepare "pnpm@${PNPM_VERSION}" --activate || true; have pnpm || npm install -g "pnpm@${PNPM_VERSION}"; }
install_python_deps() { have python3 || err "python3 is required."; pip_install --root-user-action=ignore --upgrade pip setuptools wheel; if [ -f "dev-tools/pyproject.toml" ]; then (cd "${REPO_ROOT}/dev-tools" && pip_install --root-user-action=ignore --editable .); fi; pip_install --root-user-action=ignore pyyaml; [ -f "etl/requirements.txt" ] && pip_install --root-user-action=ignore -r etl/requirements.txt; }
install_node_deps() { have pnpm || err "pnpm is required."; [ -f "package.json" ] || return 0; [ -f "pnpm-lock.yaml" ] && pnpm install --frozen-lockfile || pnpm install; }
install_playwright() { [ "$SKIP_PLAYWRIGHT" = "1" ] && return 0; [ -f "package.json" ] || return 0; pnpm exec playwright install --with-deps chromium || npx --yes playwright install --with-deps chromium || warn "Playwright install failed; continuing."; }
configure_remote_origin() { configure_github_auth_env; ensure_remote_origin; }

run_validation() {
  [ "$SKIP_VALIDATION" = "1" ] && return 0
  node --version; npm --version; pnpm --version; python3 --version
  [ -x "dev-tools/snapshot.sh" ] && bash dev-tools/snapshot.sh || true
  [ -f "dev-tools/td_cli.py" ] && python3 dev-tools/td_cli.py gh --help >/dev/null || true
}

main() {
  echo "=== BoomTick Agent Environment Setup ==="
  echo "Repository: ${REPO_ROOT}"
  configure_github_auth_env
  write_agent_env_file
  install_apt_tools
  ensure_corepack_pnpm
  install_python_deps
  install_node_deps
  install_playwright
  configure_remote_origin
  run_validation
}

main "$@"
