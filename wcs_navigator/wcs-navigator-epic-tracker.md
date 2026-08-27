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
    *   Write the system prompt enforcing the `suggested_form_questions` target schema.
    *   Instruct the model to emit a valid, raw JSON response containing custom form schema elements (`select`, `multiselect`, or `boolean`).
    *   Handle cases where the PDF contains multiple styles (e.g. Country Swing overlap) or leveled systems (e.g. Level 1 to 5).
*   **DoD:** Sending a mock visual PDF (e.g. *Boogie by the Bay 2026*) returns a clean `Discovery JSON` outline showing detected categories and custom frontend question models.

#### 🏷️ Issue WCS-202: Write the Temporal Flight Buffer Engine (Python Helper)
*   **Type:** Task (Parallel)
*   **Description:** Implement the pure mathematical logistics utility in Python that reads the earliest mandatory event call-time found by Gemini and computes the latest flight arrival target.
*   **Technical Details:**
    *   Calculate: $\text{Latest Landing} = \text{Earliest Call Time} - (\text{Transit Mins} + \text{1.5h Hotel Settle} + \text{1.0h Reg Warmup})$.
    *   Support ISO 8601 formatting and timezone calculation to prevent timezone offset bugs.
*   **DoD:** Executing the buffer function with an input call-time of Saturday 10:30 AM and SFO airport transit times returns a correct, validated deadline of Saturday 7:00 AM.

#### 🏷️ Issue WCS-203: Implement `/generate` Endpoint (Generator Pass 2)
*   **Type:** Feature (Parallel)
*   **Description:** Integrate the second-pass generation prompt. This endpoint accepts the user's completed questionnaire choices alongside the PDF bytes to build the tailored schedule calendar and the step-by-step decision trace.
*   **Technical Details:**
    *   Pass the questionnaire parameters as plain text instructions.
    *   Instruct Gemini to compile an RFC 5545-compliant iCal plain-text block under `ics_content`, escaping quotes properly.
    *   Populate `decision_trace` structures with reasons for every added, skipped, or filtered activity.
*   **DoD:** Backend returns a single JSON object containing both the RFC-compliant calendar string and a robust, trace-log explanation array.

---

### 🖥️ Phase 3: Blog Frontend (Parallel Path B)
*These tasks build the user interface on `boomtick.blog` and can run concurrently with Phase 2 (Backend).*

#### 🏷️ Issue WCS-301: Create PDF Upload & URL Form Component
*   **Type:** UI Feature (Parallel)
*   **Description:** Implement the initial form component inside the `tech-dancer` repo workspace. This features a drag-and-drop landing area for event schedules and a simple input field to paste online schedule links.
*   **Technical Details:**
    *   Build a sleek drag-and-drop panel with visual state changes (hover, active, uploading).
    *   Integrate simple state hooks to store file bytes or the URL string locally in the DOM.
*   **DoD:** Users can drag a PDF onto the page or paste an online URL, and clicking "Pre-Scan Schedule" fires the request to the endpoint.

#### 🏷️ Issue WCS-302: Implement the Dynamic Questionnaire Form Renderer
*   **Type:** UI Feature (Parallel)
*   **Description:** Build the conditional form builder that parses the `Discovery JSON` payload returned from `/discover` and renders matching form inputs on the fly.
*   **Technical Details:**
    *   Evaluate incoming question types (`select`, `multiselect`, `boolean`).
    *   Dynamically render HTML selects, checkboxes, or toggles styled with Tailwind CSS.
    *   Store selected user answers in a unified state object.
*   **DoD:** Questionnaire changes dynamically depending on the uploaded file (e.g. showing "What is your workshop level?" only if leveled classes are detected).

#### 🏷️ Issue WCS-303: Build "Agent Mind" Decision Trace Component
*   **Type:** UI Feature (Parallel)
*   **Description:** Build an explainable interface that visualizes the decision trace logs, demonstrating exactly how the agent filtered out events and calculated travel math.
*   **Technical Details:**
    *   Display a visual progress timeline as the API loads ("Reading structure...", "Filtering workshops...", "Calculating buffers...").
    *   Render a vertical card-based comparison of selected workshops versus excluded workshops.
    *   Present the calculated flight arrival buffer as a clear, colored warning timeline at the top of the schedule.
*   **DoD:** The UI displays a detailed breakdown of *why* the itinerary was created, followed by a highlighted download button that saves the generated calendar as an `.ics` file.

---

### 🛑 Sync Point 1: API Integration & System End-to-End Validation
* **Status:** Milestone (Both Parallel Paths Must Converge)
* **Objective:** Connect the React blog UI component to the Cloud Run API service running on a local host network.
* **Verification Routine:**
    1. Drag-and-drop a sample schedule (e.g., `bbb2026-schedule.pdf`).
    2. Confirm Stage 1 questionnaire mounts dynamically with accurate options.
    3. Select a persona profile, submit the answers, and confirm the decision trace renders beautifully.
    4. Click download and verify that the resulting `.ics` calendar imports into Google Calendar or Apple Calendar with accurate event mappings.

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

#### 🏷️ Issue WCS-501: Write Automated Test Suite (Pytest)
*   **Type:** Task (Sequential)
*   **Description:** Build out the local test coverage validating execution outputs against the Golden Target scenarios.
*   **Technical Details:**
    *   Write test fixtures parsing Boogie by the Bay 2026 schedules under the "Novice Competitor" profile.
    *   Write test fixtures parsing Halloween Swing Thing 2026 under the "Pure Social Spectator" profile.
    *   Assert that the calculations of earliest call-times, flight buffers, and generated `.ics` files match targeted strings.
*   **DoD:** Running `pytest tests/ -v` completes successfully with a 100% pass rate.

#### 🏷️ Issue WCS-502: Record and Script the Devpost Submission Video (4 Minutes Max)
*   **Type:** Task (Sequential)
*   **Description:** Script, record, and edit the final four-minute demonstration video demonstrating technical capability, UI execution, and GCP dashboard deployment.
*   **Technical Details:**
    *   **Minute 0-1:** State the organizational friction of large multi-track conventions.
    *   **Minute 1-2:** Showcase the GCP Cloud Run console logs and FastAPI container active states.
    *   **Minute 2-3.5:** Show the live, unedited drag-and-drop of a PDF schedule, dynamic form questionnaire creation, and the rendering of the explainable trace-timeline on `boomtick.blog`.
    *   **Minute 3.5-4:** Highlight scalability to massive corporate events (like GHC) and wrap up.
*   **DoD:** Video recorded, exported as high-fidelity MP4, uploaded to YouTube/Vimeo, and referenced in the public Devpost submission form.
