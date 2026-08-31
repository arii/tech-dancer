#!/usr/bin/env bash
set -euo pipefail

# Ensure gcloud CLI is installed
if ! command -v gcloud &> /dev/null; then
  echo "Error: gcloud CLI is not installed." >&2
  exit 1
fi

# Check gcloud authentication
if ! gcloud auth print-access-token &> /dev/null; then
  echo "Error: Not authenticated with gcloud. Please run 'gcloud auth login'." >&2
  exit 1
fi

# Ensure GEMINI_API_KEY is set
if [ -z "${GEMINI_API_KEY:-}" ]; then
  echo "Error: GEMINI_API_KEY environment variable is not set." >&2
  exit 1
fi

REGION="${REGION:-us-west1}"
GEMINI_MODEL="${GEMINI_MODEL:-gemini-3.5-flash}"

echo "Deploying wcs-navigator-api to Google Cloud Run in ${REGION} with ${GEMINI_MODEL}..."
gcloud run deploy wcs-navigator-api \
  --source . \
  --region "${REGION}" \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="${GEMINI_API_KEY}",GEMINI_MODEL="${GEMINI_MODEL}"
