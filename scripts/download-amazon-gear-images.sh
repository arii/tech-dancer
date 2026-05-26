#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="public/images/gear/amazon"
IMAGE_MAP="scripts/amazon-image-map.tsv"

mkdir -p "$OUT_DIR"

if [ ! -f "$IMAGE_MAP" ]; then
  echo "Missing image map: $IMAGE_MAP"
  echo "Create it with: slug<TAB>direct_image_url"
  exit 1
fi

FAILED_DOWNLOADS=0
SKIPPED_DOWNLOADS=0
SUCCESSFUL_DOWNLOADS=0

file_size() {
  if stat -c %s "$1" >/dev/null 2>&1; then
    stat -c %s "$1"
  else
    stat -f %z "$1"
  fi
}

download() {
  local slug="$1"
  local url="$2"
  local out="$OUT_DIR/$slug.jpg"
  local tmp="$out.tmp"

  if [ -f "$out" ]; then
    echo "exists  $out"
    SKIPPED_DOWNLOADS=$((SKIPPED_DOWNLOADS + 1))
    return 0
  fi

  echo "downloading $slug..."

  # Attempt download with a clean User-Agent
  if ! curl -L --fail --connect-timeout 15 --max-time 60 \
    -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
    "$url" \
    -o "$tmp"; then
    echo "failed curl: $slug" >&2
    rm -f "$tmp"
    FAILED_DOWNLOADS=$((FAILED_DOWNLOADS + 1))
    return 0
  fi

  local size
  size="$(file_size "$tmp")"

  if [ "$size" -le 1000 ]; then
    echo "too small, likely placeholder: $slug ($size bytes)" >&2
    rm -f "$tmp"
    FAILED_DOWNLOADS=$((FAILED_DOWNLOADS + 1))
    return 0
  fi

  local mime
  mime="$(file --mime-type -b "$tmp")"

  if [[ "$mime" != image/* ]]; then
    echo "not an image: $slug ($mime)" >&2
    rm -f "$tmp"
    FAILED_DOWNLOADS=$((FAILED_DOWNLOADS + 1))
    return 0
  fi

  mv "$tmp" "$out"
  echo "saved    $out"
  SUCCESSFUL_DOWNLOADS=$((SUCCESSFUL_DOWNLOADS + 1))
}

while IFS=$'\t' read -r slug url || [[ -n "${slug:-}" ]]; do
  # Skip blank lines and comments
  [[ -z "${slug:-}" ]] && continue
  [[ "$slug" == \#* ]] && continue

  # Strip potential trailing carriage returns from Windows style line endings
  slug="${slug%$'\r'}"
  url="${url%$'\r'}"

  if [[ -z "${url:-}" ]]; then
    echo "missing url for slug: $slug" >&2
    FAILED_DOWNLOADS=$((FAILED_DOWNLOADS + 1))
    continue
  fi

  download "$slug" "$url"
done < "$IMAGE_MAP"

echo ""
echo "Download summary:"
echo "  saved:   $SUCCESSFUL_DOWNLOADS"
echo "  skipped: $SKIPPED_DOWNLOADS"
echo "  failed:  $FAILED_DOWNLOADS"

if [ "$FAILED_DOWNLOADS" -gt 0 ]; then
  exit 1
fi
