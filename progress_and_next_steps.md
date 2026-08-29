# WCS Navigator — Progress & CLI Failure Ledger

This document tracks implementation milestones, UX discoveries, and the CLI/Gateway Failure Ledger in accordance with repository agent rules.

---

## 1. CLI & Gateway Failure Ledger

| Date / Time | Subsystem / Component | Issue Observed | Root Cause | Remediation & Status |
| :--- | :--- | :--- | :--- | :--- |
| **2026-08-28 18:45** | FastAPI Backend CORS | `TypeError: Failed to fetch` on preview port 4173 | `ALLOWED_ORIGINS` was restricted to port 5173 / production domain. | **Resolved**: Added regex pattern matching `^https?://(localhost\|127\.0\.0\.1)(:\d+)?$` in `wcs_navigator_api/main.py` and expanded allowed origins in `config.py`. |
| **2026-08-28 18:55** | Questionnaire Division Sync | Answering "Intermediate" still displayed "Novice Strictly Prelims" in results | Boogie by the Bay preset mock data had static session titles and staging labels hardcoded to Novice. | **Resolved**: Implemented `adaptTraceToUserPreferences()` in `scheduleRuleEngine.ts` to dynamically rewrite prelim titles, staging calls, and justifications to match user's chosen division. |
| **2026-08-28 18:58** | Profile Assumption | Generated header displayed "Profile: INTERMEDIATE LEAD" without role confirmation | `activeRole` state was defaulted to `'lead'`. | **Resolved**: Initialized `activeRole` to empty string `''` and updated `AgentMindTrace` / `AgentGenerationTransition` to only show confirmed user inputs (e.g. `Profile: INTERMEDIATE`). |
| **2026-08-28 19:02** | Venue Logistics Mapping | Custom uploaded Boogie PDF displayed San Jose / SJC logistics | `FlightBufferTimeline.tsx` had a fallback `\|\| 'south-bay-dance-fling'` for unmatched event names. | **Resolved**: Improved token fuzzy matching for `boogie` (SFO), `south-bay` (SJC), `halloween` (SNA), `open` (BUR), `after-party` (SNA), and `aloha` (OGG - Kahului Maui). Unmatched custom events now fall back to `DEFAULT_LOGISTICS`. |
| **2026-08-28 19:06** | URL Ingestion Box UX & Validation | Trailing character (e.g. `...0970.pdfy`) in URL input box caused fetch failure; low contrast in text box made typo hard to see | The URL input lacked auto-trimming and visual contrast, allowing trailing typos from clipboard/keyboard to corrupt the fetch request. | **Documented for UX polish**: Add `.trim()` sanitization, clear URL validation regex, and higher contrast font styling in the URL input component. |
| **2026-08-28 19:06** | Fallback UX Disambiguation | Upload failure allowed proceeding with synthesized draft data for a different event without hard stop | When live parsing fails, the heuristic engine synthesizes a baseline draft using the filename/URL, which can confuse users if they expect an exact parse. | **Documented for UX polish**: Make the choice explicit on upload failure: either explicitly accept the AI-synthesized draft for the uploaded event OR switch to a verified 2026 California preset. |

---

## 2. Work Completed in Current Sprint

1. **Explicit "No Intensives" Option**:
   - Added clear, unambiguous option: `"No — Not attending any special intensives or bootcamps"` across all rule engines, presets, and LLM Stage 1 prompt.
2. **Interactive Live Agent Thinking Stream**:
   - Built `AgentGenerationTransition.tsx` displaying animated multi-step reasoning (backward flight buffer math, division staging calls, multi-room workshop filtering, all-night socials & meal breaks, calendar stream synthesis).
3. **Transparent Gateway Fallback Banner**:
   - Created `GatewayFallbackBanner.tsx` notifying users when live parsing is offline, displaying the extracted draft name, and offering 1-click switching to verified California convention presets.
4. **Questionnaire Skip & Fast Forward Controls**:
   - Added `Skip this question (Next Step →)` and `⚡ Skip All & Generate Itinerary` buttons to prevent getting stuck during progressive search.
5. **Dynamic Preference Adaptation**:
   - `adaptTraceToUserPreferences()` dynamically reconciles user answers with session titles, staging calls, and profile badges.
6. **Aloha Open WCS Logistics & URL Title Extraction**:
   - Added Wailea Beach Resort / Kahului Airport (OGG) logistics mapping and clean URL title parsing.

---

## 3. Next Steps & UX Refinements

1. **URL Input Box Polish**:
   - Add `.trim()` on blur/submit in `EventSearchHero.tsx`.
   - Enhance font size, text color, and clear `✕` button in the URL ingestion input box.
2. **Explicit Upload Error Gate**:
   - If an uploaded PDF cannot be read by the live gateway, offer a dedicated modal:
     - `[Proceed with Baseline Draft]` vs `[Select Verified Event]` vs `[Upload Another File]`.
3. **Dynamic PDF Text Extraction Engine**:
   - Integrate client-side PDF text parser (using `pdfjs-dist`) for offline local PDF parsing before falling back to filename heuristics.
