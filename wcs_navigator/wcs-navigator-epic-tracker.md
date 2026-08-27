# WCS Navigator: Epic & Issue Tracking Specification (Agile Roadmap)

This document contains a structured Agile Epic and detailed Issue-level tracking plan designed for immediate import into your project board (GitHub Issues, Jira, Linear, or your project tracker).

It details the sequence of execution, explicitly distinguishing between sequential, parallel, and synchronized phases to help you build and deploy the MVP as quickly and cleanly as possible.

---

## 📅 Roadmap Overview & Execution Flow

```
                                  [ PROJECT START ]
                                          │
                                          ▼
                      Phase 1: Scaffold & API Grounding (Sequential)
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     Phase 2: Core Agent Logic (Parallel A)         Phase 3: Blog Frontend (Parallel B)
     - [A1] Implement Stage 1 Discovery API         - [B1] PDF Upload & URL Input UI
     - [A2] Implement Stage 2 Generator API         - [B2] Dynamic Form Renderer Component
     - [A3] Write Temporal Flight Buffer Engine      - [B3] "Agent Mind" Decision Trace UI
                  │                                               │
                  └───────────────────────┬───────────────────────┘
                                          ▼
                            [ SYNC POINT 1: API INTEGRATION ]
                                          │
                                          ▼
                      Phase 4: Docker & GCP Cloud Run Deployment
                                          │
                                          ▼
                           Phase 5: TDD Validation & Demo
                                          │
                                          ▼
                                   [ PROJECT SHIP ]
```

---

## 🏆 Epic: WCS-NAV | WCS Navigator: Dynamic In-Memory Calendar Streaming MVP

**Description:** Implement a zero-storage, stateless, in-memory calendar personalization service running on Google Cloud Run and integrated into the React frontend of `boomtick.blog`. This service uses Gemini 3.5 Flash via the Google GenAI SDK to scan unstructured visual PDF event schedules, dynamically generate custom interactive questionnaires based on discovered schedule structures, and stream highly tailored `.ics` calendars along with a transparent execution trace back to the dancer.

---

### 🧱 Phase 1: Scaffold & API Grounding (Sequential)
*These tasks must be completed first to establish the execution contract and data bindings.*

#### 🏷️ Issue WCS-101: Scaffold FastAPI Server & Integrate Google GenAI SDK
*   **Type:** Task (Sequential)
*   **Description:** Initialize the local repository workspace, configure the Python virtual environment (`requirements.txt`), set up the base FastAPI server directory, and establish an authenticated client loop using the `google-genai` SDK.
*   **Technical Details:**
    *   Configure `main.py` with FastAPI.
    *   Create config class parsing `GEMINI_API_KEY` from environment variables.
    *   Set up error handlers for missing API keys or failed connection states.
*   **Definition of Done (DoD):** Server starts successfully, and a local test endpoint returns a `200 OK` greeting to prove the API and environment variables are active.

#### 🏷️ Issue WCS-102: Create Local PDF Processing Scaffolding
*   **Type:** Task (Sequential)
*   **Description:** Implement the utility methods to receive file bytes from direct HTTP multipart uploads and fetch direct visual schedules from posted URL strings.
*   **Technical Details:**
    *   Define a FastAPI route for in-memory file streaming.
    *   Use `requests` with a strict stream timeout to fetch raw PDF bytes from external URL inputs.
    *   Write helper functions to map incoming binary bytes directly to the GenAI SDK's `types.Part.from_bytes(data=pdf_bytes, mime_type="application/pdf")` schema.
*   **DoD:** Endpoints successfully accept a file payload or a PDF URL string and verify that binary data is ready to be parsed in-memory with zero disk-write side-effects.

---

### 🎨 Phase 2: Core Agent Logic (Parallel Path A)
*These tasks develop the backend cognitive loop and can run concurrently with Phase 3 (Frontend).*

#### 🏷️ Issue WCS-201: Implement `/discover` Endpoint (Discovery Pass 1)
*   **Type:** Feature (Parallel)
*   **Description:** Set up the system instructions and formatting boundaries for the pre-scan phase. Gemini 3.5 must evaluate the unstructured PDF layout to identify competitive divisions, workshop tracks, dance styles, and social themes.
*   **Technical Details:**
    *   Write the system prompt enforcing the `suggested_form_questions` target schema with rich option objects (`label`, `value`, `subtitle`, `badge`).
    *   Instruct the model to emit a valid, raw JSON response containing custom form schema elements (`select`, `multiselect`, or `boolean`) with `defaultValue` and `context`.
    *   Handle cases where the PDF contains multiple styles (e.g. Country Swing overlap) or leveled systems (e.g. Level 1 to 5).
