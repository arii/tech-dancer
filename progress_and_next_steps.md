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

## 2. Tasking Document: Completed Milestones & In-Progress Roadmaps

Based on recent user feedback and design token review, the following features have been fully completed and audited:

### ✅ COMPLETED
1. **Schedule Results Readability & Single-Column Layout**:
   - Ditched 2-column grid layout for Friday, Saturday, and Sunday session feeds; forced sessions into a clean, linear, single-column vertical list (`AgentMindTrace.tsx` & `FullScheduleModal.tsx`).
   - Created a dedicated left-aligned **Time Column** (`10:00 AM – 11:15 AM`) so users can scan straight down the left edge to see when events occur.
   - Raised secondary text contrast and size (`text-slate-200`, `text-slate-300`, `text-white font-semibold`).

2. **Soften Dress Code & Theme Tags**:
   - Replaced raw all-caps monospace dress code tags (`SMART CASUAL DANCEWEAR`) with standard Title Case text (e.g. `Smart Casual Dancewear`) inside soft, rounded pills (`bg-surface border border-line/60 rounded-full px-3 py-1`).

3. **Quiet Down Customizer Modal Action Buttons**:
   - Replaced bright red and cyan buttons in `FullScheduleModal.tsx` with quiet, subtle ghost buttons (`bg-surface-alt/70 hover:bg-surface text-text-dim hover:text-red-400 border border-line/60` for Remove; `bg-brand-cyan/15 hover:bg-brand-cyan/25 text-brand-cyan border border-brand-cyan/30` for Add).

4. **Design Token & Typography Enforcement**:
   - Removed raw monospace fonts (`font-mono`) and loud cyan text (`text-cyan-400`, `UPPERCASE`) from step headers, control buttons, progress indicators, and navigation links.
   - Standardized typography around `--font-sans` (`text-text-main`, `text-text-dim`) and replaced raw text arrows (`→`) with Lucide icons (`ChevronRight`, `ChevronLeft`, `FastForward`).

5. **Dynamic Questionnaire Modernization**:
   - Cleaned up top header bar (`Back`, `Step X of Y`, `{progressPercent}%`).
   - Removed duplicate top "Skip" button.
   - Rendered question subtitle as clean soft-gray sans-serif text (`text-xs sm:text-sm text-text-dim`).
   - Styled bottom controls with muted, solid surface background (`Skip All & Generate Itinerary`).

6. **Search Omnibox PDF & URL Direct Ingestion**:
   - Added automatic URL detection in search input (`EventSearchHero.tsx`).
   - When pasting or typing a URL (e.g. `https://.../schedule.pdf` or `www...`), a prominent item appears in the dropdown: `Fetch & Ingest PDF URL: {searchQuery}`.
   - Pressing Enter or clicking automatically triggers `onDiscoverUrl(url)`.

7. **PR Consolidation & GitHub Actions Container Release**:
   - Consolidated open PRs (#4425, #4419, #4416, #4420, #4417, #4422) into PR #4430 with automated `Closes` issue linking.
   - Configured Docker matrix build in `.github/workflows/deploy-image.yml` to package and release `ghcr.io/arii/tech-dancer/wcs-navigator-api:latest`.

---

### ⏳ IN PROGRESS / KEEP BUILDING
1. **Static Demo Data Alignment with Gemini 3.5 Flash Prompts**:
   - Upgrade fallback static demo datasets to reflect the improved prompt schemas and autonomous chat functions introduced in Gemini 3.5 Flash.
2. **Dynamic PDF Client-Side Parsing**:
   - Integrate client-side PDF text parser (`pdfjs-dist`) for offline local PDF parsing before falling back to filename heuristics.
3. **Throttling Readiness Check Issue Tracking**:
   - Monitor and implement readiness health check throttling endpoint for backend deployment.
