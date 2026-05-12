#!/usr/bin/env bash

# WARNING: Destructive operation (Will create multiple live GitHub issues in the repository)
gh issue create \
  --title "Optimize HeroParticleCanvas performance via requestAnimationFrame throttling" \
  --body "### Description
The current implementation of \`HeroParticleCanvas.tsx\` runs continuous animation loop processes without strict throttling or event de-duplication, which causes unnecessary CPU/GPU overhead on lower-end mobile devices.

### Proposed Solution
Introduce a delta-time check inside the animation frame loop or use custom frame-skipping to cap particle updates at 60 FPS, and debounce resize listeners to prevent heavy canvas context re-initializations.

### Tasks
- [ ] Profile \`HeroParticleCanvas.tsx\` memory and frame allocation.
- [ ] Implement frame throttling logic inside the loop.
- [ ] Add passive resize debouncing." \
  --label "enhancement,performance"

gh issue create \
  --title "Implement complete unit test suite for Timeline Engine & ICS generator" \
  --body "### Description
While \`ics-generator.test.ts\` outlines basic functional expectations for WSDC calendar exports, edge cases around timezone changes, missing event descriptions, and multi-day duration intervals are currently unvalidated.

### Proposed Solution
Expand test files in \`src/features/lab/wsdc-reminders/lib/__tests__/\` using Mock dates and verify output formatting compliance against RFC 5545 specifications.

### Tasks
- [ ] Add tests for overnight/cross-day dance events.
- [ ] Validate proper string escaping for description properties.
- [ ] Mock specific native system timezones to assert output variance." \
  --label "testing,lab"

gh issue create \
  --title "Standardize global error tracking and surface granular feedback in UXAuditor" \
  --body "### Description
The framework utilizes custom hooks like \`useUXAuditor.ts\` and an error retrieval mechanism in \`error_rag.py\`, but fails to cleanly catch and report real-time API rate limits or input parsing faults directly to the UI layer.

### Proposed Solution
Refactor state variables inside \`UXAuditor.tsx\` to intercept pipeline errors, surfacing an interactive retry dialog or detailed layout state whenever analysis dependencies time out.

### Tasks
- [ ] Catch specific promise rejections inside \`useUXAuditor.ts\`.
- [ ] Bind component error triggers to the central \`GlobalErrorBoundary\`.
- [ ] Create friendly visual error state illustrations." \
  --label "bug,ux"