*   **DoD:** Sending a mock visual PDF (e.g. *Boogie by the Bay 2026*) returns a clean `DiscoveryResponse` payload showing detected categories and custom frontend question models ready for `DynamicQuestionnaire`.

#### 🏷️ Issue WCS-202: Write the Temporal Flight Buffer Engine (Python Helper)
*   **Type:** Task (Parallel)
*   **Description:** Implement the pure mathematical logistics utility in Python that reads the earliest mandatory event call-time found by Gemini and computes the latest flight arrival target and sequential breakdown.
*   **Technical Details:**
    *   Calculate: $\text{Latest Landing} = \text{Earliest Call Time} - (\text{Transit Mins} + \text{1.5h Hotel Settle} + \text{1.0h Reg Warmup})$.
    *   Produce summary metrics: `earliestStagingTime`, `latestFlightArrivalDeadline`, `totalBufferHours`, `totalBufferMinutes`, and friendly `formulaSummary`.
    *   Produce 5 sequential `BufferStep` items (`flight`, `transit`, `hotel`, `warmup`, `staging`) with progressive time displays (e.g. `02:15 PM Touchdown`, `02:15 PM → 02:45 PM`, `05:15 PM Staging Call`).
    *   Support ISO 8601 formatting and timezone calculation to prevent timezone offset bugs.
*   **DoD:** Executing the buffer function with an input call-time of Friday 5:15 PM and SJC airport transit times returns a correct, validated deadline and step array matching `BufferCalculationResult`.

#### 🏷️ Issue WCS-203: Implement `/generate` Endpoint (Generator Pass 2)
*   **Type:** Feature (Parallel)
*   **Description:** Integrate the second-pass generation prompt. This endpoint accepts the user's completed questionnaire choices alongside the PDF bytes to build the tailored schedule calendar and the step-by-step decision trace.
*   **Technical Details:**
    *   Pass the questionnaire parameters as plain text instructions.
    *   Instruct Gemini to compile an RFC 5545-compliant iCal plain-text block under `ics_content`, escaping quotes properly.
    *   Populate `decision_trace` structures with:
        *   `bufferTimeline`: High-contrast summary metrics and 5-step arrival progression.
        *   `sessions`: Filtering decisions with status (`included` | `filtered`), `decisionBadge` (e.g. `Division Match`, `Arrival Time Conflict`, `Level Ineligible`), and friendly `justification`.
        *   `themeDressCodes`: Structured theme attire guidance (`id`, `night`, `title`, `description`, `badge`, `category`, `recommendedOutfits`, `atmosphere`).
*   **DoD:** Backend returns a single JSON object containing both the RFC-compliant calendar string and a complete `AgentDecisionTrace` matching the frontend visualization cards.

---

### 🖥️ Phase 3: Blog Frontend (Parallel Path B)
*These tasks build the user interface on `boomtick.blog` and can run concurrently with Phase 2 (Backend).*

#### 🏷️ Issue WCS-301: Create PDF Upload & Hero Event Selector Component
*   **Type:** UI Feature (Parallel)
*   **Description:** Implement the initial form component inside the `tech-dancer` repo workspace. Features a clean, centered search input with instant preset chips and secondary PDF upload capabilities.
*   **Technical Details:**
    *   Build a sleek search input with quick event tags (South Bay Dance Fling, Boogie by the Bay, etc.).
    *   Support drag-and-drop schedule PDF uploads with visual state transitions.
*   **DoD:** Users can select a featured California 2026 event or drop a PDF schedule, advancing seamlessly to discovery.

