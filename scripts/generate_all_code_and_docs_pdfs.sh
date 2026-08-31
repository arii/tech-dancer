#!/usr/bin/env bash
set -euo pipefail

# Create output directories
mkdir -p pdf_docs/code-groups

echo "==> [1/4] Generating Group 1: API & Integration Services PDF..."
enscript -q --highlight --color -p - \
  api/_lib/versions.ts api/batch-compare.ts api/compare-version.ts api/health.ts api/latest-version.ts api/skill.md.ts api/telemetry.ts \
  src/features/wcs-navigator/services/wcsApiClient.ts src/features/wcs-navigator/services/liveScheduleExtractor.ts \
  | ps2pdf - pdf_docs/code-groups/01_api_and_services.pdf

echo "==> [2/4] Generating Group 2: Core Engine, Utilities & Type Definitions PDF..."
enscript -q --highlight --color -p - \
  src/features/wcs-navigator/types/navigator.ts src/features/wcs-navigator/types.ts \
  src/features/wcs-navigator/utils/scheduleRuleEngine.ts src/features/wcs-navigator/utils/questionGenerator.ts \
  src/features/wcs-navigator/utils/icsDownloader.ts src/features/wcs-navigator/hooks/useNavigatorStorage.ts \
  | ps2pdf - pdf_docs/code-groups/02_core_engine_and_types.pdf

echo "==> [3/4] Generating Group 3: User Interface & Interactive Components PDF..."
enscript -q --highlight --color -p - \
  src/features/wcs-navigator/WCSNavigatorPage.tsx \
  $(find src/features/wcs-navigator/components -type f -name "*.tsx" | sort) \
  | ps2pdf - pdf_docs/code-groups/03_ui_components.pdf

echo "==> [4/4] Generating Group 4: Data Models & Test Suites PDF..."
enscript -q --highlight --color -p - \
  src/features/wcs-navigator/data/californiaEvents.ts src/features/wcs-navigator/data/goldenTraces.ts \
  src/features/wcs-navigator/data/mockResults.ts src/features/wcs-navigator/data/personas.ts \
  $(find src/features/wcs-navigator/__tests__ -type f -name "*.tsx" | sort) \
  | ps2pdf - pdf_docs/code-groups/04_data_and_test_suites.pdf

echo "==> Generating WCS Navigator API Technical Documentation PDF..."
python3 scripts/render_api_docs_pdf.py

echo "==> Generating WCS Navigator Architecture Deep Dive Article PDF..."
python3 scripts/render_article_pdf.py

echo "==> All PDFs generated successfully under pdf_docs/!"
