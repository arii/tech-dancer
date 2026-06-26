## PR Review

**Summary:** This PR introduces structured token management and strict JSON schema responses for the AI code and visual review clients. It refactors `codeReviewUtils.ts` and related clients to pass explicit JSON schemas (`responseSchema`) and enforce `application/json` output directly via the Gemini API, rather than relying on unreliable regex parsing of Markdown text blocks (like `<findings>`).

**Findings:**
- **Robustness:** Replacing regex/string manipulation (`parseCodeReviewVerdict`, `<findings>` parsing) with native Gemini API structured outputs (`responseMimeType: "application/json"`, `responseSchema`) vastly improves the reliability of the AI review pipeline.
- **Tests Updated:** The `codeReviewUtils.test.ts` file was properly updated to remove tests for the old string parsing methods and adds coverage for the new `buildReviewPayload` combining logic.
- **Architectural Alignment:** The implementation defines clear TypeScript interfaces and maps them directly to Zod-like JSON schemas (e.g., `CODE_REVIEW_SCHEMA`), aligning perfectly with the repository's goal to formalize AI outputs.
- **CI Status:** All CI checks passed successfully, indicating the payload transformations and API calls remain functional.

**Recommendation:** Approved. This is a significant stability improvement for the automated AI review agents, eliminating brittle string parsing in favor of native API structured outputs.
