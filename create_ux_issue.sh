#!/bin/bash

gh issue create \
  --title "UX Auditor tool is completely broken and requires complete overhaul" \
  --body "## Problem
The UX Auditor tool on the \`/research\` page is fundamentally broken across multiple interaction layers:
1. **URL Input Field:** The URL input field does not select-all on focus, making it extremely tedious to replace the default URL. Additionally, users report it behaves as if it's protected/locked.
2. **Fake Viewport Rendering:** Pressing different buttons for Mobile/Tablet/Desktop does not actually collect or render those viewport sizes. It merely scales the same generic image differently using an external snapshot service placeholder, rather than embedding an actual iframe or properly fetching responsive snapshots.
3. **Broken Gemini API:** Entering a valid Gemini API key does nothing. The tool is seemingly disconnected from the actual LLM backend, using mocked outputs in the \`useUXAuditor\` hook instead of processing real visual regression audits.

## File(s)
- \`src/pages/UXAuditor.tsx\`
- \`src/features/ux-auditor/useUXAuditor.ts\`

## User impact
Users cannot test actual URLs, cannot visualize responsive breakdowns, and cannot generate valid AI reviews, rendering the flagship tool useless.

## Recommended fix
1. Update the URL \`<input>\` element to include an \`onFocus={(e) => e.target.select()}\` handler and ensure it isn't inappropriately typed or styled like a password field.
2. Replace the fake image rendering (which relies on external snapshots or placehold.co) with a legitimate \`<iframe>\` that scales to the exact width/height of the selected viewport.
3. Connect the \`runAnalysis\` function in the \`useUXAuditor\` hook to an actual Gemini Vision API endpoint, replacing the mocked setTimeout responses with real prompt evaluations.
4. Add robust error handling if the Gemini API key is invalid or fails to return a response.

## Acceptance criteria
- [ ] URL field selects all text on focus
- [ ] Viewports correctly embed or render the target URL at the specified dimensions
- [ ] The tool successfully sends the payload to the Gemini API and returns a real review
- [ ] Validated on Desktop and Mobile devices
" \
  --label "bug" \
  --label "desktop-ux-review"