#### 🏷️ Issue WCS-302: Implement Unified Choice Card Questionnaire Form Renderer
*   **Type:** UI Feature (Parallel)
*   **Description:** Build the questionnaire renderer that parses the `DiscoveryResponse` schema and renders unified persona/level cards, multi-select checkboxes, and boolean switches.
*   **Technical Details:**
    *   Render Question 1 as 4 rich choice cards (Novice Competitor, Intermediate Competitor, Social Dancer Only, Workshop Enthusiast) with `subtitle` and `badge` indicators.
    *   Include collapsible "Why We Ask This" explainability disclosures for every question.
    *   Store selected user answers in a unified state object and gate the primary CTA until required questions are answered.
*   **DoD:** Questionnaire renders unified choice cards and form inputs conforming to design token and layout primitive standards with 0 console warnings.

#### 🏷️ Issue WCS-303: Build "Agent Mind" Decision Trace & Arrival Buffer View
*   **Type:** UI Feature (Parallel)
*   **Description:** Build an explainable interface that visualizes the decision trace logs, demonstrating exactly how the agent filtered out events and calculated travel math.
*   **Technical Details:**
    *   **Direct Time Summary**: 3 bold metric cards displaying Earliest Event Call, Target Landing Deadline, and Total Required Buffer.
    *   **Static Arrival Breakdown**: Sequential 5-step progression from touchdown to ballroom staging call with mathematical validation callout.
    *   **Your Workshops & Schedule Matrix**: Tabbed view (`Matched & Scheduled`, `Filtered Out`, `All`) with clear user-centric fit rationale.
    *   **Event Themes & Dress Codes**: Grid of convention evening party themes and competition attire recommendations.
*   **DoD:** The UI displays a detailed breakdown of *why* the itinerary was created, followed by an immediate download button that saves the generated calendar as an `.ics` file.

---

### 🛑 Sync Point 1: API Integration & System End-to-End Validation
* **Status:** Milestone (Both Parallel Paths Must Converge)
* **Objective:** Connect the React blog UI component to the Cloud Run API service running on a local host network.
* **Verification Routine:**
    1. **Contract Schema Gate:** Verify FastAPI Pydantic models serialize to camelCase aliases consumable by TypeScript (`DiscoveryResponse`, `AgentDecisionTrace`, `BufferCalculationResult`, `AuditSession`, `ThemeDressCode`).
    2. **Stage 1 Discovery:** Drag-and-drop a sample schedule (e.g., `bbb2026-schedule.pdf`) or select a California 2026 preset. Confirm Stage 1 questionnaire mounts dynamically with accurate options and persona choice cards.
    3. **Stage 2 Generation:** Select a persona profile (e.g., Novice Competitor), submit the answers, and confirm the decision trace renders beautifully (Direct Time Summary, static Arrival Buffer timeline, 3-tab Workshop Matrix, Theme & Dress Code cards).
    4. **Calendar Download:** Click download and verify that the resulting `.ics` calendar imports into Google Calendar or Apple Calendar with accurate event mappings and flight landing deadlines.

---

## 🔌 Frontend-Backend Contract Verification Matrix

To guarantee zero runtime breakage when moving from Mock Mode to Live Backend API, every backend issue must verify against the following schema compatibility requirements:

| Endpoint & Stage | Backend Pydantic Model | Target React TypeScript Contract | Required Verification Assertions |
| :--- | :--- | :--- | :--- |
| **Stage 1: `/discover`** | `DiscoveryResponse` | `DiscoveryResponse` (`types/navigator.ts`) | • Contains `suggested_form_questions` array.<br>• Each question has `id`, `title`, `type` (`select` \| `multiselect` \| `boolean`), `context`, `required`, `defaultValue`.<br>• Select / Multiselect options contain `{ label, value, subtitle?, badge? }`. |
| **Stage 2: `/generate`** | `GenerateResponse` | `AgentDecisionTrace` (`types.ts`) | • Contains `icsContent` (or `ics_content`) string with valid RFC 5545 syntax.<br>• Contains `decisionTrace` with `subTasks`, `bufferTimeline`, `sessions`, `themeDressCodes`, `packingManifest`. |
| **Buffer Engine** | `BufferCalculationResult` | `FlightBuffer` (`types.ts`) | • Contains `earliestStagingTime`, `latestFlightArrivalDeadline`, `warmupMinutes`, `hotelSettleMinutes`, `transitMinutes`, `formulaSummary`.<br>• Contains `steps: BufferStep[]` with `label`, `time`, `type` (`staging` \| `warmup` \| `hotel` \| `transit` \| `flight`), and `duration`. |
| **Audit Matrix** | `AuditSession` | `AuditSession` (`types.ts`) | • Contains `id`, `title`, `time`, `location`, `status` (`included` \| `filtered`), `decisionBadge`, `justification`. |
| **Themes & Dress Codes** | `ThemeDressCode` | `ThemeDressCode` (`types.ts`) | • Contains `id`, `day`, `themeTitle`, `category` (`social_theme` \| `showcase_formal` \| `competition_attire` \| `casual_sunday`), `description`, `recommendedAttire: string[]`, `vibe`. |
| **Packing Items** | `PackingItem` | `PackingItem` (`types.ts`) | • Contains `id`, `name`, `category` (`footwear` \| `attire` \| `toiletries` \| `tech` \| `essentials`), `rationale`, `quantity`. |

---

### 🐳 Phase 4: Deployment & GCP Configuration (Sequential)
*These tasks containerize and deploy the fully verified, integrated MVP stack.*

#### 🏷️ Issue WCS-401: Implement Multi-Stage Dockerfile
*   **Type:** Task (Sequential)
*   **Description:** Create a production-hardened, multi-stage `Dockerfile` to compile dependencies separately, minimizing the final container image footprint and vulnerability surface.
*   **Technical Details:**
    *   Stage 1 (`builder`): Build python wheels and install packages to local folders.
    *   Stage 2 (`runner`): Pull a minimal python-slim image, copy dependencies, expose port `8080`, and start the uvicorn worker.
*   **DoD:** Executing `docker build -t wcs-navigator .` creates a minimal, functional image that launches the API server on run.

#### 🏷️ Issue WCS-402: Deploy Container to Google Cloud Run
*   **Type:** Task (Sequential)
*   **Description:** Push the local container to Google Cloud Artifact Registry and deploy it live to a Cloud Run service instances.
*   **Technical Details:**
    *   Create a clean, scriptable `gcloud run deploy` execution block.
    *   Pass the secure `GEMINI_API_KEY` from AI Studio directly into the instance environment variables.
    *   Configure CORS variables so that the static origin (`boomtick.blog`) can execute secure cross-origin API calls.
*   **DoD:** API service is live on a secure HTTPS Google URL and successfully answers requests fired from the production web domain.

---

### 🧪 Phase 5: Test-Driven Validation & Demo Prep (Sequential)
*These tasks complete the testing validations and prepare the final presentation assets.*

#### 🏷️ Issue WCS-501: Write Automated Test Suite (Pytest & Contract Verification)
*   **Type:** Task (Sequential)
*   **Description:** Build out the test coverage validating execution outputs against the Golden Target scenarios and verifying frontend-backend JSON contract serialization.
*   **Technical Details:**
    *   Execute `test_contract_schemas.py` asserting exact camelCase/snake_case serialization compatibility with frontend React TypeScript definitions.
    *   Write test fixtures parsing Boogie by the Bay 2026 schedules under the "Novice Competitor" profile.
    *   Write test fixtures parsing Halloween Swing Thing 2026 under the "Pure Social Spectator" profile.
    *   Assert that calculations of earliest call-times, flight buffers, and generated `.ics` files match targeted strings.
*   **DoD:** Running `pytest tests/ -v` completes successfully with a 100% pass rate across engine math, schema contracts, and mock ingestion fixtures.

#### 🏷️ Issue WCS-502: Record and Script the Devpost Submission Video (4 Minutes Max)
*   **Type:** Task (Sequential)
*   **Description:** Script, record, and edit the final four-minute demonstration video demonstrating technical capability, UI execution, and GCP dashboard deployment.
*   **Technical Details:**
    *   **Minute 0-1:** State the organizational friction of large multi-track conventions.
    *   **Minute 1-2:** Showcase the GCP Cloud Run console logs and FastAPI container active states.
    *   **Minute 2-3.5:** Show the live, unedited drag-and-drop of a PDF schedule, dynamic form questionnaire creation, and the rendering of the explainable trace-timeline on `boomtick.blog`.
    *   **Minute 3.5-4:** Highlight scalability to massive corporate events (like GHC) and wrap up.
*   **DoD:** Video recorded, exported as high-fidelity MP4, uploaded to YouTube/Vimeo, and referenced in the public Devpost submission form.
